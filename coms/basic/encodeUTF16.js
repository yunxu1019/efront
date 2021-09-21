function numberUTF16(t, dist = []) {
   if (t > 0x10ffff) {
        throw new Error("编码错误");
    }
    if (t <= 0xffff) {
        dist.push(t >> 8, t & 0xff);
    }
    else {
        t -= 0x10000;
        dist.push(0b11011000 | t >> 18, t >> 10 & 0xff, t >> 8 & 0b00000011 | 0b11011100, t & 0xff);
    }
    return dist;
}
function encodeUTF16(strings) {
    var dist = [];
    for (var cx = 0, dx = strings.length; cx < dx; cx++) {
        var s = strings.codePointAt(cx);
        if (s > 0xffff) cx++;
        numberUTF16(s, dist);
    }
    return dist;
}
module.exports = encodeUTF16;