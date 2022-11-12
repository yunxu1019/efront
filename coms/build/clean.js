var fs = require("fs");
var path = require("path");
var readdir = function (a) {
    return new Promise(function (ok, oh) {
        fs.readdir(a, { withFileTypes: true }, function (error, files) {
            if (error) return oh(error);
            ok(files);
        });
    });
};
var isdir = function (a) {
    return new Promise(function (ok, oh) {
        fs.stat(a, function (error, stat) {
            if (error) {
                return oh(error);
            }
            ok(stat.isDirectory());
        });
    })
};
var rmdir = function (dir) {
    return new Promise(function (ok, oh) {
        fs.rmdir(dir, function (err) {
            if (err) return oh(err);
            ok();
        })
    })
}
var unlink = function (dir) {
    return new Promise(function (ok, oh) {
        fs.unlink(dir, function (error) {
            if (error) return oh(error);
            ok();
        });
    });
};
var deeprm = async function (dir) {
    if (!fs.existsSync(dir)) return;
    if (!await isdir(dir)) {
        return await unlink(dir);
    }
    var rest = [dir];
    while (rest.length) {
        var dir = rest[rest.length - 1];
        if (/^[^\\\/]*(page|app|界面|页面|应用|系统|lib|com|fun|dep|组件|模块|依赖|库|函数|lib|com|fun|dep|组件|模块|依赖|库|函数|env|conf|环境|配置|设置|src|source|code|源|代码)/i.test(path.relative("./", dir))) {
            console.fail(dir);
            throw new Error("请不要在源码文件夹执行清理操作！");
        }
        var files = await readdir(dir);
        if (!files.length) {
            rest.pop();
            await rmdir(dir);
            continue;
        }
        for (var file of files) {
            if (file.isDirectory()) rest.push(path.join(dir, file.name));
            else await unlink(path.join(dir, file.name));
        }
    }
};
module.exports = deeprm;