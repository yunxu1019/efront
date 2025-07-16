
var deflateRawSync = require("./deflate");
// var deflateRawSync = require("zlib").deflateRawSync;
/**
 * @param {Buffer} buff
 */
module.exports = function (buff, type) {
    switch (type) {
        case 0:
            return pack(buff);
        case range_compress:
        case rang2_compress:
            return pack2(buff, type);
        case normal_deflate:
            buff = deflateRawSync(buff);
            return packPiece(normal_deflate, buff);
    }
    return pack2(buff, range_compress);
};