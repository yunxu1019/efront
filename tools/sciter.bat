@echo off
setlocal
cd %~dp0..
@REM call efront build blank.html --sciter --uplevel
%~dp0..\..\sciter-js-sdk-main\bin\windows\x64\scapp.exe %~dp0sciter.html
@REM %~dp0..\..\sciter-js-sdk-main\bin\windows\x64\scapp.exe %~dp0..\public\blank\index.html