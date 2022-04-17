/**
 * {a:b,c:d, ...z} = o;
 * params (o , [a,c])
 * return z
 */
function rest_(o, keys) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
    var map = Object.create(null);
    for (var k of keys) map[k] = true;
    var res = Object.create(null);
    for (var k in o) {
        if (hasOwnProperty.call(o, k)) {
            if (k in map) continue;
            res[k] = o[k];
        }
    }
    if (typeof Object.getOwnPropertySymbols === 'function') {
        for (var k of Object.getOwnPropertySymbols(o)) {
            if (propertyIsEnumerable.call(o, k)) {
                if (k in map) continue;
                res[k] = o[k];
            }
        }
    }
    return res;
}