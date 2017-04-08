"use strict";
var assert_1 = require("./assert");
var messages_1 = require("./messages");
var character_1 = require("./character");
var token_1 = require("./token");

function hexValue(ch) {
    return '0123456789abcdef'.indexOf(ch.toLowerCase());
}

function octalValue(ch) {
    return '01234567'.indexOf(ch);
}
var Scanner = (function () {
    function Scanner(code, handler) {
        this.source = code;
        this.errorHandler = handler;
        this.trackComment = false;
        this.length = code.length;
        this.index = 0;
        this.lineNumber = (code.length > 0) ? 1 : 0;
        this.lineStart = 0;
        this.curlyStack = [];
    };
    Scanner.prototype.eof = function () {
        return this.index >= this.length;
    };;
    Scanner.prototype.throwUnexpectedToken = function (message) {
        if (message === void 0) {
            message = messages_1.Messages.UnexpectedTokenIllegal;
        }
        this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
    };;
    Scanner.prototype.tolerateUnexpectedToken = function () {
        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, messages_1.Messages.UnexpectedTokenIllegal);
    };;
    // ECMA-262 11.4 Comments
    Scanner.prototype.skipSingleLineComment = function (offset) {
        var comments;
        var start, loc;
        if (this.trackComment) {
            comments = [];
            start = this.index - offset;
            loc = {
                start: {
                    line: this.lineNumber,
                    column: this.index - this.lineStart - offset
                },
                end: {}
            };
        }
        while (!this.eof()) {
            var ch = this.source.charCodeAt(this.index);
            ++this.index;
            if (character_1.Character.isLineTerminator(ch)) {
                if (this.trackComment) {
                    loc.end = {
                        line: this.lineNumber,
                        column: this.index - this.lineStart - 1
                    };
                    var entry = {
                        multiLine: false,
                        slice: [start + offset, this.index - 1],
                        range: [start, this.index - 1],
                        loc: loc
                    };
                    comments.push(entry);
                }
                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
                    ++this.index;
                }
                ++this.lineNumber;
                this.lineStart = this.index;
                return comments;
            }
        }
        if (this.trackComment) {
            loc.end = {
                line: this.lineNumber,
                column: this.index - this.lineStart
            };
            var entry = {
                multiLine: false,
                slice: [start + offset, this.index],
                range: [start, this.index],
                loc: loc
            };
            comments.push(entry);
        }
        return comments;
    };;
    Scanner.prototype.skipMultiLineComment = function () {
        var comments;
        var start, loc;
        if (this.trackComment) {
            comments = [];
            start = this.index - 2;
            loc = {
                start: {
                    line: this.lineNumber,
                    column: this.index - this.lineStart - 2
                },
                end: {}
            };
        }
        while (!this.eof()) {
            var ch = this.source.charCodeAt(this.index);
            if (character_1.Character.isLineTerminator(ch)) {
                if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
                    ++this.index;
                }
                ++this.lineNumber;
                ++this.index;
                this.lineStart = this.index;
            } else if (ch === 0x2A) {
                // Block comment ends with '*/'.
                if (this.source.charCodeAt(this.index + 1) === 0x2F) {
                    this.index += 2;
                    if (this.trackComment) {
                        loc.end = {
                            line: this.lineNumber,
                            column: this.index - this.lineStart
                        };
                        var entry = {
                            multiLine: true,
                            slice: [start + 2, this.index - 2],
                            range: [start, this.index],
                            loc: loc
                        };
                        comments.push(entry);
                    }
                    return comments;
                }
                ++this.index;
            } else {
                ++this.index;
            }
        }
        // Ran off the end of the file - the whole thing is a comment
        if (this.trackComment) {
            loc.end = {
                line: this.lineNumber,
                column: this.index - this.lineStart
            };
            var entry = {
                multiLine: true,
                slice: [start + 2, this.index],
                range: [start, this.index],
                loc: loc
            };
            comments.push(entry);
        }
        this.tolerateUnexpectedToken();
        return comments;
    };;
    Scanner.prototype.scanComments = function () {
        var comments;
        if (this.trackComment) {
            comments = [];
        }
        var start = (this.index === 0);
        while (!this.eof()) {
            var ch = this.source.charCodeAt(this.index);
            if (character_1.Character.isWhiteSpace(ch)) {
                ++this.index;
            } else if (character_1.Character.isLineTerminator(ch)) {
                ++this.index;
                if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
                    ++this.index;
                }
                ++this.lineNumber;
                this.lineStart = this.index;
                start = true;
            } else if (ch === 0x2F) {
                ch = this.source.charCodeAt(this.index + 1);
                if (ch === 0x2F) {
                    this.index += 2;
                    var comment = this.skipSingleLineComment(2);
                    if (this.trackComment) {
                        comments = comments.concat(comment);
                    }
                    start = true;
                } else if (ch === 0x2A) {
                    this.index += 2;
                    var comment = this.skipMultiLineComment();
                    if (this.trackComment) {
                        comments = comments.concat(comment);
                    }
                } else {
                    break;
                }
            } else if (start && ch === 0x2D) {
                // U+003E is '>'
                if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
                    // '-->' is a single-line comment
                    this.index += 3;
                    var comment = this.skipSingleLineComment(3);
                    if (this.trackComment) {
                        comments = comments.concat(comment);
                    }
                } else {
                    break;
                }
            } else if (ch === 0x3C) {
                if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
                    this.index += 4; // `<!--`
                    var comment = this.skipSingleLineComment(4);
                    if (this.trackComment) {
                        comments = comments.concat(comment);
                    }
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        return comments;
    };;
    // ECMA-262 11.6.2.2 Future Reserved Words
    Scanner.prototype.isFutureReservedWord = function (id) {
        switch (id) {
            case 'enum':
            case 'export':
            case 'import':
            case 'super':
                return true;
            default:
                return false;
        }
    };;
    Scanner.prototype.isStrictModeReservedWord = function (id) {
        switch (id) {
            case 'implements':
            case 'interface':
            case 'package':
            case 'private':
            case 'protected':
            case 'public':
            case 'static':
            case 'yield':
            case 'let':
                return true;
            default:
                return false;
        }
    };;
    Scanner.prototype.isRestrictedWord = function (id) {
        return id === 'eval' || id === 'arguments';
    };;
    // ECMA-262 11.6.2.1 Keywords
    Scanner.prototype.isKeyword = function (id) {
        switch (id.length) {
            case 2:
                return (id === 'if') || (id === 'in') || (id === 'do');
            case 3:
                return (id === 'var') || (id === 'for') || (id === 'new') ||
                    (id === 'try') || (id === 'let');
            case 4:
                return (id === 'this') || (id === 'else') || (id === 'case') ||
                    (id === 'void') || (id === 'with') || (id === 'enum');
            case 5:
                return (id === 'while') || (id === 'break') || (id === 'catch') ||
                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
                    (id === 'class') || (id === 'super');
            case 6:
                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                    (id === 'switch') || (id === 'export') || (id === 'import');
            case 7:
                return (id === 'default') || (id === 'finally') || (id === 'extends');
            case 8:
                return (id === 'function') || (id === 'continue') || (id === 'debugger');
            case 10:
                return (id === 'instanceof');
            default:
                return false;
        }
    };;
    Scanner.prototype.codePointAt = function (i) {
        var cp = this.source.charCodeAt(i);
        if (cp >= 0xD800 && cp <= 0xDBFF) {
            var second = this.source.charCodeAt(i + 1);
            if (second >= 0xDC00 && second <= 0xDFFF) {
                var first = cp;
                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
            }
        }
        return cp;
    };;
    Scanner.prototype.scanHexEscape = function (prefix) {
        var len = (prefix === 'u') ? 4 : 2;
        var code = 0;
        for (var i = 0; i < len; ++i) {
            if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
                code = code * 16 + hexValue(this.source[this.index++]);
            } else {
                return '';
            }
        }
        return String.fromCharCode(code);
    };;
    Scanner.prototype.scanUnicodeCodePointEscape = function () {
        var ch = this.source[this.index];
        var code = 0;
        // At least, one hex digit is required.
        if (ch === '}') {
            this.throwUnexpectedToken();
        }
        while (!this.eof()) {
            ch = this.source[this.index++];
            if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
                break;
            }
            code = code * 16 + hexValue(ch);
        }
        if (code > 0x10FFFF || ch !== '}') {
            this.throwUnexpectedToken();
        }
        return character_1.Character.fromCodePoint(code);
    };;
    Scanner.prototype.getIdentifier = function () {
        var start = this.index++;
        while (!this.eof()) {
            var ch = this.source.charCodeAt(this.index);
            if (ch === 0x5C) {
                // Blackslash (U+005C) marks Unicode escape sequence.
                this.index = start;
                return this.getComplexIdentifier();
            } else if (ch >= 0xD800 && ch < 0xDFFF) {
                // Need to handle surrogate pairs.
                this.index = start;
                return this.getComplexIdentifier();
            }
            if (character_1.Character.isIdentifierPart(ch)) {
                ++this.index;
            } else {
                break;
            }
        }
        return this.source.slice(start, this.index);
    };;
    Scanner.prototype.getComplexIdentifier = function () {
        var cp = this.codePointAt(this.index);
        var id = character_1.Character.fromCodePoint(cp);
        this.index += id.length;
        // '\u' (U+005C, U+0075) denotes an escaped character.
        var ch;
        if (cp === 0x5C) {
            if (this.source.charCodeAt(this.index) !== 0x75) {
                this.throwUnexpectedToken();
            }
            ++this.index;
            if (this.source[this.index] === '{') {
                ++this.index;
                ch = this.scanUnicodeCodePointEscape();
            } else {
                ch = this.scanHexEscape('u');
                cp = ch.charCodeAt(0);
                if (!ch || ch === '\\' || !character_1.Character.isIdentifierStart(cp)) {
                    this.throwUnexpectedToken();
                }
            }
            id = ch;
        }
        while (!this.eof()) {
            cp = this.codePointAt(this.index);
            if (!character_1.Character.isIdentifierPart(cp)) {
                break;
            }
            ch = character_1.Character.fromCodePoint(cp);
            id += ch;
            this.index += ch.length;
            // '\u' (U+005C, U+0075) denotes an escaped character.
            if (cp === 0x5C) {
                id = id.substr(0, id.length - 1);
                if (this.source.charCodeAt(this.index) !== 0x75) {
                    this.throwUnexpectedToken();
                }
                ++this.index;
                if (this.source[this.index] === '{') {
                    ++this.index;
                    ch = this.scanUnicodeCodePointEscape();
                } else {
                    ch = this.scanHexEscape('u');
                    cp = ch.charCodeAt(0);
                    if (!ch || ch === '\\' || !character_1.Character.isIdentifierPart(cp)) {
                        this.throwUnexpectedToken();
                    }
                }
                id += ch;
            }
        }
        return id;
    };;
    Scanner.prototype.octalToDecimal = function (ch) {
        // \0 is not octal escape sequence
        var octal = (ch !== '0');
        var code = octalValue(ch);
        if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
            octal = true;
            code = code * 8 + octalValue(this.source[this.index++]);
            // 3 digits are only allowed when string starts
            // with 0, 1, 2, 3
            if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
                code = code * 8 + octalValue(this.source[this.index++]);
            }
        }
        return {
            code: code,
            octal: octal
        };
    };;
    // ECMA-262 11.6 Names and Keywords
    Scanner.prototype.scanIdentifier = function () {
        var type;
        var start = this.index;
        // Backslash (U+005C) starts an escaped character.
        var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
        // There is no keyword or literal with only one character.
        // Thus, it must be an identifier.
        if (id.length === 1) {
            type = token_1.Token.Identifier;
        } else if (this.isKeyword(id)) {
            type = token_1.Token.Keyword;
        } else if (id === 'null') {
            type = token_1.Token.NullLiteral;
        } else if (id === 'true' || id === 'false') {
            type = token_1.Token.BooleanLiteral;
        } else {
            type = token_1.Token.Identifier;
        }
        return {
            type: type,
            value: id,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: start,
            end: this.index
        };
    };;
    // ECMA-262 11.7 Punctuators
    Scanner.prototype.scanPunctuator = function () {
        var token = {
            type: token_1.Token.Punctuator,
            value: '',
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: this.index,
            end: this.index
        };
        // Check for most common single-character punctuators.
        var str = this.source[this.index];
        switch (str) {
            case '(':
            case '{':
                if (str === '{') {
                    this.curlyStack.push('{');
                }
                ++this.index;
                break;
            case '.':
                ++this.index;
                if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
                    // Spread operator: ...
                    this.index += 2;
                    str = '...';
                }
                break;
            case '}':
                ++this.index;
                this.curlyStack.pop();
                break;
            case ')':
            case ';':
            case ',':
            case '[':
            case ']':
            case ':':
            case '?':
            case '~':
                ++this.index;
                break;
            default:
                // 4-character punctuator.
                str = this.source.substr(this.index, 4);
                if (str === '>>>=') {
                    this.index += 4;
                } else {
                    // 3-character punctuators.
                    str = str.substr(0, 3);
                    if (str === '===' || str === '!==' || str === '>>>' ||
                        str === '<<=' || str === '>>=' || str === '**=') {
                        this.index += 3;
                    } else {
                        // 2-character punctuators.
                        str = str.substr(0, 2);
                        if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
                            str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
                            str === '++' || str === '--' || str === '<<' || str === '>>' ||
                            str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
                            str === '<=' || str === '>=' || str === '=>' || str === '**') {
                            this.index += 2;
                        } else {
                            // 1-character punctuators.
                            str = this.source[this.index];
                            if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
                                ++this.index;
                            }
                        }
                    }
                }
        }
        if (this.index === token.start) {
            this.throwUnexpectedToken();
        }
        token.end = this.index;
        token.value = str;
        return token;
    };;
    // ECMA-262 11.8.3 Numeric Literals
    Scanner.prototype.scanHexLiteral = function (start) {
        var number = '';
        while (!this.eof()) {
            if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
                break;
            }
            number += this.source[this.index++];
        }
        if (number.length === 0) {
            this.throwUnexpectedToken();
        }
        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
            this.throwUnexpectedToken();
        }
        return {
            type: token_1.Token.NumericLiteral,
            value: parseInt('0x' + number, 16),
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: start,
            end: this.index
        };
    };;
    Scanner.prototype.scanBinaryLiteral = function (start) {
        var number = '';
        var ch;
        while (!this.eof()) {
            ch = this.source[this.index];
            if (ch !== '0' && ch !== '1') {
                break;
            }
            number += this.source[this.index++];
        }
        if (number.length === 0) {
            // only 0b or 0B
            this.throwUnexpectedToken();
        }
        if (!this.eof()) {
            ch = this.source.charCodeAt(this.index);
            /* istanbul ignore else */
            if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
                this.throwUnexpectedToken();
            }
        }
        return {
            type: token_1.Token.NumericLiteral,
            value: parseInt(number, 2),
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: start,
            end: this.index
        };
    };;
    Scanner.prototype.scanOctalLiteral = function (prefix, start) {
        var number = '';
        var octal = false;
        if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
            octal = true;
            number = '0' + this.source[this.index++];
        } else {
            ++this.index;
        }
        while (!this.eof()) {
            if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
                break;
            }
            number += this.source[this.index++];
        }
        if (!octal && number.length === 0) {
            // only 0o or 0O
            this.throwUnexpectedToken();
        }
        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
            this.throwUnexpectedToken();
        }
        return {
            type: token_1.Token.NumericLiteral,
            value: parseInt(number, 8),
            octal: octal,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: start,
            end: this.index
        };
    };;
    Scanner.prototype.isImplicitOctalLiteral = function () {
        // Implicit octal, unless there is a non-octal digit.
        // (Annex B.1.1 on Numeric Literals)
        for (var i = this.index + 1; i < this.length; ++i) {
            var ch = this.source[i];
            if (ch === '8' || ch === '9') {
                return false;
            }
            if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                return true;
            }
        }
        return true;
    };;
    Scanner.prototype.scanNumericLiteral = function () {
        var start = this.index;
        var ch = this.source[start];
        assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
        var number = '';
        if (ch !== '.') {
            number = this.source[this.index++];
            ch = this.source[this.index];
            // Hex number starts with '0x'.
            // Octal number starts with '0'.
            // Octal number in ES6 starts with '0o'.
            // Binary number in ES6 starts with '0b'.
            if (number === '0') {
                if (ch === 'x' || ch === 'X') {
                    ++this.index;
                    return this.scanHexLiteral(start);
                }
                if (ch === 'b' || ch === 'B') {
                    ++this.index;
                    return this.scanBinaryLiteral(start);
                }
                if (ch === 'o' || ch === 'O') {
                    return this.scanOctalLiteral(ch, start);
                }
                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                    if (this.isImplicitOctalLiteral()) {
                        return this.scanOctalLiteral(ch, start);
                    }
                }
            }
            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                number += this.source[this.index++];
            }
            ch = this.source[this.index];
        }
        if (ch === '.') {
            number += this.source[this.index++];
            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                number += this.source[this.index++];
            }
            ch = this.source[this.index];
        }
        if (ch === 'e' || ch === 'E') {
            number += this.source[this.index++];
            ch = this.source[this.index];
            if (ch === '+' || ch === '-') {
                number += this.source[this.index++];
            }
            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                    number += this.source[this.index++];
                }
            } else {
                this.throwUnexpectedToken();
            }
        }
        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
            this.throwUnexpectedToken();
        }
        return {
            type: token_1.Token.NumericLiteral,
            value: parseFloat(number),
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: start,
            end: this.index
        };
    };;
    // ECMA-262 11.8.4 String Literals
    Scanner.prototype.scanStringLiteral = function () {
        var start = this.index;
        var quote = this.source[start];
        assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
        ++this.index;
        var octal = false;
        var str = '';
        while (!this.eof()) {
            var ch = this.source[this.index++];
            if (ch === quote) {
                quote = '';
                break;
            } else if (ch === '\\') {
                ch = this.source[this.index++];
                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                    switch (ch) {
                        case 'u':
                        case 'x':
                            if (this.source[this.index] === '{') {
                                ++this.index;
                                str += this.scanUnicodeCodePointEscape();
                            } else {
                                var unescaped = this.scanHexEscape(ch);
                                if (!unescaped) {
                                    this.throwUnexpectedToken();
                                }
                                str += unescaped;
                            }
                            break;
                        case 'n':
                            str += '\n';
                            break;
                        case 'r':
                            str += '\r';
                            break;
                        case 't':
                            str += '\t';
                            break;
                        case 'b':
                            str += '\b';
                            break;
                        case 'f':
                            str += '\f';
                            break;
                        case 'v':
                            str += '\x0B';
                            break;
                        case '8':
                        case '9':
                            str += ch;
                            this.tolerateUnexpectedToken();
                            break;
                        default:
                            if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                                var octToDec = this.octalToDecimal(ch);
                                octal = octToDec.octal || octal;
                                str += String.fromCharCode(octToDec.code);
                            } else {
                                str += ch;
                            }
                            break;
                    }
                } else {
                    ++this.lineNumber;
                    if (ch === '\r' && this.source[this.index] === '\n') {
                        ++this.index;
                    }
                    this.lineStart = this.index;
                }
            } else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                break;
            } else {
                str += ch;
            }
        }
        if (quote !== '') {
            this.index = start;
            this.throwUnexpectedToken();
        }
        return {
            type: token_1.Token.StringLiteral,
            value: str,
            octal: octal,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: start,
            end: this.index
        };
    };;
    // ECMA-262 11.8.6 Template Literal Lexical Components
    Scanner.prototype.scanTemplate = function () {
        var cooked = '';
        var terminated = false;
        var start = this.index;
        var head = (this.source[start] === '`');
        var tail = false;
        var rawOffset = 2;
        ++this.index;
        while (!this.eof()) {
            var ch = this.source[this.index++];
            if (ch === '`') {
                rawOffset = 1;
                tail = true;
                terminated = true;
                break;
            } else if (ch === '$') {
                if (this.source[this.index] === '{') {
                    this.curlyStack.push('${');
                    ++this.index;
                    terminated = true;
                    break;
                }
                cooked += ch;
            } else if (ch === '\\') {
                ch = this.source[this.index++];
                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                    switch (ch) {
                        case 'n':
                            cooked += '\n';
                            break;
                        case 'r':
                            cooked += '\r';
                            break;
                        case 't':
                            cooked += '\t';
                            break;
                        case 'u':
                        case 'x':
                            if (this.source[this.index] === '{') {
                                ++this.index;
                                cooked += this.scanUnicodeCodePointEscape();
                            } else {
                                var restore = this.index;
                                var unescaped = this.scanHexEscape(ch);
                                if (unescaped) {
                                    cooked += unescaped;
                                } else {
                                    this.index = restore;
                                    cooked += ch;
                                }
                            }
                            break;
                        case 'b':
                            cooked += '\b';
                            break;
                        case 'f':
                            cooked += '\f';
                            break;
                        case 'v':
                            cooked += '\v';
                            break;
                        default:
                            if (ch === '0') {
                                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
                                    // Illegal: \01 \02 and so on
                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
                                }
                                cooked += '\0';
                            } else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
                                // Illegal: \1 \2
                                this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
                            } else {
                                cooked += ch;
                            }
                            break;
                    }
                } else {
                    ++this.lineNumber;
                    if (ch === '\r' && this.source[this.index] === '\n') {
                        ++this.index;
                    }
                    this.lineStart = this.index;
                }
            } else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                ++this.lineNumber;
                if (ch === '\r' && this.source[this.index] === '\n') {
                    ++this.index;
                }
                this.lineStart = this.index;
                cooked += '\n';
            } else {
                cooked += ch;
            }
        }
        if (!terminated) {
            this.throwUnexpectedToken();
        }
        if (!head) {
            this.curlyStack.pop();
        }
        return {
            type: token_1.Token.Template,
            value: {
                cooked: cooked,
                raw: this.source.slice(start + 1, this.index - rawOffset)
            },
            head: head,
            tail: tail,
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: start,
            end: this.index
        };
    };;
    // ECMA-262 11.8.5 Regular Expression Literals
    Scanner.prototype.testRegExp = function (pattern, flags) {
        // The BMP character to use as a replacement for astral symbols when
        // translating an ES6 "u"-flagged pattern to an ES5-compatible
        // approximation.
        // Note: replacing with '\uFFFF' enables false positives in unlikely
        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
        // pattern that would not be detected by this substitution.
        var astralSubstitute = '\uFFFF';
        var tmp = pattern;
        var self = this;
        if (flags.indexOf('u') >= 0) {
            tmp = tmp
                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
                    var codePoint = parseInt($1 || $2, 16);
                    if (codePoint > 0x10FFFF) {
                        self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
                    }
                    if (codePoint <= 0xFFFF) {
                        return String.fromCharCode(codePoint);
                    }
                    return astralSubstitute;
                })
                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
        }
        // First, detect invalid regular expressions.
        try {
            RegExp(tmp);
        } catch (e) {
            this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
        }
        // Return a regular expression object for this pattern-flag pair, or
        // `null` in case the current environment doesn't support the flags it
        // uses.
        try {
            return new RegExp(pattern, flags);
        } catch (exception) {
            /* istanbul ignore next */
            return null;
        }
    };;
    Scanner.prototype.scanRegExpBody = function () {
        var ch = this.source[this.index];
        assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
        var str = this.source[this.index++];
        var classMarker = false;
        var terminated = false;
        while (!this.eof()) {
            ch = this.source[this.index++];
            str += ch;
            if (ch === '\\') {
                ch = this.source[this.index++];
                // ECMA-262 7.8.5
                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
                }
                str += ch;
            } else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
            } else if (classMarker) {
                if (ch === ']') {
                    classMarker = false;
                }
            } else {
                if (ch === '/') {
                    terminated = true;
                    break;
                } else if (ch === '[') {
                    classMarker = true;
                }
            }
        }
        if (!terminated) {
            this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
        }
        // Exclude leading and trailing slash.
        var body = str.substr(1, str.length - 2);
        return {
            value: body,
            literal: str
        };
    };;
    Scanner.prototype.scanRegExpFlags = function () {
        var str = '';
        var flags = '';
        while (!this.eof()) {
            var ch = this.source[this.index];
            if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
                break;
            }
            ++this.index;
            if (ch === '\\' && !this.eof()) {
                ch = this.source[this.index];
                if (ch === 'u') {
                    ++this.index;
                    var restore = this.index;
                    ch = this.scanHexEscape('u');
                    if (ch) {
                        flags += ch;
                        for (str += '\\u'; restore < this.index; ++restore) {
                            str += this.source[restore];
                        }
                    } else {
                        this.index = restore;
                        flags += 'u';
                        str += '\\u';
                    }
                    this.tolerateUnexpectedToken();
                } else {
                    str += '\\';
                    this.tolerateUnexpectedToken();
                }
            } else {
                flags += ch;
                str += ch;
            }
        }
        return {
            value: flags,
            literal: str
        };
    };;
    Scanner.prototype.scanRegExp = function () {
        var start = this.index;
        var body = this.scanRegExpBody();
        var flags = this.scanRegExpFlags();
        var value = this.testRegExp(body.value, flags.value);
        return {
            type: token_1.Token.RegularExpression,
            value: value,
            literal: body.literal + flags.literal,
            regex: {
                pattern: body.value,
                flags: flags.value
            },
            lineNumber: this.lineNumber,
            lineStart: this.lineStart,
            start: start,
            end: this.index
        };
    };;
    Scanner.prototype.lex = function () {
        if (this.eof()) {
            return {
                type: token_1.Token.EOF,
                lineNumber: this.lineNumber,
                lineStart: this.lineStart,
                start: this.index,
                end: this.index
            };
        }
        var cp = this.source.charCodeAt(this.index);
        if (character_1.Character.isIdentifierStart(cp)) {
            return this.scanIdentifier();
        }
        // Very common: ( and ) and ;
        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
            return this.scanPunctuator();
        }
        // String literal starts with single quote (U+0027) or double quote (U+0022).
        if (cp === 0x27 || cp === 0x22) {
            return this.scanStringLiteral();
        }
        // Dot (.) U+002E can also start a floating-point number, hence the need
        // to check the next character.
        if (cp === 0x2E) {
            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
                return this.scanNumericLiteral();
            }
            return this.scanPunctuator();
        }
        if (character_1.Character.isDecimalDigit(cp)) {
            return this.scanNumericLiteral();
        }
        // Template literals start with ` (U+0060) for template head
        // or } (U+007D) for template middle or template tail.
        if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
            return this.scanTemplate();
        }
        // Possible identifier start in a surrogate pair.
        if (cp >= 0xD800 && cp < 0xDFFF) {
            if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
                return this.scanIdentifier();
            }
        }
        return this.scanPunctuator();
    };;
    return Scanner;
}());
exports.Scanner = Scanner;