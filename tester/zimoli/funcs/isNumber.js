/* 
 * 不枝雀
 * 2017-3-18 15:58:03
 */


//import isString from "../../../coms/zimoli/funcs/isString"
describe("isNumber", function () {

    const tMethod = require("../../../coms/zimoli/funcs/isNumber.js");
    const expect = require('chai').expect;
    let trueModels = [0, 1, NaN, Number(), parseInt("-0.1"), 0.2, 0xffffffff, 2e53 + 1];
    let falseModels = ["", null, Boolean, new String, new Date, Function, undefined, [], {}];

    it("对于是数字值a，isNumber(a)应返回true", function () {
        trueModels.forEach(function (model) {
            expect(tMethod(model)).to.be.an("boolean");
            expect(tMethod(model)).to.be.equal(true);
        });
    });
    it("对于非数字值b，isNumber(b)应返回false", function () {
        falseModels.forEach(function (model) {
            expect(tMethod(model)).to.be.an("boolean");
            expect(tMethod(model)).to.be.equal(false);
        });
    });
});
