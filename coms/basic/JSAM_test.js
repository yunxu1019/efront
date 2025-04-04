var test = function (o) {
    var s = JSAM.stringify(o);
    var a = JSAM.parse(s);
    console.log(s, a);

};
var test_self = function () {
    var o = {};
    o.o = o;
    test(o); // {1:0},"o"
    test(null) // null;
    test(undefined); // 空字符串
    test(1); // 1
    test(true); // true
    test(false); // false 
    test(NaN); // NaN 
    test(Infinity); // Infinity
    test({}) // {}
    test([]) // [] 
    test(""); // ""
    test("\"\\"); // "\"\\"
    test(/a/); // /a/
    test(/a/ig); // /a/gi
    test(/a[/]/ig); // /a[\/]/gi
    test(new Date); // 2020-08-16T07:07:43.652Z
    test(BigInt("9007199254740993")); // 9007199254740993
    test(Symbol("a(")); // 'a('
    test(Symbol("asd")); // 'asd'
    test(Symbol("as'd")); // 'as\'d'
    test([2]) // [1],2
    test([""]) // [1],""
    test([{}]) // [1],{}
    test([{ a: undefined }]) // [1],{2:3},"a",
    test({ a: undefined }) // {1:2},"a",
    test([undefined]) // [1],
    test([true]) // [1],true
    test({ a: false }) // {1:2},"a",false
    test({ a: null }) // {1:2},"a",null
    test({ a: 0 }) // {1:2},"a",0
    test({ a: [0] }) // {a:2},"a",0
    test({ 2: [0] }) // {a:2},"a",0
    test({ a: NaN }) // {1:2},"a",NaN
    test({ a: { b: { c: [3], d: [2] } } }) // {1:2},"a",{3:4},"b",{5:6,7:8},"c",[9],"d",[10],3,2
    test({ a: { b: { c: [3, o], d: [2] } } }) // {1:2},"a",{3:4},"b",{5:6,7:8},"c",[9,10],"d",[11],3,{12:10},2,"o"
    var a = {},
        b = { a },
        c = [b],
        d = { c };
    a.d = d;
    test(a); // {1:2},"d",{3:4},"c",[5],{6:0},"a"
    test([{ "name": "用户", "open": true }, { "name": "导航", "open": true }, { "name": "商品", "open": true },]);
};
function test2(obj) {
    var data = JSAM.parse(JSON.stringify(obj));
    console.log(data);
}
function test_json() {
    test2({ 1: 2 });
    test2({ "adfasdf": 22 });
    test2([12, 23]);
    test2({ "uptime": 15.602063, "memery": [22244769792, 38478614528], "arch": "x64", "platform": "win32", "nodeVersion": "v22.14.0", "version": "4.22.13", "machine": "x86_64" });
    test2([{ "name": "用户", "open": true }, { "name": "导航", "open": true }, { "name": "商品", "open": true },]);
}
function gettime(f) {
    var timestart = Date.now();
    f();
    return Date.now() - timestart;
}
function test_time() {
    var data = Array(10000).fill(0).map((a, i) => (
        { obj: { obj: { [i >>> 6]: i }, obj2: ["您好，这是速度测试"], obj3: { key2: {} } }, key: 'asad' }
    ));
    var t1 = gettime(() => basic_$JSON.stringify(data));
    console.log(t1);
    var t2 = gettime(() => JSON.stringify(data));
    console.log(t2);
    var t3 = gettime(() => JSAM.stringify(data));
    console.log(t1, t2, t3);
    var t4 = gettime(() => JSAM.stringify(data, false));
    console.log(t1, t2, t3, t4);
}
function JSAM_test() {
    JSAM.debug = true;
    test_self();
    test_json();
    JSAM.debug = false;
    test_time();
}