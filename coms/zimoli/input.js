var _input = document.createElement("input");
/**
 * @this HTMLInputElement
 */
var number = function (event) {
    var ipt = event.target;
    var { keyCode } = event;
    var { value, type } = ipt;
    var s = this.selectionStart;
    if (keyCode === 13 || keyCode === 18 || keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40 || keyCode === 8 || keyCode === 46 || keyCode === 9) {
    }
    else if (keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 105) {
        if (this.value) {
            if (s < this.value.length) {
                var index = this.value.indexOf('.');
                if (index >= 0 && s > index) {
                    this.value = this.value.slice(0, this.value.length - 1);
                }
                this.setSelectionRange(s, s);
            }
            else if (this.fixed && this.value.replace(/^[^\.]+/, '').length > this.fixed ||
                this.limit && this.value.length >= this.limit && !/\./.test(this.value)) {
                event.preventDefault();
            }
            else if (/^[+-]?0$/.test(this.value)) {
                event.preventDefault();
            }
        }
    }
    else if (keyCode === 110 || keyCode === 190) {
        if (/^int/i.test(type)) {
            event.preventDefault();
        }
        else if (/\./i.test(value)) {
            var index = this.value.indexOf(".");
            if (s < index) {
                this.value = this.value.slice(0, s) + this.value.slice(index + 1);
                this.setSelectionRange(s, s);
            }
            else {
                event.preventDefault();
            }
        }
        else if (!value || /^[\-\+]$/.test(value)) {
            event.preventDefault();
        }
    }
    else if (keyCode === 189 || keyCode === 187) {// 负号 正号
        if (value || this.positive) {
            event.preventDefault();
        }
    }
    else {
        event.preventDefault();
    }
    if (value && !/^[\d]+$/i.test(value)) {
        var m = /([\-\+]?\d+)(\.\d*)?/.exec(value);
        if (m) {
            var v = /^int/i.test(type) ? m[1] : m[0]
            if (value !== v) {
                ipt.value = v;
            }
        }
        else if (!/^[\-\+]$/.test(value)) {
            ipt.value = '';
        }
    }
};
var toFixed = function () {
    if (this.value && this.fixed) {
        var fixed = BigNumber.fix(this.value, this.fixed);
        if (this.value !== fixed) {
            this.value = fixed;
            dispatch(this, 'change');
        }
    }
};
var positiveReg = /^\+|^positive\-?|\-?positive$|\+$/i;
var negativeReg = /^\-|^negative\-?|\-?negative$|\-$/i;
var numberLimit = /\:(\d+)?(?:\.(\d+))?$/;
/**
 * @param {HTMLInputElement} element
 */
function input(element) {
    if (element && /input/i.test(element.tagName)) {
        var type = element.getAttribute("type");
        if (type) {
            var format;
            var m = numberLimit.exec(type);
            if (m) {
                type = type.replace(numberLimit, '');
                var [, limit, fixed] = m;
                if (limit) element.limit = +limit;
                if (fixed) element.fixed = +fixed;
            }
            if (positiveReg.test(type)) {
                type = type.replace(positiveReg, '');
                this.positive = true;
            }
            if (negativeReg.test(type)) {
                type = type.replace(negativeReg, '');
                this.negative = true;
            }
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
                case "price":
                    if (!+element.positive) element.positive = true;
                case "money":
                    if (!element.fixed) element.fixed = 2;
                    on("keydown")(element, number);
                    on("blur")(element, toFixed);
                    break;
                case "natural":
                    if (!+element.positive) element.positive = true;
                case "int":
                case "integer":
                case "number":
                case "num":
                case "digit":
                    on("keydown")(element, number);
                    break;
                default:
                    if (element.limit && !(element.maxLength > 0)) element.maxLength = element.limit;
            }
        }
        return element;
    }
    return _input.cloneNode();
}