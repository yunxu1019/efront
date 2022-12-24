"use strict";
var strings = require("../basic/strings");
var Program = require("./Program");
var backEach = require("../basic/backEach");

const {
    /*-1 */COMMENT,
    /* 0 */SPACE,
    /* 1 */STRAP,
    /* 2 */STAMP,
    /* 3 */VALUE,
    /* 4 */QUOTED,
    /* 5 */PIECE,
    /* 6 */EXPRESS,
    /* 7 */SCOPED,
    /* 8 */LABEL,
    /* 9 */PROPERTY,
    number_reg,
    createString,
    getDeclared,
    createScoped,
    relink,
    skipAssignment,
} = require("./common");
var straps = `if,in,do,as,of
var,for,new,try,let,get,set
else,case,void,with,enum,from,eval
async,while,break,catch,throw,const,yield,class,await,super
return,typeof,delete,switch,export,import,static
default,finally,extends
function,continue,debugger
instanceof`.trim().split(/[,\s]+/);
class Javascript extends Program {
    straps = straps;
    value_reg = /^(false|true|null|Infinity|NaN|undefined|arguments|this|eval|super)$/
    transive_reg = /^(new|var|let|const|yield|void|in|of|typeof|delete|case|return|await|export|default|instanceof|throw|extends|import|from)$/
    strapexp_reg = /^(new|void|typeof|delete|class|function|await)/;
    forceend_reg = /^(return|yield|break|continue|debugger)$/;
    classstrap_reg = /^(class|function|async)$/;
}
var propresolve_reg = /^(static|get|set|async)$/;

Javascript.prototype.isProperty = function (o) {
    var queue = o.queue;
    var prev = o.prev;
    if (queue.isObject) {
        if (!prev || prev.type === STAMP && prev.text === ",") return true;
        if (prev.type === STAMP && prev.isprop) return true;
    }
    if (queue.isClass) {
        if (!prev) return true;
        if (prev.type === STAMP) {
            if (prev.isprop) return true;
            return /^(\+\+|\-\-|;)$/.test(prev.text);
        }
        if (prev.type === EXPRESS && !/\.$/.test(prev.text)) return true;
        if (~[SCOPED, VALUE, QUOTED, PROPERTY].indexOf(prev.type)) return true;
    }
    if (!prev) return false;
    if (prev.type === PROPERTY && propresolve_reg.test(prev.text)) {
        return true;
    }
    if (queue.prev && queue.prev.type === STRAP && queue.prev.text === 'export') {
        if (prev.type === STRAP && prev.text === "as") return true;
    }
    return false;
};
Javascript.prototype.fixType = function (o) {
    var type = o.type;
    var queue = o.queue;
    var m = o.text;
    var last = o.prev;
    if (m === 'yield') {
        var temp = queue;
        var type = STRAP;
        if (queue.entry === '[' || queue.isClass || queue.isObject || last && (last.type === STAMP && (
            queue[queue.length - 1].type !== SPACE && /^(\+\+|\-\-)$/.test(last.text)
            || !/^(>>>?=|<<=|[^><!=]=|[,;])/.test(last.text)
        ) || last.type === STRAP)) {
            type = EXPRESS;
        }
        if (type === STRAP) while (temp) {
            if (temp.entry != "{" || !temp.prev || temp.prev.type !== SCOPED || temp.prev.entry !== '(') {
                temp = temp.queue;
                continue;
            }
            var pp = temp.prev.prev;
            var isprop = pp.isprop;
            if (pp && pp.type === EXPRESS || pp.isprop) pp = pp.prev;
            if (!pp || pp.type === STRAP && pp.text !== 'function') {
                temp = temp.queue;
                continue;
            }
            if (pp.type === STAMP && pp.text === "*" && (pp.isprop || pp.prev && pp.prev.type === STRAP && pp.prev.text === "function")) {
                type = STRAP;
                break;
            }
            if (isprop || pp.type === STRAP && pp.text === "function") {
                type = EXPRESS;
                break;
            }
            temp = temp.queue;
        }
    }

    switch (type) {
        case QUOTED:
            if (this.isProperty(o)) type = PROPERTY;
            break;
        case EXPRESS:
            if ((!/^\./.test(m) || number_reg.test(m)) && this.isProperty(o)) type = PROPERTY;
            else if (number_reg.test(m)) type = VALUE;
            break;
        case STRAP:
        case VALUE:
            if (last && last.type === EXPRESS && /\.$/.test(last.text)) {
                type = EXPRESS;
            }
            else if (this.isProperty(o)) type = PROPERTY;
            else if (m === 'from') {
                if (!last || last.type === STRAP && !/^(im|ex)port$/.test(last.text)) {
                    type = EXPRESS;
                    break;
                }
                var temp = last;
                while (temp.type === STAMP && temp.text === "*" || temp.type === EXPRESS || temp.type === VALUE || temp.type === SCOPED) {
                    var prev = temp.prev;
                    if (!prev) break;
                    if (prev.type === STRAP && prev.text === "as") {
                        temp = prev.prev;
                        continue;
                    }
                    if (prev.type !== STAMP || prev.text !== ',' && (prev.text !== "*" || !prev.prev || !~[STRAP, STAMP].indexOf(prev.prev.type))) {
                        temp = prev;
                        break;
                    }
                    temp = prev.prev;
                    if (!temp) break;
                }
                if (!temp || temp.type !== STRAP || !/^(im|ex)port$/.test(temp.text)) {
                    type = EXPRESS;
                }
            }
            else if (m === 'as') {
                if (!last) {
                    type = EXPRESS;
                    break;
                }
                if (~[PROPERTY, EXPRESS, VALUE].indexOf(last.type)
                    || last.type === STAMP && last.text === "*" && last.prev && ~[STRAP, STAMP].indexOf(last.prev.type)) {
                } else {
                    type = EXPRESS;
                }
            }
            break;
    }
    if (type === STRAP && m === "class" && !queue.classed) {
        queue.classed = 1;
    }
    else if (queue.classed > 0) {
        if (type === STRAP && /^(class|function)$/.test(m)) queue.classed++;
    }
    o.type = type;

};
var isShortMethodEnd = function (o) {
    if (!o) return false;
    if (o.type !== SCOPED || o.entry !== "{") return false;
    o = o.prev;
    if (!o) return false;
    if (o.type !== SCOPED || o.entry !== "(") return false;
    o = o.prev;
    if (!o) return false;
    return o.type === PROPERTY;
};

