"use strict";
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
    it.skip("GC3", function () {
        var count = 0;
        var stack = function () {
            !(count % 207900) && console.log(count);
            (count > 932700) && console.error(count);
            if (count > 207070000) return;
            count++;
            return Promise.resolve().then(stack);
        };
        try {
            return stack();
        } catch (e) {
            console.log(count);
        }
    });
    it.skip("GC2", function () {
        this.timeout(200000);
        var a = [];
        for (var cx = 0, dx = 2079700000; cx < dx; cx++) {
            !(cx % 2079000) && console.log(cx);
            a[0] = [];
            a[0].a = a;
            a = a[0];
        }
    });
    it.skip("GC4",function(){
        this.timeout(2000000);
        var a = Promise.resolve();
        for (var cx = 0, dx = 2079700000; cx < dx; cx++) {
            !(cx % 103390) && console.error(cx);
            (cx > 2481360) && console.error(cx);
            a=a.then(function(){
                !(cx % 103390) && console.error(cx,"1");
            });
        }
    });
    it.skip("GC5",function(){
        this.timeout(2000000);
        var a=[];
        for(var cx=0,dx=2079700000;cx<dx;cx++){
            !(cx % 1033900) && console.error(cx);
            (cx > 31152780) && console.error(cx);
            a.push([]);
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
        for (var cx = 0, dx = count * 10000; cx < dx; cx++) {
            !(cx % 103390) && console.error(cx);
            (cx > 207970000) && console.error(cx);
            enriched = enriched.stack();
        }
    });
});