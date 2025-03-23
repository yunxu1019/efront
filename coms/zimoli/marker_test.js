var test_wrap = function (data, search) {
    var wrap = mark.wrap;
    var startTime = Date.now();
    for (var cx = 0, dx = 10000; cx < dx; cx++) {
        for (var d of data) {
            mark(d, search, wrap);
        }
    }
    var spendTime = (Date.now() - startTime);
    console.log('用时', spendTime);
}
var testData = [
    "efront.cc/baiplay/bp",
    "chat.efront.cc/baiplay/aa",
    "baiplay.efront.cc/baiplay/aa",
    "baiplay.efront.cc/baiplay/cc",
    "ipv4.efront.cc/baiplay/dd",
    "ipv6.efront.cc/baiplay/ff",
    "baiplay.cn/baiplay/ee",
    "baidu.com/baiplay/gg",
];
return function () {
    test_wrap(testData, 'bai');
}