Javascript.prototype.setType = function (o) {
    this.fixType(o);
    var last = o.prev;
    var queue = o.queue;
    if (queue.isObject || queue.isClass) {
        if (~[VALUE, QUOTED, STRAP].indexOf(o.type)) {
            o.isprop = this.isProperty(o);
        }
        else if (o.type === SCOPED && o.entry === '[') {
            if (queue.isObject) o.isprop = this.isProperty(o);
            if (queue.isClass) o.isprop = !last || last.isprop || last.type === STAMP && last.text === ';';
        }
        else if (o.type === STAMP) {
            o.isprop = o.text === "*" && (!last || /^[,;]$/.test(last.text) || queue.isClass && isShortMethodEnd(last));
        }
        else if (o.type === PROPERTY) {
            o.isprop = true;
        }
        if (o.isprop) {
            if (last && last.type === PROPERTY && propresolve_reg.test(last.text)) {
                last.type = STRAP;
            }
        }
    }
    if (o.type === PROPERTY || o.isprop);
    else if (o.type === STRAP && /^(get|set|static)/.test(o.text)) {
        o.type = EXPRESS;
    }
    if (last) {
        if (!o.isprop && last.type === STRAP) {
            if (last.text === 'async' && o.text !== "function")
                last.type = EXPRESS;
        }
        if (o.type === STAMP && o.text === "=>") {
            var pp = last.prev;
            if (pp && pp.type === EXPRESS && pp.text === 'async') {
                pp.type = STRAP;
            }
        }
    }
    if (o.type === STAMP) {
        if (!last || last.type === STAMP || last.type === STRAP) {
            o.unary = /^[^=;,*]$/.test(o.text);
        }
    }
};
var insertAfter = function (o) {
    var queue = this || o.queue;
    var index = queue.indexOf(o) + 1;
    var os = [].slice.call(arguments, 1);
    queue.splice.apply(queue, [index, 0].concat(os));
    var prev = o, next = o && o.next;
    for (var o of os) {
        if (prev) prev.next = o;
        o.prev = prev;
        Object.defineProperty(o, 'queue', { value: queue });
        prev = o;
    }
    if (next) {
        o.next = next;
        next.prev = o;
    }
};
var js = new Javascript;
var scan = function (data) {
    js.lastIndex = 0;
    return js.exec(data);
};
var detourTemplate = function (raw, params) {
    var spliter = { text: ",", type: STAMP };
    var template = scan(`extend([],{["raw"]:[]})`);
    var str0 = template[1].first;
    var str1 = template[1][2][2];
    for (var r of raw) {
        str0.push({ text: strings.encode(strings.decode("`" + r.text + "`")), type: QUOTED }, spliter);
        str1.push({ text: strings.encode(r.text), type: QUOTED }, spliter);
    }
    str0.pop();
    str1.pop();
    for (var p of params) template.push(spliter, p);
    return template;
};

