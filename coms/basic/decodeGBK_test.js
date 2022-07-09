var fs = require("fs");
var path = require("path");
var gbk2utf8 = require("../efront/gbk2utf8");
var gbk = fs.readFileSync(path.join(__dirname, '../../data/gbk.txt'));
console.log(
    '、',
    gbk2utf8([gbk[2], gbk[3]]),
    decodeGBK([gbk[2], gbk[3]]),
    '～',
    decodeGBK([gbk[gbk.length - 2], gbk[gbk.length - 1]]),
    gbk2utf8([gbk[gbk.length - 2], gbk[gbk.length - 1]]),
);
for (var cx = 0, dx = gbk.length; cx < dx; cx++) {
    var code = [gbk[cx++] << 8, gbk[cx]];
    if (decodeGBK(code) !== gbk2utf8(code)) console.log(code, decodeGBK(code), gbk2utf8(code));
}