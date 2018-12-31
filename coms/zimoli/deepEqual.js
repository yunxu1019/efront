function deepEqual(o1, o2) {
    if (o1 instanceof Object && o2 instanceof Object) {
        if (o1.constructor !== o2.constructor) return false;
        var keys1 = Object.keys(o1), keys2 = Object.keys(o2);
        if (keys1.length !== keys2.length) return false;
        keys1.sort(), keys2.sort();
        for (var cx = 0, dx = keys1.length; cx < dx; cx++) {
            var k = keys1[cx];
            if (keys2[cx] !== k) return false;
            if (!deepEqual(o1[k], o2[k])) return false;
        }
        if (o1.valueOf instanceof Function && o2.valueOf instanceof Function && o1.valueOf() !== o2.valueOf()) return false;
        if (o1.toString instanceof Function && o2.toString instanceof Function && o1.toString() !== o2.toString()) return false;
        return true;
    } else {
        return ol === o2;
    }
}