# efront 说明

efront运行在node环境下，请在安装node环境后使用https://nodejs.org。

## 基本命令（适用于windows）

###    1. 下载安装

从npm全局安装efront
```bat
npm install -g efront
```

###    2. 创建项目

```bat
set app=PROJECT_NAME
efront init
```
其中`PROJECT_NAME`为你的项目的名称

###    3. 开发环境启动

如果80端口不可用，请修改http_port环境变量

```bat
set HTTP_PORT=8080
```
开启本机服务，在访问端口时不对代码进行压缩

```bat
efront test
```

###    4. 压缩编译项目
默认将编译输出的目标代码保存到public目录
可以把public目录的代码发布到任意服务器上
```bat
efront public
```
###    5.生产环境启动
开启本机服务器，并在访问端口时压缩输出
```bat
efront start
```

## 目录说明

01. _envs 环境配置存放位置
02. apis 对外公开的接口，可通过https post方式访问
03. apps 静态app页面通过get或post方式访问
04. coms 组件库
05. cons 图标库
06. imgs 临时用于存放二进制对象，可能会在未来的版本删除
07. public 静态资源发布目录，用于存放编译的目标文件

## 调试说明
调试模式下仅支持启动一个辅进程

## 命名
禁止使用page,aapi,comm,ccon作为项目名称

## 安全性
apps、coms 安全性极低，不要把重要信息放在这两个目录