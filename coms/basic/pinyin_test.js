var saved = 0, lack = false;

var ck = function (c) {
    var py = pinyin.pinyin(c);
    var code = c.codePointAt(0);
    if (py === c) {
        if (code - saved > 1 && lack) console.log(String.fromCodePoint(saved), saved, saved.toString(16), 'end');
        if (code - saved > 1 || !lack) {
            console.log(c, code, code.toString(16), 'start');
        }
        lack = true;
    }
    else {
        if (lack) {
            console.log(String.fromCodePoint(saved), saved, saved.toString(16), 'end');
        }
        lack = false;
    }
    saved = code;
}
var check = function (start, end = start) {
    if (typeof start === 'string') {
        for (var c of start) ck(c);
    }
    else for (var cx = start, dx = end; cx <= dx; cx++) {
        var c = String.fromCodePoint(cx);
        ck(c);
    }
}
check(0x3105, 0x3129);// 注音
check(0x3400, 0x4dbf);// cjk扩充A
check(0x4e00, 0x9fff);// cjk汉字
check(0x20000, 0x2A6Df);// cjk 扩充B
check(0x2A700, 0x2B73F);// cjk 扩充C
check(0x2B740, 0x2B81F);// cjk 扩充D
check(0x2B820, 0x2CEAF);// cjk 扩充E
check(0x2CEB0, 0x2EBEF);// cjk 扩充F
check(0x30000, 0x3134F);// cjk 扩充G
check(0x31350, 0x323AF);// cjk 扩充H
check(0x3ebf0, 0x3ee5F);// cjk 扩充I
