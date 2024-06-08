const {
    /*   1 */COMMENT,
    /*   2 */SPACE,
    /*   4 */STRAP,
    /*   8 */STAMP,
    /*  16 */VALUE,
    /*  32 */QUOTED,
    /*  64 */PIECE,
    /* 128 */EXPRESS,
    /* 256 */SCOPED,
    /* 512 */LABEL,
    /*1024 */PROPERTY,
    /*2048 */ELEMENT,
    createString,
    number_reg,
    digit_reg,
} = require("./common");
var combine = require("../basic/combine");
var sortRegster = require("../basic/sortRegister");
var createQuotedMap = function (entry) {
    var map = {};
    var end = {};
    entry.forEach(e => {
        if (!(e instanceof Array)) return;
        var [a, b] = e.slice(-2);
        if (a instanceof RegExp) a = stringsFromRegExp(a);
        if (b instanceof RegExp) b = stringsFromRegExp(b);
        combine([].concat(a), [].concat(b)).forEach(([a, b]) => {
            map[a] = b;
            end[b] = a;
        });
    });
    return [map, end];

}
var stringsFromRegExp = function (reg) {
    // 只处理有限长度无嵌套无分支的表达式
    var source = reg.source;
    var queue = [];
    for (var cx = 0, dx = source.length; cx < dx; cx++) {
        var s = source[cx];
        if (source[cx] === "\\") {
            var s = source[++cx];
            queue.push(s);
        }
        else if (s === "?") {
            queue[queue.length - 1] = [queue[queue.length - 1][0], ""];
        }
        else {
            queue.push(s);
        }
    }
    var res = combine(...queue).map(a => a.join(""));
    return res;
}
var supportUnicodeRegExp = false;
var spaceDefined = [
    "\\u0002",
    "\\b-\\r",// "\\b"/*8*/, "\\t"/*9*/, "\\n"/*10*/, "\\v"/*11*/, "\\f"/*12*/, "\\r"/*13*/,
    " "/*32*/,
    "\\u007f", "\\u00a0", "\\u00ad", "\\u034f", "\\u061c",
    "\\u115f", "\\u1160",
    "\\u17b4", "\\u17b5",
    "\\u180b-\\u180e",
    "\\u1cbb", "\\u1cbc",
    "\\u2000-\\u200f",
    "\\u2028-\\u202f",
    "\\u205f-\\u206f",
    "\\u2800", "\\u3000", "\\u3164",
    "\\ufe00-\\ufe0f",
    "\\ufeff", "\\uffa0",
    "\\ufff0-\\ufff8",
    "\\u{133fc}",
    "\\u{1d173}-\\u{1d17a}"
]
try {
    new RegExp('.', 'u');
    supportUnicodeRegExp = true;
} catch (e) {
    spaceDefined.pop();
    spaceDefined.pop();
}
var powermap = require("./powermap");
class Program {
    quotes = [
        [/'/, /'/, /\\[\s\S]/],
        [/"/, /"/, /\\[\s\S]/],
        ["/", /\/[a-z]*/, /\\[\s\S]|\[(\\[\s\S]|[^\]])+\]/],
        ["`", "`", /\\[\s\S]/, ["${", "}"]],
    ]
    tags = [
        [["<", "</"], /\/?>/, /\\[\s\S]|\=\>/, "'", '"', "<!--", ["${", "}"]]
    ];
    scriptTags = [];
    ignoreTags = ["STYLE", "SCRIPT"];
    comments = [
        ["#!", /(?=[\r\n\u2028\u2029])/],
        ["//", /(?=[\r\n\u2028\u2029])/],
        ["/*", "*/"],
        [/<!--/, /--!?>/],
    ]
    scopes = [
        ["(", ")"],
        ["[", "]"],
        ["{", "}"],
    ]
    stamps = "/=+;|:?<>-!~%^&*,".split("")
    value_reg = /^(false|true|null)$/
    number_reg = number_reg;
    digit_reg = digit_reg;
    Code = Array;
    powermap = powermap;
    transive_reg = /^(new|var|let|const|yield|void|in|of|typeof|delete|case|return|await|default|instanceof|throw|extends|import|from)$/;
    straps = "if,for".split(',');
    forceend_reg = /^(return|break|continue)$/;
    funcstrap_reg = /^(class|function|fn|func|async|interface|struct|enum|impl|pub)$/;
    extends_reg = /^(extends|implements)$/;
    structstrap_reg = /^(class|interface|struct|enum)$/;
    control_reg = /^(if|else|switch|case|do|while|for|loop|break|continue|default|import|from|as|export|try|catch|finally|throw|await|yield|return)$/;
    type_reg = /^(var|let|const|function|fn|func|class|interface|type|struct|enum|impl)$/;
    spaces = spaceDefined;
    nocase = false
    keepspace = false;
    lastIndex = 0
    twain(o1, o2) {
        if (o1.istype || o1.needle || o2.needle) return;
        o2.istype = true;
    }
    compile2(s) {
        return s.replace(/\\[\s\S]|[\[\]\(\)\{\}\+\.\*\?\$\^\|\\\/\s\?]/g, function (m) {
            if (m.length > 1) {
                return m;
            }
            return "\\" + m;
        });
    }
    compile(s) {
        return s.replace(/\\[\s\S]|[\[\]\(\)\{\}\+\.\-\*\?\$\^\|\\\/ ]/g, function (m) {
            if (m.length > 1) {
                return m;
            }
            return "\\" + m;
        });
    }
    createRegExp(source, g) {
        source = source.map(s => {
            if (s instanceof RegExp) return s.source;
            if (s instanceof Array) return s.slice().map(s => this.compile2(s));
            return this.compile2(s);
        });
        source = [].concat(...source);
        sortRegster(source);
        var flag = this.nocase ? "i" : "";
        var s = source.join("|");
        if (g) return new RegExp(`${s}`, "g" + flag);
        if (source.length > 1) return new RegExp(`^(${s})$`, flag);
        return new RegExp(`^${s}$`, flag);
    }
    setType() {
    }

    exec(text) {
        if (!this.entry_reg) this.commit();
        var index = this.lastIndex;
        this.lastIndex = text.length;
        var parents = [];
        var lasttype;
        var Code = this.Code;
        var queue = new Code();
        queue.type = this.type;
        queue.inExpress = this.inExpress;
        if (this.type === ELEMENT) {
            queue.entry = this.tags[0].tag[0];
        }
        var origin = queue;
        var forceend_reg = this.forceend_reg;
        var program = this;
        var quote_map = this.quote_map;
        var space_reg = this.space_reg;
        var strap_reg = this.strap_reg;
        var stamp_reg = this.stamp_reg;
        var scope_entry = this.scope_entry;
        var express_reg = this.express_reg;
        var value_reg = this.value_reg;
        var extends_reg = this.extends_reg;
        var funcstrap_reg = this.funcstrap_reg;
        var entry_reg = this.entry_reg;
        var type_reg = this.type_reg;
        var digit_reg = this.digit_reg;
        var comment_entry = this.comment_entry;
        var rowsOf = m => m.replace(/[^\r\n\u2028\u2029]+/g, ';').replace(/\r\n|\r|\n|\u2028|\u2029/g, ' ').replace(/;/g, '').length;
        var setRows = m => {
            row += rowsOf(m);
            var reg = /[\r\n\u2028\u2029]/g;
            reg.lastIndex = 0;
            var index = 0;
            do {
                index = reg.lastIndex;
                var match = reg.exec(m);
            } while (match);
            colstart = start + index - 1;
        };
        var queue_push = (scope) => {
            if (scope.type & (SPACE | COMMENT | PIECE | QUOTED)) {
                if (scope.text) setRows(scope.text);
            }
            var last = queue.last;
            Object.defineProperty(scope, 'queue', { value: queue, enumerable: false, configurable: true });
            scope.prev = last;
            if (!(scope.type & (COMMENT | SPACE))) {
                var keeplast = program.setType(scope) === false;
                if (keeplast) {
                    if (queue.last !== last) last = queue.last;
                    else if (scope.prev !== last) last = scope.prev;
                    while (queue[queue.length - 1] !== last) queue.pop();
                    last.end = scope.end;
                    last.text = text.slice(last.start, last.end);
                    queue.last = last;
                    return;
                }
                if (queue.last !== last && queue.last !== o) {
                    last = queue.last, scope.prev = last;
                    if (last) last.text = text.slice(last.start, last.end);
                }
                if (queue.isClass && scope.isprop) scope.isend = false;
                if (last) {
                    last.next = scope;
                    if (queue[queue.length - 1] === last && last.type === scope.type && last.type & (EXPRESS | PROPERTY)) {
                        this.twain(last, scope);
                    }
                    if (last.type === STAMP && last.text === "*") {
                        if (scope.type === STRAP) last.unary = false;
                    }
                }
                queue.last = scope;
                for (var cx = queue.length - 1; cx >= 0; cx--) {
                    var o = queue[cx];
                    if (o === last) break;
                    o.next = scope;
                }
                if (!queue.first) queue.first = scope;
            }
            queue.push(scope);
        };
        var row = 1, colstart = -1;
        var cache_stamp = null;
        var powermap = this.powermap;
        var push_stamp = function () {
            var last = queue.last;
            var o = cache_stamp;
            if (last?.istype && last.prev?.isarg) {
                o.unary = true;
            }
            else if (!last || last.type === STAMP && (!(last.text in powermap)) && !last.istype) {
                if (!queue.istype && powermap[o.text] > powermap["="]) o.unary = true;
            }
            else if (last.type === STRAP && !last.isend || last.type === STAMP && !last.istype && !/^(\+\+|\-\-)$/.test(last.text) || last.type === SCOPED && /^[\{\[]$/.test(last.entry) && !last.isExpress) {
                o.unary = /^[^=;,\:]$/.test(o.text);
                if (o.unary && /^(\+|\-)$/.test(o.text) && last && last.type === STAMP && /^(\+\+|\-\-)$/.test(last.text)) o.unary = !!last.unary;
            }
            if (/^(\+\+|\-\-)$/.test(o.text)) {
                var i = 1;
                var p = queue[queue.length - i];
                if (p === o) p = queue[queue.length - ++i];
                while (p && p.type & (SPACE | COMMENT)) {
                    if (p.type === SPACE && /[\r\n\u2028\u2029]/.test(p.text)) break;
                    p = queue[queue.length - ++i];
                }
                o.unary = !p || p.type & (SPACE | STAMP | STRAP) || p.type === EXPRESS && p.prev && p.prev.type === STAMP && /^(\+\+|\-\-)$/.test(p.prev.text) && p.prev.unary;
            }

            if (!o.unary && /^(\.\.\.|\*)$/.test(o.text)) {
                if (powermap[o.text] === powermap.new) o.unary = true;
                if (last?.isarg || last?.isargl || last?.isprop) {
                    o.unary = true;
                    o.istype = true;
                }
                else if (queue.istype || o.isprop) o.unary = true;
                else {
                    if (last?.isprop && !last.isend) o.unary = true;
                }
            }
            if (powermap[o.text] >= powermap["."]) {
                o.needle = true;
            }
            if (o.needle);
            else if (powermap[o.text] > powermap.new && !o.unary) {
                o.needle = true;
            }
            queue_push(cache_stamp);
            if (cache_stamp.istype && cache_stamp.unary && powermap[cache_stamp.text] == powermap[":"]) cache_stamp.unary = false;
            if (cache_stamp === queue.last && cache_stamp.isExpress && cache_stamp.text in powermap && !cache_stamp.needle) queue.inExpress = true;
            lasttype = cache_stamp.type;
            cache_stamp = null;
        }
        var save = (type) => {
            if (type === STAMP) {
                if (cache_stamp) {
                    var stamp = cache_stamp.text;
                    if (!stamp) stamp = m;
                    else stamp += m;
                    if (stamp in powermap) {
                        cache_stamp.text = stamp;
                        cache_stamp.end = end;
                        return;
                    }
                    push_stamp();
                }
            }
            else {
                if (cache_stamp) push_stamp();
            }
            var scope = {
                type,
                start,
                end,
                row,
                col: start - colstart,
                isExpress: queue.inExpress,
                text: m
            };
            lasttype = type;
            if (type === STAMP) {
                cache_stamp = scope;
                scope.prev = queue.last;
                return;
            }
            if (type === STRAP) {
                if (forceend_reg.test(m)) scope.isend = false, queue.inExpress = false;
            }
            if (isdigit) scope.isdigit = true;
            queue_push(scope);
        };
        var space_exp = this.space_exp;
        var scriptTags = this.scriptTags;
        var ignoreTags = this.ignoreTags;
        var structstrap_reg = this.structstrap_reg;
        var openTag = function () {
            var m1 = text.slice(start, match.index);
            var s = space_exp.exec(m1);

            if (s) var tag = m1.slice(0, s.index);
            else {
                tag = m1;
            }
            if (queue.tag) {
                if (!quote.end.test(m)) return;
                var qtag = quote.tag[1];
                if (queue.tag_entry !== qtag) return;
                var p = queue;
                var pi = parents.length;
                var ps = [];
                for (var cx = 0, dx = parents.length; cx < dx; cx++) {
                    if (parents[cx].tag) break;
                }
                while (pi >= cx && p.tag !== tag) {
                    ps.push(p);
                    p = parents[--pi];
                }
                if (!p.tag) {
                    if (queue.waitTag) return;
                    pi++;
                    var scope = [];
                    scope.entry = queue.tag_entry;
                    scope.tag_leave = queue.tag_leave;
                    scope.tag = tag;
                    scope.row = row;
                    scope.col = scope.start - colstart;

                    scope.inTag = true;
                    scope.type = ELEMENT;
                }
                else {
                    p.tag_entry = queue.tag_entry;
                    p.closed = true;
                    p.inTag = true;
                }
                if (pi < parents.length) parents.splice(pi, parents.length - pi);
                queue = p;
                while (ps.length) {
                    var q = ps.pop();
                    if (q.tag) q.type = ELEMENT;
                    queue_push(q);
                }
                if (scope) queue = scope;
                return true;
            }

            queue.inTag = true;
            queue.tag = tag;
            var tagName = tag.toUpperCase();
            if (scriptTags.indexOf(tagName) >= 0) {
                queue.waitTag = tagName;
                queue.type = SCOPED;
            }
            else if (ignoreTags.indexOf(tagName) >= 0) {
                queue.waitTag = tagName;
            }
            if (s) {
                m = m1.slice(s[0].length + s.index);
                if (m) save(PIECE);
            }
            queue.first = null;
            queue.last = null;
            return true;
        };
        var isTypedColon = function (qp) {
            var istype = false;
            if (qp?.type === STAMP && qp.text === ':' && !qp.isExpress) {
                if (qp.istype) return true;
                var qpp = qp.prev;
                if (qpp.type === SCOPED && qpp.entry === '(') {
                    var qppp = qpp.prev;
                    if (qppp && (qppp.isprop)) {
                        istype = true;
                    }
                }
            }
            return istype;
        }
        var closeTag = function () {
            queue.inTag = false;
            if (queue.closed) return;
            if (queue.length) queue.attributes = queue.splice(0, queue.length);
            if (/^\//.test(m) || queue.istype) return queue.short = true, queue.closed = true;
            return false;
        };
        var push_quote = function () {
            var scope = [];
            scope.entry = m;
            scope.type = SCOPED;
            scope.inExpress = true;
            scope.leave_map = quote.leave;
            end = match.index;
            m = text.slice(start, end);
            save(PIECE);
            push_parents(scope);
        };
        var push_parents = function (scope) {
            if (cache_stamp) push_stamp();
            scope.queue = queue;
            scope.prev = queue.last;
            scope.row = row;
            scope.col = match.index - colstart;
            parents.push(queue);
            queue = scope;
            lasttype = null;
        }
        var pop_parents = function () {
            if (cache_stamp) push_stamp();
            if (!parents.length) {
                delete queue.end;
                var last = queue.last;
                if (last) {
                    while (queue[queue.length - 1] !== last) {
                        queue.pop();
                    }
                    queue.pop();
                    index = queue.last.start;
                    queue.last = last.prev;
                }
                else {
                    var m = queue.leave || queue.tag_leave;
                    index = queue.end
                    if (m) {
                        index - m.length;
                    }
                }
                delete queue.start;
                delete queue.end;
                delete queue.leave;
                delete queue.type;
                delete queue.entry;
                return;
            }
            var scope = queue;
            queue = parents.pop();
            queue_push(scope);
            lasttype = scope.type;
        }
        var push_piece = function (index = match.index) {
            if (cache_stamp) push_stamp();
            if (index > start) {
                var piece = queue[queue.length - 1];
                if (piece && piece.type === PIECE) {
                    row -= rowsOf(piece.text);
                    piece.text = text.slice(piece.start, index);
                    setRows(piece.text);
                    piece.end = index;
                }
                else {
                    m = text.slice(start, index);
                    save(space_reg.test(m) ? SPACE : PIECE);
                }
            }
            m = match?.[0];
        }
        loop: while (index < text.length) {

            if (queue.type & (QUOTED | ELEMENT)) {
                var quote = quote_map[queue.entry];
                var reg = quote.reg;
                start = index;
                while (index < text.length) {
                    reg.lastIndex = index;
                    var match = reg.exec(text);
                    if (!match) {
                        index = text.length;
                        if (queue === origin) push_piece(index);
                        break loop;
                    }
                    var m = match[0];

                    index = match.index + m.length;
                    if (quote.tag && queue.inTag === 0) {
                        if (openTag()) {
                            if (queue.type === ELEMENT) break;
                            start = index = match.index;
                        }
                        else queue.inTag = false;

                        continue;
                    }

                    if (quote.end.test(m)) {
                        end = match.index;
                        if (queue.tag) {
                            push_piece();
                            if (!queue.inTag) continue;
                            if (closeTag() === false) {
                                start = index;
                                queue.tag_leave = m;
                                continue loop;
                            }
                            queue.type = ELEMENT;
                        }
                        queue.leave = m;
                        if (start < end) {
                            m = text.slice(start, end);
                            save(PIECE);
                        }
                        break;
                    }
                    if (!quote.entry) continue;
                    a: if (quote.tag) {
                        var mi = quote.tag.indexOf(m);
                        if (mi < 0) {
                            break a;
                        }
                        if (mi === 0) {
                            if (queue.waitTag) continue;
                            push_piece();
                            var scope = [];
                            scope.entry = m;
                            scope.type = QUOTED;
                            if (queue.istype) scope.istype = queue.istype;
                            scope.start = index;
                            scope.isExpress = queue.inExpress;
                            push_parents(scope);
                            queue.inTag = 0;
                            start = index;
                            continue;
                        }
                        push_piece();
                        queue.tag_entry = m;
                        queue.inTag = 0;
                        start = index;
                        continue;
                    }
                    if (m in quote.entry) {
                        if (queue.tag && !queue.inTag && queue.waitTag) {
                            continue;
                        }
                        push_quote();
                        continue loop;
                    }
                    if (m in quote_map) {
                        if (comment_entry.test(m)) {
                            push_piece();
                            var start = match.index;
                            var { reg: comment_reg, end: comment_end } = quote_map[m];
                            comment_reg.lastIndex = index;
                            do {
                                var match = comment_reg.exec(text);
                            } while (match && !comment_end.test(match[0]));
                            if (match) end = index = match.index + match[0].length;
                            m = text.slice(start, index);
                            save(COMMENT);
                            continue loop;
                        }
                        if (queue.tag && !queue.inTag) continue;
                        push_piece();
                        var scope = [];
                        scope.entry = m;
                        scope.type = QUOTED;
                        push_parents(scope);
                        continue loop;
                    }
                }
                queue.end = match.index;
                pop_parents();
                continue;
            }

            var start = entry_reg.lastIndex = index;
            var match = entry_reg.exec(text);
            if (!match) return null;
            var end = match[0].length + match.index;
            index = end;
            var m = match[0];
            if (cache_stamp && !stamp_reg.test(m)) push_stamp();
            var last = cache_stamp || queue.last;

            test: if (quote_map.hasOwnProperty(m)) {
                var quote = quote_map[m];
                if (queue.tag && quote.tag) {
                    var tagend = end + queue.tag.length
                    var leavem = quote.entry[m];
                    if (text.slice(end, tagend) === queue.tag && text.slice(tagend, tagend + leavem.length) === leavem) {
                        push_piece();
                        queue.type = QUOTED;
                        queue.inTag = 0;
                        queue.tag_entry = m;
                        break test;
                    }
                }
                var iscomment = comment_entry.test(m);
                var isTypeTag = false;
                if (iscomment);
                else if (queue.istype) {
                    isTypeTag = true;
                }
                else if (!last) {
                    if (!queue.brace) {
                        isTypeTag = isTypedColon(queue.prev);
                    }
                }
                else if (stamp_reg.test(m) && last) {
                    if (last.type === STAMP && m === last.text) break test;
                    if (last.istype || last.isprop || last.isargl) {
                        isTypeTag = true;
                    }
                    else if ((VALUE | EXPRESS | PROPERTY) & last.type) a: {
                        if (queue.classed) {
                            isTypeTag = true;
                            break a;
                        }
                        var lp = last.prev;
                        if (lp) {
                            if (lp.type === STAMP) {
                                if (lp.text === ':') {
                                    if (isTypedColon(lp)) {
                                        last.istype = true;
                                        isTypeTag = true;
                                        break a;
                                    }
                                }
                                break test;
                            }
                            if (lp.istype || lp.isargl) {
                                isTypeTag = true;
                                break a;
                            }
                            if (lp.type === STRAP) {
                                if (lp.transive) break test;
                            }
                        }
                        if (queue.type !== ELEMENT) break test;
                    }
                    else switch (last.type) {
                        case QUOTED:
                            if (!last.tag) break test;
                            break;
                        case SCOPED:
                            if (queue.inExpress && !iscomment) break test;
                            break;
                        case STAMP:
                            if (/^(\+\+|\-\-)$/.test(last.text)) break test;
                            break;
                    }
                }
                var scope = [];
                scope.type = iscomment ? COMMENT : QUOTED;
                if (isTypeTag && scope.type === QUOTED) scope.istype = isTypeTag;
                scope.isExpress = queue.inExpress;
                scope.start = start;
                push_parents(scope);
                if (quote.tag) {
                    queue.entry = m;
                    queue.inTag = 0;
                    continue loop;
                }

                var m0 = m;
                var reg = quote.reg;
                reg.lastIndex = index;
                while (index < text.length) {
                    var match = reg.exec(text);
                    if (!match) {
                        index = text.length;
                        break;
                    }
                    var m = match[0];
                    index = match.index + m.length;
                    if (quote.length === 2) {
                        break;
                    }
                    if (quote.end.test(m)) {
                        break;
                    }
                    if (quote.length === 3) {
                        continue;
                    }
                    if (quote.length >= 4 && m in quote.entry) {
                        queue.entry = m0;
                        start += m0.length;
                        push_quote();
                        continue loop;
                    }
                }
                queue.inExpress = true;
                queue.end = index;
                queue.text = text.slice(queue.start, index);
                pop_parents();
                continue;
            }
            var parent = parents[parents.length - 1];
            if (parent && quote_map[parent.entry] && queue.leave_map?.[m] === queue.entry) {
                delete queue.leave_map;
                queue.end = end;
                queue.leave = m;
                pop_parents();
                continue;
            }
            if (space_reg.test(m)) {
                if (/[\r\n\u2028\u2029]/.test(m)) {
                    if (last && last.isend === false) {
                        last.isend = true;
                        queue.inExpress = false;
                    }
                    save(SPACE);
                }
                else {
                    if (this.keepspace || start === 0) save(SPACE);
                }
                lasttype = SPACE;
                continue;
            }
            if (!last?.needle && strap_reg.test(m)) {
                if (funcstrap_reg.test(m)) {
                    if (!last);
                    else if (last.type === STAMP) {
                        queue.inExpress = !/^(;|\+\+|\-\-)$/.test(last.text);
                    }
                    else if (last.type !== STRAP) {
                        queue.inExpress = false;
                    }
                }
                save(STRAP);
                var last = queue.last;
                if (last.type === STRAP && structstrap_reg.test(last.text) && !queue.classed) {
                    queue.classed = [last.text];
                }
                else if (queue.classed) {
                    if (last.type === STRAP && funcstrap_reg.test(last.text)) queue.classed.push(last.text);
                }
                if (funcstrap_reg.test(m)) {
                    last.isargl = true;
                }
                else if (type_reg.test(m)) {
                    last.istype = true;
                }
                if (this.transive_reg.test(m)) {
                    last.transive = queue.inExpress = true;
                }
                else {
                    queue.inExpress = false;
                }
                continue;
            }
            var isdigit = digit_reg.exec(m);
            if (isdigit) {
                var m1 = isdigit[0];
                if (m1.length < m.length) {
                    if (m.charAt(m1.length) === ".") {
                        m = m1;
                        index = match.index + m.length;
                    }
                    else if (/\.$/.test(m1)) {
                        m = m1.slice(0, m1.length - 1);
                        index = match.index + m.length;
                    }
                }
                isdigit = true;
            }
            if (!last?.needle && value_reg.test(m) || isdigit) {
                queue.inExpress = true;
                if (isdigit && lasttype === STAMP) {
                    var prev = last.prev;
                    if ((!prev || prev.type & (STAMP | STRAP) && !/^(\+\+|\-\-)$/.test(prev.text)) && /^[+\-]+$/.test(last.text)) {
                        last.type = VALUE;
                        last.text += m;
                        lasttype = VALUE;
                        last.end = end;
                        last.isdigit = true;
                        continue;
                    }
                }
                save(VALUE);
                continue;
            }
            if (express_reg.test(m)) {
                if (last && last.type === STRAP && funcstrap_reg.test(last.text));
                else queue.inExpress = true;
                save(EXPRESS);
                continue;
            }

            if (scope_entry[m]) {
                var scope = [];
                scope.entry = m;
                scope.type = SCOPED;
                scope.start = match.index;
                scope.col = match.index - colstart;
                scope.row = row;
                if (m === "{") {
                    if (!last) {
                        if (queue.istype) scope.isClass = true;
                        else scope.isObject = queue.inExpress;
                    }
                    else if (queue.classed) {
                        if (last.type !== STAMP || last.text !== "=>") {
                            var classed = queue.classed;
                            var clsd = classed.pop();
                            scope.isClass = true;
                            if (!classed.length) queue.classed = null;
                            scope.istype = clsd !== 'class';
                            scope.extend += extends_reg.test(last.text);
                            scope.inExpress = false;
                        }
                    }
                    else if (last.type === SCOPED && last.istype) {
                        scope.isClass = true;
                    }
                    else if (last.type === STAMP) {
                        if (last.istype) {
                            scope.isClass = true;
                        }
                        else if (last.text === ':') {
                            scope.isObject = queue.inExpress;
                        }
                        else queue.inExpress = scope.isObject = !/^(;|\+\+|\-\-|=>)$/.test(last.text);
                    }
                    else if (last.type === EXPRESS) a: {
                        var li = queue.length - 1;
                        var lp = queue[li];
                        while (lp !== last) {
                            if (lp.type === SPACE) break a;
                            lp = queue[li--];
                        }
                        var lp = last.prev;
                        if (lp?.type === STAMP && powermap[lp.text] === powermap["="]) scope.isObject = true;
                    }
                    else if (last.type === STRAP) {
                        if (last.isend);
                        else scope.isObject = last.transive;
                    }
                    scope.brace = true;
                    scope.isExpress = queue.inExpress;
                }
                else {
                    var prev = last;
                    if (prev?.type === ELEMENT) prev = prev.prev;
                    if (prev?.type === EXPRESS) {
                        prev = prev.prev;
                    }
                    if (prev) {
                        if (prev.isargl || prev.isprop || queue.istype) {
                            scope.isargl = true;
                        }
                        else if (prev.istype) {
                            scope.istype = true;
                        }
                    }
                    if (!last || (last.type & (SCOPED | STAMP))) queue.inExpress = true;
                    scope.isExpress = queue.inExpress;
                    scope.inExpress = true;
                }
                push_parents(scope);
                continue;
            }
            if (this.scope_leave[m] && queue.entry === this.scope_leave[m]) {
                if (last?.type === PROPERTY) {
                    last.short = true;
                }

                queue.end = end;
                queue.leave = m;

                pop_parents();
                continue;
            }
            if (this.scope_leave[m]) console.warn(i18n`标记不匹配`, queue.entry, m, "queue-start:", queue.start, "position:", `${row}:${index - colstart}\r\n`, index - queue.start < 200 ? text.slice(queue.start, index) : text.slice(queue.start, queue.start + 100) + "..." + text.slice(index - 97, index));
            save(STAMP);
        }
        while (queue.tag && parents.length) {
            for (var cx = 0, dx = parents.length; cx < dx; cx++) {
                if (parents[cx].tag) break;
            }
            var ps = parents.splice(cx, parents.length - cx);
            ps.push(queue);
            queue = parents[cx - 1];
            while (ps.length) {
                var p = ps.shift();
                if (p.tag) p.type = ELEMENT;
                queue_push(p);
            }
        }
        if (cache_stamp) push_stamp();
        this.lastIndex = index;
        if (queue !== origin) {
            console.log(
                "代码异常结束",
                createString(origin.slice(0, 30)),
                `\r\n ----- deep: ${parents.length}`,
                `\r\n ---- enrty: ${queue.entry}`,
                `\r\n --- length: ${queue.length}`,
                `\r\n ----- last: ${queue.last ? createString([queue.last]).slice(0, 30) : createString(queue).slice(0, 30)}`,
                `\r\n -- parents: ${parents.map(p => `${p.row}:${p.col}-${p.tag || p.text || p.entry} `).join('-)> ')}`,
                `\r\n ----- snap: ${createString([queue]).slice(-200)}`,
                `\r\n ------ end. `
            );
            while (queue !== origin) {
                queue.error = "代码异常结束";
                queue.leave = '';
                pop_parents();
            }
        }
        return origin;
    }
    commit() {
        this.strap_reg = this.createRegExp(this.straps);
        this.comment_entry = this.createRegExp(this.comments.map(m => m[0]));
        var stamps = this.stamps.join("");
        stamps = this.compile(stamps);
        this.stamp_reg = new RegExp(`^[${stamps}]+$`);
        var tokens = {};
        var quote_map = {};
        this.quote_map = quote_map;
        this.tags.forEach(t => t.tag = t[0]);
        var quoteslike = this.comments.concat(this.quotes, this.tags);
        quoteslike.forEach(q => {
            var a = q[0];
            if (a instanceof RegExp) a = stringsFromRegExp(a);
            if (a instanceof Array) {
                a.forEach(a => {
                    quote_map[a] = q;
                    if (a.length === 1) tokens[a] = true;
                });
            }
            else {
                quote_map[a] = q
                if (a.length === 1) tokens[a] = true;
            }
        });
        quoteslike.forEach(q => {
            var ts = [];
            var r = q.slice(q[2] ? 2 : 3).concat(q[1]).map(q => {
                if (q instanceof Array) {
                    if (q.length > 2) {
                        ts.push(...q.slice(0, q.length - 2));
                    }
                    else if (q.length !== 2) throw new Error(i18n`配置错误！`);
                    q = q[q.length - 2];
                }
                if (q instanceof RegExp) {
                    return q.source;
                }
                return this.compile(q);
            });
            if (q.tag) r = r.concat(q.tag);
            r = r.concat(ts.map(this.compile));
            r = sortRegster(r).join("|");
            q.reg = new RegExp(r, 'g');
            q.end = this.createRegExp([q[1]]);
            if (q.length >= 4) {
                var entry = q.slice(3);
                if (q.tag) entry.push([q.tag, q[1]]);
                [q.entry, q.leave] = createQuotedMap(entry);
            }
        });
        var scope_entry = {};
        this.scope_entry = scope_entry;
        this.scope_leave = {};
        var scope_leave = this.scope_leave;
        this.scopes.forEach(s => {
            var [a, b] = s;
            scope_entry[a] = b;
            scope_leave[b] = a;
            if (a.length === 1) tokens[a] = true;
            if (b.length === 1) tokens[b] = true;
        });
        this.stamps.forEach(s => {
            if (s.length === 1) tokens[s] = true;
        });
        var scopes = this.scopes.map(a => a.join("")).join("");
        scopes = this.compile(scopes);
        var spaces = this.spaces.join("");
        tokens = Object.keys(tokens).join("");
        tokens = this.compile(tokens) + spaces;
        var express = `(?:\\\\u\\{[^\\}]+\\}|[^${tokens}])+`;
        var flagUnicode = supportUnicodeRegExp ? 'u' : '';
        this.express_reg = new RegExp(`^${express}$`, flagUnicode);
        this.space_reg = new RegExp(`^[${spaces}]+$`, flagUnicode);
        this.space_exp = new RegExp(`[${spaces}]+`, flagUnicode);
        var quotes_entries = this.createRegExp(this.comments.concat(this.quotes).map(q => q[0]), true).source;
        var powers = Object.keys(this.powermap).filter(k => k.length > 1 && this.stamp_reg.test(k));
        var powers_entries = this.createRegExp(this.tags.map(t => t[0]).concat(powers), true).source;
        var entries_reg = new RegExp(`^(${powers_entries}|${quotes_entries}|${scopes})$`, this.nocase ? 'iu' : '');
        stamps = this.compile(this.stamps.filter(s => !entries_reg.test(s)).join(''));
        var number_reg = this.number_reg;
        var numbers = number_reg.source.replace(/^\^|\$$/g, "");
        this.digit_reg = new RegExp(/^[+\-]?/.source + numbers, number_reg.flags);
        this.entry_reg = new RegExp([`[${spaces}]+|${quotes_entries}|[${scopes}]|${numbers}[^${tokens}]*|${express}|${powers_entries}|[${stamps}]`], "gi" + flagUnicode);
    }
}
module.exports = Program;