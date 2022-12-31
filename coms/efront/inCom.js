var path = require("path");
function inCom(fullpath, comms_root) {
    for (var cx = 0, dx = comms_root.length; cx < dx; cx++) {
        var rel = path.relative(comms_root[cx], fullpath);
        if (!/^\.\./.test(rel) && !path.isAbsolute(rel)) return rel;
    }
    return false;
}
module.exports = inCom;