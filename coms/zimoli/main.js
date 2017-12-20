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
var Date = window.Date;
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
        case "_":
            url = "aapi/" + name.slice(1).replace(/([A-Z])/g, "/$1").toLowerCase();
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
    xhr.send("{}");
};
var flush = function (url) {
    var thens = loaddingTree[url];
    delete loaddingTree[url];
    for (var k in thens) {
        var then = thens[k];
        if (then instanceof Function) {
            then(responseTree[url], url);
        }
    }
};
var get = function (url, then) {
    if (responseTree[url]) {
        then(responseTree[url], url);
    } else if (loaddingTree[url]) {
        loaddingTree[url].push(then);
    } else {
        loaddingTree[url] = [then];
        load(url);
    }
};
modules.start_time = +new Date;
function modules() { }
modules.modules = modules;
var penddingTree = {};
var executer = function (text, name, then, prebuild) {
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
    functionBody = functionBody.replace(/^(?:\s*(["'])user? strict\1;?[\r\n]*)?/i, "\"use strict\";\r\n");
    if (!functionArgs.length) {
        if (modules[name] && !prebuild) return then(modules[name]);
        else if (prebuild && name in prebuild) return then(prebuild[name]);
        try {
            var exports = Function.call(window, functionBody).call(window);
        } catch (e) {
            throw new Error(`[${name}] ${e}`);
        }
        modules[name] = exports;
        then(exports);
    } else init(functionArgs.slice(0, functionArgs.length >> 1), function (args) {
        // 如果构造该对象没有依赖预置树中的对象，保存这个对象到全局单例对象，否则保存这个对象到预置树
        if (modules[name]) return then(modules[name]);
        else if (prebuild && name in prebuild) return then(prebuild[name]);
        var prevent_save = 0;
        prebuild && [].map.call(functionArgs.slice(0, functionArgs.length >> 1), k => k in prebuild && prevent_save++);
        try {
            var exports = Function.apply(window, functionArgs.slice(args.length).concat(functionBody)).apply(window, args);
        } catch (e) {
            throw new Error(`[${name}] ${e}`);
        }
        if (prevent_save) prebuild[name] = exports;
        else modules[name] = exports;
        then(exports);
    }, prebuild);
};
var noop = function (text, name, then) {
    then(text);
};
var broadcast = function (text, name) {
    var adapter;
    switch (name.charAt(0)) {
        case "$":
            adapter = noop;
            break;
        default:
            adapter = executer;
    }
    var thens = penddingTree[name];
    delete penddingTree[name];
    for (var cx = 0, dx = thens.length; cx < dx; cx++) {
        var [then, prebuild] = thens[cx];
        adapter(text, name, then, prebuild);
    }
};
var init = function (name, then, prebuild) {
    if (name instanceof Array) {
        return Promise.all(name.map(function (argName) {
            if (prebuild && argName in prebuild) {
                return prebuild[argName];
            }
            return new Promise(function (ok, oh) {
                init(argName, ok, prebuild);
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
    if (modules[name]) {
        return then(modules[name]);
    }
    if (penddingTree[name]) {
        return penddingTree[name].push([then, prebuild]);
    }
    penddingTree[name] = [[then, prebuild]];
    // return 
    get(name, broadcast);
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
var requires_count = 1;
var hook = function (requires_count) {
    if (requires_count === 0) {
        init("zimoli", function (zimoli) {
            zimoli();
            modules.hook_time = +new Date;
        });
    }
};
if (!Promise) {
    requires_count++;
    init("promise", replacePromise);
}
if (![].map) {
    requires_count++;
    init("[].map", replaceArrayMap);
}
var onload = function () {
    window.onload = null;
    if ("ontouchstart" in window) {
        requires_count++;
        init("fastclick", replaceClickEvent);
    }
    hook(--requires_count);
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
if (document.body) onload();
else window.onload = onload;