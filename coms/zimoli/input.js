var _input = createElement("input");
function input(element) {
    if (element && /input/i.test(element.tagName)) {
        var type = element.getAttribute("type");
        if (type) {
            var format;
            switch (type.toLowerCase()) {
                case "date":
                    format = "年月日";
                    break;
                case "month":
                    format = "年月";
                    break;
                case "time":
                    format = "时分";
                    break;
                case "datetime":
                    format = "年月日时分秒";
                    break;
            }
            if (format) {
                element.getValue = function () {
                    return new Date(this.value);
                };
                element.setValue = function (value) {
                    this.value = new Date(value).toLocaleString(undefined, { hour12: false })
                };
                select(element, selectDate(format, input.value));
                element.readonly = "readonly";
            }
        }
        return element;
    }
    return createElement(_input);
}