@echo off
chcp 65001 >nul
echo ========================================
echo     SuiWork - 初始化依赖环境
echo ========================================
echo.

:: 切换到脚本所在目录
cd /d "%~dp0"

:: 检查 Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Python，请先安装 Python 并添加到 PATH。
    pause
    exit /b 1
)
echo [检测] Python 已安装
echo.

:: 创建虚拟环境（如果不存在）
if not exist "venv\Scripts\activate.bat" (
    echo [创建] 正在创建虚拟环境 venv ...
    python -m venv venv
    if %errorlevel% neq 0 (
        echo [错误] 虚拟环境创建失败。
        pause
        exit /b 1
    )
    echo [成功] 虚拟环境创建完成。
) else (
    echo [跳过] 虚拟环境已存在。
)
echo.

:: 激活虚拟环境并安装依赖
echo [安装] 正在安装依赖包 ...
call venv\Scripts\activate.bat
pip install pywebview requests beautifulsoup4 Pillow pywin32 keyboard pyperclip pytesseract pystray pyinstaller -i https://pypi.tuna.tsinghua.edu.cn/simple
if %errorlevel% neq 0 (
    echo [错误] 依赖安装失败，请检查网络。
    pause
    exit /b 1
)
echo [成功] 依赖安装完成。
echo.

:: 生成 requirements.txt
pip freeze > requirements.txt
echo [信息] 已生成 requirements.txt
echo.

echo ========================================
echo     环境初始化全部完成！
echo     请确保已安装 Tesseract-OCR 引擎：
echo     下载地址: https://github.com/UB-Mannheim/tesseract/wiki
echo     安装后如未加入 PATH，请在设置中指定 tesseract 路径。
echo.
echo     双击 run.bat 启动 SuiWork
echo ========================================
pause