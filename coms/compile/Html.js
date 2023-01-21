var iso8859 = require("./iso8859");
var Program = require("./Program");
var strings = require("../basic/strings");

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
    createScoped,
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
    tags = [];
    quotes = [["'", "'", /\\[\s\S]/], ["\"", "\"", /\\[\s\S]/]]
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
var keep_reg = /^(SCRIPT|STYLE)$/i;
Html.prototype.setType = function (o) {
    var q = o.queue;
    var p = o.prev;
    if (!q.intag) {
        if (p && p.type === STAMP) {
            if (/^</.test(p.text)) {
                if (o.type === EXPRESS) {
                    if (q.keep && o.text !== q.keep) {
                        return;
                    }
                    q.intag = true;
                    o.type = LABEL;
                    if (/^<\//.test(p.text)) o.isclose = true, q.keep = null;
                    else if (!q.keep) o.isopen = true, q.keep = keep_reg.test(o.text) ? o.text : null;
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
    var scriptNodes = [], styleNodes = [], tempNodes = [];
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
                if (node.tagName === "SCRIPT") scriptNodes.push(node), tempNodes.push(node), node.isScript = true;
                else if (node.tagName === "STYLE") styleNodes.push(node), tempNodes.push(node), node.isStyle = true;
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
    scoped.richNodes = tempNodes.slice();
    code = code.slice();
    for (var c of scriptNodes) scripts.push(c.innerText = replaceISO8859(this.createString(code.slice(c.innerStart, c.innerEnd))));
    for (var c of styleNodes) styles.push(c.innerText = replaceISO8859(this.createString(code.slice(c.innerStart, c.innerEnd))));
    while (tempNodes.length) {
        var c = tempNodes.pop();
        code.splice(c.outerStart, c.outerEnd - c.outerStart);
    }
    scoped.scripts = scripts;
    scoped.styles = styles;
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