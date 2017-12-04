REM 中文编码gb2312
rem 默认应用
if not defined app set APP=zimoli
set AAPI=zimoli
set ICON=zimoli
set COMM=zimoli
rem database
set DB_HOST=localhost
set DB_PORT=3306
set DB_USERNAME=root
set DB_PASSWORD=root
set DB_DATABASE=%APP%
SET HOST.QINIU=ouxjfkv92.bkt.clouddn.com
rem https证书路径
set PATH.SSL_PFX=%~DP0cert\efront.cc.pfx
rem 把以下值写入.\cert\private.bat 以阻止提交
REM set PASSWORD.SSL_PFX=%ssl证书密码%
REM set KEY.AMAP=%高德地图key%
REM set KEY.QINIU_ACCESS=%七牛云access%
REM set KEY.QINIU_SECRET=%七牛云secret%
REM set KEY.REQUEST_SECRET=%efront通信密钥%
@if exist "%~dp0cert\private.bat" @call "%~dp0cert\private"

rem 前文已配置的所有参数可用 app=%app%.bat 重写
@for %%i in (%app%) do @call "%~DP0app=%%i"

rem 应用发布路径
set PUBLIC_PATH="%~DP0..\public"