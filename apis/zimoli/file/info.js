var fs = require("fs");
var path = require("path");
var rootDirectorys = require("./root");
var checkPermission = require("./checkPermission");
function infos({ files = rootDirectorys, folder = "." }) {
    return new Promise(function (ok, oh) {
        if (!files.length) return ok([]);
        var results = [];
        var result_count = 0;
        function resolve(fileInfo, cx) {
            results[cx] = fileInfo;
            result_count++;
            if (result_count >= files.length) {
                ok(results);
            }
        }
        files.map(function (pathname, cx) {
            var name = pathname;
            pathname = path.join(folder, pathname);
            if (!checkPermission(pathname)) {
                return resolve({
                    name,
                    pathname,
                    access: false
                }, cx);
            }
            fs.exists(pathname, function (exists) {
                if (!exists) {
                    return resolve({
                        name,
                        pathname,
                        exists
                    }, cx);
                }
                fs.stat(pathname, function (error, stats) {
                    if (error) {
                        resolve({
                            name,
                            pathname,
                            error
                        }, cx);
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
                                resolve(result, cx);
                            });
                        } else {
                            resolve(result, cx);
                        }
                    }
                })
            });
        });
    });
}
module.exports = infos;