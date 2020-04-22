@echo off
setlocal
set distpath=coms
set registry=http://registry.npm.taobao.org
call npm install typescript@latest --registry=%registry%
copy node_modules\typescript\LICENSE.txt %distpath%\typescript\LICENSE.txt
copy node_modules\typescript\AUTHORS.md %distpath%\typescript\AUTHORS.md
copy node_modules\typescript\lib\typescript.js %distpath%\typescript\index.js
call node tools\readHelpersFromTypescript.js
call npm uninstall typescript

call npm install esprima@latest --registry=%registry%
copy node_modules\esprima\LICENSE.BSD %distpath%\esprima\LICENSE.BSD
copy node_modules\esprima\dist\esprima.js %distpath%\esprima\index.js
call npm uninstall esprima

call npm install escodegen@latest --registry=%registry%
copy node_modules\escodegen\LICENSE.BSD %distpath%\escodegen\LICENSE.BSD
call cjsify escodegen\escodegen.js -o %distpath%\escodegen\index.js -r node_modules -x escodegen
echo module.exports = this.escodegen;>>%distpath%\escodegen\index.js
call npm uninstall escodegen

call npm install esmangle@latest --registry=%registry%
copy node_modules\esmangle\LICENSE.BSD %distpath%\esmangle\LICENSE.BSD
call cjsify esmangle\lib\esmangle.js -o %distpath%\esmangle\index.js -r node_modules -x esmangle
echo module.exports = this.esmangle;>>%distpath%\esmangle\index.js
call npm uninstall esmangle

REM call %~dp0update-less.bat

rd /q /s node_modules

if exist package-lock.json del package-lock.json