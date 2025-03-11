<script serverside>
    var fs = require("fs");
    var path = require("path");
    var fsp = fs.promises;
    if (!fsp) throw new Error('当前服务器nodejs版本过低，无法使用！');
    var names = await fsp.readdir(__dirname, { withFileTypes: true });
    names = names.filter(a => a.isDirectory()).map(a => a.name);
    var indexList = context.indexList = [];
    for (var n of names) {
        if (fs.existsSync(path.join(__dirname, n, '主页.html'))) indexList.push([n, '主页.html']);
        else if (fs.existsSync(path.join(__dirname, n, '主页.jsp'))) indexList.push([n, '主页.jsp']);
        else if (fs.existsSync(path.join(__dirname, n, 'index.html'))) indexList.push([n, 'index.html']);
        else if (fs.existsSync(path.join(__dirname, n, 'index.jsp'))) indexList.push([n, 'index.jsp']);
    };
    for (var o of indexList) {
        var [p, n] = o;
        var p = path.join(__dirname, p, n);
        var stats = await fsp.stat(p);
        if (!stats.isFile()) continue;
        o.push(stats);
        var data = await fsp.readFile(p);
        var title = /<title>([\s\S]*?)<\/title>/i.exec(String(data));
        if (title) o.push(title[1]);
    }
    // throw new Error;
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
            width: 180px;
            height: 60px;
            vertical-align: top;
            text-decoration: none;
            line-height: 1.2;
            margin: 0 12px 12px 0;
            padding: 4px 6px;
            border: 1px solid #0003;
            background: #fff9;
            border-radius: 4px;
            color: #16c;
            position: relative;
        }

        a:visited {
            color: #36a;
        }


        a:hover {
            color: #39c;
            border-color: #39c;
        }

        a:active {
            color: #c24;
            border-color: #c24;
        }


        a>[name] {
            padding: 3px;
            color: #333;
            font-size: 14px;
            font-family: 楷体, sans-serif;
        }

        a>[time] {
            font-size: 8px;
            position: absolute;
            right: 6px;
            bottom: 4px;
            color: #999;
        }

        a>b {
            font-family: 'Times New Roman', Times, sans-serif;
            font-style: italic;
            font-size: 12px;
        }

        a:hover>b {
            text-decoration: underline;
        }

        [npm] {
            color: #fba;
            text-shadow: 1px -1px 0 #c24;
        }

        [name] {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
        }

        [note] {
            font-size: 14px;
            font-family: 仿宋, sans-serif;
            padding: 10px 16px 0 16px;
        }
    </style>
</head>

<body scroll=no max-render=1440>
    <div note>选择任意项目查看，开发环境加载有些慢.. </div>
    <div content>
        <script serverside>
            var rows = [];
            var fs = require("fs");
            var path = require("path");
            for (var [p, n, stats, t = p] of context.indexList) {
                rows.push(`<a href="${p}" target=_blank><b >${p}</b><span name>${t}</span><span time>${stats.mtime.toLocaleDateString()}</span></a>`);
            }
            return rows.join('')
        </script>
        <a href="https://www.npmjs.com/package/efront" target="_blank">
            <b npm>npm</b>
            <span name>efront</span>
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