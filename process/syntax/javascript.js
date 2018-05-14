"use strict";
var Enum = require("../basic/Enum");
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

module.exports = {
    token: Block,
    syntax: regExpressionsTree,
    entry: ProgramCodeBlock
};