Javascript.prototype.detour = function detour(o, ie) {
    var avoidMap = this.avoidMap;
    while (o) {
        switch (o.type) {
            case SCOPED:
                this.detour(o.first, ie);
                break;
            case EXPRESS:
                if (avoidMap) {
                    var m = /^[^\.\[\]]+/.exec(o.text.replace(/^\.\.\./, ''));
                    if (m) { avoidMap[m[0]] = true; }
                }
                if (!/^\.\.\.|\.\.\.$/.test(o.text)) {
                    o.text = o.text.replace(/\.([^\.\[]+)/g, (_, a) => ie === undefined || this.strap_reg.test(a) ? `[${strings.encode(strings.decode(a))}]` : _);
                }
                break;
            case QUOTED:
                if (o.length) {
                    if (!o.prev || o.prev.type === STAMP || o.prev.type === STRAP) {
                        o.type = SCOPED;
                        o.entry = '[';
                        o.leave = `]["join"]('')`;
                        for (var cx = o.length - 1; cx >= 0; cx--) {
                            var c = o[cx];
                            if (c.type === PIECE) {
                                c.type = QUOTED;
                                c.text = strings.encode(strings.decode("`" + c.text + "`"));
                            }
                            else {
                                insertAfter.call(o, c.prev, { type: STAMP, text: ',' });
                                c.entry = "(";
                                c.leave = ")";
                                insertAfter.call(o, c, { type: STAMP, text: ',' });
                                this.detour(c.first, ie);
                            }
                        }
                    }
                    else {
                        var raw = [];
                        var params = [];

                        for (var c of o) {
                            if (c.type === PIECE) {
                                raw.push(c);
                            } else {
                                c.entry = '(';
                                c.leave = ")";
                                this.detour(c, ie);
                                params.push(c.length === 1 ? c[0] : c);
                            }
                        }
                        o.type = SCOPED;
                        o.entry = "(";
                        o.leave = ")";
                        var temp = detourTemplate(raw, params);
                        o.splice(0, o.length);
                        o.push.apply(o, temp);
                    }
                    break;
                }
                else if (!o.prev || o.prev.type === STAMP || o.prev.type === STRAP) {
                    if (/^[`]/.test(o.text)) {
                        o.text = strings.encode(strings.decode(o.text));
                    }
                }
                else {
                    if (/^`/.test(o.text)) {
                        o.text = o.text.replace(/^`|`$/g, '');
                        var template = detourTemplate([o], []);
                        o.type = SCOPED;
                        o.entry = "(";
                        o.leave = ")";
                        delete o.text;
                        o.push.apply(o, template);
                    }
                }
                if (!o.isprop) break;
            case PROPERTY:
                if (/^(get|set|async|static)$/.test(o.text) && o.next && (o.next.type === PROPERTY || o.next.isprop)) break;
                if (o.text === 'static' && o.next && o.next.type === SCOPED && o.next.entry === '{') break;
                if (ie === undefined || this.strap_reg.test(o.text)) {
                    if (/^\[/.test(o.text)) break;
                    if (o.queue.isObject) {
                        var text = strings.encode(strings.decode(o.text));
                        text = ie !== undefined ? text : `[${text}]`;
                        if (o.short) {
                            insertAfter.call(o.queue, o.prev, { text: text, short: false, isprop: true, type: PROPERTY }, { text: ':', type: STAMP });
                            o.type = EXPRESS;
                            delete o.short;
                        } else {
                            o.text = text;
                        }
                    }
                    else if (o.queue.isClass) {
                        if (o.text === 'constructor') break;
                        var text = strings.encode(strings.decode(o.text));
                        if (o.prev) {
                            var prev = o.prev;
                            if (prev && prev.isprop && /^(get|set|static|async)$/.test(prev.text)) {
                                prev = prev.prev;
                            }
                            if (prev && prev.type === STAMP && prev.isprop) prev = prev.prev;
                            if (prev && (prev.type !== STAMP || prev.text !== ';')) insertAfter(prev, { text: ';', type: STAMP });
                        }
                        o.text = `[${text}]`;
                        if (o.next && o.next.type === SCOPED && o.next.entry === "(") { }
                        else if (!o.next || o.next.type !== STAMP || o.next.text !== "=") {
                            insertAfter(o, { text: "=", type: STAMP }, { text: "undefined", type: VALUE, isExpress: true });
                        }
                    }
                }
                break;
        }
        if (o) o = o.next;
    }
};

var removeImport = function (c, i, code) {
    var { used, envs } = code;
    var [dec, map, o] = getDeclared(c.next);
    if (dec.length !== 1 || !o) throw new Error("代码结构异常！");
    if (o.type !== STRAP || o.text !== 'from') throw new Error("缺少from语句");
    var n = o.next;
    if (!n || n.type !== QUOTED) throw new Error("缺少导入路径！");
    var oi = code.indexOf(o, i);
    var ns = skipAssignment(n);
    var nsi = code.indexOf(ns, i);
    var q = scan(`require()`);
    if (!used.require) used.require = [], envs.require = true;
    used.require.push(q[0]);
    var cs = code.splice(oi + 1, nsi - oi - 1, ...q);
    q[1].push.apply(q[1], cs);
    relink(q[1])
    var name = dec[0];
    var na = dec.attributes[0];
    o.type = STAMP;
    o.text = '=';
    c.text = 'var';
    if (typeof name === 'string' && name !== '*') {
        if (na[0] !== '*') {
            used[name].forEach(u => {
                u.text = u.text.replace(/^[^\.\[]+/g, '$&.default');
            });
        }
    }
    else {
        var name = strings.decode(q[1].last.text)
            .replace(/\.[^\.\/\\]+$/, '')
            .split(/[\/\\\:\{\}\[\]\.\+\-\*\/\!\~\|\:;,'"`\(\)\>\<\?\^%&\s]+/)
            .filter(a => !!a).pop();
        if (!this.express_reg.test(name)) name = "imported";
        var id = 0;
        while (this.strap_reg.test(name) || name in used) {
            name = name.replace(/\d+$/, '') + ++id;
        }
        used[name] = [];
        if (dec[0] !== "*") dec[0].forEach((dn, i) => {
            var da = dec[0].attributes[i];
            used[dn].forEach(u => {
                u.text = name + da;
                used[name].push(u);
            });
            delete used[dn];
        });

    }
    var u = { type: EXPRESS, text: name };
    code.splice(i + 1, oi - i - 1, u);
    used[name].push(u);
    return u;
};
var removeExport = function (c, i, code) {
    var { envs, used } = code;
    if (!used.exports) envs.exports = true, used.exports = [];
    var n = c.next;
    if (n.type === STAMP && n.text === '*') {
        var u = removeImport.call(this, c, i, code);
        if (!code.exportStars) code.exportStars = [];
        code.exportStars.push(u);
        return;
    }
    if (n.type === SCOPED) {
        var o = n.first;
        var allexports = [];
        while (o) {
            var name = o, prop = o.text;
            var n = o.next;
            if (n && n.type === STRAP && n.text === 'as') {
                var nn = n.next;
                if (!nn) throw new Error("缺少导出名！");
                prop = nn.text;
                o = nn;
                n = o.next;
            }
            o = n && n.next;
            var exp = scan(`\r\nexports.${prop}=`);
            exp.push(name);
            allexports.push(exp);
        }
        var ni = skipAssignment(code, i);
        code.splice(i, ni - i);
        for (var exp of allexports) {
            code.splice(i, 0, ...exp);
        }
        return;
    }
    if (n.type !== STRAP) throw new Error("代码结构异常！");
    if (n.text === 'default') {
        n.text = '=';
        n.type = STAMP;
        c.text = `exports.default`;
        code.exportDefault = true;
        c.type = EXPRESS;
        return;
    }
    var [dec, map, o] = getDeclared(n.next, 'export');
    if (/^(class|function)$/.test(n.text)) {
        c.text = `exports.${dec[0]}`;
        c.type = EXPRESS;
        code.splice(i + 1, 0, ...scan(`=${dec[0]}\r\n`));
        return;
    }
    var nn = n.next;
    if (!nn) throw new Error('缺少导出项！');
    var oi = code.indexOf(nn, i);
    if (!code.exportDecs) {
        code.exportDecs = [];
    }
    dec.forEach((d, i) => {
        for (var a of used[d]) {
            if (a.kind && a.kind !== 'export') continue;
            if (!a.export) code.exportDecs.push(a), a.export = true;
        }
    });
    code.splice(i, oi - i);
};

Javascript.prototype.fix = function (code) {
    backEach(code, function (o, i) {
        if (o.type !== STRAP) return;
        if (o.text === 'import') removeImport.call(this, o, i, code);
        else if (o.text === 'export') removeExport.call(this, o, i, code);
    }, this);
    if (code.exportStars) {
        var exportStars = code.exportStars;
        if (!code.exportDefault) code.push(...scan(`\r\nexports.default=undefined`));
        exportStars.forEach(u => {
            code.push(...scan(`\r\nextendIfNeeded(exports,${u.text})`));
        });
        delete code.exportStars;
        delete code.exportDefault;
    }
    if (code.exportDecs) {
        var exportDecs = code.exportDecs;
        delete code.exportDecs;
        exportDecs.forEach(e => {
            e.text = 'exports.' + e.text;
            if (e.kind) {
                var n = e.next;
                if (!n || n.type !== STAMP || n.text !== '=') {
                    var i = code.indexOf(e);
                    code.splice(i + 1, 0, ...scan(`= undefined`));
                }
            }
        });
    }
    relink(code);
}
Javascript.prototype.createString = createString;
Javascript.prototype.createScoped = createScoped;
module.exports = Javascript;