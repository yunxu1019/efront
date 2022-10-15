var doFolder = require("./doFolder");
var fs = require("fs");
var path = require("path");
var from = path.join(__dirname, "doFolder_test.js");
var to = path.join(__dirname, "doFolder_temp.js");
if (fs.existsSync(to)) fs.unlinkSync(to);
var task = await doFolder.copy(from, to);
console.log(task);
