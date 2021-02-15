/**
 * 保存数据到有序数组
 * @param {Array} orderArray 
 * @param {string|number} newItem 
 */
var saveToOrderedArray = function (orderArray, newItem, isLE) {
    var cx = getIndexFromOrderedArray(orderArray, newItem, isLE);
    var replace = orderArray[cx] === newItem;
    orderArray.splice(cx + (1 - replace), replace, newItem);
};