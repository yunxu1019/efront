
var deflateRawSync = require("./deflate");
// var deflateRawSync = require("zlib").deflateRawSync;
var lzmaCompress = require("./lzma").compress;
/**
 * @param {Buffer} buff
 */
module.exports = function (buff, type) {
    switch (type) {
        case 0:
            return pack(buff);
        case lzma_3rd_party:
            return packn(buff, lzma_3rd_party, lzmaCompress);
        case range_compress:
        case rang2_compress:
            return pack2(buff, type);
        case normal_deflate:
            buff = deflateRawSync(buff);
            return packPiece(normal_deflate, buff);
    }
    return pack2(buff, range_compress);
};