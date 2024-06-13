
[中文版](./readme.md)
*efront*&ensp;is a development tool that can be used independently to develop projects or to use only one of its functions
# efront ideology
1. Each file only exports one piece of data, which can be any of boolean, number, string, function, object, bigint, null, undefined
2. The file name is the variable name. To reference variables exported from the current file in other files, simply use the file name of the current file (without a suffix)
3. No circular references (mutual invocation: a references b, b references a; head-to-tail reference: a references b, b references... c, c references a)
4. Reduce the time for asynchronous IO, only load useful code during the application startup process, and wait for user actions while preloading the next step of code after startup is completed
5. Partial version update, each code loaded asynchronously has an independent version number, and is not loaded repeatedly when there is no change in version information

# efront Function List

1. Provide a development server that starts in 0 seconds, allowing code to complete asynchronous loading of dependencies in the browser
2. Provide a compilation environment for 'code referenced by file name', allowing developers to avoid writing statements such as `import` and `require`
3. Provide loaders with circular check
4. Automatically recognize and attach preloaded logic
5. Automatically append check cache logic and generate code version numbers
6. `efront` server provides cross domain relay function
7. `efront` compile and export components to extract and encrypt strings and attributes that may cause code to be readable

# Basic commands (some commands are applicable to Windows, similar to other systems)

## 1. Install

