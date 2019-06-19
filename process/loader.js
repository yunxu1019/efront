"use strict";
var window = this;
var {
    Object,
    parseInt,
    XMLHttpRequest,
    ActiveXObject,
    Error,
    Function,
    Array,
    Promise,
    setTimeout,
    clearTimeout,
    Date,
    Math,
    localStorage,
    navigator,
    document,
    top,
    location,
    console,
    PREVENT_FRAMEWORK_MODE,
    startPath: efrontPath = "zimoli",
    request = function (url, onload, onerror) {
        var version = versionTree[url] || (+new Date).toString(32);
        var xhr = XHR();
        xhr.open("POST", url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var status = xhr.status;
                if (status === 0 || status === 200 || status === 304) {
                    onload(xhr.responseText);
                } else {
                    onerror(xhr.responseText);
                }
            }
        };
        xhr.send(version);
    },
    pixelDecoder // = d => d / 16 + "rem"
} = window;

//去除外层广告
if (PREVENT_FRAMEWORK_MODE !== false) {
    var message = '请关闭后重新打开..';
    try {
        if (top && top !== window && !/MSIE/.test(navigator.userAgent)) {
            top.location.href = window.location.href;
        }
    } catch (e) {
        document.write(message);
        top.location.reload();
        throw message;
    }
}
// 检查性能
var isBadDevice;
{
    let saved_time = new Date;
    let inc = 0;
    try {
        let test = function () {
            inc++;
            document.createElement("div");
            test();
        };
        test();
    } catch (e) {
    }
    var SAFE_CIRCLE_DEPTH = inc / (new Date - saved_time) | 0;
    isBadDevice = SAFE_CIRCLE_DEPTH < 512;
};
var FILE_NAME_REG = /^[^\/].*?[\/\?\-\.\+]|(?:[^\/]\.|[\-\+\?])[^\/]*?$/;
// 适配大小屏
var devicePixelRatio = window.devicePixelRatio || 1;
// if (isBadDevice) devicePixelRatio = 1;
var renderPixelRatio = !/win/i.test(navigator.platform) && devicePixelRatio > 1 && window.innerWidth > 360 && window.innerHeight > 360 ? .86 : .75;
if (document.querySelector && devicePixelRatio > 1 && /Linux/.test(navigator.platform) && navigator.maxTouchPoints > 0) {
    let ratio = +(1000000 / devicePixelRatio + .5 | 0) / 1000000;
    document.querySelector("meta[name=viewport]").setAttribute("content", `width=device-width,target-densitydpi=device-dpi,user-scalable=no,initial-scale=${ratio},maximum-scale=${ratio}`);
    renderPixelRatio *= devicePixelRatio;
}
var initPixelDecoder = function () {
    if (pixelDecoder instanceof Function) {
        modules.fromPixel = pixelDecoder;
        modules.freePixel = window.freePixel || function () {
            throw new Error("您在window上实现了pixelDecoder，请手动实现相应的freePixel!");
        };
        modules.calcPixel = window.calcPixel || function () {
            throw new Error("您在window上实现了pixelDecoder，请手动实现相应的calcPixel!");
        };
        return;
    }
    var maxRenderWidth = +document.body.getAttribute('max-render');
    if (!maxRenderWidth) {
        /**
         * 从px到pt
         */
        modules.fromPixel = pixelDecoder = d => d * renderPixelRatio + "pt";

        /**
         * 从offset到pt
         */
        modules.fromOffset = pixelDecoder;
        /**
         * 从offset到px
         */
        modules.freePixel = d => d * .75 / renderPixelRatio;
        /**
         * 从pixel到offset
         */
        modules.calcPixel = d => d * renderPixelRatio / .75;
        document.documentElement.style.fontSize = `${16 * renderPixelRatio}pt`;
    } else {
        /**
         * 从px到rem
         */
        modules.fromPixel = pixelDecoder = d => d / 16 + "rem";
        /**
         * 从offset到rem
         */
        modules.fromOffset = d => freePixel(d) / 16 + "rem";
        /**
         * 从offset到px
         */
        var freePixel = modules.freePixel = d => window.innerWidth * .75 < maxRenderWidth * renderPixelRatio ? d * .75 / renderPixelRatio : d * .75 / (window.innerWidth / maxRenderWidth * renderPixelRatio);
        /**
         * 从pixel到offset
         */
        modules.calcPixel = d => window.innerWidth * .75 < maxRenderWidth * renderPixelRatio ? d * renderPixelRatio / .75 : d * renderPixelRatio / (window.innerWidth / maxRenderWidth * .75);
        init("css", function (css) {
            var onresize = function () {
                var fontSize = window.innerWidth * .75 < maxRenderWidth * renderPixelRatio ? 16 * renderPixelRatio + "pt" : window.innerWidth / maxRenderWidth * renderPixelRatio * 16 + "pt";
                css("html", {
                    fontSize
                });
            };
            onresize();
            init("on", function (on) {
                on("resize")(window, onresize);
            });
        });
    }
};

