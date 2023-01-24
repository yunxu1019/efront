var hasOwnProperty = Object.prototype.hasOwnProperty;
var setPrototypeOf = Object.setPrototypeOf;
a: if (!setPrototypeOf) {
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var defineProperty = Object.defineProperty;
    try {
        defineProperty({}, 'o', { value: 0 });
        setPrototypeOf = function (obj, proto) {
            for (var n of getOwnPropertyNames(proto)) {
                var d = getOwnPropertyDescriptor(proto, n);
                defineProperty(obj, n, d);
            }
            return obj;
        }
        break a;
    } catch (e) {
        getOwnPropertyDescriptor = null;
        defineProperty = null;
        getOwnPropertyNames = null;
    }
    // <!--
    console.error('当前运行环境使用class extends Array会有难以解决的不兼容性问题，请更换代码的实现方式！');
    // -->
    setPrototypeOf = function (obj, proto) {
        for (var p in proto) if (hasOwnProperty.call(proto, p) && !(p in obj)) obj[p] = proto[p];
        obj.constructor = proto.constructor;
        return obj;
    }
}
var wrapMethod = method => function () {
    var res = method.apply(this, arguments);
    var res0 = this.constructor.apply(this, []);
    res0.length = res.length;
    for (var k in res) {
        k = +k;
        if ((k & 0x7fffffff) !== k) break;
        res0[k] = res[k];
    }
    return res0;
};
var map = wrapMethod([].map);
var slice = wrapMethod([].slice);
var filter = wrapMethod([].filter);
var splice = wrapMethod([].splice);
var concat = wrapMethod([].concat);

function Array2() {
    var proto = this.constructor.prototype;
    /**
     * @type {PropertyDescriptor}
     */
    if (!hasOwnProperty.call(proto, 'map')) proto.map = map;
    if (!hasOwnProperty.call(proto, 'slice')) proto.slice = slice;
    if (!hasOwnProperty.call(proto, 'filter')) proto.filter = filter;
    if (!hasOwnProperty.call(proto, 'splice')) proto.splice = splice;
    if (!hasOwnProperty.call(proto, 'concat')) proto.concat = concat;
    var obj = setPrototypeOf(Array.apply(this, arguments), proto);
    return obj;
}
Array2.prototype = Array.prototype;