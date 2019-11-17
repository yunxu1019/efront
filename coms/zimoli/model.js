/**
 * 支持任意类型的数据的编辑展示及过滤
 */
var getOptions = function () {
};
var constructors = {
    input,
    date(field) {
        var elem = input();
        var picker = datepicker(field.options);
        select(elem, picker);
        return elem;
    },
    radio() {
        var elem = input();
        elem.setAttribute("type", "radio");
        return elem;
    },
    select(field) {
        var elem = input();
        return elem;
    },
    tree(field) {
        var elem = input();
        return elem;
    },
    text(field, data) {
        var ipt = input();
        ipt.setAttribute("ng-model", "data[field.key]");
        render(ipt, {
            field,
            data
        });
        return ipt;
    },
    'checkbox'() {
        var elem = input();
        elem.setAttribute("type", "checkbox");
        return elem;
    },
    'multi-select'() {
        var elem = input();
        return elem;
    },
    'multi-tree'() {
        var elem = input();
        return elem;
    },
    "range"() {
        var elem = input();
        return elem;
    },
    "none"() {

    }
};
var readonly_types = {
    "date"() {

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
            if (readonly) {
                elem.innerHTML = '<span ng-bind=get()></span>';
                var type = elem.getAttribute('type');
                if (type !== field.type) {
                    elem.setAttribute("type", field.type);
                }
                render(elem, {
                    get() {
                        var type = field.type || field.editor;
                        var editor = readonly_types[type];
                        if (editor) {
                            return editor(field, data);
                        }
                        return data[field.key];
                    }
                });
            } else {
                var editor = constructors[field.type];
                var input = editor ? editor(field, data) : input();
                remove(elem.children);
                if (input) appendChild(elem, input);
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