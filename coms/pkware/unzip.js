// var inflateRawSync = require("./inflate");
var fs = require('fs');
var inflateRawSync = require("zlib").inflateRawSync;
// 文件类型映射（ZIP 类型到 Node.js fs.constants 类型）
const zipTypeToNodeType = {
    0x8: fs.constants.S_IFREG, // 普通文件 (0o100000)
    0x4: fs.constants.S_IFDIR, // 目录 (0o040000)
    0xA: fs.constants.S_IFLNK, // 符号链接 (0o120000)
    0xC: fs.constants.S_IFIFO, // 命名管道 (0o010000)
    0x2: fs.constants.S_IFCHR, // 字符设备 (0o020000)
    0x6: fs.constants.S_IFBLK, // 块设备 (0o060000)
    0x1: fs.constants.S_IFSOCK // 套接字 (0o140000)
};

// 辅助函数：将 externalAttributes 转换为 stats.mode
function externalAttributesToMode(externalAttributes) {
    // 提取高 16 位
    const unixMode = (externalAttributes >> 16) & 0xFFF; // 低 12 位（权限）
    const fileType = (externalAttributes >> 28) & 0xF; // 高 4 位（文件类型）
    // 映射文件类型
    const nodeType = zipTypeToNodeType[fileType] || fs.constants.S_IFREG; // 默认普通文件
    // 权限直接使用 unixMode（已包含八进制权限，如 0644）
    const permissions = unixMode & 0o777; // 确保只取权限部分
    // 组合类型和权限
    return nodeType | permissions;
}
var readUInt32 = async function (readbuff, offset) {
    var buff = await readbuff(offset, 4);
    return (buff[3] << 24 | buff[2] << 16 | buff[1] << 8 | buff[0]) >>> 0;
}
var checkFlag = async function (read, offset, flag1) {
    var flag = await readUInt32(read, offset);
    return flag === flag1;
}
var isZipFile = async function (read, offset) {
    return checkFlag(read, offset, 0x04034b50);
};
var isZipDir = async function (read, offset) {
    return checkFlag(read, offset, 0x02014b50);
}
var isZip = async function (read, offset) {
    var flag = await readUInt32(read, offset);
    return flag === 0x04034b50 || flag === 0x06054b50 || flag === 0x02014b50;
}
function dosToDate(dosDate, dosTime) {
    // 提取 dosDate 的字段
    const year = ((dosDate >> 9) & 0x7F) + 1980; // 7 位年份，相对于 1980
    const month = ((dosDate >> 5) & 0x0F) - 1; // 4 位月份，0-11（JavaScript Date 使用 0-11）
    const day = dosDate & 0x1F; // 5 位日期，1-31

    // 提取 dosTime 的字段
    const hour = (dosTime >> 11) & 0x1F; // 5 位小时
    const minute = (dosTime >> 5) & 0x3F; // 6 位分钟
    const second = (dosTime & 0x1F) * 2; // 5 位秒数，乘以 2 得到实际秒

    // 创建 Date 对象（JavaScript 的月份从 0 开始）
    return new Date(year, month, day, hour, minute, second);
};

function parseExtraField(buffer, isLocal) {
    buffer = Buffer.from(buffer);
    let offset = 0;
    const result = { timestamp: null, uid: null, gid: null };
    while (offset < buffer.length) {
        const id = buffer.readUInt16LE(offset);
        const size = buffer.readUInt16LE(offset + 2);
        offset += 4;
        if (id === 0x5455 && (!isLocal || size >= 5)) { // Extended Timestamp
            const flags = buffer.readUInt8(offset);
            if (flags & 0x1) { // Modification time present
                const unixTime = buffer.readUInt32LE(offset + 1);
                result.timestamp = new Date(unixTime * 1000);
                offset += size;
            }
        } else {
            offset += size; // 跳过未知 Extra Field
        }
    }
    return result;
}
class File {
    compressedSize;
    uncompressedSize;
    name;
    mtime;
    crc32;
    method;
    offset;
    dataOffset;
    mode;
    $read;
    isFolder() {
        if (/[\\\/]$/.test(this.name)) return true;
    }
    async readToBuffer() {
        var read = this.$read;
        var data = await read(this.dataOffset, this.compressedSize);
        if (!this.method) return data;
        switch (this.method) {
            case 0: break;
            case 8:
                data = inflateRawSync(data);
                break;
            default:
                console.log(this.name, this.method);
                throw new Error(i18n`压缩算法不支持`);
        }
        var c32 = crc(data) >>> 0;
        if (c32 !== this.crc32) throw new Error(i18n`数据解码异常！`);
        return data;
    }
}
async function readEntries(readbuff, limit, offset = 0) {
    const files = [];
    var fileMap = Object.create(null);
    while (offset < limit) {
        if (!await isZipFile(readbuff, offset)) break;
        var f = new File;
        files.push(f);
        /**
         * @type {Buffer}
         */
        var buffer = await readbuff(offset, 30);
        buffer = Buffer.from(buffer);
        f.offset = offset;
        f.method = buffer.readUInt16LE(8);
        f.mtime = dosToDate(buffer.readUInt16LE(12), buffer.readUInt16LE(10));
        f.crc32 = buffer.readUInt32LE(14);
        f.compressedSize = buffer.readUInt32LE(18);
        f.uncompressedSize = buffer.readUint32LE(22);
        const fileNameLength = buffer.readUInt16LE(26);
        const extraFieldLength = buffer.readUInt16LE(28);
        offset += 30
        f.name = decodeUTF8(await readbuff(offset, fileNameLength));
        offset += fileNameLength;
        if (extraFieldLength) {
            var extraFields = await readbuff(offset, extraFieldLength);
            extraFields = parseExtraField(extraFields);
            if (extraFields.timestamp) f.mtime = extraFields.timestamp;
        }
        offset += extraFieldLength;
        f.dataOffset = offset;
        f.$read = readbuff;
        fileMap[f.offset] = f;
        offset += f.compressedSize;
    }
    while (offset < limit) {
        if (!await isZipDir(readbuff, offset)) break;
        var buffer = await readbuff(offset, 46);
        buffer = Buffer.from(buffer);
        var externalAttributes = buffer.readUInt32LE(38);
        var offset1 = buffer.readUint32LE(42);
        var f = fileMap[offset1];
        if (f) f.mode = externalAttributesToMode(externalAttributes);
        offset += buffer.readUInt16LE(28);
        offset += buffer.readUInt16LE(30);
        offset += 46;

    }
    return files;
}

module.exports = { readEntries, isZip };