var escapeMap = {
    "\r": "\\r",
    "\n": "\\n",
    "\t": "\\t",
    "\b": "\\b",
    "\f": "\\f",
    "\v": "\\u000b",
};
var unescapeMap = {};
for (var k in escapeMap) unescapeMap[escapeMap[k]] = k;

function encode(str) {
    return "\"" + str.replace(/[\\"]/g, "\\$&").replace(/[\r\n\t\v\f\u0008\u0000-\u001f\u007f-\uffff]/g, a => {
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
    }) + "\"";
}
function decode(s) {
    var r = /^(['"])([\s\S]*)\1$/.exec(s);
    if (!r) return s;
    return r[2].replace(/\\u[0-9a-f]{4}|\\([\s\S])/ig, (a, b) => {
        if (!b) {
            return String.fromCharCode(parseInt(a.slice(2), 16));
        }
        if (unescapeMap.hasOwnProperty(a)) return unescapeMap[a];
        return b;
    });
}
module.exports = { encode, decode };