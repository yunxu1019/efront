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
} = require("./common");
var combine = require("../basic/combine");

var sortRegExpSource = function (a, b) {
    if (a.indexOf(b) >= 0) return -1;
    if (b.indexOf(a) >= 0) return 1;
    return 0;
};
var createQuotedMap = function (entry) {
    var map = {};
    var end = {};
    entry.forEach(k => {
        var [a, b] = k.slice(-2);
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
class Program {
    quotes = [
        [/'/, /'/, /\\[\s\S]/],
        [/"/, /"/, /\\[\s\S]/],
        ["/", /\/[a-z]*/, /\\[\s\S]|\[(\\[\s\S]|[^\]])+\]/],
        ["`", "`", /\\[\s\S]/, ["${", "}"]],
    ]
    tags = [
        [["<", "</"], /\/?>/, null, ["'", '"', "{", "}"], [/<!--/, /--!?>/]]
    ];
    scriptTags = [];
    ignoreTags = ["STYLE", "SCRIPT"];
    comments = [
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
    Code = Array;
    transive_reg = /^(new|void|case|break|continue|return|throw|extends|import)$/
    straps = "if,for".split(',');
    forceend_reg = /^(return|break|continue)$/;
    classstrap_reg = /^(class)$/;
    extends_reg = /^(extends)$/;
    spaces = spaceDefined;
    nocase = false
    keepspace = false;
    lastIndex = 0
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
            if (s instanceof Array) return s.slice().sort(sortRegExpSource).map(s => this.compile(s)).join("|");
            return this.compile(s);
        });
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
        var origin = queue;
        var forceend_reg = this.forceend_reg;
        var program = this;
        var queue_push = function (scope) {
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
                if (last) last.next = scope;
                queue.last = scope;
                for (var cx = queue.length - 1; cx >= 0; cx--) {
                    var o = queue[cx];
                    if (o === last) break;
                    o.next = scope;
                }
                if (!queue.first) queue.first = scope;
            }
            scope.row = row;
            scope.col = scope.start - colstart;
            queue.push(scope);
        };
        var row = 1, colstart = -1;
        var save = (type) => {
            if (lasttype === STAMP && type === STAMP && !/[,;\:]/.test(m)) {
                var scope = queue[queue.length - 1];
                if (/=>$/i.test(scope.text) ||
                    /[=>]$/.test(scope.text) && /[^>=]/.test(m) ||
                    /[?]$/.test(scope.text) && /[^?\.=\:]/.test(m) ||
                    /[,;]$/.test(scope.text) ||
                    /^[!~]$/.test(m) || scope.text !== m && /^[\+\-]$/.test(m)) {
                } else {
                    scope.end = end;
                    scope.text = text.slice(scope.start, scope.end);
                    program.setType(scope);
                    return;
                }
            }

            var scope = {
                type,
                start,
                end,
                isExpress: queue.inExpress,
                text: m
            }
            if (type === STRAP) {
                if (forceend_reg.test(m)) scope.isend = false, queue.inExpress = false;
                if (this.transive_reg.test(m)) scope.transive = true, queue.inExpress = true;
            }
            if (isdigit) scope.isdigit = true;
            lasttype = type;
            queue_push(scope);
        };
        var space_exp = this.space_exp;
        var scriptTags = this.scriptTags;
        var ignoreTags = this.ignoreTags;
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
        var closeTag = function () {
            queue.inTag = false;
            if (queue.closed) return;
            if (queue.length) queue.attributes = queue.splice(0, queue.length);
            if (/^\//.test(m)) return queue.short = true, queue.closed = true;
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
            scope.queue = queue;
            scope.prev = queue.last;
            parents.push(queue);
            queue = scope;
            lasttype = null;
        }
        var pop_parents = function () {
            var scope = queue;
            queue = parents.pop();
            queue_push(scope);
            lasttype = scope.type;
        }
        var push_piece = function (index = match.index) {
            if (index > start) {
                var piece = queue[queue.length - 1];
                if (piece && piece.type === PIECE) {
                    piece.text = text.slice(piece.start, index);
                    piece.end = match.index;
                }
                else {
                    m = text.slice(start, index);
                    save(PIECE);
                }
            }
            m = match[0];
        }
        loop: while (index < text.length) {
            if (queue.type === QUOTED) {
                var quote = this.quote_map[queue.entry];
                var reg = quote.reg;
                start = index;
                while (index < text.length) {
                    reg.lastIndex = index;
                    var match = reg.exec(text);
                    if (!match) {
                        index = text.length;
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
                    if (m in this.quote_map) {
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

            var reg = this.entry_reg;
            var start = reg.lastIndex = index;
            var match = reg.exec(text);
            if (!match) return null;
            var end = match[0].length + match.index;
            index = end;
            var m = match[0];
            test: if (this.quote_map.hasOwnProperty(m)) {
                var last = queue.last;
                var quote = this.quote_map[m];
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
                if (this.stamp_reg.test(m) && last) {
                    if ((VALUE | EXPRESS) & last.type) {
                        if (queue.type !== ELEMENT) break test;
                        var lp = last.prev;
                        if (lp) {
                            if (lp.type === STAMP && lp.text !== ';') break test;
                            if (lp.type === STRAP && lp.transive) break test;
                        }
                    }
                    if (last.type === QUOTED && !last.tag) break test;
                    if (last.type === SCOPED && queue.inExpress) break test;
                    if (lasttype === STAMP && m === last.text) break test;
                    if (last.type === STAMP && /^(\+\+|\-\-)$/.test(last.text)) break test;
                }
                var scope = [];
                scope.type = this.comment_entry.test(m) ? COMMENT : QUOTED;
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
                while (index < text.length) {
                    reg.lastIndex = index;
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
                row += queue.text.replace(/[^\r\n\u2028\u2029]+/g, ':').replace(/\r\n/g, ',').replace(/:/g, '').length;
                pop_parents();
                continue;
            }
            var parent = parents[parents.length - 1];
            if (parent && this.quote_map[parent.entry] && queue.leave_map?.[m] === queue.entry) {
                delete queue.leave_map;
                queue.end = end;
                queue.leave = m;
                pop_parents();
                continue;
            }
            if (this.space_reg.test(m)) {
                if (/[\r\n\u2028\u2029]/.test(m)) {
                    m = m.replace(/^[^\r\n\u2028\u2029]+/, '').replace(/\r\n|\r|\n|\u2028|\u2029/g, "\r\n");
                    row += m.replace(/[^\r\n]+/g, '').length >> 1;
                    colstart = match.index + m.replace(/[^\r\n]+$/, '').length - 1;
                    var last = queue.last;
                    if (last && last.isend === false) {
                        last.isend = true;
                        queue.inExpress = false;
                    }
                    save(SPACE);
                }
                else {
                    if (this.keepspace) save(SPACE);
                }
                lasttype = SPACE;
                continue;
            }
            if (this.strap_reg.test(m)) {
                if (!this.classstrap_reg.test(m)) queue.inExpress = this.transive_reg.test(m);
                else {
                    var last = queue.last;
                    if (!last);
                    else if (last.type === STAMP) {
                        queue.inExpress = !/^(;|\+\+|\-\-)$/.test(last.text);
                    }
                    else if (last.type !== STRAP) {
                        queue.inExpress = false;
                    }
                }
                save(STRAP);
                continue;
            }
            var isdigit = number_reg.exec(m);
            if (isdigit) {
                m = isdigit[0];
                index = match.index + m.length;
                isdigit = true;
            }
            if (this.value_reg.test(m) || isdigit) {
                queue.inExpress = true;
                if (isdigit && lasttype === STAMP) {
                    var last = queue.last;
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
            if (this.express_reg.test(m)) {
                var last = queue.last;
                if (last && last.type === STRAP && this.classstrap_reg.test(last.text));
                else queue.inExpress = true;
                save(EXPRESS);
                continue;
            }

            if (this.scope_entry[m]) {
                var scope = [];
                scope.entry = m;
                scope.type = SCOPED;
                scope.start = match.index;
                scope.col = match.index - colstart;
                scope.row = row;
                var last = queue.last;
                if (m === "{") {
                    if (!last) {
                        scope.isObject = queue.inExpress;
                    }
                    else if (queue.classed > 0) {
                        if (last.type !== STAMP || last.text !== "=>") {
                            queue.classed--;
                            scope.isClass = true;
                            scope.extend += this.extends_reg.test(last.text);
                            scope.inExpress = false;
                        }
                    }
                    else if (last.type === STAMP) {
                        if (last.text === ':') {
                            scope.isObject = queue.inExpress;
                        }
                        else queue.inExpress = scope.isObject = !/^(;|\+\+|\-\-|=>)$/.test(last.text);
                    }
                    else if (last.type === EXPRESS && last.text === '...') {
                        scope.isObject = true;
                    }
                    else if (last.type === STRAP) {
                        if (last.isend);
                        else scope.isObject = queue.inExpress;
                    }
                }
                else {
                    if (!last || (last.type & (SCOPED | STAMP))) queue.inExpress = true;
                    scope.isExpress = queue.inExpress;
                    scope.inExpress = true;
                }
                push_parents(scope);
                continue;
            }
            if (this.scope_leave[m] && queue.entry === this.scope_leave[m]) {
                var lastUncomment = queue.last;
                if (lastUncomment) {
                    if (lastUncomment.type === PROPERTY) {
                        lastUncomment.short = true;
                    }
                }

                queue.end = end;
                queue.leave = m;

                pop_parents();
                continue;
            }
            if (this.scope_leave[m]) console.warn(i18n`标记不匹配`, queue.entry, m, "queue-start:", queue.start, "position:", `${row}:${index - colstart}\r\n`, index - queue.start < 200 ? text.slice(queue.start, index) : text.slice(queue.start, queue.start + 100) + "..." + text.slice(index - 97, index));
            if (this.stamp_reg.test(m)) {
                save(STAMP);
            }

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
        };
        this.lastIndex = index;
        if (queue !== origin) {
            throw console.log(createString(origin), `\r\n------ deep: ${parents.length}\r\n  --- enrty: ${queue.entry}\r\n  -- length: ${queue.length}\r\n  ---- last: ${createString([queue.last])}\r\n------- end\r\n --parents: ${parents.map(p => p.tag || p.entry || p.text).join('->')}`, createString([queue]).slice(-200)), "代码异常结束";
        }
        return queue;
    }
    commit() {
        this.strap_reg = this.createRegExp(this.straps);
        this.comment_entry = this.createRegExp(this.comments.map(m => m[0]));
        var stamps = this.stamps.join("");
        stamps = this.compile(stamps);
        this.stamp_reg = new RegExp(`^[${stamps}]$`);
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
            if (q.tag) r = r.concat(q.tag.slice().sort(sortRegExpSource));
            r = r.concat(ts.map(this.compile)).join("|");
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
        var quotes = this.createRegExp(quoteslike.map(q => q[0]), true).source;
        this.entry_reg = new RegExp([`[${spaces}]+|${quotes}|[${scopes}]|${number_reg.source.replace(/^\^|\$$/g, "")}[^${tokens}]*|${express}|[${stamps}]`], "gi" + flagUnicode);
    }
}
module.exports = Program;