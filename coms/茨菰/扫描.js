var { STAMP, PIECE, SPACE } = compile$common;
return function (a, type) {
    if (光标) var index = a.indexOf(光标);
    if (index >= 0) a = a.slice(0, index) + a.slice(index + 1);
    var c = compile$scanner2(a, type);
    if (index >= 0) {
        c.scoped;
        var patched = 追加光标(c, index, 光标);
        if (!patched) c.push({ type: SPACE, text: 光标 });
    }
    return c;
}