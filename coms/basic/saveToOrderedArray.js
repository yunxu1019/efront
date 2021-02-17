/**
 * 保存数据到有序数组
 * @param {Array} orderArray 
 * @param {string|number} newItem 
 */
var saveToOrderedArray = function (orderArray, newItem, isLE) {
    var cx = getIndexFromOrderedArray(orderArray, newItem, isLE);
    var keep = orderArray[cx] === newItem;
    if (!keep) orderArray.splice(cx + 1, 1, newItem);
    return cx + 1 - keep;
};