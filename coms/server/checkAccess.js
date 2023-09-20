"use strict";
var path = require("path");
var os = require("os");
var fs = require("fs");
var getFile = function (configfilepath) {
    if (!fs.existsSync(configfilepath)) return;
    fs.readFile(configfilepath, function (error, data) {
        if (error) return console.warn("加载共享路径出错", error);
        if (/^\s*\[\s*"[\s\S]*\]\s*$/.test(data)) data = JSON.parse(String(data));
        else data = String(data).split(/[\r\n]+/).filter(a => !!a);
        rootDirectorys.splice(0, rootDirectorys.length);
        rootDirectorys.push.apply(rootDirectorys, data.map(function (dir) {
            return path.normalize(dir);
        }));
    });
};
if (fs.existsSync('data/shared.json')) fs.rename('data/shared.json', 'data/shared.txt', function (error) {
    if (error) return;
    getFile('data/shared.txt');
});
var configpath = path.join(os.homedir(), '.efront/shared.json');
var configpath1 = configpath.replace(/\.json$/g, ".txt");
if (fs.existsSync(configpath)) {
    fs.rename(configpath, configpath1, function (error) {
        if (!error) configpath = configpath1;
        getFile(configpath);
    })
}
else {
    configpath = configpath1;
    getFile(configpath);
}

var rootDirectorys = [];

function checkAccess(fullpath) {
    fullpath = path.resolve(fullpath);
    for (var cx = 0, dx = rootDirectorys.length; cx < dx; cx++) {
        var relpath = path.relative(rootDirectorys[cx], fullpath);;
        if (!/^\.\.?[\/\\]|^$|^\.\.?$/.test(relpath) && !/^(\w\:|[\\\/])/.test(relpath)) {
            return true;
        }
    }
    return false;
}
var save = function () {
    return new Promise((ok, oh) => {
        require("fs").writeFile(configpath, rootDirectorys.join("\r\n"), function (e) {
            if (e) return oh(e);
            ok();
        });
    })
};
checkAccess.remove = function (root) {
    var index = rootDirectorys.indexOf(root);
    if (index >= 0) rootDirectorys.splice(index, 1);
    return save();
};
checkAccess.append = function (p) {
    if (!p) throw { status: 400, error: "请求无效" };
    p = require("path").normalize(p);
    var exists = require("fs").existsSync(p);
    if (!exists) throw { status: 400, error: "路径不存在" };
    if (rootDirectorys.indexOf(p) >= 0) throw { status: 409, error: "请不要重复添加" };
    rootDirectorys.push(p);
    return save();
};
checkAccess.roots = rootDirectorys;
module.exports = checkAccess;