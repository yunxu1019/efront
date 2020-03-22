REM 中文编码gb2312
rem 默认应用
if not defined app set APP=zimoli
rem database
REM set HTTPS_PORT=444

rem https证书路径
rem 把以下值写入.\cert\private.bat 以阻止提交
REM set PATH.SSL_PFX=%~DP0cert\efront.cc.pfx
REM set PASSWORD.SSL_PFX=%ssl证书密码%
@if exist "%~dp0cert\private.bat" @call "%~dp0cert\private"

rem 前文已配置的所有参数可用 app=%app%.bat 重写
REM @for %%i in (%app%) do @call "%~DP0app=%%i"

rem 应用发布路径
REM if "%cd%\_envs\"=="%~dp0" set default_public_path="%~dp0..\public"
REM if "%cd%/_envs/"=="%~dp0" set default_public_path="%~dp0../public"
REM if not defined default_public_path set default_public_path="./"
REM if not defined public_path set PUBLIC_PATH=%default_public_path%
REM if not defined apis_path set APIS_PATH="%~dp0..\apis"
REM if not defined apps_path set APPS_PATH="%~dp0..\apps"
REM if not defined coms_path set COMS_PATH="%~dp0..\coms"
REM if not defined icons_path set ICONS_PATH="%~dp0..\cons"