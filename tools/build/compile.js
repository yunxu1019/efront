"use strict";
var crc = require("../../process/crc");
var fs = require("fs");
var window = {
    setTimeout,
    setInterval,
    Array,
    parseInt,
    parseFloat,
    String,
    Object,
    Math,
    Date,
    Infinity,
    Error,
    isFinite,
    clearTimeout,
    clearInterval,
    Function,
    navigator: { userAgent: "" },
    globalStorage: {},
    sessionStorage: {},
    localStorage: {},
    window,
    location: {},
    history: {},
    document: {
        createElement() { return {} },
        createEvent() {
            return {};
        },
        documentElement: {
            addBehavior() { }
        }
    },
    state: {},
    screen: {},
    performance: {
    },
    Image: {},
    alert() {
    }
};
function compile(buildInfo) {
    var { fullpath, name, extt, url, builder } = buildInfo;
    var fullpath = fullpath.slice(0);
    return new Promise(function (ok, oh) {
        var responseText,
            responsePath,
            responseVersion;

        var resolve = function () {
            Object.assign(buildInfo, {
                data: responseText,
                realpath: responsePath,
                version: responseVersion,
            });
            ok(buildInfo);
        };
        var get = function () {
            var _filepath = fullpath instanceof Array ? fullpath.shift() : fullpath;
            fs.exists(_filepath, function (exists) {
                if (exists) {
                    fs.stat(_filepath, function (error, stat) {
                        if (error) throw new Error(`读取文件信息出错${url}`);
                        if (!stat.isFile()) throw new Error(`源路径不存在文件${url}`);
                        fs.readFile(_filepath, function (error, buffer) {
                            if (error) throw new Error("加载" + url + "出错！");
                            responsePath = _filepath;
                            responseText = builder(buffer, name + extt, _filepath, []);
                            responseVersion = crc([].map.call(responseText.toString(), e => e.charCodeAt(0))).toString(36) + (+stat.mtime).toString(36);
                            resolve();
                        });
                    });
                } else {
                    if (fullpath instanceof Array && fullpath.length) {
                        get();
                        return;
                    }
                    if (!window[name]) console.error(`没有发现文件：${url}`);
                    else console.warn(`${url} will be replaced by the global variables`);
                    resolve(url);
                }
            });
        }
        get();
    });

}
module.exports = compile;