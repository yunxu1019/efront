var hasOwnProperty = {}.hasOwnProperty;
function getName(o) {
    if (hasOwnProperty.call(o, 'toString')) return o.toString();
    if ("name" in o) return o.name;
    if ("title" in o) return o.name;
    if ("label" in o) return o.label;
    if ("value" in o) return o.value;
    if (hasOwnProperty.call(o, 'valueOf')) return o.valueOf();
    return o;
}