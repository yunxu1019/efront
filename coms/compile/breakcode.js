var scanner = require("./scanner");
var keywords = require("./keywords");
var hasOwnProperty = {}.hasOwnProperty;
var getReadableKey = function ($key, value) {
    value = value.replace(/-->/g, '--\\>');
    if (!/^[a-z][\w\$]*$/i.test($key)) {
        $key = $key.replace(/[^\w\$]+/g, '_');
        if ($key.length > 20) $key = $key.slice(0, 4) + $key.slice(-20);
    }
    $key = $key.replace(/(\d\.?)px/ig, "$1_px");
    var id = 0;
    while (($key in paramsMap) && paramsMap[$key] !== value || $key in keywords) {
        $key = $key.replace(/\d+$/, '') + ++id;
    }
    if (!hasOwnProperty.call(paramsMap, $key)) {
        paramsMap[$key] = value;
    }
    return $key;
};
var setMatchedConstString = function (k) {

    if (/^(['"])user?\s+strict\1$/i.test(k)) return `"use strict"`;
    if (k.length < 3) return k;
    k = k.replace(/^(['"])(.*?)\1$/, function (match, quote, string) {
        return "\"" + string.replace(/\\([\s\S])/g, (a, b) => b === "'" ? b : a).replace(/"/g, "\\\"") + "\"";
    });
    var $key = "str_" + k.replace(/^(['"])([\s\S]*)\1$/g, '$2');
    var key = getReadableKey($key, k);
    return " " + key + " ";
};
var setMatchedConstRegExp = function (k) {
    var $key = "reg_" + k.replace(/^\/([\s\S]*)\/(\w*)$/g, '$1_$2');
    $key = getReadableKey($key, k);
    return " " + $key + " ";
};
var trimStringLiteral = function (block) {
    var block_string = module_string.slice(block.start, block.end);
    if (block.type === block.single_quote_scanner || block.type === block.double_quote_scanner) {
        requireReg.lastIndex = block.start;
        var isRequire = requireReg.exec(module_string);
        return setMatchedConstString(block_string, isRequire);
    }
    if (block.type === block.regexp_quote_scanner) {
        return setMatchedConstRegExp(block_string);
    }
    return block_string;
};
var paramsMap = Object.create(null);
var requireReg = /(?<=\brequire\s*\(\s*)['"`]/gy;
var module_string = '';
function breakcode(data, args) {
    if (!args) return [data];
    module_string = data;
    Object.keys(args).forEach(function (key) {
        paramsMap[key] = true;
    });
    var code_blocks = scanner(module_string);
    module_string = code_blocks.map(trimStringLiteral).join("");
    var res = Object.keys(paramsMap).filter(k => !hasOwnProperty.call(args, k));
    var val = res.map(k => paramsMap[k]);
    paramsMap = Object.create(null);
    data = module_string;
    module_string = '';
    return [data, res, val];
}
module.exports = breakcode;