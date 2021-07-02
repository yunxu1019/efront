var [
    /*-1 */COMMENT,
    /* 0 */SPACE,
    /* 1 */STRAP,
    /* 2 */STAMP,
    /* 3 */VALUE,
    /* 4 */QUOTED,
    /* 5 */PIECE,
    /* 6 */EXPRESS,
    /* 7 */SCOPED,
    /* 8 */LABEL,
    /* 9 */PROPERTY,
] = new Array(20).fill(0).map((_, a) => a - 1);

class Program extends Array {
    COMMENT = COMMENT
    SPACE = SPACE
    STAMP = STRAP
    STAMP = STAMP
    VALUE = VALUE
    QUOTED = QUOTED
    PIECE = PIECE
    EXPRESS = EXPRESS
    SCOPED = SCOPED
    LABEL = LABEL
    PROPERTY = PROPERTY
    toString() {
        var lasttype;
        var result = [];
        var run = function (o, i, a) {
            switch (o.type) {
                case QUOTED:
                    if (!o.length) {
                        result.push(o.text);
                        break;
                    }
                case SCOPED:
                    if (o.entry !== "[" && (lasttype === STRAP || lasttype === SCOPED)) result.push(" ");
                    result.push(o.entry);
                    if (o.entry === "{" && result[0] && result[0].type !== SPACE) {
                        result.push(" ");
                    }
                    lasttype = undefined;
                    o.forEach(run);
                    if (o.leave === "}" && o.length > 0 && o[o.length - 1].type !== SPACE) {
                        result.push(" ");
                    }
                    result.push(o.leave);
                    break;
                default:
                    if ([STRAP, EXPRESS, VALUE].indexOf(lasttype) >= 0 && [STRAP, EXPRESS, VALUE].indexOf(o.type) >= 0) result.push(" ");
                    if (o instanceof Object) {
                        if (o.type === STAMP && !/^([,;]|\+\+|\-\-)$/.test(o.text)) {
                            result.push(" ");
                        }
                        else if (lasttype === SCOPED && o.type !== SPACE && o.type !== COMMENT && o.type !== STAMP) {
                            if (o.type !== EXPRESS || !/^\./.test(o.text)) result.push(" ");
                        }
                        result.push(o.text);
                        if (o.type === STAMP && i + 1 < a.length && !/^(\+\+|\-\-)$/.test(o.text)) result.push(" ");
                    }
                    else {
                        result.push(o);
                    }
            }
            lasttype = o.type;
        };
        this.forEach(run);
        return result.join("");
    }

}
class Javascript {
    quotes = [
        [/'/, /'/, /\\[\s\S]/],
        [/"/, /"/, /\\[\s\S]/],
        ["/", /\/[imgyu]*/, /\\[\s\S]|\[(\\[\s\S]|[^\]])+\]/],
        ["`", "`", /\\[\s\S]/, ["${", "}"]],
    ]
    comments = [
        ["//", /(?=[\r\n\u2028\u2029])/],
        ["/*", "*/"],
    ]
    scopes = [
        ["(", ")"],
        ["[", "]"],
        ["{", "}"],
    ]
    stamps = "/=+;|:?<>-!~@#%^&*,".split("")
    value_reg = /^(false|true|null|Infinity|NaN|undefined|arguments|this)$/
    number_reg = /^[\+\-]?(\d+\.?|\d*\.\d+)(e[\+\-]?\d+|[\w]+)?$/i;
    transive = /^(new|void|in|typeof|delete|case|return|await|export|default|instanceof|throw|extends|from)$/
    straps = `if,in,do
    var,for,new,try,let
    else,case,void,with,enum,from
    async,while,break,catch,throw,const,yield,class,await
    return,typeof,delete,switch,export,import
    default,finally,extends
    function,continue,debugger
    instanceof`.trim().split(/[\r\n,\s]+/)
    spaces = ["\\u00a0", " ", "\\t", "\\v", "\\b", "\\r", "\\n", "\\u2028", "\\u2029", "\\u3000"]
    nocase = false
    lastIndex = 0
    compile(s) {
        return s.replace(/\\[\s\S]|[\[\]\(\)\{\}\+\-\*\?\:\$\^\!\|\>\<\\\/]/g, function (m) {
            if (m.length > 1) {
                return m;
            }
            return "\\" + m;
        });
    }
    createRegExp(source, g) {
        source = source.map(s => s instanceof RegExp ? s.source : this.compile(s));
        var flag = this.nocase ? "i" : "";
        var s = source.join("|");
        if (g) return new RegExp(`${s}`, "g" + flag);
        if (source.length > 1) return new RegExp(`^(${s})$`, flag);
        return new RegExp(`^${s}$`, flag);
    }

    exec(text) {
        if (!this.entry_reg) this.commit();
        var index = this.lastIndex;
        var parents = [];
        var lasttype;
        var queue = new Program;
        var queue_push = function (scope) {
            if (scope.type !== COMMENT && scope.type !== SPACE) queue.lastUncomment = scope;
            queue.push(scope);
        }
        var save = (type) => {
            if (lasttype === STAMP && type === STAMP && !/[,;\:\?]/.test(m)) {
                var scope = queue[queue.length - 1];
                scope.end = end;
                scope.text = text.slice(scope.start, scope.end);
                queue.inExpress = true;
                return;
            }
            var last = queue.lastUncomment;
            switch (type) {
                case EXPRESS:
                    if (this.number_reg.test(m)) type = VALUE;
                    break;
                case STRAP:
                case VALUE:
                    if (last && last.type === EXPRESS && /\.$/.test(last.text)) {
                        type = EXPRESS;
                    }
                    break;
                case STAMP:
                    var parent = parents[parents.length - 1];
                    if (last) switch (m) {
                        case ";":
                            queue.inExpress = false;
                            break;
                        case ":":
                            if (parent && queue.entry === "{" && queue.inExpress) {
                                // property
                                last.type = PROPERTY;
                                queue.inExpress = true;
                                break;
                            }
                            else if (queue.inExpress) {
                                queue.inExpress = true;
                                break;
                            }
                            else if (last && last.type === EXPRESS) {
                                // label
                                last.type = LABEL;
                                last.text += ":";
                                last.end = end;
                                queue.inExpress = false;
                                return;
                            }
                        default:
                            queue.inExpress = true;
                    }
                    else {
                        queue.inExpress = true;
                    }
                    break;
            }
            var scope = {
                type,
                start,
                end,
                text: m
            }
            lasttype = type;
            queue_push(scope);
        };
        var push_quote = function () {
            var scope = [];
            scope.entry = m;
            scope.type = SCOPED;
            scope.inExpress = true;
            scope.start = match.index;
            scope.leave_map = quote.leave;
            start = queue.start + m1.length;
            end = match.index;
            m = text.slice(start, end);
            save(PIECE);
            queue.entry = m1;
            queue_push(scope);
            parents.push(queue);
            lasttype = scope.type;
            queue = scope;
        };

        loop: while (index < text.length) {
            if (queue.type === QUOTED) {
                var quote = this.quote_map[queue.entry];
                while (index < text.length) {
                    var reg = quote.reg;
                    start = reg.lastIndex = index;
                    var match = reg.exec(text);
                    if (!match) {
                        index = text.length;
                        break;
                    }
                    var m = match[0];
                    index = match.index + m.length;
                    if (quote.end.test(m)) {
                        end = match.index;
                        queue.leave = m;
                        m = text.slice(start, end);
                        save(PIECE);
                        break;
                    }
                    if (m in quote.entry) {
                        push_quote();
                        continue loop;
                    }
                }
                queue.end = match.index;
                queue = parents.pop();
                lasttype = queue.type;
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
                var last = queue.lastUncomment;
                if (this.stamp_reg.test(m) && last) {
                    if ([VALUE, EXPRESS, QUOTED].indexOf(last.type) >= 0) break test;
                    if (last.type === SCOPED && queue.inExpress) break test;
                }
                var scope = [];
                var quote = this.quote_map[m];
                scope.type = this.comment_entry.test(m) ? COMMENT : QUOTED;
                scope.start = start;
                queue_push(scope);
                parents.push(queue);
                queue = scope;
                lasttype = scope.type;
                while (index < text.length) {
                    var reg = quote.reg;
                    reg.lastIndex = index;
                    var match = reg.exec(text);
                    if (!match) {
                        index = text.length;
                        break;
                    }
                    var m1 = m;
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
                        push_quote();
                        continue loop;
                    }
                }
                queue.inExpress = true;
                queue.end = index;
                queue.text = text.slice(queue.start, index);
                queue = parents.pop();
                lasttype = queue.type;
            }
            var parent = parents[parents.length - 1];
            if (parent && this.quote_map[parent.entry] && queue.leave_map[m] === queue.entry) {
                delete queue.leave_map;
                queue.end = end;
                queue.leave = m;
                queue = parents.pop();
                lasttype = queue.type;
                continue;
            }
            if (this.space_reg.test(m)) {
                if (/[\r\n\u2028\u2029]/.test(m)) {
                    m = m.replace(/^[^\r\n\u2028\u2029]+/, '').replace(/\r\n|\r|\n/g, "\r\n");
                    save(SPACE);
                }
                lasttype = SPACE;
                continue;
            }
            if (this.strap_reg.test(m)) {
                save(STRAP);
                queue.inExpress = this.transive.test(m);
                continue;
            }
            if (this.value_reg.test(m)) {
                save(VALUE);
                queue.inExpress = true;
                continue;
            }
            if (this.express_reg.test(m)) {
                save(EXPRESS);
                continue;
            }

            if (this.scope_entry[m]) {
                var scope = [];
                scope.entry = m;
                scope.type = SCOPED;
                if (m === "{") {
                    if (!queue.lastUncomment || ~[STAMP, STRAP].indexOf(queue.lastUncomment.type)) {
                        scope.inExpress = queue.inExpress;
                    }
                    else {
                        scope.inExpress = false;
                    }
                } else {
                    scope.inExpress = true;
                }

                queue_push(scope);
                parents.push(queue);
                queue = scope;
                scope.start = match.index;
                lasttype = scope.type;
                continue;
            }
            if (this.scope_leave[m] && queue.entry === this.scope_leave[m]) {
                queue.end = end;
                queue.leave = m;
                queue = parents.pop();
                lasttype = queue.type;
                continue;
            }

            if (this.stamp_reg.test(m)) {
                save(STAMP);
            }

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
        var quoteslike = this.comments.concat(this.quotes);
        quoteslike.forEach(q => {
            var a = q[0];
            if (a instanceof RegExp) a = a.source;
            if (a.length === 1) tokens[a] = true;
            var r = q.slice(2).concat(q[1]).map(q => {
                if (q instanceof Array) {
                    return this.compile(q[0]);
                }
                if (q instanceof RegExp) {
                    return q.source;
                }
                return this.compile(q);
            }).join("|");
            q.reg = new RegExp(r, 'g');
            q.end = this.createRegExp([q[1]]);
            if (q.length >= 4) {
                var map = q.entry = {};
                var end = q.leave = {};
                q.slice(3).forEach(k => {
                    var [a, b] = k;
                    map[a] = b;
                    end[b] = a;
                    tokens[b] = true;
                    tokens[a] = true;
                });
            }
            quote_map[a] = q;
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
        this.spaces.forEach(s => {
            tokens[s] = true;
        });
        var keys = Object.keys(tokens).join("");
        keys = this.compile(keys);
        var express = `[^${keys}]+`;
        this.express_reg = new RegExp(`^${express}$`);
        var scopes = this.scopes.map(a => a.join("")).join("");
        scopes = this.compile(scopes);
        var spaces = this.spaces.join("");
        spaces = this.compile(spaces);
        this.space_reg = new RegExp(`^[${spaces}]+$`);
        var quotes = this.createRegExp(quoteslike.map(q => q[0]), true).source;
        this.entry_reg = new RegExp([`[${spaces}]+|${quotes}|[${scopes}]|${express}|[${stamps}]`], "g");
    }


}

var program = new Javascript;
function javascript(text, lastIndex = 0) {
    program.lastIndex = lastIndex;
    return program.exec(text);
}

function scan(text) {
    var res = javascript(text, 0);
    return res;
}


module.exports = scan;