var sort_index_of_A = function (m, n) {
    return A[n] - A[m];
};
var A, B, D;
var b2a = _ => A[_];
var isLE = (m, n) => A[m] >= n;
var c2ad2 = (s, i) => {
    if (B[i] < 128) {
        f.push(B[i]);
    } else {
        f.push((B[i] >> 8) + 128, B[i] & 0xff);
    }
    A[B[i]] = s[0];
    D[B[i]] = s[1];
};
var c2ad1 = (s, i) => {
    f.push(B[i]);
    A[B[i]] = s[0];
    D[B[i]] = s[1];
};
var writer = s => {
    writeBinary(result, bitoffset, D[s], A[s]);
    bitoffset += D[s];
};
var result, bitoffset;
var type_limit;
function tohuff(buff, res = [], type_limit) {
    result = res;
    var c2ad = type_limit > 258 ? c2ad1 : c2ad2;
    A = new Uint32Array(type_limit);
    for (var cx = 0, dx = buff.length; cx < dx; cx++) {
        A[buff[cx]]++;
    }
    B = new Uint32Array(type_limit);
    for (var cx = 0, dx = B.length; cx < dx; cx++) {
        B[cx] = cx;
    }
    B.sort(sort_index_of_A);
    var size = getIndexFromOrderedArray(B, 1, isLE, false);
    if (A[B[size]] > 0) size++;
    if (size + 1 > B.length) console.log(A.slice(420), buff.filter(a => a > 512), B.slice(420))

    var C = new Uint32Array(B.buffer, 0, size + 1).map(b2a);
    C = createHuffman(C);
    var D = new Uint32Array(type_limit);
    var f = [].slice.call(encodeFlat(C));
    C.forEach(c2ad);
    if (type_limit > 258 && B[C.length - 1] >= 128) f.pop();
    f.pop();
    result.push.apply(result, f);
    bitoffset = result.length * 8;
    buff.forEach(writer);
    var endflag = C[C.length - 1];
    writeBinary(result, bitoffset, endflag[1], endflag[0]);
    result = null;
    return bitoffset + endflag[1];
}