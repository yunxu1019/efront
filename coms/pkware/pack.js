function pack(buff) {
    if (buff.length < 2) return buff;
    var byteoffset = 0;
    var samples = []; var count1 = 0, countp;
    var tempoffset = byteoffset;
    var result = [];
    var reset = function () {
        tempoffset = byteoffset;
        samples = [];
        count1 = 0;
        countp = samples.length;
    };
    do {
        var s = buff[tempoffset++];
        var sl = samples.length;
        saveToOrderedArray(samples, s);
        if (sl === samples.length && tempoffset < buff.length && tempoffset - byteoffset < 8192 << 12) {
            continue;
        }

        switch (samples.length) {
            case 1:
                if (tempoffset - byteoffset > 8) {
                    var f = repeat(buff, byteoffset);
                    result.push(f);
                    byteoffset = f.byteoffset;
                    reset();
                    break;
                }
            default:
                var length = tempoffset - byteoffset;
                if (tempoffset >= buff.length || length > 8192 << 12) {
                    var res = [];
                    var _buff = buff.slice(byteoffset, byteoffset + length);
                    var _buff1 = scan(_buff);
                    var huffman_type = repeat_huffman;
                    var type_limit = 516;
                    if (_buff.length <= _buff1.length) {
                        type_limit = 258;
                        huffman_type = normal_huffman;
                    } else {
                        _buff = _buff1;
                    }
                    tohuff(_buff, res, type_limit);
                    res[1] |= huffman_type << 5;
                    result.push(res);
                    byteoffset = tempoffset;
                    reset();
                }
        }
    } while (tempoffset < buff.length);
    result = concatTypedArray(result);
    return pack0(buff, result);
}