function readLEB128(buff, offset) {
    var temp = 0, delta = 0;
    for (var cx = offset, dx = buff.length; cx < dx; cx++) {
        var b = buff[cx];
        temp = temp + ((b & 0x7f) << delta)
        if (b >> 7) {
            delta += 7;
            continue;
        }
        cx++;
        break;
    }
    return [temp, cx];
}