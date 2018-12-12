"use strict";
var fs = require("fs");
var path = require("path");
var getDepedence = require("./getDependence");
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
    RegExp,
    encodeURIComponent,
    decodeURIComponent,
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
    init: {},
    put: {},
    performance: {
    },
    modules: {},
    prepare: {},
    MOVELOCK_DELTA: {},
    renderPixelRatio: {},
    XHR: {},
    Image: {},
    alert() {
    }
};
window.window = window;

function compile(buildInfo, lastBuildTime, destroot) {
    var { fullpath, name, url, builder, destpath } = buildInfo;
    destpath = path.join(destroot, destpath);
    var fullpath = fullpath.slice(0);
    return new Promise(function (ok, oh) {
        var responseText,
            responsePath,
            responseVersion,
            responseWithWarning,
            writeNeeded;

        var resolve = function () {
            Object.assign(buildInfo, {
                needed: writeNeeded,
                data: responseText,
                realpath: responsePath,
                version: responseVersion,
                warn: responseWithWarning
            });
            if (responseText instanceof Promise) {
                responseText.then(function (data) {
                    buildInfo.data = data;
                    ok(buildInfo);
                });
            } else {
                ok(buildInfo);
            }
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
                                var filename = path.basename(_filepath);
                                responseText = builder(buffer, filename, _filepath, []);
                                responseVersion = stat.mtime;
                                writeNeeded = true;
                                resolve();
                            });
                        };
                        var reader = function (hasless) {
                            fs.exists(destpath, function (exists) {
                                if (!exists) return loader();
                                return fs.readFile(destpath, function (error, buffer) {
                                    if (error) throw new Error(`读取已编译数据失败！url:${url}`);
                                    if (hasless === false && getDepedence({ data: buffer }).indexOf("cless") >= 0) {
                                        return loader();
                                    }
                                    writeNeeded = false;
                                    responsePath = _filepath;
                                    responseText = buffer;
                                    responseVersion = stat.mtime;
                                    resolve();
                                });
                            });
                        }
                        if (lastBuildTime - stat.mtime > 10000 && !/[\/\\]index.html?$/i.test(destpath)) {
                            var statless = function () {
                                var less_file = _filepath.replace(/\.([tj]sx?|html?)$/i, ".less");
                                fs.exists(less_file, function (exists) {
                                    if (!exists) return reader(false);
                                    fs.stat(less_file, function (error, stat) {
                                        if (error) throw new Error(`读取less文件出错！lessfile:${less_file}`);
                                        if (lastBuildTime - stat.mtime > 10000) {
                                            reader(true);
                                        } else {
                                            loader();
                                        }
                                    })
                                });
                            };
                            if (/\.([tj]sx?|html?)$/i.test(_filepath)) {
                                if (/\.[tj]sx?$/i.test(_filepath)) {
                                    var html_file = _filepath.replace(/\.[tj]sx?$/i, ".html");
                                    fs.exists(html_file, function (exists) {
                                        if (!exists) return statless();
                                        fs.stat(html_file, function (error, stat) {
                                            if (error) throw new Error(`读取html文件出错！htmlfile:${html_file}`)
                                            if (lastBuildTime - stat.mtime > 10000) {
                                                statless();
                                            } else {
                                                loader();
                                            }
                                        });
                                    });
                                } else {
                                    statless();
                                }
                            } else {
                                reader();
                            }
                        } else {
                            loader();
                        }
                    });
                } else {
                    if (fullpath instanceof Array && fullpath.length) {
                        get();
                        return;
                    }
                    if (!window[name]) responseWithWarning = `没有发现文件：${url}`;
                    else console.info(`${url} will be replaced by the global variables`);
                    resolve();
                }
            });
        }
        get();
    });

}
module.exports = compile;