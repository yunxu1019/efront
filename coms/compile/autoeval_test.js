var { createString } = require("./common");
var autoeval = require("./autoeval");
var autoenum = require("./autoenum");
var scanner2 = require("./scanner2");
var t = function (str, want) {
    var code = scanner2(str);
    code = autoenum(code);
    code = autoeval(code);
    var result = createString(code);
    assert(result, want);
};
var tf = function (fullpath) {
    var data = fs.readFileSync(fullpath).toString()
    t(data, data);
}
t("1+1", "2");
t("1+3", "4");
t("(1+3)", "4");
t("(-1)*(1+3)", "-4");
t("(-+-+-2)*(1+3)", "-8");
t("(~1)*(1+3)", "-8");
t("(1*-1)+(1+3)", "3");
t("1+(1+3)", "5");
t("a(1+3)", "a(4)");
t("(1+3,5,3+4)", "(4, 5, 7)");
t("(1>>3,5,3+4)", "(0, 5, 7)");
t("a=1,b=2;(a|b)&c", "a = 1, b = 2; 3 & c");
t("(1+2).toString()", "3 .toString()");
t("(1n+2n).toString()", "3n .toString()");
// tf(path.join(__dirname, "../zimoli/spacechar_test.js"))
