async function updateChecksum(pehead, peInfo, pehandle) {
    const { checksumOffset, certTableOffset, certTableSize } = peInfo;
    let sum = 0;
    pehead.writeUInt32LE(0, checksumOffset);
    var readOffset = pehead.length & 0xfffffffe;
    var fixsum = () => {
        if (sum > 0xFFFF) sum = (sum & 0xFFFF) + (sum >>> 16);
    };
    var addsum = function (piece, to = piece.length) {
        for (var cx = 0, dx = to & 0xfffffffe; cx < dx; cx += 2) {
            sum += piece.readUInt16LE(cx);
            fixsum();
        }
        if (dx < to) sum += piece[dx];
    };
    if (!pehandle) {
        addsum(pehead);
    }
    else {
        addsum(pehead, readOffset);
        var pedata = Buffer.alloc(1 << 24);
        var ranges = new SliceRange(readOffset, certTableOffset + certTableSize);
        ranges.split(1 << 24);
        for (var [m, n] of ranges) {
            await pehandle.read(pedata, 0, n - m, m);
            addsum(pedata.subarray(0, n - m));
        }
    }
    fixsum();
    const checksum = sum + pehead.length;
    pehead.writeUInt32LE(checksum, checksumOffset);
    return checksum;
}