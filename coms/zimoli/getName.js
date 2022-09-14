var hasOwnProperty = {}.hasOwnProperty;
var isName = function (a) {
    return !isEmpty(a) || isString(a);
};
var keys = ["name", 'title', 'label', 'value'];
function getName(o) {
    var name;
    if (isEmpty(o)) return '';
    if (!isObject(o)) return String(o);
    if (hasOwnProperty.call(o, 'toString')) {
        name = o.toString();
        if (!isEmpty(name)) return String(name);
    }
    for (var k of keys) {
        if (!hasOwnProperty.call(o, k)) continue;
        if (isName(o[k])) return o[k];
    }
    if (hasOwnProperty.call(o, 'valueOf')) name = o.valueOf();
    return String(o);
}