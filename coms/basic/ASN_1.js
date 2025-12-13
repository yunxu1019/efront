exports = ASN1;
export const
    UNIVERSAL = 0x00,
    APPLICATION = 0x40,
    CONTEXT_SPECIFIC = 0x80,
    PRIVATE = 0xC0;
export const
    NONE = 0,
    BOOLEAN = 1,
    INTEGER = 2,
    BITSTRING = 3,
    OCTETSTRING = 4,
    NULL = 5,
    OID = 6,
    ODESC = 7,
    EXTERNAL = 8,
    REAL = 9,
    ENUMERATED = 10,
    EMBEDDED = 11,
    UTF8 = 12,
    ROID = 13,
    SEQUENCE = 16,
    SET = 17,
    PRINTABLESTRING = 19,
    IA5STRING = 22,
    UTCTIME = 23,
    GENERALIZEDTIME = 24,
    BMPSTRING = 30;
export const CONSTRUCTED = 0x20;
export var Null = ASN1(NULL);
export var integer = function (value) {
    if (value.length) return ASN1(INTEGER, value);
    if (value == 0) return ASN1(INTEGER, [0]);
    let bytes = [];
    let isNegative = value < 0;
    if (typeof value === 'bigint') {
        if (isNegative) value = -value + 1n;
        while (value > 0) {
            bytes.push(Number(value & BigInt(0xff)));
            value >>= BigInt(8);
        }
    }
    else {
        if (isNegative) value = -value + 1;
        while (value > 0) {
            bytes.push(value & 0xff);
            value >>= 8;
        }
    }
    if ((bytes[0] & 0x80) !== 0 && !isNegative) bytes.push(0x00);  // 正数 MSB 0
    if ((bytes[0] & 0x7f) === 0 && isNegative) bytes.push(0xff);  // 负数 MSB 1
    bytes.reverse();
    return ASN1(INTEGER, bytes);
};
export var boolean, bool = boolean = function (v) {
    return ASN1(BOOLEAN, [v ? 0xff : 0]);
};
export var True = bool(true);
export var False = bool(false);
export var bitString = function (bytes) {
    return ASN1(BITSTRING, bytes);
};
export var octetString = ASN1.octet = function (bytes) {
    return ASN1(OCTETSTRING, bytes);
};
export var oid = function () {
    var [oid] = arguments;
    if (typeof oid === 'string') oid = oid.split('.').map(a => +a);
    if (typeof oid === 'number') oid = Array.prototype.slice.call(arguments, 0, arguments.length);
    var first = 40 * oid[0] + oid[1];
    oid = [first].concat(oid.slice(2));
    var bytes = [OID];
    for (var arc of oid) {
        if (arc === 0) {
            bytes.push([0]);
            continue;
        };
        var bts = [];
        while (arc > 0) {
            bts.push(arc % 128);
            arc = Math.floor(arc / 128);
        }
        bts.reverse();
        for (let i = 0; i < bts.length - 1; i++) {
            bts[i] |= 128;
        }
        bytes.push(bts);
    }
    return ASN1.apply(null, bytes);
};
export var utf8 = function (string) {
    if (typeof string === 'string') string = encodeUTF8(string);
    return ASN1(UTF8, string);
};
export var printable = function (string) {
    if (typeof string === 'string') string = encodeUTF8(string);
    return ASN1(PRINTABLESTRING, string);
};
var getTime = function (value) {
    if (typeof value === "number" || /^\d+[\/\\\-]/i.test(value)) value = new Date(value);
    if (value instanceof Date) {
        var n = n => n < 10 ? '0' + n : n;
        value = [
            value.getUTCFullYear(),
            value.getUTCMonth() + 1,
            value.getUTCDate(),
            value.getUTCHours(),
            value.getUTCMinutes(),
            value.getUTCSeconds()
        ].map(n).join("") + "Z";
    }
    return value;
}
export var generaltime, time = generaltime = function (value) {
    value = getTime(value);
    return ASN1(GENERALIZEDTIME, encodeUTF8(value));
};
export var utctime = function (value) {
    // yyMMddhhmmssZ
    value = getTime(value).slice(-13);
    return ASN1(UTCTIME, encodeUTF8(value));
}
export var set = function (...bytes) {
    return ASN1(SET | CONSTRUCTED, ...bytes);
}
export var sequence = function (...bytes) {
    return ASN1(SEQUENCE | CONSTRUCTED, ...bytes);
}
export var specific = function (...bytes) {
    return ASN1(CONTEXT_SPECIFIC | CONSTRUCTED, ...bytes);
}