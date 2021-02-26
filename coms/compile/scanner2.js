
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
    var marks = [], scanners = [];
    for (var cx = 0, dx = pairs.length; cx < dx; cx += 2) {
        var m = pairs[cx];
        if (m instanceof RegExp) m = m.source;
        marks.push(m);
        var s = pairs[cx + 1];
        if (!(s instanceof Function)) var s = createScanner(s);
        scanners.push(s);
    }
    marks.push(endflag);
    var s = new RegExp(/\\[\s\S]|/.source + marks.join("|"), "g");
    var PairScanner = function (text, index) {
        s.lastIndex = index;
        do {
            var r = s.exec(text);
            if (!r) break;
            var i = marks.indexOf(r[0]);
            index = res.index + res[0].length;
            if (i === scanners.length) break;
            if (i > 0) index = scanners[i](text, index);
        } while (i < scanners.length);
        return r ? index : text.length;
    }
    return PairScanner;
}
var SingleQuoteString = createScanner('"');
var DoubleQuoteString = createScanner("'");
var RegExpBlock = createPairScanner([
    /\(/, /\)/,
    /\[/, /\]/
], /\/\w*/);
var SingleLineComment = createScanner(/(?=[\r\n])/);
var MultiLinesComment = createScanner(/\*\//);
var keywords = new RegExp("^(" + `if,in,do
var,for,new,try,let,NaN
this,else,case,void,with,enum,true,null
while,break,catch,throw,const,yield,class,super,false
return,typeof,delete,switch,export,import
default,finally,extends
function,continue,debugger,Infinity
undefined
instanceof`.trim().split(/[\r\n,\s]+/).join("|") + ")$");
var isKeyWord = function (text) {
    return keywords.test(text);
};
var operator = /'"`\/\=\+;\|\:\?\*\<\>\-\[\]\{\}\(\)\!\~@#%\^&\*\,/.source;
var braceend = /['"`\]\)\}]/;
var space = /\r\n\t\s\u2028\u2029/.source;
var programreg = new RegExp(/\\[\s\S]|/.source + `\/\*|\/\/|['"]|\=\>|${space}|[^${space}${operator}]+|[${operator}]`, 'g');
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
    "`": TemplateString
};

function Block(typedScanner, start, end) {
    this.type = typedScanner;
    this.start = start;
    this.end = end;
}
Block.prototype = {
    SingleQuoteString,
    DoubleQuoteString,
    SingleLineComment,
    MultiLinesComment,
    TemplateString,
    Variable,
    Keyword,
    Property,
}

function Scope(start, curve = [], emitvar = false) {
    this.start = start;
    this.curve = curve;
    this.brace = [];
    this.parent = null;
    this.emitvar = emitvar;
    this.children = [];
    this.scopes = [];
}

function Variable() { };
function Property() { };
function Keyword() { };

var braceStartReg = /[\(\[\{]/g;
var braceEndReg = /[\)\]\}]/g;
var EarlyEndError = new Error("代码意外中止");
function program(text, index) {
    var tokens = [];
    var scopes = [];
    var functions = [];
    var lastres = '';
    var inExpression = false;
    var findings = [];
    var curved = [];
    var save = function (type, start, end) {
    };
    do {
        programreg.lastIndex = index;
        var res = programreg.exec(text);
        if (!res) return index;
        var r = res[0];
        index = res.index + r.length;
        var scanner = ScannersMap[r];
        if (scanner) {
            var start = index;
            index = scanner(text, index);
            end = index;
            save(scanner, start, end);
            lastres = '';
        }

        else if (r === "/") {
            var isReg = false;
            if (!lastres || isPunctuator(lastres) && !braceend.test(lastres) || isKeyWord(lastres)) {
                isReg = true;
            } else if (lastres === '}') {
                isReg = true;
            }
            index = scanner(text, index);
        }
        else if (braceStartReg.test(r)) {
            var f = findings[findings.length - 1];
            if (f instanceof Scope) {
                if (f.curve[0] === undefined) {
                    f.curve[0] = res.index;
                } else if (f.brace[0] === undefined) {
                    f.brace[0] = res.index;
                } else {
                    findings.push(res.index);
                }
            } else {
                findings.push(res.index);
            }
        }
        else if (braceEndReg.test(r)) {
            if (!findings.length) return index;
            var f = findings[findings.length - 1];
            if (f instanceof Scope) {
                if (r === ')') {
                    f.curve[1] = index;
                    braceStartReg.lastIndex = index;
                    res = braceStartReg.exec(r);
                    if (!res) throw EarlyEndError;
                    f.brace[0] = res.index;
                    index = res.index + res[0].length;
                } else if (r === '}') {
                    f.brace[1] = index;
                    findings.pop();
                    scopes.pop();
                    if (f.emitvar) functions.pop();
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
                var emitvar = true;
            case "function":
                carved = undefined;
            case "=>":
                var s = new Scope(res.index, carved, emitvar);
                findings.push(s);
                var p = emitvar ? scopes[scopes.length - 1] : functions[functions.length - 1];
                if (p) {
                    p.children.push(s);
                    s.parent = p;
                }
                scopes.push(s);
                if (emitvar) functions.push(s);
                break;
            case "var":
            case "let":
            case "const":
            default: if (!isPunctuator(r)) {
                if (isKeyWord(r)) {
                    save(Keyword, res.index, index);
                } else {
                    var t = s;
                    tokens.push(t);
                }
            }
        }
    } while (index < text.length)
}

function javascript(text, lastIndex = 0) {
    var reg = /\s+|['"`]|\/\*|\/\/|\/|(function)\s/g;
    reg.lastIndex = lastIndex;
    reg.exec(text);
}

function scan(text) {
    javascript(text, 0);
}

module.exports = scan;