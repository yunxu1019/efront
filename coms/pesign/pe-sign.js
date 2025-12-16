var memery = require("../efront/memery");
var isPE = function (data) {
    var offset = data.readInt32LE(0x3c);
    var flag = String(data.subarray(offset, offset + 4));
    return flag === "PE\0\0";
};

// 更新 PE CheckSum（可选，简单实现）

async function peSign(pedata, privateKey, cert) {
    if (!isPE(pedata)) return pedata;
    var peInfo = parsePE(pedata);
    const { certDirOffset, certTableSize, certTableOffset } = peInfo;
    if (certTableSize > 0) {
        if (!memery.FORCE) {
            //<!-- if(false) --> 
            return pedata;
        }
        let r = new SliceRange(0, pedata.length);
        r.delete(certTableOffset, certTableOffset + certTableSize);
        pedata.writeUInt32LE(0, certDirOffset + 4);
        pedata.writeUInt32LE(0, certDirOffset);
        let pedata1 = [];
        for (let [a, b] of r) {
            pedata1.push(pedata.slice(a, b));
        }
        pedata = Buffer.concat(pedata1);
    }
    var hash = await calcPeHash(pedata, peInfo);
    var cert1 = await hashSign(hash, privateKey, cert, pedata, peInfo);
    pedata = Buffer.concat([pedata, cert1]);
    var sum = await updateChecksum(pedata, peInfo);
    pedata.checksum = sum;
    return pedata;
}