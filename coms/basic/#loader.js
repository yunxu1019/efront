"use strict";
var window = this;
var isProduction = true;
// <!-- isProduction = false; -->
var {
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
    navigator,
    document,
    top,
    location,
    Object,
    console,
    efrontURI,
    parseFloat,
    encodeURI,
    preventFrame,
    preventCodeStorage = true,
    PREVENT_FRAMEWORK_MODE = preventFrame,
    devicePixelRatio = 1,
    startPath: efrontPath,
    pixelDecoder // = d => d / 16 + "rem"
} = window;
if (PREVENT_FRAMEWORK_MODE !== false) {
    var message = '请关闭后重新打开..';
    try {
        if (top && top !== window && !/MSIE/.test(navigator.userAgent)) {
            top.location.href = window.location.href;
        }
    } catch (e) {
        document.write(message);
        top.location.reload();
        console.error(message);
        return;
    }
}
var efront_time = +new Date;
var _devicePixelRatio = devicePixelRatio;
var request = window.request || function (url, onload, onerror, version) {
    var xhr = new (XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
    url = encodeURI(url);
    xhr.open("POST", url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if (status === 0 || status === 200 || status === 304) {
                if (onload instanceof Function) onload(xhr.responseText);
            } else {
                if (onerror instanceof Function) onerror(new Error(xhr.responseText));
            }
        }
    };
    xhr.send(version);
};
var loadingTree = {};
var responseTree = {};
var versionTree = {};
var isThenable = function (a) {
    return a && a.then instanceof Function;
};
var keyprefix = "";
var flushTree = function (tree, key, res) {
    var response = tree[key];
    if (response && !response.error) {
        delete tree[key];
        if (res) tree[key] = res;
    }
    if (response instanceof Array) {
        for (var cx = 0, dx = response.length; cx < dx; cx++) {
            var call = response[cx];
            if (call instanceof Function) {
                call(response.error ? key : null);
            }
        }
    }
};
var readingCount = 0;
var readFile = function (names, then) {
    if (names instanceof Array) {
        names = names.slice(0);
        var loaded = 0, errored = [];
        var callback = function (e) {
            if (e) {
                errored.push(name);
            }
            if (++loaded === names.length) {
                then(errored.length ? errored : null);
            }
        };
        if (!names.length) return then();
        for (var name of names) {
            readFile(name, callback);
        }
        return;
    }
    var name = names;
    var key = keyprefix + name;
    if (hasOwnProperty.call(responseTree, name)) {
        then();
        return;
    }
    if (loadingTree[key] instanceof Array) {
        loadingTree[key].push(then);
        return;
    }
    loadingTree[key] = [then];
    var url;
    if (FILE_NAME_REG.test(name)) {
        url = name;
    } else {
        switch (name.charAt(0)) {
            case ":":
                url = "node/" + name.slice(1);
                break;
            case "/":
                url = "page" + name;
                break;
            default:
                url = "comm/" + name;
        }
        if (efrontURI) url = efrontURI + url;
    }
    var version = versionTree[name] || (+new Date).toString(32);


    readingCount++;
    var errorcount = 0;
    var ok = function (res) {
        responseTree[name] = res;
        flushTree(loadingTree, key);
        clearTimeout(flush_to_storage_timer);
        flush_to_storage_timer = setTimeout(saveResponseTreeToStorage, 200);
        readingCount--;
        // <!--
        if (readingCount === 0) {
            killCircle();
        }
        // -->
    };
    var oh = function (e) {
        if (isProduction) {
            if (errorcount < 2) {
                errorcount++;
                setTimeout(tryload, 200 + 1000 * errorcount);
                return;
            }
        }
        if (loadingTree[key]) {
            loadingTree[key].error = e;
            var loading = loadingTree[key];
            for (var a of loading) a(e);
        }
    };
    var tryload = function () {
        request(url, ok, oh, version);
    }
    tryload();

};
var createFunction = function (name, body, args, isAsync, isYield) {
    return window.eval(`[${isAsync ? 'async ' : ''}function${isYield ? "*" : ""}/*${name}*/(${args || ''}){${body}\r\n}][0]`, name);
};

