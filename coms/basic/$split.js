var split = function (p) {
    var s = [];
    var reg = /[\\\/\$]/g;
    reg.lastIndex = 0;
    var lastIndex = 0;
    if (/^[\/\\]/.test(p)) {
        lastIndex++;
        s.push('');
    }
    while (p) {
        reg.lastIndex++;
        var m = reg.exec(p);
        if (!m) {
            s.push(p.slice(lastIndex, p.length));
            break;
        }
        s.push(p.slice(lastIndex, m.index));
        lastIndex = m.index + m.length;
    }
    if (m) s.push('');
    return s;

}
module.exports = split;
