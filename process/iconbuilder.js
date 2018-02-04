"use strict";
var pngjs = require("./pngjs/parser-sync");
var pngencode = require("./pngencode");
var crc = require("./crc");
var imagebuilder = require("./imagbuilder");
function getalpha(data) {
    var alpha = [];
    for (var cx = 3, dx = data.length; cx < dx; cx += 4) {
        alpha.push(data[cx]);
    }
    return alpha;
}

function iconbuilder(buff) {
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
iconbuilder.color = function (base64, color) {
    var binaries = Buffer.from(base64, 'base64');
    var chunks = imagebuilder.getChunks(binaries);
    chunks.PLTE = plte(color);
    return imagebuilder.fromChunks(chunks);
}
module.exports = iconbuilder;