
function pack3(buff) {
    var result = [];
    for (var cx = 0, dx = buff.length, bx = 32 * 1024 * 1024; cx < dx; cx += bx) {
        var b = buff.slice(cx, cx + bx);
        var [b, c] = bcj21(b, cx);
        pushRange(result, b, bcj21_compress);
        pushRange(result, c, bcj21_compress);
    }
    result = concatTypedArray(result);
    return pack0(buff, result);
}
