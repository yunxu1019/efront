describe("enrich_test", function () {
    var enrich=require("./enrich");
    it("enrich_onstep", function () {
        var enriched = enrich({
            a() {
                this.a = 1;
            },
            b() {
                return this.a + 1;
            },
        });
        enriched.a().b().then(a=>require("chai").expect(a).to.be.equal(2))
        ;
    });
    it("catch_throw",function(){
        var enriched=enrich({
            throw(){
                throw a;
            },
        });
        return enriched.throw().catch(function(a){
            console.log(a);
        }).catch(b=>b);
    })
});