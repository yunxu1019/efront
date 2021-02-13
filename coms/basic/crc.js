"use strict";
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
module.exports = crc;