var setupenv = require("./setupenv");
var mixin = require("./mixin");
var extendIfNeeded = require("../basic/extendIfNeeded");
var fs = require("fs");
var fsp = fs.promises;
var path = require("path");
var 国际化 = require("./国际化");
var loadConsts = require("../compile/auto-const").loadConsts;
var memery = require("./memery");
var readConfig = { withFileTypes: true };
var readdir = p => fsp.readdir(p, readConfig);
var hasOwnProperty = Object.prototype.hasOwnProperty;
async function getCommap(appname, deep = 6) {
    var env = setupenv(appname);
    var coms = mixin(env.COMS_PATH, env.COMM).map(a => path.join.apply(path, a)).filter(fs.existsSync);
    var res = Object.create(null);
    var ser = Object.create(null);
    var loadermain = path.join(__dirname, "../zimoli/main.js");
    var loadernames = [];
    var cmap = Object.create(null);
    var constEnvFiles = [];
    for (var c of coms) {
        var rest = [[c, [], null]];
        var map = Object.create(null);
        while (rest.length) {
            var [p, n, pMap] = rest.pop();
            var files = await readdir(p);
            var constMap = Object.create(pMap), hasConst = !!pMap;
            for (var f of files) {
                const fname = f.name;
                var fn = fname.replace(/\.[\s\S]*$/, '').replace(/\-([\s\S])/g, (_, a) => a.toUpperCase());
                if (f.isFile()) {
                    if (!/\.(html?|[cm]?[tj]sx?|xht|less)$/i.test(fname) || /^[\#\?]/.test(fname)) continue;
                    n.push(fn);
                    var m = n.join('$');
                    n.pop();
                    var p1 = path.join(p, fname);
                    var m1 = m + fname.slice(fn.length);
                    if (m1 !== m && !map[m1]) {
                        map[m1] = p1;
                    }
                    if (/^[\.&]?(const)?(\..+)?\.m?js$/i.test(fname)) {
                        constEnvFiles.push([p, p1, constMap]);
                        hasConst = true;
                    }
                    if (map[m] && /\.([cm]?[tj]sx?|xht)$/i.test(map[m])) continue;
                    map[m] = p1;
                    if (p1 === loadermain) {
                        loadernames.push(m);
                    }
                }
                else if (f.isDirectory()) {
                    if (n.length + 1 < deep) rest.push([path.join(p, fname), n.concat(fn), constMap]);
                }
            }
            if (hasConst) cmap[p] = constMap;
        }
        extendIfNeeded(res, map);
    }
    if (res['zimoli'] || res["zimoli$zimoli"]) {
        delete res['state'];
        delete res['login'];
        delete res['prepare'];
        delete res['upwith'];
        delete res['go'];
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
        if (!/\.[^\.\\\/]+$/.test(ser[v]) && /\.[^\.\\\/]+$/.test(k)) continue;
        if (v in ser && ser[v].length <= k.length) continue;
        ser[v] = k;
    }
    // mer fullpath:maxname
    var mer = Object.create(null);
    for (var k in res) {
        var v = res[k];
        if (v in mer && mer[v].length >= k.length) continue;
        mer[v] = k;
    }
    Object.defineProperty(res, "?", { value: ser, enumerable: false, writable: false, configurable: false });
    Object.defineProperty(res, "/", { value: coms, enumerable: false, writable: false, configurable: false });
    Object.defineProperty(res, ":", { value: mer, enumerable: false, writable: false, configurable: false });
    Object.defineProperty(res, "&", { value: cmap, enumerable: false, writable: false, configurable: false });
    if (loadernames.length) Object.defineProperty(res, ";", { value: loadermain, enumerable: false, writable: false, configurable: false });
    Object.defineProperty(res, "#", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: await 国际化(coms.concat(mixin(env.PAGE_PATH, env.PAGE).map(a => path.join.apply(path, a)).filter(a => fs.existsSync(a))), memery.I18NNAME)
    });
    for (var [p, p1, constMap] of constEnvFiles) {
        var consts = loadConsts(p1, res);
        if (!hasConst) {
            hasConst = true;
        }
        for (var k in consts) {
            var v = consts[k];
            if (k in constMap) {
                if (hasOwnProperty.call(constMap, k) && constMap[k] !== v) {
                    console.warn(i18n`路径${`<yellow>${p}</yellow>`}中发现冲突常量${`<red>${k}</red>`}`);
                }
            }
            constMap[k] = v;
        }
    }
    return res;
}
module.exports = getCommap;