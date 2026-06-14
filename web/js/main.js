// ========== 工具函数 ==========
function $(id) { return document.getElementById(id); }

// ========== 语言国际化 ==========
const i18n = {
    zh: {
        // 通用
        btn_start: "开始",
        btn_next: "下一步",
        btn_skip: "跳过",
        btn_save_continue: "保存并继续",
        btn_finish: "完成",
        btn_select_picture: "选择图片",
        btn_change_avatar: "更换头像",
        btn_select_folder: "选择文件夹",
        btn_save_settings: "保存所有设置",
        btn_check_update: "检查更新",
        btn_support: "爱发电",
        btn_uninstall: "卸载 SuiWork",
        btn_add_extension: "添加插件",
        btn_back_toolbox: "返回工具箱",
        
        // 导航
        nav_my: "我的",
        nav_ai_chat: "AI 对话",
        nav_toolbox: "工具箱",
        nav_extensions: "扩展",
        nav_settings: "设置",
        nav_about: "关于",
        
        // 我的页面
        my_profile: "我的",
        label_nickname: "昵称",
        label_bio: "个人档案",
        label_config_path: "配置存储位置",
        placeholder_nickname: "SuiUser",
        placeholder_bio: "介绍一下你自己，帮助 AI 理解你的风格...",
        
        // 工具箱
        toolbox: "工具箱",
        search_tools: "搜索工具...",
        tool_sniffer_title: "网页资源嗅探器",
        tool_sniffer_desc: "输入 URL 抓取图片/视频/音频链接",
        tool_rename_title: "批量重命名",
        tool_rename_desc: "支持正则与序号",
        tool_extract_title: "网页纯文本提取",
        tool_extract_desc: "提取网页正文内容",
        tool_hash_title: "文件哈希计算",
        tool_hash_desc: "MD5 / SHA1 / SHA256",
        tool_imgconv_title: "图片格式转换",
        tool_imgconv_desc: "PNG / JPEG / WEBP",
        tool_clipboard_title: "剪贴板抓取",
        tool_clipboard_desc: "实时捕获剪贴板文本",
        tool_ocr_title: "屏幕文字识别",
        tool_ocr_desc: "OCR 识别图片文字",
        
        // 设置
        settings: "设置",
        setting_theme: "主题",
        theme_light: "明亮",
        theme_dark: "暗黑",
        theme_system: "跟随系统",
        setting_ai_url: "AI 接口地址",
        setting_api_key: "API Key",
        setting_model_name: "模型名称",
        setting_plugin_path: "插件存储位置",
        setting_data_path: "数据存储位置",
        setting_tts_enabled: "AI 语音输出",
        setting_tts_voice: "语音音色",
        setting_island_shortcut: "对话岛快捷键",
        setting_island_timeout: "自动隐藏延迟 (秒)",
        setting_language: "语言",
        setting_close_action: "关闭窗口时",
        close_ask: "每次询问",
        close_minimize: "最小化到托盘",
        close_exit: "直接退出",
        setting_no_ask: "不再提示",
        setting_autostart: "开机自启动",
        setting_version: "版本",
        setting_support: "支持我们",
        
        // 扩展
        extensions: "扩展",
        
        // 关于
        about: "关于",
        about_studio: "YQ SKYSTAR 工作室",
        about_developers: "开发者",
        
        // 新手引导
        welcome_title: "欢迎来到 SuiWork",
        welcome_assistant: "我是你的助手 Sui",
        welcome_setup: "让我们快速设置一下吧",
        choose_theme: "选择你喜欢的主题",
        config_ai: "配置 AI 助手（可选）",
        config_ai_hint: "提供 OpenAI 兼容的 API 地址和 Key 以启用对话功能",
        label_api_url: "API URL",
        label_api_key: "API Key",
        label_model_name: "模型名称",
        setup_profile: "设置你的资料",
        
        // 对话岛和 AI 聊天
        island_placeholder: "向 Sui 提问...",
        chat_input_placeholder: "输入消息...",
        
        // 关闭对话框
        close_ask_dialog: "关闭窗口：\n确定 -> 直接退出\n取消 -> 最小化到托盘",
        settings_saved: "设置已保存"
    },
    en: {
        btn_start: "Start",
        btn_next: "Next",
        btn_skip: "Skip",
        btn_save_continue: "Save & Continue",
        btn_finish: "Finish",
        btn_select_picture: "Select Picture",
        btn_change_avatar: "Change Avatar",
        btn_select_folder: "Select Folder",
        btn_save_settings: "Save All Settings",
        btn_check_update: "Check Update",
        btn_support: "Support Us",
        btn_uninstall: "Uninstall SuiWork",
        btn_add_extension: "Add Extension",
        btn_back_toolbox: "Back to Toolbox",
        
        nav_my: "Profile",
        nav_ai_chat: "AI Chat",
        nav_toolbox: "Toolbox",
        nav_extensions: "Extensions",
        nav_settings: "Settings",
        nav_about: "About",
        
        my_profile: "My Profile",
        label_nickname: "Nickname",
        label_bio: "Bio",
        label_config_path: "Config Path",
        placeholder_nickname: "SuiUser",
        placeholder_bio: "Introduce yourself to help AI understand your style...",
        
        toolbox: "Toolbox",
        search_tools: "Search tools...",
        tool_sniffer_title: "Web Sniffer",
        tool_sniffer_desc: "Crawl images/videos/audios from URL",
        tool_rename_title: "Batch Rename",
        tool_rename_desc: "Regex & numbering support",
        tool_extract_title: "Web Text Extractor",
        tool_extract_desc: "Extract clean text from web pages",
        tool_hash_title: "File Hash",
        tool_hash_desc: "MD5 / SHA1 / SHA256",
        tool_imgconv_title: "Image Converter",
        tool_imgconv_desc: "PNG / JPEG / WEBP",
        tool_clipboard_title: "Clipboard Capture",
        tool_clipboard_desc: "Real-time clipboard text capture",
        tool_ocr_title: "OCR",
        tool_ocr_desc: "Image to text recognition",
        
        settings: "Settings",
        setting_theme: "Theme",
        theme_light: "Light",
        theme_dark: "Dark",
        theme_system: "Follow System",
        setting_ai_url: "AI API URL",
        setting_api_key: "API Key",
        setting_model_name: "Model Name",
        setting_plugin_path: "Plugin Path",
        setting_data_path: "Data Path",
        setting_tts_enabled: "AI Voice Output",
        setting_tts_voice: "Voice",
        setting_island_shortcut: "Island Hotkey",
        setting_island_timeout: "Auto-hide Delay (s)",
        setting_language: "Language",
        setting_close_action: "On Close",
        close_ask: "Ask Every Time",
        close_minimize: "Minimize to Tray",
        close_exit: "Exit Directly",
        setting_no_ask: "Don't Ask Again",
        setting_autostart: "Auto Start",
        setting_version: "Version",
        setting_support: "Support Us",
        
        extensions: "Extensions",
        
        about: "About",
        about_studio: "YQ SKYSTAR Studio",
        about_developers: "Developers",
        
        welcome_title: "Welcome to SuiWork",
        welcome_assistant: "I'm Sui, your assistant",
        welcome_setup: "Let's quickly set things up",
        choose_theme: "Choose Your Theme",
        config_ai: "Configure AI Assistant (Optional)",
        config_ai_hint: "Provide an OpenAI-compatible API URL and Key to enable chat",
        label_api_url: "API URL",
        label_api_key: "API Key",
        label_model_name: "Model Name",
        setup_profile: "Set Up Your Profile",
        
        island_placeholder: "Ask Sui...",
        chat_input_placeholder: "Type a message...",
        
        close_ask_dialog: "Close window:\nOK -> Exit\nCancel -> Minimize to tray",
        settings_saved: "Settings Saved"
    }
};

