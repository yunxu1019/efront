var scanner = require("./scanner");
function scanner_test() {
    var str = "return                                                                                            /a/";
    var res = scanner(str);
    res.forEach(a => a.data = str.slice(a.start, a.end))
    console.log(res);
}
scanner_test();