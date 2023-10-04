var { STAMP, PROPERTY, SCOPED, VALUE, EXPRESS, QUOTED, createString } = require("./common");
class Richcss extends Program {
    straps = [];
    stamps = `;:`.split("");
    quotes = this.quotes.slice(0, 2);
    scopes = [["{", "}"]]
}
var presets = /^@(media|keyframes|layer|import|namespace|page|property|suppports", '@font-face', "@document|counter-style|charset|color-profile|container|font-feature-values|font-palette-values)(\s|\(|$)/i;

Richcss.prototype.setType = function (o) {
    var p = o.prev;
    if (o.type !== SCOPED) {
        if (!p || p.type === STAMP && p.text === ";" || p.type === SCOPED) {
            o.type = PROPERTY;
            return;
        }
    }
    if (!p) return;
    var q = o.queue;
    if (o.type === SCOPED && o.entry === "{") {
        if (p.type & (PROPERTY | EXPRESS) && /@$/.test(p.text)) {
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
        if (o.type !== STAMP || o.text !== ";") return false;
    }
};
Richcss.prototype.createScoped = function (code) {
    var run = function (o) {
        var props = [];
        var values = null;
        loop: while (o) {
            switch (o.type) {
                case PROPERTY:
                    var p = [];
                    while (o && !(o.type & (STAMP | SCOPED))) {
                        p.push(o.text);
                        o = o.next;
                    }
                    var pj = p.join(' ');
                    props.push({ p: pj, v: values = [] });
                    if (!props[pj]) props[pj] = [];
                    props[pj].push(values);
                    if (!o) break loop;
                    if (o.type === STAMP) break;
                    continue;
                case STAMP:
                    if (o.text === ';') break;
                case EXPRESS:
                case VALUE:
                case QUOTED:
                    values.push(o.text);
                    break;
                case SCOPED:
                    var s = run(o.first);
                    var vars = null, used = null;
                    for (var { p: k, v } of s) {
                        if (/^\-\-/.test(k)) {
                            if (!vars) vars = {};
                            vars[k] = v.join(" ");
                        }
                        else {
                            if (!used) used = [];
                            used.push({ p: k, v });
                        }
                    }
                    values.used = used;
                    values.vars = vars;

            }
            o = o.next;
        }
        return props;
    };
    return run(code.first);
};
Richcss.prototype.createString = createString;
var getFromScopeList = function (name, varsList, value) {
    for (var cx = varsList.length - 1; cx >= 0; cx--) {
        var o = varsList[cx];
        if (name in o) return o[name];
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
    var root = scoped[":root"], scope = scoped[":scope"];
    var vars = Object.create(null);
    if (root) root.forEach(r => extend(vars, r.vars));
    if (scope) scope.forEach(s => extend(vars, s.vars));
    scopeNames.forEach(s => {
        var ss = scoped[s];
        if (ss) ss.forEach(s => {
            extend(vars, s.vars), s.rooted = true;
        })
    });
    var vlist = [vars];
    var mlist = [];
    var initvars = function (vars) {
        var queue = [];
        for (var k in vars) {
            var v = vars[k];
            while (/^\-\-/.test(v)) {
                if (queue.indexOf(v) >= 0) throw `变量环形引用，无法初始化：${queue}`;
                queue.push(v);
                v = getFromScopeList(v, vlist);
            }
            vars[k] = v;
        }
    };
    initvars(vars);
    var eval2 = function (props) {
        var rest = [];
        var result = [];
        var methods = {};
        mlist.push(methods);
        var evalthis = function (p) {
            if (p.vars) vlist.push(p.vars);
            initvars(p.vars);
            var temp = base;
            base = p.base;
            var res = eval2(p.used);
            base = temp;
            if (p.vars) vlist.pop();
            return res;
        };
        var calcvars = function (v) {
            return v.replace(/(^|\s|[\]\)\(\[\-\+\*\/])(?:var\s*\(([\s\S]*?)\)|(--[^\s]+))/g, function (m, q, a, b) {
                return q + getFromScopeList(b || a.trim(), vlist, m.slice(q.length));
            });
        };
        for (var { p: k, v: p } of props) {
            if (p.used) {
                var match = /^(@[^\s,]+)\s*\(\s*(@[^\s,]+\s*(?:,\s*@[^\s,]+\s*)*)?\)/.exec(k);
                if (!match) continue;
                if (presets.test(match[1])) continue;
                p.base = base;
                var [, name, args] = match;
                args = args.split(",").map(a => a.trim());
                p.args = args;
                p.reg = new RegExp(args.join("|"), 'g');
                if (!methods[name]) methods[name] = [];
                methods[name].push(function () {
                    var body = evalthis(this);
                    var valueMap = {};
                    this.args.forEach((a, i) => {
                        valueMap[a] = arguments[i];
                    })
                    var replace = text => text.replace(this.reg, function (name) {
                        if (name in valueMap) return valueMap[name];
                        return name;
                    });
                    var rest = body.rest.map(a => a.map(replace));
                    var body = body.map(replace);
                    body.rest = rest;
                    return body;
                }.bind(p));
                p.isMethod = true;
            }
        }
        for (var { p: k, v: p } of props) {
            if (p.isMethod) continue;
            if (p.used) {
                if (base && !p.rooted) p.base = fixBase(base, k);
                else p.base = presets.test(k) ? `@{${k}}` : k;
                var value = evalthis(p);
                if (value.rest.length) rest = rest.concat(value.rest);
                if (value.length) rest.push([p.base, '{', value.join(""), "}"]);
            }
            else if (p.length) {
                result.push(k, ":", calcvars(p.join(" ")), ';');
            }
            else {
                k = calcvars(k);
                var match = /^(@\S+)\s*\(([\s\S]*)\)$/.exec(k);
                if (!match) continue;
                if (presets.test(match[1])) continue;
                var [, name, params] = match;
                params = params.split(",").map(a => a.trim());
                var method = getFromScopeList(name, mlist);
                if (!isArray(method)) throw `函数未定义：${name}`;
                method.forEach(m => {
                    var res = m.apply(null, params);
                    if (res.rest.length) rest = rest.concat(res.rest);
                    if (res.length) result = result.concat(res);
                });
            }
        }
        mlist.pop();
        result.rest = rest;
        return result;
    }
    var result = eval2(scoped, [vars]);
    return result;
}
var rcss = null;
function richcss(text, scopeName, compress) {
    if (!rcss) rcss = new Richcss;
    var code = scanner2(text, rcss);
    var scopeNames = [];
    if (scopeName) code.forEach(c => {
        if (c.type === PROPERTY) {
            var replaced = false;
            c.text = c.text.replace(/\:(scope|root)/g, function () {
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
    return result.rest.map(a => a.join("")).concat(result).map(a => {
        var ats = [];
        a = a.replace(/@\{([^\}]*)\}\s*/g, function (_, q) {
            ats.push(q);
            return ''
        })
        while (ats.length) {
            a = ats.pop() + `{${a}}`;
        }
        return a;
    }).join(compress ? "" : "\r\n");
}