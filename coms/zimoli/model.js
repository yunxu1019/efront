"use ../basic/size.js";
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
        delete field.optionsMap;
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
    raw: input,
    swap(e) {
        var { field } = e;
        e = swap(e);
        if (field.options) {
            e.getValue = function () {
                return field.options[+this.checked].value;
            };
        }
        return e;
    },
    success(e) {
        success(e);
        e.innerHTML = `<span ng-html="field.comment"></span>`;
        render(e.children, e.$scope, e.$parentScopes);
        return e;
    },
    switch: swap,
    row: textarea,
    password,
    text: textarea,
    date() {
        var elem = document.createElement("input");
        elem.type = "date";
        elem.renders = [function () {
            var { data, field } = this.$scope;
            if (data && field) elem.value = parseDate(data[field.key]);
        }]
        input(elem);
        return elem;
    },
    color() {
        return colorpicker();
    },
    title() {
    },
    name() { },
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
    select(_, t) {
        if (!t) {
            var elem = select();
            elem.innerHTML = `<option ng-repeat="(o,i) in field.options" ng-bind="o.name||o" _value="o.key!==undefined?o.key:o"></option>`;
        }
        else if (t === 'a') {
            var { field, data } = _;
            var opt = null;
            for (var cx = 0, options = field.options, dx = options.length; cx < dx; cx++) {
                var o = options[cx];
                if (o.key === data[field.key]) {
                    opt = o;
                    o.selected = true;
                    break;
                }
            }
            var pad = selectList(field.options, !!field.multi, true);
            var e = document.createElement('select');
            e.innerHTML = `<option selected value="${opt ? opt.key : ''}">${opt ? opt.name : '请选择'}</option>`;
            e.value = opt ? opt.key : '';
            elem = select(e, pad);
        }
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
    "date"({ field }, data) {
        var string = data[field.key];
        return parseDate(string);
    },
    "url"({ field }, data) {
        var href = data[field.key];
        var e = anchor2(href, href);
        e.target = "_blank";
        return e;
    },
    "size"({ field }, data) {
        var f = data[field.key];
        return size(f);
    },
    html(a, data) {
        var t = document.createElement("span");
        t.innerHTML = seek(data, a.field.key);
        return t;
    },
    swap(e, data) {
        var { field } = e;
        var v = data[field.key];
        if (field.options) {
            if (!field.optionsMap) field.optionsMap = createOptionsMap(field.options);
            var o = field.optionsMap[v];
            if (o) return o.name;
        }
        if (isEmpty(v)) v = '';
        return v;
    },
};
var createOptionsMap = function (options) {
    var map = Object.create(null);
    for (var o of options) {
        map[o.key] = o;
    }
    return map;
}
readonly_types.select = readonly_types.swap;
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
            if (readonly || field.readonly) {
                if (field_type === "function") {
                    field_editor(elem);
                } else {
                    var create = readonly_types[field_type];
                    if (create) {
                        var e = create(elem, data, field_ref);
                        if (isNode(e)) {
                            appendChild(elem, e);
                        }
                        else {
                            elem.innerHTML = e;
                        }
                        return;
                    }
                    elem.innerHTML = '<span ng-bind=get()></span>';
                    render(elem, {
                        get() {
                            var value = seek(data, field.key);
                            if (field.options) {
                                if (!field.optionsMap) {
                                    var map = Object.create(null);
                                    for (var o of field.options) {
                                        var v = getValue(o);
                                        map[v] = o;
                                    }
                                    field.optionsMap = map;
                                }
                                var map = field.optionsMap;
                                if (value in map) {
                                    value = getName(map[value]);
                                }
                            }
                            return value;
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
        extend(readonly_types, map);
    },
    setModels(key, map) {
        this.setEditors(key, map);
        this.setReadors(key, map);
    },
    setEditor(key, func) {
        constructors[key] = func;
    },
    setReador(key, func) {
        readonly_types[key] = func;
    },
    setModel(key, func) {
        this.setEditor(key, func);
        this.setReador(key, func);
    },
});

main.setEditers = main.setEditors;
main.setReaders = main.setReadors;
main.setReader = main.setReador;
main.setEditer = main.setEditor;