"use strict";
var compile = require("./compile");
var javascript = require("../syntax/javascript");
var fs = require("fs");
var path = require("path");
var { describe, it } = require("../../tester/core/suit");
var assert = require("../../tester/core/assert");
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
    var Assert = function (string, expect) {
        var testResult = compile(string, javascript);
        console.log('Assert:', string);
        assert(testResult, expect);
    }
    Assert(`i.test(b)/b/g`, []);
    Assert(`a/b/igy.test(a)`, []);
    Assert(`/a/g.test(a)`, [
        {
            type: { name: 'RegularExpression', value: 5 },
            start: 0,
            parent: null,
            end: 4
        }
    ]);
    Assert(`r=/b/g.exec(a)`, [
        {
            start: 2,
            end: 6
        }
    ]);
    // /b\\\/\\/gimyu/i
    Assert(`/b\\\\\\/\\\\/gimyu/i`, [
        {
            start: 0,
            end: 14
        }
    ]);
    Assert(`switch(){case/b/g.test(a)}`, [
        {
            children: [
                {
                    type: { name: 'RegularExpression', value: 5 },
                    start: 13,
                    end: 17
                }
            ]
        }
    ]);
    Assert(`if(1)break b/c/.test("")`, {
        0: {
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