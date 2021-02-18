
var getValue = function (o) {
    return isObject(o) && "value" in o ? o.value : o
};
var defaultIsLE = (sample, search) => getValue(sample) <= getValue(search);
/**
 * 读取元素在有序数组中的位置
 * @param {Array} orderArray 
 * @param {string|number} searchItem 
 */
module.exports = function (orderArray, searchItem, isLE = defaultIsLE) {
    for (var cx = 0, dx = orderArray.length, ci = cx + dx >>> 1; cx < dx; ci = cx + dx >>> 1) {
        var orderItem = orderArray[ci];
        if (isLE(orderItem, searchItem)) {
            cx = ci + 1;
        } else {
            dx = ci;
        }
    }
    return dx - 1;
};
