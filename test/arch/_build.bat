@echo off
pushd
setlocal
cd %~dp0
set masm32=/prog/masm32
set include=%masm32%/include
set lib=%masm32%/lib
set bin=%masm32%/bin
set efrontasm=..\..\coms\arch

set filepath=%1
if "%filepath:~1,-1%"==%filepath% set filepath=%filepath:~1,-1%
set filename=%filepath:~0,-3%
node %efrontasm%\asm2unicode_test.js "%filename%asm">"%filename%tmp"
ml /c /coff /Cp "%filename%tmp"
if exist "%filename%rc" (
    node %efrontasm%\rc2unicode_test.js "%filename%rc" "%filename%tmp"
    rc /c 65001 /r "%filename%tmp"
)
if exist "%filename%res" (
    link /subsystem:windows "%filename%obj" "%filename%res"
    goto :end
)
link /subsystem:windows "%filename%obj"
endlocal
popd
:end