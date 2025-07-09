var min = Math.min;
function repeat(buff, readstart = 0) {
    var s = buff[readstart], f = [s], c = 0;
    for (var cx = readstart + 1, dx = min(buff.length, s === 0x80 ? 2819 : 0x1fff); cx < dx; cx++) {
        if (buff[cx] !== s) break;
    }
    var length = cx - readstart;
    length = length & 0x1fff;
    if (length < 32) {
        f[1] = normal_repeat1 << 5 | length;
    } else {
        f[1] = normal_repeat2 << 5 | length >> 8;
        f[2] = length & 0xff;
    }
    f.byteoffset = cx;
    return f;
}