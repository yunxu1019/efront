var map = [].map;
var REGEXP = /^(\d{4})?\-?(\d{1,2})?\-?(\d{1,2})?\s?(\d{1,2})?\:?(\d{1,2})?\:?(\d{1,2})?$/;
var model = "年月日时分秒";
var _format = "-- ::";
var _model = ["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds"];
var _limits = [
    [-9999, 9999],
    [0, 11],
    [1],
    [0, 23],
    [0, 59],
    [0, 59]
];
/**
 * 在左边补零到指定的长度
 * @param {*} number 
 * @param {*} length 
 */
var genLength = function (number, length) {
    var str = String(number);
    if (str.length >= length) {
        return str;
    }
    return Array(length + 1 - str.length).join(0) + str;
};
/**
 * 
 * @param {*} date 
 */
var bindValue = function () {
    var date = {};
    var defineProperty = function (key, get, set, c) {
        var m = date[key] = function (arg) {
            if (arguments.length > 0) {
                return set.call(this, arg);
            }
            return get.call(this);
        };
        m.format = _format[c] || "";

    };
    map.call(model, function (m, c) {
        var i = m === "月" ? 1 : 0;
        var l = m === "年" ? 4 : 2;
        var trim = m === "日" ? function (value) {
            if (!value) {
                return 1;
            }
            if (value < 1) {
                return 1;
            }
            var right_limit = getDatesCount(this.年(), this.月());
            if (value > right_limit) {
                return right_limit;
            }
            return parseInt(value);
        } : function (value) {
            if (!value) {
                return 0;
            }
            var limits = _limits[c];
            if (value < limits[0]) {
                return limits[0];
            }
            if (value > limits[1]) {
                return limits[1];
            }
            return value;
        };
        defineProperty(m, function get() {
            return genLength(this['get' + _model[c]]() + i, l);
        }, function set(v) {
            return this['set' + _model[c]](trim.call(this, v - i));
        }, c);
    });
    return function bindValue(_date) {
        for (var k in date) _date[k] = date[k];
        return _date;
    };
}();
var InternelDate = function (dateString = "", dst, default_value) {
    var dd = dst || bindValue(new Date);
    dateString.replace(REGEXP, function (match) {
        for (var cx = 0, dx = arguments.length - 3; cx < dx; cx++) {
            var i = arguments[cx + 1];
            i ? (dd[model[cx]](i)) : cx > 5 && (dd[model[cx]](0));
        }
        return match;
    });
    return dd;
};

/**
 * 读取指定的月份的天数
 * @param {number} year 年份
 * @param {number} month 月份
 */
var getDatesCount = function (year, month) {
    year = year + parseInt(month / 12);
    month = month % 12;
    if (month < 1) {
        month = month + 12;
        year = year - 1;
    }
    if (month > 12) {
        month = month - 12;
        year = year + 1;
    }
    if (month === 2 && !(year % 100 === 0 ? year % 400 : year % 4)) {
        return 29;
    }
    //      1     3     5     7  8    10    12
    return [3, 0, 3, 2, 3, 2, 3, 3, 2, 3, 2, 3][month - 1] + 28;
};
/**
 * 指定的日期是星期几
 * @param {integer} y 
 * @param {integer} m 
 * @param {integer} d 
 */
var getDay = function (y, m, d) {
    return (d + 2 * m + parseInt(3 * (m + 1) / 5) + y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400)) % 7 + 1;
};
/**
 * 创建日期表
 * @param {Object} scope 
 * @param {Date} date 
 */
var buildDate = function (date) {
    var year = parseInt(date.年());
    var month = parseInt(date.月());
    var srcCount = getDatesCount(year, month);
    var src = m2n(srcCount + 1, 1);
    var last_month = getDay(year, month, 1);
    var last_month_count = getDatesCount(year, month - 1);
    var last_src = m2n(last_month_count, last_month_count + 1 - last_month);
    var next_month = 6 - (src.length + last_src.length - 1) % 7;
    var next_src = m2n(next_month + 1, 1);
    var title_src = '一二三四五六日',
        width = fixcent(7),
        height = fixcent((src.length + last_src.length + next_src.length + 7) / 7);
    return [src, width, height, 0, last_src, next_src, title_src];

};
var m2n = function (end, start = 0) {
    var result = Array(end - start);
    while (start < end) {
        result[end - start - 1] = --end;
    }
    return result;
};
/**
 * 根据要显示的个数计算宽高百分比
 * @param {integer} count 
 */
var fixcent = function (count) {
    return (100 / count).toFixed(7).slice(0, 7) + "%"
};
/**
 * 创建年份表
 * @param {Object} scope 
 * @param {Date} date 
 */
