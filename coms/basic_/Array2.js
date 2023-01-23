var hasOwnProperty = Object.prototype.hasOwnProperty;
var setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
    for (var p in proto) if (hasOwnProperty.call(proto, p) && !(p in obj)) obj[p] = proto[p];
    obj.constructor = proto.constructor;
    return obj;
}
var wrapMethod = method => function () {
    var res = method.apply(this, arguments);
    res = this.constructor.apply(this, res);
    return res;
};
var map = wrapMethod(Array.prototype.map);
var slice = wrapMethod(Array.prototype.slice);
var filter = wrapMethod(Array.prototype.filter);
var splice = wrapMethod(Array.prototype.splice);

function Array2() {
    var proto = this.constructor.prototype;
    /**
     * @type {PropertyDescriptor}
     */
    if (!hasOwnProperty.call(proto, 'map')) proto.map = map;
    if (!hasOwnProperty.call(proto, 'slice')) proto.slice = slice;
    if (!hasOwnProperty.call(proto, 'filter')) proto.filter = filter;
    if (!hasOwnProperty.call(proto, 'splice')) proto.splice = splice;
    var obj = setPrototypeOf(Array.apply(this, arguments), proto);
    return obj;
}
Array2.prototype = Array.prototype;