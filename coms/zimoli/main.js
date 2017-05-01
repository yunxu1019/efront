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
var Math=this.Math;
var loaddingTree = {};
var requestTree = {};
var responseTree = {};
var retry = function (url, count) {
    setTimeout(function () {
        load(url, ++count);
    }, parseInt(count +Math.random())* 200);
    return count;
};
var load = function (url, count) {
    var xhr = new (XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
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
                count=retry(url,count||0);
            }
        }
    };
    xhr.send("look inside the light");
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
var executer = function (f, args) {
    return f.apply(window, args || []);
}, Zimoli = executer;

function modules() {}
var init = function (name, then) {
    var url, adapter;
    if (then instanceof Function) {
        url = "/comm/" + name + ".js";
        adapter = executer;
    } else {
        adapter = Zimoli;
        url = "/page/" + name + ".js";
    }
    if (modules[url]) {
        return then(modules[url]);
    }
    if (window[name]) {
        modules[url] = window[name];
        return then(modules[url]);
    }
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
            Promise.all(functionArgs.slice(0, functionArgs.length >> 1).map(function (argName) {
                return new Promise(function (ok, oh) {
                    init(argName, function (result) {
                        ok(result);
                    });
                });
            })).then(function (args) {
                modules[url] = adapter(Function.apply(window, functionArgs.slice(args.length).concat(functionBody)), args);
                (then instanceof Function) && then(modules[url]);
            }).catch(function (e) {});
        } else {
            modules[url] = adapter(Function.call(window, functionBody));
            (then instanceof Function) && then(modules[url]);
        }
    });
};
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
            Zimoli = zimoli;
            init("main");
        });
    }
};
hook(requires_count);