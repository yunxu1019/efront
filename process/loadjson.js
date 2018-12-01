"use strict";
var fs = require("fs");
var loadjson = module.exports = function loadjson(url) {
    var data = fs.readFileSync(url);
    return new Function("return " + String(data))();
};
loadjson.async = function (url) {
    return new Promise(function (ok, oh) {
        fs.exists(url, function (exists) {
            if (!exists) return oh(new Error(`文件不存在!${url}`));
            fs.stat(url, function (error, stats) {
                if (error) return oh(error);
                if (!stats.isFile()) return oh(new Erorr(`路径所指向的不是文件${url}`));
                if (stats.size > 2 * 1024 * 1024) return oh(new Error(`文件过大!${url}`));
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
    });
};
