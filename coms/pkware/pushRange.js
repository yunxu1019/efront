var pushRange = function (result, b, compress_method) {
    var b = scan(b, compress_method);
    var e = encodeRange(b);
    result.push(packPiece(compress_method, e));
}
