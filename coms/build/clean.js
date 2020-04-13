var fs = require("fs");
var path = require("path");
var environment = require("./environment");
var deeprm = function (dir) {
    return new Promise(function (ok, oh) {
        if (/^[^\\\/]*(page|app|界面|页面|应用|系统|lib|com|fun|dep|组件|模块|依赖|库|函数|lib|com|fun|dep|组件|模块|依赖|库|函数|env|conf|环境|配置|设置|src|source|code|源|代码)/i.test(path.relative("./", dir))) {
            console.fail(dir);
            return console.error("请不要在源码文件夹执行清理操作！"), oh();
        }
        fs.exists(dir, function (exists) {
            if (!exists) return ok();
            fs.stat(dir, function (error, stat) {
                if (error) return oh(error);
                if (stat.isDirectory()) {
                    fs.readdir(dir, function (error, names) {
                        if (error) return oh(error);
                        Promise.all(names.map(function (name) {
                            return deeprm(path.join(dir, name));
                        })).then(function () {
                            fs.rmdir(dir, function (error) {
                                if (error) return oh(error);
                                ok();
                            });
                        }).catch(oh);
                    });
                } else {
                    fs.unlink(dir, function (error) {
                        if (error) return oh(error);
                        ok();
                    });
                }
            });
        });
    });
};
module.exports = deeprm;