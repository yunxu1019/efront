var BigInt = window.BigInt || function () {
    function BigInt(a) {
        if (this instanceof BigInt) {
            this.val = a;
        }
        else if (a instanceof BigInt) return a;
        else return new BigInt(a);
    };
    var prototype = new BigInt;
    prototype.toString = function () {
        return this.val;
    };
    prototype.valueOf = function () {
        return this.val;
    }
    BigInt.prototype = prototype;
    return BigInt;
}()     
