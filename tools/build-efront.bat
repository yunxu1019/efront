@chcp 936
@echo off
cls
setlocal
pushd
cd %~dp0..
set coms_path=./coms,
set page_path=./coms
set public_path=./public
set export_to=node
set page=./
set app=efront/index.js
set extt=.js
set coms=./
set libs_path=./
set libs=typescript,esprima,escodegen,esmangle,pngjs,less-node
set destpath=efront.js
rd /s /q %public_path%
call node . publish
popd
goto :end
:end