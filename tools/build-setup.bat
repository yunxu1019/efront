@echo off
setlocal
cd %~dp0..\test\arch\
copy "Efront Setup.exe" ..\..\data\packexe-setup.sfx
call _build.bat "Efront Setup.asm"
@REM copy /b "Efront Setup.exe"+"..\..\..\baiplay\baiplay-win32-x64.a" "Efront Setup.scr"
endlocal