function bitTest(mask, sample, value) {
    return (value & mask) === sample;
}
function xto0(x) {
    return 1 - /^x$/i.test(x);
}

function parseNumber(str) {
    var s = 10;
    if (!isString(str)) return str;
    switch (str.slice(0, 2).toLowerCase()) {
        case "0x":
            s = 16;
            break;
        case "0o":
            s = 8;
            break;
        case "0b":
            s = 2;
            break;
        default:
            return parseFloat(str);
    }
    str = str.slice(2);
    if (/x/i.test(str)) {
        return bitTest.bind(null,
            parseInt(str.replace(/[\s\S]/g, xto0), 2),
            parseInt(str.replace(/x/g, '0'), 2)
        );
    }
    return parseInt(str, s);
}
