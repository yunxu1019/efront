var hasOwnProperty = {}.hasOwnProperty;
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
        if (!isEmpty(o[k])) return String(o[k]);
        if (isString(o[k])) name = o[k];
    }
    if (hasOwnProperty.call(o, 'valueOf')) name = o.valueOf();
    if (isString(name)) return name;
    return String(o);
}