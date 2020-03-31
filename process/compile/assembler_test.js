"use strict";
var assmebler = require("./assembler");
var chai = require("../../tools/node_modules/chai");
var getBuffer = function (buffer) {
    return Buffer.from(buffer.replace(/\s+/g, "").replace(/(\w{2})/g, ",$1").slice(1).split(",").map(a => parseInt(a, 16)));
}
describe("assmebler_test", function () {
    describe("arch_ia32", function () {
        var arch = assmebler("ia32");
        with (arch) {
            it("mov", function () {
                chai.expect(mov(AX, BX)).to.deep.equal(getBuffer('668BC3'));
            });
        }
    })
});