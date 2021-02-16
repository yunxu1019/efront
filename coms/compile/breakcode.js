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
var setMatchedConstString = function (match, type, k, isProp) {

    if (/^(['"])user?\s+strict\1$/i.test(k)) return `"use strict"`;
    if (k.length < 3) return match;
    var $key = '';
    switch (type) {
        case "'":
        case "\"":
            k = k.replace(/^(['"])(.*?)\1$/, function (match, quote, string) {
                return "\"" + string.replace(/\\([\s\S])/g, (a, b) => b === "'" ? b : a).replace(/"/g, "\\\"") + "\"";
            });
            $key = "str_" + k.replace(/^(['"])([\s\S]*)\1$/g, '$2');
            break;
        case ".":
            $key = k;
            k = "\"" + k + "\"";
            break;
    }
    var key = getReadableKey($key, k);
    return (isProp || type === ".") ? `[${key}]` : " " + key + " ";
};
var setMatchedConstRegExp = function (match, type, k) {
    var $key = "reg_" + k.replace(/^\/([\s\S]*)\/(\w*)$/g, '$1_$2');
    $key = getReadableKey($key, k);
    return type + " " + $key + " ";
};
var trimStringLiteral = function (block) {
    var block_string = module_string.slice(block.start, block.end);
    var isPropEnd = (
        extentReg.lastIndex = block.end,
        extentReg.exec(module_string)
    );
    var isPropStart = (
        prefixReg.lastIndex = block.start - 1,
        prefixReg.exec(module_string)
    );
    var isProp = !!(isPropStart && isPropEnd);
    requireReg.lastIndex = block.start;
    var isRequire = requireReg.exec(module_string);

    if (block.type === block.single_quote_scanner) {
        return setMatchedConstString(block_string, "'", block_string, isProp, isRequire);
    }
    if (block.type === block.double_quote_scanner) {
        return setMatchedConstString(block_string, "\"", block_string, isProp, isRequire);
    }
    if (block.type === block.regexp_quote_scanner) {
        return setMatchedConstRegExp(block_string, "", block_string);
    }
    return module_string.slice(block.start, block.end);
};
var paramsMap = Object.create(null);
var extentReg = /\s*[\:\(]/gy, prefixReg = /(?<=[,\{]\s*)\s|[\,\{}]/gy;
var requireReg = /(?<=\brequire\s*\(\s*)['"`]/gy;
var module_string = '';
function breakcode(data, args) {

    if (!args) return args;
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