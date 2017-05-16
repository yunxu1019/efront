function lz77d(source, params) {
    var
        decompressed = '',
        pos = 0,
        currentChar, nextChar, distance, length;

    setup(params);
    while (pos < source.length) {
        currentChar = source.charAt(pos);
        if (currentChar !== settings.refPrefix) {
            decompressed += currentChar;
            pos++;
        } else {
            nextChar = source.charAt(pos + 1);
            if (nextChar !== settings.refPrefix) {
                distance = decodeRefInt(source.substr(pos + 1, 2), 2);
                length = decodeRefLength(source.charAt(pos + 3));
                decompressed += decompressed.substr(decompressed.length - distance - length, length);
                pos += settings.minStringLength - 1;
            } else {
                decompressed += settings.refPrefix;
                pos += 2;
            }
        }
    }
    return decompressed;

}