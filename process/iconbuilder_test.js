"use strict";
var fs = require("fs");
var path = require("path");
describe("iconbuilder", function () {
    var iconbuilder;
    before(function () {
        iconbuilder = require("./iconbuilder");
    });
    it("把png转成icon", function () {
        var data = fs.readFileSync(path.join(__dirname, "../cons/zimoli/home.png"));
        var png = iconbuilder(data);
        fs.writeFileSync(path.join(__dirname, "../cons/zimoli/home_0.png"),Buffer.from(png, "base64"));
    });
});