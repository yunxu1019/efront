const {
    STAMP, EXPRESS, SCOPED,
    createExpressList,
    skipAssignment,
    createScoped,
    createString,
} = require("./common");
var powermap = require("./powermap");
var number_rep = /^([+-]?[\d\.]+)(?:e([+-]?\d+))?([ijkn]*)$/;
class Math extends Program {
    number_reg = /^(\d+(?:\.\d+){0,2}|(?:\.\d+){1,2}|(?:\d+\.){1,3})\.*(?:e[+-]?\d+)?[ijkn]*$/;
    powermap = Object.assign({}, powermap);
    value_reg = /^(false|true|null|Infinity|NaN|undefined|eval|this|arguments)$/;
    constructor() {
        super();
        var pmap = this.powermap;
        pmap["+-"] = pmap["-+"] = powermap["+"];
        pmap["×"] = pmap[".*"] = powermap["*"];
        pmap["≈"] = pmap["~="] = pmap["=="];
        pmap["≉"] = pmap["!≈"] = pmap["!~="] = pmap["~!="] = pmap["=="];
        pmap["≠"] = powermap["!="];
        pmap["≢"] = powermap["!=="];
        pmap["^"] = powermap["**"];
        pmap["_"] = powermap["?."];
        pmap["'"] = powermap["?."];
        pmap["$"] = pmap["@"] = powermap["!"];
        this.stamps.push('\\', '_', "@", "$");
    }
}
Math.prototype.createScoped = createScoped;
Math.prototype.createString = createString;
var math = new Math;
var pmap = math.powermap;
var puncmap = {
    "*": "×", // 叉乘
    '.*': '·',
    "!=": "≉",
    "!==": "≢",
    "~=": "≈",
    "-+": "∓",
    "+-": "±",
    "!<": "≮",
    "!>": "≯",
    ">=": "≥",
    "<=": '≤',
    "/": "÷",
};
var isNull = a => a == null || a === '';
var make = function (pt, left, right) {
    if (left) left = uncup(left);
    if (right) right = uncup(right);
    if (isNull(left)) {
        return { [pt]: right instanceof Array && !right.iscup ? ["", right] : right };
    }
    if (isNull(right)) {
        return { [pt]: left instanceof Array && left.iscup ? left : [left] };
    }
    if (left[pt]) {
        left[pt].push(right);
        return left
    }
    return { [pt]: [left, right] };
};

