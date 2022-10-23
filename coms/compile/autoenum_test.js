var scanner2 = require("./scanner2");
var { createString } = require("./common");
var autoenum = require("./autoenum");
var t = function (str, want) {
    var code = scanner2(str)
    var code = autoenum(code);
    var result = createString(code);
    assert(result, want);
}
t("var a=1;console.log(a)", "var a = 1; console.log(1)");
t("a.b = 2;console.log(a.b)", "a.b = 2; console.log(2)");
t("a/*a*/.b = 2;console.log(a.b)", "a/*a*/.b = 2; console.log(2)");
t("a.b = 2;console.log(a/*aaaa*/.b)", "a.b = 2; console.log(2)");
t("a.b = 2;console.log(/*bbbb*/a.b)", "a.b = 2; console.log(/*bbbb*/2)");
t("var {a=1};console.log(a)", "var { a = 1 }; console.log(a)");
