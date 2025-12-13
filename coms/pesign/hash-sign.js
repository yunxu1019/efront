

function embedSignature(pehead, cert1, peInfo) {
    var { certDirOffset, certTableOffset } = peInfo;
    if (!certTableOffset) throw new Error('可执行文件异常！');
    pehead.writeUInt32LE(certTableOffset, certDirOffset);
    // newBuffer.writeUInt32LE(certTable.length, certDirOffset + 4);
    pehead.writeUInt32LE(cert1.length, certDirOffset + 4);
    peInfo.certTableSize = cert1.length;
    return pehead;
}
async function hashSign(hash, privateKey, cert, pehead, peinfo) {
    var pkcs7 = await generatePKCS7(hash, privateKey, cert);
    pkcs7 = Buffer.from(pkcs7);
    var paddingLength = 7 - (peinfo.certTableOffset + pkcs7.length + 7) % 8;
    var cert1 = Buffer.alloc(pkcs7.length + paddingLength + 8);
    cert1.writeUInt32LE(pkcs7.length + paddingLength + 8/*dwLength*/, 0);
    cert1.writeUInt16LE(0x0200/*wVersion*/, 4);
    cert1.writeUInt16LE(0x0002/*wCertificateType pcks7=2*/, 6);
    pkcs7.copy(cert1, 8, 0, cert1.length);
    embedSignature(pehead, cert1, peinfo);
    return cert1;
}