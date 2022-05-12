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
function bdecode(str) {
    return decode(str, 0)[0];
}