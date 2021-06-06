var path = require("path");
var fs = require("fs");
var mixin = require("./mixin");
var memery = require("./memery");
require("./setupenv");
var {
    COMM,
    COMS_PATH
} = memery;
var joinpath = ([a, b, c]) => path.join(a === ":" ? path.join(__dirname, "../../") : a, b, c || '');
var comms_root = mixin(COMS_PATH, COMM).map(joinpath).filter(fs.existsSync);

function inCom(fullpath) {
    for (var cx = 0, dx = comms_root.length; cx < dx; cx++) {
        var rel = path.relative(comms_root[cx], fullpath);
        if (!/^\.\./.test(rel) && !path.isAbsolute(rel)) return rel;
    }
    return false;
}
inCom.comms_root = comms_root;
module.exports = inCom;