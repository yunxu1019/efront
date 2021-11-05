"use strict";
var path = require("path");
var os = require("os");
var loadjson = require("../efront/loadjson");
var getFile = function (configfilepath) {
    loadjson.async(configfilepath, true).then(function (json) {
        if (json instanceof Array) {
            rootDirectorys.splice(0, rootDirectorys.length);
            rootDirectorys.push.apply(rootDirectorys, json.map(function (dir) {
                return path.normalize(dir);
            }));
        }
    }).catch(function (error) {
        console.warn('加载共享路径出错', error);
        // 未配置网络路径
    });
};
getFile('data/shared.json');
var configpath = path.join(os.userInfo().homedir, '.efront/shared.json');
getFile(configpath);

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
        require("fs").writeFile(configpath, JSON.stringify(rootDirectorys, null, 4), function (e) {
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