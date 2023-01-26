var test = function (queue, wait = 40) {
    var spd = new Speed;
    var now = 0;
    var writted = [];
    for (var cx = 0, dx = queue.length; cx < dx; cx++) {
        var s = queue[cx];
        if (s instanceof Array && !Array.isArray(queue[cx + 1])) {
            spd.write(s, now = queue[++cx]);
            writted.push(s, now);
        }
        else {
            spd.write([].concat(s), now = cx * 16 + 20 + Math.random() * 16);
            writted.push([].concat(s), now);
        }
    }
    for (var cx = now + wait, dx = now + 20000; cx < dx; cx += 16 + Math.random() * 16) {
        var a = spd.read(cx);
        if (a.stop) break;
    }
    if (!a.stop) {
        console.log("测试数据：", writted, "\r\n当前状态：", a);
        throw `已等待 ${+((cx - now) / 1000).toFixed(3)} 秒，未停止运行`;
    }
    console.log(cx - now, a.stop);
};
Speed.debug = true;
test([
    [2.1878654669544666],
    27.956586758709825,
    [2.1878654669544666],
    37.21775999809554,
    [3.1878654669544666],
    67.83162606867668
])
test([1.1878654669544668, 1.1878654669544668, 1.1878654669544668]);
test([2.1878654669544668, 2.1878654669544668, 3.1878654669544668]);
test([
    0.3251661026176258,
    0.44988734829376603,
    0.43652435853899707,
    0.43652435853899707,
    0.47438616350792273,
    0.4253885330796093,
    0.5300652921323553,
    0.5256109608866051,
]);
test([
    [0, false], 2880.300000011921,
    [0, false], 2894.300000011921,
    [0, false], 2969,
    [0, false], 2971.199999988079,
    [0, false], 3019.600000023842,
    [0, false], 3026.800000011921,
    [0, false], 3044.5,
    [0, false], 3114.900000035763,
    [0, false], 3250.199999988079,
    [0, false], 3314.699999988079
], 900);