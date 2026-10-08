var spaceDefined = [
    "\\u0002",
    "\\b-\\r",// "\\b"/*8*/, "\\t"/*9*/, "\\n"/*10*/, "\\v"/*11*/, "\\f"/*12*/, "\\r"/*13*/,
    " "/*32*/,
    "\\u007f", "\\u0085"/*next line*/, "\\u00a0", "\\u00ad",
    // \u034f 字形连接符，不中断文本
    "\\u061c",// 从右到左书写的控制符
    // \u115f 韩文中的空白字母
    // \u1160 空白，韩文中的谚文中声，应该类似中文中的声调符号
    // \u17b4 高绵文中的元音附标
    // \u17b5 高绵文中的元音符号
    // \u180b 蒙古文中的元音分割符 mvs 排版控制指令，不断开文字连接
    // \u180c 蒙古文自由变体选择符‌2 fvs2 强制指定前一个字母使用其‌第2种自由变体
    // \u180d 蒙古文自由变体选择符‌3 fvs3 
    // \u108e 蒙古文自由变体选择符‌1 fvs1 不可见的格式控制字符 
    // "\\u180b-\\u180e",
    "\\u1cbb", "\\u1cbc", // 未分配，保留代码点格鲁吉亚语扩展区‌
    // \u2000-\u200a从宽到窄的一系列空格
    // \u200b 零宽空格，中断文本
    "\\u2000-\\u200b",
    // \u200c 零宽非连接字符
    // \u200d 零宽连接字符
    // \u200f 从右向左显示控制字符
    "\\u2028-\\u202f",
    "\\u205f-\\u206f",
    "\\u2800", "\\u3000",
    // \u3164 韩文填充符
    // \ufe00 变体选择1 vs1-vs4 区分显示中日韩同义不同形的文字，精细控制中日韩汉字字形显示
    // \ufe01 变体选择2
    // \ufe02 变体选择3
    // \ufe03 变体选择4
    // \ufe04-\ufe0d 目前在 Unicode 标准中未广泛定义用于其他常见变体，保留供未来使用或特定小众脚本。
    // \ufe0e 消除歧义，确保特定的符号或表情被渲染为黑白的 Emoji 图像
    // \ufe0f 消除歧义，确保特定的符号或表情被渲染为彩色的 Emoji 图像
    // "\\ufe00-\\ufe0f",
    "\\ufeff",// 字节顺序标记
    //\uffa0 半角韩文填充符
    "\\ufff0-\\ufff8", //保留字符
    // \ufff\ufffe非字符
    // \ufffe\uffff非字符
];
var unicode = [
    // \ud80c\udffc 即 \u{133fc}, 未分配
    "\\ud834[\\udd73-\\udd7a]"//    \u{1d173}-\u{1d17a} //乐谱区的格式控制符
];

var toHex = a => {
    a = a.charCodeAt(0).toString(16);
    a = Array(5 - a.length).join('0') + a;
    return "\\u" + a;
};
spaceDefined.avoid = function (extra_tokens, encodeAvoid) {
    if (extra_tokens && encodeAvoid !== false) extra_tokens = extra_tokens.replace(/[^\w]/ig, toHex);
    var u1 = "[^\\ud834][\\udc00-\\udfff]|\\ud834[^\\udd73-\\udd7a]";
    return `[^${extra_tokens || ''}${spaceDefined.join('')}]|${u1}`;
}
var reg = new RegExp(`(?:[${spaceDefined.join('')}]|${unicode.join('|')})+`);
var is_reg = new RegExp(`^${reg.source}$`);
var trim_reg = new RegExp(`^${reg.source}|${reg.source}$`, 'g');
var trim_start_reg = new RegExp(`^${reg.source}`);
var trim_end_reg = new RegExp(`${reg.source}$`);
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
spaceDefined.trimStart = function (a) {
    return a.replace(trim_start_reg, '');
};
spaceDefined.trimEnd = function (a) {
    return a.replace(trim_end_reg, '');
};
var formatter = function (a) {
    if (/[ \u2002\u00a0\u3000]/.test(a)) return ' ';
    return '';
};
spaceDefined.format = function (a) {
    return a.replace(trim_reg, '').replace(format_reg, formatter);
};
module.exports = spaceDefined;