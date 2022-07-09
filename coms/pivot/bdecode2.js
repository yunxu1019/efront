var encoding = '';
function kv(o) {
    if (o instanceof Uint8Array) return /^gb/i.test(encoding) ? decodeGBK(o) : decodeUTF8(o);
    if (isArray(o)) return o.map(kv);
    if (isString(o)) return o;
    if (isObject(o)) for (var k in o) {
        if (/piece|ed2k|peer|hash$/.test(k)) continue;
        if (/\.utf-8$/i.test(k)) {
            var e = encoding;
            encoding = '';
            o[k] = kv(o[k]);
            encoding = e;
        }
        else {
            o[k] = kv(o[k])
        }
    }
    return o
}
function bdecode2(rent) {
    var d = bdecode(rent);
    if (d.encoding) encoding = String.fromCharCode.apply(String, d.encoding);
    else encoding = '';
    d = kv(d);
    return d;
}
