var { QUOTED, SCOPED } = compile$common;
var patchBlink = function (code, index, blink) {
    for (var cx = 0, dx = code.length; cx < dx; cx++) {
        var c = code[cx];
        var haschildren = c => c.type === SCOPED || c.type === QUOTED && c.length;
        if (c.start === index) {
            if (haschildren(c)) {
                c.entry = blink + c.entry;
            }
            else {
                c.blink = 0;
                c.text = blink + c.text;
            }
            return true;
        }
        else if (c.start < index && (c.end > index || c.end === undefined)) {
            if (haschildren(c)) {
                return patchBlink(c, index, blink);
            }
            else {
                c.blink = index - c.start;
                c.text = c.text.slice(0, c.blink) + blink + c.text.slice(c.blink);

                return true;
            }
        }
        else if (c.end === index) {
            if (haschildren(c)) {
                c.leave += blink;
            }
            else {
                c.blink = c.text.length;
                c.text += blink;
            }
            return true;
        }
        else if (c.start > index) {
            if (cx === 0) {
                if (code.entry) return code.entry += blink, true;
                return false;
            }
            else {
                var p = code[cx - 1];
                if (haschildren(p)) {
                    p.leave += blink;
                }
                else {
                    p.blink = p.text.length;
                    p.text = p.text + blink;
                }
                return true;
            }
        }
    }
    if (code.leave) {
        code.leave = blink + code.leave;
        return true;
    }
    if (c) return c.text += blink, true;
    return false;
};
return patchBlink;