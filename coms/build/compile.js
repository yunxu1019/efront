"use strict";
var fs = require("fs");
var path = require("path");
var getDepedence = require("./getDependence");
var searchPath = require("./searchPath");
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
    NaN,
    Math,
    module: true,
    exports: true,
    require: true,
    Date,
    Infinity,
    Error,
    TypeError,
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
    modules: {
        state: {},
        init: {},
        put: {},
        prepare: {},
        MOVELOCK_DELTA: 3,
        SAFE_CIRCLE_DEPTH: 300,
        efrontPath: '',
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
var { PREFIX } = require("../efront/memery");
function getComponentId() {
    componentIncreasedId++;
    return PREFIX + componentIncreasedId.toString(26).replace(/\d/g, a => String.fromCharCode('q'.charCodeAt(0) + +a));
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

async function compile() {
    var [buildInfo, lastBuildTime, destroot] = arguments;
    if (!linesEnabled) return wait(arguments);
    linesEnabled--;
    var { searchpath, searchname, fullpath, realpath, name, url, builder, extt, destpath } = buildInfo;
    var componentId = getComponentId();
    destpath = path.join(destroot, destpath);
    var fullpath;
    if (searchpath && searchname) {
        fullpath = await searchPath(searchpath, searchname, extt);
    }
    else if (realpath) {
        fullpath = [realpath];
    }
    else {
        fullpath = [].concat(fullpath);
    }
    return new Promise(function (ok, oh) {
        var responseText,
            responsePath,
            responseTime = 0,
            responseVersion,
            responseWithWarning,
            writeNeeded,
            isPackaged,
            moduleValue;

        var resolve = function () {
            if (responseText instanceof Buffer) {
                responseTime = responseText.time || 0;
                buildInfo.occurs = responseText.occurs;
                buildInfo.isYield = responseText.isYield;
                buildInfo.isAsync = responseText.isAsync;
                buildInfo.isBroken = responseText.isBroken;
            }
            Object.assign(buildInfo, {
                needed: writeNeeded,
                data: responseText,
                realpath: responsePath,
                version: responseVersion,
                builtin: moduleValue,
                isPackaged,
                time: responseTime,
                warn: responseWithWarning
            });

            if (responseText instanceof Promise) {
                responseText.then(function (data) {
                    buildInfo.data = data;
                    buildInfo.time = data.time;
                    buildInfo.occurs = data.occurs;
                    buildInfo.isAsync = data.isAsync;
                    buildInfo.isYield = data.isYield;
                    buildInfo.isBroken = data.isBroken;
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
                if (error) throw new Error(i18n`读取文件信息出错${url}`);
                var isDirectory = false;
                if (!stat.isFile()) {
                    if (!stat.isDirectory()) {
                        throw new Error(i18n`源路径不存在文件${url}`);
                    }
                    isDirectory = true;
                }
                var loadpackage = function (packagepath) {
                    fs.readFile(packagepath, function (error, packagedata) {
                        if (error) throw new Error(i18n`加载${packagepath}出错`);
                        var packageobject = JSON.parse(String(packagedata));
                        loadindex(packageobject.main || 'index');
                    });
                };
                var loadindex = function (index) {
                    // var split = /^\//.test(url) ? '/' : '$';
                    var _realpath = path.join(_filepath, index || 'index');
                    detectWithExtension(_realpath, ["", ".js", "/index", "/index.js"]).then(function (realpath) {
                        var target = "./" + String(index || 'index').replace(/^\.?[\\\/]+/, '');
                        target = target.replace(/[\\]/g, "/");
                        response(`require("${target}")`, realpath);
                    }).catch(findRealpath);
                };
                var response = function (buffer, p = _filepath) {
                    var id = buildInfo.destpath.replace(/\..*$/, "").replace(/[^\w]/g, a => "_" + a.charCodeAt(0).toString(36) + "-");
                    id = '/' + componentId + ' ' + id.replace(/^[\s\S]*?(\w*)$/, "$1");
                    responseText = builder(buffer, id, p, []);
                    responsePath = _filepath;
                    isPackaged = isDirectory;

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
                        _filepath += path.sep;
                        var __filepath = path.join(_filepath, 'package.json');
                        if (fs.existsSync(__filepath)) {
                            fs.stat(__filepath, function (error, stat) {
                                if (error) throw new Error(i18n`加载${url}出错！`);
                                if (stat.isFile()) loadpackage(__filepath);
                                else loadindex();
                            });
                        } else {
                            loadindex();
                        }
                        return;
                    }

                    fs.readFile(_filepath, function (error, buffer) {
                        if (error) throw new Error(i18n`加载${url}出错！`);
                        response(buffer);
                    });
                };
                var reader = function (hasless) {
                    if (!fs.existsSync(destpath)) return loader();
                    return fs.readFile(destpath, function (error, buffer) {
                        if (error) throw new Error(i18n`读取已编译数据失败！url:${url}`);
                        if (hasless === false && getDepedence({ data: buffer }).indexOf("cless") >= 0) {
                            return loader();
                        }
                        writeNeeded = false;
                        responsePath = _filepath;
                        responseText = buffer;
                        responseVersion = stat.mtime;
                        resolve();
                    });
                };
                if (lastBuildTime - stat.mtime > 10000 && !require('../efront/memery').indexreg.test(destpath)) {
                    var statless = function () {
                        var less_file = _filepath.replace(/\.([cm]?[jt]sx?|html?)$/i, ".less");
                        if (!fs.existsSync(less_file)) return reader(false);
                        fs.stat(less_file, function (error, stat) {
                            if (error) throw new Error(i18n`读取less文件出错！lessfile:${less_file}`);
                            if (lastBuildTime - stat.mtime > 10000) {
                                reader(true);
                            } else {
                                loader();
                            }
                        });
                    };
                    if (/\.([cm]?[jt]sx?|html?)$/i.test(_filepath)) {
                        if (/\.[cm]?[jt]sx?$/i.test(_filepath)) {
                            var html_file = _filepath.replace(/\.[cm]?[jt]sx?$/i, ".html");
                            if (!fs.existsSync(html_file)) return statless();
                            fs.stat(html_file, function (error, stat) {
                                if (error) throw new Error(i18n`读取html文件出错！htmlfile:${html_file}`)
                                if (lastBuildTime - stat.mtime > 10000) {
                                    statless();
                                } else {
                                    loader();
                                }
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
                if (window.modules[name]) console.info(i18n`${url} 将被内置模块替换！`), moduleValue = window.modules[name];
                else if (!window.hasOwnProperty(name)) responseWithWarning = i18n`没有发现文件：${url}`;
                else console.info(i18n`${url} 将使用运行环境的全局变量`);
                resolve();
                return;
            }
            if (fullpath instanceof Array) {
                _filepath = fullpath.shift();
            } else {
                var _filepath = fullpath;
                fullpath = [];
            }
            if (fs.existsSync(_filepath)) {
                isRealpath(_filepath).then(function (is) {
                    if (!is) findRealpath();
                    else setRealpath(_filepath);
                }).catch(console.error);
            } else {
                findRealpath();
            }
        }
        findRealpath();
    });

}
module.exports = compile;