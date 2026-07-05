var slice = Array.prototype.slice;
return function (a, i = 0, e = a.length) {
    return slice.call(a, i, e);
}