"use strict";
var png_leader = [137, 80, 78, 71, 13, 10, 26, 10];
var crc = require("./crc");
var deflate = require("zlib").deflateSync;

function getUInt32BE(integer) {
    return [integer >>> 24, integer >>> 16 & 0xff, integer >>> 8 & 0xff, integer & 0xff];
}
// -function getUInt32BE_test(integer){
//     var buf=new Buffer(4);
//     buf.writeInt32BE(0x01020304);
//     console.log(buf,Buffer.from(getUInt32BE(0x01020304)));
//     var type=parseType("IHDR");
//     buf.writeInt32BE(0x49484452)
//     console.log(buf,Buffer.from(type));
// }();
function parseType(type) {
    return [type.charCodeAt(0), type.charCodeAt(1), type.charCodeAt(2), type.charCodeAt(3)];
}

function chunk(type, data) {
    if (!data) data = [];
    if (!(data instanceof Array)) {
        data = [].slice.call(data, [0]);
    }
    var length = data.length;
    var typed = parseType(type).concat(data);
    return getUInt32BE(length).concat(typed, getUInt32BE(crc(typed)));
}

function IHDR(width, height) {
    var hdr = getUInt32BE(width).concat(getUInt32BE(height), [
        /*bitDepth*/
        8,
        /*colorType:COLORTYPE_ALPHA*/
        3, //indexed
        0,
        0,
        0
    ])
    return chunk("IHDR", hdr);
}

function IDAT(data) {
    return chunk("IDAT", data);
}

function PLTE(r, g, b) {
    var data = [];
    for (var i = 0; i < 256; i++) {
        data.push(r, g, b);
    }
    return chunk("PLTE", data);
}

function tRNS() {
    var data = [];
    for (var i = 0; i < 256; i++) {
        data.push(i);
    }
    return chunk("tRNS", data);
}

function IEND() {
    return chunk("IEND");
}

function BKGD() {
    return chunk("bKGD", [0]);
}


function GAMA(gamma) {
    var gama = getUInt32BE(Math.floor(gamma * 100000));
    return chunk("gAMA", gamma);
}



var absolute = Math.abs;

// filters

function paethPredictor(left, above, upLeft) {
    var paeth = left + above - upLeft;
    var pLeft = absolute(paeth - left);
    var pAbove = absolute(paeth - above);
    var pUpLeft = absolute(paeth - upLeft);

    if (pLeft <= pAbove && pLeft <= pUpLeft) {
        return left;
    }
    if (pAbove <= pUpLeft) {
        return above;
    }
    return upLeft;

}

function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
    for (var i = 0; i < byteWidth; i++) {
        rawData[rawPos + i] = pxData[pxPos + i];
    }
}


function filterData(pxData, width, height, bpp) {

    var filterTypes;

    var byteWidth = width * bpp;
    var rawPos = 0;
    var pxPos = 0;
    var rawData = Buffer.alloc((byteWidth + 1) * height);

    for (var y = 0; y < height; y++) {
        rawData[rawPos] = 0;
        rawPos++;
        filterNone(pxData, pxPos, byteWidth, rawData, rawPos, bpp);
        rawPos += byteWidth;
        pxPos += byteWidth;
    }
    return rawData;
};

// convert



//main
function pngencode(alpha, width, height, color) {
    var filtered = filterData(alpha, width, height, 1);
    var compressed = deflate(filtered);
    if (arguments.length === 4) {
        var binarys = png_leader.concat(IHDR(width, height), PLTE(color >> 16 & 0xff, color >> 8 & 0xff, color & 0xff), tRNS(), IDAT(compressed), IEND());
        return Buffer.from(binarys).toString("base64");
    }
    var binarys = png_leader.concat(IHDR(width, height), /*PLTE(0xff, 0, 0) ,tRNS(),*/ IDAT(compressed), IEND());

    return Buffer.from(binarys).toString("base64");
}
module.exports = pngencode