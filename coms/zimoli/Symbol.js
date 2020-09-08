var Symbol = this.Symbol || function () {
    function Symbol(a) {
        if (this instanceof Symbol) {
            this.symbol = String(a);
        } else if (a instanceof Symbol) {
            return a;
        } else {
            return new Symbol(a);
        }
    }
    var prototype = new Symbol;
    prototype.toString = function () {
        return 'Symbol(' + this.symbol + ")";
    };
    prototype.valueOf = function () {
        return this;
    };

    Symbol.prototype = prototype;
    return Symbol;
}();