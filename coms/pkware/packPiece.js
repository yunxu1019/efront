function int(n) {
    var dist = [];
    while (n > 0) {
        dist.push(n & 0xff);
        n = n / 256 | 0;
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