"use strict";
var compile = require("../compile/compile");
var javascript = require("./javascript");
var fs = require("fs");
var path = require("path");
var { describe, it } = require("../../test/core/suit");
var assert = require("../../test/core/assert");
function test(test, count) {
    var time = Date.now();
    if (test instanceof Function) {
        while (count-- > 0) {
            test();
        }
    }
    return Date.now() - time;
}


TestRegularExpression();
function TestRegularExpression() {
    // 如果不把正则表达式的结果赋给变量，则语义
    var Assert = function (string, expectStart, expectEnd) {
        console.log('Assert:', string);
        var testResult = compile(string, javascript);
        if (arguments.length === 2) {
            assert(testResult, expectStart);
        } else {
            assert(testResult, function (result, asrt, error) {
                var res = false;
                var expect = {
                    type: { name: 'RegularExpression' },
                    start: expectStart,
                    end: expectEnd
                };
                var match = false;
                for (var cx = 0, dx = result.length; cx < dx; cx++) {
                    if (assert(result[cx], expect, () => { })) {
                        match = true;
                        break;
                    }
                }
                if (!match) error("no match");
                return match;
            });
        }
    }

    Assert(`/a/g`, 0, 4);
    Assert(`0/ /b/g`, 3, 7);
    Assert(`+/b/g`, 1, 5);
    Assert(`-/b/g`, 1, 5);
    Assert(`1*/b/g`, 2, 6);
    Assert(`2**/b/g`, 3, 7);
    Assert(`(/b/g)`, [
        {
            children: [
                {
                    start: 1,
                    end: 5
                }
            ]
        }
    ]);
    Assert(`[/b/g]`, [
        {
            children: [
                {
                    start: 1,
                    end: 5
                }
            ]
        }
    ]);
    Assert(`{/b/g}`, [
        {
            children: [
                {
                    start: 1,
                    end: 5
                }
            ]
        }
    ]);
    Assert(`a=/b/g`, 2, 6);
    Assert(`1&/b/g`, 2, 6);
    Assert(`1|/b/g`, 2, 6);
    Assert(`1^/b/g`, 2, 6);
    Assert(`1%/b/g`, 2, 6);
    Assert(`!/b/g`, 1, 5);
    Assert(`~/b/g`, 1, 5);
    Assert(`s:/b/g`, 2, 6);
    Assert(`2?/b/g:2`, 2, 6);
    Assert(`1>/b/g`, 2, 6);
    Assert(`1</b/g`, 2, 6);
    Assert(`,/b/g`, 1, 5);
    Assert(`;/b/g`, 1, 5);
    Assert(`""/b/g`, {
        1: {
            type: {
                name: "Punctuator"
            }
        }
    });
    Assert(`[]/b/g`, [{}, { type: { name: "Punctuator" } }, {}, {}, {}]);
    Assert(`(1)/b/g`, [{}, { type: { name: "Punctuator" } }, {}, {}, {}]);
    Assert(`={a:b}/b/g`, [{}, {}, { type: { name: "Punctuator" } }, {}, {}, {}]);
    Assert(`+{a:b}/b/g`, [{}, {}, { type: { name: "Punctuator" } }, {}, {}, {}]);
    Assert(`^{a:b}/b/g`, [{}, {}, { type: { name: "Punctuator" } }, {}, {}, {}]);
    Assert(`=function(){a:b}/b/g`, { 4: { type: { name: "Punctuator" } } });
    Assert(`+function(){a:b}/b/g`, { 4: { type: { name: "Punctuator" } } });
    Assert(`*function(){a:b}/b/g`, { 4: { type: { name: "Punctuator" } } });
    Assert(`function a(){a:b}/b/g`, { 4: { type: { name: "RegularExpression" } } });
    Assert(`this/b/g`, [{}, { type: { name: "Punctuator" } }, {}, {}, {}]);
    Assert(`case/b/g`, 4, 8);
    Assert(`break/b/g`, 5, 9);
    Assert(`break a/b/g`, 7, 11);
    Assert(`continue/b/g`, 8, 12);
    Assert(`continue c/b/g`, 10, 14);
    Assert(`return/b/g`, 6, 10);
    Assert(`i.test(b)/b/g`, { 4: { type: { name: "Punctuator" } } });
    Assert(`if(a)/b/g`, 5, 9);
    Assert(`while(c)/b/g`, 8, 12);
    Assert(`for(c)/b/g`, 6, 10);
    Assert(`.for(c)/b/g`, { 3: { type: { name: "Punctuator" } }, 5: { type: { name: "Punctuator" } } });
    Assert(`. for(c)/b/g`, { 3: { type: { name: "Punctuator" } }, 5: { type: { name: "Punctuator" } } });
    Assert(`.while(c)/b/g`, { 3: { type: { name: "Punctuator" } }, 5: { type: { name: "Punctuator" } } });
    Assert(`.if(c)/b/g`, { 3: { type: { name: "Punctuator" } }, 5: { type: { name: "Punctuator" } } });
    Assert(`.break/b/g`, { 2: { type: { name: "Punctuator" } }, 4: { type: { name: "Punctuator" } } });
    Assert(`.case/b/g`, { 2: { type: { name: "Punctuator" } }, 4: { type: { name: "Punctuator" } } });
    Assert(`a/b/igy.test(a)`, { 3: { type: { name: "Punctuator" } } });
    Assert(`r=/b/g.exec(a)`, 2, 6);
    // /b\\\/\\/gimyu/i
    Assert(`/b\\\\\\/\\\\/gimyu/i`, 0, 14);
    Assert(`switch(){case/b/g.test(a)}`, {
        2: {
            children: {
                1: {
                    type: { name: 'RegularExpression', value: 5 },
                    start: 13,
                    end: 17
                }
            }
        }
    });
    Assert(`if(1)break b/c/.test("")`, {
        4: {
            type: { name: 'RegularExpression', value: 5 },
            start: 12,
            end: 15
        }
    });
}

function TestSingleQuoteString() {

}

function TestDoubleQuoteString() {

}