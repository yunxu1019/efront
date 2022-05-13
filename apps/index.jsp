<script serverside>
    var fs = require("fs");
    var path = require("path");
    return new Promise(function (ok, oh) {
        fs.readdir(__dirname, { withFileTypes: true }, function (error, names) {
            if (error) oh(error);
            names = names.filter(a => a.isDirectory()).map(a => a.name);
            context.names = [];
            for (var n of names) {
                if (fs.existsSync(path.join(__dirname, n, 'index.html'))) context.names.push(n);
            }
            ok();
        });
    });
</script>
<!DOCTYPE html>
<!--
    http://efront.cc
-->
<html lang="zh-CN">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <meta charset="utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="Shortcut Icon" href="/favicon.ico" type="image/x-icon" />
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,width=device-width" />
    <title>efront 项目</title>
    <style>
        html {
            height: 100%;
            font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        }

        *,
        ::before,
        ::after {
            box-sizing: border-box;
        }

        body {
            border: none;
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
    </style>
</head>

<body scroll=no max-render=1440>
    欢迎使用efront开发套件
    <script serverside>
        return context.names.map(n => `<a href="${n}">${n}</a>`)
    </script>
</body>

</html>