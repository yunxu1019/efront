var { skipAssignment, createString, QUOTED, STAMP, SCOPED, VALUE, SPACE, COMMENT, EXPRESS, relink } = require("./common");
var nreg = /^([\+\-]*(?:(?:0x[0-9a-f]+|0b[01]+|0o[0-7]+)(?:_[0-9a-f]+)*|(?:(?:(?:\d+_)*\d+|\d*)\.\d+(?:_\d+)*|(?:\d+_)*\d+\.?))(?:e[\+\-]?\d+(?:_\d+)*)?)([^\d]*)$/i;
var punc_2 = {
    "!"(n, s, arg2) {
        if (!n && /^!/.test(s)) return arg2.slice(1);
        if (arg2 = '""' || arg2 === "''" || arg2 === "``") return 'true';
        return n ? String(!+n) : "!" + arg2;
    },
    "~"(n, s, arg2) {
        if (/^~/.test(arg2)) return arg2.slice(1);
        if (/^['"`]/.test(arg2)) return strings.decode(arg2);
        if (n.length > 15) {
            return "~" + arg2;
        }
        return ~n + s;
    },
    "-"(n, s) {
        return -n + s;
    },
    "+"(n, s) {
        return +n + s;
    },
    "/"(n, s) {
        if (!n) return;
        return 1 / n + s;
    }
};
var punc_3 = {
    "+"(n1, n2, s) {
        return +n1 + +n2 + s;
    },
    "-"(n1, n2, s) {
        return n1 - n2 + s;
    },
    "*"(n1, n2, s) {
        return n1 * n2 + s;
    },
    "/"(n1, n2, s) {
        return n1 / n2 + s;
    },
    "%"(n1, n2, s) {
        return n1 % n2 + s;
    },
    "**"(n1, n2, s) {
        return n1 ** n2 + s;
    },
    ">>>"(n1, n2, s) {
        return (n1 >>> n2) + s;
    },
    ">>"(n1, n2, s) {
        return (n1 >> n2) + s;
    },
    "<<"(n1, n2, s) {
        if (s && n1.length + +n2 > 15) {
            return BigInt(n1) << BigInt(n2) + s;
        }
        return (n1 << n2) + s;
    },
    ">"(n1, n2, s) {
        return String(+n1 > +n2);
    },
    "<"(n1, n2, s) {
        return String(+n1 < +n2);
    },
    ">="(n1, n2, s) {
        return String(+n1 >= +n2);
    },
    "<="(n1, n2, s) {
        return String(+n1 <= +n2);
    },
    "=="(n1, n2, s) {
        return String(+n1 == +n2);
    },
    "==="(n1, n2, s) {
        return String(+n1 === +n2);
    },
    "^"(n1, n2, s) {
        return (n1 ^ n2) + s;
    },
    "|"(n1, n2, s) {
        return (n1 | n2) + s;
    },
    "&"(n1, n2, s) {
        return (n1 & n2) + s;
    },
    "||"(n1, n2, s) {
        return (+n1 || +n2) + s;
    },
    "&&"(n1, n2, s) {
        return (+n1 && + n2) + s;
    },
};
var punc_s;
function calc_(arg1, punc, arg2) {
    if (!arg2) return;
    if (!arg1) {
        var match = nreg.exec(arg2);
        if (!match) return;
        var [, n, s] = match;
        var f = punc_s && punc in punc_s ? punc_s[punc] : punc_2[punc];
        if (!f) return;
        return f(n, s, arg2);
    }
    var match1 = nreg.exec(arg1);
    var match2 = nreg.exec(arg2);
    if (!match1 || !match2) return;
    var [, n1, s] = match1;
    var [, n2, s2] = match2;
    var f = punc_s && punc in punc_s ? punc_s[punc] : punc_3[punc];
    if (!f) return;
    if (/^[\*·×]$/.test(punc)) {
        if (s && s2) a: {
            if (s === s2) {
                switch (s.toLowerCase()) {
                    case "i":
                    case "j":
                    case "k":
                        // 虚数的平方 -1
                        n1 = -n1;
                        s = s2 = '';
                        break a;
                }
            }
            switch ((s + s2).toLowerCase()) {
                case "ji":
                    n1 = -n1;
                case "ij":
                    s = 'k'; s2 = '';
                    break a;
                case "ik":
                    n1 = -n1;
                case "ki":
                    s = 'j'; s2 = '';
                    break a;
                case "kj":
                    n1 = -n1;
                case "jk":
                    s = 'i'; s2 = '';
                    break a;
            }
            if (s === s2) return f(n1, n2, s);
            return;
        }
        return f(n1, n2, s || s2);
    }
    if (/^[\/÷\\]$/.test(punc)) {
        // 除法不考虑虚数
        if (s === s2) {
            if (/^[lmnuf]+$/i.test(s)) {
                return f(n1, n2, s);
            }
            return f(n1, n2, "");
        }
        if (s2) return;
        if (s && s2) return f(n1, n2, '');
        return f(n1, n2, s);
    }
    if (s !== s2) return;
    return f(n1, n2, s);
}

var isNone = a => a == null || a !== a;

var make = function (body, bx, cx, pt) {
    var p = pt && powermap[pt.text];
    if (p <= powermap[">>>"] && p > powermap['=']) return cx;
    var bd = body.slice(bx, cx);
    var bd = bd.filter(a => a.type & ~(COMMENT | SPACE));
    if (bd.length < 2) return cx;
    if (bd.length === 2) {
        var [p, o] = bd;
        if (p.type === STAMP) {
            if (!p.unary) return cx;
            var v = calc(null, p.text, o.text);
            if (isNone(v)) return cx;
            setvalue(o, v);
        }
        else if (o.type === STAMP) {
            var v = calc(p.text, o.text, null);
            if (isNone(v)) return cx;
            setvalue(o, v);
        }
        else return cx;
        body.splice(bx, 1);
        return cx - 1;
    }
    var o = body[bx];
    var c = bd.pop();
    c = c.text;
    var b = bd.pop();
    while (bd.length >= 3) {
        if (b.unary) {
            c = calc('', b.text, c);
            b = bd.pop();
            continue;
        }
        var a = bd.pop();
        a = a.text;
        c = calc(a, b.text, c);
        b = bd.pop();
    }
    while (b?.unary) {
        c = calc('', b.text, c);
        if (isNone(c)) return cx;
        b = bd.pop();
    }
    if (!bd.length) {
        setvalue(o, c);
        bx = bx + 1;
        body.splice(bx, cx - bx);
        return bx;
    }
    var a = bd.pop();
    a = a.text;
    b = b.text;

    if (pt) {
        switch (pt.text) {
            case "-":
                a = calc("", "-", a);
                if (isNone(a)) return cx;
            case "+":
                var value = calc(a, b, c);
                if (isNone(value)) return cx;
                if (/^-/.test(value)) {
                    pt.text = '-';
                    value = value.slice(1);
                }
                else {
                    pt.text = '+';
                }
                setvalue(o, value);
                break;
            case "/":
                a = calc('', '/', a);
                if (isNone(a)) return cx;
            case "*":
                var value = calc(a, b, c);
                if (isNone(value)) return cx;
                setvalue(o, value);
                pt.text = "*";
                break;
            default:
                var value = calc(a, b, c);
                if (isNone(value)) return cx;
                setvalue(o, value);
                break;
        }
    }
    else {
        var v = calc(a, b, c);
        if (isNone(v)) return cx;
        setvalue(o, v);
    }
    bx = bx + 1;
    body.splice(bx, cx - bx);
    return bx;
}
var mathEnabled = false;
var numberEnabled = false;
var outValues = null;
var outParams = null;
const _ignore = Symbol('ignore');
var powermap = require("./powermap");
function solve(body, ox, dx) {
    var p = 0, bx = ox, pt = null;
    var cache = [bx, null, 0];
    var p0 = 0;
    for (var cx = ox; cx < dx; cx++) {
        var o = body[cx];
        if (o.type & (COMMENT | SPACE)) continue;
        if (o.type === STAMP) {
            p = powermap[o.text] || 0;
            pt = o;
            if (p <= powermap["&&"]) p = 0;
            if (cache.length && p <= cache[cache.length - 1]) {
                var p1 = p;
                var pt1 = pt;
                var p2 = p;
                while (p1 <= cache[cache.length - 1]) {
                    p2 = p1;
                    p1 = cache.pop();
                    pt1 = cache.pop();
                    bx = cache.pop();
                }
                if (cx - bx < 3) {
                    if (p === p1 && p > powermap[">>>"]) cache.push(bx, pt1, p1);
                    continue;
                }
                var cx1 = make(body, bx, cx, p === p2 ? pt1 : null);
                if (cx1 !== cx) {
                    dx -= cx - cx1;
                    cx = cx1;
                    cache.push(bx, pt1, p1);
                }
                continue;
            }
            if (p === 0) {
                cache.splice(0, cache.length);
            }
            continue;
        }
        else if (!o.isdigit || o.type !== VALUE) {
            cache.splice(0, cache.length);
            p0 = p;
            continue;
        }
        else {
            if (!cache.length) {
                if (p < p0) {
                    p0 = p;
                    continue;
                }
                if (p && p === p0 && p <= powermap[">>>"]) {
                    continue;
                }
                cache.push(cx, pt, p);
                bx = cx;
            }
        }
    }

    if (cache.length) {
        var bx = cache[0];
        var pt = cache[1];
        if (cx - bx >= 2 && cache[2] <= p) {
            cx = make(body, bx, cx, cache[1]);
        }
    }
    return cx;
}

var calc = null;
var number_reg = null;
var setvalue = function (o, func) {
    if (typeof func === 'function') return func;
    else if (typeof func === 'number') {
        o.type = VALUE;
        o.text = String(func);
        o.isdigit = true;
    }
    else if (typeof func === "bigint") {
        o.type = VALUE;
        o.text = String(func) + 'n';
        o.isdigit = true;
    }
    else if (typeof func === 'boolean') {
        o.type = VALUE;
        o.text = String(func);
    }
    else if (nreg.test(func)) {
        o.type = VALUE;
        o.isdigit = true;
        o.text = String(func);
    }
    else if (func instanceof Array) {
        o.value = func;
    }
    else {
        o.type = VALUE;
        o.text = String(func);
    }
}
var pushseek = function (args, start, end, step) {
    if (!start) start = 0;
    if (!step) step = [1];
    if (!end) {
        args.step = step;
        args.start = start;
    }
    else {
        var i = 0;
        for (var cx = +start; cx < +end;) {
            args.push(cx);
            cx += step[i];
            i++;
            if (i >= step.length) i = 0;
        }
    }
};
var getelems = function (o, rowlimit, collimit) {
    var args = [];
    var comma = false;
    var rows;
    var maxsize = 0;
    var seekat = null;
    var step = null;
    var seekend = null;
    for (var a of o) {
        if (a.type !== VALUE) {
            if (a.type === STAMP) {
                if (a.text === ',') {
                    if (seekat !== null) {
                        pushseek(args, seekat, seekend || (rows ? collimit : rowlimit), step);
                        comma = false;
                    }
                    if (!args.length || comma) {
                        args.push(undefined);
                    }
                    seekat = null;
                    step = null;
                    seekend = null;
                    comma = true;
                    continue;
                }
                if (a.text === ';') {
                    if (comma) args.push(undefined);
                    if (!rows) rows = [];
                    if (args.length) rows.push(args);
                    if (args.length > maxsize) maxsize = args.length;
                    args = [];
                    seekat = null;
                    step = null;
                    seekend = null;
                    comma = false;
                    continue;
                }
                if (a.text === ':') {
                    if (comma) args.push(undefined);
                    comma = false;
                    if (seekat === null) {
                        seekat = args.pop();
                    }
                    else if (seekend === null) {
                        seekend = args.pop();
                    }
                    else {
                        if (!step) step = [];
                        step.push(+seekend);
                        seekend = args.pop();
                    }
                    continue;
                }
            }
            if (a.type === SCOPED) {
                if (a.entry === '[' && a.value) {
                    args.push(a);
                }
                else return;
            }
            // 数据异常不处理
            return;
        }
        comma = false;
        if (args.step) {
            pushseek(r, r.start, +a.text, r.step);
            delete args.step;
            delete r.start;
        }
        args.push(a.text);
    }
    if (rows) {
        if (args.length) rows.push(args);
        if (args.length > maxsize) maxsize = args.length;
        for (var r of rows) {
            if (r.step) {
                var total = 0;
                for (var s of r.step) total += +s;
                pushseek(r, r.start, r.start + (maxsize - r.length) * total, r.step);
                if (r.length > maxsize) r.pop();
                delete r.step;
            }
            r.length = maxsize;
        }
        rows.maxsize = maxsize;
        return rows;
    }
    return args;
}
var calculate = function (body) {
    var cache = [];
    for (var cx = 0; cx < body.length; cx) {
        var o = body[cx];
        while (o && (o.type & (SPACE | COMMENT) || o.type === STAMP && /^[,;:]$/.test(o.text))) o = body[++cx];
        if (!o) break;
        var ox = cx;
        var ex = skipAssignment(body, cx++);
        cx = ex;
        var ignore = false;
        var hasScoped = false;
        var prefunc = null;
        for (var cy = ox; cy < ex; cy++) {
            var o = body[cy];
            if (o.type & (SPACE | COMMENT)) continue;
            if (o.type === STAMP && o.text === '=>') {
                ignore = true;
                continue;
            }
            if (o.type & (SCOPED | QUOTED) && o.length) {
                calculate(o);
                if (o.type === SCOPED && o.entry === '(') {
                    var p = o.prev;
                    if (!p || p.type === STAMP || p.type === VALUE && p.isdigit) {
                        var last = o.last, first = o.first;
                        if (last.type === VALUE && last.isdigit) {
                            var text = null;
                            if ((first === last)) {
                                text = last.text;
                            }
                            else if (first.next === last && first.type === STAMP && /^[+-~]+$/.test(first.text)) {
                                setvalue(last, first.text + last.text);
                                text = last.text;
                                o.splice(0, o.length);
                                o.push(last);
                                o.first = o.last = last;
                            }
                            var next = o.next;
                            if (text) {
                                if (/^\-/.test(text) && next && next.type === EXPRESS && /^[\.\[]/.test(next.text));
                                else {
                                    o.type = VALUE;
                                    o.text = text;
                                    o.isdigit = true;
                                }
                            }
                        }
                    }
                    else if (prefunc) {
                        if (prefunc === Math.random) {
                            ignore = true;
                            continue;
                        }
                        if (!o[_ignore]) {
                            var args = getelems(o);
                            p.text = String(prefunc.apply(null, args));
                            p.isdigit = true;
                            p.type = VALUE;
                            body.splice(cy, 1);
                            cy--;
                            ex--;
                            prefunc = null;
                            continue;
                        }
                    }
                }
                if (o[_ignore]) {
                    prefunc = null;
                    ignore = true;
                    continue;
                }
                if (o.type === SCOPED && o.entry === '[') {
                    var p = o.prev;
                    if (!p || p.type === STAMP || p.type === VALUE && p.isdigit) {
                        o.value = getelems(o);
                    }
                    else if (p.type === SCOPED && p.value instanceof Array) {
                        var args = getelems(o, p.value.length, p.value.maxsize);
                        var value = undefined;
                        while (args.length) {
                            var seek = args.pop();
                            if (seek instanceof Array) {
                                if (args.length > 1) {
                                    ignore = true;
                                    break;
                                }
                                if (!args.length) {
                                    value = p.value;
                                    value = seek.map(s => value[s]);
                                    break;
                                }
                                args = args[0];
                                if (args.length === 1 && seek.length === 1) {
                                    value = p.value[args[0]][seek[0]];
                                    break;
                                }
                                value = p.value;
                                value = seek.map(a => value[args[0]][a]);
                                break;
                            }
                            else {
                                value = p.value[seek];
                                break;
                            }
                        }
                        if (value !== undefined) {
                            setvalue(o, value);
                            var pi = body.lastIndexOf(p, cy);
                            body.splice(pi, 1);
                            cy--;
                            ex--;
                        }
                        else {
                            ignore = true;
                        }

                    }
                    else {
                        ignore = true;
                    }
                }
            }
            if (prefunc) ignore = true;
            prefunc = null;
            if (o.type & (EXPRESS)) {
                var func = undefined;
                if (o.fn !== undefined) {
                    func = o.fn;
                    prefunc = setvalue(o, func);
                    continue;
                }
                switch (o.tack) {
                    case "Math":
                        if (mathEnabled) {
                            func = Math[o.text.slice(5)];
                        }
                        break;
                    case "Number":
                        if (numberEnabled) {
                            func = Number[o.text.slice(7)];
                        }
                        break;
                }
                if (func === undefined) ignore = true;
                else prefunc = setvalue(o, func);
            }
            else if (o.type & ~(STAMP | SCOPED | VALUE | SPACE | COMMENT)) ignore = true;
            else if (o.type === VALUE) {
                if (!o.isdigit) ignore = true;
                else {
                    var match = nreg.exec(o.text);
                    if (match) {
                        var [, n, s] = match;
                        if (n.length < 16) {
                            n = eval(n);
                            o.text = n + s;
                        }
                    }
                }
            }
            if (!hasScoped) hasScoped = o.type === SCOPED;
        }
        if (ignore || prefunc) {
            if (!body[_ignore]) body[_ignore] = true;
            cx = solve(body, ox, ex);
            continue;
        }
        if (ex - ox === 1 && hasScoped) continue;
        cx = solve(body, ox, ex);
    }
    relink(body);
    return body;
};
function presetFunction(os, fn) {
    if (os) for (var o of os) {
        o.fn = fn;
    }
}
module.exports = function autoeval(body) {
    var { used, envs } = body;
    number_reg = body.program.number_reg;
    if (envs.Number) numberEnabled = true;
    if (envs.Math) mathEnabled = true;
    for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
        var arg = arguments[cx];
        if (typeof arg === 'object') {
            for (var k in arg) {
                presetFunction(used[k], arg[k]);
            }
            punc_s = arg;
        }
        else {
            if (typeof arg === 'function') {
                calc = arg;
                presetFunction(used.calc, arg);
            }
        }
    }
    if (!calc) calc = calc_;
    calculate(body);
    return body;
}