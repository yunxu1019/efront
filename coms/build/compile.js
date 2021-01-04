"use strict";
var fs = require("fs");
var path = require("path");
var getDepedence = require("./getDependence");
var detectWithExtension = require("../basic/detectWithExtension");
var window = {
    setTimeout,
    setInterval,
    Array,
    parseInt,
    console: {
    },
    parseFloat,
    Boolean,
    Number,
    Event: {},
    unescape() { },
    escape() { },
    String,
    Object,
    Math,
    Date,
    Infinity,
    Error,
    devidePixelRatio: 1,
    isFinite,
    isNaN,
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
        createElement() { return {}; },
        createEvent() {
            return {};
        },
        documentElement: {
            addBehavior() { }
        }
    },
    screen: {},
    performance: {
    },
    modules: {
        state: {},
        init: {},
        put: {},
        prepare: {},
        MOVELOCK_DELTA: 3,
        SAFE_CIRCLE_DEPTH: 300,
        renderPixelRatio: {},
        calcPixel: {},
        freePixel: {},
        fromPixel: {},
    },
    Image: {},
    Promise: {},
    alert() {
    }
};
window.window = window;
var componentIncreasedId = 0;
var { class_prefix } = require("./environment");
function getComponentId() {
    componentIncreasedId++;
    return class_prefix + componentIncreasedId.toString(26).replace(/\d/g, a => String.fromCharCode('q'.charCodeAt(0) + +a));
}

var isRealpath = function (pathname) {
    return new Promise(function (ok, oh) {
        var run = function () {
            var diranme = path.dirname(pathname);
            if (!diranme || diranme === pathname || /^[\\\/\.]*$/.test(pathname)) {
                ok(true);
                return;
            }
            var basename = path.basename(pathname);
            fs.readdir(diranme, function (error, names) {
                if (error) oh(error);
                var is = names.indexOf(basename) >= 0;
                if (!is) {
                    ok(false);
                    return;
                }
                pathname = diranme;
                run();
            });
        };
        run();
    });
};
var linesEnabled = 1;
function wait(args) {
    return new Promise(ok => {
        var t = setInterval(function () {
            if (!linesEnabled) return;
            clearInterval(t);
            ok();
        }, 12);
    }).then(function () {
        return compile.apply(null, args);
    });
}

function compile(buildInfo, lastBuildTime, destroot) {
    if (!linesEnabled) return wait(arguments);
    linesEnabled--;
    var { fullpath, name, url, builder, destpath } = buildInfo;
    var componentId = getComponentId();
    destpath = path.join(destroot, destpath);
    var fullpath = fullpath.slice(0);
    return new Promise(function (ok, oh) {
        var responseText,
            responsePath,
            responseTime = 0,
            responseVersion,
            responseWithWarning,
            writeNeeded,
            moduleValue;

        var resolve = function () {
            if (responseText instanceof Buffer) {
                responseTime = responseText.time || 0;
            }
            Object.assign(buildInfo, {
                needed: writeNeeded,
                data: responseText,
                realpath: responsePath,
                version: responseVersion,
                builtin: moduleValue,
                time: responseTime,
                warn: responseWithWarning
            });
            if (responseText instanceof Promise) {
                responseText.then(function (data) {
                    buildInfo.data = data;
                    ok(buildInfo);
                    linesEnabled++;
                });
            } else {
                ok(buildInfo);
                linesEnabled++;
            }
        };
        var setRealpath = function (_filepath) {
            fs.stat(_filepath, function (error, stat) {
                if (error) throw new Error(`读取文件信息出错${url}`);
                var isDirectory = false;
                if (!stat.isFile()) {
                    if (!stat.isDirectory()) {
                        throw new Error(`源路径不存在文件${url}`);
                    }
                    isDirectory = true;
                }
                var loadpackage = function (packagepath) {
                    fs.readFile(packagepath, function (error, packagedata) {
                        if (error) throw new Error(`加载${packagepath}出错`);
                        var packageobject = JSON.parse(String(packagedata));
                        loadindex(packageobject.main || 'index');
                    });
                };
                var loadindex = function (index) {
                    // var split = /^\//.test(url) ? '/' : '$';
                    var _realpath = path.join(_filepath, index || 'index');
                    detectWithExtension(_realpath, ["", ".js", "/index", "/index.js"]).then(function (realpath) {
                        var target = url.replace(/(\w)\$/g, "$1/").replace(/[\/\\\$]+$/, '') + "/" + String(index || 'index').replace(/^\.?[\\\/]+/, '');
                        target = target.replace(/[\\\/]/g, "/");
                        target = path.relative(path.dirname(_filepath), realpath).replace(/\\/g, '/');
                        _filepath = url.replace(/[\\\/]$/, '') + "";
                        if (!/^\.*\//.test(target)) {
                            target = "./" + target;
                        }
                        response(`require("${target}")`);
                    }).catch(findRealpath);
                };
                var response = function (buffer) {
                    responsePath = _filepath;
                    var id = buildInfo.destpath.replace(/\..*$/, "").replace(/[^\w]/g, a => "_" + a.charCodeAt(0).toString(36) + "-");
                    id = '/' + componentId + ' ' + id.replace(/^[\s\S]*?(\w*)$/, "$1");
                    responseText = builder(buffer, id, _filepath, []);
                    responseVersion = stat.mtime;
                    writeNeeded = true;
                    if (responseText instanceof Promise) {
                        responseText.then(function (res) {
                            responseText = res;
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                };
                var loader = function () {
                    if (buildInfo.type === '\\') {
                        writeNeeded = false;
                        response();
                        return;
                    }
                    if (isDirectory) {
                        var __filepath = path.join(_filepath, 'package.json');
                        fs.exists(__filepath, function (exists) {
                            if (exists) {
                                fs.stat(__filepath, function (error, stat) {
                                    if (error) throw new Error(`加载${url}出错！`);
                                    if (stat.isFile()) loadpackage(__filepath);
                                    else loadindex();
                                });
                            } else {
                                loadindex();
                            }
                        });
                        return;
                    }

                    fs.readFile(_filepath, function (error, buffer) {
                        if (error) throw new Error("加载" + url + "出错！");
                        response(buffer);
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
                };
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
                            });
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
        };
        var findRealpath = function () {
            if (fullpath instanceof Array && !fullpath.length) {
                if (window.modules[name]) console.info(`${url} will be replaced by the builtin module`), moduleValue = window.modules[name];
                else if (!window[name]) responseWithWarning = `没有发现文件：${url}`;
                else console.info(`${url} will be replaced by the global variables`);
                resolve();
                return;
            }
            var _filepath = fullpath instanceof Array ? fullpath.shift() : fullpath;
            fs.exists(_filepath, function (exists) {
                if (exists) {
                    isRealpath(_filepath).then(function (is) {
                        if (!is) findRealpath();
                        else setRealpath(_filepath);
                    }).catch(console.error);
                } else {
                    findRealpath();
                }
            });
        }
        findRealpath();
    });

}
module.exports = compile;