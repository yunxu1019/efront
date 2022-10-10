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
    <title>欢迎使用 efront 开发套件</title>
    <style>
        h1 {
            line-height: 1.2;
            border: 12px solid transparent;
            box-sizing: border-box;
            text-indent: 32px;
            font-size: 20px;
            margin: 0;
            font-weight: 400;
            color: #fff;
            background: #244 url('/favicon.ico') no-repeat left top 2px / 20px 20px;
        }

        [content] {
            display: block;
            font-size: 0;
            padding: 12px 0 0 12px;
        }

        *,
        ::before,
        ::after {
            box-sizing: border-box;
        }

        body {
            background: url('feedback/logo.svg') no-repeat left bottom -160px;
        }

        body,
        html {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        th,
        td {
            text-align: left;
        }

        a {
            display: inline-block;
            width: 160px;
            text-decoration: none;
            line-height: 1.2;
            margin: 0 12px 12px 0;
            padding: 4px 6px;
            border: 1px solid #0001;
            background: #fff9;
        }

        a:hover {
            border-color: #0004;
        }

        a>[name] {
            font-size: 18px;
        }

        a>[time] {
            font-size: 6px;
            color: #999;
        }

        a:hover>[name] {
            text-decoration: underline;
        }

        [name] {
            display: block;
        }
    </style>
</head>

<body scroll=no max-render=1440>
    <div content>
        <script serverside>
            var rows = [];
            var fs = require("fs");
            var path = require("path");
            for (var n of context.names) {
                var stats = await new Promise(function (ok, oh) {
                    fs.stat(path.join(__dirname, n), function (error, stats) {
                        if (error) return oh(error);
                        ok(stats);
                    })
                });

                rows.push(`<a href="${n}?${stats.mtime.toLocaleDateString()}" ><b name>${n}</b><span time>${stats.mtime.toLocaleDateString()}</span></a>`);
            }
            return rows.join('')
        </script>
        <a href="https://www.npmjs.com/package/efront" target="_blank">
            <b name>efront</b>
            <span time>&nbsp;</span>
        </a>
    </div>
    <script>
            - function () {
                var time = document.body.querySelector("a:last-child>[time]");
                var xhr = new XMLHttpRequest;
                xhr.open("get", '/**www.npmjs.com/package/efront');
                xhr.onload = function () {
                    var d = xhr.getResponseHeader("last-modified");
                    if (!d) return;
                    d = new Date(d);
                    time.innerHTML = d.toLocaleDateString();
                    var a = time.parentNode;
                    a.href += '?' + +d;
                };
                xhr.send();
            }();
    </script>
</body>

</html>