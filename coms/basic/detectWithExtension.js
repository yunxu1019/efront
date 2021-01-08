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

        var run = function () {
            var f = path.join(folders[prefix], filename) + extensions[aftfix++];
            if (fs.existsSync(f)) return ok(f);
            if (aftfix >= extensions.length) {
                if (prefix + 1 < folders.length) {
                    prefix++;
                    aftfix = 0;
                    run();
                } else {
                    oh(`路径<gray>${filename}</gray>不存在`);
                }
            }
            else run();
        };
        run();
    });

}
module.exports = detectWithExtension;