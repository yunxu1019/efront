var scanner2 = require("./scanner2");
var { SCOPED, QUOTED, SCOPED, PIECE, number_reg, replace, createString } = require("./common");
var strings = require("../basic/strings");
var program = null;
var patchTranslate = function (c) {
    if (c.length) {
        c.translate = c.map((o, i) => o.type === PIECE ? strings.decode(`\`${o.text}\``) : ` $#${i + 1 >> 1} `).join('');
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

function translate([imap, supports], code) {
    var texts = getI18nPrefixedText(code);
    var getm = function (tt) {
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
            replace(t, ...scanner2(`(${getm(tt)})`.replace(/\$#(\d+)/g, (_, i) => {
                var a = (i << 1) - 1;
                if (a in t) return createString(t[a]);
                return _;
            })));
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
            t.queue.splice(i, e + 1 - i, ...scanner2("[" + t.fields.map(f => {
                return "{" + Object.keys(f).map(k => {
                    var v = f[k];
                    if (/\$#\d+/.test(v)) v = v.replace(/\$#(\d+)/g, (_, i) => {
                        var a = (i << 1) - 1;
                        if (a in t) return createString(t[a]);
                        return _;
                    });
                    else if (k === 'name') v = `i18n(${getm(v)})`;
                    else v = JSON.stringify(v);
                    return JSON.stringify(k) + ":" + v;
                }).join(',') + "}";
            }).join(',') + "]"));
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