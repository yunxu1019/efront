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
    var ser = Object.create(null);
    var loadermain = path.join(__dirname, "../zimoli/main.js");
    var loadernames = [];
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
                    var p1 = path.join(p, f.name);
                    var m = n.join('$');
                    map[m] = p1;
                    if (p1 === loadermain) {
                        loadernames.push(m);
                    }
                    n.pop();
                }
                else if (f.isDirectory()) {
                    if (n.length + 1 < deep) rest.push([path.join(p, f.name), n.concat(fn)]);
                }
            }
        }
        extendIfNeeded(res, map);
    }
    if (loadernames.length) a: {
        for (var loadername of loadernames) {
            if (res[loadername] === loadermain) break a;
        }
        var loadername1 = loadername;
        var i = 0;
        while (loadername1 in res) {
            loadername1 = loadername + ++i;
        }
        res[loadername1] = loadermain;
    }
    // res name:fullpath
    // ser fullpath:name
    for (var k in res) {
        var v = res[k];
        if (v in ser && ser[v].length <= k.length) continue;
        ser[v] = k;
    }
    res["?"] = ser;
    res["/"] = coms;
    return res;
}
module.exports = getCommap;