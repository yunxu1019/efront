"use strict";
var queue = [];
function it(n, f) {
    if (queue.length) {
        queue.push([n, f]);
        return;
    }
    queue.push([n, f]);
    var o = {
        time: 20000,
        timeout(a) {
            this.time = a;
        }
    };
    var t = function () {
        if (!queue.length) return;
        var [n, f] = queue[0];
        console.info(n);
        var r = f.call(o);
        var next = function () {
            queue.shift();
            t();
        }
        if (r instanceof Promise) {
            var h = 0;
            Promise.race([r]).then(function () {
                clearTimeout(h);
                console.log('ok');
                next();
            }).catch(function (e) {
                clearTimeout(h);
                console.error(n, e);
                next();
            })
        } else {
            next();
        }
    };
    t();
}
it("查找方法不影响主进程", function () {
    var timer = 0;
    setTimeout(function () {
        timer = 1;
    }, 0);
    var dx = 10, cx = 0;
    var runner = function () {
        if (cx++ > dx) return assert(timer, 1);
        return find("E:\\").exists().then(runner);
    }
    return runner();
});
it("exists", function () {
    return find("C:\\").exists().then(function (result) {
        assert(result, true);
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
it("getmulti", function () {
    this.timeout(2000000);
    return find("E:\\77").getmulti().then(function (result) {
        console.log(result);
    });
});