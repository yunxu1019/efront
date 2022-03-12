"use strict";
module.exports = encode62;
var encodeUTF8 = require("../basic/encodeUTF8");
var decodeUTF8 = require("../basic/decodeUTF8");
var src = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var map = {};
src.split("").forEach((s, i) => map[s] = i);

function encode62(string) {
    string = String(string)
    string = string.length + string + "2017-08-19";
    var buff = src.split('');
    for (var cx = 0, dx = buff.length + src.length, sl = string.length, cl = buff.length; cx < dx; cx++) {
        var s1 = string.charCodeAt(cx % sl) % cl;
        var s2 = cx % cl;
        var btemp = buff[s1];
        buff[s1] = buff[s2];
        buff[s2] = btemp;
    }
    return buff.join('');
};


/**
 * ab=c,ba=d
 */
Object.assign(encode62, {
    src,
    map,
    time_delta: parseInt("zzzzz", 36),
    safeencode(string, sign, offset) {
        string = encodeURIComponent(string).replace(/\./g, '..').replace(/[\!'\(\)~]/g, a => escape(a)).replace(/%/g, '.');
        return this.encode62(string, sign, offset);
    },
    safedecode(string, sign, offset) {
        string = this.decode62(string, sign, offset).replace(/\.\.?/g, a => a === '.' ? "%" : ".");
        return decodeURIComponent(string);
    },
    timedecode(string) {
        var { time_delta } = this;
        var time_rest = string.slice(string.length - time_delta.toString(36).length, string.length);
        var time_start = parseInt((new Date() - parseInt(time_rest, 36)) / time_delta) * time_delta;
        var time_stamp = time_start + parseInt(time_rest, 36);
        return this.safedecode(string.slice(0, string.length - time_delta.toString(36).length), time_stamp.toString(36));
    },
    timeencode(string) {
        var { time_delta } = this;
        var time_free = time_delta / 6 | 0;
        var time_stamp = +new Date() - time_free;
        var time_rest = time_stamp % time_delta;
        var time_rest_str = time_rest.toString(36);
        var time_delta_str = time_delta.toString(36);
        return this.safeencode(string, time_stamp.toString(36)) + repeat("0", time_delta_str.length - time_rest_str.length) + time_rest_str;
    },
    timeupdate(string) {
        var { time_delta } = this;
        var time_rest = string.slice(string.length - time_delta.toString(36).length, string.length);
        var time_start = parseInt((new Date() - parseInt(time_rest, 36)) / time_delta) * time_delta;
        var time_stamp = time_start + parseInt(time_rest, 36);
        if (time_stamp + (time_delta >> 1) > +new Date()) {
            return string;
        } else {
            return this.timeencode(this.timedecode(string));
        }
    },
    encode62(data, sign, offset = 0) {
        if (!sign) return data;
        var result = String(data);
        sign = String(sign);
        var src = this.src;
        var result = result.replace(/\w/g, function (w, cx) {
            var code = map[w];
            if (typeof code !== "number") return w;
            var s = code ^ (sign.charCodeAt((offset + cx) % sign.length) % src.length);
            if (s >= src.length) return w;
            return src[s];
        });
        return result;
    },
    encodestr(data, sign) {
        if (!sign) return data;
        var result = encodeUTF8(data);
        sign = Buffer.from(sign);
        var delta = 0, c = 0;
        for (var cx = 0, dx = data.length; cx < dx; cx++) {
            if (result[cx] < 128) result[cx] = result[cx] ^ sign[cx % sign.length];
            else if (result[cx] < 192) {
                var c = c << 8 | sign[(delta += 6) / 8 % sign.length | 0];
                result[cx] = result[cx] ^ (c >> 8 - delta % 8 & 0x3f);
            }
        }
        return decodeUTF8(result);
    },
    decode(data, sign) {
        if (!sign) return data;
        var result = Buffer.from(data);
        sign = Buffer.from(sign);
        for (var cx = 0, dx = data.length; cx < dx; cx++) {
            result[cx] = result[cx] ^ sign[cx % sign.length];
        }
        return result;
    },
    geta(string) {
        return encode62(string);
    },
    genb() {
        return encode62(Date.now() * Math.random() + "" + Math.random().toString(36) + Math.random().toString(36).toUpperCase());
    },
    huan(x, y) {
        return x.split("").map(s => y[map[s]]).join("");
    },
    yuan(z, x) {
        var y = new Array(z.length);
        x.split("").map((s, i) => y[map[s]] = z[i]);
        return y.join("");
    },
    suan(z, y) {
        var y_map = {};
        y.split("").forEach((a, j) => y_map[a] = j);
        return z.split("").map(c => src[y_map[c]]).join("");
    },
});
encode62.ab2c = encode62.ba2d = encode62.huan;
encode62.db2a = encode62.ca2b = encode62.yuan;
encode62.da2b = encode62.cb2a = encode62.suan;
encode62.decodestr = encode62.encodestr;
encode62.encode = encode62.decode;
encode62.decode62 = encode62.encode62;