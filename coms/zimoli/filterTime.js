
function fixLength(minute, length = 2) {
    minute = String(minute);
    if (minute.length >= length) return minute;
    return new Array(length - minute.length + 1).join("0") + minute;
}
var days = "天一二三四五六";
function format(formater) {
    var v = getSplitedDate(this);
    var o = {};
    "yMdhmsSD".split("").forEach(function (k, i) {
        o[k] = v[i];
    });
    "年月日时分秒".split("").forEach(function (k, i) {
        o[k] = v[i];
    });

    o.Y = o.y;
    o.D = o.d;
    o.H = o.h;
    o.Day = v[v.length - 1];
    formater.replace(/[yY年]+|[M月]+|[hH时]+|毫秒|[m+分]+|[sS]{3}|[Ss秒]+|[星期周天][dD]*|[dD]{3}|[日号dD]+/g, function (m) {
        if (/^[dD]{3}$/.test(m)) {
            return o.Day;
        }
        if (/星期周天/.test(m)) {
            var v = days[o.Day]
            if (!/[天星期]/.test(m)) {
                m = m.replace(/天/g, "日");
            }
        } else {
            var a = m.charAt(0);
            var v = o[a];
        }
        var l = m.replace(/\W+/g, "");
        var b = m.split(/[\w天]+/).map(a => a || fixLength(v, l.length)).join("");
        return b;
    });
}
function filterTime(time, format) {
    if (isFinite(time)) time = +time;
    var value = new Date(time);
    if (!+value) {
        return time;
    }
    if (format && !/^[\-\/]+$/.test(format)) {
        return format.call(value, format);
    }
    if (format) {
        format = format.charAt(0);
    }
    var splited = getSplitedDate(value);
    var [year, month, date, hour, minute, second, milli, day] = splited;
    var [year1, month1, date1, hour1, minute1] = getSplitedDate(new Date);
    var today = new Date(year1, month1 - 1, date1);
    var thatday = new Date(year, month - 1, date);
    var delta = (today - thatday) / 24 / 3600000;
    var time = `${hour}:${fixLength(minute)}`;
    if (delta < 6 && delta > 2) {
        return `星期` + days[day] + hour + "点";
    }
    switch (delta) {
        case 0:
            if (minute === minute1 && hour === hour1) {
                return `刚刚`;
            }
            return time;
        case 1:
            return '昨天' + hour + "点"
        case 2:
            return '前天' + hour + "点"
        default:
            switch (year1 - year) {
                case 0:
                    return `${month}${format || '月'}${date}${format ? '' : '日'} `;
                case 1:
                    if (month1 < month) {
                        return `${month}${format || '月'}${date}${format ? '' : '日'} `;
                    }
                    return "去年" + month + "月";
                case 2:
                    return "前年" + month + "月";
            }
            return `${year}${format || '年'}`;
    }
}