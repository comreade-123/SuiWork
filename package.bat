@echo off
chcp 65001 >nul
echo ========================================
echo   SuiWork Windows 一键打包脚本
echo ========================================
echo.

:: 激活虚拟环境
call venv\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo [错误] 无法激活虚拟环境
    pause
    exit /b 1
)

:: 清理旧构建
echo [清理] 正在清理旧构建文件...
if exist "build" rmdir /s /q "build"
if exist "dist" rmdir /s /q "dist"
if exist "*.spec" del /q "*.spec"

:: 开始打包
echo [打包] 开始打包 SuiWork...
pyinstaller ^
    --onefile ^
    --windowed ^
    --name SuiWork ^
    --icon=SuiWork.ico ^
    --add-data "web;web" ^
    --add-data "assets;assets" ^
    --hidden-import=pystray._win32 ^
    --hidden-import=keyboard ^
    --hidden-import=win32gui ^
    --hidden-import=win32con ^
    --hidden-import=winreg ^
    --hidden-import=pyperclip ^
    --hidden-import=pytesseract ^
    --collect-all webview ^
    main.py

if %errorlevel% neq 0 (
    echo [错误] 打包失败，请检查错误信息
    pause
    exit /b 1
)

:: 复制必要资源文件夹（确保程序能找到 web 和 assets）
echo [复制] 正在复制资源文件夹...
xcopy /E /I /Y web dist\web >nul
xcopy /E /I /Y assets dist\assets >nul

:: 重命名输出为带版本号的文件夹
set VERSION=1.1.0
set OUTNAME=SuiWork-%VERSION%-windows-x64
echo [整理] 正在生成发布版本 %OUTNAME%...
if exist "dist\%OUTNAME%" rmdir /s /q "dist\%OUTNAME%"
mkdir "dist\%OUTNAME%"
move "dist\SuiWork.exe" "dist\%OUTNAME%\" >nul
move "dist\web" "dist\%OUTNAME%\" >nul
move "dist\assets" "dist\%OUTNAME%\" >nul

echo.
echo ========================================
echo   打包成功！
echo   发布版本：dist\%OUTNAME%
echo   可将其压缩为 %OUTNAME%.zip 分发。
echo ========================================
pause