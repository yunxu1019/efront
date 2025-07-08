function pack0(buff, result) {
    var length = buff.length;
    if (length < 8192 && result.length - length > 2) {
        result = concatTypedArray([
            [length >> 5, normal_nocode1 << 5 | length & 0x1f],
            buff
        ]);
    }
    else if (length < 8192 << 8 && result.length - length > 3) {
        result = concatTypedArray([
            [length >> 13, normal_nocode2 << 5 | length >> 8 & 0x1f, length & 0xff],
            buff
        ]);
    }
    else if (length < 8192 << 16 && result.length - length > 4) {
        result = concatTypedArray([
            [length >> 21, normal_nocode3 << 5 | length >> 16 & 0x1f, length >> 8 & 0xff, length & 0xff],
            buff
        ]);
    }
    return result;
}
