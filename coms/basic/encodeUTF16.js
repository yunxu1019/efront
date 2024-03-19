function numberUTF16(t, dist = []) {
    if (t > 0x10ffff) {
        throw new Error(i18n`编码错误`);
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
function numberUTF16LE(t, dist = []) {
    if (t > 0x10ffff) {
        throw new Error(i18n`编码错误`);
    }
    if (t <= 0xffff) {
        dist.push(t & 0xff, t >> 8);
    }
    else {
        t -= 0x10000;
        dist.push(t >> 10 & 0xff, 0b11011000 | t >> 18, t & 0xff, t >> 8 & 0b00000011 | 0b11011100);
    }
    return dist;

}
function encodeUTF16(strings, be = false) {
    var dist = [];
    var utf16 = be ? numberUTF16 : numberUTF16LE;
    for (var cx = 0, dx = strings.length; cx < dx; cx++) {
        var s = strings.codePointAt(cx);
        if (s > 0xffff) cx++;
        utf16(s, dist);
    }
    return dist;
}
module.exports = encodeUTF16;