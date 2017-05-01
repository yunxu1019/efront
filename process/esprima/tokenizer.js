"use strict";
var scanner_1 = require("./scanner");
var error_handler_1 = require("./error_handler");
var token_1 = require("./token");
var Reader = (function () {
    function Reader() {
        this.values = [];
        this.curly = this.paren = -1;
    };
    // A function following one of those tokens is an expression.
    Reader.prototype.beforeFunctionExpression = function (t) {
        return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
            'return', 'case', 'delete', 'throw', 'void',
            // assignment operators
            '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
            '&=', '|=', '^=', ',',
            // binary/unary operators
            '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
            '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
            '<=', '<', '>', '!=', '!=='
        ].indexOf(t) >= 0;
    };;
    // Determine if forward slash (/) is an operator or part of a regular expression
    // https://github.com/mozilla/sweet.js/wiki/design
    Reader.prototype.isRegexStart = function () {
        var previous = this.values[this.values.length - 1];
        var regex = (previous !== null);
        switch (previous) {
            case 'this':
            case ']':
                regex = false;
                break;
            case ')':
                var check = this.values[this.paren - 1];
                regex = (check === 'if' || check === 'while' || check === 'for' || check === 'with');
                break;
            case '}':
                // Dividing a function by anything makes little sense,
                // but we have to check for that.
                regex = false;
                if (this.values[this.curly - 3] === 'function') {
                    // Anonymous function, e.g. function(){} /42
                    var check_1 = this.values[this.curly - 4];
                    regex = check_1 ? !this.beforeFunctionExpression(check_1) : false;
                } else if (this.values[this.curly - 4] === 'function') {
                    // Named function, e.g. function f(){} /42/
                    var check_2 = this.values[this.curly - 5];
                    regex = check_2 ? !this.beforeFunctionExpression(check_2) : true;
                }
        }
        return regex;
    };;
    Reader.prototype.push = function (token) {
        if (token.type === token_1.Token.Punctuator || token.type === token_1.Token.Keyword) {
            if (token.value === '{') {
                this.curly = this.values.length;
            } else if (token.value === '(') {
                this.paren = this.values.length;
            }
            this.values.push(token.value);
        } else {
            this.values.push(null);
        }
    };;
    return Reader;
}());
var Tokenizer = (function () {
    function Tokenizer(code, config) {
        this.errorHandler = new error_handler_1.ErrorHandler();
        this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
        this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
        this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
        this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
        this.buffer = [];
        this.reader = new Reader();
    };
    Tokenizer.prototype.errors = function () {
        return this.errorHandler.errors;
    };;
    Tokenizer.prototype.getNextToken = function () {
        if (this.buffer.length === 0) {
            var comments = this.scanner.scanComments();
            if (this.scanner.trackComment) {
                for (var i = 0; i < comments.length; ++i) {
                    var e = comments[i];
                    var comment = void 0;
                    var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
                    comment = {
                        type: e.multiLine ? 'BlockComment' : 'LineComment',
                        value: value
                    };
                    if (this.trackRange) {
                        comment.range = e.range;
                    }
                    if (this.trackLoc) {
                        comment.loc = e.loc;
                    }
                    this.buffer.push(comment);
                }
            }
            if (!this.scanner.eof()) {
                var loc = void 0;
                if (this.trackLoc) {
                    loc = {
                        start: {
                            line: this.scanner.lineNumber,
                            column: this.scanner.index - this.scanner.lineStart
                        },
                        end: {}
                    };
                }
                var token = void 0;
                if (this.scanner.source[this.scanner.index] === '/') {
                    token = this.reader.isRegexStart() ? this.scanner.scanRegExp() : this.scanner.scanPunctuator();
                } else {
                    token = this.scanner.lex();
                }
                this.reader.push(token);
                var entry = void 0;
                entry = {
                    type: token_1.TokenName[token.type],
                    value: this.scanner.source.slice(token.start, token.end)
                };
                if (this.trackRange) {
                    entry.range = [token.start, token.end];
                }
                if (this.trackLoc) {
                    loc.end = {
                        line: this.scanner.lineNumber,
                        column: this.scanner.index - this.scanner.lineStart
                    };
                    entry.loc = loc;
                }
                if (token.regex) {
                    entry.regex = token.regex;
                }
                this.buffer.push(entry);
            }
        }
        return this.buffer.shift();
    };;
    return Tokenizer;
}());
exports.Tokenizer = Tokenizer;