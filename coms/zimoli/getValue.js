var hasOwnProperty = {}.hasOwnProperty;
function getValue(o = this) {
    if (!isObject(o) && !isFunction(o)) return o;
    if (isFunction(o.getValue)) return o.getValue();
    if (hasOwnProperty.call(o, 'valueOf')) return o.valueOf();
    if ("key" in o) return o.key;
    if ("value" in o) return o.value;
    if (hasOwnProperty.call(o, 'toString')) return o.toString();
    if (!isEmpty(o.id)) return o.id;
    return o;
}