@chcp 936
@echo off
cls
setlocal
pushd
cd %~dp0..
echo %cd%
set coms_path=./coms
set page_path=./coms
set public_path=./public
set export_to=node
set page=./
set app=efront/index.js
set extt=.js
set coms=./,reptile
set symbol_regexp=^^[A-Z][a-z]+\_^|(Statement^|Pattern^|Expression^|Declaration^|Element^|Node^|Literal^|^^Property^$)^$
set destpath=efront.js
if exist "%public_path%" rd /s /q "%public_path%"
call %~dp0\run-efront.bat publish %*
popd
endlocal
goto :end
:end