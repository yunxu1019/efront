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