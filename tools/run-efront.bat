:<<a
goto :win
a
dp=`dirname $0`
export libs_path=$dp/../coms
#export coms_path=./coms
export libs=typescript,esprima,escodegen,esmangle,pngjs,less-node
node $dp/../coms/efront ./efront/index.js $*
exit


:win
set libs_path=%~dp0../coms
@REM set coms_path=%~dp0../coms
set libs=typescript,esprima,escodegen,esmangle,pngjs,less-node
node %~dp0../coms/efront ./efront/index.js %*
