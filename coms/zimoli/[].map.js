"use strict";
var Array = this.Array;
var Function = this.Function;
var undefined;

function map(f, o) {
    var res = Array(this.length);
    if (!(f instanceof Function)) return res;
    for (var cx = this.length - 1; cx >= 0; cx--) {
        if (this[cx] !== undefined)
            res[cx] = f.call(this, this[cx], cx, this);
    }
    return res;
}