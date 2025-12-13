var fs = require("fs");
var path = require("path");
var crypto = require("node:crypto");
import { SEQUENCE, SET, sequence, bitString, oid, specific, octetString, set, Null, OID, CONTEXT_SPECIFIC, NULL, OCTETSTRING } from "../basic/ASN_1";
var privateKey = await getCert('H:\\丰县白前软件工作室\\不枝雀-key.pem');
var publicKey = await getCert('H:\\丰县白前软件工作室\\不枝雀-pub.pem');
var bcert = await getCert('H:\\丰县白前软件工作室\\不枝雀-cert.pem');
// var qqexe = fs.readFileSync(path.join(__dirname, "pe-sign_qq.exe"));
function findWithOid(data, oid) {
    if (data.type === OID && data.value === oid) {
        return data;
    }
    if (data instanceof Array) {
        for (var cx = 0, dx = data.length; cx < dx; cx++) {
            var d = data[cx];
            var a = findWithOid(d, oid);
            if (a) {
                if (a.type === OID && a === d) {
                    var b = data[cx + 1];
                    if (!b || b.type === NULL) {
                        return data;
                    }
                    return b;
                }
                var c = a.children;
                if (c?.length && c[0].type === OID && c[0].value === oid) {
                    return data[cx + 1];
                }
                return a;
            }
        }
        return;
    }
    if (data.children) {
        var found = findWithOid(data.children, oid);
        return found === data.children ? data : found;
    }
}
function peCert(exe, info) {
    var cert = exe.subarray(info.certTableOffset, info.certTableOffset + info.certTableSize);
    var wVersion = cert.readUInt16LE(4);
    var wType = cert.readUInt16LE(6);
    var dwLength = cert.readUint32LE(0);
    var bDer = cert.subarray(8, dwLength);
    var cert = decodeASN1(bDer);
    cert.wVersion = wVersion;
    cert.wType = wType;
    cert.dwLength = dwLength;
    return cert;
}
function showCert(certObj, distname = 'pe-sign_temp.js') {
    var valueComment = {
        "2.16.840.1.101.3.4.2.1": "rsa-sha256 oid",
        "1.2.840.113549.1.1.1": "rsaEncryption（RSA 加密算法）的标准 OID",
        "1.2.840.113549.1.7.2": "已签名数据，用于数字签名验证（如 Authenticode）",
        "1.2.840.113549.1.1.11": "rsa-sha256 oid",
        "1.2.840.113549.1.1.12": "是 sha384WithRSAEncryption（SHA-384 与 RSA 加密）的标准 OID",
        "1.2.840.113549.1.9.3": "contentType（内容类型）的标准 OID",
        "1.2.840.113549.1.9.4": "messageDigest（消息摘要）的标准 OID",
        "1.3.14.3.2.26": "SHA-1",
        "1.3.6.1.4.1.311.2.1.4": "微软软件发布 (SPC) 代码签名扩展，用于标识 SignedData 的内容类型",
        "1.3.6.1.4.1.311.2.1.11": "在 Authenticode 签名上下文中，用于标识软件发布语句类型（statement types），如个体代码签名或商业代码签名",
        "1.3.6.1.4.1.311.2.1.12": "在数字签名中嵌入软件发布者或签名者的可读元数据，帮助验证信任链和归属",
        "1.3.6.1.4.1.311.2.1.15": "在 PKCS #7 (CMS) 签名数据结构中标识已签名的 PE 映像数据",
        "1.3.6.1.4.1.311.2.1.21": "标识扩展密钥用法 (EKU) 用于个人软件发布者代码签名证书",
        "2.5.4.3": "是 commonName（简称 CN）的标准 OID",
        "2.5.4.6": "countryName",
        "2.5.4.10": "organizationName",
        "2.5.4.11": "organizationalUnitName（简称 OU）的标准 OID",
    }

    fs.writeFileSync(path.join(__dirname, distname), certObj.toString(valueComment))
}
function getPublicKeyFromCertsList(certs, signerId) {
    for (var cert of certs) {
        var certId = cert.children[0].children[1].value;
        if (certId === signerId) {
            return cert.children[0].children[6];
        }
    }
}
function calcAuthencatedHash(buff, method) {
    buff = Buffer.concat([buff]);
    buff[0] = 0x31;
    return crypto.createHash(method).update(buff).digest();
}
function calcContentInfoHash(buff, method) {
    // buff = buff.slice(2);
    return crypto.createHash(method).update(buff).digest();
}
var der2pem = function (der) {
    return `-----BEGIN PUBLIC KEY-----\n${Buffer.from(der).toString('base64').replace(/.{64}/g, "$&\n")}\n-----END PUBLIC KEY-----\n`;
};
// console.log(decodeASN1(publicKey.der).toString())
function testCalcPeHash(exe, peinfo = parsePE(exe), writeTimeStamp) {
    var cert = peCert(exe, peinfo);
    var sha1oid = "1.3.14.3.2.26";
    var sha256oid = '2.16.840.1.101.3.4.2.1';
    var [version, digestAlgorithms, contentInfo, certificates, signerInfos] = cert.children[1].children[0].children;
    var contentSha1 = findWithOid(contentInfo, sha1oid);
    var contentInfo_content = findWithOid(contentInfo, "1.3.6.1.4.1.311.2.1.4").children[0];
    var signerId = signerInfos.children[0].children[1].children[1].value;
    var signerPublicKey = getPublicKeyFromCertsList(certificates.children, signerId);
    var signerPublicDer = encodeASN1(signerPublicKey);
    assert(signerPublicKey.buff.toString('hex'), Buffer.from(signerPublicDer).toString('hex'));
    assert(signerPublicKey.buff.toString('hex'), publicKey.der.toString('hex'));
    var signerInfo_encryptedDigest = findWithOid(signerInfos, '1.2.840.113549.1.1.1');
    // console.log("signerInfo_encryptedDigest:\r\n", signerInfo_encryptedDigest);
    var decryptedDigest = decodeASN1(crypto.publicDecrypt({
        key: der2pem(signerPublicKey.buff),
        padding: crypto.constants.RSA_PKCS1_PADDING
    }, signerInfo_encryptedDigest.data));
    // console.log("decryptedDigest=decrypt(signerInfo.encryptedDigest):\r\n", decryptedDigest.toString());
    function assertStamp() {
        var stamp = decodeASN1(signerInfos.children[0].children[6].data);
        var [oid, content] = stamp.children;
        assert(oid.value, '1.2.840.113549.1.9.6');
        var counterSigner = content.children[0];
        var counterId = counterSigner.children[1].children[1].value;
        var counterPublicKey = getPublicKeyFromCertsList(certificates.children, counterId);
        var counterPublicDer = encodeASN1(counterPublicKey);
        var cryptedCounterDigest = counterSigner.children[5];
        var decryptedCounterDigest = decodeASN1(crypto.publicDecrypt({
            key: der2pem(counterPublicDer)
        }, cryptedCounterDigest.data));
        var counterInfo = counterSigner.children[3];
        var counterInfoSha1 = calcAuthencatedHash(counterInfo.buff, 'sha256');
        assert(Buffer.from(decryptedCounterDigest.children[1].value).toString('hex'), counterInfoSha1.toString('hex'), 'counterInfo内容对比解密后的哈希');
        var counterInfo_signerSha = Buffer.from(findWithOid(counterInfo, '1.2.840.113549.1.9.4').children[0].value);
        var signerInfo_digestSha = calcContentInfoHash(signerInfo_encryptedDigest.data, 'sha256');
        assert(signerInfo_digestSha.toString('hex'), counterInfo_signerSha.toString('hex'), 'cryptedDigest对比counterInfo中的哈希');
    }
    assertStamp();
    async function assertContent(sha_oid, shav) {
        let decryptedSha = findWithOid(decryptedDigest, sha_oid).data;
        console.log(`decryptedSha${shav}:\r\n    `, decryptedSha);
        let authenticatedAttributes = findWithOid(signerInfos, sha_oid);
        let authenticatedHash = calcAuthencatedHash(authenticatedAttributes.buff, 'sha' + shav);
        console.log(`authenticatedSha${shav}:\r\n    `, authenticatedHash);
        assert(authenticatedHash.toString('hex'), decryptedSha.toString('hex'));
        var messageDigest = findWithOid(authenticatedAttributes, '1.2.840.113549.1.9.4');
        let contentHash = messageDigest.children[0].data;

        // console.log("contentInfo.content:\r\n    ", contentInfo_content);
        let contentSha = calcContentInfoHash(contentInfo_content.data, 'sha' + shav);
        console.log(`sha${shav}(contentInfo.content):\r\n    `, contentSha);
        console.log("authenticatedAttributes.contentHash:\r\n    ", contentHash);
        assert(contentSha.toString('hex'), contentHash.toString('hex'));
        let pehash = await calcPeHash(exe, peinfo, 'SHA' + shav);
        let contentInfo_fileHash = findWithOid(contentInfo, sha_oid).data;
        console.log(`Sha${shav}(dataInFile):\r\n    `, pehash);
        console.log("contentInfo.content.fileHash:\r\n    ", contentInfo_fileHash);
        assert(pehash.toString('hex'), contentInfo_fileHash.toString('hex'));
    }
    if (contentSha1) {
        assertContent(sha1oid, 1);
    }

    var contentSha256 = findWithOid(contentInfo, "2.16.840.1.101.3.4.2.1");
    if (contentSha256) {
        assertContent(sha256oid, 256);
    }
    var timeStamp = signerInfos.children[0].children[6];
    if (writeTimeStamp) fs.writeFileSync(path.join(__dirname, 'pe-sign_stamp_temp.js'), decodeASN1(timeStamp.data).toString());
    // console.log(timeStamp, decodeASN1(timeStamp.data).toString());
}
async function test() {
    var qqexe = fs.readFileSync(path.join(__dirname, "pe-sign_temp.scr"));
    var qqinfo = parsePE(qqexe);
    testCalcPeHash(qqexe, qqinfo, true);
    var xxexe = fs.readFileSync("C:\\Program Files\\packexe_temp\\卸载.scr");
    console.log(xxexe.length, qqexe.length)
    assert((xxexe), qqexe);
    testCalcPeHash(xxexe);
    // showCert(peCert(qqexe, qqinfo));
    // showCert(decodeASN1(bcert.der), "pe-sign_cert_temp.js");
    var pe = await peSign(qqexe, privateKey, bcert);
    fs.writeFileSync(path.join(__dirname, 'pe-sign_temp.exe'), pe);
    testCalcPeHash(pe, parsePE(pe));
}
return function (exe) {
    if (exe) return testCalcPeHash(exe);
    return test();
}
