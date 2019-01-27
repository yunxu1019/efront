"use strict";
var {
    Array,
    Function,
    String,
    Object
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
var hasOwnProperty = {}.hasOwnProperty;
var keys = function keys(object) {
    var result = [];
    for (var k in object) {
        if (!hasOwnProperty.call(object, k)) break;
        // 如果遇到非私有属性，说明私有属性已经遍历完
        result.push(k);
    }
    return result;
};
Array.prototype.map = map;
Array.prototype.forEach = forEach;
Array.prototype.indexOf = indexOf;
Array.prototype.filter = filter;
String.prototype.trim = trim;
Object.keys = keys;