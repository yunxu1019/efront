var { STAMP, PROPERTY, SCOPED, VALUE, STRAP, EXPRESS, QUOTED, SPACE, COMMENT, createString: _createString, splice } = require("./common");
var createString = function (a) {
    a.autospace = false;
    return _createString(a);
};
class 素玉 extends Program {
    straps = ["and"];
    stamps = ',:;>+~&!/'.split("");
    quotes = this.quotes.slice(0, 2).concat();
    keepspace = true;
    scopes = [["(", ")"], ["{", "}"]];
}

var rarg = new 素玉;
rarg.quotes.push(["url(", ")"]);
var numberReg = /((?:[\+\-]+)?(?:\d+(?:\.\d*)?|\.\d+))(?:\s*(px|%|pt|pc|in|cm|mm|r?em|deg|rad|vw|vh|%))?/;
var replaceHReg = new RegExp(numberReg.source + /\s*([\/\*])\s*/.source + numberReg.source, 'gi');
var replaceLReg = new RegExp(numberReg.source + /(\s*[\+\-]\s+|[\+\-])/.source + numberReg.source, 'gi');
var replaceTReg = new RegExp(numberReg.source + /\s*[\/\*\+\-]\s*/.source + numberReg.source, 'i');
var remove_quote = a => a.replace(/~\s*(['"`])((?:\\[\s\S]|[^'"`\\])*?)\1/g, '$2');
var keepdot = function (a) {
    var g = Math.pow(10, Math.log10(a) | 0) * 1000;
    return (a * g | 0) / g;
}
var replace_punc = function (a) {
    if (typeof a !== "string") return a;
    a = remove_quote(a);
    if (/\(/.test(a)) return a;
    do {
        var replaced = false;
        a = a.replace(replaceHReg, function (_, d1, p1, c, d2, p2) {
            if (!p2 || !p1) {
                p1 = p1 || p2 || '';
                d1 = eval(d1);
                d2 = eval(d2);
                if (c === '*') {
                    replaced = true;
                    return keepdot(d1 * d2) + p1;
                }
                if (c === '/') {
                    replaced = true;
                    return keepdot(d1 / d2) + p1;
                }
            }
            return _;
        });
    } while (replaced);
    do {
        var replaced = false;
        a = a.replace(replaceLReg, function (_, d1, p1 = '', c, d2, p2 = '') {
            if (p1 === p2) {
                d1 = eval(d1);
                d2 = eval(d2);
                c = c.trim();
                if (c === "+") {
                    replaced = true;
                    return keepdot(+d1 + +d2) + p1;
                }
                if (c === '-') {
                    replaced = true;
                    return keepdot(d1 - d2) + p1;
                }
            }
            return _;
        });
    } while (replaced);
    return a;
}
var killcalc = a => replace_punc(createString(a));
var seprateFunc = function (express) {
    var express = scanner2(express, rarg);
    var sps = [];
    var sp = [];
    for (var cx = 0, dx = express.length; cx < dx; cx++) {
        var o = express[cx];
        if (o.type === SCOPED && o.entry === '(') {
            var p = sp[sp.length - 1];
            if (!p) {
                sp.push(o);
                sps.push(killcalc(sp));
                sp.splice(0, sp.length);
            }
            else if (p.type & (EXPRESS | PROPERTY)) {
                sp.pop();
                if (sp.length) sps.push(killcalc(sp));
                sp.splice(0, sp.length, p, o);
                sps.push(createString(sp));
                sp.splice(0, sp.length);
            }
            else {
                sps.push(killcalc(sp));
                sp.splice(0, sp.length, o);
                sps.push(createString(sp));
                sp.splice(0, sp.length);
            }
        }
        else if (o.type === QUOTED && !/^['"`]/.test(o.text)) {
            if (sp.length) sps.push(killcalc(sp));
            sp.splice(0, sp.length);
            sps.push(o.text);
        }
        else sp.push(o);
    }
    if (sp.length) sps.push(killcalc(sp));
    return sps;
}
var splitParams = function (params) {
    if (!params) return [];
    params = scanner2(params, rarg);
    var code = params;
    var params = [], p = [];
    for (var cx = 0, dx = code.length; cx < dx; cx++) {
        var o = code[cx];
        if (o.type === STAMP && o.text === ',') {
            params.push(createString(p).trim());
            p = [];
            continue;
        }
        p.push(o);
    }
    if (p.length) params.push(createString(p).trim());
    return params;
}
var createArgMap = function (args, split = ',', equal = ':') {
    if (args) args = scanner2(args, rarg);
    else args = [];
    var map = Object.create(null);
    var o = args.first;
    var args = [];
    while (o) {
        if (!(o.type & (VALUE | STRAP | QUOTED | PROPERTY | EXPRESS))) {
            throw new Error(i18n`参数异常！`);
        }
        var k = o.text;
        args.push(k);
        o = o.next;
        if (o && o.type === STAMP && o.text === equal) {
            var v = []
            o = o.next;
            while (o && (o.type !== STAMP || o.text !== split)) {
                v.push(o);
                o = o.next;
            }
            map[k] = createString(v);
        }
        if (o && o.type === STAMP && o.text === split) o = o.next;
    }
    args.defaults = map;
    return args;
};

var macros = Object.create(null);
macros.calc = function (a) {
    if (replaceTReg.test(a)) return `calc(${a})`;
    return a;
};
macros.range = function () {
    if (arguments.length === 1) {
        return ArrayFill(arguments[0], 0).map((a, i) => i + 1).join(' ');
    }
    if (arguments.length === 3) {
        var [start, end, step] = arguments;
        var unit = /[^\d]+$/.exec(start);
        if (!unit) unit = /[^\d]+$/.exec(end);
        if (!unit) unit = /[^\d]+$/.exec(step);
        if (unit) unit = unit[0];
        else unit = '';
        var fixed1 = start.length - start.lastIndexOf('.');
        var fixed2 = end.length - end.lastIndexOf('.');
        var fixed3 = step.length - step.lastIndexOf('.');
        var fixed = Math.max(fixed1, fixed2, fixed3);
        start = parseFloat(start);
        end = parseFloat(end);
        step = parseFloat(step) || 1;
        var result = [];
        for (var temp = start; temp <= end; temp += step) {
            result.push(+temp.toFixed(fixed) + unit);
        }
        return result.join(' ');
    }
    throw new Error(i18n`range参数错误:` + arguments);
};
macros.extract = function () {
    if (arguments.length === 2) var [list, index] = arguments;
    else var index = arguments[arguments.length - 1], list = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
    index -= 1;
    if (typeof list === 'string') list = getList(list);
    else if (list instanceof Array) {
        list = list.concat(list.rest);
    }
    return list[index];
};
macros.length = function (list) {
    if (arguments.length !== 1) return arguments.length;
    if (typeof list === 'string') return getList(list).length;
    else if (list instanceof Array) {
        return createArgMap(list.concat(list.rest).join(''), ';').length;
    }
    return 1;
};
macros.escape = function (a) {
    return strings.decode(a).replace(/[^,\/\?@&\+'~\!\$\w\.]/g, function (a) {
        return "%" + encodeUTF8(a).map(a => a < 16 ? "0" + a.toString(16) : a.toString(16));
    });
};
macros.e = function (a) {
    return strings.decode(a);
};

var wrapColor = function (k) {
    var f = color[k];
    macros[k] = function (c) {
        if (color.isColor(c)) return f(...arguments);
        return `${k}(${Array.apply(null, arguments).join(',')})`;
    };
};

[
    "saturate",
    "desaturate",
    "lighten",
    "darken",
    "fadein",
    "fadeout",
    "fade",
    "spin",
    "mix",
    "tint",
    "shade",
    "grayscale",
    "grayluma",
    "fade"
].forEach(wrapColor);

macros[""] = function (a) {
    return a;
};

var getList = function (list) {
    list = splitParams(list);
    if (list.length === 1) list = list[0].split(/\s+/);
    return list;
};
macros.each = function () {
    if (arguments.length !== 2) {
        body = arguments[arguments.length - 1];
        list = Array.prototype.slice.call(arguments, 0, arguments.length - 1).join(',');
    }
    else {
        var [list, body] = arguments;
    }
    var match = /^(?:\s*[#\.]?\(([\s\S]*?)\))?\s*\{([\s\S]*)\}$/.exec(body);
    if (!match) throw new Error(i18n`each参数异常!`);
    var [_, args, content] = match;
    if (!content) return;
    if (args) args = args.split(",").map(a => a.trim());
    else args = [];
    if (args.length < 1) args.push("@value");
    if (args.length < 2) args.push("@key");
    if (args.length < 3) args.push("@index");
    if (typeof list === "string") list = getList(list);
    else if (list instanceof Array) {
        list = createArgMap(list.concat(list.rest).join(""), ';');
    }
    if (args.indexOf("@value") < 0) args.push("@value");
    if (args.indexOf("@key") < 0) args.push("@key");
    if (args.indexOf("@index") < 0) args.push("@index");
    var defaults = list.defaults;
    var argsMap = null;
    var match = /^(\s*)([\S\s]*?)(\s*)$/.exec(content);
    if (match) var [, b, c, f] = match;
    var replace = _ => {
        return b + 素馨(args.map(a => a + ":" + argsMap[a] + ';').join('') + c, base, true) + f;
    };
    if (defaults) list = list.map(function (a, i) {
        argsMap = {
            "@value": defaults[a],
            "@key": a,
            "@index": i + 1,
            [args[0]]: defaults[a],
            [args[1]]: a,
            [args[2]]: i + 1,
        };
        return replace();
    });
    else list = list.map(function (a, i) {
        argsMap = {
            "@value": a,
            "@key": i + 1,
            "@index": i + 1,
            [args[0]]: a,
            [args[1]]: i,
            [args[2]]: i + 1,
        };
        return replace();
    });
    return list;
};


var presets = /^@(media|keyframes|layer|import|namespace|page|property|suppports|font-face|document|counter-style|charset|color-profile|container|font-feature-values|font-palette-values|scope|starting-style)(\s|\(|$)/i;
class 素心 extends Program {
    straps = ["and", ...presets.source.replace(/^[\s\S]*?\(([\s\S]*?)\)[\s\S]*$/, '$1').split('|').map(a => "@" + a)];
    stamps = `;:,>+~&!/`.split("");
    quotes = rarg.quotes;
    keepspace = true;
    control_reg = presets;
    scopes = [["{", "}"], ["(", ")"]]
}


素心.prototype.setType = function (o) {
    var p = o.prev;
    if (o.type !== SCOPED) {
        if (!p || p.type === STAMP && p.text === ";" || p.type === SCOPED && p.entry === '{') {
            if (o.type === EXPRESS) o.type = PROPERTY;
            o.isprop = true;
            return;
        }
        if (p.isprop && o.type & ~(STAMP | SCOPED)) {
            if (o.type === EXPRESS) o.type = PROPERTY;
            o.isprop = true;
            return;
        }
    }
    if (!p) return;
    if (o.type === SCOPED && o.entry === "{") {
        if (p && p.type & (PROPERTY | EXPRESS) && /@$/.test(p.text)) {
            return false;
        }
        while (p && (p.type !== SCOPED || p.entry !== "{") && (p.type !== STAMP || p.text !== ';')) {
            p.isprop = true;
            if (p.type === EXPRESS) p.type = PROPERTY;
            p = p.prev;
        }
    }
};

var setVarsUsed = function (s) {
    var vars = null, used = null;
    for (var cx = s.length - 1; cx >= 0; cx--) {
        var { p: k, v } = s[cx];
        if (/^\-\-|^@[^\{]/.test(k) && !("used" in v) && v.length) {
            if (!vars) vars = Object.create(null);
            vars[k] = v.join(" ");
            s.splice(cx, 1);
        }
        else {
            if (!used) used = [];
            used.push({ p: k, v });
        }
    }
    if (used) used.reverse();
    s.used = used;
    s.vars = vars;
};
var createScoped = function (code) {
    var props = [];
    var propmap = Object.create(null);
    for (var cx = 0, dx = code.length; cx < dx; cx++) {
        var o = code[cx];
        if (o && (o.type & (SPACE | COMMENT) || o.type === STAMP && o.text === ';')) continue;
        if (!o.isprop) {
            console.log(createString([o]), o.type, createString(code))
            throw new Error(i18n`结构异常`);
        }
        var p = [], v = [];
        while (o && (o.type !== SCOPED || o.entry !== "{")) {
            if (o.type === STAMP && !o.isprop) break;
            p.push(o);
            a: if (o.type === SCOPED && o.entry === '(') {
                var n = o.next;
                if (n) {
                    if (n.type === STAMP && n.text === ';') break a;
                    if (n.type === SCOPED && n.entry === "{") break a;
                    if (p[0].type === PROPERTY && !/^@/.test(p[0].text)) {
                        o = n;
                        break;
                    }
                }
            }
            o = code[++cx];
        }
        if (o && o.type === STAMP && o.text === ':') {
            var n = code[++cx];
            var tmp = [];
            while (n && (n.type !== STAMP || n.text !== ";")) {
                if (n.type === SCOPED && n.entry === '{') {
                    break;
                }
                tmp.push(n);
                n = code[++cx];
            }
            if (n && n.type === SCOPED) {
                o.unary = true;
                p.push(o, ...tmp);
                v = createScoped(n);
            }
            else {
                v = tmp;
            }
            o = n;
        }
        else if (o && o.type === SCOPED && o.entry === "{") {
            v = createScoped(o);
        }
        var pj = createString(p).trim();
        if (!propmap[pj]) propmap[pj] = [];
        var vs = [];
        if (v.used === undefined) {
            if (v.length) vs.push(createString(v).trim());
        }
        else vs.used = v.used, vs.vars = v.vars;
        props.push({ p: pj, v: vs })
        propmap[pj].push(vs);
    }
    props.maps = propmap;
    setVarsUsed(props);
    return props;
};
素心.prototype.createScoped = createScoped;
素心.prototype.createString = createString;
var getFromScopeList = function (name, varsList, value = name) {
    name = name.replace(/^@\{\s*(\S*)\s*\}$/g, '@$1');
    var queue = [];
    for (var cx = varsList.length - 1; cx >= 0; cx--) {
        var o = varsList[cx];
        if (name in o) queue = [];
        while (name in o) {
            name = o[name];
            if (typeof name !== 'string') return name;
            if (!/^\-\-|^@[^\{]/.test(name)) return name;
            if (queue.indexOf(name) >= 0) throw `变量环形引用，无法初始化：${queue}`;
            queue.push(name);
        }
    }
    return value;
};
var removeSelectorSpace = a => a.trim().replace(/\s*([\+~\>])\s*/g, "$1");
var fixBase = function (b, a) {
    return splitParams(a).map(a => {
        if (presets.test(a)) a = `@{${a}}`;
        var replaced = false;
        return splitParams(b).map(b => {
            b = b.replace(/^(&|\:scope|\:root)\s*/g, "");
            if (!b) return a;
            var a1 = a.replace(/&|\:scope|\:root/g, function (match) {
                replaced = true;
                return b;
            });
            if (!replaced) {
                if (/^[\>~\+]/.test(a) || /[\>~\+]$/.test(b)) {
                    a1 = b + a;
                }
                else a1 = b + " " + a;
            }
            return a1;
        }).join(",");
    }).join(",");
}
var Method = function () {
    var valueMap = Object.create(null);
    if (!this.base) this.base = base;
    vlist.push(valueMap);
    var argDefaults = this.args.defaults;
    this.args.forEach((k, i) => {
        var a = arguments[i];
        if (a === undefined || a === null) a = seprateFunc(calcvars(argDefaults[k])).map(evalproc).join('');
        valueMap[k] = a;
    });
    var replace = text => text.replace(this.reg, function (name) {
        if (/^\@\{/.test(name)) {
            var key = "@" + name.slice(2, -1);
            if (key in valueMap) return strings.decode(valueMap[key]);
        }
        else if (name in valueMap) return valueMap[name];
        return name;
    });
    var vars = this.vars;
    if (vars) Object.keys(vars).forEach(k => {
        valueMap[k] = seprateFunc(replace(calcvars(vars[k]))).map(evalproc).join('');
    });
    var body = evalthis(this);
    var rest = body.rest.map(a => a.map(replace));
    var body = body.map(replace);
    body.rest = rest;
    vlist.pop();
    return body;
}
var vlist = [], mlist = [macros], clist = [], base = '';
var calcvars = function (v) {
    var decode = /^['"`]/.test(v) ? strings.decode : a => a;
    return v.replace(/@[^\s\{\}\(\)\[\]\:\+\*\/,;\!\>\$\=\&\%\#\@'"`\?\.\/\|~#]+|@\{[^\}@]*\}/g, function (m) {
        var value = getFromScopeList(m, vlist, m);
        value = decode(value);
        return value;
    }).replace(/(^|\s|[\]\)\(\[\-\+\*\/,;])(?:var\s*\(([\s\S]*?)\)|(--\S+))/g, function (m, q, a, b) {
        return q + getFromScopeList(b || a.trim(), vlist, m.slice(q.length));
    });
};
var initvars = function (vars) {
    for (var k in vars) {
        var v = vars[k];
        vars[k] = replace_punc(calcvars(v));
    }
};
var evalthis = function (p) {
    var temp = base;
    base = p.base;
    var res = eval2(p.used);
    base = temp;
    return res;
};
var evalproc = function (k, retnoparam) {
    var match = (retnoparam !== false ? /^([^\(\)\s,;:]*)(?:\s*\(([\s\S]*)\))$/ : /^([^\(\)\s,;:]+)(?:\s*\(([\s\S]*)\))?$/).exec(k);
    if (!match) return calcvars(k);
    var [, name, params] = match;
    var method = getFromScopeList(name, mlist);
    if (!isFunction(method)) {
        if (/^@/.test(name)) return calcvars(k);
        var block = getFromScopeList(name, clist, null);
        if (block) {
            var res = [];
            var rest = [];
            block.map(eval2).forEach(e => {
                res = res.concat(e);
                rest = rest.concat(e.rest);
            });
            return res.concat(rest).join('');
        }
        else return k;
    };
    params = splitParams(params);
    params = params.map(evalproc).map(replace_punc);
    return method.apply(null, params);
};
var eval2 = function (props) {
    var rest = [];
    var result = [];
    var methods = Object.create(null);
    mlist.push(methods);
    if (props.maps) clist.push(props.maps);

    for (var { p: k, v: p } of props) {
        if (p.used) {
            var match = /^([@\.#][^\s,]+)\s*\(([\s\S]*?)\)\s*$/.exec(k);
            if (!match) continue;
            if (presets.test(match[1])) continue;
            var [, name, args] = match;
            args = createArgMap(args);
            p.args = args;
            p.reg = new RegExp(args.join("|") + /|@\{[^\}@]+\}/.source, 'g');
            if (!methods[name]) methods[name] = [];
            var argDefaults = args.defaults;
            Object.keys(argDefaults).forEach(k => {
                argDefaults[k] = calcvars(argDefaults[k]);
            });
            methods[name] = Method.bind(p);
            p.isMethod = true;
        }
    }
    for (var { p: k, v: p } of props) {
        if (p.isMethod) continue;
        if (p.used) {
            k = calcvars(k);
            k = removeSelectorSpace(k);
            if (base && !p.rooted) p.base = fixBase(base, k);
            else p.base = presets.test(k) ? `@{${k}}` : k;
            var vars = shallowClone(p.vars);
            if (vars) vlist.push(vars);
            initvars(vars);
            var value = evalthis(p);
            if (vars) vlist.pop();
            if (value.rest.length) rest = rest.concat(value.rest);
            if (value.length) rest.push([p.base, '{', value.join(""), "}"]);
        }
        else if (p.length) {
            k = calcvars(k);
            p = calcvars(p.join(" "));
            p = replace_punc(seprateFunc(p).map(evalproc).join(''));
            result.push(k, ":", p, ';');
        }
        else {
            var res = evalproc(k, false);
            if (res instanceof Array) {
                if (res.rest && res.rest.length) rest = rest.concat(res.rest);
                if (res.length) result = result.concat(res);
            }
        }
    }
    mlist.pop();
    if (props.maps) clist.pop();
    result.rest = rest;
    return result;
};
function evalscoped(scoped, scopeName = '') {
    var _base = base;
    base = removeSelectorSpace(scopeName);
    var smaps = scoped.maps;
    var root = smaps[":root"], scope = smaps[":scope"];
    var and = smaps["&"];
    var vars = extend(Object.create(null), scoped.vars);
    if (root) root.forEach(r => extend(vars, r.vars));
    if (scope) scope.forEach(s => extend(vars, s.vars));
    if (and) and.forEach(a => extend(vars, a.vars));
    vlist.push(vars);
    clist.push(smaps);
    initvars(vars);
    var result = eval2(scoped, [vars]);
    vlist.pop();
    clist.pop();
    base = _base;
    return result;
}
var rcss = null;
function 素馨(text, scopeName, compress) {
    if (!rcss) rcss = new 素心;
    rcss.debug = true;
    var code = scanner2(text, rcss);
    var { scoped } = code;
    var result = evalscoped(scoped, scopeName);
    var queried = [];
    var getquried = function () {
        if (!queried.length) return "";
        var ats = queried.key.split(';');
        var b = /@keyframes\s/i.test(queried.key) ? queried.map(a => a.replace(new RegExp(/^\s*/.source + scopeName + /\s/.source), "")).join('') : queried.join('');
        while (ats.length) {
            b = ats.pop() + `{${b}}`;
        }
        queried = [];
        return b;
    }
    return result.concat(result.rest.map(a => a.join(""))).map(a => {
        var ats = [];
        a = a.replace(/\s*@\{(@[^\}]*)\}/g, function (_, q) {
            q = q.replace(/((?:\s|\))(?:and|or))\(/g, '$1 (');
            ats.push(q);
            return ''
        }).trim();
        if (!a) return '';
        var atk = ats.join(';');
        if (queried.key !== atk) {
            var b = getquried();
            if (!atk) return b + a;
            queried = [a];
            queried.key = atk;
            return b;
        }
        else if (atk) {
            queried.push(a);
            return '';
        }
        else if (queried.length) {
            return getquried() + a;
        }
        return a;
    }).filter(a => !!a).join(compress ? "" : "\r\n") + getquried();
}
素馨.素心 = 素心;