var path = require("path");
var fs = require("fs");
var http = require("http");
var https = require("https");
var parseM3U8 = function (text, url) {
    url = parseURL(url);
    var list = text.split(/[\r\n]+/).filter(a => !!a).map(function (name) {
        if (/^#/.test(name)) return name;
        name = url.resolve(name).toString();
        return name;
    });
    return list;
};
var fillTree = function (node, pathname) {
    var pathlist = pathname.split(/[\\\/]/);
    for (var p of pathlist) {
        if (!node[p]) node[p] = Object.create(null);
        node = node[p];
    }
}
var formatName = function (videos, urls) {
    var pathMap = Object.create(null);
    var treeMap = Object.create(null);
    urls.forEach(function (url) {
        var { pathname } = parseURL(url);
        fillTree(treeMap, pathname);
    });
    for (var v of videos) {
        var { pathname } = parseURL(v);
        fillTree(treeMap, pathname);
        pathname = pathname.replace(/^[\\\/]+/, '').replace(/[\d\-\s\~\_\:\.\/\\]+(\.\w+)$/, '$1');
        pathname = pathname.replace(/\.[^\.\\\/]+$/, '').replace(/[\\\/]/g, '-');
        var list = pathMap[pathname];
        if (!list) {
            pathMap[pathname] = [v];
        }
        else {
            list.push(v);
        }
    }
    var treePath = [];
    do {
        var treekeys = Object.keys(treeMap);
        if (treekeys.length !== 1) break;
        treekeys = treekeys[0];
        treePath.push(treekeys);
        treeMap = treeMap[treekeys];
    } while (treeMap);
    treePath = treePath.join('/');
    var pathLength = treePath.length;
    var realMap = Object.create(null);
    for (var pathname in pathMap) {
        var list = pathMap[pathname];
        pathname = pathname.slice(pathLength);
        if (list.length > 1) {
            var ilength = String(list.length).length;
            list = list.forEach((n, i) => {
                var i = String(i);
                i = Array(ilength + 1 - i.length).join("0") + i;
                realMap[n] = pathname + "-" + i + path.extname(n);
            });
        }
        else {
            realMap[list[0]] = pathname;
        }
    }
    return [realMap, treePath];
};
var downLoad = function (url, dest) {
    return new Promise(function (ok, oh) {
        var h = /^https\:/.test(url) ? https : http;
        var r = h.get(url, function (r) {
            var w = fs.createWriteStream(dest);
            r = decodeHttpResponse(r);
            r.pipe(w);
            r.once("error", function (error) {
                w.close(function () {
                    fs.unlink(dest, function () {
                        oh(error)
                    });
                });
            });
            w.once('error', oh);
            w.once("finish", ok);
        });
        r.once('error', oh);
        r.end();
    });
}
var breakLine = '\r\n';
var deepFetch = async function (url, dest) {
    var rest = [];
    var is_m3u8 = true;
    var videos = [];
    var urls = [url];
    var commentMap = [];
    var comments = ["#EXTM3U"];
    do {
        if (is_m3u8) {
            var response = await fetch(url);
            switch (response.status) {
                case 0:
                case 200:
                case 304:
                    var m3u8 = await response.text();
                    urls.push(url);
                    var list = parseM3U8(m3u8, url).reverse();
                    if (/#EXTM3U/i.test(list[list.length - 1])) list.pop();
                    rest.push(...list);
                    break;
                default:
                    throw new Error(`加载 ${url} 失败: ${response.statusText}`);
            }
        }
        else {
            if (/^#/.test(url)) {
                comments.push(url);
            }
            else {
                commentMap[url] = comments.join(breakLine);
                comments = [];
                videos.push(url);
            }
        }
        url = rest.pop();
        is_m3u8 = url && /\.m3u8$/i.test(url);
    } while (url);

    var [nameMap, treePath] = formatName(videos, urls);
    var videoname = path.basename(treePath);
    if (!videoname) if (videos.length === 1) videoname = nameMap[videos[0]];
    if (!videoname) {
        if (fs.existsSync(dest)) throw new Error("目标文件夹已存在！");
        videoname = path.basename(dest);
        dest = path.dirname(dest);
    }
    if (!fs.existsSync(dest)) throw new Error("目标文件夹无效！");
    if (path.basename(dest) !== videoname) dest = path.join(dest, videoname);
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    for (var v of videos) {
        try {
            var d = path.join(dest, nameMap[v]);
            if (fs.existsSync(d)) {
                console.info(`已跳过文件 ${d}`);
                continue;
            }
            console.info(`正在下载 ${v}`)
            await downLoad(v, d);
        } catch (e) {
            console.error(`下载 ${v} 失败:${e}`);
        }
    }
    var index = videos.map(v => {
        var n = nameMap[v];
        var c = commentMap[v];
        return c + breakLine + n;
    });
    index.push(...comments);
    index = index.join(breakLine) + breakLine;
    await fs.promises.writeFile(path.join(dest, 'index.m3u8'), index);
}
function main(m3u8, dst) {
    return deepFetch(m3u8, dst);
}
