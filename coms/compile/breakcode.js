var scanner = require("./scanner");
var keywords = require("./keywords");
var strings = require("../basic/strings");
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
var setMatchedConstString = function (k, p, f) {
    if (/^(['"`])user?\s+(strict|asm|strip)\1$/i.test(k)) return k;
    if (k.length < 3) return k;
    k = strings.decode(k);
    k = strings.encode(k);
    var $key = "str_" + k.replace(/^(['"])([\s\S]*)\1$/g, '$2');
    return getReadableKey($key, k);
};
var setMatchedConstRegExp = function (k, p, f) {
    var $key = "reg_" + k.replace(/^\/([\s\S]*)\/(\w*)$/g, '$1_$2');
    return getReadableKey($key, k);
};
var padStart = function (block) {
    var m = module_string.charAt(block.start - 1);
    return m && !/^[\[\(\s]$/.test(m) ? " " : '';
};
var padEnd = function (block) {
    var m = module_string.charAt(block.end);
    return m && !/^[\[\(\.\s\,\;\]\)]$/.test(m) ? " " : '';
}
var trimStringLiteral = function (block) {
    var block_string = module_string.slice(block.start, block.end);
    if (block.type === block.single_quote_scanner || block.type === block.double_quote_scanner) {
        return padStart(block) + setMatchedConstString(block_string) + padEnd(block);
    }
    if (block.type === block.regexp_quote_scanner) {
        return padStart(block) + setMatchedConstRegExp(block_string) + padEnd(block);
    }
    if (block.type === block.template_quote_scanner) {
        var { start, end } = block;
        if (block.children) {
            var res = [];
            for (var c of block.children) {
                res.push(
                    module_string.slice(start, c.start),
                    trimStringLiteral(c).trim()
                );
                start = c.end;
            }
            res.push(module_string.slice(start, end));
            return res.join('');
        }
    }
    return block_string;
};
var paramsMap = null;
var module_string = '';
function breakcode(data, occurs) {
    if (!occurs) return [data];
    module_string = data;
    paramsMap = occurs;
    var code_blocks = scanner(module_string);
    module_string = code_blocks.map(trimStringLiteral).join("");
    var res = Object.keys(paramsMap).filter(k => !hasOwnProperty.call(occurs, k));
    var val = res.map(k => paramsMap[k]);
    paramsMap = null;
    data = module_string;
    module_string = '';
    return [data, res, val];
}
module.exports = breakcode;