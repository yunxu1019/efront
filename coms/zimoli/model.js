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
    }
};
function main(data, field) {
    var constructor = constructors[field.type || field.editor] || constructors.input;
    var element = constructor(field);
    element.setAttribute("model", field.key);
    render(element, data);
    return element;
}