var { skipAssignment, createString, QUOTED, STAMP, SCOPED, VALUE, SPACE, COMMENT, relink } = require("./common");

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
                        if (o.last.type === VALUE && o.last.isdigit) {
                            if ((o.first === o.last)) {
                                o.type = VALUE;
                                o.text = o.last.text;
                                o.isdigit = true;
                            }
                            else if (o.first.next === o.last && o.first.type === STAMP && /^[+-~]+$/.test(o.first.text)) {
                                o.type = VALUE;
                                o.text = eval(o.first.text + o.last.text);
                                o.isdigit = true;
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
        o.text = eval(createString(body.slice(ox, ex)));
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