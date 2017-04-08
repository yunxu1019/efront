var spliter = require("./spliter");
var tester = require("./tester/main");
describe("将字符串与代码分开", function () {
    var test_code_1 = `var a="";`
    it("查找所有双引号字符串的位置", function () {
        var texts = spliter(test_code_1).texts;
        filter((a, cx) => a === codes[cx].source);
    })
});