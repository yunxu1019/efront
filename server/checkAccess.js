"use strict";
var path = require("path");
var loadjson = require("../process/loadjson");
var configfilepath = "./data/shared.json";
loadjson.async(configfilepath).then(function (json) {
    if (json instanceof Array) {
        rootDirectorys.splice(0, rootDirectorys.length);
        rootDirectorys.push.apply(rootDirectorys, json);
    }
}).catch(function () {
});
var rootDirectorys = [];

function checkAccess(fullpath) {
    for (var cx = 0, dx = rootDirectorys.length; cx < dx; cx++) {
        var relpath = path.relative(fullpath, rootDirectorys[cx]);;
        if (/^\.\.?[\/\\]|^$|/.test(relpath)) return true;
    }
    return false;
}
checkAccess.roots = rootDirectorys;
module.exports = checkAccess;