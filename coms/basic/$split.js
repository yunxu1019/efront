var split = function (reg, p) {
    var s = [];
    reg.lastIndex = 0;
    var lastIndex = 0;
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
module.exports = function (p) {
    var s = split(/[\\\/\$]/g, p);
    return s;
}
