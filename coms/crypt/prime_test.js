var test = function (a, b, c) {
    var start = new Date;
    var r = prime.find(a, b, c)
    var end = new Date;
    var n = console.format("<yellow>;</yellow>").split(';');
    var p = console.format("<green>;</green>").split(';');

    if (r && r.length) console.log(console.format(`从${n.join(a)}每次加${n.join(b)}到${n.join(c)}，用时${n.join(end - start)}毫秒，共找到${n.join(r.length)}个素数，最后一个是${p.join(r[r.length - 1])}`));
    else console.log(`从${n.join(a)}每次加${n.join(b)}到${n.join(c)}，用时${n.join(end - start)}毫秒，没找到素数`);
};
var testFactorize = function (s) {
    var is = prime.factorize(s);
    console.log(s, "因数分解为：", is);
};
testFactorize(2n * 3n * 5n * 7n * 11n * 13n + 1n);
testFactorize(2n * 3n * 5n * 7n * 11n * 13n);
testFactorize(2n ** 4n * 3n * 5n * 7n ** 2n * 11n * 13n);
testFactorize(2n * 3n * 5n * 7n * 11n * 13n - 1n);
testFactorize(2n * 3n * 5n * 7n * 11n * 13n * 17n * 19n * 23n * 29n * 31n - 1n);
testFactorize(2n * 3n * 5n * 7n * 11n * 13n * 17n * 19n * 23n * 29n * 31n + 1n);
testFactorize(2n * 3n * 5n * 7n * 11n * 13n * 17n * 19n * 23n * 29n * 31n * 37n * 41n - 1n);
testFactorize(2n * 3n * 5n * 7n * 11n * 13n * 17n * 19n * 23n * 29n * 31n * 37n * 41n + 1n);
console.log(prime.cd(9, 9))
console.log(prime.cd(9, 27))
console.log(prime.cd(9, 12))
console.log(prime.cd(2024, 1992))
test(19000000n, 1, 21000000n);
test(19000000, 1, 21000000);
test(0x1ffffffffff0ff, 2, 0x1fffffffffffff);
test(0x1f202403050355n, 2, 0x1f2024030503f5n);
console.log("已缓存的素数的个数", prime.length);
for (var p of prime) {
    console.test("正在测试：", console.format(`<yellow>M(<gray>${p}</gray>)</yellow>`));
    var a = prime.mtest(p);
    if (a) console.pass("发现梅森素数：", console.format(`<yellow>M(<green>${p}</green>)</yellow>`));
}

