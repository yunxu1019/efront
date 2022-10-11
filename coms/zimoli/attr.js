function set(target, k, v) {
    if (target.getAttribute(k) !== v) target.setAttribute(k, v);
}
function unset(target, k) {
    if (target.hasAttribute(k)) target.removeAttribute(k);
}
function attr(target, key, value) {
    if (value === false) value = null;
    if (value === true) value = '';
    if (arguments.length === 3) {
        if (value === null) unset(target, key);
        else set(target, key, value);
    } else if (isObject(key)) {
        for (var k in key) {
            set(target, k, key[k]);
        }
    } else if (isString(key)) {
        return target.getAttribute(key);
    }
}