describe("webpack反编译工具", function () {
    var fs, path, packdec;
    before(function () {
        fs = require("fs");
        path = require("path");
        packdec = require("./packdec");
    });
    it("执行反编译无异常", function () {
        var esmangle = fs.readFileSync(path.join(__dirname, "esmangle/esmangle.js"));
        packdec(esmangle, path.join(__dirname, "esmangle"));
    });
    it("执行反编译无异常", function () {
        var esmangle = fs.readFileSync(path.join(__dirname, "escodegen/escodegen.js"));
        packdec(esmangle, path.join(__dirname, "escodegen"));
    });

});