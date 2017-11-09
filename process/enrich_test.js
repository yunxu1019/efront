describe("enrich_test", function () {
    var enrich = require("./enrich");
    it("enrich_onstep", function () {
        var enriched = enrich({
            a() {
                this.a = 1;
            },
            b() {
                return this.a + 1;
            },
        });
        return enriched.a().b().then(a => require("chai").expect(a).to.be.equal(2))
            ;
    });
    it("catch_throw", function () {
        var enriched = enrich({
            throw() {
                throw a;
            },
        });
        return enriched.throw().catch(function (a) {
            console.log(a);
        }).catch(b => b);
    });
    it("堆栈", function () {
        this.timeout(200000);
        var count = 0;
        var stack = function () {
            count++;
            stack();
        };
        try { stack(); } catch (e) { }
        console.log(count);
        var enriched = enrich({
            stack() { }
        });
        for (var cx = 0, dx = count * 20; cx < dx; cx++) {
            enriched = enriched.stack();
        }
    });
    it("GC", function () {
        this.timeout(200000);
        var count = 0;
        var stack = function () {
            count++;
            stack();
        };
        try { stack(); } catch (e) { }
        var enriched = enrich({
            stack() { }
        });
        for (var cx = 0, dx = count * 2000; cx < dx; cx++) {
            !(cx % 103390) && console.error(cx);
            (cx>2079700)&&console.error(cx);
            enriched = enriched.stack();
        }
    });
});