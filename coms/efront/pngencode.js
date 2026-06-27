"use strict";
var png_leader = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
var crc = require("../basic/crc");
var deflate = require("zlib").deflateSync;

function getUInt32BE(integer) {
    return [integer >>> 24, integer >>> 16 & 0xff, integer >>> 8 & 0xff, integer & 0xff];
}
// -function getUInt32BE_test(integer){
//     var buf=Buffer.alloc(4);
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
    var length = data.length;
    var d = new Uint8Array(length + 12);
    var v = new DataView(d.buffer, d.byteOffset, d.byteLength);
    type = type.charCodeAt(0) << 24 | type.charCodeAt(1) << 16 | type.charCodeAt(2) << 8 | type.charCodeAt(3)
    v.setUint32(0, length, false);
    v.setUint32(4, type >>> 0, false);
    d.set(data, 8);
    var typed = new Uint8Array(d.buffer, 4, length + 4);
    v.setUint32(8 + data.length, crc(typed) >>> 0, false);
    return d;
}

function IHDR(width, height) {
    var hdr = [
        ...getUInt32BE(width),
        ...getUInt32BE(height),
        8/*bitDepth 1,2,4,8,16*/,
        3,/*colorType 0灰度,2真彩,3索引彩色,4带alpha灰度,6带alpha真彩*/
        0/*压缩方法 0,deflate+lz77*/,
        0/*滤波器方法/预处理方法，固定为0*/,
        0/*隔行扫描 0非隔行扫描,1Adam7隔行扫描*/,
    ];
    return chunk("IHDR", hdr);
}

function IDAT(data) {
    return chunk("IDAT", data);
}

function PLTE(r, g, b) {
    // 8位色深及以下，可选
    var data = [];
    for (var i = 0; i < 256; i++) {
        data.push(r, g, b);
    }
    return chunk("PLTE", data);
}

function tRNS() {
    // 1. 指定PLTE对应的透明度
    // 2. 8位非索引灰度或真彩模式，仅指定其中一种颜色做为透明色，
    //    2字节或6字节，1位-16位色深通用
    var data = [];
    for (var i = 0; i < 256; i++) {
        data.push(i);
    }
    return chunk("tRNS", data);
}

function IEND() {
    return chunk("IEND");
}

function bKGD() {
    // 适用于不支持透明度的场景
    // 1. 1字节，索引色
    // 2. 2字节，灰度/灰度+alpha
    // 3. 6字节，真彩色/RGBA
    return chunk("bKGD", [0]);
}


function gAMA(gamma) {
    // 输出亮度 = 输入信号 ** gamma
    // 当前图片存储时使用的gamma，供查看图片时校正亮度
    // 与sRGB,iCCP作用类似，适用于老旧设备
    var gama = getUInt32BE((1 / gamma) * 100000 | 0);
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
var abs = Math.abs;
function peath(a, b, c) {
    // a 上
    // b 左
    // c 左上角
    var p = a + b - c;
    var pa = abs(p - a);
    var pb = abs(p - b);
    var pc = abs(p - c);
    if (pa <= pb && pa <= pc) return a;
    else if (pb < pc) return b;
    return c;
}

function filterData(pxData, width, height, bpp) {
    // 每行的开头插入过滤方法
    // 0,None,保持原样
    // 1,Sub,减左侧
    // 2,Up,减上方
    // 3,Average,减左上平均值
    // 4,Peath,减paeth(...)
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
exports = function pngencode(alpha, width, height, color) {
    var filtered = filterData(alpha, width, height, 1);
    var compressed = deflate(filtered);
    if (arguments.length === 4) {
        var binarys = png_leader.concat(IHDR(width, height), PLTE(color >> 16 & 0xff, color >> 8 & 0xff, color & 0xff), tRNS(), IDAT(compressed), IEND());
        return Buffer.from(binarys).toString("base64");
    }
    var binarys = png_leader.concat(IHDR(width, height), /*PLTE(0xff, 0, 0) ,tRNS(),*/ IDAT(compressed), IEND());

    return Buffer.from(binarys).toString("base64");
}
var encodeString = function (string, mask) {
    var d = mask.length;
    return encodeUTF8(string).map((a, i) => a ^ mask[i % d]);
}
export var packjs = function ({ params, imported, prequoted, data, isAsync, isYield, required }) {
    var pngmask = new Uint8Array(36);
    if (global.crypto) global.crypto.getRandomValues(pngmask);
    var filtered = filterData(Array(36).fill(0).map((_, i) => i), 6, 6, 1);
    var compressed = deflate(filtered);
    var res = [
        png_leader,
        IHDR(6, 6),
        chunk("PLTE", Array(36).fill([0x22, 0x66, 0x99]).flat(1)),
        chunk("tRNS", pngmask),
        IDAT(compressed)
    ];
    if (prequoted) data = prequoted.map(a => a.text).join('') + data;
    if (data) res.push(chunk("jsDT", encodeString(data, pngmask)));
    if (params?.length) res.push(chunk('jsPM', encodeString(params.join(','), pngmask)));
    if (imported?.length) res.push(chunk('jsIM', encodeString(imported.join(','), pngmask)));
    if (required?.length) res.push(chunk('jsRE', encodeString(required.join(','), pngmask)));
    if (isAsync) res.push(chunk('jsAS'));
    if (isYield) res.push(chunk('jsYI'));
    res.push(
        IEND()
    );
    return Buffer.concat(res);
};
var decodeString = function (data, mask) {
    var d = mask.length;
    data = data.map((a, i) => a ^ mask[i % d]);
    return decodeUTF8(data);
};
export var readjs = function (pngdata) {
    var chunkstart = png_leader.length;
    var buffer = pngdata.buffer;
    var totalLength = pngdata.length
    var v = new DataView(pngdata.buffer, pngdata.byteOffset, pngdata.byteLength);
    var chunks = [];
    var pngmask;
    var jsdata, params, imported, isAsync, isYield, required;
    while (chunkstart < totalLength) {
        var length = v.getUint32(chunkstart, false);
        chunkstart += 4;
        var type = v.getUint32(chunkstart, false);
        type = String.fromCharCode(type >>> 24, type >>> 16 & 0xff, type >>> 8 & 0xff, type & 0xff);
        var c = crc(new Uint8Array(buffer, chunkstart, length + 4)) >>> 0;
        chunkstart += 4;
        var data = new Uint8Array(buffer, chunkstart, length);
        chunkstart += length;
        var verifyCode = v.getUint32(chunkstart, false);
        chunkstart += 4;
        if (c >>> 0 !== verifyCode) return;
        switch (type) {
            case "jsDT":
                jsdata = decodeString(data, pngmask); break;
            case "jsPM":
                if (length) params = decodeString(data, pngmask).split(','); break;
            case "jsIM":
                if (length) imported = decodeString(data, pngmask).split(","); break;
            case "jsAS":
                isAsync = true; break;
            case "jsYI":
                isYield = true; break;
            case "jsRE":
                if (length) required = decodeString(data, pngmask).split(','); break;
            case "IDAT":
            case "IHDR":
            case "PLTE": break;
            case "tRNS": pngmask = data;
        }
    }
    return { data: jsdata, params, imported, required, isAsync, isYield };
}