var fs = require("fs");
var path = require("path");
var proxy = require("./proxy");
var root = "./apps/zimoli";
function doFile(req, res) {
    var range = req.headers.range;
    var url = proxy(req);
    var filepath = path.join(root, url);
    var reader = fs.createReadStream(filepath);
    reader.pipe(res);
}
module.exports = doFile;