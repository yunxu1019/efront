var namelist = require("./namelist");
var start = new Date;
namelist(1000000, {});
var a = namelist(600, {});
var a = namelist(60, { A: true, _: true,  a: 1, s: 1, b: 1, m: 1, aa: 1, a_: 1 });
console.log(a);
console.log("生成1百万个变量名，耗时",new Date - start);