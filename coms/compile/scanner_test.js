var scanner = require("./scanner");
var fs = require("fs");
function scanner_test() {
    var time = new Date;
    var str = fs.readFileSync('coms/typescript/index.js').toString();
    var res = scanner(str);
    res.forEach(a => a.data = str.slice(a.start, a.end))
    console.log(res, new Date - time);
}
scanner_test();