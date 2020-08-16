var test = function (o) {
    var s = JSAM.stringify(o);
    var a = JSAM.parse(s);
    console.log(s, a);

};
function JSAM_test() {
    var o = {};
    o.o = o;
    test(o); // {1:0},"o"
    test(null) // null;
    test(undefined); // 空字符串
    test(""); // ""
    test(1); // 1
    test(true); // true
    test(false); // false 
    test(Infinity); // null
    test(BigInt("9007199254740993")); // 9007199254740993
    test({}) // {}
    test([]) // [] 
    test([2]) // [1:2],"0",2
    test([""]) // [1:2],"0",""
    test([{}]) // [1:2],"0",{}
    test({ a: { b: { c: [3], d: [2] } } }) // {1:2},"a",{3:4},"b",{5:6,7:8},"c",[9:10],"d",[9:11],"0",3,2
    test({ a: { b: { c: [3, o], d: [2] } } }) // {1:2},"a",{3:4},"b",{5:6,7:8},"c",[9:10,11:12],"d",[9:13],"0",3,"1",{14:12},2,"o" 
    var a = {};
    b = { a };
    c = { b };
    d = { c };
    a.d = d;
    test(a); // {1:2},"d",{3:4},"c",{5:6},"b",{7:0},"a"
}