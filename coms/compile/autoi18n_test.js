var test = function (data) {
    var code = scanner2(data);
    autoi18n(code);
    console.log(code.toString());
};
test('i18n`你好`');