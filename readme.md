
`efront`是一套前后端通用编码环境，既可以用来开发纯前端代码，又可以用来开发纯后端代码，当然也可以开发前后端耦合在一起的项目。
`efront`提供了一套纯前端组件库[zimoli](./coms/zimoli)，也提供了一套后端代码库[reptile](./coms/reptile)，您可以通过`efront`的`build`命令，将`efront`所提供的单一组件导出到外部项目使用。


# 基本命令（适用于windows）

##    1. 下载安装
运行在nodejs环境下，请在安装nodejs环境后使用[https://nodejs.org](https://nodejs.org)。
从npm全局安装efront

```bat
npm install -g efront
```

##    2. 创建项目

```bat
set app=PROJECT_NAME
efront init
```
其中`PROJECT_NAME`为你的项目的名称

##    3. 开发环境启动

如果80端口不可用，请修改http_port环境变量

```bat
set HTTP_PORT=8080
```
开启本机服务，在访问端口时不对代码进行压缩

```bat
efront test
```

##    4. 压缩编译项目
默认将编译输出的目标代码保存到public目录
可以把public目录的代码发布到任意服务器上
```bat
set app=PROJECT_NAME
set public_path=PUBLIC_PATH
efront public
```
其中`PUBLIC_PATH`为发布路径

* 如果是要发布在服务器上，不建议使用以`.html`结尾的方式发布，将异步加载的代码写入独立的文件

* 如果要导出本地可以访问的项目，可以设置一个以`.html`结尾的项目名，将异步加载的代码合并到首页文件

```bat
set app=PROJECT_NAME.html
```

* 如果要导出组件，可以设置一个以`.js`结尾的项目名
```bat
set app=PROJECT_NAME.js
```
##    5.生产环境启动
开启本机服务器，并在访问端口时压缩输出
```bat
efront start
```

##    6.Watch模式
监测文件变化，自动编译更新的部分并输出到指定目录
```bat
set app=PROJECT_NAME
set public_path=PUBLIC_PATH
efront watch
```

##    7.启动Demo，可以在浏览器查看效果
```bat
efront demo
```

##   8.组件库举例服务器，可以在浏览器查看一级组件
```bat
efront docs
```

##   9.直接将当前目录作为服务器目录
```
efront
```


# 目录说明

01. _envs 环境配置存放位置
02. apis 对外公开的接口，可通过https post方式访问
03. apps 静态app页面通过get或post方式访问
04. coms 组件库
05. public 静态资源发布目录，用于存放编译的目标文件

# 配置项说明
 * `APP` 应用名，影响最终生成应用的路径和默认的源文件路径
 * `PAGE_PATH` 页面文件所存放的根路径，默认为`./apps`
 * `COMM_PATH` 组件文件所存放的根路径，如果存在多个，可以用 `,` 分割，可以使用 `:` 指定为`efront`所提供的组件的路径，默认为`./coms`
 * `PUBLIC_PATH` 发布的目标根路径，最终生成的代码路径为`PUBLIC_PATH\APP`，如果此项被指定为`PAGE_PATH`，efront将禁用发布功能，在执行`efront start`后，可以通过浏览器访问压缩版本的代码
 * `PAGE` 页面文件存放的路径，默认为应用名`APP`
 * `COMM` 组件文件存放的路径，默认为应用名加efront默认组件库`APP,zimoli`
