chcp 936
rem Ĭ��Ӧ��
@REM if not defined app set APP=zimoli
REM set HTTPS_PORT=444

rem https֤��·��
rem ������ֵд��.\cert\private.bat ����ֹ�ύ
REM set PATH.SSL_PFX=%~DP0cert\efront.cc.pfx
REM set PASSWORD.SSL_PFX=%ssl֤������%
@if exist "%~dp0cert\private.bat" @call "%~dp0cert\private"
