var path = require("path");
var fs = require("fs");
var mixin = require("./mixin");
require("./setupenv");
var {
    LIBS_PATH,
    LIBS,
    COMM,
    COMS_PATH
} = require("./memery");
var joinpath = ([a, b, c]) => path.join(a === ":" ? path.join(__dirname, "../../") : a, b, c || '');
var comms_root = mixin(COMS_PATH, COMM).map(joinpath).filter(fs.existsSync);

var libs_root = (LIBS_PATH || LIBS) ? [].concat(
    mixin(LIBS_PATH, LIBS).map(joinpath),
    mixin(comms_root, LIBS_PATH, LIBS).map(joinpath),
) : [];
var libs_Map = Object.create(null);
libs_root = libs_root.filter(fs.existsSync).map(a => fs.realpathSync(a)).filter(a => {
    if (libs_Map[a]) return false;
    return libs_Map[a] = true;
});
libs_Map = null;
function isLib(fullpath) {
    for (var cx = 0, dx = libs_root.length; cx < dx; cx++) {
        var rel = path.relative(libs_root[cx], fullpath);
        if (!/^\.\./.test(rel) && !path.isAbsolute(rel)) {
            return true;
        }
    }
    return false;
}
isLib.dispose = function () {
    libs_root.splice(0, libs_root.length);
};
isLib.libs_root = libs_root;
module.exports = isLib;