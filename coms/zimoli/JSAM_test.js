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
    test({ a: NaN }) // {1:2},"a",NaN
    test({ a: { b: { c: [3], d: [2] } } }) // {1:2},"a",{3:4},"b",{5:6,7:8},"c",[9],"d",[10],3,2
    test({ a: { b: { c: [3, o], d: [2] } } }) // {1:2},"a",{3:4},"b",{5:6,7:8},"c",[9,10],"d",[11],3,{12:10},2,"o"
    var a = {},
        b = { a },
        c = [b],
        d = { c };
    a.d = d;
    test(a); // {1:2},"d",{3:4},"c",[5],{6:0},"a"
};
function test2(obj) {
    var data = JSAM.parse(JSON.stringify(obj));
    console.log(data);
}
function test_json() {
    test2({ 1: 2 });
    test2({ "adfasdf": 22 });
    test2([12, 23]);
}
function JSAM_test() {
    test_self();
    test_json();
}