var loaddingTree = {};
var requestTree = {};
var responseTree = {};
var versionTree = {};
var forceRequest = {};
var circleTree = {};
var hasOwnProperty = {}.hasOwnProperty;
var XHR = function () {
    return new (XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
};
var loaddata = function (name) {
    var url;
    if (FILE_NAME_REG.test(name)) url = name;
    else switch (name.charAt(0)) {
        case "/":
            url = "page" + name;
            break;
        case "_":
            url = "aapi/" + name.slice(1).replace(/([A-Z])/g, "/$1").toLowerCase();
            break;
        case ".":
            url = "ccon/" + name.slice(1);
            break;
        default:
            url = "comm/" + name;
    }
    var count = 20;
    var run = function () {
        count--;
        if (count < 0) {
            throw new Error("加载" + name + "出错！");
        };
        request(url, function (responseText) {
            responseTree[name] = responseText;
            flush(name);
        }, function () {
            setTimeout(run, parseInt(Math.random() * (20 - count) * 20));
        });
    };
    run();
};
var flush_to_storage_timer = 0,
    responseTree_storageKey = "zimoliAutoSavedResponseTree" + location.pathname;
var saveResponseTreeToStorage = function () {
    var responseTextArray = [];
    for (var k in responseTree) {
        if (versionTree[k]) responseTextArray.push(
            k + "：" + versionTree[k] + "：" + responseTree[k]
        );
    }
    var data = responseTextArray.join("，");
    localStorage && localStorage.setItem(responseTree_storageKey, data);
};
var loadResponseTreeFromStorage = function () {
    function table(sign) {
        var c, table = new Array(256);
        for (var n = 0; n < 256; n++) {
            c = n;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
            table[n] = c;
        }
        return table;
    }

    function crc(bstr, seed) {
        var C = seed ^ -1,
            L = bstr.length - 1;
        for (var i = 0; i < L;) {
            C = C >>> 8 ^ T[(C ^ bstr.charCodeAt(i++, 36)) & 0xFF];
            C = C >>> 8 ^ T[(C ^ bstr.charCodeAt(i++, 36)) & 0xFF];
        }
        if (i === L) C = C >>> 8 ^ T[(C ^ bstr.charCodeAt(i)) & 0xFF];
        return C ^ -1;
    }

    var sign = parseInt("-52l3vk", 36);
    var T = table(sign);
    var load = function (name) {
        var data = localStorage.getItem(responseTree_storageKey);
        if (!data) return;
        var responseTextArray = data.split("，");
        for (var cx = 0, dx = responseTextArray.length; cx < dx; cx++) {
            var kv = responseTextArray[cx].split("：");
            var [responseName, version, responseText] = kv;
            preLoadVersionTree[responseName] = version;
            preLoadResponseTree[responseName] = responseText;
        }
    };
    var preLoadResponseTree = {};
    var preLoadVersionTree = {};
    if (localStorage) load();
    else init("localStorage", function (_localStorage) {
        localStorage = _localStorage;
        load();
    });
    preLoad = function (responseName) {
        if (responseTree[responseName]) return;
        var version = preLoadVersionTree[responseName]
        if (!version) return;
        var responseText = preLoadResponseTree[responseName]
        var sum = crc(responseText).toString(36);
        if (sum + version.slice(sum.length) === versionTree[responseName])
            responseTree[responseName] = responseText;
        // else window.console.log(responseName, sum, version, versionTree[responseName]);
    };
};
var preLoad = function () { };
var flush = function (url) {
    clearTimeout(flush_to_storage_timer);
    var thens = loaddingTree[url];
    delete loaddingTree[url];
    for (var k in thens) {
        var then = thens[k];
        if (then instanceof Function) {
            then(responseTree[url], url);
        }
    }
    flush_to_storage_timer = setTimeout(saveResponseTreeToStorage, 260);
};
var get = function (url, then) {
    preLoad(url);
    if (responseTree[url]) {
        then(responseTree[url], url);
    } else if (loaddingTree[url]) {
        loaddingTree[url].push(then);
    } else {
        loaddingTree[url] = [then];
        loaddata(url);
    }
};
var penddingTree = {};
var getArgs = function (text) {
    var functionArgs, functionBody;
    //依赖项名称部分的长度限制为36*36*18=23328
    var doublecount = parseInt(text.slice(0, 3), 36);
    if (doublecount >> 1 << 1 === doublecount) {
        var dependencesCount = doublecount >> 1;
        var dependenceNamesOffset = 3 + dependencesCount;
        var dependenceNames = text.slice(3, dependenceNamesOffset);
        functionArgs = dependenceNames ? dependenceNames.split(",") : [];
        functionBody = text.slice(dependenceNamesOffset);
    } else {
        functionArgs = [];
        functionBody = text;
    }
    functionBody = functionBody.replace(/^(?:\s*(["'])user? strict\1;?[\r\n]*)?/i, "\"use strict\";\r\n");
    functionBody = functionBody.replace(/((?:\d*\.)?\d+)px(\s*\))?/ig, (m, d, quote) => (d !== '1' ? quote ? renderPixelRatio * d + "pt" + quote : pixelDecoder(d) : renderPixelRatio > 1 ? ".75pt" : .75 / devicePixelRatio + "pt"));
    return [functionArgs, functionBody];
};
var executer = function (text, name, then, prebuild, parents) {
    var [functionArgs, functionBody] = getArgs(text);
    if (!functionArgs.length) {
        if (prebuild && hasOwnProperty.call(prebuild, name)) return then(prebuild[name]);
        if (hasOwnProperty.call(modules, name) && !prebuild) return then(modules[name]);
        try {
            var exports = Function.call(window, functionBody).call(window);
        } catch (e) {
            throw new Error(`[${name}] ${e}`);
        }
        then(modules[name] = exports);
        return;
    }

    var requires = functionArgs.slice(0, functionArgs.length >> 1);
    if (!parents) {
        parents = [];
    }
    if (!parents.indexOf) console.log(parents);
    var index = parents.indexOf(name);
    if (index >= 0) {
        if (!circleTree[name]) {
            var circle = parents.slice(index).concat(name);
            parents.forEach(key => circleTree[key] = circle);
        }

    }
    if (circleTree[name]) {
        var circle = circleTree[name];
        if (!circle[name]) {
            circle[name] = text;
        }
        if (!circle[-1]) {
            circle[-1] = 0
        }
        circle[-1]++;
        if (!circle[-2]) circle[-2] = [];
        circle[-2].push([text, name, then, prebuild, parents]);
        if (circle[-1] < circle.length) {
            return;
        }
        return killCircle(circle);
    }

    init(requires, function (args) {
        // 如果构造该对象没有依赖预置树中的对象，保存这个对象到全局单例对象，否则保存这个对象到预置树
        if (prebuild && hasOwnProperty.call(prebuild, name)) return then(prebuild[name]);
        var prevent_save = 0;
        var argslength = functionArgs.length >> 1;
        prebuild && [].map.call(functionArgs.slice(0, argslength), k => k in prebuild && prevent_save++);
        if (!prevent_save && hasOwnProperty.call(modules, name)) return then(modules[name]);
        try {
            var allArgumentsNames = functionArgs.slice(argslength);
            var exports = Function.apply(window, allArgumentsNames.concat(functionBody)).apply(window, args.concat([allArgumentsNames]));
        } catch (e) {
            throw new Error(`[${name}] ${e}`);
        }
        if (prevent_save) prebuild[name] = exports;
        else modules[name] = exports;
        then(exports);
    }, prebuild, parents.concat(name));
};
var JSON_parser = function (text, name, then) {
    init('JSON', function (JSON) {
        var data = modules[name] || JSON.parse(text);
        if (!/\?/.test(name)) {
            modules[name] = data;
        }
        then(data);
    });
};

var killCircle = function (circle) {
    // 文件存在环形引用
    circle.map(key => modules[key] = delete circleTree[key]);
    console.error(`代码文件存在环形引用，未能成功加载:[ ${circle.join(" >> ")} ]`);
};
var noop = function (text, name, then) {
    then(text);
};
var broadcast = function (text, name) {
    var adapter;
    if (FILE_NAME_REG.test(name)) {
        if (/\.json([\#\?].*?)?$/i.test(name)) {
            adapter = JSON_parser;
        } else if (FILE_NAME_REG.test(name)) {
            adapter = noop;
        }
    } else switch (name.charAt(0)) {
        case ".":
            adapter = noop;
            break;
        default:
            adapter = executer;
    }
    var thens = penddingTree[name];
    delete penddingTree[name];
    for (var cx = 0, dx = thens.length; cx < dx; cx++) {
        var [then, prebuild, parents] = thens[cx];
        adapter(text, name, then, prebuild, parents);
    }
};
var bindthen = function (callback) {
    return function (data) {
        if (Promise && data instanceof Promise) {
            data.then(callback);
        } else {
            callback(data);
        }
    };
};
var init = function (name, then, prebuild, parents) {
    then = bindthen(then);
    if (name instanceof Array) {
        if (!Promise) console.log(name, Promise, preLoad, parents);
        return Promise.all(name.map(function (argName) {
            if (prebuild && argName in prebuild) {
                return prebuild[argName];
            }
            if (name === 'undefined') return void 0;
            return new Promise(function (ok, oh) {
                init(argName, ok, prebuild, parents);
            });
        })).then(function (args) {
            (then instanceof Function) && then(args);
        }).catch(function (e) {
            console.error(e);
        });
    }
    if (modules[name]) {
        return then(modules[name]);
    }
    if (!forceRequest[name] && window[name]) {
        modules[name] = window[name];
        return then(modules[name]);
    }
    if (penddingTree[name]) {
        return penddingTree[name].push([then, prebuild, parents]);
    }
    penddingTree[name] = [
        [then, prebuild, parents]
    ];
    // return 
    get(name, broadcast);
};

var requires_count = 3;
var wrapRenderDigest = function (_then) {
    return function (f) {
        if (f instanceof Function) var promise = _then.call(this, function () {
            if (modules.render && modules.render.digest instanceof Function) {
                modules.render.digest();
            }
            return f.apply(this, arguments);
        });
        else promise = _then.apply(this, arguments);
        return promise;
    };
};
var hook = function (requires_count) {
    if (requires_count === 0) {
        initPixelDecoder();
        "alert confirm innerWidth innerHeight".split(/\s+/).map(removeGlobalProperty);
        loadResponseTreeFromStorage();
        modules.Promise = Promise;
        var promisePrototype = Promise.prototype;
        var { then: _then, catch: _catch, finally: _finally } = promisePrototype;
        promisePrototype.then = wrapRenderDigest(_then);
        promisePrototype.catch = wrapRenderDigest(_catch);
        promisePrototype.finally = wrapRenderDigest(_finally);
        modules.hook_time = +new Date;
        init(efrontPath, function (zimoli) {
            if (zimoli instanceof Function) zimoli();
        });
    }
};
var initIfNotDefined = function (defined, path, onload) {
    if (defined === void 0) init(path, a => onload(a) | hook(--requires_count));
    else hook(--requires_count);
}
var modules = {
    start_time: +new Date,
    IS_BAD_DEVICE: isBadDevice,
    MOVELOCK_DELTA: 3 * renderPixelRatio,
    SAFE_CIRCLE_DEPTH,
    init,
    versionTree,
    responseTree,
    loaddingTree,
    load: loaddata,
    XHR,
    renderPixelRatio,
    debug() {
        document.addEventListener("blur", e => e.stopPropagation());
    },
    put(name, module) {
        modules[name] = module;
    },
    setGetMethod(_get) {
        get = _get;
    },
};
modules.modules = modules;
initIfNotDefined(Promise, "promise", promise => Promise = promise);
initIfNotDefined([].map, "[]map", map => map);
var removeGlobalProperty = function (property) {
    forceRequest[property] = true;
};
var onload = function () {
    window.onload = null;
    hook(--requires_count);
};
if (document.body) onload();
else window.onload = onload;