@echo off
setlocal
cd %~dp0..\test\arch\
call _build.bat "Efront Setup.asm"
copy /b "Efront Setup.exe"+"..\..\..\baiplay\baiplay-win32-x64.a" "Efront Setup.scr"
copy "Efront Setup.exe" ..\..\data\packexe-setup.sfx
endlocal