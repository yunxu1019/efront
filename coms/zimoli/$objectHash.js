//支持但不建议使用 new 关键字创建
function $objectHash() {
    if (isObject(this)) {
        this.__objectHash = $objectHash();
    }
    return ++increase_identify;
};
$objectHash.valueOf = function () {
    return this();
};
$objectHash.toString = function () {
    return String(this);
};
$objectHash.prototype = {
    valueOf() {
        return this.__objectHash + 1;
    },
    toString() {
        return String(this.__objectHash + 1);
    }
};
var increase_identify = 0;