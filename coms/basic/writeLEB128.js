function writeLEB128(dist, offset, value) {
    var b = value;
    while (b > 127) {
        var t = b & 0x7f;
        dist[offset++] = t | 0b10000000;
        b = b >> 7;
    }
    dist[offset++] = b;
    return offset;
}