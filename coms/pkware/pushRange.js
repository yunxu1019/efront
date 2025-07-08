var pushRange = function (result, b, compress_method) {
    var b = scan(b, compress_method);
    var e = encodeRange(b);
    var el = int(e.length);
    result.push(concatTypedArray([
        [
            compress_method,
            other_compress << 5 | el.length,
        ],
        el, e]));
}
