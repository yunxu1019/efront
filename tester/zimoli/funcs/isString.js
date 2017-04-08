/* 
 * 不枝雀
 * 2017-3-18 15:17:26
 */
//import isString from "../../../coms/zimoli/funcs/isString"
describe("isString", function () {
    
    const isString = require("../../../coms/zimoli/funcs/isString.js");
    const expect=require('chai').expect;
    let trueModels = ["", "abc", "\\\t\\", "王勇慧", "~^@+sd=+Sdd=Sd", ""];
    let falseModels = [0, null, Boolean, new String, new Date, Function, undefined, [], {}, NaN];

    trueModels.forEach(function (model) {
        it("isString(\""+model+"\") 应该返回true，类型为boolean", function () {
            expect(isString("")).to.be.an("boolean");
            expect(isString(model)).to.be.equal(true);
        });
    });
    falseModels.forEach(function (model) {
        it("isString("+model+")应该返回false，类型为boolean", function () {
            expect(isString("")).to.be.an("boolean");
            expect(isString(model)).to.be.equal(false);
        });
    });
});
