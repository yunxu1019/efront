var fs = require("fs");
var path = require("path");
var fullpath = path.join(__dirname, "../../.github/workflows/npmpublish.yml");
var text = fs.readFileSync(fullpath).toString();
var data = require("./parseYML")(text);
console.log(data);