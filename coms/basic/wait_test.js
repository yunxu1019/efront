console.info('检查线程')
var time = new Date;
await wait(200);
console.log(new Date - time);
var a = 0, c = 0;
new Array(100).fill(0).map(async (_, i) => {
    await wait(function () {
        return a == 0;
    });
    console.info(`正在检查 线程：${i}`);
    if (c !== i) console.warn(`序列出错，出现插队\r\n  线程：${i}\r\n  序列${c}`);
    c++;
    a++;
    if (a > 1) console.error(`状态出错，出现并发\r\n  线程:${i}\r\n  并发计数${a}`)
    a--;
});