var getLength = destpath => Buffer.from(String(destpath)).length;
function shortpath(destpath, maxLength = 40) {
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
    return destpath;
}
module.exports = shortpath;
shortpath.getLength = getLength;