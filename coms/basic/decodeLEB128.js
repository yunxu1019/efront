function decodeLEB128(buff) {
    var dist = [];
    var temp = 0, delta = 0;
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        var b = buff[cx];
        temp = temp + ((b & 0x7f) << delta)
        if (b >> 7) {
            delta += 7;
            continue;
        }
        dist.push(temp);
        temp = 0;
        delta = 0;
    }
    return dist;
}
module.exports = decodeLEB128;