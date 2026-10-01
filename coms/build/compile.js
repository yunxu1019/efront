"use strict";
var fs = require("fs");
var path = require("path");
var fsp = fs.promises;
var setting = require("./setting");
var searchPath = require("./searchPath");
var globals = require("../efront/globals");
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

async function compile(buildInfo) {
    var { last_build_time: lastBuildTime, dest_root: destroot } = setting;
    if (!linesEnabled) await wait(function () {
        return linesEnabled
    });
    linesEnabled--;
    var { searchpath, searchname, realpath, name, url, builder, extt, destpath } = buildInfo;
    var componentId = getComponentId();
    destpath = path.join(destroot, destpath);
    var fullpath;
    if (searchpath && searchname) {
        fullpath = await searchPath(searchpath, searchname, extt);
    }
    else if (realpath) {
        fullpath = [realpath];
    }
    return new Promise(function (ok, oh) {
        var responseText = buildInfo.data,
            responsePath,
            responseTime = 0,
            responseVersion,
            responseWithWarning,
            writeNeeded = !buildInfo.writed,
            moduleValue;
        var watchurls = buildInfo.watchurls;
        if (!watchurls) watchurls = buildInfo.watchurls = [], watchurls.time = 0;
        var resolve = function () {
            if (responseText instanceof Buffer) {
                responseTime = responseText.time || 0;
            }
            if (watchurls.time) responseTime = watchurls.time;
            Object.assign(buildInfo, {
                data: responseText,
                realpath: responsePath,
                version: responseVersion,
                builtin: moduleValue,
                time: responseTime,
                warn: responseWithWarning
            });
            if (writeNeeded) delete buildInfo.writed;
            ok(buildInfo);
            linesEnabled++;
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
                    detectWithExtension(_realpath, ["", ".js", '.mjs', '.cjs', '.ts', "/index", "/index.js", '/index.ts']).then(function (realpath) {
                        var target = "./" + String(index || 'index').replace(/^\.?[\\\/]+/, '');
                        target = target.replace(/[\\]/g, "/");
                        response(`require("${target}")`, realpath);
                    }).catch(findRealpath);
                };
                var response = function (buffer, p = _filepath) {
                    var id = $split(buildInfo.destpath.replace(/\..*$/, "")).pop();
                    id = '/' + componentId + ' ' + id.replace(/^[\s\S]*?([^\-\\\/\:\.\s]*)$/, "$1");
                    if (buffer && builder) watchurls.splice(0, watchurls.length), responseText = builder(buffer, id, p, watchurls), writeNeeded = true;
                    else if (buffer) writeNeeded = true, responseText = buffer;
                    responsePath = _filepath;
                    responseVersion = stat.mtime;
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
                var reader = async function () {
                    if (!await fsp.exists(destpath)) return loader();
                    for (var wurl of watchurls) {
                        if (!await fsp.exists(wurl)) return loader();
                        var stat = await fsp.stat(wurl);
                        if (stat.mtime > lastBuildTime) return loader();
                    }
                    writeNeeded = false;
                    responsePath = _filepath;
                    responseVersion = stat.mtime;
                    resolve();
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
            if (!fullpath || !fullpath.length) {
                if (window.modules[name]) console.info(i18n`${url} 将被内置模块替换！`), moduleValue = window.modules[name];
                else if (!window.hasOwnProperty(name)) {
                    var color = globals[url] || colors.FgRed2;
                    var colored = `${color}${url}${colors.Reset}`;
                    responseWithWarning = globals[url] ? colored : i18n`没有发现文件：${colored}`;
                }
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