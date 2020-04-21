var maxLength = 60;
module.exports = function main(responseTree) {
    var times = Object.keys(responseTree)
        .sort((k1, k2) => responseTree[k2].time - responseTree[k1].time)
        .slice(0, 3)
        .map(key => responseTree[key]);
    var getLength = destpath => String(destpath).length + String(destpath).replace(/[^\u01ff-\uffff]/g, '').length;
    var maxLength1 = Math.max.apply(Math, times.map(({ realpath: destpath }) => getLength(destpath)));
    if (maxLength1 > maxLength) maxLength1 = maxLength;
    var maxLength2 = Math.max.apply(Math, times.map(({ time }) => getLength(time)));
    console.time();
    times.forEach(function ({ realpath: destpath, time }, cx) {
        console.info(`url: <green>${destpath > maxLength ? ".." + destpath.slice(0, maxLength - 2) : destpath} ${" ".repeat(maxLength1 - getLength(destpath))}</green> time: ${" ".repeat(maxLength2 - getLength(time))}<green>${time}</green> ms\r\n`);
    });
};