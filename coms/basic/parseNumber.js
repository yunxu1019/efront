var isString = require("./isString");
function bitTest(mask, sample, value) {
    return (value & mask) === sample;
}
function xto0(x) {
    return 1 - /^x$/i.test(x);
}

function parseNumber(str) {
    var s = 10;
    str = str.replace(/\_/g, '');
    if (!isString(str)) return str;
    var num = str.replace(/^[\+\-]+/, '');
    var neg = str.slice(0, str.length - num.length).replace(/\+/g, '').length & 1;
    if (neg) neg = "-";
    else neg = '';
    switch (num.slice(0, 2).toLowerCase()) {
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
            return parseFloat(neg + num);
    }
    num = num.slice(2).replace(/\_/g, '');
    if (/x/i.test(num)) {
        return bitTest.bind(null,
            parseInt(neg + num.replace(/[\s\S]/g, xto0), 2),
            parseInt(neg + num.replace(/x/g, '0'), 2)
        );
    }
    return parseInt(neg + num, s);
}
module.exports = parseNumber