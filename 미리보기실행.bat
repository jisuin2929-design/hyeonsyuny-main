@echo off
:: ====================================================================
::  호그와트 1000일 기념 사이트 로컬 미리보기 서버
::
::  [1] 일반 브라우저 (Chrome / Edge):
::      http://localhost:8080/
::
::  [2] IDE 내장 Simple Browser (에디터 분할창):
::      1. Ctrl + Shift + P
::      2. Simple Browser: Show 실행
::      3. 주소 입력: http://127.0.0.1:8080/
:: ====================================================================

cd /d "%~dp0"
powershell.exe -ExecutionPolicy Bypass -NoProfile -File "%~dp0server.ps1"
if %errorlevel% neq 0 pause
