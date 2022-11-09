var iso8859 = require("./iso8859");
var Program = require("./Program");
var strings = require("../basic/strings");

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
    createScoped,
    number_reg,
} = require("./common");
var ignore = { test() { return false } };

class Html extends Program {
    straps = [];
    value_reg = ignore;
    strapexp_reg = ignore;
    forceend_reg = ignore;
    classstrap_reg = ignore;
    scopes = [];
    intag = false;
    stamps = "/<>=".split("");
    quotes = [["'", "'", /\\[\s\S]/], ["\"", "\"", /\\[\s\S]/]]
    constructor() {
        super();
        this.comments.push([/<!--/, /--!?>/]);
    }
}
var p = new Program;
var replaceISO8859 = function (data) {
    return String(data).replace(/<\!--([\s\S]*)--\>$/g, '$1').replace(/&\w+;/g, a => iso8859[a] || a).replace(/&#(\d+);/g, (_, a) => String.fromCodePoint(a))
};
var parseExpress = function (data, mayberepeat) {
    data = replaceISO8859(data);
    if (mayberepeat && /\s+(in|of)\s+/.test(data)) {
        data = data.split(/\s+(in|of)\s+/).pop();
    }
    p.lastIndex = 0;
    return p.exec(data);
};
Html.prototype.setType = function (o) {
    var q = o.queue;
    var p = o.prev;
    if (!q.intag) {
        if (p && p.type === STAMP) {
            if (/^</.test(p.text)) {
                if (o.type === EXPRESS) {
                    q.intag = true;
                    o.type = LABEL;
                    if (/^<\//.test(p.text)) o.isclose = true;
                    else o.isopen = true;
                }
                return;
            }
        }
        if (o.type !== STAMP && o.type !== COMMENT) o.type = PIECE;
    }
    else {
        if (o.type === STAMP && /^\/?>/.test(o.text)) {
            q.intag = false;
            return;
        }
        if (p.type == STAMP && p.text === '=');
        else if (o.type === EXPRESS) {
            o.type = PROPERTY;
            o.isprop = true;
        }
    }
};
var toCamelCase = function (a) {
    return a.replace(/\-([\s\S])/g, (_, a) => a.toUpperCase());
}

class Node { }
Html.prototype.createScoped = function (code) {
    var used = Object.create(null);
    var vars = Object.create(null);
    var dom = new Node;
    var nodePath = [dom];
    var childNodes = [], children = [];
    dom.childNodes = childNodes;
    dom.children = children;
    var scriptNodes = [], styleNodes = [];
    for (var cx = 0, dx = code.length, c = code[0]; cx < dx; c = code[++cx])switch (c.type) {
        case LABEL:
            if (!/^(script|style|template)$/i.test(c.text)) {
                var v = toCamelCase(c.text)
                if (!used[v]) used[v] = [];
                used[v].push(c);
            }
            if (!c.isclose) {
                var node = new Node;
                node.tagName = c.text.toUpperCase();
                nodePath.push(node);
                node.childNodes = [];
                node.children = [];
                var outerStart = cx;
                while (code[outerStart] !== c.prev) outerStart--;
                node.outerStart = outerStart;
                childNodes.push(node);
                children.push(node);
                children = node.children;
                childNodes = node.childNodes;
            }
            else {
                var tagName = c.text.toUpperCase();
                for (var cy = nodePath.length - 1; cy >= 0; cy--) {
                    if (nodePath[cy].tagName === tagName) break;
                }
                var node = nodePath[cy];
                var outerEnd = cx;
                while (code[outerEnd++] !== c.next);
                node.outerEnd = outerEnd;
                var innerEnd = cx;
                while (code[innerEnd] !== c.prev) innerEnd--;
                node.innerEnd = innerEnd;
                var children1 = node.children;
                var childNodes1 = node.childNodes;
                for (var n of nodePath.splice(cy + 1, nodePath.length)) {
                    n.noclose = true;
                    for (var c of n.childNodes) childNodes1.push(c);
                    for (var c of n.children) children1.push(c);
                }
                if (childNodes1.length) node.innerStart = childNodes1[0].outerStart;
                else node.innerStart = innerEnd;
                if (node.tagName === "SCRIPT") scriptNodes.push(node);
                else if (node.tagName === "STYLE") styleNodes.push(node);
                nodePath.pop();
                node = nodePath[nodePath.length - 1];
                childNodes = node.childNodes;
                children = node.children;
            }
            continue;
        case PROPERTY:
            if (c.next && c.next.type === STAMP && c.next.text === '=') {
                if (/^(element|render|)id$/i.test(c.text)) {
                    var nn = c.next.next;
                    if (!nn || nn.length > 0) continue;
                    if (nn.type === EXPRESS || nn.type === QUOTED) {
                        vars[strings.decode(nn.text)] = true;
                    }
                }
            }
            else {
                if (/^\#/.test(c.text)) {
                    var id = c.text.slice(1);
                    vars[toCamelCase(id)] = true;
                }
            }
            break;
        case QUOTED:
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
            var t = c.text;
            t = parseExpress(t);
            var envs = createScoped(t).envs;
            for (var k in envs) {
                if (!used[k]) used[k] = [];
            }
            break;
        case PIECE:
        case COMMENT:
            var n = new Node;
            n.text = c.text;
            n.outerStart = cx;
            childNodes.push(n);
            break;
    }
    var envs = Object.create(null);
    for (var k in used) {
        if (!vars[k]) {
            envs[k] = true;
        }
    }
    var scripts = [];
    var styles = [];
    var scoped = [];
    code = code.slice();
    for (var c of scriptNodes) scripts.push(code.slice(c.innerStart, c.innerEnd));
    for (var c of styleNodes) styles.push(code.slice(c.innerStart, c.innerEnd));
    while (scriptNodes.length) {
        var c = scriptNodes.pop();
        code.splice(c.outerStart, c.outerEnd);
    }
    while (styleNodes.length) {
        var c = styleNodes.pop();
        code.splice(c.outerStart, c.outerEnd);
    }
    scoped.scripts = scripts.map(s => this.createString(s)).map(replaceISO8859);
    scoped.styles = styles.map(s => this.createString(s)).map(replaceISO8859);
    var rootNodes = dom.childNodes.filter(a => !/^(script|style)$/i.test(a.tagName));
    if (rootNodes.length === 1) {
        scoped.outerHTML = this.createString(code);
        var root = rootNodes[0];
        scoped.tagName = root.tagName;
        while (code[code.length - 1].type === COMMENT || code[code.length - 1].type === SPACE) code.pop();
        while (code[0].type === COMMENT || code[0].type === SPACE) code.shift();
        var attrarea = code.splice(0, root.innerStart - root.outerStart);
        var attrs = [];
        for (var a of attrarea) {
            if (a.type === PROPERTY) {
                var at = { name: a.text };
                attrs.push(at);
                var n = a.next;
                if (!n) continue;
                if (n.type !== STAMP || n.text !== '=') continue;
                var nn = n.next;
                if (!nn) return;
                at.value = nn.text;
            }
        }
        code.splice(root.innerEnd - root.outerEnd, code.length);
        scoped.innerHTML = this.createString(code);
        scoped.attributes = attrs;
    }
    else {
        scoped.innerHTML = this.createString(code);
    }
    scoped.envs = envs;
    scoped.vars = vars;
    scoped.used = used;
    return scoped;
};
Html.prototype.createString = function (code) {
    var dist = [];
    var keepspace = code.keepspace;
    var p = null;
    for (var c of code) {
        switch (c.type) {
            case PIECE:
                if (p && p.type === PIECE) dist.push(" ");
                dist.push(c.text);
                break;
            case SPACE:
                if (keepspace) dist.push(c.text);
                break;
            case PROPERTY:
                dist.push(" ");
                dist.push(c.text);
                break;
            default:
                dist.push(c.text);
        }
        p = c;
    }
    return dist.join('');
}
module.exports = Html;