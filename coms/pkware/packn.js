
var max_size = 2 << 20;
function packn(buff, marktype, compress) {
    var result = [];
    for (var cx = 0, dx = buff.length; cx < dx;) {
        var b = buff.subarray(cx, cx += max_size);
        // b = packPiece(normal_nocode4, b);
        if (compress) b = compress(b);
        else marktype = normal_nocode4;
        b = packPiece(marktype, b);
        result.push(b);
    }
    return concatTypedArray(result);
}