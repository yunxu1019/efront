var createNamelist = require("./namelist");

const [
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
    if (!(used[k] instanceof Array)) used[k] = [];
    used[k].push(o);
};

var mergeTo = function (used, used0) {
    for (var k in used0) {
        var v = used0[k];
        for (var s of v) saveTo(used, k, s);
    }
};
var skipAssignment = function (o) {
    var needpunc = false;
    var o0 = o;
    loop: while (o) switch (o.type) {
        case STAMP:
            switch (o.text) {
                case ",":
                case ";":
                    break loop;
                case "++":
                case "--":
                    o = o.next;
                    break;
                case "!":
                case "~":
                case "+":
                case "-":
                    o = o.next;
                    needpunc = false;
                    break;
                default:
                    if (/^[!~\+\-]+$/.test(o.text)) {
                        needpunc = false;
                        o = o.next;
                        break;
                    }
                    if (!needpunc) break loop;
                    needpunc = false;
                    o = o.next;
            }
            break;
        case SCOPED:
            if (needpunc && o.entry === "{") break loop;
            o = o.next;
            needpunc = true;
            break;
        case EXPRESS:
            if (/^\.|\.$/.test(o.text)) {
                o = o.next;
                break;
            }
        case VALUE:
        case QUOTED:
            if (needpunc) break loop;
            needpunc = true;
            o = o.next;
            break;
        case STRAP:
            if (needpunc) {
                if (!/^(in|instanceof)$/.test(o.text)) break loop;
                o = o.next;
                needpunc = false;
            }
            else if (o.text === "class") {
                o = o.next;
                while (o && !o.isClass) o = o.next;
                while (o && o.isClass) o = o.next;
                needpunc = true;
                break;
            }
            else if (o.text === "function") {
                o = o.next;
                if (o && o.type === EXPRESS) o = o.next;
                if (o) o = o.next;
                if (o) o = o.next;
                needpunc = true;
                break;
            }
            else {
                o = o.next;
                needpunc = false;
            }
            break;
        default:
            throw new Error('代码结构异常！');
            o = o.next;
    }
    if (o === o0) throw new Error("代码结构异常！");
    return o;
};

var needBreak = function (prev, next) {
    if (!prev || !next) return;
    if (prev.type === STAMP && /^[,;]$/.test(prev.text)) return;
    if (next.type === STAMP && /^[,;]$/.test(next.text)) return;
    if (prev.type === EXPRESS && /\.$/.test(prev.text)) return;
    if (next.type === EXPRESS && /^\./.test(next.text)) return;
    if (next.type === PROPERTY) return ";";
    if (
        [EXPRESS, VALUE, QUOTED].indexOf(prev.type) >= 0
        || prev.type === STAMP && /^(\+\+|\-\-)$/.test(prev.text)
        || prev.type === SCOPED && (prev.isExpress || prev.isObject)
    ) {
        if ([EXPRESS, VALUE, QUOTED, LABEL].indexOf(next.type) >= 0) return ";";
        if (next.type === STRAP) {
            if (!/^(in|of|extends|instanceof|as)$/.test(next.text)) return ";";
            return " ";
        }
        if (next.type === SCOPED) {
            if (!next.isExpress) return ";";
        }
        return;
    }
    if (prev.type === STRAP) {
        if ([STRAP, EXPRESS, VALUE, QUOTED].indexOf(next.type) >= 0) return " ";
        if (next.type === LABEL) return ";";
    }
};

var getDeclared = function (o, kind) {

    var declared = Object.create(null), used = Object.create(null); var skiped = [];
    loop: while (o) {
        while (o && o.type === STAMP && o.text === ',') o = o.next;
        if (!o) break;
        if (o.isprop) {
            if (o.next && o.next.type === STAMP && o.next.text === ":") {
                o = o.next;
                o = o.next;
            }
        }
        switch (o.type) {
            case STRAP:
            case PROPERTY:
            case EXPRESS:
                declared[o.text] = true;
                o.kind = kind;
                saveTo(used, o.text, o);
                o = o.next;
                break;
            case SCOPED:
                var [d, u, _, s] = getDeclared(o.first, kind);
                while (s.length) skiped.push.apply(skiped, s.splice(0, 1024));
                mergeTo(used, u);
                Object.assign(declared, d);
                o = o.next;
                break;

            default:
                console.log(o);
                throw new Error("代码结构异常");
        }
        if (!o) break;
        switch (o.type) {
            case STRAP:
                if (/^(in|of)$/.test(o.text)) {
                    o = o.next;
                    var o0 = skipAssignment(o);
                    do {
                        skiped.push(o);
                        o = o.next;
                    } while (o !== o0);
                    o = o0;
                    break;
                }
                break loop;
            case STAMP:
                if (o.text === "=") {
                    o = o.next;
                    var o0 = skipAssignment(o);
                    do {
                        skiped.push(o);
                        o = o.next;
                    } while (o !== o0);
                    o = o0;
                    break;
                }
                break;
        }
        if (!o) break;
        if (o.type !== STAMP) break;
        if (o.text !== ',') break;
    }
    return [declared, used, o, skiped];
}

