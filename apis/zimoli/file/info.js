var fs = require("fs");
var path = require("path");
var rootDirectorys = require("./root");
var checkPermission = require("./checkPermission");
function infos({ files = rootDirectorys, folder = "." }) {
    return new Promise(function (ok, oh) {
        if (!files.length) return ok([]);
        var results = [];
        function resolve(a) {
            results.push(a);
            if (results.length >= files.length) {
                ok(results);
            }
        }
        files.map(function (pathname) {
            var name = pathname;
            pathname = path.join(folder, pathname);
            if (!checkPermission(pathname)) {
                return resolve({
                    name,
                    pathname,
                    access: false
                });
            }
            fs.exists(pathname, function (exists) {
                if (!exists) {
                    return resolve({
                        name,
                        pathname,
                        exists
                    });
                }
                fs.stat(pathname, function (error, stats) {
                    if (error) {
                        resolve({
                            name,
                            pathname,
                            error
                        });
                    } else {
                        var result = {
                            name,
                            pathname,
                            atimeMs: stats.atimeMs,
                            ctimeMs: stats.ctimeMs,
                            mtimeMs: stats.ctimeMs,
                            birthtimeMs: stats.birthtimeMs,
                            isFolder: stats.isDirectory(),
                            isFile: stats.isFile(),
                            size: stats.size
                        };
                        if (result.isFolder) {
                            fs.readdir(pathname, function (error, children) {
                                result.children = error || children;
                                resolve(result);
                            });
                        } else {
                            resolve(result);
                        }
                    }
                })
            });
        });
    });
}
module.exports = infos;