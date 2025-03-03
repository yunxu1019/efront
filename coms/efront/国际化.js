var fs = require("fs");
var path = require("path");
var parseYML = require("../basic/parseYML");
var loadData = async function (fullpath, i18nMap) {
    if (!fs.existsSync(fullpath)) return;
    var text = await fs.promises.readFile(fullpath);
    var data = parseYML(text.toString());
    for (var d of data) {
        var keys = Object.keys(d);
        keys.forEach(k => {
            if (!d[k]) return;
            if (!i18nMap[k]) i18nMap[k] = Object.create(null);
        });
    }
    var keys = Object.keys(i18nMap);
    for (var d of data) {
        var values = keys.map(k => d[k]);
        keys.forEach(k => {
            if (!d[k]) return;
            var map = i18nMap[k];
            map[d[k]] = values;
        });
    }
};
var __efrontpath = path.join(__dirname, '../..');
var loadParents = async function (fullpath, i18nMap, name, loaded) {
    var cwds = [process.cwd(), __efrontpath];
    for (var cwd of cwds) {
        if (/^\.\./.test(path.relative(fullpath, cwd))) {
            var restpath = path.relative(cwd, fullpath).split(/[\\\/]+/);
            for (var r of restpath) {
                if (cwd in loaded) continue;
                loaded[cwd] = true;
                await loadData(path.join(cwd, name), i18nMap);
                cwd = path.join(cwd, r);
            }
        }
    }
    if (!loaded[fullpath]) {
        loaded[fullpath] = true;
        await loadData(path.join(fullpath, name), i18nMap);
    }
};
module.exports = async function (pathlist, name) {
    var i18nMap = Object.create(null);
    var loaded = Object.create(null);
    for (var p of pathlist) await loadParents(p, i18nMap, name, loaded);
    loaded = null;
    var supports = Object.keys(i18nMap);
    if (supports.length) return [i18nMap[supports[0]], supports, i18nMap];
    return null;
};