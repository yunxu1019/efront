var hasOwnProperty = {}.hasOwnProperty;
var keys = Object.keys || function keys(object) {
    var result = [];
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            result.push(k);
        }
    }
    return result;
};