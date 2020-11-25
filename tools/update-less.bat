@chcp 936
@echo off
setlocal
if not defined registry set registry=http://registry.npm.taobao.org

if not exist node_modules/less call npm install less@latest --registry=%registry%

if not exist node_modules/less goto :error1

set coms_path=node_modules\less\lib,node_modules,coms\typescript-helpers
set coms=./
set public_path=coms\less-node
set page=./
set app=./less/index.js
set destpath=%public_path%\index.js
set resultname=less
set resultfile=%public_path%\%resultname%
set export_to=module.exports
set export_as=default


call git reset %destpath%
call node coms/efront publish %*
if not exist %resultfile% goto :error2
if exist %destpath%  del %destpath%
move %resultfile% %destpath%
node %destpath%
if errorlevel == 1 goto :recover

goto :end

:error1
echo 安装失败
goto :end
:error2
echo 编译失败
goto :end
:recover
echo 编译代码无法执行，下次启动前请还原
goto :end


:end
call npm uninstall less
if exist package-lock.json del package-lock.json
endlocal