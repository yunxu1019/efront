@chcp 936
@echo off
cls
setlocal

set coms_path=./coms
set page_path=./coms
set public_path=efront
set page=./
set app=efront/index.js
set extt=.js
set coms=./
set libs_path=./
set libs=typescript,esprima,escodegen,esmangle,pngjs,less-node
set destpath=public\efront.js
call efront publish
goto :end

:end