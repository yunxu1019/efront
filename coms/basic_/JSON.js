var stringify_failed_error_message = "stringify json failed!";
var parse_failed_error_message = "parse json failed!";
var scan_string = function (str, start) {
    if (str.charAt(start) !== "\"")
        return false;
    var reg = /\\[\s\S]|"/g;
    reg.lastIndex = start + 1;
    while (reg.lastIndex < str.length) {
        var match = reg.exec(str);
        if (!match)
            return false;
        if (match[0] === "\"") break;
    }
    return reg.lastIndex;
};
var scan_number = function (str, start) {
    if (str.charAt(start) === "-")
        start++;
    var reg = /(?:0|[1-9]\d*)(?:\.\d*)?(e\-?\d+)?/g;
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
        case "]":
        case "}":
            return start;
        case "\"":
            start = scan_string(str, start);
            break;
        case "{":
            var end = str.length;
            start++;
            if (start >= end) return false;
            while (start < end) {
                start = _safeparse(str, start);
                if (start === false)
                    return start;
                start = scan_blank(str, start);
                if (str.charAt(start) === "}") return start + 1;
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
        case "[":
            var end = str.length;
            start++;
            if (start >= end) return false;
            while (start < end) {
                start = _safeparse(str, start);
                if (start === false)
                    return start;
                start = scan_blank(str, start);
                if (str.charAt(start) === ",") {
                    start++;
                    continue;
                }
                if (str.charAt(start) !== "]") {
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
    var parsed = _safeparse(string, 0);
    if (parsed === string.length) {
        return new Function("return " + string)();
    } else {
        throw parse_failed_error_message;
    }
};

var stringify = function (object, filter, space) {
    if (isNumber(space)) {
        space = new Array(space + 1).join(" ");
    }
    if (!isString(space)) {
        space = "";
    }
    var res = getString(object, filter, space);
    if (res.length) return res.join('');
}
var toString = strings.encode;
/**
 * 
 * @param {object} object 
 * @param {function} filter 
 */
var getString = function (object, filter, space) {
    var hasFilter = isFunction(filter);
    var pop = function () {
        objects.pop();
        keys.pop();
    };
    var get = function (object) {
        if (object instanceof Date) {
            object = object.toISOString();
        }
        if (hasFilter) {
            object = filter(key, object);
        }
        switch (typeof object) {
            case "object":
                if (object === null) {
                    return 'null';
                }
                if (object instanceof Boolean || object instanceof Number) {
                    object = object.valueOf();
                    return String(object);
                }
                if (object instanceof String) {
                    return toString(object);
                }
                if (isObject(object)) {
                    return object;
                }
            case "number":
                if (isNaN(object) || object === Infinity) {
                    object = null;
                }
            case "boolean":
                return String(object);
            case "string":
                return toString(object);
            default:
                if (!ks && objects.length > 1) {
                    return 'null';
                }
        }
    };
    var key = '', cx, ks, result = [], objects = [], keys = [[0]];
    object = get(object);
    if (isObject(object)) objects.push(object);
    else if (object) result.push(object);
    while (objects.length) {
        var object = objects[objects.length - 1];
        var key1 = keys[keys.length - 1];
        var [cx, ks] = key1;
        if (!(object instanceof Array) && !ks) {
            key1[1] = ks = Object.keys(object);
        }
        var str = "";
        if (cx === 0) {
            str += ks ? "{" : "[";
        }
        var dx = (ks ? ks : object).length;
        while (cx < dx) {
            key = ks ? ks[cx] : cx;
            var backlength = str.length;
            if (cx > 0) str += ',';
            if (space) str += '\n' + new Array(objects.length + 1).join(space);
            if (ks) {
                str += toString(key) + ":";
                if (space) str += " ";
            };
            var v = get(object[key]);
            if (isObject(v)) {
                key1[0] = cx + 1;
                if (objects.indexOf(v) >= 0) throw stringify_failed_error_message;
                objects.push(v);
                keys.push([0]);
                break;
            } else if (v) {
                str += v;
            } else {
                str = str.slice(0, backlength);
            }
            cx++;
        }
        if (cx === dx) {
            if (dx > 0) {
                if (space) str += '\n' + new Array(objects.length).join(space)
            }
            str += ks ? '}' : ']';
            pop();
        }
        result.push(str);
    }
    return result;
};
var JSON = {
    parse: parse,
    stringify: stringify
};