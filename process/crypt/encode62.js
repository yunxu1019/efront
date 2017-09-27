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