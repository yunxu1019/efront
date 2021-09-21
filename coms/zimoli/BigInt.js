var BigInt = this.BigInt || function () {
    var map = {};

    function BigInt(a) {
        if (this instanceof BigInt) {
            if (map[a]) return map[a];
            this.val = a;
            map[a] = this;
        }
        else if (a instanceof BigInt) return a;
        else return new BigInt(a);
    };
    var prototype = new BigInt;
    prototype.toString = function () {
        return this.val;
    };
    prototype.valueOf = function () {
        return this;
    }
    BigInt.prototype = prototype;
    return BigInt;
}()     
