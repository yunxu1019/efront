var fsp = require("fs").promises;
var crypto = require("node:crypto");

// 辅助函数：读取 DER 长度 (short/long form)
function readLength(buffer, pos) {
    let byte = buffer[pos++];
    let length;
    if (byte < 0x80) {
        length = byte;
    } else {
        let numBytes = byte & 0x7F;
        length = 0;
        for (let i = 0; i < numBytes; i++) {
            length = (length << 8) | buffer[pos++];
        }
    }
    return { length, pos };
}
// 辅助函数：读取 Tag + Length
function readTagAndLength(buffer, pos) {
    let tag = buffer[pos++];
    let { length, pos: newPos } = readLength(buffer, pos);
    return { tag, length, pos: newPos };
}


// 辅助函数：Buffer 到 BigInt (正整数，序列号通常无符号)
function bufferToBigInt(buf) {
    let val = 0n;
    for (let i = 0; i < buf.length; i++) {
        val = (val << 8n) | BigInt(buf[i]);
    }
    return val;
}
// 主函数：从 X.509 证书 DER Buffer 解析 SerialNumber (返回 BigInt)
function parseSerialFromCert(certDer) {
    if (!Buffer.isBuffer(certDer) || certDer.length < 10) {
        throw new Error('Invalid certificate DER buffer');
    }
    let pos = 0;
    // 解析外层 SEQUENCE (证书)
    let { tag: outerTag, length: outerLen, pos: outerPos } = readTagAndLength(certDer, pos);
    if (outerTag !== 0x30) {
        throw new Error('Not a valid X.509 certificate (missing SEQUENCE)');
    }
    pos = outerPos;
    // 解析 TBSCertificate (第一个 SEQUENCE)
    let { tag: tbsTag, length: tbsLen, pos: tbsPos } = readTagAndLength(certDer, pos);
    if (tbsTag !== 0x30) {
        // throw new Error('Invalid TBSCertificate (not SEQUENCE)');
        return;
    }
    pos = tbsPos;
    // 在 TBSCertificate 内：跳过可选 Version [0] (tag 0xA0, context-specific)
    let { tag: nextTag, length: nextLen, pos: nextPos } = readTagAndLength(certDer, pos);
    if (nextTag === 0xA0) {  // Version present
        pos = nextPos + nextLen;
        // 重新读取下一个
        ({ tag: nextTag, length: nextLen, pos: nextPos } = readTagAndLength(certDer, pos));
    }
    // 现在应该是 SerialNumber (INTEGER, tag 0x02)
    if (nextTag !== 0x02) {
        return;// throw new Error('SerialNumber not found (expected INTEGER after Version)');
    }
    // 提取 SerialNumber 值
    const serialBytes = certDer.slice(nextPos, nextPos + nextLen);
    if (serialBytes.length === 0) {
        throw new Error('Empty SerialNumber');
    }
    // 转换为 BigInt (序列号通常大，可超 Number.MAX_SAFE_INTEGER)
    const serialNumber = bufferToBigInt(serialBytes);
    return serialNumber;
}

// 辅助：解析 Name 中的 CN (UTF8String 或 PrintableString)
function parseCnFromName(nameBuffer) {
    let pos = 0;
    let cnValue = null;
    while (pos < nameBuffer.length) {
        // RDN: SET OF AttributeTypeAndValue
        let { tag: rdnTag, length: rdnLen, pos: rdnPos } = readTagAndLength(nameBuffer, pos);
        if (rdnTag !== 0x31) throw new Error('Invalid RDN (not SET)');
        let rdnEnd = rdnPos + rdnLen;
        pos = rdnPos;

        while (pos < rdnEnd) {
            // ATV: SEQUENCE { OID, Value }
            let { tag: atvTag, length: atvLen, pos: atvPos } = readTagAndLength(nameBuffer, pos);
            if (atvTag !== 0x30) throw new Error('Invalid ATV (not SEQUENCE)');
            let atvEnd = atvPos + atvLen;
            pos = atvPos;

            // OID (06)
            let { tag: oidTag, length: oidLen, pos: oidPos } = readTagAndLength(nameBuffer, pos);
            if (oidTag !== 0x06) throw new Error('Invalid OID in ATV');
            const oidBytes = nameBuffer.slice(oidPos, oidPos + oidLen);
            const oidStr = bytesToOid(oidBytes);  // 辅助转换 OID 字节到点串 (见下文)
            pos = oidPos + oidLen;

            // Value (UTF8String 0x0C 或 PrintableString 0x13 等)
            let { tag: valTag, length: valLen, pos: valPos } = readTagAndLength(nameBuffer, pos);
            if (valTag === 0x0C || valTag === 0x13 || valTag === 0x16) {  // UTF8String, PrintableString, IA5String
                const valBytes = nameBuffer.slice(valPos, valPos + valLen);
                if (oidStr === '2.5.4.3') {  // CN OID
                    cnValue = valBytes.toString('utf8');  // UTF-8 解码
                }
            }
            pos = valPos + valLen;
        }
    }

    if (cnValue === null) throw new Error('CN not found in Issuer DN');
    return cnValue;
}

