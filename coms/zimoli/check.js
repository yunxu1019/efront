// [] 表示或，{} 表示且，如：
// needs = { attr1: [value1, value2] }
// needs = { attr1: value1 }
// needs = [{ attr1: [value1,value2] }, { attr2: value3 }]

var typereg = /^(number|boolean|bigint)$/;
var checkValue = function (current, needs) {
    if (needs instanceof Array) {
        for (var cx = 0, dx = needs.length; cx < dx; cx++) {
            var value = needs[cx];
            if (checkValue(current, value)) return true;
        }
        return false;
    }
    if (isFunction(needs)) return needs(current);
    if (current === needs) return true;
    if (isEmpty(current) && isEmpty(needs)) return true;
    if (typereg.test(typeof current) && typereg.test(typeof needs) && +current === +needs) return true;
    if (!isEmpty(current) && !isEmpty(needs) && +current === +needs) return true;
    return false;
};
var check = function (data, needs) {
    if (!needs) return true;
    if (needs instanceof Array) {
        for (var cx = 0, dx = needs.length; cx < dx; cx++) {
            var need = needs[cx];
            if (check(data, need)) return true;
        }
        return false;
    }
    if (!data) return false;
    if (isObject(needs)) {
        for (var k in needs) {
            if (/!$/.test(k)) {
                if (checkValue(seek(data, k.slice(0, k.length - 1)), needs[k])) return false;
            }
            else if (!checkValue(seek(data, k), needs[k])) return false;
        }
        return true;
    }
    return needs === true;
};
check.default = check.check = check;