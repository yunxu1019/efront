var symbols = (process.env.SYMBOL || process.env.SYMBOLS || process.env.SYMBOLS_REG || process.env.SYMBOL_REG || process.env.SYMBOLS_REGEXP || process.env.SYMBOL_REGEXP || process.env.REGEXP);
if (symbols) symbols = new RegExp(symbols);
if (!symbols) var isSymbol = function () {
    return false;
};
else var isSymbol = function (a) {
    return symbols.test(a);
};
module.exports = isSymbol;