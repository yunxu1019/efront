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
var loadedMap = Object.create(null);
var cacheid = 1;
async function readFrom(fullpath, deep, cmap, loadermain) {
    if (loadedMap[fullpath]) return loadedMap[fullpath];
    var id = cacheid;
    var rest = [fullpath, [], null];
    var map = Object.create(null);
    var loadernames = [];
    var constEnvFiles = [];
    while (rest.length) {
        const pMap = rest.pop();
        const n = rest.pop();
        const p = rest.pop();
        var files = await readdir(p);
        if (id !== cacheid) break;
        var constMap = Object.create(pMap), hasConst = !!pMap;
        for (var f of files) {
            const fname = f.name;
            var fn = fname.replace(/\.[\s\S]*$/, '').replace(/\-([\s\S])/g, (_, a) => a.toUpperCase());
            if (f.isFile()) {
                if (!/\.(html?|[cm]?[tj]sx?|xht|less|css)$/i.test(fname) || /^[\#\?]/.test(fname)) continue;
                var isless = /\.(less|css)$/i.test(fname);
                n.push(fn);
                var m = n.join('$');
                n.pop();
                var p1 = path.join(p, fname);
                var m1 = isless ? n.join("/") + fname : m + path.extname(fname);
                if (m1 !== m && !map[m1] || isless) {
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
                if (n.length + 1 < deep) rest.push(path.join(p, fname), n.concat(fn), constMap);
            }
        }
        if (hasConst) cmap[p] = constMap;
    }
    return [map, loadernames, constEnvFiles];
}
var mergeTo = function (dst, nameprefix, map) {
    for (var k in map) {
        if (!(k in dst)) dst[k] = map[k];
        var k1 = nameprefix + k;
        if (!(k1 in dst)) dst[k1] = map[k];
    }
};
var reptileback = path.join(__dirname, '../reptile');
var zimolifront = path.join(__dirname, '../zimoli');
async function getCommap(appname, isfront, deep = 6) {
    var id = cacheid;
    var env = setupenv(appname);
    var cmap = Object.create(null);
    var res = Object.create(null);
    var ser = Object.create(null);
    var loadernames = [];
    var constEnvFiles = [];
    var loadermain = path.join(__dirname, "../zimoli/main.js");
    var mixcoms = mixin(env.COMS_PATH, env.COMM);
    var coms = [];
    for (var [a, n] of mixcoms) {
        var p = path.join(a, n);
        if (!fs.existsSync(p)) continue;
        if (!isfront && p === zimolifront) continue;
        if (isfront && p === reptileback) continue;
        if (coms.indexOf(p) >= 0) continue;
        coms.push(p);
        var [map, ldnames, consts] = await readFrom(p, deep, cmap, loadermain);
        if (id !== cacheid) return;
        if (ldnames.length) loadernames.push.apply(loadernames, ldnames);
        if (consts.length) constEnvFiles.push.apply(constEnvFiles, consts);
        mergeTo(res, n ? n + "$" : n, map);
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
getCommap.reset = function () {
    loadedMap = Object.create(null);
    cacheid = cacheid + 1 & 0xffffffff;
};
var isFront = async function (PAGE_PATH, appname) {
    var pages = mixin(PAGE_PATH, appname).map(a => path.join.apply(path, a)).filter(fs.existsSync);
    if (pages.indexOf(zimolifront) >= 0) return true;
    if (pages.indexOf(reptileback) >= 0) return false;
    for (var p of pages) {
        var stats = await fsp.stat(p);
        if (stats.isFile()) p = path.dirname(p);
        var files = await readdir(p);
        for (var f of files) {
            if (f.isFile() && /\.(less|css|xht|html?|vue)$/i.test(f.name)) return true;
        }
    }
    if (pages.length) return false;
};
module.exports = async function (appname, isfront, deep) {
    if (typeof isfront !== 'boolean') {
        if (!appname) appname = memery.APP || '';
        isfront = await isFront(memery.PAGE_PATH, appname);
    }
    if (typeof isfront !== 'boolean') {
        isfront = await isFront(memery.COMS_PATH, memery.COMM);
    }
    do {
        var id = cacheid;
        var res = await getCommap(appname, isfront, deep);
    } while (id !== cacheid);
    return res;
};