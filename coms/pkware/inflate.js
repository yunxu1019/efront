"use ../third-party/inflate.js";
var inflate = function (arr) {
    var dist = [];
    var i;
    inflate_start();
    inflate_data = arr;
    inflate_pos = 0;
    do {
        var buff = [];
        dist.push(buff);
        i = inflate_internal(buff, buff.length, 1024);
    } while (i > 0);
    inflate_data = null;
    slide = null;
    return concatTypedArray(dist);
}