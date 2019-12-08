var escodegen = require("../../process/escodegen/escodegen");
var esprima = require("../../process/esprima");
var esmangle = require("../../process/esmangle/esmangle");
var scanner = require("../../process/compile/scanner");
var typescript = require("../../process/typescript/typescript");
function toComponent(responseTree) {
    var array_map = responseTree["[]map"];
    delete responseTree["[]map"];
    var result = [];
    var crypt_code = new Date / 1000 ^ Math.random() * 3600;
    for (var k in responseTree) {
        var response = responseTree[k];
        var dependence = response.dependence;
        if (response.data instanceof Buffer) {
            response.data = String(response.data);
        }
        if (!response.data && /^(number|function|string)$/.test(typeof response.builtin)) {
            response.data = response.builtin instanceof Function ? response.builtin.toString() : JSON.stringify(response.builtin);
        }
        result.push([k].concat(dependence).concat(dependence.args).concat(responseTree[k].toString().slice(dependence.offset)));
    }
    var destMap = {
    }, dest = [], last_result_length = result.length;

    var $$_efront_map_string_key = "$$__efront_const";
    var getEfrontKey = function (k, type) {
        k = String(k);
        var key = k.replace(/[^\w]/g, a => "$" + a.charCodeAt(0).toString(36) + "_");
        var $key = $$_efront_map_string_key + "_" + type + "_" + key;
        if (!destMap[$key]) {
            dest.push(k);
            destMap[$key] = dest.length;
        }
        return $key;
    };
    var strings = "slice,length,split,concat,apply,reverse,exec,indexOf,string,join,call".split(",");
    var encoded = true;

    var encode = function (source) {
        if (!encoded) return source;
        source = eval(source);
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
        source = JSON.stringify(source).replace(/[\u1000-\uffff]/g, a => "\\u" + a.charCodeAt(0).toString(16));
        return source;
    };

    var saveCode = function (module_body, k) {
        var this_module_params = {};
        var setMatchedConstString = function (match, type, k, isProp) {
            if (/^(['"])user?\s+strict\1$/i.test(k)) return `"use strict"`;
            if (k.length < 3) return match;
            switch (type) {
                case "'":
                case "\"":
                    k = k.replace(/^(['"])(.*?)\1$/, function (match, quote, string) {
                        return "\"" + string.replace(/\\([\s\S])/g, (a, b) => b === "'" ? b : a).replace(/"/g, "\\\"") + "\"";
                    });
                    break;
                case ".":
                    k = "\"" + k + "\"";
                    break;
            }
            k = encode(k);
            var $key = getEfrontKey(k, 'string');

            if (!this_module_params[$key]) {
                this_module_params[$key] = true;
                module_body.splice(module_body.length >> 1, 0, $key);
                module_body.splice(module_body.length - 1, 0, $key);
            }
            return (isProp || type === ".") ? `[${$key}]` : " " + $key + " ";
        };
        var setMatchedConstRegExp = function (match, type, k) {
            var $key = getEfrontKey(k, 'regexp');
            if (!this_module_params[$key]) {
                this_module_params[$key] = true;
                module_body.splice(module_body.length >> 1, 0, $key);
                module_body.splice(module_body.length - 1, 0, $key);
            }
            return type + " " + $key + " ";
        };
        var module_string = module_body[module_body.length - 1];
        var code_blocks = scanner(module_string);
        var extentReg = /\s*[\:\(]/gy, prefixReg = /(?<=[,\{]\s*)\s|[\,\{}]/gy;
        module_string = code_blocks.map(function (block, index, blocks) {
            var block_string = module_string.slice(block.start, block.end);
            var isPropEnd = (
                extentReg.lastIndex = block.end,
                extentReg.exec(module_string)
            );
            var isPropStart = (
                prefixReg.lastIndex = block.start - 1,
                prefixReg.exec(module_string)
            );
            var isProp = !!(isPropStart && isPropEnd);
            if (block.type === block.single_quote_scanner) {
                return setMatchedConstString(block_string, "'", block_string, isProp);
            }
            if (block.type === block.double_quote_scanner) {
                return setMatchedConstString(block_string, "\"", block_string, isProp);
            }
            if (block.type === block.regexp_quote_scanner) {
                return setMatchedConstRegExp(block_string, "", block_string);
            }
            return module_string.slice(block.start, block.end);
        }).join("").replace(/(\.)\s*((?:\\u[a-f\d]{4}|\\x[a-f\d]{2}|[\$_a-z\u0100-\u2027\u2030-\uffff])(?:\\u[a-f\d]{4}|\\x[a-f\d]{2}|[\$_\w\u0100-\u2027\u2030-\uffff])*)/ig, setMatchedConstString);

        module_string = typescript.transpile(module_string);
        var module_code = esprima.parse(`function ${k.replace(/^.*?([\$_a-z]\w*)\.[tj]sx?$/ig, "$1")}(${module_body.slice(module_body.length >> 1, module_body.length - 1)}){${module_string}}`);
        module_code = esmangle.optimize(module_code, null);
        module_code = esmangle.mangle(module_code);
        module_string = escodegen.generate(module_code, {
            format: {
                renumber: true,
                hexadecimal: true, //十六进位
                escapeless: true,
                compact: true, //去空格
                semicolons: false, //分号
                parentheses: false //圆括号
            }
        }).replace(/^function\s+[\$_A-Za-z][\$_\w]*\(/, "function(");
        dest.push(`[${module_body.slice(0, module_body.length >> 1).map(a => destMap[a]).concat(module_string)}]`);
        destMap[k] = dest.length;
    };
    saveCode([String(array_map.data)], "map");
    var freg = /^function[^\(]*?\(([^\)]+?)\)/;
    strings.map(function (str) {
        return getEfrontKey(`"${str}"`, "string");
    }).concat(
        getEfrontKey("/" + freg.source + "/", "regexp")
    );
    var $charCodeAt = 'charCodeAt'.split("").reverse().map(a => `"${a}"`);
    var $fromCharCode = 'fromCharCode'.split("").reverse().map(a => `"${a}"`);
    ['Array', 'String', crypt_code].concat($charCodeAt, $fromCharCode).forEach(function (str) {
        getEfrontKey(str, 'global');
    });

    while (result.length) {
        for (var cx = result.length - 1, dx = 0; cx >= dx; cx--) {
            var [k, ...module_body] = result[cx];
            var ok = true;
            module_body.slice(0, module_body.length >> 1).forEach(function (k) {
                if (!destMap[k] && responseTree[k]) ok = false;
                if (!responseTree[k].data && !destMap[k]) destMap[k] = dest.length + 1, dest.push(k);
            });
            if (!responseTree[k].data) {
                result.splice(cx, 1);
                continue;
            }
            if (ok) {
                saveCode(module_body, k);
                result.splice(cx, 1);
            }
        }
        if (last_result_length === result.length) throw new Error(`处理失败！`);
        last_result_length = result.length;
    }

    var PUBLIC_APP = k;
    var string_r = `x=s[${destMap[getEfrontKey(`"indexOf"`, "string")] - 1}],
    m=s[${destMap[getEfrontKey(`"length"`, "string")] - 1}],
    n=s[${destMap[getEfrontKey(`"slice"`, "string")] - 1}],
    e=s[${destMap[getEfrontKey(`"exec"`, "string")] - 1}],
    q=s[${destMap[getEfrontKey(`"split"`, "string")] - 1}],
    o=s[${destMap[getEfrontKey(`"concat"`, "string")] - 1}],
    y=s[${destMap[getEfrontKey(`"apply"`, "string")] - 1}],
    v=s[${destMap[getEfrontKey(`"reverse"`, "string")] - 1}],
    z=s[${destMap[getEfrontKey(`"string"`, "string")] - 1}],
    w=s[${destMap[getEfrontKey(`"join"`, "string")] - 1}]`;
    -function () {
        string_r = string_r.split(',');
        for (var cx = 0, dx = string_r.length; cx < dx; cx++) {
            var rest = string_r.splice(Math.random() * dx | 0, 1);
            string_r.splice.apply(string_r, [cx, 0].concat(rest));
        }
        string_r = string_r.join(',');
    }();
    var realize = `function (a, c,s) {
        var ${string_r},
        u,p=[x,m,n,q,o,y,e,v,z,w,s[${destMap[getEfrontKey(`"call"`, "string")] - 1}]],
        h=s[${destMap[getEfrontKey(crypt_code, 'global')] - 1}],
        j=s[${destMap[getEfrontKey('String', 'global')] - 1}],
        $=[${$fromCharCode.map(a => destMap[getEfrontKey(a, 'global')] - 1).map(a => `s[${a}]`)}],
        _=[${$charCodeAt.map(a => destMap[getEfrontKey(a, 'global')] - 1).map(a => `s[${a}]`)}][v]()[w]('');
        if (!(a instanceof s[${destMap[getEfrontKey('Array', 'global')] - 1}])){${
        encoded ? `
            if(typeof a===z&&!~p[x](a)){
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
                }`: ''
        }
            return this[c + 1] = a;
        }
        var t = this,
        r=s[${destMap[getEfrontKey(`/${freg.source}/`, 'regexp')] - 1}],
        g =[],i=0,k=a[m]-1, f = a[k],l = r[e](f);
        for(;i<k;i++)g[i]=t[a[i]];
        if (l) {
            l = l[1][q](',');
            g = g[o]([l]);
        }
        return t[c + 1] = f[y](t[0], g);
    }`;
    var polyfill_map = `function (f, t) {
        var s = this,
        l=s[${destMap[getEfrontKey(`"length"`, 'string')] - 1}],
        r = [],
        c = 0,
        e=s[${destMap[getEfrontKey(`"call"`, "string")] - 1}],
        d = s[l];
        for (; c < d; c++)r[c] = f[e](t, c, s[c]);
        return r
    }`;
    var simplie_compress = function (str) {
        return str.toString().replace(/\s+/g, ' ').replace(/(\W)\s+/g, "$1").replace(/\s+(\W)/g, "$1")
        .replace(/\b[a-z]\b/ig, a => {
            var c = a.charCodeAt(0);
            if (c >= 96) {
                c = ((crypt_code - c) % 26) + 65;
            } else {
                c = ((crypt_code - c) % 26) + 96;
            }
            return String.fromCharCode(c);
        });
    };

    var template = `this["${PUBLIC_APP.replace(/([a-zA-Z_\$][\w\_\$]*)\.js$/, "$1")}"]=([/*${new Date().toString()} by efront*/].map||${simplie_compress(polyfill_map)}).call([${dest}],${simplie_compress(realize)},[this.window||global])[${dest.length - 1}]`;
    // var tester_path = responseTree[PUBLIC_APP].realpath.replace(/\.[tj]sx?$/, "_test.js");
    // if (tester_path) {
    //     try {
    //         let vm = require("vm");
    //         let globals = require("../../tester/core/suit");
    //         let context = vm.createContext(globals);
    //         vm.runInContext(template, context);
    //         vm.runInContext(fs.readFileSync(tester_path).toString(), context);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
    responseTree[PUBLIC_APP].data = template;
    return {
        [PUBLIC_APP]: responseTree[PUBLIC_APP]
    };
}
module.exports = toComponent;