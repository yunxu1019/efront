var encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

var decodeMap = function () {
    var map = {};
    for (var cx = 0, dx = encoding.length; cx < dx; cx++) {
        map[encoding[cx]] = cx;
    }
    return map;
}();
function fromBase64(input) {
    input = String(input).replace(/\=+$/, '');
    var output = [];
    for (var cx = 0, dx = input.length; cx < dx;) {
        var block = decodeMap[input.charAt(cx++)] << 18 | decodeMap[input.charAt(cx++)] << 12 | decodeMap[input.charAt(cx++)] << 6 | decodeMap[input.charAt(cx++)];
        output.push(block >> 16, block >> 8 & 0xff, block & 0xff);
    }
    cx -= dx;
    if (cx > 1) output.pop();
    if (cx > 0) output.pop();
    return output;
}