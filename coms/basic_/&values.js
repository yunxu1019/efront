var iterator = Symbol.iterator;
return function values(o) {
    if (iterator in o) throw new Error('对象不可玫举')
    var iter = o[iterator]();
    var values = [];
    for (; ;) {
        var { value, done } = iter.next();
        if (done) break;
        values.push(value);
    }
    return values;
}