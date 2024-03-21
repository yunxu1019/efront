:<<a
goto :win
a
if test -L $0; then
dp=`cd $(dirname $0);cd $(dirname $(readlink $0)); pwd -P`
else
dp=`cd $(dirname $0); pwd -P`
fi
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
