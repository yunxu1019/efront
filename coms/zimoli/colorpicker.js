function main(element = document.createElement("div")) {
    element.innerHTML = colorpicker;
    var saved_value;
    var selector = element.firstChild;
    var pad = colorpad();
    select(selector, pad, false, 'y');
    render(element, {
        a: button,
        colorlabel,
        setModel(value) {
            if (saved_value === void 0) {
                saved_value = element.value || '';
            }
            element.value = value;
            cast(selector, value);
            dispatch(element, "change");
        },
        reset() {
            if (saved_value !== void 0) {
                selector.value = saved_value;
                cast(selector, saved_value);
                dispatch(selector, 'change');
            }
        }
    });
    element.setValue = function (value) {
        element.value = value;
        cast(selector, value);
        pad.setValue(value);
    };
    return element;
}