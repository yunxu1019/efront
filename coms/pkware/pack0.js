function pack0(buff, result) {
    var blength = buff.length;
    var rlength = result.length;
    var dlength = rlength - blength;
    if (blength < 8192 && dlength > 2) {
        result = concatTypedArray([
            [blength >> 5, normal_nocode1 << 5 | blength & 0x1f],
            buff
        ]);
    }
    else if (blength < 8192 << 8 && dlength > 3) {
        result = concatTypedArray([
            [blength >> 13, normal_nocode2 << 5 | blength >> 8 & 0x1f, blength & 0xff],
            buff
        ]);
    }
    else if (blength < 8192 << 16 && dlength > 4) {
        result = concatTypedArray([
            [blength >> 21, normal_nocode3 << 5 | blength >> 16 & 0x1f, blength >> 8 & 0xff, blength & 0xff],
            buff
        ]);
    }
    return result;
}
