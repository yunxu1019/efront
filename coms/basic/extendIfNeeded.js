var hasOwnProperty = {}.hasOwnProperty;
function extendIfNeeded(o1) {
    o1 = Object(o1);
    for (var cx = 1, dx = arguments.length; cx < dx; cx++) {
        var o2 = arguments[cx];
        for (var k in o2) {
            if (hasOwnProperty.call(o2, k) && !(k in o1)) o1[k] = o2[k];
        }
    }
    return o1;
}

module.exports = extendIfNeeded;