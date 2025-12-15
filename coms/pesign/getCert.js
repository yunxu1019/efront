var fsp = require("fs").promises;
var crypto = require("node:crypto");
import { CONTEXT_SPECIFIC, OID, CONSTRUCTED, INTEGER } from "../basic/ASN_1";
// 主函数：从 X.509 证书 DER Buffer 解析 SerialNumber (返回 BigInt)
function getSerialFromCert(certObj) {
    var [, serial] = certObj.children[0].children;
    return serial.value;
};


// 主函数：从证书 DER 解析 Issuer CN (返回字符串)
function getIssuerCnFromCert(certObj) {
    var [, , , cn] = certObj.children[0].children;
    var [oid, value] = cn.children[0].children[0].children;
    if (oid.type !== OID || oid.value !== "2.5.4.3") return;
    return value.value;
}

var isCert = function (obj) {
    if (obj?.tag !== 0x30) return false;
    obj = obj.children[0];
    if (obj.tag !== 0x30) return false;
    obj = obj.children[0];
    if (obj.tag !== (CONTEXT_SPECIFIC | CONSTRUCTED)) return false;
    obj = obj.children[0];
    if (obj.tag !== INTEGER) return false;
    return obj.value;
}
async function getCert(path) {
    // 只支持PKCS#8 DER/PEM格式私钥
    var key = await fsp.readFile(path);
    var der;
    var obj = {};
    if (/\-\s*BEGIN\s+[\w\s]+\s*\-/i.test(key)) {
        for (var r of String(key).split(/\r\n|\r|\n/)) {
            if (/^\s*\-+/.test(r)) break;
            var i = r.indexOf(":");
            if (i < 0) i = r.indexOf("=");
            if (i < 0) continue;
            var k = r.slice(0, i);
            var v = r.slice(i + 1);
            v = strings.kicode(v);
            k = k.trim();
            obj[k] = v;
        }
        key = /\-+\s*BEGIN\s+([\w\s]+?)\s*\-+([\s\S]*?)\-+\s*END\s+(\1)\s*\-+/i.exec(key);
        if (!key) throw new Error('私钥结构异常！');
        der = Buffer.from(key[2].replace(/\r\n|\r|\n/g, ''), "base64");
        var certObj = decodeASN1(der);
        var iscert = isCert(certObj);
        key = key[0].replace(/\r\n|\r|\n/g, '\n') + "\n";
    }
    else {
        der = key;
        var certObj = decodeASN1(der);
        var iscert = isCert(certObj);
        var dername = iscert ? 'CERTIFICATE' : 'PRIVATE KEY';
        key = [
            `-----BEGIN ${dername}-----`,
            key.toString('base64').replace(/.{64}/g, '$&\n'),
            `-----END ${dername}-----`, ''
        ].join('\n');
    }
    if (iscert) {
        obj.issuerCn = getIssuerCnFromCert(certObj);
        obj.serial = getSerialFromCert(certObj);
    }
    obj.key = key;
    obj.der = der;
    obj.padding = crypto.constants.RSA_PKCS1_PADDING;
    return obj;
}
