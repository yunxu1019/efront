var fs = require("fs");
var path = require("path");
var userpath = path.join(require("os").homedir(), ".efront");
function save(pathname, data) {
    var fullpath = path.join(userpath, pathname);
    fs.writeFileSync(fullpath, JSAM.stringify(data));
}
function load(pathname) {
    var fullpath = path.join(userpath, pathname);
    if (!fs.existsSync(fullpath)) return;
    var data = fs.readFileSync(fullpath);
    return JSAM.parse(data);
}
module.exports = {
    save,
    load
}