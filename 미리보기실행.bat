@echo off
chcp 65001 > nul
echo ========================================================
echo   호그와트 1000일 기념 사이트 로컬 미리보기 서버 시작
echo ========================================================
echo.
echo 브라우저에서 사이트를 엽니다...
start "" "http://localhost:8080/"
powershell.exe -ExecutionPolicy Bypass -NoProfile -File "%~dp0server.ps1"
pause