function applyLanguage(lang) {
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (i18n[lang] && i18n[lang][key]) {
            el.textContent = i18n[lang][key];
        }
    });
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.dataset.langPlaceholder;
        if (i18n[lang] && i18n[lang][key]) {
            el.placeholder = i18n[lang][key];
        }
    });
    // 保存语言设置到后端
    window.pywebview.api.set_config('language', lang);
}

// ========== 窗口按钮（pywebview） ==========
window.addEventListener('pywebviewready', async () => {
    console.log('pywebview API ready');

    // 隐藏入场动画遮罩
    const splash = $('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.classList.add('hide');
            setTimeout(() => splash.remove(), 500);
        }, 900);
    }

    document.body.classList.add('loaded');

    $('btn-minimize')?.addEventListener('click', () => window.pywebview.api.minimize());
    $('btn-maximize')?.addEventListener('click', () => window.pywebview.api.maximize());
    $('btn-close')?.addEventListener('click', () => window.pywebview.api.close());

    await checkOnboarding();
    await loadProfileToUI();
    bindProfileEvents();

    // 应用保存的语言
    const settings = await window.pywebview.api.get_all_settings();
    const lang = settings.language || 'zh';
    applyLanguage(lang);
    $('setting-language').value = lang;
});

// ========== 导航切换（带依次淡入动画） ==========
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        // 清除旧动画
        document.querySelectorAll('.fade-item').forEach(el => {
            el.classList.remove('fade-item');
            el.style.animationDelay = '';
        });

        document.querySelector('.nav-item.active')?.classList.remove('active');
        item.classList.add('active');
        const pageId = item.dataset.page;
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
            p.style.display = '';
        });

        const newPage = $(`page-${pageId}`);
        if (newPage) {
            newPage.classList.add('active');
            if (pageId === 'ai-chat') newPage.style.display = 'flex';

            // 依次淡入页面内的主要元素
            const animatedItems = newPage.querySelectorAll(
                '.profile-row, .tool-card, .setting-item, .extension-card, ' +
                '.about-container > *, .chat-top-bar, .chat-bottom-bar, ' +
                '.detail-header, .tool-input-group, h2, h3, button, input, select, textarea'
            );
            animatedItems.forEach((el, i) => {
                el.classList.add('fade-item');
                el.style.animationDelay = `${i * 0.06}s`;
            });
        }

        if (pageId === 'settings') loadSettings();
        if (pageId === 'extensions') loadExtensions();
    });
});

