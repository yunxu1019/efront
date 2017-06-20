var stringify_failed_error_message = "stringify json failed!";
var parse_failed_error_message = "parse json failed!";
var circle_private_key = "__circle_private_key_" + new Date().valueOf();
var scan_string = function (str, start) {
    if (str.charAt(start) !== "\"")
        return false;
    var reg = /[^\\]"/g;
    reg.lastIndex = start;
    var match = reg.exec(str);
    if (!match)
        return false;
    return reg.lastIndex;
};
var scan_number = function (str, start) {
    if (str.charAt(start) === "-")
        start++;
    var reg = /(?:0|[1-9]\d*)(?:\.\d*)?/g;
    reg.lastIndex = start;
    var match = reg.exec(str);
    if (!match)
        return false;
    return reg.lastIndex;
};
var scan_null = function (str, start) {
    var reg = /null|false|true/g;
    reg.lastIndex = start;
    var match = reg.exec(str);
    if (match && match.index === start)
        return reg.lastIndex;
    return false;
};
var scan_blank = function (str, start) {
    var reg = /[^\s]/g;
    reg.lastIndex = start;
    var match = reg.exec(str);
    if (match)
        return match.index;
    return str.length;
};
var _safeparse = function (str, start) {
    start = scan_blank(str, start);
    switch (str.charAt(start)) {
        case "\"":
            start = scan_string(str, start);
            break;
        case "{":
            var end = str.length;
            start++;
            while (start < end) {
                start = _safeparse(str, start);
                if (start === false)
                    return start;
                start = scan_blank(str, start);
                if (str.charAt(start) !== ":")
                    return false;
                start++;
                start = _safeparse(str, start);
                if (start === false)
                    return start;
                start = scan_blank(str, start);
                if (str.charAt(start) === ",") {
                    start++;
                    continue;
                }
                if (str.charAt(start) !== "}") {
                    return false;
                }
                start++;
                break;
            }
            break;
        case "n":
        case "f":
        case "t":
            start = scan_null(str, start);
            break;
        default:
            start = scan_number(str, start);
    }
    if (start === false)
        return start;
    return scan_blank(str, start);
};
var parse = function (string) {
    string = String(string);
    if (_safeparse(string, 0) === string.length) {
        return new Function("return " + string)();
    } else {
        throw parse_failed_error_message;
    }
};
/**
 * 
 * @param {object} object 
 * @param {function} filter 
 */
var stringify = function (object, filter) {
    if (isFunction(object))
        return;
    if (object instanceof Date) {
        object = String(object);
    }
    if (object instanceof Object) {
        if (object[circle_private_key])
            throw stringify_failed_error_message;
        object[circle_private_key] = true;
        var stringified = [];
        for (var k in object) {
            if (object.hasOwnProperty(k)) {
                var v = stringify(object[k], filter);
                if (isDefined(v))
                    stringified.push(k + ":" + v);
            }
        }
        delete object[circle_private_key];
        return "{" + stringified.join(",") + "}";
    }
    if (isString(object)) {
        return object.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");
    }
    return object;
};
var JSON = {
    parse: parse,
    stringify: stringify
};