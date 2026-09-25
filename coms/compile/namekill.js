function till(kill, i, arr) {
    var s = kill = kill.replace(/[&\^%\?@#\\]/g, '_') + "$" + i;
    var i = 1;
    while (kill in this) {
        kill = s + "$" + i++;
    }
    return kill;
}
module.exports = function nametill(names, prevent) {
    prevent = Object.create(prevent);
    names.forEach(n => prevent[n] = true);
    return names.map(till, prevent);
}