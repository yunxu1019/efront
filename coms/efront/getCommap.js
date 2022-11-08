var setupenv = require("./setupenv");
var mixin = require("./mixin");
var fs = require("fs");
var path = require("path");
var readdir = p => new Promise((ok, oh) => fs.readdir(p, { withFileTypes: true }, (err, names) => {
    if (err) return oh(err);
    return ok(names);
}))
async function getCommap(appname, deep = 1) {
    var env = setupenv(appname);
    var coms = mixin(env.COMS_PATH, env.COMM).map(a => path.join.apply(path, a));
    var res = Object.create(null);
    for (var p of coms) {
        var t = new Task()
        var map = Object.create(null);
        t.open("加载组件库", async function ([p, n]) {
            if (n.length >= deep) return;
            var files = await readdir(p);
            for (var f of files) {
                if (f.isFile()) {
                    if (!/\.(html?|[cm]?[tj]sx?|xht)$/i.test(f.name)) continue;
                    var tmp = f.name.replace(/\.[\s\S]*$/, '').replace(/\-([\s\S])/g, a => a.toUpperCase());
                    n.push(tmp);
                    map[n.join('$')] = path.join(p, f.name);
                    n.pop();
                }
                else if (f.isDirectory()) {
                    t.rest.push([path.join(p, f.name), n.concat(f.name)]);
                }
            }
        });
        t.send([p, []])
        await awaitable(t);
        extendIfNeeded(res, map);
    }
    return res;
}
module.exports = getCommap;