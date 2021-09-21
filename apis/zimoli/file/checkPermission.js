var path = require("path");
var rootDirectorys = require("./root");
var checkPermission = function (fullpath) {
    for (var cx = 0, dx = rootDirectorys.length; cx < dx; cx++) {
        var relpath = path.relative(fullpath, rootDirectorys[cx]);;
        if (/^\.\.?[\/\\]|^$|/.test(relpath)) return true;
    }
    return false;
};
module.exports = checkPermission;