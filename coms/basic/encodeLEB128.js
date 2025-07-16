function encodeLEB128(buff) {
    var dist = [];
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        var b = buff[cx];
        while (b > 0xffffffff) {
            var t = b % 0x80;
            dist.push(t | 0b10000000);
            b = (b - t) / 0x80;
        }
        while (b > 127) {
            var t = b & 0x7f;
            dist.push(t | 0b10000000);
            b = b >>> 7;
        }
        dist.push(b);
    }
    return dist;
}
module.exports = encodeLEB128;