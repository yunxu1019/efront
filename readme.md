
# efront 思想

1. 每个文件只导出一份数据，这一份数据可以是 boolean,number,string,function,object,bigint,null,undefined 中的任意一种
2. 文件名即变量名，在其他文件中引用当前文件导出的变量，只要使用当前文件的文件名（不含后缀）即可
3. 无环形引用（相互调用：a引用b，b引用a；首尾引用：a引用b，b引用...c，c引用a）
4. 减少异步io的时间，应用启动过程只加载有用代码，启动完成后等待用户操作的同时预加载下一步的代码
5. 版本局部更新，异步加载的每一份代码拥有一个独立的版本号，在版本信息无变化时不重复加载

# efront 功能列表

1. 提供 0 秒启动的开发服务器，允许代码在浏览器中完成依赖项的异步加载
2. 提供 “按文件名引用的代码” 的编译环境，允许开发者不写 `import`, `require` 等语句
3. 提供具有环形检查的加载器
4. 自动识别并附加预加载的逻辑
5. 编译使用 `efront` 内置库的应用自动追加检查缓存的逻辑并生成代码版本号
6. `efront` 服务器提供跨域中转功能
7. `efront` 编译导出的组件对可能造成代码可读的字符串和属性进行提取和加密

# 基本命令（适用于windows）

## 1. 下载安装

`efront` 运行在 [nodejs](https://nodejs.org/zh-cn/) 环境下，请在安装 [nodejs](https://nodejs.org/zh-cn/) 环境后使用。
从npm全局安装efront

```bat
npm install -g efront
```

## 2. 查看帮助系统

```bat
efront help
```

## 3. 启动开发环境服务器

```bat
efront live
efront live HTTP_PORT
efront live HTTP_PORT HTTPS_PORT
```

其中端口号为数字，可以不输入，更多使用方案可以查看帮助系统。要禁用https服务端口开启时的警告信息，可以配置自己的pfx格式的证书路径和证书密码。

## 4. 压缩编译项目

默认将编译输出的目标代码保存到public目录
可以把public目录的代码发布到任意服务器上

```bat
set app=PROJECT_NAME
set public_path=PUBLIC_PATH
efront public
```

其中`PUBLIC_PATH`为发布路径

* 如果是要发布在服务器上，不建议使用以`.html`结尾的方式发布，将异步加载的代码写入独立的文件

* 如果要导出无服务器本地可以访问的项目，可以设置一个以`.html`结尾的项目名，将异步加载的代码合并到首页文件

```bat
set app=PROJECT_NAME.html
```

* 如果要导出组件，可以设置一个以`.js`结尾的项目名

```bat
set app=PROJECT_NAME.js
```

* 目前版本的efront提供对 commonjs中的require语法和es6中的import语法 的不完全支持（不支持异步环形调用），对于符合要求的相关项目，可以进行编译发布。
* 如果要发布含有require语法的组件，并希望将组件及所有依赖项合并输出，那么可以将上面的`efront public`替换为`efront publish`

* 如果需要自动识别路径，类似`public`/`dist`/`output`/`release`的目录都可能被识别为目标路径，这些路径中的文件可能被覆盖，如果确认可行，可以使用`efront build`

## 5.Watch模式

监测文件变化，自动编译更新的部分并输出到指定目录

```bat
set app=PROJECT_NAME
set public_path=PUBLIC_PATH
efront watch
```

# 目录说明

01. apps 静态app页面，通过get或post方式访问
02. coms 组件库
03. public 静态资源发布目录，用于存放编译的目标文件

# 配置项说明

efront 优先读取系统环境变量中的配置，也可以将配置信息写入配置文件。
efront 默认读取当前路径下的`_envs/`和用户目录的`.efront/_envs/`进行环境配置的初始化（如果要修改默认环境配置的路径，可以在系统环境变量中设置`CONFIG_PATH`，多个目录可以用英文逗号分开），其中的`setup.bat`为环境配置的入口，访问工作目录的某个子项目`APP`时，还将自动读取`_envs/app=%APP%.bat`中的配置。

| 配置项 |说明|
|--|--|
| `APP` | 应用名，影响最终生成应用的路径和默认的源文件路径
| `PAGE_PATH`| 页面文件所存放的根路径，默认为`./apps`
| `COMM_PATH`| 组件文件所存放的根路径，如果存在多个，可以用 `,` 分割，可以使用 `:` 指定为`efront`所提供的组件的路径，默认为`./coms`
| `PUBLIC_PATH`| 发布的目标根路径，最终生成的代码路径为`PUBLIC_PATH\APP`，如果此项被指定为`PAGE_PATH`，efront将禁用发布功能，在执行`efront start`后，可以通过浏览器访问压缩版本的代码
| `PUBLIC_EXTT`| 发布的目标代码的扩展名，默认无扩展名
| `PAGE`| 页面文件存放的路径，默认为应用名`APP`
| `COMM`| 组件文件存放的路径，默认为应用名加efront默认组件库`APP,zimoli`
| `PREFIX`| 发布时指定组件className前缀，默认无前缀
| `PATH.SSL_PFX`| ssl证书的路径
| `PASSWORD.SSL_PFX`| ssl证书密码

# 功能选项

* efront 启动的服务器，默认提供跨域中转的功能，可以在index.html的头部脚本中设置`window.cross_host='https://somehost/'`指定一个具体的efront服务器实例供cross方法使用
* efront 默认禁用了首页的缓存功能，如果要启用，可以在头部script中加入 `window.preventCache=false;`
* efront 默认禁止在iframe中运行，如果要开启，可以在头部script中加入 `window.PREVENT_FRAMEWORK_MODE=false;`
* efront 默认的初始化脚本是`zimoli('/main');`，可以在body标签上加上`main-path=...`属性指定初始化脚本的路径
* efront 默认将`page_path`指向的路径中的`.ts,.js,.less,.html`文件识别为页面文件，可以在index.html加上`<script src='libpath/*' type=deleteoncompile></script>`，其中`libpath/*`指向静态文件的路径，efront编译过程将识别并做出正确的处理
* 如果仅做为跨域服务器使用，可以将开发环境的url改写为如下形式，以使返回结果加上跨域头：
`http://EFRONT_HOST/{//BACKEND_HOST:PORT/}@APIPATH`
<br/>如：
如果在本机的88端口启动efront服务器，要访问`http://im.qq.com/` ，可以请求`http://localhost:88/{//im.qq.com/}@`取得带跨域头的数据

# 注意事项

* efront 为组件生成的较长的 `className` 选择器 (含中划线，如`.comm-button`)可能会发生变化，如果要为嵌入的组件设置样式，可以使用 efront 为其生成的较短的 `className` 选择器 (不含中划线`-`，如`.button`)
* efront 将不在首字符位置的`$`识别为快捷分割符，以便以变量名的方式引入多级文件夹中的模块，文件命名时不要在文件名的中间位置使用`$`符号
* with 语句中的变量无法准确识别，最好不要使用。如果非要在efront环境下使用，请在with语句外提前声明，with中出现的未声明的变量。
* 如果要导出无服务器项目，不要使用异步方法加载本地文件的数据

# 相关链接

[与前端框架对比](docs/compare.md)

[播放器 demo 在线实例](http://efront.cc/kugou/)

[手机商城组件](http://github.com/yunxu1019/qfy)

[更新日志](https://github.com/yunxu1019/efront/commits/develop)

[【导购】阿里云服务器](https://www.aliyun.com/minisite/goods?userCode=4gklptno)
