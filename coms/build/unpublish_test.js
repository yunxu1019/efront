require("./environment");
var fs = require("fs");
var path = require("path");
var unpublish = require("./unpublish");
var escodegen_path = path.join(__dirname, "../escodegen/index.js");
var data = fs.readFileSync(escodegen_path);
var blocks = unpublish(data, 'index.js', escodegen_path, []);
// console.log(blocks);