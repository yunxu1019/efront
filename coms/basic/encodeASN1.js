import {
    BOOLEAN,
    bool,
    INTEGER,
    integer,
    UTCTIME,
    utctime,
    UTF8,
    utf8,
    PRINTABLESTRING,
    printable,
    NULL,
    Null,
    OID,
    oid,
    GENERALIZEDTIME,
    time
} from "./ASN_1";
// 将由decodeASN1生成的结构重新编码成二进制数据
function encodeASN1(object) {
    var { type, data, class: class1, constructed, value } = object;
    var tag = object.tag || type | class1 | constructed;
    if (object.children) {
        if (constructed === undefined) constructed = true;
        data = object.children.map(encodeASN1);
        return ASN1(tag, ...data);
    }
    else if (value !== undefined) {
        switch (type) {
            case BOOLEAN: data = bool(value); break;
            case INTEGER: data = integer(value); break;
            case OID: data = oid(value); break;
            case UTCTIME: data = utctime(value); break;
            case GENERALIZEDTIME: data = time(value); break;
            case UTF8: data = utf8(value); break;
            case NULL: data = Null; break;
            case PRINTABLESTRING: data = printable(value); break;
            default: data = ASN1(tag, data);
        }
    }
    else {
        data = ASN1(tag, data);
    }
    return data;
}