function int(n) {
    var dist = [];
    if (n > 0xffffffff) {
        throw new Error("数据过大");
    }
    while (n > 0) {
        dist.push(n & 0xff);
        n >>>= 8;
    }
    dist.reverse();
    return dist;
}

function packPiece(compress_method, e) {
    var el = int(e.length);
    return concatTypedArray([
        [
            compress_method,
            other_compress << 5 | el.length,
        ],
        el, e]);
}