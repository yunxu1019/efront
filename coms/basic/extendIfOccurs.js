var isObject = require("./isObject");
function extendIfOccurs(o1) {
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;// ie8 存在此方法
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    o1 = Object(o1);
    var ks = [];
    for (var k in o1) {
        if (!hasOwnProperty.call(o1, k)) continue;
        var f = getOwnPropertyDescriptor(o1, k);
        if (!f.writable && !f.set) continue;
        ks.push(k);
    }
    for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
        var o2 = arguments[cx];
        if (isObject(o2)) for (var k of ks) {
            if (k in o2) o1[k] = o2[k];
        }
    }
    return o1;
}
module.exports = extendIfOccurs;
