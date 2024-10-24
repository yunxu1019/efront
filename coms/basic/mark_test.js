var test = function (t1, t2) {
    var a = mark.power(t1, t2)
    console.log(t1, t2, a);
}
test("live", 'lvie');
test("listenv", 'lvie');
test("simple", 'il');
test("build", 'il');
test("11234", '1234');
test("1234", '1234');
test('kugou', 'kug');
test('kuugou', 'kug');
test('kugoukuugou', 'kug');
test('kugoukugou', 'kugu');
mark.setPinyin(await init('pinyin'));
test('我们', 'women');
test('我们', 'wm');
test('盛', 'cheng');
test('盛', 'sheng');
test('着火', 'zhaohuo');
test('着陆', 'zhuolu');