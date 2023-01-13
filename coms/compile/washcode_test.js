var washcode = require("./washcode");
var scanner2 = require("./scanner2");
var { createString } = require("./common");
var test = function (str, exp) {
    var code = scanner2(str);
    code = washcode(code);
    var str = createString(code);
    assert(str, exp);

}
test("a=1;b;module.exports=a", "a = 1; module.exports = a")
// 不考虑 toString或valueOf对自身进行修改的情况
test("a=1+b;module.exports=b", "module.exports = b")
test("a=1+b;module.exports=b", "module.exports = b")
test("a=1+b;return b", "return b")
test("b.a=1; return function (){}(b)", "return function () {}(b)")
test("function(a) {var a = {a:1} return a }(a)", "")