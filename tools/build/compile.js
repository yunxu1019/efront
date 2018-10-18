"use strict";
var crc = require("../../process/crc");
var fs = require("fs");
var path = require("path");
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
window.window = window;
function compile(buildInfo, lastBuildTime, destroot) {
    var { fullpath, name, extt, url, builder, destpath } = buildInfo;
    destpath = path.join(destroot, destpath);
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
                        var loader = function () {
                            fs.readFile(_filepath, function (error, buffer) {
                                if (error) throw new Error("加载" + url + "出错！");
                                responsePath = _filepath;
                                responseText = builder(buffer, name + extt, _filepath, []);
                                responseVersion = crc([].map.call(responseText.toString(), e => e.charCodeAt(0))).toString(36) + (+stat.mtime).toString(36);
                                resolve();
                            });
                        };
                        if (lastBuildTime - stat.mtime > 10000 && !/[\/\\]index.html?$/i.test(destpath)) {
                            fs.exists(destpath, function (exists) {
                                if (!exists) return loader();
                                return fs.readFile(destpath, function (error, buffer) {
                                    if (error) throw new Error(`读取已编译数据失败！url:${url}`);
                                    responsePath = _filepath;
                                    responseText = buffer.toString();
                                    responseVersion = crc([].map.call(responseText.toString(), e => e.charCodeAt(0))).toString(36) + (+stat.mtime).toString(36);
                                    resolve();
                                });
                            });
                        } else {
                            loader();
                        }
                    });
                } else {
                    if (fullpath instanceof Array && fullpath.length) {
                        get();
                        return;
                    }
                    if (!window[name]) console.warn(`没有发现文件：${url}`);
                    else console.info(`${url} will be replaced by the global variables`);
                    resolve(url);
                }
            });
        }
        get();
    });

}
module.exports = compile;