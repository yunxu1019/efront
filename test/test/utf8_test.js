var getUTF8Rest = function (bit) {
    if (bit < 192 || bit > 255) return 0;
    return 7 - Math.log2(256 - bit) | 0;
};
var bufferToUTF8IntFunc = [
    // 0b0xxxxxxx - 0b10xxxxxx
    (buff, cx) => buff[cx],
    // 0b110xxxxx 10xxxxxx
    (buff, cx) => ((buff[cx] & 0b00011111) << 6) + (buff[1 + cx] & 0b00111111),
    // 0b1110xxxx 10xxxxxx 10xxxxxx
    (buff, cx) => ((buff[cx] & 0b00001111) << 12) + ((buff[1 + cx] & 0b00111111) << 6) + (buff[2 + cx] & 0b00111111),
    // 0b11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    (buff, cx) => ((buff[cx] & 0b00000111) << 18) + ((buff[1 + cx] & 0b00111111) << 12) + ((buff[2 + cx] & 0b00111111) << 6) + (buff[3 + cx] & 0b00111111),
    // 0b111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    (buff, cx) => (buff[cx] & 0b00000011) * Math.pow(2, 24) + ((buff[1 + cx] & 0b00111111) << 18) + ((buff[2 + cx] & 0b00111111) << 12) + ((buff[3 + cx] & 0b00111111) << 6) + (buff[4 + cx] & 0b00111111),
    // 0b1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    (buff, cx) => (buff[cx] & 0b00000001) * Math.pow(2, 30) + (buff[1 + cx] & 0b00111111) * Math.pow(2, 24) + ((buff[2 + cx] & 0b00111111) << 18) + ((buff[3 + cx] & 0b00111111) << 12) + ((buff[4 + cx] & 0b00111111) << 6) + (buff[5 + cx] & 0b00111111),
    // 0b11111110 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    (buff, cx) => (buff[1 + cx] & 0b00111111) * Math.pow(2, 30) + (buff[2 + cx] & 0b00111111) * Math.pow(2, 24) + ((buff[3 + cx] & 0b00111111) << 18) + ((buff[4 + cx] & 0b00111111) << 12) + ((buff[5 + cx] & 0b00111111) << 6) + (buff[6 + cx] & 0b00111111),
    // 0b11111111 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    (buff, cx) => (buff[1 + cx] & 0b00111111) * Math.pow(2, 36) + (buff[2 + cx] & 0b00111111) * Math.pow(2, 30) + (buff[3 + cx] & 0b00111111) * Math.pow(2, 24) + ((buff[4 + cx] & 0b00111111) << 18) + ((buff[5 + cx] & 0b00111111) << 12) + ((buff[6 + cx] & 0b00111111) << 6) + (buff[7 + cx] & 0b00111111)
];
var bufferToUTF8String = function (buff) {
    var dist = [];
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        var rest = getUTF8Rest(buff[cx]);
        var s = bufferToUTF8IntFunc[rest](buff, cx);
        dist.push(String.fromCharCode(s));
        cx += rest;
    }
    return dist.join('');
};
var bufferToUTF8String2 = function (buff) {
    var dist = [];
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        var s = bufferToUTF8Int(buff, cx);
        dist.push(String.fromCharCode(s));
        cx += getUTF8Rest(buff[cx]);
    }
    return dist.join('');
};
var bufferToUTF8Int = function (buff, cx = 0) {
    var t = buff[cx], s;
    if (t < 192 || t > 255) {//0b0xxxxxxx - 0b10xxxxxx
        s = t;
    }
    else if (t < 224) {// 0b110xxxxx 10xxxxxx
        s = ((t & 0b00011111) << 6) + (buff[++cx] & 0b00111111)
    }
    else if (t < 240) {// 0b1110xxxx 10xxxxxx 10xxxxxx
        s = ((t & 0b00001111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
    }
    else if (t < 248) {// 0b11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
        s = ((t & 0b00000111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
    }
    else if (t < 252) {// 0b111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
        s = (t & 0b00000011) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
    }
    else if (t < 254) {// 0b1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
        s = (t & 0b00000001) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
    }
    else if (t < 255) {// 0b11111110 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
        s = (buff[++cx] & 0b00111111) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111);
    }
    else {// //////////// 0b11111111 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
        s = (buff[++cx] & 0b00111111) * Math.pow(2, 36) + (buff[++cx] & 0b00111111) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111);
    }
    return s;
};
var bufferToUTF8String3 = function (buff) {
    var dist = [];
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        var t = buff[cx], s;
        if (t < 192 || t > 255) {//0b0xxxxxxx - 0b10xxxxxx
            s = t;
        }
        else if (t < 224) {// 0b110xxxxx 10xxxxxx
            s = ((t & 0b00011111) << 6) + (buff[++cx] & 0b00111111)
        }
        else if (t < 240) {// 0b1110xxxx 10xxxxxx 10xxxxxx
            s = ((t & 0b00001111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        else if (t < 248) {// 0b11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            s = ((t & 0b00000111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        else if (t < 252) {// 0b111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            s = (t & 0b00000011) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        else if (t < 254) {// 0b1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            s = (t & 0b00000001) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        else if (t < 255) {// 0b11111110 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            s = (buff[++cx] & 0b00111111) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        else {// //////////// 0b11111111 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            s = (buff[++cx] & 0b00111111) * Math.pow(2, 36) + (buff[++cx] & 0b00111111) * Math.pow(2, 30) + (buff[++cx] & 0b00111111) * Math.pow(2, 24) + ((buff[++cx] & 0b00111111) << 18) + ((buff[++cx] & 0b00111111) << 12) + ((buff[++cx] & 0b00111111) << 6) + (buff[++cx] & 0b00111111)
        }
        dist.push(String.fromCharCode(s));
    }
    return dist.join('');
};

var data = require("fs").readFileSync(require("path").join(__dirname, "../../data/gbk-unicode-utf8-cn.txt"));

var test = function (f) {
    var start = new Date;
    for (var cx = 0, dx = 100; cx < dx; cx++)    f(data);
    console.log(new Date - start);
};
test(bufferToUTF8String);
test(bufferToUTF8String2);
test(bufferToUTF8String3);
test(String);