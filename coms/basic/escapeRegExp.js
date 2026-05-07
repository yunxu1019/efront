if (RegExp.escape) return RegExp.escape;
var tnvfr = 'tnvfr';
var replaceFirst = function (m) {
    return "\\x" + m.charCodeAt().toString(16)
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#white_space
// https://util.unicode.org/UnicodeJsps/list-unicodeset.jsp?a=%5Cp%7BGeneral_Category%3DSpace_Separator%7D
var syntaxReg = /(^[0-9a-fA-F])|([\^\$\\\.\*\+\?\(\)\[\]\{\}\|\/])|([,\-\=\<\>#\&\!%\:;@~'`"\x20\xa0])|([\u0009-\u000d])|([\ud800-\udfff\ufeff\u2028\u2029\u1680\u2000-\u200a\u202f\u205f\u3000])/g;
var replaceSynax = function (_, z, a, b, c, d) {
    if (z) return replaceFirst(z);
    if (a) return "\\" + a;
    if (b) return "\\x" + b.charCodeAt().toString(16);
    if (c) return "\\" + tnvfr.charAt(c.charCodeAt() - 9);
    if (d) {
        d = d.charCodeAt();
        if (d <= 0xff) return "\\u00" + d.toString(16);
        return "\\u" + d.toString(16);
    }
    return _;
}
function escapeRegExp(string) {
    return string.replace(syntaxReg, replaceSynax)

}