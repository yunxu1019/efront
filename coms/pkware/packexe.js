var fs = require("fs");
var fsp = fs.promises;
var finish = require('../build/finish');
var memery = require("../efront/memery");
var exepath = require("path").join(__dirname, "../../data/packexe-setup.sfx");
/**
 * @param {Buffer} buff 
 */
function addSection(buff, dataSize, sectionName) {
    const peOffset = buff.readUInt32LE(0x3C);
    const sectionCount = buff.readUInt16LE(peOffset + 6);
    const sizeOfOptionalHeader = buff.readUInt16LE(peOffset + 20);
    const fileAlignment = buff.readUInt32LE(peOffset + 60);
    const sectionAlignment = buff.readUInt32LE(peOffset + 56);
    const optionalHeaderOffset = peOffset + 4 + 20; // 签名 (4) + FileHeader (20)
    const sectionTable = optionalHeaderOffset + sizeOfOptionalHeader;
    // 计算新节大小和对齐
    const rawSize = Math.ceil(dataSize / fileAlignment) * fileAlignment;

    // 获取最后一个节的信息
    var lastSectionOffset = sectionTable + (sectionCount - 1) * 40;
    const lastVirtualAddress = buff.readUInt32LE(lastSectionOffset + 12);
    const lastRawOffset = buff.readUInt32LE(lastSectionOffset + 20);
    const lastRawSize = buff.readUInt32LE(lastSectionOffset + 16);

    // 计算新节的地址和偏移
    const newVirtualAddress = Math.ceil((lastVirtualAddress + lastRawSize) / sectionAlignment) * sectionAlignment;
    const newRawOffset = Math.ceil((lastRawOffset + lastRawSize) / fileAlignment) * fileAlignment;

    // 更新 NumberOfSections
    buff.writeUInt16LE(sectionCount + 1, peOffset + 6);
    lastSectionOffset += 40;
    // 创建新节表项
    buff.write(sectionName, lastSectionOffset, 8, 'ascii');
    buff.writeUInt32LE(dataSize, lastSectionOffset + 8);
    buff.writeUInt32LE(newVirtualAddress, lastSectionOffset + 12);
    buff.writeUInt32LE(rawSize, lastSectionOffset + 16);
    buff.writeUInt32LE(newRawOffset, lastSectionOffset + 20);
    buff.writeUInt32LE(0x0E000000, lastSectionOffset + 36);
    // 更新 SizeOfImage
    const newSizeOfImage = Math.ceil((newVirtualAddress + rawSize) / sectionAlignment) * sectionAlignment;
    buff.writeUInt32LE(newSizeOfImage, peOffset + 80);
    return lastSectionOffset + 40;
}

var readPE = async function (fullpath, title) {
    var data = await fsp.readFile(fullpath);
    var offset = data.readInt32LE(0x3c);
    var flag = String(data.subarray(offset, offset + 4));
    if (flag !== "PE\0\0") throw new Error("PE文件异常！");
    replaceTitle(data, title);
    data = patchZero(data);
    const fileAlignment = data.readUInt32LE(offset + 60);
    var ratio = data.length / fileAlignment;
    if ((ratio | 0) !== ratio) throw new Error("pe文件无法对齐");
    data.fileAlignment = fileAlignment;
    return data;
}
var createUTF16Buffer = function (str) {
    var dest = [];
    for (var s of str) {
        s = encodeUTF16(s, false);
        dest.push.apply(dest, s);
    }
    return Buffer.from(new Uint8Array(dest));
}
/**
 * @param {Buffer} sfxdata
 */
var replaceTitle = function (sfxdata, TITLE) {
    if (!TITLE) return sfxdata;
    var path = require("path");
    TITLE = path.basename(TITLE).replace(/\.[^\.]+$/, '');
    TITLE = TITLE.replace(/\-win32\-(ia32|x\d+)/ig, '$1');
    var title = TITLE.replace(/\(?\s*\-?\s*?(\d+(位|bit|)|x\d+|ia\d+)\)?$/, '');
    var bit = TITLE.slice(title.length);
    var name = title.replace(/安装程序$/, '');
    var title = name + "安装程序" + bit;
    var namedata = createUTF16Buffer(name);
    var titledata = createUTF16Buffer(title);
    var i = sfxdata.indexOf(createUTF16Buffer('白前安装程序'));
    var j = sfxdata.indexOf(createUTF16Buffer('白前'), i + 2);
    if (/32/.test(bit)) {
        var k = sfxdata.indexOf(createUTF16Buffer("ProgramW6432"));
        if (k < 0) throw new Error("主程序错误，缺少ProgramW6432");
        createUTF16Buffer("ProgramFiles").copy(sfxdata, k);
    }
    if (i < 0) throw new Error("主程序错误，未检测到标题！");
    if (j < 0) throw new Error("主程序错误，未发现软件名！");
    if (namedata.length < 12) {
        namedata = Buffer.concat([namedata, new Uint8Array(12 - namedata.length)])
    }
    if (titledata.length < 12) {
        titledata = Buffer.concat([titledata, new Uint8Array(12 - titledata.length)]);
    }
    if (titledata.length > 32 || namedata.length > 32) {
        throw new Error("标题过长！");
    }
    titledata.copy(sfxdata, i);
    namedata.copy(sfxdata, j);
    return sfxdata;
}
var patchZero = function (patchdata) {
    if ((patchdata[patchdata.length - 4] | patchdata[patchdata.length - 3] | patchdata[patchdata.length - 2] | patchdata[patchdata.length - 1]) !== 0) {
        patchdata = concatTypedArray([patchdata, new Uint8Array(4)]);
    }
    return patchdata;
}
var alignData = function (length, align) {
    var newLength = Math.ceil(length / align) * align - length;
    return new Uint8Array(newLength);
}
async function packexe(readfrom, writeto) {
    var startTime = new Date;
    var pedata = await readPE(exepath, memery.TITLE || writeto);
    var hd = await fsp.open(writeto, 'w');
    await hd.write(pedata);
    var size = await enpack(readfrom, hd, 7);
    await hd.write(alignData(size, pedata.fileAlignment));
    var updateEnd = addSection(pedata, size, '.pack');
    await hd.write(pedata, 0, updateEnd, 0);
    await hd.close();
    finish(new Date - startTime);
}
module.exports = packexe;