// 辅助：OID 字节转点串 (简化)
function bytesToOid(oidBytes) {
    // 简化实现：假设常见 OID，实际需完整解码算法
    // 示例：CN 2.5.4.3 -> 55 04 03 (第一字节 40*2+5=85=0x55, 04=4, 03=3)
    if (oidBytes.equals(Buffer.from([85, 4, 3]))) return '2.5.4.3';
    // 添加更多 OID 映射，或实现完整解码
    throw new Error('Unsupported OID');
}

// 主函数：从证书 DER 解析 Issuer CN (返回字符串)
function parseIssuerCnFromCert(certDer) {
    if (!Buffer.isBuffer(certDer) || certDer.length < 20) {
        throw new Error('Invalid certificate DER buffer');
    }
    let pos = 0;
    // 外层 SEQUENCE
    let { tag: outerTag, length: outerLen, pos: outerPos } = readTagAndLength(certDer, pos);
    if (outerTag !== 0x30) throw new Error('Not a valid X.509 certificate');
    pos = outerPos;
    // TBSCertificate SEQUENCE
    let { tag: tbsTag, length: tbsLen, pos: tbsPos } = readTagAndLength(certDer, pos);
    if (tbsTag !== 0x30) {
        //  throw new Error('Invalid TBSCertificate');
        return;
    }
    pos = tbsPos;
    // 跳过 Version [0] (可选)
    let { tag: nextTag, length: nextLen, pos: nextPos } = readTagAndLength(certDer, pos);
    if (nextTag === 0xA0) {  // Version
        pos = nextPos + nextLen;
        ({ tag: nextTag, length: nextLen, pos: nextPos } = readTagAndLength(certDer, pos));
    }
    // 跳过 SerialNumber (INTEGER 0x02)
    if (nextTag !== 0x02) return //throw new Error('SerialNumber not found');
    pos = nextPos + nextLen;
    // 跳过 Signature Algorithm (SEQUENCE 0x30)
    ({ tag: nextTag, length: nextLen, pos: nextPos } = readTagAndLength(certDer, pos));
    if (nextTag !== 0x30) throw new Error('Signature Algorithm not found');
    pos = nextPos + nextLen;
    // Issuer Name (SEQUENCE 0x30)
    var { tag: issuerTag, length: issuerLen, pos: issuerPos } = readTagAndLength(certDer, pos);
    if (issuerTag !== 0x30) throw new Error('Issuer Name not found');
    const issuerNameBuffer = certDer.slice(issuerPos, issuerPos + issuerLen);
    // 解析 CN 从 Issuer Name
    const issuerCn = parseCnFromName(issuerNameBuffer);
    return issuerCn;
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
        key = key[0].replace(/\r\n|\r|\n/g, '\n') + "\n";
    }
    else {
        der = key;
        key = [
            '-----BEGIN PRIVATE KEY-----',
            key.toString('base64').replace(/.{64}/g, '$&\n'),
            '-----END PRIVATE KEY-----', ''
        ].join('\n');
    }
    obj.issuerCn = parseIssuerCnFromCert(der);
    obj.serial = parseSerialFromCert(der);
    obj.key = key;
    obj.der = der;
    obj.padding = crypto.constants.RSA_PKCS1_PADDING;
    return obj;
}
