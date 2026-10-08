@echo off
cd /d "%~dp0"
powershell.exe -ExecutionPolicy Bypass -NoProfile -File "%~dp0server.ps1"
if %errorlevel% neq 0 pause
