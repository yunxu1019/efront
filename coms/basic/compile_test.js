"use strict";
var compile = require("./compile");
var javascript = function () {
    "use strict";
    var Enum = require("./Enum");
    var Tokens = new Enum;
    var {
        SingleLineComment,
        MultiLinesComment,
        SingleQuoteString,
        DoubleQuoteString,
        RegularExpression,
        TemplateString,
        ProgramCodeBlock,
    } = Tokens;

    var regExpressionsTree = {
        [SingleLineComment]: /(?=[\r\n\u2028\u2029])/g,
        [MultiLinesComment]: /\*\//g,
        [SingleQuoteString]: /(\\[\s\S])|'/g,
        [DoubleQuoteString]: /(\\[\s\S])|"/g,
        [RegularExpression]: /(\\[\s\S])|\/[imgyu]*/g,
        [TemplateString]: [/(\$\{)|(\\[\s\S])|`/g, ProgramCodeBlock],
        [ProgramCodeBlock]: [
            //仅支持nodejs10以上版本
            /////1///2///3/// 4  /// 5  ///                                                    6                                                                              ///7 //
            /\}|(')|(")|(`)|(\/\/)|(\/\*)|((?<=[[|,+=*~?:&\^{\(\/><;%\-]|(?:[)};:{]|[^\.\s]\s+)(?:(?:continue|break)(?:\s+[\w\u0100-\u2027\u2030-\uffff]+?)?|return|case)|^)\/)|(\{)/g,
            SingleQuoteString,
            DoubleQuoteString,
            TemplateString,
            SingleLineComment,
            MultiLinesComment,
            RegularExpression,
            ProgramCodeBlock
        ],
    };

    function Block(type, start, parent) {
        this.type = type;
        this.start = start;
        this.parent = parent;
    }
    Block.prototype = {
        ...Tokens,
        isString(type) {
            return type === SingleQuoteString || type === DoubleQuoteString;
        },
        isRegExp(type) {
            return type === RegularExpression;
        },
        isComment(type) {
            return type === SingleLineComment || type === MultiLinesComment
        },
        isExtractable(type) {
            return this.isString(type) || this.isRegExp(type);
        }
    };

    return {
        token: Block,
        syntax: regExpressionsTree,
        entry: ProgramCodeBlock
    };
}();
// var fs = require("fs");
// var path = require("path");
var assert = require("./assert");



function test(test, count) {
    var time = +new Date;
    if (test instanceof Function) {
        while (count-- > 0) {
            test();
        }
    }
    return new Date - time;
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