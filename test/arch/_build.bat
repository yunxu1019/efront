@echo off
pushd
setlocal
cd %~dp0
set masm32=/prog/masm32
set include=%masm32%/include;%masm32%/macros
set lib=%masm32%/lib;
set bin=%masm32%/bin
set efrontasm=..\..\coms\arch

set filepath=%1
if "%filepath:~1,-1%"==%filepath% set filepath=%filepath:~1,-1%
set filename=%filepath:~0,-3%
cd ..\..\
call efront build "test\arch\%filename%asm"
cd test\arch
del "%filename%tmp"
copy ..\..\public\"%filename%asm" "%filename%tmp"
call ml /c /coff "%filename%tmp"
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