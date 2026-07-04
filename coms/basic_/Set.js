if (this.Set) return this.Set;
var includes = Array.prototype.includes || function (o) {
    for (var cx = 0, dx = this.length; cx < dx; cx++) {
        if (isSame(o, this[cx])) return true;
    }
    return false;
}
var iterator = Symbol.iterator;
class Set {
    "constructor"(a) {
        if (a) {
            var _values = this._values;
            var iter = a[iterator]();
            for (; ;) {
                var { value, done } = iter.next();
                if (done) break;
                _values.push(value);
            }
        }
    }

    get size() {
        return this._values.length
    };
    _values = [];
    has(a) {
        return includes.call(this._values, a)
    }
    add(a) {
        if (!this.has(a)) this._values.push(a);
        return this;
    }
    delete(o) {
        var values = this._values;
        for (var cx = values.length - 1; cx >= 0; cx--) {
            if (isSame(o, values[cx])) {
                values.splice(cx, 1)
                break;
            }
        }
    }
    difference(set) {
        // 只看此集合不在参数中的情况
        var values = this._values.filter(a => set.has(a));
        var res = new Set;
        res._values = values;
        return res;
    }
    clear() {
        this._values.splice(0, this._values.length);
    }
    entries() {
        var arr = this._values.slice(), i = 0;
        return {
            next() {
                if (i >= arr.length) return { value: undefined, done: true };
                return { value: [arr[i], arr[i++]], done: false };
            }
        }
    }
    forEach(f) {
        this._values.forEach(a => f(a, a, this));
    }

    "intersection"(set) {
        // 交集
        var o = new Set;
        o._values = this._values.filter(e => set.has(e));
        return o;
    }
    "isSubsetOf"(set) {
        for (var e of this) {
            if (!set.has(e)) return false;
        }
        return true;
    }
    "isSupersetOf"(set) {
        for (var e of set) {
            if (!this.has(e)) return false;
        }
        return true;
    }
    "isDisjointFrom"(set) {
        var a = this._values;
        for (var e of a) if (set.has(e)) return false;
        return true;
    }

    "symmetricDifference"(other) {
        // 并集减交集
        var values = this._values.concat(other._values).filter(a => !this.has(a) || !other.has(a))
        var set = new Set;
        set._values = values;
        return set;
    }
    "union"(set) {
        var o = new Set;
        o._values = this._values.concat(set._values);
        return o;
    }
}
function values() {
    var arr = this._values.slice(), cx = 0;
    return {
        next() {
            if (cx < arr.length) return { value: arr[cx++], done: false };
            return { value: undefined, done: true };
        }
    }
}
Set.prototype[iterator] = values;
Set.prototype.values = values;
Set.prototype.keys = values;