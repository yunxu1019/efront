/**
 * 保存数据到有序数组
 * @param {Array} orderArray 
 * @param {string|number} newItem 
 */
module.exports = function (orderArray, newItem, isLE) {
    var cx = getIndexFromOrderedArray(orderArray, newItem, isLE);
    var keep = orderArray[cx] === newItem;
    if (!keep) orderArray.splice(cx + 1, 0, newItem);
    return cx + 1 - keep;
};