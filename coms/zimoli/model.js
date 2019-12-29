/**
 * 支持任意类型的数据的编辑展示及过滤
 */
var getOptions = function () {
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
    date(field) {
        var elem = input();
        var picker = datepicker(field.options);
        select(elem, picker);
        return elem;
    },
    select,
    "repeat"(elem, field_type) {
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
        var log = Math.log2(f) / 10 | 0;
        f /= Math.pow(2, log * 10);
        f = +f.toFixed(2);
        return f + "KMGT".charAt(log - 1) + "B"
    }
}
function main(elem) {
    var build = function () {
        var { data, readonly, field } = elem;
        if (!field || !data) return;
        var run = function () {
            if (data !== elem.data || field !== elem.field || readonly !== elem.readonly) return;
            var field_type = field.type || field.editor;
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
                render(elem, {
                    get() {
                        var create = readonly_types[field_type];
                        if (create) {
                            return create(field, data, field_ref);
                        }
                        return data[field.key];
                    }
                });
            } else {
                var create = constructors[field_type];
                var ipt = create ? create(elem, field_ref) : input();
                if (ipt) {
                    if (ipt !== elem) appendChild(elem, ipt);
                    renderModel.call(ipt, field, data);
                    var saved_sataus;
                    ipt.renders.push(function () {
                        var { valid, status } = this;
                        if (elem.valid !== valid) elem.valid = valid;
                        if (saved_sataus === status) return;
                        saved_sataus = status;
                        elem.setAttribute('status', saved_sataus);
                    });
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

    }
    on("changes")(elem, function ({ changes }) {
        if (changes.data || changes.field || changes.readonly) {
            build();
        }
    });
    return elem;
}