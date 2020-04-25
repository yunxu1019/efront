var maxLength = 60;
var getLength = destpath => Buffer.from(String(destpath)).length;
module.exports = function main(responseTree) {
    var times = Object.keys(responseTree)
        .sort((k1, k2) => responseTree[k2].time - responseTree[k1].time)
        .slice(0, 3)
        .map(key => responseTree[key]).filter(a => !!a.realpath).map(({ realpath: destpath, time }) => {
            destpath = Buffer.from(destpath);
            var reg = /[\\\/]/g;
            reg.lastIndex = 10;
            var res = reg.exec(destpath);
            var split_start = 20;
            if (res) {
                if (res.index < 30) split_start = res.index;
            }
            var split_end = destpath.length - maxLength + split_start + 2;
            reg.lastIndex = split_end;
            res = reg.exec(destpath);
            if (res) {
                if (res.index < split_end + 20) {
                    split_end = res.index;
                }
            }
            if (getLength(destpath) > maxLength) {
                destpath = destpath.slice(0, split_start).toString().replace(/[\/\\]$/, '') + ".." + destpath.slice(split_end).toString().replace(/^[\/\\]/, '');
            }
            return [destpath, time];
        });
    var maxLength1 = Math.max.apply(Math, times.map(([destpath]) => getLength(destpath)));
    if (maxLength1 > maxLength) maxLength1 = maxLength;
    var maxLength2 = Math.max.apply(Math, times.map(([, time]) => getLength(time)));
    console.time();
    times.forEach(function ([destpath, time]) {
        console.info(`url: <green>${destpath} ${" ".repeat(maxLength1 - getLength(destpath))}</green> time: ${" ".repeat(maxLength2 - getLength(time))}<green>${time}</green> ms\r\n`);
    });
};