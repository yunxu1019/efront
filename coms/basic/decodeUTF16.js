function decodeUTF16(buff) {
    var dist = [];
    for (var cx = 0, dx = buff; cx < dx; cx += 2) {
        var m = (buff[cx] << 8) + buff[cx + 1];
        var t;
        if (m > 0b1101111111111111 || m < 0b1101100000000000) {
            t = m;
        }
        else {
            var n = (buff[cx + 2] << 8) + buff[cx + 3];
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