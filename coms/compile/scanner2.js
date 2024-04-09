"use strict";
var createNamelist = require("./namelist");
var Html = require("./Html");
var Javascript = require("./Javascript");
const {
    /*    1 */COMMENT,
    /*    2 */SPACE,
    /*    4 */STRAP,
    /*    8 */STAMP,
    /*   16 */VALUE,
    /*   32 */QUOTED,
    /*   64 */PIECE,
    /*  128 */EXPRESS,
    /*  256 */SCOPED,
    /*  512 */LABEL,
    /* 1024 */PROPERTY,
    /* 2048 */ELEMENT,
    skipSentenceQueue,
    rename,
    relink,
    setqueue
} = require("./common");


var compress = function (scoped, maped = Object.create(null)) {
    var { lets, vars, used } = scoped;
    var map = lets || vars;
    var __prevent = Object.create(null);
    for (var k in used) {
        if (!(k in map)) {
            if (k in maped) {
                k = maped[k];
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
            rename(used, k, name);
        }
    }
    if (scoped.length) {
        maped = Object.create(maped);
        for (var cx = 0, dx = keys.length; cx < dx; cx++) {
            var k = keys[cx];
            maped[k] = names[cx];
        }
        scoped.forEach(s => compress(s, maped));
    }
};

class Code extends Array {
    COMMENT = COMMENT
    SPACE = SPACE
    STRAP = STRAP
    STAMP = STAMP
    VALUE = VALUE
    QUOTED = QUOTED
    PIECE = PIECE
    EXPRESS = EXPRESS
    SCOPED = SCOPED
    LABEL = LABEL
    PROPERTY = PROPERTY
    ELEMENT = ELEMENT
    pressed = false
    _scoped = null;
    helpcode = false;
    keepspace = true;
    /**
     * @type {Program}
     */
    program = null;
    isExpressQueue() {
        if (!this.first) return false;
        var first = this.first;
        if (first.type === SCOPED) {
            if (first.entry === '{') return false;
        }
        else if (first.type === STRAP) {
            if (!this.program.strapexp_reg.test(first.text)) return false;
        }
        else if (!((EXPRESS | STAMP | QUOTED | SCOPED | VALUE) & first.type)) return false;
        var last = skipSentenceQueue(this.first);
        return this.last === last || !last;
    }
    fix() {
        return this.program.fix(this);
    }
    toString() {
        return this.program.createString(this);
    }
    get debug() {
        return this.program.debug;
    }
    set debug(v) {
        this.program.debug = v;
    }
    get envs() {
        return this.scoped.envs;
    }
    get vars() {
        return this.scoped.vars;
    }
    get used() {
        return this.scoped.used;
    }
    get yield() {
        return this.scoped.yield;
    }
    get async() {
        return this.scoped.async;
    }
    get await() {
        return this.scoped.await;
    }
    get return() {
        return this.scoped.return;
    }
    get scoped() {
        if (this._scoped) return this._scoped;
        return this._scoped = this.program.createScoped(this);
    }
    set scoped(w) {
        this._scoped = w;
    }
    get occurs() {
        var rest = [this.scoped];
        var occurs = Object.create(null);
        Object.assign(occurs, this.scoped.envs);
        while (rest.length) {
            var scoped = rest.pop();
            for (var k in scoped.vars) {
                if (k in occurs) continue;
                occurs[k] = true;
            }
            for (var k in scoped.lets) {
                if (k in occurs) continue;
                occurs[k] = true;
            }
            rest.push(...scoped);
        }
        return occurs;
    }
    getUndecleared() {
        var res = Object.create(null);
        for (var k in this.envs) {
            res[k] = this.used[k];
        }
        return res;
    }
    // 提前处理属性
    break() {
        this.program.avoidMap = avoidMap;
        var envs = this.program.detour(this);
        if (this._scoped) extend(this.envs, envs);
        return this;
    }
    // 绕开低版本ie的异常属性
    detour(ie) {
        this.program.avoidMap = avoidMap;
        var envs = this.program.detour(this, ie !== false);
        if (this._scoped) extend(this.envs, envs);
        return this;
    }
    // 压缩
    press(keepspace) {
        this.keepspace = keepspace;
        this.pressed = true;
        this.helpcode = false;
        compress(this.scoped);
        return this;
    }
    relink(list = this) {
        relink(list);
        setqueue(list);
        return list;
    }
}

var avoidMap = null;
var typeMap = Object.create(null);
function scan() {
    var [text, type = "js", lastIndex = 0] = arguments;
    if (isFinite(type)) lastIndex = +type, type = arguments[2] || type;
    var program = typeMap[type];
    if (!program) switch (type) {
        case "html":
            program = typeMap[type] = new Html;
            break;
        case "js":
        case "javascript":
            program = typeMap[type] = new Javascript;
            break;
        default:
            if (type instanceof Function) {
                program = new type;
            }
            else if (type.exec instanceof Function) {
                program = type;
            }
            else {
                console.log(i18n`类型不支持`, type)
            }
            break;
    }
    program.Code = Code;
    program.lastIndex = lastIndex;
    var res = program.exec(text);
    res.autospace = !program.keepspace;
    Object.defineProperty(res, "program", { value: program, enumerable: false })
    return res;
}

Object.defineProperty(scan, "avoid", {
    get() {
        return avoidMap;
    },
    set(map) {
        avoidMap = map;
    }
});

scan.Code = scan.Program = Code;
module.exports = scan;