
function createScanner(mark) {
    if (mark instanceof RegExp) mark = mark.source;
    var reg = new RegExp(/\\[\s\S]|/.source + mark, 'g');
    function Scanner(text, index) {
        reg.lastIndex = index + 1;
        do {
            var res = reg.exec(text);
        } while (res && res[0][0] === "\\");
        return res ? res.index + res[0].length : text.length;
    }
    return Scanner;
}
function createPairScanner(pairs, endflag) {
    var marks = [], source = [], scanners = [];
    for (var cx = 0, dx = pairs.length; cx < dx; cx += 2) {
        var m = pairs[cx];
        if (m instanceof RegExp) source.push(m.source);
        else source.push(m);
        marks.push(m);
        var s = pairs[cx + 1];
        if (!(s instanceof Function)) var s = createScanner(s);
        scanners.push(s);
    }
    marks.push(endflag);
    if (endflag instanceof RegExp) endflag = endflag.source;
    source.push(endflag);
    var s = new RegExp(/\\[\s\S]|/.source + source.join("|"), "g");
    var PairScanner = function (text, index) {
        do {
            s.lastIndex = index;
            var r = s.exec(text);
            if (!r) break;
            if (/^\\[\s\S]$/.test(text)) continue;
            var i = -1;
            for (var cx = 0, dx = marks.length; cx < dx; cx++) {
                var mark = marks[cx];
                if (mark instanceof RegExp) {
                    var m = mark.exec(r[0]);
                    if (m && m[0] === r[0]) {
                        i = cx;
                        break;
                    }
                } else {
                    if (m === r[0]) {
                        i = cx;
                        break;
                    }
                }
            }
            index = r.index + r[0].length;
            if (i === scanners.length) break;
            if (i > 0) index = scanners[i](text, index);
        } while (i < scanners.length);
        return r ? index : text.length;
    }
    return PairScanner;
}
var SingleQuoteString = createScanner('\'');
var DoubleQuoteString = createScanner("\"");
var Regular = createPairScanner([
    /\(/, /\)/,
    /\[/, /\]/
], /\/\w*/);
var SingleLineComment = createScanner(/(?=[\r\n])/);
var MultiLinesComment = createScanner(/\*\//);
var keywords = new RegExp("^(" + `if,in,do
var,for,new,try,let
else,case,void,with,enum,from
async,while,break,catch,throw,const,yield,class
return,typeof,delete,switch,export,import
default,finally,extends
function,continue,debugger,Infinity
instanceof`.trim().split(/[\r\n,\s]+/).join("|") + ")$");
var isKeyWord = function (text) {
    return keywords.test(text);
};
var internal = /^(null|true|false|NaN|Infinity|undefined|this|super|arguments)$/;
var isInternal = function (text) {
    return internal.test(text);
};
var number = /^[+-]*(\d+\.\d+|\.\d+|\d+)(e\-?\d+)?$/;
var isNumber = function (text) {
    return number.test(text);
};
var operator = /'"`\/\=\+;\|\:\?\*\<\>\-\[\]\{\}\(\)\!\~@#%\^&\*\,/.source;
var space = /\r\n\t\s\v\u2028\u2029/.source;
var programreg = new RegExp(/\\[\s\S]|\/\*|\/\/|['"]|\=\>/.source + `|[${space}]+|[^${space}${operator}]+|[${operator}]`, 'g');
var spacereg = new RegExp(`^[${space}]+$`);
var isSpace = function (text) {
    return spacereg.test(text);
};
var puncreg = new RegExp(`^[${operator}]+$`);
var isPunctuator = function (text) {
    return puncreg.test(text);
};
var TemplateString = createPairScanner([
    /\$\{/, program,
], /`/);
var ScannersMap = {
    '"': DoubleQuoteString,
    "'": SingleQuoteString,
    "//": SingleLineComment,
    "/*": MultiLinesComment,
    "`": TemplateString,
};


function Block(typedScanner, start, end) {
    this.type = typedScanner;
    this.start = start;
    this.end = end;
}
var prototype = Block.prototype = {
    SingleQuoteString,
    DoubleQuoteString,
    SingleLineComment,
    MultiLinesComment,
    TemplateString,
    Variable,
    Keyword,
    Internal,
    Regular,
    Expression,
    Numeric,
    Punctuator,
};
for (let k in prototype) {
    let p = prototype[k];
    Object.defineProperty(p, 'name', { value: k });
}

function Scope(start, curve = [], emitvar = false) {
    this.start = start;
    this.curve = curve;
    this.brace = [];
    this.parent = null;
    this.emitvar = emitvar;
    this.children = [];
    this.scopes = [];
    this.exps = [];
}

function Variable() { }
function Numeric() { }
function Keyword() { }
function Punctuator() { }
function Internal() { }
function Expression() { }
var braceStartReg = /[\(\[\{]/;
var braceEndReg = /[\)\]\}]/;
var EarlyEndError = new Error("代码意外中止");
function program(text, index) {
    var scopes = [];
    var functions = [];
    var inExpression = false;
    var findings = [];
    var curved;
    var exps = [];
    var pretype = null, preprev;
    var invar = false, inlet = false;
    var saveOnly = function (type, start, end) {
        switch (type) {
            case Expression:
                var exp = text.slice(start, end);
                var scope = scopes[scopes.length - 1];
                if (scope) {
                    scope.exps.push(exp);
                }
                break;
        }
    };
    var save = function (type, start, end) {
        preprev = pretype;
        pretype = type;
        saveOnly(type, start, end);
    };
    var saveValue = function (type, start, end) {
        if (pretype === Scope) closeExpress();
        save(type, start, end);
        curved = null;
        openExpress();
    };

    var openExpress = function () {
        inExpression = true;
    };
    var closeExpress = function () {
        var scope = findings[findings.length - 1];
        if (scope instanceof Scope && scope.curve[1] !== undefined && scope.brace[0] === undefined) {
            closeScope();
        }
        inExpression = false;
    };
    var openScope = function (s) {
        var emitvar = s.emitvar;
        findings.push(s);
        var p = emitvar ? scopes[scopes.length - 1] : functions[functions.length - 1];
        if (p) {
            p.children.push(s);
            s.parent = p;
        }
        s.inExpression = !emitvar && inExpression;
        scopes.push(s);
        if (!emitvar) functions.push(s);
    };
    var closeScope = function () {
        findings.pop();
        var f = scopes.pop();
        if (!f.emitvar) functions.pop();
        f.end = index;
        save(Scope, f.start, f.end);
        if (!f.inExpression) closeExpress();
        else openExpress();
    };
    do {
        programreg.lastIndex = index;
        var res = programreg.exec(text);
        if (!res) return index;
        var r = res[0];
        index = res.index + r.length;
        if (r.length < 3 && ScannersMap[r]) {
            var scanner = ScannersMap[r];
            var start = res.index;
            index = scanner(text, index);
            end = index;
            if (scanner === MultiLinesComment || scanner === SingleLineComment) {
                saveOnly(scanner, start, end);
            } else {
                saveValue(scanner, start, end);
            }
        }

        else if (r === "/") {
            var isReg = false;
            if (pretype === Punctuator || !inExpression) {
                isReg = true;
            }
            if (isReg) {
                index = Regular(text, index);
                saveValue(Regular, res.index, index);
            } else {
                save(Punctuator, res.index, index);
            }
        }
        else if (braceStartReg.test(r)) {
            var f = findings[findings.length - 1];
            var n = false;
            if (f instanceof Scope) {
                if (r === "(" && f.curve[0] === undefined) {
                    f.curve[0] = res.index;
                    inExpression = true;
                }
                else if (r === "{" && f.brace[0] === undefined) {
                    f.brace[0] = res.index;
                }
                else {
                    n = true;
                }
            } else {
                if (curved) {
                    if (inExpression) {
                        var s = new Scope(curved[0], curved, false);
                        s.brace[0] = res.index;
                        openScope(s);
                    }
                }
                else {
                    n = true;
                }
            }
            if (n) {
                findings.push(res.index);
            }
        }
        else if (braceEndReg.test(r)) {
            if (!findings.length) return index;
            var f = findings[findings.length - 1];
            if (f instanceof Scope) {
                if (r === ')') {
                    f.curve[1] = index;
                    if (f.lead === 'do') closeScope();
                }
                else if (r === '}') {
                    f.brace[1] = index;
                    if (f.lead !== 'do') closeScope();
                }
            } else {
                var cstart = findings.pop();
                if (r === ")") {
                    curved = [cstart, index];
                }
            }
        }
        else switch (r) {
            case "for":
            case "if":
            case "switch":
            case "with":
            case "while":
            case "do":
            case "try":
            case "catch":
            case "finaly":
                var emitvar = true;
            case "async":
            case "function":
                curved = undefined;
                pretype = Keyword;
            case "=>":
                pretype = Punctuator;
                var s = new Scope(res.index, curved, emitvar);
                s.lead = r;
                openScope(s);
                break;
            case "var":
                invar = true;
            case "let":
            case "const":
                inlet = true;
            default: if (isPunctuator(r)) {
                save(Punctuator, res.index, index);
                if (/;/.test(r)) {
                    closeExpress();
                } else {
                    openExpress();
                }
            }
            else if (isKeyWord(r)) {
                save(Keyword, res.index, index);
                closeExpress();
            }
            else if (isNumber(r)) {
                saveValue(Numeric, res.index, index);
            }
            else if (isInternal(r)) {
                saveValue(Internal, res.index, index);
            }
            else {
                if (!isSpace(r)) {
                    saveValue(Expression, res.index, index);
                }
            }
        }
    } while (index < text.length);
}

function javascript(text, lastIndex = 0) {
    program(text, lastIndex);
}

function scan(text) {
    var res = javascript(String(text), 0);
    console.log(res)
}


module.exports = scan;