var wrap = function (func, ...args) {
    var context = this;
    return new Promise(function (ok, oh) {
        args = [].concat(args, function (error, result) {
            if (error) return oh(error);
            ok(result);
        });
        func.apply(context, args);
    })
};
var fs = require("fs");
var path = require("path");
var scanner2 = require("../compile/scanner2");
var readdir = wrap.bind(fs, fs.readdir);
var readFile = wrap.bind(fs, fs.readFile);
var stat = wrap.bind(fs, fs.stat);
var list = function (finded, variables) {
    if (!finded.length) {
        console.info("没有找到");
        return;
    }
    var vmap = Object.create(null);
    for (var v of variables) vmap[v] = true;
    console.type(`在 <cyan>${finded.length >> 1}</cyan> 个文件中发现了指定的全局变量\r\n`);
    for (var cx = 0, dx = finded.length; cx < dx; cx++) {
        var p = finded[cx++];
        var r = '';
        if (p instanceof Array) {
            [p, r] = p;
            p = `<cyan>${r}</cyan><cyan2>${p.slice(r.length)}</cyan2>`;
        }

        var vs = Object.keys(finded[cx]);
        vs = vs.map(v => vmap[v] ? `<red2>${v}</red2>` : `<gray>${v}</gray>`).join(",");
        console.type(p + `\r\n`);
        console.type(vs + "\r\n");
    }
};
var format = function (r) {

};
module.exports = async function (variables, rootpath) {
    var rest = [];
    for (var r of [].concat(rootpath)) {
        r = path.normalize(r);
        var stats = await stat(r);
        if (stats.isDirectory()) {
            r = r.replace(/[\\\/]$/, '') + path.sep;
        }
        rest.push(r);
    }
    var finded = [];
    var passed = Object.create(null);
    while (rest.length) {
        var fullpath = rest.pop();
        var root = fullpath;
        if (fullpath instanceof Array) {
            root = fullpath[0];
            fullpath = fullpath[1];
        }
        fullpath = path.normalize(fullpath);
        if (passed[fullpath]) continue;
        passed[fullpath] = true;
        console.info("正在查找", fullpath);
        if (!fs.existsSync(fullpath)) {
            console.error("路径不正在:", fullpath);
            continue;
        }
        var stats = await stat(fullpath);
        if (stats.isFile()) {
            if (!/\.[cm]?[jt]sx?$/i.test(fullpath)) continue;
            var data = await readFile(fullpath);
            data = String(data).replace(/^\s*#!/, '//');
            var undeclares = scanner2(data).getUndecleared();
            delete undeclares[path.basename(fullpath).replace(/\.\w+$/, "")];
            for (var v of variables) {
                if (undeclares[v]) {
                    finded.push([fullpath, root], undeclares);
                    break;
                }
            }
        }
        else if (stats.isDirectory()) {
            var names = await readdir(fullpath);
            rest.push.apply(rest, names.map(n => [root, path.join(fullpath, n)]));
        }
    }
    list(finded, variables);
}