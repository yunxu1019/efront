var fs = require("fs");
var asm2unicode = require("./asm2unicode");
var data = fs.readFileSync("test/arch/createWindowEx.asm");
text = asm2unicode(data);
console.log(text)