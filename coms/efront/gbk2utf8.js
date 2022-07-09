"use strict";
var fs = require("fs");
var points = [
    0x3000, 0x3003,
    0x3005, 0x3017,
    0x301d, 0x301e,
    0x3021, 0x3029,
    0x3041, 0x3093,
    0x309b, 0x309e,
    0x30a1, 0x30f6,
    0x30fc, 0x30fe,
    0x3105, 0x3129,
    0x3220, 0x3229,
    0x3231, 0x3231,
    0x32a3, 0x32a3,
    0x32a3, 0x32a3,
    0x338e, 0x338f,
    0x339c, 0x339e,
    0x33a1, 0x33a1,
    0x33c4, 0x33c4,
    0x33ce, 0x33ce,
    0x33d1, 0x33d2,
    0x33d5, 0x33d5,
    0x4e00, 0x9fa5,
    0xe76c, 0xe76c,
    0xe78d, 0xe796,
    0xe7e7, 0xe7f3,
    0xe815, 0xe864,
    0xff01, 0xff5e
];
var gbk = fs.readFileSync(require("path").join(__dirname, "../../data/gbk.txt"));
var index = 0;
var map = [];
while (points.length) {
    for (var cx = points.shift(), dx = points.shift() + 1; cx < dx; cx++) {
        var code = gbk[index++] << 8 | gbk[index++];
        map[code] = String.fromCharCode(cx);
    }
}
// var map2 = [], saved = -1;
// for (var cx = 0, dx = map.length; cx < dx; cx++) {
//     if (map[cx]) {
//         var start = cx;
//         while (map[++cx]);
//         var end = cx - 1;
//         map2.push(start - saved - 1, end - start);
//         saved = end;
//     }
// }
// console.log(map2.join());
// fs.writeFileSync("bb.txt",map.join(""));

module.exports = function gbk2utf8(buff) {
    var temp = 0;
    var res = [];
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        var buf = buff[cx];
        if (temp) {
            res.push(map[temp << 8 | buf]);
            temp = 0;
        } else if (buf > 0x7f) {
            temp = buf;
        } else {
            res.push(String.fromCharCode(buf));
        }
    }
    return res.join("");
}