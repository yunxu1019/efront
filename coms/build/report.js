var maxLength = 60;
var shortpath = require("../basic/shortpath");
var getLength = shortpath.getLength;
module.exports = function main(responseTree) {
    var path = require('path');
    var efront_root = [path.join(__dirname, '../../coms')];
    var inComm = require("../efront/inCom");
    var inPage = require("../efront/inPage");
    var times1 = [];
    var times2 = [];
    var times3 = [];
    Object.keys(responseTree).forEach(k => {
        var p = responseTree[k].realpath;
        if (!p) return;
        if (inPage(p)) return times1.push(k);
        if (inComm(p, efront_root)) return times3.push(k);
        times2.push(k);
    });
    var sortTime = (k1, k2) => responseTree[k2].time - responseTree[k1].time;
    var times = [
        ...times1.sort(sortTime).slice(0, 2),
        ...times2.sort(sortTime).slice(0, 3),
        ...times3.sort(sortTime).slice(0, 2)
    ]
        .map(key => responseTree[key]).map(({ realpath: destpath, time }) => [shortpath(destpath, maxLength), time]);
    var maxLength1 = Math.max.apply(Math, times.map(([destpath]) => getLength(destpath)));
    if (maxLength1 > maxLength) maxLength1 = maxLength;
    var maxLength2 = Math.max.apply(Math, times.map(([, time]) => getLength(time)));
    console.stamp();
    times.forEach(function ([destpath, time]) {
        var timecolor = '<red2>;</red2>';
        if (time < 2000) {
            timecolor = '<white>;</white>';
        }
        else if (time < 20000) {
            timecolor = '<yellow>;<yellow>';
        }
        console.info(`<green>${destpath} ${" ".repeat(maxLength1 - getLength(destpath))}</green> ${" ".repeat(maxLength2 - getLength(time))}${timecolor.split(';').join(time + i18n`毫秒`)}\r\n`);
    });
};