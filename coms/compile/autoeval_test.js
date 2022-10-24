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
t("(1+3)", "(4)");
t("(1+3,5,3+4)", "(4, 5, 7)");
t("(1>>3,5,3+4)", "(0, 5, 7)");
// tf(path.join(__dirname, "../zimoli/spacechar_test.js"))