var FILE_NAME_REG = /^https?\:|\.(html?|css|asp|jsp|php)$/i;
var loadedModules = {};
// <!--
var undefinedModules = {};
var killCircle = function () {
    var undefinedkeys = Object.keys(undefinedModules);
    if (undefinedkeys.length) console.warn("已使用 undefined 代替", undefinedkeys.join(", "));
    undefinedModules = {};
    var penddings = {}, circle = [], module_keys = [];
    for (var k in loadedModules) {
        if (k.slice(0, keyprefix.length) === keyprefix && loadedModules[k] instanceof Array) {
            var key = k.slice(keyprefix.length);
            if (!(loadedModules[k] instanceof Array)) continue;
            var args = loadedModules[k].args;
            if (!(args instanceof Array)) continue;
            for (var arg of args) {
                if (!penddings[arg]) {
                    penddings[arg] = [];
                }
                if (!penddings[arg][k]) {
                    penddings[arg][k] = true;
                    penddings[arg].push(key);
                }
            }
            circle.push(key);
            module_keys.push(k);
        }
    };
    if (!circle.length) return;
    while (circle.length) {
        var deleted = Object.create(null);
        var savedLength = circle.length;
        for (var cx = circle.length - 1; cx >= 0; cx--) {
            var arg = circle[cx];
            var deps = penddings[arg];
            if (!deps || !deps.length) {
                circle.splice(cx, 1);
                delete penddings[arg];
                deleted[arg] = true;
            }
        }
        if (savedLength === circle.length) {
            break;
        }
        for (var c of circle) {
            var args = penddings[c];
            penddings[c] = args.filter(a => !deleted[a]);
        }
    }
    if (circle.length > 0) {
        circle = circle.sort((a, b) => {
            if (~penddings[b].indexOf(a)) return -1;
            if (~penddings[a].indexOf(b)) return 1;
            return 0;
        });
        circle = circle.map((a, cx) => {
            if (cx + 1 === circle.length) return a;
            var b = circle[cx + 1];
            if (~penddings[b].indexOf(a)) return a + "%c>>%c";
            return a + "%c^%c";
        });
        console.log.apply(console, [].concat.apply(
            [`代码文件存在环形引用，未能成功加载: \r\n[ >>%c${circle.join("")}%c ]`],
            circle.map(a => ['color:#fff;background:#c24', 'color:#333;background:transparent'])
        ));
    } else {
        var tree = {};
        for (var k of module_keys) {
            var loading = tree[k] = loadedModules[k];
            loadedModules[k] = loading.mod;
        }
        for (var k of module_keys) flushTree(tree, k);
    }
};
var multiModules = Object.create(null);
// -->
var hasOwnProperty = {}.hasOwnProperty;
var loadModule = function (url, then, prebuilds = {}) {
    var name = url.replace(/[\#\*~\?][\s\S]*$/, '');
    if (/^(?:module|exports|define|import_meta|require|window|global|undefined)$/.test(name)) return then();
    if ((hasOwnProperty.call(prebuilds, url)) || hasOwnProperty.call(modules, url) || (!hasOwnProperty.call(forceRequest, name) && !/^on/.test(name) && window[name] !== null && window[name] !== void 0)
    ) return then();
    preLoad(url);
    var key = keyprefix + url;
    if (loadedModules[key] instanceof Function) {
        then();
        return;
    }
    if (loadedModules[key] instanceof Array) {
        if (loadedModules[key].error) return then(key);
        loadedModules[key].push(then);
        return;
    }
    loadedModules[key] = [then];
    if (FILE_NAME_REG.test(name)) {
        var saveModule = function () {
            flushTree(responseTree, name, function (data) {
                return data;
            }.bind(null, responseTree[name]));
        };
        if (/\.json([\#\?].*?)?$/i.test(name)) {
            readFile(["JSON", url], saveModule);
        } else {
            readFile(url, saveModule);
        };
    }
    else {

        var saveModule = function (error) {
            var data = responseTree[url];
            if (typeof data === "function") {
                var mod = data;
                mod.noenv = true;
                flushTree(loadedModules, key, mod);
                return;
            }
            if (error) {
                loadedModules[key].error = error;
                flushTree(loadedModules, key);
                return;
            }
            // <!--
            if (!data) undefinedModules[name] = true;
            // -->
            var afterfix = url.slice(name.length);
            var [argNames, body, args, required, strs, isAsync, isYield] = getArgs(data, afterfix);
            if (isProduction) {
                strs = strs.map ? strs.map(toRem) : strs;
            } else {
                body = toRem(body);
            }
            var mod = createFunction(name, body, argNames, isAsync, isYield);
            mod.args = args;
            mod.argNames = argNames;
            mod.strs = strs;
            var loadingCount = 0;
            if (required) {
                required = required.split(';').filter(a => !!a);
                if (afterfix) required = required.map(r => r + afterfix);
            }
            required = required ? get_relatives(name, required) : [];
            mod.required = required;
            mod.file = name;
            args = args.concat(required);
            var _errored = [];
            var response = function (error) {
                loadingCount++;
                if (error) {
                    if (!errored[error]) errored[error] = [];
                    errored[error].push(key);
                    if (_errored.indexOf(error) < 0) _errored.push(error);
                }
                if (loadingCount === args.length) {
                    if (_errored.length) loadedModules[key].error = _errored;
                    flushTree(loadedModules, key, mod);
                }
            };
            if (!args.length) {
                flushTree(loadedModules, key, mod);
            } else {
                loadedModules[key].args = mod.args;
                loadedModules[key].mod = mod;
                for (var moduleName of args) {
                    loadModule(moduleName, response, prebuilds);
                }
            }
        };
        readFile(url, saveModule);
    }
};
var toRem = text => pixelDecoder && typeof text === 'string' ? text.replace(/(\:\s*)?\b((?:\d*\.)?\d+)px(\s*\))?/ig, (m, h, d, quote) => (h || "") + (d !== '1' ? h && quote ? renderPixelRatio * d + "pt" : pixelDecoder(d) : renderPixelRatio > 1 ? ".78pt" : 0.78 / devicePixelRatio + "pt") + (quote || "")) : text;
"use ./#decrypt.js";
var getArgs = function (text, aftfix) {
    if (!aftfix || /^\*/.test(aftfix)) {
        "use ./#decrypt_.js";
    }
    var args, functionBody;
    //依赖项名称部分的长度限制为36*36*18=23328
    var doublecount = parseInt(text.slice(0, 3), 36);
    if (doublecount >> 1 << 1 === doublecount) {
        var dependencesCount = doublecount >> 1;
        var dependenceNamesOffset = 3 + dependencesCount;
        var dependenceNames = text.slice(3, dependenceNamesOffset);
        args = dependenceNames ? dependenceNames.split(",") : [];

        functionBody = text.slice(dependenceNamesOffset);
        var strreg = /^(\w{1,6})(?=\[)/;
        var match = strreg.exec(functionBody);
        if (match) {
            var str = match[1];
            var strlength = parseInt(str, 36);
            if (strlength >> 1 << 1 === strlength) {
                strlength = strlength >> 1;
                var strstart = str.length;
                var strend = strstart + strlength;
                var strs = functionBody.slice(strstart, strend);
                strs = createFunction("return", "return" + strs)();
                functionBody = functionBody.slice(strend);
            }
        }

        var argsstart = (args.length - (strs ? strs.length : 0)) >> 1;
        var argsend = (argsstart << 1) + (strs ? strs.length : 0);
        var argNames = args.slice(argsstart, argsend);
        var required = args[argsend];
        args = args.slice(0, argsstart);
        if (aftfix) {
            args = args.map(a => a + aftfix);
        }
    } else {
        functionBody = text;
    }
    var [, isAsync, isYield] = /^(@?)(\*?)/.exec(functionBody);
    if (isAsync || isYield) functionBody = functionBody.slice(+!!isAsync + +!!isYield);
    return [argNames || [], functionBody, args || [], required || '', strs || [], !!isAsync, !!isYield];
};
var get_relatives = function (name, required, prefix = "") {
    return required.map(r => {
        return resolve(r, name, prefix);
    });
};
function resolve(r1, base, prefix = '') {
    var is_page = /^\//.test(base);
    base = base.replace(/[^\/\$]+$/, "").replace(/^\.?[\/\$]+/, "");
    if (/^\.*[\/]/.test(r1)) {
        r1 = r1.replace(/^\.\//, '');
        while (/\.\.[\/\$]/.test(r1)) {
            if (/^[\\\/\$\.]*$/.test(base)) {
                break;
            }
            base = base.replace(/[^\/\$]*[\/\$]$/, '');
            r1 = r1.slice(3);
        }
        base = base.replace(/^[\/\$]/, '');
        if (/^\//.test(r1)) {
            base = '';
            r1 = r1.slice(1);
        }
        if (is_page) {
            base = "/" + base;
        }
        if (!/^\.*\//.test(base)) {
            base = prefix + base;
        }
        if (prefix) {
            base = base.replace(/\$/g, "/");
            r1 = r1.replace(/\$/g, '/');
        } else {
            base = base.replace(/\//g, "$");
            r1 = r1.replace(/\//g, '$');
        }
        var r2 = base + r1;
    } else {
        var r2 = r1.replace(/\//g, '$');
    }
    if (is_page) {
        r2 = r2.replace(/\$([\s\S])/g, '/$1');
    }
    return r2;

}
function Meta(url) {
    this.url = url;
}
Meta.prototype.resolve = function (url) {
    return resolve(url, this.url);
}
var createModule = function (exec, originNames, compiledNames, prebuilds = {}) {
    var module = {};
    var exports = module.exports = {};
    var isModuleInit = false;
    var required = exec.required;
    if (required) required = required.map(a => loadedModules[keyprefix + a]);
    var argsList = originNames.map(function (aName) {
        var argName = aName.replace(/[\#\*~\?][\s\S]*$/, '');
        if (hasOwnProperty.call(prebuilds, argName)) {
            return prebuilds[argName];
        }
        if (argName === "module") {
            isModuleInit = true;
            return module;
        }
        if (argName === "exports") {
            isModuleInit = true;
            return exports;
        }
        if (argName === 'import_meta') {
            return new Meta(exec.file);
        }
        if (/^(?:window|global(This)?|undefined)$/.test(argName)) return window[argName];
        if (argName === "require") {
            var r1 = window.require;
            let r = function (refer) {
                if (refer.length) return r1(refer);
                var mod = required[refer];
                if ("created" in mod) return mod.created;
                var c = mod.created = createModule(mod, mod.args || [], mod.argNames, prebuilds);
                return c;
            };
            for (let k in r1) r[k] = r1[k];
            return r;
        }
        if (argName === "define") return window[argName] || function (m_name, requires, exec) {
            if (m_name instanceof Function) {
                exec = m_name;
                return exec.call(_this);
            }
            if (m_name instanceof Array) {
                exec = requires;
                requires = m_name;
            }
            if (!/^\//.test(m_name)) {
                m_name = m_name.replace(/\//g, '$');
            }
            return exec.apply(_this, requires.map(a => init(a)));
        };
        var result, created;
        if (prebuilds.init) {
            var prebuilds2 = Object.create(null);
            for (var k in prebuilds) if (hasOwnProperty.call(prebuilds, k)) prebuilds2[k] = prebuilds[k];
            prebuilds = prebuilds2;
        }
        var promise = init(aName, function (res) {
            result = res;
            created = true;
        }, prebuilds);
        if (created) return result;
        return promise;
    });
    var _this = isModuleInit ? exports : window;
    var argsPromises = argsList.filter(isThenable);
    argsList = argsList.concat(exec.strs);
    argsList.push(compiledNames || []);
    if (!argsPromises.length) {
        return exec.apply(_this, argsList);
    }
    return Promise.all(argsList).then(function (args) {
        return exec.apply(_this, args);
    });
};

var init = function (url, then, prebuilds, keeppage) {
    // then = bindthen(then);
    var key = keyprefix + url;
    if (prebuilds) {
        if (hasOwnProperty.call(prebuilds, url)) {
            if (then) then(prebuilds[url]);
            return prebuilds[url];
        }
    }
    if (hasOwnProperty.call(modules, url)) {
        if (then) then(modules[url]);
        return modules[url];
    }
    var name = url.replace(/[\#\*~\?][\s\S]*$/, '');
    if (!hasOwnProperty.call(forceRequest, name) && name in window && !/^on/.test(name)) {
        try {
            var value = window[name];
            if (value !== null && value !== void 0) {
                modules[name] = value;
                if (then) then(value);
                return value;
            }
        } catch {
            window.alert(name);
        }
    }
    var oks = [];
    if (then) oks.push(then);
    var ohs = [];
    var res = {
        oks,
        ohs,
        resolved: false,
        errored: false,
        result: null,
        error: null,
        then(ok, oh) {
            if (ok) this.oks.push(ok);
            if (oh) this.ohs.push(oh);
            this.fire();
        },
        fire() {
            if (this.resolved || this.errored) {
                var oks = this.oks.splice(0, this.oks.length);
                var ohs = this.ohs.splice(0, this.ohs.length);
                if (this.errored) for (var o of ohs) o(this.error);
                if (this.resolved) for (var o of oks) o(this.result);
            }
        },
    };
    then = function (created) {
        if (res.resolved || res.errored) return;
        if (isThenable(created)) return created.then(then, crack);
        res.resolved = true;
        res.result = created;
        res.fire();
    };
    var crack = function (error) {
        if (res.resolved || res.errored) return;
        var ed = errored[url];
        res.errored = true;
        res.error = error;
        res.fire();
        var rest = [url];
        var track = [];
        var length = 0;
        var deep = 0;
        // <!--
        var map = Object.create(null);
        map[url] = true;
        do {
            deep++;
            var rest2 = Object.create(null);
            while (rest.length) {
                var n = rest.pop();
                var e = loadedModules[n] && loadedModules[n].error;
                if (e instanceof Array) {
                    track.push([deep, n, e]);
                    if (n.length + deep > length) length = n.length + deep;
                    for (var e of e) if (!map[e]) rest2[e] = true, map[e] = true;
                }
                else {
                    if (n.length + deep > length) length = n.length + deep;
                    track.push([deep, n, [e]]);
                }

            }
            rest = Object.keys(rest2);
        } while (rest.length);
        track = track.map(([d, a, e]) => ` ${new Array(d + 1).join("•")} ${new Array(2 + length - a.length - d).join("-")} ${a} 溃于: ${e.reverse().join(", ")}`)
        // -->
        var report = window.performance || !window.alert ? console.error : window.alert;
        report(`加载 ${url} 失败，${ed && ed.length ? `${ed.join(', ')} 等 ${ed.length} 个模块` : "没有其他模块"}受到影响。\r\n${track.join("\r\n")}`);
    };
    loadModule(url, function (error) {
        if (hasOwnProperty.call(modules, url)) {
            then(modules[url]);
            return;
        }
        if (error) return crack(error);

        var module = loadedModules[key];
        if (!module || module.noenv) {
            // <!--
            undefinedModules[key] = true;
            // -->
            return then();
        }
        var args = module.args || [];

        if (!args || !args.length) {
            var created = module.call(window);
            then(module.created = modules[url] = created);
            return;
        }
        var filteredArgs = prebuilds ? args.filter(a => !hasOwnProperty.call(prebuilds, a)) : args;

        var saveAsModule = keeppage || filteredArgs.length === args.length;
        if (saveAsModule) {
            if (penddings[key]) {
                penddings[key].then(then);
                return;
            }
        }
        //<!-- 
        else if (!multiModules[key]) multiModules[key] = args.filter(k => hasOwnProperty.call(prebuilds, k)).join("、"), console.info(`${key}%c引用了非单例的%c${multiModules[key]}%c，无法存储为单例`, 'color:gray', 'color:green', 'color:gray')
        //-->
        if (!filteredArgs.length) {
            var argValues = args.map(a => prebuilds[a]).concat(module.strs);
            argValues.push(module.argNames || []);
            var created = module.apply(window, argValues);
            then(created);
            return;
        }
        var created = createModule(module, args, module.argNames, prebuilds);
        if (isThenable(created)) {
            if (saveAsModule) {
                penddings[key] = created;
                created.then(function (res) {
                    then(modules[url] = res);
                });
                return;
            }
        } else {
            if (saveAsModule) module.created = modules[url] = created;
        }
        then(created);
    }, prebuilds);
    return res;
};
var forceRequest = {
    Promise: true,
    i18n: true
};
var removeGlobalProperty = function (property) {
    forceRequest[property] = true;
};

var renderPixelRatio = !/win/i.test(navigator.platform) && devicePixelRatio > 1 && window.innerWidth > 360 && window.innerHeight > 360 ? .86 : .75;

var initPixelDecoder = function () {
    if (pixelDecoder instanceof Function) {
        modules.fromPixel = pixelDecoder;
        modules.freePixel = window.freePixel || function () {
            throw new Error(`您在window上实现了pixelDecoder，请手动实现相应的freePixel!`);
        };
        modules.calcPixel = window.calcPixel || function () {
            throw new Error(`您在window上实现了pixelDecoder，请手动实现相应的calcPixel!`);
        };
        modules.fromOffset = window.fromOffset || function () {
            throw new Error(`您在window上实现了pixelDecoder，请手动实现相应的fromOffset!`);
        };
        modules.freeOffset = window.freeOffset || function () {
            throw new Error(`您在window上实现了pixelDecoder，请手动实现相应的freeOffset!`);
        };
        return;
    }
    var body = document.body;
    var maxRenderWidth = +body.getAttribute('max-render') || +body.getAttribute('max-width');
    var minRenderWidth = +body.getAttribute('min-render') || +body.getAttribute('min-width');
    var renderRange = body.getAttribute("render-range") || body.getAttribute("range") || body.getAttribute("render") || body.getAttribute("width");
    if (renderRange) {
        renderRange = renderRange.split(/[\-\:,]+/).map(a => +a);
        if (!minRenderWidth && renderRange[0]) minRenderWidth = renderRange[0];
        if (!maxRenderWidth && renderRange[1]) maxRenderWidth = renderRange[1];
    }

    var _freePixel = d => d * .75 / renderPixelRatio;
    var _calcPixel = d => d * renderPixelRatio / .75;

    if (!maxRenderWidth && !minRenderWidth || /msie\s+[2-8]/i.test(navigator.userAgent)) {
        /**
         * 从px到pt
         */
        modules.fromPixel = pixelDecoder = d => d * renderPixelRatio + "pt";

        /**
         * 从offset到pt
         */
        modules.fromOffset = d => pixelDecoder(freePixel(d));
        /**
         * 从pt 到 offset
         */
        modules.freeOffset = d => calcPixel(parseFloat(d) / renderPixelRatio);
        /**
         * 从offset到px
         */
        var freePixel = modules.freePixel = _freePixel;
        /**
         * 从pixel到offset
         */
        var calcPixel = modules.calcPixel = _calcPixel;
        if (document.documentElement) document.documentElement.style.fontSize = `${16 * renderPixelRatio}pt`;
    } else {
        if (maxRenderWidth < minRenderWidth) {
            [minRenderWidth, maxRenderWidth] = [maxRenderWidth, minRenderWidth];
        }
        maxRenderWidth = maxRenderWidth * renderPixelRatio;
        minRenderWidth = minRenderWidth * renderPixelRatio;
        if (_devicePixelRatio !== devicePixelRatio) {
            maxRenderWidth *= _devicePixelRatio;
            minRenderWidth *= _devicePixelRatio;
        }
        /**
         * 从px到rem
         */
        modules.fromPixel = pixelDecoder = d => d / 16 + "rem";
        /**
         * 从offset到rem
         */
        modules.fromOffset = d => freePixel(d) / 16 + "rem";
        /**
         * 从rem 到 offset
         */
        modules.freeOffset = d => calcPixel(parseFloat(d) * 16);
        /**
         * 从offset到px
         */
        var freePixel = modules.freePixel = d => {
            d = _freePixel(d);
            var innerWidth = window.innerWidth * renderPixelRatio;
            if (innerWidth < minRenderWidth) {
                return d * minRenderWidth / innerWidth;
            }
            if (innerWidth > maxRenderWidth) {
                return d * maxRenderWidth / innerWidth;
            }
            return d;
        };
        /**
         * 从pixel到offset
         */
        var calcPixel = modules.calcPixel = d => {
            var innerWidth = window.innerWidth * renderPixelRatio;
            d = _calcPixel(d);
            if (innerWidth < minRenderWidth) {
                return d * innerWidth / minRenderWidth;
            }
            if (innerWidth > maxRenderWidth) {
                return d * innerWidth / maxRenderWidth;
            }
            return d;
        }
        init("css", function (css) {
            var onresize = function () {
                var fontSize = calcPixel(16) * .75 + "pt";
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
    modules.offset2px = freePixel;
    modules.px2offset = calcPixel;
    modules.offset2pt = modules.fromOffset;
    modules.pt2offset = modules.freeOffset;

};
var start_time = efront_time / 1000 | 0;
var errored = {};
// modules 的代码不可出现多层
var modules = {
    isProduction,
    undefined: void 0,
    start_time,
    MOVELOCK_DELTA: 3 * renderPixelRatio,
    SAFE_CIRCLE_DEPTH: 300,
    init,
    efrontPath,
    versionTree,
    responseTree,
    loadingTree,
    loadedModules,
    load: loadModule,
    devicePixelRatio,
    renderPixelRatio,
    createFunction,
    efrontsign: "",
};
modules["set request"] = function (req) {
    request = req;
};
modules["get request"] = function () {
    return request;
};
modules.debug = function () {
    document.addEventListener("blur", e => e.stopPropagation(), true);
};
modules.put = function (name, module) {
    modules[name] = module;
};
var penddings = {};

modules.modules = modules;
var requires_count = 3;
var hook = function (requires_count) {
    if (requires_count !== 0) return;
    "alert confirm innerWidth innerHeight close prompt data".split(/\s+/).map(removeGlobalProperty);
    modules.Promise = Promise;
    modules.hook_time = +new Date;
    if (document) {
        initPixelDecoder();
        if (modules.hook_time - efront_time < (isProduction ? 30 : 5) && document.querySelector && devicePixelRatio > 1 && /Linux/.test(navigator.platform) && navigator.maxTouchPoints > 0) {
            let ratio = +(1000000 / devicePixelRatio + .5 | 0) / 1000000;
            document.querySelector("meta[name=viewport]").setAttribute("content", `width=device-width,target-densitydpi=device-dpi,user-scalable=no,initial-scale=1,maximum-scale=${ratio}`);
            renderPixelRatio *= devicePixelRatio;
            modules.renderPixelRatio = renderPixelRatio;
            devicePixelRatio = modules.devicePixelRatio = 1;
        }
        if (!efrontPath) efrontPath = document.body.getAttribute("main-path") || document.body.getAttribute("path") || document.body.getAttribute("main") || "zimoli";
    }
    init(efrontPath, function (zimoli) {
        if (zimoli instanceof Function) zimoli();
    });
};
var initIfNotDefined = function (defined, path, onload) {
    if (defined === void 0) init(path, a => onload(a) | hook(--requires_count));
    else hook(--requires_count);
};
try { var localStorage = window.localStorage; } catch { forceRequest.localStorage = forceRequest.sessionStorage = true }
var flush_to_storage_timer = 0,
    responseTree_storageKey = "zimoliAutoSavedResponseTree" + location.pathname;
var loadResponseTreeFromStorage = preventCodeStorage ? function () { } : function () {
    "use ./crc.js";
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
    load();
    preLoad = function (responseName) {
        if (hasOwnProperty.call(responseTree, responseName)) return;
        var version = preLoadVersionTree[responseName];
        if (!version) return;
        var responseText = preLoadResponseTree[responseName];
        var sum = [];
        for (var i in responseText) sum[i] = responseText.charCodeAt(i);
        var sum = crc(sum).toString(36);
        if (sum + version.slice(sum.length) === versionTree[responseName])
            responseTree[responseName] = responseText;
        // else window.console.log(responseName, sum, version, versionTree[responseName]);
    };
};
var preLoad = function () { };

if (localStorage) loadResponseTreeFromStorage();
var saveResponseTreeToStorage = preventCodeStorage || !localStorage ? function () { } : function () {
    var responseTextArray = [];
    for (var k in versionTree) {
        if (hasOwnProperty.call(responseTree, k)) responseTextArray.push(
            k + "：" + versionTree[k] + "：" + responseTree[k]
        );
    }
    var data = responseTextArray.join("，");
    localStorage.setItem(responseTree_storageKey, data);
};

initIfNotDefined([].map, "[]map", map => map);
"use ../basic_/#checkPromise.js";
initIfNotDefined(Promise, "Promise", promise => Promise = promise);
// <!-- window.modules = modules; -->
var onload = function () {
    window.onload = null;
    hook(--requires_count);
};
if (!document || document.body) onload();
else window.onload = onload;