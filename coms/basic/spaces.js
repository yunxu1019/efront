var spaceDefined = [
    "\\u0002",
    "\\b-\\r",// "\\b"/*8*/, "\\t"/*9*/, "\\n"/*10*/, "\\v"/*11*/, "\\f"/*12*/, "\\r"/*13*/,
    " "/*32*/,
    "\\u007f", "\\u00a0", "\\u00ad", "\\u034f", "\\u061c",
    "\\u115f", "\\u1160",
    "\\u17b4", "\\u17b5",
    "\\u180b-\\u180e",
    "\\u1cbb", "\\u1cbc",
    "\\u2000-\\u200f",
    "\\u2028-\\u202f",
    "\\u205f-\\u206f",
    "\\u2800", "\\u3000", "\\u3164",
    "\\ufe00-\\ufe0f",
    "\\ufeff", "\\uffa0",
    "\\ufff0-\\ufff8",
];
var unicode = [
    "\\ud80c\\udffc",// "\\u{133fc}",
    "\\ud834[\\udd73-\\udd7a]"//    "\\u{1d173}-\\u{1d17a}"
];

spaceDefined.avoid = function (extra_tokens) {
    var u0 = "[^\\ud80c][\\udc00-\\udfff]|\\ud80c[^\\udffc]";
    var u1 = "[^\\ud834][\\udc00-\\udfff]|\\ud834[^\\udd73-\\udd7a]";
    return `[^${extra_tokens || ''}${spaceDefined.join('')}]|${u0}|${u1}`;
}
var reg = new RegExp(`(?:[${spaceDefined.join('')}]|${unicode.join('|')})+`);
var is_reg = new RegExp(`^${reg.source}$`);
var trim_reg = new RegExp(`^${reg.source}|${reg.source}$`, 'g');
var format_reg = new RegExp(reg.source, 'g');
spaceDefined.reg = reg;
spaceDefined.is_reg = is_reg;
spaceDefined.is = function (a) {
    return is_reg.test(a);
};
spaceDefined.exec = function (a) {
    return reg.exec(a);
};
spaceDefined.trim = function (a) {
    return a.replace(trim_reg, '');
};
var formatter = function (a) {
    if (/[ \u2002\u00a0\u3000]/.test(a)) return ' ';
    return '';
};
spaceDefined.format = function (a) {
    return a.replace(trim_reg, '').replace(format_reg, formatter);
};
module.exports = spaceDefined;