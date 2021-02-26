var fs = require("fs");
var path = require("path");
var scanner = require("./scanner2");
var data = fs.readFileSync(path.join(__dirname, "../typescript/index.js"));
var scanned = scanner(data);
console.log(scanned);