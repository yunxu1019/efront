"use strict";
module.exports = encode62;
var src = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var map = {};
src.split("").forEach((s, i) => map[s] = i);

function encode62(string) {
    string = String(string)
    string = string.length + string + "2017-08-19";
    var buff = Buffer.from(src);
    for (var cx = 0, dx = buff.length + src.length, sl = string.length, cl = buff.length; cx < dx; cx++) {
        var s1 = string.charCodeAt(cx % sl) % cl;
        var s2 = cx % cl;
        var btemp = buff[s1];
        buff[s1] = buff[s2];
        buff[s2] = btemp;
    }
    return buff.toString();
};


/**
 * ab=c,ba=d
 */
Object.assign(encode62, {
    src,
    map,
    time_delta: parseInt("zzzzz", 36),
    timedecode(string) {
        var { time_delta } = this;
        var time_rest = string.slice(string.length - time_delta.toString(36).length, string.length);
        var time_start = parseInt((new Date() - parseInt(time_rest, 36)) / time_delta) * time_delta;
        var time_stamp = time_start + parseInt(time_rest, 36);
        return this.decode62(string.slice(0, string.length - time_delta.toString(36).length), time_stamp.toString(36));
    },
    timeencode(string) {
        var { time_delta } = this;
        var time_stamp = +new Date();
        var time_rest = time_stamp % time_delta;
        return this.encode62(string, time_stamp.toString(36)) + time_rest.toString(36).padStart(time_delta.toString(36).length, '0');
    },
    encode62(data, sign) {
        if (!sign) return data;
        var result = String(data);
        sign = String(sign);
        var src = this.src;
        var mode = Math.pow(2, Math.floor(Math.log2(62)));
        var result = result.replace(/\w/g, function (w, cx) {
            var code = map[w];
            if (typeof code !== "number") return w;
            var s = code ^ (sign.charCodeAt(cx % sign.length) % mode);
            return src[s];
        });
        return result;
    },
    encode(data, sign) {
        if (!sign) return data;
        var result = Buffer.from(data);
        sign = Buffer.from(sign);
        for (var cx = 0, dx = data.length; cx < dx; cx++) {
            result[cx] = result[cx] ^ sign[cx % sign.length];
        }
        return result;
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
        return encode62(Date.now() + "" + Math.random());
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
    ab2c(a, b) {
        return this.huan(a, b);
    },
    ba2d(a, b) {
        return this.huan(b, a);
    },
    ca2b(c, a) {
        return this.yuan(c, a);
    },
    cb2a(c, b) {
        return this.suan(c, b);
    },
    da2b(d, a) {
        return this.suan(d, a);
    },
    db2a(d, b) {
        return this.yuan(d, b);
    }
});

encode62.decode62 = encode62.encode62;