var { STAMP, PROPERTY, SCOPED, VALUE, EXPRESS, QUOTED, SPACE, COMMENT, createString } = require("./common");
class Richarg extends Program {
    straps = ["and"];
    stamps = ',:;'.split("");
    quotes = this.quotes.slice(0, 2).concat();
    keepspace = true;
    scopes = [["(", ")"], ["{", "}"]];
}

var rarg = new Richarg;
rarg.quotes.push(["url(", ")"]);
var killcalc = a => createString(a).replace(/((?:[\+\-]+)?(?:\d+(?:\.\d*)?|\.\d+))\s*(px|%|pt|cm|mm|r?em)?\s*([\/\*]\s*|[\+\-]\s+)((?:[\+\-]+)?(?:\d+(?:\.\d*)?|\.\d+))(px|%|pt|cm|mm|r?em)?/ig, function (_, d1, p1 = '', c, d2, p2 = '') {
    d1 = eval(d1);
    d2 = eval(d2);
    if (!p2) {
        if (c === '*') {
            return d1 * d2 + p1;
        }
        if (c === '/') {
            return d1 / d2 + p1;
        }
    }
    else if (p1 === p2) {
        if (c === "+") {
            return (+d1 + +d2) + p1;
        }
        if (c === '-') {
            return (d1 - d2) + p1;
        }
    }
    return _;
});
var seprateFunc = function (express) {
    var express = scanner2(express, rarg);
    var sps = [];
    var sp = [];
    sp.autospace = false;
    for (var cx = 0, dx = express.length; cx < dx; cx++) {
        var o = express[cx];
        if (o.type === SCOPED && o.entry === '(') {
            if (!sp.length) continue;
            var p = sp[sp.length - 1];
            if (p.type & (EXPRESS | PROPERTY)) {
                sp.pop();
                if (sp.length) sps.push(killcalc(sp));
                sp.splice(0, sp.length, p, o);
                sps.push(createString(sp));
                sp.splice(0, sp.length);
            }
        }
        else if (o.type === QUOTED) {
            if (sp.length) sps.push(killcalc(sp));
            sp.splice(0, sp.length);
            sps.push(createString([o]));
        }
        else sp.push(o);
    }
    if (sp.length) sps.push(killcalc(sp));
    return sps;
}
var splitParams = function (params) {
    if (!params) return [];
    params = scanner2(params, rarg);
    var o = params.first;
    var params = [];
    while (o) {
        var p = [];
        while (o) {
            if (o.type === STAMP && o.text === ',') {
                o = o.next;
                break;
            }
            p.push(o);
            o = o.next;
        }
        p.autospace = false;
        params.push(createString(p));
    }
    return params;
}
var createArgMap = function (args, split = ',', equal = ':') {
    if (args) args = scanner2(args, rarg);
    else args = [];
    var map = Object.create(null);
    var o = args.first;
    var args = [];
    while (o) {
        if (!(o.type & (PROPERTY | EXPRESS))) {
            throw new Error("参数异常！");
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
macros.range = function () {
    if (arguments.length === 1) {
        return ArrayFill(arguments[0], 0).map((a, i) => i + 1);
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
        for (var temp = start; temp < end; temp += step) {
            result.push(temp.toFixed(fixed) + unit);
        }
        return result;
    }
    throw new Error("range参数错误:" + arguments);
};
macros.extract = function (list, index) {
    if (typeof list === 'string') list = list.split(',');
    else if (list instanceof Array) {
        list = createArgMap(list.concat(list.rest).join(''), ';');
    }
    return list[index];
};
macros.length = function (list) {
    if (typeof list === 'string') return list.split(',').length;
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
var wrapColor = function (f) {
    return function (c) {
        if (color.isColor(c)) return f(...arguments);
        return f;
    }
}
macros.saturate = wrapColor(color.strurate);
macros.desaturate = wrapColor(color.desaturate);
macros.lighten = wrapColor(color.lighten);
macros.darken = wrapColor(color.darken);
macros.fadein = wrapColor(color.fadein);
macros.fadeout = wrapColor(color.fadeout);
macros.fade = wrapColor(color.fade);
macros.spin = wrapColor(color.spin);
macros.mix = wrapColor(color.mix);
macros.tint = wrapColor(color.tint);
macros.shade = wrapColor(color.shade);
macros.grayscale = wrapColor(color.grayscale);
macros.grayluma = wrapColor(color.grayluma);
macros.fade = wrapColor(color.fade);
macros.each = function (list, body) {
    var match = /^(?:\s*[#\.]?\(([\s\S]*?)\))?\s*\{([\s\S]*)\}$/.exec(body);
    if (!match) throw new Error("each参数异常!");
    var [_, args, content] = match;
    if (!content) return;
    content = richcss(content);
    if (args) args = args.split(",").map(a => a.trim());
    else args = [];
    if (args.length < 1) args.push("@value");
    if (args.length < 2) args.push("@key");
    if (args.length < 3) args.push("@index");
    if (typeof list === "string") list = splitParams(list);
    else if (list instanceof Array) {
        list = createArgMap(list.concat(list.rest).join(""), ';');
    }
    if (args.indexOf("@value") < 0) args.push("@value");
    if (args.indexOf("@key") < 0) args.push("@key");
    if (args.indexOf("@index") < 0) args.push("@index");
    var reg = new RegExp(args.join("|") + /|@\{[^@\{]+\}/.source, 'g');
    var defaults = list.defaults;
    var argsMap = null;
    var replace = a => {
        if (/^@\{/.test(a)) {
            var k = "@" + a.slice(2, -1).trim();
            if (k in argsMap) return strings.decode(argsMap[k]);
            return a;
        }
        if (a in argsMap) return argsMap[a];
        return a;
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
        return content.replace(reg, replace);
    });
    else list = list.map(function (a, i) {
        argsMap = {
            "@value": a,
            "@key": i + 1,
            "@index": i + 1,
        };
        return content.replace(reg, replace);
    });
    return list;
};


class Richcss extends Program {
    straps = ["and"];
    stamps = `;:`.split("");
    quotes = rarg.quotes;
    keepspace = true;
    scopes = [["{", "}"], ["(", ")"]]
}

var presets = /^@(media|keyframes|layer|import|namespace|page|property|suppports|font-face|document|counter-style|charset|color-profile|container|font-feature-values|font-palette-values)(\s|\(|$)/i;

Richcss.prototype.setType = function (o) {
    var p = o.prev;
    if (o.type !== SCOPED) {
        if (!p || p.type === STAMP && p.text === ";" || p.type === SCOPED && p.entry === '{') {
            o.type = PROPERTY;
            return;
        }
    }
    if (!p) return;
    var q = o.queue;
    if (o.type & (PROPERTY | EXPRESS) && p && p === q[q.length - 1] && p.type & (PROPERTY | EXPRESS)) {
        return false;
    }
    if (o.type === SCOPED && o.entry === "{") {
        if (p && p.type & (PROPERTY | EXPRESS) && /@$/.test(p.text)) {
            return false;
        }
        var pps = [];
        while (p && !(p.type === STAMP && p.text === ';' || p.type === SCOPED)) {
            pps.push(p);
            p = p.prev;
        }
        if (pps.length > 1) {
            var i = q.lastIndexOf(p = pps.pop());
            q.splice(i + 1, q.length);
            p.type = PROPERTY;
            p.end = pps[0].end;
            q.last = p;
            return;
        }
    }
    if (!q.entry && o.type !== SCOPED) {
        var p = q.last;
        if (p && p.type === STAMP && p.text === ':') {
            if (p.keep) return;
        }
        else if (o.type === STAMP && o.text === ':') {
            if (p.type & (EXPRESS | PROPERTY)) {
                o.keep = true;
                return;
            }
        }
        if (o.type === STAMP && o.text !== ";") return false;
    }
};

Richcss.prototype.createScoped = function (code) {
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
    var run = function (code) {
        var props = [];
        var propmap = Object.create(null);
        for (var cx = 0, dx = code.length; cx < dx; cx++) {
            var o = code[cx];
            if (o && (o.type & (SPACE | COMMENT) || o.type === STAMP && o.text === ';')) continue;
            if (o.type !== PROPERTY) throw new Error("结构异常");
            var p = [], v = [];
            while (o && (o.type !== SCOPED || o.entry !== "{")) {
                if (o.type === STAMP) break;
                p.push(o);
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
                    v = run(n);
                }
                else {
                    v = tmp;
                }
                o = n;
            }
            else if (o) {
                v = run(o);
            }
            p.autospace = false;
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
    return run(code);
};
Richcss.prototype.createString = createString;
var getFromScopeList = function (name, varsList, value = name) {
    name = name.replace(/^@\{\s*(\S*)\s*\}$/g, '@$1');
    var queue = [];
    for (var cx = varsList.length - 1; cx >= 0; cx--) {
        var o = varsList[cx];
        if (name in o) queue = [];
        while (name in o) {
            name = o[name];
            if (typeof name !== "string" || !/^\-\-|^@[^\{]/.test(name)) return name;
            if (queue.indexOf(name) >= 0) throw `变量环形引用，无法初始化：${queue}`;
            queue.push(name);
        }
    }
    return value;
}
var fixBase = function (b, a) {
    return a.split(/,\s*/).map(a => {
        if (presets.test(a)) a = `@{${a}}`;
        var replaced = false;
        return b.split(/\s*,\s*/).map(b => {
            var a1 = a.replace(/(:scope|&)/g, function (match) {
                replaced = true;
                return b;
            });
            if (!replaced) {
                if (/^[>~+]/.test(a)) {
                    a1 = b + a;
                }
                else a1 = b + " " + a;
            }
            return a1;
        }).join(",");
    }).join(",");
}
function evalscoped(scoped, scopeNames, base = '') {
    var smaps = scoped.maps;
    var root = smaps[":root"], scope = smaps[":scope"], and = smaps["&"];
    var vars = extend(Object.create(null), scoped.vars);
    if (root) root.forEach(r => extend(vars, r.vars));
    if (scope) scope.forEach(s => extend(vars, s.vars));
    if (and) and.forEach(s => extend(vars, s.vars));
    scopeNames.forEach(s => {
        var ss = smaps[s];
        if (ss) ss.forEach(s => {
            extend(vars, s.vars), s.rooted = true;
        })
    });
    var vlist = [vars];
    var mlist = [macros];
    var clist = [smaps];
    var initvars = function (vars) {
        for (var k in vars) {
            var v = vars[k];
            v = getFromScopeList(v, vlist);
            vars[k] = v;
        }
    };
    initvars(vars);

    var eval2 = function (props) {
        var rest = [];
        var result = [];
        var methods = Object.create(null);
        mlist.push(methods);
        if (props.maps) clist.push(props.maps);
        var evalthis = function (p) {
            var temp = base;
            base = p.base;
            var res = eval2(p.used);
            base = temp;
            return res;
        };
        var calcvars = function (v) {
            return v.replace(/(^|\s|[\]\)\(\[\-\+\*\/,;])(?:var\s*\(([\s\S]*?)\)|(--\S+|@[^\s\{\(\:\+\*\/,;\!\[\>\$\=\&\%\#\@\+'"`\?\.\/\|~]+|@\{[^\}@]*\}))/g, function (m, q, a, b) {
                return q + getFromScopeList(b || a.trim(), vlist, m.slice(q.length));
            });
        };
        var evalproc = function (k, retnoparam) {
            var match = (retnoparam !== false ? /^([^\(\)\s,;:]+)(?:\s*\(([\s\S]*)\))$/ : /^([^\(\)\s,;:]+)(?:\s*\(([\s\S]*)\))?$/).exec(k);
            if (!match) return calcvars(k);
            var [, name, params] = match;
            params = splitParams(params);
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
            params = params.map(evalproc);
            return method.apply(null, params);
        };

        for (var { p: k, v: p } of props) {
            if (p.used) {
                var match = /^([@\.#][^\s,]+)\s*\(([\s\S]*?)\)\s*$/.exec(k);
                if (!match) continue;
                if (presets.test(match[1])) continue;
                var [, name, args] = match;
                p.base = base;
                args = createArgMap(args);
                p.args = args;
                p.reg = new RegExp(args.join("|") + /|@\{[^\}@]+\}/.source, 'g');
                if (!methods[name]) methods[name] = [];
                var argDefaults = args.defaults;
                Object.keys(argDefaults).forEach(k => {
                    argDefaults[k] = calcvars(argDefaults[k]);
                });
                methods[name] = function () {
                    var valueMap = Object.create(null);
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
                        valueMap[k] = replace(calcvars(vars[k]));
                    });
                    var body = evalthis(this);
                    var rest = body.rest.map(a => a.map(replace));
                    var body = body.map(replace);
                    body.rest = rest;
                    vlist.pop();
                    return body;
                }.bind(p);
                p.isMethod = true;
            }
        }
        for (var { p: k, v: p } of props) {
            if (p.isMethod) continue;
            if (p.used) {
                k = calcvars(k);
                if (base && !p.rooted) p.base = fixBase(base, k);
                else p.base = presets.test(k) ? `@{${k}}` : k;
                if (p.vars) vlist.push(p.vars);
                var value = evalthis(p);
                if (p.vars) vlist.pop();
                if (value.rest.length) rest = rest.concat(value.rest);
                if (value.length) rest.push([p.base, '{', value.join(""), "}"]);
            }
            else if (p.length) {
                k = calcvars(k);
                p = calcvars(p.join(" "));
                p = seprateFunc(p).map(evalproc).join('');
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
    }
    var result = eval2(scoped, [vars]);
    return result;
}
var rcss = null;
function richcss(text, scopeName, compress) {
    if (!rcss) rcss = new Richcss;
    rcss.debug = true;
    var code = scanner2(text, rcss);
    var scopeNames = [];
    if (scopeName) code.forEach(c => {
        if (c.type === PROPERTY) {
            var replaced = false;
            c.text = c.text.replace(/\:(scope|root)|&/g, function () {
                replaced = true;
                return scopeName;
            });
            if (replaced) {
                scopeNames.push(c.text);
            }
        }
    })
    var { scoped } = code;
    var result = evalscoped(scoped, scopeNames, scopeName);
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
    return result.rest.map(a => a.join("")).concat(result).map(a => {
        var ats = [];
        a = a.replace(/@\{(@[^\}]*)\}\s*/g, function (_, q) {
            ats.push(q);
            return ''
        }).replace(/~\s*(['"`])((?:\\[\s\S]|[^'"`\\])*?)\1/g, '$2');
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