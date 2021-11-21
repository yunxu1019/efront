var hasOwnProperty = {}.hasOwnProperty;
function getValue(o = this) {
    if (isFunction(o.getValue)) return o.getValue();
    if (hasOwnProperty.call(o, 'valueOf')) return o.valueOf();
    if ("id" in o) return o.id;
    if ("key" in o) return o.key;
    if ("value" in o) return o.value;
    if (hasOwnProperty.call(o, 'toString')) return o.toString();
    return o;
}