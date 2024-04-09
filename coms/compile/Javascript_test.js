// 导入
var testFix = function (a, e) {
    var c = scanner2(a);
    c.fix();
    assert(c.toString(), e);
}
testFix(`import a from "a";console.log(a)`, 'var a = require("a"); console.log(a.default)');
testFix(`import {a} from "a";console.log(a)`, 'var a1 = require("a"); console.log(a1.a)');
testFix(`import a,{a as b} from "a";console.log(a,b)`, 'var a = require("a"); console.log(a.default, a.a)');
testFix(`import * as a,{a as b},c from "a";console.log(a,b,c)`, 'var a = require("a"); console.log(a, a.a, a.default)');
testFix(`import * as a,{a as b},c from "a";console.log(a,...b,...c)`, 'var a = require("a"); console.log(a, ...a.a, ...a.default)');
testFix(`console.log(import("a"))`, 'console.log(require("a"))');
testFix(`import("a")`, 'require("a")');
testFix(`import "windows.inc"`, 'require("windows.inc")');
testFix(`import "windows.inc";import "abc.inc";`, 'require("windows.inc"); require("abc.inc");');
testFix(`import "windows.inc";\r\nimport "abc.inc";`, 'require("windows.inc");\r\nrequire("abc.inc");');
testFix(`console.log(import.meta)`, `console.log(import_meta)`);
var testDetour = function (a, e) {
    var c = scanner2(a);
    c.break();
    assert(c.toString(), e);
}
testDetour('1.1', '1.1')
testDetour('1.1.a', '1.1["a"]')
testDetour('-1e10.a', '-1e10["a"]')
testDetour('1e10.a', '1e10["a"]')
testDetour('1e1_0.a', '1e10["a"]')
testDetour('1_20e1_0.a', '120e10["a"]')
testDetour('1_2.0_3e1_0.a', '12.03e10["a"]')
testDetour('1.e10.a', '1e10["a"]')
testDetour('1.e-10.a', '1e-10["a"]')
testDetour('1.e+10.a', '1e+10["a"]')
testDetour('0x1.a', '0x1["a"]')
testDetour('0b1.a', '0b1["a"]')
testDetour('01.a', '0o1["a"]')
testDetour('08.a', '08 a')
testDetour('0o1.a', '0o1["a"]')
testDetour('0o1n.a', '0o1n["a"]')
testDetour('0o1m.a', '0o1m["a"]')
testDetour('0o1i.a', '0o1i["a"]')
testDetour('0o1j.a', '0o1j["a"]')
testDetour('0o1k.a', '0o1k["a"]')
testDetour('0o1l.a', '0o1l["a"]')
testDetour('0o1ll.a', '0o1ll["a"]')