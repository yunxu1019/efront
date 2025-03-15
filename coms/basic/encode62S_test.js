var test = function (string) {
    var encoded = encode62S(string);
    var decoded = decode62S(encoded);
    var res = assert(decoded, string);
    if (!res) throw new Error("string:" + string + " code:" + string.codePointAt(0) + " packed:" + encoded);
};
test('aa')
test('abc')
test('aabc')
test('zaabc')
test('Azaabc')
test('aZ')
test('您好');
test('😊✔️🛡️⬇️');
for (var cx = 0, dx = 0x10ffff; cx < dx; cx++) {
    test(String.fromCodePoint(cx))
    test(String.fromCodePoint(cx) + String.fromCodePoint(cx))
}