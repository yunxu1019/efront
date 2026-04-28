var { skipAssignment, createString, QUOTED, STAMP, SCOPED, VALUE, SPACE, COMMENT, EXPRESS, relink } = require("./common");

var eval2 = function (v, objs) {
    var args = outParams;
    var argValues = outValues;
    if (objs) {
        var keys = Object.keys(objs);
        args = keys.concat(args);
        argValues = keys.map(k => objs[k]).concat(argValues);
    }
    v = eval(`(function(${args}){return ${v}})`)
        .apply(null, argValues);
    if (typeof v === 'bigint') return String(v) + "n";
    return String(v);
};
var make = function (body, bx, cx, pt) {
    if (cx - bx < 3) return cx;
    var o = body[bx];
    var bd = body.slice(bx, cx);
    if (pt) {
        switch (pt.text) {
            case "-":
            case "+":
                bd.unshift(pt);
                var value = eval(createString(bd));
                if (value < 0) {
                    pt.text = '-';
                    value = -value;
                }
                else {
                    pt.text = '+';
                }
                if (typeof value === 'bigint') {
                    o.text = String(value) + "n";
                }
                else {
                    o.text = String(value);
                }
                break;
            case "/":
            case "*":
                var isbigint = /n$/.test(bd[0].text);
                var hasdiv = pt.text === '/';
                if (!hasdiv) for (var c of bd) {
                    if (c.type === STAMP && c.text === '/') {
                        hasdiv = true;
                        break;
                    }
                }
                if (isbigint && hasdiv) return cx;
                if (hasdiv) bd.unshift({ type: STAMP, text: '1', isdigit: true }, pt);
                // bigint 除法会舍去小数位，替换后不准确
                o.text = eval2(createString(bd));
                if (hasdiv) pt.text = '*';
                break;
            default:
                o.text = eval2(createString(bd));
                break;
        }
    }
    else {
        o.text = eval2(createString(bd));
    }
    o.type = VALUE;
    o.isdigit = true;
    body.splice(bx + 1, cx - bx - 1);
    return bx + 1;
}
var mathEnabled = false;
var numberEnabled = false;
var outValues = null;
var outParams = null;
const _ignore = Symbol('ignore');
var powermap = require("./powermap");
function solve(body, ox, dx) {
    var p = 0, bx = dx, pt = null;
    var cache = [bx, 0];
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
                while (p1 <= cache[cache.length - 1]) {
                    p1 = cache.pop();
                    pt1 = cache.pop();
                    bx = cache.pop();
                }
                if (cx - bx < 3) {
                    if (p === p1 && p > powermap[">>>"]) cache.push(bx, pt1, p1);
                    continue;
                }
                var o = body[bx];
                o.type = VALUE;
                o.isdigit = true;
                var cx1 = make(body, bx, cx, p1 === p ? pt1 : null);
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
                if (p === p0 && p <= powermap[">>>"]) {
                    continue;
                }
                cache.push(cx, pt, p);
                bx = cx;
            }
        }
    }
    if (cache.length) {
        bx = cache[0];
        if (cx - bx >= 3) {
            cx = make(body, bx, cx, cache[1]);
        }
    }
    return cx;
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
        var outerObjects = Object.create(null);
        var prefunc = null;
        for (var cy = ox; cy < ex; cy++) {
            var o = body[cy];
            if (o.type & (SPACE | COMMENT)) continue;
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
                                text = eval2(first.text + last.text);
                                last.text = text;
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
                            var args = [];
                            for (var a of o) {
                                if (a.type !== VALUE) continue;
                                args.push(eval(a.text));
                            }
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
            }
            if (prefunc) ignore = true;
            prefunc = null;
            if (o.type & (EXPRESS)) {
                var func = undefined;
                if (o.fn !== undefined) {
                    func = outerObjects[o.tack] = o.fn;
                    if (typeof func === 'function') prefunc = func;
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
                else if (typeof func === 'function') prefunc = func;
            }
            else if (!(o.type & (STAMP | SCOPED | VALUE | SPACE | COMMENT))) ignore = true;
            else if (o.type === VALUE && !o.isdigit) ignore = true;
            if (!hasScoped) hasScoped = o.type === SCOPED;
        }
        if (ignore || prefunc) {
            if (!body[_ignore]) body[_ignore] = true;
            cx = solve(body, ox, ex);
            continue;
        }
        if (ex - ox === 1 && hasScoped) continue;
        var o = body[ox];
        o.text = eval2(createString(body.slice(ox, ex)), outerObjects);
        o.type = VALUE;
        o.isdigit = true;
        cx = ox + 1;
        body.splice(cx, ex - cx);
    }
    relink(body);
    return body;
};

module.exports = function autoeval(body) {
    numberEnabled = body.envs.Number;
    mathEnabled = body.envs.Math;
    var outerObjects = Object.create(null);
    if (numberEnabled) outerObjects.Number = Number;
    if (mathEnabled) outerObjects.Math = Math;
    outParams = Object.keys(outerObjects);
    outValues = outParams.map(k => outerObjects[k]);
    calculate(body);
    return body;
}