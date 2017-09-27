# efront 说明

    efront运行在node环境下，请在安装node环境后使用https://nodejs.org。

## setup

    1. 下载安装
        ```shell
        git clone ..
        npm install
        ```

    2. 生产环境启动

        ```shell
        npm start
        ```
        开启本机服务器，并在访问端口时压缩输出

    3. 开发环境启动

        ```shell
        npm test
        ```
        开启本机服务，在访问端口时不对代码进行压缩
        ```
        npm run electron
        ```
        开启本机服务，并启动electron调试环境

## 目录说明

    01. _envs 环境配置存放位置
    02. apis 对外公开的接口，可通过https post方式访问
    03. apps 静态app页面通过get或post方式访问
    04. coms 组件库
    05. cons 图标库
    06. data 数据
    07. database 数据库访问
    08. process 服务端逻辑
    09. public 静态资源发布目录，用于存放编译的目标文件
    10. server 服务器入口
    11. tester 测试入口
    12. tools 工具