var pngjs = require("./pngjs/parser-sync");
var pngencode = require("./pngencode");
var crc= require("./crc");

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
    var chunks = getchunks(binaries);
    return Buffer.concat([png_leader,chunks.IHDR,plte(color),tRNS,chunks.IDAT,chunks.IEND])
}
module.exports = iconbuilder;

function fromUInt32BE(a, b, c, d) {
    return (a << 24) + (b << 16) + (c << 8) + d;
}

function getType(chunk) {
    return String.fromCharCode(chunk[4], chunk[5], chunk[6], chunk[7]);
}

function getchunks(binaries) {
    var chunkstart = png_leader.length;
    var totalLength = binaries.length
    var chunks = [];
    while (chunkstart < totalLength) {
        var size = fromUInt32BE(binaries[chunkstart], binaries[chunkstart + 1], binaries[chunkstart + 2], binaries[chunkstart + 3]);
        var chunkend = chunkstart + size + 12;
        var chunk = binaries.slice(chunkstart, chunkend);
        chunks.push(chunk);
        var type = getType(chunk);
        chunks[type] = chunk;
        chunkstart = chunkend;
    }
    return chunks;
}
var tRNS = function () {
    var data = [];
    for (var i = 0; i < 256; i++) {
        data.push(i);
    }
    return chunk("tRNS", data);
}();

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
    return chunk("PLTE", PLTE);
}

var png_leader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function getUInt32BE(integer) {
    return [integer >>> 24, integer >>> 16 & 0xff, integer >>> 8 & 0xff, integer & 0xff];
}

function parseType(type) {
    return [type.charCodeAt(0), type.charCodeAt(1), type.charCodeAt(2), type.charCodeAt(3)];
}

function chunk(type, data) {
    if (!data) data = [];
    if (!(data instanceof Array)) {
        data = [].slice.call(data, 0);
    }
    var length = data.length;
    var typed = parseType(type).concat(data);
    return Buffer.from(getUInt32BE(length).concat(typed, getUInt32BE(crc(typed))));
}
