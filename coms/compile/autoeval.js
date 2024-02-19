var { skipAssignment, createString, QUOTED, STAMP, SCOPED, VALUE, SPACE, COMMENT, EXPRESS, relink } = require("./common");

var eval2 = function (v) {
    v = eval(v);
    if (typeof v === 'bigint') return String(v) + "n";
    return String(v);
};
var canbeunbrace = function () {

}
var calculate = function (body) {
    for (var cx = 0; cx < body.length; cx) {
        var o = body[cx];
        while (o && (o.type & (SPACE | COMMENT) || o.type === STAMP && /^[,;:]$/.test(o.text))) o = body[++cx];
        if (!o) break;
        var ox = cx;
        var ex = skipAssignment(body, cx++);
        cx = ex;
        var ignore = false;
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
            }
            if (!(o.type & (STAMP | VALUE | SPACE | COMMENT))) ignore = true;
            else if (o.type === VALUE && !o.isdigit) ignore = true;
        }
        if (ignore || ex - ox < 3) continue;
        var o = body[ox];
        o.text = eval2(createString(body.slice(ox, ex)));
        o.type = VALUE;
        o.isdigit = true;
        cx = ox + 1;
        body.splice(cx, ex - cx);
    }
    relink(body);
    return body;
};

module.exports = function autoeval(body) {
    calculate(body);
    return body;
}