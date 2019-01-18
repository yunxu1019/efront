function seek(source, keeys) {
    if (keeys instanceof Array) {
        var temp = source;
        for (var cx = 0, dx = keeys.length; cx < dx; cx++) {
            if (temp === void 0 || temp === null) break;
            var key = keeys[cx];
            temp = temp[key];
        }
        return temp;
    }
    return source !== void 0 && source !== null ? source[keeys] : source;
}
/**
 * 输出结果与search具有相同的属性，相应的值是search的值在source中搜索得到的结果
 * @param {Array|Object|string|number} search 传入数组，则提取结果为数组，传入object，则提取结果为object
 * @param {Object|Array} source 
 */
function extract(search, source) {
    var dest = search instanceof Array ? [] : {};
    if (search instanceof Object) {
        Object.keys(search).forEach(function (key) {
            dest[key] = seek(source, search[key]);
        })
    } else {
        dest = seek(source, search);
    }
    return dest;
}