/**
 * 写入指定长度的二进制数据
 * @param {Buffer} buff 
 * @param {number} bitoffset 
 * @param {number} bitlength 不大于31
 * @param {number} binary 不大于0x7fffffff
 */
function writeBinary(buff, bitoffset, bitlength, binary) {
    var index = bitoffset >> 3;
    var bitdelta = bitoffset - (index << 3);
    if (bitdelta > 0) {
        bitdelta = 8 - bitdelta;
        var delta = buff[index];
        bitlength -= bitdelta;
        var rest = 0;
        if (bitlength < 0) {
            rest = -bitlength;
            bitlength = 0;
        }
        delta = delta & (1 << 8) - (1 << bitdelta) | binary >> bitlength << rest | delta & (1 << rest) - 1;
        buff[index] = delta;
        binary = binary & (1 << bitlength) - 1;
        index++;
    }
    while (bitlength >= 8) {
        bitlength -= 8;
        buff[index++] = binary >> bitlength;
        binary = binary & (1 << bitlength) - 1;
    }
    if (bitlength > 0) {
        var delta = buff[index];
        bitdelta = 8 - bitlength;
        delta = delta & (1 << bitdelta) - 1 | binary << bitdelta
        buff[index] = delta;
    }
}
module.exports = writeBinary;