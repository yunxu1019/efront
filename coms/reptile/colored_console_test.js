var console = require("./colored_console");
var data = [
    { a: 1 },
    { b: [2] },
    { c: null },
    class c { },
    { 匿名函数: function () { } },
    { "arraw function": e => { } },
    { "function a(){}": function a() { } },
    { "astar function": function* b() { } },
    { "async function": async function* d() { } },
    { "二层对象": { c: 2, "三层对象": { d: 3 } } },
    {
        "多属性节点": {
            a: 1,
            b: 2,
            c: 3,
        }
    },
    {
        "多属性节点": {
            "属性1": 1,
            "属性2": 1,
            "属性3": 1,
            "属性4": 1,
            "属性5": 1,
            "属性6": 1,
            "属性7": 1,
            "属性8": 1,
            "属性10": 1,
            "属性11": 1,
            "属性12": 1,
            "属性13": 1,
            "属性14": 1,
            "属性15": 1,
            "属性16": 1,
            "属性17": 1,
        }
    },
    {
        "多属性节点": function () {
            var a = {};
            for (var cx = 1; cx <= 101; cx++) {
                a["属性" + cx] = cx;
            }
            return a;
        }()
    },
    /Abcdefg/gimuy,
    new Error("错误信息"),
    new Date,
    { "循环对象": null },
];
data[data.length - 1].循环对象 = data[data.length - 1];
console.log(data);
console.line(data);
throw new Error(2);