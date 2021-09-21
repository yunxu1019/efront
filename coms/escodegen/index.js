module.exports=([/*Thu Sep 09 2021 19:39:05 GMT+0800 (中国标准时间) by efront 2.39.2*/].map||function (f, t) {
        var s = this,
        l=s[2],
        r = [],
        c = 0,
        e=s[11],
        d = s[l];
        for (; c < d; c++)r[c] = f[e](t, c, s[c]);
        return r
    }).call([
/** 1 init */ [],
/** 2 $efront_string_slice */ "slice",
/** 3 $efront_string_length */ "length",
/** 4 $efront_string_split */ "split",
/** 5 $efront_string_concat */ "concat",
/** 6 $efront_string_apply */ "apply",
/** 7 $efront_string_revers */ "reverse",
/** 8 $efront_string_exec */ "exec",
/** 9 $efront_string_indexO */ "indexOf",
/** 10 $efront_string_string */ "string",
/** 11 $efront_string_join */ "join",
/** 12 $efront_string_call */ "call",
/** 13 $efront_string_export */ "exports",
/** 14 $efront_regexp__funct */ /^function[^\(]*?\(([^\)]+?)\)/,
/** 15 String */ String,
/** 16 parseInt */ parseInt,
/** 17 module */ [1631189333],
/** 18 $efront_string__ */ /** text */ "\r",
/** 19 $efront_string__r */ "\\r",
/** 20 $efront_string__1 */ /** text */ "\n",
/** 21 $efront_string__n */ "\\n",
/** 22 $efront_string__2 */ /** text */ "\t",
/** 23 $efront_string__t */ "\\t",
/** 24 $efront_string__3 */ "\b",
/** 25 $efront_string__b */ "\\b",
/** 26 $efront_string__4 */ /** text */ "\f",
/** 27 $efront_string__f */ "\\f",
/** 28 $efront_string__5 */ /** text */ "\u000b",
/** 29 $efront_string__u000b */ "\\u000b",
/** 30 $efront_string__6 */ "\"",
/** 31 $efront_string_replac */ "replace",
/** 32 $efront_regexp__g */ /[\\"]/g,
/** 33 $efront_string__$_ */ "\\$&",
/** 34 $efront_regexp__r_n_t */ /[\r\n\t\v\f\u0008\u0000-\u001f\u007f-\uffff]/g,
/** 35 $efront_string_hasOwn */ "hasOwnProperty",
/** 36 $efront_string_charCo */ "charCodeAt",
/** 37 $efront_string_toStri */ "toString",
/** 38 $efront_string__u000 */ "\\u000",
/** 39 $efront_string__u00 */ "\\u00",
/** 40 $efront_string__u0 */ "\\u0",
/** 41 $efront_string__u */ "\\u",
/** 42 $efront_regexp__s_S_1 */ /^(['"])([\s\S]*)\1$/,
/** 43 $efront_regexp__u_0_9 */ /\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\([\s\S])/ig,
/** 44 $efront_string_fromCh */ "fromCharCode",
/** 45 $efront_string_encode */ "encode",
/** 46 $efront_string_decode */ "decode",
/** 47 strings */ [15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,3,38,39,40,41,42,8,43,44,2,13,45,46,function(String, parseInt, module, $efront_string__, $efront_string__r, $efront_string__1, $efront_string__n, $efront_string__2, $efront_string__t, $efront_string__3, $efront_string__b, $efront_string__4, $efront_string__f, $efront_string__5, $efront_string__u000b, $efront_string__6, $efront_string_replac, $efront_regexp__g, $efront_string__$_, $efront_regexp__r_n_t, $efront_string_hasOwn, $efront_string_charCo, $efront_string_toStri, $efront_string_length, $efront_string__u000, $efront_string__u00, $efront_string__u0, $efront_string__u, $efront_regexp__s_S_1, $efront_string_exec, $efront_regexp__u_0_9, $efront_string_fromCh, $efront_string_slice, $efront_string_export, $efront_string_encode, $efront_string_decode) {
    var _a, _b;
    var escapeMap = (_a = {}, _a[$efront_string__] = $efront_string__r, _a[$efront_string__1] = $efront_string__n, _a[$efront_string__2] = $efront_string__t, _a[$efront_string__3] = $efront_string__b, _a[$efront_string__4] = $efront_string__f, _a[$efront_string__5] = $efront_string__u000b, _a);
    var unescapeMap = {};
    for (var k in escapeMap)
        unescapeMap[escapeMap[k]] = k;
    function encode(str) {
        return $efront_string__6 + str[$efront_string_replac]($efront_regexp__g, $efront_string__$_)[$efront_string_replac]($efront_regexp__r_n_t, function (a) {
            if (escapeMap[$efront_string_hasOwn](a))
                return escapeMap[a];
            var code = a[$efront_string_charCo](0)[$efront_string_toStri](16);
            switch (code[$efront_string_length]) {
            case 1:
                return $efront_string__u000 + code;
            case 2:
                return $efront_string__u00 + code;
            case 3:
                return $efront_string__u0 + code
            }
            return $efront_string__u + code
        }) + $efront_string__6
    }
    function decode(s) {
        var r = $efront_regexp__s_S_1[$efront_string_exec](s);
        if (!r)
            return s;
        return r[2][$efront_string_replac]($efront_regexp__u_0_9, function (a, b) {
            if (!b) {
                return String[$efront_string_fromCh](parseInt(a[$efront_string_slice](2), 16))
            }
            if (unescapeMap[$efront_string_hasOwn](a))
                return unescapeMap[a];
            return b
        })
    }
    module[$efront_string_export] = (_b = {}, _b[$efront_string_encode] = encode, _b[$efront_string_decode] = decode, _b);
    return module[$efront_string_export]
}],
/** 48 exports */ [873],
/** 49 TypeError */ typeof TypeError!=="undefined"?TypeError:void 0,
/** 50 $efront_string_ABCDEF */ "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
/** 51 $efront_string_Must_b */ /** text */ "Must be between 0 and 63: ",
/** 52 source-map$lib$base64.js */ [48,49,50,4,45,3,51,46,function(exports, TypeError, $efront_string_ABCDEF, $efront_string_split, $efront_string_encode, $efront_string_length, $efront_string_Must_b, $efront_string_decode) {
    var intToCharMap = $efront_string_ABCDEF[$efront_string_split]('');
    exports[$efront_string_encode] = function (number) {
        if (0 <= number && number < intToCharMap[$efront_string_length]) {
            return intToCharMap[number]
        }
        throw new TypeError($efront_string_Must_b + number)
    };
    exports[$efront_string_decode] = function (charCode) {
        var bigA = 65;
        var bigZ = 90;
        var littleA = 97;
        var littleZ = 122;
        var zero = 48;
        var nine = 57;
        var plus = 43;
        var slash = 47;
        var littleOffset = 26;
        var numberOffset = 52;
        if (bigA <= charCode && charCode <= bigZ) {
            return charCode - bigA
        }
        if (littleA <= charCode && charCode <= littleZ) {
            return charCode - littleA + littleOffset
        }
        if (zero <= charCode && charCode <= nine) {
            return charCode - zero + numberOffset
        }
        if (charCode == plus) {
            return 62
        }
        if (charCode == slash) {
            return 63
        }
        return -1
    };
    return exports
}],
/** 53 isString */ [17,15,13,10,function(module, String, $efront_string_export, $efront_string_string) {
    return module[$efront_string_export] = function isString(o) {
        return typeof o === $efront_string_string || o instanceof String
    }
}],
/** 54 $efront_string_object */ "object",
/** 55 isObject */ [17,13,54,function(module, $efront_string_export, $efront_string_object) {
    return module[$efront_string_export] = function isObject(o) {
        return o !== null && typeof o === $efront_string_object
    }
}],
/** 56 Number */ Number,
/** 57 $efront_string_number */ "number",
/** 58 isNumber */ [56,57,function(Number, $efront_string_number) {
    function isNumber(o) {
        return typeof o === $efront_string_number || o instanceof Number
    }
    return isNumber
}],
/** 59 $efront_string_functi */ "function",
/** 60 isFunction */ [59,function($efront_string_functi) {
    function isFunction(o) {
        return typeof o === $efront_string_functi
    }
    return isFunction
}],
/** 61 Error */ Error,
/** 62 Array */ Array,
/** 63 Object */ Object,
/** 64 Math */ Math,
/** 65 $efront_string_round */ "round",
/** 66 $efront_string_random */ "random",
/** 67 $efront_string_quickS */ "quickSort",
/** 68 source-map$lib$quick-sort.js */ [64,48,65,66,67,3,function(Math, exports, $efront_string_round, $efront_string_random, $efront_string_quickS, $efront_string_length) {
    function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y];
        ary[y] = temp
    }
    function randomIntInRange(low, high) {
        return Math[$efront_string_round](low + Math[$efront_string_random]() * (high - low))
    }
    function doQuickSort(ary, comparator, p, r) {
        if (p < r) {
            var pivotIndex = randomIntInRange(p, r);
            var i = p - 1;
            swap(ary, pivotIndex, r);
            var pivot = ary[r];
            for (var j = p; j < r; j++) {
                if (comparator(ary[j], pivot) <= 0) {
                    i += 1;
                    swap(ary, i, j)
                }
            }
            swap(ary, i + 1, j);
            var q = i + 1;
            doQuickSort(ary, comparator, p, q - 1);
            doQuickSort(ary, comparator, q + 1, r)
        }
    }
    exports[$efront_string_quickS] = function (ary, comparator) {
        doQuickSort(ary, comparator, 0, ary[$efront_string_length] - 1)
    };
    return exports
}],
/** 69 $efront_string_GREATE */ "GREATEST_LOWER_BOUND",
/** 70 $efront_string_LEAST_ */ "LEAST_UPPER_BOUND",
/** 71 $efront_string_floor */ "floor",
/** 72 $efront_string_search */ "search",
/** 73 source-map$lib$binary-search.js */ [48,64,69,70,71,3,72,function(exports, Math, $efront_string_GREATE, $efront_string_LEAST_, $efront_string_floor, $efront_string_length, $efront_string_search) {
    exports[$efront_string_GREATE] = 1;
    exports[$efront_string_LEAST_] = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
        var mid = Math[$efront_string_floor]((aHigh - aLow) / 2) + aLow;
        var cmp = aCompare(aNeedle, aHaystack[mid], true);
        if (cmp === 0) {
            return mid
        } else if (cmp > 0) {
            if (aHigh - mid > 1) {
                return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias)
            }
            if (aBias == exports[$efront_string_LEAST_]) {
                return aHigh < aHaystack[$efront_string_length] ? aHigh : -1
            } else {
                return mid
            }
        } else {
            if (mid - aLow > 1) {
                return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias)
            }
            if (aBias == exports[$efront_string_LEAST_]) {
                return mid
            } else {
                return aLow < 0 ? -1 : aLow
            }
        }
    }
    exports[$efront_string_search] = function search(aNeedle, aHaystack, aCompare, aBias) {
        if (aHaystack[$efront_string_length] === 0) {
            return -1
        }
        var index = recursiveSearch(-1, aHaystack[$efront_string_length], aNeedle, aHaystack, aCompare, aBias || exports[$efront_string_GREATE]);
        if (index < 0) {
            return -1
        }
        while (index - 1 >= 0) {
            if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
                break
            }
            --index
        }
        return index
    };
    return exports
}],
/** 74 $efront_string_Expect */ /** text */ "Expected more digits in base 64 VLQ value.",
/** 75 $efront_string_Invali */ /** text */ "Invalid base64 digit: ",
/** 76 $efront_string_charAt */ "charAt",
/** 77 $efront_string_value */ "value",
/** 78 $efront_string_rest */ "rest",
/** 79 source-map$lib$base64-vlq.js */ [1,48,61,45,46,3,74,36,75,76,77,78,function(require, exports, Error, $efront_string_encode, $efront_string_decode, $efront_string_length, $efront_string_Expect, $efront_string_charCo, $efront_string_Invali, $efront_string_charAt, $efront_string_value, $efront_string_rest) {
    var base64 = require(52);
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
        return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0
    }
    function fromVLQSigned(aValue) {
        var isNegative = (aValue & 1) === 1;
        var shifted = aValue >> 1;
        return isNegative ? -shifted : shifted
    }
    exports[$efront_string_encode] = function base64VLQ_encode(aValue) {
        var encoded = '';
        var digit;
        var vlq = toVLQSigned(aValue);
        do {
            digit = vlq & VLQ_BASE_MASK;
            vlq >>>= VLQ_BASE_SHIFT;
            if (vlq > 0) {
                digit |= VLQ_CONTINUATION_BIT
            }
            encoded += base64[$efront_string_encode](digit)
        } while (vlq > 0);
        return encoded
    };
    exports[$efront_string_decode] = function base64VLQ_decode(aStr, aIndex, aOutParam) {
        var strLen = aStr[$efront_string_length];
        var result = 0;
        var shift = 0;
        var continuation, digit;
        do {
            if (aIndex >= strLen) {
                throw new Error($efront_string_Expect)
            }
            digit = base64[$efront_string_decode](aStr[$efront_string_charCo](aIndex++));
            if (digit === -1) {
                throw new Error($efront_string_Invali + aStr[$efront_string_charAt](aIndex - 1))
            }
            continuation = !!(digit & VLQ_CONTINUATION_BIT);
            digit &= VLQ_BASE_MASK;
            result = result + (digit << shift);
            shift += VLQ_BASE_SHIFT
        } while (continuation);
        aOutParam[$efront_string_value] = fromVLQSigned(result);
        aOutParam[$efront_string_rest] = aIndex
    };
    return exports
}],
/** 80 Map */ typeof Map!=="undefined"?Map:void 0,
/** 81 Function */ Function,
/** 82 Date */ Date,
/** 83 Boolean */ typeof Boolean!=="undefined"?Boolean:void 0,
/** 84 isNaN */ isNaN,
/** 85 $efront_string_string1 */ /** text */ "stringify json failed!",
/** 86 $efront_string_parse_ */ /** text */ "parse json failed!",
/** 87 $efront_regexp__s_S_g */ /\\[\s\S]|"/g,
/** 88 $efront_string_lastIn */ "lastIndex",
/** 89 $efront_string__7 */ "-",
/** 90 $efront_regexp__0_1_9 */ /(?:0|[1-9]\d*)(?:\.\d*)?(e\-?\d+)?/g,
/** 91 $efront_regexp__null_ */ /null|false|true/g,
/** 92 $efront_string_index */ "index",
/** 93 $efront_regexp__s_g */ /[^\s]/g,
/** 94 $efront_string__8 */ "]",
/** 95 $efront_string__9 */ "}",
/** 96 $efront_string__10 */ "{",
/** 97 $efront_string__11 */ ":",
/** 98 $efront_string__12 */ ",",
/** 99 $efront_string__13 */ "[",
/** 100 $efront_string_n */ "n",
/** 101 $efront_string_f */ "f",
/** 102 $efront_string_t */ "t",
/** 103 $efront_string_return */ /** text */ "return ",
/** 104 $efront_string__14 */ /** text */ " ",
/** 105 $efront_string_pop */ "pop",
/** 106 $efront_string_toISOS */ "toISOString",
/** 107 $efront_string_null */ "null",
/** 108 $efront_string_valueO */ "valueOf",
/** 109 $efront_string_boolea */ "boolean",
/** 110 $efront_string_push */ "push",
/** 111 $efront_string_keys */ "keys",
/** 112 $efront_string_parse */ "parse",
/** 113 $efront_string_string2 */ "stringify",
/** 114 JSON */ [15,81,58,62,53,47,60,82,55,83,56,84,63,85,86,76,30,87,88,3,8,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,11,104,45,105,106,54,107,108,57,109,10,110,111,20,9,2,112,113,function(String, Function, isNumber, Array, isString, strings, isFunction, Date, isObject, Boolean, Number, isNaN, Object, $efront_string_string1, $efront_string_parse_, $efront_string_charAt, $efront_string__6, $efront_regexp__s_S_g, $efront_string_lastIn, $efront_string_length, $efront_string_exec, $efront_string__7, $efront_regexp__0_1_9, $efront_regexp__null_, $efront_string_index, $efront_regexp__s_g, $efront_string__8, $efront_string__9, $efront_string__10, $efront_string__11, $efront_string__12, $efront_string__13, $efront_string_n, $efront_string_f, $efront_string_t, $efront_string_return, $efront_string_join, $efront_string__14, $efront_string_encode, $efront_string_pop, $efront_string_toISOS, $efront_string_object, $efront_string_null, $efront_string_valueO, $efront_string_number, $efront_string_boolea, $efront_string_string, $efront_string_push, $efront_string_keys, $efront_string__1, $efront_string_indexO, $efront_string_slice, $efront_string_parse, $efront_string_string2) {
    var _a;
    var stringify_failed_error_message = $efront_string_string1;
    var parse_failed_error_message = $efront_string_parse_;
    var scan_string = function (str, start) {
        if (str[$efront_string_charAt](start) !== $efront_string__6)
            return false;
        var reg = $efront_regexp__s_S_g;
        reg[$efront_string_lastIn] = start + 1;
        while (reg[$efront_string_lastIn] < str[$efront_string_length]) {
            var match = reg[$efront_string_exec](str);
            if (!match)
                return false;
            if (match[0] === $efront_string__6)
                break
        }
        return reg[$efront_string_lastIn]
    };
    var scan_number = function (str, start) {
        if (str[$efront_string_charAt](start) === $efront_string__7)
            start++;
        var reg = $efront_regexp__0_1_9;
        reg[$efront_string_lastIn] = start;
        var match = reg[$efront_string_exec](str);
        if (!match)
            return false;
        return reg[$efront_string_lastIn]
    };
    var scan_null = function (str, start) {
        var reg = $efront_regexp__null_;
        reg[$efront_string_lastIn] = start;
        var match = reg[$efront_string_exec](str);
        if (match && match[$efront_string_index] === start)
            return reg[$efront_string_lastIn];
        return false
    };
    var scan_blank = function (str, start) {
        var reg = $efront_regexp__s_g;
        reg[$efront_string_lastIn] = start;
        var match = reg[$efront_string_exec](str);
        if (match)
            return match[$efront_string_index];
        return str[$efront_string_length]
    };
    var _safeparse = function (str, start) {
        start = scan_blank(str, start);
        switch (str[$efront_string_charAt](start)) {
        case $efront_string__8:
        case $efront_string__9:
            return start;
        case $efront_string__6:
            start = scan_string(str, start);
            break;
        case $efront_string__10:
            var end = str[$efront_string_length];
            start++;
            if (start >= end)
                return false;
            while (start < end) {
                start = _safeparse(str, start);
                if (start === false)
                    return start;
                start = scan_blank(str, start);
                if (str[$efront_string_charAt](start) === $efront_string__9)
                    return start + 1;
                if (str[$efront_string_charAt](start) !== $efront_string__11)
                    return false;
                start++;
                start = _safeparse(str, start);
                if (start === false)
                    return start;
                start = scan_blank(str, start);
                if (str[$efront_string_charAt](start) === $efront_string__12) {
                    start++;
                    continue
                }
                if (str[$efront_string_charAt](start) !== $efront_string__9) {
                    return false
                }
                start++;
                break
            }
            break;
        case $efront_string__13:
            var end = str[$efront_string_length];
            start++;
            if (start >= end)
                return false;
            while (start < end) {
                start = _safeparse(str, start);
                if (start === false)
                    return start;
                start = scan_blank(str, start);
                if (str[$efront_string_charAt](start) === $efront_string__12) {
                    start++;
                    continue
                }
                if (str[$efront_string_charAt](start) !== $efront_string__8) {
                    return false
                }
                start++;
                break
            }
            break;
        case $efront_string_n:
        case $efront_string_f:
        case $efront_string_t:
            start = scan_null(str, start);
            break;
        default:
            start = scan_number(str, start)
        }
        if (start === false)
            return start;
        return scan_blank(str, start)
    };
    var parse = function (string) {
        string = String(string);
        var parsed = _safeparse(string, 0);
        if (parsed === string[$efront_string_length]) {
            return new Function($efront_string_return + string)()
        } else {
            throw parse_failed_error_message
        }
    };
    var stringify = function (object, filter, space) {
        if (isNumber(space)) {
            space = new Array(space + 1)[$efront_string_join]($efront_string__14)
        }
        if (!isString(space)) {
            space = ''
        }
        var res = getString(object, filter, space);
        if (res[$efront_string_length])
            return res[$efront_string_join]('')
    };
    var toString = strings[$efront_string_encode];
    var getString = function (object, filter, space) {
        var hasFilter = isFunction(filter);
        var pop = function () {
            objects[$efront_string_pop]();
            keys[$efront_string_pop]()
        };
        var get = function (object) {
            if (object instanceof Date) {
                object = object[$efront_string_toISOS]()
            }
            if (hasFilter) {
                var object1 = filter(key, object);
                if (isObject(object1) && object !== object1) {
                    object1 = getString(object1, filter, space)
                }
                object = object1
            }
            switch (typeof object) {
            case $efront_string_object:
                if (object === null) {
                    return $efront_string_null
                }
                if (object instanceof Boolean || object instanceof Number) {
                    object = object[$efront_string_valueO]();
                    return String(object)
                }
                if (object instanceof String) {
                    return toString(object)
                }
                if (isObject(object)) {
                    return object
                }
            case $efront_string_number:
                if (isNaN(object) || object === Infinity) {
                    object = null
                }
            case $efront_string_boolea:
                return String(object);
            case $efront_string_string:
                return toString(object);
            default:
                if (!ks && objects[$efront_string_length] > 1) {
                    return $efront_string_null
                }
            }
        };
        var key = '', cx, ks, result = [], objects = [], keys = [[0]];
        object = get(object);
        if (isObject(object))
            objects[$efront_string_push](object);
        else if (object)
            result[$efront_string_push](object);
        while (objects[$efront_string_length]) {
            var object = objects[objects[$efront_string_length] - 1];
            var key1 = keys[keys[$efront_string_length] - 1];
            var cx = key1[0], ks = key1[1];
            if (!(object instanceof Array) && !ks) {
                key1[1] = ks = Object[$efront_string_keys](object)
            }
            var str = '';
            if (cx === 0) {
                str += ks ? $efront_string__10 : $efront_string__13
            }
            var dx = (ks ? ks : object)[$efront_string_length];
            while (cx < dx) {
                key = ks ? ks[cx] : cx;
                var backlength = str[$efront_string_length];
                if (cx > 0)
                    str += $efront_string__12;
                if (space)
                    str += $efront_string__1 + new Array(objects[$efront_string_length] + 1)[$efront_string_join](space);
                if (ks) {
                    str += toString(key) + $efront_string__11;
                    if (space)
                        str += $efront_string__14
                }
                ;
                var v = get(object[key]);
                if (isObject(v)) {
                    key1[0] = cx + 1;
                    if (objects[$efront_string_indexO](v) >= 0)
                        throw stringify_failed_error_message;
                    objects[$efront_string_push](v);
                    keys[$efront_string_push]([0]);
                    break
                } else if (v) {
                    str += v
                } else {
                    str = str[$efront_string_slice](0, backlength)
                }
                cx++
            }
            if (cx === dx) {
                if (dx > 0) {
                    if (space)
                        str += $efront_string__1 + new Array(objects[$efront_string_length])[$efront_string_join](space)
                }
                str += ks ? $efront_string__9 : $efront_string__8;
                pop()
            }
            result[$efront_string_push](str)
        }
        return result
    };
    var JSON = (_a = {}, _a[$efront_string_parse] = parse, _a[$efront_string_string2] = stringify, _a);
    return JSON
}],
/** 115 undefined */ [function() {
    return void 0
}],
/** 116 $efront_string_NonAsc */ "NonAsciiIdentifierStart",
/** 117 $efront_regexp__xAA_x */ /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
/** 118 $efront_string_NonAsc1 */ "NonAsciiIdentifierPart",
/** 119 $efront_regexp__xAA_x1 */ /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
/** 120 $efront_regexp__xAA_x2 */ /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
/** 121 $efront_regexp__xAA_x3 */ /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/,
/** 122 $efront_string_test */ "test",
/** 123 $efront_string_isDeci */ "isDecimalDigit",
/** 124 $efront_string_isHexD */ "isHexDigit",
/** 125 $efront_string_isOcta */ "isOctalDigit",
/** 126 $efront_string_isWhit */ "isWhiteSpace",
/** 127 $efront_string_isLine */ "isLineTerminator",
/** 128 $efront_string_isIden */ "isIdentifierStartES5",
/** 129 $efront_string_isIden1 */ "isIdentifierPartES5",
/** 130 $efront_string_isIden2 */ "isIdentifierStartES6",
/** 131 $efront_string_isIden3 */ "isIdentifierPartES6",
/** 132 esutils$lib$code.js */ [15,64,62,17,116,117,118,119,120,121,9,44,71,122,13,123,124,125,126,127,128,129,130,131,function(String, Math, Array, module, $efront_string_NonAsc, $efront_regexp__xAA_x, $efront_string_NonAsc1, $efront_regexp__xAA_x1, $efront_regexp__xAA_x2, $efront_regexp__xAA_x3, $efront_string_indexO, $efront_string_fromCh, $efront_string_floor, $efront_string_test, $efront_string_export, $efront_string_isDeci, $efront_string_isHexD, $efront_string_isOcta, $efront_string_isWhit, $efront_string_isLine, $efront_string_isIden, $efront_string_isIden1, $efront_string_isIden2, $efront_string_isIden3) {
    return function () {
        'use strict';
        var _a, _b, _c;
        var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;
        ES5Regex = (_a = {}, _a[$efront_string_NonAsc] = $efront_regexp__xAA_x, _a[$efront_string_NonAsc1] = $efront_regexp__xAA_x1, _a);
        ES6Regex = (_b = {}, _b[$efront_string_NonAsc] = $efront_regexp__xAA_x2, _b[$efront_string_NonAsc1] = $efront_regexp__xAA_x3, _b);
        function isDecimalDigit(ch) {
            return 48 <= ch && ch <= 57
        }
        function isHexDigit(ch) {
            return 48 <= ch && ch <= 57 || 97 <= ch && ch <= 102 || 65 <= ch && ch <= 70
        }
        function isOctalDigit(ch) {
            return ch >= 48 && ch <= 55
        }
        NON_ASCII_WHITESPACES = [
            5760,
            8192,
            8193,
            8194,
            8195,
            8196,
            8197,
            8198,
            8199,
            8200,
            8201,
            8202,
            8239,
            8287,
            12288,
            65279
        ];
        function isWhiteSpace(ch) {
            return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch >= 5760 && NON_ASCII_WHITESPACES[$efront_string_indexO](ch) >= 0
        }
        function isLineTerminator(ch) {
            return ch === 10 || ch === 13 || ch === 8232 || ch === 8233
        }
        function fromCodePoint(cp) {
            if (cp <= 65535) {
                return String[$efront_string_fromCh](cp)
            }
            var cu1 = String[$efront_string_fromCh](Math[$efront_string_floor]((cp - 65536) / 1024) + 55296);
            var cu2 = String[$efront_string_fromCh]((cp - 65536) % 1024 + 56320);
            return cu1 + cu2
        }
        IDENTIFIER_START = new Array(128);
        for (ch = 0; ch < 128; ++ch) {
            IDENTIFIER_START[ch] = ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch === 36 || ch === 95
        }
        IDENTIFIER_PART = new Array(128);
        for (ch = 0; ch < 128; ++ch) {
            IDENTIFIER_PART[ch] = ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch >= 48 && ch <= 57 || ch === 36 || ch === 95
        }
        function isIdentifierStartES5(ch) {
            return ch < 128 ? IDENTIFIER_START[ch] : ES5Regex[$efront_string_NonAsc][$efront_string_test](fromCodePoint(ch))
        }
        function isIdentifierPartES5(ch) {
            return ch < 128 ? IDENTIFIER_PART[ch] : ES5Regex[$efront_string_NonAsc1][$efront_string_test](fromCodePoint(ch))
        }
        function isIdentifierStartES6(ch) {
            return ch < 128 ? IDENTIFIER_START[ch] : ES6Regex[$efront_string_NonAsc][$efront_string_test](fromCodePoint(ch))
        }
        function isIdentifierPartES6(ch) {
            return ch < 128 ? IDENTIFIER_PART[ch] : ES6Regex[$efront_string_NonAsc1][$efront_string_test](fromCodePoint(ch))
        }
        module[$efront_string_export] = (_c = {}, _c[$efront_string_isDeci] = isDecimalDigit, _c[$efront_string_isHexD] = isHexDigit, _c[$efront_string_isOcta] = isOctalDigit, _c[$efront_string_isWhit] = isWhiteSpace, _c[$efront_string_isLine] = isLineTerminator, _c[$efront_string_isIden] = isIdentifierStartES5, _c[$efront_string_isIden1] = isIdentifierPartES5, _c[$efront_string_isIden2] = isIdentifierStartES6, _c[$efront_string_isIden3] = isIdentifierPartES6, _c)
    }()
}],
/** 133 $efront_string_type */ "type",
/** 134 $efront_string_ArrayE */ "ArrayExpression",
/** 135 $efront_string_Assign */ "AssignmentExpression",
/** 136 $efront_string_Binary */ "BinaryExpression",
/** 137 $efront_string_CallEx */ "CallExpression",
/** 138 $efront_string_Condit */ "ConditionalExpression",
/** 139 $efront_string_Functi */ "FunctionExpression",
/** 140 $efront_string_Identi */ "Identifier",
/** 141 $efront_string_Litera */ "Literal",
/** 142 $efront_string_Logica */ "LogicalExpression",
/** 143 $efront_string_Member */ "MemberExpression",
/** 144 $efront_string_NewExp */ "NewExpression",
/** 145 $efront_string_Object */ "ObjectExpression",
/** 146 $efront_string_Sequen */ "SequenceExpression",
/** 147 $efront_string_ThisEx */ "ThisExpression",
/** 148 $efront_string_UnaryE */ "UnaryExpression",
/** 149 $efront_string_Update */ "UpdateExpression",
/** 150 $efront_string_DoWhil */ "DoWhileStatement",
/** 151 $efront_string_ForInS */ "ForInStatement",
/** 152 $efront_string_ForSta */ "ForStatement",
/** 153 $efront_string_WhileS */ "WhileStatement",
/** 154 $efront_string_BlockS */ "BlockStatement",
/** 155 $efront_string_BreakS */ "BreakStatement",
/** 156 $efront_string_Contin */ "ContinueStatement",
/** 157 $efront_string_Debugg */ "DebuggerStatement",
/** 158 $efront_string_EmptyS */ "EmptyStatement",
/** 159 $efront_string_Expres */ "ExpressionStatement",
/** 160 $efront_string_IfStat */ "IfStatement",
/** 161 $efront_string_Labele */ "LabeledStatement",
/** 162 $efront_string_Return */ "ReturnStatement",
/** 163 $efront_string_Switch */ "SwitchStatement",
/** 164 $efront_string_ThrowS */ "ThrowStatement",
/** 165 $efront_string_TrySta */ "TryStatement",
/** 166 $efront_string_Variab */ "VariableDeclaration",
/** 167 $efront_string_WithSt */ "WithStatement",
/** 168 $efront_string_Functi1 */ "FunctionDeclaration",
/** 169 $efront_string_altern */ "alternate",
/** 170 $efront_string_conseq */ "consequent",
/** 171 $efront_string_body */ "body",
/** 172 $efront_string_isExpr */ "isExpression",
/** 173 $efront_string_isStat */ "isStatement",
/** 174 $efront_string_isIter */ "isIterationStatement",
/** 175 $efront_string_isSour */ "isSourceElement",
/** 176 $efront_string_isProb */ "isProblematicIfStatement",
/** 177 $efront_string_traili */ "trailingStatement",
/** 178 esutils$lib$ast.js */ [17,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,13,172,173,174,175,176,177,function(module, $efront_string_type, $efront_string_ArrayE, $efront_string_Assign, $efront_string_Binary, $efront_string_CallEx, $efront_string_Condit, $efront_string_Functi, $efront_string_Identi, $efront_string_Litera, $efront_string_Logica, $efront_string_Member, $efront_string_NewExp, $efront_string_Object, $efront_string_Sequen, $efront_string_ThisEx, $efront_string_UnaryE, $efront_string_Update, $efront_string_DoWhil, $efront_string_ForInS, $efront_string_ForSta, $efront_string_WhileS, $efront_string_BlockS, $efront_string_BreakS, $efront_string_Contin, $efront_string_Debugg, $efront_string_EmptyS, $efront_string_Expres, $efront_string_IfStat, $efront_string_Labele, $efront_string_Return, $efront_string_Switch, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_Variab, $efront_string_WithSt, $efront_string_Functi1, $efront_string_altern, $efront_string_conseq, $efront_string_body, $efront_string_export, $efront_string_isExpr, $efront_string_isStat, $efront_string_isIter, $efront_string_isSour, $efront_string_isProb, $efront_string_traili) {
    return function () {
        'use strict';
        var _a;
        function isExpression(node) {
            if (node == null) {
                return false
            }
            switch (node[$efront_string_type]) {
            case $efront_string_ArrayE:
            case $efront_string_Assign:
            case $efront_string_Binary:
            case $efront_string_CallEx:
            case $efront_string_Condit:
            case $efront_string_Functi:
            case $efront_string_Identi:
            case $efront_string_Litera:
            case $efront_string_Logica:
            case $efront_string_Member:
            case $efront_string_NewExp:
            case $efront_string_Object:
            case $efront_string_Sequen:
            case $efront_string_ThisEx:
            case $efront_string_UnaryE:
            case $efront_string_Update:
                return true
            }
            return false
        }
        function isIterationStatement(node) {
            if (node == null) {
                return false
            }
            switch (node[$efront_string_type]) {
            case $efront_string_DoWhil:
            case $efront_string_ForInS:
            case $efront_string_ForSta:
            case $efront_string_WhileS:
                return true
            }
            return false
        }
        function isStatement(node) {
            if (node == null) {
                return false
            }
            switch (node[$efront_string_type]) {
            case $efront_string_BlockS:
            case $efront_string_BreakS:
            case $efront_string_Contin:
            case $efront_string_Debugg:
            case $efront_string_DoWhil:
            case $efront_string_EmptyS:
            case $efront_string_Expres:
            case $efront_string_ForInS:
            case $efront_string_ForSta:
            case $efront_string_IfStat:
            case $efront_string_Labele:
            case $efront_string_Return:
            case $efront_string_Switch:
            case $efront_string_ThrowS:
            case $efront_string_TrySta:
            case $efront_string_Variab:
            case $efront_string_WhileS:
            case $efront_string_WithSt:
                return true
            }
            return false
        }
        function isSourceElement(node) {
            return isStatement(node) || node != null && node[$efront_string_type] === $efront_string_Functi1
        }
        function trailingStatement(node) {
            switch (node[$efront_string_type]) {
            case $efront_string_IfStat:
                if (node[$efront_string_altern] != null) {
                    return node[$efront_string_altern]
                }
                return node[$efront_string_conseq];
            case $efront_string_Labele:
            case $efront_string_ForSta:
            case $efront_string_ForInS:
            case $efront_string_WhileS:
            case $efront_string_WithSt:
                return node[$efront_string_body]
            }
            return null
        }
        function isProblematicIfStatement(node) {
            var current;
            if (node[$efront_string_type] !== $efront_string_IfStat) {
                return false
            }
            if (node[$efront_string_altern] == null) {
                return false
            }
            current = node[$efront_string_conseq];
            do {
                if (current[$efront_string_type] === $efront_string_IfStat) {
                    if (current[$efront_string_altern] == null) {
                        return true
                    }
                }
                current = trailingStatement(current)
            } while (current);
            return false
        }
        module[$efront_string_export] = (_a = {}, _a[$efront_string_isExpr] = isExpression, _a[$efront_string_isStat] = isStatement, _a[$efront_string_isIter] = isIterationStatement, _a[$efront_string_isSour] = isSourceElement, _a[$efront_string_isProb] = isProblematicIfStatement, _a[$efront_string_traili] = trailingStatement, _a)
    }()
}],
/** 179 $efront_string_Assign1 */ "AssignmentPattern",
/** 180 $efront_string_ArrayP */ "ArrayPattern",
/** 181 $efront_string_ArrowF */ "ArrowFunctionExpression",
/** 182 $efront_string_AwaitE */ "AwaitExpression",
/** 183 $efront_string_CatchC */ "CatchClause",
/** 184 $efront_string_ChainE */ "ChainExpression",
/** 185 $efront_string_ClassB */ "ClassBody",
/** 186 $efront_string_ClassD */ "ClassDeclaration",
/** 187 $efront_string_ClassE */ "ClassExpression",
/** 188 $efront_string_Compre */ "ComprehensionBlock",
/** 189 $efront_string_Compre1 */ "ComprehensionExpression",
/** 190 $efront_string_Direct */ "DirectiveStatement",
/** 191 $efront_string_Export */ "ExportAllDeclaration",
/** 192 $efront_string_Export1 */ "ExportDefaultDeclaration",
/** 193 $efront_string_Export2 */ "ExportNamedDeclaration",
/** 194 $efront_string_Export3 */ "ExportSpecifier",
/** 195 $efront_string_ForOfS */ "ForOfStatement",
/** 196 $efront_string_Genera */ "GeneratorExpression",
/** 197 $efront_string_Import */ "ImportExpression",
/** 198 $efront_string_Import1 */ "ImportDeclaration",
/** 199 $efront_string_Import2 */ "ImportDefaultSpecifier",
/** 200 $efront_string_Import3 */ "ImportNamespaceSpecifier",
/** 201 $efront_string_Import4 */ "ImportSpecifier",
/** 202 $efront_string_MetaPr */ "MetaProperty",
/** 203 $efront_string_Method */ "MethodDefinition",
/** 204 $efront_string_Module */ "ModuleSpecifier",
/** 205 $efront_string_Object1 */ "ObjectPattern",
/** 206 $efront_string_Progra */ "Program",
/** 207 $efront_string_Proper */ "Property",
/** 208 $efront_string_RestEl */ "RestElement",
/** 209 $efront_string_Spread */ "SpreadElement",
/** 210 $efront_string_Super */ "Super",
/** 211 $efront_string_Switch1 */ "SwitchCase",
/** 212 $efront_string_Tagged */ "TaggedTemplateExpression",
/** 213 $efront_string_Templa */ "TemplateElement",
/** 214 $efront_string_Templa1 */ "TemplateLiteral",
/** 215 $efront_string_Variab1 */ "VariableDeclarator",
/** 216 $efront_string_YieldE */ "YieldExpression",
/** 217 $efront_string_left */ "left",
/** 218 $efront_string_right */ "right",
/** 219 $efront_string_elemen */ "elements",
/** 220 $efront_string_params */ "params",
/** 221 $efront_string_argume */ "argument",
/** 222 $efront_string_label */ "label",
/** 223 $efront_string_callee */ "callee",
/** 224 $efront_string_argume1 */ "arguments",
/** 225 $efront_string_param */ "param",
/** 226 $efront_string_expres */ "expression",
/** 227 $efront_string_id */ "id",
/** 228 $efront_string_superC */ "superClass",
/** 229 $efront_string_blocks */ "blocks",
/** 230 $efront_string_filter */ "filter",
/** 231 $efront_string_source */ "source",
/** 232 $efront_string_declar */ "declaration",
/** 233 $efront_string_specif */ "specifiers",
/** 234 $efront_string_export1 */ "exported",
/** 235 $efront_string_local */ "local",
/** 236 $efront_string_init */ "init",
/** 237 $efront_string_update */ "update",
/** 238 $efront_string_import */ "imported",
/** 239 $efront_string_proper */ "property",
/** 240 $efront_string_meta */ "meta",
/** 241 $efront_string_key */ "key",
/** 242 $efront_string_proper1 */ "properties",
/** 243 $efront_string_expres1 */ "expressions",
/** 244 $efront_string_discri */ "discriminant",
/** 245 $efront_string_cases */ "cases",
/** 246 $efront_string_tag */ "tag",
/** 247 $efront_string_quasi */ "quasi",
/** 248 $efront_string_quasis */ "quasis",
/** 249 $efront_string_block */ "block",
/** 250 $efront_string_handle */ "handler",
/** 251 $efront_string_finali */ "finalizer",
/** 252 $efront_string_declar1 */ "declarations",
/** 253 $efront_string_Break */ "Break",
/** 254 $efront_string_Skip */ "Skip",
/** 255 $efront_string_Remove */ "Remove",
/** 256 $efront_string_parent */ "parent",
/** 257 $efront_string_protot */ "prototype",
/** 258 $efront_string_remove */ "remove",
/** 259 $efront_string_isArra */ "isArray",
/** 260 $efront_string_splice */ "splice",
/** 261 $efront_string_node */ "node",
/** 262 $efront_string_path */ "path",
/** 263 $efront_string_wrap */ "wrap",
/** 264 $efront_string_ref */ "ref",
/** 265 $efront_string___curr */ "__current",
/** 266 $efront_string___leav */ "__leavelist",
/** 267 $efront_string_curren */ "current",
/** 268 $efront_string_parent1 */ "parents",
/** 269 $efront_string___exec */ "__execute",
/** 270 $efront_string___stat */ "__state",
/** 271 $efront_string_notify */ "notify",
/** 272 $efront_string_skip */ "skip",
/** 273 $efront_string_break */ "break",
/** 274 $efront_string___init */ "__initialize",
/** 275 $efront_string_visito */ "visitor",
/** 276 $efront_string_root */ "root",
/** 277 $efront_string___work */ "__worklist",
/** 278 $efront_string___fall */ "__fallback",
/** 279 $efront_string_fallba */ "fallback",
/** 280 $efront_string_iterat */ "iteration",
/** 281 $efront_string___keys */ "__keys",
/** 282 $efront_string_assign */ "assign",
/** 283 $efront_string_create */ "create",
/** 284 $efront_string_traver */ "traverse",
/** 285 $efront_string_leave */ "leave",
/** 286 $efront_string_enter */ "enter",
/** 287 $efront_string_Unknow */ /** text */ "Unknown node type ",
/** 288 $efront_string__15 */ ".",
/** 289 $efront_string_range */ "range",
/** 290 $efront_string_extend */ "extendedRange",
/** 291 $efront_string_attach */ /** text */ "attachComments needs range information",
/** 292 $efront_string_leadin */ "leadingComments",
/** 293 $efront_string_traili1 */ "trailingComments",
/** 294 $efront_string_Syntax */ "Syntax",
/** 295 $efront_string_attach1 */ "attachComments",
/** 296 $efront_string_Visito */ "VisitorKeys",
/** 297 $efront_string_Visito1 */ "VisitorOption",
/** 298 $efront_string_Contro */ "Controller",
/** 299 $efront_string_cloneE */ "cloneEnvironment",
/** 300 estraverse$estraverse.js */ [62,115,63,61,48,35,54,3,135,179,134,180,181,182,154,136,155,137,183,184,185,186,187,188,189,138,156,157,190,150,158,191,192,193,194,159,152,151,195,168,139,196,140,160,197,198,199,200,201,141,161,142,143,202,203,204,144,145,205,206,207,208,162,146,209,210,163,211,212,213,214,147,164,165,148,149,166,215,153,167,216,217,218,219,220,171,221,222,223,224,225,226,227,228,229,230,122,170,169,231,232,233,234,235,236,237,238,239,240,241,77,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,31,258,259,260,261,262,263,264,110,265,266,133,267,268,269,270,12,271,272,273,274,275,276,277,278,279,280,111,59,281,282,283,10,284,105,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,function(Array, undefined, Object, Error, exports, $efront_string_hasOwn, $efront_string_object, $efront_string_length, $efront_string_Assign, $efront_string_Assign1, $efront_string_ArrayE, $efront_string_ArrayP, $efront_string_ArrowF, $efront_string_AwaitE, $efront_string_BlockS, $efront_string_Binary, $efront_string_BreakS, $efront_string_CallEx, $efront_string_CatchC, $efront_string_ChainE, $efront_string_ClassB, $efront_string_ClassD, $efront_string_ClassE, $efront_string_Compre, $efront_string_Compre1, $efront_string_Condit, $efront_string_Contin, $efront_string_Debugg, $efront_string_Direct, $efront_string_DoWhil, $efront_string_EmptyS, $efront_string_Export, $efront_string_Export1, $efront_string_Export2, $efront_string_Export3, $efront_string_Expres, $efront_string_ForSta, $efront_string_ForInS, $efront_string_ForOfS, $efront_string_Functi1, $efront_string_Functi, $efront_string_Genera, $efront_string_Identi, $efront_string_IfStat, $efront_string_Import, $efront_string_Import1, $efront_string_Import2, $efront_string_Import3, $efront_string_Import4, $efront_string_Litera, $efront_string_Labele, $efront_string_Logica, $efront_string_Member, $efront_string_MetaPr, $efront_string_Method, $efront_string_Module, $efront_string_NewExp, $efront_string_Object, $efront_string_Object1, $efront_string_Progra, $efront_string_Proper, $efront_string_RestEl, $efront_string_Return, $efront_string_Sequen, $efront_string_Spread, $efront_string_Super, $efront_string_Switch, $efront_string_Switch1, $efront_string_Tagged, $efront_string_Templa, $efront_string_Templa1, $efront_string_ThisEx, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_UnaryE, $efront_string_Update, $efront_string_Variab, $efront_string_Variab1, $efront_string_WhileS, $efront_string_WithSt, $efront_string_YieldE, $efront_string_left, $efront_string_right, $efront_string_elemen, $efront_string_params, $efront_string_body, $efront_string_argume, $efront_string_label, $efront_string_callee, $efront_string_argume1, $efront_string_param, $efront_string_expres, $efront_string_id, $efront_string_superC, $efront_string_blocks, $efront_string_filter, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_source, $efront_string_declar, $efront_string_specif, $efront_string_export1, $efront_string_local, $efront_string_init, $efront_string_update, $efront_string_import, $efront_string_proper, $efront_string_meta, $efront_string_key, $efront_string_value, $efront_string_proper1, $efront_string_expres1, $efront_string_discri, $efront_string_cases, $efront_string_tag, $efront_string_quasi, $efront_string_quasis, $efront_string_block, $efront_string_handle, $efront_string_finali, $efront_string_declar1, $efront_string_Break, $efront_string_Skip, $efront_string_Remove, $efront_string_parent, $efront_string_protot, $efront_string_replac, $efront_string_remove, $efront_string_isArra, $efront_string_splice, $efront_string_node, $efront_string_path, $efront_string_wrap, $efront_string_ref, $efront_string_push, $efront_string___curr, $efront_string___leav, $efront_string_type, $efront_string_curren, $efront_string_parent1, $efront_string___exec, $efront_string___stat, $efront_string_call, $efront_string_notify, $efront_string_skip, $efront_string_break, $efront_string___init, $efront_string_visito, $efront_string_root, $efront_string___work, $efront_string___fall, $efront_string_fallba, $efront_string_iterat, $efront_string_keys, $efront_string_functi, $efront_string___keys, $efront_string_assign, $efront_string_create, $efront_string_string, $efront_string_traver, $efront_string_pop, $efront_string_leave, $efront_string_enter, $efront_string_Unknow, $efront_string__15, $efront_string_range, $efront_string_extend, $efront_string_attach, $efront_string_leadin, $efront_string_traili1, $efront_string_Syntax, $efront_string_attach1, $efront_string_Visito, $efront_string_Visito1, $efront_string_Contro, $efront_string_cloneE) {
    return function clone(exports) {
        'use strict';
        var _a, _b, _c;
        var Syntax, VisitorOption, VisitorKeys, BREAK, SKIP, REMOVE;
        function deepCopy(obj) {
            var ret = {}, key, val;
            for (key in obj) {
                if (obj[$efront_string_hasOwn](key)) {
                    val = obj[key];
                    if (typeof val === $efront_string_object && val !== null) {
                        ret[key] = deepCopy(val)
                    } else {
                        ret[key] = val
                    }
                }
            }
            return ret
        }
        function upperBound(array, func) {
            var diff, len, i, current;
            len = array[$efront_string_length];
            i = 0;
            while (len) {
                diff = len >>> 1;
                current = i + diff;
                if (func(array[current])) {
                    len = diff
                } else {
                    i = current + 1;
                    len -= diff + 1
                }
            }
            return i
        }
        Syntax = (_a = {}, _a[$efront_string_Assign] = $efront_string_Assign, _a[$efront_string_Assign1] = $efront_string_Assign1, _a[$efront_string_ArrayE] = $efront_string_ArrayE, _a[$efront_string_ArrayP] = $efront_string_ArrayP, _a[$efront_string_ArrowF] = $efront_string_ArrowF, _a[$efront_string_AwaitE] = $efront_string_AwaitE, _a[$efront_string_BlockS] = $efront_string_BlockS, _a[$efront_string_Binary] = $efront_string_Binary, _a[$efront_string_BreakS] = $efront_string_BreakS, _a[$efront_string_CallEx] = $efront_string_CallEx, _a[$efront_string_CatchC] = $efront_string_CatchC, _a[$efront_string_ChainE] = $efront_string_ChainE, _a[$efront_string_ClassB] = $efront_string_ClassB, _a[$efront_string_ClassD] = $efront_string_ClassD, _a[$efront_string_ClassE] = $efront_string_ClassE, _a[$efront_string_Compre] = $efront_string_Compre, _a[$efront_string_Compre1] = $efront_string_Compre1, _a[$efront_string_Condit] = $efront_string_Condit, _a[$efront_string_Contin] = $efront_string_Contin, _a[$efront_string_Debugg] = $efront_string_Debugg, _a[$efront_string_Direct] = $efront_string_Direct, _a[$efront_string_DoWhil] = $efront_string_DoWhil, _a[$efront_string_EmptyS] = $efront_string_EmptyS, _a[$efront_string_Export] = $efront_string_Export, _a[$efront_string_Export1] = $efront_string_Export1, _a[$efront_string_Export2] = $efront_string_Export2, _a[$efront_string_Export3] = $efront_string_Export3, _a[$efront_string_Expres] = $efront_string_Expres, _a[$efront_string_ForSta] = $efront_string_ForSta, _a[$efront_string_ForInS] = $efront_string_ForInS, _a[$efront_string_ForOfS] = $efront_string_ForOfS, _a[$efront_string_Functi1] = $efront_string_Functi1, _a[$efront_string_Functi] = $efront_string_Functi, _a[$efront_string_Genera] = $efront_string_Genera, _a[$efront_string_Identi] = $efront_string_Identi, _a[$efront_string_IfStat] = $efront_string_IfStat, _a[$efront_string_Import] = $efront_string_Import, _a[$efront_string_Import1] = $efront_string_Import1, _a[$efront_string_Import2] = $efront_string_Import2, _a[$efront_string_Import3] = $efront_string_Import3, _a[$efront_string_Import4] = $efront_string_Import4, _a[$efront_string_Litera] = $efront_string_Litera, _a[$efront_string_Labele] = $efront_string_Labele, _a[$efront_string_Logica] = $efront_string_Logica, _a[$efront_string_Member] = $efront_string_Member, _a[$efront_string_MetaPr] = $efront_string_MetaPr, _a[$efront_string_Method] = $efront_string_Method, _a[$efront_string_Module] = $efront_string_Module, _a[$efront_string_NewExp] = $efront_string_NewExp, _a[$efront_string_Object] = $efront_string_Object, _a[$efront_string_Object1] = $efront_string_Object1, _a[$efront_string_Progra] = $efront_string_Progra, _a[$efront_string_Proper] = $efront_string_Proper, _a[$efront_string_RestEl] = $efront_string_RestEl, _a[$efront_string_Return] = $efront_string_Return, _a[$efront_string_Sequen] = $efront_string_Sequen, _a[$efront_string_Spread] = $efront_string_Spread, _a[$efront_string_Super] = $efront_string_Super, _a[$efront_string_Switch] = $efront_string_Switch, _a[$efront_string_Switch1] = $efront_string_Switch1, _a[$efront_string_Tagged] = $efront_string_Tagged, _a[$efront_string_Templa] = $efront_string_Templa, _a[$efront_string_Templa1] = $efront_string_Templa1, _a[$efront_string_ThisEx] = $efront_string_ThisEx, _a[$efront_string_ThrowS] = $efront_string_ThrowS, _a[$efront_string_TrySta] = $efront_string_TrySta, _a[$efront_string_UnaryE] = $efront_string_UnaryE, _a[$efront_string_Update] = $efront_string_Update, _a[$efront_string_Variab] = $efront_string_Variab, _a[$efront_string_Variab1] = $efront_string_Variab1, _a[$efront_string_WhileS] = $efront_string_WhileS, _a[$efront_string_WithSt] = $efront_string_WithSt, _a[$efront_string_YieldE] = $efront_string_YieldE, _a);
        VisitorKeys = (_b = {}, _b[$efront_string_Assign] = [
            $efront_string_left,
            $efront_string_right
        ], _b[$efront_string_Assign1] = [
            $efront_string_left,
            $efront_string_right
        ], _b[$efront_string_ArrayE] = [$efront_string_elemen], _b[$efront_string_ArrayP] = [$efront_string_elemen], _b[$efront_string_ArrowF] = [
            $efront_string_params,
            $efront_string_body
        ], _b[$efront_string_AwaitE] = [$efront_string_argume], _b[$efront_string_BlockS] = [$efront_string_body], _b[$efront_string_Binary] = [
            $efront_string_left,
            $efront_string_right
        ], _b[$efront_string_BreakS] = [$efront_string_label], _b[$efront_string_CallEx] = [
            $efront_string_callee,
            $efront_string_argume1
        ], _b[$efront_string_CatchC] = [
            $efront_string_param,
            $efront_string_body
        ], _b[$efront_string_ChainE] = [$efront_string_expres], _b[$efront_string_ClassB] = [$efront_string_body], _b[$efront_string_ClassD] = [
            $efront_string_id,
            $efront_string_superC,
            $efront_string_body
        ], _b[$efront_string_ClassE] = [
            $efront_string_id,
            $efront_string_superC,
            $efront_string_body
        ], _b[$efront_string_Compre] = [
            $efront_string_left,
            $efront_string_right
        ], _b[$efront_string_Compre1] = [
            $efront_string_blocks,
            $efront_string_filter,
            $efront_string_body
        ], _b[$efront_string_Condit] = [
            $efront_string_test,
            $efront_string_conseq,
            $efront_string_altern
        ], _b[$efront_string_Contin] = [$efront_string_label], _b[$efront_string_Debugg] = [], _b[$efront_string_Direct] = [], _b[$efront_string_DoWhil] = [
            $efront_string_body,
            $efront_string_test
        ], _b[$efront_string_EmptyS] = [], _b[$efront_string_Export] = [$efront_string_source], _b[$efront_string_Export1] = [$efront_string_declar], _b[$efront_string_Export2] = [
            $efront_string_declar,
            $efront_string_specif,
            $efront_string_source
        ], _b[$efront_string_Export3] = [
            $efront_string_export1,
            $efront_string_local
        ], _b[$efront_string_Expres] = [$efront_string_expres], _b[$efront_string_ForSta] = [
            $efront_string_init,
            $efront_string_test,
            $efront_string_update,
            $efront_string_body
        ], _b[$efront_string_ForInS] = [
            $efront_string_left,
            $efront_string_right,
            $efront_string_body
        ], _b[$efront_string_ForOfS] = [
            $efront_string_left,
            $efront_string_right,
            $efront_string_body
        ], _b[$efront_string_Functi1] = [
            $efront_string_id,
            $efront_string_params,
            $efront_string_body
        ], _b[$efront_string_Functi] = [
            $efront_string_id,
            $efront_string_params,
            $efront_string_body
        ], _b[$efront_string_Genera] = [
            $efront_string_blocks,
            $efront_string_filter,
            $efront_string_body
        ], _b[$efront_string_Identi] = [], _b[$efront_string_IfStat] = [
            $efront_string_test,
            $efront_string_conseq,
            $efront_string_altern
        ], _b[$efront_string_Import] = [$efront_string_source], _b[$efront_string_Import1] = [
            $efront_string_specif,
            $efront_string_source
        ], _b[$efront_string_Import2] = [$efront_string_local], _b[$efront_string_Import3] = [$efront_string_local], _b[$efront_string_Import4] = [
            $efront_string_import,
            $efront_string_local
        ], _b[$efront_string_Litera] = [], _b[$efront_string_Labele] = [
            $efront_string_label,
            $efront_string_body
        ], _b[$efront_string_Logica] = [
            $efront_string_left,
            $efront_string_right
        ], _b[$efront_string_Member] = [
            $efront_string_object,
            $efront_string_proper
        ], _b[$efront_string_MetaPr] = [
            $efront_string_meta,
            $efront_string_proper
        ], _b[$efront_string_Method] = [
            $efront_string_key,
            $efront_string_value
        ], _b[$efront_string_Module] = [], _b[$efront_string_NewExp] = [
            $efront_string_callee,
            $efront_string_argume1
        ], _b[$efront_string_Object] = [$efront_string_proper1], _b[$efront_string_Object1] = [$efront_string_proper1], _b[$efront_string_Progra] = [$efront_string_body], _b[$efront_string_Proper] = [
            $efront_string_key,
            $efront_string_value
        ], _b[$efront_string_RestEl] = [$efront_string_argume], _b[$efront_string_Return] = [$efront_string_argume], _b[$efront_string_Sequen] = [$efront_string_expres1], _b[$efront_string_Spread] = [$efront_string_argume], _b[$efront_string_Super] = [], _b[$efront_string_Switch] = [
            $efront_string_discri,
            $efront_string_cases
        ], _b[$efront_string_Switch1] = [
            $efront_string_test,
            $efront_string_conseq
        ], _b[$efront_string_Tagged] = [
            $efront_string_tag,
            $efront_string_quasi
        ], _b[$efront_string_Templa] = [], _b[$efront_string_Templa1] = [
            $efront_string_quasis,
            $efront_string_expres1
        ], _b[$efront_string_ThisEx] = [], _b[$efront_string_ThrowS] = [$efront_string_argume], _b[$efront_string_TrySta] = [
            $efront_string_block,
            $efront_string_handle,
            $efront_string_finali
        ], _b[$efront_string_UnaryE] = [$efront_string_argume], _b[$efront_string_Update] = [$efront_string_argume], _b[$efront_string_Variab] = [$efront_string_declar1], _b[$efront_string_Variab1] = [
            $efront_string_id,
            $efront_string_init
        ], _b[$efront_string_WhileS] = [
            $efront_string_test,
            $efront_string_body
        ], _b[$efront_string_WithSt] = [
            $efront_string_object,
            $efront_string_body
        ], _b[$efront_string_YieldE] = [$efront_string_argume], _b);
        BREAK = {};
        SKIP = {};
        REMOVE = {};
        VisitorOption = (_c = {}, _c[$efront_string_Break] = BREAK, _c[$efront_string_Skip] = SKIP, _c[$efront_string_Remove] = REMOVE, _c);
        function Reference(parent, key) {
            this[$efront_string_parent] = parent;
            this[$efront_string_key] = key
        }
        Reference[$efront_string_protot][$efront_string_replac] = function replace(node) {
            this[$efront_string_parent][this[$efront_string_key]] = node
        };
        Reference[$efront_string_protot][$efront_string_remove] = function remove() {
            if (Array[$efront_string_isArra](this[$efront_string_parent])) {
                this[$efront_string_parent][$efront_string_splice](this[$efront_string_key], 1);
                return true
            } else {
                this[$efront_string_replac](null);
                return false
            }
        };
        function Element(node, path, wrap, ref) {
            this[$efront_string_node] = node;
            this[$efront_string_path] = path;
            this[$efront_string_wrap] = wrap;
            this[$efront_string_ref] = ref
        }
        function Controller() {
        }
        Controller[$efront_string_protot][$efront_string_path] = function path() {
            var i, iz, j, jz, result, element;
            function addToPath(result, path) {
                if (Array[$efront_string_isArra](path)) {
                    for (j = 0, jz = path[$efront_string_length]; j < jz; ++j) {
                        result[$efront_string_push](path[j])
                    }
                } else {
                    result[$efront_string_push](path)
                }
            }
            if (!this[$efront_string___curr][$efront_string_path]) {
                return null
            }
            result = [];
            for (i = 2, iz = this[$efront_string___leav][$efront_string_length]; i < iz; ++i) {
                element = this[$efront_string___leav][i];
                addToPath(result, element[$efront_string_path])
            }
            addToPath(result, this[$efront_string___curr][$efront_string_path]);
            return result
        };
        Controller[$efront_string_protot][$efront_string_type] = function () {
            var node = this[$efront_string_curren]();
            return node[$efront_string_type] || this[$efront_string___curr][$efront_string_wrap]
        };
        Controller[$efront_string_protot][$efront_string_parent1] = function parents() {
            var i, iz, result;
            result = [];
            for (i = 1, iz = this[$efront_string___leav][$efront_string_length]; i < iz; ++i) {
                result[$efront_string_push](this[$efront_string___leav][i][$efront_string_node])
            }
            return result
        };
        Controller[$efront_string_protot][$efront_string_curren] = function current() {
            return this[$efront_string___curr][$efront_string_node]
        };
        Controller[$efront_string_protot][$efront_string___exec] = function __execute(callback, element) {
            var previous, result;
            result = undefined;
            previous = this[$efront_string___curr];
            this[$efront_string___curr] = element;
            this[$efront_string___stat] = null;
            if (callback) {
                result = callback[$efront_string_call](this, element[$efront_string_node], this[$efront_string___leav][this[$efront_string___leav][$efront_string_length] - 1][$efront_string_node])
            }
            this[$efront_string___curr] = previous;
            return result
        };
        Controller[$efront_string_protot][$efront_string_notify] = function notify(flag) {
            this[$efront_string___stat] = flag
        };
        Controller[$efront_string_protot][$efront_string_skip] = function () {
            this[$efront_string_notify](SKIP)
        };
        Controller[$efront_string_protot][$efront_string_break] = function () {
            this[$efront_string_notify](BREAK)
        };
        Controller[$efront_string_protot][$efront_string_remove] = function () {
            this[$efront_string_notify](REMOVE)
        };
        Controller[$efront_string_protot][$efront_string___init] = function (root, visitor) {
            this[$efront_string_visito] = visitor;
            this[$efront_string_root] = root;
            this[$efront_string___work] = [];
            this[$efront_string___leav] = [];
            this[$efront_string___curr] = null;
            this[$efront_string___stat] = null;
            this[$efront_string___fall] = null;
            if (visitor[$efront_string_fallba] === $efront_string_iterat) {
                this[$efront_string___fall] = Object[$efront_string_keys]
            } else if (typeof visitor[$efront_string_fallba] === $efront_string_functi) {
                this[$efront_string___fall] = visitor[$efront_string_fallba]
            }
            this[$efront_string___keys] = VisitorKeys;
            if (visitor[$efront_string_keys]) {
                this[$efront_string___keys] = Object[$efront_string_assign](Object[$efront_string_create](this[$efront_string___keys]), visitor[$efront_string_keys])
            }
        };
        function isNode(node) {
            if (node == null) {
                return false
            }
            return typeof node === $efront_string_object && typeof node[$efront_string_type] === $efront_string_string
        }
        function isProperty(nodeType, key) {
            return (nodeType === Syntax[$efront_string_Object] || nodeType === Syntax[$efront_string_Object1]) && $efront_string_proper1 === key
        }
        function candidateExistsInLeaveList(leavelist, candidate) {
            for (var i = leavelist[$efront_string_length] - 1; i >= 0; --i) {
                if (leavelist[i][$efront_string_node] === candidate) {
                    return true
                }
            }
            return false
        }
        Controller[$efront_string_protot][$efront_string_traver] = function traverse(root, visitor) {
            var worklist, leavelist, element, node, nodeType, ret, key, current, current2, candidates, candidate, sentinel;
            this[$efront_string___init](root, visitor);
            sentinel = {};
            worklist = this[$efront_string___work];
            leavelist = this[$efront_string___leav];
            worklist[$efront_string_push](new Element(root, null, null, null));
            leavelist[$efront_string_push](new Element(null, null, null, null));
            while (worklist[$efront_string_length]) {
                element = worklist[$efront_string_pop]();
                if (element === sentinel) {
                    element = leavelist[$efront_string_pop]();
                    ret = this[$efront_string___exec](visitor[$efront_string_leave], element);
                    if (this[$efront_string___stat] === BREAK || ret === BREAK) {
                        return
                    }
                    continue
                }
                if (element[$efront_string_node]) {
                    ret = this[$efront_string___exec](visitor[$efront_string_enter], element);
                    if (this[$efront_string___stat] === BREAK || ret === BREAK) {
                        return
                    }
                    worklist[$efront_string_push](sentinel);
                    leavelist[$efront_string_push](element);
                    if (this[$efront_string___stat] === SKIP || ret === SKIP) {
                        continue
                    }
                    node = element[$efront_string_node];
                    nodeType = node[$efront_string_type] || element[$efront_string_wrap];
                    candidates = this[$efront_string___keys][nodeType];
                    if (!candidates) {
                        if (this[$efront_string___fall]) {
                            candidates = this[$efront_string___fall](node)
                        } else {
                            throw new Error($efront_string_Unknow + nodeType + $efront_string__15)
                        }
                    }
                    current = candidates[$efront_string_length];
                    while ((current -= 1) >= 0) {
                        key = candidates[current];
                        candidate = node[key];
                        if (!candidate) {
                            continue
                        }
                        if (Array[$efront_string_isArra](candidate)) {
                            current2 = candidate[$efront_string_length];
                            while ((current2 -= 1) >= 0) {
                                if (!candidate[current2]) {
                                    continue
                                }
                                if (candidateExistsInLeaveList(leavelist, candidate[current2])) {
                                    continue
                                }
                                if (isProperty(nodeType, candidates[current])) {
                                    element = new Element(candidate[current2], [
                                        key,
                                        current2
                                    ], $efront_string_Proper, null)
                                } else if (isNode(candidate[current2])) {
                                    element = new Element(candidate[current2], [
                                        key,
                                        current2
                                    ], null, null)
                                } else {
                                    continue
                                }
                                worklist[$efront_string_push](element)
                            }
                        } else if (isNode(candidate)) {
                            if (candidateExistsInLeaveList(leavelist, candidate)) {
                                continue
                            }
                            worklist[$efront_string_push](new Element(candidate, key, null, null))
                        }
                    }
                }
            }
        };
        Controller[$efront_string_protot][$efront_string_replac] = function replace(root, visitor) {
            var _a;
            var worklist, leavelist, node, nodeType, target, element, current, current2, candidates, candidate, sentinel, outer, key;
            function removeElem(element) {
                var i, key, nextElem, parent;
                if (element[$efront_string_ref][$efront_string_remove]()) {
                    key = element[$efront_string_ref][$efront_string_key];
                    parent = element[$efront_string_ref][$efront_string_parent];
                    i = worklist[$efront_string_length];
                    while (i--) {
                        nextElem = worklist[i];
                        if (nextElem[$efront_string_ref] && nextElem[$efront_string_ref][$efront_string_parent] === parent) {
                            if (nextElem[$efront_string_ref][$efront_string_key] < key) {
                                break
                            }
                            --nextElem[$efront_string_ref][$efront_string_key]
                        }
                    }
                }
            }
            this[$efront_string___init](root, visitor);
            sentinel = {};
            worklist = this[$efront_string___work];
            leavelist = this[$efront_string___leav];
            outer = (_a = {}, _a[$efront_string_root] = root, _a);
            element = new Element(root, null, null, new Reference(outer, $efront_string_root));
            worklist[$efront_string_push](element);
            leavelist[$efront_string_push](element);
            while (worklist[$efront_string_length]) {
                element = worklist[$efront_string_pop]();
                if (element === sentinel) {
                    element = leavelist[$efront_string_pop]();
                    target = this[$efront_string___exec](visitor[$efront_string_leave], element);
                    if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                        element[$efront_string_ref][$efront_string_replac](target)
                    }
                    if (this[$efront_string___stat] === REMOVE || target === REMOVE) {
                        removeElem(element)
                    }
                    if (this[$efront_string___stat] === BREAK || target === BREAK) {
                        return outer[$efront_string_root]
                    }
                    continue
                }
                target = this[$efront_string___exec](visitor[$efront_string_enter], element);
                if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                    element[$efront_string_ref][$efront_string_replac](target);
                    element[$efront_string_node] = target
                }
                if (this[$efront_string___stat] === REMOVE || target === REMOVE) {
                    removeElem(element);
                    element[$efront_string_node] = null
                }
                if (this[$efront_string___stat] === BREAK || target === BREAK) {
                    return outer[$efront_string_root]
                }
                node = element[$efront_string_node];
                if (!node) {
                    continue
                }
                worklist[$efront_string_push](sentinel);
                leavelist[$efront_string_push](element);
                if (this[$efront_string___stat] === SKIP || target === SKIP) {
                    continue
                }
                nodeType = node[$efront_string_type] || element[$efront_string_wrap];
                candidates = this[$efront_string___keys][nodeType];
                if (!candidates) {
                    if (this[$efront_string___fall]) {
                        candidates = this[$efront_string___fall](node)
                    } else {
                        throw new Error($efront_string_Unknow + nodeType + $efront_string__15)
                    }
                }
                current = candidates[$efront_string_length];
                while ((current -= 1) >= 0) {
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) {
                        continue
                    }
                    if (Array[$efront_string_isArra](candidate)) {
                        current2 = candidate[$efront_string_length];
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2]) {
                                continue
                            }
                            if (isProperty(nodeType, candidates[current])) {
                                element = new Element(candidate[current2], [
                                    key,
                                    current2
                                ], $efront_string_Proper, new Reference(candidate, current2))
                            } else if (isNode(candidate[current2])) {
                                element = new Element(candidate[current2], [
                                    key,
                                    current2
                                ], null, new Reference(candidate, current2))
                            } else {
                                continue
                            }
                            worklist[$efront_string_push](element)
                        }
                    } else if (isNode(candidate)) {
                        worklist[$efront_string_push](new Element(candidate, key, null, new Reference(node, key)))
                    }
                }
            }
            return outer[$efront_string_root]
        };
        function traverse(root, visitor) {
            var controller = new Controller;
            return controller[$efront_string_traver](root, visitor)
        }
        function replace(root, visitor) {
            var controller = new Controller;
            return controller[$efront_string_replac](root, visitor)
        }
        function extendCommentRange(comment, tokens) {
            var target;
            target = upperBound(tokens, function search(token) {
                return token[$efront_string_range][0] > comment[$efront_string_range][0]
            });
            comment[$efront_string_extend] = [
                comment[$efront_string_range][0],
                comment[$efront_string_range][1]
            ];
            if (target !== tokens[$efront_string_length]) {
                comment[$efront_string_extend][1] = tokens[target][$efront_string_range][0]
            }
            target -= 1;
            if (target >= 0) {
                comment[$efront_string_extend][0] = tokens[target][$efront_string_range][1]
            }
            return comment
        }
        function attachComments(tree, providedComments, tokens) {
            var _a, _b;
            var comments = [], comment, len, i, cursor;
            if (!tree[$efront_string_range]) {
                throw new Error($efront_string_attach)
            }
            if (!tokens[$efront_string_length]) {
                if (providedComments[$efront_string_length]) {
                    for (i = 0, len = providedComments[$efront_string_length]; i < len; i += 1) {
                        comment = deepCopy(providedComments[i]);
                        comment[$efront_string_extend] = [
                            0,
                            tree[$efront_string_range][0]
                        ];
                        comments[$efront_string_push](comment)
                    }
                    tree[$efront_string_leadin] = comments
                }
                return tree
            }
            for (i = 0, len = providedComments[$efront_string_length]; i < len; i += 1) {
                comments[$efront_string_push](extendCommentRange(deepCopy(providedComments[i]), tokens))
            }
            cursor = 0;
            traverse(tree, (_a = {}, _a[$efront_string_enter] = function (node) {
                var comment;
                while (cursor < comments[$efront_string_length]) {
                    comment = comments[cursor];
                    if (comment[$efront_string_extend][1] > node[$efront_string_range][0]) {
                        break
                    }
                    if (comment[$efront_string_extend][1] === node[$efront_string_range][0]) {
                        if (!node[$efront_string_leadin]) {
                            node[$efront_string_leadin] = []
                        }
                        node[$efront_string_leadin][$efront_string_push](comment);
                        comments[$efront_string_splice](cursor, 1)
                    } else {
                        cursor += 1
                    }
                }
                if (cursor === comments[$efront_string_length]) {
                    return VisitorOption[$efront_string_Break]
                }
                if (comments[cursor][$efront_string_extend][0] > node[$efront_string_range][1]) {
                    return VisitorOption[$efront_string_Skip]
                }
            }, _a));
            cursor = 0;
            traverse(tree, (_b = {}, _b[$efront_string_leave] = function (node) {
                var comment;
                while (cursor < comments[$efront_string_length]) {
                    comment = comments[cursor];
                    if (node[$efront_string_range][1] < comment[$efront_string_extend][0]) {
                        break
                    }
                    if (node[$efront_string_range][1] === comment[$efront_string_extend][0]) {
                        if (!node[$efront_string_traili1]) {
                            node[$efront_string_traili1] = []
                        }
                        node[$efront_string_traili1][$efront_string_push](comment);
                        comments[$efront_string_splice](cursor, 1)
                    } else {
                        cursor += 1
                    }
                }
                if (cursor === comments[$efront_string_length]) {
                    return VisitorOption[$efront_string_Break]
                }
                if (comments[cursor][$efront_string_extend][0] > node[$efront_string_range][1]) {
                    return VisitorOption[$efront_string_Skip]
                }
            }, _b));
            return tree
        }
        exports[$efront_string_Syntax] = Syntax;
        exports[$efront_string_traver] = traverse;
        exports[$efront_string_replac] = replace;
        exports[$efront_string_attach1] = attachComments;
        exports[$efront_string_Visito] = VisitorKeys;
        exports[$efront_string_Visito1] = VisitorOption;
        exports[$efront_string_Contro] = Controller;
        exports[$efront_string_cloneE] = function () {
            return clone({})
        };
        return exports
    }(exports)
}],
/** 301 $efront_string_name */ "name",
/** 302 $efront_string_escode */ "escodegen",
/** 303 $efront_string_descri */ "description",
/** 304 $efront_string_ECMASc */ /** text */ "ECMAScript code generator",
/** 305 $efront_string_homepa */ "homepage",
/** 306 $efront_string_http_g */ "http://github.com/estools/escodegen",
/** 307 $efront_string_main */ "main",
/** 308 $efront_string_escode1 */ "escodegen.js",
/** 309 $efront_string_bin */ "bin",
/** 310 $efront_string_esgene */ "esgenerate",
/** 311 $efront_string__bin_e */ "./bin/esgenerate.js",
/** 312 $efront_string__bin_e1 */ "./bin/escodegen.js",
/** 313 $efront_string_files */ "files",
/** 314 $efront_string_LICENS */ "LICENSE.BSD",
/** 315 $efront_string_README */ "README.md",
/** 316 $efront_string_packag */ "package.json",
/** 317 $efront_string_versio */ "version",
/** 318 $efront_string_2_0_0 */ "2.0.0",
/** 319 $efront_string_engine */ "engines",
/** 320 $efront_string__6_0 */ ">=6.0",
/** 321 $efront_string_mainta */ "maintainers",
/** 322 $efront_string_Yusuke */ /** text */ "Yusuke Suzuki",
/** 323 $efront_string_email */ "email",
/** 324 $efront_string_utatan */ "utatane.tea@gmail.com",
/** 325 $efront_string_web */ "web",
/** 326 $efront_string_http_g1 */ "http://github.com/Constellation",
/** 327 $efront_string_reposi */ "repository",
/** 328 $efront_string_git */ "git",
/** 329 $efront_string_url */ "url",
/** 330 $efront_string_http_g2 */ "http://github.com/estools/escodegen.git",
/** 331 $efront_string_depend */ "dependencies",
/** 332 $efront_string_estrav */ "estraverse",
/** 333 $efront_string__5_2_0 */ "^5.2.0",
/** 334 $efront_string_esutil */ "esutils",
/** 335 $efront_string__2_0_2 */ "^2.0.2",
/** 336 $efront_string_esprim */ "esprima",
/** 337 $efront_string__4_0_1 */ "^4.0.1",
/** 338 $efront_string_option */ "optionator",
/** 339 $efront_string__0_8_1 */ "^0.8.1",
/** 340 $efront_string_option1 */ "optionalDependencies",
/** 341 $efront_string_source1 */ "source-map",
/** 342 $efront_string__0_6_1 */ "~0.6.1",
/** 343 $efront_string_devDep */ "devDependencies",
/** 344 $efront_string_acorn */ "acorn",
/** 345 $efront_string__7_3_1 */ "^7.3.1",
/** 346 $efront_string_bluebi */ "bluebird",
/** 347 $efront_string__3_4_7 */ "^3.4.7",
/** 348 $efront_string_bower_ */ "bower-registry-client",
/** 349 $efront_string__1_0_0 */ "^1.0.0",
/** 350 $efront_string_chai */ "chai",
/** 351 $efront_string__4_2_0 */ "^4.2.0",
/** 352 $efront_string_chai_e */ "chai-exclude",
/** 353 $efront_string_common */ "commonjs-everywhere",
/** 354 $efront_string__0_9_7 */ "^0.9.7",
/** 355 $efront_string_gulp */ "gulp",
/** 356 $efront_string__3_8_1 */ "^3.8.10",
/** 357 $efront_string_gulp_e */ "gulp-eslint",
/** 358 $efront_string__3_0_1 */ "^3.0.1",
/** 359 $efront_string_gulp_m */ "gulp-mocha",
/** 360 $efront_string_semver */ "semver",
/** 361 $efront_string__5_1_0 */ "^5.1.0",
/** 362 $efront_string_licens */ "license",
/** 363 $efront_string_BSD_2_ */ "BSD-2-Clause",
/** 364 $efront_string_script */ "scripts",
/** 365 $efront_string_gulp_t */ /** text */ "gulp travis",
/** 366 $efront_string_unit_t */ "unit-test",
/** 367 $efront_string_gulp_t1 */ /** text */ "gulp test",
/** 368 $efront_string_lint */ "lint",
/** 369 $efront_string_gulp_l */ /** text */ "gulp lint",
/** 370 $efront_string_releas */ "release",
/** 371 $efront_string_node_t */ /** text */ "node tools/release.js",
/** 372 $efront_string_build_ */ "build-min",
/** 373 $efront_string__node_ */ /** text */ "./node_modules/.bin/cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js",
/** 374 $efront_string_build */ "build",
/** 375 $efront_string__node_1 */ /** text */ "./node_modules/.bin/cjsify -a path: tools/entry-point.js > escodegen.browser.js",
/** 376 package.json */ [301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,261,320,321,322,323,324,325,326,327,133,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,122,365,366,367,368,369,370,371,372,373,374,375,function($efront_string_name, $efront_string_escode, $efront_string_descri, $efront_string_ECMASc, $efront_string_homepa, $efront_string_http_g, $efront_string_main, $efront_string_escode1, $efront_string_bin, $efront_string_esgene, $efront_string__bin_e, $efront_string__bin_e1, $efront_string_files, $efront_string_LICENS, $efront_string_README, $efront_string_packag, $efront_string_versio, $efront_string_2_0_0, $efront_string_engine, $efront_string_node, $efront_string__6_0, $efront_string_mainta, $efront_string_Yusuke, $efront_string_email, $efront_string_utatan, $efront_string_web, $efront_string_http_g1, $efront_string_reposi, $efront_string_type, $efront_string_git, $efront_string_url, $efront_string_http_g2, $efront_string_depend, $efront_string_estrav, $efront_string__5_2_0, $efront_string_esutil, $efront_string__2_0_2, $efront_string_esprim, $efront_string__4_0_1, $efront_string_option, $efront_string__0_8_1, $efront_string_option1, $efront_string_source1, $efront_string__0_6_1, $efront_string_devDep, $efront_string_acorn, $efront_string__7_3_1, $efront_string_bluebi, $efront_string__3_4_7, $efront_string_bower_, $efront_string__1_0_0, $efront_string_chai, $efront_string__4_2_0, $efront_string_chai_e, $efront_string_common, $efront_string__0_9_7, $efront_string_gulp, $efront_string__3_8_1, $efront_string_gulp_e, $efront_string__3_0_1, $efront_string_gulp_m, $efront_string_semver, $efront_string__5_1_0, $efront_string_licens, $efront_string_BSD_2_, $efront_string_script, $efront_string_test, $efront_string_gulp_t, $efront_string_unit_t, $efront_string_gulp_t1, $efront_string_lint, $efront_string_gulp_l, $efront_string_releas, $efront_string_node_t, $efront_string_build_, $efront_string__node_, $efront_string_build, $efront_string__node_1) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return _a = {}, _a[$efront_string_name] = $efront_string_escode, _a[$efront_string_descri] = $efront_string_ECMASc, _a[$efront_string_homepa] = $efront_string_http_g, _a[$efront_string_main] = $efront_string_escode1, _a[$efront_string_bin] = (_b = {}, _b[$efront_string_esgene] = $efront_string__bin_e, _b[$efront_string_escode] = $efront_string__bin_e1, _b), _a[$efront_string_files] = [
        $efront_string_LICENS,
        $efront_string_README,
        $efront_string_bin,
        $efront_string_escode1,
        $efront_string_packag
    ], _a[$efront_string_versio] = $efront_string_2_0_0, _a[$efront_string_engine] = (_c = {}, _c[$efront_string_node] = $efront_string__6_0, _c), _a[$efront_string_mainta] = [(_d = {}, _d[$efront_string_name] = $efront_string_Yusuke, _d[$efront_string_email] = $efront_string_utatan, _d[$efront_string_web] = $efront_string_http_g1, _d)], _a[$efront_string_reposi] = (_e = {}, _e[$efront_string_type] = $efront_string_git, _e[$efront_string_url] = $efront_string_http_g2, _e), _a[$efront_string_depend] = (_f = {}, _f[$efront_string_estrav] = $efront_string__5_2_0, _f[$efront_string_esutil] = $efront_string__2_0_2, _f[$efront_string_esprim] = $efront_string__4_0_1, _f[$efront_string_option] = $efront_string__0_8_1, _f), _a[$efront_string_option1] = (_g = {}, _g[$efront_string_source1] = $efront_string__0_6_1, _g), _a[$efront_string_devDep] = (_h = {}, _h[$efront_string_acorn] = $efront_string__7_3_1, _h[$efront_string_bluebi] = $efront_string__3_4_7, _h[$efront_string_bower_] = $efront_string__1_0_0, _h[$efront_string_chai] = $efront_string__4_2_0, _h[$efront_string_chai_e] = $efront_string__2_0_2, _h[$efront_string_common] = $efront_string__0_9_7, _h[$efront_string_gulp] = $efront_string__3_8_1, _h[$efront_string_gulp_e] = $efront_string__3_0_1, _h[$efront_string_gulp_m] = $efront_string__3_0_1, _h[$efront_string_semver] = $efront_string__5_1_0, _h), _a[$efront_string_licens] = $efront_string_BSD_2_, _a[$efront_string_script] = (_j = {}, _j[$efront_string_test] = $efront_string_gulp_t, _j[$efront_string_unit_t] = $efront_string_gulp_t1, _j[$efront_string_lint] = $efront_string_gulp_l, _j[$efront_string_releas] = $efront_string_node_t, _j[$efront_string_build_] = $efront_string__node_, _j[$efront_string_build] = $efront_string__node_1, _j), _a
}],
/** 377 estraverse */ [1,function(require) {
    return require(300)
}],
/** 378 RegExp */ RegExp,
/** 379 global */ typeof global!=="undefined"?global:void 0,
/** 380 $efront_string__is_a_ */ /** text */ "\" is a required argument.",
/** 381 $efront_string_getArg */ "getArg",
/** 382 $efront_regexp__w_w_w */ /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,
/** 383 $efront_regexp__data_ */ /^data:.+\,.+$/,
/** 384 $efront_string_match */ "match",
/** 385 $efront_string_scheme */ "scheme",
/** 386 $efront_string_auth */ "auth",
/** 387 $efront_string_host */ "host",
/** 388 $efront_string_port */ "port",
/** 389 $efront_string_urlPar */ "urlParse",
/** 390 $efront_string__16 */ "//",
/** 391 $efront_string__17 */ "@",
/** 392 $efront_string_urlGen */ "urlGenerate",
/** 393 $efront_string_isAbso */ "isAbsolute",
/** 394 $efront_regexp__18 */ /\/+/,
/** 395 $efront_string__19 */ "..",
/** 396 $efront_string__20 */ "/",
/** 397 $efront_string_normal */ "normalize",
/** 398 $efront_regexp__$_1 */ /\/+$/,
/** 399 $efront_regexp__$_2 */ /\/$/,
/** 400 $efront_string_lastIn1 */ "lastIndexOf",
/** 401 $efront_regexp__$_3 */ /^([^\/]+:\/)?\/*$/,
/** 402 $efront_string__21 */ "../",
/** 403 $efront_string_substr */ "substr",
/** 404 $efront_string_relati */ "relative",
/** 405 $efront_string___prot */ "__proto__",
/** 406 $efront_string_$ */ "$",
/** 407 $efront_string_toSetS */ "toSetString",
/** 408 $efront_string_fromSe */ "fromSetString",
/** 409 $efront_string_origin */ "originalLine",
/** 410 $efront_string_origin1 */ "originalColumn",
/** 411 $efront_string_genera */ "generatedColumn",
/** 412 $efront_string_genera1 */ "generatedLine",
/** 413 $efront_string_compar */ "compareByOriginalPositions",
/** 414 $efront_string_compar1 */ "compareByGeneratedPositionsDeflated",
/** 415 $efront_string_compar2 */ "compareByGeneratedPositionsInflated",
/** 416 $efront_regexp__n_n_ */ /^\)]}'[^\n]*\n/,
/** 417 $efront_string_parseS */ "parseSourceMapInput",
/** 418 $efront_string_source2 */ /** text */ "sourceMapURL could not be parsed",
/** 419 $efront_string_substr1 */ "substring",
/** 420 $efront_string_comput */ "computeSourceURL",
/** 421 source-map$lib$util.js */ [61,48,62,63,114,3,30,380,381,382,383,384,385,386,387,388,262,389,97,390,391,392,393,4,394,288,260,395,11,396,397,76,31,398,122,399,9,400,2,401,402,403,404,283,405,406,407,408,36,231,409,410,411,412,301,413,414,415,112,416,417,418,419,420,function(Error, exports, Array, Object, JSON, $efront_string_length, $efront_string__6, $efront_string__is_a_, $efront_string_getArg, $efront_regexp__w_w_w, $efront_regexp__data_, $efront_string_match, $efront_string_scheme, $efront_string_auth, $efront_string_host, $efront_string_port, $efront_string_path, $efront_string_urlPar, $efront_string__11, $efront_string__16, $efront_string__17, $efront_string_urlGen, $efront_string_isAbso, $efront_string_split, $efront_regexp__18, $efront_string__15, $efront_string_splice, $efront_string__19, $efront_string_join, $efront_string__20, $efront_string_normal, $efront_string_charAt, $efront_string_replac, $efront_regexp__$_1, $efront_string_test, $efront_regexp__$_2, $efront_string_indexO, $efront_string_lastIn1, $efront_string_slice, $efront_regexp__$_3, $efront_string__21, $efront_string_substr, $efront_string_relati, $efront_string_create, $efront_string___prot, $efront_string_$, $efront_string_toSetS, $efront_string_fromSe, $efront_string_charCo, $efront_string_source, $efront_string_origin, $efront_string_origin1, $efront_string_genera, $efront_string_genera1, $efront_string_name, $efront_string_compar, $efront_string_compar1, $efront_string_compar2, $efront_string_parse, $efront_regexp__n_n_, $efront_string_parseS, $efront_string_source2, $efront_string_substr1, $efront_string_comput) {
    function getArg(aArgs, aName, aDefaultValue) {
        if (aName in aArgs) {
            return aArgs[aName]
        } else if (arguments[$efront_string_length] === 3) {
            return aDefaultValue
        } else {
            throw new Error($efront_string__6 + aName + $efront_string__is_a_)
        }
    }
    exports[$efront_string_getArg] = getArg;
    var urlRegexp = $efront_regexp__w_w_w;
    var dataUrlRegexp = $efront_regexp__data_;
    function urlParse(aUrl) {
        var _a;
        var match = aUrl[$efront_string_match](urlRegexp);
        if (!match) {
            return null
        }
        return _a = {}, _a[$efront_string_scheme] = match[1], _a[$efront_string_auth] = match[2], _a[$efront_string_host] = match[3], _a[$efront_string_port] = match[4], _a[$efront_string_path] = match[5], _a
    }
    exports[$efront_string_urlPar] = urlParse;
    function urlGenerate(aParsedUrl) {
        var url = '';
        if (aParsedUrl[$efront_string_scheme]) {
            url += aParsedUrl[$efront_string_scheme] + $efront_string__11
        }
        url += $efront_string__16;
        if (aParsedUrl[$efront_string_auth]) {
            url += aParsedUrl[$efront_string_auth] + $efront_string__17
        }
        if (aParsedUrl[$efront_string_host]) {
            url += aParsedUrl[$efront_string_host]
        }
        if (aParsedUrl[$efront_string_port]) {
            url += $efront_string__11 + aParsedUrl[$efront_string_port]
        }
        if (aParsedUrl[$efront_string_path]) {
            url += aParsedUrl[$efront_string_path]
        }
        return url
    }
    exports[$efront_string_urlGen] = urlGenerate;
    function normalize(aPath) {
        var path = aPath;
        var url = urlParse(aPath);
        if (url) {
            if (!url[$efront_string_path]) {
                return aPath
            }
            path = url[$efront_string_path]
        }
        var isAbsolute = exports[$efront_string_isAbso](path);
        var parts = path[$efront_string_split]($efront_regexp__18);
        for (var part, up = 0, i = parts[$efront_string_length] - 1; i >= 0; i--) {
            part = parts[i];
            if (part === $efront_string__15) {
                parts[$efront_string_splice](i, 1)
            } else if (part === $efront_string__19) {
                up++
            } else if (up > 0) {
                if (part === '') {
                    parts[$efront_string_splice](i + 1, up);
                    up = 0
                } else {
                    parts[$efront_string_splice](i, 2);
                    up--
                }
            }
        }
        path = parts[$efront_string_join]($efront_string__20);
        if (path === '') {
            path = isAbsolute ? $efront_string__20 : $efront_string__15
        }
        if (url) {
            url[$efront_string_path] = path;
            return urlGenerate(url)
        }
        return path
    }
    exports[$efront_string_normal] = normalize;
    function join(aRoot, aPath) {
        if (aRoot === '') {
            aRoot = $efront_string__15
        }
        if (aPath === '') {
            aPath = $efront_string__15
        }
        var aPathUrl = urlParse(aPath);
        var aRootUrl = urlParse(aRoot);
        if (aRootUrl) {
            aRoot = aRootUrl[$efront_string_path] || $efront_string__20
        }
        if (aPathUrl && !aPathUrl[$efront_string_scheme]) {
            if (aRootUrl) {
                aPathUrl[$efront_string_scheme] = aRootUrl[$efront_string_scheme]
            }
            return urlGenerate(aPathUrl)
        }
        if (aPathUrl || aPath[$efront_string_match](dataUrlRegexp)) {
            return aPath
        }
        if (aRootUrl && !aRootUrl[$efront_string_host] && !aRootUrl[$efront_string_path]) {
            aRootUrl[$efront_string_host] = aPath;
            return urlGenerate(aRootUrl)
        }
        var joined = aPath[$efront_string_charAt](0) === $efront_string__20 ? aPath : normalize(aRoot[$efront_string_replac]($efront_regexp__$_1, '') + $efront_string__20 + aPath);
        if (aRootUrl) {
            aRootUrl[$efront_string_path] = joined;
            return urlGenerate(aRootUrl)
        }
        return joined
    }
    exports[$efront_string_join] = join;
    exports[$efront_string_isAbso] = function (aPath) {
        return aPath[$efront_string_charAt](0) === $efront_string__20 || urlRegexp[$efront_string_test](aPath)
    };
    function relative(aRoot, aPath) {
        if (aRoot === '') {
            aRoot = $efront_string__15
        }
        aRoot = aRoot[$efront_string_replac]($efront_regexp__$_2, '');
        var level = 0;
        while (aPath[$efront_string_indexO](aRoot + $efront_string__20) !== 0) {
            var index = aRoot[$efront_string_lastIn1]($efront_string__20);
            if (index < 0) {
                return aPath
            }
            aRoot = aRoot[$efront_string_slice](0, index);
            if (aRoot[$efront_string_match]($efront_regexp__$_3)) {
                return aPath
            }
            ++level
        }
        return Array(level + 1)[$efront_string_join]($efront_string__21) + aPath[$efront_string_substr](aRoot[$efront_string_length] + 1)
    }
    exports[$efront_string_relati] = relative;
    var supportsNullProto = function () {
        var obj = Object[$efront_string_create](null);
        return !($efront_string___prot in obj)
    }();
    function identity(s) {
        return s
    }
    function toSetString(aStr) {
        if (isProtoString(aStr)) {
            return $efront_string_$ + aStr
        }
        return aStr
    }
    exports[$efront_string_toSetS] = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
        if (isProtoString(aStr)) {
            return aStr[$efront_string_slice](1)
        }
        return aStr
    }
    exports[$efront_string_fromSe] = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
        if (!s) {
            return false
        }
        var length = s[$efront_string_length];
        if (length < 9) {
            return false
        }
        if (s[$efront_string_charCo](length - 1) !== 95 || s[$efront_string_charCo](length - 2) !== 95 || s[$efront_string_charCo](length - 3) !== 111 || s[$efront_string_charCo](length - 4) !== 116 || s[$efront_string_charCo](length - 5) !== 111 || s[$efront_string_charCo](length - 6) !== 114 || s[$efront_string_charCo](length - 7) !== 112 || s[$efront_string_charCo](length - 8) !== 95 || s[$efront_string_charCo](length - 9) !== 95) {
            return false
        }
        for (var i = length - 10; i >= 0; i--) {
            if (s[$efront_string_charCo](i) !== 36) {
                return false
            }
        }
        return true
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
        var cmp = strcmp(mappingA[$efront_string_source], mappingB[$efront_string_source]);
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string_origin] - mappingB[$efront_string_origin];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string_origin1] - mappingB[$efront_string_origin1];
        if (cmp !== 0 || onlyCompareOriginal) {
            return cmp
        }
        cmp = mappingA[$efront_string_genera] - mappingB[$efront_string_genera];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string_genera1] - mappingB[$efront_string_genera1];
        if (cmp !== 0) {
            return cmp
        }
        return strcmp(mappingA[$efront_string_name], mappingB[$efront_string_name])
    }
    exports[$efront_string_compar] = compareByOriginalPositions;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA[$efront_string_genera1] - mappingB[$efront_string_genera1];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string_genera] - mappingB[$efront_string_genera];
        if (cmp !== 0 || onlyCompareGenerated) {
            return cmp
        }
        cmp = strcmp(mappingA[$efront_string_source], mappingB[$efront_string_source]);
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string_origin] - mappingB[$efront_string_origin];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string_origin1] - mappingB[$efront_string_origin1];
        if (cmp !== 0) {
            return cmp
        }
        return strcmp(mappingA[$efront_string_name], mappingB[$efront_string_name])
    }
    exports[$efront_string_compar1] = compareByGeneratedPositionsDeflated;
    function strcmp(aStr1, aStr2) {
        if (aStr1 === aStr2) {
            return 0
        }
        if (aStr1 === null) {
            return 1
        }
        if (aStr2 === null) {
            return -1
        }
        if (aStr1 > aStr2) {
            return 1
        }
        return -1
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
        var cmp = mappingA[$efront_string_genera1] - mappingB[$efront_string_genera1];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string_genera] - mappingB[$efront_string_genera];
        if (cmp !== 0) {
            return cmp
        }
        cmp = strcmp(mappingA[$efront_string_source], mappingB[$efront_string_source]);
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string_origin] - mappingB[$efront_string_origin];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string_origin1] - mappingB[$efront_string_origin1];
        if (cmp !== 0) {
            return cmp
        }
        return strcmp(mappingA[$efront_string_name], mappingB[$efront_string_name])
    }
    exports[$efront_string_compar2] = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
        return JSON[$efront_string_parse](str[$efront_string_replac]($efront_regexp__n_n_, ''))
    }
    exports[$efront_string_parseS] = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
        sourceURL = sourceURL || '';
        if (sourceRoot) {
            if (sourceRoot[sourceRoot[$efront_string_length] - 1] !== $efront_string__20 && sourceURL[0] !== $efront_string__20) {
                sourceRoot += $efront_string__20
            }
            sourceURL = sourceRoot + sourceURL
        }
        if (sourceMapURL) {
            var parsed = urlParse(sourceMapURL);
            if (!parsed) {
                throw new Error($efront_string_source2)
            }
            if (parsed[$efront_string_path]) {
                var index = parsed[$efront_string_path][$efront_string_lastIn1]($efront_string__20);
                if (index >= 0) {
                    parsed[$efront_string_path] = parsed[$efront_string_path][$efront_string_substr1](0, index + 1)
                }
            }
            sourceURL = join(urlGenerate(parsed), sourceURL)
        }
        return normalize(sourceURL)
    }
    exports[$efront_string_comput] = computeSourceURL;
    return exports
}],
/** 422 $efront_string__array */ "_array",
/** 423 $efront_string__sorte */ "_sorted",
/** 424 $efront_string__last */ "_last",
/** 425 $efront_string_unsort */ "unsortedForEach",
/** 426 $efront_string_forEac */ "forEach",
/** 427 $efront_string_add */ "add",
/** 428 $efront_string_toArra */ "toArray",
/** 429 $efront_string_sort */ "sort",
/** 430 $efront_string_Mappin */ "MappingList",
/** 431 source-map$lib$mapping-list.js */ [1,48,412,411,415,422,423,424,257,425,426,427,110,428,429,430,function(require, exports, $efront_string_genera1, $efront_string_genera, $efront_string_compar2, $efront_string__array, $efront_string__sorte, $efront_string__last, $efront_string_protot, $efront_string_unsort, $efront_string_forEac, $efront_string_add, $efront_string_push, $efront_string_toArra, $efront_string_sort, $efront_string_Mappin) {
    var util = require(421);
    function generatedPositionAfter(mappingA, mappingB) {
        var lineA = mappingA[$efront_string_genera1];
        var lineB = mappingB[$efront_string_genera1];
        var columnA = mappingA[$efront_string_genera];
        var columnB = mappingB[$efront_string_genera];
        return lineB > lineA || lineB == lineA && columnB >= columnA || util[$efront_string_compar2](mappingA, mappingB) <= 0
    }
    function MappingList() {
        var _a;
        this[$efront_string__array] = [];
        this[$efront_string__sorte] = true;
        this[$efront_string__last] = (_a = {}, _a[$efront_string_genera1] = -1, _a[$efront_string_genera] = 0, _a)
    }
    MappingList[$efront_string_protot][$efront_string_unsort] = function MappingList_forEach(aCallback, aThisArg) {
        this[$efront_string__array][$efront_string_forEac](aCallback, aThisArg)
    };
    MappingList[$efront_string_protot][$efront_string_add] = function MappingList_add(aMapping) {
        if (generatedPositionAfter(this[$efront_string__last], aMapping)) {
            this[$efront_string__last] = aMapping;
            this[$efront_string__array][$efront_string_push](aMapping)
        } else {
            this[$efront_string__sorte] = false;
            this[$efront_string__array][$efront_string_push](aMapping)
        }
    };
    MappingList[$efront_string_protot][$efront_string_toArra] = function MappingList_toArray() {
        if (!this[$efront_string__sorte]) {
            this[$efront_string__array][$efront_string_sort](util[$efront_string_compar2]);
            this[$efront_string__sorte] = true
        }
        return this[$efront_string__array]
    };
    exports[$efront_string_Mappin] = MappingList;
    return exports
}],
/** 432 $efront_string_undefi */ "undefined",
/** 433 $efront_string__set */ "_set",
/** 434 $efront_string_fromAr */ "fromArray",
/** 435 $efront_string_size */ "size",
/** 436 $efront_string_getOwn */ "getOwnPropertyNames",
/** 437 $efront_string_has */ "has",
/** 438 $efront_string_set */ "set",
/** 439 $efront_string_get */ "get",
/** 440 $efront_string__is_no */ /** text */ "\" is not in the set.",
/** 441 $efront_string_at */ "at",
/** 442 $efront_string_No_ele */ /** text */ "No element indexed by ",
/** 443 $efront_string_ArrayS */ "ArraySet",
/** 444 source-map$lib$array-set.js */ [1,63,80,61,48,257,35,432,422,433,283,434,3,427,435,436,407,437,12,110,438,9,439,30,440,441,442,428,2,443,function(require, Object, Map, Error, exports, $efront_string_protot, $efront_string_hasOwn, $efront_string_undefi, $efront_string__array, $efront_string__set, $efront_string_create, $efront_string_fromAr, $efront_string_length, $efront_string_add, $efront_string_size, $efront_string_getOwn, $efront_string_toSetS, $efront_string_has, $efront_string_call, $efront_string_push, $efront_string_set, $efront_string_indexO, $efront_string_get, $efront_string__6, $efront_string__is_no, $efront_string_at, $efront_string_No_ele, $efront_string_toArra, $efront_string_slice, $efront_string_ArrayS) {
    var util = require(421);
    var has = Object[$efront_string_protot][$efront_string_hasOwn];
    var hasNativeMap = typeof Map !== $efront_string_undefi;
    function ArraySet() {
        this[$efront_string__array] = [];
        this[$efront_string__set] = hasNativeMap ? new Map : Object[$efront_string_create](null)
    }
    ArraySet[$efront_string_fromAr] = function ArraySet_fromArray(aArray, aAllowDuplicates) {
        var set = new ArraySet;
        for (var i = 0, len = aArray[$efront_string_length]; i < len; i++) {
            set[$efront_string_add](aArray[i], aAllowDuplicates)
        }
        return set
    };
    ArraySet[$efront_string_protot][$efront_string_size] = function ArraySet_size() {
        return hasNativeMap ? this[$efront_string__set][$efront_string_size] : Object[$efront_string_getOwn](this[$efront_string__set])[$efront_string_length]
    };
    ArraySet[$efront_string_protot][$efront_string_add] = function ArraySet_add(aStr, aAllowDuplicates) {
        var sStr = hasNativeMap ? aStr : util[$efront_string_toSetS](aStr);
        var isDuplicate = hasNativeMap ? this[$efront_string_has](aStr) : has[$efront_string_call](this[$efront_string__set], sStr);
        var idx = this[$efront_string__array][$efront_string_length];
        if (!isDuplicate || aAllowDuplicates) {
            this[$efront_string__array][$efront_string_push](aStr)
        }
        if (!isDuplicate) {
            if (hasNativeMap) {
                this[$efront_string__set][$efront_string_set](aStr, idx)
            } else {
                this[$efront_string__set][sStr] = idx
            }
        }
    };
    ArraySet[$efront_string_protot][$efront_string_has] = function ArraySet_has(aStr) {
        if (hasNativeMap) {
            return this[$efront_string__set][$efront_string_has](aStr)
        } else {
            var sStr = util[$efront_string_toSetS](aStr);
            return has[$efront_string_call](this[$efront_string__set], sStr)
        }
    };
    ArraySet[$efront_string_protot][$efront_string_indexO] = function ArraySet_indexOf(aStr) {
        if (hasNativeMap) {
            var idx = this[$efront_string__set][$efront_string_get](aStr);
            if (idx >= 0) {
                return idx
            }
        } else {
            var sStr = util[$efront_string_toSetS](aStr);
            if (has[$efront_string_call](this[$efront_string__set], sStr)) {
                return this[$efront_string__set][sStr]
            }
        }
        throw new Error($efront_string__6 + aStr + $efront_string__is_no)
    };
    ArraySet[$efront_string_protot][$efront_string_at] = function ArraySet_at(aIdx) {
        if (aIdx >= 0 && aIdx < this[$efront_string__array][$efront_string_length]) {
            return this[$efront_string__array][aIdx]
        }
        throw new Error($efront_string_No_ele + aIdx)
    };
    ArraySet[$efront_string_protot][$efront_string_toArra] = function ArraySet_toArray() {
        return this[$efront_string__array][$efront_string_slice]()
    };
    exports[$efront_string_ArrayS] = ArraySet;
    return exports
}],
/** 445 $efront_string__file */ "_file",
/** 446 $efront_string_file */ "file",
/** 447 $efront_string__sourc */ "_sourceRoot",
/** 448 $efront_string_source3 */ "sourceRoot",
/** 449 $efront_string__skipV */ "_skipValidation",
/** 450 $efront_string_skipVa */ "skipValidation",
/** 451 $efront_string__sourc1 */ "_sources",
/** 452 $efront_string__names */ "_names",
/** 453 $efront_string__mappi */ "_mappings",
/** 454 $efront_string__sourc2 */ "_sourcesContents",
/** 455 $efront_string__versi */ "_version",
/** 456 $efront_string_fromSo */ "fromSourceMap",
/** 457 $efront_string_eachMa */ "eachMapping",
/** 458 $efront_string_genera2 */ "generated",
/** 459 $efront_string_line */ "line",
/** 460 $efront_string_column */ "column",
/** 461 $efront_string_origin2 */ "original",
/** 462 $efront_string_addMap */ "addMapping",
/** 463 $efront_string_source4 */ "sources",
/** 464 $efront_string_source5 */ "sourceContentFor",
/** 465 $efront_string_setSou */ "setSourceContent",
/** 466 $efront_string__valid */ "_validateMapping",
/** 467 $efront_string_applyS */ "applySourceMap",
/** 468 $efront_string_Source */ /** text */ "SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ",
/** 469 $efront_string_or_the */ /** text */ "or the source map's \"file\" property. Both were omitted.",
/** 470 $efront_string_origin3 */ "originalPositionFor",
/** 471 $efront_string_origin4 */ /** text */ "original.line and original.column are not numbers -- you probably meant to omit ",
/** 472 $efront_string_the_or */ /** text */ "the original mapping entirely and only map the generated position. If so, pass ",
/** 473 $efront_string_null_f */ /** text */ "null for the original mapping instead of an object with empty or null values.",
/** 474 $efront_string_Invali1 */ /** text */ "Invalid mapping: ",
/** 475 $efront_string__seria */ "_serializeMappings",
/** 476 $efront_string__22 */ ";",
/** 477 $efront_string__gener */ "_generateSourcesContent",
/** 478 $efront_string_map */ "map",
/** 479 $efront_string_toJSON */ "toJSON",
/** 480 $efront_string_names */ "names",
/** 481 $efront_string_mappin */ "mappings",
/** 482 $efront_string_source6 */ "sourcesContent",
/** 483 $efront_string_Source1 */ "SourceMapGenerator",
/** 484 source-map$lib$source-map-generator.js */ [1,15,63,61,114,48,443,430,445,381,446,447,448,449,450,451,452,453,454,257,455,456,457,458,459,412,460,411,231,404,461,409,410,301,462,463,426,437,427,464,465,466,283,407,111,3,467,468,469,425,470,11,57,471,472,473,474,113,475,428,476,415,98,45,9,477,478,35,12,479,317,480,481,482,37,483,function(require, String, Object, Error, JSON, exports, $efront_string_ArrayS, $efront_string_Mappin, $efront_string__file, $efront_string_getArg, $efront_string_file, $efront_string__sourc, $efront_string_source3, $efront_string__skipV, $efront_string_skipVa, $efront_string__sourc1, $efront_string__names, $efront_string__mappi, $efront_string__sourc2, $efront_string_protot, $efront_string__versi, $efront_string_fromSo, $efront_string_eachMa, $efront_string_genera2, $efront_string_line, $efront_string_genera1, $efront_string_column, $efront_string_genera, $efront_string_source, $efront_string_relati, $efront_string_origin2, $efront_string_origin, $efront_string_origin1, $efront_string_name, $efront_string_addMap, $efront_string_source4, $efront_string_forEac, $efront_string_has, $efront_string_add, $efront_string_source5, $efront_string_setSou, $efront_string__valid, $efront_string_create, $efront_string_toSetS, $efront_string_keys, $efront_string_length, $efront_string_applyS, $efront_string_Source, $efront_string_or_the, $efront_string_unsort, $efront_string_origin3, $efront_string_join, $efront_string_number, $efront_string_origin4, $efront_string_the_or, $efront_string_null_f, $efront_string_Invali1, $efront_string_string2, $efront_string__seria, $efront_string_toArra, $efront_string__22, $efront_string_compar2, $efront_string__12, $efront_string_encode, $efront_string_indexO, $efront_string__gener, $efront_string_map, $efront_string_hasOwn, $efront_string_call, $efront_string_toJSON, $efront_string_versio, $efront_string_names, $efront_string_mappin, $efront_string_source6, $efront_string_toStri, $efront_string_Source1) {
    var base64VLQ = require(79);
    var util = require(421);
    var ArraySet = require(444)[$efront_string_ArrayS];
    var MappingList = require(431)[$efront_string_Mappin];
    function SourceMapGenerator(aArgs) {
        if (!aArgs) {
            aArgs = {}
        }
        this[$efront_string__file] = util[$efront_string_getArg](aArgs, $efront_string_file, null);
        this[$efront_string__sourc] = util[$efront_string_getArg](aArgs, $efront_string_source3, null);
        this[$efront_string__skipV] = util[$efront_string_getArg](aArgs, $efront_string_skipVa, false);
        this[$efront_string__sourc1] = new ArraySet;
        this[$efront_string__names] = new ArraySet;
        this[$efront_string__mappi] = new MappingList;
        this[$efront_string__sourc2] = null
    }
    SourceMapGenerator[$efront_string_protot][$efront_string__versi] = 3;
    SourceMapGenerator[$efront_string_fromSo] = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
        var _a;
        var sourceRoot = aSourceMapConsumer[$efront_string_source3];
        var generator = new SourceMapGenerator((_a = {}, _a[$efront_string_file] = aSourceMapConsumer[$efront_string_file], _a[$efront_string_source3] = sourceRoot, _a));
        aSourceMapConsumer[$efront_string_eachMa](function (mapping) {
            var _a, _b, _c;
            var newMapping = (_a = {}, _a[$efront_string_genera2] = (_b = {}, _b[$efront_string_line] = mapping[$efront_string_genera1], _b[$efront_string_column] = mapping[$efront_string_genera], _b), _a);
            if (mapping[$efront_string_source] != null) {
                newMapping[$efront_string_source] = mapping[$efront_string_source];
                if (sourceRoot != null) {
                    newMapping[$efront_string_source] = util[$efront_string_relati](sourceRoot, newMapping[$efront_string_source])
                }
                newMapping[$efront_string_origin2] = (_c = {}, _c[$efront_string_line] = mapping[$efront_string_origin], _c[$efront_string_column] = mapping[$efront_string_origin1], _c);
                if (mapping[$efront_string_name] != null) {
                    newMapping[$efront_string_name] = mapping[$efront_string_name]
                }
            }
            generator[$efront_string_addMap](newMapping)
        });
        aSourceMapConsumer[$efront_string_source4][$efront_string_forEac](function (sourceFile) {
            var sourceRelative = sourceFile;
            if (sourceRoot !== null) {
                sourceRelative = util[$efront_string_relati](sourceRoot, sourceFile)
            }
            if (!generator[$efront_string__sourc1][$efront_string_has](sourceRelative)) {
                generator[$efront_string__sourc1][$efront_string_add](sourceRelative)
            }
            var content = aSourceMapConsumer[$efront_string_source5](sourceFile);
            if (content != null) {
                generator[$efront_string_setSou](sourceFile, content)
            }
        });
        return generator
    };
    SourceMapGenerator[$efront_string_protot][$efront_string_addMap] = function SourceMapGenerator_addMapping(aArgs) {
        var _a;
        var generated = util[$efront_string_getArg](aArgs, $efront_string_genera2);
        var original = util[$efront_string_getArg](aArgs, $efront_string_origin2, null);
        var source = util[$efront_string_getArg](aArgs, $efront_string_source, null);
        var name = util[$efront_string_getArg](aArgs, $efront_string_name, null);
        if (!this[$efront_string__skipV]) {
            this[$efront_string__valid](generated, original, source, name)
        }
        if (source != null) {
            source = String(source);
            if (!this[$efront_string__sourc1][$efront_string_has](source)) {
                this[$efront_string__sourc1][$efront_string_add](source)
            }
        }
        if (name != null) {
            name = String(name);
            if (!this[$efront_string__names][$efront_string_has](name)) {
                this[$efront_string__names][$efront_string_add](name)
            }
        }
        this[$efront_string__mappi][$efront_string_add]((_a = {}, _a[$efront_string_genera1] = generated[$efront_string_line], _a[$efront_string_genera] = generated[$efront_string_column], _a[$efront_string_origin] = original != null && original[$efront_string_line], _a[$efront_string_origin1] = original != null && original[$efront_string_column], _a[$efront_string_source] = source, _a[$efront_string_name] = name, _a))
    };
    SourceMapGenerator[$efront_string_protot][$efront_string_setSou] = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
        var source = aSourceFile;
        if (this[$efront_string__sourc] != null) {
            source = util[$efront_string_relati](this[$efront_string__sourc], source)
        }
        if (aSourceContent != null) {
            if (!this[$efront_string__sourc2]) {
                this[$efront_string__sourc2] = Object[$efront_string_create](null)
            }
            this[$efront_string__sourc2][util[$efront_string_toSetS](source)] = aSourceContent
        } else if (this[$efront_string__sourc2]) {
            delete this[$efront_string__sourc2][util[$efront_string_toSetS](source)];
            if (Object[$efront_string_keys](this[$efront_string__sourc2])[$efront_string_length] === 0) {
                this[$efront_string__sourc2] = null
            }
        }
    };
    SourceMapGenerator[$efront_string_protot][$efront_string_applyS] = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
        var sourceFile = aSourceFile;
        if (aSourceFile == null) {
            if (aSourceMapConsumer[$efront_string_file] == null) {
                throw new Error($efront_string_Source + $efront_string_or_the)
            }
            sourceFile = aSourceMapConsumer[$efront_string_file]
        }
        var sourceRoot = this[$efront_string__sourc];
        if (sourceRoot != null) {
            sourceFile = util[$efront_string_relati](sourceRoot, sourceFile)
        }
        var newSources = new ArraySet;
        var newNames = new ArraySet;
        this[$efront_string__mappi][$efront_string_unsort](function (mapping) {
            var _a;
            if (mapping[$efront_string_source] === sourceFile && mapping[$efront_string_origin] != null) {
                var original = aSourceMapConsumer[$efront_string_origin3]((_a = {}, _a[$efront_string_line] = mapping[$efront_string_origin], _a[$efront_string_column] = mapping[$efront_string_origin1], _a));
                if (original[$efront_string_source] != null) {
                    mapping[$efront_string_source] = original[$efront_string_source];
                    if (aSourceMapPath != null) {
                        mapping[$efront_string_source] = util[$efront_string_join](aSourceMapPath, mapping[$efront_string_source])
                    }
                    if (sourceRoot != null) {
                        mapping[$efront_string_source] = util[$efront_string_relati](sourceRoot, mapping[$efront_string_source])
                    }
                    mapping[$efront_string_origin] = original[$efront_string_line];
                    mapping[$efront_string_origin1] = original[$efront_string_column];
                    if (original[$efront_string_name] != null) {
                        mapping[$efront_string_name] = original[$efront_string_name]
                    }
                }
            }
            var source = mapping[$efront_string_source];
            if (source != null && !newSources[$efront_string_has](source)) {
                newSources[$efront_string_add](source)
            }
            var name = mapping[$efront_string_name];
            if (name != null && !newNames[$efront_string_has](name)) {
                newNames[$efront_string_add](name)
            }
        }, this);
        this[$efront_string__sourc1] = newSources;
        this[$efront_string__names] = newNames;
        aSourceMapConsumer[$efront_string_source4][$efront_string_forEac](function (sourceFile) {
            var content = aSourceMapConsumer[$efront_string_source5](sourceFile);
            if (content != null) {
                if (aSourceMapPath != null) {
                    sourceFile = util[$efront_string_join](aSourceMapPath, sourceFile)
                }
                if (sourceRoot != null) {
                    sourceFile = util[$efront_string_relati](sourceRoot, sourceFile)
                }
                this[$efront_string_setSou](sourceFile, content)
            }
        }, this)
    };
    SourceMapGenerator[$efront_string_protot][$efront_string__valid] = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
        var _a;
        if (aOriginal && typeof aOriginal[$efront_string_line] !== $efront_string_number && typeof aOriginal[$efront_string_column] !== $efront_string_number) {
            throw new Error($efront_string_origin4 + $efront_string_the_or + $efront_string_null_f)
        }
        if (aGenerated && $efront_string_line in aGenerated && $efront_string_column in aGenerated && aGenerated[$efront_string_line] > 0 && aGenerated[$efront_string_column] >= 0 && !aOriginal && !aSource && !aName) {
            return
        } else if (aGenerated && $efront_string_line in aGenerated && $efront_string_column in aGenerated && aOriginal && $efront_string_line in aOriginal && $efront_string_column in aOriginal && aGenerated[$efront_string_line] > 0 && aGenerated[$efront_string_column] >= 0 && aOriginal[$efront_string_line] > 0 && aOriginal[$efront_string_column] >= 0 && aSource) {
            return
        } else {
            throw new Error($efront_string_Invali1 + JSON[$efront_string_string2]((_a = {}, _a[$efront_string_genera2] = aGenerated, _a[$efront_string_source] = aSource, _a[$efront_string_origin2] = aOriginal, _a[$efront_string_name] = aName, _a)))
        }
    };
    SourceMapGenerator[$efront_string_protot][$efront_string__seria] = function SourceMapGenerator_serializeMappings() {
        var previousGeneratedColumn = 0;
        var previousGeneratedLine = 1;
        var previousOriginalColumn = 0;
        var previousOriginalLine = 0;
        var previousName = 0;
        var previousSource = 0;
        var result = '';
        var next;
        var mapping;
        var nameIdx;
        var sourceIdx;
        var mappings = this[$efront_string__mappi][$efront_string_toArra]();
        for (var i = 0, len = mappings[$efront_string_length]; i < len; i++) {
            mapping = mappings[i];
            next = '';
            if (mapping[$efront_string_genera1] !== previousGeneratedLine) {
                previousGeneratedColumn = 0;
                while (mapping[$efront_string_genera1] !== previousGeneratedLine) {
                    next += $efront_string__22;
                    previousGeneratedLine++
                }
            } else {
                if (i > 0) {
                    if (!util[$efront_string_compar2](mapping, mappings[i - 1])) {
                        continue
                    }
                    next += $efront_string__12
                }
            }
            next += base64VLQ[$efront_string_encode](mapping[$efront_string_genera] - previousGeneratedColumn);
            previousGeneratedColumn = mapping[$efront_string_genera];
            if (mapping[$efront_string_source] != null) {
                sourceIdx = this[$efront_string__sourc1][$efront_string_indexO](mapping[$efront_string_source]);
                next += base64VLQ[$efront_string_encode](sourceIdx - previousSource);
                previousSource = sourceIdx;
                next += base64VLQ[$efront_string_encode](mapping[$efront_string_origin] - 1 - previousOriginalLine);
                previousOriginalLine = mapping[$efront_string_origin] - 1;
                next += base64VLQ[$efront_string_encode](mapping[$efront_string_origin1] - previousOriginalColumn);
                previousOriginalColumn = mapping[$efront_string_origin1];
                if (mapping[$efront_string_name] != null) {
                    nameIdx = this[$efront_string__names][$efront_string_indexO](mapping[$efront_string_name]);
                    next += base64VLQ[$efront_string_encode](nameIdx - previousName);
                    previousName = nameIdx
                }
            }
            result += next
        }
        return result
    };
    SourceMapGenerator[$efront_string_protot][$efront_string__gener] = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
        return aSources[$efront_string_map](function (source) {
            if (!this[$efront_string__sourc2]) {
                return null
            }
            if (aSourceRoot != null) {
                source = util[$efront_string_relati](aSourceRoot, source)
            }
            var key = util[$efront_string_toSetS](source);
            return Object[$efront_string_protot][$efront_string_hasOwn][$efront_string_call](this[$efront_string__sourc2], key) ? this[$efront_string__sourc2][key] : null
        }, this)
    };
    SourceMapGenerator[$efront_string_protot][$efront_string_toJSON] = function SourceMapGenerator_toJSON() {
        var _a;
        var map = (_a = {}, _a[$efront_string_versio] = this[$efront_string__versi], _a[$efront_string_source4] = this[$efront_string__sourc1][$efront_string_toArra](), _a[$efront_string_names] = this[$efront_string__names][$efront_string_toArra](), _a[$efront_string_mappin] = this[$efront_string__seria](), _a);
        if (this[$efront_string__file] != null) {
            map[$efront_string_file] = this[$efront_string__file]
        }
        if (this[$efront_string__sourc] != null) {
            map[$efront_string_source3] = this[$efront_string__sourc]
        }
        if (this[$efront_string__sourc2]) {
            map[$efront_string_source6] = this[$efront_string__gener](map[$efront_string_source4], map[$efront_string_source3])
        }
        return map
    };
    SourceMapGenerator[$efront_string_protot][$efront_string_toStri] = function SourceMapGenerator_toString() {
        return JSON[$efront_string_string2](this[$efront_string_toJSON]())
    };
    exports[$efront_string_Source1] = SourceMapGenerator;
    return exports
}],
/** 485 $efront_string_sectio */ "sections",
/** 486 $efront_string___gene */ "__generatedMappings",
/** 487 $efront_string_define */ "defineProperty",
/** 488 $efront_string__gener1 */ "_generatedMappings",
/** 489 $efront_string_config */ "configurable",
/** 490 $efront_string_enumer */ "enumerable",
/** 491 $efront_string__parse */ "_parseMappings",
/** 492 $efront_string___orig */ "__originalMappings",
/** 493 $efront_string__origi */ "_originalMappings",
/** 494 $efront_string__charI */ "_charIsMappingSeparator",
/** 495 $efront_string_Subcla */ /** text */ "Subclasses must implement _parseMappings",
/** 496 $efront_string_GENERA */ "GENERATED_ORDER",
/** 497 $efront_string_ORIGIN */ "ORIGINAL_ORDER",
/** 498 $efront_string_Unknow1 */ /** text */ "Unknown order of iteration.",
/** 499 $efront_string__sourc3 */ "_sourceMapURL",
/** 500 $efront_string_allGen */ "allGeneratedPositionsFor",
/** 501 $efront_string__findS */ "_findSourceIndex",
/** 502 $efront_string__findM */ "_findMapping",
/** 503 $efront_string_lastCo */ "lastColumn",
/** 504 $efront_string_lastGe */ "lastGeneratedColumn",
/** 505 $efront_string_Source2 */ "SourceMapConsumer",
/** 506 $efront_string_Unsupp */ /** text */ "Unsupported version: ",
/** 507 $efront_string__absol */ "_absoluteSources",
/** 508 $efront_string_consum */ "consumer",
/** 509 $efront_string_Found_ */ /** text */ "Found a source, but no line and column",
/** 510 $efront_string_Found_1 */ /** text */ "Found a source and line, but no column",
/** 511 $efront_string_Line_m */ /** text */ "Line must be greater than or equal to 1, got ",
/** 512 $efront_string_Column */ /** text */ "Column must be greater than or equal to 0, got ",
/** 513 $efront_string_comput1 */ "computeColumnSpans",
/** 514 $efront_string_bias */ "bias",
/** 515 $efront_string_hasCon */ "hasContentsOfAllSources",
/** 516 $efront_string_some */ "some",
/** 517 $efront_regexp__file_ */ /^file:\/\//,
/** 518 $efront_string__is_no1 */ /** text */ "\" is not in the SourceMap.",
/** 519 $efront_string_genera3 */ "generatedPositionFor",
/** 520 $efront_string_BasicS */ "BasicSourceMapConsumer",
/** 521 $efront_string__secti */ "_sections",
/** 522 $efront_string_Suppor */ /** text */ "Support for url field in sections not implemented.",
/** 523 $efront_string_offset */ "offset",
/** 524 $efront_string_Sectio */ /** text */ "Section offsets must be ordered and non-overlapping.",
/** 525 $efront_string_genera4 */ "generatedOffset",
/** 526 $efront_string_constr */ "constructor",
/** 527 $efront_string_every */ "every",
/** 528 $efront_string_Indexe */ "IndexedSourceMapConsumer",
/** 529 source-map$lib$source-map-consumer.js */ [1,63,61,115,48,15,49,443,67,10,417,485,456,257,455,486,487,488,489,490,439,491,453,448,492,493,494,76,476,98,495,496,497,69,70,457,498,478,231,451,441,420,499,412,411,409,410,301,452,426,500,381,459,460,501,502,413,110,503,504,505,317,463,480,482,481,446,506,397,393,404,434,507,428,283,508,437,9,3,447,477,445,2,46,77,78,509,510,57,414,511,512,72,513,470,514,515,435,516,464,389,31,517,385,262,396,30,518,519,520,521,329,522,523,524,525,526,527,427,528,function(require, Object, Error, undefined, exports, String, TypeError, $efront_string_ArrayS, $efront_string_quickS, $efront_string_string, $efront_string_parseS, $efront_string_sectio, $efront_string_fromSo, $efront_string_protot, $efront_string__versi, $efront_string___gene, $efront_string_define, $efront_string__gener1, $efront_string_config, $efront_string_enumer, $efront_string_get, $efront_string__parse, $efront_string__mappi, $efront_string_source3, $efront_string___orig, $efront_string__origi, $efront_string__charI, $efront_string_charAt, $efront_string__22, $efront_string__12, $efront_string_Subcla, $efront_string_GENERA, $efront_string_ORIGIN, $efront_string_GREATE, $efront_string_LEAST_, $efront_string_eachMa, $efront_string_Unknow1, $efront_string_map, $efront_string_source, $efront_string__sourc1, $efront_string_at, $efront_string_comput, $efront_string__sourc3, $efront_string_genera1, $efront_string_genera, $efront_string_origin, $efront_string_origin1, $efront_string_name, $efront_string__names, $efront_string_forEac, $efront_string_allGen, $efront_string_getArg, $efront_string_line, $efront_string_column, $efront_string__findS, $efront_string__findM, $efront_string_compar, $efront_string_push, $efront_string_lastCo, $efront_string_lastGe, $efront_string_Source2, $efront_string_versio, $efront_string_source4, $efront_string_names, $efront_string_source6, $efront_string_mappin, $efront_string_file, $efront_string_Unsupp, $efront_string_normal, $efront_string_isAbso, $efront_string_relati, $efront_string_fromAr, $efront_string__absol, $efront_string_toArra, $efront_string_create, $efront_string_consum, $efront_string_has, $efront_string_indexO, $efront_string_length, $efront_string__sourc, $efront_string__gener, $efront_string__file, $efront_string_slice, $efront_string_decode, $efront_string_value, $efront_string_rest, $efront_string_Found_, $efront_string_Found_1, $efront_string_number, $efront_string_compar1, $efront_string_Line_m, $efront_string_Column, $efront_string_search, $efront_string_comput1, $efront_string_origin3, $efront_string_bias, $efront_string_hasCon, $efront_string_size, $efront_string_some, $efront_string_source5, $efront_string_urlPar, $efront_string_replac, $efront_regexp__file_, $efront_string_scheme, $efront_string_path, $efront_string__20, $efront_string__6, $efront_string__is_no1, $efront_string_genera3, $efront_string_BasicS, $efront_string__secti, $efront_string_url, $efront_string_Suppor, $efront_string_offset, $efront_string_Sectio, $efront_string_genera4, $efront_string_constr, $efront_string_every, $efront_string_add, $efront_string_Indexe) {
    var _a, _b, _c, _d;
    var util = require(421);
    var binarySearch = require(73);
    var ArraySet = require(444)[$efront_string_ArrayS];
    var base64VLQ = require(79);
    var quickSort = require(68)[$efront_string_quickS];
    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === $efront_string_string) {
            sourceMap = util[$efront_string_parseS](aSourceMap)
        }
        return sourceMap[$efront_string_sectio] != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL)
    }
    SourceMapConsumer[$efront_string_fromSo] = function (aSourceMap, aSourceMapURL) {
        return BasicSourceMapConsumer[$efront_string_fromSo](aSourceMap, aSourceMapURL)
    };
    SourceMapConsumer[$efront_string_protot][$efront_string__versi] = 3;
    SourceMapConsumer[$efront_string_protot][$efront_string___gene] = null;
    Object[$efront_string_define](SourceMapConsumer[$efront_string_protot], $efront_string__gener1, (_a = {}, _a[$efront_string_config] = true, _a[$efront_string_enumer] = true, _a[$efront_string_get] = function () {
        if (!this[$efront_string___gene]) {
            this[$efront_string__parse](this[$efront_string__mappi], this[$efront_string_source3])
        }
        return this[$efront_string___gene]
    }, _a));
    SourceMapConsumer[$efront_string_protot][$efront_string___orig] = null;
    Object[$efront_string_define](SourceMapConsumer[$efront_string_protot], $efront_string__origi, (_b = {}, _b[$efront_string_config] = true, _b[$efront_string_enumer] = true, _b[$efront_string_get] = function () {
        if (!this[$efront_string___orig]) {
            this[$efront_string__parse](this[$efront_string__mappi], this[$efront_string_source3])
        }
        return this[$efront_string___orig]
    }, _b));
    SourceMapConsumer[$efront_string_protot][$efront_string__charI] = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
        var c = aStr[$efront_string_charAt](index);
        return c === $efront_string__22 || c === $efront_string__12
    };
    SourceMapConsumer[$efront_string_protot][$efront_string__parse] = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        throw new Error($efront_string_Subcla)
    };
    SourceMapConsumer[$efront_string_GENERA] = 1;
    SourceMapConsumer[$efront_string_ORIGIN] = 2;
    SourceMapConsumer[$efront_string_GREATE] = 1;
    SourceMapConsumer[$efront_string_LEAST_] = 2;
    SourceMapConsumer[$efront_string_protot][$efront_string_eachMa] = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
        var context = aContext || null;
        var order = aOrder || SourceMapConsumer[$efront_string_GENERA];
        var mappings;
        switch (order) {
        case SourceMapConsumer[$efront_string_GENERA]:
            mappings = this[$efront_string__gener1];
            break;
        case SourceMapConsumer[$efront_string_ORIGIN]:
            mappings = this[$efront_string__origi];
            break;
        default:
            throw new Error($efront_string_Unknow1)
        }
        var sourceRoot = this[$efront_string_source3];
        mappings[$efront_string_map](function (mapping) {
            var _a;
            var source = mapping[$efront_string_source] === null ? null : this[$efront_string__sourc1][$efront_string_at](mapping[$efront_string_source]);
            source = util[$efront_string_comput](sourceRoot, source, this[$efront_string__sourc3]);
            return _a = {}, _a[$efront_string_source] = source, _a[$efront_string_genera1] = mapping[$efront_string_genera1], _a[$efront_string_genera] = mapping[$efront_string_genera], _a[$efront_string_origin] = mapping[$efront_string_origin], _a[$efront_string_origin1] = mapping[$efront_string_origin1], _a[$efront_string_name] = mapping[$efront_string_name] === null ? null : this[$efront_string__names][$efront_string_at](mapping[$efront_string_name]), _a
        }, this)[$efront_string_forEac](aCallback, context)
    };
    SourceMapConsumer[$efront_string_protot][$efront_string_allGen] = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
        var _a, _b, _c;
        var line = util[$efront_string_getArg](aArgs, $efront_string_line);
        var needle = (_a = {}, _a[$efront_string_source] = util[$efront_string_getArg](aArgs, $efront_string_source), _a[$efront_string_origin] = line, _a[$efront_string_origin1] = util[$efront_string_getArg](aArgs, $efront_string_column, 0), _a);
        needle[$efront_string_source] = this[$efront_string__findS](needle[$efront_string_source]);
        if (needle[$efront_string_source] < 0) {
            return []
        }
        var mappings = [];
        var index = this[$efront_string__findM](needle, this[$efront_string__origi], $efront_string_origin, $efront_string_origin1, util[$efront_string_compar], binarySearch[$efront_string_LEAST_]);
        if (index >= 0) {
            var mapping = this[$efront_string__origi][index];
            if (aArgs[$efront_string_column] === undefined) {
                var originalLine = mapping[$efront_string_origin];
                while (mapping && mapping[$efront_string_origin] === originalLine) {
                    mappings[$efront_string_push]((_b = {}, _b[$efront_string_line] = util[$efront_string_getArg](mapping, $efront_string_genera1, null), _b[$efront_string_column] = util[$efront_string_getArg](mapping, $efront_string_genera, null), _b[$efront_string_lastCo] = util[$efront_string_getArg](mapping, $efront_string_lastGe, null), _b));
                    mapping = this[$efront_string__origi][++index]
                }
            } else {
                var originalColumn = mapping[$efront_string_origin1];
                while (mapping && mapping[$efront_string_origin] === line && mapping[$efront_string_origin1] == originalColumn) {
                    mappings[$efront_string_push]((_c = {}, _c[$efront_string_line] = util[$efront_string_getArg](mapping, $efront_string_genera1, null), _c[$efront_string_column] = util[$efront_string_getArg](mapping, $efront_string_genera, null), _c[$efront_string_lastCo] = util[$efront_string_getArg](mapping, $efront_string_lastGe, null), _c));
                    mapping = this[$efront_string__origi][++index]
                }
            }
        }
        return mappings
    };
    exports[$efront_string_Source2] = SourceMapConsumer;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === $efront_string_string) {
            sourceMap = util[$efront_string_parseS](aSourceMap)
        }
        var version = util[$efront_string_getArg](sourceMap, $efront_string_versio);
        var sources = util[$efront_string_getArg](sourceMap, $efront_string_source4);
        var names = util[$efront_string_getArg](sourceMap, $efront_string_names, []);
        var sourceRoot = util[$efront_string_getArg](sourceMap, $efront_string_source3, null);
        var sourcesContent = util[$efront_string_getArg](sourceMap, $efront_string_source6, null);
        var mappings = util[$efront_string_getArg](sourceMap, $efront_string_mappin);
        var file = util[$efront_string_getArg](sourceMap, $efront_string_file, null);
        if (version != this[$efront_string__versi]) {
            throw new Error($efront_string_Unsupp + version)
        }
        if (sourceRoot) {
            sourceRoot = util[$efront_string_normal](sourceRoot)
        }
        sources = sources[$efront_string_map](String)[$efront_string_map](util[$efront_string_normal])[$efront_string_map](function (source) {
            return sourceRoot && util[$efront_string_isAbso](sourceRoot) && util[$efront_string_isAbso](source) ? util[$efront_string_relati](sourceRoot, source) : source
        });
        this[$efront_string__names] = ArraySet[$efront_string_fromAr](names[$efront_string_map](String), true);
        this[$efront_string__sourc1] = ArraySet[$efront_string_fromAr](sources, true);
        this[$efront_string__absol] = this[$efront_string__sourc1][$efront_string_toArra]()[$efront_string_map](function (s) {
            return util[$efront_string_comput](sourceRoot, s, aSourceMapURL)
        });
        this[$efront_string_source3] = sourceRoot;
        this[$efront_string_source6] = sourcesContent;
        this[$efront_string__mappi] = mappings;
        this[$efront_string__sourc3] = aSourceMapURL;
        this[$efront_string_file] = file
    }
    BasicSourceMapConsumer[$efront_string_protot] = Object[$efront_string_create](SourceMapConsumer[$efront_string_protot]);
    BasicSourceMapConsumer[$efront_string_protot][$efront_string_consum] = SourceMapConsumer;
    BasicSourceMapConsumer[$efront_string_protot][$efront_string__findS] = function (aSource) {
        var relativeSource = aSource;
        if (this[$efront_string_source3] != null) {
            relativeSource = util[$efront_string_relati](this[$efront_string_source3], relativeSource)
        }
        if (this[$efront_string__sourc1][$efront_string_has](relativeSource)) {
            return this[$efront_string__sourc1][$efront_string_indexO](relativeSource)
        }
        var i;
        for (i = 0; i < this[$efront_string__absol][$efront_string_length]; ++i) {
            if (this[$efront_string__absol][i] == aSource) {
                return i
            }
        }
        return -1
    };
    BasicSourceMapConsumer[$efront_string_fromSo] = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
        var smc = Object[$efront_string_create](BasicSourceMapConsumer[$efront_string_protot]);
        var names = smc[$efront_string__names] = ArraySet[$efront_string_fromAr](aSourceMap[$efront_string__names][$efront_string_toArra](), true);
        var sources = smc[$efront_string__sourc1] = ArraySet[$efront_string_fromAr](aSourceMap[$efront_string__sourc1][$efront_string_toArra](), true);
        smc[$efront_string_source3] = aSourceMap[$efront_string__sourc];
        smc[$efront_string_source6] = aSourceMap[$efront_string__gener](smc[$efront_string__sourc1][$efront_string_toArra](), smc[$efront_string_source3]);
        smc[$efront_string_file] = aSourceMap[$efront_string__file];
        smc[$efront_string__sourc3] = aSourceMapURL;
        smc[$efront_string__absol] = smc[$efront_string__sourc1][$efront_string_toArra]()[$efront_string_map](function (s) {
            return util[$efront_string_comput](smc[$efront_string_source3], s, aSourceMapURL)
        });
        var generatedMappings = aSourceMap[$efront_string__mappi][$efront_string_toArra]()[$efront_string_slice]();
        var destGeneratedMappings = smc[$efront_string___gene] = [];
        var destOriginalMappings = smc[$efront_string___orig] = [];
        for (var i = 0, length = generatedMappings[$efront_string_length]; i < length; i++) {
            var srcMapping = generatedMappings[i];
            var destMapping = new Mapping;
            destMapping[$efront_string_genera1] = srcMapping[$efront_string_genera1];
            destMapping[$efront_string_genera] = srcMapping[$efront_string_genera];
            if (srcMapping[$efront_string_source]) {
                destMapping[$efront_string_source] = sources[$efront_string_indexO](srcMapping[$efront_string_source]);
                destMapping[$efront_string_origin] = srcMapping[$efront_string_origin];
                destMapping[$efront_string_origin1] = srcMapping[$efront_string_origin1];
                if (srcMapping[$efront_string_name]) {
                    destMapping[$efront_string_name] = names[$efront_string_indexO](srcMapping[$efront_string_name])
                }
                destOriginalMappings[$efront_string_push](destMapping)
            }
            destGeneratedMappings[$efront_string_push](destMapping)
        }
        quickSort(smc[$efront_string___orig], util[$efront_string_compar]);
        return smc
    };
    BasicSourceMapConsumer[$efront_string_protot][$efront_string__versi] = 3;
    Object[$efront_string_define](BasicSourceMapConsumer[$efront_string_protot], $efront_string_source4, (_c = {}, _c[$efront_string_get] = function () {
        return this[$efront_string__absol][$efront_string_slice]()
    }, _c));
    function Mapping() {
        this[$efront_string_genera1] = 0;
        this[$efront_string_genera] = 0;
        this[$efront_string_source] = null;
        this[$efront_string_origin] = null;
        this[$efront_string_origin1] = null;
        this[$efront_string_name] = null
    }
    BasicSourceMapConsumer[$efront_string_protot][$efront_string__parse] = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        var generatedLine = 1;
        var previousGeneratedColumn = 0;
        var previousOriginalLine = 0;
        var previousOriginalColumn = 0;
        var previousSource = 0;
        var previousName = 0;
        var length = aStr[$efront_string_length];
        var index = 0;
        var cachedSegments = {};
        var temp = {};
        var originalMappings = [];
        var generatedMappings = [];
        var mapping, str, segment, end, value;
        while (index < length) {
            if (aStr[$efront_string_charAt](index) === $efront_string__22) {
                generatedLine++;
                index++;
                previousGeneratedColumn = 0
            } else if (aStr[$efront_string_charAt](index) === $efront_string__12) {
                index++
            } else {
                mapping = new Mapping;
                mapping[$efront_string_genera1] = generatedLine;
                for (end = index; end < length; end++) {
                    if (this[$efront_string__charI](aStr, end)) {
                        break
                    }
                }
                str = aStr[$efront_string_slice](index, end);
                segment = cachedSegments[str];
                if (segment) {
                    index += str[$efront_string_length]
                } else {
                    segment = [];
                    while (index < end) {
                        base64VLQ[$efront_string_decode](aStr, index, temp);
                        value = temp[$efront_string_value];
                        index = temp[$efront_string_rest];
                        segment[$efront_string_push](value)
                    }
                    if (segment[$efront_string_length] === 2) {
                        throw new Error($efront_string_Found_)
                    }
                    if (segment[$efront_string_length] === 3) {
                        throw new Error($efront_string_Found_1)
                    }
                    cachedSegments[str] = segment
                }
                mapping[$efront_string_genera] = previousGeneratedColumn + segment[0];
                previousGeneratedColumn = mapping[$efront_string_genera];
                if (segment[$efront_string_length] > 1) {
                    mapping[$efront_string_source] = previousSource + segment[1];
                    previousSource += segment[1];
                    mapping[$efront_string_origin] = previousOriginalLine + segment[2];
                    previousOriginalLine = mapping[$efront_string_origin];
                    mapping[$efront_string_origin] += 1;
                    mapping[$efront_string_origin1] = previousOriginalColumn + segment[3];
                    previousOriginalColumn = mapping[$efront_string_origin1];
                    if (segment[$efront_string_length] > 4) {
                        mapping[$efront_string_name] = previousName + segment[4];
                        previousName += segment[4]
                    }
                }
                generatedMappings[$efront_string_push](mapping);
                if (typeof mapping[$efront_string_origin] === $efront_string_number) {
                    originalMappings[$efront_string_push](mapping)
                }
            }
        }
        quickSort(generatedMappings, util[$efront_string_compar1]);
        this[$efront_string___gene] = generatedMappings;
        quickSort(originalMappings, util[$efront_string_compar]);
        this[$efront_string___orig] = originalMappings
    };
    BasicSourceMapConsumer[$efront_string_protot][$efront_string__findM] = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
        if (aNeedle[aLineName] <= 0) {
            throw new TypeError($efront_string_Line_m + aNeedle[aLineName])
        }
        if (aNeedle[aColumnName] < 0) {
            throw new TypeError($efront_string_Column + aNeedle[aColumnName])
        }
        return binarySearch[$efront_string_search](aNeedle, aMappings, aComparator, aBias)
    };
    BasicSourceMapConsumer[$efront_string_protot][$efront_string_comput1] = function SourceMapConsumer_computeColumnSpans() {
        for (var index = 0; index < this[$efront_string__gener1][$efront_string_length]; ++index) {
            var mapping = this[$efront_string__gener1][index];
            if (index + 1 < this[$efront_string__gener1][$efront_string_length]) {
                var nextMapping = this[$efront_string__gener1][index + 1];
                if (mapping[$efront_string_genera1] === nextMapping[$efront_string_genera1]) {
                    mapping[$efront_string_lastGe] = nextMapping[$efront_string_genera] - 1;
                    continue
                }
            }
            mapping[$efront_string_lastGe] = Infinity
        }
    };
    BasicSourceMapConsumer[$efront_string_protot][$efront_string_origin3] = function SourceMapConsumer_originalPositionFor(aArgs) {
        var _a, _b, _c;
        var needle = (_a = {}, _a[$efront_string_genera1] = util[$efront_string_getArg](aArgs, $efront_string_line), _a[$efront_string_genera] = util[$efront_string_getArg](aArgs, $efront_string_column), _a);
        var index = this[$efront_string__findM](needle, this[$efront_string__gener1], $efront_string_genera1, $efront_string_genera, util[$efront_string_compar1], util[$efront_string_getArg](aArgs, $efront_string_bias, SourceMapConsumer[$efront_string_GREATE]));
        if (index >= 0) {
            var mapping = this[$efront_string__gener1][index];
            if (mapping[$efront_string_genera1] === needle[$efront_string_genera1]) {
                var source = util[$efront_string_getArg](mapping, $efront_string_source, null);
                if (source !== null) {
                    source = this[$efront_string__sourc1][$efront_string_at](source);
                    source = util[$efront_string_comput](this[$efront_string_source3], source, this[$efront_string__sourc3])
                }
                var name = util[$efront_string_getArg](mapping, $efront_string_name, null);
                if (name !== null) {
                    name = this[$efront_string__names][$efront_string_at](name)
                }
                return _b = {}, _b[$efront_string_source] = source, _b[$efront_string_line] = util[$efront_string_getArg](mapping, $efront_string_origin, null), _b[$efront_string_column] = util[$efront_string_getArg](mapping, $efront_string_origin1, null), _b[$efront_string_name] = name, _b
            }
        }
        return _c = {}, _c[$efront_string_source] = null, _c[$efront_string_line] = null, _c[$efront_string_column] = null, _c[$efront_string_name] = null, _c
    };
    BasicSourceMapConsumer[$efront_string_protot][$efront_string_hasCon] = function BasicSourceMapConsumer_hasContentsOfAllSources() {
        if (!this[$efront_string_source6]) {
            return false
        }
        return this[$efront_string_source6][$efront_string_length] >= this[$efront_string__sourc1][$efront_string_size]() && !this[$efront_string_source6][$efront_string_some](function (sc) {
            return sc == null
        })
    };
    BasicSourceMapConsumer[$efront_string_protot][$efront_string_source5] = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        if (!this[$efront_string_source6]) {
            return null
        }
        var index = this[$efront_string__findS](aSource);
        if (index >= 0) {
            return this[$efront_string_source6][index]
        }
        var relativeSource = aSource;
        if (this[$efront_string_source3] != null) {
            relativeSource = util[$efront_string_relati](this[$efront_string_source3], relativeSource)
        }
        var url;
        if (this[$efront_string_source3] != null && (url = util[$efront_string_urlPar](this[$efront_string_source3]))) {
            var fileUriAbsPath = relativeSource[$efront_string_replac]($efront_regexp__file_, '');
            if (url[$efront_string_scheme] == $efront_string_file && this[$efront_string__sourc1][$efront_string_has](fileUriAbsPath)) {
                return this[$efront_string_source6][this[$efront_string__sourc1][$efront_string_indexO](fileUriAbsPath)]
            }
            if ((!url[$efront_string_path] || url[$efront_string_path] == $efront_string__20) && this[$efront_string__sourc1][$efront_string_has]($efront_string__20 + relativeSource)) {
                return this[$efront_string_source6][this[$efront_string__sourc1][$efront_string_indexO]($efront_string__20 + relativeSource)]
            }
        }
        if (nullOnMissing) {
            return null
        } else {
            throw new Error($efront_string__6 + relativeSource + $efront_string__is_no1)
        }
    };
    BasicSourceMapConsumer[$efront_string_protot][$efront_string_genera3] = function SourceMapConsumer_generatedPositionFor(aArgs) {
        var _a, _b, _c, _d;
        var source = util[$efront_string_getArg](aArgs, $efront_string_source);
        source = this[$efront_string__findS](source);
        if (source < 0) {
            return _a = {}, _a[$efront_string_line] = null, _a[$efront_string_column] = null, _a[$efront_string_lastCo] = null, _a
        }
        var needle = (_b = {}, _b[$efront_string_source] = source, _b[$efront_string_origin] = util[$efront_string_getArg](aArgs, $efront_string_line), _b[$efront_string_origin1] = util[$efront_string_getArg](aArgs, $efront_string_column), _b);
        var index = this[$efront_string__findM](needle, this[$efront_string__origi], $efront_string_origin, $efront_string_origin1, util[$efront_string_compar], util[$efront_string_getArg](aArgs, $efront_string_bias, SourceMapConsumer[$efront_string_GREATE]));
        if (index >= 0) {
            var mapping = this[$efront_string__origi][index];
            if (mapping[$efront_string_source] === needle[$efront_string_source]) {
                return _c = {}, _c[$efront_string_line] = util[$efront_string_getArg](mapping, $efront_string_genera1, null), _c[$efront_string_column] = util[$efront_string_getArg](mapping, $efront_string_genera, null), _c[$efront_string_lastCo] = util[$efront_string_getArg](mapping, $efront_string_lastGe, null), _c
            }
        }
        return _d = {}, _d[$efront_string_line] = null, _d[$efront_string_column] = null, _d[$efront_string_lastCo] = null, _d
    };
    exports[$efront_string_BasicS] = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
        var _a;
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === $efront_string_string) {
            sourceMap = util[$efront_string_parseS](aSourceMap)
        }
        var version = util[$efront_string_getArg](sourceMap, $efront_string_versio);
        var sections = util[$efront_string_getArg](sourceMap, $efront_string_sectio);
        if (version != this[$efront_string__versi]) {
            throw new Error($efront_string_Unsupp + version)
        }
        this[$efront_string__sourc1] = new ArraySet;
        this[$efront_string__names] = new ArraySet;
        var lastOffset = (_a = {}, _a[$efront_string_line] = -1, _a[$efront_string_column] = 0, _a);
        this[$efront_string__secti] = sections[$efront_string_map](function (s) {
            var _a, _b;
            if (s[$efront_string_url]) {
                throw new Error($efront_string_Suppor)
            }
            var offset = util[$efront_string_getArg](s, $efront_string_offset);
            var offsetLine = util[$efront_string_getArg](offset, $efront_string_line);
            var offsetColumn = util[$efront_string_getArg](offset, $efront_string_column);
            if (offsetLine < lastOffset[$efront_string_line] || offsetLine === lastOffset[$efront_string_line] && offsetColumn < lastOffset[$efront_string_column]) {
                throw new Error($efront_string_Sectio)
            }
            lastOffset = offset;
            return _a = {}, _a[$efront_string_genera4] = (_b = {}, _b[$efront_string_genera1] = offsetLine + 1, _b[$efront_string_genera] = offsetColumn + 1, _b), _a[$efront_string_consum] = new SourceMapConsumer(util[$efront_string_getArg](s, $efront_string_map), aSourceMapURL), _a
        })
    }
    IndexedSourceMapConsumer[$efront_string_protot] = Object[$efront_string_create](SourceMapConsumer[$efront_string_protot]);
    IndexedSourceMapConsumer[$efront_string_protot][$efront_string_constr] = SourceMapConsumer;
    IndexedSourceMapConsumer[$efront_string_protot][$efront_string__versi] = 3;
    Object[$efront_string_define](IndexedSourceMapConsumer[$efront_string_protot], $efront_string_source4, (_d = {}, _d[$efront_string_get] = function () {
        var sources = [];
        for (var i = 0; i < this[$efront_string__secti][$efront_string_length]; i++) {
            for (var j = 0; j < this[$efront_string__secti][i][$efront_string_consum][$efront_string_source4][$efront_string_length]; j++) {
                sources[$efront_string_push](this[$efront_string__secti][i][$efront_string_consum][$efront_string_source4][j])
            }
        }
        return sources
    }, _d));
    IndexedSourceMapConsumer[$efront_string_protot][$efront_string_origin3] = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
        var _a, _b, _c;
        var needle = (_a = {}, _a[$efront_string_genera1] = util[$efront_string_getArg](aArgs, $efront_string_line), _a[$efront_string_genera] = util[$efront_string_getArg](aArgs, $efront_string_column), _a);
        var sectionIndex = binarySearch[$efront_string_search](needle, this[$efront_string__secti], function (needle, section) {
            var cmp = needle[$efront_string_genera1] - section[$efront_string_genera4][$efront_string_genera1];
            if (cmp) {
                return cmp
            }
            return needle[$efront_string_genera] - section[$efront_string_genera4][$efront_string_genera]
        });
        var section = this[$efront_string__secti][sectionIndex];
        if (!section) {
            return _b = {}, _b[$efront_string_source] = null, _b[$efront_string_line] = null, _b[$efront_string_column] = null, _b[$efront_string_name] = null, _b
        }
        return section[$efront_string_consum][$efront_string_origin3]((_c = {}, _c[$efront_string_line] = needle[$efront_string_genera1] - (section[$efront_string_genera4][$efront_string_genera1] - 1), _c[$efront_string_column] = needle[$efront_string_genera] - (section[$efront_string_genera4][$efront_string_genera1] === needle[$efront_string_genera1] ? section[$efront_string_genera4][$efront_string_genera] - 1 : 0), _c[$efront_string_bias] = aArgs[$efront_string_bias], _c))
    };
    IndexedSourceMapConsumer[$efront_string_protot][$efront_string_hasCon] = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
        return this[$efront_string__secti][$efront_string_every](function (s) {
            return s[$efront_string_consum][$efront_string_hasCon]()
        })
    };
    IndexedSourceMapConsumer[$efront_string_protot][$efront_string_source5] = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        for (var i = 0; i < this[$efront_string__secti][$efront_string_length]; i++) {
            var section = this[$efront_string__secti][i];
            var content = section[$efront_string_consum][$efront_string_source5](aSource, true);
            if (content) {
                return content
            }
        }
        if (nullOnMissing) {
            return null
        } else {
            throw new Error($efront_string__6 + aSource + $efront_string__is_no1)
        }
    };
    IndexedSourceMapConsumer[$efront_string_protot][$efront_string_genera3] = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
        var _a, _b;
        for (var i = 0; i < this[$efront_string__secti][$efront_string_length]; i++) {
            var section = this[$efront_string__secti][i];
            if (section[$efront_string_consum][$efront_string__findS](util[$efront_string_getArg](aArgs, $efront_string_source)) === -1) {
                continue
            }
            var generatedPosition = section[$efront_string_consum][$efront_string_genera3](aArgs);
            if (generatedPosition) {
                var ret = (_a = {}, _a[$efront_string_line] = generatedPosition[$efront_string_line] + (section[$efront_string_genera4][$efront_string_genera1] - 1), _a[$efront_string_column] = generatedPosition[$efront_string_column] + (section[$efront_string_genera4][$efront_string_genera1] === generatedPosition[$efront_string_line] ? section[$efront_string_genera4][$efront_string_genera] - 1 : 0), _a);
                return ret
            }
        }
        return _b = {}, _b[$efront_string_line] = null, _b[$efront_string_column] = null, _b
    };
    IndexedSourceMapConsumer[$efront_string_protot][$efront_string__parse] = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        var _a;
        this[$efront_string___gene] = [];
        this[$efront_string___orig] = [];
        for (var i = 0; i < this[$efront_string__secti][$efront_string_length]; i++) {
            var section = this[$efront_string__secti][i];
            var sectionMappings = section[$efront_string_consum][$efront_string__gener1];
            for (var j = 0; j < sectionMappings[$efront_string_length]; j++) {
                var mapping = sectionMappings[j];
                var source = section[$efront_string_consum][$efront_string__sourc1][$efront_string_at](mapping[$efront_string_source]);
                source = util[$efront_string_comput](section[$efront_string_consum][$efront_string_source3], source, this[$efront_string__sourc3]);
                this[$efront_string__sourc1][$efront_string_add](source);
                source = this[$efront_string__sourc1][$efront_string_indexO](source);
                var name = null;
                if (mapping[$efront_string_name]) {
                    name = section[$efront_string_consum][$efront_string__names][$efront_string_at](mapping[$efront_string_name]);
                    this[$efront_string__names][$efront_string_add](name);
                    name = this[$efront_string__names][$efront_string_indexO](name)
                }
                var adjustedMapping = (_a = {}, _a[$efront_string_source] = source, _a[$efront_string_genera1] = mapping[$efront_string_genera1] + (section[$efront_string_genera4][$efront_string_genera1] - 1), _a[$efront_string_genera] = mapping[$efront_string_genera] + (section[$efront_string_genera4][$efront_string_genera1] === mapping[$efront_string_genera1] ? section[$efront_string_genera4][$efront_string_genera] - 1 : 0), _a[$efront_string_origin] = mapping[$efront_string_origin], _a[$efront_string_origin1] = mapping[$efront_string_origin1], _a[$efront_string_name] = name, _a);
                this[$efront_string___gene][$efront_string_push](adjustedMapping);
                if (typeof adjustedMapping[$efront_string_origin] === $efront_string_number) {
                    this[$efront_string___orig][$efront_string_push](adjustedMapping)
                }
            }
        }
        quickSort(this[$efront_string___gene], util[$efront_string_compar1]);
        quickSort(this[$efront_string___orig], util[$efront_string_compar])
    };
    exports[$efront_string_Indexe] = IndexedSourceMapConsumer;
    return exports
}],
/** 530 $efront_string_implem */ "implements",
/** 531 $efront_string_interf */ "interface",
/** 532 $efront_string_packag1 */ "package",
/** 533 $efront_string_privat */ "private",
/** 534 $efront_string_protec */ "protected",
/** 535 $efront_string_public */ "public",
/** 536 $efront_string_static */ "static",
/** 537 $efront_string_let */ "let",
/** 538 $efront_string_yield */ "yield",
/** 539 $efront_string_if */ "if",
/** 540 $efront_string_in */ "in",
/** 541 $efront_string_do */ "do",
/** 542 $efront_string_var */ "var",
/** 543 $efront_string_for */ "for",
/** 544 $efront_string_new */ "new",
/** 545 $efront_string_try */ "try",
/** 546 $efront_string_this */ "this",
/** 547 $efront_string_else */ "else",
/** 548 $efront_string_case */ "case",
/** 549 $efront_string_void */ "void",
/** 550 $efront_string_with */ "with",
/** 551 $efront_string_enum */ "enum",
/** 552 $efront_string_while */ "while",
/** 553 $efront_string_catch */ "catch",
/** 554 $efront_string_throw */ "throw",
/** 555 $efront_string_const */ "const",
/** 556 $efront_string_class */ "class",
/** 557 $efront_string_super */ "super",
/** 558 $efront_string_return1 */ "return",
/** 559 $efront_string_typeof */ "typeof",
/** 560 $efront_string_delete */ "delete",
/** 561 $efront_string_switch */ "switch",
/** 562 $efront_string_export2 */ "export",
/** 563 $efront_string_import1 */ "import",
/** 564 $efront_string_defaul */ "default",
/** 565 $efront_string_finall */ "finally",
/** 566 $efront_string_extend1 */ "extends",
/** 567 $efront_string_contin */ "continue",
/** 568 $efront_string_debugg */ "debugger",
/** 569 $efront_string_instan */ "instanceof",
/** 570 $efront_string_true */ "true",
/** 571 $efront_string_false */ "false",
/** 572 $efront_string_eval */ "eval",
/** 573 $efront_string_isKeyw */ "isKeywordES5",
/** 574 $efront_string_isKeyw1 */ "isKeywordES6",
/** 575 $efront_string_isRese */ "isReservedWordES5",
/** 576 $efront_string_isRese1 */ "isReservedWordES6",
/** 577 $efront_string_isRest */ "isRestrictedWord",
/** 578 $efront_string_isIden4 */ "isIdentifierNameES5",
/** 579 $efront_string_isIden5 */ "isIdentifierNameES6",
/** 580 $efront_string_isIden6 */ "isIdentifierES5",
/** 581 $efront_string_isIden7 */ "isIdentifierES6",
/** 582 esutils$lib$keyword.js */ [1,17,530,531,532,533,534,535,536,537,538,3,539,540,541,542,543,544,545,546,547,548,549,550,551,552,273,553,554,555,556,557,558,559,560,561,562,563,564,565,566,59,567,568,569,107,570,571,572,224,36,128,129,130,131,13,573,574,575,576,577,578,579,580,581,function(require, module, $efront_string_implem, $efront_string_interf, $efront_string_packag1, $efront_string_privat, $efront_string_protec, $efront_string_public, $efront_string_static, $efront_string_let, $efront_string_yield, $efront_string_length, $efront_string_if, $efront_string_in, $efront_string_do, $efront_string_var, $efront_string_for, $efront_string_new, $efront_string_try, $efront_string_this, $efront_string_else, $efront_string_case, $efront_string_void, $efront_string_with, $efront_string_enum, $efront_string_while, $efront_string_break, $efront_string_catch, $efront_string_throw, $efront_string_const, $efront_string_class, $efront_string_super, $efront_string_return1, $efront_string_typeof, $efront_string_delete, $efront_string_switch, $efront_string_export2, $efront_string_import1, $efront_string_defaul, $efront_string_finall, $efront_string_extend1, $efront_string_functi, $efront_string_contin, $efront_string_debugg, $efront_string_instan, $efront_string_null, $efront_string_true, $efront_string_false, $efront_string_eval, $efront_string_argume1, $efront_string_charCo, $efront_string_isIden, $efront_string_isIden1, $efront_string_isIden2, $efront_string_isIden3, $efront_string_export, $efront_string_isKeyw, $efront_string_isKeyw1, $efront_string_isRese, $efront_string_isRese1, $efront_string_isRest, $efront_string_isIden4, $efront_string_isIden5, $efront_string_isIden6, $efront_string_isIden7) {
    return function () {
        'use strict';
        var _a;
        var code = require(132);
        function isStrictModeReservedWordES6(id) {
            switch (id) {
            case $efront_string_implem:
            case $efront_string_interf:
            case $efront_string_packag1:
            case $efront_string_privat:
            case $efront_string_protec:
            case $efront_string_public:
            case $efront_string_static:
            case $efront_string_let:
                return true;
            default:
                return false
            }
        }
        function isKeywordES5(id, strict) {
            if (!strict && id === $efront_string_yield) {
                return false
            }
            return isKeywordES6(id, strict)
        }
        function isKeywordES6(id, strict) {
            if (strict && isStrictModeReservedWordES6(id)) {
                return true
            }
            switch (id[$efront_string_length]) {
            case 2:
                return id === $efront_string_if || id === $efront_string_in || id === $efront_string_do;
            case 3:
                return id === $efront_string_var || id === $efront_string_for || id === $efront_string_new || id === $efront_string_try;
            case 4:
                return id === $efront_string_this || id === $efront_string_else || id === $efront_string_case || id === $efront_string_void || id === $efront_string_with || id === $efront_string_enum;
            case 5:
                return id === $efront_string_while || id === $efront_string_break || id === $efront_string_catch || id === $efront_string_throw || id === $efront_string_const || id === $efront_string_yield || id === $efront_string_class || id === $efront_string_super;
            case 6:
                return id === $efront_string_return1 || id === $efront_string_typeof || id === $efront_string_delete || id === $efront_string_switch || id === $efront_string_export2 || id === $efront_string_import1;
            case 7:
                return id === $efront_string_defaul || id === $efront_string_finall || id === $efront_string_extend1;
            case 8:
                return id === $efront_string_functi || id === $efront_string_contin || id === $efront_string_debugg;
            case 10:
                return id === $efront_string_instan;
            default:
                return false
            }
        }
        function isReservedWordES5(id, strict) {
            return id === $efront_string_null || id === $efront_string_true || id === $efront_string_false || isKeywordES5(id, strict)
        }
        function isReservedWordES6(id, strict) {
            return id === $efront_string_null || id === $efront_string_true || id === $efront_string_false || isKeywordES6(id, strict)
        }
        function isRestrictedWord(id) {
            return id === $efront_string_eval || id === $efront_string_argume1
        }
        function isIdentifierNameES5(id) {
            var i, iz, ch;
            if (id[$efront_string_length] === 0) {
                return false
            }
            ch = id[$efront_string_charCo](0);
            if (!code[$efront_string_isIden](ch)) {
                return false
            }
            for (i = 1, iz = id[$efront_string_length]; i < iz; ++i) {
                ch = id[$efront_string_charCo](i);
                if (!code[$efront_string_isIden1](ch)) {
                    return false
                }
            }
            return true
        }
        function decodeUtf16(lead, trail) {
            return (lead - 55296) * 1024 + (trail - 56320) + 65536
        }
        function isIdentifierNameES6(id) {
            var i, iz, ch, lowCh, check;
            if (id[$efront_string_length] === 0) {
                return false
            }
            check = code[$efront_string_isIden2];
            for (i = 0, iz = id[$efront_string_length]; i < iz; ++i) {
                ch = id[$efront_string_charCo](i);
                if (55296 <= ch && ch <= 56319) {
                    ++i;
                    if (i >= iz) {
                        return false
                    }
                    lowCh = id[$efront_string_charCo](i);
                    if (!(56320 <= lowCh && lowCh <= 57343)) {
                        return false
                    }
                    ch = decodeUtf16(ch, lowCh)
                }
                if (!check(ch)) {
                    return false
                }
                check = code[$efront_string_isIden3]
            }
            return true
        }
        function isIdentifierES5(id, strict) {
            return isIdentifierNameES5(id) && !isReservedWordES5(id, strict)
        }
        function isIdentifierES6(id, strict) {
            return isIdentifierNameES6(id) && !isReservedWordES6(id, strict)
        }
        module[$efront_string_export] = (_a = {}, _a[$efront_string_isKeyw] = isKeywordES5, _a[$efront_string_isKeyw1] = isKeywordES6, _a[$efront_string_isRese] = isReservedWordES5, _a[$efront_string_isRese1] = isReservedWordES6, _a[$efront_string_isRest] = isRestrictedWord, _a[$efront_string_isIden4] = isIdentifierNameES5, _a[$efront_string_isIden5] = isIdentifierNameES6, _a[$efront_string_isIden6] = isIdentifierES5, _a[$efront_string_isIden7] = isIdentifierES6, _a)
    }()
}],
/** 583 $efront_string_ast */ "ast",
/** 584 $efront_string_code */ "code",
/** 585 $efront_string_keywor */ "keyword",
/** 586 esutils$lib$utils.js */ [48,1,583,584,585,function(exports, require, $efront_string_ast, $efront_string_code, $efront_string_keywor) {
    return function () {
        'use strict';
        exports[$efront_string_ast] = require(178);
        exports[$efront_string_code] = require(132);
        exports[$efront_string_keywor] = require(582)
    }()
}],
/** 587 esutils */ [1,function(require) {
    return require(586)
}],
/** 588 $efront_regexp__r_n_ */ /(\r?\n)/,
/** 589 $efront_string_$$$isS */ "$$$isSourceNode$$$",
/** 590 $efront_string_childr */ "children",
/** 591 $efront_string_source7 */ "sourceContents",
/** 592 $efront_string_fromSt */ "fromStringWithSourceMap",
/** 593 $efront_string_Expect1 */ /** text */ "Expected a SourceNode, string, or an array of SourceNodes and strings. Got ",
/** 594 $efront_string_prepen */ "prepend",
/** 595 $efront_string_unshif */ "unshift",
/** 596 $efront_string_walk */ "walk",
/** 597 $efront_string_replac1 */ "replaceRight",
/** 598 $efront_string_walkSo */ "walkSourceContents",
/** 599 $efront_string_toStri1 */ "toStringWithSourceMap",
/** 600 $efront_string_Source3 */ "SourceNode",
/** 601 source-map$lib$source-node.js */ [1,115,62,49,63,48,483,588,589,590,591,459,460,231,301,427,592,4,3,457,412,403,411,260,11,463,426,464,465,409,410,257,259,10,110,593,594,595,596,597,31,407,598,111,408,37,599,584,462,461,458,36,478,600,function(require, undefined, Array, TypeError, Object, exports, $efront_string_Source1, $efront_regexp__r_n_, $efront_string_$$$isS, $efront_string_childr, $efront_string_source7, $efront_string_line, $efront_string_column, $efront_string_source, $efront_string_name, $efront_string_add, $efront_string_fromSt, $efront_string_split, $efront_string_length, $efront_string_eachMa, $efront_string_genera1, $efront_string_substr, $efront_string_genera, $efront_string_splice, $efront_string_join, $efront_string_source4, $efront_string_forEac, $efront_string_source5, $efront_string_setSou, $efront_string_origin, $efront_string_origin1, $efront_string_protot, $efront_string_isArra, $efront_string_string, $efront_string_push, $efront_string_Expect1, $efront_string_prepen, $efront_string_unshif, $efront_string_walk, $efront_string_replac1, $efront_string_replac, $efront_string_toSetS, $efront_string_walkSo, $efront_string_keys, $efront_string_fromSe, $efront_string_toStri, $efront_string_toStri1, $efront_string_code, $efront_string_addMap, $efront_string_origin2, $efront_string_genera2, $efront_string_charCo, $efront_string_map, $efront_string_Source3) {
    var SourceMapGenerator = require(484)[$efront_string_Source1];
    var util = require(421);
    var REGEX_NEWLINE = $efront_regexp__r_n_;
    var NEWLINE_CODE = 10;
    var isSourceNode = $efront_string_$$$isS;
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
        this[$efront_string_childr] = [];
        this[$efront_string_source7] = {};
        this[$efront_string_line] = aLine == null ? null : aLine;
        this[$efront_string_column] = aColumn == null ? null : aColumn;
        this[$efront_string_source] = aSource == null ? null : aSource;
        this[$efront_string_name] = aName == null ? null : aName;
        this[isSourceNode] = true;
        if (aChunks != null)
            this[$efront_string_add](aChunks)
    }
    SourceNode[$efront_string_fromSt] = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
        var node = new SourceNode;
        var remainingLines = aGeneratedCode[$efront_string_split](REGEX_NEWLINE);
        var remainingLinesIndex = 0;
        var shiftNextLine = function () {
            var lineContents = getNextLine();
            var newLine = getNextLine() || '';
            return lineContents + newLine;
            function getNextLine() {
                return remainingLinesIndex < remainingLines[$efront_string_length] ? remainingLines[remainingLinesIndex++] : undefined
            }
        };
        var lastGeneratedLine = 1, lastGeneratedColumn = 0;
        var lastMapping = null;
        aSourceMapConsumer[$efront_string_eachMa](function (mapping) {
            if (lastMapping !== null) {
                if (lastGeneratedLine < mapping[$efront_string_genera1]) {
                    addMappingWithCode(lastMapping, shiftNextLine());
                    lastGeneratedLine++;
                    lastGeneratedColumn = 0
                } else {
                    var nextLine = remainingLines[remainingLinesIndex] || '';
                    var code = nextLine[$efront_string_substr](0, mapping[$efront_string_genera] - lastGeneratedColumn);
                    remainingLines[remainingLinesIndex] = nextLine[$efront_string_substr](mapping[$efront_string_genera] - lastGeneratedColumn);
                    lastGeneratedColumn = mapping[$efront_string_genera];
                    addMappingWithCode(lastMapping, code);
                    lastMapping = mapping;
                    return
                }
            }
            while (lastGeneratedLine < mapping[$efront_string_genera1]) {
                node[$efront_string_add](shiftNextLine());
                lastGeneratedLine++
            }
            if (lastGeneratedColumn < mapping[$efront_string_genera]) {
                var nextLine = remainingLines[remainingLinesIndex] || '';
                node[$efront_string_add](nextLine[$efront_string_substr](0, mapping[$efront_string_genera]));
                remainingLines[remainingLinesIndex] = nextLine[$efront_string_substr](mapping[$efront_string_genera]);
                lastGeneratedColumn = mapping[$efront_string_genera]
            }
            lastMapping = mapping
        }, this);
        if (remainingLinesIndex < remainingLines[$efront_string_length]) {
            if (lastMapping) {
                addMappingWithCode(lastMapping, shiftNextLine())
            }
            node[$efront_string_add](remainingLines[$efront_string_splice](remainingLinesIndex)[$efront_string_join](''))
        }
        aSourceMapConsumer[$efront_string_source4][$efront_string_forEac](function (sourceFile) {
            var content = aSourceMapConsumer[$efront_string_source5](sourceFile);
            if (content != null) {
                if (aRelativePath != null) {
                    sourceFile = util[$efront_string_join](aRelativePath, sourceFile)
                }
                node[$efront_string_setSou](sourceFile, content)
            }
        });
        return node;
        function addMappingWithCode(mapping, code) {
            if (mapping === null || mapping[$efront_string_source] === undefined) {
                node[$efront_string_add](code)
            } else {
                var source = aRelativePath ? util[$efront_string_join](aRelativePath, mapping[$efront_string_source]) : mapping[$efront_string_source];
                node[$efront_string_add](new SourceNode(mapping[$efront_string_origin], mapping[$efront_string_origin1], source, code, mapping[$efront_string_name]))
            }
        }
    };
    SourceNode[$efront_string_protot][$efront_string_add] = function SourceNode_add(aChunk) {
        if (Array[$efront_string_isArra](aChunk)) {
            aChunk[$efront_string_forEac](function (chunk) {
                this[$efront_string_add](chunk)
            }, this)
        } else if (aChunk[isSourceNode] || typeof aChunk === $efront_string_string) {
            if (aChunk) {
                this[$efront_string_childr][$efront_string_push](aChunk)
            }
        } else {
            throw new TypeError($efront_string_Expect1 + aChunk)
        }
        return this
    };
    SourceNode[$efront_string_protot][$efront_string_prepen] = function SourceNode_prepend(aChunk) {
        if (Array[$efront_string_isArra](aChunk)) {
            for (var i = aChunk[$efront_string_length] - 1; i >= 0; i--) {
                this[$efront_string_prepen](aChunk[i])
            }
        } else if (aChunk[isSourceNode] || typeof aChunk === $efront_string_string) {
            this[$efront_string_childr][$efront_string_unshif](aChunk)
        } else {
            throw new TypeError($efront_string_Expect1 + aChunk)
        }
        return this
    };
    SourceNode[$efront_string_protot][$efront_string_walk] = function SourceNode_walk(aFn) {
        var _a;
        var chunk;
        for (var i = 0, len = this[$efront_string_childr][$efront_string_length]; i < len; i++) {
            chunk = this[$efront_string_childr][i];
            if (chunk[isSourceNode]) {
                chunk[$efront_string_walk](aFn)
            } else {
                if (chunk !== '') {
                    aFn(chunk, (_a = {}, _a[$efront_string_source] = this[$efront_string_source], _a[$efront_string_line] = this[$efront_string_line], _a[$efront_string_column] = this[$efront_string_column], _a[$efront_string_name] = this[$efront_string_name], _a))
                }
            }
        }
    };
    SourceNode[$efront_string_protot][$efront_string_join] = function SourceNode_join(aSep) {
        var newChildren;
        var i;
        var len = this[$efront_string_childr][$efront_string_length];
        if (len > 0) {
            newChildren = [];
            for (i = 0; i < len - 1; i++) {
                newChildren[$efront_string_push](this[$efront_string_childr][i]);
                newChildren[$efront_string_push](aSep)
            }
            newChildren[$efront_string_push](this[$efront_string_childr][i]);
            this[$efront_string_childr] = newChildren
        }
        return this
    };
    SourceNode[$efront_string_protot][$efront_string_replac1] = function SourceNode_replaceRight(aPattern, aReplacement) {
        var lastChild = this[$efront_string_childr][this[$efront_string_childr][$efront_string_length] - 1];
        if (lastChild[isSourceNode]) {
            lastChild[$efront_string_replac1](aPattern, aReplacement)
        } else if (typeof lastChild === $efront_string_string) {
            this[$efront_string_childr][this[$efront_string_childr][$efront_string_length] - 1] = lastChild[$efront_string_replac](aPattern, aReplacement)
        } else {
            this[$efront_string_childr][$efront_string_push](''[$efront_string_replac](aPattern, aReplacement))
        }
        return this
    };
    SourceNode[$efront_string_protot][$efront_string_setSou] = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
        this[$efront_string_source7][util[$efront_string_toSetS](aSourceFile)] = aSourceContent
    };
    SourceNode[$efront_string_protot][$efront_string_walkSo] = function SourceNode_walkSourceContents(aFn) {
        for (var i = 0, len = this[$efront_string_childr][$efront_string_length]; i < len; i++) {
            if (this[$efront_string_childr][i][isSourceNode]) {
                this[$efront_string_childr][i][$efront_string_walkSo](aFn)
            }
        }
        var sources = Object[$efront_string_keys](this[$efront_string_source7]);
        for (var i = 0, len = sources[$efront_string_length]; i < len; i++) {
            aFn(util[$efront_string_fromSe](sources[i]), this[$efront_string_source7][sources[i]])
        }
    };
    SourceNode[$efront_string_protot][$efront_string_toStri] = function SourceNode_toString() {
        var str = '';
        this[$efront_string_walk](function (chunk) {
            str += chunk
        });
        return str
    };
    SourceNode[$efront_string_protot][$efront_string_toStri1] = function SourceNode_toStringWithSourceMap(aArgs) {
        var _a, _b;
        var generated = (_a = {}, _a[$efront_string_code] = '', _a[$efront_string_line] = 1, _a[$efront_string_column] = 0, _a);
        var map = new SourceMapGenerator(aArgs);
        var sourceMappingActive = false;
        var lastOriginalSource = null;
        var lastOriginalLine = null;
        var lastOriginalColumn = null;
        var lastOriginalName = null;
        this[$efront_string_walk](function (chunk, original) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            generated[$efront_string_code] += chunk;
            if (original[$efront_string_source] !== null && original[$efront_string_line] !== null && original[$efront_string_column] !== null) {
                if (lastOriginalSource !== original[$efront_string_source] || lastOriginalLine !== original[$efront_string_line] || lastOriginalColumn !== original[$efront_string_column] || lastOriginalName !== original[$efront_string_name]) {
                    map[$efront_string_addMap]((_a = {}, _a[$efront_string_source] = original[$efront_string_source], _a[$efront_string_origin2] = (_b = {}, _b[$efront_string_line] = original[$efront_string_line], _b[$efront_string_column] = original[$efront_string_column], _b), _a[$efront_string_genera2] = (_c = {}, _c[$efront_string_line] = generated[$efront_string_line], _c[$efront_string_column] = generated[$efront_string_column], _c), _a[$efront_string_name] = original[$efront_string_name], _a))
                }
                lastOriginalSource = original[$efront_string_source];
                lastOriginalLine = original[$efront_string_line];
                lastOriginalColumn = original[$efront_string_column];
                lastOriginalName = original[$efront_string_name];
                sourceMappingActive = true
            } else if (sourceMappingActive) {
                map[$efront_string_addMap]((_d = {}, _d[$efront_string_genera2] = (_e = {}, _e[$efront_string_line] = generated[$efront_string_line], _e[$efront_string_column] = generated[$efront_string_column], _e), _d));
                lastOriginalSource = null;
                sourceMappingActive = false
            }
            for (var idx = 0, length = chunk[$efront_string_length]; idx < length; idx++) {
                if (chunk[$efront_string_charCo](idx) === NEWLINE_CODE) {
                    generated[$efront_string_line]++;
                    generated[$efront_string_column] = 0;
                    if (idx + 1 === length) {
                        lastOriginalSource = null;
                        sourceMappingActive = false
                    } else if (sourceMappingActive) {
                        map[$efront_string_addMap]((_f = {}, _f[$efront_string_source] = original[$efront_string_source], _f[$efront_string_origin2] = (_g = {}, _g[$efront_string_line] = original[$efront_string_line], _g[$efront_string_column] = original[$efront_string_column], _g), _f[$efront_string_genera2] = (_h = {}, _h[$efront_string_line] = generated[$efront_string_line], _h[$efront_string_column] = generated[$efront_string_column], _h), _f[$efront_string_name] = original[$efront_string_name], _f))
                    }
                } else {
                    generated[$efront_string_column]++
                }
            }
        });
        this[$efront_string_walkSo](function (sourceFile, sourceContent) {
            map[$efront_string_setSou](sourceFile, sourceContent)
        });
        return _b = {}, _b[$efront_string_code] = generated[$efront_string_code], _b[$efront_string_map] = map, _b
    };
    exports[$efront_string_Source3] = SourceNode;
    return exports
}],
/** 602 source-map$source-map.js */ [48,1,483,505,600,function(exports, require, $efront_string_Source1, $efront_string_Source2, $efront_string_Source3) {
    exports[$efront_string_Source1] = require(484)[$efront_string_Source1];
    exports[$efront_string_Source2] = require(529)[$efront_string_Source2];
    exports[$efront_string_Source3] = require(601)[$efront_string_Source3];
    return exports
}],
/** 603 source-map */ [1,function(require) {
    return require(602)
}],
/** 604 $efront_string_Expres1 */ "Expression",
/** 605 $efront_string_Statem */ "Statement",
/** 606 $efront_string_Sequen1 */ "Sequence",
/** 607 $efront_string_Yield */ "Yield",
/** 608 $efront_string_Assign2 */ "Assignment",
/** 609 $efront_string_Condit1 */ "Conditional",
/** 610 $efront_string_ArrowF1 */ "ArrowFunction",
/** 611 $efront_string_Logica1 */ "LogicalOR",
/** 612 $efront_string_Logica2 */ "LogicalAND",
/** 613 $efront_string_Bitwis */ "BitwiseOR",
/** 614 $efront_string_Bitwis1 */ "BitwiseXOR",
/** 615 $efront_string_Bitwis2 */ "BitwiseAND",
/** 616 $efront_string_Equali */ "Equality",
/** 617 $efront_string_Relati */ "Relational",
/** 618 $efront_string_Bitwis3 */ "BitwiseSHIFT",
/** 619 $efront_string_Additi */ "Additive",
/** 620 $efront_string_Multip */ "Multiplicative",
/** 621 $efront_string_Expone */ "Exponentiation",
/** 622 $efront_string_Await */ "Await",
/** 623 $efront_string_Unary */ "Unary",
/** 624 $efront_string_Postfi */ "Postfix",
/** 625 $efront_string_Option */ "OptionalChaining",
/** 626 $efront_string_Call */ "Call",
/** 627 $efront_string_New */ "New",
/** 628 $efront_string_Tagged1 */ "TaggedTemplate",
/** 629 $efront_string_Member1 */ "Member",
/** 630 $efront_string_Primar */ "Primary",
/** 631 $efront_string__23 */ "||",
/** 632 $efront_string__24 */ "&&",
/** 633 $efront_string__25 */ "|",
/** 634 $efront_string__26 */ "^",
/** 635 $efront_string__27 */ "&",
/** 636 $efront_string__28 */ "==",
/** 637 $efront_string__29 */ "!=",
/** 638 $efront_string__30 */ "===",
/** 639 $efront_string__31 */ "!==",
/** 640 $efront_string_is */ "is",
/** 641 $efront_string_isnt */ "isnt",
/** 642 $efront_string__32 */ "<",
/** 643 $efront_string__33 */ ">",
/** 644 $efront_string__34 */ "<=",
/** 645 $efront_string__35 */ ">=",
/** 646 $efront_string__36 */ "<<",
/** 647 $efront_string__37 */ ">>",
/** 648 $efront_string__38 */ ">>>",
/** 649 $efront_string__39 */ "+",
/** 650 $efront_string__40 */ "*",
/** 651 $efront_string__41 */ "%",
/** 652 $efront_string__42 */ "**",
/** 653 $efront_string_indent */ "indent",
/** 654 $efront_string_base */ "base",
/** 655 $efront_string_commen */ "comment",
/** 656 $efront_string_format */ "format",
/** 657 $efront_string_style */ "style",
/** 658 $efront_string__43 */ /** text */ "    ",
/** 659 $efront_string_adjust */ "adjustMultilineComment",
/** 660 $efront_string_newlin */ "newline",
/** 661 $efront_string_space */ "space",
/** 662 $efront_string_json */ "json",
/** 663 $efront_string_renumb */ "renumber",
/** 664 $efront_string_hexade */ "hexadecimal",
/** 665 $efront_string_quotes */ "quotes",
/** 666 $efront_string_single */ "single",
/** 667 $efront_string_escape */ "escapeless",
/** 668 $efront_string_compac */ "compact",
/** 669 $efront_string_parent2 */ "parentheses",
/** 670 $efront_string_semico */ "semicolons",
/** 671 $efront_string_safeCo */ "safeConcatenation",
/** 672 $efront_string_preser */ "preserveBlankLines",
/** 673 $efront_string_moz */ "moz",
/** 674 $efront_string_compre */ "comprehensionExpressionStartsWithAssignment",
/** 675 $efront_string_starle */ "starlessGenerator",
/** 676 $efront_string_source8 */ "sourceMap",
/** 677 $efront_string_source9 */ "sourceMapRoot",
/** 678 $efront_string_source10 */ "sourceMapWithCode",
/** 679 $efront_string_direct */ "directive",
/** 680 $efront_string_raw */ "raw",
/** 681 $efront_string_verbat */ "verbatim",
/** 682 $efront_string_source11 */ "sourceCode",
/** 683 $efront_regexp__r_n_g */ /[\r\n]/g,
/** 684 $efront_string_Numeri */ /** text */ "Numeric literal whose value is NaN",
/** 685 $efront_string_Numeri1 */ /** text */ "Numeric literal whose value is negative",
/** 686 $efront_string_1e400 */ "1e400",
/** 687 $efront_string_1e_400 */ "1e+400",
/** 688 $efront_string_e_ */ "e+",
/** 689 $efront_string_e */ "e",
/** 690 $efront_string_0x */ "0x",
/** 691 $efront_string_u */ "u",
/** 692 $efront_string_2028 */ "2028",
/** 693 $efront_string_2029 */ "2029",
/** 694 $efront_string__44 */ "\\",
/** 695 $efront_string_r */ "r",
/** 696 $efront_regexp__$_4 */ /\/([^\/]*)$/,
/** 697 $efront_string_toUppe */ "toUpperCase",
/** 698 $efront_string_0000 */ "0000",
/** 699 $efront_string__0 */ "\\0",
/** 700 $efront_string__x0B */ "\\x0B",
/** 701 $efront_string__x */ "\\x",
/** 702 $efront_string_00 */ "00",
/** 703 $efront_string__45 */ "\\\\",
/** 704 $efront_string__u2028 */ "\\u2028",
/** 705 $efront_string__u2029 */ "\\u2029",
/** 706 $efront_string_Incorr */ /** text */ "Incorrectly classified character",
/** 707 $efront_string_double */ "double",
/** 708 $efront_string__46 */ "'",
/** 709 $efront_string_auto */ "auto",
/** 710 $efront_string_loc */ "loc",
/** 711 $efront_string_start */ "start",
/** 712 $efront_regexp__r_n_r */ /\r\n|[\r\n]/,
/** 713 $efront_string_MAX_VA */ "MAX_VALUE",
/** 714 $efront_string_Line */ "Line",
/** 715 $efront_regexp__n_r_ */ /[\n\r]/,
/** 716 $efront_string__47 */ "/*",
/** 717 $efront_string__48 */ "*/",
/** 718 $efront_regexp__n_g */ /\n/g,
/** 719 $efront_string__49 */ "(",
/** 720 $efront_string__50 */ ")",
/** 721 $efront_regexp__r_n_n */ /\r\n|\n/,
/** 722 $efront_string_conten */ "content",
/** 723 $efront_string_preced */ "precedence",
/** 724 $efront_string_maybeB */ "maybeBlock",
/** 725 $efront_string_genera5 */ "generateStatement",
/** 726 $efront_string_maybeB1 */ "maybeBlockSuffix",
/** 727 $efront_string_async */ "async",
/** 728 $efront_string_genera6 */ "generator",
/** 729 $efront_string_comput2 */ "computed",
/** 730 $efront_string_genera7 */ "generatePattern",
/** 731 $efront_string_genera8 */ "generateExpression",
/** 732 $efront_string_genera9 */ "generateFunctionParams",
/** 733 $efront_string_defaul1 */ "defaults",
/** 734 $efront_string_genera10 */ "generateAssignment",
/** 735 $efront_string__51 */ "=",
/** 736 $efront_string__52 */ "...",
/** 737 $efront_string_genera11 */ "generateFunctionBody",
/** 738 $efront_string__53 */ "=>",
/** 739 $efront_string_genera12 */ "generateIterationForStatement",
/** 740 $efront_string_await */ "await",
/** 741 $efront_string_kind */ "kind",
/** 742 $efront_string_genera13 */ "generatePropertyKey",
/** 743 $efront_string_semico1 */ "semicolon",
/** 744 $efront_string_break_ */ /** text */ "break ",
/** 745 $efront_string_contin1 */ /** text */ "continue ",
/** 746 $efront_string_guard */ "guard",
/** 747 $efront_string__if_ */ /** text */ " if ",
/** 748 $efront_string_Export4 */ "ExportBatchSpecifier",
/** 749 $efront_string_from */ "from",
/** 750 $efront_string_handle1 */ "handlers",
/** 751 $efront_string_guarde */ "guardedHandlers",
/** 752 $efront_string_defaul2 */ "default:",
/** 753 $efront_string_else_ */ /** text */ "else ",
/** 754 $efront_string_of */ "of",
/** 755 $efront_string_operat */ "operator",
/** 756 $efront_string__54 */ "?",
/** 757 $efront_string__55 */ "!--",
/** 758 $efront_string_option2 */ "optional",
/** 759 $efront_string__56 */ "?.",
/** 760 $efront_regexp__eExX_ */ /[eExX]/,
/** 761 $efront_string_delega */ "delegate",
/** 762 $efront_string_yield_ */ "yield*",
/** 763 $efront_string_all */ "all",
/** 764 $efront_string_await_ */ "await*",
/** 765 $efront_string_prefix */ "prefix",
/** 766 $efront_string__57 */ "[]",
/** 767 $efront_string_shorth */ "shorthand",
/** 768 $efront_string_method */ "method",
/** 769 $efront_string__58 */ "{}",
/** 770 $efront_string_as */ "as",
/** 771 $efront_string_regex */ "regex",
/** 772 $efront_string_patter */ "pattern",
/** 773 $efront_string_flags */ "flags",
/** 774 $efront_string__59 */ "`",
/** 775 $efront_string_$_ */ "${",
/** 776 $efront_string_import2 */ "import(",
/** 777 $efront_regexp__s_$_ */ /\s+$/,
/** 778 $efront_string_Unknow2 */ /** text */ "Unknown node type: ",
/** 779 $efront_string_browse */ "browser",
/** 780 $efront_string_source12 */ "sourceContent",
/** 781 $efront_string_genera14 */ "generate",
/** 782 $efront_string_Preced */ "Precedence",
/** 783 $efront_string_FORMAT */ "FORMAT_MINIFY",
/** 784 $efront_string_FORMAT1 */ "FORMAT_DEFAULTS",
/** 785 escodegen.js */ [1,63,378,61,64,15,62,56,48,379,294,604,35,133,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,540,569,646,647,648,649,89,650,651,396,652,653,654,112,655,656,657,658,659,660,20,661,104,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,683,122,3,584,127,36,54,684,685,107,686,687,9,288,2,31,688,689,71,690,37,691,41,692,693,694,100,695,44,231,384,696,25,27,23,697,698,123,699,700,701,702,703,21,19,704,705,706,707,30,708,129,709,259,710,301,711,459,460,126,4,712,713,432,11,714,77,390,715,716,717,292,290,289,419,718,110,206,171,293,719,720,721,10,722,723,257,724,154,725,158,476,726,727,728,729,730,140,731,732,181,78,733,220,734,735,98,736,737,738,226,76,96,739,543,740,217,166,741,252,218,742,99,94,743,95,155,222,744,273,156,745,567,185,186,556,227,228,566,190,150,541,552,183,225,553,746,260,747,157,568,192,562,564,232,193,233,748,749,191,159,59,141,198,563,199,200,215,236,164,554,221,165,545,249,750,251,751,250,565,163,561,244,245,211,548,97,752,170,160,539,169,753,547,152,237,151,195,754,161,168,162,558,153,167,550,146,243,135,755,138,756,142,136,757,137,223,758,759,224,184,144,544,143,239,57,760,202,240,148,216,761,762,538,182,763,764,149,765,139,180,134,219,766,208,187,203,536,439,438,241,207,767,179,768,145,242,769,205,147,546,210,557,235,770,201,238,194,234,771,772,773,109,570,571,196,189,229,230,188,209,212,246,247,213,214,774,248,775,204,197,776,597,777,778,779,600,478,599,446,448,780,465,317,781,295,782,783,784,function(require, Object, RegExp, Error, Math, String, Array, Number, exports, global, $efront_string_Syntax, $efront_string_Expres1, $efront_string_hasOwn, $efront_string_type, $efront_string_Statem, $efront_string_Sequen1, $efront_string_Yield, $efront_string_Assign2, $efront_string_Condit1, $efront_string_ArrowF1, $efront_string_Logica1, $efront_string_Logica2, $efront_string_Bitwis, $efront_string_Bitwis1, $efront_string_Bitwis2, $efront_string_Equali, $efront_string_Relati, $efront_string_Bitwis3, $efront_string_Additi, $efront_string_Multip, $efront_string_Expone, $efront_string_Await, $efront_string_Unary, $efront_string_Postfi, $efront_string_Option, $efront_string_Call, $efront_string_New, $efront_string_Tagged1, $efront_string_Member1, $efront_string_Primar, $efront_string__23, $efront_string__24, $efront_string__25, $efront_string__26, $efront_string__27, $efront_string__28, $efront_string__29, $efront_string__30, $efront_string__31, $efront_string_is, $efront_string_isnt, $efront_string__32, $efront_string__33, $efront_string__34, $efront_string__35, $efront_string_in, $efront_string_instan, $efront_string__36, $efront_string__37, $efront_string__38, $efront_string__39, $efront_string__7, $efront_string__40, $efront_string__41, $efront_string__20, $efront_string__42, $efront_string_indent, $efront_string_base, $efront_string_parse, $efront_string_commen, $efront_string_format, $efront_string_style, $efront_string__43, $efront_string_adjust, $efront_string_newlin, $efront_string__1, $efront_string_space, $efront_string__14, $efront_string_json, $efront_string_renumb, $efront_string_hexade, $efront_string_quotes, $efront_string_single, $efront_string_escape, $efront_string_compac, $efront_string_parent2, $efront_string_semico, $efront_string_safeCo, $efront_string_preser, $efront_string_moz, $efront_string_compre, $efront_string_starle, $efront_string_source8, $efront_string_source9, $efront_string_source10, $efront_string_direct, $efront_string_raw, $efront_string_verbat, $efront_string_source11, $efront_regexp__r_n_g, $efront_string_test, $efront_string_length, $efront_string_code, $efront_string_isLine, $efront_string_charCo, $efront_string_object, $efront_string_Numeri, $efront_string_Numeri1, $efront_string_null, $efront_string_1e400, $efront_string_1e_400, $efront_string_indexO, $efront_string__15, $efront_string_slice, $efront_string_replac, $efront_string_e_, $efront_string_e, $efront_string_floor, $efront_string_0x, $efront_string_toStri, $efront_string_u, $efront_string__u, $efront_string_2028, $efront_string_2029, $efront_string__44, $efront_string_n, $efront_string_r, $efront_string_fromCh, $efront_string_source, $efront_string_match, $efront_regexp__$_4, $efront_string__b, $efront_string__f, $efront_string__t, $efront_string_toUppe, $efront_string_0000, $efront_string_isDeci, $efront_string__0, $efront_string__x0B, $efront_string__x, $efront_string_00, $efront_string__45, $efront_string__n, $efront_string__r, $efront_string__u2028, $efront_string__u2029, $efront_string_Incorr, $efront_string_double, $efront_string__6, $efront_string__46, $efront_string_isIden1, $efront_string_auto, $efront_string_isArra, $efront_string_loc, $efront_string_name, $efront_string_start, $efront_string_line, $efront_string_column, $efront_string_isWhit, $efront_string_split, $efront_regexp__r_n_r, $efront_string_MAX_VA, $efront_string_undefi, $efront_string_join, $efront_string_Line, $efront_string_value, $efront_string__16, $efront_regexp__n_r_, $efront_string__47, $efront_string__48, $efront_string_leadin, $efront_string_extend, $efront_string_range, $efront_string_substr1, $efront_regexp__n_g, $efront_string_push, $efront_string_Progra, $efront_string_body, $efront_string_traili1, $efront_string__49, $efront_string__50, $efront_regexp__r_n_n, $efront_string_string, $efront_string_conten, $efront_string_preced, $efront_string_protot, $efront_string_maybeB, $efront_string_BlockS, $efront_string_genera5, $efront_string_EmptyS, $efront_string__22, $efront_string_maybeB1, $efront_string_async, $efront_string_genera6, $efront_string_comput2, $efront_string_genera7, $efront_string_Identi, $efront_string_genera8, $efront_string_genera9, $efront_string_ArrowF, $efront_string_rest, $efront_string_defaul1, $efront_string_params, $efront_string_genera10, $efront_string__51, $efront_string__12, $efront_string__52, $efront_string_genera11, $efront_string__53, $efront_string_expres, $efront_string_charAt, $efront_string__10, $efront_string_genera12, $efront_string_for, $efront_string_await, $efront_string_left, $efront_string_Variab, $efront_string_kind, $efront_string_declar1, $efront_string_right, $efront_string_genera13, $efront_string__13, $efront_string__8, $efront_string_semico1, $efront_string__9, $efront_string_BreakS, $efront_string_label, $efront_string_break_, $efront_string_break, $efront_string_Contin, $efront_string_contin1, $efront_string_contin, $efront_string_ClassB, $efront_string_ClassD, $efront_string_class, $efront_string_id, $efront_string_superC, $efront_string_extend1, $efront_string_Direct, $efront_string_DoWhil, $efront_string_do, $efront_string_while, $efront_string_CatchC, $efront_string_param, $efront_string_catch, $efront_string_guard, $efront_string_splice, $efront_string__if_, $efront_string_Debugg, $efront_string_debugg, $efront_string_Export1, $efront_string_export2, $efront_string_defaul, $efront_string_declar, $efront_string_Export2, $efront_string_specif, $efront_string_Export4, $efront_string_from, $efront_string_Export, $efront_string_Expres, $efront_string_functi, $efront_string_Litera, $efront_string_Import1, $efront_string_import1, $efront_string_Import2, $efront_string_Import3, $efront_string_Variab1, $efront_string_init, $efront_string_ThrowS, $efront_string_throw, $efront_string_argume, $efront_string_TrySta, $efront_string_try, $efront_string_block, $efront_string_handle1, $efront_string_finali, $efront_string_guarde, $efront_string_handle, $efront_string_finall, $efront_string_Switch, $efront_string_switch, $efront_string_discri, $efront_string_cases, $efront_string_Switch1, $efront_string_case, $efront_string__11, $efront_string_defaul2, $efront_string_conseq, $efront_string_IfStat, $efront_string_if, $efront_string_altern, $efront_string_else_, $efront_string_else, $efront_string_ForSta, $efront_string_update, $efront_string_ForInS, $efront_string_ForOfS, $efront_string_of, $efront_string_Labele, $efront_string_Functi1, $efront_string_Return, $efront_string_return1, $efront_string_WhileS, $efront_string_WithSt, $efront_string_with, $efront_string_Sequen, $efront_string_expres1, $efront_string_Assign, $efront_string_operat, $efront_string_Condit, $efront_string__54, $efront_string_Logica, $efront_string_Binary, $efront_string__55, $efront_string_CallEx, $efront_string_callee, $efront_string_option2, $efront_string__56, $efront_string_argume1, $efront_string_ChainE, $efront_string_NewExp, $efront_string_new, $efront_string_Member, $efront_string_proper, $efront_string_number, $efront_regexp__eExX_, $efront_string_MetaPr, $efront_string_meta, $efront_string_UnaryE, $efront_string_YieldE, $efront_string_delega, $efront_string_yield_, $efront_string_yield, $efront_string_AwaitE, $efront_string_all, $efront_string_await_, $efront_string_Update, $efront_string_prefix, $efront_string_Functi, $efront_string_ArrayP, $efront_string_ArrayE, $efront_string_elemen, $efront_string__57, $efront_string_RestEl, $efront_string_ClassE, $efront_string_Method, $efront_string_static, $efront_string_get, $efront_string_set, $efront_string_key, $efront_string_Proper, $efront_string_shorth, $efront_string_Assign1, $efront_string_method, $efront_string_Object, $efront_string_proper1, $efront_string__58, $efront_string_Object1, $efront_string_ThisEx, $efront_string_this, $efront_string_Super, $efront_string_super, $efront_string_local, $efront_string_as, $efront_string_Import4, $efront_string_import, $efront_string_Export3, $efront_string_export1, $efront_string_regex, $efront_string_patter, $efront_string_flags, $efront_string_boolea, $efront_string_true, $efront_string_false, $efront_string_Genera, $efront_string_Compre1, $efront_string_blocks, $efront_string_filter, $efront_string_Compre, $efront_string_Spread, $efront_string_Tagged, $efront_string_tag, $efront_string_quasi, $efront_string_Templa, $efront_string_Templa1, $efront_string__59, $efront_string_quasis, $efront_string_$_, $efront_string_Module, $efront_string_Import, $efront_string_import2, $efront_string_replac1, $efront_regexp__s_$_, $efront_string_Unknow2, $efront_string_browse, $efront_string_Source3, $efront_string_map, $efront_string_toStri1, $efront_string_file, $efront_string_source3, $efront_string_source12, $efront_string_setSou, $efront_string_versio, $efront_string_genera14, $efront_string_attach1, $efront_string_Preced, $efront_string_FORMAT, $efront_string_FORMAT1) {
    return function () {
        'use strict';
        var _a, _b, _c, _d, _e, _f;
        var Syntax, Precedence, BinaryPrecedence, SourceNode, estraverse, esutils, base, indent, json, renumber, hexadecimal, quotes, escapeless, newline, space, parentheses, semicolons, safeConcatenation, directive, extra, parse, sourceMap, sourceCode, preserveBlankLines, FORMAT_MINIFY, FORMAT_DEFAULTS;
        estraverse = require(377);
        esutils = require(587);
        Syntax = estraverse[$efront_string_Syntax];
        function isExpression(node) {
            return CodeGenerator[$efront_string_Expres1][$efront_string_hasOwn](node[$efront_string_type])
        }
        function isStatement(node) {
            return CodeGenerator[$efront_string_Statem][$efront_string_hasOwn](node[$efront_string_type])
        }
        Precedence = (_a = {}, _a[$efront_string_Sequen1] = 0, _a[$efront_string_Yield] = 1, _a[$efront_string_Assign2] = 1, _a[$efront_string_Condit1] = 2, _a[$efront_string_ArrowF1] = 2, _a[$efront_string_Logica1] = 3, _a[$efront_string_Logica2] = 4, _a[$efront_string_Bitwis] = 5, _a[$efront_string_Bitwis1] = 6, _a[$efront_string_Bitwis2] = 7, _a[$efront_string_Equali] = 8, _a[$efront_string_Relati] = 9, _a[$efront_string_Bitwis3] = 10, _a[$efront_string_Additi] = 11, _a[$efront_string_Multip] = 12, _a[$efront_string_Expone] = 13, _a[$efront_string_Await] = 14, _a[$efront_string_Unary] = 14, _a[$efront_string_Postfi] = 15, _a[$efront_string_Option] = 16, _a[$efront_string_Call] = 17, _a[$efront_string_New] = 18, _a[$efront_string_Tagged1] = 19, _a[$efront_string_Member1] = 20, _a[$efront_string_Primar] = 21, _a);
        BinaryPrecedence = (_b = {}, _b[$efront_string__23] = Precedence[$efront_string_Logica1], _b[$efront_string__24] = Precedence[$efront_string_Logica2], _b[$efront_string__25] = Precedence[$efront_string_Bitwis], _b[$efront_string__26] = Precedence[$efront_string_Bitwis1], _b[$efront_string__27] = Precedence[$efront_string_Bitwis2], _b[$efront_string__28] = Precedence[$efront_string_Equali], _b[$efront_string__29] = Precedence[$efront_string_Equali], _b[$efront_string__30] = Precedence[$efront_string_Equali], _b[$efront_string__31] = Precedence[$efront_string_Equali], _b[$efront_string_is] = Precedence[$efront_string_Equali], _b[$efront_string_isnt] = Precedence[$efront_string_Equali], _b[$efront_string__32] = Precedence[$efront_string_Relati], _b[$efront_string__33] = Precedence[$efront_string_Relati], _b[$efront_string__34] = Precedence[$efront_string_Relati], _b[$efront_string__35] = Precedence[$efront_string_Relati], _b[$efront_string_in] = Precedence[$efront_string_Relati], _b[$efront_string_instan] = Precedence[$efront_string_Relati], _b[$efront_string__36] = Precedence[$efront_string_Bitwis3], _b[$efront_string__37] = Precedence[$efront_string_Bitwis3], _b[$efront_string__38] = Precedence[$efront_string_Bitwis3], _b[$efront_string__39] = Precedence[$efront_string_Additi], _b[$efront_string__7] = Precedence[$efront_string_Additi], _b[$efront_string__40] = Precedence[$efront_string_Multip], _b[$efront_string__41] = Precedence[$efront_string_Multip], _b[$efront_string__20] = Precedence[$efront_string_Multip], _b[$efront_string__42] = Precedence[$efront_string_Expone], _b);
        var F_ALLOW_IN = 1, F_ALLOW_CALL = 1 << 1, F_ALLOW_UNPARATH_NEW = 1 << 2, F_FUNC_BODY = 1 << 3, F_DIRECTIVE_CTX = 1 << 4, F_SEMICOLON_OPT = 1 << 5;
        var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TTF = F_ALLOW_IN | F_ALLOW_CALL, E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TFF = F_ALLOW_IN, E_FFT = F_ALLOW_UNPARATH_NEW, E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;
        var S_TFFF = F_ALLOW_IN, S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT, S_FFFF = 0, S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX, S_TTFF = F_ALLOW_IN | F_FUNC_BODY;
        function getDefaultOptions() {
            var _a, _b, _c, _d;
            return _a = {}, _a[$efront_string_indent] = null, _a[$efront_string_base] = null, _a[$efront_string_parse] = null, _a[$efront_string_commen] = false, _a[$efront_string_format] = (_b = {}, _b[$efront_string_indent] = (_c = {}, _c[$efront_string_style] = $efront_string__43, _c[$efront_string_base] = 0, _c[$efront_string_adjust] = false, _c), _b[$efront_string_newlin] = $efront_string__1, _b[$efront_string_space] = $efront_string__14, _b[$efront_string_json] = false, _b[$efront_string_renumb] = false, _b[$efront_string_hexade] = false, _b[$efront_string_quotes] = $efront_string_single, _b[$efront_string_escape] = false, _b[$efront_string_compac] = false, _b[$efront_string_parent2] = true, _b[$efront_string_semico] = true, _b[$efront_string_safeCo] = false, _b[$efront_string_preser] = false, _b), _a[$efront_string_moz] = (_d = {}, _d[$efront_string_compre] = false, _d[$efront_string_starle] = false, _d), _a[$efront_string_source8] = null, _a[$efront_string_source9] = null, _a[$efront_string_source10] = false, _a[$efront_string_direct] = false, _a[$efront_string_raw] = true, _a[$efront_string_verbat] = null, _a[$efront_string_source11] = null, _a
        }
        function stringRepeat(str, num) {
            var result = '';
            for (num |= 0; num > 0; num >>>= 1, str += str) {
                if (num & 1) {
                    result += str
                }
            }
            return result
        }
        function hasLineTerminator(str) {
            return $efront_regexp__r_n_g[$efront_string_test](str)
        }
        function endsWithLineTerminator(str) {
            var len = str[$efront_string_length];
            return len && esutils[$efront_string_code][$efront_string_isLine](str[$efront_string_charCo](len - 1))
        }
        function merge(target, override) {
            var key;
            for (key in override) {
                if (override[$efront_string_hasOwn](key)) {
                    target[key] = override[key]
                }
            }
            return target
        }
        function updateDeeply(target, override) {
            var key, val;
            function isHashObject(target) {
                return typeof target === $efront_string_object && target instanceof Object && !(target instanceof RegExp)
            }
            for (key in override) {
                if (override[$efront_string_hasOwn](key)) {
                    val = override[key];
                    if (isHashObject(val)) {
                        if (isHashObject(target[key])) {
                            updateDeeply(target[key], val)
                        } else {
                            target[key] = updateDeeply({}, val)
                        }
                    } else {
                        target[key] = val
                    }
                }
            }
            return target
        }
        function generateNumber(value) {
            var result, point, temp, exponent, pos;
            if (value !== value) {
                throw new Error($efront_string_Numeri)
            }
            if (value < 0 || value === 0 && 1 / value < 0) {
                throw new Error($efront_string_Numeri1)
            }
            if (value === 1 / 0) {
                return json ? $efront_string_null : renumber ? $efront_string_1e400 : $efront_string_1e_400
            }
            result = '' + value;
            if (!renumber || result[$efront_string_length] < 3) {
                return result
            }
            point = result[$efront_string_indexO]($efront_string__15);
            if (!json && result[$efront_string_charCo](0) === 48 && point === 1) {
                point = 0;
                result = result[$efront_string_slice](1)
            }
            temp = result;
            result = result[$efront_string_replac]($efront_string_e_, $efront_string_e);
            exponent = 0;
            if ((pos = temp[$efront_string_indexO]($efront_string_e)) > 0) {
                exponent = +temp[$efront_string_slice](pos + 1);
                temp = temp[$efront_string_slice](0, pos)
            }
            if (point >= 0) {
                exponent -= temp[$efront_string_length] - point - 1;
                temp = +(temp[$efront_string_slice](0, point) + temp[$efront_string_slice](point + 1)) + ''
            }
            pos = 0;
            while (temp[$efront_string_charCo](temp[$efront_string_length] + pos - 1) === 48) {
                --pos
            }
            if (pos !== 0) {
                exponent -= pos;
                temp = temp[$efront_string_slice](0, pos)
            }
            if (exponent !== 0) {
                temp += $efront_string_e + exponent
            }
            if ((temp[$efront_string_length] < result[$efront_string_length] || hexadecimal && value > 1e12 && Math[$efront_string_floor](value) === value && (temp = $efront_string_0x + value[$efront_string_toStri](16))[$efront_string_length] < result[$efront_string_length]) && +temp === value) {
                result = temp
            }
            return result
        }
        function escapeRegExpCharacter(ch, previousIsBackslash) {
            if ((ch & ~1) === 8232) {
                return (previousIsBackslash ? $efront_string_u : $efront_string__u) + (ch === 8232 ? $efront_string_2028 : $efront_string_2029)
            } else if (ch === 10 || ch === 13) {
                return (previousIsBackslash ? '' : $efront_string__44) + (ch === 10 ? $efront_string_n : $efront_string_r)
            }
            return String[$efront_string_fromCh](ch)
        }
        function generateRegExp(reg) {
            var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;
            result = reg[$efront_string_toStri]();
            if (reg[$efront_string_source]) {
                match = result[$efront_string_match]($efront_regexp__$_4);
                if (!match) {
                    return result
                }
                flags = match[1];
                result = '';
                characterInBrack = false;
                previousIsBackslash = false;
                for (i = 0, iz = reg[$efront_string_source][$efront_string_length]; i < iz; ++i) {
                    ch = reg[$efront_string_source][$efront_string_charCo](i);
                    if (!previousIsBackslash) {
                        if (characterInBrack) {
                            if (ch === 93) {
                                characterInBrack = false
                            }
                        } else {
                            if (ch === 47) {
                                result += $efront_string__44
                            } else if (ch === 91) {
                                characterInBrack = true
                            }
                        }
                        result += escapeRegExpCharacter(ch, previousIsBackslash);
                        previousIsBackslash = ch === 92
                    } else {
                        result += escapeRegExpCharacter(ch, previousIsBackslash);
                        previousIsBackslash = false
                    }
                }
                return $efront_string__20 + result + $efront_string__20 + flags
            }
            return result
        }
        function escapeAllowedCharacter(code, next) {
            var hex;
            if (code === 8) {
                return $efront_string__b
            }
            if (code === 12) {
                return $efront_string__f
            }
            if (code === 9) {
                return $efront_string__t
            }
            hex = code[$efront_string_toStri](16)[$efront_string_toUppe]();
            if (json || code > 255) {
                return $efront_string__u + $efront_string_0000[$efront_string_slice](hex[$efront_string_length]) + hex
            } else if (code === 0 && !esutils[$efront_string_code][$efront_string_isDeci](next)) {
                return $efront_string__0
            } else if (code === 11) {
                return $efront_string__x0B
            } else {
                return $efront_string__x + $efront_string_00[$efront_string_slice](hex[$efront_string_length]) + hex
            }
        }
        function escapeDisallowedCharacter(code) {
            if (code === 92) {
                return $efront_string__45
            }
            if (code === 10) {
                return $efront_string__n
            }
            if (code === 13) {
                return $efront_string__r
            }
            if (code === 8232) {
                return $efront_string__u2028
            }
            if (code === 8233) {
                return $efront_string__u2029
            }
            throw new Error($efront_string_Incorr)
        }
        function escapeDirective(str) {
            var i, iz, code, quote;
            quote = quotes === $efront_string_double ? $efront_string__6 : $efront_string__46;
            for (i = 0, iz = str[$efront_string_length]; i < iz; ++i) {
                code = str[$efront_string_charCo](i);
                if (code === 39) {
                    quote = $efront_string__6;
                    break
                } else if (code === 34) {
                    quote = $efront_string__46;
                    break
                } else if (code === 92) {
                    ++i
                }
            }
            return quote + str + quote
        }
        function escapeString(str) {
            var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;
            for (i = 0, len = str[$efront_string_length]; i < len; ++i) {
                code = str[$efront_string_charCo](i);
                if (code === 39) {
                    ++singleQuotes
                } else if (code === 34) {
                    ++doubleQuotes
                } else if (code === 47 && json) {
                    result += $efront_string__44
                } else if (esutils[$efront_string_code][$efront_string_isLine](code) || code === 92) {
                    result += escapeDisallowedCharacter(code);
                    continue
                } else if (!esutils[$efront_string_code][$efront_string_isIden1](code) && (json && code < 32 || !json && !escapeless && (code < 32 || code > 126))) {
                    result += escapeAllowedCharacter(code, str[$efront_string_charCo](i + 1));
                    continue
                }
                result += String[$efront_string_fromCh](code)
            }
            single = !(quotes === $efront_string_double || quotes === $efront_string_auto && doubleQuotes < singleQuotes);
            quote = single ? $efront_string__46 : $efront_string__6;
            if (!(single ? singleQuotes : doubleQuotes)) {
                return quote + result + quote
            }
            str = result;
            result = quote;
            for (i = 0, len = str[$efront_string_length]; i < len; ++i) {
                code = str[$efront_string_charCo](i);
                if (code === 39 && single || code === 34 && !single) {
                    result += $efront_string__44
                }
                result += String[$efront_string_fromCh](code)
            }
            return result + quote
        }
        function flattenToString(arr) {
            var i, iz, elem, result = '';
            for (i = 0, iz = arr[$efront_string_length]; i < iz; ++i) {
                elem = arr[i];
                result += Array[$efront_string_isArra](elem) ? flattenToString(elem) : elem
            }
            return result
        }
        function toSourceNodeWhenNeeded(generated, node) {
            if (!sourceMap) {
                if (Array[$efront_string_isArra](generated)) {
                    return flattenToString(generated)
                } else {
                    return generated
                }
            }
            if (node == null) {
                if (generated instanceof SourceNode) {
                    return generated
                } else {
                    node = {}
                }
            }
            if (node[$efront_string_loc] == null) {
                return new SourceNode(null, null, sourceMap, generated, node[$efront_string_name] || null)
            }
            return new SourceNode(node[$efront_string_loc][$efront_string_start][$efront_string_line], node[$efront_string_loc][$efront_string_start][$efront_string_column], sourceMap === true ? node[$efront_string_loc][$efront_string_source] || null : sourceMap, generated, node[$efront_string_name] || null)
        }
        function noEmptySpace() {
            return space ? space : $efront_string__14
        }
        function join(left, right) {
            var leftSource, rightSource, leftCharCode, rightCharCode;
            leftSource = toSourceNodeWhenNeeded(left)[$efront_string_toStri]();
            if (leftSource[$efront_string_length] === 0) {
                return [right]
            }
            rightSource = toSourceNodeWhenNeeded(right)[$efront_string_toStri]();
            if (rightSource[$efront_string_length] === 0) {
                return [left]
            }
            leftCharCode = leftSource[$efront_string_charCo](leftSource[$efront_string_length] - 1);
            rightCharCode = rightSource[$efront_string_charCo](0);
            if ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils[$efront_string_code][$efront_string_isIden1](leftCharCode) && esutils[$efront_string_code][$efront_string_isIden1](rightCharCode) || leftCharCode === 47 && rightCharCode === 105) {
                return [
                    left,
                    noEmptySpace(),
                    right
                ]
            } else if (esutils[$efront_string_code][$efront_string_isWhit](leftCharCode) || esutils[$efront_string_code][$efront_string_isLine](leftCharCode) || esutils[$efront_string_code][$efront_string_isWhit](rightCharCode) || esutils[$efront_string_code][$efront_string_isLine](rightCharCode)) {
                return [
                    left,
                    right
                ]
            }
            return [
                left,
                space,
                right
            ]
        }
        function addIndent(stmt) {
            return [
                base,
                stmt
            ]
        }
        function withIndent(fn) {
            var previousBase;
            previousBase = base;
            base += indent;
            fn(base);
            base = previousBase
        }
        function calculateSpaces(str) {
            var i;
            for (i = str[$efront_string_length] - 1; i >= 0; --i) {
                if (esutils[$efront_string_code][$efront_string_isLine](str[$efront_string_charCo](i))) {
                    break
                }
            }
            return str[$efront_string_length] - 1 - i
        }
        function adjustMultilineComment(value, specialBase) {
            var array, i, len, line, j, spaces, previousBase, sn;
            array = value[$efront_string_split]($efront_regexp__r_n_r);
            spaces = Number[$efront_string_MAX_VA];
            for (i = 1, len = array[$efront_string_length]; i < len; ++i) {
                line = array[i];
                j = 0;
                while (j < line[$efront_string_length] && esutils[$efront_string_code][$efront_string_isWhit](line[$efront_string_charCo](j))) {
                    ++j
                }
                if (spaces > j) {
                    spaces = j
                }
            }
            if (typeof specialBase !== $efront_string_undefi) {
                previousBase = base;
                if (array[1][spaces] === $efront_string__40) {
                    specialBase += $efront_string__14
                }
                base = specialBase
            } else {
                if (spaces & 1) {
                    --spaces
                }
                previousBase = base
            }
            for (i = 1, len = array[$efront_string_length]; i < len; ++i) {
                sn = toSourceNodeWhenNeeded(addIndent(array[i][$efront_string_slice](spaces)));
                array[i] = sourceMap ? sn[$efront_string_join]('') : sn
            }
            base = previousBase;
            return array[$efront_string_join]($efront_string__1)
        }
        function generateComment(comment, specialBase) {
            if (comment[$efront_string_type] === $efront_string_Line) {
                if (endsWithLineTerminator(comment[$efront_string_value])) {
                    return $efront_string__16 + comment[$efront_string_value]
                } else {
                    var result = $efront_string__16 + comment[$efront_string_value];
                    if (!preserveBlankLines) {
                        result += $efront_string__1
                    }
                    return result
                }
            }
            if (extra[$efront_string_format][$efront_string_indent][$efront_string_adjust] && $efront_regexp__n_r_[$efront_string_test](comment[$efront_string_value])) {
                return adjustMultilineComment($efront_string__47 + comment[$efront_string_value] + $efront_string__48, specialBase)
            }
            return $efront_string__47 + comment[$efront_string_value] + $efront_string__48
        }
        function addComments(stmt, result) {
            var i, len, comment, save, tailingToStatement, specialBase, fragment, extRange, range, prevRange, prefix, infix, suffix, count;
            if (stmt[$efront_string_leadin] && stmt[$efront_string_leadin][$efront_string_length] > 0) {
                save = result;
                if (preserveBlankLines) {
                    comment = stmt[$efront_string_leadin][0];
                    result = [];
                    extRange = comment[$efront_string_extend];
                    range = comment[$efront_string_range];
                    prefix = sourceCode[$efront_string_substr1](extRange[0], range[0]);
                    count = (prefix[$efront_string_match]($efront_regexp__n_g) || [])[$efront_string_length];
                    if (count > 0) {
                        result[$efront_string_push](stringRepeat($efront_string__1, count));
                        result[$efront_string_push](addIndent(generateComment(comment)))
                    } else {
                        result[$efront_string_push](prefix);
                        result[$efront_string_push](generateComment(comment))
                    }
                    prevRange = range;
                    for (i = 1, len = stmt[$efront_string_leadin][$efront_string_length]; i < len; i++) {
                        comment = stmt[$efront_string_leadin][i];
                        range = comment[$efront_string_range];
                        infix = sourceCode[$efront_string_substr1](prevRange[1], range[0]);
                        count = (infix[$efront_string_match]($efront_regexp__n_g) || [])[$efront_string_length];
                        result[$efront_string_push](stringRepeat($efront_string__1, count));
                        result[$efront_string_push](addIndent(generateComment(comment)));
                        prevRange = range
                    }
                    suffix = sourceCode[$efront_string_substr1](range[1], extRange[1]);
                    count = (suffix[$efront_string_match]($efront_regexp__n_g) || [])[$efront_string_length];
                    result[$efront_string_push](stringRepeat($efront_string__1, count))
                } else {
                    comment = stmt[$efront_string_leadin][0];
                    result = [];
                    if (safeConcatenation && stmt[$efront_string_type] === Syntax[$efront_string_Progra] && stmt[$efront_string_body][$efront_string_length] === 0) {
                        result[$efront_string_push]($efront_string__1)
                    }
                    result[$efront_string_push](generateComment(comment));
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]())) {
                        result[$efront_string_push]($efront_string__1)
                    }
                    for (i = 1, len = stmt[$efront_string_leadin][$efront_string_length]; i < len; ++i) {
                        comment = stmt[$efront_string_leadin][i];
                        fragment = [generateComment(comment)];
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]())) {
                            fragment[$efront_string_push]($efront_string__1)
                        }
                        result[$efront_string_push](addIndent(fragment))
                    }
                }
                result[$efront_string_push](addIndent(save))
            }
            if (stmt[$efront_string_traili1]) {
                if (preserveBlankLines) {
                    comment = stmt[$efront_string_traili1][0];
                    extRange = comment[$efront_string_extend];
                    range = comment[$efront_string_range];
                    prefix = sourceCode[$efront_string_substr1](extRange[0], range[0]);
                    count = (prefix[$efront_string_match]($efront_regexp__n_g) || [])[$efront_string_length];
                    if (count > 0) {
                        result[$efront_string_push](stringRepeat($efront_string__1, count));
                        result[$efront_string_push](addIndent(generateComment(comment)))
                    } else {
                        result[$efront_string_push](prefix);
                        result[$efront_string_push](generateComment(comment))
                    }
                } else {
                    tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]());
                    specialBase = stringRepeat($efront_string__14, calculateSpaces(toSourceNodeWhenNeeded([
                        base,
                        result,
                        indent
                    ])[$efront_string_toStri]()));
                    for (i = 0, len = stmt[$efront_string_traili1][$efront_string_length]; i < len; ++i) {
                        comment = stmt[$efront_string_traili1][i];
                        if (tailingToStatement) {
                            if (i === 0) {
                                result = [
                                    result,
                                    indent
                                ]
                            } else {
                                result = [
                                    result,
                                    specialBase
                                ]
                            }
                            result[$efront_string_push](generateComment(comment, specialBase))
                        } else {
                            result = [
                                result,
                                addIndent(generateComment(comment))
                            ]
                        }
                        if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]())) {
                            result = [
                                result,
                                $efront_string__1
                            ]
                        }
                    }
                }
            }
            return result
        }
        function generateBlankLines(start, end, result) {
            var j, newlineCount = 0;
            for (j = start; j < end; j++) {
                if (sourceCode[j] === $efront_string__1) {
                    newlineCount++
                }
            }
            for (j = 1; j < newlineCount; j++) {
                result[$efront_string_push](newline)
            }
        }
        function parenthesize(text, current, should) {
            if (current < should) {
                return [
                    $efront_string__49,
                    text,
                    $efront_string__50
                ]
            }
            return text
        }
        function generateVerbatimString(string) {
            var i, iz, result;
            result = string[$efront_string_split]($efront_regexp__r_n_n);
            for (i = 1, iz = result[$efront_string_length]; i < iz; i++) {
                result[i] = newline + base + result[i]
            }
            return result
        }
        function generateVerbatim(expr, precedence) {
            var verbatim, result, prec;
            verbatim = expr[extra[$efront_string_verbat]];
            if (typeof verbatim === $efront_string_string) {
                result = parenthesize(generateVerbatimString(verbatim), Precedence[$efront_string_Sequen1], precedence)
            } else {
                result = generateVerbatimString(verbatim[$efront_string_conten]);
                prec = verbatim[$efront_string_preced] != null ? verbatim[$efront_string_preced] : Precedence[$efront_string_Sequen1];
                result = parenthesize(result, prec, precedence)
            }
            return toSourceNodeWhenNeeded(result, expr)
        }
        function CodeGenerator() {
        }
        CodeGenerator[$efront_string_protot][$efront_string_maybeB] = function (stmt, flags) {
            var result, noLeadingComment, that = this;
            noLeadingComment = !extra[$efront_string_commen] || !stmt[$efront_string_leadin];
            if (stmt[$efront_string_type] === Syntax[$efront_string_BlockS] && noLeadingComment) {
                return [
                    space,
                    this[$efront_string_genera5](stmt, flags)
                ]
            }
            if (stmt[$efront_string_type] === Syntax[$efront_string_EmptyS] && noLeadingComment) {
                return $efront_string__22
            }
            withIndent(function () {
                result = [
                    newline,
                    addIndent(that[$efront_string_genera5](stmt, flags))
                ]
            });
            return result
        };
        CodeGenerator[$efront_string_protot][$efront_string_maybeB1] = function (stmt, result) {
            var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]());
            if (stmt[$efront_string_type] === Syntax[$efront_string_BlockS] && (!extra[$efront_string_commen] || !stmt[$efront_string_leadin]) && !ends) {
                return [
                    result,
                    space
                ]
            }
            if (ends) {
                return [
                    result,
                    base
                ]
            }
            return [
                result,
                newline,
                base
            ]
        };
        function generateIdentifier(node) {
            return toSourceNodeWhenNeeded(node[$efront_string_name], node)
        }
        function generateAsyncPrefix(node, spaceRequired) {
            return node[$efront_string_async] ? $efront_string_async + (spaceRequired ? noEmptySpace() : space) : ''
        }
        function generateStarSuffix(node) {
            var isGenerator = node[$efront_string_genera6] && !extra[$efront_string_moz][$efront_string_starle];
            return isGenerator ? $efront_string__40 + space : ''
        }
        function generateMethodPrefix(prop) {
            var func = prop[$efront_string_value], prefix = '';
            if (func[$efront_string_async]) {
                prefix += generateAsyncPrefix(func, !prop[$efront_string_comput2])
            }
            if (func[$efront_string_genera6]) {
                prefix += generateStarSuffix(func) ? $efront_string__40 : ''
            }
            return prefix
        }
        CodeGenerator[$efront_string_protot][$efront_string_genera7] = function (node, precedence, flags) {
            if (node[$efront_string_type] === Syntax[$efront_string_Identi]) {
                return generateIdentifier(node)
            }
            return this[$efront_string_genera8](node, precedence, flags)
        };
        CodeGenerator[$efront_string_protot][$efront_string_genera9] = function (node) {
            var i, iz, result, hasDefault;
            hasDefault = false;
            if (node[$efront_string_type] === Syntax[$efront_string_ArrowF] && !node[$efront_string_rest] && (!node[$efront_string_defaul1] || node[$efront_string_defaul1][$efront_string_length] === 0) && node[$efront_string_params][$efront_string_length] === 1 && node[$efront_string_params][0][$efront_string_type] === Syntax[$efront_string_Identi]) {
                result = [
                    generateAsyncPrefix(node, true),
                    generateIdentifier(node[$efront_string_params][0])
                ]
            } else {
                result = node[$efront_string_type] === Syntax[$efront_string_ArrowF] ? [generateAsyncPrefix(node, false)] : [];
                result[$efront_string_push]($efront_string__49);
                if (node[$efront_string_defaul1]) {
                    hasDefault = true
                }
                for (i = 0, iz = node[$efront_string_params][$efront_string_length]; i < iz; ++i) {
                    if (hasDefault && node[$efront_string_defaul1][i]) {
                        result[$efront_string_push](this[$efront_string_genera10](node[$efront_string_params][i], node[$efront_string_defaul1][i], $efront_string__51, Precedence[$efront_string_Assign2], E_TTT))
                    } else {
                        result[$efront_string_push](this[$efront_string_genera7](node[$efront_string_params][i], Precedence[$efront_string_Assign2], E_TTT))
                    }
                    if (i + 1 < iz) {
                        result[$efront_string_push]($efront_string__12 + space)
                    }
                }
                if (node[$efront_string_rest]) {
                    if (node[$efront_string_params][$efront_string_length]) {
                        result[$efront_string_push]($efront_string__12 + space)
                    }
                    result[$efront_string_push]($efront_string__52);
                    result[$efront_string_push](generateIdentifier(node[$efront_string_rest]))
                }
                result[$efront_string_push]($efront_string__50)
            }
            return result
        };
        CodeGenerator[$efront_string_protot][$efront_string_genera11] = function (node) {
            var result, expr;
            result = this[$efront_string_genera9](node);
            if (node[$efront_string_type] === Syntax[$efront_string_ArrowF]) {
                result[$efront_string_push](space);
                result[$efront_string_push]($efront_string__53)
            }
            if (node[$efront_string_expres]) {
                result[$efront_string_push](space);
                expr = this[$efront_string_genera8](node[$efront_string_body], Precedence[$efront_string_Assign2], E_TTT);
                if (expr[$efront_string_toStri]()[$efront_string_charAt](0) === $efront_string__10) {
                    expr = [
                        $efront_string__49,
                        expr,
                        $efront_string__50
                    ]
                }
                result[$efront_string_push](expr)
            } else {
                result[$efront_string_push](this[$efront_string_maybeB](node[$efront_string_body], S_TTFF))
            }
            return result
        };
        CodeGenerator[$efront_string_protot][$efront_string_genera12] = function (operator, stmt, flags) {
            var result = [$efront_string_for + (stmt[$efront_string_await] ? noEmptySpace() + $efront_string_await : '') + space + $efront_string__49], that = this;
            withIndent(function () {
                if (stmt[$efront_string_left][$efront_string_type] === Syntax[$efront_string_Variab]) {
                    withIndent(function () {
                        result[$efront_string_push](stmt[$efront_string_left][$efront_string_kind] + noEmptySpace());
                        result[$efront_string_push](that[$efront_string_genera5](stmt[$efront_string_left][$efront_string_declar1][0], S_FFFF))
                    })
                } else {
                    result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_left], Precedence[$efront_string_Call], E_TTT))
                }
                result = join(result, operator);
                result = [
                    join(result, that[$efront_string_genera8](stmt[$efront_string_right], Precedence[$efront_string_Assign2], E_TTT)),
                    $efront_string__50
                ]
            });
            result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_body], flags));
            return result
        };
        CodeGenerator[$efront_string_protot][$efront_string_genera13] = function (expr, computed) {
            var result = [];
            if (computed) {
                result[$efront_string_push]($efront_string__13)
            }
            result[$efront_string_push](this[$efront_string_genera8](expr, Precedence[$efront_string_Assign2], E_TTT));
            if (computed) {
                result[$efront_string_push]($efront_string__8)
            }
            return result
        };
        CodeGenerator[$efront_string_protot][$efront_string_genera10] = function (left, right, operator, precedence, flags) {
            if (Precedence[$efront_string_Assign2] < precedence) {
                flags |= F_ALLOW_IN
            }
            return parenthesize([
                this[$efront_string_genera8](left, Precedence[$efront_string_Call], flags),
                space + operator + space,
                this[$efront_string_genera8](right, Precedence[$efront_string_Assign2], flags)
            ], Precedence[$efront_string_Assign2], precedence)
        };
        CodeGenerator[$efront_string_protot][$efront_string_semico1] = function (flags) {
            if (!semicolons && flags & F_SEMICOLON_OPT) {
                return ''
            }
            return $efront_string__22
        };
        CodeGenerator[$efront_string_Statem] = (_c = {}, _c[$efront_string_BlockS] = function (stmt, flags) {
            var range, content, result = [
                    $efront_string__10,
                    newline
                ], that = this;
            withIndent(function () {
                if (stmt[$efront_string_body][$efront_string_length] === 0 && preserveBlankLines) {
                    range = stmt[$efront_string_range];
                    if (range[1] - range[0] > 2) {
                        content = sourceCode[$efront_string_substr1](range[0] + 1, range[1] - 1);
                        if (content[0] === $efront_string__1) {
                            result = [$efront_string__10]
                        }
                        result[$efront_string_push](content)
                    }
                }
                var i, iz, fragment, bodyFlags;
                bodyFlags = S_TFFF;
                if (flags & F_FUNC_BODY) {
                    bodyFlags |= F_DIRECTIVE_CTX
                }
                for (i = 0, iz = stmt[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                    if (preserveBlankLines) {
                        if (i === 0) {
                            if (stmt[$efront_string_body][0][$efront_string_leadin]) {
                                range = stmt[$efront_string_body][0][$efront_string_leadin][0][$efront_string_extend];
                                content = sourceCode[$efront_string_substr1](range[0], range[1]);
                                if (content[0] === $efront_string__1) {
                                    result = [$efront_string__10]
                                }
                            }
                            if (!stmt[$efront_string_body][0][$efront_string_leadin]) {
                                generateBlankLines(stmt[$efront_string_range][0], stmt[$efront_string_body][0][$efront_string_range][0], result)
                            }
                        }
                        if (i > 0) {
                            if (!stmt[$efront_string_body][i - 1][$efront_string_traili1] && !stmt[$efront_string_body][i][$efront_string_leadin]) {
                                generateBlankLines(stmt[$efront_string_body][i - 1][$efront_string_range][1], stmt[$efront_string_body][i][$efront_string_range][0], result)
                            }
                        }
                    }
                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT
                    }
                    if (stmt[$efront_string_body][i][$efront_string_leadin] && preserveBlankLines) {
                        fragment = that[$efront_string_genera5](stmt[$efront_string_body][i], bodyFlags)
                    } else {
                        fragment = addIndent(that[$efront_string_genera5](stmt[$efront_string_body][i], bodyFlags))
                    }
                    result[$efront_string_push](fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]())) {
                        if (preserveBlankLines && i < iz - 1) {
                            if (!stmt[$efront_string_body][i + 1][$efront_string_leadin]) {
                                result[$efront_string_push](newline)
                            }
                        } else {
                            result[$efront_string_push](newline)
                        }
                    }
                    if (preserveBlankLines) {
                        if (i === iz - 1) {
                            if (!stmt[$efront_string_body][i][$efront_string_traili1]) {
                                generateBlankLines(stmt[$efront_string_body][i][$efront_string_range][1], stmt[$efront_string_range][1], result)
                            }
                        }
                    }
                }
            });
            result[$efront_string_push](addIndent($efront_string__9));
            return result
        }, _c[$efront_string_BreakS] = function (stmt, flags) {
            if (stmt[$efront_string_label]) {
                return $efront_string_break_ + stmt[$efront_string_label][$efront_string_name] + this[$efront_string_semico1](flags)
            }
            return $efront_string_break + this[$efront_string_semico1](flags)
        }, _c[$efront_string_Contin] = function (stmt, flags) {
            if (stmt[$efront_string_label]) {
                return $efront_string_contin1 + stmt[$efront_string_label][$efront_string_name] + this[$efront_string_semico1](flags)
            }
            return $efront_string_contin + this[$efront_string_semico1](flags)
        }, _c[$efront_string_ClassB] = function (stmt, flags) {
            var result = [
                    $efront_string__10,
                    newline
                ], that = this;
            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = stmt[$efront_string_body][$efront_string_length]; i < iz; ++i) {
                    result[$efront_string_push](indent);
                    result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_body][i], Precedence[$efront_string_Sequen1], E_TTT));
                    if (i + 1 < iz) {
                        result[$efront_string_push](newline)
                    }
                }
            });
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]())) {
                result[$efront_string_push](newline)
            }
            result[$efront_string_push](base);
            result[$efront_string_push]($efront_string__9);
            return result
        }, _c[$efront_string_ClassD] = function (stmt, flags) {
            var result, fragment;
            result = [$efront_string_class];
            if (stmt[$efront_string_id]) {
                result = join(result, this[$efront_string_genera8](stmt[$efront_string_id], Precedence[$efront_string_Sequen1], E_TTT))
            }
            if (stmt[$efront_string_superC]) {
                fragment = join($efront_string_extend1, this[$efront_string_genera8](stmt[$efront_string_superC], Precedence[$efront_string_Unary], E_TTT));
                result = join(result, fragment)
            }
            result[$efront_string_push](space);
            result[$efront_string_push](this[$efront_string_genera5](stmt[$efront_string_body], S_TFFT));
            return result
        }, _c[$efront_string_Direct] = function (stmt, flags) {
            if (extra[$efront_string_raw] && stmt[$efront_string_raw]) {
                return stmt[$efront_string_raw] + this[$efront_string_semico1](flags)
            }
            return escapeDirective(stmt[$efront_string_direct]) + this[$efront_string_semico1](flags)
        }, _c[$efront_string_DoWhil] = function (stmt, flags) {
            var result = join($efront_string_do, this[$efront_string_maybeB](stmt[$efront_string_body], S_TFFF));
            result = this[$efront_string_maybeB1](stmt[$efront_string_body], result);
            return join(result, [
                $efront_string_while + space + $efront_string__49,
                this[$efront_string_genera8](stmt[$efront_string_test], Precedence[$efront_string_Sequen1], E_TTT),
                $efront_string__50 + this[$efront_string_semico1](flags)
            ])
        }, _c[$efront_string_CatchC] = function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                var guard;
                if (stmt[$efront_string_param]) {
                    result = [
                        $efront_string_catch + space + $efront_string__49,
                        that[$efront_string_genera8](stmt[$efront_string_param], Precedence[$efront_string_Sequen1], E_TTT),
                        $efront_string__50
                    ];
                    if (stmt[$efront_string_guard]) {
                        guard = that[$efront_string_genera8](stmt[$efront_string_guard], Precedence[$efront_string_Sequen1], E_TTT);
                        result[$efront_string_splice](2, 0, $efront_string__if_, guard)
                    }
                } else {
                    result = [$efront_string_catch]
                }
            });
            result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_body], S_TFFF));
            return result
        }, _c[$efront_string_Debugg] = function (stmt, flags) {
            return $efront_string_debugg + this[$efront_string_semico1](flags)
        }, _c[$efront_string_EmptyS] = function (stmt, flags) {
            return $efront_string__22
        }, _c[$efront_string_Export1] = function (stmt, flags) {
            var result = [$efront_string_export2], bodyFlags;
            bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF;
            result = join(result, $efront_string_defaul);
            if (isStatement(stmt[$efront_string_declar])) {
                result = join(result, this[$efront_string_genera5](stmt[$efront_string_declar], bodyFlags))
            } else {
                result = join(result, this[$efront_string_genera8](stmt[$efront_string_declar], Precedence[$efront_string_Assign2], E_TTT) + this[$efront_string_semico1](flags))
            }
            return result
        }, _c[$efront_string_Export2] = function (stmt, flags) {
            var result = [$efront_string_export2], bodyFlags, that = this;
            bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF;
            if (stmt[$efront_string_declar]) {
                return join(result, this[$efront_string_genera5](stmt[$efront_string_declar], bodyFlags))
            }
            if (stmt[$efront_string_specif]) {
                if (stmt[$efront_string_specif][$efront_string_length] === 0) {
                    result = join(result, $efront_string__10 + space + $efront_string__9)
                } else if (stmt[$efront_string_specif][0][$efront_string_type] === Syntax[$efront_string_Export4]) {
                    result = join(result, this[$efront_string_genera8](stmt[$efront_string_specif][0], Precedence[$efront_string_Sequen1], E_TTT))
                } else {
                    result = join(result, $efront_string__10);
                    withIndent(function (indent) {
                        var i, iz;
                        result[$efront_string_push](newline);
                        for (i = 0, iz = stmt[$efront_string_specif][$efront_string_length]; i < iz; ++i) {
                            result[$efront_string_push](indent);
                            result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_specif][i], Precedence[$efront_string_Sequen1], E_TTT));
                            if (i + 1 < iz) {
                                result[$efront_string_push]($efront_string__12 + newline)
                            }
                        }
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]())) {
                        result[$efront_string_push](newline)
                    }
                    result[$efront_string_push](base + $efront_string__9)
                }
                if (stmt[$efront_string_source]) {
                    result = join(result, [
                        $efront_string_from + space,
                        this[$efront_string_genera8](stmt[$efront_string_source], Precedence[$efront_string_Sequen1], E_TTT),
                        this[$efront_string_semico1](flags)
                    ])
                } else {
                    result[$efront_string_push](this[$efront_string_semico1](flags))
                }
            }
            return result
        }, _c[$efront_string_Export] = function (stmt, flags) {
            return [
                $efront_string_export2 + space,
                $efront_string__40 + space,
                $efront_string_from + space,
                this[$efront_string_genera8](stmt[$efront_string_source], Precedence[$efront_string_Sequen1], E_TTT),
                this[$efront_string_semico1](flags)
            ]
        }, _c[$efront_string_Expres] = function (stmt, flags) {
            var result, fragment;
            function isClassPrefixed(fragment) {
                var code;
                if (fragment[$efront_string_slice](0, 5) !== $efront_string_class) {
                    return false
                }
                code = fragment[$efront_string_charCo](5);
                return code === 123 || esutils[$efront_string_code][$efront_string_isWhit](code) || esutils[$efront_string_code][$efront_string_isLine](code)
            }
            function isFunctionPrefixed(fragment) {
                var code;
                if (fragment[$efront_string_slice](0, 8) !== $efront_string_functi) {
                    return false
                }
                code = fragment[$efront_string_charCo](8);
                return code === 40 || esutils[$efront_string_code][$efront_string_isWhit](code) || code === 42 || esutils[$efront_string_code][$efront_string_isLine](code)
            }
            function isAsyncPrefixed(fragment) {
                var code, i, iz;
                if (fragment[$efront_string_slice](0, 5) !== $efront_string_async) {
                    return false
                }
                if (!esutils[$efront_string_code][$efront_string_isWhit](fragment[$efront_string_charCo](5))) {
                    return false
                }
                for (i = 6, iz = fragment[$efront_string_length]; i < iz; ++i) {
                    if (!esutils[$efront_string_code][$efront_string_isWhit](fragment[$efront_string_charCo](i))) {
                        break
                    }
                }
                if (i === iz) {
                    return false
                }
                if (fragment[$efront_string_slice](i, i + 8) !== $efront_string_functi) {
                    return false
                }
                code = fragment[$efront_string_charCo](i + 8);
                return code === 40 || esutils[$efront_string_code][$efront_string_isWhit](code) || code === 42 || esutils[$efront_string_code][$efront_string_isLine](code)
            }
            result = [this[$efront_string_genera8](stmt[$efront_string_expres], Precedence[$efront_string_Sequen1], E_TTT)];
            fragment = toSourceNodeWhenNeeded(result)[$efront_string_toStri]();
            if (fragment[$efront_string_charCo](0) === 123 || isClassPrefixed(fragment) || isFunctionPrefixed(fragment) || isAsyncPrefixed(fragment) || directive && flags & F_DIRECTIVE_CTX && stmt[$efront_string_expres][$efront_string_type] === Syntax[$efront_string_Litera] && typeof stmt[$efront_string_expres][$efront_string_value] === $efront_string_string) {
                result = [
                    $efront_string__49,
                    result,
                    $efront_string__50 + this[$efront_string_semico1](flags)
                ]
            } else {
                result[$efront_string_push](this[$efront_string_semico1](flags))
            }
            return result
        }, _c[$efront_string_Import1] = function (stmt, flags) {
            var result, cursor, that = this;
            if (stmt[$efront_string_specif][$efront_string_length] === 0) {
                return [
                    $efront_string_import1,
                    space,
                    this[$efront_string_genera8](stmt[$efront_string_source], Precedence[$efront_string_Sequen1], E_TTT),
                    this[$efront_string_semico1](flags)
                ]
            }
            result = [$efront_string_import1];
            cursor = 0;
            if (stmt[$efront_string_specif][cursor][$efront_string_type] === Syntax[$efront_string_Import2]) {
                result = join(result, [this[$efront_string_genera8](stmt[$efront_string_specif][cursor], Precedence[$efront_string_Sequen1], E_TTT)]);
                ++cursor
            }
            if (stmt[$efront_string_specif][cursor]) {
                if (cursor !== 0) {
                    result[$efront_string_push]($efront_string__12)
                }
                if (stmt[$efront_string_specif][cursor][$efront_string_type] === Syntax[$efront_string_Import3]) {
                    result = join(result, [
                        space,
                        this[$efront_string_genera8](stmt[$efront_string_specif][cursor], Precedence[$efront_string_Sequen1], E_TTT)
                    ])
                } else {
                    result[$efront_string_push](space + $efront_string__10);
                    if (stmt[$efront_string_specif][$efront_string_length] - cursor === 1) {
                        result[$efront_string_push](space);
                        result[$efront_string_push](this[$efront_string_genera8](stmt[$efront_string_specif][cursor], Precedence[$efront_string_Sequen1], E_TTT));
                        result[$efront_string_push](space + $efront_string__9 + space)
                    } else {
                        withIndent(function (indent) {
                            var i, iz;
                            result[$efront_string_push](newline);
                            for (i = cursor, iz = stmt[$efront_string_specif][$efront_string_length]; i < iz; ++i) {
                                result[$efront_string_push](indent);
                                result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_specif][i], Precedence[$efront_string_Sequen1], E_TTT));
                                if (i + 1 < iz) {
                                    result[$efront_string_push]($efront_string__12 + newline)
                                }
                            }
                        });
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]())) {
                            result[$efront_string_push](newline)
                        }
                        result[$efront_string_push](base + $efront_string__9 + space)
                    }
                }
            }
            result = join(result, [
                $efront_string_from + space,
                this[$efront_string_genera8](stmt[$efront_string_source], Precedence[$efront_string_Sequen1], E_TTT),
                this[$efront_string_semico1](flags)
            ]);
            return result
        }, _c[$efront_string_Variab1] = function (stmt, flags) {
            var itemFlags = flags & F_ALLOW_IN ? E_TTT : E_FTT;
            if (stmt[$efront_string_init]) {
                return [
                    this[$efront_string_genera8](stmt[$efront_string_id], Precedence[$efront_string_Assign2], itemFlags),
                    space,
                    $efront_string__51,
                    space,
                    this[$efront_string_genera8](stmt[$efront_string_init], Precedence[$efront_string_Assign2], itemFlags)
                ]
            }
            return this[$efront_string_genera7](stmt[$efront_string_id], Precedence[$efront_string_Assign2], itemFlags)
        }, _c[$efront_string_Variab] = function (stmt, flags) {
            var result, i, iz, node, bodyFlags, that = this;
            result = [stmt[$efront_string_kind]];
            bodyFlags = flags & F_ALLOW_IN ? S_TFFF : S_FFFF;
            function block() {
                node = stmt[$efront_string_declar1][0];
                if (extra[$efront_string_commen] && node[$efront_string_leadin]) {
                    result[$efront_string_push]($efront_string__1);
                    result[$efront_string_push](addIndent(that[$efront_string_genera5](node, bodyFlags)))
                } else {
                    result[$efront_string_push](noEmptySpace());
                    result[$efront_string_push](that[$efront_string_genera5](node, bodyFlags))
                }
                for (i = 1, iz = stmt[$efront_string_declar1][$efront_string_length]; i < iz; ++i) {
                    node = stmt[$efront_string_declar1][i];
                    if (extra[$efront_string_commen] && node[$efront_string_leadin]) {
                        result[$efront_string_push]($efront_string__12 + newline);
                        result[$efront_string_push](addIndent(that[$efront_string_genera5](node, bodyFlags)))
                    } else {
                        result[$efront_string_push]($efront_string__12 + space);
                        result[$efront_string_push](that[$efront_string_genera5](node, bodyFlags))
                    }
                }
            }
            if (stmt[$efront_string_declar1][$efront_string_length] > 1) {
                withIndent(block)
            } else {
                block()
            }
            result[$efront_string_push](this[$efront_string_semico1](flags));
            return result
        }, _c[$efront_string_ThrowS] = function (stmt, flags) {
            return [
                join($efront_string_throw, this[$efront_string_genera8](stmt[$efront_string_argume], Precedence[$efront_string_Sequen1], E_TTT)),
                this[$efront_string_semico1](flags)
            ]
        }, _c[$efront_string_TrySta] = function (stmt, flags) {
            var result, i, iz, guardedHandlers;
            result = [
                $efront_string_try,
                this[$efront_string_maybeB](stmt[$efront_string_block], S_TFFF)
            ];
            result = this[$efront_string_maybeB1](stmt[$efront_string_block], result);
            if (stmt[$efront_string_handle1]) {
                for (i = 0, iz = stmt[$efront_string_handle1][$efront_string_length]; i < iz; ++i) {
                    result = join(result, this[$efront_string_genera5](stmt[$efront_string_handle1][i], S_TFFF));
                    if (stmt[$efront_string_finali] || i + 1 !== iz) {
                        result = this[$efront_string_maybeB1](stmt[$efront_string_handle1][i][$efront_string_body], result)
                    }
                }
            } else {
                guardedHandlers = stmt[$efront_string_guarde] || [];
                for (i = 0, iz = guardedHandlers[$efront_string_length]; i < iz; ++i) {
                    result = join(result, this[$efront_string_genera5](guardedHandlers[i], S_TFFF));
                    if (stmt[$efront_string_finali] || i + 1 !== iz) {
                        result = this[$efront_string_maybeB1](guardedHandlers[i][$efront_string_body], result)
                    }
                }
                if (stmt[$efront_string_handle]) {
                    if (Array[$efront_string_isArra](stmt[$efront_string_handle])) {
                        for (i = 0, iz = stmt[$efront_string_handle][$efront_string_length]; i < iz; ++i) {
                            result = join(result, this[$efront_string_genera5](stmt[$efront_string_handle][i], S_TFFF));
                            if (stmt[$efront_string_finali] || i + 1 !== iz) {
                                result = this[$efront_string_maybeB1](stmt[$efront_string_handle][i][$efront_string_body], result)
                            }
                        }
                    } else {
                        result = join(result, this[$efront_string_genera5](stmt[$efront_string_handle], S_TFFF));
                        if (stmt[$efront_string_finali]) {
                            result = this[$efront_string_maybeB1](stmt[$efront_string_handle][$efront_string_body], result)
                        }
                    }
                }
            }
            if (stmt[$efront_string_finali]) {
                result = join(result, [
                    $efront_string_finall,
                    this[$efront_string_maybeB](stmt[$efront_string_finali], S_TFFF)
                ])
            }
            return result
        }, _c[$efront_string_Switch] = function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                result = [
                    $efront_string_switch + space + $efront_string__49,
                    that[$efront_string_genera8](stmt[$efront_string_discri], Precedence[$efront_string_Sequen1], E_TTT),
                    $efront_string__50 + space + $efront_string__10 + newline
                ]
            });
            if (stmt[$efront_string_cases]) {
                bodyFlags = S_TFFF;
                for (i = 0, iz = stmt[$efront_string_cases][$efront_string_length]; i < iz; ++i) {
                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT
                    }
                    fragment = addIndent(this[$efront_string_genera5](stmt[$efront_string_cases][i], bodyFlags));
                    result[$efront_string_push](fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]())) {
                        result[$efront_string_push](newline)
                    }
                }
            }
            result[$efront_string_push](addIndent($efront_string__9));
            return result
        }, _c[$efront_string_Switch1] = function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                if (stmt[$efront_string_test]) {
                    result = [
                        join($efront_string_case, that[$efront_string_genera8](stmt[$efront_string_test], Precedence[$efront_string_Sequen1], E_TTT)),
                        $efront_string__11
                    ]
                } else {
                    result = [$efront_string_defaul2]
                }
                i = 0;
                iz = stmt[$efront_string_conseq][$efront_string_length];
                if (iz && stmt[$efront_string_conseq][0][$efront_string_type] === Syntax[$efront_string_BlockS]) {
                    fragment = that[$efront_string_maybeB](stmt[$efront_string_conseq][0], S_TFFF);
                    result[$efront_string_push](fragment);
                    i = 1
                }
                if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]())) {
                    result[$efront_string_push](newline)
                }
                bodyFlags = S_TFFF;
                for (; i < iz; ++i) {
                    if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                        bodyFlags |= F_SEMICOLON_OPT
                    }
                    fragment = addIndent(that[$efront_string_genera5](stmt[$efront_string_conseq][i], bodyFlags));
                    result[$efront_string_push](fragment);
                    if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]())) {
                        result[$efront_string_push](newline)
                    }
                }
            });
            return result
        }, _c[$efront_string_IfStat] = function (stmt, flags) {
            var result, bodyFlags, semicolonOptional, that = this;
            withIndent(function () {
                result = [
                    $efront_string_if + space + $efront_string__49,
                    that[$efront_string_genera8](stmt[$efront_string_test], Precedence[$efront_string_Sequen1], E_TTT),
                    $efront_string__50
                ]
            });
            semicolonOptional = flags & F_SEMICOLON_OPT;
            bodyFlags = S_TFFF;
            if (semicolonOptional) {
                bodyFlags |= F_SEMICOLON_OPT
            }
            if (stmt[$efront_string_altern]) {
                result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_conseq], S_TFFF));
                result = this[$efront_string_maybeB1](stmt[$efront_string_conseq], result);
                if (stmt[$efront_string_altern][$efront_string_type] === Syntax[$efront_string_IfStat]) {
                    result = join(result, [
                        $efront_string_else_,
                        this[$efront_string_genera5](stmt[$efront_string_altern], bodyFlags)
                    ])
                } else {
                    result = join(result, join($efront_string_else, this[$efront_string_maybeB](stmt[$efront_string_altern], bodyFlags)))
                }
            } else {
                result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_conseq], bodyFlags))
            }
            return result
        }, _c[$efront_string_ForSta] = function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [$efront_string_for + space + $efront_string__49];
                if (stmt[$efront_string_init]) {
                    if (stmt[$efront_string_init][$efront_string_type] === Syntax[$efront_string_Variab]) {
                        result[$efront_string_push](that[$efront_string_genera5](stmt[$efront_string_init], S_FFFF))
                    } else {
                        result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_init], Precedence[$efront_string_Sequen1], E_FTT));
                        result[$efront_string_push]($efront_string__22)
                    }
                } else {
                    result[$efront_string_push]($efront_string__22)
                }
                if (stmt[$efront_string_test]) {
                    result[$efront_string_push](space);
                    result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_test], Precedence[$efront_string_Sequen1], E_TTT));
                    result[$efront_string_push]($efront_string__22)
                } else {
                    result[$efront_string_push]($efront_string__22)
                }
                if (stmt[$efront_string_update]) {
                    result[$efront_string_push](space);
                    result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_update], Precedence[$efront_string_Sequen1], E_TTT));
                    result[$efront_string_push]($efront_string__50)
                } else {
                    result[$efront_string_push]($efront_string__50)
                }
            });
            result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_body], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result
        }, _c[$efront_string_ForInS] = function (stmt, flags) {
            return this[$efront_string_genera12]($efront_string_in, stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)
        }, _c[$efront_string_ForOfS] = function (stmt, flags) {
            return this[$efront_string_genera12]($efront_string_of, stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)
        }, _c[$efront_string_Labele] = function (stmt, flags) {
            return [
                stmt[$efront_string_label][$efront_string_name] + $efront_string__11,
                this[$efront_string_maybeB](stmt[$efront_string_body], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)
            ]
        }, _c[$efront_string_Progra] = function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags;
            iz = stmt[$efront_string_body][$efront_string_length];
            result = [safeConcatenation && iz > 0 ? $efront_string__1 : ''];
            bodyFlags = S_TFTF;
            for (i = 0; i < iz; ++i) {
                if (!safeConcatenation && i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT
                }
                if (preserveBlankLines) {
                    if (i === 0) {
                        if (!stmt[$efront_string_body][0][$efront_string_leadin]) {
                            generateBlankLines(stmt[$efront_string_range][0], stmt[$efront_string_body][i][$efront_string_range][0], result)
                        }
                    }
                    if (i > 0) {
                        if (!stmt[$efront_string_body][i - 1][$efront_string_traili1] && !stmt[$efront_string_body][i][$efront_string_leadin]) {
                            generateBlankLines(stmt[$efront_string_body][i - 1][$efront_string_range][1], stmt[$efront_string_body][i][$efront_string_range][0], result)
                        }
                    }
                }
                fragment = addIndent(this[$efront_string_genera5](stmt[$efront_string_body][i], bodyFlags));
                result[$efront_string_push](fragment);
                if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]())) {
                    if (preserveBlankLines) {
                        if (!stmt[$efront_string_body][i + 1][$efront_string_leadin]) {
                            result[$efront_string_push](newline)
                        }
                    } else {
                        result[$efront_string_push](newline)
                    }
                }
                if (preserveBlankLines) {
                    if (i === iz - 1) {
                        if (!stmt[$efront_string_body][i][$efront_string_traili1]) {
                            generateBlankLines(stmt[$efront_string_body][i][$efront_string_range][1], stmt[$efront_string_range][1], result)
                        }
                    }
                }
            }
            return result
        }, _c[$efront_string_Functi1] = function (stmt, flags) {
            return [
                generateAsyncPrefix(stmt, true),
                $efront_string_functi,
                generateStarSuffix(stmt) || noEmptySpace(),
                stmt[$efront_string_id] ? generateIdentifier(stmt[$efront_string_id]) : '',
                this[$efront_string_genera11](stmt)
            ]
        }, _c[$efront_string_Return] = function (stmt, flags) {
            if (stmt[$efront_string_argume]) {
                return [
                    join($efront_string_return1, this[$efront_string_genera8](stmt[$efront_string_argume], Precedence[$efront_string_Sequen1], E_TTT)),
                    this[$efront_string_semico1](flags)
                ]
            }
            return [$efront_string_return1 + this[$efront_string_semico1](flags)]
        }, _c[$efront_string_WhileS] = function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    $efront_string_while + space + $efront_string__49,
                    that[$efront_string_genera8](stmt[$efront_string_test], Precedence[$efront_string_Sequen1], E_TTT),
                    $efront_string__50
                ]
            });
            result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_body], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result
        }, _c[$efront_string_WithSt] = function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    $efront_string_with + space + $efront_string__49,
                    that[$efront_string_genera8](stmt[$efront_string_object], Precedence[$efront_string_Sequen1], E_TTT),
                    $efront_string__50
                ]
            });
            result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_body], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result
        }, _c);
        merge(CodeGenerator[$efront_string_protot], CodeGenerator[$efront_string_Statem]);
        CodeGenerator[$efront_string_Expres1] = (_d = {}, _d[$efront_string_Sequen] = function (expr, precedence, flags) {
            var result, i, iz;
            if (Precedence[$efront_string_Sequen1] < precedence) {
                flags |= F_ALLOW_IN
            }
            result = [];
            for (i = 0, iz = expr[$efront_string_expres1][$efront_string_length]; i < iz; ++i) {
                result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_expres1][i], Precedence[$efront_string_Assign2], flags));
                if (i + 1 < iz) {
                    result[$efront_string_push]($efront_string__12 + space)
                }
            }
            return parenthesize(result, Precedence[$efront_string_Sequen1], precedence)
        }, _d[$efront_string_Assign] = function (expr, precedence, flags) {
            return this[$efront_string_genera10](expr[$efront_string_left], expr[$efront_string_right], expr[$efront_string_operat], precedence, flags)
        }, _d[$efront_string_ArrowF] = function (expr, precedence, flags) {
            return parenthesize(this[$efront_string_genera11](expr), Precedence[$efront_string_ArrowF1], precedence)
        }, _d[$efront_string_Condit] = function (expr, precedence, flags) {
            if (Precedence[$efront_string_Condit1] < precedence) {
                flags |= F_ALLOW_IN
            }
            return parenthesize([
                this[$efront_string_genera8](expr[$efront_string_test], Precedence[$efront_string_Logica1], flags),
                space + $efront_string__54 + space,
                this[$efront_string_genera8](expr[$efront_string_conseq], Precedence[$efront_string_Assign2], flags),
                space + $efront_string__11 + space,
                this[$efront_string_genera8](expr[$efront_string_altern], Precedence[$efront_string_Assign2], flags)
            ], Precedence[$efront_string_Condit1], precedence)
        }, _d[$efront_string_Logica] = function (expr, precedence, flags) {
            return this[$efront_string_Binary](expr, precedence, flags)
        }, _d[$efront_string_Binary] = function (expr, precedence, flags) {
            var result, leftPrecedence, rightPrecedence, currentPrecedence, fragment, leftSource;
            currentPrecedence = BinaryPrecedence[expr[$efront_string_operat]];
            leftPrecedence = expr[$efront_string_operat] === $efront_string__42 ? Precedence[$efront_string_Postfi] : currentPrecedence;
            rightPrecedence = expr[$efront_string_operat] === $efront_string__42 ? currentPrecedence : currentPrecedence + 1;
            if (currentPrecedence < precedence) {
                flags |= F_ALLOW_IN
            }
            fragment = this[$efront_string_genera8](expr[$efront_string_left], leftPrecedence, flags);
            leftSource = fragment[$efront_string_toStri]();
            if (leftSource[$efront_string_charCo](leftSource[$efront_string_length] - 1) === 47 && esutils[$efront_string_code][$efront_string_isIden1](expr[$efront_string_operat][$efront_string_charCo](0))) {
                result = [
                    fragment,
                    noEmptySpace(),
                    expr[$efront_string_operat]
                ]
            } else {
                result = join(fragment, expr[$efront_string_operat])
            }
            fragment = this[$efront_string_genera8](expr[$efront_string_right], rightPrecedence, flags);
            if (expr[$efront_string_operat] === $efront_string__20 && fragment[$efront_string_toStri]()[$efront_string_charAt](0) === $efront_string__20 || expr[$efront_string_operat][$efront_string_slice](-1) === $efront_string__32 && fragment[$efront_string_toStri]()[$efront_string_slice](0, 3) === $efront_string__55) {
                result[$efront_string_push](noEmptySpace());
                result[$efront_string_push](fragment)
            } else {
                result = join(result, fragment)
            }
            if (expr[$efront_string_operat] === $efront_string_in && !(flags & F_ALLOW_IN)) {
                return [
                    $efront_string__49,
                    result,
                    $efront_string__50
                ]
            }
            return parenthesize(result, currentPrecedence, precedence)
        }, _d[$efront_string_CallEx] = function (expr, precedence, flags) {
            var result, i, iz;
            result = [this[$efront_string_genera8](expr[$efront_string_callee], Precedence[$efront_string_Call], E_TTF)];
            if (expr[$efront_string_option2]) {
                result[$efront_string_push]($efront_string__56)
            }
            result[$efront_string_push]($efront_string__49);
            for (i = 0, iz = expr[$efront_string_argume1][$efront_string_length]; i < iz; ++i) {
                result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_argume1][i], Precedence[$efront_string_Assign2], E_TTT));
                if (i + 1 < iz) {
                    result[$efront_string_push]($efront_string__12 + space)
                }
            }
            result[$efront_string_push]($efront_string__50);
            if (!(flags & F_ALLOW_CALL)) {
                return [
                    $efront_string__49,
                    result,
                    $efront_string__50
                ]
            }
            return parenthesize(result, Precedence[$efront_string_Call], precedence)
        }, _d[$efront_string_ChainE] = function (expr, precedence, flags) {
            if (Precedence[$efront_string_Option] < precedence) {
                flags |= F_ALLOW_CALL
            }
            var result = this[$efront_string_genera8](expr[$efront_string_expres], Precedence[$efront_string_Option], flags);
            return parenthesize(result, Precedence[$efront_string_Option], precedence)
        }, _d[$efront_string_NewExp] = function (expr, precedence, flags) {
            var result, length, i, iz, itemFlags;
            length = expr[$efront_string_argume1][$efront_string_length];
            itemFlags = flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0 ? E_TFT : E_TFF;
            result = join($efront_string_new, this[$efront_string_genera8](expr[$efront_string_callee], Precedence[$efront_string_New], itemFlags));
            if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
                result[$efront_string_push]($efront_string__49);
                for (i = 0, iz = length; i < iz; ++i) {
                    result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_argume1][i], Precedence[$efront_string_Assign2], E_TTT));
                    if (i + 1 < iz) {
                        result[$efront_string_push]($efront_string__12 + space)
                    }
                }
                result[$efront_string_push]($efront_string__50)
            }
            return parenthesize(result, Precedence[$efront_string_New], precedence)
        }, _d[$efront_string_Member] = function (expr, precedence, flags) {
            var result, fragment;
            result = [this[$efront_string_genera8](expr[$efront_string_object], Precedence[$efront_string_Call], flags & F_ALLOW_CALL ? E_TTF : E_TFF)];
            if (expr[$efront_string_comput2]) {
                if (expr[$efront_string_option2]) {
                    result[$efront_string_push]($efront_string__56)
                }
                result[$efront_string_push]($efront_string__13);
                result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_proper], Precedence[$efront_string_Sequen1], flags & F_ALLOW_CALL ? E_TTT : E_TFT));
                result[$efront_string_push]($efront_string__8)
            } else {
                if (!expr[$efront_string_option2] && expr[$efront_string_object][$efront_string_type] === Syntax[$efront_string_Litera] && typeof expr[$efront_string_object][$efront_string_value] === $efront_string_number) {
                    fragment = toSourceNodeWhenNeeded(result)[$efront_string_toStri]();
                    if (fragment[$efront_string_indexO]($efront_string__15) < 0 && !$efront_regexp__eExX_[$efront_string_test](fragment) && esutils[$efront_string_code][$efront_string_isDeci](fragment[$efront_string_charCo](fragment[$efront_string_length] - 1)) && !(fragment[$efront_string_length] >= 2 && fragment[$efront_string_charCo](0) === 48)) {
                        result[$efront_string_push]($efront_string__14)
                    }
                }
                result[$efront_string_push](expr[$efront_string_option2] ? $efront_string__56 : $efront_string__15);
                result[$efront_string_push](generateIdentifier(expr[$efront_string_proper]))
            }
            return parenthesize(result, Precedence[$efront_string_Member1], precedence)
        }, _d[$efront_string_MetaPr] = function (expr, precedence, flags) {
            var result;
            result = [];
            result[$efront_string_push](typeof expr[$efront_string_meta] === $efront_string_string ? expr[$efront_string_meta] : generateIdentifier(expr[$efront_string_meta]));
            result[$efront_string_push]($efront_string__15);
            result[$efront_string_push](typeof expr[$efront_string_proper] === $efront_string_string ? expr[$efront_string_proper] : generateIdentifier(expr[$efront_string_proper]));
            return parenthesize(result, Precedence[$efront_string_Member1], precedence)
        }, _d[$efront_string_UnaryE] = function (expr, precedence, flags) {
            var result, fragment, rightCharCode, leftSource, leftCharCode;
            fragment = this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Unary], E_TTT);
            if (space === '') {
                result = join(expr[$efront_string_operat], fragment)
            } else {
                result = [expr[$efront_string_operat]];
                if (expr[$efront_string_operat][$efront_string_length] > 2) {
                    result = join(result, fragment)
                } else {
                    leftSource = toSourceNodeWhenNeeded(result)[$efront_string_toStri]();
                    leftCharCode = leftSource[$efront_string_charCo](leftSource[$efront_string_length] - 1);
                    rightCharCode = fragment[$efront_string_toStri]()[$efront_string_charCo](0);
                    if ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils[$efront_string_code][$efront_string_isIden1](leftCharCode) && esutils[$efront_string_code][$efront_string_isIden1](rightCharCode)) {
                        result[$efront_string_push](noEmptySpace());
                        result[$efront_string_push](fragment)
                    } else {
                        result[$efront_string_push](fragment)
                    }
                }
            }
            return parenthesize(result, Precedence[$efront_string_Unary], precedence)
        }, _d[$efront_string_YieldE] = function (expr, precedence, flags) {
            var result;
            if (expr[$efront_string_delega]) {
                result = $efront_string_yield_
            } else {
                result = $efront_string_yield
            }
            if (expr[$efront_string_argume]) {
                result = join(result, this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Yield], E_TTT))
            }
            return parenthesize(result, Precedence[$efront_string_Yield], precedence)
        }, _d[$efront_string_AwaitE] = function (expr, precedence, flags) {
            var result = join(expr[$efront_string_all] ? $efront_string_await_ : $efront_string_await, this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Await], E_TTT));
            return parenthesize(result, Precedence[$efront_string_Await], precedence)
        }, _d[$efront_string_Update] = function (expr, precedence, flags) {
            if (expr[$efront_string_prefix]) {
                return parenthesize([
                    expr[$efront_string_operat],
                    this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Unary], E_TTT)
                ], Precedence[$efront_string_Unary], precedence)
            }
            return parenthesize([
                this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Postfi], E_TTT),
                expr[$efront_string_operat]
            ], Precedence[$efront_string_Postfi], precedence)
        }, _d[$efront_string_Functi] = function (expr, precedence, flags) {
            var result = [
                generateAsyncPrefix(expr, true),
                $efront_string_functi
            ];
            if (expr[$efront_string_id]) {
                result[$efront_string_push](generateStarSuffix(expr) || noEmptySpace());
                result[$efront_string_push](generateIdentifier(expr[$efront_string_id]))
            } else {
                result[$efront_string_push](generateStarSuffix(expr) || space)
            }
            result[$efront_string_push](this[$efront_string_genera11](expr));
            return result
        }, _d[$efront_string_ArrayP] = function (expr, precedence, flags) {
            return this[$efront_string_ArrayE](expr, precedence, flags, true)
        }, _d[$efront_string_ArrayE] = function (expr, precedence, flags, isPattern) {
            var result, multiline, that = this;
            if (!expr[$efront_string_elemen][$efront_string_length]) {
                return $efront_string__57
            }
            multiline = isPattern ? false : expr[$efront_string_elemen][$efront_string_length] > 1;
            result = [
                $efront_string__13,
                multiline ? newline : ''
            ];
            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr[$efront_string_elemen][$efront_string_length]; i < iz; ++i) {
                    if (!expr[$efront_string_elemen][i]) {
                        if (multiline) {
                            result[$efront_string_push](indent)
                        }
                        if (i + 1 === iz) {
                            result[$efront_string_push]($efront_string__12)
                        }
                    } else {
                        result[$efront_string_push](multiline ? indent : '');
                        result[$efront_string_push](that[$efront_string_genera8](expr[$efront_string_elemen][i], Precedence[$efront_string_Assign2], E_TTT))
                    }
                    if (i + 1 < iz) {
                        result[$efront_string_push]($efront_string__12 + (multiline ? newline : space))
                    }
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]())) {
                result[$efront_string_push](newline)
            }
            result[$efront_string_push](multiline ? base : '');
            result[$efront_string_push]($efront_string__8);
            return result
        }, _d[$efront_string_RestEl] = function (expr, precedence, flags) {
            return $efront_string__52 + this[$efront_string_genera7](expr[$efront_string_argume])
        }, _d[$efront_string_ClassE] = function (expr, precedence, flags) {
            var result, fragment;
            result = [$efront_string_class];
            if (expr[$efront_string_id]) {
                result = join(result, this[$efront_string_genera8](expr[$efront_string_id], Precedence[$efront_string_Sequen1], E_TTT))
            }
            if (expr[$efront_string_superC]) {
                fragment = join($efront_string_extend1, this[$efront_string_genera8](expr[$efront_string_superC], Precedence[$efront_string_Unary], E_TTT));
                result = join(result, fragment)
            }
            result[$efront_string_push](space);
            result[$efront_string_push](this[$efront_string_genera5](expr[$efront_string_body], S_TFFT));
            return result
        }, _d[$efront_string_Method] = function (expr, precedence, flags) {
            var result, fragment;
            if (expr[$efront_string_static]) {
                result = [$efront_string_static + space]
            } else {
                result = []
            }
            if (expr[$efront_string_kind] === $efront_string_get || expr[$efront_string_kind] === $efront_string_set) {
                fragment = [
                    join(expr[$efront_string_kind], this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2])),
                    this[$efront_string_genera11](expr[$efront_string_value])
                ]
            } else {
                fragment = [
                    generateMethodPrefix(expr),
                    this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2]),
                    this[$efront_string_genera11](expr[$efront_string_value])
                ]
            }
            return join(result, fragment)
        }, _d[$efront_string_Proper] = function (expr, precedence, flags) {
            if (expr[$efront_string_kind] === $efront_string_get || expr[$efront_string_kind] === $efront_string_set) {
                return [
                    expr[$efront_string_kind],
                    noEmptySpace(),
                    this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2]),
                    this[$efront_string_genera11](expr[$efront_string_value])
                ]
            }
            if (expr[$efront_string_shorth]) {
                if (expr[$efront_string_value][$efront_string_type] === $efront_string_Assign1) {
                    return this[$efront_string_Assign1](expr[$efront_string_value], Precedence[$efront_string_Sequen1], E_TTT)
                }
                return this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2])
            }
            if (expr[$efront_string_method]) {
                return [
                    generateMethodPrefix(expr),
                    this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2]),
                    this[$efront_string_genera11](expr[$efront_string_value])
                ]
            }
            return [
                this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2]),
                $efront_string__11 + space,
                this[$efront_string_genera8](expr[$efront_string_value], Precedence[$efront_string_Assign2], E_TTT)
            ]
        }, _d[$efront_string_Object] = function (expr, precedence, flags) {
            var multiline, result, fragment, that = this;
            if (!expr[$efront_string_proper1][$efront_string_length]) {
                return $efront_string__58
            }
            multiline = expr[$efront_string_proper1][$efront_string_length] > 1;
            withIndent(function () {
                fragment = that[$efront_string_genera8](expr[$efront_string_proper1][0], Precedence[$efront_string_Sequen1], E_TTT)
            });
            if (!multiline) {
                if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]())) {
                    return [
                        $efront_string__10,
                        space,
                        fragment,
                        space,
                        $efront_string__9
                    ]
                }
            }
            withIndent(function (indent) {
                var i, iz;
                result = [
                    $efront_string__10,
                    newline,
                    indent,
                    fragment
                ];
                if (multiline) {
                    result[$efront_string_push]($efront_string__12 + newline);
                    for (i = 1, iz = expr[$efront_string_proper1][$efront_string_length]; i < iz; ++i) {
                        result[$efront_string_push](indent);
                        result[$efront_string_push](that[$efront_string_genera8](expr[$efront_string_proper1][i], Precedence[$efront_string_Sequen1], E_TTT));
                        if (i + 1 < iz) {
                            result[$efront_string_push]($efront_string__12 + newline)
                        }
                    }
                }
            });
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]())) {
                result[$efront_string_push](newline)
            }
            result[$efront_string_push](base);
            result[$efront_string_push]($efront_string__9);
            return result
        }, _d[$efront_string_Assign1] = function (expr, precedence, flags) {
            return this[$efront_string_genera10](expr[$efront_string_left], expr[$efront_string_right], $efront_string__51, precedence, flags)
        }, _d[$efront_string_Object1] = function (expr, precedence, flags) {
            var result, i, iz, multiline, property, that = this;
            if (!expr[$efront_string_proper1][$efront_string_length]) {
                return $efront_string__58
            }
            multiline = false;
            if (expr[$efront_string_proper1][$efront_string_length] === 1) {
                property = expr[$efront_string_proper1][0];
                if (property[$efront_string_type] === Syntax[$efront_string_Proper] && property[$efront_string_value][$efront_string_type] !== Syntax[$efront_string_Identi]) {
                    multiline = true
                }
            } else {
                for (i = 0, iz = expr[$efront_string_proper1][$efront_string_length]; i < iz; ++i) {
                    property = expr[$efront_string_proper1][i];
                    if (property[$efront_string_type] === Syntax[$efront_string_Proper] && !property[$efront_string_shorth]) {
                        multiline = true;
                        break
                    }
                }
            }
            result = [
                $efront_string__10,
                multiline ? newline : ''
            ];
            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr[$efront_string_proper1][$efront_string_length]; i < iz; ++i) {
                    result[$efront_string_push](multiline ? indent : '');
                    result[$efront_string_push](that[$efront_string_genera8](expr[$efront_string_proper1][i], Precedence[$efront_string_Sequen1], E_TTT));
                    if (i + 1 < iz) {
                        result[$efront_string_push]($efront_string__12 + (multiline ? newline : space))
                    }
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]())) {
                result[$efront_string_push](newline)
            }
            result[$efront_string_push](multiline ? base : '');
            result[$efront_string_push]($efront_string__9);
            return result
        }, _d[$efront_string_ThisEx] = function (expr, precedence, flags) {
            return $efront_string_this
        }, _d[$efront_string_Super] = function (expr, precedence, flags) {
            return $efront_string_super
        }, _d[$efront_string_Identi] = function (expr, precedence, flags) {
            return generateIdentifier(expr)
        }, _d[$efront_string_Import2] = function (expr, precedence, flags) {
            return generateIdentifier(expr[$efront_string_id] || expr[$efront_string_local])
        }, _d[$efront_string_Import3] = function (expr, precedence, flags) {
            var result = [$efront_string__40];
            var id = expr[$efront_string_id] || expr[$efront_string_local];
            if (id) {
                result[$efront_string_push](space + $efront_string_as + noEmptySpace() + generateIdentifier(id))
            }
            return result
        }, _d[$efront_string_Import4] = function (expr, precedence, flags) {
            var imported = expr[$efront_string_import];
            var result = [imported[$efront_string_name]];
            var local = expr[$efront_string_local];
            if (local && local[$efront_string_name] !== imported[$efront_string_name]) {
                result[$efront_string_push](noEmptySpace() + $efront_string_as + noEmptySpace() + generateIdentifier(local))
            }
            return result
        }, _d[$efront_string_Export3] = function (expr, precedence, flags) {
            var local = expr[$efront_string_local];
            var result = [local[$efront_string_name]];
            var exported = expr[$efront_string_export1];
            if (exported && exported[$efront_string_name] !== local[$efront_string_name]) {
                result[$efront_string_push](noEmptySpace() + $efront_string_as + noEmptySpace() + generateIdentifier(exported))
            }
            return result
        }, _d[$efront_string_Litera] = function (expr, precedence, flags) {
            var raw;
            if (expr[$efront_string_hasOwn]($efront_string_raw) && parse && extra[$efront_string_raw]) {
                try {
                    raw = parse(expr[$efront_string_raw])[$efront_string_body][0][$efront_string_expres];
                    if (raw[$efront_string_type] === Syntax[$efront_string_Litera]) {
                        if (raw[$efront_string_value] === expr[$efront_string_value]) {
                            return expr[$efront_string_raw]
                        }
                    }
                } catch (e) {
                }
            }
            if (expr[$efront_string_regex]) {
                return $efront_string__20 + expr[$efront_string_regex][$efront_string_patter] + $efront_string__20 + expr[$efront_string_regex][$efront_string_flags]
            }
            if (expr[$efront_string_value] === null) {
                return $efront_string_null
            }
            if (typeof expr[$efront_string_value] === $efront_string_string) {
                return escapeString(expr[$efront_string_value])
            }
            if (typeof expr[$efront_string_value] === $efront_string_number) {
                return generateNumber(expr[$efront_string_value])
            }
            if (typeof expr[$efront_string_value] === $efront_string_boolea) {
                return expr[$efront_string_value] ? $efront_string_true : $efront_string_false
            }
            return generateRegExp(expr[$efront_string_value])
        }, _d[$efront_string_Genera] = function (expr, precedence, flags) {
            return this[$efront_string_Compre1](expr, precedence, flags)
        }, _d[$efront_string_Compre1] = function (expr, precedence, flags) {
            var result, i, iz, fragment, that = this;
            result = expr[$efront_string_type] === Syntax[$efront_string_Genera] ? [$efront_string__49] : [$efront_string__13];
            if (extra[$efront_string_moz][$efront_string_compre]) {
                fragment = this[$efront_string_genera8](expr[$efront_string_body], Precedence[$efront_string_Assign2], E_TTT);
                result[$efront_string_push](fragment)
            }
            if (expr[$efront_string_blocks]) {
                withIndent(function () {
                    for (i = 0, iz = expr[$efront_string_blocks][$efront_string_length]; i < iz; ++i) {
                        fragment = that[$efront_string_genera8](expr[$efront_string_blocks][i], Precedence[$efront_string_Sequen1], E_TTT);
                        if (i > 0 || extra[$efront_string_moz][$efront_string_compre]) {
                            result = join(result, fragment)
                        } else {
                            result[$efront_string_push](fragment)
                        }
                    }
                })
            }
            if (expr[$efront_string_filter]) {
                result = join(result, $efront_string_if + space);
                fragment = this[$efront_string_genera8](expr[$efront_string_filter], Precedence[$efront_string_Sequen1], E_TTT);
                result = join(result, [
                    $efront_string__49,
                    fragment,
                    $efront_string__50
                ])
            }
            if (!extra[$efront_string_moz][$efront_string_compre]) {
                fragment = this[$efront_string_genera8](expr[$efront_string_body], Precedence[$efront_string_Assign2], E_TTT);
                result = join(result, fragment)
            }
            result[$efront_string_push](expr[$efront_string_type] === Syntax[$efront_string_Genera] ? $efront_string__50 : $efront_string__8);
            return result
        }, _d[$efront_string_Compre] = function (expr, precedence, flags) {
            var fragment;
            if (expr[$efront_string_left][$efront_string_type] === Syntax[$efront_string_Variab]) {
                fragment = [
                    expr[$efront_string_left][$efront_string_kind],
                    noEmptySpace(),
                    this[$efront_string_genera5](expr[$efront_string_left][$efront_string_declar1][0], S_FFFF)
                ]
            } else {
                fragment = this[$efront_string_genera8](expr[$efront_string_left], Precedence[$efront_string_Call], E_TTT)
            }
            fragment = join(fragment, expr[$efront_string_of] ? $efront_string_of : $efront_string_in);
            fragment = join(fragment, this[$efront_string_genera8](expr[$efront_string_right], Precedence[$efront_string_Sequen1], E_TTT));
            return [
                $efront_string_for + space + $efront_string__49,
                fragment,
                $efront_string__50
            ]
        }, _d[$efront_string_Spread] = function (expr, precedence, flags) {
            return [
                $efront_string__52,
                this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Assign2], E_TTT)
            ]
        }, _d[$efront_string_Tagged] = function (expr, precedence, flags) {
            var itemFlags = E_TTF;
            if (!(flags & F_ALLOW_CALL)) {
                itemFlags = E_TFF
            }
            var result = [
                this[$efront_string_genera8](expr[$efront_string_tag], Precedence[$efront_string_Call], itemFlags),
                this[$efront_string_genera8](expr[$efront_string_quasi], Precedence[$efront_string_Primar], E_FFT)
            ];
            return parenthesize(result, Precedence[$efront_string_Tagged1], precedence)
        }, _d[$efront_string_Templa] = function (expr, precedence, flags) {
            return expr[$efront_string_value][$efront_string_raw]
        }, _d[$efront_string_Templa1] = function (expr, precedence, flags) {
            var result, i, iz;
            result = [$efront_string__59];
            for (i = 0, iz = expr[$efront_string_quasis][$efront_string_length]; i < iz; ++i) {
                result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_quasis][i], Precedence[$efront_string_Primar], E_TTT));
                if (i + 1 < iz) {
                    result[$efront_string_push]($efront_string_$_ + space);
                    result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_expres1][i], Precedence[$efront_string_Sequen1], E_TTT));
                    result[$efront_string_push](space + $efront_string__9)
                }
            }
            result[$efront_string_push]($efront_string__59);
            return result
        }, _d[$efront_string_Module] = function (expr, precedence, flags) {
            return this[$efront_string_Litera](expr, precedence, flags)
        }, _d[$efront_string_Import] = function (expr, precedence, flag) {
            return parenthesize([
                $efront_string_import2,
                this[$efront_string_genera8](expr[$efront_string_source], Precedence[$efront_string_Assign2], E_TTT),
                $efront_string__50
            ], Precedence[$efront_string_Call], precedence)
        }, _d);
        merge(CodeGenerator[$efront_string_protot], CodeGenerator[$efront_string_Expres1]);
        CodeGenerator[$efront_string_protot][$efront_string_genera8] = function (expr, precedence, flags) {
            var result, type;
            type = expr[$efront_string_type] || Syntax[$efront_string_Proper];
            if (extra[$efront_string_verbat] && expr[$efront_string_hasOwn](extra[$efront_string_verbat])) {
                return generateVerbatim(expr, precedence)
            }
            result = this[type](expr, precedence, flags);
            if (extra[$efront_string_commen]) {
                result = addComments(expr, result)
            }
            return toSourceNodeWhenNeeded(result, expr)
        };
        CodeGenerator[$efront_string_protot][$efront_string_genera5] = function (stmt, flags) {
            var result, fragment;
            result = this[stmt[$efront_string_type]](stmt, flags);
            if (extra[$efront_string_commen]) {
                result = addComments(stmt, result)
            }
            fragment = toSourceNodeWhenNeeded(result)[$efront_string_toStri]();
            if (stmt[$efront_string_type] === Syntax[$efront_string_Progra] && !safeConcatenation && newline === '' && fragment[$efront_string_charAt](fragment[$efront_string_length] - 1) === $efront_string__1) {
                result = sourceMap ? toSourceNodeWhenNeeded(result)[$efront_string_replac1]($efront_regexp__s_$_, '') : fragment[$efront_string_replac]($efront_regexp__s_$_, '')
            }
            return toSourceNodeWhenNeeded(result, stmt)
        };
        function generateInternal(node) {
            var codegen;
            codegen = new CodeGenerator;
            if (isStatement(node)) {
                return codegen[$efront_string_genera5](node, S_TFFF)
            }
            if (isExpression(node)) {
                return codegen[$efront_string_genera8](node, Precedence[$efront_string_Sequen1], E_TTT)
            }
            throw new Error($efront_string_Unknow2 + node[$efront_string_type])
        }
        function generate(node, options) {
            var _a, _b;
            var defaultOptions = getDefaultOptions(), result, pair;
            if (options != null) {
                if (typeof options[$efront_string_indent] === $efront_string_string) {
                    defaultOptions[$efront_string_format][$efront_string_indent][$efront_string_style] = options[$efront_string_indent]
                }
                if (typeof options[$efront_string_base] === $efront_string_number) {
                    defaultOptions[$efront_string_format][$efront_string_indent][$efront_string_base] = options[$efront_string_base]
                }
                options = updateDeeply(defaultOptions, options);
                indent = options[$efront_string_format][$efront_string_indent][$efront_string_style];
                if (typeof options[$efront_string_base] === $efront_string_string) {
                    base = options[$efront_string_base]
                } else {
                    base = stringRepeat(indent, options[$efront_string_format][$efront_string_indent][$efront_string_base])
                }
            } else {
                options = defaultOptions;
                indent = options[$efront_string_format][$efront_string_indent][$efront_string_style];
                base = stringRepeat(indent, options[$efront_string_format][$efront_string_indent][$efront_string_base])
            }
            json = options[$efront_string_format][$efront_string_json];
            renumber = options[$efront_string_format][$efront_string_renumb];
            hexadecimal = json ? false : options[$efront_string_format][$efront_string_hexade];
            quotes = json ? $efront_string_double : options[$efront_string_format][$efront_string_quotes];
            escapeless = options[$efront_string_format][$efront_string_escape];
            newline = options[$efront_string_format][$efront_string_newlin];
            space = options[$efront_string_format][$efront_string_space];
            if (options[$efront_string_format][$efront_string_compac]) {
                newline = space = indent = base = ''
            }
            parentheses = options[$efront_string_format][$efront_string_parent2];
            semicolons = options[$efront_string_format][$efront_string_semico];
            safeConcatenation = options[$efront_string_format][$efront_string_safeCo];
            directive = options[$efront_string_direct];
            parse = json ? null : options[$efront_string_parse];
            sourceMap = options[$efront_string_source8];
            sourceCode = options[$efront_string_source11];
            preserveBlankLines = options[$efront_string_format][$efront_string_preser] && sourceCode !== null;
            extra = options;
            if (sourceMap) {
                if (!exports[$efront_string_browse]) {
                    SourceNode = require(603)[$efront_string_Source3]
                } else {
                    SourceNode = global[$efront_string_source8][$efront_string_Source3]
                }
            }
            result = generateInternal(node);
            if (!sourceMap) {
                pair = (_a = {}, _a[$efront_string_code] = result[$efront_string_toStri](), _a[$efront_string_map] = null, _a);
                return options[$efront_string_source10] ? pair : pair[$efront_string_code]
            }
            pair = result[$efront_string_toStri1]((_b = {}, _b[$efront_string_file] = options[$efront_string_file], _b[$efront_string_source3] = options[$efront_string_source9], _b));
            if (options[$efront_string_source12]) {
                pair[$efront_string_map][$efront_string_setSou](options[$efront_string_source8], options[$efront_string_source12])
            }
            if (options[$efront_string_source10]) {
                return pair
            }
            return pair[$efront_string_map][$efront_string_toStri]()
        }
        FORMAT_MINIFY = (_e = {}, _e[$efront_string_indent] = (_f = {}, _f[$efront_string_style] = '', _f[$efront_string_base] = 0, _f), _e[$efront_string_renumb] = true, _e[$efront_string_hexade] = true, _e[$efront_string_quotes] = $efront_string_auto, _e[$efront_string_escape] = true, _e[$efront_string_compac] = true, _e[$efront_string_parent2] = false, _e[$efront_string_semico] = false, _e);
        FORMAT_DEFAULTS = getDefaultOptions()[$efront_string_format];
        exports[$efront_string_versio] = require(376)[$efront_string_versio];
        exports[$efront_string_genera14] = generate;
        exports[$efront_string_attach1] = estraverse[$efront_string_attach1];
        exports[$efront_string_Preced] = updateDeeply({}, Precedence);
        exports[$efront_string_browse] = false;
        exports[$efront_string_FORMAT] = FORMAT_MINIFY;
        exports[$efront_string_FORMAT1] = FORMAT_DEFAULTS
    }()
}],
/** 786 "e" */ "e",
/** 787 "d" */ "d",
/** 788 "o" */ "o",
/** 789 "C" */ "C",
/** 790 "r" */ "r",
/** 791 "a" */ "a",
/** 792 "h" */ "h",
/** 793 "m" */ "m",
/** 794 "f" */ "f",
/** 795 "t" */ "t",
/** 796 "A" */ "A",
/** 797 "c" */ "c"],function (a, c,s) {
        var 
    m=s[2],
    y=s[5],x=s[8],
    e=s[7],
    w=s[10],
    q=s[3],
    E=48,
    o=s[4],
    n=s[1],
    v=s[6],
    z=s[9],
    B=s[12],
    M=17,
        u,p=[x,m,n,q,o,y,B,e,v,z,w,s[11]],
        h=s[M-1][0],
        j=s[14],
        $=[s[785],s[786],s[787],s[788],s[789],s[790],s[791],s[788],s[792],s[787],s[789],s[793]],
        _=[s[794],s[795],s[785],s[786],s[787],s[788],s[789],s[790],s[791],s[796]][v]()[w](''),T = this,R;
        if (!(a instanceof s[61])){
            R = function(){
                return a
            }
        }else if(!a[m]){
            R=function(){return function(i){return T[i]()}
            };
        }else{
            R=function(){
                if(~[E,M][x](c+1))return s[c][0];
                var r=s[13],I,g=[],i=0,k=a[m]-1,f=a[k],l=r[e](f);
                if(~a[x](E)||~a[x](M))I={},I[B]={};
                for(;i<k;i++)g[i]=a[i]===M?I:a[i]===E?I[B]:a[i]?T[a[i]]():T[0];
                if (l) {
                    l = l[1][q](',');
                    g = g[o]([l]);
                }
                r = f[y](I?I[B]:T[0], g);
                return I?I[B]:r;
            }
        }
        return T[c + 1] = function(){
            var S=R();T[c+1]=function(){return S};
            return S
        }
    },[this.window||this.globalThis||global])[784]()