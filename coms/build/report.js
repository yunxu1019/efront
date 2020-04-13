module.exports = function main(responseTree) {
    var times = Object.keys(responseTree)
        .sort((k1, k2) => responseTree[k2].time - responseTree[k1].time)
        .slice(0, 3)
        .map(key => responseTree[key]);
    var getLength = destpath => String(destpath).length + String(destpath).replace(/[^\u01ff-\uffff]/g, '').length;
    var maxLength1 = Math.max.apply(Math, times.map(({ destpath }) => getLength(destpath)));
    var maxLength2 = Math.max.apply(Math, times.map(({ time }) => getLength(time)));
    console.time();
    times.forEach(function ({ destpath, time }, cx) {
        console.info(`url: <green>${destpath} ${" ".repeat(maxLength1 - getLength(destpath))}</green> time: ${" ".repeat(maxLength2 - getLength(time))}<green>${time}</green> ms\r\n`);
    });
};