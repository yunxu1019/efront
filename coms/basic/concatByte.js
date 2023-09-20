function concatTypedArray(buffs) {
    var total = 0;
    buffs.forEach(a => total += a.byteLength || a.length);
    var res = new Uint8Array(total);
    var offset = 0, inc = 0;
    while (offset < total) {
        var b = buffs[inc++];
        if (b.buffer) b = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
        res.set(b, offset);
        offset += b.length;
    }
    return res;
}

module.exports = concatTypedArray;
