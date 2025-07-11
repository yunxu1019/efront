var result, buff_slice, result_index;
var cache = null, cacheLength = 0, cacheLimit = 32768, lengthLimit = 32768;
var min = Math.min;
var buff_length = 0;
var setResult5 = function (b) {
    result[result_index++] = b[0] >> 8 | 0x100;
    result[result_index++] = b[0] & 0xff;
    result[result_index++] = b[1] >> 9;
    result[result_index++] = b[1] >> 4 & 0x1f;
    result[result_index++] = b[1] & 0xf;
};
var setResult4 = function (b) {
    var [b1, b2] = b;
    result[result_index++] = b1 >> 8 | 0x100;
    result[result_index++] = b1 & 0xff;
    result[result_index++] = b2 >> 8;
    result[result_index++] = b2 & 0xff;
};
var writeCache = function (length) {
    for (var cy = cx, dy = cx + length; cy < dy; cy++) {
        var b = buff_slice[cy] << 8 | buff_slice[cy + 1] ^ buff_slice[cy + 2];
        if (cacheLength >= cacheLimit) {
            var t = cy - cacheLength;
            var a = buff_slice[t++] << 8 | buff_slice[t++] ^ buff_slice[t];
            cache[a].shift();
        } else {
            cacheLength++;
        }
        if (!cache[b]) cache[b] = [];
        cache[b].push(cy);
    }
};
var cx;
var readCache = function () {
    var sign = buff_slice[cx] << 8 | buff_slice[cx + 1] ^ buff_slice[cx + 2];
    if (!cache[sign]) return buff_slice[cx];
    var list = cache[sign];
    var max_length = 2, match_position;
    for (var cy = list.length - 1; cy > 0; cy--) {
        var inc = list[cy];
        for (var cz = 1, dz = min(cx - inc, buff_length - cx); cz < dz; cz++) {
            if (buff_slice[cx + cz] !== buff_slice[inc + cz]) break;
        }
        if (cz > max_length) {
            max_length = cz;
            match_position = inc;
        }
    }
    if (max_length > 2) {
        sign = [max_length - 1, cx - match_position - max_length];
    } else {
        sign = buff_slice[cx];
    }
    return sign;
};
function scan(buff, compress_method) {
    buff_slice = buff;
    buff_length = buff.length;
    cache = [], cacheLength = 0;
    var is5 = compress_method === range_compress || compress_method == null;
    var setResultB = is5 ? setResult5 : setResult4;
    result = new Uint16Array(buff.length), result_index = 0;
    cx = 0;
    for (var dx = buff.length; cx < dx; cx++) {
        var b = readCache();
        if (b.length) {
            setResultB(b);
            writeCache(1 + b[0]);
            cx += b[0];
        } else {
            result[result_index++] = b;
            writeCache(1);
        }
    }
    buff_slice = null;
    var res = result.slice(0, result_index);
    result = null;
    cache = null;
    return res;
}