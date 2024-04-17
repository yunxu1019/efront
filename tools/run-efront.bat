:<<a
goto :win
a
if test -L $0; then
dp=`cd $(dirname $0);cd $(dirname $(readlink $0)); pwd -P`
else
dp=`cd $(dirname $0); pwd -P`
fi
node $dp/../coms/efront ./efront/index.js $*
exit


:win
node %~dp0../coms/efront ./efront/index.js %*
