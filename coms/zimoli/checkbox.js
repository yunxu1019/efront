function main(elem = document.createElement("checkbox-group")) {
    care(elem, function (field) {
        elem.innerHTML = checkbox;
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
        buildValue(elem.value, options);
        render(elem, {
            a: button,
            field,
            r: checker,
            options,
            select(a) {
                a.checked = !a.checked;
                elem.checked = elem.value = this.options.filter(a => !!a.checked);
                buildValue(elem.value, this.options);
                dispatch(elem, 'change');
            }
        });
        if (elem.value) {
            elem.setValue(elem.value);
        }
    });
    var buildValue = function (value, options) {
        if (!(options instanceof Array)) return;
        if (!(value instanceof Array)) return;

        var checked = {};
        var optionsMap = {};
        options.forEach(o => optionsMap[o.key] = o);
        value.forEach(v => {
            var o = optionsMap[isObject(v) ? v.key : v];
            if (o) {
                o.checked = true;
                checked[o.key] = o;
            }
        });
        value.checked = checked;
    };
    elem.setValue = function (value) {
        var { options } = this.$scope;
        buildValue(value, options);
    };
    return elem;
}