var compress = function (scoped, maped) {
    var { lets, vars, used } = scoped;
    var map = lets || vars;
    var __prevent = Object.create(null);
    maped = Object.create(maped || null);
    for (var k in used) {
        if (!(k in map)) {
            if (k in maped) {
                k = maped[k];
            }
            else {
                maped[k] = true;
            }
            __prevent[k] = true;
        }
    }
    var keys = Object.keys(map);
    keys.sort((a, b) => used[b].length - used[a].length);
    if (keys.length) {
        var names = createNamelist(keys.length, __prevent);
        for (var cx = 0, dx = keys.length; cx < dx; cx++) {
            var k = keys[cx];
            var name = names[cx];
            var list = used[k];
            if (list) for (var u of list) {
                if (!u) continue;
                u.text = name + u.text.replace(/^[^\.\:]+/i, "");
            }
        }
    }
    if (scoped.length) {
        for (var cx = 0, dx = keys.length; cx < dx; cx++) {
            var k = keys[cx];
            maped[k] = names[cx];
        }
        scoped.forEach(s => compress(s, maped));
    }
};

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
    pressed = false
    toString() {
        var lasttype;
        var result = [];
        var run = (o, i, a) => {
            switch (o.type) {
                case COMMENT:
                    // 每一次要远行，我都不得不对自己的物品去粗取精。取舍之间，什么重要，什么不是那么重要，都有了一道明显的分界线。
                    result.push(o.text);
                    if (this.pressed && /^\/\//.test(o.text)) {
                        result.push("\r\n");
                    }
                    break;
                case SPACE:
                    if (!this.pressed) {
                        result.push(o.text);
                        break;
                    }
                    if (!o.prev || !o.next) break;
                    var b = needBreak(o.prev, o.next);
                    if (b) result.push(b);
                    break;
                case QUOTED:
                    if (!o.length) {
                        result.push(o.text);
                        break;
                    }
                case SCOPED:
                    if (!this.pressed && o.entry !== "[" && (lasttype === STRAP || lasttype === SCOPED) && o.type !== QUOTED) result.push(" ");
                    result.push(o.entry);
                    if (o.entry === "{" && result[0] && result[0].type !== SPACE) {
                        if (!this.pressed) result.push(" ");
                    }
                    lasttype = undefined;
                    o.forEach(run);
                    if (o.leave === "}" && (!o.next || o.next.type !== PIECE) && o.length > 0 && o[o.length - 1].type !== SPACE) {
                        result.push(" ");
                    }
                    result.push(o.leave);
                    break;
                default:
                    if ([STRAP, EXPRESS, VALUE].indexOf(lasttype) >= 0 && [STRAP, EXPRESS, VALUE].indexOf(o.type) >= 0) result.push(" ");
                    if (o instanceof Object) {
                        // var broker = needBreak(o.prev, o);
                        // if (broker) result.push(broker);
                        if (o.prev && o.type === STAMP && !/^([,;])$/.test(o.text) && result[result.length - 1] !== " ") {
                            if (lasttype === STAMP) {
                                result.push(" ");
                            }
                            else if (/^(\+\+|\-\-)$/.test(o.prev.text) && o.prev.prev) {
                                var prev_prev = o.prev.prev;
                                if (
                                    prev_prev.type === STRAP && !prev_prev.isExpress
                                    || prev_prev.type === EXPRESS
                                    || prev_prev.type === VALUE
                                ) result.push(";");
                            }
                            else if (o.text !== ":" || o.prev.type !== STRAP && o.prev.prev && o.prev.prev.type !== STRAP) {
                                if (!this.pressed) result.push(" ");
                            }
                        }
                        else if (lasttype === SCOPED && !~[SPACE, COMMENT, STAMP, PIECE].indexOf(o.type)) {
                            if (!this.pressed) if (o.type !== EXPRESS || !/^\./.test(o.text)) result.push(" ");
                        }
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
    toScoped() {
        var used = Object.create(null); var vars = Object.create(null), lets = vars; var scoped = [];
        var run = function (o, id) {
            loop: while (o) {
                var isCatch = false;
                var isFunction = false;
                var isScope = false;
                switch (o.type) {
                    case QUOTED:
                        if (o.length) {
                            run(o.first);
                        }
                        break;
                    case STAMP:
                        break;
                    case PROPERTY:
                        if (o.next) {
                            if (o.next.type !== STAMP || o.next.text !== ",") break;
                        }
                    case EXPRESS:

                        if (o.prev && o.prev.type === EXPRESS) {
                            if (/\.$/.test(o.prev.text)) break;
                        }
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
                        o.kind = "label";
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
                                var [declared, used0, o0, skiped] = getDeclared(o.next, s);
                                while (skiped.length) {
                                    var o1 = run(skiped[0], 0);
                                    let sindex = skiped.indexOf(o1);
                                    if (sindex < 0) break;
                                    skiped.splice(0, sindex + 1);
                                }
                                o = o0;
                                mergeTo(used, used0);
                                Object.assign(m, declared);
                                continue loop;
                            case "function":
                                isFunction = true;
                            case "catch":
                                isCatch = true;
                            case "class":
                                if (!o.isExpress) {
                                    o = o.next;

                                    if (o.type === EXPRESS) {
                                        vars[o.text] = true;
                                        o.kind = isFunction ? 'function' : 'class';
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
                                || o.prev && (o.prev.type === PROPERTY || o.prev.isprop)) {
                                isFunction = true;
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
                    var _used = used;
                    var _lets = lets;
                    var _vars = vars;
                    var _scoped = scoped;
                    used = Object.create(null);
                    lets = Object.create(null);
                    vars = Object.create(null);
                    scoped = [];
                    _scoped.push(scoped);
                    var isExpress = o.isExpress;

                    if (isFunction) {
                        scoped.used = used;
                        scoped.vars = vars;
                        lets = vars;
                    } else {
                        vars = _vars;
                        scoped.lets = lets;
                        scoped.used = used;
                    }
                    if (o.next && o.next.type === STAMP && o.next.text === "=>");
                    else if (o.isExpress && o.type !== SCOPED) {
                        o = o.next;
                        if (o.type === EXPRESS) {
                            vars[o.text] = true;
                            o.kind = isFunction ? 'function' : 'class';
                            saveTo(used, o.text, o);
                            o = o.next;
                        }
                    }
                    while (o.type !== SCOPED) {
                        if (o.next && o.next.type === STAMP && o.next.text === "=>") break;
                        o = run(o, 0);
                        o = o.next;
                        if (!o) break loop;
                    }

                    if (o.entry === "(") {
                        o.isExpress = isExpress;
                        if (isFunction || isCatch) {
                            var [declared, used0, o0, skiped] = getDeclared(o.first, 'argument');
                            mergeTo(used, used0);
                            while (skiped.length) {
                                var o1 = run(skiped[0], 0);
                                var sindex = skiped.indexOf(o1);
                                if (sindex < 0) break;
                                skiped.splice(0, sindex + 1);
                            }
                            Object.assign(vars, declared);
                        }
                        else {
                            run(o.first);
                        }
                        o = o.next;
                        if (!o) break;
                        if (o.type === STAMP && o.text === "=>") o = o.next;
                    }
                    else if (o.next && o.next.type === STAMP && o.next.text === "=>") {
                        vars[o.text] = true;
                        o.kind = 'argument';
                        saveTo(used, o.text, o);
                        o = o.next.next;
                    }
                    if (!o) break;
                    if (o.type === SCOPED && o.entry === "{") {
                        o.isExpress = isExpress;
                        run(o.first);
                    }
                    else {
                        do {
                            if (o.type === STAMP && o.text === ";") break;
                            o = run(o, 0);
                            var next = o.next;
                            if (!next) break;
                            var e = o;
                            if (o.type === STAMP && /^(\+\+|\-\-)$/.test(o.text) || ~[VALUE, QUOTED, SCOPED].indexOf(o.type) || EXPRESS === o.type && !/\.$/.test(o.text)) {
                                if (~[VALUE, QUOTED, PROPERTY, LABEL].indexOf(next.type)) break;
                                if (EXPRESS === next.type && !/^\./.test(next.text)) break;
                                if (next.type === SCOPED && next.entry === "{") break;
                            }
                            o = next;
                        } while (o);
                    }
                    var map = isFunction ? vars : lets;
                    for (var k in used) {
                        if (!(k in map)) {
                            for (var u of used[k]) {
                                saveTo(_used, k, u);
                            }
                        }
                    }
                    used = _used;
                    lets = _lets;
                    vars = _vars;
                    scoped = _scoped;
                }
                if (id >= 0) break;
                if (o) o = o.next;
            }
            return o;
        };
        run(this.first);
        scoped.used = used;
        scoped.vars = vars;
        return scoped;
    }
    getUndecleared() {
        var { vars, lets, used } = this.toScoped();
        var globals = Object.create(null);
        for (var u in used) {
            if (!(u in vars)) {
                globals[u] = true;
            }
        }
        return globals;
    }
    press() {
        this.pressed = true;
        var scoped = this.toScoped();
        compress(scoped);
        return this;
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
    number_reg = /^[\+\-]?(0x[0-9a-f]+|0b\d+|0o\d+|(\d*\.\d+|\d+\.?)(e[\+\-]?\d+|[mn])?)$/i;
    transive = /^(new|void|in|of|typeof|delete|case|return|await|export|default|instanceof|throw|extends|import|from)$/
    straps = `if,in,do,as,of
    var,for,new,try,let
    else,case,void,with,enum,from
    async,while,break,catch,throw,const,yield,class,await
    return,typeof,delete,switch,export,import,static
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
        var queue = new Program();
        queue.__proto__ = Program.prototype;
        var origin = queue;
        var queue_push = function (scope) {
            if (~[VALUE, QUOTED, SCOPED, EXPRESS, PROPERTY].indexOf(scope.type)) {
                scope.isprop = isProperty();
            }
            var last = queue.lastUncomment;
            if (scope.type !== COMMENT && scope.type !== SPACE) {
                if (last) {
                    scope.prev = last;
                    last.next = scope;
                }
                if (!queue.first) queue.first = scope;
                queue.lastUncomment = scope;
                for (var cx = queue.length - 1; cx >= 0; cx--) {
                    var q = queue[cx];
                    if (q === last) break;
                    q.next = scope;
                }
            }
            else {
                scope.prev = last;
            }
            queue.push(scope);
        };
        var save = (type) => {
            if (lasttype === STAMP && type === STAMP && !/[,;\:\?]/.test(m)) {
                var scope = queue[queue.length - 1];
                if (/=>$/i.test(scope.text) || /=$/.test(scope.text) && /[^>=]/.test(m)) {
                } else {
                    scope.end = end;
                    scope.text = text.slice(scope.start, scope.end);
                    queue.inExpress = true;
                    return;
                }
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
                        if (!last || last.type === STAMP) {
                            type = EXPRESS;
                            break;
                        }
                        if (~[EXPRESS, VALUE].indexOf(last.type)) last.type = PROPERTY;
                    }
                    break;
                case STAMP:
                    if (m === ";") queue.inExpress = false;
                    else if (last) check: switch (m) {
                        case "?":
                            queue.inExpress = true;
                            if (!queue.question) queue.question = 1;
                            else queue.question++;
                            break;
                        case ",":
                            if (queue.isObject) {
                                if (last.type === PROPERTY) {
                                    var _m = m;
                                    var _end = end;
                                    end = start;
                                    m = ":";
                                    save(STAMP);
                                    m = last.text;
                                    save(EXPRESS);
                                    m = _m;
                                    end = _end;
                                }
                            }
                            break;
                        case ":":
                            if (queue.question) {
                                queue.question--;
                                queue.inExpress = true;
                                break;
                            }
                            if (queue.isObject) {
                                if (last.type === PROPERTY) {
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
                                if (temp.type === STRAP && /^(case|default)$/.test(temp.text)) {
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
            scope.leave_map = quote.leave;
            end = match.index;
            m = text.slice(start, end);
            save(PIECE);
            queue_push(scope);
            parents.push(queue);
            lasttype = scope.type;
            queue = scope;
        };
        var isProperty = function () {
            var prev = queue.lastUncomment;
            if (queue.isObject) {
                return !prev || prev.type === STAMP && prev.text === "," || prev.type === PROPERTY && /^(get|set|async)$/.test(prev.text);
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
                var m0 = m;
                while (index < text.length) {
                    var reg = quote.reg;
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
            if (this.value_reg.test(m) || this.number_reg.test(m)) {
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
                    else if (!queue.lastUncomment) {
                        scope.isObject = queue.inExpress;
                        scope.inExpress = queue.inExpress;
                    }
                    else if (~[STAMP, STRAP].indexOf(queue.lastUncomment.type)) {
                        scope.inExpress = queue.inExpress;
                        if (queue.lastUncomment && !/try|do|=>|;|else|catch/i.test(queue.lastUncomment.text)) scope.isObject = true;
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
                var lastUncomment = queue.lastUncomment;
                if (lastUncomment) {
                    if (lastUncomment.type === PROPERTY) {
                        var _start = start;
                        var _m = m;
                        start = end;
                        m = ":";
                        save(STAMP);
                        m = lastUncomment.text;
                        save(EXPRESS);
                        m = _m;
                        start = _start;
                    }
                }

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
                    // tokens[b] = true;
                    // tokens[a] = true;
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
        this.entry_reg = new RegExp([`[${spaces}]+|${quotes}|[${scopes}]|${this.number_reg.source.replace(/^\^|\$$/g, "")}|${express}|[${stamps}]`], "gi");
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