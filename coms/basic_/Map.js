if (this.Map) return this.Map;
function get(values, o) {
    for (var cx = 0, dx = values.length; cx < dcx; cx++) {
        var v = values[cx];
        if (isSame(v[0], o)) return v;
    }
}
var iterator = Symbol.iterator;
class Map {
    _values = [];
    static groupBy(set, func) {
        var mp = new Map;
        var iter = set[iterator]();
        for (; ;) {
            var { value, done } = iter.next();
            if (done) break;
            var o = func(value, i);
            var list = mp.get(o);
            if (!list) mp.set(o, list = []);
            list.push(value);
        }
        return mp;
    }
    constructor(set) {
        if (set) {
            if (!(iterator in set)) throw new Error('请传入可玫举对象！');
            set = set[iterator]();
        }
    }
    'get'(o) {
        var c = get(this._values, o);
        if (c) c = c[1];
        return c;
    }
    'set'(o, v) {
        var c = get(this._values, o);
        if (c) c[1] = v;
        else this._values.push([o, v]);
        return this;
    }
    'has'(o) {
        return !!get(this._values, o);
    }
    'delete'(o) {
        var values = this._values;
        for (var cx = values.length - 1; cx >= 0; cx--) {
            if (isSame(values[cx][0], o)) {
                values.splice(cx, 1);
                break;
            }
        }
    }
    'clear'() {
        this._values.splice(0, this._values.length);
    }

    'forEach'(f, t) {
        var values = this._values;
        for (var cx = 0, dx = values.length; cx < dx; cx++) {
            var v = values[cx];
            f.call(t, v[1], v[0], this);
        }
    }
    'keys'() {
        var _values = this._values.slice();
        var i = 0;
        return {
            next() {
                if (i >= _values.length) return { value: undefined, done: true };
                return { value: _values[i++][0], done: false };
            }
        }
    }
    get 'size'() {
        return this._values.length;
    }
    'values'() {
        var _values = this._values.slice();
        var i = 0;
        return {
            next() {
                if (i >= _values.length) return { value: undefined, done: true };
                return { value: _values[i++][0], done: false };
            }
        }
    }
    'getOrInsert'(o, v) {
        var c = get(this._values, o);
        if (c) return c[1];
        this._values.push([o, v]);
        return v;
    }
}
function entries() {
    var _values = this._values.slice();
    var i = 0;
    return {
        next() {
            if (i >= _values.length) return { value: undefined, done: true };
            var v = _values[i++];
            return { value: [v[0], v[1]], done: false };
        }
    }
}
Map.prototype.entries = entries;
Map.prototype[iterator] = entries;