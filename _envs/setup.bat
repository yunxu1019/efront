REM 先只支持单应用吧
set APPS=zimoli
@for %%i in (%apps%) do @call "%~DP0app=%%i"