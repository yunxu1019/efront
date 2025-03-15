var a = 97;
var z = 122;
var A = 65;
var Z = 90;
var _0 = 48;
var _9 = 57;

var push = function (dist, c) {
    if (c > 0xffff) {
        c -= 0x10000;
        dist.push(String.fromCharCode(0b110110 << 10 | c >> 10 & 0x3ff, 0b110111 << 10 | c & 0x3ff));
    }
    else {
        dist.push(String.fromCharCode(c));
    }
};
function decode62S(string) {
    var dist = [];
    var s = 0, i = 1;
    for (var cx = 0, dx = string.length; cx < dx; cx++) {
        var c = string.charCodeAt(cx);
        if (c >= a) {
            if (i > 1) {
                s += (c - a) * i;
                if (s <= z) s -= 26;
                push(dist, s);
                s = 0;
                i = 1;
            }
            else {
                push(dist, c);
            }
            continue;
        }
        if (c >= A) {
            s += (c - A) * i;
            i *= 36;
            continue;
        }
        s += (c - _0 + 26) * i;
        i *= 36;
    }
    return dist.join('');
}