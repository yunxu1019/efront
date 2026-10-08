var scanner2 = require("../compile/scanner2");
var scanner = require("../compile/scanner");
var path = require("path");
var _strings = require("../basic/strings");
var crypt1 = require("./crypt1");
var memery = require("../efront/memery");
var globals = require("../efront/globals");
var { VALUE } = require("../compile/common");
var { public_app, SOURCEDIR, EXPORT_TO: EXPORT_TO, PUBLIC_PATH } = require("./environment");
if (SOURCEDIR) SOURCEDIR = path.dirname(public_app);
else SOURCEDIR = PUBLIC_PATH;
var breakreg = memery.BREAK ? function (_, a, c, p) {
    c = _strings.escape(c, memery.BREAK).replace(/\\[\s\S]|\//g, a => a.length === 1 ? '\\' + a : a);
    return a + c + p;
} : a => a;
var strings_encode = memery.BREAK && false ? function (source) {
    return _strings.encode(source, `"`, false);
} : _strings.encode;
var strings_decode = _strings.decode;
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
var decoderSource = `function(a, c, s){
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
    if (encoded && crypt_code) str = str.replace(/\b[a-z]\b/ig, a => {
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
var quotedMap = compile$breakcode2.quoted;

function toComponent(responseTree, isWebProject) {
    crypt_code = memery.crypt_code;
    responseTree = Object.assign(Object.create(null), responseTree);
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

    var avoidMap = scanner2.avoid || Object.create(null);
    var getEfrontKey = function (name, type) {
        name = String(name);
        var key = name;
        if (type === 'global') {
            if (!destMap[key]) {
                saveOnlyGlobal(key);
            }
        } else {
            if (type === 'string') {
                key = compile$breakcode2.getkey(name);
            }
            if (!/^\\/.test(key)) key = "\\" + key;
            if (!destMap[key]) {
                if (/^\\[TR]/.test(key)) {
                    name = quotedMap[key];
                    if (/^\\T/.test(key)) name = encode(quotedMap[key]);
                    else if (isWebProject) name = name.replace(/(--!?)>/g, "$1\\>").replace(/<!--/g, '<!-\\-');
                }
                saveOnly(name, key);
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
    var hasEncode = false;
    var encode = function (source) {
        var _source = strings_decode(source);
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
        hasEncode = true;
        source = _source;
        if (!~strings.indexOf(source)) {
            var temp = crypt1(source, crypt_code);
            if (!~strings.indexOf(temp)) source = temp;
        }
        source = strings_encode(source);
        if (isWebProject) source = source.replace(/[\>\<&]/g, a => "\\x" + a.charCodeAt(0).toString(16));
        return source;
    };
    var getEncodedIndex = function (key, type = "string") {
        if (type === 'string') key = strings_encode(key);
        return destMap[getEfrontKey(key, type)];
    };
    var initDecoder = function () {
        initDecoder = function () { };
        if (encoded) {
            saveOnlyGlobal('module');
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
            saveOnly(simple_compress(`[${dest.length + 1},${args.map(a => args[a])},function(h,${args}){return ${decoder}}]`), "\\decrypt");
            return decoder;
        }
    };
    var saveCode = function (response, module_key) {
        var needAwaits = false;
        var { isAsync, async, yield, params, imported, strkeys, prequoted } = response;
        if (isAsync) outsideAsync = true;
        if (needAwaits) getEncodedIndex('Promise', 'global');
        imported = imported.map(function (a) {
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
                if (/^\\[RT]/.test(a)) return getEncodedIndex(a, 'quoted');
                if (a === "\\import") saveOnly(`[${getEncodedIndex("url")},function(b){return function(a,c){return c={},c[b]=a,c}}]`, a);
                else if (memery.EMIT && a !== '\\decrypt' && !(a in globals)) {
                    console.warn(i18n`存在异常依赖项`, module_key, a);
                    saveOnly(a, a);
                }
                else saveOnlyGlobal(a);
                index = destMap[a];
            }
            return index;
        });
        if (strkeys) imported = imported.concat(strkeys.map(strk => {
            return destMap[getEfrontKey(strk, 'quoted')];
        }));
        var module_string = `${async ? "async " : ""}function${yield ? "*" : ""}(${params}){${prequoted || ""}${compress ? "" : "\r\n"}${String(response.data)}${compress ? "" : "\r\n"}}`;
        saveOnly(`[${imported},${module_string}]`, module_key);
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
        if (!/^['"]/.test(data) && !(data in compile$safeGlobals)) {
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
            case "\\decrypt":
                initDecoder();
                isGlobal = true;
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
                text = strings_decode(text);
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
        if (!d.writed) var imported1 = d.imported.map(saveImported);
        var module = d.module.replace(/"(imported\s*-\s*\d+)"/g, imported);
        if (compress) {
            module = scanner2(module).press(keepspace, compress).toString();
        }
        saveOnly(`[${imported1.join(',')},${module}]`, d.importedid);
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
            if (response.isAsync) outsideAsync = true;
            result.push([k, response]);
        }
    }
    console.info(i18n`正在合成`);
    if (array_map && array_map.data) saveCode(array_map, "map");
    var circle_result, PUBLIC_APP, public_index, last_result_length = result.length, origin_result_length = last_result_length
    while (result.length) {
        for (var cx = result.length - 1, dx = 0; cx >= dx; cx--) {
            var [k, response] = result[cx];
            var { required, requiredMap: reqMap, imported: imports = [], reqlinks } = response;
            if (required && reqMap) required = required.map(k => reqMap[k] || k);
            var ok = true;
            if (required) for (var r of required) {
                if (!destMap[r]) {
                    let resp = responseTree[r];
                    if (resp && resp.data) {
                        ok = false;
                        break;
                    }
                }
            }
            var errored = imports.filter(saveGlobal);
            if (errored.length) {
                console.warn(i18n`在 ${`<yellow>${k}</yellow>`} 中检测到可能不存在的外部变量：`, `<cyan2>${errored.join("<gray>,</gray> ")}</cyan2>`);
            }
            if (!responseTree[k].realpath) {
                result.splice(cx, 1);
                continue;
            }
            if (ok || circle_result) {
                result.splice(cx, 1);
                var startTime = new Date;
                console.info(i18n`压缩(${origin_result_length - result.length}/${origin_result_length}):`, k);
                if (reqlinks) reqlinks.forEach(r => {
                    if (r.type === VALUE) {
                        var id = required[r.value];
                        if (destMap[id]) r.text = String(destMap[id]);
                        else throw console.warn(response.realpath + required.i[r.value], "\r\n", id, Object.keys(responseTree)), new Error(`模块引用异常`);
                    }
                    else {
                        has_outside_require = true;
                    }
                });
                saveCode(response, k);
                responseTree[k].time += new Date - startTime;
            }
        }
        if (last_result_length === result.length && !circle_result) {
            circle_result = result.map(a => a[0]).filter(k => !!responseTree[k].realpath);
            if (!public_index && circle_result) {
                public_index = dest.length;
                PUBLIC_APP = circle_result[0];
            }
            circle_result.forEach(k => saveOnly(`""`, k));
            console.warn(
                i18n`存在环形引用：${`[${circle_result.join('|')}]`}`
            );
        }
        last_result_length = result.length;
    }
    if (!circle_result) {
        PUBLIC_APP = k;
        public_index = dest.length - 1;
    }
    var freg = /^function[^\(]*?\(([^\)]+?)\)/;
    strings.map(function (str) {
        return getEfrontKey(`"${str}"`, "string");
    });
    report(responseTree);
    var hasRequire;
    var hasModule = responseTree.module || responseTree.exports;
    if (hasModule) {
        saveOnlyGlobal('module');
        saveOnlyGlobal('exports');
    }
    if (hasEncode) initDecoder();
    if (!hasModule) hasModule = destMap.module;
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
        m: `length`,
        E: destMap.exports,
        M: destMap.module,
        A: `s[${getEncodedIndex('Array', 'global') - 1}]`,
    };
    var decoder = `
        if (typeof a !== z || !(${constIndex.map(c => `${c} - c`).join(" && ")})) return a;
        return T[${destMap["\\decrypt"]}]()(a)`;
    var realize = `
    if (!(a instanceof A)) ${hasEncode ? `R = function () {${decoder}}` : `return T[c + 1] = function () { return a }`};${hasRequire ? `
    else if(!a[m]) return T[c + 1] = ${has_outside_require ? `function(r){
        T[c + 1] = function(){return r};
        r = function (i, a) { a = a || ""; return i[m] ? s[${getEncodedIndex("require", "builtin") - 1}](i+a) : T[i](a) };
        r[T[${getEncodedIndex(`cache`)}]()] = s[${getEncodedIndex('require', "builtin") - 1}][T[${getEncodedIndex('cache')}]()];
        r[T[${getEncodedIndex(`resolve`)}]()] = s[${getEncodedIndex('require', "builtin") - 1}][T[${getEncodedIndex('resolve')}]()];
        return r;
    }`: `function(r){return T[c + 1] = function(){return r},r = function (i, a) { return T[i](a) }}`};` : ""}
    else R = function (Q, A) {${outsideAsync ? `
        var C = [];` : ''}${hasModule ? `
        if (!(${destMap.exports ? `~c + E &&` : ''} ~c + M)) return s[c][0];` : ''}
        var r = s[${getEncodedIndex(`/${freg.source}/`, 'regexp') - 1}], I, g = [], i, k = a[m] - 1, f = a[k], l = r[e](f);
        for (i = 0; i < k; i++) g[i] = ${hasModule
            ? `a[i] === M ? (I = I || {}, I[B] = Q, I) :${destMap.exports ? ` a[i] === E ? (I = I || {}, I[B] = Q) :` : ''} ${destMap["\\import"] ? `a[i] === ${destMap["\\import"]}?T[a[i]]()(A):` : ""}`
            : ''} a[i] === c + 1 ? f : a[i] ? T[a[i]]() : T[0]${outsideAsync ? `, g[i] && g[i][N] instanceof P && C[T[${getEncodedIndex("push")}]()](i, g[i])` : ''};
        ${hasEncode ? `if (!(${destMap["\\decrypt"] - 1}-c)) g[0] = s[M - 1];` : ''}
        g = g[o]([f, g, l ? l[1][q](',') : []]);${outsideAsync ? `
        if (C[m]) return T[${getEncodedIndex(`Promise`, 'global')}]()[T[${getEncodedIndex("all")}]()](C)[N](function (G) {
            for (i = 0; i < G[m]; i++)g[G[i++]] = G[i];
            return f[y](I ? I[B] : T[0], g);
        });`: ""}
        return f[y](I ? I[B] : T[0], g);
    };
    return T[c + 1] = function (a,S) {
        a=~c+(a||'');
        if(!T[a]) T[a] = function () {
            return S;
        }, S=R(S={},a)${outsideAsync ? `, S && S[N] instanceof P && S[N](function (s) { S = s });` : ';'}
        return T[a]();
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

    var versionInfo = isWebProject ? '' : `/*${new Date().toString()} with efront ${require("../../package.json").version}*/`;
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
    if (isWebProject);
    else {

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
    }

    responseTree[PUBLIC_APP].data = template;
    setDistpath(responseTree[PUBLIC_APP], PUBLIC_APP);

    return Object.assign({
        [PUBLIC_APP]: responseTree[PUBLIC_APP]
    });
}
module.exports = toComponent;
