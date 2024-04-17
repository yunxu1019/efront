var getIndexFromOrderedArray = require("../basic/getIndexFromOrderedArray");
var saveToOrderedArray = require("../basic/saveToOrderedArray");
var lazy = require("../basic/lazy");
var cached = [];//500 000;
var multiCount = Object.create(null);
var clearCache = lazy(function () {
    var pass = new Date - 600 * 1000;
    cached = cached.filter(c => c.time > pass);
}, 80);
var preventCached = function (interval = 60000, id, count = 0) {
    clearCache();
    if (cached.length > 0x7ffff) {
        // 10分钟最多50万并发
        // 7小时2千万次
        // 5天 1亿 
        // 90亿 两年

        throw new Error(i18n`服务器忙，请稍后再试！`);
    }
    if (!(interval > 2000)) interval = 2000;
    var index = getIndexFromOrderedArray(cached, id);
    var c = cached[index];
    var now = +new Date;
    if (c && c.value === id) {
        var increase = 2000 - interval;
        if (c.count >= count) increase = interval * Math.pow(2, c.count - count) - interval;
        if (now - c.time < interval + increase) {
            // 单个ip 最多1个
            var seconds = (increase + interval + c.time - now) / 1000 + 1 | 0;
            if (seconds < 2) {
                seconds = i18n`重试`;
            }
            else if (seconds < 60) {
                seconds = i18n`${seconds}秒后再试`;
            }
            else if (seconds < 3600) {
                seconds = seconds / 60 + 1 | 0;
                seconds = i18n`${seconds}分钟后再试`
            }
            else if (seconds < 86400) {
                seconds = seconds / 3600 + 1 | 0
                seconds = i18n`${seconds}小时后再试`;
            }
            else {
                seconds = i18n`过几天再试`;
            }
            throw new Error(i18n`操作过于频繁，请${seconds}`);
        }
        if (!c.count) c.count = 2;
        else c.count++;
        c.time = now;
        if (increase > 0) c.time += increase;
    }
    else {
        saveToOrderedArray(cached, { time: now, value: id, count: 1 });
    }
    var savedLength = cached.length;
    if (savedLength === cached.length) {
        if (!multiCount[id]) {
            multiCount[id] = [];
        }
        if (multiCount[id].length >= 200) {
            if (multiCount[id][0] < now - interval * 10000) multiCount[id].shift();
            else throw new Error(i18n`禁止访问！`);
        }
        multiCount[id].push(now);
    }
};
function lock(time) {
    return preventCached.bind(null, time);
}


module.exports = lock;