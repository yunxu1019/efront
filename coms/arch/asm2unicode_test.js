var fs = require("fs");
var asm2unicode = require("./asm2unicode");
var data = fs.readFileSync(process.argv[2]);
text = asm2unicode(data);
console.log(text)