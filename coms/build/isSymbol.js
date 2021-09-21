var symbols = require("../efront/memery").SYMBOLS;
if (symbols) symbols = new RegExp(symbols);
if (!symbols) var isSymbol = function () {
    return false;
};
else var isSymbol = function (a) {
    return symbols.test(a);
};
module.exports = isSymbol;