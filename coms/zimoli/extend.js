/* 
 * 不枝雀
 * 2017-3-18 11:18:18
 */


var extend = Object.assign || function (o1) {
    if (o1 instanceof Object) {
        for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
            var o2 = arguments[cx];
            if (o2 instanceof Object) for (var k in o2) {
                if (hasOwnProperty.call(o2, k)) o1[k] = o2[k];
            }
        }
    }
    return o1;
};