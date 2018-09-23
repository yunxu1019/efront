"use strict";
var path = require("path");
var loadjson = require("../process/loadjson");
var configfilepath = "./data/shared.json";
loadjson(configfilepath).then(function (json) {
    if (json instanceof Array) {
        rootDirectorys = json;
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

module.exports = checkAccess;