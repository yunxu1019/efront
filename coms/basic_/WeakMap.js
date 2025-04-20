var WeakMap = this.WeakMap;
if (WeakMap && WeakMap.prototype.get) return WeakMap;
var id = 0;
WeakMap = class WeakMap {
    id = "#" + ++id;
    get(o) {
        if (o == null) return;
        return o[this.id];
    }
    set(o, v) {
        defineObj.value = v;
        defineProperty(o, this.id, defineObj);
    }
    has(o) {
        return this.id in o;
    }
    delete(o) {
        delete o[this.id];
    }
}
var defineObj = {
    value: null,
    enumerable: false,
    writable: true,
    configurable: true
}
var defineProperty = Object.defineProperty;
try {
    defineProperty(document, '#weakmap', defineObj);
    delete document["#weakmap"];
} catch {
    try {
        delete defineObj.enumerable;
        defineProperty(document, '#weakmap', defineObj);
        delete document["#weakmap"];
    } catch {
        defineProperty = function (o, k, d) {
            o[k] = d.value;
        }
    }
}
return WeakMap;