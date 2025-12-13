var ASN1 = function (tag) { // tag=tagClass|type|composed_flag
    var length = 0;
    var bytesarr = [];
    for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
        var bytes = arguments[cx];
        if (bytes.constructor !== Array) {
            bytes = Array.apply(null, bytes);
        }
        bytesarr.push(bytes);
        length += bytes.length;
    }
    var asn1 = [tag];
    if (length > 127) {
        var nums = [];
        while (length > 0) {
            nums.unshift(length & 0xff);
            length = length >>> 8;
        }
        asn1.push(0x80 | nums.length, ...nums);
    }
    else {
        asn1.push(length);
    }
    asn1 = asn1.concat(...bytesarr);
    return asn1;
};