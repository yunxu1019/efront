var { skipAssignment, createString, QUOTED, STAMP, SCOPED, VALUE, SPACE, COMMENT, number_reg } = require("./common");
module.exports = function autoeval(body) {
    for (var cx = 0; cx < body.length; cx) {
        var o = body[cx];
        while (o && (o.type === SPACE || o.type === COMMENT || o.type === STAMP && /^[,;:]$/.test(o.text))) o = body[++cx];
        if (!o) break;
        var ox = cx;
        var ex = skipAssignment(body, cx++);
        cx = ex;
        var ignore = false;
        for (var cy = ox; cy < ex; cy++) {
            var o = body[cy];
            if (o.type === SCOPED || o.type === QUOTED && o.length) {
                autoeval(o);
            }
            if (o.type !== STAMP && o.type !== VALUE && o.type !== SPACE && o.type !== COMMENT) ignore = true;
            else if (o.type === VALUE && !number_reg.test(o.text)) ignore = true;
        }
        if (ignore || ex - ox < 3) continue;
        var o = body[ox];
        o.text = eval(createString(body.slice(ox, ex)));
        cx = ox + 1;
        body.splice(cx, ex - cx);
    }
    return body;
}