@echo off
setlocal
cd %~dp0..\test\arch\
call _build.bat "Efront Setup.asm"
copy "Efront Setup.exe" ..\..\data\packexe-setup.sfx
call efront packexe ..\..\public #≤‚ ‘abc-64.scr
call efront packexe ..\..\public #≤‚ ‘abc-32.scr
endlocal