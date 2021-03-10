var path = require("path");
var fs = require("fs");
function detectWithExtension(filename, extensions = [""], folders = [""]) {
    if (extensions === null) {
        extensions = [""];
    }
    if (folders === null) folders = [""];
    extensions = [].concat(extensions);
    return new Promise(function (ok, oh) {
        filename = filename.replace(/\$/g, '/');
        var prefix = 0;
        var aftfix = 0;
        var findedFolder;

        var run = function () {
            if (aftfix >= extensions.length) {
                if (prefix + 1 < folders.length) {
                    prefix++;
                    aftfix = 0;
                    return run();
                } else {
                    if (findedFolder) {
                        return ok(findedFolder);
                    }
                    return oh(`路径<gray>${filename}</gray>不存在`);
                }
            }
            var f = path.join(folders[prefix], filename) + extensions[aftfix++];
            if (fs.existsSync(f)) {
                fs.stat(f, function (error, stats) {
                    if (error) return run();
                    if (stats.isFile()) {
                        return ok(f);
                    }
                    if (!findedFolder) {
                        findedFolder = f;
                    }
                    run();
                });
            }
            else run();
        };
        run();
    });

}
module.exports = detectWithExtension;