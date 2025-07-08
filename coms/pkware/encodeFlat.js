
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