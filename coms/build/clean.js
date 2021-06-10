var fs = require("fs");
var path = require("path");
var readdir = function (a) {
    return new Promise(function (ok, oh) {
        fs.readdir(a, function (error, files) {
            if (error) return oh(error);
            ok(files);
        });
    });
};
var isfile = function (a) {
    return new Promise(function (ok, oh) {
        fs.stat(a, function (error, stat) {
            if (error) {
                return oh(error);
            }
            ok(stat.isFile());
        });
    })
};
var unlink = function (dir) {
    return new Promise(function (ok, oh) {
        fs.unlink(dir, function (error) {
            if (error) return oh(error);
            ok();
        });
    });
};
var deeprm = async function (dir) {
    if (await isfile(dir)) {
        return await unlink(dir);
    }
    var files = [];
    while (files.length) {
        var dir = files[files.length - 1];
        if (/^[^\\\/]*(page|app|界面|页面|应用|系统|lib|com|fun|dep|组件|模块|依赖|库|函数|lib|com|fun|dep|组件|模块|依赖|库|函数|env|conf|环境|配置|设置|src|source|code|源|代码)/i.test(path.relative("./", dir))) {
            console.fail(dir);
            throw new Error("请不要在源码文件夹执行清理操作！");
        }
        var files = await readdir(dir);
        if (!files.length) {
            await unlink(dir);
            continue;
        }
        for (var cx = 0, dx = files.length; cx < dx; cx++) {
            var file = files[cx];
            if (file.isFile()) await unlink(file);
            else files.push(path.join(dir, file.name));
        }
    }
};
module.exports = deeprm;