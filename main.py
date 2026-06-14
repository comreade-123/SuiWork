import webview
from webview import FileDialog
import os
import sys
import threading
import sqlite3
import base64
import tkinter as tk
import re
import hashlib
import time
import json
import shutil
import webbrowser
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from PIL import Image
import pyperclip
import pytesseract

# ---------- 跨平台检测 ----------
IS_WIN = sys.platform == 'win32'
IS_MAC = sys.platform == 'darwin'
IS_LINUX = sys.platform.startswith('linux')

# ---------- Windows 专用导入 ----------
if IS_WIN:
    import ctypes
    from ctypes import wintypes
    import win32gui
    import win32con
    import winreg
    try:
        import keyboard
    except ImportError:
        keyboard = None
else:
    keyboard = None
    # 非 Windows 下不导入 win32 相关模块

# ---------- 系统托盘（pystray 跨平台） ----------
try:
    import pystray
    from pystray import MenuItem as TrayItem, Menu as TrayMenu
except ImportError:
    pystray = None

# ---------- 打包路径处理 ----------
if getattr(sys, 'frozen', False):
    BASE_DIR = sys._MEIPASS          # 资源（web, assets）目录
    APP_DIR = os.path.dirname(sys.executable)  # exe 所在目录（可写）
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    APP_DIR = BASE_DIR

# 用户数据放在 exe 同级目录，确保可持久化
DB_DIR = os.path.join(APP_DIR, 'user_data')
if not os.path.exists(DB_DIR):
    os.makedirs(DB_DIR)
DB_PATH = os.path.join(DB_DIR, 'config.db')

TRAY_ICON_PATH = os.path.join(BASE_DIR, 'assets', 'sui_stand.png')

