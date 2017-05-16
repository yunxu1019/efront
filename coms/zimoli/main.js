"use strict";
var window = this;
var parseInt = window.parseInt;
var XMLHttpRequest = window.XMLHttpRequest;
var ActiveXObject = window.ActiveXObject;
var Error = window.Error;
var Function = window.Function;
var Array = window.Array;
var Promise = window.Promise;
var setTimeout = window.setTimeout;
var Math = window.Math;
var loaddingTree = {};
var requestTree = {};
var responseTree = {};
var console = this.console;
var retry = function (url, count) {
    setTimeout(function () {
        load(url, ++count);
    }, parseInt(count + Math.random()) * 200);
    return count;
};
var load = function (url, count) {
    var xhr = new(XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
    xhr.open("POST", url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if (status === 0 || status === 200 || status === 304) {
                responseTree[url] = xhr.responseText;
                flush(url);
            } else if (count > 150) {
                throw new Error("加载" + url + "出错！");
            } else {
                count = retry(url, count || 0);
            }
        }
    };
    xhr.send("look inside the light" + Math.random());
    return xhr;
};
var flush = function (url) {
    var thens = loaddingTree[url];
    for (var k in thens) {
        var then = thens[k];
        if (then instanceof Function) {
            then(responseTree[url]);
        }
    }
};
var get = function (url, then) {
    if (responseTree[url]) {
        then(responseTree[url]);
    } else if (loaddingTree[url]) {
        loaddingTree[url].push(then);
    } else {
        loaddingTree[url] = [then];
        load(url);
    }
};

function modules() {}
var pendding = {};
var executer = function (f, args) {
    return f.apply(window, args || []);
};
var broadcast = function (url, exports) {
    modules[url] = exports;
    var thens = pendding[url];
    delete pendding[url];
    return thens.map(function (then) {
        then(exports);
    });
}
var init = function (name, then) {
    if (name instanceof Array) {
        return Promise.all(name.map(function (argName) {
            return new Promise(function (ok, oh) {
                init(argName, ok);
            });
        })).then(function (args) {
            (then instanceof Function) && then(args);
        }).catch(function (e) {});
    }
    if (modules[name]) {
        return then(modules[name]);
    }
    if (window[name]) {
        modules[name] = window[name];
        return then(modules[name]);
    }
    var url;
    switch (name[0]) {
        case "/":
            url = "/page" + name;
            break;
        case "$":
        
            break;
        default:
            url = "/comm/" + name;
    }
    if (modules[url]) {
        return then(modules[url]);
    }
    if (pendding[url]) {
        return pendding[url].push(then);
    }
    pendding[url] = [then];
    var adapter = executer;
    // return 
    get(url, function (text) {
        var functionArgs, functionBody;
        //依赖项名称部分的长度限制为36*36*18=23328
        var doublecount = parseInt(text.slice(0, 3), 36);
        if (doublecount >> 1 << 1 === doublecount) {
            var dependencesCount = doublecount >> 1;
            var perdependenceCount = doublecount - (dependencesCount << 1);
            var dependenceNamesOffset = 3 + dependencesCount;
            var dependenceNames = text.slice(3, dependenceNamesOffset);
            functionArgs = dependenceNames ? dependenceNames.split(",") : [];
            functionBody = text.slice(dependenceNamesOffset);
        } else {
            functionArgs = [];
            functionBody = text;
        }
        if (functionArgs.length) {

            init(functionArgs.slice(0, functionArgs.length >> 1), function (args) {
                var exports = adapter(Function.apply(window, functionArgs.slice(args.length).concat(functionBody)), args);
                broadcast(url, exports);
            });
        } else {
            var exports = adapter(Function.call(window, functionBody));
            broadcast(url, exports);
        }
    });
};
modules.init = init;
var replacePromise = function (promise) {
    Promise = promise;
    hook(--requires_count);
};
var replaceArrayMap = function (map) {
    Array.prototype.map = map;
    hook(--requires_count);
};
var requires_count = 0;
if (!Promise) {
    requires_count++;
    init("promise", replacePromise);
}
if (![].map) {
    requires_count++;
    init("[].map", replaceArrayMap);
}
var hook = function (requires_count) {
    if (requires_count === 0) {
        init("zimoli", function (zimoli) {
            modules.go = modules.zimoli = zimoli;
            zimoli("/main");
        });
    }
};
hook(requires_count);