// ========== 标题栏拖拽 ==========
const titleBar = $('custom-title-bar');
let isDragging = false, lastX = 0, lastY = 0;

titleBar?.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return;
    isDragging = true; lastX = e.screenX; lastY = e.screenY; e.preventDefault();
});
window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.screenX - lastX, dy = e.screenY - lastY;
    lastX = e.screenX; lastY = e.screenY;
    if (window.pywebview) window.pywebview.api.move_window(dx, dy);
});
window.addEventListener('mouseup', () => { isDragging = false; });

// ========== 新手引导 ==========
async function checkOnboarding() {
    const completed = await window.pywebview.api.get_onboarding_completed();
    const overlay = $('onboarding-overlay');
    if (completed) { overlay.style.display = 'none'; }
    else { overlay.style.display = 'flex'; startOnboarding(); }
}

function startOnboarding() {
    const steps = document.querySelectorAll('.onboarding-step');
    let currentStep = 0, selectedTheme = 'light';
    function showStep(i) { steps.forEach(s => s.classList.remove('active')); steps[i].classList.add('active'); }
    function nextStep() {
        if (currentStep === 0) { currentStep = 1; showStep(1); }
        else if (currentStep === 1) { toggleTheme(selectedTheme); window.pywebview.api.set_config('theme', selectedTheme); currentStep = 2; showStep(2); }
        else if (currentStep === 2) { saveAiConfig(); currentStep = 3; showStep(3); }
        else if (currentStep === 3) { saveProfileFromOnboarding(); finishOnboarding(); }
    }
    function skipStep() {
        if (currentStep === 2) { window.pywebview.api.save_ai_config('', ''); window.pywebview.api.set_config('ai_model', 'gpt-3.5-turbo'); currentStep = 3; showStep(3); }
        else if (currentStep === 3) { window.pywebview.api.save_user_profile('SuiUser', '', ''); finishOnboarding(); }
    }
    function finishOnboarding() { window.pywebview.api.set_onboarding_completed(); $('onboarding-overlay').style.display = 'none'; loadProfileToUI(); bindProfileEvents(); }
    document.querySelectorAll('.onboarding-next').forEach(b => b.addEventListener('click', nextStep));
    document.querySelectorAll('.onboarding-skip').forEach(b => b.addEventListener('click', skipStep));
    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected'); selectedTheme = card.dataset.theme;
        });
    });
    $('btn-select-avatar')?.addEventListener('click', async () => { const url = await window.pywebview.api.select_avatar(); if (url) $('preview-avatar').src = url; });
    showStep(0);
}
function saveAiConfig() {
    const url = $('input-api-url')?.value.trim() || '', key = $('input-api-key')?.value.trim() || '', model = $('onboarding-ai-model')?.value.trim() || 'gpt-3.5-turbo';
    window.pywebview.api.save_ai_config(url, key); window.pywebview.api.set_config('ai_model', model);
}
function saveProfileFromOnboarding() {
    const nickname = $('input-nickname')?.value.trim() || 'SuiUser', avatarUrl = $('preview-avatar')?.src || '';
    if (avatarUrl && avatarUrl.startsWith('data:image')) window.pywebview.api.save_user_profile(nickname, avatarUrl, '');
    else window.pywebview.api.save_user_profile(nickname, '', '');
}

