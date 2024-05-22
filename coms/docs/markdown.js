class Element {
    childNodes = [];
    constructor(tagName, ...content) {
        this.tagName = tagName;
        this.childNodes.push(...content);
    }
    appendChild(node) {
        this.childNodes.push(node);
    }
    toString() {
        var { tagName } = this;
        return `<${tagName}>${this.childNodes.join('')}</${tagName}>`;
    }
}
var h = function (text) {
    var t2 = text.replace(/^\#+\s/, '');
    var level = text.length - t2.length;
    return new Element('h' + level, t2);
};
var p = function (text) {
    if (text.length) return new Element("p", text);
};
var p2 = function (text) {
    if (text.length) return new Element('div', text);
}
var li = function (c) {
    var li = new Element(li, c.replace(/^\*\s+|^[\d]+\.\s+/, ''));
    return li;
}
var list_elem = null, list_tag;
var list = function (tag, text, indent, li = 'li') {
    if (!list_elem || list_tag !== tag || list_elem !== content[content.length - 1]) {
        list_elem = new Element(tag);
        list_elem.indent = indent;
        list_tag = tag;
        content.push(list_elem);
    }
    list_elem.appendChild(new Element(li, text.replace(/^\*\s+|^\d+\.\s+/, '')));
};
var ul = function (content, indent) {
    return list('ul', content, indent);
};
var ol = function (content, indent) {
    return list('ol', content, indent);
};
var tr = function (line) {
    if (/^[\|\-\s]+$/.test(line)) {
        var table = content[content.length - 1];
        if (!table || table.tagName !== 'table') return;
        if (!table.thead) {
            table.thead = new Element('thead');
            table.thead.childNodes.push(...table.childNodes.splice(0, table.childNodes.length));
            table.childNodes.push(table.thead);
            return;
        }
        if (!table.tbody) {
            table.tbody = new Element("tbody");
            table.tbody.childNodes.push(...table.childNodes.splice(1, table.childNodes.length));
            table.childNodes.push(table.tbody);
            return
        }
        if (!table.tfoot) {
            table.tfoot = new Element("tfoot");
            table.tfoot.childNodes.push(...table.childNodes.slice(2, table.childNodes.length));
            table.childNodes.push(table.tfoot);
            return;
        }
        return;
    }
    line = line.replace(/^\||\|$/g, '').split("|").map(t => `<td>${t}</td>`).join('');
    return list('table', line, NaN, 'tr');
}
function richtext(line) {
    var tagIndent = /^\s+/.exec(line);
    if (!tagIndent) tagIndent = 0;
    else tagIndent = tagIndent[0].length;
    line = line.slice(tagIndent);
    line = line.replace(/\[([\s\S]*?)\](?:\(([\s\S]*?)\))?|<(\w+)>[\s\S]*?<\/\3>/g, function (_, content, href) {
        if (/^\</.test(_)) return _;
        if (href) var href1 = ` href=${strings.recode(href)}`;
        return `<a${href1}>${content || href}</a>`;
    });
    var a;
    if (/^#/.test(line)) content.push(h(line));
    else if (/^\*\s+/.test(line)) ul(line, tagIndent);
    else if (/^\d+\.\s+/.test(line)) ol(line, tagIndent);
    else if (/^\|/.test(line)) tr(line);
    else {
        if (list_elem && list_elem === content[content.length - 1] && list_elem.indent <= tagIndent) {
            list_elem.appendChild(p(line));
        }
        else {
            content.push(p2(line));
        }
    }
}
/**
 * @type {Element}
 */
var content;
function markdown(text) {
    var c = content = [];
    text.replace(/([ \t\v]*)(`+|\*+)(\S[\s\S]*?)\2([ \t\v]*)/g, function (_, s1, q, c, s2, i) {
        if (/^\*/.test(q)) {
            var m = q.length;
            if (m & 1) c = `<i>${c}</i>`;
            if (m & 2) c = `<b>${c}</b>`;
            return c;
        }
        if (/[\*#\.]\s/.test(text.slice(i - 1, i + 1))) _ = " " + _;
        if (q.length === 1) {
            _ = 茨菰$渲染.encode(_.trim()).slice(1, -1);
            return `${s1}<m>${_}</m>${s2}`;
        }
        var t = /^\S+/.exec(c);
        if (t) t = t[0]; c = c.slice(t.length).replace(/^(\r\n|\r|\n)|\s+$/g, '');
        try {
            return s1 + 茨菰$上色(t, c) + s2;
        } catch (e) {
            console.error(e);
            return c;
        }
    }).replace(/\s*((&nbsp;\s*)+)/g, "$1").split(/\r\n|\r|\n/).forEach(richtext);
    list_elem = null;
    list_tag = null;
    content = null;
    return c.join('');
}