var png_leader = [137, 80, 78, 71, 13, 10, 26, 10];

function table(sign) {
    var c, table = new Array(256);
    for (var n = 0; n < 256; n++) {
        c = n;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        c = c & 1 ? sign ^ c >>> 1 : c >>> 1;
        table[n] = c;
    }
    return table;
}

function crc(bstr, seed) {
    var C = seed ^ -1,
        L = bstr.length - 1;
    for (var i = 0; i < L;) {
        C = C >>> 8 ^ T[(C ^ bstr[i++]) & 0xFF];
        C = C >>> 8 ^ T[(C ^ bstr[i++]) & 0xFF];
    }
    if (i === L) C = C >>> 8 ^ T[(C ^ bstr[i]) & 0xFF];
    return C ^ -1;
}

var sign = parseInt("-52l3vk", 36);
var T = table(sign);

function getUInt32BE(integer) {
    return [integer >>> 24, integer >>> 16 & 0xff, integer >>> 8 & 0xff, integer & 0xff];
}

function parseType(type) {
    return [type.charCodeAt(0), type.charCodeAt(1), type.charCodeAt(2), type.charCodeAt(3)];
}

function chunk(type, data) {
    if (!data) data = [];
    var length = data.length;
    return getUInt32BE(length).concat(parseType(type), data, crc(data));
}

function IHDR(width, height) {
    var hdr = getUInt32BE(width).concat(getUInt32BE(height), [
        /*bitDepth*/
        8,
        /*colorType:COLORTYPE_ALPHA*/
        4,
        0,
        0,
        0
    ])
    return chunk("IHDR", hdr);
}

function IDAT(data) {
    return chunk("IDAT", data);
}

function IEND() {
    return chunk("IEND");
}

function GAMA(gamma) {
    var gama = getUInt32BE(Math.floor(gamma * 100000));
    return chunk("GAMA", gamma);
}

function pngencode(data, width, height) {
    if (!height) height = (data.length >> 2) / height;
    var compressed = deflate(data)
    return String.formCharCode.apply(null, [png_leader, IHDR(width, height), GAMA(1), IDAT(compressed), IEND()]);
}