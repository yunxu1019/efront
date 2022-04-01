var scanner2 = require("../compile/scanner2");
var scanner = require("../compile/scanner");
var downLevel = require("../efront/downLevel");
var path = require("path");
var _strings = require("../basic/strings");
var memery = require("../efront/memery");
var { public_app, SOURCEDIR, EXPORT_TO: EXPORT_TO, EXPORT_AS, PUBLIC_PATH } = require("./environment");
if (SOURCEDIR) SOURCEDIR = path.dirname(public_app);
else SOURCEDIR = PUBLIC_PATH;
var report = require("./report");
var isSymbol = require("./isSymbol");
var isText = require("./isText");
var getFromTree = function (destMap, reqer) {
    if (reqer in destMap) return destMap[reqer];
    if (reqer.replace(/\.[mc]?[jt]sx?$/i, '') in destMap) {
        return destMap[reqer.replace(/\.[mc]?[jt]sx?$/i, '')];
    }
    reqer = reqer.replace(/^\.?\//, '').replace(/\//g, '$');
    if (destMap[reqer]) return destMap[reqer];
    if (reqer.replace(/\.[mc]?[jt]sx?$/i, '') in destMap) {
        return destMap[reqer.replace(/\.[mc]?[jt]sx?$/i, '')];
    }
    reqer = reqer.replace(/(\.\.\$)+/, '');
    if (destMap[reqer]) return destMap[reqer];
    if (reqer.replace(/\.[mc]?[jt]sx?$/i, '') in destMap) {
        return destMap[reqer.replace(/\.[mc]?[jt]sx?$/i, '')];
    }
};

function toComponent(responseTree) {
    console.info("正在合成");
    var array_map = responseTree["[]map"] || responseTree["[]map.js"];
    delete responseTree["[]map"];
    delete responseTree["[]map.js"];
    var result = [];
    var crypt_code = new Date / 1000 ^ Math.random() * 3600;
    var libsTree = Object.create(null);
    var has_outside_require = false;


    var destMap = Object.create(null), dest = [];

    var $$_efront_map_string_key = "$efront";
    var paramsMap = Object.create(null);
    var getEfrontKey = function (k, type) {
        k = String(k);
        if (type === 'global') {
            var key = k;
        } else {
            if (type === 'string') k = _strings.decode(k);
            var key = k.replace(/[^\w\$]+/g, "_");
            if (key.length > 6) {
                key = key.slice(0, 6);
            }
            var hasOwnProperty = {}.hasOwnProperty;
            var id = 0;
            while (hasOwnProperty.call(paramsMap, key) && paramsMap[key] !== k) {
                key = key.replace(/\d+$/, '') + ++id;
            }
            paramsMap[key] = k;
            if (type === 'string') k = _strings.encode(k);
        }
        if (type === 'global') {
            var $key = key;
        } else {
            var $key = $$_efront_map_string_key + "_" + type + "_" + key;
        }
        if (!destMap[$key]) {
            if (type === 'string') k = encode(k);
            saveOnly(k, $key);
        }
        return $key;
    };
    var strings = "slice,length,split,concat,apply,reverse,exec,indexOf,string,join,call,exports".split(",");
    var encoded = memery.ENCRYPT;
    var compress = memery.COMPRESS;
    var symbolid = 0;
    var encode = function (source) {
        var _source = _strings.decode(source);
        if (isText(_source)) {
            if (!encoded) return `/** text */ ` + source;
        } else if (isSymbol(_source)) {
            source = ++symbolid;
            if (!encoded) source = source + ` /** symbol ${_source} */`;
            return source;
        } else {
            if (!encoded) return source;
        }
        source = _source;
        if (!~strings.indexOf(source)) {
            var temp = source.split('').reverse();
            for (var cx = 0, dx = temp.length; cx < dx; cx++) {
                var t = temp[cx].charCodeAt(0);
                if (t > 39 && t < 127) {
                    t = ((crypt_code - t) % 87) + 40;
                } else if (t >= 0x1000) {
                    t = (crypt_code & 0xff) ^ t;
                }
                temp[cx] = t;
            }
            temp = String.fromCharCode.apply(String, temp);
            if (!~strings.indexOf(temp)) source = temp;
        }
        source = _strings.encode(source);
        return source;
    };
    var getEncodedIndex = function (key, type = "string") {
        if (type === 'string') key = _strings.encode(key);
        return destMap[getEfrontKey(key, type)];
    };
    var saveCode = function (module_body, module_key, reqMap) {
        var this_module_params = {};
        var setMatchedConstString = function (k, isReq, isProp) {
            if (/^(['"])user?\s+strict\1$/i.test(k)) return `"use strict"`;
            if (k.length < 3) return k;
            if (isReq) {
                var refer = _strings.decode(k);
                if (reqMap && {}.hasOwnProperty.call(reqMap, refer)) {
                    var reqer = reqMap[refer];
                    var reqed = getFromTree(destMap, reqer);
                    if (reqed) return reqed;
                    if (reqer in libsTree) {
                        var libdir = path.relative(PUBLIC_PATH, libsTree[reqer].realpath).replace(/\\/g, '/');
                        k = _strings.encode(libdir);
                    } else if (/^[\.\/]/.test(reqer)) {
                        k = path.relative(PUBLIC_PATH, path.join(path.dirname(responseTree[module_key].realpath), reqer)).replace(/\\/g, '/');
                        k = _strings.encode(k);
                    } else {
                        k = _strings.encode(reqMap[refer]);
                    }
                    has_outside_require = true;
                }
            }
            var $key = getEfrontKey(k, 'string');
            if (!this_module_params[$key]) {
                this_module_params[$key] = true;
                module_body.splice(module_body.length >> 1, 0, $key);
                module_body.splice(module_body.length - 1, 0, $key);
            }
            return isProp ? `[${$key}]` : " " + $key + " ";
        };
        var setMatchedConstRegExp = function (k) {
            var $key = getEfrontKey(k, 'regexp');
            if (!this_module_params[$key]) {
                this_module_params[$key] = true;
                module_body.splice(module_body.length >> 1, 0, $key);
                module_body.splice(module_body.length - 1, 0, $key);
            }
            return " " + $key + " ";
        };
        var module_string = module_body[module_body.length - 1];
        var code_blocks = scanner(module_string);
        var extentReg = /\s*[\:\(]/gy, prefixReg = /(?<=[,\{]\s*)\s|[\,\{\}]/gy;
        var requireReg = /(?<=\brequire\s*\(\s*)['"`]/gy;
        var hasRequire = module_body.slice(0, module_body.length >> 1).indexOf('require') >= 0;
        module_string = code_blocks.map(function (block) {

            var block_string = module_string.slice(block.start, block.end);
            if (block.type === block.single_quote_scanner || block.type === block.double_quote_scanner) {
                var isPropEnd = (
                    extentReg.lastIndex = block.end,
                    extentReg.exec(module_string)
                );
                var isPropStart = (
                    prefixReg.lastIndex = block.start - 1,
                    prefixReg.exec(module_string)
                );
                var isProp = !!(isPropStart && isPropEnd);
                if (hasRequire) {
                    requireReg.lastIndex = block.start;
                    var isRequire = !!requireReg.exec(module_string);
                }
                return setMatchedConstString(block_string, isRequire, isProp);
            }
            if (block.type === block.regexp_quote_scanner) {
                return setMatchedConstRegExp(block_string);
            }
            return block_string;
        }).join("");
        var [, isAsync, isYield] = /^(@?)(\*?)/.exec(module_string);
        if (isAsync || isYield) module_string = module_string.slice(+!!isAsync + +!!isYield);
        if (!memery.UPLEVEL) {
            module_string = downLevel(module_string, isAsync, isYield);
        }
        module_string = `${isAsync ? "async " : ""}function${isYield ? "*" : ""}(${module_body.slice(module_body.length >> 1, module_body.length - 1)}){${module_string}}`;
        if (compress) {
            module_string = scanner2(module_string).press().toString();
        }
        saveOnly(`[${module_body.slice(0, module_body.length >> 1).map(function (a) {
            var index = destMap[a];
            if (a === "__dirname" || a === "__filename") {
                initDirname();
                var realpath = module_key.replace(/\$/g, '/');
                var realdir = getEfrontKey(realpath, 'dirname');
                var filename = path.relative(SOURCEDIR, responseTree[module_key].realpath);
                var dirname = path.dirname(filename).replace(/\\/g, '/');
                saveOnly(`[${getEncodedIndex('__dirname', 'builtin')},function(a){return a(${JSON.stringify(a === '__filename' ? filename : dirname)})}]`, realdir);
                return destMap[realdir];
            }
            if (!isFinite(index)) console.warn("编译异常", module_key, a);
            return index;
        }).concat(module_string)}]`, module_key);
    };
    var initDirname = function () {
        initDirname = function () { };

        var data = `[${[
            getEncodedIndex('__dirname', 'global'),
            getEncodedIndex('require', 'global'),
            getEncodedIndex(`path`),
            getEncodedIndex(`join`),
        ]},function(d,r,p,j){return function(k){return r(p)[j](d,k)}}]`;
        var __dirname = getEfrontKey('__dirname', 'builtin');
        saveOnly(data, __dirname);
    };
    function saveOnly(data, k, ...ks) {
        var warning = null;
        if (!destMap[k]) {
            var isGlobal = /^[\$_a-z]\w*$/i.test(data) && !/^(Number|String|Function|Object|Array|Date|RegExp|Math|Error|TypeError|Infinity|isFinite|isNaN|parseInt|parseFloat|setTimeout|setInterval|clearTimeout|clearInterval|encodeURI|encodeURIComponent|decodeURI|decodeURIComponent|escape|unescape|undefined|null|false|true|NaN|eval)$/.test(data);
            if (isGlobal) {
                if (!/^(os|fs|vm|url|readline|net|http[2s]?|zlib|util|buffer|path|cluster|console|Reflect|PerformanceObserver|BigInt|WeakMap|Boolean|Promise|JSON|module|exports|require|__dirname|__filename|Buffer|Symbol|process|Map|Set|(Ui|I)nt(8|16|32)Array|RangeError|setImmediate|Proxy|Intl|Map|TypeError|RangeError|global|parent|opener|top|length|frames|closed|location|self|window|document|name|customElements|history|locationbar|menubar|personalbar|scrollbars|statusbar|toolbar|status|frameElement|navigator|origin|external|screen|innerWidth|innerHeight|scrollX|pageXOffset|scrollY|pageYOffset|visualViewport|screenX|screenY|outerWidth|outerHeight|devicePixelRatio|clientInformation|screenLeft|screenTop|defaultStatus|defaultstatus|styleMedia|isSecureContext|performance|stop|open|alert|confirm|prompt|print|queueMicrotask|requestAnimationFrame|cancelAnimationFrame|captureEvents|releaseEvents|requestIdleCallback|cancelIdleCallback|getComputedStyle|matchMedia|moveTo|moveBy|resizeTo|resizeBy|scroll|scrollTo|scrollBy|getSelection|find|webkitRequestAnimationFrame|webkitCancelAnimationFrame|fetch|btoa|atob|createImageBitmap|close|focus|blur|postMessage|crypto|indexedDB|webkitStorageInfo|sessionStorage|localStorage|chrome|orientation|speechSynthesis|webkitRequestFileSystem|webkitResolveLocalFileSystemURL|openDatabase)/.test(data)) {
                    warning = true;
                }
                data = `typeof ${data}!=="undefined"?${data}:void 0`;
            }
            if (!compress) {
                data = `\r\n/** ${dest.length + 1} ${k.length < 100 ? k : k.slice(11, 43)} */ ` + data;
            }
            dest.push(data);
            destMap[k] = dest.length;
        } else {
            if (!compress) {
                data = `\r\n/** ${destMap[k]} ${k.length < 100 ? k : k.slice(11, 43)} */ ` + data;
            }
            dest[destMap[k] - 1] = data;
        }
        ks.forEach(function (key) {
            destMap[key] = destMap[k];
        });
        return warning;
    }
    if (array_map) saveCode([String(array_map.data)], "map");
    saveOnly("[]", 'init', 'require');
    var freg = /^function[^\(]*?\(([^\)]+?)\)/;
    strings.map(function (str) {
        return getEfrontKey(`"${str}"`, "string");
    }).concat(
        getEfrontKey("/" + freg.source + "/", "regexp")
    );
    var $charCodeAt = 'charCodeAt'.split("").reverse().map(a => `"${a}"`);
    var $fromCharCode = 'fromCharCode'.split("").reverse().map(a => `"${a}"`);
    // ['Array', 'String'].concat($charCodeAt, $fromCharCode).forEach(function (str) {
    //     getEfrontKey(str, 'global');
    // });
    var saveGlobal = function (globalName) {
        if (responseTree[globalName] && !responseTree[globalName].data && !destMap[globalName]) {
            var warn = saveOnly(globalName, globalName);
        }
        if (!destMap[globalName] && responseTree[globalName]) ok = false;
        return warn;
    };
    var saveImported = function (text) {
        if (text.imported) {
            if (!destMap[text.importedid]) saveOnly('""', text.importedid);
            return destMap[text.importedid];
        }
        var c = text.charAt(0);
        switch (c) {
            case "'":
            case "\"":
                text = _strings.decode(text);
                return getEncodedIndex(text, 'string');
            case "/":
                return getEncodedIndex(text, 'regexp');
            default:
                return getEncodedIndex(text, 'global');
        }
    };
    var imported = function (_, i) {
        return getEncodedIndex(i, 'global');
    };
    var saveImportedItem = function (d) {
        d.imported = d.imported.map(saveImported);
        var module = d.module.replace(/"(imported\s*-\s*\d+)"/g, imported);
        if (compress) {
            module = scanner2(module).press().toString();
        }
        saveOnly(`[${d.imported.join(',')},${module}]`, d.importedid);
    };
    for (var k in responseTree) {
        if (!{}.hasOwnProperty.call(responseTree, k)) continue;
        var response = responseTree[k];
        if (!response.data && /^(number|function|string)$/.test(typeof response.builtin)) {
            response.data = response.builtin instanceof Function ? response.builtin.toString() : JSON.stringify(response.builtin);
        }
        if (response.type === "@" || response.type === "\\") {
            var rel = response.destpath.replace(/\\/g, '/').replace(/^\.\//, "").replace(/\//g, '$').replace(/\.[cm]?[jt]sx?$/, '');
            libsTree[rel] = response;
            delete responseTree[k];
            has_outside_require = true;
            continue;
        }
        if (response.data) {
            var data = response.data;
            if (data.module) {
                data.importedid = k;
                data.all.forEach(saveImportedItem);
                continue;
            }
            if (data instanceof Buffer) {
                response.data = String(data);
            }
            var dependence = response.dependence;
            if (dependence) {
                result.push([k, dependence.require, dependence.requiredMap, [].concat(dependence, dependence.args, responseTree[k].toString().slice(dependence.offset))]);
            }
            else result.push([k, null, null, [response.data]]);
        }
    }
    var circle_result, PUBLIC_APP, public_index, last_result_length = result.length, origin_result_length = last_result_length
    while (result.length) {
        for (var cx = result.length - 1, dx = 0; cx >= dx; cx--) {
            var [k, required, reqMap, module_body] = result[cx];

            required = (required || []).map(k => reqMap[k]);
            var ok = true;
            for (var r of required) {
                if (!getFromTree(destMap, r)) {
                    let resp = getFromTree(responseTree, r);
                    if (resp && resp.data) {
                        ok = false;
                        break;
                    }
                }
            }
            var errored = module_body.slice(0, module_body.length >> 1).filter(saveGlobal);
            if (errored.length) {
                console.warn(`在 <yellow>${k}</yellow> 中检测到未知的全局变量：`, errored.map(a => `<gray>${a}</gray>`));
            }
            if (!responseTree[k].data) {
                result.splice(cx, 1);
                continue;
            }
            if (ok || circle_result) {
                result.splice(cx, 1);
                var startTime = new Date;
                console.info(`压缩(${origin_result_length - result.length}/${origin_result_length}):`, k);
                saveCode(module_body, k, reqMap);
                responseTree[k].time += new Date - startTime;
            }
        }
        if (last_result_length === result.length && !circle_result) {
            circle_result = result.map(a => a[0]).filter(k => !!responseTree[k].realpath);
            if (!public_index && circle_result) {
                public_index = dest.length;
                PUBLIC_APP = circle_result[0];
            }
            circle_result.forEach(k => saveOnly('""', k));
            console.warn(
                `存在环形引用：[${circle_result.join('|')}]`
            );
        }
        last_result_length = result.length;
    }
    if (!circle_result) {
        PUBLIC_APP = circle_result ? circle_result[0] : k;
        public_index = dest.length - 1;
    }
    report(responseTree);
    saveOnly(`[${crypt_code}]`, 'module');
    saveOnly(`[${crypt_code % 2019 + 1}]`, 'exports');
    if (!PUBLIC_APP) return console.error("没有可导出的文件！"), {};

    var string_r = `x=s[${getEncodedIndex(`indexOf`, "string") - 1}],
    m=s[${getEncodedIndex(`length`, "string") - 1}],
    n=s[${getEncodedIndex(`slice`, "string") - 1}],
    e=s[${getEncodedIndex(`exec`, "string") - 1}],
    q=s[${getEncodedIndex(`split`, "string") - 1}],
    o=s[${getEncodedIndex(`concat`, "string") - 1}],
    y=s[${getEncodedIndex(`apply`, "string") - 1}],
    v=s[${getEncodedIndex(`reverse`, "string") - 1}],
    z=s[${getEncodedIndex(`string`, "string") - 1}],
    B=s[${getEncodedIndex(`exports`, "string") - 1}],
    E=${destMap.exports},
    M=${destMap.module},
    w=s[${getEncodedIndex(`join`, "string") - 1}]`;
    -function () {
        string_r = string_r.split(',');
        for (var cx = 0, dx = string_r.length; cx < dx; cx++) {
            var rest = string_r.splice(Math.random() * dx | 0, 1);
            string_r.splice.apply(string_r, [cx, 0].concat(rest));
        }
        string_r = string_r.join(',');
    }();
    var outsidePromise = destMap.Promise > 0;

    var realize = `function (a, c,s) {
        var ${string_r},
        u,p=[x,m,n,q,o,y,B,e,v,z,w,s[${getEncodedIndex(`call`, "string") - 1}]],
        h=s[M-1][0],
        j=s[${getEncodedIndex('String', 'global') - 1}],
        $=[${$fromCharCode.map(a => getEncodedIndex(a, 'global') - 1).map(a => `s[${a}]`)}],
        _=[${$charCodeAt.map(a => getEncodedIndex(a, 'global') - 1).map(a => `s[${a}]`)}][v]()[w](''),T = this,R;
        if (!(a instanceof s[${getEncodedIndex('Array', 'global') - 1}])){
            R = function(){${encoded ? `
                if(typeof a===z&&!~p[x](a)&&c!==${getEncodedIndex(`__dirname`, "global") - 1}){
                    u=a[q]('')[v]();
                    for(i=0,k=u[m];i<k;i++){
                        t=u[i][_](0);
                        if(t>39&&t<127){
                            t=((h-t)%87)+40;
                        }else if(t>=4096){
                            t=(h&255)^t;
                        }
                        u[i]=t;
                    }
                    u=j[$[v]()[w]('')][y](j,u);
                    if(!~p[x](u))a=u;
                }`: ''}
                return a
            }
        }else if(!a[m]){
            R=function(){${has_outside_require ? `
                var r= function(i){return i[m]?s[${getEncodedIndex("require", "builtin") - 1}](i):T[i]()};
                r[T[${getEncodedIndex(`cache`)}]()]=s[${getEncodedIndex('require', "builtin") - 1}][T[${getEncodedIndex('cache')}]()];
                r[T[${getEncodedIndex(`resolve`)}]()]=s[${getEncodedIndex('require', "builtin") - 1}][T[${getEncodedIndex('resolve')}]()];
                return r;`: `return function(i){return T[i]()}`}
            };
        }else{
            R=function(Q){
                if(~[E,M][x](c+1))return s[c][0];
                var r=s[${getEncodedIndex(`/${freg.source}/`, 'regexp') - 1}],I,g=[],i=0,k=a[m]-1,f=a[k],l=r[e](f)${outsidePromise ? `,P=c>${getEncodedIndex("Promise", "global")}?T[${getEncodedIndex(`Promise`, 'global')}]():0,C=0` : ''};
                if(~a[x](E)||~a[x](M))I={},I[B]=Q;
                for(;i<k;i++)g[i]=a[i]===M?I:a[i]===E?I[B]:a[i]?T[a[i]]():T[0]${outsidePromise ? `,C=C||c>${getEncodedIndex("Promise", "global")}&&g[i]instanceof P` : ''};
                if (l) {
                    l = l[1][q](',');
                    g = g[o]([l]);
                }
                ${outsidePromise ? `
                if(C>0)return P[T[${getEncodedIndex('all')}]()](g)[T[${getEncodedIndex('then')}]()](function(g){
                    r=f[y](I?I[B]:T[0],g);
                    return I?I[B]:r;
                });
                `: ""}
                r = f[y](I?I[B]:T[0], g);
                return ${outsidePromise ?
            `I&&P&&r instanceof P?r[T[${getEncodedIndex("then")}]()](function(){return I[B]}):I?I[B]:r`
            : "I?I[B]:r"
        };
            }
        }
        return T[c + 1] = function(S){
            T[c+1]=function(){return S};
            return S={},S=R(S);
        }
    }`;
    var polyfill_map = `function (f, t) {
        var s = this,
        l=s[${getEncodedIndex(`length`, 'string') - 1}],
        r = [],
        c = 0,
        e=s[${getEncodedIndex(`call`, "string") - 1}],
        d = s[l];
        for (; c < d; c++)r[c] = f[e](t, c, s[c]);
        return r
    }`;

    var simplie_compress = function (str) {
        if (!compress) return str;
        str = str.toString()
            .replace(/\s+/g, ' ')
            .replace(/(\W)\s+/g, "$1")
            .replace(/\s+(\W)/g, "$1");
        if (encoded) str = str.replace(/\b[a-z]\b/ig, a => {
            var c = a.charCodeAt(0);
            if (c > 97) {
                c = ((crypt_code - c) % 26) + 65;
            } else {
                c = ((crypt_code - c) % 26) + 97;
            }
            return String.fromCharCode(c);
        });
        return str;
    };
    var template = `([/*${new Date().toString()} by efront ${require(path.join(__dirname, "../../package.json")).version}*/].map||${simplie_compress(polyfill_map)}).call([${dest}],${simplie_compress(realize)},[this.window||this.globalThis||global])[${public_index}]()`;
    if (EXPORT_TO) {
        switch (EXPORT_TO) {
            case 'node':
                template = `#!/usr/bin/env node\r\n` + template;
                break;
            case 'return':
                template = "return " + template;
                break;
            case "none":
            case "null":
            case "false":
            case "undefined":
                break;
            case 'module':
            case 'exports':
            case 'module.exports':
                template = "module.exports=" + template;
                break;
            default:
                template = `this["${EXPORT_TO}"]=` + template;
                responseTree[PUBLIC_APP].destpath = EXPORT_TO;

        }
    }
    if (EXPORT_AS) {
        template += `["${EXPORT_AS}"]`;
    }

    responseTree[PUBLIC_APP].data = template;
    var DESTNAME = String(memery.PUBLIC_NAME || PUBLIC_APP).replace(/\.\w*$/, '').replace(/[\$\/\\]index$/i, '') + memery.EXTT;
    responseTree[PUBLIC_APP].destpath = DESTNAME || PUBLIC_APP;

    return Object.assign({
        [PUBLIC_APP]: responseTree[PUBLIC_APP]
    });
}
module.exports = toComponent;
