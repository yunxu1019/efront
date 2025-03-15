var a_z = 'abcdefghijklmnopqrstuvwxyz';
var A_0 = a_z.toUpperCase() + '0123456789';
a_z = a_z.split('');
A_0 = A_0.split('');
var a = 97;
var z = 122;
var push = function (dist, c) {
    if (c >= a) {
        if (c <= z) return dist.push(a_z[c - a]);
    }
    else {
        c += 26;
    }
    while (c >= 26) {
        var r = c % 36;
        dist.push(A_0[r]);
        c = (c - r) / 36;
    }
    dist.push(a_z[c]);
}
function encode62S(string) {
    var dist = [];
    for (var cx = 0, dx = string.length; cx < dx; cx++) {
        var code = string.charCodeAt(cx);
        if (code >> 10 === 0b110110) {
            var code1 = string.charCodeAt(++cx);
            if (code1 >> 10 === 0b110111) {
                push(dist, ((code & 0x3ff) << 10 | (code1 & 0x3ff)) + 0x10000);
            }
            else {
                push(dist, code);
                push(dist, code1);
            }
        }
        else {
            push(dist, code);
        }
    }
    return dist.join('');
}