var escapeMap = {
    "\r": "\\r",
    "\n": "\\n",
    "\t": "\\t",
    "\b": "\\b",
    "\f": "\\f",
    "\v": "\\u000b",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029",
};
var unescapeFun = a => escapeMap[a];
var unescapeUnc = function (a) {
    if (a.length !== 1) a: {
        var a1 = a[1];
        if (escapeMap.hasOwnProperty(a1)) {
            return escapeMap[a1];
        }
        var code = a1.charCodeAt(0);
        if (code <= 0x001f || code >= 0x80) break a;
        return a;
    }
    else if (escapeMap.hasOwnProperty(a)) return escapeMap[a];
    else var code = a.charCodeAt(0).toString(16);
    switch (code.length) {
        case 1:
            return "\\u000" + code;
        case 2:
            return "\\u00" + code;
        case 3:
            return "\\u0" + code;
    }
    return "\\u" + code;
};
var unescapeMap = {
    "\\v": "\v",
};
for (var k in escapeMap) unescapeMap[escapeMap[k]] = k;
var unescapeReg = new RegExp(`[${Object.keys(escapeMap).map(a => escapeMap[a]).join('')}]`, 'g');
function escape(str) {
    str = str.replace(/\\[\s\S]|[\r\n\t\v\f\u0008\u0000-\u001f\u007f-\uffff]/g, unescapeUnc);
    return str;
}
function encode(str, q = "\"", escapeUnicode = true) {
    str = str.replace(new RegExp(`[\\\\${q}]`, 'g'), "\\$&");
    if (escapeUnicode) str = escape(str);
    else str = str.replace(unescapeReg, unescapeFun);
    return q + str + q;
}
var esc = function (a) {
    a = parseInt(a.slice(2).replace(/^\{(.*)\}$/, '$1'), 16);
    if (a > 0xffff) {
        a -= 0x10000;
        return String.fromCharCode((0b11011000 | a >> 18) << 8 | a >> 10 & 0xff, (0b11011100 | a >> 8 & 0b00000011) << 8 | a & 0xff);
    }
    return String.fromCharCode(a);
};
function uncode(s) {
    return s.replace(/\\u(?:\{[0-9a-f]+\}|[0-9a-f]{4})/ig, esc);
}
function kicode(s, singleSlash = false) {
    var t = [];
    return s.replace(/\\(?:u\{[0-9a-f]+\}|u[0-9a-f]{4}|x[0-9a-f]{2}|([0-7]{1,3}|[\s\S]))/ig, (a, b, i) => {
        if (!b) {
            if (/^\\x/.test(a)) {
                b = parseInt(a.slice(2, 4), 16);
                t.push(b);
                i += a.length;
                if (!/^\\x[0-9a-f]{2}$/i.test(s.slice(i, i + 4))) {
                    b = decodeUTF8(t);
                    t = [];
                    return b;
                }
                return "";
            }
            return esc(a);
        }
        if (unescapeMap.hasOwnProperty(a)) return unescapeMap[a];
        if (/^[0-7]+$/.test(b)) return String.fromCharCode(parseInt(b, 8));
        if (b === singleSlash) return b;
        if (singleSlash) return '\\' + b;
        return b;
    });
}
function decode(s, singleSlash) {
    var r = /^(['"`])([\s\S]*)\1$/.exec(s);
    if (!r) return s;
    return kicode(r[2], singleSlash ? r[1] : null);
}
var forbiddens = {
    "极兔与狗": "jtexpress.cn",
    "拼多多与狗": "pinduoduo.com",
    "狗府与狗共": "gov.cn",
    "淘宝与狗": "taobao.com",
    "支付宝与狗": "alipay.com",
    "华为与狗": "huawei.com",
    "京东与狗": "jd.com",
    "美团与狗": "meituan.com",
    "美团公司与狗": "sankuai.com",
    "腾讯与狗": "tencent.com",
    "QQ团队与狗": "qq.com",
    "微信团队与狗": "wechat.com",
};
var regs = typeof escapeRegExp === 'undefined' ? [] : Object.keys(forbiddens).map(k => {
    var r = forbiddens[k];
    r = new RegExp("(?:^|\\:|\\/\\/|\\.)" + escapeRegExp(r) + "(\\/|$|\\:)", 'i');
    r.name = k;
    return r;
});
function recode(s, singleSlash) {
    s = decode(s, singleSlash);
    for (var r of regs) {
        if (r.test(s)) {
            s = r.name + "不得使用";
            console.error(s);
        }
    }
    s = encode(s, '"', false);
    return s;
}
export { encode, decode, recode, escape, kicode, uncode };