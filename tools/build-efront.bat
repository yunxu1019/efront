@chcp 936
@echo off
cls
setlocal

set coms_path=./coms
set public_path=public
set page=./coms/efront
set app=efront/index.js
set extt=.js
set coms=./
set libs_path=coms/libs
set destpath=public\efront.js
call efront publish
goto :end

:end