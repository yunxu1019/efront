module.exports = function (p) {
    var s = [];
    while (p) {
        var reg = /[\$\/\\]/g;
        reg.lastIndex = 1;
        var m = reg.exec(p);
        var i = m ? m.index : p.length;
        s.push(p.slice(0, i));
        p = p.slice(i + 1);
    }
    return s;
}
