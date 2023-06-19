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
var unescapeReg = new RegExp(`[${Object.keys(escapeMap).map(a => escapeMap[a]).join('')}]`, 'g');
var unescapeFun = a => escapeMap[a];
var unescapeUnc = function (a) {
    if (escapeMap.hasOwnProperty(a)) return escapeMap[a];
    var code = a.charCodeAt(0).toString(16);
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
var unescapeMap = {};
for (var k in escapeMap) unescapeMap[escapeMap[k]] = k;
function encode(str, q = "\"", escapeUnicode = true) {
    str = str.replace(new RegExp(`[\\\\${q}]`, 'g'), "\\$&");
    if (escapeUnicode) str = str.replace(/[\r\n\t\v\f\u0008\u0000-\u001f\u007f-\uffff]/g, unescapeUnc);
    else str = str.replace(unescapeReg, unescapeFun);
    return q + str + q;
}
function decode(s) {
    var r = /^(['"`])([\s\S]*)\1$/.exec(s);
    if (!r) return s;
    return r[2].replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\([0-7]{1,3}|[\s\S])/ig, (a, b) => {
        if (!b) {
            return String.fromCharCode(parseInt(a.slice(2), 16));
        }
        if (unescapeMap.hasOwnProperty(a)) return unescapeMap[a];
        if (/^[0-7]+$/.test(b)) return String.fromCharCode(parseInt(b, 8));
        return b;
    });
}
function recode(s) {
    s = decode(s);
    s = encode(s);
    return s;
}
module.exports = { encode, decode, recode };