"use strict";
var window = this;
var {
    parseInt,
    XMLHttpRequest,
    ActiveXObject,
    isProduction = function develop() { return develop.name !== 'develop'; }(),
    Error,
    Function,
    Array,
    localStorage,
    Promise,
    setTimeout,
    clearTimeout,
    Date,
    navigator,
    document,
    top,
    location,
    Object,
    String,
    console,
    efrontURI,
    parseFloat,
    PREVENT_FRAMEWORK_MODE,
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
var _devicePixelRatio = devicePixelRatio;
var request = window.request || function (url, onload, onerror, version) {
    var xhr = new (XMLHttpRequest || ActiveXObject)("Microsoft.XMLHTTP");
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

var keyprefix = "";
var flushTree = function (tree, key, res) {
    var response = tree[key];
    if (!response.error) {
        delete tree[key];
        if (res) tree[key] = res;
    }
    if (response instanceof Array) {
        for (var cx = 0, dx = response.length; cx < dx; cx++) {
            var call = response[cx];
            if (call instanceof Function) {
                call(response.error);
            }
        }
    }
};
var readingCount = 0;
var readFile = function (names, then) {
    if (names instanceof Array) {
        names = names.slice(0);
        var loaded = 0, errored = 0;
        var callback = function (e) {
            if (e) {
                errored++;
            }
            if (++loaded === names.length) {
                then(errored);
            }
        };
        if (!names.length) return then();
        names.forEach(function (name) {
            readFile(name, callback);
        });
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
        if (readingCount === 0) {
            killCircle();
        }
    };
    var oh = function (e) {
        if (isProduction) {
            if (errorcount < 2) {
                errorcount++;
                setTimeout(tryload, 200 + 1000 * errorcount);
                return;
            }
        }
        loadingTree[key].error = e;
        loadingTree[key].forEach(a => a(1));
    };
    var tryload = function () {
        request(url, ok, oh, version);
    }
    tryload();

};
var createFunction = function (name, body, args, isAsync, isYield) {
    return window.eval(`[${isAsync ? 'async ' : ''}function${isYield ? "*" : ""}/*${name}*/(${args || ''}){\r\n${body}\r\n}][0]`);
};

var FILE_NAME_REG = /^https?\:|\.(html?|css|asp|jsp|php)$/i;
var loadedModules = {};
var killCircle = function () {
    var penddings = {}, circle = [], module_keys = [];
    for (var k in loadedModules) {
        if (k.slice(0, keyprefix.length) === keyprefix && loadedModules[k] instanceof Array) {
            var key = k.slice(keyprefix.length);
            var args = loadedModules[k].args;
            if (loadedModules[k] instanceof Array) continue;
            args.forEach(arg => {
                if (!penddings[arg]) {
                    penddings[arg] = [];
                }
                if (!penddings[arg][k]) {
                    penddings[arg][k] = true;
                    penddings[arg].push(key);
                }
            })
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
        circle.forEach(function (c) {
            var args = penddings[c];
            penddings[c] = args.filter(a => !deleted[a]);
        });
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
        module_keys.forEach(function (k) {
            var loading = tree[k] = loadedModules[k];
            loadedModules[k] = loading.mod;
        });
        module_keys.forEach(function (k) {
            flushTree(tree, k);
        });
    }
};
var hasOwnProperty = {}.hasOwnProperty;
var loadModule = function (name, then, prebuilds = {}) {
    if (/^(?:module|exports|define|require|window|global|undefined|__dirname|__filename)$/.test(name)) return then();
    if ((name in prebuilds) || hasOwnProperty.call(modules, name) || (!/^on/.test(name) && window[name] !== null && window[name] !== void 0 && !hasOwnProperty.call(forceRequest, name))
    ) return then();
    preLoad(name);
    var key = keyprefix + name;
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
            readFile(["JSON", name], saveModule);
        } else {
            readFile(name, saveModule);
        };
    }
    else {

        var saveModule = function (error) {
            var data = responseTree[name];
            if (typeof data === "function") {
                var mod = data;
                flushTree(loadedModules, key, mod);
                return;
            }
            if (error) {
                loadedModules[key].error = error;
                flushTree(loadedModules, key);
                return;
            }
            var [argNames, body, args, required, strs, isAsync, isYield] = getArgs(data);
            if (isProduction) {
                strs = strs.map ? strs.map(toRem) : strs;
            } else {
                body = toRem(body);
            }
            var mod = createFunction(name, body, argNames, isAsync, isYield);
            if (!mod) console.log(name, mod);
            mod.args = args;
            mod.argNames = argNames;
            mod.strs = strs;
            var loadingCount = 0;
            if (required) required = required.split(';').filter(a => !!a);
            required = required ? get_relatives(name, required) : [];
            mod.required = required;
            mod.file = name;
            args = args.concat(required);
            var _errored = 0;
            var response = function (error) {
                loadingCount++;
                if (error) {
                    if (!errored[error]) {
                        errored[error] = [];
                    }
                    errored[error].push(key);
                    _errored++;
                }
                if (loadingCount === args.length) {
                    if (_errored.length) {
                        loadedModules[key].error = true;
                    }
                    flushTree(loadedModules, key, mod);
                }
            };
            if (!args.length) {
                flushTree(loadedModules, key, mod);
            } else {
                loadedModules[key].args = mod.args;
                loadedModules[key].mod = mod;
                args.forEach(function (moduleName) {
                    loadModule(moduleName, response, prebuilds);
                });
            }
        };
        readFile(name, saveModule);
    }
};
var toRem = text => pixelDecoder && typeof text === 'string' ? text.replace(/(\:\s*)?\b((?:\d*\.)?\d+)px(\s*\))?/ig, (m, h, d, quote) => (h || "") + (d !== '1' ? h && quote ? renderPixelRatio * d + "pt" : pixelDecoder(d) : renderPixelRatio > 1 ? ".78pt" : 0.78 / devicePixelRatio + "pt") + (quote || "")) : text;
if (document.head) {
    var efrontsign = document.head.lastElementChild.attributes[0];
    if (efrontsign && /^compiledinfo\-/.test(efrontsign.name)) efrontsign = efrontsign.name.slice(efrontsign.name.indexOf('-') + 1);
    else efrontsign = '';
}
else if (document.getElementsByTagName) {
    document.head = document.getElementsByTagName("head")[0];
    efrontsign = /\<script\s+compiledinfo\-(\S*?)\s*\=/i.exec(document.head.lastChild.outerHTML);
    if (efrontsign) efrontsign = efrontsign[1];
    else efrontsign = '';
}
var uncode = function (text) {
    var ratio = 1;
    var sum = 0;
    for (var cx = 0, dx = text.length; cx < dx; cx++) {
        var code = text.charCodeAt(cx);
        sum += (code < 63 ? code - 39 : code < 93 ? code - 42 : code - 43) * ratio;
        ratio *= 84;
    }
    return sum;
}
var decrypt = function (text) {
    var start = parseInt(efrontsign, 36) % 128;
    var rest = [];
    for (var cx = 0, dx = text.length; cx < dx; cx++) {
        var delta = text.charCodeAt(cx);
        if (delta < 44) {
            // 39-44 = -(delta -39)
            delta = 39 - delta;
        } else if (delta < 50) {
            // 44-50
            delta = delta - 44;
        } else if (delta < 55) {
            // 50-55 = -(34+delta)
            cx++;
            var next = cx + delta - 50;
            delta = -uncode(text.slice(cx, next + 1)) - 33;
            cx = next;
        } else if (delta < 60) {
            // 55-60 = -(34+delta)
            cx++;
            var next = cx + delta - 55;
            delta = 39 + uncode(text.slice(cx, next + 1));
            cx = next;
        } else if (delta < 92) {
            // 63-92 =- (5+delta-63)
            delta = 58 - delta;
        } else {
            // 93- = 6+ delta-93
            delta = delta - 87;
        }
        start = start + delta;
        rest.push(String.fromCharCode(start));
    }
    return rest.join('');
};
var getArgs = function (text) {
    if (efrontsign) {
        text = decrypt(text);
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
    } else {
        functionBody = text;
    }
    var [, isAsync, isYield] = /^(@?)(\*?)/.exec(functionBody);
    if (isAsync || isYield) functionBody = functionBody.slice(+!!isAsync + +!!isYield);
    functionBody = functionBody.replace(/^(?:\s*(["'])user? strict\1;?[\r\n]*)*/i, "\"use strict\";\r\n");
    return [argNames || [], functionBody, args || [], required || '', strs || [], !!isAsync, !!isYield];
};
var get_relatives = function (name, required, prefix = "") {
    var required_base = name.replace(/[^\/\$]+$/, "");
    required_base = required_base.replace(/^\.?[\/\$]+/, "");
    var is_page = /^\//.test(name);
    return required.map(r => {
        var r1 = r;
        var base = required_base;
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
    });
};
var createModule = function (exec, originNames, compiledNames, prebuilds = {}) {
    var module = {};
    var exports = module.exports = {};
    var isModuleInit = false;
    var required = exec.required;
    if (required) required = required.map(a => loadedModules[keyprefix + a]);
    var argsList = originNames.map(function (argName) {
        if (argName in prebuilds) {
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
        if (/^(?:window|global|undefined)$/.test(argName)) return window[argName];
        if (argName === "require") {
            let r = function (refer) {
                if (refer.length) return window.require(refer);
                var mod = required[refer];
                if ("created" in mod) return mod.created;
                var c = mod.created = createModule(mod, mod.args || [], mod.argNames, prebuilds);
                return c;
            };
            for (let k in window.require) r[k] = window.require[k];
            return r;
        }
        var filename = location.pathname + exec.file.replace(/([\s\S])[\$]/g, '$1/').replace(/\\/g, '/');
        if (argName === "__dirname") {
            return filename.replace(/[^\/]+$/, '');
        }
        if (argName === "__filename") {
            return filename;
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
            for (var k in prebuilds) prebuilds2[k] = prebuilds[k];
            prebuilds = prebuilds2;
            delete prebuilds.popup;
            delete prebuilds.action;
            delete prebuilds.init;
        }
        var promise = init(argName, function (res) {
            result = res;
            created = true;
        }, prebuilds);
        if (created) return result;
        return promise;
    });

    var _this = isModuleInit ? exports : window;
    var argsPromises = argsList.filter(a => a instanceof Promise);
    argsList = argsList.concat(exec.strs);
    argsList.push(compiledNames || []);
    if (!argsPromises.length) {
        return exec.apply(_this, argsList);
    }
    return Promise.all(argsList).then(function (args) {
        return exec.apply(_this, args);
    });
};

var init = function (name, then, prebuilds) {
    // then = bindthen(then);
    var key = keyprefix + name;
    if (prebuilds) {
        if (name in prebuilds) {
            if (then) then(prebuilds[name]);
            return prebuilds[name];
        }
    }
    if (hasOwnProperty.call(modules, name)) {
        if (then) then(modules[name]);
        return modules[name];
    }
    if (!/^on/.test(name) && window[name] !== null && window[name] !== void 0 && !hasOwnProperty.call(forceRequest, name)) {
        modules[name] = window[name]
        if (then) then(modules[name]);
        return modules[name];
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
        if (Promise && created instanceof Promise) return created.then(then, crack);
        res.resolved = true;
        res.result = created;
        res.fire();
    };
    var crack = function (error) {
        if (res.resolved || res.errored) return;
        var ed = errored[name];
        console.error(`加载${name}失败，${ed && ed.length ? `${ed.join(', ')} 等${ed.length}个模块` : "没有其他模块"}受到影响`);
        res.errored = true;
        res.error = error;
        res.fire();
    };
    loadModule(name, function (error) {
        if (hasOwnProperty.call(modules, name)) {
            then(modules[name]);
            return;
        }
        if (error) return crack(error);

        var module = loadedModules[key];
        var args = module.args || [];

        if (!args || !args.length) {
            var created = module.call(window);
            then(module.created = modules[name] = created);
            return;
        }
        var filteredArgs = prebuilds ? args.filter(a => !(a in prebuilds)) : args;

        var saveAsModule = filteredArgs.length === args.length;
        if (!filteredArgs.length) {
            var argValues = args.map(a => prebuilds[a]).concat(module.strs);
            argValues.push(module.argNames || []);
            var created = module.apply(window, argValues);
            then(created);
            return;
        }
        if (saveAsModule) {
            if (penddings[key]) {
                penddings[key].then(then);
                return;
            }
        }
        var created = createModule(module, args, module.argNames, prebuilds);
        if (created instanceof Promise) {
            if (saveAsModule) {
                penddings[key] = created;
                created.then(function (res) {
                    then(modules[name] = res);
                });
                return;
            }
        } else {
            if (saveAsModule) module.created = modules[name] = created;
        }
        then(created);
    }, prebuilds);
    return res;
};
var forceRequest = {};
var removeGlobalProperty = function (property) {
    forceRequest[property] = true;
};

var renderPixelRatio = !/win/i.test(navigator.platform) && devicePixelRatio > 1 && window.innerWidth > 360 && window.innerHeight > 360 ? .86 : .75;
if (document.querySelector && devicePixelRatio > 1 && /Linux/.test(navigator.platform) && navigator.maxTouchPoints > 0) {
    let ratio = +(1000000 / devicePixelRatio + .5 | 0) / 1000000;
    document.querySelector("meta[name=viewport]").setAttribute("content", `width=device-width,target-densitydpi=device-dpi,user-scalable=no,initial-scale=1,maximum-scale=${ratio}`);
    renderPixelRatio *= devicePixelRatio;
    devicePixelRatio = 1;
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
        modules.fromOffset = window.fromOffset || function () {
            throw new Error("您在window上实现了pixelDecoder，请手动实现相应的fromOffset!");
        };
        modules.freeOffset = window.freeOffset || function () {
            throw new Error("您在window上实现了pixelDecoder，请手动实现相应的freeOffset!");
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
var flush_to_storage_timer = 0,
    responseTree_storageKey = "zimoliAutoSavedResponseTree" + location.pathname;
var saveResponseTreeToStorage = function () {
    var responseTextArray = [];
    for (var k in versionTree) {
        if (hasOwnProperty.call(responseTree, k)) responseTextArray.push(
            k + "：" + versionTree[k] + "：" + responseTree[k]
        );
    }
    var data = responseTextArray.join("，");
    localStorage && localStorage.setItem(responseTree_storageKey, data);
};
var loadResponseTreeFromStorage = function () {
    "use ./crc.js";
    if (efrontsign) {
        var codes = [];
        for (var i in efrontsign) codes[i] = efrontsign.charCodeAt(i);
        modules.efrontsign = "?" + crc(codes).toString(36);
    }
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

var start_time = +new Date / 1000 | 0;
var errored = {};
var modules = {
    isProduction,
    undefined: void 0,
    start_time,
    MOVELOCK_DELTA: 3 * renderPixelRatio,
    SAFE_CIRCLE_DEPTH: 300,
    init,
    versionTree,
    responseTree,
    loadingTree,
    loadedModules,
    load: loadModule,
    devicePixelRatio,
    renderPixelRatio,
    efrontsign: "",
    debug() {
        document.addEventListener("blur", e => e.stopPropagation(), true);
    },
    put(name, module) {
        modules[name] = module;
    },
};
var penddings = {};

modules.modules = modules;
var requires_count = 3;
var hook = function (requires_count) {
    if (requires_count !== 0) return;
    "alert confirm innerWidth innerHeight close prompt".split(/\s+/).map(removeGlobalProperty);
    initPixelDecoder();
    modules.Promise = Promise;
    modules.hook_time = +new Date;
    if (!efrontPath) efrontPath = document.body.getAttribute("main-path") || document.body.getAttribute("path") || document.body.getAttribute("main") || "zimoli";
    init(efrontPath, function (zimoli) {
        if (zimoli instanceof Function) zimoli();
    });
};
var initIfNotDefined = function (defined, path, onload) {
    if (defined === void 0) init(path, a => onload(a) | hook(--requires_count));
    else hook(--requires_count);
};

loadResponseTreeFromStorage();
initIfNotDefined([].map, "[]map", map => map);
initIfNotDefined(Promise, "Promise", promise => Promise = promise);
if (!isProduction) window.modules = modules;
var onload = function () {
    window.onload = null;
    hook(--requires_count);
};
if (document.body) onload();
else window.onload = onload;