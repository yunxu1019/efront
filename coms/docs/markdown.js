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
var li = function (c) {
    var li = new Element(li, c.replace(/^\*\s+|^[\d]+\.\s+/, ''));
    return li;
}
var list_elem = null, list_tag;
var list = function (tag, text, li = 'li') {
    if (!list_elem || list_tag !== tag || list_elem !== content[content.length - 1]) {
        list_elem = new Element(tag);
        list_tag = tag;
        content.push(list_elem);
    }
    list_elem.appendChild(new Element(li, text.replace(/^\*\s+|^\d+\.\s+/, '')));
};
var ul = function (content) {
    return list('ul', content);
};
var ol = function (content) {
    return list('ol', content);
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
    return list('table', line, 'tr');
}
function richtext(line) {
    line = line.trim();
    line = line.replace(/\[([\s\S]*?)\](?:\(([\s\S]*?)\))?|<(\w+)>[\s\S]*?<\/\3>/g, function (_, content, href) {
        if (/^\</.test(_)) return _;
        if (href) href = ` href=${strings.recode(href)}`;
        return `<a${href}>${content}</a>`;
    });
    var a;
    if (/^#/.test(line)) a = h(line);
    else if (/^\*\s+/.test(line)) ul(line);
    else if (/^\d+\.\s+/.test(line)) ol(line);
    else if (/^\|/.test(line)) tr(line);
    else a = p(line);
    if (a) content.push(a);
}
var codecolor = function (c) {
    var envs = c.envs;
    var predefs = Object.create(null);
    predefs.module = true;
    predefs.exports = true;
    predefs["module.exports"] = true;
    predefs.Promise = true;
    [Boolean, Number, String, Function, Object, Array, Date, RegExp, Error].forEach(p => predefs[p.name] = true);
    var { STRAP, SCOPED, QUOTED, LABEL, COMMENT, STAMP, VALUE, EXPRESS, PROPERTY, PIECE } = c;
    var deep = 0;
    var setcolor = function (o) {
        switch (o.type) {
            case LABEL:
                o.text = `<label>${o.text}</label>`;
                break;
            case QUOTED:
            case PIECE:
                if (!o.length) {
                    if (/^\//.test(o.text)) {
                        o.text = `<regexp>${encode(o.text)}</regexp>`;
                    }
                    else o.text = `<text>${encode(o.text)}</text>`;
                    break;
                }
                o.forEach(setcolor);
                o.entry = "<text>" + o.entry;
                o.leave = o.leave + "</text>";
                break;
            case SCOPED:
                deep++;
                o.forEach(setcolor);
                deep--;
                o.entry = `<deep${deep}>${o.entry}</deep${deep}>`;
                o.leave = `<deep${deep}>${o.leave}</deep${deep}>`;
                break;
            case VALUE:
                if (o.isdigit) o.text = `<digit>${o.text}</digit>`;
                else o.text = `<value>${o.text}</value>`;
                break;
            case PROPERTY:
                var next = o.next;
                if (next && next.type === c.SCOPED && next.entry === '(') {
                    o.text = `<method>${o.text}</method>`;
                }
                else o.text = `<property>${o.text}</property>`;

                break;
            case EXPRESS:
                var keys = o.text.split(".");
                var next = o.next;
                if (next && next.type === c.SCOPED && next.entry === '(') {
                    keys[keys.length - 1] = `<invoke>${keys[keys.length - 1]}</invoke>`;
                }
                var [name] = keys;
                if (/^</.test(name));
                else if (/^(arguments|this|super|Infinity|NaN)$/.test(name)) name = `<strap>${name}</strap>`;
                else if (name in envs) name = name in predefs ? `<predef>${name}</predef>` : `<outside>${name}</outside>`;

                keys[0] = name;
                o.text = keys.map(k => /^\</.test(k) || !k ? k : `<express>${k}</express>`).join(".");
                break;
            case STRAP:
                if (/^(if|else|switch|case|do|while|for|break|continue|default|import|from|as|export|try|catch|finally|await|yield|return)/.test(o.text))
                    o.text = `<flow>${o.text}</flow>`;
                else o.text = `<strap>${o.text}</strap>`;
                break;
            case STAMP:
                if (/^(=>)$/.test(o.text) || o.text === "*" && o.prev && o.prev.type === c.STRAP) o.text = `<strap>${encode(o.text)}</strap>`;
                else if (!/^[<\/>]+$/.test(o.text));
                else o.text = `<stamp>${encode(o.text)}</stamp>`;
                break;
            case COMMENT:
                o.text = `<comment>${encode(o.text)}</comment>`;
                break;
        }
    };
    c.forEach(setcolor);

}
var typescript = new compile$Javascript;
typescript.straps = typescript.straps.concat("interface", "implements", "declare", "module", "readonly", "enum");
var codesupports = {
    javascript(a) {
        var c = compile$scanner2(a);
        codecolor(c);
        return c.toString();
    },
    typescript(a) {
        var c = compile$scanner2(a, typescript);
        codecolor(c);
        return c.toString();
    },
    html(a) {
        var code = compile$scanner2(a, 'html');
        var scoped = code.scoped;
        codecolor(code);
        backEach(scoped.richNodes, n => {
            if (n.isScript) {
                var js = compile$scanner2(n.innerText);
                codecolor(js);
                code.splice(n.innerStart, n.innerEnd - n.innerStart, { text: js.toString() });
            }
        })
        return code.toString();
    },
    css(a) {
        var c = compile$scanner2(a);
        codecolor(c);
        return c.toString();
    }
};
codesupports.cmd = codesupports.bat;
codesupports.jsx = codesupports.js = codesupports.javascript;
codesupports.tsx = codesupports.ts = codesupports.typescript;
codesupports.xml = codesupports.html;
function codetext(type, text) {
    try {
        type = type.toLowerCase();
        if (type in codesupports) text = codesupports[type](text);
        else text = encode(text);

    } catch (e) {
        console.error(e);
    }
    text = text.replace(/^(\r\n|\r|\n)|\s+$/g, '');
    var codes = text.split(/\r\n|\r|\n/);
    var minSpace = 0;
    for (var c of codes) {
        var m = /^\s*/.exec(c);
        if (m && m[0].length < c.length) {
            minSpace = m[0].length;
        }
    }
    if (minSpace > 0) codes = codes.map(c => c.slice(minSpace));
    return `<code type=${type}>${codes.join("<br/>").replace(/\t/g, Array(5).join('&ensp;')).replace(/\s/g, '&ensp;')}</code> `;
}
/**
 * @type {Element}
 */
var content;
var encode = function (text) {
    return text.replace(/[\<\>\|]/g, a => `&#${a.charCodeAt()};`)
};
function markdown(text) {
    var c = content = [];
    text.replace(/ *(`+|\*+)(\S[\s\S]*?)\1 */g, function (_, q, c, i) {
        if (/^\*/.test(q)) {
            var m = q.length;
            if (m & 1) c = `<i>${c}</i>`;
            if (m & 2) c = `<b>${c}</b>`;
            return c;
        }
        _ = encode(_.trim()).slice(1, -1);
        if (/[\*#\.]\s/.test(text.slice(i - 1, i + 1))) _ = " " + _;
        if (q.length === 1) return `<m>${_}</m>`;
        var t = /^\S+/.exec(c);
        if (t) t = t[0]; c = c.slice(t.length);
        return codetext(t, c);
    }).replace(/\s*((&nbsp;\s*)+)/g, "$1").split(/\r\n|\r|\n/).forEach(richtext);
    list_elem = null;
    list_tag = null;
    content = null;
    return c.join('');
}
markdown.javascript = codetext.bind(null, 'javascript');