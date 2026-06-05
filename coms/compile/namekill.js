function till(kill, i, arr) {
    var s = kill = "_" + i + kill.replace(/[&\^%\?@#\\]/g, '_');
    var i = 1;
    while (kill in this) {
        kill = s + "_" + i++;
    }
    return kill;
}
module.exports = function nametill(names, prevent) {
    prevent = Object.create(prevent);
    names.forEach(n => prevent[n] = true);
    return names.map(till, prevent);
}