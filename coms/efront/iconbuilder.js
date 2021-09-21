"use strict";
var pngjs = require("../pngjs/parser-sync");
var pngencode = require("./pngencode");
var imagebuilder = require("./imagbuilder");
var tRNS = function () {
    var data = [];
    for (var i = 0; i < 256; i++) {
        data.push(i);
    }
    return imagebuilder.chunk("tRNS", data);
}();
function getalpha(data) {
    var alpha = [];
    for (var cx = 3, dx = data.length; cx < dx; cx += 4) {
        alpha.push(data[cx]);
    }
    return alpha;
}
function iconbuilder(buff, color) {
    var {
        width,
        height,
        data
    } = pngjs(buff instanceof Buffer ? buff : Buffer.from(buff), {});
    var alpha = getalpha(data);
    if (typeof color === "number") {
        return pngencode(alpha, width, height, color);
    }
    return pngencode(alpha, width, height);
}

function plte(color) {
    var r = color >>> 16 & 0xff;
    var g = color >>> 8 & 0xff;
    var b = color & 0xff;
    var PLTE = [];
    for (var cx = 0, dx = 768; cx < dx;) {
        PLTE[cx++] = r;
        PLTE[cx++] = g;
        PLTE[cx++] = b;
    }
    return imagebuilder.chunk("PLTE", PLTE);
}
iconbuilder.color = function (base64, color) {
    var binaries = Buffer.from(base64, 'base64');
    var chunks = imagebuilder.getChunks(binaries);
    chunks.PLTE = plte(color);
    chunks.tRNS = tRNS;
    return imagebuilder.fromChunks(chunks);
}
module.exports = iconbuilder;