var split = function (code, comma) {
    var rows = [];
    var broken = false, bx = 0;
    for (var cx = 0, dx = code.length; cx < dx; cx++) {
        var o = code[cx];
        if (o.type & COMMENT) continue;
        if (broken && o.type & SPACE) {
            bx = cx;
            continue;
        }
        if (o.type === STAMP && o.text === comma) {
            if (broken || !rows.length || bx < cx) {
                rows.push(code.slice(bx, cx));
            }
            broken = true;
            bx = cx + 1;
            continue;
        }
        broken = false;
    }
    if (!broken) rows.push(code.slice(bx, dx));
    return rows;
}
var getRows = function (code) {
    var rows = split(code, ';');
    if (rows.length === 1) a: {
        var last = code.last;
        if (last.type & STAMP && last.text === ';') break a;
        return getArgs(rows[0]);
    }
    var trs = [];
    var maxsize = 0;
    for (var r of rows) {
        var row = getArgs(r);
        maxsize = row.length;
        trs.push(row);
    }
    rows.maxsize = maxsize;
    trs.iscup = true;
    return trs;
}
var getArgs = function (a) {
    var res = [];
    return split(a, ',').map(a => {
        var cells = createExpressList(a);
        if (!cells[cells.length - 1]?.first) cells.pop();
        if (cells.length === 1) return toFlat(cells[0]);
        cells.map(toFlat).forEach(a => {
            res.push(a);
        });
    });
    return res;
}
var uncup = function (cup) {
    if (cup.iscup && cup.length <= 1) cup = cup[0];
    return cup;
};
var back = function (cache) {
    if (!cache.length) return;
    var i = cache.length - 3;
    var left = cache[i];
    while (i >= 0 && left && left.iscup && !left.length) {
        left = cache[i];
        i -= 3;
    };
    if (i === cache.length - 3) return;
    i += 3;
    var s = i;
    while (i <= cache.length - 3) {
        left = make(cache[i + 1], left);
        i += 3;
    }
    cache[s] = left;
    s += 3;
    cache.splice(s, cache.length - s);
}
var toFlat = function (exp) {
    if (exp.length === 1 && exp[0].type !== SCOPED && !exp[0].isdigit) return exp[0].text;
    var bx = 0;
    var p0 = 0;
    var left = [];
    left.iscup = true;
    var cache = [];
    for (var cx = 0, dx = exp.length; cx < dx; cx++) {
        var e = exp[cx];
        if (e.type & (SPACE | COMMENT)) continue;
        if (e.type & STAMP) {
            var p = pmap[e.text] || 0;
            if ((!p0 || p > p0 || !left.length) && !e.ion) {
                cache.push(left, e.text, p0);
                left = [];
                left.iscup = true;
                p0 = p;
                continue;
            }
            if (!left.length) {
                back(cache);
                [left, pt, p0] = cache.splice(cache.length - 3, 3);
            }
            if (e.ion) {
                left = [make(e.text, left)];
                left.iscup = true;
                continue;
            }
            while (p <= p0) {
                var right = left;
                p0 = cache.pop();
                var pt = cache.pop();
                left = cache.pop();
                left = make(pt, left, right);
            }
            cache.push(left, e.text, p0);
            p0 = p;
            left = [];
            left.iscup = true;
        }
        else if (e.type === SCOPED) {
            if (e.entry === '(') {
                var args = getArgs(e);
                if (left.length) {
                    var f = left.pop();
                    if (f instanceof Array) {
                        left.push({ "_": [uncup(f), ...args] });
                    }
                    else if (f instanceof Object) {
                        left.push(make("", f, args));
                    }
                    else {
                        left.push({ [f]: args });
                    }
                }
                else {
                    if (args.length === 1) args = args[0];
                    left.push(args);
                }
            }
            else if (e.entry === '[') {
                if (left.length) {
                    var last = e.last;
                    if (last?.ion) {
                        // 离子
                        var ions = [];
                        while (last && last.ion) {
                            ions.push(last.text);
                            last = last.prev;
                        }
                        e = e.slice();
                        ions = ions.reverse().join('');
                        if (last) {
                            e = e.slice(0, e.indexOf(last) + 1);
                            var args = getArgs(e);
                            if (typeof args[args.length - 1] !== 'object') {
                                args[args.length - 1] += ions;
                            }
                            else {
                                args.push(ions);
                            }
                            left = [make("**", left, ...args)];
                        }
                        else {
                            left = [make("**", left, ions)];
                        }
                    }
                    else {
                        var args = getArgs(e);
                        // 下标
                        left = [make("_", left, ...args)];
                    }
                    left.iscup = true;
                }
                else {
                    // 矩阵
                    left.push(make("[", null, getRows(e)));
                    console.log(left)
                }
            }
            else if (e.entry === "{") {
                left.push(make("{", null, getRows(e)));
            }
        }
        else {
            if (e.text === "Infinity") {
                left.push(Infinity);
                continue;
            }
            if (e.isdigit) a: {
                var et = e.text;
                var [, a, e10, s] = number_rep.exec(et);
                var b = a.split('.');
                if (b.length > 2) {
                    var nrep = b[2] || b[1];
                    var npre = b[0];
                    if (b[2]) {
                        npre += "." + b[1];
                    }
                    else if (b[1] ? b.length <= 2 || b.length > 3 : b.length <= 1 || b.length > 2) {
                        if (nrep) npre += "." + nrep;
                        nrep = '';
                    }
                    if (String(+npre) === npre) npre = +npre;
                    if (String(+nrep) === nrep) nrep = +nrep;
                    var v = [npre, nrep];
                    if (b.length > (b[2] ? 4 : b[1] ? 3 : 2)) v.push(b.slice(b[2] ? 3 : b[1] ? 2 : 1, b.length).join('.') + ".");
                    else if (e10 || s) v.push('');
                    if (e10) {
                        if (String(+e10) === e10) e10 = +e10;
                        v.push(e10);
                    }
                    else if (s) v.push('');
                    if (s) v.push(s);
                    v = { "..": v };
                    left.push(v);
                    continue;
                }
                else if (s || e10) {
                    if (String(+a) === a) a = +a;
                    var v = [a];
                    if (e10) {
                        if (String(+e10) === e10) e10 = +e10;
                        v.push(e10);
                    }
                    if (s) v.push(s);
                    v = { ".": v };
                    left.push(v);
                    continue;
                }
                var v = +a;
                if (/^\+/.test(et)) {
                    if (String(v) !== a.slice(1)) break a;
                    v = make("+", '', v);
                }
                if (String(v) !== a) break a;
                left.push(v);
                continue;
            }
            left.push(e.text);
        }
    }
    if (!left.length) {
        back(cache);
    }
    while (cache.length) {
        var right = left;
        var p0 = cache.pop();
        var pt = cache.pop();
        left = cache.pop();
        left = make(pt, left, right);
    }
    return uncup(left);
}
function seprate(code, addrow) {
    var rows = split(code, ';');
    var res = [];
    res.iscup = true;
    for (var r of rows) {
        var cells = split(r, ',');
        var cup = addrow ? res : [];
        for (var c of cells) {
            var exps = createExpressList(c);
            for (var e of exps) {
                var a = toFlat(e);
                if (!a) continue;
                if (a.iscup) {
                    if (addrow) for (var b of a) cup.push(b, ' ');
                    else for (var b of a) cup.push(a);
                }
                else if (addrow) cup.push(a, ' ');
                else cup.push(a);
            }
            if (addrow && cup.length) cup[res.length - 1] = ', ';
        }
        if (cup.length) {
            if (addrow) cup[res.length - 1] = '\r\n';
            else res.push(cup.length === 1 ? cup[0] : cup);
        }
    }
    if (addrow) res.pop();
    return uncup(res);
}
function main(text) {
    var code = scanner2(text, math);
    return seprate(code, true);
}
main.MathScript = Math;