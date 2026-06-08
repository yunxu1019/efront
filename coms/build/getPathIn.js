var path = require("path");
var str2array = require("../basic/str2array");
function getPathIn(search, p) {
    if (typeof search === 'string') search = str2array(search);
    for (var comm of search) {
        var rel = path.relative(comm, p);
        if (!/^\.\./.test(rel) && !path.isAbsolute(rel)) return rel || '.';
    }
    return null;
}
module.exports = getPathIn;