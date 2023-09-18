var singleEqual = isSame;
function shallowEqual(o1, o2) {
    // 浅层比对，对内层对象不进行递归比对
    if (o1 === o2) return true;
    if (isObject(o1) && isObject(o2)) {
        var keys1 = Object.keys(o1), keys2 = Object.keys(o2);
        if (keys1.length !== keys2.length) return false;
        keys1.sort(), keys2.sort();
        for (var cx = 0, dx = keys1.length; cx < dx; cx++) {
            var key1 = keys1[cx];
            var key2 = keys2[cx];
            if (key1 !== key2) return false;
            if (!singleEqual(o1[key1], o2[key2])) return false;
        }
        return true;
    }
    return singleEqual(o1, o2);
}
