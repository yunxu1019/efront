var BigInt = this.BigInt;
function int(b) {
    var Num = BigInt ? BigInt : Number;
    var a = b;
    var s = Num(0);
    var isNeg = a[0] & 0x80;
    if (isNeg) {
        if (a[0] === 0xff) a = a.slice(1);
    }
    for (var cx = 0, dx = a.length; cx < dx; cx++) {
        s = s * Num(256) + Num(a[cx]);
    }
    if (s > 0x1fffffffffffff && !BigInt) {
        return b;
        // throw new Error('数值精度超出限制！');
    }
    if (s < 0x1fffffffffffff && BigInt) s = Number(s);
    if (isNeg) s = -s;
    return s;
}

function oid(a) {
    var d = [];
    for (var cx = 0, dx = a.length; cx < dx;) {
        var n = 0;
        do {
            var b = a[cx++];
            n = n * 128 + (b & 0x7f);
        } while (b & 0x80);
        d.push(n);
    }
    var n = d[0];
    d.splice(0, 1, n / 40 | 0, n % 40);
    return d.join('.');
}

var typeNames = [
    'NONE',
    'BOOLEAN',
    'INTEGER',
    'BITSTRING',
    'OCTETSTRING',
    'NULL',
    'OID',
    'ODESC',
    'EXTERNAL',
    'REAL',
    'ENUMERATED',
    'EMBEDDED',
    'UTF8',
    'ROID',
    '14',
    '15',
    'SEQUENCE',
    'SET',
    'NUMERICSTRING',
    'PRINTABLESTRING',
    'TELETEXSTRING',
    'VIDEOTEXSTRING',
    'IASSTRING',
    'UTCTIME',
    'GENERALIZEDTIME',
    'GRAPHICSTRING',
    'VISIBLESTRING',
    'GENERALSTRING',
    'UNIVERSALSTRING',
    'CHARACTERSTRING',
    'BMPSTRING',
    '31',
];
var classNames = [
    'UNIVERSAL',
    "APPLICATION",
    "CONTEXT_SPECIFIC",
    "PRIVATE"
];
var typeMap = {
    "octet": "octetString",
    "bit": "bitString",
    "generalizedtime": "time",
    "boolean": 'bool',
};
var { SEQUENCE, SET, CONTEXT_SPECIFIC } = ASN_1;
var stringify = function (obj, deep = 1) {
    var deep1 = deep + 1;
    var space1 = Array(deep1).join("    ");
    var space = Array(deep).join("    ");
    if (obj instanceof Array) {
        var a = [];
        for (var o of obj) {
            var d = stringify(o, deep1);
            a.push(d);
        }
        return a.join(",\r\n" + space1);
    }
    if (!obj) return;
    var a = obj.tagName.toLowerCase().split('|').map(a => a.trim());
    var iscollect = obj.type === SEQUENCE || obj.type === SET || !obj.type && obj.class === CONTEXT_SPECIFIC;
    var n = a.filter(a => a != "constructed").map(a => a.split("_").pop()).join("_");
    if (iscollect && !obj.constructed) n += "_noconstruct";
    if (!iscollect && obj.constructed) n += "_constructed";
    if (n === 'null') return `Null`;
    if (obj.children) {
        if (obj.children.length) return `${n}(// ${deep}, ${obj.length}\r\n${space1}${stringify(obj.children, deep)}\r\n${space})`;
        return `${n}()`;
    }
    var value = obj.value !== obj.data ? obj.value : `[${Array.prototype.slice.call(obj.data, 0, obj.data.length).join(', ')}]`;
    var comment = '';
    if (typeof value === 'bigint') value = value > 0x1fffffffffffff || value < -0x1fffffffffffff ? String(value) + "n" : value;
    else if (obj.value !== obj.data) {
        if (value in valueComment) comment = valueComment[value];
        value = JSON.stringify(value);
    }
    if (!/_/.test(n)) n = n.replace(/string$/i, ''), n = typeMap[n] || n;
    if (n in ASN_1) var res = `${n}(${value})`;
    else res = `ASN1(${obj.tagName}, ${value})`;
    if (comment) res = `/* ${comment} */\r\n${space}` + res;
    return res;
}
var valueComment = {};
class Asn1Object {
    toString(comment) {
        var _comment = valueComment;
        if (typeof comment === "object" && comment !== null) valueComment = comment;
        var res = stringify(this, this.deep || 1);
        valueComment = _comment;
        return res;
    }
}
function decodeASN1(buff, deep = 0) {
    var parsed = [];
    deep++;
    for (var index = 0, cx = 0, dx = buff.length; cx < dx; index++) {
        var bx = cx;
        var tag = buff[cx++];
        if (!tag) break;
        var length = buff[cx++];
        if (length >= 0x80) {
            var length = 0x7f & length;
            var num = 0;
            while (length > 0) {
                length--;
                var b = buff[cx++];
                num = (num << 8) + b;
            }
            length = num;
        }
        var data, value = data = buff.slice(cx, cx += length);
        var bf = buff.slice(bx, cx);
        var constructed = !!(0x20 & tag);
        var Class = tag & 0xc0;
        var className = classNames[Class >>> 6];
        var type = tag & 0x1f;
        var typeName = typeNames[type];
        var hasChildren = false;
        var showValue = false;
        switch (type) {
            case 0:// 保留给编码规则使用
                hasChildren = constructed;
                if (hasChildren) value = decodeASN1(value, deep);
                break;
            case 1:// 布尔类型
                showValue = !constructed;
                if (showValue) value = !!value[0];
                break;
            case 2:// 整型
                showValue = !constructed;
                if (showValue) value = int(value);
                break;
            case 5:// NULL
                showValue = !constructed;
                if (showValue) value = null;
                break;
            case 6:// oid
                showValue = !constructed;
                if (showValue) value = oid(value);
                break;
            case 12:// UTF8 字符串类型
                showValue = !constructed;
                if (showValue) value = decodeUTF8(value);
                break;
            case 16:// 序列和类型序列
                value = decodeASN1(value, deep);
                hasChildren = true;
                break;
            case 17:// 集合和类型的集合
                value = decodeASN1(value, deep);
                hasChildren = true;
                break;
            case 19: // 可打印字符串
                showValue = !constructed;
                if (showValue) value = decodeUTF8(value);
                break;
            case 23: // utc 时间 1950 - 2049
                showValue = !constructed;
                if (showValue) value = new Date(decodeUTF8(value).replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(Z|[\+\-]\d{4})$/, function (_, yy, MM, dd, hh, mm, ss, zone) {
                    yy = +yy;
                    if (yy < 50) yy += 100;
                    yy += 1900;
                    return `${yy}-${MM}-${dd}T${hh}:${mm}:${ss}${zone}`;
                }));
                break;
            case 24: // utc 时间 4位年份
                showValue = !constructed;
                if (showValue) value = new Date(decodeUTF8(value).replace(
                    /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2}(?:\.\d+)?)(Z|[\+\-]\d{4})$/,
                    "$1-$2-$3T$4:$5:$6$7"
                ));
                break;
        }

        var obj = new Asn1Object(...{
            tag,
            tagName: [
                Class ? className : '',
                type ? typeName : '',
                constructed ? 'CONSTRUCTED' : ''
            ].filter(a => !!a).join(" | "),
            type, typeName,
            length,
            constructed,
            deep,
            buff: bf,
            index,
            class: Class, className,
            data, value
        });
        if (hasChildren) obj.children = value;
        for (var k in obj) {
            if (!/^(tag|index|deep|value|children|length)/.test(k) || k === "deep" && !hasChildren || k === "value" && !showValue) {
                Object.defineProperty(obj, k, { value: obj[k], enumerable: false });
            }
        }
        parsed.push(obj);
    }
    return parsed;
}
function main(data) {
    return decodeASN1(data)[0];
}