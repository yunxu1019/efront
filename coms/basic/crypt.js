var signkey = "efront2021";
var JSAM = require("./JSAM");
var calc = function (str, password) {
    str = signkey + String(str) + password;
    str += str.length;
    var sum = 0x1ffffff;
    for (var cx = 0, dx = str.length; cx < dx; cx++) {
        var code = str.charCodeAt(cx);
        sum += Math.sin(code) + Math.cos(code);
    }
    return sum.toString(36);
};
var encrypt = function (data, mask) {
    var result = [];
    for (var cx = 0, dx = data.length; cx < dx; cx++) {
        var c = data.codePointAt(cx);
        var d = mask.charCodeAt(cx % mask.length);
        if (c > 0xffff) cx++;
        d = (d + cx) & 0x10ffff;
        result.push(String.fromCodePoint(c ^ d));
    }
    return result.join("");
};
var stringify = function (data, password) {
    if (!password || password.length < 2) {
        throw new Error(i18n`请传入更高强度的密码！`);
    }
    data = JSAM.stringify(data);
    var code = calc("password", password) + password;
    data = encrypt(data, code);
    var sign = calc(data, password);
    return data + '/' + sign;
};
var parse = function (data, password) {
    var d = data.lastIndexOf('/');
    if (d < 0) throw new Error(i18n`数据异常！`);
    var sign = data.slice(d);
    data = data.slice(0, d);
    var sign0 = calc(data, password);
    if (sign !== sign0) throw new Error(i18n`密码不正确！`);
    var code = calc("password", password) + password;
    data = encrypt(data, code);
    return data;
};

var signonly = function (data, mask) {
    data = JSAM.stringify(data);
    return calc(data, mask);
};
module.exports = {
    stringify,
    parse,
    sum: signonly,
    sign: function (data, mask) {
        delete data.sign;
        data.sign = signonly(data, mask);
    },
    checksign: function (data, mask) {
        var sign = data.sign;
        delete data.sign;
        return sign === signonly(data, mask);
    }
};