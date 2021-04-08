var readBinary = require("./readBinary");

function decodeFlat(buff) {
    var total = buff[0] + 1;
    var rest = new Array(total);
    var t = buff[1];
    var bitoffset = 16, sum = 0;
    var counts = [];
    while (sum < total) {
        var v = readBinary(buff, bitoffset, t);
        bitoffset += t;
        var k = readBinary(buff, bitoffset, t);
        bitoffset += t;
        counts.unshift(k, v);
        sum += v;
    }
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
function scan(buff, result = []) {
    if (buff.length < 2) return buff;
    var huf = decodeFlat(buff);
    var byteoffset = huf.offset + 7 >> 3;
    var map = [];
    var codeend = byteoffset + huf.length - 1;
    while (byteoffset < codeend) {
        var [k, v] = huf.shift();
        if (!map[v]) {
            map[v] = {};
        }
        map[v][k] = buff[byteoffset++];
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
        console.log(result, [].slice.call(buff, byteoffset).map(a => a.toString(2)), codeend, endflag, sum.toString(2), huf, t, map);
        throw console.warn("数据异常！");
    }
    bitoffset = bitoffset + endflag[1];
    return bitoffset;
}
function unpack(buff) {
    var result = [];
    var byteoffset = 0;
    do {
        var type = buff[byteoffset + 1] >> 5;
        switch (type) {
            case 0:
                var bitoffset = scan(buff, result);
                break;
            default:
                throw new Error("数据异常！");
        }
        byteoffset = bitoffset + 7 >> 3;
    } while (byteoffset < buff.length);
    return result;
}
module.exports = unpack;