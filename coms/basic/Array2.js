var setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    for (var p in proto) if (!hasOwnProperty.call(obj)) obj[p] = proto[p];
    return obj;
}
function Array2() {
    return setPrototypeOf(Array.apply(this, arguments), this.constructor.prototype);
}
Array2.prototype = Array.prototype;