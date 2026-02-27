var Symbol = this.Symbol || function () {
    var symbolid = 0;
    function Symbol(a) {
        this.id = ++symbolid;
        this.name = String(a);
    }
    function Symbol1(a) {
        if (this instanceof Symbol1) {
            throw new Error('Symbol不是构造方法!');
        } else if (a instanceof Symbol) {
            throw new Error('无法将Symbol类型转换成字符串!');
        } else {
            return new Symbol(a);
        }
    }
    var prototype = new Symbol;
    prototype.toString = function () {
        return `Symbol(${this.name}/${this.id})`;
    };
    prototype.valueOf = function () {
        return this;
    };

    Symbol.prototype = prototype;
    Symbol.iterator = Symbol1('iterator');
    Symbol.asyncIterator = Symbol1('asyncIterator');
    var iterator = function () {
        var arr = this, cx = 0;
        return {
            next() {
                if (cx < arr.length) return { value: arr[cx++], done: false };
                return { value: undefined, done: true };
            }
        }
    };
    try {
        Object.defineProperty(Array.prototype, Symbol.iterator, { value: iterator, enumerable: false })
    } catch {
        Array.prototype[Symbol.iterator] = iterator;
    }
    return Symbol1;
}();