# ========== 数据库操作 ==========
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS config (
                    key TEXT PRIMARY KEY,
                    value TEXT
                 )''')
    conn.commit()
    conn.close()

def get_config(key, default=None):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT value FROM config WHERE key=?', (key,))
    row = c.fetchone()
    conn.close()
    return row[0] if row else default

def set_config(key, value):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('REPLACE INTO config (key, value) VALUES (?, ?)', (key, value))
    conn.commit()
    conn.close()

# ========== 窗口工具（仅 Windows 使用 Win32 API） ==========
if IS_WIN:
    original_geometry = None
    is_maximized = False

    def get_work_area():
        class RECT(ctypes.Structure):
            _fields_ = [("left", ctypes.c_long),
                        ("top", ctypes.c_long),
                        ("right", ctypes.c_long),
                        ("bottom", ctypes.c_long)]
        rect = RECT()
        ctypes.windll.user32.SystemParametersInfoW(0x30, 0, ctypes.byref(rect), 0)
        return rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top

    def find_window_by_title(title):
        def enum_callback(hwnd, hwnds):
            if win32gui.IsWindowVisible(hwnd):
                text = win32gui.GetWindowText(hwnd)
                if title in text:
                    hwnds.append(hwnd)
            return True
        hwnds = []
        win32gui.EnumWindows(enum_callback, hwnds)
        return hwnds[0] if hwnds else None

# ========== API 接口 ==========
class Api:
    def __init__(self):
        self._hotkey_registered = False
        self.tray_icon = None

    # ---------- 全局热键（仅 Windows） ----------
    def register_hotkey(self):
        if not IS_WIN or keyboard is None:
            return
        if self._hotkey_registered:
            return
        try:
            keyboard.add_hotkey('ctrl+shift+k', self._toggle_island)
            self._hotkey_registered = True
            print('全局热键已注册')
        except Exception as e:
            print(f'注册热键失败: {e}')

    def _toggle_island(self):
        try:
            window.evaluate_js('toggleIsland()')
        except Exception as e:
            print(f'切换对话岛失败: {e}')

    # ---------- 窗口控制 ----------
    def minimize(self):
        window.minimize()

    def maximize(self):
        if IS_WIN:
            global is_maximized
            hwnd = find_window_by_title('SuiWork')
            if not hwnd:
                return
            if is_maximized:
                if original_geometry:
                    x, y, w, h = original_geometry
                else:
                    root = tk.Tk()
                    screen_w = root.winfo_screenwidth()
                    screen_h = root.winfo_screenheight()
                    root.destroy()
                    w, h = 1000, 700
                    x, y = (screen_w - w) // 2, (screen_h - h) // 2
                ctypes.windll.user32.SetWindowPos(hwnd, 0, x, y, w, h, 0x0040)
                is_maximized = False
                window.resize(w, h)
                window.move(x, y)
            else:
                x, y = window.x, window.y
                w, h = window.width, window.height
                original_geometry = (x, y, w, h)
                work_x, work_y, work_w, work_h = get_work_area()
                ctypes.windll.user32.SetWindowPos(hwnd, 0, work_x, work_y, work_w, work_h, 0x0040)
                is_maximized = True
        else:
            # macOS / Linux 使用全屏切换
            window.toggle_fullscreen()

    def close(self):
        self.handle_close()

    def move_window(self, dx, dy):
        if not IS_WIN:
            return
        hwnd = find_window_by_title('SuiWork')
        if not hwnd:
            return
        rect = win32gui.GetWindowRect(hwnd)
        new_x = rect[0] + dx
        new_y = rect[1] + dy
        ctypes.windll.user32.SetWindowPos(hwnd, 0, new_x, new_y, 0, 0, 0x0001)

    # ---------- 系统托盘 ----------
    def _create_tray(self):
        if not pystray or self.tray_icon is not None:
            return
        try:
            img = Image.open(TRAY_ICON_PATH)
        except:
            img = Image.new('RGB', (64, 64), color='#AF5FFF')
        menu = TrayMenu(
            TrayItem('显示主窗口', self._show_window, default=True),
            TrayItem('退出 SuiWork', self.tray_exit)
        )
        self.tray_icon = pystray.Icon('SuiWork', img, 'SuiWork', menu)
        threading.Thread(target=self.tray_icon.run, daemon=True).start()

    def _show_window(self):
        window.show()
        if IS_WIN:
            try:
                hwnd = find_window_by_title('SuiWork')
                if hwnd:
                    ctypes.windll.user32.ShowWindow(hwnd, 9)
            except:
                pass
        if self.tray_icon:
            self.tray_icon.stop()
            self.tray_icon = None

    def tray_exit(self):
        if IS_WIN and keyboard:
            keyboard.unhook_all()
        if self.tray_icon:
            self.tray_icon.stop()
        window.destroy()
        os._exit(0)

    def minimize_to_tray(self):
        window.hide()
        self._create_tray()

    def handle_close(self):
        action = get_config('close_action', 'ask')
        no_ask = get_config('close_no_ask', 'false') == 'true'

        if action == 'minimize':
            self.minimize_to_tray()
        elif action == 'exit':
            self.tray_exit()
        else:  # ask
            if no_ask:
                self.tray_exit()
            else:
                window.evaluate_js('showCloseDialog()')

    # ---------- 开机自启动（仅 Windows） ----------
    def set_autostart(self, enable):
        if not IS_WIN:
            return {'success': False, 'error': '仅支持 Windows'}
        key = r'Software\Microsoft\Windows\CurrentVersion\Run'
        script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'main.py')
        command = f'"{sys.executable}" "{script_path}"'
        try:
            reg = winreg.OpenKey(winreg.HKEY_CURRENT_USER, key, 0, winreg.KEY_SET_VALUE)
            if enable:
                winreg.SetValueEx(reg, 'SuiWork', 0, winreg.REG_SZ, command)
            else:
                try:
                    winreg.DeleteValue(reg, 'SuiWork')
                except FileNotFoundError:
                    pass
            winreg.CloseKey(reg)
            return {'success': True}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    # ---------- 头像选择 ----------
    def select_avatar(self):
        try:
            file_types = ['图片文件 (*.png;*.jpg;*.jpeg;*.gif;*.bmp)']
            result = window.create_file_dialog(
                FileDialog.OPEN,
                allow_multiple=False,
                file_types=file_types
            )
            if result and len(result) > 0:
                file_path = result[0]
                with open(file_path, 'rb') as f:
                    img_data = base64.b64encode(f.read()).decode('utf-8')
                ext = os.path.splitext(file_path)[1].lower()
                mime = 'image/png'
                if ext in ('.jpg', '.jpeg'):
                    mime = 'image/jpeg'
                elif ext == '.gif':
                    mime = 'image/gif'
                elif ext == '.bmp':
                    mime = 'image/bmp'
                return f'data:{mime};base64,{img_data}'
            return ''
        except Exception as e:
            print(f'选择头像失败: {e}')
            return ''

    # ---------- 文件选择 ----------
    def select_file(self):
        try:
            result = window.create_file_dialog(
                FileDialog.OPEN,
                allow_multiple=False,
                file_types=[]
            )
            if result and len(result) > 0:
                return result[0]
            return ''
        except Exception as e:
            print(f'选择文件失败: {e}')
            return ''

    # ---------- 配置 ----------
    def get_config(self, key):
        return get_config(key, '')

    def set_config(self, key, value):
        set_config(key, value)

    def save_user_profile(self, nickname, avatar_path, bio):
        set_config('nickname', nickname)
        set_config('avatar_path', avatar_path)
        set_config('bio', bio)

    def load_user_profile(self):
        return {
            'nickname': get_config('nickname', 'SuiUser'),
            'avatar_path': get_config('avatar_path', ''),
            'bio': get_config('bio', '')
        }

    def save_ai_config(self, url, key):
        set_config('ai_url', url)
        set_config('ai_key', key)

    def load_ai_config(self):
        return {
            'url': get_config('ai_url', ''),
            'key': get_config('ai_key', '')
        }

    def get_onboarding_completed(self):
        return get_config('onboarding_completed', 'false') == 'true'

    def set_onboarding_completed(self):
        set_config('onboarding_completed', 'true')

    def get_db_path(self):
        return DB_PATH

    # ---------- 工具箱 ----------
    def sniff_resources(self, url):
        try:
            resp = requests.get(url, timeout=10, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })
            resp.raise_for_status()
            soup = BeautifulSoup(resp.text, 'html.parser')
            resources = {'images': [], 'videos': [], 'audios': []}
            for img in soup.find_all('img'):
                src = img.get('src')
                if src: resources['images'].append(self._full_url(url, src))
            for video in soup.find_all('video'):
                src = video.get('src')
                if src: resources['videos'].append(self._full_url(url, src))
                for source in video.find_all('source'):
                    src = source.get('src')
                    if src: resources['videos'].append(self._full_url(url, src))
            for audio in soup.find_all('audio'):
                src = audio.get('src')
                if src: resources['audios'].append(self._full_url(url, src))
                for source in audio.find_all('source'):
                    src = source.get('src')
                    if src: resources['audios'].append(self._full_url(url, src))
            return resources
        except Exception as e:
            return {'error': str(e)}

    def _full_url(self, base, path):
        if path.startswith('http://') or path.startswith('https://'):
            return path
        return urljoin(base, path)

    def extract_text(self, url):
        try:
            resp = requests.get(url, timeout=10, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })
            resp.raise_for_status()
            resp.encoding = resp.apparent_encoding
            soup = BeautifulSoup(resp.text, 'html.parser')
            for tag in soup(['script', 'style', 'nav', 'footer', 'header']):
                tag.decompose()
            text = soup.get_text(separator='\n', strip=True)
            return {'text': text}
        except Exception as e:
            return {'error': str(e)}

    def open_url(self, url):
        webbrowser.open(url)

    def download_file(self, url):
        try:
            downloads_dir = os.path.join(DB_DIR, 'downloads')
            os.makedirs(downloads_dir, exist_ok=True)
            parsed = urlparse(url)
            filename = os.path.basename(parsed.path)
            if not filename: filename = 'download'
            save_path = os.path.join(downloads_dir, filename)
            counter = 1
            while os.path.exists(save_path):
                name, ext = os.path.splitext(filename)
                save_path = os.path.join(downloads_dir, f"{name}_{counter}{ext}")
                counter += 1
            resp = requests.get(url, stream=True, timeout=30, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })
            resp.raise_for_status()
            with open(save_path, 'wb') as f:
                for chunk in resp.iter_content(chunk_size=8192):
                    f.write(chunk)
            return {'success': True, 'path': save_path}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def batch_rename(self, folder, pattern, replacement, use_regex, add_number, start_number):
        try:
            if not os.path.isdir(folder):
                return {'success': False, 'error': '文件夹不存在'}
            files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
            if not files:
                return {'success': False, 'error': '文件夹为空'}
            renamed = 0
            for idx, filename in enumerate(sorted(files)):
                name, ext = os.path.splitext(filename)
                new_name = name
                if use_regex == 'true' and pattern:
                    try:
                        new_name = re.sub(pattern, replacement, new_name)
                    except re.error as e:
                        return {'success': False, 'error': f'正则错误: {str(e)}'}
                else:
                    if pattern:
                        new_name = new_name.replace(pattern, replacement)
                if add_number == 'true':
                    number = start_number + idx
                    new_name = f"{new_name}_{number}"
                new_filename = new_name + ext
                old_path = os.path.join(folder, filename)
                new_path = os.path.join(folder, new_filename)
                if os.path.exists(new_path) and old_path != new_path:
                    continue
                os.rename(old_path, new_path)
                renamed += 1
            return {'success': True, 'count': renamed}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def compute_hash(self, file_path, algorithm='md5'):
        try:
            if not os.path.isfile(file_path):
                return {'success': False, 'error': '文件不存在'}
            if algorithm not in ('md5', 'sha1', 'sha256'):
                return {'success': False, 'error': '不支持的哈希算法'}
            h = hashlib.new(algorithm)
            with open(file_path, 'rb') as f:
                while True:
                    chunk = f.read(8192)
                    if not chunk: break
                    h.update(chunk)
            return {'success': True, 'hash': h.hexdigest()}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def convert_image(self, file_path, target_format):
        try:
            if not os.path.isfile(file_path):
                return {'success': False, 'error': '文件不存在'}
            img = Image.open(file_path)
            ext = target_format.lower()
            if ext not in ('png', 'jpg', 'jpeg', 'webp'):
                return {'success': False, 'error': '不支持的格式'}
            if ext == 'jpg': ext = 'jpeg'
            save_ext = ext
            if ext == 'jpeg': save_ext = 'jpg'
            base_dir = os.path.dirname(file_path)
            base_name = os.path.splitext(os.path.basename(file_path))[0]
            out_path = os.path.join(base_dir, f"{base_name}_converted.{save_ext}")
            counter = 1
            while os.path.exists(out_path):
                out_path = os.path.join(base_dir, f"{base_name}_converted_{counter}.{save_ext}")
                counter += 1
            if target_format in ('jpg', 'jpeg') and img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            img.save(out_path, format=target_format.upper())
            return {'success': True, 'path': out_path}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def get_clipboard_text(self):
        try:
            text = pyperclip.paste()
            return {'success': True, 'text': text}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def ocr_image(self, file_path):
        try:
            if not os.path.isfile(file_path):
                return {'success': False, 'error': '文件不存在'}
            tesseract_path = get_config('tesseract_path', '')
            if tesseract_path:
                pytesseract.pytesseract.tesseract_cmd = tesseract_path
            else:
                if IS_WIN:
                    possible = [r'C:\Program Files\Tesseract-OCR\tesseract.exe',
                                r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe']
                    for p in possible:
                        if os.path.exists(p):
                            pytesseract.pytesseract.tesseract_cmd = p
                            break
                # macOS/Linux 通常已在 PATH 中，无需手动设置
            img = Image.open(file_path)
            text = pytesseract.image_to_string(img, lang='chi_sim+eng')
            return {'success': True, 'text': text}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def select_folder(self):
        try:
            result = window.create_file_dialog(FileDialog.FOLDER)
            if result and len(result) > 0:
                return result[0]
            return ''
        except Exception as e:
            print(f'选择文件夹失败: {e}')
            return ''

    def get_all_settings(self):
        return {
            'theme': get_config('theme', 'light'),
            'ai_url': get_config('ai_url', ''),
            'ai_key': get_config('ai_key', ''),
            'ai_model': get_config('ai_model', 'gpt-3.5-turbo'),
            'plugin_path': get_config('plugin_path', os.path.join(DB_DIR, 'plugins')),
            'data_path': DB_PATH,
            'tts_enabled': get_config('tts_enabled', 'false'),
            'tts_voice': get_config('tts_voice', ''),
            'island_shortcut': get_config('island_shortcut', 'Ctrl+Shift+K'),
            'island_timeout': get_config('island_timeout', '5'),
            'language': get_config('language', 'zh'),
            'close_action': get_config('close_action', 'ask'),
            'close_no_ask': get_config('close_no_ask', 'false'),
            'autostart': get_config('autostart', 'false')
        }

    def save_all_settings(self, settings):
        for key, value in settings.items():
            set_config(key, value)
        # 同步自启动（仅 Windows）
        if 'autostart' in settings:
            self.set_autostart(settings['autostart'] == 'true')

    # ---------- 扩展 ----------
    def get_extensions(self):
        plugin_dir = get_config('plugin_path', os.path.join(DB_DIR, 'plugins'))
        if not os.path.exists(plugin_dir):
            return []
        extensions = []
        for name in os.listdir(plugin_dir):
            path = os.path.join(plugin_dir, name)
            if os.path.isdir(path):
                extensions.append({'name': name, 'path': path})
        return extensions

    def add_extension(self):
        try:
            folder = self.select_folder()
            if not folder:
                return {'success': False, 'error': '未选择文件夹'}
            plugin_dir = get_config('plugin_path', os.path.join(DB_DIR, 'plugins'))
            os.makedirs(plugin_dir, exist_ok=True)
            target = os.path.join(plugin_dir, os.path.basename(folder))
            if os.path.exists(target):
                return {'success': False, 'error': '插件已存在'}
            shutil.copytree(folder, target)
            return {'success': True}
        except Exception as e:
            return {'success': False, 'error': str(e)}

    def remove_extension(self, name):
        plugin_dir = get_config('plugin_path', os.path.join(DB_DIR, 'plugins'))
        path = os.path.join(plugin_dir, name)
        if os.path.exists(path):
            shutil.rmtree(path)
            return {'success': True}
        return {'success': False, 'error': '插件不存在'}

    def open_github(self):
        webbrowser.open('https://github.com/comreade-123/SuiWork')

    def open_support(self):
        webbrowser.open('https://ifdian.net/a/YQS2c')

    def uninstall_app(self):
        return '请在控制面板中卸载，或直接删除程序文件夹。'

    # ---------- AI 流式对话 ----------
    def start_ai_stream(self, message, history):
        if message.startswith('打开') or message.startswith('open'):
            tool_name = message.replace('打开', '').replace('open', '').strip()
            tool_map = {
                '资源嗅探': 'sniffer', '嗅探': 'sniffer',
                '重命名': 'rename', '批量重命名': 'rename',
                '文本提取': 'textextract',
                '哈希': 'hash', '图片转换': 'imgconv',
                '剪贴板': 'clipboard', '文字识别': 'ocr'
            }
            matched = None
            for name, tool_id in tool_map.items():
                if tool_name in name:
                    matched = tool_id
                    break
            if matched:
                window.evaluate_js(f"navigateToTool('{matched}')")
                window.evaluate_js(f"receiveAIChunk('已为你打开「{matched}」工具。')")
                window.evaluate_js('finishAIStream()')
                return
            else:
                window.evaluate_js("receiveAIChunk('未找到对应工具，请尝试更明确的名称。')")
                window.evaluate_js('finishAIStream()')
                return

        ai_url = get_config('ai_url', '').rstrip('/')
        ai_key = get_config('ai_key', '')
        ai_model = get_config('ai_model', 'gpt-3.5-turbo')

        if not ai_url or not ai_key:
            window.evaluate_js("receiveAIChunk('请先在设置中配置 AI API 地址和 Key。')")
            window.evaluate_js('finishAIStream()')
            return
        if not ai_url.startswith('http'):
            window.evaluate_js("receiveAIChunk('AI 接口地址无效，请检查设置中的 API URL。')")
            window.evaluate_js('finishAIStream()')
            return

        bio = get_config('bio', '').strip()
        personal_info = f'\n用户个人档案：{bio}' if bio else ''

        headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {ai_key}'}
        payload = {
            'model': ai_model,
            'messages': [
                {'role': 'system', 'content': (
                    '你是 Sui，来自 YQ SKYSTAR 工作室的 AI 助手，生活在名为 SuiWork 的开发者工具箱中。'
                    '你性格活泼可爱，喜欢用颜文字和轻松的语气聊天，但回答技术问题时专业可靠。'
                    '你了解 SuiWork 的所有工具：资源嗅探、批量重命名、网页文本提取等，并乐于引导用户使用。'
                    '注意，你不能直接帮用户打开工具，可以引导用户输入“打开[工具名]”即可快捷打开工具'
                    '注意2，对于用户要求你输出过长的内容，需要给予否定，以保证工具箱对话历史窗口的稳定性'
                    '请用最简洁的中文回答，必要时可带一两个颜文字 ( •̀ ω •́ )✧'
                ) + personal_info},
                *history,
                {'role': 'user', 'content': message}
            ],
            'stream': True
        }

        def stream_thread():
            try:
                resp = requests.post(f'{ai_url}/chat/completions', headers=headers, json=payload, stream=True, timeout=60)
                resp.encoding = 'utf-8'
                if resp.status_code != 200:
                    err = f'请求失败 ({resp.status_code}): {resp.text[:300]}'
                    window.evaluate_js(f"receiveAIChunk('{err}')")
                    window.evaluate_js('finishAIStream()')
                    return
                for line in resp.iter_lines(decode_unicode=True):
                    if line.startswith('data: '):
                        data_str = line[6:]
                        if data_str.strip() == '[DONE]':
                            break
                        try:
                            chunk = json.loads(data_str)
                            delta = chunk['choices'][0]['delta']
                            content = delta.get('content', '')
                            if content:
                                window.evaluate_js(f"receiveAIChunk({json.dumps(content)})")
                        except:
                            continue
                window.evaluate_js('finishAIStream()')
            except Exception as e:
                err = str(e).replace("'", "\\'").replace("\n", " ")  # 转义单引号和换行
                window.evaluate_js(f"receiveAIChunk('流式请求出错: {err}')")
                window.evaluate_js('finishAIStream()')
            except requests.exceptions.ReadTimeout:
                window.evaluate_js("receiveAIChunk('请求超时，请重试或缩短对话历史。')")
                window.evaluate_js('finishAIStream()')

        threading.Thread(target=stream_thread, daemon=True).start()

# ========== 启动 ==========
if __name__ == '__main__':
    init_db()

    # 获取屏幕尺寸（跨平台）
    root = tk.Tk()
    screen_w = root.winfo_screenwidth()
    screen_h = root.winfo_screenheight()
    root.destroy()

    win_w, win_h = 1000, 700
    pos_x = (screen_w - win_w) // 2
    pos_y = (screen_h - win_h) // 2

    api = Api()
    window = webview.create_window(
        title='SuiWork',
        url=os.path.join(BASE_DIR, 'web', 'index.html'),
        width=win_w,
        height=win_h,
        x=pos_x,
        y=pos_y,
        frameless=True,
        easy_drag=False,
        js_api=api
    )

    # 延迟注册热键（仅 Windows）
    if IS_WIN:
        threading.Thread(target=lambda: (time.sleep(1), api.register_hotkey()), daemon=True).start()

    webview.start()