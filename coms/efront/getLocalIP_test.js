"use strict";
var chai = require("chai");
var expect = chai.expect;
var getLocalIP = require("./getLocalIP");
describe("getLocalIP_test", function () {
    it("getLocalIP() return all localIP split by |", function () {
        console.log(getLocalIP());
        expect(getLocalIP()).to.be.match(/^(\d+\.\d+\.\d+\.\d\|)*(\d+\.){3}\d+$/);
    });
});