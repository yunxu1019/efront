# efront 说明

    efront运行在node环境下，请在安装node环境后使用https://nodejs.org。

## 下载

    git clone ..

## 生产环境启动

    ```shell
    npm start
    ```
    开启本机服务器，并在访问端口时压缩输出

## 开发环境启动

    ```shell
    npm test
    ```
    开启本机服务，在访问端口时不对代码进行压缩
    ```
    npm run electron
    ```
    开启本机服务，并启动electron调试环境