var d = 0b10000000, s = 0b00111111;
function numberUTF8(t, dist = []) {
    if (t < 128) {//0b0xxxxxxx - 0b10xxxxxx
        dist.push(0b00000000 | t)
    }
    else if (t < 2048) {// 0b110xxxxx 10xxxxxx
        dist.push(0b11000000 | t >> 6, t & 0b111111 | 0b10000000)
    }
    else if (t < 131072) {// 0b1110xxxx 10xxxxxx 10xxxxxx
        dist.push(0b11100000 | t >> 12, t >> 6 & 0b111111 | 0b10000000, t & 0b111111 | 0b10000000)
    }
    else if (t < 4194304) {// 0b11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
        dist.push(0b11110000 | t >> 18, t >> 12 & s | d, t >> 6 & s | d, t & s | d);
    }
    else if (t < 134217728) {// 0b111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
        dist.push(0b11111000 | t >> 24, t >> 18 & s | d, t >> 12 & s | d, t >> 6 & s | d, t & s | d);
    }
    else if (t <= 0x7fffffff) {// 0b1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
        dist.push(0b11111100 | t >> 30, t >> 24 & s | d, t >> 18 & s | d, t >> 16 & s | d, t >> 12 & s | d, t >> 6 & s | d, t & s | d)
    }
    else if (t < 68719476736) {// 0b11111110 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
        dist.push(0b11111110);
        var m = t / 34359738368 | 0
        dist.push(m | d);
        t -= m * 34359738368;
        dist.push(t >> 24 & s | d, t >> 18 & s | d, t >> 16 & s | d, t >> 12 & s | d, t >> 6 & s | d, t & s | d)
    }
    else if (t < 9007199254740992) {// 0b11111111 11xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx...
        dist.push(0b11111111);
        var bitcount = ((Math.log(t) / Math.log(2) + 5) / 6 | 0) - 6;
        var ratio = Math.pow(2, bitcount * 6 + 36);
        var m = t / ratio | 0
        dist.push(0b11111111 - (1 << 6 - bitcount) + 1 + m);
        while (ratio > 1) {
            t -= m * ratio;
            ratio /= 0b01000000;
            m = t / ratio | 0
            dist.push(m | d);
        }
    }
    else {
        throw new Error("数据异常");
    }
    return dist;
}
function encodeUTF8(string) {
    var dist = [], t;
    for (var cx = 0, dx = string.length; cx < dx; cx++) {
        t = string.codePointAt(cx);
        if (t > 0xffff) cx++;
        numberUTF8(t, dist);
    }
    return dist;
}
encodeUTF8.number = numberUTF8;
module.exports = encodeUTF8