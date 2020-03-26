var _input = createElement("input");
var number = function () {
    var reg = /^[\s\S]*?(\d+)(\.\d*)?[\s\S]*$/;
    var value;
    if (!reg.test(this.value)) value = '';
    else value = this.value;
    value = String(value).replace(reg, "$1$2");
    if (this.value !== value) this.value = value;
    console.log(this.value, value);
};
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
                case "money":
                    on("input")(element, number);
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