`efront` runs on [nodejs](https://nodejs.org/zh-cn/). Please use it after installing [nodejs](https://nodejs.org/zh-cn/)

Global installation of efront from NPM

```bat
npm install -g efront
```
<!-- 
If you just want to test limited efront functions via [deno](https://deno.land/), you may fire your code as bellow:
```shell
deno run --allow-all http://efront.cc/ help
``` -->


## 2. View Help System

The command line help commands are as follows

```bat
efront help
```

You can also use the following command to start the document server and view help information using a browser

```bat
efront docs
```

## 3. Start the development environment server

```bat
efront live
efront live HTTP_PORT
efront live HTTP_PORT HTTPS_PORT
```

The HTTP_PORT and HTTPS_PORT are number and can be left blank. For more usage options, please refer to the help system. To disable the warning message when the HTTPS service port is opened, you can configure your own SSL certificate path and certificate password.

## 4. Compress Compilation Project

By default, the compiled Object code will be saved to the `public` directory
You can publish the code of the `public` directory to any server

```bat
set app=PROJECT_NAME
set public_path=PUBLIC_PATH
efront public
```
`PUBLIC_PATH` is the publishing path,defaults to the folder named 'public' in current working directory.

* If you want to publish on the server, it is not recommended to use a method that ends in `.html` and write the asynchronously loaded code to a separate file

* If you want to export a project that can be accessed locally without a server, you can set a project name that ends in `.html` and merge the asynchronously loaded code into the homepage file

```bat
set app=PROJECT_NAME.html
```

* If you want to export components, you can set a project name that ends in `. js`

```bat
set app=PROJECT_NAME.js
```

* The current version of efront provides incomplete support for the `require` syntax in commonjs and the `import` syntax in es6 (asynchronous ring calls are not supported). For relevant projects that meet the requirements, they can be compiled and published.
* If you want to publish a component with the require syntax and want to merge the component and all dependencies for output, you can replace the `efront public` above with `efront publish`

* If automatic path recognition is required, directories such as `public` / `dist` / `output` / `release` may be recognized as target paths, and files in these paths may be overwritten. If it is confirmed to be feasible, use `efront build` or `efront release`

## 5. Watch mode

Monitor file changes, automatically compile updated parts and output them to the specified directory

```bat
set app=PROJECT_NAME
set public_path=PUBLIC_PATH
efront watch
```

# Description of configurable items

`efront` prioritizes reading configurations from system environment variables, and can also write configuration information to configuration files.
`efront` defaults to reading the`_envs/`and the `.efront/_envs/` of the user directory to initializes the environment configuration (if you want to modify the path of the default environment configuration, you can set `CONFIG_PATH` in the system environment variable, and multiple directories can be separated by commas in English), where `setup. bat` is the entry of the environment configuration. When you access a subproject `APP` of the Working directory, it will also be automatically read onfiguration in `_envs/app=%APP%.bat`.

The current version of `efront` supports quick configuration of environment variables on the command line, such as

```bat
 efront watch --APP=kugou --PUBLIC_PATH=... --PAGE_PATH=...
```
| configuration item             | illustrate                                                                                                                                                                                               |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `APP`              | Application name, which affects the final generated application path and default source file path                                                                                                                                 |
| `PAGE_PATH`        | The root path where the page file is stored, defaults to `./apps`                                                                                                                                                             |
| `COMM_PATH`        | The root path where the component file is stored. If there are multiple paths, they can be separated by `,`. and `:` can be used to specify the path to the component provided by `efront`. The default is`./coms`                                                                               |
| `PUBLIC_PATH`      | The target root path for publishing, and the final generated code path is `PUBLIC_PATH/APP`, if this item is specified as `PAGE_PATH`, efront will disable the publishing function. After executing `efront start`, the compressed version of the code can be accessed through a browser                               |
| `PUBLIC_EXTT`      | The extension of the published logical code, which defaults to `.js` or `.txt`                                                                                                                                                          |
| `PAGE`             | The path where the page file is stored, defaults to the application name `APP`                                                                                                                                                              |
| `COMM`             | The path where the component files are stored, with the default being the application name and the default component library `APP,zimoli`                                                                                                                                     |
| `PREFIX`           | Specify the component className prefix when publishing, with no prefix by default                                                                                                                                                            |
| `NOPROXY`          | Traditional agents are enabled by default in the development environment and disabled in the production environment                                                                                                                                       |
| `DIRECT`           | If `pathname` is used as the page path for a single page application, this parameter can be configured so that all empty paths point to the path specified by this parameter. If configured as a numerical value, the first few levels of the user path are automatically truncated. If specified as a string, all empty paths return the content under that string path. |
| `ENTRY_NAME`       | `efront` defaults to sequentially searching for the declared `main`, `Main`, `main`, and `<file name>` in the file as the export object (entry). Users can configure this environment variable to make modifications                                                                                  |
| `EXTRACT`          | If the project has multiple entries, `efront` defaults to writing the main program to a separate file. If the project is a single entry, `efront` defaults to incorporating the main program into index.html. If your code has special requirements, you can configure this parameter to specify the behavior of `efront`                                 |
| `UPLEVEL`          | If you do not need to downgrade your code when publishing, you can add this parameter to improve compilation speed     |
| `MSIE`             | Starting the server with `efront live --msie` allows for code adaptation of the `ie` series of browsers for dynamic debugging on `ie`                                                                                                             |
| `AUTOEVAL`         | The automatic constant switch is on by default when packaging Object code, and off by default in the development environment. You can specify parameters `--no-autoeval` or `--autoeval` to modify the default behavior of `efront`                                                                    |

# Function Options

* The server started by efront provides cross domain transfer function by default, and can be set to `window.cross_host = "https://somehost/"` in the header script of `index.html` to specify a specific efront server instance for the cross method to use
* Efront has disabled the caching function on the homepage by default. If you want to enable it, you can add `window.preventCache=false;` in the header script 
* Efront is disabled from running in iframe by default. If you want to enable it, you can add `window.PREVENT_FRAMEWORK_MODE=false;` in the header script 
* The default initialization script for efront application is `zimoli('/main');`，You can add `main-path=...` as a property of `<body>` to specifies the path to the initialization script
* efront default the `.ts,.js,.mjs,.cjs,.less,.html,.xht,.vue` files in the path `PAGE_PATH` pointed to are recognized as page files，You can add `<script src='libpath/*' type=deleteoncompile></script>`, where `libpath/*` points to the path of the static file, The `efront` compilation process will recognize and make the correct processing
* If used only as a cross domain server, the URL of the development environment can be rewritten as follows to include cross domain headers in the returned results:
1. Forward HTTP using `*` `http://EFRONT_HOST/*BACKEND_HOST/PATHNAME`
2. Forward HTTPS using `**` `http://EFRONT_HOST/**BACKEND_HOST/PATHNAME`

<br/>For example:
Start the efront server on port 88 of local machine. To access `https://im.qq.com/index`, can request `http://localhost:88/**im.qq.com/index` to get data with cross domain headers

# note

* When version updating, efront try to be compatible with the old version of the project as much as possible. If there are incompatibilities, you can roll back to the previous version. The project or component published by efront contains the efront version used when publishing the project. If it is a standalone component, the version information is usually in the header of the component file. If it is a project, the version information is in the index. html of the project. The command for the specified version of Anjiang is as follows
  ```bat
    npm install -g efront@version
  ```
You can also click on [github](https://github.com/yunxu1019/efront/issues). The issue mentioned above can be in Chinese or English, and other languages are not prohibited, but the author may not be able to fully understand it.

* The longer `className` selector generated by efront for the component (including the middle line, such as '.coms-button ') may change. If you want to style the embedded component, you can use the shorter `className` selector generated by efront for it (without the middle line, such as `.button`)
*
* efront recognizes the `$` not in the first character position as a shortcut separator, so that modules in multi-level folders can be introduced as variable names. When naming files, do not use the `$` symbol in the middle of the file name
* The variables in the `with` statement cannot be accurately identified and should not be used. If you must use it in the `efront` environment, please declare the undeclared variables that appear in the `with` statement in advance.
* If you want to export a serverless project, do not use asynchronous methods to load data from local files
* Starting from efront 2.5, 'template' will be recognized as an efront Reserved word, which is specifically used to refer to the content of html files with the same name
* Starting from efront 3.29, the '.xht' file will be recognized as a component file. If no entry is provided in the file, the entry function will be automatically generated and filled in by efront

# Related Links

[efront Online Documents](https://efront.cc/docs/)

[efront Compatibility Description](coms/basic_/readme-en.md)
&nbsp;&nbsp;[Version Introduction](docs/version-desc.md)
&nbsp;&nbsp;[Compared to the front-end framework](docs/compare-en.md)

[efront server manager](https://efront.cc/pivot/)

[白前看图](https://efront.cc/baiplay)
&nbsp;&nbsp;[酷酷千百易云音乐](https://efront.cc/kugou/)

> If you would like to help me to improve this project, please follow the following link to join the metting in skype.
https://join.skype.com/v8a630zaeGks 


> If you are willing to offer me a job or only let me try ... try, please drop a letter to yunxu1019@live.cn
