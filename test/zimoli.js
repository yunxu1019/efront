/* 
 * 不枝雀
 * 2017-3-18 14:58:40
 */

describe("ZIMOLI",function(){
    var zimoli=require("../coms/zimoli/zimoli");
    var expect=require("chai").expect;
    it("测试加载",function(){
        zimoli("isString",function(object){
            expect(object).to.be.an("object");
        });
    });
});