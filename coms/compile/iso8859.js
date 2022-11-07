"use ../../data/iso8859_1.txt";
var iso8859_map = Object.create(null);
if (typeof iso8859_1 === 'string') for (let r of iso8859_1.split(/[\r\n]+/)) {
    r = r.split(/\t+/);
    var c = r.pop();
    var d = r.pop();
    iso8859_map[d] = String.fromCharCode(+c.slice(2, -1));
}
module.exports = iso8859_map;