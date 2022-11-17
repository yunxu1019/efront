var {
    SCOPED,
    STAMP,
    STRAP,
    SPACE,
    relink,
} = require("./common");
var { createExpressList } = require("./washcode")
function format(code, step) {
    if (!code.length) return;
    var rest = ["\r\n", "\r\n" + step, code];
    while (rest.length > 0) {
        var code = rest.pop();
        var space = rest.pop();
        var lowspace = rest.pop();
        if (code.length === 0) continue;
        var explist = createExpressList(code);
        var breakline = explist.length > 1 && (code.isObject || !code.entry || code.entry === "{");
        code.splice(0, code.length);
        if (breakline) code.push({ type: SPACE, text: space });
        if (breakline) var deepspace = space + step;
        else var deepspace = space, space = lowspace;
        for (var exp of explist) {
            for (var e of exp) {
                if (breakline && e.type === STRAP) {
                    if (/^(else|catch|finally)/.test(e.text)) {
                        code.push({ type: SPACE, text: space });
                    }
                    else if (/^case$/.test(e.text)) {
                        if (code[code.length - 1].type === SPACE) code.pop();
                        code.push({ type: SPACE, text: lowspace });
                    }
                }
                code.push(e);
                if (e.type === SCOPED) rest.push(space, deepspace, e);
            }
            if (breakline && (e.type === STAMP && /^[,;]$/.test(e.text) || !code.isClass && !code.isObject)) code.push({ type: SPACE, text: space });
        }
        if (breakline) {
            var hasspaceend = code[code.length - 1].type === SPACE;
            code.splice(code.length - hasspaceend, +hasspaceend, { type: SPACE, text: lowspace });
        }
        relink(code);
    }
}
module.exports = function (code, tabSize) {
    format(code, new Array(tabSize + 1).join(" "));
    code.keepspace = true;
    code.helpcode = true;
    return code;
};