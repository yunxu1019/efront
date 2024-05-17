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
        var v = o[k];
        if (!isEmpty(v) && hasOwnProperty.call(o, k)) return String(v);
        if (isString(v)) name = v;
    }
    if (!name && hasOwnProperty.call(o, 'valueOf')) name = o.valueOf();
    if (isString(name)) return name;
    return String(o);
}