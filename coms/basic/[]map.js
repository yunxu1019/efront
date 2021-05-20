"use strict";
var {
    Array,
    Function,
    String,
    Object
} = this;

function map(f, o) {
    var res = Array(this.length);
    if (!(f instanceof Function)) return res;
    if (this instanceof String) {
        res = this.split("").map(f, o);
    } else {
        for (var cx = 0, dx = this.length; cx < dx; cx++) {
            if (cx in this)
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
        if (cx in this[cx])
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
        if (cx in this[cx])
            if (f.call(o, this[cx], cx, this))
                result.push(this[cx]);
    }
    return result;
}
function indexOf(searchElement, fromIndex = 0) {
    for (var cx = fromIndex, dx = this.length; cx < dx; cx++) {
        if (cx in this && this[cx] === searchElement) return cx;
    }
    return -1;
}
function trim() {
    return String(this).replace(/^[\s\u00a0]+|[\s\u00a0]+$/g, "");
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
if (![].map) Array.prototype.map = map;
if (![].forEach) Array.prototype.forEach = forEach;
if (![].indexOf) Array.prototype.indexOf = indexOf;
if (![].filter) Array.prototype.filter = filter;
if (!"".trim) String.prototype.trim = trim;
if (!Object.keys) Object.keys = keys;
if (!Object.create) Object.create = function (object) {
    function ExtendedClass() {
    }
    ExtendedClass.prototype = object;
    return new ExtendedClass;
};
if (!function () { }.bind) Function.prototype.bind = function (context) {
    var args = [].slice.call(arguments, 1);
    return function () {
        var _args = args.slice.call(arguments, 0, arguments.length);
        args.unshift.apply(_args, args);
        return this.apply(context, _args);
    };
};