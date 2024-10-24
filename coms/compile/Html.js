var iso8859 = require("./iso8859");
var Program = require("./Program");
var Javascript = require("./Javascript");
var strings = require("../basic/strings");
var common = require("./common");
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
    createScoped,
    createString,
    relink,
} = require("./common");
var ignore = { test() { return false } };
var property = new Program;
property.stamps = "=".split('');
var parseProperty = function (a) {
    property.lastIndex = 0;
    var s = property.exec(a);
    return s;
}

var fixElement = function (o) {
    if (o.length) {
        var o0 = o[0];
        if (o0.type & (PIECE | SPACE)) {
            var text = spaces.trimStart(o0.text);
            if (!text) {
                o.shift();
                o0 = o[0];
                o.first = o0;
                if (o0) o0.prev = null;
            }
            else o0.text = text;
        }
    }
    if (o.length) {
        var o1 = o[o.length - 1];
        if (o1.type & (PIECE | SPACE)) {
            var text = spaces.trimEnd(o1.text);
            if (!text) {
                o.pop();
                o1 = o[o.length - 1];
                o.last = o1;
                if (o1) o1.next = null;
            }
            else o1.text = text;
        }
    }

    if (!o.attributes) return;
    var attributes = [];
    var needValue = false;
    var push = function (p) {
        attributes.push(p);
        if (p.type === STAMP) {
            needValue = true;
            return;
        }
        if (!needValue && p.type === EXPRESS) {
            p.type = PROPERTY;
        }
        needValue = false;
    }
    o.attributes.forEach(a => {
        if (a.type === PIECE) {
            a.text.split(/\s+/).forEach(text => {
                var ps = parseProperty(text);
                for (var cx = 0, dx = ps.length; cx < dx; cx++) {
                    if (needValue) break;
                    push(ps[cx]);
                }
                ps = ps.slice(cx);
                if (!ps.length);
                else if (ps.length === 1) push(ps[0]);
                else {
                    ps.type = QUOTED;
                    ps.entry = '"';
                    ps.leave = '"';
                    push(ps);
                }
            })
        }
        else {
            push(a);
        }
    });
    o.attributes = attributes;
}

class Html extends Javascript {
    // value_reg = ignore;
    // strapexp_reg = ignore;
    // forceend_reg = ignore;
    // classstrap_reg = ignore;
    // // scopes = [];
    // inTag = false;
    scriptTags = [];
    ignoreTags = ["SCRIPT", "STYLE"];
    type = ELEMENT;
}
var property = new Program;
property.stamps = "=".split('');
var p = new Javascript;
var replaceISO8859 = function (data) {
    return String(data).replace(/<\!--([\s\S]*)--\>$/g, '$1').replace(/&\w+;/g, a => iso8859[a] || a).replace(/&#(\d+);/g, (_, a) => String.fromCodePoint(a))
};
var parseExpress = function (data, mayberepeat) {
    data = "=" + replaceISO8859(data);
    if (mayberepeat && /\s+(in|of)\s+/.test(data)) {
        data = data.split(/\s+(in|of)\s+/).pop();
    }
    p.lastIndex = 0;
    return p.exec(data);
};

var toCamelCase = function (a) {
    return a.replace(/\-([\s\S])/g, (_, a) => a.toUpperCase());
}

class Node { }

Html.prototype.createScoped = function (code) {
    var used = Object.create(null);
    var vars = Object.create(null);
    var scriptNodes = [], styleNodes = [], tempNodes = [];
    var inScript = false;
    var noTag = true;
    var run = function (c) {

        switch (c.type) {
            case ELEMENT:
                var v = toCamelCase(c.tag);
                c.tagName = c.tag.toUpperCase();
                if (!/^(script|style)$/i.test(c.tagName)) {
                    fixElement(c);
                    noTag = false;
                    if (c.attributes) c.attributes.forEach(run);
                    noTag = true;
                    if (!used[v]) used[v] = [];
                    used[v].push(c);
                    c.forEach(run);
                }
                else {
                    if (c.tagName === 'SCRIPT') {
                        scriptNodes.push(c);
                        tempNodes.push(c);
                        c.isScript = true;
                    }
                    else if (c.tagName === 'STYLE') {
                        styleNodes.push(c);
                        tempNodes.push(c);
                        c.isStyle = true;
                    }
                }


                break;
            case PROPERTY:
                if (c.next && c.next.type === STAMP && c.next.text === '=') {
                    if (/^(element|render|)id$/i.test(c.text)) {
                        var nn = c.next.next;
                        if (!nn || nn.length > 0) return;
                        if (nn.type === EXPRESS || nn.type === QUOTED) {
                            vars[strings.decode(createString([nn]))] = true;
                        }
                    }
                }
                else {
                    if (/^\#/.test(c.text)) {
                        var id = c.text.slice(1);
                        vars[toCamelCase(id)] = true;
                    }
                    else if (/\#$/.test(c.text)) {
                        var id = c.text.slice(0, c.text.length - 1);
                        vars[toCamelCase(id)] = true;
                    }
                }
                break;
            case QUOTED:
            case PIECE:

                if (c.length) {
                    c.forEach(run);
                    break;
                }
                if (noTag || !c.text) break;
                var t = strings.decode(c.text);
                var p = t.prev;
                var pp = p && p.prev;
                var mayberepeat = p && pp && p.type === STAMP && p.text === "=" && /\-(src|repeat|for|each|foreach)$/i.test(pp.text)
                t = parseExpress(t, mayberepeat);
                var envs = createScoped(t).envs;
                for (var k in envs) {
                    if (!used[k]) used[k] = [];
                }
                break;
            case EXPRESS:
                if (inScript || noTag) break;
                var t = c.text;
                t = parseExpress(t);
                var envs = createScoped(t).envs;
                for (var k in envs) {
                    if (!used[k]) used[k] = [];
                }
                break;
        }
    };

    code.forEach(run);
    var envs = Object.create(null);
    for (var k in used) {
        if (!vars[k]) {
            envs[k] = true;
        }
    }
    var scripts = [];
    var styles = [];
    var scoped = [];
    for (var c of scriptNodes) scripts.push(c.innerText = replaceISO8859(this.createString(c)));
    for (var c of styleNodes) styles.push(c.innerText = replaceISO8859(this.createString(c)));
    scoped.richNodes = tempNodes;
    code = code.slice();
    scoped.scripts = scripts;
    scoped.styles = styles;
    var rootNodes = code.filter(a => !/^(script|style)$/i.test(a.tagName) && !(a.type & (SPACE | COMMENT)));
    if (rootNodes.length === 1 && rootNodes[0].type === ELEMENT) {
        scoped.outerHTML = this.createString(rootNodes);
        var root = rootNodes[0];
        scoped.tagName = root.tagName;
        var attrs = rootNodes[0].attributes;
        var attributes = [];
        if (attrs) relink(attrs);
        if (attrs) for (var a of attrs) {
            if (a.type === PROPERTY) {
                var at = { name: a.text };
                attributes.push(at);
                var n = a.next;
                if (!n) continue;
                if (n.type !== STAMP || n.text !== '=') continue;
                var nn = n.next;
                if (nn.type === PROPERTY) continue;
                if (!nn) continue;
                at.value = this.createString([nn]);
            }
        }
        scoped.attributes = attributes;
        scoped.innerHTML = this.createString(rootNodes[0]);
    }
    else {
        scoped.innerHTML = this.createString(rootNodes);
    }
    scoped.envs = envs;
    scoped.vars = vars;
    scoped.used = used;

    return scoped;
};
Html.prototype.createString = common.createString;
module.exports = Html;