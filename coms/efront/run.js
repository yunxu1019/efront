"use strict";
var fs = require("fs");
var vm = require("vm");
var os = require("os");
var path = require("path");
var userAgent = "Efront/1.0";
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
        var abort = function () {
            isdestroied = true;
        };
        requestHandles.push(abort);
        url = base.replace(/[^\\\/]*$/, url);
        url = url.replace(/^\/?/, "/");
        packer(url, function (result) {
            var index = requestHandles.indexOf(abort);
            if (index >= 0) {
                requestHandles.splice(index, 1);
            }
            if (isdestroied) return;
            if (result instanceof Error) {
                onerror(result);
            }
            onsuccess(result.toString() || '');
            require("./watch").close();
        });
    };
    require("./watch").close();
    return request;
}
function fromInternet(mainfilepath) {
    var http = require('http');
    var https = require('https');
    var URL = require("url");
    var reg = /^(https?)\:\/\//i;
    function request(url, onsuccess, onerror) {
        if (!reg.test(url)) {
            url = mainfilepath.replace(/\/[^\/]*$/, url.replace(/^\/?/, "/"));
        }
        var _url = URL.parse(url);
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
function efront(getLoader) {
    function Storage() { }
    Storage.prototype = {
        getItem() { },
        setItem() { }
    };

    var Window = function () {
    };
    var window = new Window;
    Object.assign(window, {
        console,
        require,
        Buffer,
        setTimeout(f, timerout) {
            var args = [].slice.call(arguments, 2);
            var handle = setTimeout(function () {
                delete timeoutHandles[handle];
                return f.apply(this, args);
            }, timerout);
            timeoutHandles[handle] = true;
        },
        setInterval() {
            var args = [].slice.call(arguments, 2);
            var handle = setTimeout(function () {
                delete intervalHandles[handle];
                return f.apply(this, args);
            }, timerout);
            intervalHandles[handle] = true;
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
            documentElement: {
                style: {}
            },
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
        request: getLoader(),
        localStorage: new Storage,
        sessionStorage: new Storage

    });
    window.top = window.window = window;
    vm.createContext(window);
    return window;
}
module.exports = function (mainpath, argv) {
    process.argv = argv;
    mainpath = mainpath.replace(/\.[tj]sx?$/i, '');
    var unload = function () {
        Object.keys(intervalHandles).map(clearInterval);
        Object.keys(timeoutHandles).map(clearTimeout);
        requestHandles.slice(0).map(r => r());
    };
    var location = Object.freeze({
        get reload() {
            return function () {
                unload();
                var getLoader;
                if (/^https?\:\/\//i.test(mainpath)) {
                    getLoader = fromInternet.bind(null, mainpath);
                } else {
                    console.log(mainpath);
                    getLoader = fromComponent.bind(null, mainpath);
                }
                var window = efront(getLoader);
                window.location = location;
                window.startPath = mainpath;
                mainLoaderPromise.then(function (loader) {
                    vm.runInContext(`-function(){${loader}}.call(this)`, window);
                }).catch(function (e) {
                    console.log(e);
                    console.error("启动失败");
                });
            };
        }
    });
    location.reload();
};