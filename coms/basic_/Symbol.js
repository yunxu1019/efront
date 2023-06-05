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
    Symbol.iterator = Symbol('iterator');
    Symbol.asyncIterator = Symbol('asyncIterator');
    var iterator = function () {
        var arr = this, cx = 0, dx = arr.length;
        return {
            next() {
                if (cx < dx) return { value: arr[cx++], done: false };
                return { value: undefined, done: true };
            }
        }
    };
    try {
        Object.defineProperty(Array.prototype, Symbol.iterator, { value: iterator, enumerable: false })
    } catch { }
    return Symbol;
}();