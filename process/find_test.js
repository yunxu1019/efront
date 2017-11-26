"use strict";
var chai = require("chai");
describe("find_test", function () {
    var find;
    before(function () {
        find = require("./find");
    });
    it("查找方法不影响主进程", function () {
        var timer = 0;
        setTimeout(function () {
            timer = 1;
        }, 0);
        var dx = 10, cx = 0;
        var runner = function () {
            if (cx++ > dx) return chai.expect(timer).to.be.eq(1);
            return find("E:\\").exists().then(runner);
        }
        return runner();
    });
    it("exists", function () {
        return find("C:\\").exists().then(function (result) {
            chai.expect(result).to.be.eq.true;
        });
    })
    it("getfiles", function () {
        return find("E:\\").getfiles().then(function (result) {
            // console.log(result);
        });
    });
    it("readtree", function () {
        this.timeout(2000000);
        return find("E:\\77").readtree().then(function (result) {
            // console.log(result);
        });
    });
    it("getmulti",function(){
        this.timeout(2000000);
        return find("E:\\77").getmulti().then(function (result) {
            console.log(result);
        });
    });
});