var finalpacker = require("./finalpacker");
describe("finalpacker_test", function () {
    this.timeout(600000);
    require("./setupenv");
    var {
        app,
        aapi,
        comm,
        page,
        icon,
    }=process.env;
    it("clear dest",function(){
        finalpacker.clear(`./public/${app}`);
    });
    it("pack page", function () {
        finalpacker.page(`./apps/${app}`, `./public/${app}/page`);
    });
    it("pack comm", function () {
        finalpacker.comm(`./coms/${comm}`, `./public/${app}/comm`);
    });
    it("puck ccon", function () {
        finalpacker.ccon(`./cons/${icon}`, `./public/${app}/ccon`);
    });
    it("puck ccon with colors", function () {
        finalpacker.ccon(`./cons/${icon}`, `./public/${app}/ccon`, [0xff0000, 0x00ff00]);
    });
    it("puck index", function () {
        finalpacker.index(`./apps/${app}`, `./public/${app}`);
    });
});