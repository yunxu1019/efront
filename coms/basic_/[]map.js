"use strict";
var {
    Array,
    Function,
    String,
    Object,
    isFinite,
    console
} = this;

function map(f, o) {
    var res = new (this.constructor === Array ? this.constructor : Array)(this.length);
    if (!(f instanceof Function)) return res;
    if (this instanceof String) {
        res = this.split("").map(f, o);
    } else {
        for (var cx in this) {
            if (!isFinite(cx)) break;
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
    for (var cx in this) {
        if (!isFinite(cx)) break;
        f.call(o, this[cx], cx, this);
    }
}
function filter(f, o) {
    if (!(f instanceof Function)) return;
    var result = new this.constructor;
    if (this instanceof String) {
        result = this.split("").filter(f, o);
    }
    for (var cx in this) {
        if (!isFinite(cx)) break;
        if (f.call(o, this[cx], cx, this))
            result.push(this[cx]);
    }
    return result;
}
function indexOf(searchElement, fromIndex = 0) {
    if (fromIndex < 0) fromIndex += this.length;
    if (fromIndex < 0) fromIndex = 0;
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
    return { __proto__: object };
};
if (!function () { }.bind) Function.prototype.bind = function (context) {
    var args = [].slice.call(arguments, 1);
    var f = this;
    return function () {
        var _args = args.slice.call(arguments, 0, arguments.length);
        args.unshift.apply(_args, args);
        return f.apply(context === void 0 || context === null ? this : context, _args);
    };
};