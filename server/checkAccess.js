"use strict";
var path = require("path");
var os = require("os");
var loadjson = require("../process/loadjson");
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
getFile(path.join(os.userInfo().homedir, '.efront/shared.json'));

var rootDirectorys = [];

function checkAccess(fullpath) {
    fullpath = path.resolve(fullpath);
    for (var cx = 0, dx = rootDirectorys.length; cx < dx; cx++) {
        var relpath = path.relative(rootDirectorys[cx], fullpath);;
        if (!/^\.\.?[\/\\]|^$|^\.\.?$/.test(relpath)&&!/^(\w\:|[\\\/])/.test(relpath)){
            return true;
        }
    }
    return false;
}
checkAccess.roots = rootDirectorys;
module.exports = checkAccess;