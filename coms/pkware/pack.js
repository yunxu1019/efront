
var countMap = null;
var Array_slice = Array.prototype.slice;
var mapCount = sum => {
    sum = sum[1];
    if (!countMap[sum]) countMap[sum] = 1;
    else countMap[sum]++;
};
function encodeFlat(rest) {
    countMap = {};
    var dist = [];
    rest = Array_slice.call(rest);
    rest.forEach(mapCount);
    var max = 0, total = 0;
    for (var k in countMap) {
        var v = countMap[k];
        k = +k;
        if (k > max) max = k;
        if (v > max) max = v;
        total += k * v;
        dist.push(+k, v);
    }
    var t = 1;
    while (max >> t) t++;
    var buff = new Uint8Array(t * dist.length + total + 23 >> 3);
    buff[0] = dist.length >> 1;
    buff[1] = t;
    var offset = 16;
    while (dist.length > 0) {
        writeBinary(buff, offset, t, dist.pop());
        offset += t;
    }
    while (rest.length) {
        var s = rest.pop();
        writeBinary(buff, offset, s[1], s[0]);
        offset += s[1];
    }
    countMap = null;
    return buff;
}
var createHuffman = function (counts) {
    var rest = [];
    var counts = [].slice.call(counts);
    do {
        var a = counts.pop();
        var b = counts.pop();
        var p = [+a + +b];
        if (!a.length) rest.unshift([0, p]);
        else a[1] = p, a[0] = 0;
        if (!b.length) rest.unshift([1, p]);
        else b[1] = p, b[0] = 1;
        saveToOrderedArray(counts, p, (a, b) => a >= b);
    } while (counts.length > 1);

    rest = rest.map(a => {
        var sum = a[0];
        var i = 1;
        while (a[1] !== p) {
            a = a[1];
            sum |= a[0] << i++;
        }
        return [sum, i];
    });
    rest = rest.sort((a, b) => a[1] - b[1]);
    return rest;
};

function tohuff(buff, result = [], type_limit) {
    var a = new Uint32Array(type_limit);
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        a[buff[cx]]++;
    }
    var b = new Uint32Array(type_limit);
    for (var cx = 0, dx = b.length; cx < dx; cx++) {
        b[cx] = cx;
    }
    b.sort(function (m, n) {
        return a[n] - a[m];
    });
    var size = getIndexFromOrderedArray(b, 1, (m, n) => a[m] >= n, false);
    if (a[b[size]] > 0) size++;
    if (size + 1 > b.length) console.log(a.slice(420), buff.filter(a => a > 512), b.slice(420))

    var c = new Uint32Array(b.buffer, 0, size + 1).map(_ => a[_]);
    c = createHuffman(c);
    var d = new Uint32Array(type_limit);
    var f = [].slice.call(encodeFlat(c));
    c.forEach((s, i) => {
        if (type_limit > 258) {
            if (b[i] < 128) {
                f.push(b[i]);
            } else {
                f.push((b[i] >> 8) + 128, b[i] & 0xff);
            }
        } else {
            f.push(b[i]);
        }
        a[b[i]] = s[0];
        d[b[i]] = s[1];
    });
    if (type_limit > 258 && b[c.length - 1] >= 128) f.pop();
    f.pop();
    result.push.apply(result, f);
    var bitoffset = result.length * 8;
    buff.forEach(s => {
        writeBinary(result, bitoffset, d[s], a[s]);
        bitoffset += d[s];
    });
    var endflag = c[c.length - 1];
    writeBinary(result, bitoffset, endflag[1], endflag[0]);
    return bitoffset + endflag[1];
}

function pack(buff) {
    if (buff.length < 2) return buff;
    var byteoffset = 0;
    var samples = []; var count1 = 0, countp;
    var tempoffset = byteoffset;
    var result = [];
    var reset = function () {
        tempoffset = byteoffset;
        samples = [];
        count1 = 0;
        countp = samples.length;
    };
    do {
        var s = buff[tempoffset++];
        var sl = samples.length;
        saveToOrderedArray(samples, s);
        if (sl === samples.length && tempoffset < buff.length && tempoffset - byteoffset < 8192 << 12) {
            continue;
        }

        switch (samples.length) {
            case 1:
                if (tempoffset - byteoffset > 8) {
                    var f = repeat(buff, byteoffset);
                    result.push(f);
                    byteoffset = f.byteoffset;
                    reset();
                    break;
                }
            default:
                var length = tempoffset - byteoffset;
                if (tempoffset >= buff.length || length > 8192 << 12) {
                    var res = [];
                    var _buff = buff.slice(byteoffset, byteoffset + length);
                    var _buff1 = scan(_buff);
                    var huffman_type = repeat_huffman;
                    var type_limit = 516;
                    if (_buff.length <= _buff1.length) {
                        type_limit = 258;
                        huffman_type = normal_huffman;
                    } else {
                        _buff = _buff1;
                    }
                    tohuff(_buff, res, type_limit);
                    res[1] |= huffman_type << 5;
                    result.push(res);
                    byteoffset = tempoffset;
                    reset();
                }
        }
    } while (tempoffset < buff.length);
    result = concatTypedArray(result);
    return pack0(buff, result);
}