/**
 * 从二进制读取指定长度的数据
 * @param {Buffer} buff 
 * @param {number} bitoffset 
 * @param {number} bitlength 不大于31
 * @returns 0x7fffffff以内的正整数
 */
function readBinary(buff, bitoffset, bitlength) {
    var num = 0, index = bitoffset >> 3;
    var bitdelta = bitoffset - (index << 3);
    if (bitdelta > 0) {
        bitdelta = 8 - bitdelta;
        var delta = buff[index++];
        bitlength -= bitdelta;
        num = delta & (1 << bitdelta) - 1;
        if (bitlength < 0) {
            num = num >> -bitlength;
            bitlength = 0;
        }
    }
    while (bitlength >= 8) {
        bitlength -= 8;
        num = num << 8 | buff[index++];
    }
    if (bitlength > 0) {
        var delta = buff[index];
        num = num << bitlength | delta >> 8 - bitlength;
    }
    return num;
}
module.exports = readBinary;