var path = require("path");
var toString = function () { return this.rel };
function getPathIn(search, p) {
    for (var comm of search) {
        var rel = path.relative(comm, p);
        if (!/^\.\./.test(rel) && !path.isAbsolute(rel)) return { rel, real: p, toString };
    }
    return null;
}
module.exports = getPathIn;