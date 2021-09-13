function transfer(data, mark = "~") {
    var reg0 = /(['"`])\/\/(.*?)\1/g;
    // ```````//1 ------------------------------------------------------------------------ 1// -2-- //////3 /////// ----- 4 ----- //
    var reg = /([\.\]](?:src|href|)\s*=\s*|\ssrc\s*=|<(?:link|a)[^>]*\shref=|url\(|(?=['"`]))([`'"]?)http(s?):\/\/([^\/'"`\s\?\#]*)/gi;
    data = String(data).replace(reg0, (_, b, c) => `${b}/&${c}${b}`)
        .replace(reg, (_, a, b, c, d) => `${a}${b}/${mark}${c ? mark : ''}${d}`);
    return data;
}
module.exports = transfer;