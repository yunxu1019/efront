var finalpacker = require("./finalpacker");
describe("finalpacker_test", function () {
    this.timeout(600000);
    it("pack page", function () {
        finalpacker.page("./apps/zimoli", "./public/zimoli/page");
    });
    it("pack comm", function () {
        finalpacker.comm("./coms/zimoli", "./public/zimoli/comm");
    });
    it("puck ccon", function () {
        finalpacker.ccon("./cons/zimoli", "./public/zimoli/ccon");
    });
    it("puck ccon with colors", function () {
        finalpacker.ccon("./cons/zimoli", "./public/zimoli/ccon", [0xff0000, 0x00ff00]);
    })
    it("puck index", function () {
        finalpacker.index("./apps", "./public/zimoli");
    });
});