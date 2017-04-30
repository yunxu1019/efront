"use strict";
var window = this;
var parseInt = window.parseInt;
var XMLHttpRequest = window.XMLHttpRequest;
var ActiveXObject = window.ActiveXObject;
var Error = window.Error;
var Function = window.Function;
var setTimeout = window.setTimeout;
var Array = window.Array;
var Date=this.Date;
var Promise = window.Promise;
var console = window.console;
var loaddingTree = {};
var requestTree = {};
var responseTree = {};
var load = function (url, count) {
    var xhr = new(XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
    xhr.open("POST", url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if (status === 0 || status === 200 || status === 304) {
                responseTree[url] = xhr.responseText;
                flush(url);
            } else if (count < 3) {
                load(url, ++count || 0);
            } else {
                throw new Error("加载" + url + "出错！");
            }
        }
    };
    xhr.send("look inside the light"+Date.now());
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
var get = function (name, then) {
    var url = "/comm/" + name;
    if (responseTree[url]) {
        setTimeout(function () {
            then(responseTree[url]);
        });
    } else if (loaddingTree[url]) {
        loaddingTree[url].push(then);
    } else {
        loaddingTree[url] = [then];
        load(url);
    }
};

function modules() {};
var init = function (name, then) {
    if (modules[name]) {
        return setTimeout(function () {
            then(modules[name]);
        });
    }
    // return 
    get(name, function (text) {
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
            if (!Promise) {
                return init("promise", function (promise) {
                    Promise = promise;
                    init(name, then);
                });
            }
            if (!Array.prototype.map) {
                return init("[].map", function (map) {
                    Array.prototype.map = map;
                    init(name, then);
                });
            }
            Promise.all(functionArgs.slice(0, functionArgs.length >> 1).map(function (argName) {
                return new Promise(function (ok, oh) {
                    init(argName, function (result) {
                        ok(result);
                    });
                });
            })).then(function (args) {
                modules[name] = Function.apply(null, functionArgs.slice(args.length).concat(functionBody)).apply(null, args);
                (then instanceof Function) && then(modules[name]);
            });
        } else {
            modules[name] = new Function("undefined","void 0;"+functionBody)();
            (then instanceof Function) && then(modules[name]);
        }
    });
};
init("zimoli");