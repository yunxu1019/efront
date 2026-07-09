var fs = require("fs");
var path = require("path");
var parseYML = require("../basic/parseYML");
var memery = require("./memery");
var str2array = require("../basic/str2array");

var loadData = async function (fullpath) {
    if (!fs.existsSync(fullpath)) return;
    var text = await fs.promises.readFile(fullpath);
    var data = parseYML(text.toString());
    data = data.filter(d => typeof d === 'object');
    if (!data || typeof data !== "object") return;
    if (!(data instanceof Array)) data = [data];
    var map = Object.create(null);
    for (var d of data) {
        var keys = Object.keys(d);
        keys.forEach(k => {
            if (!d[k]) return;
            if (!map[k]) map[k] = true;
        });
    }
    var keys = Object.keys(map);
    if (memery.I18N) {
        var keys1 = str2array(memery.I18N).map(a => {
            if (a in map) return a;
            return keys.filter(s => {
                if (s.startsWith(a)) return s;
                if (s.endsWith(a)) return s;
                if (s.toLowerCase().startsWith(a.toLowerCase())) return s;
                if (s.toUpperCase().endsWith(a.toUpperCase())) return s;
            });
        }).flat();
        keys1 = [...new Set(keys1)];
    }
    else keys1 = keys;
    var map = Object.create(null);
    for (var d of data) {
        var values = keys1.map(k => d[k]);
        keys.forEach(k => {
            if (!d[k]) return;
            var t = d[k];
            if (!map[t]) map[t] = values;
        });
    }
    return [map, keys1];
};
var __efrontpath = path.join(__dirname, '../..');
var cache = Object.create(null);
var loadParents = async function (fullpath, i18nMap, name, loaded, keys) {
    var cwds = [process.cwd(), __efrontpath];
    for (var cwd of cwds) {
        if (/^\.\./.test(path.relative(fullpath, cwd))) {
            var restpath = path.relative(cwd, fullpath).split(/[\\\/]+/);
            for (var r of restpath) {
                if (cwd in loaded) continue;
                loaded[cwd] = true;
                if (!cache[cwd]) cache[cwd] = loadData(path.join(cwd, name));
                var d = await cache[cwd];
                if (!d) continue;
                var [map, keys1] = d;
                keys1.forEach(a => {
                    if (keys.indexOf(a) < 0) keys.push(a);
                })
                keys.push(keys1);
                for (var k in map) if (!(k in i18nMap)) i18nMap[k] = map[k];
                cwd = path.join(cwd, r);
            }
        }
    }
    if (!loaded[fullpath]) {
        loaded[fullpath] = true;
        if (!cache[fullpath]) cache[fullpath] = loadData(path.join(fullpath, name));
        var d = await cache[fullpath];
        if (d) {
            var [map, keys1] = d;
            keys1.forEach(a => {
                if (keys.indexOf(a) < 0) keys.push(a);
            })
            for (var k in map) if (!(k in i18nMap)) i18nMap[k] = map[k];
        }
    }
    return
};
async function 国际化(pathlist, name) {
    var i18nMap = Object.create(null);
    var loaded = Object.create(null);
    var supports = [];
    for (var p of pathlist) await loadParents(p, i18nMap, name, loaded, supports);
    if (supports.length) {
        return [i18nMap, supports];
    }
    return null;
};
国际化.reset = function () {
    for (var k in cache) delete cache[k];
};
module.exports = 国际化;