"use strict";
var crc = require("./crc");
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
        chunks[type] = chunks[type] ? Buffer.concat([chunk[type], chunk]) : chunk;
        chunkstart = chunkend;
    }
    return chunks;
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
function fromChunks(chunks) {
    return Buffer.concat([
        png_leader,
        chunks.IHDR,
        // chunks.cHRM,// 基色和白色点数据块
        // chunks.gAMA,// 图像γ数据块
        // chunks.sBIT,// 样本有效位数据块
        chunks.PLTE,// 调色板数据块
        // chunks.bKGD,// 背景颜色数据块
        // chunks.hIST,// 图像直方图数据块
        chunks.tRNS,// 图像透明数据块
        // chunks.oFFs,
        chunks.pHYs,// 物理像素尺寸数据块
        // chunks.sCAL,
        chunks.IDAT,
        // chunks.tIME,// 图像最后修改时间数据块
        // chunks.tEXt,
        // chunks.zTXt,
        // chunks.fRAc,
        // chunks.glFg,
        // chunks.glFt,
        // chunks.glFx,
        chunks.IEND
    ].filter(a => a != void 0));
}
function imagbuilder(binaries) {
    var chunks = getchunks(binaries);
    return fromChunks(chunks);
}
imagbuilder.getChunks = getchunks;
imagbuilder.fromChunks = fromChunks;
imagbuilder.chunk = chunk;
module.exports = imagbuilder;