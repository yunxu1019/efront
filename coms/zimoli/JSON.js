var stringify_failed_error_message = "stringify json failed!";
var parse_failed_error_message = "parse json failed!";
var circle_private_key = "__circle_private_key_" + +new Date;
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
    if (_safeparse(string, 0) === string.length) {
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
var toString = function (object) {
    return "\"" + object.replace(/[\\"]/g, "\\$1") + "\"";
};
/**
 * 
 * @param {object} object 
 * @param {function} filter 
 */
var getString = function (source, filter, space) {
    var hasFilter = isFunction(filter);
    var objects = [source], keys = [[0]], key = '', result = [];
    var inc = 0;
    var pop = function () {
        objects.pop();
        keys.pop();
    };
    do {
        if (inc++ > 0x1fffff) throw new Error(inc);
        var object = objects[objects.length - 1];
        if (object instanceof Date) {
            object = object.toISOString();
        }
        var key1 = keys[keys.length - 1];
        var [cx, ks] = key1;
        if (hasFilter) {
            var object1 = filter(key, object);
            if (object1 instanceof Object && object !== object1) {
                object1 = getString(object1, filter, space);
            }
            object = object1;
        }
        if (object === null) {
            result.push("null");
            pop();
        } else if (isFunction(object) || object === undefined) {
            if (!ks && objects.length > 1) {
                result.push('null');
            }
            pop();
        } else if (isString(object)) {
            result.push(toString(object));
            pop();
        } else if (isNumber(object) || isBoolean(object)) {
            result.push(String(object));
            pop();
        } else if (object instanceof Object) {
            if (!(object instanceof Array) && !ks) {
                key1[1] = ks = Object.keys(object);
            }

            if (cx === 0) {
                result.push(ks ? "{" : "[");
            }
            var dx = (ks ? ks : object).length;
            if (cx < dx) {
                key = ks ? ks[cx] : cx;
                if (cx > 0) result.push(',');
                space && result.push('\n', new Array(objects.length + 1).join(space));
                if (ks) {
                    result.push(toString(key) + ":")
                    if (space) result.push(" ");
                };
                var v = object[key];
                key1[0] = cx + 1;
                if (objects.indexOf(v) >= 0) throw stringify_failed_error_message;
                objects.push(v);
                keys.push([0]);
            }
            if (cx === dx) {
                if (dx > 0) {
                    space && result.push('\n', new Array(objects.length).join(space))
                }
                result.push(ks ? '}' : ']');
                pop();
            }
        } else {
            if (!ks && objects.length > 1) {
                result.push('null');
            }
            pop();
        }
    } while (objects.length);
    return result;
};
if (this.JSON) {
    var JSON = this.JSON;
} else {
    var JSON = {
        parse: parse,
        stringify: stringify
    };
}