function main(elem = document.createElement("radio-group")) {
    care(elem, function (field) {
        elem.innerHTML = radio;
        if (field instanceof Array) {
            options = field;
        }
        else var { options } = field;
        var value = this.value;
        if (options instanceof Array) {
            var actived = null;
            options = options.map((a, i) => {
                if (isObject(a)) {
                    if (value === a.key) actived = a;
                    return a;
                }
                a = { key: i, name: a };
                if (value === i) actived = a;
                return a;
            });
        } else if (isObject(options)) {
            options = Object.keys(field.options).map(k => {
                var o = { name: options[k], key: k };
                if (value === k) actived = o;
                return o;
            });
        } else {
            options = null;
        }
        if (actived) options.active = actived;
        render(elem, {
            a: button,
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
        console.log("options", options)
    });
    elem.setValue = function (key) {
        var { options } = $scoped.get(this);
        elem.value = key;
        if (!(options instanceof Array)) return;
        var index = options.map(a => getValue(a)).indexOf(key);
        options.active = options[index];
    };
    return elem;
}