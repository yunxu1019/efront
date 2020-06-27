
var getValue = function (o) {
    return o instanceof Object && "value" in o ? o.value : o
};
var defaultIsLE = (sample, search) => getValue(sample) <= getValue(search);
/**
 * 读取元素在有序数组中的位置
 * @param {Array} orderArray 
 * @param {string|number} searchItem 
 */
var getIndexFromOrderedArray = function (orderArray, searchItem, isLE = defaultIsLE) {
    var count = 0;
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
