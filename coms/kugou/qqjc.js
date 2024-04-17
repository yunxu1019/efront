var md5 = function () {
    var ERROR = "input is invalid type"
    var HEX_CHARS = "0123456789abcdef".split("");
    var EXTRA = [128, 32768, 8388608, -2147483648],
        SHIFT = [0, 8, 16, 24],
        OUTPUT_TYPES = ["hex", "array", "digest", "buffer", "arrayBuffer", "base64"],
        BASE64_ENCODE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
        blocks = [], buffer8;
    var createOutputMethod = function (e) {
        return function (t) {
            return new Md5(!0).update(t)[e]()
        }
    }
    function Md5(e) {
        if (e)
            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0,
                this.blocks = blocks,
                this.buffer8 = buffer8;
        else
            this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0,
            this.finalized = this.hashed = !1,
            this.first = !0
    }
    Md5.prototype.update = function (e) {
        if (!this.finalized) {
            var t, n = typeof e;
            if ("string" != n) {
                if ("object" != n)
                    throw ERROR;
                if (null === e)
                    throw ERROR;
                else if (!Array.isArray(e))
                    throw ERROR;
                t = !0
            }
            for (var r, i, s = 0, o = e.length, a = this.blocks, l = this.buffer8; s < o;) {
                if (this.hashed && (this.hashed = !1,
                    a[0] = a[16],
                    a[16] = a[1] = a[2] = a[3] = a[4] = a[5] = a[6] = a[7] = a[8] = a[9] = a[10] = a[11] = a[12] = a[13] = a[14] = a[15] = 0),
                    t)
                    for (i = this.start; s < o && i < 64; ++s)
                        a[i >> 2] |= e[s] << SHIFT[3 & i++];
                else
                    for (i = this.start; s < o && i < 64; ++s)
                        (r = e.charCodeAt(s)) < 128 ? a[i >> 2] |= r << SHIFT[3 & i++] : (r < 2048 ? a[i >> 2] |= (192 | r >> 6) << SHIFT[3 & i++] : (r < 55296 || 57344 <= r ? a[i >> 2] |= (224 | r >> 12) << SHIFT[3 & i++] : (r = 65536 + ((1023 & r) << 10 | 1023 & e.charCodeAt(++s)),
                            a[i >> 2] |= (240 | r >> 18) << SHIFT[3 & i++],
                            a[i >> 2] |= (128 | r >> 12 & 63) << SHIFT[3 & i++]),
                            a[i >> 2] |= (128 | r >> 6 & 63) << SHIFT[3 & i++]),
                            a[i >> 2] |= (128 | 63 & r) << SHIFT[3 & i++]);
                this.lastByteIndex = i,
                    this.bytes += i - this.start,
                    64 <= i ? (this.start = i - 64,
                        this.hash(),
                        this.hashed = !0) : this.start = i
            }
            return 4294967295 < this.bytes && (this.hBytes += this.bytes / 4294967296 << 0,
                this.bytes = this.bytes % 4294967296),
                this
        }
    }

    Md5.prototype.finalize = function () {
        if (!this.finalized) {
            this.finalized = !0;
            var e = this.blocks
                , t = this.lastByteIndex;
            e[t >> 2] |= EXTRA[3 & t],
                56 <= t && (this.hashed || this.hash(),
                    e[0] = e[16],
                    e[16] = e[1] = e[2] = e[3] = e[4] = e[5] = e[6] = e[7] = e[8] = e[9] = e[10] = e[11] = e[12] = e[13] = e[14] = e[15] = 0),
                e[14] = this.bytes << 3,
                e[15] = this.hBytes << 3 | this.bytes >>> 29,
                this.hash()
        }
    }

    Md5.prototype.hash = function () {
        var e, t, n, r, i, s, o = this.blocks;
        t = this.first ? ((t = ((e = ((e = o[0] - 680876937) << 7 | e >>> 25) - 271733879 << 0) ^ (n = ((n = (-271733879 ^ (r = ((r = (-1732584194 ^ 2004318071 & e) + o[1] - 117830708) << 12 | r >>> 20) + e << 0) & (-271733879 ^ e)) + o[2] - 1126478375) << 17 | n >>> 15) + r << 0) & (r ^ e)) + o[3] - 1316259209) << 22 | t >>> 10) + n << 0 : (e = this.h0,
            t = this.h1,
            n = this.h2,
            ((t += ((e = ((e += ((r = this.h3) ^ t & (n ^ r)) + o[0] - 680876936) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + o[1] - 389564586) << 12 | r >>> 20) + e << 0) & (e ^ t)) + o[2] + 606105819) << 17 | n >>> 15) + r << 0) & (r ^ e)) + o[3] - 1044525330) << 22 | t >>> 10) + n << 0),
            t = ((t += ((e = ((e += (r ^ t & (n ^ r)) + o[4] - 176418897) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + o[5] + 1200080426) << 12 | r >>> 20) + e << 0) & (e ^ t)) + o[6] - 1473231341) << 17 | n >>> 15) + r << 0) & (r ^ e)) + o[7] - 45705983) << 22 | t >>> 10) + n << 0,
            t = ((t += ((e = ((e += (r ^ t & (n ^ r)) + o[8] + 1770035416) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + o[9] - 1958414417) << 12 | r >>> 20) + e << 0) & (e ^ t)) + o[10] - 42063) << 17 | n >>> 15) + r << 0) & (r ^ e)) + o[11] - 1990404162) << 22 | t >>> 10) + n << 0,
            t = ((t += ((e = ((e += (r ^ t & (n ^ r)) + o[12] + 1804603682) << 7 | e >>> 25) + t << 0) ^ (n = ((n += (t ^ (r = ((r += (n ^ e & (t ^ n)) + o[13] - 40341101) << 12 | r >>> 20) + e << 0) & (e ^ t)) + o[14] - 1502002290) << 17 | n >>> 15) + r << 0) & (r ^ e)) + o[15] + 1236535329) << 22 | t >>> 10) + n << 0,
            t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + o[1] - 165796510) << 5 | e >>> 27) + t << 0) ^ t)) + o[6] - 1069501632) << 9 | r >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + o[11] + 643717713) << 14 | n >>> 18) + r << 0) ^ r)) + o[0] - 373897302) << 20 | t >>> 12) + n << 0,
            t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + o[5] - 701558691) << 5 | e >>> 27) + t << 0) ^ t)) + o[10] + 38016083) << 9 | r >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + o[15] - 660478335) << 14 | n >>> 18) + r << 0) ^ r)) + o[4] - 405537848) << 20 | t >>> 12) + n << 0,
            t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + o[9] + 568446438) << 5 | e >>> 27) + t << 0) ^ t)) + o[14] - 1019803690) << 9 | r >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + o[3] - 187363961) << 14 | n >>> 18) + r << 0) ^ r)) + o[8] + 1163531501) << 20 | t >>> 12) + n << 0,
            t = ((t += ((r = ((r += (t ^ n & ((e = ((e += (n ^ r & (t ^ n)) + o[13] - 1444681467) << 5 | e >>> 27) + t << 0) ^ t)) + o[2] - 51403784) << 9 | r >>> 23) + e << 0) ^ e & ((n = ((n += (e ^ t & (r ^ e)) + o[7] + 1735328473) << 14 | n >>> 18) + r << 0) ^ r)) + o[12] - 1926607734) << 20 | t >>> 12) + n << 0,
            t = ((t += ((s = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + o[5] - 378558) << 4 | e >>> 28) + t << 0)) + o[8] - 2022574463) << 11 | r >>> 21) + e << 0) ^ e) ^ (n = ((n += (s ^ t) + o[11] + 1839030562) << 16 | n >>> 16) + r << 0)) + o[14] - 35309556) << 23 | t >>> 9) + n << 0,
            t = ((t += ((s = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + o[1] - 1530992060) << 4 | e >>> 28) + t << 0)) + o[4] + 1272893353) << 11 | r >>> 21) + e << 0) ^ e) ^ (n = ((n += (s ^ t) + o[7] - 155497632) << 16 | n >>> 16) + r << 0)) + o[10] - 1094730640) << 23 | t >>> 9) + n << 0,
            t = ((t += ((s = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + o[13] + 681279174) << 4 | e >>> 28) + t << 0)) + o[0] - 358537222) << 11 | r >>> 21) + e << 0) ^ e) ^ (n = ((n += (s ^ t) + o[3] - 722521979) << 16 | n >>> 16) + r << 0)) + o[6] + 76029189) << 23 | t >>> 9) + n << 0,
            t = ((t += ((s = (r = ((r += ((i = t ^ n) ^ (e = ((e += (i ^ r) + o[9] - 640364487) << 4 | e >>> 28) + t << 0)) + o[12] - 421815835) << 11 | r >>> 21) + e << 0) ^ e) ^ (n = ((n += (s ^ t) + o[15] + 530742520) << 16 | n >>> 16) + r << 0)) + o[2] - 995338651) << 23 | t >>> 9) + n << 0,
            t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + o[0] - 198630844) << 6 | e >>> 26) + t << 0) | ~n)) + o[7] + 1126891415) << 10 | r >>> 22) + e << 0) ^ ((n = ((n += (e ^ (r | ~t)) + o[14] - 1416354905) << 15 | n >>> 17) + r << 0) | ~e)) + o[5] - 57434055) << 21 | t >>> 11) + n << 0,
            t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + o[12] + 1700485571) << 6 | e >>> 26) + t << 0) | ~n)) + o[3] - 1894986606) << 10 | r >>> 22) + e << 0) ^ ((n = ((n += (e ^ (r | ~t)) + o[10] - 1051523) << 15 | n >>> 17) + r << 0) | ~e)) + o[1] - 2054922799) << 21 | t >>> 11) + n << 0,
            t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + o[8] + 1873313359) << 6 | e >>> 26) + t << 0) | ~n)) + o[15] - 30611744) << 10 | r >>> 22) + e << 0) ^ ((n = ((n += (e ^ (r | ~t)) + o[6] - 1560198380) << 15 | n >>> 17) + r << 0) | ~e)) + o[13] + 1309151649) << 21 | t >>> 11) + n << 0,
            t = ((t += ((r = ((r += (t ^ ((e = ((e += (n ^ (t | ~r)) + o[4] - 145523070) << 6 | e >>> 26) + t << 0) | ~n)) + o[11] - 1120210379) << 10 | r >>> 22) + e << 0) ^ ((n = ((n += (e ^ (r | ~t)) + o[2] + 718787259) << 15 | n >>> 17) + r << 0) | ~e)) + o[9] - 343485551) << 21 | t >>> 11) + n << 0,
            this.first ? (this.h0 = e + 1732584193 << 0,
                this.h1 = t - 271733879 << 0,
                this.h2 = n - 1732584194 << 0,
                this.h3 = r + 271733878 << 0,
                this.first = !1) : (this.h0 = this.h0 + e << 0,
                    this.h1 = this.h1 + t << 0,
                    this.h2 = this.h2 + n << 0,
                    this.h3 = this.h3 + r << 0)
    }

    Md5.prototype.hex = function () {
        this.finalize();
        var e = this.h0
            , t = this.h1
            , n = this.h2
            , r = this.h3;
        return HEX_CHARS[e >> 4 & 15] + HEX_CHARS[15 & e] + HEX_CHARS[e >> 12 & 15] + HEX_CHARS[e >> 8 & 15] + HEX_CHARS[e >> 20 & 15] + HEX_CHARS[e >> 16 & 15] + HEX_CHARS[e >> 28 & 15] + HEX_CHARS[e >> 24 & 15] + HEX_CHARS[t >> 4 & 15] + HEX_CHARS[15 & t] + HEX_CHARS[t >> 12 & 15] + HEX_CHARS[t >> 8 & 15] + HEX_CHARS[t >> 20 & 15] + HEX_CHARS[t >> 16 & 15] + HEX_CHARS[t >> 28 & 15] + HEX_CHARS[t >> 24 & 15] + HEX_CHARS[n >> 4 & 15] + HEX_CHARS[15 & n] + HEX_CHARS[n >> 12 & 15] + HEX_CHARS[n >> 8 & 15] + HEX_CHARS[n >> 20 & 15] + HEX_CHARS[n >> 16 & 15] + HEX_CHARS[n >> 28 & 15] + HEX_CHARS[n >> 24 & 15] + HEX_CHARS[r >> 4 & 15] + HEX_CHARS[15 & r] + HEX_CHARS[r >> 12 & 15] + HEX_CHARS[r >> 8 & 15] + HEX_CHARS[r >> 20 & 15] + HEX_CHARS[r >> 16 & 15] + HEX_CHARS[r >> 28 & 15] + HEX_CHARS[r >> 24 & 15]
    }

    Md5.prototype.toString = Md5.prototype.hex,
        Md5.prototype.digest = function () {
            this.finalize();
            var e = this.h0
                , t = this.h1
                , n = this.h2
                , r = this.h3;
            return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & n, n >> 8 & 255, n >> 16 & 255, n >> 24 & 255, 255 & r, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255]
        }

    Md5.prototype.array = Md5.prototype.digest
    Md5.prototype.arrayBuffer = function () {
        this.finalize();
        var e = new ArrayBuffer(16)
            , t = new Uint32Array(e);
        return t[0] = this.h0,
            t[1] = this.h1,
            t[2] = this.h2,
            t[3] = this.h3,
            e
    }

    Md5.prototype.buffer = Md5.prototype.arrayBuffer
    Md5.prototype.base64 = function () {
        for (var e, t, n, r = "", i = this.array(), s = 0; s < 15;)
            e = i[s++],
                t = i[s++],
                n = i[s++],
                r += BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[63 & (e << 4 | t >>> 4)] + BASE64_ENCODE_CHAR[63 & (t << 2 | n >>> 6)] + BASE64_ENCODE_CHAR[63 & n];
        return e = i[s],
            r + (BASE64_ENCODE_CHAR[e >>> 2] + BASE64_ENCODE_CHAR[e << 4 & 63] + "==")
    };
    return createOutputMethod("hex");
}();
var secret = "0b50b02fd0d73a9c4c8c3a781c30845f";
function createSign(e) {
    if ("[object Object]" !== Object.prototype.toString.call(e))
        throw new Error("The parameter of query must be a Object.");
    var t = Math.floor(new Date / 1e3);
    extend(e, {
        timestamp: t,
        appid: 16073360
    });
    var n = Object.keys(e);
    n.sort();
    for (var r = "", i = 0; i < n.length; i++) {
        var s = n[i];
        r += (0 == i ? "" : "&") + s + "=" + e[s]
    }
    return extend(e, {
        sign: md5(r += secret),
        timestamp: t,
    })
}
return createSign;