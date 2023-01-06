var path = require("path");
function getPathIn(search, p) {
    for (var comm of search) {
        var rel = path.relative(comm, p);
        if (!/^\.\./.test(rel) && !path.isAbsolute(rel)) return rel || '.';
    }
    return null;
}
module.exports = getPathIn;