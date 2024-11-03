function till(n) {
    if (/^[&\^%\?@#]/.test(n)) {
        var s = n = n.replace(/[&\^%\?@#]/g, '_');
        var i = 0;
        while (n in this) {
            n = s + i++;
        }
    }
    return n;
}
module.exports = function nametill(names, prevent) {
    return names.map(till, prevent);
}