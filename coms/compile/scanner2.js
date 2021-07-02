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
    toString() {
        var lasttype;
        var result = [];
        var run = function (o) {
            switch (o.type) {
                case QUOTED:
                    if (!o.length) {
                        result.push(o.text);
                        break;
                    }
                case SCOPED:
                    result.push(o.entry);
                    o.forEach(run);
                    result.push(o.leave);
                    break;
                default:
                    if ([STRAP, EXPRESS, VALUE].indexOf(lasttype) >= 0 && [STRAP, EXPRESS, VALUE].indexOf(o.type) >= 0) result.push(" ");
                    if (o instanceof Object) {
                        result.push(o.text);
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
    transive = /^(new|void|in|typeof|delete|case|return|await|export|default|instanceof|throw|extends)$/
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
        var save = function (type) {
            if (lasttype === STAMP && type === STAMP) {
                scope.end = end;
                scope.text = text.slice(scope.start, scope.end);
            }
            else {
                lasttype = type;
                queue.push({
                    type,
                    start,
                    end,
                    text: m
                });
            }
        };
        var get4uncomment = function (list) {
            var dist = [];
            for (var cx = list.length - 1; cx >= 0; cx--) {
                var u = list[cx];
                if (u.type === COMMENT || u.type === SPACE) continue;
                dist.unshift(u);
                if (dist.length >= 4) break;
            }
            return dist;
        };
        loop: while (index < text.length) {
            var reg = this.entry_reg;
            var start = reg.lastIndex = index;
            var match = reg.exec(text);
            if (!match) return null;
            var end = match[0].length + match.index;
            this.lastIndex = index = end;
            var m = match[0];
            var parent = parents[parents.length - 1];
            if (parent && this.quote_map[parent.entry] && queue.leave_map[m] === queue.entry) {
                delete queue.leave_map;
                queue.end = end;
                queue.leave = m;
                queue = parents.pop();
                continue;
            }
            test: if (this.quote_map.hasOwnProperty(m) || queue.type === QUOTED) {
                let list = get4uncomment(queue);
                if (queue.type !== QUOTED && this.stamp_reg.test(m) && list.length > 0) {
                    let last = list[list.length - 1];
                    if (last.type === VALUE || last.type === EXPRESS || last.type === QUOTED) break test;
                    let prev = list[list.length - 2];
                    if (last.type === SCOPED) switch (last.entry) {
                        case "[":
                            break;
                        case "{":
                            if (list.length < 2) {
                                if (!parents.length) break;
                                let parent = parents[parents.length - 1];
                                if (parent.entry === "(" || parent.entry === "[") break test;
                                break;
                            }
                            if (prev.type === STAMP) break test;
                            if (prev.type === STRAP) {
                                if (this.transive.test(prev.text)) break test;
                                break;
                            }
                            var prev2 = queue[queue.length - 2];
                            if (prev2.type === STAMP && prev2.text !== ";") {
                                break;
                            }
                            break;
                        case "(":
                            if (list.length < 2) break test;
                            if (prev.type === STRAP) {
                                if (/^(if|for|with|switch|while|catch)$/.test(prev.text)) break;
                            }
                            break test;
                    }
                }
                if (queue.type === QUOTED) {
                    var quote = this.quote_map[queue.entry];
                    var scope = {};
                    scope.type = PIECE;
                } else {
                    var scope = [];
                    var quote = this.quote_map[m];
                    scope.type = this.comment_entry.test(m) ? COMMENT : QUOTED;
                }
                scope.start = start;
                var reg = quote.reg;
                queue.push(scope);
                parents.push(queue);
                queue = scope;
                while (index < text.length) {
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
                    if (quote.length >= 4) {
                        var scope = [];
                        scope.entry = m;
                        scope.type = SCOPED;
                        scope.start = match.index;
                        scope.leave_map = quote.leave;
                        start = queue.start + queue.entry.length;
                        end = match.index;
                        m = text.slice(start, end);
                        save(PIECE);
                        queue.entry = m1;
                        queue.push(scope);
                        parents.push(queue);
                        queue = scope;
                        continue loop;
                    }
                }
                if (queue.type === PIECE) {
                    queue.text = text.slice(queue.start, match.index);
                    queue.end = match.index;
                    queue = parents.pop();
                    queue.leave = m;
                } else {
                    queue.end = index;
                    queue.text = text.slice(queue.start, index);
                }
                queue = parents.pop();
                continue;
            }
            if (this.space_reg.test(m)) {
                if (/^[\r\n\u2028\u2029]/.test(m)) {
                    m = m.replace(/\r\n|\r|\n/g, "\r\n");
                    save(SPACE);
                }
                lasttype = SPACE;
                continue;
            }
            if (this.strap_reg.test(m)) {
                save(STRAP);
                continue;
            }
            if (this.value_reg.test(m)) {
                save(VALUE);
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
                queue.push(scope);
                parents.push(queue);
                queue = scope;
                scope.start = match.index;
                continue;
            }
            if (this.scope_leave[m] && queue.entry === this.scope_leave[m]) {
                queue.end = end;
                queue.leave = m;
                queue = parents.pop();
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