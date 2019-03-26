var _input = createElement("input");
function input(element) {
    if (element && /input/i.test(element.tagName)) {
        var type = element.getAttribute("type");
        if (type) {
            switch (type.toLowerCase()) {
                case "date":
                    select(element, selectDate("年月日", input.value));
                    break;
                case "month":
                    select(element, selectDate("年月", input.value));
                    break;
                case "time":
                    select(element, selectDate("时分", input.value));
                    break;
                case "datetime":
                    select(element, selectDate("年月日时分秒", input.value));
                    element.readonly = "readonly";
                    break;
            }
        }
        return element;
    }
    return createElement(_input);
}