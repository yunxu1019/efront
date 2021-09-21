var readBinary = require("./readBinary");

function decodeFlat(buff, start = 0) {
    var tcount = buff[start];
    var total = 0;
    var t = buff[start + 1] & 0x1f;
    var bitoffset = start + 2 << 3, inc = 0;
    var counts = [];
    while (inc < tcount) {
        var v = readBinary(buff, bitoffset, t);
        bitoffset += t;
        var k = readBinary(buff, bitoffset, t);
        bitoffset += t;
        counts.unshift(k, v);
        total += v;
        inc++;
    }
    var rest = new Array(total);
    while (counts.length) {
        var t = counts[counts.length - 2];
        var n = readBinary(buff, bitoffset, t);
        rest[--total] = [n, t];
        bitoffset += t;
        if (--counts[counts.length - 1] <= 0) {
            counts.pop();
            counts.pop();
        }
    }
    rest.offset = bitoffset;
    return rest;
}
function fromhuff(buff, result = [], scanstart, type) {
    type = type === repeat_huffman;
    var huf = decodeFlat(buff, scanstart);
    var byteoffset = huf.offset + 7 >> 3;
    var map = [];
    var codeend = byteoffset + (huf.length - 1);
    while (byteoffset < codeend) {
        var [k, v] = huf.shift();
        if (!map[v]) {
            map[v] = {};
        }
        if (type) {
            if (buff[byteoffset] >= 128) {
                codeend++;
                map[v][k] = buff[byteoffset++] - 128 << 8 | buff[byteoffset++];
            } else {
                map[v][k] = buff[byteoffset++];
            }
        } else {
            map[v][k] = buff[byteoffset++];
        }
    }
    var bitoffset = byteoffset << 3;
    codeend = buff.length << 3;
    var endflag = huf[huf.length - 1];
    var t = 1, s = endflag[1];
    do {
        if (!(t in map)) {
            continue;
        }
        var sum = readBinary(buff, bitoffset, t);
        if (sum in map[t]) {
            bitoffset += t;
            result.push(map[t][sum]);
            t = 0;
        }
    } while (bitoffset < codeend && ++t <= s);

    if (sum !== endflag[0]) {
        console.log(
            "result:", result,
            "\r\ndataend:", codeend,
            "\r\nendflag:", endflag,
            "\r\ncodefound:", sum,
            "\r\nbitwidth:", t,
            "\r\ncodemap:", map
        );
        throw console.warn("数据异常！");
    }
    bitoffset = bitoffset + endflag[1];
    return bitoffset;
}

function inflate(buff) {
    var result = [];
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        var b = buff[cx];
        if (b < 256) {
            result.push(b);
        }
        else {
            b = ((b & 0x7f) << 8 | buff[++cx]) + 1;
            var c = buff[++cx] << 9 | buff[++cx] << 4 | buff[++cx];
            var s = result.length - c - b;
            var code = result.slice(s, s + b);
            while (code.length) {
                result.push.apply(result, code.splice(0, 1024));
            }
        }
    }
    return result;
}

function repeat(a, count) {
    var result = [];
    while (count-- > 0) {
        result.push(a);
    }
    return new Uint8Array(result);
}
var normal_huffman = 0;
var normal_repeat1 = 1;
var normal_repeat2 = 2;
var normal_nocode1 = 3;
var normal_nocode2 = 4;
var normal_nocode3 = 5;
var repeat_huffman = 6;

var concatByte = require("./concatByte");
function unpack(buff) {
    if (buff.length < 2) return buff;
    var result = [];
    var byteoffset = 0;
    do {
        var type = buff[byteoffset + 1] >> 5;
        switch (type) {
            case normal_huffman:
                var res = [];
                var bitoffset = fromhuff(buff, res, byteoffset);
                result.push(new Uint8Array(res));
                byteoffset = bitoffset + 7 >> 3;
                break;
            case repeat_huffman:
                var res = [];
                var bitoffset = fromhuff(buff, res, byteoffset, type);
                res = new Uint16Array(res);
                res = inflate(res);
                res = new Uint8Array(res);
                result.push(res);
                var tempoffset = bitoffset + 7 >> 3;
                byteoffset = tempoffset;
                break;
            case normal_repeat1:
                var count = buff[byteoffset + 1] & 0x1f;
                var res = repeat(buff[byteoffset], count);
                result.push(res);
                byteoffset += 2;
                break;
            case normal_repeat2:
                var count = (buff[byteoffset + 1] & 0x1f) << 8 | buff[byteoffset + 2];
                var res = repeat(buff[byteoffset], count);
                result.push(res);
                byteoffset += 3;
                break;
            case normal_nocode1:
                var count = buff[byteoffset] << 5 | buff[byteoffset + 1] & 0x1f;
                byteoffset += 2;
                var res = buff.slice(byteoffset, byteoffset + count);
                result.push(res);
                byteoffset += count;
                break;
            case normal_nocode2:
                var count = buff[byteoffset] << 13 | buff[byteoffset + 1] << 8 & 0x1f00 | buff[byteoffset + 2];
                byteoffset += 3;
                var res = buff.slice(byteoffset, byteoffset + count);
                result.push(res);
                byteoffset += count;
                break;
            case normal_nocode3:
                var count = buff[byteoffset] << 21 | buff[byteoffset + 1] << 16 & 0x1f0000 | buff[byteoffset + 2] << 8 | buff[byteoffset + 3];
                byteoffset += 4;
                var res = buff.slice(byteoffset, byteoffset + count);
                result.push(res);
                byteoffset += count;
                break;
            default:
                throw new Error("数据异常！");
        }
    } while (byteoffset + 1 < buff.length);
    result = concatByte(result);
    return result;
}
module.exports = unpack;