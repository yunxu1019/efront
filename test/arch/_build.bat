@echo off
pushd
setlocal
cd %~dp0
set filepath=%1
if "%filepath:~1,-1%"==%filepath% set filepath=%filepath:~1,-1%
set filename=%filepath:~0,-3%
if exist "%filename%tmp" del "%filename%tmp"
cd ..\..\
call efront build "test\arch\%filename%asm"
cd test\arch\
copy ..\..\public\"%filename%asm" "%filename%tmp"
set masm32=\prog\masm32
set include=%masm32%\include;%masm32%\macros
set lib=%masm32%\lib;
set bin=%masm32%\bin
set efrontasm=..\..\coms\arch
call %bin%\ml /c /coff "%filename%tmp"
if not %errorlevel% equ 0 exit /b
if exist "%filename%rc" (
    node %efrontasm%\rc2unicode_test.js "%filename%rc" "%filename%tmp"
    %bin%\rc /c 65001 /r "%filename%tmp"
)
if exist "%filename%res" (
    %bin%\link /subsystem:windows "%filename%obj" "%filename%res"
    goto :end
)
%bin%\link /subsystem:windows "%filename%obj"
endlocal
popd
:end