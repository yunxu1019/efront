var scanner2 = require("./scanner2");
var { SCOPED, QUOTED, SCOPED, PROPERTY, STAMP, PIECE, setqueue, splice, relink, patchArrawScope, number_reg, replace, canbeDuplicate, createString } = require("./common");
var strings = require("../basic/strings");
var program = null;
var patchTranslate = function (c) {
    if (c.length) {
        var canbeDup = true;
        c.translate = c.map((o, i) => {
            if (o.type === PIECE) return strings.decode(`\`${o.text}\``);
            if (canbeDup && !canbeDuplicate(o)) canbeDup = false;
            return `$${i + 1 >> 1}`;
        }).join('').replace(/\r\n|\r|\n/g, '\r\n');
        c.nodup = !canbeDup;
    }
    else {
        if (/^['"`]/.test(c.text) && c.text.length > 2) {
            var text = strings.decode(c.text).replace(/\r\n|\r|\n/g, '\r\n');
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
    if (envs.refilm_decode) get(used.refilm_decode.filter(o => o.text === 'refilm_decode').map(o => o.next), c => {
        c.fields = refilm([c.translate]);
        c.warn = false;
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
    (tn[0].type === SCOPED ? tn[0] : tn[1]).forEach(n => {
        if (n.type !== QUOTED || !n.length) return;
        n.forEach((a, i) => {
            if (a.type !== SCOPED) return;
            var e = a[0].text;
            if (e in t) n[i] = t[e];
        });
        relink(n);
    });
    patchArrawScope(tn, t);
    return tn;
}
var warningMap = Object.create(null);
function translate([imap, supports], code) {
    var texts = getI18nPrefixedText(code);
    texts.sort((a, b) => {
        if (a.start > b.start && a.end < b.end) return -1;
        return 0;
    });
    var getm = function (tt, nodup, warn) {
        var mq = /^(\s*)([\s\S]*?)(\s*)$/.exec(tt);
        var mq = [mq[1] || '', mq[2], mq[3] || ''];
        var tt = mq[1];
        var wrap = m => {
            mq[1] = m || tt;
            return strings.encode(mq.join(''), '`');
        };

        var imp = imap[tt];
        if (!imp) {
            if (warn !== false && !/^\s*$/.test(tt) && !warningMap[tt]) warningMap[tt] = true, console.warn(`<yellow>${i18n`翻译缺失：`}</yellow>${tt}`);
            imp = imap[tt] = supports.map(_ => tt);
        }
        if (nodup && imp.length <= 1) nodup = false;
        var mp = nodup ? m => "()=>" + wrap(m) : m => wrap(m);
        var m = `(${imp.map(mp)})`;
        if (nodup) m += '()';
        return m;
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
            var tn = ctn(getm(tt, t.nodup), t);
            replace(t, ...tn);
        }
        else if (t.transtype === 字段名) {
            var i = t.queue.indexOf(t.prev);
            var e = t.queue.indexOf(t, i);
            if (t.warn === false) {
                var ui = used.refilm_decode.indexOf(t.prev);
                if (ui >= 0) used.refilm_decode.splice(ui, 1);
            }
            else {
                var ui = used.refilm.indexOf(t.prev);
                if (ui >= 0) used.refilm.splice(ui, 1);
            }
            if (!used.i18n) {
                used.i18n = [];
                code.envs.i18n = true;
            }
            var tn = scanner2("[]")[0];
            t.fields.forEach(f => {
                var o = scanner2('={}')[1];
                Object.keys(f).forEach(k => {
                    var v = f[k];
                    if (/[\$#]\d+/.test(v)) {
                        var a = v.replace(/^[\$#]+/, '');
                        var a = (a << 1) - 1;
                        if (a in t) v = t[a];
                        else v = scanner2(JSON.stringify(v));
                    }
                    else if (/^(name|holder|comment)$/.test(k)) v = ctn('i18n' + getm(v, t.nodup, t.warn), t);
                    else v = scanner2(JSON.stringify(v));
                    o.push({ type: PROPERTY, isprop: true, text: JSON.stringify(k) }, { type: STAMP, text: ':' }, ...v, { type: STAMP, text: ',' });
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