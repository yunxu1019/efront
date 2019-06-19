var _input = createElement("input");
function input(element) {
    if (element && /input/i.test(element.tagName)) {
        var type = element.getAttribute("type");
        if (type) {
            var format;
            switch (type.toLowerCase()) {
                case "date":
                    format = "年月日";
                    element.getValue = function () {
                        return new Date(this.value);
                    };
                    element.setValue = function (value) {
                        var date = new Date(value);
                        this.value = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(a => a < 10 ? '0' + a : a).join("-");
                    };
                    break;
                case "datetime":
                    format = "年月日时分秒";
                    element.getValue = function () {
                        return new Date(this.value);
                    };
                    element.setValue = function (value) {
                        this.value = new Date(value).toLocaleString(undefined, { hour12: false });
                    };
                    break;
            }
            if (format) {
                select(element, selectDate(format, input.value));
                element.readonly = "readonly";
            }
        }
        return element;
    }
    return createElement(_input);
}