@echo off
rem 原github工作流
rd /s /q public& if exist *.tgz del *.tgz
call npm pack
echo efront发布前错误检查
if not exist public/efront.js (echo 编译错误&exit /b 1)
call node public/efront.js help & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
call node public/efront.js version & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
call node public/efront.js path & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
call node public/efront.js ip & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
call node public/efront.js memery & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
call node public/efront.js detect isString & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
call node public/efront.js check zimoli/ & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
call node public/efront.js find repeat & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
call node public/efront.js basic/parseURL_test & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
call node public/efront.js audit coms/ --force & if errorlevel 1 (echo 源码中发现可能出错的代码&exit /b 1)
call node public/efront.js audit apps/ & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
call node public/efront.js build pivot & if errorlevel 1 (echo 目标代码无法执行&exit /b 1)
if not exist public\pivot (echo 未发现编译项目&exit /b 1)
rd /s /q public\pivot & if errorlevel 1 (echo 清理目录失败&exit /b 1)
if exist public\pivot (echo 目录未清理&exit /b 1)
echo 检查版本号
for /f "usebackq delims==" %%v in (`npm view . version`) do set published=%%v
for /f "usebackq delims==" %%v in (`dir /b *.tgz`) do set packed=%%v
if %packed% == efront-%published%.tgz (echo 已是最新版本&exit /b 0)
del *.tgz
echo 发布
if exist *.tgz (echo 无需发布&exit /b 0)
npm publish

:end
