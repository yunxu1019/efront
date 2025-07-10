var deflateRawSync = require("./deflate");
// var deflateRawSync = require("zlib").deflateRawSync;

function getDosDateAndTime(mtime) {
    const year = mtime.getFullYear() - 1980;
    const month = mtime.getMonth() + 1;
    const day = mtime.getDate();
    const hour = mtime.getHours();
    const minute = mtime.getMinutes();
    const second = mtime.getSeconds();
    const dosTime = (hour << 11) | (minute << 5) | (second >> 1);
    const dosDate = (year << 9) | (month << 5) | day;
    return { dosTime, dosDate };
}
// 处理2108年及以后的时间
function createExtendedTimestamp(date) {
    const unixTime = Math.floor(date.getTime() / 1000); // Unix timestamp in seconds
    const extraField = Buffer.alloc(9); // 4 bytes header + 4 bytes timestamp + 1 byte flag
    extraField.writeUInt16LE(0x5455, 0); // Extra field ID: Extended Timestamp
    extraField.writeUInt16LE(5, 2); // Data size (1 byte flag + 4 bytes timestamp)
    extraField.writeUInt8(1, 4); // Flag: modification time present
    extraField.writeUInt32LE(unixTime, 5); // Unix timestamp
    return extraField;
}
// 辅助函数：将文件模式转换为 External Attributes
function modeToExternalAttributes(mode) {
    const unixMode = mode & 0o777; // 提取权限
    const fileType = (mode & 0o170000) >> 12; // 提取文件类型
    const typeMap = {
        0o10: 0x8, // 普通文件
        0o04: 0x4, // 目录
        0o12: 0xA // 符号链接
    };
    const type = typeMap[fileType] || 0x8; // 默认普通文件
    return (type << 28 | unixMode << 16) >>> 0; // 高 16 位：类型+权限，低 16 位：0
}
var fs = require("fs");
/**
 * @param {fs.Stats} stats 
 */

function packZip(data, fileName, offset, stats) {
    const fileNameBuf = Buffer.from(fileName);
    data = Buffer.isBuffer(data) ? data : Buffer.from(data);
    var compressed = data;
    compressed = deflateRawSync(data);
    const c32 = crc(data) >>> 0;
    const compressedSize = compressed.length;
    const uncompressedSize = data.length;
    var { dosDate, dosTime } = getDosDateAndTime(stats.mtime);
    if (stats.mtime.getFullYear() >= 2108) var extraField = createExtendedTimestamp(stats.mtime);
    else extraField = Buffer.alloc(0);
    stats.mode;
    // 确保 localHeader 缓冲区足够大
    const localHeader = Buffer.alloc(30 + fileNameBuf.length + extraField.length);
    // 写入本地文件头
    localHeader.writeUInt32LE(0x04034b50, 0); // 签名
    localHeader.writeUInt16LE(20, 4); // 版本（2.0，假设Deflate压缩）
    localHeader.writeUInt16LE(0x0800, 6); // 标志位（启用UTF-8）
    localHeader.writeUInt16LE(8, 8); // 压缩方法（Deflate）
    localHeader.writeUInt16LE(dosTime, 10); // 修改时间
    localHeader.writeUInt16LE(dosDate, 12); // 修改日期
    localHeader.writeUInt32LE(c32, 14); // CRC32（假设已正确计算）
    localHeader.writeUInt32LE(compressedSize, 18); // 压缩大小
    localHeader.writeUInt32LE(uncompressedSize, 22); // 未压缩大小
    localHeader.writeUInt16LE(fileNameBuf.length, 26); // 文件名长度
    localHeader.writeUInt16LE(extraField.length, 28); // 额外字段长度
    fileNameBuf.copy(localHeader, 30); // 复制文件名（假设已使用UTF-8编码）
    extraField.copy(localHeader, 30 + fileNameBuf.length);
    compressed = concatTypedArray([localHeader, compressed]);
    // 中央目录文件头
    var externalAttributes = modeToExternalAttributes(stats.mode);
    const centralHeader = Buffer.alloc(46 + fileNameBuf.length + extraField.length);
    centralHeader.writeUInt32LE(0x02014b50, 0); // 签名
    centralHeader.writeUInt16LE(20, 4); // Version Made By（Unix=3，2.0=20）
    centralHeader.writeUInt16LE(20, 6); // Version Needed（2.0，适合Deflate）
    centralHeader.writeUInt16LE(0x0800, 8); // 标志位（启用UTF-8）
    centralHeader.writeUInt16LE(8, 10); // 压缩方法（Deflate）
    centralHeader.writeUInt16LE(dosTime, 12); // 修改时间
    centralHeader.writeUInt16LE(dosDate, 14); // 修改日期
    centralHeader.writeUInt32LE(c32, 16); // CRC32
    centralHeader.writeUInt32LE(compressedSize, 20); // 压缩大小
    centralHeader.writeUInt32LE(uncompressedSize, 24); // 未压缩大小
    centralHeader.writeUInt16LE(fileNameBuf.length, 28); // 文件名长度
    centralHeader.writeUInt16LE(extraField.length, 30); // 额外字段长度
    centralHeader.writeUInt16LE(0, 32); // 注释长度
    centralHeader.writeUInt16LE(0, 34); // 磁盘编号
    centralHeader.writeUInt16LE(0, 36); // 内部属性（二进制文件）
    centralHeader.writeUInt32LE(externalAttributes, 38); // 外部属性（Unix普通文件权限）
    centralHeader.writeUInt32LE(offset, 42); // 本地文件头偏移
    fileNameBuf.copy(centralHeader, 46); // 复制文件名
    extraField.copy(centralHeader, 46 + fileNameBuf.length);
    compressed.central = centralHeader;
    return compressed;
}
packZip.packCentral = function (centralRecords, offset) {
    const centralSize = centralRecords.reduce((a, b) => a + b.length, 0);
    const centralOffset = offset;
    const eocd = Buffer.alloc(22);
    var entries_count = centralRecords.length;
    eocd.writeUInt32LE(0x06054b50, 0); // 签名
    eocd.writeUInt16LE(0, 4); // 磁盘编号
    eocd.writeUInt16LE(0, 6); // 起始磁盘
    eocd.writeUInt16LE(entries_count, 8); // 本磁盘条目数
    eocd.writeUInt16LE(entries_count, 10); // 总条目数
    eocd.writeUInt32LE(centralSize, 12); // 中央目录大小
    eocd.writeUInt32LE(centralOffset, 16); // 中央目录偏移
    eocd.writeUInt16LE(0, 20); // 注释长度
    return concatTypedArray([...centralRecords, eocd]);

}