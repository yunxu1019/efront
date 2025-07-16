var pow = Math.pow;
var min = Math.min;
function decodeLEB128(buff) {
    var dist = [];
    var temp = 0, delta = 0;
    var blength = buff.length;
    for (var cx = 0, dx = min(4, blength); cx < dx; cx++) {
        var b = buff[cx];
        temp = temp + ((b & 0x7f) << delta);
        if (b >> 7) {
            delta += 7;
            continue;
        }
        dist.push(temp);
        temp = 0;
        delta = 0;
    }
    for (var cx = 4, dx = blength; cx < dx; cx++) {
        var b = buff[cx];
        temp = temp + (b & 0x7f) * pow(2, delta)
        if (b >> 7) {
            delta += 7;
            continue;
        }
        dist.push(temp);
        temp = 0;
        delta = 0;
    }
    return dist;
}
module.exports = decodeLEB128;