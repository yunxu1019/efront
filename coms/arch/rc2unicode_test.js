var fs = require("fs");
var rc2unicode = require("./rc2unicode");
var data = fs.readFileSync(process.argv[2]);
text = rc2unicode(data);
if (process.argv[3]) fs.writeFileSync(process.argv[3], Buffer.from(text));