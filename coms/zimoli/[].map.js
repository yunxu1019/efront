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
        res = this.split("").map(f, o);
    } else {
        for (var cx = 0, dx = this.length; cx < dx; cx++) {
            if (this[cx] !== undefined)
                res[cx] = f.call(o, this[cx], cx, this);
        }
    }
    return res;
}
function forEach(f, o) {
    if (!(f instanceof Function)) return;
    if (this instanceof String) {
        this.split("").forEach(f, o);
    }
    for (var cx = 0, dx = this.length; cx < dx; cx++) {
        if (this[cx] !== undefined)
            f.call(o, this[cx], cx, this);
    }
}
function filter(f, o) {
    if (!(f instanceof Function)) return;
    var result = [];
    if (this instanceof String) {
        result = this.split("").filter(f, o);
    }
    for (var cx = 0, dx = this.length; cx < dx; cx++) {
        if (this[cx] !== undefined)
            if (f.call(o, this[cx], cx, this))
                result.push(this[cx]);
    }
    return result;
}
function indexOf(searchElement, fromIndex = 0) {
    for (var cx = fromIndex, dx = this.length; cx < dx; cx++) {
        if (this[cx] === searchElement) return cx;
    }
    return -1;
}
function trim() {
    return String(this).replace(/^[\s\u00a0]+|[\s\u00a0]$/g, "");
}

Array.prototype.map = map;
Array.prototype.forEach = forEach;
Array.prototype.indexOf = indexOf;
Array.prototype.filter = filter;
String.prototype.trim = trim;