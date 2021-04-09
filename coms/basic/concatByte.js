function concatTypedArray(buffs) {
    var total = 0;
    buffs.forEach(a => total += a.byteLength || a.length);
    var res = new Uint8Array(total);
    var offset = 0, inc = 0;
    while (offset < total) {
        var b = buffs[inc++];
        if (b.buffer) b = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
        for (var cx = 0, dx = b.length; cx < dx; cx++) {
            res[offset + cx] = b[cx];
        }
        offset += dx;
    }
    return res;
}

module.exports = concatTypedArray;
