function decodeUTF16(buff, be) {
    var dist = [];
    var LE = (a, b) => b << 8 | a;
    var BE = (a, b) => a << 8 | b;
    if (buff[0] === 0xfe && buff[1] === 0xff) {
        be = true;
    }
    else if (buff[0] === 0xff && buff[1] === 0xfe) be = false;
    else if (isEmpty(be)) be = false;
    var dec = be ? BE : LE;
    for (var cx = 0, dx = buff.length; cx < dx; cx += 2) {
        var m = dec(buff[cx], buff[cx + 1]);
        var t;
        if (m > 0b1101111111111111 || m < 0b1101100000000000) {
            t = m;
        }
        else {
            var n = dec(buff[cx + 2], buff[cx + 3]);
            if (n < 0b1101100000000000 || n > 0b1101111111111111) {
                continue;
            }
            cx += 2;
            if (m < n) {
                t = 10000 + ((m & 0b1111111111) << 10) + (n & 0b1111111111)
            }
            else {
                t = 10000 + ((n & 0b1111111111) << 10) + (m & 0b1111111111)
            }
        }
        dist.push(String.fromCodePoint(t));
    }
    return dist.join('');
}
module.exports = decodeUTF16;