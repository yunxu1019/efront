@echo off
setlocal
set distpath=coms
set registry=http://registry.npm.taobao.org
call :typescript %*
@REM call :esprima --no-optimize --no-compress %*
@REM call :esmangle --no-optimize --no-compress %*
@REM call :escodegen --no-optimize --no-compress %*
@REM call :lessnode --uplevel --no-crypt --comment %*
del package-lock.json
rd /s /q node_modules
exit /b 0

:typescript
call npm install typescript@latest --registry=%registry%
copy node_modules\typescript\LICENSE.txt %distpath%\typescript\LICENSE.txt
copy node_modules\typescript\AUTHORS.md %distpath%\typescript\AUTHORS.md
copy node_modules\typescript\lib\typescript.js %distpath%\typescript\index.js
call efront pick %distpath%\typescript\index.js %distpath%\typescript\index.js ts.transpile
echo module.exports=ts;>>%distpath%\typescript\index.js
call node tools\readHelpersFromTypescript.js
call npm uninstall typescript

goto :eof

:esprima
call npm install esprima@latest --registry=%registry%
copy node_modules\esprima\LICENSE.BSD %distpath%\esprima\LICENSE.BSD
copy node_modules\esprima\dist\esprima.js %distpath%\esprima\index.js
call node coms\efront publish ./index.js --coms_path=coms/esprima --coms=./ --extt=.js --no-crypt --export_to=module.exports --public_path=coms/esprima --no-polyfill %*
call npm uninstall esprima
goto :eof

:escodegen
call npm install escodegen@latest --registry=%registry%
copy node_modules\escodegen\LICENSE.BSD %distpath%\escodegen\LICENSE.BSD
set coms_path=node_modules\escodegen\,node_modules
set coms=./
set page=./
set app=./escodegen.js
set export_to=module.exports
set public_path=coms\escodegen
set extt=.js
call node coms/efront publish --no-polyfill --no-crypt %*
if exist coms\escodegen\index.js del coms\escodegen\index.js
move coms\escodegen\escodegen.js coms\escodegen\index.js
call npm uninstall escodegen
goto :eof

:esmangle
call npm install esmangle@latest --registry=%registry%
copy node_modules\esmangle\LICENSE.BSD %distpath%\esmangle\LICENSE.BSD
set coms_path=node_modules\esmangle\lib,node_modules
set coms=./
set page=./
set app=./esmangle.js
set export_to=module.exports
set public_path=coms\esmangle
set extt=.js
call node coms/efront publish --no-polyfill --no-crypt %*
if exist coms\esmangle\index.js del coms\esmangle\index.js
move coms\esmangle\esmangle.js coms\esmangle\index.js
call npm uninstall esmangle
goto :eof

:lessnode
call npm install less@latest --registry=%registry%
set coms_path=node_modules\less\lib,node_modules
set coms=./
set page=./
set app=./less/index.js
set export_to=module.exports
set public_path=coms\less-node
set extt=.js
set export_as=default
call node coms/efront publish --no-polyfill --no-crypt %*
if exist coms\less-node\index.js del coms\less-node\index.js
move coms\less-node\less.js coms\less-node\index.js
call npm uninstall less
goto :eof

REM call %~dp0update-less.bat

rd /q /s node_modules

if exist package-lock.json del package-lock.json