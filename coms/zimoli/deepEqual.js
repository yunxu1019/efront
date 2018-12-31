var singleEqual = function (o1, o2) {
    return ol === o2 || isNumber(o1) && isNumber(o2) && isNaN(o1) && isNaN(o2);
};
var objectEqual = function (o1, o2) {
    if (o1.constructor !== o2.constructor) return false;
    var keys1 = Object.keys(o1), keys2 = Object.keys(o2);
    if (keys1.length !== keys2.length) return false;
    keys1.sort(), keys2.sort();
    var restkeys = [];
    for (var cx = 0, dx = keys1.length; cx < dx; cx++) {
        var k = keys1[cx];
        if (keys2[cx] !== k) return false;
        if (o1[k] !== o2[k]) restkeys.push(k);
    }
    for (var cx = 0, dx = restkeys.length; cx < dx; cx++) {
        if (!deepEqual(o1[k], o2[k])) return false;
    }
    if (o1.valueOf instanceof Function && o2.valueOf instanceof Function && o1.valueOf() !== o2.valueOf()) return false;
    if (o1.toString instanceof Function && o2.toString instanceof Function && o1.toString() !== o2.toString()) return false;
    return true;

}
function deepEqual(o1, o2) {
    if (o1 instanceof Object && o2 instanceof Object) {
        return objectEqual(o1, o2);
    } else {
        return singleEqual(o1, o2);
    }
}