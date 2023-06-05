var scanner2 = require("./scanner2");
var { SCOPED, QUOTED, SCOPED, PROPERTY, STAMP, PIECE, setqueue, splice, relink, number_reg, replace, createString } = require("./common");
var strings = require("../basic/strings");
var program = null;
var patchTranslate = function (c) {
    if (c.length) {
        c.translate = c.map((o, i) => o.type === PIECE ? strings.decode(`\`${o.text}\``) : `$${i + 1 >> 1}`).join('');
    }
    else {
        if (/^['"`]/.test(c.text) && c.text.length > 2) {
            var text = strings.decode(c.text);
            c.translate = text;
        }
    }

}
function getAllText(code, dest = []) {
    for (var cx = 0, dx = code.length; cx < dx; cx++) {
        var c = code[cx];
        if (c.type === QUOTED) {
            if (c.length) {
                getAllText(c, dest);
                if (c.entry !== '`') continue;
                patchTranslate(c);
                dest.push(c);
            }
            else {
                if (/^['"`]/.test(c.text) && c.text.length > 2) {
                    var text = strings.decode(c.text);
                    if (number_reg.test(text) || program.stamp_reg.test(text) || program.space_reg.test(text)) continue;
                    patchTranslate(c);
                    dest.push(c);
                }
            }
        }
        else if (c.type === SCOPED) {
            getAllText(c, dest);
        }
    }
    return dest;
}

var [手动, 字段名] = Array(2).fill(0).map((_, i) => i + 1);
function getI18nPrefixedText(code, dist = []) {
    var { used, envs } = code;
    var get = function (arr, f, t) {
        for (var n of arr) {
            if (!n || n.type !== QUOTED || n.length && n.entry !== '`') continue;
            var c = n;
            c.transtype = t;
            patchTranslate(c);
            f(c);
        }
    };
    if (envs.i18n) get(used.i18n.filter(o => o.text === 'i18n').map(o => {
        var n = o.next;
        if (n && n.type === SCOPED && n.entry !== '{') n = n.next;
        return n;
    }), c => dist.push(c), 手动);
    if (envs.refilm) get(used.refilm.filter(o => o.text === 'refilm').map(o => o.next), c => {
        c.fields = refilm([c.translate]);
        dist.push(c);
    }, 字段名);
    return dist;
}
var ctn = function (tt, t) {
    var tn = scanner2(tt.replace(/[\$#]+(\d+)/g, (_, i) => {
        var a = (i << 1) - 1;
        if (a in t) return `\${${a}}`;
        return _;
    }));
    tn[tn.length - 1].forEach(n => {
        if (n.type !== QUOTED || !n.length) return;
        n.forEach((a, i) => {
            if (a.type !== SCOPED) return;
            var e = a[0].text;
            if (e in t) n[i] = t[e];
        });
        relink(n);
    })
    return tn;
}
function translate([imap, supports], code) {
    var texts = getI18nPrefixedText(code);
    texts.sort((a, b) => {
        if (a.start > b.start && a.end < b.end) return -1;
        return 0;
    });
    var getm = function (tt) {
        tt = tt.trim();
        if (!imap[tt]) {
            console.warn(`<yellow>国际化翻译缺失：</yellow>${tt}`);
            imap[tt] = supports.map(_ => tt);
        }
        return imap[tt].map(m => strings.encode(m || tt, '`'));
    };
    var used = code.used;
    for (var t of texts) {
        if (t.transtype === 手动) {
            var p = t.prev;
            if (p.type === SCOPED) {
                p.prev.text = 'i18n.lang';
                p.entry = "(";
                p.leave = ")";
            }
            var tt = t.translate;
            var tn = ctn(`(${getm(tt)})`, t);
            replace(t, tn[0]);
        }
        else if (t.transtype === 字段名) {
            var i = t.queue.indexOf(t.prev);
            var e = t.queue.indexOf(t, i);
            var ui = used.refilm.indexOf(t.prev);
            used.refilm.splice(ui, 1);
            if (!used.i18n) {
                used.i18n = [];
                code.envs.i18n = true;
            }
            var tn = scanner2("[]")[0];
            t.fields.forEach(f => {
                var o = scanner2('{}')[0];
                Object.keys(f).forEach(k => {
                    var v = f[k];
                    if (/[\$#]\d+/.test(v)) {
                        var a = v.replace(/^[\$#]+/, '');
                        var a = (a << 1) - 1;
                        if (a in t) v = t[a];
                        else v = scanner2(JSON.stringify(v));
                    }
                    else if (k === 'name') v = ctn(`i18n(${getm(v)})`, t);
                    else v = scanner2(JSON.stringify(v));
                    o.push({ type: PROPERTY, text: JSON.stringify(k) }, { type: STAMP, text: ':' }, ...v, { type: STAMP, text: ',' });
                })
                o.pop();
                setqueue(o);
                relink(o);
                tn.push(o);
                tn.push({ type: STAMP, text: ',' });
            });
            tn.pop();
            setqueue(tn);
            relink(tn);
            Object.defineProperty(tn, 'queue', { value: t.queue });
            splice(t.queue, i, e + 1 - i, tn);
        }
    }
    if (used.refilm && !used.refilm.length) {
        delete code.envs.refilm;
        delete code.used.refilm;
    }
}
translate.getAllText = function (data) {
    var code = scanner2(String(data));
    program = code.program;
    var texts = [];
    getAllText(code, texts);
    return texts;
};
translate.手动 = 手动;
translate.字段名 = 字段名;
translate.getI18nPrefixed = getI18nPrefixedText;
module.exports = translate;