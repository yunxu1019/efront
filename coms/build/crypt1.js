module.exports = function crypt1(source, crypt_code) {
    var temp = source.split('').reverse();
    for (var cx = 0, dx = temp.length; cx < dx; cx++) {
        var t = temp[cx].charCodeAt(0);
        if (t > 39 && t < 127) {
            t = ((crypt_code - t) % 87) + 40;
        } else if (t >= 0x1000) {
            t = (crypt_code & 0xff) ^ t;
        }
        temp[cx] = t;
    }
    var strs = [];
    while (temp.length > 0) {
        strs.push(String.fromCharCode.apply(null, temp.splice(0, 1024)));
    }
    temp = strs.join('');
    return temp;
}