function EnumItem(name, value) {
    this.name = name;
    this.value = value;
}
EnumItem.prototype = {
    toString() {
        return this.value;
    },
    valueOf() {
        return this.name;
    }
}
Enum.prototype = {
    get(k) {
        var o = this;
        if (isFinite(k)) {
            return o[k];
        }
        if (isArray(k)) {
            return k.map(this.get, this);
        }
        var v = o[k];
        if (v) return v;
        var i = ++o[0];
        v = new EnumItem(k, i);
        o[i] = v;
        o[k] = v;
        return v;
    }
};
function Enum(keys) {
    if (!this) throw new Error(i18n`请用new关键字创建！`);
    this[0] = 0;
    if (keys) {
        if (!isArray(keys)) {
            keys = [].slice.call(arguments, 0);
        }
        keys.map(this.get, this);
    }
}