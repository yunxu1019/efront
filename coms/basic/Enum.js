"use strict";
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
function Enum() {
    if (!this) throw new Error(i18n`请用new关键字创建！`);
    return new Proxy({ 0: 0 }, {
        get(o, k) {
            if (isFinite(k)) {
                return o[k];
            }
            var v = o[k];
            if (v) return v;
            var i = ++o[0];
            v = new EnumItem(k, i);
            o[i] = v;
            o[k] = v;
            return v;
        },
        set() {
            // do nothing
        }
    });
}
module.exports = Enum;