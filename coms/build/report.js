var maxLength = 60;
var shortpath = require("../basic/shortpath");
var getLength = shortpath.getLength;
module.exports = function main(responseTree) {
    var times = Object.keys(responseTree)
        .sort((k1, k2) => responseTree[k2].time - responseTree[k1].time)
        .slice(0, 3)
        .map(key => responseTree[key]).filter(a => !!a.realpath).map(({ realpath: destpath, time }) => [shortpath(destpath, maxLength), time]);
    var maxLength1 = Math.max.apply(Math, times.map(([destpath]) => getLength(destpath)));
    if (maxLength1 > maxLength) maxLength1 = maxLength;
    var maxLength2 = Math.max.apply(Math, times.map(([, time]) => getLength(time)));
    console.time();
    times.forEach(function ([destpath, time]) {
        console.info(`文件 <green>${destpath} ${" ".repeat(maxLength1 - getLength(destpath))}</green> 用时 ${" ".repeat(maxLength2 - getLength(time))}<green>${time}</green> 毫秒\r\n`);
    });
};