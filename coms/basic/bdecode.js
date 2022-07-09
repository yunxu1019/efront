var reg = /([a-z]?)(\d*)/g;
function decode(str, i) {
    reg.lastIndex = i;
    var a = reg.exec(str);
    if (!a) return [, str.length];
    var [m, t, l] = a;
    var e = a.index + m.length;
    switch (t) {
        case "":
            e++;
            return [str.slice(e, e += +l), e];
        case "i":
            e = str.indexOf("e", a.index + +m.length);
            if (e < 0) e = str.length;
            return [+str.slice(a.index + 1, e), e + 1];
        case "d":
            var res = {};
            i++;
            while (i < str.length && str.charAt(i) !== 'e') {
                var [k, i] = decode(str, i);
                var [v, i] = decode(str, i);
                res[k] = v;
            }
            return [res, i + 1];
        case "l":
            var res = [];
            i++;
            while (i < str.length && str.charAt(i) !== 'e') {
                var [o, i] = decode(str, i);
                res.push(o);
            }
            return [res, i + 1];
    }
    return [, str.length]
}
var _indexOf = Array.prototype.indexOf;
function decodeArrayBuffer(a, i) {
    var e = i;
    switch (a[i]) {
        case 105://i
            e = _indexOf.call(a, 101/*e*/, i);
            if (e < 0) e = a.length;
            return [+String.fromCharCode.apply(String, a.slice(i + 1, e)), e + 1];
        case 100://d
            var res = {};
            i++;
            while (i < a.length && a[i] !== 101) {
                var [k, i] = decodeArrayBuffer(a, i);
                var [v, i] = decodeArrayBuffer(a, i);
                k = decodeUTF8(k);
                res[k] = v;
            }
            return [res, i + 1];
        case 108://l
            var res = [];
            i++;
            while (i < a.length && a[i] !== 101) {
                var [o, i] = decodeArrayBuffer(a, i);
                res.push(o);
            }
            return [res, i + 1];
        default:
            e = i;
            while (a[i] >= 48/*0*/ && a[i] <= 57/*9*/) i++;
            var l = +String.fromCharCode.apply(String, a.slice(e, i));
            return [a.slice(++i, i += l), i];
    }
}
function bdecode(str) {
    return str instanceof ArrayBuffer ? decodeArrayBuffer(new Uint8Array(str), 0)[0] : decode(str, 0)[0];
}