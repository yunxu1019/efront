"use strict";
var createNamelist = require("./namelist");
var Html = require("./Html");
var Javascript = require("./Javascript");
const {
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
    skipAssignment,
    rename,
    relink,
} = require("./common");


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
            map[k] = name;
            rename(used, k, name);
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
    pressed = false
    _scoped = null;
    helpcode = true;
    keepspace = true;
    /**
     * @type {Program}
     */
    program = null;
    isExpress() {
        if (!this.first) return false;
        var first = this.first;
        if (first.type === SCOPED) {
            if (first.entry === '{') return false;
        }
        else if (first.type === STRAP) {
            if (!this.program.strapexp_reg.test(first.text)) return false;
        }
        else if (!~[EXPRESS, STAMP, QUOTED, SCOPED, VALUE].indexOf(first.type)) return false;
        var last = skipAssignment(this.first);
        return this.last === last || !last;
    }

    toString() {
        return this.program.createString(this);
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
        this.program.detour(this.first);
        return this;
    }
    // 绕开低版本ie的异常属性
    detour(ie) {
        this.program.avoidMap = avoidMap;
        this.program.detour(this.first, !!ie);
        return this;
    }
    // 压缩
    press(keepspace) {
        this.keepspace = keepspace;
        this.pressed = true;
        compress(this.scoped);
        return this;
    }
    relink(list = this) {
        return relink(list);
    }
}

var avoidMap = null;
function scan(text, type = "js", lastIndex = 0) {
    if (isFinite(type)) lastIndex = +type, type = arguments[1];
    var program;
    switch (type) {
        case "html":
            program = new Html;
            break;
        case "js":
        case "javascript":
            program = new Javascript;
            break;
        case "java":
            break;
    }
    program.Code = Code;
    program.lastIndex = lastIndex;
    var res = program.exec(text);
    res.program = program;
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