"use strict";
var fs = require("fs");
var os = require("os");
var path = require("path");
var isLib = require("./isLib");
var inCom = require('./inCom');
var setupenv = require("./setupenv");
var parseURL = require("../basic/parseURL");
var userAgent = "Efront/1.0";
var memery = require("./memery");
var resolve_config = { paths: [process.cwd().replace(/\\/g, '/'), ...memery.COMS_PATH.split(',')], extensions: ["", ".js", '.cjs', '.mjs'] };
var detect = require("../reptile/detectWithExtension");
var mainLoaderPromise = new Promise(function (ok, oh) {
    fs.readFile(path.join(__dirname, "../basic/#loader.js"), function (error, data) {
        if (error) oh(error);
        ok(data.toString());
    });
});
var loadedmap = Object.create(null);
function fromComponent(env, base) {
    var packer = require("./finalpacker").bind(env);
    var pathname = this.location.pathname;
    var resolve_options = Object.assign({}, resolve_config, { paths: [pathname].concat(resolve_config.paths) });
    var requestInternet = fromInternet("");
    var request = async function (url, onsuccess, onerror) {
        var isdestroied = false;
        if (/^https?\:\/\//i.test(url)) {
            return requestInternet(url, onsuccess, onerror);
        }
        if (/^\/?comm\//i.test(url)) {
            try {
                var temppath = await detect(url.replace(/^\/?comm\b/i, '.').replace(/([\s\S])\$|[\\]/g, '$1/'), resolve_options.extensions, resolve_config.paths);
                var compath = inCom(temppath, resolve_config.paths);
                if (isLib(temppath) || !compath) {
                    var mode = function () {
                        return require(temppath);
                    };
                    mode.file = temppath;
                    onsuccess(mode);
                    return;
                }
                url = "comm/" + compath.replace(/\\/g, '/');
            } catch {
            }
        }
        var abort = function () {
            isdestroied = true;
        };
        requestHandles.push(abort);
        var url1 = base.replace(/[^\\\/]*$/, '') + url;
        url1 = url1.replace(/^\/?/, "/");
        packer(url1, async function (result) {
            var index = requestHandles.indexOf(abort);
            if (index >= 0) {
                requestHandles.splice(index, 1);
            }
            if (isdestroied) return;
            if (result instanceof Error) {
                onerror(result);
            }
            if (!result) {
                if (!/^comm\//i.test(url)) {
                    onerror(url);
                } else {
                    url1 = url.replace(/^comm\//i, '');
                    if (global[url1]) {
                        result = function () { return this }.bind(global[url1]);
                    } else {
                        try {
                            url1 = require("../basic/$split")(url1).join("/");
                            if (/\./.test(url1)) {
                                var parth = path.relative(url1, '.');
                                if (/^\./.test(parth)) {
                                    url1 = "./" + path.relative('.', url1).replace('\\', '/');
                                }
                                var resolved = await detect(url1, resolve_options.extensions, resolve_config.paths);
                            } else {
                                var resolved = url1;
                            }
                            if (resolved) {
                                result = function () {
                                    return require(resolved);
                                };
                                result.file = resolved;
                                result.args = [];
                            }
                        } catch (e) {
                            console.log(url1, require.resolve)
                            onerror(url1);
                        }
                    }
                }
            } else {
                loadedmap[url.replace(/^(comm)\//, '')] = result.path;
                result = result.toString();
            }
            onsuccess(result || '');
        });
    };
    return request;
}
function fromInternet(mainfilepath) {
    var http = require('http');
    var https = require('https');
    var reg = /^(https?)\:\/\//i;
    function request(url, onsuccess, onerror) {
        if (!reg.test(url)) {
            url = mainfilepath.replace(/\/[^\/]*$/, url.replace(/^\/?/, "/"));
        }
        var _url = parseURL(url);
        var req = /^https?/i.test(_url.protocol) ? https : http;
        var onend = function () {
            var index = requestHandles.indexOf(abort);
            if (index >= 0) {
                requestHandles.splice(index, 1);
            }
        };
        var request = req.request(Object.assign({ method: "get" }, _url), function (res) {
            var result = [];
            var size = 0;
            res.on("data", function (buffer) {
                size += buffer.length;
                result.push(buffer);
            });
            res.once("end", function (event) {
                onend();
                onsuccess(Buffer.concat(result).toString());
            });
            res.once("abort", onend);
            res.once('timeout', function (event) {
                onend();
                onerror(event);
            });
            res.once("error", function (event) {
                onend();
                onerror(event);
            });
        });
        request.end();
        var abort = request.abort.bind(request);
        requestHandles.push(abort);
    }
    return request;
}
var timeoutHandles = {};
var intervalHandles = {};
var requestHandles = [];
function efront() {
    var colors = require("../reptile/colors");
    var window = require("../reptile/window");
    if (!window.require) window.require = require;
    Object.assign(window, {
        eval(str, filename) {
            return require("vm").runInThisContext(str, { filename: `${colors.FgYellow}${loadedmap[filename] || filename}${colors.Reset}` });
        },
        setTimeout(f, timerout) {
            var args = [].slice.call(arguments, 2);
            var handle = setTimeout(function () {
                delete timeoutHandles[handle];
                return f.apply(this, args);
            }, timerout);
            timeoutHandles[handle] = true;
            return handle;
        },
        setInterval(f, timerout) {
            var args = [].slice.call(arguments, 2);
            var handle = setInterval(function () {
                delete intervalHandles[handle];
                return f.apply(this, args);
            }, timerout);
            intervalHandles[handle] = true;
            return handle;
        },
        navigator: {
            userAgent,
            platform: os.platform()
        },
        clearTimeout(handle) {
            delete timeoutHandles[handle];
            return clearTimeout(handle);
        },
        clearInterval(handle) {
            delete intervalHandles[handle];
            return clearInterval(handle);
        }
    });
    return window;
}
module.exports = async function (mainpath, args) {
    var fullpath = mainpath;
    var appname = path.isAbsolute(mainpath) ? mainpath : "./" + mainpath.replace(/^\.[\/\\]/, '').replace(/\\/g, '/');
    mainpath = mainpath.replace(/\.[cm]?[jt]sx?$/i, '');
    var unload = function () {
        Object.keys(intervalHandles).forEach(clearInterval);
        Object.keys(timeoutHandles).forEach(clearTimeout);
        requestHandles.splice(0, requestHandles.length).forEach(r => r());
    };
    if (!path.isAbsolute(fullpath)) fullpath = fs.existsSync(fullpath) ? path.resolve(fullpath) : await detect("./" + fullpath.replace(/\\/g, '/').replace(/^\.\//, ''), resolve_config.extensions, resolve_config.paths);
    var pathname = path.relative(mainpath.replace(/[^\\\/]+$/, ''), '.');
    pathname = path.join(fullpath, pathname);
    pathname = pathname.replace(/\\/g, '/').replace(/[^\/]+$/, '');
    var env = setupenv(appname);
    env.root = pathname;
    resolve_config.paths = env.COMS_PATH.split(',');
    var location = Object.freeze({
        pathname,
        reload() {
            unload();
            var window = efront();
            var getLoader;
            if (/^https?\:\/\//i.test(mainpath)) {
                getLoader = fromInternet.bind(window, mainpath);
            } else {
                getLoader = fromComponent.bind(window, env, '/');
            }
            window.location = location;
            window.startPath = appname;
            window.process = process;
            process._argv = args;
            window.request = getLoader();
            mainLoaderPromise.then(function (loader) {
                new Function(loader).call(window);
            }).catch(function (e) {
                console.log(e, Date)
                console.error(i18n`启动失败`);
            });
        }
    });
    location.reload();
};