chcp 936
rem 默认应用
if not defined app set APP=zimoli
REM set HTTPS_PORT=444

rem https证书路径
rem 把以下值写入.\cert\private.bat 以阻止提交
REM set PATH.SSL_PFX=%~DP0cert\efront.cc.pfx
REM set PASSWORD.SSL_PFX=%ssl证书密码%
@if exist "%~dp0cert\private.bat" @call "%~dp0cert\private"
