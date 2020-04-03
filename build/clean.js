var fs = require("fs");
var path = require("path");
var environment = require("./environment");
var deeprm = function (dir) {
    return new Promise(function (ok, oh) {
        if (/^(src|conf|_env|source|apis|coms|cons|data|process|server|tester|tools|apps|page|pages)[\/\\]/i.test(path.relative("./", dir)))
            return console.error("请不要在源码文件夹执行清理操作！"), oh();
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