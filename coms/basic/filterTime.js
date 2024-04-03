
function fixLength(minute, length = 2) {
    minute = String(minute);
    if (minute.length >= length) return minute;
    return new Array(length - minute.length + 1).join("0") + minute;
}
var days = "日一二三四五六天";
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
    return formater.replace(/[yY年]+|[M月]+|[hH时]+|毫秒|[m+分]+|[sS]{3}|[Ss秒]+|[星期周天][dD]*|[dD]{3}|[日号dD]+/g, function (m) {
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
        var l = m.split(/\W+/).map(a => a.length);
        var b = m.split(/[\w天]+/).map((a, i) => l[i] ? a + fixLength(v, l[i]) : a).join('');
        return b;
    });
}
function filterTime(time, formater) {
    if (!isHandled(time)) return '';
    var value = time;
    if (isFinite(value)) value = +value;
    if (typeof value === 'string') value = value.replace(/[\\\/]/g, "-")
        .replace(/[年月](\d+)/g, '-$1')
        .replace(/[日号]/, ' ')
        .replace(/[时点分]/g, ":")
        .replace(/[半]/g, "30")
        .replace(/[整]/g, "00")
        .replace(/[一1]刻/g, "15")
        .replace(/[三3]刻/g, "45")
        .replace(/凌晨|早上|上午/g, ' ')
        .replace(/(?:傍?晚上?|下午)(\d+)/g, (_, d) => " " + (+d + 12))
        .replace(/秒/g, '.')
        .replace(/毫/, "")
        .replace(/\.+$/, '')
        .replace(/\s+$/, '')
        .replace(/\s+/g, " ")
        .replace(/^([^\s]+)\s+(\d+)$/g, "$1 $2:00");
    var value = new Date(value);
    if (!+value) {
        return time;
    }
    if (formater && !/^[\-\/]+$/.test(formater)) {
        return format.call(value, formater);
    }
    if (formater) {
        formater = formater.charAt(0);
    }
    var splited = getSplitedDate(value);
    var now = new Date;
    var [year, month, date, hour, minute, second, milli, day] = splited;
    var [year1, month1, date1, hour1, minute1, second1, milli1, day1] = getSplitedDate(now);
    var today = new Date(year1, month1 - 1, date1);
    var thatday = new Date(year, month - 1, date);
    var delta = (today - thatday) / 24 / 3600000;
    if (minute === 0 && second === 0) var time = hour + "点整";
    else if (minute === 30 && second === 0) time = hour + "点半";
    else time = `${hour}:${fixLength(minute)}`;
    if (delta < 7 && delta > 2) {
        if (day >= day1) {
            return `上星期` + days[day] + time;
        }
        return `星期` + days[day] + time;
    }
    else if (delta > -7 && delta < -2) {
        console.log(day, day1)
        if (day <= day1) {
            return `下星期` + days[day] + time;
        }
        return `星期` + days[day] + time;
    }
    switch (delta) {
        case 0:
            if (minute === minute1 && hour === hour1) {
                if (second <= second1) return `刚刚`;
                return `${second - second1}秒后`;
            }
            else if (value > now) {
                if (hour === hour1) {
                    return `${minute - minute1}分钟后`;
                }
                return `还有${hour - hour1}小时${minute - minute1}分钟`;
            }
            return time;
        case -1:
            return "明天" + time;
        case 1:
            return '昨天' + time;
        case 2:
            return '前天' + time;
        case -2:
            return "后天" + time;
        default:
            switch (year1 - year) {
                case 0:
                    if (value > now) {
                        return `今年${month}${formater || '月'}${date}${formater ? '' : '日'} ${time}`;
                    }
                    return `${month}${formater || '月'}${date}${formater ? '' : '日'} `;
                case 1:
                    if (month1 < month) {
                        return `${month}${formater || '月'}${date}${formater ? '' : '日'} `;
                    }
                    return "去年" + month + "月";
                case -1:
                    return "明年" + month + "月" + date + "日";
                case 2:
                    return "前年" + month + "月";
                case -2:
                    return "后年" + month + "月" + date + "日";
            }
            return `${year}${formater || '年'}${month}${formater || "月"}`;
    }
}