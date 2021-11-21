var hasOwnProperty = {}.hasOwnProperty;
var getValue = function (o) {
    if (hasOwnProperty.call(o, 'valueOf')) return o.valueOf();
    if ("id" in o) return o.id;
    if ("key" in o) return o.key;
    if ("value" in o) return o.value;
    if (hasOwnProperty.call(o, 'toString')) return o.toString();
    return o;
};
function main(elem = document.createElement("radio-group")) {
    care(elem, function (field) {
        elem.innerHTML = radio;
        var { options } = field;
        if (options instanceof Array) {
            options = options.map((a, i) => {
                if (isObject(a)) return a;
                return { key: i, name: a };
            });
        } else if (isObject(options)) {
            options = Object.keys(field.options).map(k => ({ name: options[k], key: k }));
        } else {
            options = null;
        }
        render(elem, {
            a: button,
            field,
            options,
            select(a) {
                this.options.active = a;
                elem.value = getValue(a);
                dispatch(elem, 'change');
            }
        });
        if (!isEmpty(elem.value)) {
            elem.setValue(elem.value);
        }
    });
    elem.setValue = function (key) {
        var { options } = this.$scope;
        if (!(options instanceof Array)) return;
        var index = options.map(a => getValue(a)).indexOf(key);
        options.active = options[index];
    };
    return elem;
}