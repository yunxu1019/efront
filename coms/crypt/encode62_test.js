"use strict";
// 中文编码 utf-8
var test = function (string) {
    var packed = encode62.packencode(string);
    var unpacked = encode62.packdecode(packed);
    assert(string, unpacked);
}

test('adsfa');
test('a');
test('');