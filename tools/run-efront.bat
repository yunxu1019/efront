:<<a
goto :win
a

export libs_path=./
export coms_path=./coms
export libs=typescript,esprima,escodegen,esmangle,pngjs,less-node
node coms/efront ./efront/index.js $*
exit


:win
set libs_path=./
set coms_path=%~dp0/../coms
set libs=typescript,esprima,escodegen,esmangle,pngjs,less-node
node %~dp0/../coms/efront ./efront/index.js %*
