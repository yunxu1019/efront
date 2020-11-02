/**
 * 支持任意类型的数据的编辑展示及过滤
 */
var rebuildOptions = function () {
    var elem = this;
    var { $scope } = elem;
    if (!$scope) return;
    var { data, field } = $scope;
    if (!data || !field) return;
    var { options_from, options } = field;
    var new_options = seek(data, options_from);
    if (new_options !== options) {
        field.options = new_options;
        render.refresh();
    }
};
var copyOptionData = function () {
    var { $scope } = this;
    if (!$scope) return;
    var { data, field } = $scope;
    if (!data || !field) return;
    var { option_to, options } = field;
    if (!options) return;
    var value = data[field.key];
    var option = isObject(value) ? value : value in options ? options[value] : value;
    extend(data, seek(option, option_to));
};
var renderModel = function (field, data) {
    var ipt = this;
    ipt.setAttribute("ng-model", "data[field.key]");
    render(ipt, {
        field,
        data
    });
};
var constructors = {
    input,
    text: textarea,
    date({ field }) {
        var elem = input();
        var picker = datepicker(field.options);
        select(elem, picker);
        return elem;
    },
    color(field) {
        return colorpicker();
    },
    image({ field }) {
        var img = image();
        var { options } = field;
        if (options) img.setAttribute("uploadto", options.uploadto);
        return img;
    },
    checkbox({ field }) {
        var elem = checkbox();
        cast(elem, field);
        return elem;
    },
    radio({ field }) {
        var elem = radio();
        cast(elem, field);
        return elem;
    },
    select() {
        var elem = select();
        elem.innerHTML = `<option ng-repeat="(o,i) in field.options" ng-bind="o.name||o" _value="o.key!==undefined?o.key:i"></option>`;
        return elem;
    },
    "repeat"(_, field_type) {
        var elem = input();
        elem.renders = [function () {
            var { field, data } = this.$scope;
            var { status } = this;
            var valid = this.value === data[field_type];
            if (!this.dirty) {
                status = 'clean';
            } else if (isEmpty(this.value)) {
                if (field.is_required) {
                    status = 'required';
                } else {
                    status = 'empty';
                }
            } else {
                status = valid ? 'pass' : 'error';
            }
            this.status = status;
            this.valid = valid;
        }];
        return elem;
    },
    "none"() {

    }
};
var readonly_types = {
    "date"(field, data) {
        var string = data[field.key];
        var value = new Date(string);
        var toFixed = function (a) {
            return a > 9 ? a : "0" + a;
        };
        return +value ? [value.getFullYear(), value.getMonth() + 1, value.getDate()].map(toFixed).join('-') : string;
    },
    "size"(field, data) {
        var f = data[field.key];
        var log = Math.log(f) / Math.LN2 / 10 | 0;
        f /= Math.pow(2, log * 10);
        f = +f.toFixed(2);
        return f + "KMGTPEZY".charAt(log - 1) + "B";
    }
};
function main(elem) {
    var build = function () {
        var { data, readonly, field } = elem;

        if (!field || !data) return;
        var run = function () {
            var function_type = "function";
            if (data !== elem.data || field !== elem.field || readonly !== elem.readonly) return;
            var field_type = field.type || field.editor, field_editor = field.editor || field.type;
            if (field_editor instanceof Function && field_type === field_editor) {
                field_type = function_type;
            }
            if (!(field_editor instanceof Function)) {
                field_editor = null;
            }
            if (/\?/.test(field_type)) {
                var [field_type, field_ref] = field_type.split("?");
            }
            var type = elem.getAttribute('type');
            if (type !== field_type) {
                elem.setAttribute("type", field_type);
            }
            remove(elem.children);
            if (readonly) {
                elem.innerHTML = '<span ng-bind=get()></span>';
                if (field_type === "function") {
                    field_editor(elem);
                } else {
                    render(elem, {
                        get() {
                            var create = readonly_types[field_type];
                            if (create) {
                                return create(elem, data, field_ref);
                            }
                            return seek(data, field.key);
                        }
                    });
                }
            } else {
                var create = field_type === "function" ? field_editor : constructors[field_type];
                var ipt = create ? create(elem, field_ref) : input();

                if (ipt) {
                    if (ipt !== elem) appendChild(elem, ipt);
                    if (!ipt.$scope) {
                        renderModel.call(ipt, field, data);
                        var saved_sataus;
                        ipt.renders.push(function () {
                            var { valid, status } = this;
                            if (elem.valid !== valid) elem.valid = valid;
                            if (saved_sataus === status) return;
                            saved_sataus = status;
                            elem.setAttribute('status', saved_sataus);
                        });
                    } else {
                        on("change")(ipt, function () {
                            data[field.key] = getValue.call(this);
                        });
                        setValue.call(ipt, data[field.key]);
                    }
                    if ("option_to" in field) {
                        on("change")(ipt, copyOptionData);
                    }
                    if ("options_from" in field) {
                        ipt.renders.push(rebuildOptions);
                    }
                }
            }
        };
        if (data.loading_promise || field.loading_promise) {
            Promise.all([
                data.loading_promise,
                field.loading_promise
            ]).then(run);
        } else {
            run();
        }
    };
    on("changes")(elem, function ({ changes }) {

        if (changes.data || changes.field || changes.readonly) {
            build();
        }
    });
    return elem;
}

extend(main, {
    setEditors(map) {
        extend(constructors, map);
    },
    setReadors(map) {
        extend(constructors, map);
    },
    setEditor(key, func) {
        constructors[key] = func;
    },
    setReador(key, func) {
        readonly_types[key] = func;
    },
});