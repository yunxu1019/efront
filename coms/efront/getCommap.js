var setupenv = require("./setupenv");
var mixin = require("./mixin");
var extendIfNeeded = require("../basic/extendIfNeeded");
var fs = require("fs");
var path = require("path");
var readdir = p => new Promise((ok, oh) => fs.readdir(p, { withFileTypes: true }, (err, names) => {
    if (err) return oh(err);
    return ok(names);
}))
async function getCommap(appname, deep = 6) {
    var env = setupenv(appname);
    var coms = mixin(env.COMS_PATH, env.COMM).map(a => path.join.apply(path, a)).filter(fs.existsSync);
    var res = Object.create(null);
    for (var c of coms) {
        var rest = [[c, []]];
        var map = Object.create(null);
        while (rest.length) {
            var [p, n] = rest.pop();
            var files = await readdir(p);
            for (var f of files) {
                var fn = f.name.replace(/\.[\s\S]*$/, '').replace(/\-([\s\S])/g, (_, a) => a.toUpperCase());
                if (f.isFile()) {
                    if (!/\.(html?|[cm]?[tj]sx?|xht)$/i.test(f.name) || /^[\#\?]/.test(f.name)) continue;
                    n.push(fn);
                    map[n.join('$')] = path.join(p, f.name);
                    n.pop();
                }
                else if (f.isDirectory()) {
                    if (n.length + 1 < deep) rest.push([path.join(p, f.name), n.concat(fn)]);
                }
            }
        }
        extendIfNeeded(res, map);
    }
    var ser = Object.create(null);
    for (var k in res) {
        var v = res[k];
        if (v in ser && ser[v].length <= k) continue;
        ser[v] = k;
    }
    res["?"] = ser;
    res["/"] = coms;
    return res;
}
module.exports = getCommap;