"use strict";
var {
    Array,
    Function,
    String
} = this;
var undefined;

function map(f, o) {
    var res = Array(this.length);
    if (!(f instanceof Function)) return res;
    if (this instanceof String) {
        res = this.split("").map(f, o)
    } else {
        for (var cx = 0, dx = this.length; cx < dx; cx++) {
            if (this[cx] !== undefined)
                res[cx] = f.call(o || null, this[cx], cx, this);
        }
    }
    return res;
}
Array.prototype.map = map;