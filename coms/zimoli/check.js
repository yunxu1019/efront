// [] 表示或，{} 表示且，如：
// needs = { attr1: [value1, value2] }
// needs = { attr1: value1 }
// needs = [{ attr1: [value1,value2] }, { attr2: value3 }]

var checkValue = function (current, needs) {
    if (needs instanceof Array) {
        return needs.includes(current);
    }
    if (current === needs) return true;
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
    if (needs instanceof Object) {
        for (var k in needs) {
            if (!checkValue(data[k], needs[k])) return false;
        }
        return true;
    }
    return needs === true;
};
export default check;