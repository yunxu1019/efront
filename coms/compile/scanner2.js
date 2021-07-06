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

var saveTo = function (used, k, o) {
    if (!used[k]) used[k] = [];
    used[k].push(o);
};

var mergeTo = function (used, used0) {
    for (var k in used0) {
        var v = used0[k];
        for (var s of v) saveTo(used, k, s);
    }
};

var skipAssignment = function (o) {
    loop: while (o) switch (o.type) {
        case STAMP:
            switch (o.text) {
                case ",":
                case ";":
                    break loop;
                case "++":
                case "--":
                    o = o.next;
                    if (!o) break loop;
                    if (o.type !== STAMP) {
                        o = o.next;
                        break loop;
                    }
                    break;
                default:
                    o = o.next;
            }
            break;
        case SCOPED:
            if (o.entry === "{") break loop;
            o = o.next;
            break;
        case EXPRESS:
            if (/\.$/.test(o.text)) {
                o = o.next;
                break;
            }
        case VALUE:
        case QUOTED:
            o = o.next;
            if (!o) break loop;
            if (o.type === SCOPED && o.entry !== "{") break;
            if (o.type === EXPRESS) {
                if (/^\./.test(o.text)) break;
                break loop;
            }
            if (o.type === STRAP) {
                if (/^(in|instanceof|extends)$/i.test(o.text)) break;
                break loop;
            }
            if (o.type !== STAMP) break loop;

            break;
        case STRAP:
            if (!o.isExpress) break loop;
            if (o.text === "class") {
                o = o.next;
                while (o && !o.isClass) o = o.next;
                while (o && o.isClass) o = o.next;
                break;
            }
            if (o.text === "function") {
                o = o.next;
                if (o && o.type === EXPRESS) o = o.next;
                if (o) o = o.next;
                if (o) o = o.next;
                break;
            }
            o = o.next;
            break;
        default:
            o = o.next;
    }
    return o;
};
var getDeclared = function (o) {
    var declared = {}, used = {};
    loop: while (o) {
        switch (o.type) {
            case EXPRESS:
                declared[o.text] = true;
                saveTo(used, o.text, o);
                o = o.next;
                break;
            case SCOPED:
                var [d, u] = getDeclared(o.first);
                mergeTo(used, u);
                Object.assign(declared, d);
                o = o.next;
                break;
            case STAMP:
                if (o.text === "=") {
                    o = skipAssignment(o.next);
                    break;
                }
                if (o.text === ";") break loop;
                if (o.text !== ",") break loop;
                o = o.next;
                break;
            default:
                break loop;
        }
    }
    return [declared, used, o];
}

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
    toScoped() {
        var root = this;
        var used = {}; var vars = {}, lets = {};
        var run = function (o, index) {
            while (o) {
                var isFunction = false;
                var isScope = false;
                check: switch (o.type) {
                    case QUOTED:
                    case STAMP:
                        break;
                    case EXPRESS:
                        var u = o.text.split(".")[0];
                        if (!u || program.value_reg.test(u)) break;
                        if (o.next && o.next.type === STAMP && o.next.text === "=>") {
                            isScope = true;
                            isFunction = true;
                        }
                        else {
                            saveTo(used, u, o);
                        }
                        break;
                    case LABEL:
                        var name = o.text;
                        name = name.slice(0, name.length - 1);
                        vars[name] = true;
                        saveTo(used, name, o);
                        break;

                    case STRAP:
                        var s = o.text;
                        switch (s) {
                            case "var":
                            case "import":
                                var m = vars;
                            case "let":
                            case "const":
                                m = m || lets;
                                var [declared, used0, o0] = getDeclared(o.next);
                                o = o0;
                                mergeTo(used, used0);
                                Object.assign(m, declared);
                                break check;
                            case "function":
                                isFunction = true;
                            case "class":
                                if (!o.isExpress) {
                                    o = o.next;
                                    if (o.type === EXPRESS) {
                                        vars[o.text] = true;
                                        saveTo(used, o.text, o);
                                        o = o.next;
                                    }
                                }
                                isScope = true;
                                break;

                        }
                        break;
                    case SCOPED:
                        if (o.entry === "(") {
                            if (o.next && o.next.type === STAMP && o.next.text === "=>"
                                || o.prev && o.prev.type === PROPERTY) {
                                isFunction = true;
                                isScope = true;
                            }
                            else if (!o.isExpress) {
                                isScope = true;
                            }
                            else {
                                run(o.first);
                            }
                        }
                        else if (o.entry === "{") {
                            isScope = true;
                        }
                        else {
                            run(o.first);
                        }
                        break;
                }
                if (isScope) {
                    var u = used;
                    var l = lets;
                    var v = vars;
                    used = {};
                    lets = {};
                    vars = {};
                    if (o.next && o.next.type === STAMP && o.next.text === "=>");
                    else if (o.isExpress && o.type !== SCOPED) {
                        o = o.next;
                        if (o.type === EXPRESS) {
                            vars[o.text] = true;
                            saveTo(used, o.text, o);
                            o = o.next;
                        }
                    }
                    while (o.type !== SCOPED) {
                        if (o.next && o.next.type === STAMP && o.next.text === "=>") break;
                        o = run(o, 0);
                        o = o.next;
                    }
                    if (o.entry === "(") {
                        if (isFunction) {
                            var [declared, used0] = getDeclared(o.first);
                            mergeTo(used, used0);
                            Object.assign(vars, declared);
                        }
                        else {
                            run(o.first);
                        }
                        o = o.next;
                        if (o.type === STAMP && o.text === "=>") o = o.next;
                    }
                    else if (o.next && o.next.type === STAMP && o.next.text === "=>") {
                        vars[o.text] = true;
                        saveTo(used, o.text, o);
                        o = o.next.next;
                    }
                    if (!o) break;
                    if (o.type === SCOPED) {
                        run(o.first);
                    }
                    else {
                        do {
                            if (o.type === STAMP && o.text === ";") break;
                            o = run(o, 0);
                            var next = o.next;
                            if (!next) break;
                            if (o.type === STAMP && /^(\+\+|\-\-)$/.test(o.text) || ~[EXPRESS, VALUE, QUOTED, SCOPED].indexOf(o.type)) {
                                if (~[EXPRESS, VALUE, QUOTED, PROPERTY, LABEL].indexOf(next.type)) break;
                                if (next.type === SCOPED && next.entry === "{") break;
                            }
                            o = next;
                        } while (o);
                    }

                    if (isFunction) {
                        o.used = used;
                        Object.assign(vars, lets);
                        o.vars = vars;
                        var map = vars;
                    }
                    else {
                        Object.assign(v, vars);

                        o.lets = lets;
                        o.used = used;
                        var map = lets;
                    }

                    used = u;
                    lets = l;
                    vars = v;
                    for (var k in o.used) {
                        if (!(k in map)) {
                            for (var u of o.used[k]) {
                                saveTo(used, k, u);
                            }
                        }
                    }
                }
                if (index >= 0) break;
                if (o) o = o.next;
            }
            return o;
        };
        run(this.first);
        for (var k in lets) {
            used[k].declared = true;
        }
        for (var k in vars) {
            used[k].declared = true;
        }
        return used;
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
    transive = /^(new|void|in|of|typeof|delete|case|return|await|export|default|instanceof|throw|extends|from)$/
    straps = `if,in,do,as,of
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
            var last = queue.lastUncomment;
            if (scope.type !== COMMENT && scope.type !== SPACE) {
                if (last) {
                    scope.prev = last;
                    last.next = scope;
                }
                if (!queue.first) queue.first = scope;
                queue.lastUncomment = scope;
            }
            queue.push(scope);
        };
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
                case QUOTED:
                    if (isProperty()) type = PROPERTY;
                    break;
                case EXPRESS:
                    if (!/^\./.test(m) && isProperty()) type = PROPERTY;
                    else if (this.number_reg.test(m)) type = VALUE;
                    break;
                case STRAP:
                case VALUE:
                    if (last && last.type === EXPRESS && /\.$/.test(last.text)) {
                        type = EXPRESS;
                    }
                    else if (isProperty()) type = PROPERTY;
                    else if (m === "as") {
                        last.type = PROPERTY;
                    }
                    break;
                case STAMP:
                    if (last) switch (m) {
                        case ";":
                            queue.inExpress = false;
                            break;
                        case ":":
                            if (queue.inExpress) break;
                            if (last && last.type === EXPRESS) {
                                // label
                                last.type = LABEL;
                                last.text += ":";
                                last.end = end;
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
            if (type === STRAP && m === "class" && !queue.classed) {
                queue.classed = 1;
            }
            else if (queue.classed > 0) {
                if (type === STRAP && /^(class|function)$/.test(m)) queue.classed++;
            }
            var scope = {
                type,
                start,
                end,
                isExpress: queue.inExpress,
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
        var isProperty = function () {
            var prev = queue.lastUncomment;
            if (queue.isObject) {
                return !prev || prev.type === STAMP && prev.text === "," || prev.type === PROPERTY && /^(get|set)$/.test(prev.text);
            }
            if (queue.isClass) {
                return !prev || prev.type === EXPRESS && !/\.$/.test(prev.text) || ~[SCOPED, VALUE, QUOTED, PROPERTY].indexOf(prev.type) || prev.type === STAMP && /^(\+\+|\-\-|;)$/.test(prev.text);
            }
            return false;
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
                continue;
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
                var last = queue.lastUncomment;
                if (m === "{") {
                    if (last && queue.classed > 0) {
                        if (last.type !== STAMP || last.text !== "=>") {
                            queue.classed--;
                            scope.isClass = true;
                            scope.extend += last.text === "extends";
                            scope.inExpress = false;
                        }
                    }
                    else if (!queue.lastUncomment || ~[STAMP, STRAP].indexOf(queue.lastUncomment.type)) {
                        scope.inExpress = queue.inExpress;
                        if (queue.lastUncomment.text !== "=>") scope.isObject = scope.inExpress;
                    }
                    else {
                        scope.inExpress = false;
                    }
                }
                else {
                    scope.isExpress = queue.inExpress;
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