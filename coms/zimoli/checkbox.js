function main(elem = document.createElement("checkbox-group")) {
    care(elem, function (field) {
        elem.innerHTML = checkbox;
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
                a.active = !a.active;
                elem.value = this.options.filter(a => !!a.active);
                dispatch(elem, 'change');
            }
        });
        if (elem.value) {
            elem.setValue(elem.value);
        }
    });
    elem.setValue = function (key) {
        var { options } = this.$scope;
        if (!(options instanceof Array)) return;
        var index = options.map(a => a.key).indexOf(key);
        options.active = options[index];
    };
    return elem;
}