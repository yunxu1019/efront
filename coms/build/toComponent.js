var scanner2 = require("../compile/scanner2");
var scanner = require("../compile/scanner");
var path = require("path");
var _strings = require("../basic/strings");
var memery = require("../efront/memery");
var globals = require("../efront/globals");
var { public_app, SOURCEDIR, EXPORT_TO: EXPORT_TO, PUBLIC_PATH } = require("./environment");
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
var decoderSource = `function(a, c, s, h){
    a = a[$split]("")[$reverse]();
    for (c = 0; c < a[$length]; c++) {
        s = a[c][$charCodeAt](0);
        if(s>39&&s<127){
            s=((h-s)%87)+40;
        }
        else if(s>=4096){
            s=(h&255)^s;
        }
        a[c]=String[$fromCharCode](s);
    }
    return a[$join]("");
}`;
var polyfill_map = `function (f, t) {
    var s = this,
    l=s[$length],
    r = [],
    c = 0,
    e=s[$call],
    d = s[l];
    for (; c < d; c++)r[c] = f[e](t, s[c], c, s);
    return r
}`;

var crypt_code = new Date / 1000 ^ Math.random() * 3600;
var encoded = memery.ENCRYPT;
var compress = memery.COMPRESS;
var keepspace = memery.KEEPSPACE;
var simple_compress = function (str) {
    if (keepspace) return str;
    str = str.toString()
        .replace(/\s+/g, ' ')
        .replace(/(\W)\s+/g, "$1")
        .replace(/\s+(\W)/g, "$1");
    if (encoded) str = str.replace(/\b[a-z]\b/ig, a => {
        var c = a.charCodeAt(0);
        if (c >= 97) {
            c = ((crypt_code - c) % 26) + 65;
        } else {
            c = ((crypt_code - c) % 26) + 97;
        }
        return String.fromCharCode(c);
    });
    return str;
};
var breaksort = function (a) {
    if (!encoded) return a;
    for (var cx = 0, dx = a.length; cx < dx; cx++) {
        var r = Math.random() * dx | 0;
        var m = a[cx];
        a[cx] = a[r];
        a[r] = m;
    }
    return a;
};
function setDistpath(response, altername) {
    var DESTNAME = String(memery.PUBLIC_NAME || altername).replace(/\.\w*$/, '').replace(/[\$\/\\]index$/i, '') + memery.EXTT;
    if (DESTNAME) response.destpath = DESTNAME;
}
function toComponent(responseTree, noVersionInfo) {
    var thisContext = "";
    var exportName = memery.EXPORT_TO || EXPORT_TO;
    if (/^(this|globalThis|window|global)$/.test(exportName)) thisContext = exportName;
    if (exportName === 'node') thisContext = 'global';
    if (exportName === 'deno' || exportName === 'export') thisContext = 'globalThis';
    var array_map = responseTree["[]map"] || responseTree["[]map.js"];
    for (var k in responseTree) {
        let realpath = responseTree[k].realpath
        if (realpath && !path.relative(path.join(__dirname, "../basic_/[]map.js"), realpath)) {
            array_map = responseTree[k];
            delete responseTree[k];
            break;
        }
    }
    var result = [];
    var libsTree = Object.create(null);
    var has_outside_require = false;
    var outsideAsync = false;


    var destMap = Object.create(null), dest = [];

    var paramsMap = Object.create(null);
    var avoidMap = scanner2.avoid || Object.create(null);
    var getEfrontKey = function (k, type) {
        k = String(k);
        if (type === 'global') {
            var key = k;
            if (!destMap[key]) {
                saveOnlyGlobal(key);
            }
        } else {
            if (type === 'string') k = _strings.decode(k);
            var key = k.replace(/[^\w\$]+/g, "_");
            if (key.length > 8) {
                key = key.slice(0, 8);
            }
            if (!/^\_/.test(key)) key = "_" + key;
            var hasOwnProperty = {}.hasOwnProperty;
            var id = 0;
            while (hasOwnProperty.call(paramsMap, key) && paramsMap[key] !== k || key in avoidMap && avoidMap[key] !== type) {
                key = key.replace(/\d+?$/, '') + ++id;
            }
            if (!destMap[key]) {
                paramsMap[key] = k;
                if (type === 'string') k = _strings.encode(k);
                if (type === 'string') k = encode(k);
                avoidMap[key] = type;
                saveOnly(k, key);
            }
        }
        return key;
    };
    var strings = [];
    var symbolid = 0;
    var addConst = function (w) {
        w = w.replace(/^\$/, '');
        if (strings.indexOf(w) >= 0) return;
        encoded ? strings.splice(strings.length * Math.random() | 0, 0, w) : strings.push(w);
    };
    "length,indexOf,string,exec,then,split,exports,concat,apply".split(",").forEach(addConst);
    if (encoded) decoderSource.replace(/\$\w+/g, addConst);
    if (array_map) polyfill_map.replace(/\$\w+/g, addConst);
    var encode = function (source) {
        var _source = _strings.decode(source);
        var prefix = '';
        if (isText(_source)) {
            if (!compress) prefix = `/* text */ `;
            if (!encoded) return prefix + source;
        }
        else if (isSymbol(_source)) {
            source = ++symbolid;
            if (!compress) source += ` /* symbol ${_source} */`;
            return source;
        }
        else {
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
            var strs = [];
            while (temp.length > 0) {
                strs.push(String.fromCharCode.apply(null, temp.splice(0, 1024)));
            }
            temp = strs.join('');

            if (!~strings.indexOf(temp)) source = temp;
        }
        source = _strings.encode(source);
        return source;
    };
    var getEncodedIndex = function (key, type = "string") {
        if (type === 'string') key = _strings.encode(key);
        return destMap[getEfrontKey(key, type)];
    };
    var saveCode = function (module_body, module_key, reqMap, occurs) {
        var this_module_params = Object.create(null);
        var needAwaits = false;
        var appendExtractedParam = function ($key) {
            if (this_module_params[$key]) return this_module_params[$key];
            var $arg = $key;
            var id = 0;
            while ($arg in occurs) {
                $arg = $key + ++id;
            }
            occurs[$arg] = true;
            this_module_params[$key] = $arg;
            module_body.splice(module_body.length >> 1, 0, $key);
            module_body.splice(module_body.length - 1, 0, $arg);
            return $arg;
        }
        var setMatchedConstString = function (k, isReq) {
            if (/^(['"`])user?\s+(strict|asm|strip)\1$/i.test(k)) return k;
            if (k.length < 3) return k;
            if (isReq) {
                var refer = _strings.decode(k);
                if (reqMap && {}.hasOwnProperty.call(reqMap, refer)) {
                    var reqer = reqMap[refer];
                    var reqed = getFromTree(destMap, reqer);
                    if (reqed) {
                        needAwaits = true;
                        return reqed;
                    }
                    console.warn(i18n`目标文件存在外部引用项${responseTree[reqer] ? "," + responseTree[reqer].warn : `: <blue2>${reqer}</blue2>`}`);
                    if (reqer in libsTree) {
                        var libdir = path.relative(PUBLIC_PATH, libsTree[reqer].realpath).replace(/\\/g, '/');
                        k = _strings.encode(libdir);
                    } else if (/^[\.\/]/.test(refer)) {
                        k = path.relative(PUBLIC_PATH, path.join(path.dirname(responseTree[module_key].realpath), refer)).replace(/\\/g, '/');
                        k = _strings.encode(k);
                    } else {
                        k = _strings.encode(reqMap[refer]);
                    }
                    has_outside_require = true;
                }
            }
            if (!memery.BREAK) return k;
            var $key = getEfrontKey(k, 'string');
            $key = appendExtractedParam($key);
            return $key;
        };
        var setMatchedConstRegExp = function (k) {
            var $key = getEfrontKey(k, 'regexp');
            $key = appendExtractedParam($key);
            return $key;
        };
        var module_string = module_body[module_body.length - 1];
        var [, isAsync, isYield] = /^(@?)(\*?)/.exec(module_string);
        if (isAsync || isYield) module_string = module_string.slice(+!!isAsync + +!!isYield);
        if (isAsync) outsideAsync = true;
        var code_blocks = scanner(module_string);
        var argList = module_body.slice(0, module_body.length >> 1)
        var hasRequire = argList.indexOf('require') >= 0 || argList.indexOf('init') >= 0 || argList.indexOf('popup') >= 0;
        var requireReg = new RegExp(`(?<=\\b(?:${argList.filter(a => /^(require|init|popup)$/.test(a))})\\s*\\(\\s*)['"\`]`, 'gy');
        var replaceMatchedString = function (block) {
            if (block.type === block.template_quote_scanner) {
                var { start, end } = block;
                if (block.children) {
                    var res = [];
                    for (var c of block.children) {
                        res.push(
                            module_string.slice(start, c.start),
                            replaceMatchedString(c).trim()
                        );
                        start = c.end;
                    }
                    res.push(module_string.slice(start, end));
                    return res.join('');
                }
            }
            var block_string = module_string.slice(block.start, block.end);
            if (block.type === block.single_quote_scanner || block.type === block.double_quote_scanner) {
                if (hasRequire) {
                    requireReg.lastIndex = block.start;
                    var isRequire = !!requireReg.exec(module_string);
                }
                var padStart = /^[\(\[\s]$/.test(module_string.charAt(block.start - 1)) ? "" : " ";
                var padEnd = /^[\[\(\.\s\,\;\]\)]$/.test(module_string.charAt(block.end)) ? "" : ' ';
                return padStart + setMatchedConstString(block_string, isRequire) + padEnd;
            }
            if (block.type === block.regexp_quote_scanner) {
                return setMatchedConstRegExp(block_string);
            }
            return block_string;
        };
        module_string = code_blocks.map(replaceMatchedString).join("");
        module_string = `${isAsync ? "async " : ""}function${isYield ? "*" : ""}(${module_body.slice(module_body.length >> 1, module_body.length - 1)}){${compress ? "" : "\r\n"}${module_string}${compress ? "" : "\r\n"}}`;
        if (compress) {
            module_string = scanner2(module_string).press(keepspace).toString();
        }
        if (needAwaits) getEncodedIndex('Promise', 'global');
        saveOnly(`[${module_body.slice(0, module_body.length >> 1).map(function (a) {
            var index = destMap[a];
            if (a === "__dirname" || a === "__filename") {
                initDirname();
                var realpath = module_key.replace(/\$/g, '/');
                var filename = path.relative(SOURCEDIR, responseTree[module_key].realpath);
                var dirname = path.dirname(filename).replace(/\\/g, '/');
                realpath = a === '__filename' ? filename : dirname;
                var realkey = getEfrontKey(realpath, 'dirname');
                if (!/\]$/.test(dest[destMap[realkey] - 1])) {
                    saveOnly(`[${getEncodedIndex('__dirname', 'builtin')},function(a){return a(${JSON.stringify(realpath)})}]`, realkey);
                }
                return destMap[realkey];
            }
            if (!isFinite(index)) {
                if (memery.EMIT) console.warn(i18n`编译异常`, module_key, a);
                saveOnly(a, a);
                index = destMap[a];
            }
            return index;
        }).concat(module_string)}]`, module_key);
    };
    var hasDirname = false;
    var initDirname = function () {
        hasDirname = true;
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
        var type = avoidMap[k];
        if (typeof type === 'string') type += " ";
        else type = '';
        if (!destMap[k]) {
            if (keepspace) {
                if (memery.COMMENT && !/^"/.test(k)) {
                    data = `\r\n/* ${dest.length + 1} ${type}${k.length < 100 ? k : k.slice(11, 43)} */ ` + data;
                } else {
                    data = `\r\n` + data;
                }
            }
            dest.push(data);
            destMap[k] = dest.length;
        } else {
            if (keepspace) {
                if (memery.COMMENT) {
                    data = `\r\n/* ${destMap[k]} ${type}${k.length < 100 ? k : k.slice(11, 43)} */ ` + data;
                }
                else {
                    data = `\r\n` + data;
                }
            }
            dest[destMap[k] - 1] = data;
        }
        ks.forEach(function (key) {
            destMap[key] = destMap[k];
        });
        return warning;
    }
    var saveOnlyGlobal = function (globalName) {
        var data = globalName;
        var isGlobal = data in globals;
        if (!/^['"]/.test(data) && !(data in safeGlobals)) {
            data = `typeof ${data}!=="undefined"?${data}:void 0`;
        }
        switch (globalName) {
            case "require":
            case "init":
                data = '[]';
                let args = [data];
                if (!responseTree.require || !responseTree.require.data) args.push("require");
                if (!responseTree.init || !responseTree.init.data) args.push("init");
                if (args.length > 1) {
                    hasRequire = true;
                    saveOnly.apply(null, args);
                }
                break;
            case "module":
                data = `[${crypt_code}]`;
                saveOnly(data, globalName);
                break;
            case "exports":
                data = `[${crypt_code % 2019 + 1}]`;
                saveOnly(data, globalName);
                break;
            default:
                saveOnly(data, globalName);
        }

        return isGlobal;
    }
    var saveGlobal = function (globalName) {
        if (responseTree[globalName] && !responseTree[globalName].data && !destMap[globalName]) {
            var warn = !saveOnlyGlobal(globalName);
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
            module = scanner2(module).press(keepspace).toString();
        }
        saveOnly(`[${d.imported.join(',')},${module}]`, d.importedid);
    };
    for (var k in responseTree) {
        if (!Object.prototype.hasOwnProperty.call(responseTree, k)) continue;
        var response = responseTree[k];
        if (!response.data && /^(number|function|string)$/.test(typeof response.builtin)) {
            response.data = response.builtin instanceof Function ? response.builtin.toString() : JSON.stringify(response.builtin);
        }
        if (response.type === "*" || response.type === "\\") {
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
            if (response.isAsync) outsideAsync = true;
            if (dependence) {
                result.push([k, dependence.require, dependence.requiredMap, [].concat(dependence, dependence.args, String(response.data || '').slice(dependence.offset)), response.occurs]);
            }
            else result.push([k, null, null, [response.data], response.occurs]);
        }
    }
    if (result.length === 1) {
        var [k, required, reqMap, module_body] = result[0];
        var isSingleFile = module_body.length === 1 && (!required || required.length === 0);
        if (isSingleFile && !memery.EMIT && !memery.ENCRYPT && !memery.BREAK && !memery.COMPRESS) {
            responseTree[k].data = module_body[module_body.length - 1].replace(/^(@?)(\*?)/, '');
            setDistpath(responseTree[k], k);
            return responseTree;
        }
    }
    console.info(i18n`正在合成`);
    if (array_map && array_map.data) saveCode([String(array_map.data)], "map", null, array_map.occurs);
    var circle_result, PUBLIC_APP, public_index, last_result_length = result.length, origin_result_length = last_result_length
    while (result.length) {
        for (var cx = result.length - 1, dx = 0; cx >= dx; cx--) {
            var [k, required, reqMap, module_body, occurs] = result[cx];

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
                console.warn(i18n`在 ${`<yellow>${k}</yellow>`} 中检测到可能不存在的外部变量：`, `<cyan2>${errored.join("<gray>,</gray> ")}</cyan2>`);
            }
            if (responseTree[k].data == null) {
                result.splice(cx, 1);
                continue;
            }
            if (ok || circle_result) {
                result.splice(cx, 1);
                var startTime = new Date;
                console.info(i18n`压缩(${origin_result_length - result.length}/${origin_result_length}):`, k);
                saveCode(module_body, k, reqMap, occurs);
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
                i18n`存在环形引用：${`[${circle_result.join('|')}]`}`
            );
        }
        last_result_length = result.length;
    }
    if (!circle_result) {
        PUBLIC_APP = circle_result ? circle_result[0] : k;
        public_index = dest.length - 1;
    }
    var freg = /^function[^\(]*?\(([^\)]+?)\)/;
    strings.map(function (str) {
        return getEfrontKey(`"${str}"`, "string");
    });
    report(responseTree);
    if (encoded) {
        var args = [];
        var argcount = 0;
        var decoder = decoderSource.replace(/\$\w+|String/g, function (w) {
            var isString = /^\$/.test(w);
            if (isString) w = w.slice(1);
            do {
                var a = String.fromCharCode("a".charCodeAt(0) + argcount++);
            } while (~"acsh".indexOf(a));
            args.push(a);
            args[a] = getEncodedIndex(w, isString ? "string" : 'global');
            return a;
        });
        saveOnly(simple_compress(`[${args.map(a => args[a])},function(${args}){return ${decoder}}]`), '- decoder');
    }
    var hasRequire;
    saveOnlyGlobal('module');
    saveOnlyGlobal('exports');
    if (array_map) polyfill_map = polyfill_map.replace(/\$(\w+)/g, function (_, w) {
        return getEncodedIndex(w, 'string') - 1;
    });

    var constIndex = strings.map(s => getEncodedIndex(s, 'string') - 1)
    if (hasDirname) constIndex.push(getEncodedIndex(`__dirname`, "global") - 1);

    if (!PUBLIC_APP) return console.error(i18n`没有可导出的文件！`), {};
    var stringr = {
        e: 'exec',
        q: 'split',
        o: 'concat',
        y: 'apply',
        v: 'reverse',
        z: 'string',
        B: 'exports',
        N: "then",
        T: 'this',
        P: `s[${getEncodedIndex(`Function`, 'global') - 1}]`,
        R: undefined,
        E: destMap.exports,
        m: `length`,
        M: destMap.module,
        A: `s[${getEncodedIndex('Array', 'global') - 1}]`,
    };

    var decoder = `
        if (typeof a !== z || ${constIndex.map(c => `${c} === c`).join(" || ")}) return a;
        return T[${destMap["- decoder"]}]()(a, c, s, s[M-1])`;
    var realize = `
    if (!(a instanceof A)) ${encoded ? `R = function () {${decoder}}` : `return T[c + 1] = function () { return a }`};${hasRequire ? `
    else if(!a[m]) R = ${has_outside_require ? `function(){
        var r = function (i) { return i[m] ? s[${getEncodedIndex("require", "builtin") - 1}](i) : T[i]() };
        r[T[${getEncodedIndex(`cache`)}]()] = s[${getEncodedIndex('require', "builtin") - 1}][T[${getEncodedIndex('cache')}]()];
        r[T[${getEncodedIndex(`resolve`)}]()] = s[${getEncodedIndex('require', "builtin") - 1}][T[${getEncodedIndex('resolve')}]()];
        return r;
    }`: `function (){ return function (i) { return T[i]() } }`};` : ""}
    else R = function (Q) {${outsideAsync ? `
        var C = [];` : ''}
        if (E === c + 1 || M === c + 1) return s[c][0];
        var r = s[${getEncodedIndex(`/${freg.source}/`, 'regexp') - 1}], I, g = [], i, k = a[m] - 1, f = a[k], l = r[e](f);
        for (i = 0; i < k; i++) g[i] = ${responseTree.module || responseTree.exports ? `a[i] === M ? (I = I || {}, I[B] = Q, I) : a[i] === E ? (I = I || {}, I[B] = Q) : ` : ''}a[i] ? T[a[i]]() : T[0]${outsideAsync ? `, g[i] && g[i][N] instanceof P && C[T[${getEncodedIndex("push")}]()](i, g[i])` : ''};
        if (l) l = l[1][q](','), g = g[o]([l]);${outsideAsync ? `
        if (C[m]) return T[${getEncodedIndex(`Promise`, 'global')}]()[T[${getEncodedIndex("all")}]()](C)[N](function (G) {
            for (i = 0; i < G[m]; i++)g[G[i++]] = G[i];
            r = f[y](I ? I[B] : T[0], g);
            return I ? I[B] : r;
        });`: ""}
        r = f[y](I ? I[B] : T[0], g);
        return ${outsideAsync ?
            `I && r && r[N] instanceof P ? r[N](function () { return I[B] }) : I ? I[B] : r`
            : "I ? I[B] : r"
        }
    };
    return T[c + 1] = function (S) {
        T[c + 1] = function () { return S };
        return S = {}, S = R(S)${outsideAsync ? `, S && S[N] instanceof P && S[N](function (s) { S = s }), S` : ''};
    }`;
    var declears = scanner2(realize).envs;
    declears = Object.keys(declears).filter(k => !/^[acs]$/.test(k)).map(k => {
        if (!stringr.hasOwnProperty(k)) {
            throw new Error(i18n`缺少变量：` + k);
        }
        var v = stringr[k];
        if (typeof v === 'string' && !/\[|^(this)$/.test(v)) {
            if (strings.indexOf(v) < 0) throw new Error(i18n`缺少常量：` + v);
            v = `s[${getEncodedIndex(v, "string") - 1}]`;
        }
        if (v !== undefined) return `${k} = ${v}`;
        return k;
    });
    declears = breaksort(declears).join(', ');
    realize = `function (a, c, s) {
    var ${declears};${realize}\r\n}`;

    var versionInfo = noVersionInfo ? '' : `/*${new Date().toString()} with efront ${require("../../package.json").version}*/`;
    var template = `([${versionInfo}].map${array_map ? simple_compress(" || " + polyfill_map) : ''}).call([${dest}],${simple_compress(realize)},[${thisContext || 'this?this.window||this.globalThis||global:globalThis'}])[${public_index}]()`;
    if (exportName) {
        if (exportName === 'export') {
            template = "export default " + template;
        }
        if (!thisContext) switch (exportName) {
            case "void":
            case 'return':
                template = exportName + " " + template;
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
                template = `(this||globalThis)["${exportName}"]=` + template;
                responseTree[PUBLIC_APP].destpath = exportName;

        }
    }
    if (memery.DENO || exportName === 'deno') {
        var prefix = [];
        if (hasDirname) {
            prefix.push(`__dirname = Deno.mainModule.replace(/${/[^\\\/]+$/.source}/, '').replace(/${/^file:\/\/\//.source}/, '')`);
        }
        if (destMap.global) {
            prefix.push(`global = globalThis`);
        }
        if (has_outside_require || destMap.process || destMap.Buffer) {
            prefix.unshift(`require = Deno[Deno.internal].requireImpl.Module.createRequire(/${/^file:\/\/\//.source}/.test(Deno.mainModule)?Deno.mainModule.replace(/${/^file:\/\/\//.source}/, ''):Deno.cwd().replace(/${/\\/.source}/g,'/')+"/")`);
        }
        if (prefix.length) {
            prefix = [`if(typeof Deno === 'object'){var ${prefix.join(',')};Deno[Deno.internal].node.initialize();}`];
        }
        if (destMap.global) {
            prefix[prefix.length - 1] += (`else global = require("vm").runInThisContext("global")`);
        }
        if (destMap.process) {
            prefix.push(`var process = require("process")`);
        }
        if (destMap.Buffer) {
            prefix.push(`var Buffer = require("buffer").Buffer`);
        }

        template = prefix.join(';') + ";\r\n" + template;
    }
    if (exportName === 'node' || memery.NODE) {
        template = `#!/usr/bin/env node\r\n` + template;
    }
    if (memery.EXPORT_AS) {
        template += `["${memery.EXPORT_AS}"]`;
    }

    responseTree[PUBLIC_APP].data = template;
    setDistpath(responseTree[PUBLIC_APP], PUBLIC_APP);

    return Object.assign({
        [PUBLIC_APP]: responseTree[PUBLIC_APP]
    });
}
module.exports = toComponent;
