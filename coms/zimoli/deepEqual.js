function deepEqual(o1, o2) {
    if (o1 instanceof Object && o2 instanceof Object) {
        if (o1.constructor !== o2.constructor) return false;
        for (var k in o1) {
            if (!deepEqual(o1[k], o2[k])) return false;
        }
        if (o1.valueOf instanceof Function && o2.valueOf instanceof Function && o1.valueOf() !== o2.valueOf()) return false;
        if (o1.toString instanceof Function && o2.toString instanceof Function && o1.toString() !== o2.toString()) return false;
        return true;
    } else {
        return ol === o2;
    }
}