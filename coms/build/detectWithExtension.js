var path = require("path");
var fs = require("fs");
var str2array = require("../efront/str2array");
function detectWithExtension(filenames, extensions = [""], folders = [""]) {
    if (typeof filenames === 'string') filenames = str2array(filenames);
    if (typeof extensions === 'string') extensions = str2array(extensions);
    if (typeof folders === 'string') folders = str2array(folders);
    if (extensions === null) {
        extensions = [""];
    }
    if (folders === null) folders = [""];
    extensions = [].concat(extensions);
    return new Promise(function (ok, oh) {
        var prefix = 0;
        var aftfix = 0;
        var findedFolder;
        var findex = 0;
        var filename = filenames[findex].replace(/\$/g, '/');
        var tempname = filename.replace(/[#\?][\s\S]*$/, '');
        var params = filename.slice(tempname.length);
        filename = tempname;
        var run = function () {
            if (aftfix >= extensions.length) {
                if (prefix + 1 < folders.length) {
                    prefix++;
                    aftfix = 0;
                    return run();
                } else if (++findex < filenames.length) {
                    filename = filenames[findex];
                    prefix = 0;
                    aftfix = 0;
                    return run();
                } else {
                    if (findedFolder) {
                        return ok(findedFolder);
                    }
                    return oh(`路径<gray>${filename}</gray>不存在`);
                }
            }
            var f = filename + extensions[aftfix++];
            if (folders[prefix]) f = path.join(folders[prefix], f);
            f = path.normalize(f);
            fs.stat(f, function (error, stats) {
                if (error) return run();
                if (stats.isFile()) {
                    return fs.realpath(f, function (error, f) {
                        if (error) return run();
                        return ok(f + params);
                    });
                }
                if (!findedFolder) {
                    findedFolder = f + params;
                }
                run();
            });
        };
        run();
    });

}
module.exports = detectWithExtension;