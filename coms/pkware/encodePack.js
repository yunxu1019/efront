
module.exports = function (buff, type) {
    switch (type) {
        case 0:
            return pack(buff);
        case range_compress:
        case rang2_compress:
            return pack2(buff, type);
    }
    return pack2(buff, range_compress);
};