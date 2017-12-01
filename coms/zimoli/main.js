"use strict";
//去除外层广告
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
//var console = window.console;
var document = window.document;
var message = '请关闭后重新打开..';

try {
    if (window.top && window.top !== window && !/MSIE/.test(window.navigator.userAgent)) {
        window.top.location.href = window.location.href;
    }
} catch (e) {
    document.write(message);
    window.top.location.reload();
    throw message;
}
var retry = function (url, count) {
    setTimeout(function () {
        load(url, --count);
    }, parseInt(Math.random()) * 200);
    return count;
};
var XHR = function () {
    return new (XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
};
var load = function (name, count = 150) {
    var url;
    switch (name.charAt(0)) {
        case "/":
            url = "page" + name;
            break;
        case "$":
            url = "ccon/" + name.slice(1);
            break;
        default:
            url = "comm/" + name;
    }
    var xhr = XHR();
    xhr.open("POST", url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if (status === 0 || status === 200 || status === 304) {
                responseTree[name] = xhr.responseText;
                flush(name);
            } else if (count <= 0) {
                throw new Error("加载" + name + "出错！");
            } else {
                count = retry(name, count || 0);
            }
        }
    };
    xhr.send("look inside the light" + Math.random());
};
var flush = function (url) {
    var thens = loaddingTree[url];
    delete loaddingTree[url];
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

function modules() { }
modules.modules = modules;
var pendding = {};
var executer = function (f, args) {
    return f.apply(window, args || []);
};
var noop = function (a) {
    return a
};
var broadcast = function (url, exports) {
    modules[url] = exports;
    var thens = pendding[url];
    delete pendding[url];
    for (var cx = 0, dx = thens.length; cx < dx; cx++) {
        thens[cx](exports);
    }
};
var init = function (name, then, prebuild) {
    if (name instanceof Array) {
        return Promise.all(name.map(function (argName) {
            if (prebuild && argName in prebuild) {
                return prebuild[argName];
            }
            return new Promise(function (ok, oh) {
                init(argName, ok);
            });
        })).then(function (args) {
            (then instanceof Function) && then(args);
        }).catch(function (e) {
            window.console.error(e);
        });
    }
    if (modules[name]) {
        return then(modules[name]);
    }
    if (window[name]) {
        modules[name] = window[name];
        return then(modules[name]);
    }
    var  adapter;
    switch (name.charAt(0)) {
        case "/":
            adapter = executer;
            break;
        case "$":
            adapter = noop;
            break;
        default:
            adapter = executer;
    }
    if (modules[name]) {
        return then(modules[name]);
    }
    if (pendding[name]) {
        return pendding[name].push(then);
    }
    pendding[name] = [then];
    // return 
    get(name, function (text) {
        if (adapter === noop) {
            return broadcast(name, text);
        }
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
        functionBody = functionBody.replace(/^(?:"user? strict";?[\r\n]*)?/i, "\"use strict\";\r\n");
        if (!functionArgs.length) {
            try {
                var exports = adapter(Function.call(window, functionBody));
            } catch (e) {
                throw new Error(`[${name}] ${e}`);
            }
            return broadcast(name, exports);
        }
        init(functionArgs.slice(0, functionArgs.length >> 1), function (args) {
            try {
                var exports = adapter(Function.apply(window, functionArgs.slice(args.length).concat(functionBody)), args);
            } catch (e) {
                throw new Error(`[${name}] ${e}`);
            }
            broadcast(name, exports);
        }, prebuild);
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
var replaceClickEvent = function (fastclick) {
    new fastclick(document.body);
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
if ("ontouchstart" in window) {
    requires_count++;
    init("fastclick", replaceClickEvent);
}
var hook = function (requires_count) {
    if (requires_count === 0) {
        init("zimoli", function (zimoli) {
            modules.go = modules.zimoli = zimoli;
            zimoli();
        });
    }
};
modules.put = function (name, module) {
    modules[name] = module;
};
modules.responseTree = responseTree;
modules.loaddingTree = loaddingTree;
modules.setGetMethod = function (_get) {
    get = _get;
};
modules.load = load;
modules.XHR = XHR;
hook(requires_count);