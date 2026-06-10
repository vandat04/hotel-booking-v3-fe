@echo off
if "%1"=="" goto usage
if "%1"=="local" goto run
if "%1"=="prod" goto run
goto usage

:run
powershell -ExecutionPolicy Bypass -File "%~dp0switch-env.ps1" %1
goto end

:usage
echo Usage: switch-env.bat [local^|prod]
echo Example: switch-env.bat local
exit /b 1

:end