var buildYear = function (date) {
    var year = ((+date.年() + 10) / 20).toFixed(0) * 20,
        src = m2n(year + 10, year - 10),
        last_src = [year - 12, year - 11],
        next_src = [year + 10, year + 11],
        width = fixcent(6),
        height = fixcent(4);
    return [src, width, height, year - 11, last_src, next_src];
};
/**
 * 
 * @param {} scope 
 */
var buildMonth = function () {
    var src = "一 二 三 四 五 六 七 八 九 十 十一 十二".split(" ").map(function (i) {
        return i + "月";
    }),
        width = fixcent(4),
        height = fixcent(3);
    return [src, width, height];
};
var buildHours = function (scope) {
    var src = m2n(24),
        width = fixcent(6),
        height = fixcent(4)
    return [src, width, height, -1];
};
var buildMiSe = function (scope) {
    var src = m2n(60),
        width = fixcent(10),
        height = fixcent(6);
    return [src, width, height, -1];
};
var outerbox = document.createElement("div");

var render = function (value, models = "年月日", message = "") {
    var builders = [buildYear, buildMonth, buildDate, buildHours, buildMiSe, buildMiSe];
    var container = document.createElement("div");
    var build = function (index) {
        var builder = builders[index];
        var [src, width, height, addon = 0, last_src = [], next_src = [], title_src = ""] = builder(value);
        var ing = model.charAt(index);
        addon++;
        var src_ing = +value[ing]();
        var style = `width:${width};height:${height}`;
        var getsrc = (cls, s, i) => `<div class=${cls ? cls : "item"} style=${style} value=${i + addon}><span value=${i + addon} class=${cls ? cls : "item"}>${s}</span></div>`;
        var model_buttons = map.call(models, (model, index) => `<span class=${model === ing ? "ing" : "val"}>${value[model]()}&nbsp;${model}</span>`).join("&nbsp;");
        var title = map.call(title_src, (s, i) => getsrc("title", s, i)).join("");
        var last = map.call(last_src, (s, i) => getsrc("last", s, i)).join("");
        var next = map.call(next_src, (s, i) => getsrc("next", s, i)).join("");
        var curr = src.map((s, i) => getsrc(i + addon === src_ing && "iing", s, i)).join("");
        var head = `${last_src ? "<i class=last></i>" : ""}<span>${model_buttons}</span>${next_src ? "<i class=next></i>" : ""}`;
        var body = `${title}${last}${curr}${next}`;
        container.innerHTML = `<div class=chead>${head}</div><div class=cbody>${body}</div><div class=msg>${message}</div>`;
        _src_length = src.length, _ing = ing;
    };
    onselectstart(container, function (event) {
        event.preventDefault();
    });
    var _index = model.indexOf(models) + models.length - 1,
        _src_length, _ing;
    onclick(container, function (event) {
        var target = event.target;
        if (!target.className) return event.preventDefault();
        var preventDefault = true;
        var {
            className,
            tagName,
        } = target;
        var parent_src = models.charAt(_index - 1);
        switch (className) {
            case "last":
                if (tagName === "I") {
                    if (parent_src) value[parent_src](value[parent_src]() - 1);
                    else value[_ing](value[_ing]() - _src_length);
                } else {
                    if (parent_src) value[parent_src](value[parent_src]() - 1);
                    value[_ing](target.innerText);
                }
                break;
            case "next":
                if (tagName === "I") {
                    if (parent_src) value[parent_src](+value[parent_src]() + 1);
                    else value[_ing](+value[_ing]() + _src_length);
                } else {
                    if (parent_src) value[parent_src](+value[parent_src]() + 1);
                    value[_ing](target.innerText);
                }
                break;
            case "item":
            case "iing":
                value[_ing](target.getAttribute("value"));
                _index++;
                if (_index >= models.length) {
                    _index--;
                    preventDefault = false;
                }
                container.value = map.call(models, (model, index) => `${value[model]()}${index + 1 < models.length ? value[model].format : ''}`).join("");
                dispatch("change", container);
                break;
            case "val":
                var val = target.innerText.trim().split(/\s+/);
                _index = model.indexOf(val[1]);
                break;
        }
        build(_index);
        if (preventDefault) {
            event.preventDefault();
        }
    });
    var update = function () {
        if (value !== container.value) build(_index);
        container.value = value;
    };
    update();
    container.update = function (_value) {
        if (_value instanceof Event) {
            _value = _value.target.value;
        }
        _value = filterTime(_value, "y-M-d h:mm:ss");
        _value = InternelDate(_value);
        value = _value;
    };
    on("append")(container, update);
    return container;
};

function main(models = "年月日", value, title) {
    value = filterTime(value, 'y-M-d h:mm:ss');
    value = InternelDate(value);
    var datebox = render(value, models, title);
    addClass(datebox, 'date-' + models.length);
    onmousedown(datebox, e => e.preventDefault());
    return datebox;
}