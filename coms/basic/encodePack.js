var getIndexFromOrderedArray = require("./getIndexFromOrderedArray");
var saveToOrderedArray = require("./saveToOrderedArray");
var writeBinary = require("./writeBinary");
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

function encodeFlat(rest) {
    var countMap = {};
    var dist = [];
    rest = [].slice.call(rest);
    rest.forEach(sum => {
        sum = sum[1];
        if (!countMap[sum]) countMap[sum] = 1;
        else countMap[sum]++;
    });
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
    buff[0] = rest.length - 1;
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
    return buff;
}
function scan(buff) {
    if (buff.length < 2) return buff;
    var a = new Uint32Array(256);
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        a[buff[cx]]++;
    }
    var b = new Uint32Array(256);
    for (var cx = 0, dx = b.length; cx < dx; cx++) {
        b[cx] = cx;
    }
    b.sort(function (m, n) {
        return a[n] - a[m];
    });
    var size = getIndexFromOrderedArray(b, 1, (m, n) => a[m] >= n);
    if (a[b[size]] > 0) size++;
    var c = new Uint32Array(b.buffer, 0, size + 1).map(_ => a[_]);
    c = createHuffman(c);
    var d = new Uint32Array(256);
    var f = [].slice.call(encodeFlat(c));
    c.forEach((s, i) => {
        f.push(b[i]);
        a[b[i]] = s[0];
        d[b[i]] = s[1];
    });
    f.pop();
    var bitoffset = f.length << 3;
    buff.forEach(s => {
        writeBinary(f, bitoffset, d[s], a[s]);
        bitoffset += d[s];
    });
    var endflag = c[c.length - 1];
    writeBinary(f, bitoffset, endflag[1], endflag[0]);
    return f;
}
module.exports = scan