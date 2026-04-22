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
var canbeunbrace = function () {

}
var mathEnabled = false;
var numberEnabled = false;
var outValues = null;
var outParams = null;
const _ignore = Symbol('ignore');


var calculate = function (body) {
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
        for (var cy = ox; cy < ex; cy++) {
            var o = body[cy];
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
                }
                if (o[_ignore]) {
                    ignore = true;
                    continue;
                }
            }
            if (o.type & (EXPRESS)) {
                if (o.fn !== undefined) {
                    outerObjects[o.tack] = o.fn;
                    continue;
                }
                var func = undefined;
                switch (o.tack) {
                    case "Math":
                        if (mathEnabled) {
                            func = Math[o.text.slice(5)];
                        }
                        break;
                    case "Number":
                        if (numberEnabled) {
                            func = Math[o.text.slice(7)];
                        }
                        break;
                }
                if (func === undefined) ignore = true;
            }
            else if (!(o.type & (STAMP | SCOPED | VALUE | SPACE | COMMENT))) ignore = true;
            else if (o.type === VALUE && !o.isdigit) ignore = true;
            if (!hasScoped) hasScoped = o.type === SCOPED;
        }
        if (ignore) {
            if (!body[_ignore]) body[_ignore] = true;
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