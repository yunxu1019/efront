@echo off
setlocal
cd %~dp0..\test\arch\
call _build.bat "Efront Setup.asm"
@REM dumpbin /dependents "Efront Setup.exe"
copy "Efront Setup.exe" ..\..\data\packexe-setup.sfx
call efront packexe ..\..\public #测试abc-64.scr H:\丰县白前软件工作室\不枝雀-
call efront packexe ..\..\public #测试abc-32.scr H:\丰县白前软件工作室\不枝雀-
endlocal