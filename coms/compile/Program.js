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
    createString,
    number_reg,
} = require("./common");
var combine = require("../basic/combine");
var setObject = function (o) {
    o.isObject = true;
    var needproperty = true;
    for (var cx = 0; cx < o.length; cx++) {
        var m = o[cx];
        if (!needproperty) {
            if (m.type === SCOPED && m.entry === '{') {
                if (!m.isObject) setObject(m);
                continue;
            }
            if (m.type !== STAMP || m.text !== ',') continue;
        }
        if (m.type === STAMP && m.text === ':') {
            needproperty = false;
            continue;
        }
        if (m.type === LABEL) {
            o.splice(cx, 0, o[++cx].prev = m.next = m.next.prev = {
                prev: m,
                text: ':',
                type: STAMP,
                next: m.next,
            });
            m.type = PROPERTY;
            m.text = m.text.replace(/\:$/, '');
            m.isprop = true;
            m.end--;
            needproperty = false;
            continue;
        }
        m.isprop = true;
        if (m.type === EXPRESS || m.type === QUOTED) {
            if (!/\./.test(m.text)) m.type = PROPERTY;
        }
        if (m.prev && m.prev.type === PROPERTY) {

            m.prev.type = STRAP;
        }
    }
};
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

class Program {
    quotes = [
        [/'/, /'/, /\\[\s\S]/],
        [/"/, /"/, /\\[\s\S]/],
        ["/", /\/[a-z]*/, /\\[\s\S]|\[(\\[\s\S]|[^\]])+\]/],
        ["`", "`", /\\[\s\S]/, ["${", "}"]],
    ]
    tags = [
        [["<", "</"], /\/?>/, null, ["=", "'", '"', "{", "}"], [/<!--/, /--!?>/]]
    ];
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
    transive_reg = /^(new|void|switch|case|break|continue|return|throw|extends|import)$/
    straps = "if,for".split(',');
    colonstrap_reg = /^(case|default)$/;
    forceend_reg = /^(return|break|continue)$/;
    classstrap_reg = /^(class)$/;
    extends_reg = /^(extends)$/;
    export_reg = /^(export)$/;
    spaces = [
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
    nocase = false
    lastIndex = 0
    compile(s) {
        return s.replace(/\\[\s\S]|[\[\]\(\)\{\}\+\.\-\*\?\$\^\|\\\/]/g, function (m) {
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
        var parents = [];
        var lasttype;
        var Code = this.Code;
        var queue = new Code();
        queue.__proto__ = Code.prototype;
        var origin = queue;
        var colonstrap_reg = this.colonstrap_reg;
        var forceend_reg = this.forceend_reg;
        var program = this;
        var queue_push = function (scope) {
            var last = queue.last;
            Object.defineProperty(scope, 'queue', { value: queue, enumerable: false });
            scope.prev = last;
            if (scope.type !== COMMENT && scope.type !== SPACE) {
                if (program.setType(scope) === false) {
                    last = scope.prev;
                    last.end = scope.end;
                    last.text = text.slice(last.start, last.end);
                    return;
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
            if (lasttype === STAMP && type === STAMP && !/[,;\:\?]/.test(m)) {
                var scope = queue[queue.length - 1];
                if (/=>$/i.test(scope.text) ||
                    /[=>]$/.test(scope.text) && /[^>=]/.test(m) ||
                    /[?]$/.test(scope.text) && /[^?\.=\:]/.test(m) ||
                    /[,;]$/.test(scope.text) ||
                    scope.end !== start) {
                } else {
                    scope.end = end;
                    scope.text = text.slice(scope.start, scope.end);
                    program.setType(scope);
                    return;
                }
            }
            var last = queue.last;
            if (type === SPACE) {
                if (last && last.type === STRAP && forceend_reg.test(last.text)) {
                    last.isend = true;
                    queue.inExpress = false;
                }
            }
            else if (type !== STAMP);
            else if (m === ";") queue.inExpress = false;
            else if (last) check: switch (m) {
                case "?":
                    queue.inExpress = true;
                    if (!queue.question) queue.question = 1;
                    else queue.question++;
                    break;
                case "=":
                    if (last.type === SCOPED && last.entry === "{") {
                        if (!last.isObject) {
                            setObject(last);
                        }
                    }
                case ",":
                    if (queue.isObject) {
                        if (last.type === PROPERTY) {
                            last.short = true;
                        }
                    }
                    queue.inExpress = true;
                    break;
                case ":":
                    if (queue.question) {
                        queue.question--;
                        queue.inExpress = true;
                        break;
                    }
                    if (queue.isObject) {
                        if (last.type === PROPERTY || last.isprop) {
                            queue.inExpress = true;
                            break;
                        }
                        if (last.type === SCOPED && (!last.prev || !last.prev.type === STAMP && last.prev.text === ",")) {
                            queue.inExpress = true;
                        }
                        break;
                    }
                    var temp = last;
                    while (temp) {
                        if (temp.type === STRAP && colonstrap_reg.test(temp.text)) {
                            queue.inExpress = false;
                            break check;
                        }
                        if (!temp.isExpress) break;
                        temp = temp.prev;
                    }
                    queue.inExpress = false;
                    if (last.type === EXPRESS) {
                        // label
                        last.type = LABEL;
                        last.text += ":";
                        last.end = end;
                        return;
                    }
                    break;
                default:
                    queue.inExpress = true;
            }
            else {
                queue.inExpress = true;
            }
            var scope = {
                type,
                start,
                end,
                isExpress: queue.inExpress,
                text: m
            }
            if (isdigit) scope.isdigit = true;
            lasttype = type;
            queue_push(scope);
        };
        var space_exp = this.space_exp;
        var openTag = function () {
            queue.inTag = true;
            var m1 = text.slice(start, match.index);
            var s = space_exp.exec(m1);
            if (s) var tag = m1.slice(0, s.index);
            else {
                tag = m1;
            }
            if (queue.tag) {
                if (queue.last.text === quote.tag[1]) {
                    while (p && p.tag && p.tag !== p.tag) ps.push(p), p = parents[--pi];
                    if (p && ps.length) {
                        var pie = queue.pop();
                        queue.last = pie.prev;
                        queue = p;
                        while (ps.length) queue_push(ps.shift());
                        queue_push(pie);
                    }
                    m = tag;
                    save(PIECE);
                    queue.closed = true;
                    var p = queue;
                    var pi = parents.length;
                    var ps = [];
                }

            }
            else {
                queue.tag = tag;
                m = m1;
                save(PIECE);
            }
            if (queue.closed) {
                index = match.index;
            }
        };
        var closeTag = function () {
            queue.inTag = false;
            if (queue.closed) return;
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
                        openTag();
                        index = start = match.index;
                        continue;
                    }
                    if (quote.end.test(m)) {
                        end = match.index;
                        if (queue.tag && closeTag() === false) {
                            save(PIECE);
                            start = index;
                            continue loop;
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
                        if (mi < 0) break a;
                        if (mi === 0) {
                            var scope = [];
                            scope.entry = m;
                            scope.type = QUOTED;
                            scope.start = index;
                            push_parents(scope);
                            queue.inTag = 0;
                            start = index;
                            continue;
                        }
                        save(PIECE);
                        queue.inTag = 0;
                        start = index;
                        continue;
                    }
                    if (m in quote.entry) {
                        push_quote();
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
            this.lastIndex = index = end;
            var m = match[0];
            test: if (this.quote_map.hasOwnProperty(m)) {
                var last = queue.last;
                if (this.stamp_reg.test(m) && last) {
                    if ((VALUE | EXPRESS) & last.type) break test;
                    if (last.type === QUOTED && !last.tag) break test;
                    if (last.type === SCOPED && queue.inExpress) break test;
                    if (lasttype === STAMP && m === last.text) break test;
                }
                var scope = [];
                var quote = this.quote_map[m];
                scope.type = this.comment_entry.test(m) ? COMMENT : QUOTED;
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
                    index = this.lastIndex = match.index + m.length;
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
            if (parent && this.quote_map[parent.entry] && queue.leave_map[m] === queue.entry) {
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
                    save(SPACE);
                }
                lasttype = SPACE;
                continue;
            }
            if (this.strap_reg.test(m)) {
                if (!this.classstrap_reg.test(m)) queue.inExpress = this.transive_reg.test(m);
                else {
                    var last = queue.last;
                    if (!last) queue.inExpress = false;
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
            var isdigit = this.number_reg.test(m);
            if (this.value_reg.test(m) || isdigit) {
                save(VALUE);
                queue.inExpress = true;
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
                        else scope.isObject = !/^(;|\+\+|\-\-|=>)$/.test(last.text);
                    }
                    else if (last.type === STRAP) {
                        if (queue[queue.length - 1].type === SPACE && forceend_reg.test(last.text));
                        else if (this.export_reg.test(last.text));
                        else scope.isObject = queue.inExpress;
                    }
                }
                else {
                    if (!last || (last.type & (SCOPED | STAMP))) queue.inExpress = true;
                    scope.isExpress = queue.inExpress;
                    scope.inExpress = true;
                }
                scope.start = match.index;
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

            if (this.stamp_reg.test(m)) {
                save(STAMP);
            }

        }
        if (queue !== origin) throw console.log(createString(origin), createString([queue])), new Error("代码异常结束");
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
            if (typeof a === "string" && a.length === 1) tokens[a] = true;
            if (a instanceof Array) {
                a.forEach(a => quote_map[a] = q);
            }
            else quote_map[a] = q;
            var r = q.slice(q[2] ? 2 : 3).concat(q[1]).map(q => {
                if (q instanceof Array) {
                    q = q[q.length - 2];
                }
                if (q instanceof RegExp) {
                    return q.source;
                }
                return this.compile(q);
            });
            if (q.tag) r = r.concat(q.tag.slice().sort(sortRegExpSource));
            r = r.join("|");
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
            tokens[a] = true;
            tokens[b] = true;
        });
        this.stamps.forEach(s => {
            tokens[s] = true;
        });
        var scopes = this.scopes.map(a => a.join("")).join("");
        scopes = this.compile(scopes);
        var spaces = this.spaces.join("");
        tokens = Object.keys(tokens).join("");
        tokens = this.compile(tokens) + spaces;
        var express = `[^${tokens}]+`;
        this.express_reg = new RegExp(`^${express}$`, 'u');
        this.space_reg = new RegExp(`^[${spaces}]+$`, 'u');
        this.space_exp = new RegExp(`[${spaces}]+`, 'u');
        var quotes = this.createRegExp(quoteslike.map(q => q[0]), true).source;
        this.entry_reg = new RegExp([`[${spaces}]+|${quotes}|[${scopes}]|${this.number_reg.source.replace(/^\^|\$$/g, "")}[^${tokens}]*|${express}|[${stamps}]`], "giu");
    }
}
module.exports = Program;