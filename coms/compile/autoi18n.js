var { SCOPED } = require("./common");

var getTranslated = function () {
};
module.exports = function (code, i18nfiles) {
    var prefixed = translate.getI18nPrefixed(code);
    for (var p of prefixed) {
        if (p.transtype === "手动") {
            p.type = SCOPED;
            p.entry = '(';
            p.leave = ')';
            delete p.text;

        }
    }
    console.log(prefixed);
};