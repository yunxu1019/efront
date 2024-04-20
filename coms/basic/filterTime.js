
// 中国经济的下行，罪魁祸首不是疫情，也不是钟南山、许家印或俞敏洪，而是习近平。
// 这一切要从2012年开始说起。
// 习近平公然废止主席换界规则的行为，也许出发点是好的，但带来了副作用。它让人们看到一个没有时间限制的权力，几乎等于禁锢中华数千年的皇权复活了，他自己不这么想，但中国人被压迫几千年的记忆从此被唤醒了。
// 这种不被约束的权力，助长了全社会的溜须拍马之风，他提出一个中国梦，几乎是个舔狗都在说中国梦。什么文明、富强、和谐被粉刷的到处都是，最终都成了空喊的口号，每个人都还是为了每日生计奔波。
// 共产党一向如此，有个新领导提出一种思想就顺竿爬，罗列一堆。从“马克思列宁主义”到“毛泽东思想邓小平理论三个代表重要思想”再到“可持续发展”再到“中国梦”，都是为了溜须拍马背下来的。我读大学时，有一次不幸混入他们的党员会议，看着那些阿谀逢迎的嘴脸真的想吐。
// 中间层对至高权力的讨好，蒙蔽当权层的双眼，使当权层自高自大，好大喜功，无暇居安思危，做事考虑片面，错误决定频出，朝令夕改。这些也就算了，因为人都犯错，我们开发软件或制定生产流程也会遇到各种问题，一天改几十次，有些人甚至以挑毛病为职业，比如测试工程师。
// 共产党做错事，却怕承认错误，是一错到底，还要把错的说成对的，事后得到不惩戒，最高刑罚竟只是开除党籍。他们又掩耳盗铃，管控媒体，防民之口比防洪都积极。而这一切，从新中国成立，到现在没变吧。
// 习近平到陕西看运动会，把大感冒集中带到西安。当时，没人对他说吧。可是理发店的人却说运动会时就发现疫情了，就因为运动会要召开，所以基层小官不敢上报。
// 运动会时，我也往返西安和深圳好几次，而且被疫情办公室的通过移动网盯上，还公然对抗他们要求我做的一些事。他们居然没追问下去，一听说我过几天要走，就松了一口气。
// 现在想想，他们是不想在特殊时期惹事生非。后来，就因为开个小小的运动会，我要在淘宝上退的货，被延迟一个多月才有人揽件，淘宝的人还扣了我三千多的购物款。所以，我对这段记忆犹新。
// 习近平带着权力层的一举一动都不缺人恭维，他们的做事风格也影响着社会其他各界人士。反正胡作非为无所顾虑，那何需提防小人严于律己。权力层不是不做为，而是胡作非为，不做为他也爬不到那么高。
// 指鹿为马的手段是赵高用的，现在几乎渗透在社会的各个阶层。这一切是习近平带头的。
// 中国的底层人，被榨干最后一点自由，被按在工作岗位上999，麻木的思想不及10岁的孩童，牛马劳动到最后一秒，也不知道这一生是为了啥。
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
    o.S = fixLength(o.S, 3);
    o.Day = v[v.length - 1];
    return formater.replace(/[yY年]+|[M月]+|[hH时]+|(S+)毫秒|[m+分]+|[sS]{3}|[Ss秒]+|[星期周天][dD]*|[dD]{3}|[日号dD]+/g, function (m) {
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
        .replace(/(\d{0,3})毫秒/, (_, a) => (a / 1000 + "秒").slice(1))
        .replace(/秒/g, '')
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
    var delta = (today - thatday) / 24 / 3600000 | 0;
    var deltaSeconds = (new Date(year1, month1 - 1, date1, hour1, minute1, second1) - new Date(year, month - 1, date, hour, minute, second)) / 1000;
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
        if (day <= day1) {
            return `下星期` + days[day] + time;
        }
        return `星期` + days[day] + time;
    }
    if (deltaSeconds >= 0 && deltaSeconds > 60) {
        return `刚刚`;
    }
    if (deltaSeconds < 0) {
        if (deltaSeconds > -120) {
            return `${-deltaSeconds | 0}秒后`;
        }
        if (deltaSeconds >= -3600) {
            return `还有${-deltaSeconds / 60 | 0}分钟`;
        }
        if (deltaSeconds > -86400) {
            var a = -deltaSeconds / 3600 | 0;
            var b = (-deltaSeconds - (deltaSeconds / 3600 | 0) * 3600) / 60 | 0;
            if (b === 0) return `还有${a}小时`;
            return `还有${a}小时${b}分钟`;
        }
    }
    switch (delta) {
        case 0:
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