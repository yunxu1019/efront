function main(elem = document.createElement("radio-group")) {
    care(elem, function (field) {
        elem.innerHTML = radio;
        var { options } = field;
        if (options instanceof Array) {
            options = options.map((a, i) => {
                if (a instanceof Object) return a;
                return { key: i, name: a };
            });
        } else if (options instanceof Object) {
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
                elem.value = a.key;
                dispatch(elem, 'change');
            }
        });
    });
    return elem;
}