var encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

var decodeMap = function () {
    var map = {};
    for (var cx = 0, dx = encoding.length; cx < dx; cx++) {
        map[encoding[cx]] = cx;
    }
    return map;
}();
function fromBase64(input) {
    var str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
    for (
        // initialize result and counters
        var bc = 0, bs, buffer, idx = 0, output = [];
        // get next character
        buffer = str.charAt(idx++);
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer && (bs = bc % 4 ? (bs << 6) + buffer : buffer,
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4) ? output.push(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        // try to find character in table (0-63, not found => -1)
        buffer = decodeMap[buffer];
    }
    return output;
}