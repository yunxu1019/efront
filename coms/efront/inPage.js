var path = require("path");
var fs = require("fs");
var mixin = require("./mixin");
var {
    APP,
    PAGE = APP ? APP.replace(/\.[^\.\/\\]+$/, '') : '',
    PAGE_PATH = ''
} = require("./memery");
var joinpath = ([a, b, c]) => path.join(a === ":" ? path.join(__dirname, "../../") : a, b, c || '');
var pages_root = mixin(PAGE_PATH, PAGE).map(joinpath).filter(fs.existsSync);
function inPage(fullpath) {
    for (var cx = 0, dx = pages_root.length; cx < dx; cx++) {
        var rel = path.relative(pages_root[cx], fullpath);
        if (!/^\.\./.test(rel) && !path.isAbsolute(rel)) return rel;
    }
    return false;
}
module.exports = inPage;