var test = function (a, b, c) {
    var start = new Date;
    prime.find(a, b, c)
    var end = new Date;
    console.log(a, b, c, '用时', end - start);
}
test(19000000n, 1, 21000000n);
test(19000000, 1, 21000000);
test(19000000, 1, 21000000);
test(19000000n, 1, 21000000n);