var scanner = require("./scanner");
var fs = require("fs");
function scanner_test() {
    var str = fs.readFileSync('coms/typescript/index.js').toString().slice(0, 1000);
    var res = scanner(str);
    res.forEach(a => a.data = str.slice(a.start, a.end))
    console.log(res);
}
scanner_test();