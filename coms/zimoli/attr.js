function attr(target, key, value) {
    if (arguments.length === 3) {
        if (value === null) target.removeAttribute(key, value);
        else target.setAttribute(key, value);
    } else if (key instanceof Object) {
        for (var k in key) {
            target.setAttribute(k, key[k]);
        }
    } else if (isString(key)) {
        return target.getAttribute(key);
    }
}