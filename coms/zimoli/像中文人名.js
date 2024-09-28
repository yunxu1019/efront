var reg = new RegExp(`^(${random$姓.join('|')})(${/\S{1,2}/.source})儿?$`);
var reg2 = new RegExp(`^(${random$姓.join('|')})(${/\S{3,9}/.source})$`);
var reg3 = new RegExp(`^[小大黑白胖瘦傻笨阿](${random$姓.join('|') + "|[鼠牛虎兔龙蛇马羊猴鸡狗猪]"})子?$`);
return function like(text) {
    if (isEmpty(text)) return false;
    text = String(text).split(/[\,、，&与和\s]/);
    for (var t of text) {
        if (!t) continue;
        if (reg.test(t)) return 6;
        if (reg3.test(t)) return 4;
        if (/^[小大]\S{1,3}$/.test(t)) return 3;
        if (t.length === 2 && t.charAt(0) === t.charAt(1)) return 2;
        var m = /^(?:[a-z]\.?){2,5}|(?:[a-z]\.?){2,5}$/i.exec(t);
        if (m) {
            var s = m.index > 0 ? t.slice(0, m.index) : t.slice(m.index + m[0].length);
            if (!s || like(s)) {
                return true;
            }
        }
    }
    return 0;
}