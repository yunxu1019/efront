"use strict";
var fs = require("fs");
var loadjson = module.exports = function loadjson(url) {
    var data = fs.readFileSync(url);
    return new Function("return " + String(data))();
};
loadjson.async = function (url, ignoreIfNotExist) {
    return new Promise(function (ok, oh) {
        if (!fs.existsSync(url)) return;
        fs.stat(url, function (error, stats) {
            if (error) return oh(error);
            if (!stats.isFile()) return oh(new Error(i18n`路径所指向的不是文件${url}`));
            if (stats.size > 2 * 1024 * 1024) return oh(new Error(i18n`文件过大!${url}`));
            fs.readFile(url, function (error, buffer) {
                if (error) return oh(error);
                try {
                    ok(new Function("return " + String(buffer))());
                } catch (e) {
                    oh(e);
                }
            });
        });
    });
};
