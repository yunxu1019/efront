var crypto = require("node:crypto");
async function calcPeHash(buffer, peInfo, pehandle) {
    const {
        certTableOffset,
        certTableSize,
        sections,
        certDirOffset,
        checksumOffset
    } = peInfo;
    var ranges = SliceRange(0, 0);
    sections.forEach(section => {
        ranges.add(section.start, section.start + section.size);
    });
    ranges.add(0, ranges[0][1]);
    ranges.delete(checksumOffset, checksumOffset + 4);
    ranges.delete(certDirOffset, certDirOffset + 8);
    if (certTableSize) ranges.delete(certTableOffset, certTableOffset + certTableSize);
    var method = 'sha256';
    if (typeof pehandle === 'string') method = pehandle, pehandle = null;
    const hash = crypto.createHash(method);
    for (var cx = 0, dx = ranges.length; cx < dx; cx++) {
        var [a, b] = ranges[cx];
        if (b > buffer.length) {
            ranges.delete(0, buffer.length);
            b = buffer.length;
            hash.update(buffer.subarray(a, b));
            break;
        }

        hash.update(buffer.subarray(a, b));
    }
    if (pehandle) {
        ranges.split(1 << 24);
        var buff = Buffer.alloc(1 << 24);
        for (var [m, n] of ranges) {
            await pehandle.read(buff, 0, n - m, m);
            hash.update(buff.subarray(0, n - m));
        }
    }
    return hash.digest();
}