var path = require("path");
var fs = require("fs");
var mixin = require("./mixin");
var {
    LIBS_PATH,
    LIBS,
    COMM,
    COMS_PATH
} = process.env;
var joinpath = ([a, b, c]) => path.join(a === ":" ? path.join(__dirname, "../../") : a, b, c || '');
var comms_root = mixin(COMS_PATH, COMM).map(joinpath).filter(fs.existsSync);

var libs_root = [].concat(
    mixin(LIBS_PATH, LIBS).map(joinpath),
    mixin(comms_root, LIBS_PATH, LIBS).map(joinpath),
).filter(fs.existsSync);
function isLib(fullpath) {
    for (var cx = 0, dx = libs_root.length; cx < dx; cx++) {
        var rel = path.relative(libs_root[cx], fullpath);
        if (!/^\.\./.test(rel) && !path.isAbsolute(rel)) return true;
    }
    return false;
}
module.exports = isLib;