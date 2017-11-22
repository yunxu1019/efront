var valued_elements_reg = /^(input|textarea|select)$/i;
function val(element, value) {
    if (!element) return;
    if (arguments.length === 2) {
        if (isFunction(element.val)) {
            element.val(value);
        } else if (valued_elements_reg.test(element.tagName)) {
            element.value = value;
        } else {
            text(element, value);
        }
    } else {
        if (isFunction(element.val)) {
            return element.val();
        } else if (valued_elements_reg.test(element.tagName)) {
            return element.value;
        } else {
            return text(element);
        }
    }
}