
function pack2(buff, compress_method) {
    var result = [];
    for (var cx = 0, dx = buff.length, bx = 32 * 1024 * 1024; cx < dx; cx += bx) {
        var b = buff.slice(cx, cx + bx);
        pushRange(result, b, compress_method);
    }
    result = concatTypedArray(result);
    return pack0(buff, result);
}