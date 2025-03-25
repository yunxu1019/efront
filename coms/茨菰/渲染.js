
var { SCOPED, QUOTED, SPACE, STAMP, STRAP, EXPRESS, PROPERTY } = compile$common;

var rows = function (type, text) {
    if (typeof text !== 'string') {
        console.log(text)
        return [];
    }
    type = String(type).toLowerCase();
    if (type in 语言) {
        var c = 语言[type](text);
        标签化(c);
        text = c.toString();

    }
    else text = 标签化.encode(text);

    var codes = text.split(/\r\n|\r|\n/);
    var minSpace = Infinity;
    for (var c of codes) {
        var m = /^\s+/.exec(c);
        if (!m) {
            minSpace = 0;
            break;
        }
        if (m[0].length < minSpace) {
            minSpace = m[0].length;
        }
    }
    if (minSpace > 0 && minSpace < Infinity) codes = codes.map(c => /^\s+/.test(c) ? c.slice(minSpace) : c);
    return codes;
}
function 茨菰(type, text) {
    return `<code type=${type}>${rows(type, text).join("<br/>")}</code>`;
}
茨菰.text = function (type, text) {
    return `${rows(type, text).join("<br/>")}`;
};

茨菰.rows = rows;
茨菰.encode = 标签化.encode;
return 茨菰;