var _input = createElement("input");
var number = function (event) {
    var ipt = event.target;
    var { keyCode } = event;
    var { value, type } = ipt;
    if (keyCode === 13 || keyCode === 18 || keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40 || keyCode === 8 || keyCode === 46 || keyCode === 9) {
    }
    else if (keyCode >= 49 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105) {
    } else if (keyCode === 110 || keyCode === 190) {
        if (/^int/i.test(type)) {
            event.preventDefault();
        } else if (/\./i.test(value) || !value || /^[\-\+]$/.test(value)) {
            event.preventDefault();
        }
    } else if (keyCode === 189 || keyCode === 187) {// 负号 正号
        if (value || /^natural|positive/i.test(type)) {
            event.preventDefault();
        }
    } else {
        event.preventDefault();
    }
    if (value && !/^[\d]+$/i.test(value)) {
        var m = /([\-\+]?\d+)(\.\d*)?/.exec(value);
        if (m) {
            var v = /^int/i.test(type) ? m[1] : m[0]
            if (value !== v) {
                ipt.value = v;
            }
        } else if (!/^[\-\+]$/.test(value)) {
            ipt.value = '';
        }
    }
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
                case "int":
                case "integer":
                case "integer":
                case "number":
                case "num":
                case "natural":
                    on("keydown")(element, number);
                    break;
            }
            if (format) {
                var picker = selectDate(format, input.value);
                on("change")(element, picker.update);
                select(element, picker);
                element.readonly = "readonly";
            }
        }
        return element;
    }
    return createElement(_input);
}