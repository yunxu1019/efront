var { COMMENT, SPACE, STRAP, EXPRESS, STAMP, skipAssignment, isHalfSentence, splice } = common;
// 将当前代码队列中的function及class声明提前
var prefunc = function (sbody) {
    var fx = 0;
    for (var cx = 0, dx = sbody.length; cx < dx; cx++) {
        var o = sbody[cx];
        var bx = cx;
        while (o && o.type & (SPACE | COMMENT)) o = sbody[++cx];
        if (!o) break;
        if (o.type === STRAP && /^(async|function|class)$/.test(o.text)) {
            if (!o.isExpress) {
                var ex = skipAssignment(sbody, cx);
                var fname = '';
                o = o.next;
                while (o.type & (STRAP | STAMP)) o = o.next;
                if (o.type === EXPRESS) fname = o.text;
                if (fname) {
                    var ni = sbody.indexOf(o, cx);
                    splice(sbody, ni, 1);
                    if (isHalfSentence(sbody, cx - 1)) {
                        splice(sbody, cx, 0, o, { type: STAMP, text: "=" });
                        ex++;
                        dx++;
                    }
                    else {
                        var sb = splice(sbody, bx, ex - bx);
                        splice(sbody, fx, 0, { type: SPACE, text: "\r\n" }, o, { type: STAMP, text: "=" }, ...sb);
                        fx += ex - bx + 2;
                        ex += 2;
                        dx += 2;
                    }
                }
                cx = ex;
                continue;
            }
        }
    }
};
