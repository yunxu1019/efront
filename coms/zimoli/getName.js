var hasOwnProperty = {}.hasOwnProperty;
function getName(o) {
    var name;
    if (isEmpty(o)) return '';
    if (!isObject(o)) return String(o);
    if (hasOwnProperty.call(o, 'toString')) {
        name = o.toString();
        if (!isEmpty(name)) return String(name);
    }
    if (!isEmpty(o.name)) return String(o.name);
    if (!isEmpty(o.title)) return String(o.title);
    if (!isEmpty(o.label)) return String(o.label);
    if (!isEmpty(o.value)) return String(o.value);
    if (hasOwnProperty.call(o, 'valueOf')) name = o.valueOf();
    if (!isEmpty(name)) return String(name);
    return String(o);
}