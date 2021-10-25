"use strict";
// 中文编码 utf-8
describe("encode62_test", function () {
    var encode62, a, b, c, d;
    var expect = require("chai").expect;
    var timeencoded;
    before(function () {
        encode62 = require("./encode62");
    });
    it("encode62", function () {
        console.log(encode62("你好啊"));
    });
    it("encode62.timeencode", function () {
        console.log(timeencoded = encode62.timeencode("xiao"));
    });
    it("encode62.timedecode", function () {
        console.log(encode62.timedecode(timeencoded));
    });
    it("encode62.encode", function () {
        console.log(timeencoded = encode62.encode("adfasd", 'abcd'));
    });
    it("encode62.decode", function () {
        console.log(encode62.decode(timeencoded, 'abcd').toString());
    });
    it("geta", function () {
        a = encode62.geta("efront");
    });
    it("genb", function () {
        b = encode62.genb();
    });
    it("ab2c", function () {
        c = encode62.ab2c(a, b);
    });
    it("ba2d", function () {
        // 注意，参数顺序已变更
        d = encode62.ba2d(b, a);
    });
    it("ca2b", function () {
        expect(encode62.ca2b(c, a)).to.be.eq(b);
    });
    it("cb2a", function () {
        expect(encode62.cb2a(c, b)).to.be.eq(a);
    });
    it("da2b", function () {
        expect(encode62.da2b(d, a)).to.be.eq(b);
    });
    it("db2a", function () {
        expect(encode62.db2a(d, b)).to.be.eq(a);
    })

});