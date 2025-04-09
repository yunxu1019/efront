var WeakMap = this.WeakMap;
if (WeakMap) return WeakMap;
var id = 0;
WeakMap = class WeakMap {
    id = "#" + ++id;
    get(o) {
        return o[this.id];
    }
    set(o, v) {
        Object.defineProperty(o, this.id, {
            value: v,
            enumerable: false,
            configurable: true
        });
    }
    has(o) {
        return this.id in o;
    }
    delete(o) {
        delete o[this.id];
    }
}
return WeakMap;