
var getValue = function (o) {
    return isObject(o) && "value" in o ? o.value : o
};
var arrayIsLE = function (a, b) {
    var a_length = a.length, b_length = b.length;
    var total = a_length < b_length ? a_length : b_length;
    for (var cx = 0, dx = total; cx < dx; cx++) {
        var a0 = a[cx];
        var b0 = b[cx];
        if (a0 !== b0) return a0 <= b0;
    }
    return a_length <= b_length;
};
var isArray = Array.isArray || (a => a instanceof Array);
var defaultIsLE = (sample, search) => isArray(sample) && isArray(search) ? arrayIsLE(sample, search) : getValue(sample) <= getValue(search);
/**
 * 读取元素在有序数组中的位置
 * @param {Array} orderArray 
 * @param {string|number} searchItem 
 */
module.exports = function (orderArray, searchItem, isLE = typeof searchItem === "function" ? searchItem : defaultIsLE) {
    for (var cx = 0, dx = orderArray.length, ci = cx + dx >>> 1; cx < dx; ci = cx + dx >>> 1) {
        var orderItem = orderArray[ci];
        if (isLE(orderItem, searchItem)) {
            cx = ci + 1;
        } else {
            dx = ci;
        }
    }
    var index = dx - 1;
    if (index < orderArray.length) {
        while (index >= 0 && isLE(searchItem, orderArray[index])) {
            if (orderArray[index] === searchItem) return index;
            index--;
        }
    }
    return dx - 1;
};
