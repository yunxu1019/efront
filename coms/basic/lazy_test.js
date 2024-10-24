var lazy = require("./lazy");
var assert = require("./assert");
async function test(sch, pending, callsch) {
    pending = +pending || 0;
    var wait = t => new Promise(a => setTimeout(a, t));
    var waits = t => wait(t * Math.abs(sch));
    var waite = async (t) => (await waits(t), await wait(pending));
    var count = 0, start = +new Date, time = start;
    var f = lazy(function () {
        count++;
        var now = +new Date;
        var delta = now - time;
        time = now;
        if (count > 1) assert(delta >= Math.abs(sch), true, '触发间隔' + delta);
        console.log('sch', sch, 'count', count, 'pass', now - start, 'delta', delta, 'pending', pending);
        if (pending) return wait(pending);
    }, sch);
    f();
    f();
    f();
    f();
    f();
    callsch = +callsch || 1;
    var i = setInterval(f, callsch);
    await wait(.5);
    if (sch < 0) assert(count, 1, '周期小于0，一个周期内触发');
    if (sch > 0) assert(count, 0, '周期大于0时，一个周期内不触发');
    await waite(1.5);
    if (sch < 0) assert(count, 2, '周期小于0，不到两个周期内触发');
    await waits(9);
    if (sch > 0 && sch > callsch) assert(count, 0, '周期大于0时，10个周期内不触发');
    clearInterval(i);
    await waits(2);
    if (sch > 0 && sch > callsch) assert(count, 1, '周期大于0时，等待一个多周期后触发');
    await waite(2);
    var saved_count = count;
    await waite(5);
    assert(saved_count, count, '未调用时不触发');
    f();
    await waite(2);
    assert(count, saved_count + 1, '非连续调用时，第一次触发');
    f();
    await waite(2);
    assert(count, saved_count + 2, '非连续调用时，第二次触发');
    f();
    await waite(2);
    assert(count, saved_count + 3, '非连续调用时，第二次触发');
}
test(100);
test(-100);
test(100, 10);
test(100, 80);
test(100, 180);
test(-100, 10, 11);
test(-100, 80, 81);
test(-100, 180, 181);
test(100, 10, 11);
test(100, 80, 81);
test(100, 180, 181);
// test(-100, 180);
// test(NaN);
// test(NaN, 80);
