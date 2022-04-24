"use strict";
var fs = require("fs");
var os = require("os");
var path = require("path");
var isLib = require("./isLib");
var parseURL = require("../basic/parseURL");
var userAgent = "Efront/1.0";
var memery = require("./memery");
var mainLoaderPromise = new Promise(function (ok, oh) {
    fs.readFile(path.join(__dirname, "../basic/loader.js"), function (error, data) {
        if (error) oh(error);
        ok(data.toString());
    });
});
function fromComponent(base) {
    var packer = require("./finalpacker");
    var requestInternet = fromInternet("");
    var request = function (url, onsuccess, onerror) {
        var isdestroied = false;
        if (/^https?\:\/\//i.test(url)) {
            return requestInternet(url, onsuccess, onerror);
        }
        if (/^\/?comm\b/i.test(url)) {
            try {

                var temppath = require.resolve(url.replace(/^\/?comm\b/i, '.').replace(/[\\\$]/g, '/'), { paths: [].concat(memery.coms_path.split(','), ".") })
                if (isLib(temppath)) {
                    var mode = function () {
                        return require(temppath);
                    };
                    mode.file = temppath;
                    onsuccess(mode);
                    return;
                }
            } catch (e) {

            }
        }
        var abort = function () {
            isdestroied = true;
        };
        requestHandles.push(abort);
        var url1 = base.replace(/[^\\\/]*$/, url);
        url1 = url1.replace(/^\/?/, "/");
        packer(url1, function (result) {
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
                    console.fail(url);
                    onerror(url);
                } else {
                    url1 = url.replace(/^comm\//i, '');
                    if (global[url1]) {
                        result = function () { return this }.bind(global[url1]);
                    } else {
                        try {
                            url1 = url1.replace(/\$/g, '/');
                            if (/\//.test(url1)) {
                                var parth = path.relative(url1, '.');
                                if (/^\./.test(parth)) {
                                    url1 = "./" + path.relative('.', url1).replace('\\', '/');
                                }

                                var resolved = require.resolve(url1, { paths: [].concat(memery.coms_path.split(','), '.') });
                            } else {
                                var resolved = require.resolve(url1);
                            }
                            if (resolved) {

                                result = function () {
                                    return require(resolved);
                                };
                                result.file = resolved;
                                result.args = [];
                            }
                        } catch (e) {
                            console.fail(e);
                            onerror(url1);
                        }
                    }
                }
            } else {
                result = result.toString();
            }
            onsuccess(result || '');
            require("./watch").close();
        });
    };
    require("./watch").close();
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
    function Storage() { }
    Storage.prototype = {
        getItem() { },
        setItem() { }
    };

    var Window = function () {
    };
    Window.prototype = global;
    var window = new Window;
    Object.assign(window, {
        performance: {},
        require,
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
        },
        document: {
            body: {
                style: {},
                setAttribute() {
                },
                getAttribute() {
                }
            },
            write() {
                console.log.apply(console, arguments);
            }
        },
        localStorage: new Storage,
        sessionStorage: new Storage

    });
    window.top = window.window = window;
    return window;
}
module.exports = function (mainpath, args) {
    mainpath = mainpath.replace(/\.[cm]?[jt]sx?$/i, '');
    var unload = function () {
        Object.keys(intervalHandles).map(clearInterval);
        Object.keys(timeoutHandles).map(clearTimeout);
        requestHandles.slice(0).map(r => r());
    };
    var _mainpath = "./" + mainpath.replace(/\\/g, '/').replace(/^\.\//, '');
    var fullpath = require.resolve(_mainpath, { paths: [].concat(memery.coms_path.split(","), '.') });
    var pathname = path.relative(mainpath.replace(/[^\\\/]+$/, ''), '.');
    pathname = path.join(fullpath, pathname);
    pathname = pathname.replace(/\\/g, '/').replace(/[^\/]+$/, '');
    var location = Object.freeze({
        pathname,
        reload() {
            unload();
            var window = efront();
            var getLoader;
            if (/^https?\:\/\//i.test(mainpath)) {
                getLoader = fromInternet.bind(window, mainpath);
            } else {
                getLoader = fromComponent.bind(window, '/');
            }
            window.request = getLoader();
            window.location = location;
            window.startPath = _mainpath.replace(/^\.[\/\\]/, '');
            window.process = Object.create(process);
            Object.assign(window.process, {
                argv: args
            });
            mainLoaderPromise.then(function (loader) {
                new Function(loader).call(window);
            }).catch(function (e) {
                console.log(e);
                console.error("启动失败");
            });
        }
    });
    location.reload();
};