// ========== 「我的」页面 ==========
async function loadProfileToUI() {
    const profile = await window.pywebview.api.load_user_profile();
    if ($('profile-avatar-img') && profile.avatar_path) $('profile-avatar-img').src = profile.avatar_path;
    if ($('profile-nickname')) $('profile-nickname').value = profile.nickname || 'SuiUser';
    if ($('profile-bio')) $('profile-bio').value = profile.bio || '';
    if ($('profile-db-path')) { const path = await window.pywebview.api.get_db_path(); $('profile-db-path').value = path || 'D:\\SuiWork\\user_data\\config.db'; }
}
function bindProfileEvents() {
    $('btn-change-avatar')?.addEventListener('click', async () => {
        const url = await window.pywebview.api.select_avatar();
        if (url && $('profile-avatar-img')) { $('profile-avatar-img').src = url; await window.pywebview.api.set_config('avatar_path', url); }
    });
    const nick = $('profile-nickname'); if (nick) nick.addEventListener('blur', async () => { await window.pywebview.api.set_config('nickname', nick.value.trim() || 'SuiUser'); });
    const bio = $('profile-bio'); if (bio) bio.addEventListener('blur', async () => { await window.pywebview.api.set_config('bio', bio.value.trim()); });
}

// ========== 主题 ==========
window.toggleTheme = function(theme) {
    if (theme === 'system') { const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light'); }
    else { document.documentElement.setAttribute('data-theme', theme); }
};

// ========== 工具箱交互 ==========
const toolboxList = $('toolbox-list'), toolboxDetail = $('toolbox-detail'), detailContent = $('tool-detail-content'), backBtn = $('btn-back-toolbox');
backBtn?.addEventListener('click', () => { toolboxList.style.display = ''; toolboxDetail.style.display = 'none'; detailContent.innerHTML = ''; });
document.querySelectorAll('.tool-card').forEach(card => { card.addEventListener('click', () => { const tool = card.dataset.tool; openToolDetail(tool); }); });

function openToolDetail(tool) {
    toolboxList.style.display = 'none'; toolboxDetail.style.display = '';
    let html = '';
    switch (tool) {
        case 'sniffer':
            html = `<h3>网页资源嗅探器</h3><div class="tool-input-group"><input type="text" id="sniff-url" placeholder="输入网页 URL"><button id="btn-sniff">嗅探</button></div><div id="sniff-result"></div>`; break;
        case 'textextract':
            html = `<h3>网页纯文本提取</h3><div class="tool-input-group"><input type="text" id="extract-url" placeholder="输入网页 URL"><button id="btn-extract">提取</button></div><textarea id="extracted-text" readonly style="width:100%; height:300px; border-radius:12px; padding:12px; background:var(--input-bg); color:var(--text-primary);"></textarea>`; break;
        case 'rename':
            html = `
                <h3>批量重命名</h3>
                <div class="tool-input-group"><label>文件夹：</label><input type="text" id="rename-folder" placeholder="选择文件夹" readonly><button id="btn-select-rename-folder">选择</button></div>
                <div class="tool-input-group"><label>查找文本：</label><input type="text" id="rename-pattern" placeholder="要替换的文本或正则"></div>
                <div class="tool-input-group"><label>替换为：</label><input type="text" id="rename-replacement" placeholder="新文本"></div>
                <div class="tool-input-group" style="align-items: center;"><label><input type="checkbox" id="rename-use-regex"> 使用正则表达式</label><label style="margin-left: 20px;"><input type="checkbox" id="rename-add-number"> 添加序号</label></div>
                <div class="tool-input-group" id="rename-number-options" style="display: none;"><label>起始序号：</label><input type="number" id="rename-start-number" value="1" min="1"></div>
                <button id="btn-rename-start">开始重命名</button><div id="rename-result"></div>
            `; break;
        case 'hash':
            html = `
                <h3>文件哈希计算</h3>
                <div class="tool-input-group"><label>文件：</label><input type="text" id="hash-file" placeholder="选择文件" readonly><button id="btn-select-hash-file">选择</button></div>
                <div class="tool-input-group"><label>算法：</label><select id="hash-algorithm"><option value="md5">MD5</option><option value="sha1">SHA1</option><option value="sha256">SHA256</option></select></div>
                <button id="btn-hash-compute">计算哈希</button><div id="hash-result"></div>
            `; break;
        case 'imgconv':
            html = `
                <h3>图片格式转换</h3>
                <div class="tool-input-group"><label>图片文件：</label><input type="text" id="imgconv-file" placeholder="选择图片" readonly><button id="btn-select-imgconv-file">选择</button></div>
                <div class="tool-input-group"><label>目标格式：</label><select id="imgconv-format"><option value="png">PNG</option><option value="jpg">JPEG</option><option value="webp">WEBP</option></select></div>
                <button id="btn-imgconv-convert">开始转换</button><div id="imgconv-result"></div>
            `; break;
        case 'clipboard':
            html = `
                <h3>剪贴板抓取</h3>
                <button id="btn-clipboard-refresh">刷新剪贴板内容</button>
                <textarea id="clipboard-text" readonly style="width:100%; height:200px; margin-top:10px; border-radius:12px; padding:12px; background:var(--input-bg); color:var(--text-primary);"></textarea>
                <button id="btn-clipboard-save" style="margin-top:10px;">保存到文件</button>
            `; break;
        case 'ocr':
            html = `
                <h3>屏幕文字识别（OCR）</h3>
                <div class="tool-input-group"><label>图片文件：</label><input type="text" id="ocr-file" placeholder="选择图片" readonly><button id="btn-select-ocr-file">选择</button></div>
                <button id="btn-ocr-start">开始识别</button>
                <textarea id="ocr-text" readonly style="width:100%; height:200px; margin-top:10px; border-radius:12px; padding:12px; background:var(--input-bg); color:var(--text-primary);"></textarea>
                <button id="btn-ocr-save" style="margin-top:10px;">保存到文件</button>
            `; break;
        default: html = '<p>工具开发中</p>';
    }
    detailContent.innerHTML = html;

    // ---------- 绑定各工具事件 ----------
    if (tool === 'sniffer') {
        const sniffBtn = $('btn-sniff'), urlInput = $('sniff-url'), resultDiv = $('sniff-result');
        sniffBtn.addEventListener('click', async () => {
            const url = urlInput.value.trim(); if (!url) return;
            resultDiv.innerHTML = '<p>正在嗅探...</p>';
            try {
                const data = await window.pywebview.api.sniff_resources(url);
                if (data.error) { resultDiv.innerHTML = `<p style="color:red">错误: ${data.error}</p>`; return; }
                let output = '';
                for (const [type, items] of Object.entries(data)) {
                    if (items.length > 0) {
                        output += `<h4>${type.toUpperCase()}</h4><ul class="result-list">`;
                        items.forEach(item => {
                            let preview = '';
                            if (type === 'images') preview = `<img src="${item}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; margin-right:8px;" onerror="this.style.display='none'">`;
                            else if (type === 'videos') preview = `<i class="fa-solid fa-video" style="width:40px; text-align:center; margin-right:8px;"></i>`;
                            else if (type === 'audios') preview = `<i class="fa-solid fa-music" style="width:40px; text-align:center; margin-right:8px;"></i>`;
                            output += `<li>${preview}<a href="#" class="resource-link" data-url="${item}">${item}</a> <button class="download-btn" data-url="${item}">下载</button></li>`;
                        });
                        output += '</ul>';
                    }
                }
                resultDiv.innerHTML = output || '<p>未找到资源。</p>';
                document.querySelectorAll('.resource-link').forEach(link => link.addEventListener('click', e => { e.preventDefault(); window.pywebview.api.open_url(e.currentTarget.dataset.url); }));
                document.querySelectorAll('.download-btn').forEach(btn => btn.addEventListener('click', async e => {
                    const url = e.currentTarget.dataset.url; btn.textContent = '下载中...'; btn.disabled = true;
                    try { const res = await window.pywebview.api.download_file(url); alert(res.success ? `文件已下载到:\n${res.path}` : '下载失败'); }
                    catch { alert('下载出错'); }
                    finally { btn.textContent = '下载'; btn.disabled = false; }
                }));
            } catch { resultDiv.innerHTML = '<p style="color:red">调用失败</p>'; }
        });
    }

    if (tool === 'textextract') {
        const extractBtn = $('btn-extract'), urlInput = $('extract-url'), textArea = $('extracted-text');
        extractBtn.addEventListener('click', async () => {
            const url = urlInput.value.trim(); if (!url) return;
            textArea.value = '正在提取...';
            try { const data = await window.pywebview.api.extract_text(url); textArea.value = data.error ? `错误: ${data.error}` : data.text; }
            catch { textArea.value = '调用失败'; }
        });
    }

    if (tool === 'rename') {
        $('btn-select-rename-folder')?.addEventListener('click', async () => { const f = await window.pywebview.api.select_folder(); if (f) $('rename-folder').value = f; });
        $('rename-add-number')?.addEventListener('change', () => { $('rename-number-options').style.display = $('rename-add-number').checked ? '' : 'none'; });
        $('btn-rename-start')?.addEventListener('click', async () => {
            const folder = $('rename-folder').value; if (!folder) { alert('请选择文件夹'); return; }
            const res = await window.pywebview.api.batch_rename(folder, $('rename-pattern').value, $('rename-replacement').value, $('rename-use-regex').checked ? 'true' : 'false', $('rename-add-number').checked ? 'true' : 'false', parseInt($('rename-start-number').value) || 1);
            const rd = $('rename-result'); rd.innerHTML = res.success ? `<p style="color:green">成功重命名 ${res.count} 个文件</p>` : `<p style="color:red">错误: ${res.error}</p>`;
        });
    }

    if (tool === 'hash') {
        $('btn-select-hash-file')?.addEventListener('click', async () => { const f = await window.pywebview.api.select_file(); if (f) $('hash-file').value = f; });
        $('btn-hash-compute')?.addEventListener('click', async () => {
            const file = $('hash-file').value; if (!file) { alert('请选择文件'); return; }
            const res = await window.pywebview.api.compute_hash(file, $('hash-algorithm').value);
            const rd = $('hash-result'); rd.innerHTML = res.success ? `<p>${$('hash-algorithm').value.toUpperCase()}: <code>${res.hash}</code></p>` : `<p style="color:red">错误: ${res.error}</p>`;
        });
    }

    if (tool === 'imgconv') {
        $('btn-select-imgconv-file')?.addEventListener('click', async () => { const f = await window.pywebview.api.select_file(); if (f) $('imgconv-file').value = f; });
        $('btn-imgconv-convert')?.addEventListener('click', async () => {
            const file = $('imgconv-file').value, format = $('imgconv-format').value; if (!file) { alert('请选择图片'); return; }
            const res = await window.pywebview.api.convert_image(file, format);
            const rd = $('imgconv-result'); rd.innerHTML = res.success ? `<p style="color:green">转换成功！保存至: ${res.path}</p>` : `<p style="color:red">错误: ${res.error}</p>`;
        });
    }

    if (tool === 'clipboard') {
        const refresh = $('btn-clipboard-refresh'), ta = $('clipboard-text'), save = $('btn-clipboard-save');
        refresh.addEventListener('click', async () => { const res = await window.pywebview.api.get_clipboard_text(); ta.value = res.success ? res.text : '获取失败'; });
        save.addEventListener('click', () => { const blob = new Blob([ta.value], {type:'text/plain'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='clipboard.txt'; a.click(); });
    }

    if (tool === 'ocr') {
        $('btn-select-ocr-file')?.addEventListener('click', async () => { const f = await window.pywebview.api.select_file(); if (f) $('ocr-file').value = f; });
        $('btn-ocr-start')?.addEventListener('click', async () => {
            const file = $('ocr-file').value; if (!file) { alert('请选择图片'); return; }
            $('ocr-text').value = '识别中...';
            const res = await window.pywebview.api.ocr_image(file);
            $('ocr-text').value = res.success ? res.text : '识别失败: ' + res.error;
        });
        $('btn-ocr-save')?.addEventListener('click', () => { const blob = new Blob([$('ocr-text').value], {type:'text/plain'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='ocr_result.txt'; a.click(); });
    }
}

// 搜索过滤
$('tool-search')?.addEventListener('input', e => {
    const kw = e.target.value.toLowerCase();
    document.querySelectorAll('#toolbox-list .tool-card').forEach(c => c.style.display = c.textContent.toLowerCase().includes(kw) ? '' : 'none');
});

// ========== 设置页面 ==========
async function loadSettings() {
    const settings = await window.pywebview.api.get_all_settings();
    $('setting-theme').value = settings.theme;
    $('setting-ai-url').value = settings.ai_url;
    $('setting-ai-key').value = settings.ai_key;
    $('setting-ai-model').value = settings.ai_model || 'gpt-3.5-turbo';
    $('setting-plugin-path').value = settings.plugin_path;
    $('setting-data-path').value = settings.data_path;
    $('setting-tts-enabled').checked = settings.tts_enabled === 'true';
    $('setting-tts-voice').value = settings.tts_voice;
    $('setting-island-shortcut').value = settings.island_shortcut;
    $('setting-island-timeout').value = settings.island_timeout;
    $('setting-language').value = settings.language || 'zh';
    $('setting-close-action').value = settings.close_action;
    $('setting-close-no-ask').checked = settings.close_no_ask === 'true';
    $('setting-autostart').checked = settings.autostart === 'true';
    if ($('tts-voice-item')) $('tts-voice-item').style.display = settings.tts_enabled === 'true' ? '' : 'none';
    // 应用语言
    applyLanguage(settings.language || 'zh');
}
async function saveCurrentSettings() {
    const settings = {
        theme: $('setting-theme').value,
        ai_url: $('setting-ai-url').value,
        ai_key: $('setting-ai-key').value,
        ai_model: $('setting-ai-model').value,
        plugin_path: $('setting-plugin-path').value,
        tts_enabled: ($('setting-tts-enabled')?.checked || false).toString(),
        tts_voice: $('setting-tts-voice').value,
        island_shortcut: $('setting-island-shortcut').value,
        island_timeout: $('setting-island-timeout').value,
        language: $('setting-language').value,
        close_action: $('setting-close-action').value,
        close_no_ask: ($('setting-close-no-ask')?.checked || false).toString(),
        autostart: ($('setting-autostart')?.checked || false).toString()
    };
    await window.pywebview.api.save_all_settings(settings);
    // 同步语言切换
    applyLanguage(settings.language);
}
$('setting-theme')?.addEventListener('change', () => { toggleTheme($('setting-theme').value); saveCurrentSettings(); });
$('setting-tts-enabled')?.addEventListener('change', () => { const vi = $('tts-voice-item'); if (vi) vi.style.display = $('setting-tts-enabled').checked ? '' : 'none'; saveCurrentSettings(); });
$('btn-select-plugin-path')?.addEventListener('click', async () => { const f = await window.pywebview.api.select_folder(); if (f) { $('setting-plugin-path').value = f; saveCurrentSettings(); } });
document.querySelector('.toggle-password-btn')?.addEventListener('click', () => {
    const pwd = $('setting-ai-key'), icon = document.querySelector('.toggle-password-btn i');
    if (!pwd || !icon) return;
    if (pwd.type === 'password') { pwd.type = 'text'; icon.classList.replace('fa-eye', 'fa-eye-slash'); }
    else { pwd.type = 'password'; icon.classList.replace('fa-eye-slash', 'fa-eye'); }
});
$('btn-save-settings')?.addEventListener('click', saveCurrentSettings);
$('btn-check-update')?.addEventListener('click', () => window.pywebview.api.open_github());
$('btn-support')?.addEventListener('click', () => window.pywebview.api.open_support());
$('btn-uninstall')?.addEventListener('click', async () => { if (confirm('确定卸载？')) alert(await window.pywebview.api.uninstall_app()); });

// 语言下拉框直接切换
$('setting-language')?.addEventListener('change', () => {
    applyLanguage($('setting-language').value);
    saveCurrentSettings(); // 自动保存
});

// ========== 扩展页面 ==========
async function loadExtensions() {
    const list = await window.pywebview.api.get_extensions();
    const container = $('extensions-list'); container.innerHTML = '';
    list.forEach(ext => {
        const card = document.createElement('div'); card.className = 'extension-card';
        card.innerHTML = `<i class="fa-solid fa-puzzle-piece"></i><h4>${ext.name}</h4><button class="remove-ext-btn" data-name="${ext.name}">卸载</button>`;
        container.appendChild(card);
    });
    document.querySelectorAll('.remove-ext-btn').forEach(btn => btn.addEventListener('click', async () => {
        if (confirm(`确定卸载 "${btn.dataset.name}"？`)) { await window.pywebview.api.remove_extension(btn.dataset.name); loadExtensions(); }
    }));
}
$('btn-add-extension')?.addEventListener('click', async () => { const res = await window.pywebview.api.add_extension(); if (res.success) loadExtensions(); else alert('安装失败: ' + res.error); });

// ========== 关于页面 ==========
$('link-github')?.addEventListener('click', e => { e.preventDefault(); window.pywebview.api.open_github(); });

// ========== 关闭对话框 ==========
window.showCloseDialog = function() {
    const lang = $('setting-language')?.value || 'zh';
    const msg = i18n[lang]?.close_ask || 'Close window:\nOK -> Exit\nCancel -> Minimize to tray';
    if (confirm(msg)) {
        window.pywebview.api.tray_exit();
    } else {
        window.pywebview.api.minimize_to_tray();
    }
};

// ========== 对话岛 ==========
const island = $('ai-island'), islandInput = $('island-input'), islandSend = $('btn-send'), islandChatMessages = $('chat-messages');
let islandChatHistory = [];
window.toggleIsland = function() { if (island.classList.contains('minimized')) { island.classList.remove('minimized'); islandInput.focus(); } else { island.classList.add('minimized'); } };
async function sendIslandMessage() {
    const msg = islandInput.value.trim(); if (!msg) return; islandInput.value = '';
    appendIslandMessage('user', msg); islandChatHistory.push({role:'user', content:msg});
    window.pywebview.api.start_ai_stream(msg, islandChatHistory.slice(-6));
}
function appendIslandMessage(role, content) { const d = document.createElement('div'); d.className = `message ${role}`; d.textContent = content; islandChatMessages.appendChild(d); islandChatMessages.scrollTop = islandChatMessages.scrollHeight; }
window.receiveAIChunk = function(chunk) { updateIslandMessage(chunk); updateChatTabMessage(chunk); };
window.finishAIStream = function() { finishIslandMessage(); finishChatTabMessage(); };
function updateIslandMessage(chunk) { const l = islandChatMessages.lastElementChild; if (l && l.classList.contains('ai')) l.textContent += chunk; else appendIslandMessage('ai', chunk); islandChatMessages.scrollTop = islandChatMessages.scrollHeight; }
function finishIslandMessage() { const l = islandChatMessages.lastElementChild; if (l?.classList.contains('ai')) islandChatHistory.push({role:'assistant', content:l.textContent}); }
islandSend.addEventListener('click', sendIslandMessage);
islandInput.addEventListener('keypress', e => { if (e.key==='Enter') sendIslandMessage(); });
$('btn-voice-input')?.addEventListener('click', () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) { alert('不支持语音'); return; }
    const rec = new SR(); rec.lang = 'zh-CN'; rec.start(); rec.onresult = e => { islandInput.value = e.results[0][0].transcript; sendIslandMessage(); };
});

// ========== AI 对话标签页 ==========
const chatTabMessages = $('chat-tab-messages'), chatTabInput = $('chat-tab-input'), chatTabSend = $('chat-tab-send');
let chatTabHistory = [];
async function loadChatTabAvatars() { const p = await window.pywebview.api.load_user_profile(); return { userAvatar: p.avatar_path || 'assets/sui_stand.png', aiAvatar: 'assets/sui_stand.png' }; }
async function sendChatTabMessage() {
    const msg = chatTabInput.value.trim(); if (!msg) return; chatTabInput.value = '';
    const {userAvatar, aiAvatar} = await loadChatTabAvatars();
    appendBubble('user', msg, userAvatar); chatTabHistory.push({role:'user', content:msg});
    const id = 'ai-bubble-'+Date.now(); const b = document.createElement('div'); b.className='bubble-row ai'; b.id=id;
    b.innerHTML = `<img src="${aiAvatar}" class="bubble-avatar" onerror="this.style.display='none'"><div class="bubble-content"></div>`;
    chatTabMessages.appendChild(b); chatTabMessages.scrollTop = chatTabMessages.scrollHeight;
    window._currentAiBubbleId = id;
    window.pywebview.api.start_ai_stream(msg, chatTabHistory.slice(-10));
}
function appendBubble(role, content, avatarSrc) {
    const row = document.createElement('div'); row.className = `bubble-row ${role}`;
    const avatarHtml = avatarSrc ? `<img src="${avatarSrc}" class="bubble-avatar" onerror="this.style.display='none'">` : '';
    row.innerHTML = `${role==='ai' ? avatarHtml : ''}<div class="bubble-content">${content}</div>${role==='user' ? avatarHtml : ''}`;
    chatTabMessages.appendChild(row); chatTabMessages.scrollTop = chatTabMessages.scrollHeight;
}
function updateChatTabMessage(chunk) {
    const id = window._currentAiBubbleId; if (!id) return;
    const b = document.getElementById(id); if (!b) return;
    const c = b.querySelector('.bubble-content'); if (c) { c.textContent += chunk; chatTabMessages.scrollTop = chatTabMessages.scrollHeight; }
}
function finishChatTabMessage() {
    const id = window._currentAiBubbleId; if (!id) return;
    const b = document.getElementById(id); if (b) { const c = b.querySelector('.bubble-content'); if (c?.textContent) chatTabHistory.push({role:'assistant', content:c.textContent}); }
    window._currentAiBubbleId = null;
}
chatTabSend.addEventListener('click', sendChatTabMessage);
chatTabInput.addEventListener('keypress', e => { if (e.key==='Enter') sendChatTabMessage(); });
$('page-ai-chat').style.display = 'none';