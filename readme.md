
[English version](./readme-en.md)

 *efront* 是一个开发工具，可以独立开发项目，也可以仅使用其一项功能
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
5. 自动追加检查缓存的逻辑并生成代码版本号
6. `efront` 服务器提供跨域中转功能
7. `efront` 编译导出的组件对可能造成代码可读的字符串和属性进行提取和加密

# 基本命令（部分命令适用于windows，其他系统类似）

## 1. 下载安装

`efront` 运行在 [nodejs](https://nodejs.org/) 环境下，请在安装 [nodejs](https://nodejs.org/) 环境后使用。
从npm全局安装efront

```bat
npm install -g efront
```
<!-- 如果要在[deno](https://deno.land/)上运行`efront`，您可以使用如下命令
```
deno run --allow-all http://efront.cc/ help
``` -->

## 2. 查看帮助系统

命令行帮助命令如下
```bat
efront help
```

也可以用如下命令启动文档服务器，用浏览器查看帮助信息

```bat
efront docs
```

## 3. 启动开发环境服务器

```bat
efront live
efront live HTTP端口
efront live HTTP端口 HTTPS端口
```

其中`HTTP端口`和`HTTPS端口`为数字，可以不输入，更多使用方案可以查看帮助系统。要禁用https服务端口开启时的警告信息，可以配置自己的ssl证书路径和证书密码。

## 4. 压缩编译项目

默认将编译输出的目标代码保存到public目录
可以把public目录的代码发布到任意服务器上

```bat
set app=PROJECT_NAME
set public_path=PUBLIC_PATH
efront public
```

其中`PUBLIC_PATH`为发布路径，`PUBLIC_PATH`的默认值是当前目录的`public`文件夹

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

* 如果需要自动识别路径，类似`public`/`dist`/`output`/`release`的目录都可能被识别为目标路径，这些路径中的文件可能被覆盖，如果确认可行，可以使用`efront build`或`efront release`

## 5.Watch模式

监测文件变化，自动编译更新的部分并输出到指定目录

```bat
set app=PROJECT_NAME
set public_path=PUBLIC_PATH
efront watch
```

# 可配置项说明

efront 优先读取系统环境变量中的配置，也可以将配置信息写入配置文件。
efront 默认读取当前路径下的`_envs/`和用户目录的`.efront/_envs/`进行环境配置的初始化（如果要修改默认环境配置的路径，可以在系统环境变量中设置`CONFIG_PATH`，多个目录可以用英文逗号分开），其中的`setup.bat`为环境配置的入口，访问工作目录的某个子项目`APP`时，还将自动读取`_envs/app=%APP%.bat`中的配置。

当前版本的`efront`，支持命令行快捷配置环境变量，如

```bat
 efront watch --APP=kugou --PUBLIC_PATH=... --PAGE_PATH=...
```
| 配置项        | 说明                                                                                                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APP`         | 应用名，影响最终生成应用的路径和默认的源文件路径                                                                                                                                                   |
| `PAGE_PATH`   | 页面文件所存放的根路径，默认为`./apps`                                                                                                                                                             |
| `COMM_PATH`   | 组件文件所存放的根路径，如果存在多个，可以用 `,` 分割，可以使用 `:` 指定为`efront`所提供的组件的路径，默认为`./coms`                                                                               |
| `PUBLIC_PATH` | 发布的目标根路径，最终生成的代码路径为`PUBLIC_PATH\APP`，如果此项被指定为`PAGE_PATH`，efront将禁用发布功能，在执行`efront start`后，可以通过浏览器访问压缩版本的代码                               |
| `PUBLIC_EXTT` | 发布的逻辑代码的扩展名，默认`.js`或`.txt`                                                                                                                                                          |
| `PAGE`        | 页面文件存放的路径，默认为应用名`APP`                                                                                                                                                              |
| `COMM`        | 组件文件存放的路径，默认为应用名加efront默认组件库`APP,zimoli`                                                                                                                                     |
| `PREFIX`      | 发布时指定组件className前缀，默认无前缀                                                                                                                                                            |
| `NOPROXY`     | 传统代理，默认在开发环境开启传统代理，在生产环境禁用传统代理                                                                                                                                       |
| `DIRECT`      | 如果是用`pathname`作为单页应用的页面路径，可以配置此参数，以使空路都指向该参数所指定的路径。如果配置为数值，则自动截取用户路径的前几级，如果指定为字符串，则所有空路径都返回该字符串路径下的内容。 |
| `ENTRY_NAME`  | efront默认依次查找文件中声明的`main`,`Main`,`MAIN`,`<文件名>`做为导出对象（入口），用户可配置此环境变量以进行修改                                                                                  |
| `EXTRACT`     | 如果项目有多个入口，efront默认将主程序写入独立的文件，如果项目是单入口，efront默认将主程序并入index.html，如果您的代码有特殊要求，可以配置引此参数指定efront的行为                                 |
| `UPLEVEL`     | 如果您的代码发布时不需要降级，可添加此参数，以提高编译速度                                                                                                                                         |
| `MSIE`        | 用`efront live --msie`启动服务器，可对`ie`系列浏览器进行代码适配，以便在`ie`上动态调试                                                                                                             |
| `AUTOEVAL`    | 自动常量化的开关，在打包目标代码时默认开启，在开发环境默认关闭，可以指定参数`--no-autoeval`或`--autoeval`修改`efront`的默认行为                                                                    |

# 功能选项

* efront 启动的服务器，默认提供跨域中转的功能，可以在index.html的头部脚本中设置`window.cross_host='https://somehost/'`指定一个具体的efront服务器实例供cross方法使用
* efront 默认禁用了首页的缓存功能，如果要启用，可以在头部script中加入 `window.preventCache=false;`
* efront 默认禁止在iframe中运行，如果要开启，可以在头部script中加入 `window.PREVENT_FRAMEWORK_MODE=false;`
* efront应用的默认初始化脚本是`zimoli('/main');`，可以在body标签上加上`main-path=...`属性指定初始化脚本的路径
* efront 默认将`page_path`指向的路径中的`.ts,.js,.mjs,.cjs,.less,.html,.xht,.vue`文件识别为页面文件，可以在index.html加上`<script src='libpath/*' type=deleteoncompile></script>`，其中`libpath/*`指向静态文件的路径，efront编译过程将识别并做出正确的处理
* 如果仅做为跨域服务器使用，可以将开发环境的url改写为如下形式，以使返回结果加上跨域头：
1. 转发http 用 `*` `http://EFRONT_HOST/*BACKEND_HOST/PATHNAME`
2. 转发https 用 `**` `http://EFRONT_HOST/**BACKEND_HOST/PATHNAME`

<br/>如：
在本机的88端口启动efront服务器，要访问`https://im.qq.com/index` ，可以请求`http://localhost:88/**im.qq.com/index`取得带跨域头的数据

# 注意事项

* efront版本更新后，尽可能兼容老版本的项目，如果出现不兼容的情况，可以回退到之前的版本。efront发布的项目或组件中含有发布项目时所用的efront版本。如果是独立组件，版本信息一般在组件文件的头部，如果是项目，版本信息在项目的index.html中。安将指定的版本的命令如下
  ```bat
    npm install -g efront@版本号
  ```
其中`版本号`替换为您要安装的版本。
您也可以在[github](https://github.com/yunxu1019/efront/issues)上提issue，可以使用中文或中文，其他语言不禁止，但作者不一定能理解到位。

* efront 为组件生成的较长的 `className` 选择器 (含中划线，如`.comm-button`)可能会发生变化，如果要为嵌入的组件设置样式，可以使用 efront 为其生成的较短的 `className` 选择器 (不含中划线`-`，如`.button`)
* efront 将不在首字符位置的`$`识别为快捷分割符，以便以变量名的方式引入多级文件夹中的模块，文件命名时不要在文件名的中间位置使用`$`符号
* with 语句中的变量无法准确识别，最好不要使用。如果非要在efront环境下使用，请在with语句外提前声明，with中出现的未声明的变量。
* 如果要导出无服务器项目，不要使用异步方法加载本地文件的数据
* 从 efront2.5 开始`template`将被识别为 efront 保留字，专门用来指代同名的 html 文件的内容
* 从 efront3.29 开始`.xht`文件将被识别为组件文件，如果文件内未提供入口，入口函数将由 efront 自动生成并填充
# 相关链接

[efront 在线文档](https://efront.cc/docs/)

[efront 兼容性说明](coms/basic_/readme.md)
&nbsp;&nbsp;[版本简介](docs/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E.md)
&nbsp;&nbsp;[与前端框架对比](docs/compare.md)

[efront服务器管理工具](https://efront.cc/pivot/)

[白前看图](https://efront.cc/baiplay)
&nbsp;&nbsp;[酷酷千百易云音乐](https://efront.cc/kugou/)