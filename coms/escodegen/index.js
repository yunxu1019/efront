module.exports=([/*Wed Feb 24 2021 07:14:02 GMT+0800 (中国标准时间) by efront 2.17.0*/].map||function (f, t) {
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
/** 15 exports */ [578],
/** 16 TypeError */ typeof TypeError!=="undefined"?TypeError:void 0,
/** 17 $efront_string_ABCDEF */ "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
/** 18 $efront_string_encode */ "encode",
/** 19 $efront_string_Must_b */ /** text */ "Must be between 0 and 63: ",
/** 20 $efront_string_decode */ "decode",
/** 21 source-map$lib$base64.js */ [15,16,17,4,18,3,19,20,function(exports, TypeError, $efront_string_ABCDEF, $efront_string_split, $efront_string_encode, $efront_string_length, $efront_string_Must_b, $efront_string_decode) {
    var intToCharMap = $efront_string_ABCDEF[$efront_string_split]('');
    return exports[$efront_string_encode] = function (number) {
        if (0 <= number && number < intToCharMap[$efront_string_length])
            return intToCharMap[number];
        throw new TypeError($efront_string_Must_b + number)
    }, exports[$efront_string_decode] = function (charCode) {
        var bigA = 65, bigZ = 90, littleA = 97, littleZ = 122, zero = 48, nine = 57, plus = 43, slash = 47, littleOffset = 26, numberOffset = 52;
        return bigA <= charCode && charCode <= bigZ ? charCode - bigA : littleA <= charCode && charCode <= littleZ ? charCode - littleA + littleOffset : zero <= charCode && charCode <= nine ? charCode - zero + numberOffset : charCode == plus ? 62 : charCode == slash ? 63 : -1
    }, exports
}],
/** 22 Error */ Error,
/** 23 Array */ Array,
/** 24 Object */ Object,
/** 25 JSON */ typeof JSON!=="undefined"?JSON:void 0,
/** 26 $efront_string__ */ "\"",
/** 27 $efront_string__is_a_ */ /** text */ "\" is a required argument.",
/** 28 $efront_string_getArg */ "getArg",
/** 29 $efront_regexp__w_w_w */ /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,
/** 30 $efront_regexp__data_ */ /^data:.+\,.+$/,
/** 31 $efront_string_match */ "match",
/** 32 $efront_string_scheme */ "scheme",
/** 33 $efront_string_auth */ "auth",
/** 34 $efront_string_host */ "host",
/** 35 $efront_string_port */ "port",
/** 36 $efront_string_path */ "path",
/** 37 $efront_string_urlPar */ "urlParse",
/** 38 $efront_string__1 */ ":",
/** 39 $efront_string__2 */ "//",
/** 40 $efront_string__3 */ "@",
/** 41 $efront_string_urlGen */ "urlGenerate",
/** 42 $efront_string_isAbso */ "isAbsolute",
/** 43 $efront_regexp__4 */ /\/+/,
/** 44 $efront_string__5 */ ".",
/** 45 $efront_string_splice */ "splice",
/** 46 $efront_string__6 */ "..",
/** 47 $efront_string__7 */ "/",
/** 48 $efront_string_normal */ "normalize",
/** 49 $efront_string_charAt */ "charAt",
/** 50 $efront_string_replac */ "replace",
/** 51 $efront_regexp__$_ */ /\/+$/,
/** 52 $efront_string_test */ "test",
/** 53 $efront_regexp__$_1 */ /\/$/,
/** 54 $efront_string_lastIn */ "lastIndexOf",
/** 55 $efront_regexp__$_2 */ /^([^\/]+:\/)?\/*$/,
/** 56 $efront_string__8 */ "../",
/** 57 $efront_string_substr */ "substr",
/** 58 $efront_string_relati */ "relative",
/** 59 $efront_string_create */ "create",
/** 60 $efront_string___prot */ "__proto__",
/** 61 $efront_string_$ */ "$",
/** 62 $efront_string_toSetS */ "toSetString",
/** 63 $efront_string_fromSe */ "fromSetString",
/** 64 $efront_string_charCo */ "charCodeAt",
/** 65 $efront_string_source */ "source",
/** 66 $efront_string_origin */ "originalLine",
/** 67 $efront_string_origin1 */ "originalColumn",
/** 68 $efront_string_genera */ "generatedColumn",
/** 69 $efront_string_genera1 */ "generatedLine",
/** 70 $efront_string_name */ "name",
/** 71 $efront_string_compar */ "compareByOriginalPositions",
/** 72 $efront_string_compar1 */ "compareByGeneratedPositionsDeflated",
/** 73 $efront_string_compar2 */ "compareByGeneratedPositionsInflated",
/** 74 $efront_string_parse */ "parse",
/** 75 $efront_regexp__n_n_ */ /^\)]}'[^\n]*\n/,
/** 76 $efront_string_parseS */ "parseSourceMapInput",
/** 77 $efront_string_source1 */ /** text */ "sourceMapURL could not be parsed",
/** 78 $efront_string_substr1 */ "substring",
/** 79 $efront_string_comput */ "computeSourceURL",
/** 80 source-map$lib$util.js */ [22,15,23,24,25,3,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,4,43,44,45,46,11,47,48,49,50,51,52,53,9,54,2,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,function(Error, exports, Array, Object, JSON, $efront_string_length, $efront_string__, $efront_string__is_a_, $efront_string_getArg, $efront_regexp__w_w_w, $efront_regexp__data_, $efront_string_match, $efront_string_scheme, $efront_string_auth, $efront_string_host, $efront_string_port, $efront_string_path, $efront_string_urlPar, $efront_string__1, $efront_string__2, $efront_string__3, $efront_string_urlGen, $efront_string_isAbso, $efront_string_split, $efront_regexp__4, $efront_string__5, $efront_string_splice, $efront_string__6, $efront_string_join, $efront_string__7, $efront_string_normal, $efront_string_charAt, $efront_string_replac, $efront_regexp__$_, $efront_string_test, $efront_regexp__$_1, $efront_string_indexO, $efront_string_lastIn, $efront_string_slice, $efront_regexp__$_2, $efront_string__8, $efront_string_substr, $efront_string_relati, $efront_string_create, $efront_string___prot, $efront_string_$, $efront_string_toSetS, $efront_string_fromSe, $efront_string_charCo, $efront_string_source, $efront_string_origin, $efront_string_origin1, $efront_string_genera, $efront_string_genera1, $efront_string_name, $efront_string_compar, $efront_string_compar1, $efront_string_compar2, $efront_string_parse, $efront_regexp__n_n_, $efront_string_parseS, $efront_string_source1, $efront_string_substr1, $efront_string_comput) {
    function getArg(aArgs, aName, aDefaultValue) {
        if (aName in aArgs)
            return aArgs[aName];
        else if (arguments[$efront_string_length] === 3)
            return aDefaultValue;
        else
            throw new Error($efront_string__ + aName + $efront_string__is_a_)
    }
    function urlParse(aUrl) {
        var _a, match = aUrl[$efront_string_match](urlRegexp);
        return match ? (_a = {}, _a[$efront_string_scheme] = match[1], _a[$efront_string_auth] = match[2], _a[$efront_string_host] = match[3], _a[$efront_string_port] = match[4], _a[$efront_string_path] = match[5], _a) : null
    }
    function urlGenerate(aParsedUrl) {
        var url = '';
        return aParsedUrl[$efront_string_scheme] && (url += aParsedUrl[$efront_string_scheme] + $efront_string__1), url += $efront_string__2, aParsedUrl[$efront_string_auth] && (url += aParsedUrl[$efront_string_auth] + $efront_string__3), aParsedUrl[$efront_string_host] && (url += aParsedUrl[$efront_string_host]), aParsedUrl[$efront_string_port] && (url += $efront_string__1 + aParsedUrl[$efront_string_port]), aParsedUrl[$efront_string_path] && (url += aParsedUrl[$efront_string_path]), url
    }
    function normalize(aPath) {
        var path = aPath, url = urlParse(aPath);
        if (url) {
            if (!url[$efront_string_path])
                return aPath;
            path = url[$efront_string_path]
        }
        var isAbsolute = exports[$efront_string_isAbso](path), parts = path[$efront_string_split]($efront_regexp__4);
        for (var part, up = 0, i = parts[$efront_string_length] - 1; i >= 0; i--)
            part = parts[i], part === $efront_string__5 ? parts[$efront_string_splice](i, 1) : part === $efront_string__6 ? up++ : up > 0 && (part === '' ? (parts[$efront_string_splice](i + 1, up), up = 0) : (parts[$efront_string_splice](i, 2), up--));
        return path = parts[$efront_string_join]($efront_string__7), path === '' && (path = isAbsolute ? $efront_string__7 : $efront_string__5), url ? (url[$efront_string_path] = path, urlGenerate(url)) : path
    }
    function join(aRoot, aPath) {
        aRoot === '' && (aRoot = $efront_string__5), aPath === '' && (aPath = $efront_string__5);
        var aPathUrl = urlParse(aPath), aRootUrl = urlParse(aRoot);
        if (aRootUrl && (aRoot = aRootUrl[$efront_string_path] || $efront_string__7), aPathUrl && !aPathUrl[$efront_string_scheme])
            return aRootUrl && (aPathUrl[$efront_string_scheme] = aRootUrl[$efront_string_scheme]), urlGenerate(aPathUrl);
        if (aPathUrl || aPath[$efront_string_match](dataUrlRegexp))
            return aPath;
        if (aRootUrl && !aRootUrl[$efront_string_host] && !aRootUrl[$efront_string_path])
            return aRootUrl[$efront_string_host] = aPath, urlGenerate(aRootUrl);
        var joined = aPath[$efront_string_charAt](0) === $efront_string__7 ? aPath : normalize(aRoot[$efront_string_replac]($efront_regexp__$_, '') + $efront_string__7 + aPath);
        return aRootUrl ? (aRootUrl[$efront_string_path] = joined, urlGenerate(aRootUrl)) : joined
    }
    function relative(aRoot, aPath) {
        aRoot === '' && (aRoot = $efront_string__5), aRoot = aRoot[$efront_string_replac]($efront_regexp__$_1, '');
        var level = 0;
        while (aPath[$efront_string_indexO](aRoot + $efront_string__7) !== 0) {
            var index = aRoot[$efront_string_lastIn]($efront_string__7);
            if (index < 0)
                return aPath;
            if (aRoot = aRoot[$efront_string_slice](0, index), aRoot[$efront_string_match]($efront_regexp__$_2))
                return aPath;
            ++level
        }
        return Array(level + 1)[$efront_string_join]($efront_string__8) + aPath[$efront_string_substr](aRoot[$efront_string_length] + 1)
    }
    function identity(s) {
        return s
    }
    function toSetString(aStr) {
        return isProtoString(aStr) ? $efront_string_$ + aStr : aStr
    }
    function fromSetString(aStr) {
        return isProtoString(aStr) ? aStr[$efront_string_slice](1) : aStr
    }
    function isProtoString(s) {
        if (!s)
            return !1;
        var length = s[$efront_string_length];
        if (length < 9)
            return !1;
        if (s[$efront_string_charCo](length - 1) !== 95 || s[$efront_string_charCo](length - 2) !== 95 || s[$efront_string_charCo](length - 3) !== 111 || s[$efront_string_charCo](length - 4) !== 116 || s[$efront_string_charCo](length - 5) !== 111 || s[$efront_string_charCo](length - 6) !== 114 || s[$efront_string_charCo](length - 7) !== 112 || s[$efront_string_charCo](length - 8) !== 95 || s[$efront_string_charCo](length - 9) !== 95)
            return !1;
        for (var i = length - 10; i >= 0; i--)
            if (s[$efront_string_charCo](i) !== 36)
                return !1;
        return !0
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
        var cmp = strcmp(mappingA[$efront_string_source], mappingB[$efront_string_source]);
        return cmp !== 0 ? cmp : (cmp = mappingA[$efront_string_origin] - mappingB[$efront_string_origin], cmp !== 0 ? cmp : (cmp = mappingA[$efront_string_origin1] - mappingB[$efront_string_origin1], cmp !== 0 || onlyCompareOriginal ? cmp : (cmp = mappingA[$efront_string_genera] - mappingB[$efront_string_genera], cmp !== 0 ? cmp : (cmp = mappingA[$efront_string_genera1] - mappingB[$efront_string_genera1], cmp !== 0 ? cmp : strcmp(mappingA[$efront_string_name], mappingB[$efront_string_name])))))
    }
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA[$efront_string_genera1] - mappingB[$efront_string_genera1];
        return cmp !== 0 ? cmp : (cmp = mappingA[$efront_string_genera] - mappingB[$efront_string_genera], cmp !== 0 || onlyCompareGenerated ? cmp : (cmp = strcmp(mappingA[$efront_string_source], mappingB[$efront_string_source]), cmp !== 0 ? cmp : (cmp = mappingA[$efront_string_origin] - mappingB[$efront_string_origin], cmp !== 0 ? cmp : (cmp = mappingA[$efront_string_origin1] - mappingB[$efront_string_origin1], cmp !== 0 ? cmp : strcmp(mappingA[$efront_string_name], mappingB[$efront_string_name])))))
    }
    function strcmp(aStr1, aStr2) {
        return aStr1 === aStr2 ? 0 : aStr1 === null ? 1 : aStr2 === null ? -1 : aStr1 > aStr2 ? 1 : -1
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
        var cmp = mappingA[$efront_string_genera1] - mappingB[$efront_string_genera1];
        return cmp !== 0 ? cmp : (cmp = mappingA[$efront_string_genera] - mappingB[$efront_string_genera], cmp !== 0 ? cmp : (cmp = strcmp(mappingA[$efront_string_source], mappingB[$efront_string_source]), cmp !== 0 ? cmp : (cmp = mappingA[$efront_string_origin] - mappingB[$efront_string_origin], cmp !== 0 ? cmp : (cmp = mappingA[$efront_string_origin1] - mappingB[$efront_string_origin1], cmp !== 0 ? cmp : strcmp(mappingA[$efront_string_name], mappingB[$efront_string_name])))))
    }
    function parseSourceMapInput(str) {
        return JSON[$efront_string_parse](str[$efront_string_replac]($efront_regexp__n_n_, ''))
    }
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
        if (sourceURL = sourceURL || '', sourceRoot && (sourceRoot[sourceRoot[$efront_string_length] - 1] !== $efront_string__7 && sourceURL[0] !== $efront_string__7 && (sourceRoot += $efront_string__7), sourceURL = sourceRoot + sourceURL), sourceMapURL) {
            var parsed = urlParse(sourceMapURL);
            if (!parsed)
                throw new Error($efront_string_source1);
            if (parsed[$efront_string_path]) {
                var index = parsed[$efront_string_path][$efront_string_lastIn]($efront_string__7);
                index >= 0 && (parsed[$efront_string_path] = parsed[$efront_string_path][$efront_string_substr1](0, index + 1))
            }
            sourceURL = join(urlGenerate(parsed), sourceURL)
        }
        return normalize(sourceURL)
    }
    exports[$efront_string_getArg] = getArg;
    var urlRegexp = $efront_regexp__w_w_w, dataUrlRegexp = $efront_regexp__data_;
    exports[$efront_string_urlPar] = urlParse, exports[$efront_string_urlGen] = urlGenerate, exports[$efront_string_normal] = normalize, exports[$efront_string_join] = join, exports[$efront_string_isAbso] = function (aPath) {
        return aPath[$efront_string_charAt](0) === $efront_string__7 || urlRegexp[$efront_string_test](aPath)
    }, exports[$efront_string_relati] = relative;
    var supportsNullProto = function (obj) {
        return obj = Object[$efront_string_create](null), !($efront_string___prot in obj)
    }();
    return exports[$efront_string_toSetS] = supportsNullProto ? identity : toSetString, exports[$efront_string_fromSe] = supportsNullProto ? identity : fromSetString, exports[$efront_string_compar] = compareByOriginalPositions, exports[$efront_string_compar1] = compareByGeneratedPositionsDeflated, exports[$efront_string_compar2] = compareByGeneratedPositionsInflated, exports[$efront_string_parseS] = parseSourceMapInput, exports[$efront_string_comput] = computeSourceURL, exports
}],
/** 81 Math */ Math,
/** 82 $efront_string_round */ "round",
/** 83 $efront_string_random */ "random",
/** 84 $efront_string_quickS */ "quickSort",
/** 85 source-map$lib$quick-sort.js */ [81,15,82,83,84,3,function(Math, exports, $efront_string_round, $efront_string_random, $efront_string_quickS, $efront_string_length) {
    function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y], ary[y] = temp
    }
    function randomIntInRange(low, high) {
        return Math[$efront_string_round](low + Math[$efront_string_random]() * (high - low))
    }
    function doQuickSort(ary, comparator, p, r) {
        if (p < r) {
            var pivotIndex = randomIntInRange(p, r), i = p - 1;
            swap(ary, pivotIndex, r);
            var pivot = ary[r];
            for (var j = p; j < r; j++)
                comparator(ary[j], pivot) <= 0 && (i += 1, swap(ary, i, j));
            swap(ary, i + 1, j);
            var q = i + 1;
            doQuickSort(ary, comparator, p, q - 1), doQuickSort(ary, comparator, q + 1, r)
        }
    }
    return exports[$efront_string_quickS] = function (ary, comparator) {
        doQuickSort(ary, comparator, 0, ary[$efront_string_length] - 1)
    }, exports
}],
/** 86 $efront_string__array */ "_array",
/** 87 $efront_string__sorte */ "_sorted",
/** 88 $efront_string__last */ "_last",
/** 89 $efront_string_protot */ "prototype",
/** 90 $efront_string_unsort */ "unsortedForEach",
/** 91 $efront_string_forEac */ "forEach",
/** 92 $efront_string_add */ "add",
/** 93 $efront_string_push */ "push",
/** 94 $efront_string_toArra */ "toArray",
/** 95 $efront_string_sort */ "sort",
/** 96 $efront_string_Mappin */ "MappingList",
/** 97 source-map$lib$mapping-list.js */ [1,15,69,68,73,86,87,88,89,90,91,92,93,94,95,96,function(require, exports, $efront_string_genera1, $efront_string_genera, $efront_string_compar2, $efront_string__array, $efront_string__sorte, $efront_string__last, $efront_string_protot, $efront_string_unsort, $efront_string_forEac, $efront_string_add, $efront_string_push, $efront_string_toArra, $efront_string_sort, $efront_string_Mappin) {
    function generatedPositionAfter(mappingA, mappingB) {
        var lineA = mappingA[$efront_string_genera1], lineB = mappingB[$efront_string_genera1], columnA = mappingA[$efront_string_genera], columnB = mappingB[$efront_string_genera];
        return lineB > lineA || lineB == lineA && columnB >= columnA || util[$efront_string_compar2](mappingA, mappingB) <= 0
    }
    function MappingList() {
        var _a;
        this[$efront_string__array] = [], this[$efront_string__sorte] = !0, _a = {}, _a[$efront_string_genera1] = -1, _a[$efront_string_genera] = 0, this[$efront_string__last] = _a
    }
    var util = require(80);
    return MappingList[$efront_string_protot][$efront_string_unsort] = function MappingList_forEach(aCallback, aThisArg) {
        this[$efront_string__array][$efront_string_forEac](aCallback, aThisArg)
    }, MappingList[$efront_string_protot][$efront_string_add] = function MappingList_add(aMapping) {
        generatedPositionAfter(this[$efront_string__last], aMapping) ? (this[$efront_string__last] = aMapping, this[$efront_string__array][$efront_string_push](aMapping)) : (this[$efront_string__sorte] = !1, this[$efront_string__array][$efront_string_push](aMapping))
    }, MappingList[$efront_string_protot][$efront_string_toArra] = function MappingList_toArray() {
        return this[$efront_string__sorte] || (this[$efront_string__array][$efront_string_sort](util[$efront_string_compar2]), this[$efront_string__sorte] = !0), this[$efront_string__array]
    }, exports[$efront_string_Mappin] = MappingList, exports
}],
/** 98 $efront_string_GREATE */ "GREATEST_LOWER_BOUND",
/** 99 $efront_string_LEAST_ */ "LEAST_UPPER_BOUND",
/** 100 $efront_string_floor */ "floor",
/** 101 $efront_string_search */ "search",
/** 102 source-map$lib$binary-search.js */ [15,81,98,99,100,3,101,function(exports, Math, $efront_string_GREATE, $efront_string_LEAST_, $efront_string_floor, $efront_string_length, $efront_string_search) {
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
        var mid = Math[$efront_string_floor]((aHigh - aLow) / 2) + aLow, cmp = aCompare(aNeedle, aHaystack[mid], !0);
        return cmp === 0 ? mid : cmp > 0 ? aHigh - mid > 1 ? recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias) : aBias == exports[$efront_string_LEAST_] ? aHigh < aHaystack[$efront_string_length] ? aHigh : -1 : mid : mid - aLow > 1 ? recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias) : aBias == exports[$efront_string_LEAST_] ? mid : aLow < 0 ? -1 : aLow
    }
    return exports[$efront_string_GREATE] = 1, exports[$efront_string_LEAST_] = 2, exports[$efront_string_search] = function search(aNeedle, aHaystack, aCompare, aBias) {
        if (aHaystack[$efront_string_length] === 0)
            return -1;
        var index = recursiveSearch(-1, aHaystack[$efront_string_length], aNeedle, aHaystack, aCompare, aBias || exports[$efront_string_GREATE]);
        if (index < 0)
            return -1;
        while (index - 1 >= 0) {
            if (aCompare(aHaystack[index], aHaystack[index - 1], !0) !== 0)
                break;
            --index
        }
        return index
    }, exports
}],
/** 103 $efront_string_Expect */ /** text */ "Expected more digits in base 64 VLQ value.",
/** 104 $efront_string_Invali */ /** text */ "Invalid base64 digit: ",
/** 105 $efront_string_value */ "value",
/** 106 $efront_string_rest */ "rest",
/** 107 source-map$lib$base64-vlq.js */ [1,15,22,18,20,3,103,64,104,49,105,106,function(require, exports, Error, $efront_string_encode, $efront_string_decode, $efront_string_length, $efront_string_Expect, $efront_string_charCo, $efront_string_Invali, $efront_string_charAt, $efront_string_value, $efront_string_rest) {
    function toVLQSigned(aValue) {
        return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0
    }
    function fromVLQSigned(aValue) {
        var isNegative = (aValue & 1) === 1, shifted = aValue >> 1;
        return isNegative ? -shifted : shifted
    }
    var base64 = require(21), VLQ_BASE_SHIFT = 5, VLQ_BASE = 1 << VLQ_BASE_SHIFT, VLQ_BASE_MASK = VLQ_BASE - 1, VLQ_CONTINUATION_BIT = VLQ_BASE;
    return exports[$efront_string_encode] = function base64VLQ_encode(aValue) {
        var encoded = '', digit, vlq = toVLQSigned(aValue);
        do
            digit = vlq & VLQ_BASE_MASK, vlq >>>= VLQ_BASE_SHIFT, vlq > 0 && (digit |= VLQ_CONTINUATION_BIT), encoded += base64[$efront_string_encode](digit);
        while (vlq > 0);
        return encoded
    }, exports[$efront_string_decode] = function base64VLQ_decode(aStr, aIndex, aOutParam) {
        var strLen = aStr[$efront_string_length], result = 0, shift = 0, continuation, digit;
        do {
            if (aIndex >= strLen)
                throw new Error($efront_string_Expect);
            if (digit = base64[$efront_string_decode](aStr[$efront_string_charCo](aIndex++)), digit === -1)
                throw new Error($efront_string_Invali + aStr[$efront_string_charAt](aIndex - 1));
            continuation = !!(digit & VLQ_CONTINUATION_BIT), digit &= VLQ_BASE_MASK, result += digit << shift, shift += VLQ_BASE_SHIFT
        } while (continuation);
        aOutParam[$efront_string_value] = fromVLQSigned(result), aOutParam[$efront_string_rest] = aIndex
    }, exports
}],
/** 108 Map */ typeof Map!=="undefined"?Map:void 0,
/** 109 $efront_string_hasOwn */ "hasOwnProperty",
/** 110 $efront_string_undefi */ "undefined",
/** 111 $efront_string__set */ "_set",
/** 112 $efront_string_fromAr */ "fromArray",
/** 113 $efront_string_size */ "size",
/** 114 $efront_string_getOwn */ "getOwnPropertyNames",
/** 115 $efront_string_has */ "has",
/** 116 $efront_string_set */ "set",
/** 117 $efront_string_get */ "get",
/** 118 $efront_string__is_no */ /** text */ "\" is not in the set.",
/** 119 $efront_string_at */ "at",
/** 120 $efront_string_No_ele */ /** text */ "No element indexed by ",
/** 121 $efront_string_ArrayS */ "ArraySet",
/** 122 source-map$lib$array-set.js */ [1,24,108,22,15,89,109,110,86,111,59,112,3,92,113,114,62,115,12,93,116,9,117,26,118,119,120,94,2,121,function(require, Object, Map, Error, exports, $efront_string_protot, $efront_string_hasOwn, $efront_string_undefi, $efront_string__array, $efront_string__set, $efront_string_create, $efront_string_fromAr, $efront_string_length, $efront_string_add, $efront_string_size, $efront_string_getOwn, $efront_string_toSetS, $efront_string_has, $efront_string_call, $efront_string_push, $efront_string_set, $efront_string_indexO, $efront_string_get, $efront_string__, $efront_string__is_no, $efront_string_at, $efront_string_No_ele, $efront_string_toArra, $efront_string_slice, $efront_string_ArrayS) {
    function ArraySet() {
        this[$efront_string__array] = [], this[$efront_string__set] = hasNativeMap ? new Map : Object[$efront_string_create](null)
    }
    var util = require(80), has = Object[$efront_string_protot][$efront_string_hasOwn], hasNativeMap = typeof Map !== $efront_string_undefi;
    return ArraySet[$efront_string_fromAr] = function ArraySet_fromArray(aArray, aAllowDuplicates) {
        var set = new ArraySet;
        for (var i = 0, len = aArray[$efront_string_length]; i < len; i++)
            set[$efront_string_add](aArray[i], aAllowDuplicates);
        return set
    }, ArraySet[$efront_string_protot][$efront_string_size] = function ArraySet_size() {
        return hasNativeMap ? this[$efront_string__set][$efront_string_size] : Object[$efront_string_getOwn](this[$efront_string__set])[$efront_string_length]
    }, ArraySet[$efront_string_protot][$efront_string_add] = function ArraySet_add(aStr, aAllowDuplicates) {
        var sStr = hasNativeMap ? aStr : util[$efront_string_toSetS](aStr), isDuplicate = hasNativeMap ? this[$efront_string_has](aStr) : has[$efront_string_call](this[$efront_string__set], sStr), idx = this[$efront_string__array][$efront_string_length];
        (!isDuplicate || aAllowDuplicates) && this[$efront_string__array][$efront_string_push](aStr), isDuplicate || (hasNativeMap ? this[$efront_string__set][$efront_string_set](aStr, idx) : this[$efront_string__set][sStr] = idx)
    }, ArraySet[$efront_string_protot][$efront_string_has] = function ArraySet_has(aStr) {
        if (hasNativeMap)
            return this[$efront_string__set][$efront_string_has](aStr);
        else {
            var sStr = util[$efront_string_toSetS](aStr);
            return has[$efront_string_call](this[$efront_string__set], sStr)
        }
    }, ArraySet[$efront_string_protot][$efront_string_indexO] = function ArraySet_indexOf(aStr) {
        if (hasNativeMap) {
            var idx = this[$efront_string__set][$efront_string_get](aStr);
            if (idx >= 0)
                return idx
        } else {
            var sStr = util[$efront_string_toSetS](aStr);
            if (has[$efront_string_call](this[$efront_string__set], sStr))
                return this[$efront_string__set][sStr]
        }
        throw new Error($efront_string__ + aStr + $efront_string__is_no)
    }, ArraySet[$efront_string_protot][$efront_string_at] = function ArraySet_at(aIdx) {
        if (aIdx >= 0 && aIdx < this[$efront_string__array][$efront_string_length])
            return this[$efront_string__array][aIdx];
        throw new Error($efront_string_No_ele + aIdx)
    }, ArraySet[$efront_string_protot][$efront_string_toArra] = function ArraySet_toArray() {
        return this[$efront_string__array][$efront_string_slice]()
    }, exports[$efront_string_ArrayS] = ArraySet, exports
}],
/** 123 undefined */ undefined,
/** 124 String */ String,
/** 125 $efront_string__file */ "_file",
/** 126 $efront_string_file */ "file",
/** 127 $efront_string__sourc */ "_sourceRoot",
/** 128 $efront_string_source2 */ "sourceRoot",
/** 129 $efront_string__skipV */ "_skipValidation",
/** 130 $efront_string_skipVa */ "skipValidation",
/** 131 $efront_string__sourc1 */ "_sources",
/** 132 $efront_string__names */ "_names",
/** 133 $efront_string__mappi */ "_mappings",
/** 134 $efront_string__sourc2 */ "_sourcesContents",
/** 135 $efront_string__versi */ "_version",
/** 136 $efront_string_fromSo */ "fromSourceMap",
/** 137 $efront_string_eachMa */ "eachMapping",
/** 138 $efront_string_genera2 */ "generated",
/** 139 $efront_string_line */ "line",
/** 140 $efront_string_column */ "column",
/** 141 $efront_string_origin2 */ "original",
/** 142 $efront_string_addMap */ "addMapping",
/** 143 $efront_string_source3 */ "sources",
/** 144 $efront_string_source4 */ "sourceContentFor",
/** 145 $efront_string_setSou */ "setSourceContent",
/** 146 $efront_string__valid */ "_validateMapping",
/** 147 $efront_string_keys */ "keys",
/** 148 $efront_string_applyS */ "applySourceMap",
/** 149 $efront_string_Source */ /** text */ "SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ",
/** 150 $efront_string_or_the */ /** text */ "or the source map's \"file\" property. Both were omitted.",
/** 151 $efront_string_origin3 */ "originalPositionFor",
/** 152 $efront_string_number */ "number",
/** 153 $efront_string_origin4 */ /** text */ "original.line and original.column are not numbers -- you probably meant to omit ",
/** 154 $efront_string_the_or */ /** text */ "the original mapping entirely and only map the generated position. If so, pass ",
/** 155 $efront_string_null_f */ /** text */ "null for the original mapping instead of an object with empty or null values.",
/** 156 $efront_string_Invali1 */ /** text */ "Invalid mapping: ",
/** 157 $efront_string_string1 */ "stringify",
/** 158 $efront_string__seria */ "_serializeMappings",
/** 159 $efront_string__9 */ ";",
/** 160 $efront_string__10 */ ",",
/** 161 $efront_string__gener */ "_generateSourcesContent",
/** 162 $efront_string_map */ "map",
/** 163 $efront_string_toJSON */ "toJSON",
/** 164 $efront_string_versio */ "version",
/** 165 $efront_string_names */ "names",
/** 166 $efront_string_mappin */ "mappings",
/** 167 $efront_string_source5 */ "sourcesContent",
/** 168 $efront_string_toStri */ "toString",
/** 169 $efront_string_Source1 */ "SourceMapGenerator",
/** 170 source-map$lib$source-map-generator.js */ [1,124,24,22,25,15,121,96,125,28,126,127,128,129,130,131,132,133,134,89,135,136,137,138,139,69,140,68,65,58,141,66,67,70,142,143,91,115,92,144,145,146,59,62,147,3,148,149,150,90,151,11,152,153,154,155,156,157,158,94,159,73,160,18,9,161,162,109,12,163,164,165,166,167,168,169,function(require, String, Object, Error, JSON, exports, $efront_string_ArrayS, $efront_string_Mappin, $efront_string__file, $efront_string_getArg, $efront_string_file, $efront_string__sourc, $efront_string_source2, $efront_string__skipV, $efront_string_skipVa, $efront_string__sourc1, $efront_string__names, $efront_string__mappi, $efront_string__sourc2, $efront_string_protot, $efront_string__versi, $efront_string_fromSo, $efront_string_eachMa, $efront_string_genera2, $efront_string_line, $efront_string_genera1, $efront_string_column, $efront_string_genera, $efront_string_source, $efront_string_relati, $efront_string_origin2, $efront_string_origin, $efront_string_origin1, $efront_string_name, $efront_string_addMap, $efront_string_source3, $efront_string_forEac, $efront_string_has, $efront_string_add, $efront_string_source4, $efront_string_setSou, $efront_string__valid, $efront_string_create, $efront_string_toSetS, $efront_string_keys, $efront_string_length, $efront_string_applyS, $efront_string_Source, $efront_string_or_the, $efront_string_unsort, $efront_string_origin3, $efront_string_join, $efront_string_number, $efront_string_origin4, $efront_string_the_or, $efront_string_null_f, $efront_string_Invali1, $efront_string_string1, $efront_string__seria, $efront_string_toArra, $efront_string__9, $efront_string_compar2, $efront_string__10, $efront_string_encode, $efront_string_indexO, $efront_string__gener, $efront_string_map, $efront_string_hasOwn, $efront_string_call, $efront_string_toJSON, $efront_string_versio, $efront_string_names, $efront_string_mappin, $efront_string_source5, $efront_string_toStri, $efront_string_Source1) {
    function SourceMapGenerator(aArgs) {
        aArgs || (aArgs = {}), this[$efront_string__file] = util[$efront_string_getArg](aArgs, $efront_string_file, null), this[$efront_string__sourc] = util[$efront_string_getArg](aArgs, $efront_string_source2, null), this[$efront_string__skipV] = util[$efront_string_getArg](aArgs, $efront_string_skipVa, !1), this[$efront_string__sourc1] = new ArraySet, this[$efront_string__names] = new ArraySet, this[$efront_string__mappi] = new MappingList, this[$efront_string__sourc2] = null
    }
    var base64VLQ = require(107), util = require(80), ArraySet = require(122)[$efront_string_ArrayS], MappingList = require(97)[$efront_string_Mappin];
    return SourceMapGenerator[$efront_string_protot][$efront_string__versi] = 3, SourceMapGenerator[$efront_string_fromSo] = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
        var _a, sourceRoot = aSourceMapConsumer[$efront_string_source2], generator = new SourceMapGenerator((_a = {}, _a[$efront_string_file] = aSourceMapConsumer[$efront_string_file], _a[$efront_string_source2] = sourceRoot, _a));
        return aSourceMapConsumer[$efront_string_eachMa](function (mapping) {
            var _a, _b, _c, newMapping = (_a = {}, _b = {}, _b[$efront_string_line] = mapping[$efront_string_genera1], _b[$efront_string_column] = mapping[$efront_string_genera], _a[$efront_string_genera2] = _b, _a);
            mapping[$efront_string_source] != null && (newMapping[$efront_string_source] = mapping[$efront_string_source], sourceRoot != null && (newMapping[$efront_string_source] = util[$efront_string_relati](sourceRoot, newMapping[$efront_string_source])), _c = {}, _c[$efront_string_line] = mapping[$efront_string_origin], _c[$efront_string_column] = mapping[$efront_string_origin1], newMapping[$efront_string_origin2] = _c, mapping[$efront_string_name] != null && (newMapping[$efront_string_name] = mapping[$efront_string_name])), generator[$efront_string_addMap](newMapping)
        }), aSourceMapConsumer[$efront_string_source3][$efront_string_forEac](function (sourceFile) {
            var sourceRelative = sourceFile;
            sourceRoot !== null && (sourceRelative = util[$efront_string_relati](sourceRoot, sourceFile)), generator[$efront_string__sourc1][$efront_string_has](sourceRelative) || generator[$efront_string__sourc1][$efront_string_add](sourceRelative);
            var content = aSourceMapConsumer[$efront_string_source4](sourceFile);
            content != null && generator[$efront_string_setSou](sourceFile, content)
        }), generator
    }, SourceMapGenerator[$efront_string_protot][$efront_string_addMap] = function SourceMapGenerator_addMapping(aArgs) {
        var _a, generated = util[$efront_string_getArg](aArgs, $efront_string_genera2), original = util[$efront_string_getArg](aArgs, $efront_string_origin2, null), source = util[$efront_string_getArg](aArgs, $efront_string_source, null), name = util[$efront_string_getArg](aArgs, $efront_string_name, null);
        this[$efront_string__skipV] || this[$efront_string__valid](generated, original, source, name), source != null && (source = String(source), this[$efront_string__sourc1][$efront_string_has](source) || this[$efront_string__sourc1][$efront_string_add](source)), name != null && (name = String(name), this[$efront_string__names][$efront_string_has](name) || this[$efront_string__names][$efront_string_add](name)), this[$efront_string__mappi][$efront_string_add]((_a = {}, _a[$efront_string_genera1] = generated[$efront_string_line], _a[$efront_string_genera] = generated[$efront_string_column], _a[$efront_string_origin] = original != null && original[$efront_string_line], _a[$efront_string_origin1] = original != null && original[$efront_string_column], _a[$efront_string_source] = source, _a[$efront_string_name] = name, _a))
    }, SourceMapGenerator[$efront_string_protot][$efront_string_setSou] = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
        var source = aSourceFile;
        this[$efront_string__sourc] != null && (source = util[$efront_string_relati](this[$efront_string__sourc], source)), aSourceContent != null ? (this[$efront_string__sourc2] || (this[$efront_string__sourc2] = Object[$efront_string_create](null)), this[$efront_string__sourc2][util[$efront_string_toSetS](source)] = aSourceContent) : this[$efront_string__sourc2] && (delete this[$efront_string__sourc2][util[$efront_string_toSetS](source)], Object[$efront_string_keys](this[$efront_string__sourc2])[$efront_string_length] === 0 && (this[$efront_string__sourc2] = null))
    }, SourceMapGenerator[$efront_string_protot][$efront_string_applyS] = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
        var sourceFile = aSourceFile;
        if (aSourceFile == null) {
            if (aSourceMapConsumer[$efront_string_file] == null)
                throw new Error($efront_string_Source + $efront_string_or_the);
            sourceFile = aSourceMapConsumer[$efront_string_file]
        }
        var sourceRoot = this[$efront_string__sourc];
        sourceRoot != null && (sourceFile = util[$efront_string_relati](sourceRoot, sourceFile));
        var newSources = new ArraySet, newNames = new ArraySet;
        this[$efront_string__mappi][$efront_string_unsort](function (mapping) {
            var _a;
            if (mapping[$efront_string_source] === sourceFile && mapping[$efront_string_origin] != null) {
                var original = aSourceMapConsumer[$efront_string_origin3]((_a = {}, _a[$efront_string_line] = mapping[$efront_string_origin], _a[$efront_string_column] = mapping[$efront_string_origin1], _a));
                original[$efront_string_source] != null && (mapping[$efront_string_source] = original[$efront_string_source], aSourceMapPath != null && (mapping[$efront_string_source] = util[$efront_string_join](aSourceMapPath, mapping[$efront_string_source])), sourceRoot != null && (mapping[$efront_string_source] = util[$efront_string_relati](sourceRoot, mapping[$efront_string_source])), mapping[$efront_string_origin] = original[$efront_string_line], mapping[$efront_string_origin1] = original[$efront_string_column], original[$efront_string_name] != null && (mapping[$efront_string_name] = original[$efront_string_name]))
            }
            var source = mapping[$efront_string_source];
            source != null && !newSources[$efront_string_has](source) && newSources[$efront_string_add](source);
            var name = mapping[$efront_string_name];
            name != null && !newNames[$efront_string_has](name) && newNames[$efront_string_add](name)
        }, this), this[$efront_string__sourc1] = newSources, this[$efront_string__names] = newNames, aSourceMapConsumer[$efront_string_source3][$efront_string_forEac](function (sourceFile) {
            var content = aSourceMapConsumer[$efront_string_source4](sourceFile);
            content != null && (aSourceMapPath != null && (sourceFile = util[$efront_string_join](aSourceMapPath, sourceFile)), sourceRoot != null && (sourceFile = util[$efront_string_relati](sourceRoot, sourceFile)), this[$efront_string_setSou](sourceFile, content))
        }, this)
    }, SourceMapGenerator[$efront_string_protot][$efront_string__valid] = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
        var _a;
        if (aOriginal && typeof aOriginal[$efront_string_line] !== $efront_string_number && typeof aOriginal[$efront_string_column] !== $efront_string_number)
            throw new Error($efront_string_origin4 + $efront_string_the_or + $efront_string_null_f);
        if (aGenerated && $efront_string_line in aGenerated && $efront_string_column in aGenerated && aGenerated[$efront_string_line] > 0 && aGenerated[$efront_string_column] >= 0 && !aOriginal && !aSource && !aName)
            return;
        else if (aGenerated && $efront_string_line in aGenerated && $efront_string_column in aGenerated && aOriginal && $efront_string_line in aOriginal && $efront_string_column in aOriginal && aGenerated[$efront_string_line] > 0 && aGenerated[$efront_string_column] >= 0 && aOriginal[$efront_string_line] > 0 && aOriginal[$efront_string_column] >= 0 && aSource)
            return;
        else
            throw new Error($efront_string_Invali1 + JSON[$efront_string_string1]((_a = {}, _a[$efront_string_genera2] = aGenerated, _a[$efront_string_source] = aSource, _a[$efront_string_origin2] = aOriginal, _a[$efront_string_name] = aName, _a)))
    }, SourceMapGenerator[$efront_string_protot][$efront_string__seria] = function SourceMapGenerator_serializeMappings() {
        var previousGeneratedColumn = 0, previousGeneratedLine = 1, previousOriginalColumn = 0, previousOriginalLine = 0, previousName = 0, previousSource = 0, result = '', next, mapping, nameIdx, sourceIdx, mappings = this[$efront_string__mappi][$efront_string_toArra]();
        for (var i = 0, len = mappings[$efront_string_length]; i < len; i++) {
            if (mapping = mappings[i], next = '', mapping[$efront_string_genera1] !== previousGeneratedLine) {
                previousGeneratedColumn = 0;
                while (mapping[$efront_string_genera1] !== previousGeneratedLine)
                    next += $efront_string__9, previousGeneratedLine++
            } else if (i > 0) {
                if (!util[$efront_string_compar2](mapping, mappings[i - 1]))
                    continue;
                next += $efront_string__10
            }
            next += base64VLQ[$efront_string_encode](mapping[$efront_string_genera] - previousGeneratedColumn), previousGeneratedColumn = mapping[$efront_string_genera], mapping[$efront_string_source] != null && (sourceIdx = this[$efront_string__sourc1][$efront_string_indexO](mapping[$efront_string_source]), next += base64VLQ[$efront_string_encode](sourceIdx - previousSource), previousSource = sourceIdx, next += base64VLQ[$efront_string_encode](mapping[$efront_string_origin] - 1 - previousOriginalLine), previousOriginalLine = mapping[$efront_string_origin] - 1, next += base64VLQ[$efront_string_encode](mapping[$efront_string_origin1] - previousOriginalColumn), previousOriginalColumn = mapping[$efront_string_origin1], mapping[$efront_string_name] != null && (nameIdx = this[$efront_string__names][$efront_string_indexO](mapping[$efront_string_name]), next += base64VLQ[$efront_string_encode](nameIdx - previousName), previousName = nameIdx)), result += next
        }
        return result
    }, SourceMapGenerator[$efront_string_protot][$efront_string__gener] = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
        return aSources[$efront_string_map](function (source) {
            if (!this[$efront_string__sourc2])
                return null;
            aSourceRoot != null && (source = util[$efront_string_relati](aSourceRoot, source));
            var key = util[$efront_string_toSetS](source);
            return Object[$efront_string_protot][$efront_string_hasOwn][$efront_string_call](this[$efront_string__sourc2], key) ? this[$efront_string__sourc2][key] : null
        }, this)
    }, SourceMapGenerator[$efront_string_protot][$efront_string_toJSON] = function SourceMapGenerator_toJSON() {
        var _a, map = (_a = {}, _a[$efront_string_versio] = this[$efront_string__versi], _a[$efront_string_source3] = this[$efront_string__sourc1][$efront_string_toArra](), _a[$efront_string_names] = this[$efront_string__names][$efront_string_toArra](), _a[$efront_string_mappin] = this[$efront_string__seria](), _a);
        return this[$efront_string__file] != null && (map[$efront_string_file] = this[$efront_string__file]), this[$efront_string__sourc] != null && (map[$efront_string_source2] = this[$efront_string__sourc]), this[$efront_string__sourc2] && (map[$efront_string_source5] = this[$efront_string__gener](map[$efront_string_source3], map[$efront_string_source2])), map
    }, SourceMapGenerator[$efront_string_protot][$efront_string_toStri] = function SourceMapGenerator_toString() {
        return JSON[$efront_string_string1](this[$efront_string_toJSON]())
    }, exports[$efront_string_Source1] = SourceMapGenerator, exports
}],
/** 171 $efront_string_sectio */ "sections",
/** 172 $efront_string___gene */ "__generatedMappings",
/** 173 $efront_string_define */ "defineProperty",
/** 174 $efront_string__gener1 */ "_generatedMappings",
/** 175 $efront_string_config */ "configurable",
/** 176 $efront_string_enumer */ "enumerable",
/** 177 $efront_string__parse */ "_parseMappings",
/** 178 $efront_string___orig */ "__originalMappings",
/** 179 $efront_string__origi */ "_originalMappings",
/** 180 $efront_string__charI */ "_charIsMappingSeparator",
/** 181 $efront_string_Subcla */ /** text */ "Subclasses must implement _parseMappings",
/** 182 $efront_string_GENERA */ "GENERATED_ORDER",
/** 183 $efront_string_ORIGIN */ "ORIGINAL_ORDER",
/** 184 $efront_string_Unknow */ /** text */ "Unknown order of iteration.",
/** 185 $efront_string__sourc3 */ "_sourceMapURL",
/** 186 $efront_string_allGen */ "allGeneratedPositionsFor",
/** 187 $efront_string__findS */ "_findSourceIndex",
/** 188 $efront_string__findM */ "_findMapping",
/** 189 $efront_string_lastCo */ "lastColumn",
/** 190 $efront_string_lastGe */ "lastGeneratedColumn",
/** 191 $efront_string_Source2 */ "SourceMapConsumer",
/** 192 $efront_string_Unsupp */ /** text */ "Unsupported version: ",
/** 193 $efront_string__absol */ "_absoluteSources",
/** 194 $efront_string_consum */ "consumer",
/** 195 $efront_string_Found_ */ /** text */ "Found a source, but no line and column",
/** 196 $efront_string_Found_1 */ /** text */ "Found a source and line, but no column",
/** 197 $efront_string_Line_m */ /** text */ "Line must be greater than or equal to 1, got ",
/** 198 $efront_string_Column */ /** text */ "Column must be greater than or equal to 0, got ",
/** 199 $efront_string_comput1 */ "computeColumnSpans",
/** 200 $efront_string_bias */ "bias",
/** 201 $efront_string_hasCon */ "hasContentsOfAllSources",
/** 202 $efront_string_some */ "some",
/** 203 $efront_regexp__file_ */ /^file:\/\//,
/** 204 $efront_string__is_no1 */ /** text */ "\" is not in the SourceMap.",
/** 205 $efront_string_genera3 */ "generatedPositionFor",
/** 206 $efront_string_BasicS */ "BasicSourceMapConsumer",
/** 207 $efront_string__secti */ "_sections",
/** 208 $efront_string_url */ "url",
/** 209 $efront_string_Suppor */ /** text */ "Support for url field in sections not implemented.",
/** 210 $efront_string_offset */ "offset",
/** 211 $efront_string_Sectio */ /** text */ "Section offsets must be ordered and non-overlapping.",
/** 212 $efront_string_genera4 */ "generatedOffset",
/** 213 $efront_string_constr */ "constructor",
/** 214 $efront_string_every */ "every",
/** 215 $efront_string_Indexe */ "IndexedSourceMapConsumer",
/** 216 source-map$lib$source-map-consumer.js */ [1,24,22,123,15,124,16,121,84,10,76,171,136,89,135,172,173,174,175,176,117,177,133,128,178,179,180,49,159,160,181,182,183,98,99,137,184,162,65,131,119,79,185,69,68,66,67,70,132,91,186,28,139,140,187,188,71,93,189,190,191,164,143,165,167,166,126,192,48,42,58,112,193,94,59,194,115,9,3,127,161,125,2,20,105,106,195,196,152,72,197,198,101,199,151,200,201,113,202,144,37,50,203,32,36,47,26,204,205,206,207,208,209,210,211,212,213,214,92,215,function(require, Object, Error, undefined, exports, String, TypeError, $efront_string_ArrayS, $efront_string_quickS, $efront_string_string, $efront_string_parseS, $efront_string_sectio, $efront_string_fromSo, $efront_string_protot, $efront_string__versi, $efront_string___gene, $efront_string_define, $efront_string__gener1, $efront_string_config, $efront_string_enumer, $efront_string_get, $efront_string__parse, $efront_string__mappi, $efront_string_source2, $efront_string___orig, $efront_string__origi, $efront_string__charI, $efront_string_charAt, $efront_string__9, $efront_string__10, $efront_string_Subcla, $efront_string_GENERA, $efront_string_ORIGIN, $efront_string_GREATE, $efront_string_LEAST_, $efront_string_eachMa, $efront_string_Unknow, $efront_string_map, $efront_string_source, $efront_string__sourc1, $efront_string_at, $efront_string_comput, $efront_string__sourc3, $efront_string_genera1, $efront_string_genera, $efront_string_origin, $efront_string_origin1, $efront_string_name, $efront_string__names, $efront_string_forEac, $efront_string_allGen, $efront_string_getArg, $efront_string_line, $efront_string_column, $efront_string__findS, $efront_string__findM, $efront_string_compar, $efront_string_push, $efront_string_lastCo, $efront_string_lastGe, $efront_string_Source2, $efront_string_versio, $efront_string_source3, $efront_string_names, $efront_string_source5, $efront_string_mappin, $efront_string_file, $efront_string_Unsupp, $efront_string_normal, $efront_string_isAbso, $efront_string_relati, $efront_string_fromAr, $efront_string__absol, $efront_string_toArra, $efront_string_create, $efront_string_consum, $efront_string_has, $efront_string_indexO, $efront_string_length, $efront_string__sourc, $efront_string__gener, $efront_string__file, $efront_string_slice, $efront_string_decode, $efront_string_value, $efront_string_rest, $efront_string_Found_, $efront_string_Found_1, $efront_string_number, $efront_string_compar1, $efront_string_Line_m, $efront_string_Column, $efront_string_search, $efront_string_comput1, $efront_string_origin3, $efront_string_bias, $efront_string_hasCon, $efront_string_size, $efront_string_some, $efront_string_source4, $efront_string_urlPar, $efront_string_replac, $efront_regexp__file_, $efront_string_scheme, $efront_string_path, $efront_string__7, $efront_string__, $efront_string__is_no1, $efront_string_genera3, $efront_string_BasicS, $efront_string__secti, $efront_string_url, $efront_string_Suppor, $efront_string_offset, $efront_string_Sectio, $efront_string_genera4, $efront_string_constr, $efront_string_every, $efront_string_add, $efront_string_Indexe) {
    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        return typeof aSourceMap === $efront_string_string && (sourceMap = util[$efront_string_parseS](aSourceMap)), sourceMap[$efront_string_sectio] != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL)
    }
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        typeof aSourceMap === $efront_string_string && (sourceMap = util[$efront_string_parseS](aSourceMap));
        var version = util[$efront_string_getArg](sourceMap, $efront_string_versio), sources = util[$efront_string_getArg](sourceMap, $efront_string_source3), names = util[$efront_string_getArg](sourceMap, $efront_string_names, []), sourceRoot = util[$efront_string_getArg](sourceMap, $efront_string_source2, null), sourcesContent = util[$efront_string_getArg](sourceMap, $efront_string_source5, null), mappings = util[$efront_string_getArg](sourceMap, $efront_string_mappin), file = util[$efront_string_getArg](sourceMap, $efront_string_file, null);
        if (version != this[$efront_string__versi])
            throw new Error($efront_string_Unsupp + version);
        sourceRoot && (sourceRoot = util[$efront_string_normal](sourceRoot)), sources = sources[$efront_string_map](String)[$efront_string_map](util[$efront_string_normal])[$efront_string_map](function (source) {
            return sourceRoot && util[$efront_string_isAbso](sourceRoot) && util[$efront_string_isAbso](source) ? util[$efront_string_relati](sourceRoot, source) : source
        }), this[$efront_string__names] = ArraySet[$efront_string_fromAr](names[$efront_string_map](String), !0), this[$efront_string__sourc1] = ArraySet[$efront_string_fromAr](sources, !0), this[$efront_string__absol] = this[$efront_string__sourc1][$efront_string_toArra]()[$efront_string_map](function (s) {
            return util[$efront_string_comput](sourceRoot, s, aSourceMapURL)
        }), this[$efront_string_source2] = sourceRoot, this[$efront_string_source5] = sourcesContent, this[$efront_string__mappi] = mappings, this[$efront_string__sourc3] = aSourceMapURL, this[$efront_string_file] = file
    }
    function Mapping() {
        this[$efront_string_genera1] = 0, this[$efront_string_genera] = 0, this[$efront_string_source] = null, this[$efront_string_origin] = null, this[$efront_string_origin1] = null, this[$efront_string_name] = null
    }
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
        var _a, sourceMap = aSourceMap;
        typeof aSourceMap === $efront_string_string && (sourceMap = util[$efront_string_parseS](aSourceMap));
        var version = util[$efront_string_getArg](sourceMap, $efront_string_versio), sections = util[$efront_string_getArg](sourceMap, $efront_string_sectio);
        if (version != this[$efront_string__versi])
            throw new Error($efront_string_Unsupp + version);
        this[$efront_string__sourc1] = new ArraySet, this[$efront_string__names] = new ArraySet;
        var lastOffset = (_a = {}, _a[$efront_string_line] = -1, _a[$efront_string_column] = 0, _a);
        this[$efront_string__secti] = sections[$efront_string_map](function (s) {
            var _a, _b;
            if (s[$efront_string_url])
                throw new Error($efront_string_Suppor);
            var offset = util[$efront_string_getArg](s, $efront_string_offset), offsetLine = util[$efront_string_getArg](offset, $efront_string_line), offsetColumn = util[$efront_string_getArg](offset, $efront_string_column);
            if (offsetLine < lastOffset[$efront_string_line] || offsetLine === lastOffset[$efront_string_line] && offsetColumn < lastOffset[$efront_string_column])
                throw new Error($efront_string_Sectio);
            return lastOffset = offset, _a = {}, _b = {}, _b[$efront_string_genera1] = offsetLine + 1, _b[$efront_string_genera] = offsetColumn + 1, _a[$efront_string_genera4] = _b, _a[$efront_string_consum] = new SourceMapConsumer(util[$efront_string_getArg](s, $efront_string_map), aSourceMapURL), _a
        })
    }
    var _a, _b, _c, _d, util = require(80), binarySearch = require(102), ArraySet = require(122)[$efront_string_ArrayS], base64VLQ = require(107), quickSort = require(85)[$efront_string_quickS];
    return SourceMapConsumer[$efront_string_fromSo] = function (aSourceMap, aSourceMapURL) {
        return BasicSourceMapConsumer[$efront_string_fromSo](aSourceMap, aSourceMapURL)
    }, SourceMapConsumer[$efront_string_protot][$efront_string__versi] = 3, SourceMapConsumer[$efront_string_protot][$efront_string___gene] = null, Object[$efront_string_define](SourceMapConsumer[$efront_string_protot], $efront_string__gener1, (_a = {}, _a[$efront_string_config] = !0, _a[$efront_string_enumer] = !0, _a[$efront_string_get] = function () {
        return this[$efront_string___gene] || this[$efront_string__parse](this[$efront_string__mappi], this[$efront_string_source2]), this[$efront_string___gene]
    }, _a)), SourceMapConsumer[$efront_string_protot][$efront_string___orig] = null, Object[$efront_string_define](SourceMapConsumer[$efront_string_protot], $efront_string__origi, (_b = {}, _b[$efront_string_config] = !0, _b[$efront_string_enumer] = !0, _b[$efront_string_get] = function () {
        return this[$efront_string___orig] || this[$efront_string__parse](this[$efront_string__mappi], this[$efront_string_source2]), this[$efront_string___orig]
    }, _b)), SourceMapConsumer[$efront_string_protot][$efront_string__charI] = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
        var c = aStr[$efront_string_charAt](index);
        return c === $efront_string__9 || c === $efront_string__10
    }, SourceMapConsumer[$efront_string_protot][$efront_string__parse] = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        throw new Error($efront_string_Subcla)
    }, SourceMapConsumer[$efront_string_GENERA] = 1, SourceMapConsumer[$efront_string_ORIGIN] = 2, SourceMapConsumer[$efront_string_GREATE] = 1, SourceMapConsumer[$efront_string_LEAST_] = 2, SourceMapConsumer[$efront_string_protot][$efront_string_eachMa] = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
        var context = aContext || null, order = aOrder || SourceMapConsumer[$efront_string_GENERA], mappings;
        switch (order) {
        case SourceMapConsumer[$efront_string_GENERA]:
            mappings = this[$efront_string__gener1];
            break;
        case SourceMapConsumer[$efront_string_ORIGIN]:
            mappings = this[$efront_string__origi];
            break;
        default:
            throw new Error($efront_string_Unknow)
        }
        var sourceRoot = this[$efront_string_source2];
        mappings[$efront_string_map](function (mapping) {
            var _a, source = mapping[$efront_string_source] === null ? null : this[$efront_string__sourc1][$efront_string_at](mapping[$efront_string_source]);
            return source = util[$efront_string_comput](sourceRoot, source, this[$efront_string__sourc3]), _a = {}, _a[$efront_string_source] = source, _a[$efront_string_genera1] = mapping[$efront_string_genera1], _a[$efront_string_genera] = mapping[$efront_string_genera], _a[$efront_string_origin] = mapping[$efront_string_origin], _a[$efront_string_origin1] = mapping[$efront_string_origin1], _a[$efront_string_name] = mapping[$efront_string_name] === null ? null : this[$efront_string__names][$efront_string_at](mapping[$efront_string_name]), _a
        }, this)[$efront_string_forEac](aCallback, context)
    }, SourceMapConsumer[$efront_string_protot][$efront_string_allGen] = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
        var _a, _b, _c, line = util[$efront_string_getArg](aArgs, $efront_string_line), needle = (_a = {}, _a[$efront_string_source] = util[$efront_string_getArg](aArgs, $efront_string_source), _a[$efront_string_origin] = line, _a[$efront_string_origin1] = util[$efront_string_getArg](aArgs, $efront_string_column, 0), _a);
        if (needle[$efront_string_source] = this[$efront_string__findS](needle[$efront_string_source]), needle[$efront_string_source] < 0)
            return [];
        var mappings = [], index = this[$efront_string__findM](needle, this[$efront_string__origi], $efront_string_origin, $efront_string_origin1, util[$efront_string_compar], binarySearch[$efront_string_LEAST_]);
        if (index >= 0) {
            var mapping = this[$efront_string__origi][index];
            if (aArgs[$efront_string_column] === undefined) {
                var originalLine = mapping[$efront_string_origin];
                while (mapping && mapping[$efront_string_origin] === originalLine)
                    mappings[$efront_string_push]((_b = {}, _b[$efront_string_line] = util[$efront_string_getArg](mapping, $efront_string_genera1, null), _b[$efront_string_column] = util[$efront_string_getArg](mapping, $efront_string_genera, null), _b[$efront_string_lastCo] = util[$efront_string_getArg](mapping, $efront_string_lastGe, null), _b)), mapping = this[$efront_string__origi][++index]
            } else {
                var originalColumn = mapping[$efront_string_origin1];
                while (mapping && mapping[$efront_string_origin] === line && mapping[$efront_string_origin1] == originalColumn)
                    mappings[$efront_string_push]((_c = {}, _c[$efront_string_line] = util[$efront_string_getArg](mapping, $efront_string_genera1, null), _c[$efront_string_column] = util[$efront_string_getArg](mapping, $efront_string_genera, null), _c[$efront_string_lastCo] = util[$efront_string_getArg](mapping, $efront_string_lastGe, null), _c)), mapping = this[$efront_string__origi][++index]
            }
        }
        return mappings
    }, exports[$efront_string_Source2] = SourceMapConsumer, BasicSourceMapConsumer[$efront_string_protot] = Object[$efront_string_create](SourceMapConsumer[$efront_string_protot]), BasicSourceMapConsumer[$efront_string_protot][$efront_string_consum] = SourceMapConsumer, BasicSourceMapConsumer[$efront_string_protot][$efront_string__findS] = function (aSource) {
        var relativeSource = aSource;
        if (this[$efront_string_source2] != null && (relativeSource = util[$efront_string_relati](this[$efront_string_source2], relativeSource)), this[$efront_string__sourc1][$efront_string_has](relativeSource))
            return this[$efront_string__sourc1][$efront_string_indexO](relativeSource);
        var i;
        for (i = 0; i < this[$efront_string__absol][$efront_string_length]; ++i)
            if (this[$efront_string__absol][i] == aSource)
                return i;
        return -1
    }, BasicSourceMapConsumer[$efront_string_fromSo] = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
        var smc = Object[$efront_string_create](BasicSourceMapConsumer[$efront_string_protot]), names = smc[$efront_string__names] = ArraySet[$efront_string_fromAr](aSourceMap[$efront_string__names][$efront_string_toArra](), !0), sources = smc[$efront_string__sourc1] = ArraySet[$efront_string_fromAr](aSourceMap[$efront_string__sourc1][$efront_string_toArra](), !0);
        smc[$efront_string_source2] = aSourceMap[$efront_string__sourc], smc[$efront_string_source5] = aSourceMap[$efront_string__gener](smc[$efront_string__sourc1][$efront_string_toArra](), smc[$efront_string_source2]), smc[$efront_string_file] = aSourceMap[$efront_string__file], smc[$efront_string__sourc3] = aSourceMapURL, smc[$efront_string__absol] = smc[$efront_string__sourc1][$efront_string_toArra]()[$efront_string_map](function (s) {
            return util[$efront_string_comput](smc[$efront_string_source2], s, aSourceMapURL)
        });
        var generatedMappings = aSourceMap[$efront_string__mappi][$efront_string_toArra]()[$efront_string_slice](), destGeneratedMappings = smc[$efront_string___gene] = [], destOriginalMappings = smc[$efront_string___orig] = [];
        for (var i = 0, length = generatedMappings[$efront_string_length]; i < length; i++) {
            var srcMapping = generatedMappings[i], destMapping = new Mapping;
            destMapping[$efront_string_genera1] = srcMapping[$efront_string_genera1], destMapping[$efront_string_genera] = srcMapping[$efront_string_genera], srcMapping[$efront_string_source] && (destMapping[$efront_string_source] = sources[$efront_string_indexO](srcMapping[$efront_string_source]), destMapping[$efront_string_origin] = srcMapping[$efront_string_origin], destMapping[$efront_string_origin1] = srcMapping[$efront_string_origin1], srcMapping[$efront_string_name] && (destMapping[$efront_string_name] = names[$efront_string_indexO](srcMapping[$efront_string_name])), destOriginalMappings[$efront_string_push](destMapping)), destGeneratedMappings[$efront_string_push](destMapping)
        }
        return quickSort(smc[$efront_string___orig], util[$efront_string_compar]), smc
    }, BasicSourceMapConsumer[$efront_string_protot][$efront_string__versi] = 3, Object[$efront_string_define](BasicSourceMapConsumer[$efront_string_protot], $efront_string_source3, (_c = {}, _c[$efront_string_get] = function () {
        return this[$efront_string__absol][$efront_string_slice]()
    }, _c)), BasicSourceMapConsumer[$efront_string_protot][$efront_string__parse] = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        var generatedLine = 1, previousGeneratedColumn = 0, previousOriginalLine = 0, previousOriginalColumn = 0, previousSource = 0, previousName = 0, length = aStr[$efront_string_length], index = 0, cachedSegments = {}, temp = {}, originalMappings = [], generatedMappings = [], mapping, str, segment, end, value;
        while (index < length)
            if (aStr[$efront_string_charAt](index) === $efront_string__9)
                generatedLine++, index++, previousGeneratedColumn = 0;
            else if (aStr[$efront_string_charAt](index) === $efront_string__10)
                index++;
            else {
                for (mapping = new Mapping, mapping[$efront_string_genera1] = generatedLine, end = index; end < length; end++)
                    if (this[$efront_string__charI](aStr, end))
                        break;
                if (str = aStr[$efront_string_slice](index, end), segment = cachedSegments[str], segment)
                    index += str[$efront_string_length];
                else {
                    segment = [];
                    while (index < end)
                        base64VLQ[$efront_string_decode](aStr, index, temp), value = temp[$efront_string_value], index = temp[$efront_string_rest], segment[$efront_string_push](value);
                    if (segment[$efront_string_length] === 2)
                        throw new Error($efront_string_Found_);
                    if (segment[$efront_string_length] === 3)
                        throw new Error($efront_string_Found_1);
                    cachedSegments[str] = segment
                }
                mapping[$efront_string_genera] = previousGeneratedColumn + segment[0], previousGeneratedColumn = mapping[$efront_string_genera], segment[$efront_string_length] > 1 && (mapping[$efront_string_source] = previousSource + segment[1], previousSource += segment[1], mapping[$efront_string_origin] = previousOriginalLine + segment[2], previousOriginalLine = mapping[$efront_string_origin], mapping[$efront_string_origin] += 1, mapping[$efront_string_origin1] = previousOriginalColumn + segment[3], previousOriginalColumn = mapping[$efront_string_origin1], segment[$efront_string_length] > 4 && (mapping[$efront_string_name] = previousName + segment[4], previousName += segment[4])), generatedMappings[$efront_string_push](mapping), typeof mapping[$efront_string_origin] === $efront_string_number && originalMappings[$efront_string_push](mapping)
            }
        quickSort(generatedMappings, util[$efront_string_compar1]), this[$efront_string___gene] = generatedMappings, quickSort(originalMappings, util[$efront_string_compar]), this[$efront_string___orig] = originalMappings
    }, BasicSourceMapConsumer[$efront_string_protot][$efront_string__findM] = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
        if (aNeedle[aLineName] <= 0)
            throw new TypeError($efront_string_Line_m + aNeedle[aLineName]);
        if (aNeedle[aColumnName] < 0)
            throw new TypeError($efront_string_Column + aNeedle[aColumnName]);
        return binarySearch[$efront_string_search](aNeedle, aMappings, aComparator, aBias)
    }, BasicSourceMapConsumer[$efront_string_protot][$efront_string_comput1] = function SourceMapConsumer_computeColumnSpans() {
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
    }, BasicSourceMapConsumer[$efront_string_protot][$efront_string_origin3] = function SourceMapConsumer_originalPositionFor(aArgs) {
        var _a, _b, _c, needle = (_a = {}, _a[$efront_string_genera1] = util[$efront_string_getArg](aArgs, $efront_string_line), _a[$efront_string_genera] = util[$efront_string_getArg](aArgs, $efront_string_column), _a), index = this[$efront_string__findM](needle, this[$efront_string__gener1], $efront_string_genera1, $efront_string_genera, util[$efront_string_compar1], util[$efront_string_getArg](aArgs, $efront_string_bias, SourceMapConsumer[$efront_string_GREATE]));
        if (index >= 0) {
            var mapping = this[$efront_string__gener1][index];
            if (mapping[$efront_string_genera1] === needle[$efront_string_genera1]) {
                var source = util[$efront_string_getArg](mapping, $efront_string_source, null);
                source !== null && (source = this[$efront_string__sourc1][$efront_string_at](source), source = util[$efront_string_comput](this[$efront_string_source2], source, this[$efront_string__sourc3]));
                var name = util[$efront_string_getArg](mapping, $efront_string_name, null);
                return name !== null && (name = this[$efront_string__names][$efront_string_at](name)), _b = {}, _b[$efront_string_source] = source, _b[$efront_string_line] = util[$efront_string_getArg](mapping, $efront_string_origin, null), _b[$efront_string_column] = util[$efront_string_getArg](mapping, $efront_string_origin1, null), _b[$efront_string_name] = name, _b
            }
        }
        return _c = {}, _c[$efront_string_source] = null, _c[$efront_string_line] = null, _c[$efront_string_column] = null, _c[$efront_string_name] = null, _c
    }, BasicSourceMapConsumer[$efront_string_protot][$efront_string_hasCon] = function BasicSourceMapConsumer_hasContentsOfAllSources() {
        return this[$efront_string_source5] ? this[$efront_string_source5][$efront_string_length] >= this[$efront_string__sourc1][$efront_string_size]() && !this[$efront_string_source5][$efront_string_some](function (sc) {
            return sc == null
        }) : !1
    }, BasicSourceMapConsumer[$efront_string_protot][$efront_string_source4] = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        if (!this[$efront_string_source5])
            return null;
        var index = this[$efront_string__findS](aSource);
        if (index >= 0)
            return this[$efront_string_source5][index];
        var relativeSource = aSource;
        this[$efront_string_source2] != null && (relativeSource = util[$efront_string_relati](this[$efront_string_source2], relativeSource));
        var url;
        if (this[$efront_string_source2] != null && (url = util[$efront_string_urlPar](this[$efront_string_source2]))) {
            var fileUriAbsPath = relativeSource[$efront_string_replac]($efront_regexp__file_, '');
            if (url[$efront_string_scheme] == $efront_string_file && this[$efront_string__sourc1][$efront_string_has](fileUriAbsPath))
                return this[$efront_string_source5][this[$efront_string__sourc1][$efront_string_indexO](fileUriAbsPath)];
            if ((!url[$efront_string_path] || url[$efront_string_path] == $efront_string__7) && this[$efront_string__sourc1][$efront_string_has]($efront_string__7 + relativeSource))
                return this[$efront_string_source5][this[$efront_string__sourc1][$efront_string_indexO]($efront_string__7 + relativeSource)]
        }
        if (nullOnMissing)
            return null;
        else
            throw new Error($efront_string__ + relativeSource + $efront_string__is_no1)
    }, BasicSourceMapConsumer[$efront_string_protot][$efront_string_genera3] = function SourceMapConsumer_generatedPositionFor(aArgs) {
        var _a, _b, _c, _d, source = util[$efront_string_getArg](aArgs, $efront_string_source);
        if (source = this[$efront_string__findS](source), source < 0)
            return _a = {}, _a[$efront_string_line] = null, _a[$efront_string_column] = null, _a[$efront_string_lastCo] = null, _a;
        var needle = (_b = {}, _b[$efront_string_source] = source, _b[$efront_string_origin] = util[$efront_string_getArg](aArgs, $efront_string_line), _b[$efront_string_origin1] = util[$efront_string_getArg](aArgs, $efront_string_column), _b), index = this[$efront_string__findM](needle, this[$efront_string__origi], $efront_string_origin, $efront_string_origin1, util[$efront_string_compar], util[$efront_string_getArg](aArgs, $efront_string_bias, SourceMapConsumer[$efront_string_GREATE]));
        if (index >= 0) {
            var mapping = this[$efront_string__origi][index];
            if (mapping[$efront_string_source] === needle[$efront_string_source])
                return _c = {}, _c[$efront_string_line] = util[$efront_string_getArg](mapping, $efront_string_genera1, null), _c[$efront_string_column] = util[$efront_string_getArg](mapping, $efront_string_genera, null), _c[$efront_string_lastCo] = util[$efront_string_getArg](mapping, $efront_string_lastGe, null), _c
        }
        return _d = {}, _d[$efront_string_line] = null, _d[$efront_string_column] = null, _d[$efront_string_lastCo] = null, _d
    }, exports[$efront_string_BasicS] = BasicSourceMapConsumer, IndexedSourceMapConsumer[$efront_string_protot] = Object[$efront_string_create](SourceMapConsumer[$efront_string_protot]), IndexedSourceMapConsumer[$efront_string_protot][$efront_string_constr] = SourceMapConsumer, IndexedSourceMapConsumer[$efront_string_protot][$efront_string__versi] = 3, Object[$efront_string_define](IndexedSourceMapConsumer[$efront_string_protot], $efront_string_source3, (_d = {}, _d[$efront_string_get] = function () {
        var sources = [];
        for (var i = 0; i < this[$efront_string__secti][$efront_string_length]; i++)
            for (var j = 0; j < this[$efront_string__secti][i][$efront_string_consum][$efront_string_source3][$efront_string_length]; j++)
                sources[$efront_string_push](this[$efront_string__secti][i][$efront_string_consum][$efront_string_source3][j]);
        return sources
    }, _d)), IndexedSourceMapConsumer[$efront_string_protot][$efront_string_origin3] = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
        var _a, _b, _c, needle = (_a = {}, _a[$efront_string_genera1] = util[$efront_string_getArg](aArgs, $efront_string_line), _a[$efront_string_genera] = util[$efront_string_getArg](aArgs, $efront_string_column), _a), sectionIndex = binarySearch[$efront_string_search](needle, this[$efront_string__secti], function (needle, section) {
                var cmp = needle[$efront_string_genera1] - section[$efront_string_genera4][$efront_string_genera1];
                return cmp ? cmp : needle[$efront_string_genera] - section[$efront_string_genera4][$efront_string_genera]
            }), section = this[$efront_string__secti][sectionIndex];
        return section ? section[$efront_string_consum][$efront_string_origin3]((_c = {}, _c[$efront_string_line] = needle[$efront_string_genera1] - (section[$efront_string_genera4][$efront_string_genera1] - 1), _c[$efront_string_column] = needle[$efront_string_genera] - (section[$efront_string_genera4][$efront_string_genera1] === needle[$efront_string_genera1] ? section[$efront_string_genera4][$efront_string_genera] - 1 : 0), _c[$efront_string_bias] = aArgs[$efront_string_bias], _c)) : (_b = {}, _b[$efront_string_source] = null, _b[$efront_string_line] = null, _b[$efront_string_column] = null, _b[$efront_string_name] = null, _b)
    }, IndexedSourceMapConsumer[$efront_string_protot][$efront_string_hasCon] = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
        return this[$efront_string__secti][$efront_string_every](function (s) {
            return s[$efront_string_consum][$efront_string_hasCon]()
        })
    }, IndexedSourceMapConsumer[$efront_string_protot][$efront_string_source4] = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        for (var i = 0; i < this[$efront_string__secti][$efront_string_length]; i++) {
            var section = this[$efront_string__secti][i], content = section[$efront_string_consum][$efront_string_source4](aSource, !0);
            if (content)
                return content
        }
        if (nullOnMissing)
            return null;
        else
            throw new Error($efront_string__ + aSource + $efront_string__is_no1)
    }, IndexedSourceMapConsumer[$efront_string_protot][$efront_string_genera3] = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
        var _a, _b;
        for (var i = 0; i < this[$efront_string__secti][$efront_string_length]; i++) {
            var section = this[$efront_string__secti][i];
            if (section[$efront_string_consum][$efront_string__findS](util[$efront_string_getArg](aArgs, $efront_string_source)) === -1)
                continue;
            var generatedPosition = section[$efront_string_consum][$efront_string_genera3](aArgs);
            if (generatedPosition) {
                var ret = (_a = {}, _a[$efront_string_line] = generatedPosition[$efront_string_line] + (section[$efront_string_genera4][$efront_string_genera1] - 1), _a[$efront_string_column] = generatedPosition[$efront_string_column] + (section[$efront_string_genera4][$efront_string_genera1] === generatedPosition[$efront_string_line] ? section[$efront_string_genera4][$efront_string_genera] - 1 : 0), _a);
                return ret
            }
        }
        return _b = {}, _b[$efront_string_line] = null, _b[$efront_string_column] = null, _b
    }, IndexedSourceMapConsumer[$efront_string_protot][$efront_string__parse] = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        var _a;
        this[$efront_string___gene] = [], this[$efront_string___orig] = [];
        for (var i = 0; i < this[$efront_string__secti][$efront_string_length]; i++) {
            var section = this[$efront_string__secti][i], sectionMappings = section[$efront_string_consum][$efront_string__gener1];
            for (var j = 0; j < sectionMappings[$efront_string_length]; j++) {
                var mapping = sectionMappings[j], source = section[$efront_string_consum][$efront_string__sourc1][$efront_string_at](mapping[$efront_string_source]);
                source = util[$efront_string_comput](section[$efront_string_consum][$efront_string_source2], source, this[$efront_string__sourc3]), this[$efront_string__sourc1][$efront_string_add](source), source = this[$efront_string__sourc1][$efront_string_indexO](source);
                var name = null;
                mapping[$efront_string_name] && (name = section[$efront_string_consum][$efront_string__names][$efront_string_at](mapping[$efront_string_name]), this[$efront_string__names][$efront_string_add](name), name = this[$efront_string__names][$efront_string_indexO](name));
                var adjustedMapping = (_a = {}, _a[$efront_string_source] = source, _a[$efront_string_genera1] = mapping[$efront_string_genera1] + (section[$efront_string_genera4][$efront_string_genera1] - 1), _a[$efront_string_genera] = mapping[$efront_string_genera] + (section[$efront_string_genera4][$efront_string_genera1] === mapping[$efront_string_genera1] ? section[$efront_string_genera4][$efront_string_genera] - 1 : 0), _a[$efront_string_origin] = mapping[$efront_string_origin], _a[$efront_string_origin1] = mapping[$efront_string_origin1], _a[$efront_string_name] = name, _a);
                this[$efront_string___gene][$efront_string_push](adjustedMapping), typeof adjustedMapping[$efront_string_origin] === $efront_string_number && this[$efront_string___orig][$efront_string_push](adjustedMapping)
            }
        }
        quickSort(this[$efront_string___gene], util[$efront_string_compar1]), quickSort(this[$efront_string___orig], util[$efront_string_compar])
    }, exports[$efront_string_Indexe] = IndexedSourceMapConsumer, exports
}],
/** 217 module */ [1614122431],
/** 218 $efront_string_NonAsc */ "NonAsciiIdentifierStart",
/** 219 $efront_regexp__xAA_x */ /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
/** 220 $efront_string_NonAsc1 */ "NonAsciiIdentifierPart",
/** 221 $efront_regexp__xAA_x1 */ /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
/** 222 $efront_regexp__xAA_x2 */ /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
/** 223 $efront_regexp__xAA_x3 */ /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/,
/** 224 $efront_string_fromCh */ "fromCharCode",
/** 225 $efront_string_isDeci */ "isDecimalDigit",
/** 226 $efront_string_isHexD */ "isHexDigit",
/** 227 $efront_string_isOcta */ "isOctalDigit",
/** 228 $efront_string_isWhit */ "isWhiteSpace",
/** 229 $efront_string_isLine */ "isLineTerminator",
/** 230 $efront_string_isIden */ "isIdentifierStartES5",
/** 231 $efront_string_isIden1 */ "isIdentifierPartES5",
/** 232 $efront_string_isIden2 */ "isIdentifierStartES6",
/** 233 $efront_string_isIden3 */ "isIdentifierPartES6",
/** 234 esutils$lib$code.js */ [124,81,23,217,218,219,220,221,222,223,9,224,100,52,13,225,226,227,228,229,230,231,232,233,function(String, Math, Array, module, $efront_string_NonAsc, $efront_regexp__xAA_x, $efront_string_NonAsc1, $efront_regexp__xAA_x1, $efront_regexp__xAA_x2, $efront_regexp__xAA_x3, $efront_string_indexO, $efront_string_fromCh, $efront_string_floor, $efront_string_test, $efront_string_export, $efront_string_isDeci, $efront_string_isHexD, $efront_string_isOcta, $efront_string_isWhit, $efront_string_isLine, $efront_string_isIden, $efront_string_isIden1, $efront_string_isIden2, $efront_string_isIden3) {
    return function (_a, _b, _c, ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch) {
        'use strict';
        function isDecimalDigit(ch) {
            return 48 <= ch && ch <= 57
        }
        function isHexDigit(ch) {
            return 48 <= ch && ch <= 57 || 97 <= ch && ch <= 102 || 65 <= ch && ch <= 70
        }
        function isOctalDigit(ch) {
            return ch >= 48 && ch <= 55
        }
        function isWhiteSpace(ch) {
            return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch >= 5760 && NON_ASCII_WHITESPACES[$efront_string_indexO](ch) >= 0
        }
        function isLineTerminator(ch) {
            return ch === 10 || ch === 13 || ch === 8232 || ch === 8233
        }
        function fromCodePoint(cp) {
            if (cp <= 65535)
                return String[$efront_string_fromCh](cp);
            var cu1 = String[$efront_string_fromCh](Math[$efront_string_floor]((cp - 65536) / 1024) + 55296), cu2 = String[$efront_string_fromCh]((cp - 65536) % 1024 + 56320);
            return cu1 + cu2
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
        for (_a = {}, _a[$efront_string_NonAsc] = $efront_regexp__xAA_x, _a[$efront_string_NonAsc1] = $efront_regexp__xAA_x1, ES5Regex = _a, _b = {}, _b[$efront_string_NonAsc] = $efront_regexp__xAA_x2, _b[$efront_string_NonAsc1] = $efront_regexp__xAA_x3, ES6Regex = _b, NON_ASCII_WHITESPACES = [
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
            ], IDENTIFIER_START = new Array(128), ch = 0; ch < 128; ++ch)
            IDENTIFIER_START[ch] = ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch === 36 || ch === 95;
        for (IDENTIFIER_PART = new Array(128), ch = 0; ch < 128; ++ch)
            IDENTIFIER_PART[ch] = ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch >= 48 && ch <= 57 || ch === 36 || ch === 95;
        _c = {}, _c[$efront_string_isDeci] = isDecimalDigit, _c[$efront_string_isHexD] = isHexDigit, _c[$efront_string_isOcta] = isOctalDigit, _c[$efront_string_isWhit] = isWhiteSpace, _c[$efront_string_isLine] = isLineTerminator, _c[$efront_string_isIden] = isIdentifierStartES5, _c[$efront_string_isIden1] = isIdentifierPartES5, _c[$efront_string_isIden2] = isIdentifierStartES6, _c[$efront_string_isIden3] = isIdentifierPartES6, module[$efront_string_export] = _c
    }()
}],
/** 235 $efront_string_type */ "type",
/** 236 $efront_string_ArrayE */ "ArrayExpression",
/** 237 $efront_string_Assign */ "AssignmentExpression",
/** 238 $efront_string_Binary */ "BinaryExpression",
/** 239 $efront_string_CallEx */ "CallExpression",
/** 240 $efront_string_Condit */ "ConditionalExpression",
/** 241 $efront_string_Functi */ "FunctionExpression",
/** 242 $efront_string_Identi */ "Identifier",
/** 243 $efront_string_Litera */ "Literal",
/** 244 $efront_string_Logica */ "LogicalExpression",
/** 245 $efront_string_Member */ "MemberExpression",
/** 246 $efront_string_NewExp */ "NewExpression",
/** 247 $efront_string_Object */ "ObjectExpression",
/** 248 $efront_string_Sequen */ "SequenceExpression",
/** 249 $efront_string_ThisEx */ "ThisExpression",
/** 250 $efront_string_UnaryE */ "UnaryExpression",
/** 251 $efront_string_Update */ "UpdateExpression",
/** 252 $efront_string_DoWhil */ "DoWhileStatement",
/** 253 $efront_string_ForInS */ "ForInStatement",
/** 254 $efront_string_ForSta */ "ForStatement",
/** 255 $efront_string_WhileS */ "WhileStatement",
/** 256 $efront_string_BlockS */ "BlockStatement",
/** 257 $efront_string_BreakS */ "BreakStatement",
/** 258 $efront_string_Contin */ "ContinueStatement",
/** 259 $efront_string_Debugg */ "DebuggerStatement",
/** 260 $efront_string_EmptyS */ "EmptyStatement",
/** 261 $efront_string_Expres */ "ExpressionStatement",
/** 262 $efront_string_IfStat */ "IfStatement",
/** 263 $efront_string_Labele */ "LabeledStatement",
/** 264 $efront_string_Return */ "ReturnStatement",
/** 265 $efront_string_Switch */ "SwitchStatement",
/** 266 $efront_string_ThrowS */ "ThrowStatement",
/** 267 $efront_string_TrySta */ "TryStatement",
/** 268 $efront_string_Variab */ "VariableDeclaration",
/** 269 $efront_string_WithSt */ "WithStatement",
/** 270 $efront_string_Functi1 */ "FunctionDeclaration",
/** 271 $efront_string_altern */ "alternate",
/** 272 $efront_string_conseq */ "consequent",
/** 273 $efront_string_body */ "body",
/** 274 $efront_string_isExpr */ "isExpression",
/** 275 $efront_string_isStat */ "isStatement",
/** 276 $efront_string_isIter */ "isIterationStatement",
/** 277 $efront_string_isSour */ "isSourceElement",
/** 278 $efront_string_isProb */ "isProblematicIfStatement",
/** 279 $efront_string_traili */ "trailingStatement",
/** 280 esutils$lib$ast.js */ [217,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,13,274,275,276,277,278,279,function(module, $efront_string_type, $efront_string_ArrayE, $efront_string_Assign, $efront_string_Binary, $efront_string_CallEx, $efront_string_Condit, $efront_string_Functi, $efront_string_Identi, $efront_string_Litera, $efront_string_Logica, $efront_string_Member, $efront_string_NewExp, $efront_string_Object, $efront_string_Sequen, $efront_string_ThisEx, $efront_string_UnaryE, $efront_string_Update, $efront_string_DoWhil, $efront_string_ForInS, $efront_string_ForSta, $efront_string_WhileS, $efront_string_BlockS, $efront_string_BreakS, $efront_string_Contin, $efront_string_Debugg, $efront_string_EmptyS, $efront_string_Expres, $efront_string_IfStat, $efront_string_Labele, $efront_string_Return, $efront_string_Switch, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_Variab, $efront_string_WithSt, $efront_string_Functi1, $efront_string_altern, $efront_string_conseq, $efront_string_body, $efront_string_export, $efront_string_isExpr, $efront_string_isStat, $efront_string_isIter, $efront_string_isSour, $efront_string_isProb, $efront_string_traili) {
    return function (_a) {
        'use strict';
        function isExpression(node) {
            if (node == null)
                return !1;
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
                return !0
            }
            return !1
        }
        function isIterationStatement(node) {
            if (node == null)
                return !1;
            switch (node[$efront_string_type]) {
            case $efront_string_DoWhil:
            case $efront_string_ForInS:
            case $efront_string_ForSta:
            case $efront_string_WhileS:
                return !0
            }
            return !1
        }
        function isStatement(node) {
            if (node == null)
                return !1;
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
                return !0
            }
            return !1
        }
        function isSourceElement(node) {
            return isStatement(node) || node != null && node[$efront_string_type] === $efront_string_Functi1
        }
        function trailingStatement(node) {
            switch (node[$efront_string_type]) {
            case $efront_string_IfStat:
                return node[$efront_string_altern] != null ? node[$efront_string_altern] : node[$efront_string_conseq];
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
            if (node[$efront_string_type] !== $efront_string_IfStat)
                return !1;
            if (node[$efront_string_altern] == null)
                return !1;
            current = node[$efront_string_conseq];
            do {
                if (current[$efront_string_type] === $efront_string_IfStat && current[$efront_string_altern] == null)
                    return !0;
                current = trailingStatement(current)
            } while (current);
            return !1
        }
        _a = {}, _a[$efront_string_isExpr] = isExpression, _a[$efront_string_isStat] = isStatement, _a[$efront_string_isIter] = isIterationStatement, _a[$efront_string_isSour] = isSourceElement, _a[$efront_string_isProb] = isProblematicIfStatement, _a[$efront_string_traili] = trailingStatement, module[$efront_string_export] = _a
    }()
}],
/** 281 $efront_string_object */ "object",
/** 282 $efront_string_Assign1 */ "AssignmentPattern",
/** 283 $efront_string_ArrayP */ "ArrayPattern",
/** 284 $efront_string_ArrowF */ "ArrowFunctionExpression",
/** 285 $efront_string_AwaitE */ "AwaitExpression",
/** 286 $efront_string_CatchC */ "CatchClause",
/** 287 $efront_string_ChainE */ "ChainExpression",
/** 288 $efront_string_ClassB */ "ClassBody",
/** 289 $efront_string_ClassD */ "ClassDeclaration",
/** 290 $efront_string_ClassE */ "ClassExpression",
/** 291 $efront_string_Compre */ "ComprehensionBlock",
/** 292 $efront_string_Compre1 */ "ComprehensionExpression",
/** 293 $efront_string_Direct */ "DirectiveStatement",
/** 294 $efront_string_Export */ "ExportAllDeclaration",
/** 295 $efront_string_Export1 */ "ExportDefaultDeclaration",
/** 296 $efront_string_Export2 */ "ExportNamedDeclaration",
/** 297 $efront_string_Export3 */ "ExportSpecifier",
/** 298 $efront_string_ForOfS */ "ForOfStatement",
/** 299 $efront_string_Genera */ "GeneratorExpression",
/** 300 $efront_string_Import */ "ImportExpression",
/** 301 $efront_string_Import1 */ "ImportDeclaration",
/** 302 $efront_string_Import2 */ "ImportDefaultSpecifier",
/** 303 $efront_string_Import3 */ "ImportNamespaceSpecifier",
/** 304 $efront_string_Import4 */ "ImportSpecifier",
/** 305 $efront_string_MetaPr */ "MetaProperty",
/** 306 $efront_string_Method */ "MethodDefinition",
/** 307 $efront_string_Module */ "ModuleSpecifier",
/** 308 $efront_string_Object1 */ "ObjectPattern",
/** 309 $efront_string_Progra */ "Program",
/** 310 $efront_string_Proper */ "Property",
/** 311 $efront_string_RestEl */ "RestElement",
/** 312 $efront_string_Spread */ "SpreadElement",
/** 313 $efront_string_Super */ "Super",
/** 314 $efront_string_Switch1 */ "SwitchCase",
/** 315 $efront_string_Tagged */ "TaggedTemplateExpression",
/** 316 $efront_string_Templa */ "TemplateElement",
/** 317 $efront_string_Templa1 */ "TemplateLiteral",
/** 318 $efront_string_Variab1 */ "VariableDeclarator",
/** 319 $efront_string_YieldE */ "YieldExpression",
/** 320 $efront_string_left */ "left",
/** 321 $efront_string_right */ "right",
/** 322 $efront_string_elemen */ "elements",
/** 323 $efront_string_params */ "params",
/** 324 $efront_string_argume */ "argument",
/** 325 $efront_string_label */ "label",
/** 326 $efront_string_callee */ "callee",
/** 327 $efront_string_argume1 */ "arguments",
/** 328 $efront_string_param */ "param",
/** 329 $efront_string_expres */ "expression",
/** 330 $efront_string_id */ "id",
/** 331 $efront_string_superC */ "superClass",
/** 332 $efront_string_blocks */ "blocks",
/** 333 $efront_string_filter */ "filter",
/** 334 $efront_string_declar */ "declaration",
/** 335 $efront_string_specif */ "specifiers",
/** 336 $efront_string_export1 */ "exported",
/** 337 $efront_string_local */ "local",
/** 338 $efront_string_init */ "init",
/** 339 $efront_string_update */ "update",
/** 340 $efront_string_import */ "imported",
/** 341 $efront_string_proper */ "property",
/** 342 $efront_string_meta */ "meta",
/** 343 $efront_string_key */ "key",
/** 344 $efront_string_proper1 */ "properties",
/** 345 $efront_string_expres1 */ "expressions",
/** 346 $efront_string_discri */ "discriminant",
/** 347 $efront_string_cases */ "cases",
/** 348 $efront_string_tag */ "tag",
/** 349 $efront_string_quasi */ "quasi",
/** 350 $efront_string_quasis */ "quasis",
/** 351 $efront_string_block */ "block",
/** 352 $efront_string_handle */ "handler",
/** 353 $efront_string_finali */ "finalizer",
/** 354 $efront_string_declar1 */ "declarations",
/** 355 $efront_string_Break */ "Break",
/** 356 $efront_string_Skip */ "Skip",
/** 357 $efront_string_Remove */ "Remove",
/** 358 $efront_string_parent */ "parent",
/** 359 $efront_string_remove */ "remove",
/** 360 $efront_string_isArra */ "isArray",
/** 361 $efront_string_node */ "node",
/** 362 $efront_string_wrap */ "wrap",
/** 363 $efront_string_ref */ "ref",
/** 364 $efront_string___curr */ "__current",
/** 365 $efront_string___leav */ "__leavelist",
/** 366 $efront_string_curren */ "current",
/** 367 $efront_string_parent1 */ "parents",
/** 368 $efront_string___exec */ "__execute",
/** 369 $efront_string___stat */ "__state",
/** 370 $efront_string_notify */ "notify",
/** 371 $efront_string_skip */ "skip",
/** 372 $efront_string_break */ "break",
/** 373 $efront_string___init */ "__initialize",
/** 374 $efront_string_visito */ "visitor",
/** 375 $efront_string_root */ "root",
/** 376 $efront_string___work */ "__worklist",
/** 377 $efront_string___fall */ "__fallback",
/** 378 $efront_string_fallba */ "fallback",
/** 379 $efront_string_iterat */ "iteration",
/** 380 $efront_string_functi */ "function",
/** 381 $efront_string___keys */ "__keys",
/** 382 $efront_string_assign */ "assign",
/** 383 $efront_string_traver */ "traverse",
/** 384 $efront_string_pop */ "pop",
/** 385 $efront_string_leave */ "leave",
/** 386 $efront_string_enter */ "enter",
/** 387 $efront_string_Unknow1 */ /** text */ "Unknown node type ",
/** 388 $efront_string_range */ "range",
/** 389 $efront_string_extend */ "extendedRange",
/** 390 $efront_string_attach */ /** text */ "attachComments needs range information",
/** 391 $efront_string_leadin */ "leadingComments",
/** 392 $efront_string_traili1 */ "trailingComments",
/** 393 $efront_string_Syntax */ "Syntax",
/** 394 $efront_string_attach1 */ "attachComments",
/** 395 $efront_string_Visito */ "VisitorKeys",
/** 396 $efront_string_Visito1 */ "VisitorOption",
/** 397 $efront_string_Contro */ "Controller",
/** 398 $efront_string_cloneE */ "cloneEnvironment",
/** 399 estraverse$estraverse.js */ [23,123,24,22,15,109,281,3,237,282,236,283,284,285,256,238,257,239,286,287,288,289,290,291,292,240,258,259,293,252,260,294,295,296,297,261,254,253,298,270,241,299,242,262,300,301,302,303,304,243,263,244,245,305,306,307,246,247,308,309,310,311,264,248,312,313,265,314,315,316,317,249,266,267,250,251,268,318,255,269,319,320,321,322,323,273,324,325,326,327,328,329,330,331,332,333,52,272,271,65,334,335,336,337,338,339,340,341,342,343,105,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,89,50,359,360,45,361,36,362,363,93,364,365,235,366,367,368,369,12,370,371,372,373,374,375,376,377,378,379,147,380,381,382,59,10,383,384,385,386,387,44,388,389,390,391,392,393,394,395,396,397,398,function(Array, undefined, Object, Error, exports, $efront_string_hasOwn, $efront_string_object, $efront_string_length, $efront_string_Assign, $efront_string_Assign1, $efront_string_ArrayE, $efront_string_ArrayP, $efront_string_ArrowF, $efront_string_AwaitE, $efront_string_BlockS, $efront_string_Binary, $efront_string_BreakS, $efront_string_CallEx, $efront_string_CatchC, $efront_string_ChainE, $efront_string_ClassB, $efront_string_ClassD, $efront_string_ClassE, $efront_string_Compre, $efront_string_Compre1, $efront_string_Condit, $efront_string_Contin, $efront_string_Debugg, $efront_string_Direct, $efront_string_DoWhil, $efront_string_EmptyS, $efront_string_Export, $efront_string_Export1, $efront_string_Export2, $efront_string_Export3, $efront_string_Expres, $efront_string_ForSta, $efront_string_ForInS, $efront_string_ForOfS, $efront_string_Functi1, $efront_string_Functi, $efront_string_Genera, $efront_string_Identi, $efront_string_IfStat, $efront_string_Import, $efront_string_Import1, $efront_string_Import2, $efront_string_Import3, $efront_string_Import4, $efront_string_Litera, $efront_string_Labele, $efront_string_Logica, $efront_string_Member, $efront_string_MetaPr, $efront_string_Method, $efront_string_Module, $efront_string_NewExp, $efront_string_Object, $efront_string_Object1, $efront_string_Progra, $efront_string_Proper, $efront_string_RestEl, $efront_string_Return, $efront_string_Sequen, $efront_string_Spread, $efront_string_Super, $efront_string_Switch, $efront_string_Switch1, $efront_string_Tagged, $efront_string_Templa, $efront_string_Templa1, $efront_string_ThisEx, $efront_string_ThrowS, $efront_string_TrySta, $efront_string_UnaryE, $efront_string_Update, $efront_string_Variab, $efront_string_Variab1, $efront_string_WhileS, $efront_string_WithSt, $efront_string_YieldE, $efront_string_left, $efront_string_right, $efront_string_elemen, $efront_string_params, $efront_string_body, $efront_string_argume, $efront_string_label, $efront_string_callee, $efront_string_argume1, $efront_string_param, $efront_string_expres, $efront_string_id, $efront_string_superC, $efront_string_blocks, $efront_string_filter, $efront_string_test, $efront_string_conseq, $efront_string_altern, $efront_string_source, $efront_string_declar, $efront_string_specif, $efront_string_export1, $efront_string_local, $efront_string_init, $efront_string_update, $efront_string_import, $efront_string_proper, $efront_string_meta, $efront_string_key, $efront_string_value, $efront_string_proper1, $efront_string_expres1, $efront_string_discri, $efront_string_cases, $efront_string_tag, $efront_string_quasi, $efront_string_quasis, $efront_string_block, $efront_string_handle, $efront_string_finali, $efront_string_declar1, $efront_string_Break, $efront_string_Skip, $efront_string_Remove, $efront_string_parent, $efront_string_protot, $efront_string_replac, $efront_string_remove, $efront_string_isArra, $efront_string_splice, $efront_string_node, $efront_string_path, $efront_string_wrap, $efront_string_ref, $efront_string_push, $efront_string___curr, $efront_string___leav, $efront_string_type, $efront_string_curren, $efront_string_parent1, $efront_string___exec, $efront_string___stat, $efront_string_call, $efront_string_notify, $efront_string_skip, $efront_string_break, $efront_string___init, $efront_string_visito, $efront_string_root, $efront_string___work, $efront_string___fall, $efront_string_fallba, $efront_string_iterat, $efront_string_keys, $efront_string_functi, $efront_string___keys, $efront_string_assign, $efront_string_create, $efront_string_string, $efront_string_traver, $efront_string_pop, $efront_string_leave, $efront_string_enter, $efront_string_Unknow1, $efront_string__5, $efront_string_range, $efront_string_extend, $efront_string_attach, $efront_string_leadin, $efront_string_traili1, $efront_string_Syntax, $efront_string_attach1, $efront_string_Visito, $efront_string_Visito1, $efront_string_Contro, $efront_string_cloneE) {
    return function clone(exports) {
        'use strict';
        function deepCopy(obj) {
            var ret = {}, key, val;
            for (key in obj)
                obj[$efront_string_hasOwn](key) && (val = obj[key], typeof val === $efront_string_object && val !== null ? ret[key] = deepCopy(val) : ret[key] = val);
            return ret
        }
        function upperBound(array, func) {
            var diff, len, i, current;
            len = array[$efront_string_length], i = 0;
            while (len)
                diff = len >>> 1, current = i + diff, func(array[current]) ? len = diff : (i = current + 1, len -= diff + 1);
            return i
        }
        function Reference(parent, key) {
            this[$efront_string_parent] = parent, this[$efront_string_key] = key
        }
        function Element(node, path, wrap, ref) {
            this[$efront_string_node] = node, this[$efront_string_path] = path, this[$efront_string_wrap] = wrap, this[$efront_string_ref] = ref
        }
        function Controller() {
        }
        function isNode(node) {
            return node == null ? !1 : typeof node === $efront_string_object && typeof node[$efront_string_type] === $efront_string_string
        }
        function isProperty(nodeType, key) {
            return (nodeType === Syntax[$efront_string_Object] || nodeType === Syntax[$efront_string_Object1]) && $efront_string_proper1 === key
        }
        function candidateExistsInLeaveList(leavelist, candidate) {
            for (var i = leavelist[$efront_string_length] - 1; i >= 0; --i)
                if (leavelist[i][$efront_string_node] === candidate)
                    return !0;
            return !1
        }
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
            return target = upperBound(tokens, function search(token) {
                return token[$efront_string_range][0] > comment[$efront_string_range][0]
            }), comment[$efront_string_extend] = [
                comment[$efront_string_range][0],
                comment[$efront_string_range][1]
            ], target !== tokens[$efront_string_length] && (comment[$efront_string_extend][1] = tokens[target][$efront_string_range][0]), target -= 1, target >= 0 && (comment[$efront_string_extend][0] = tokens[target][$efront_string_range][1]), comment
        }
        function attachComments(tree, providedComments, tokens) {
            var _a, _b, comments = [], comment, len, i, cursor;
            if (!tree[$efront_string_range])
                throw new Error($efront_string_attach);
            if (!tokens[$efront_string_length]) {
                if (providedComments[$efront_string_length]) {
                    for (i = 0, len = providedComments[$efront_string_length]; i < len; i += 1)
                        comment = deepCopy(providedComments[i]), comment[$efront_string_extend] = [
                            0,
                            tree[$efront_string_range][0]
                        ], comments[$efront_string_push](comment);
                    tree[$efront_string_leadin] = comments
                }
                return tree
            }
            for (i = 0, len = providedComments[$efront_string_length]; i < len; i += 1)
                comments[$efront_string_push](extendCommentRange(deepCopy(providedComments[i]), tokens));
            return cursor = 0, traverse(tree, (_a = {}, _a[$efront_string_enter] = function (node) {
                var comment;
                while (cursor < comments[$efront_string_length]) {
                    if (comment = comments[cursor], comment[$efront_string_extend][1] > node[$efront_string_range][0])
                        break;
                    comment[$efront_string_extend][1] === node[$efront_string_range][0] ? (node[$efront_string_leadin] || (node[$efront_string_leadin] = []), node[$efront_string_leadin][$efront_string_push](comment), comments[$efront_string_splice](cursor, 1)) : cursor += 1
                }
                return cursor === comments[$efront_string_length] ? VisitorOption[$efront_string_Break] : comments[cursor][$efront_string_extend][0] > node[$efront_string_range][1] ? VisitorOption[$efront_string_Skip] : void 0
            }, _a)), cursor = 0, traverse(tree, (_b = {}, _b[$efront_string_leave] = function (node) {
                var comment;
                while (cursor < comments[$efront_string_length]) {
                    if (comment = comments[cursor], node[$efront_string_range][1] < comment[$efront_string_extend][0])
                        break;
                    node[$efront_string_range][1] === comment[$efront_string_extend][0] ? (node[$efront_string_traili1] || (node[$efront_string_traili1] = []), node[$efront_string_traili1][$efront_string_push](comment), comments[$efront_string_splice](cursor, 1)) : cursor += 1
                }
                return cursor === comments[$efront_string_length] ? VisitorOption[$efront_string_Break] : comments[cursor][$efront_string_extend][0] > node[$efront_string_range][1] ? VisitorOption[$efront_string_Skip] : void 0
            }, _b)), tree
        }
        var _a, _b, _c, Syntax, VisitorOption, VisitorKeys, BREAK, SKIP, REMOVE;
        return _a = {}, _a[$efront_string_Assign] = $efront_string_Assign, _a[$efront_string_Assign1] = $efront_string_Assign1, _a[$efront_string_ArrayE] = $efront_string_ArrayE, _a[$efront_string_ArrayP] = $efront_string_ArrayP, _a[$efront_string_ArrowF] = $efront_string_ArrowF, _a[$efront_string_AwaitE] = $efront_string_AwaitE, _a[$efront_string_BlockS] = $efront_string_BlockS, _a[$efront_string_Binary] = $efront_string_Binary, _a[$efront_string_BreakS] = $efront_string_BreakS, _a[$efront_string_CallEx] = $efront_string_CallEx, _a[$efront_string_CatchC] = $efront_string_CatchC, _a[$efront_string_ChainE] = $efront_string_ChainE, _a[$efront_string_ClassB] = $efront_string_ClassB, _a[$efront_string_ClassD] = $efront_string_ClassD, _a[$efront_string_ClassE] = $efront_string_ClassE, _a[$efront_string_Compre] = $efront_string_Compre, _a[$efront_string_Compre1] = $efront_string_Compre1, _a[$efront_string_Condit] = $efront_string_Condit, _a[$efront_string_Contin] = $efront_string_Contin, _a[$efront_string_Debugg] = $efront_string_Debugg, _a[$efront_string_Direct] = $efront_string_Direct, _a[$efront_string_DoWhil] = $efront_string_DoWhil, _a[$efront_string_EmptyS] = $efront_string_EmptyS, _a[$efront_string_Export] = $efront_string_Export, _a[$efront_string_Export1] = $efront_string_Export1, _a[$efront_string_Export2] = $efront_string_Export2, _a[$efront_string_Export3] = $efront_string_Export3, _a[$efront_string_Expres] = $efront_string_Expres, _a[$efront_string_ForSta] = $efront_string_ForSta, _a[$efront_string_ForInS] = $efront_string_ForInS, _a[$efront_string_ForOfS] = $efront_string_ForOfS, _a[$efront_string_Functi1] = $efront_string_Functi1, _a[$efront_string_Functi] = $efront_string_Functi, _a[$efront_string_Genera] = $efront_string_Genera, _a[$efront_string_Identi] = $efront_string_Identi, _a[$efront_string_IfStat] = $efront_string_IfStat, _a[$efront_string_Import] = $efront_string_Import, _a[$efront_string_Import1] = $efront_string_Import1, _a[$efront_string_Import2] = $efront_string_Import2, _a[$efront_string_Import3] = $efront_string_Import3, _a[$efront_string_Import4] = $efront_string_Import4, _a[$efront_string_Litera] = $efront_string_Litera, _a[$efront_string_Labele] = $efront_string_Labele, _a[$efront_string_Logica] = $efront_string_Logica, _a[$efront_string_Member] = $efront_string_Member, _a[$efront_string_MetaPr] = $efront_string_MetaPr, _a[$efront_string_Method] = $efront_string_Method, _a[$efront_string_Module] = $efront_string_Module, _a[$efront_string_NewExp] = $efront_string_NewExp, _a[$efront_string_Object] = $efront_string_Object, _a[$efront_string_Object1] = $efront_string_Object1, _a[$efront_string_Progra] = $efront_string_Progra, _a[$efront_string_Proper] = $efront_string_Proper, _a[$efront_string_RestEl] = $efront_string_RestEl, _a[$efront_string_Return] = $efront_string_Return, _a[$efront_string_Sequen] = $efront_string_Sequen, _a[$efront_string_Spread] = $efront_string_Spread, _a[$efront_string_Super] = $efront_string_Super, _a[$efront_string_Switch] = $efront_string_Switch, _a[$efront_string_Switch1] = $efront_string_Switch1, _a[$efront_string_Tagged] = $efront_string_Tagged, _a[$efront_string_Templa] = $efront_string_Templa, _a[$efront_string_Templa1] = $efront_string_Templa1, _a[$efront_string_ThisEx] = $efront_string_ThisEx, _a[$efront_string_ThrowS] = $efront_string_ThrowS, _a[$efront_string_TrySta] = $efront_string_TrySta, _a[$efront_string_UnaryE] = $efront_string_UnaryE, _a[$efront_string_Update] = $efront_string_Update, _a[$efront_string_Variab] = $efront_string_Variab, _a[$efront_string_Variab1] = $efront_string_Variab1, _a[$efront_string_WhileS] = $efront_string_WhileS, _a[$efront_string_WithSt] = $efront_string_WithSt, _a[$efront_string_YieldE] = $efront_string_YieldE, Syntax = _a, _b = {}, _b[$efront_string_Assign] = [
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
        ], _b[$efront_string_YieldE] = [$efront_string_argume], VisitorKeys = _b, BREAK = {}, SKIP = {}, REMOVE = {}, _c = {}, _c[$efront_string_Break] = BREAK, _c[$efront_string_Skip] = SKIP, _c[$efront_string_Remove] = REMOVE, VisitorOption = _c, Reference[$efront_string_protot][$efront_string_replac] = function replace(node) {
            this[$efront_string_parent][this[$efront_string_key]] = node
        }, Reference[$efront_string_protot][$efront_string_remove] = function remove() {
            return Array[$efront_string_isArra](this[$efront_string_parent]) ? (this[$efront_string_parent][$efront_string_splice](this[$efront_string_key], 1), !0) : (this[$efront_string_replac](null), !1)
        }, Controller[$efront_string_protot][$efront_string_path] = function path() {
            function addToPath(result, path) {
                if (Array[$efront_string_isArra](path))
                    for (j = 0, jz = path[$efront_string_length]; j < jz; ++j)
                        result[$efront_string_push](path[j]);
                else
                    result[$efront_string_push](path)
            }
            var i, iz, j, jz, result, element;
            if (!this[$efront_string___curr][$efront_string_path])
                return null;
            for (result = [], i = 2, iz = this[$efront_string___leav][$efront_string_length]; i < iz; ++i)
                element = this[$efront_string___leav][i], addToPath(result, element[$efront_string_path]);
            return addToPath(result, this[$efront_string___curr][$efront_string_path]), result
        }, Controller[$efront_string_protot][$efront_string_type] = function () {
            var node = this[$efront_string_curren]();
            return node[$efront_string_type] || this[$efront_string___curr][$efront_string_wrap]
        }, Controller[$efront_string_protot][$efront_string_parent1] = function parents() {
            var i, iz, result;
            for (result = [], i = 1, iz = this[$efront_string___leav][$efront_string_length]; i < iz; ++i)
                result[$efront_string_push](this[$efront_string___leav][i][$efront_string_node]);
            return result
        }, Controller[$efront_string_protot][$efront_string_curren] = function current() {
            return this[$efront_string___curr][$efront_string_node]
        }, Controller[$efront_string_protot][$efront_string___exec] = function __execute(callback, element) {
            var previous, result;
            return result = undefined, previous = this[$efront_string___curr], this[$efront_string___curr] = element, this[$efront_string___stat] = null, callback && (result = callback[$efront_string_call](this, element[$efront_string_node], this[$efront_string___leav][this[$efront_string___leav][$efront_string_length] - 1][$efront_string_node])), this[$efront_string___curr] = previous, result
        }, Controller[$efront_string_protot][$efront_string_notify] = function notify(flag) {
            this[$efront_string___stat] = flag
        }, Controller[$efront_string_protot][$efront_string_skip] = function () {
            this[$efront_string_notify](SKIP)
        }, Controller[$efront_string_protot][$efront_string_break] = function () {
            this[$efront_string_notify](BREAK)
        }, Controller[$efront_string_protot][$efront_string_remove] = function () {
            this[$efront_string_notify](REMOVE)
        }, Controller[$efront_string_protot][$efront_string___init] = function (root, visitor) {
            this[$efront_string_visito] = visitor, this[$efront_string_root] = root, this[$efront_string___work] = [], this[$efront_string___leav] = [], this[$efront_string___curr] = null, this[$efront_string___stat] = null, this[$efront_string___fall] = null, visitor[$efront_string_fallba] === $efront_string_iterat ? this[$efront_string___fall] = Object[$efront_string_keys] : typeof visitor[$efront_string_fallba] === $efront_string_functi && (this[$efront_string___fall] = visitor[$efront_string_fallba]), this[$efront_string___keys] = VisitorKeys, visitor[$efront_string_keys] && (this[$efront_string___keys] = Object[$efront_string_assign](Object[$efront_string_create](this[$efront_string___keys]), visitor[$efront_string_keys]))
        }, Controller[$efront_string_protot][$efront_string_traver] = function traverse(root, visitor) {
            var worklist, leavelist, element, node, nodeType, ret, key, current, current2, candidates, candidate, sentinel;
            this[$efront_string___init](root, visitor), sentinel = {}, worklist = this[$efront_string___work], leavelist = this[$efront_string___leav], worklist[$efront_string_push](new Element(root, null, null, null)), leavelist[$efront_string_push](new Element(null, null, null, null));
            while (worklist[$efront_string_length]) {
                if (element = worklist[$efront_string_pop](), element === sentinel) {
                    if (element = leavelist[$efront_string_pop](), ret = this[$efront_string___exec](visitor[$efront_string_leave], element), this[$efront_string___stat] === BREAK || ret === BREAK)
                        return;
                    continue
                }
                if (element[$efront_string_node]) {
                    if (ret = this[$efront_string___exec](visitor[$efront_string_enter], element), this[$efront_string___stat] === BREAK || ret === BREAK)
                        return;
                    if (worklist[$efront_string_push](sentinel), leavelist[$efront_string_push](element), this[$efront_string___stat] === SKIP || ret === SKIP)
                        continue;
                    if (node = element[$efront_string_node], nodeType = node[$efront_string_type] || element[$efront_string_wrap], candidates = this[$efront_string___keys][nodeType], !candidates)
                        if (this[$efront_string___fall])
                            candidates = this[$efront_string___fall](node);
                        else
                            throw new Error($efront_string_Unknow1 + nodeType + $efront_string__5);
                    current = candidates[$efront_string_length];
                    while ((current -= 1) >= 0) {
                        if (key = candidates[current], candidate = node[key], !candidate)
                            continue;
                        if (Array[$efront_string_isArra](candidate)) {
                            current2 = candidate[$efront_string_length];
                            while ((current2 -= 1) >= 0) {
                                if (!candidate[current2])
                                    continue;
                                if (candidateExistsInLeaveList(leavelist, candidate[current2]))
                                    continue;
                                if (isProperty(nodeType, candidates[current]))
                                    element = new Element(candidate[current2], [
                                        key,
                                        current2
                                    ], $efront_string_Proper, null);
                                else if (isNode(candidate[current2]))
                                    element = new Element(candidate[current2], [
                                        key,
                                        current2
                                    ], null, null);
                                else
                                    continue;
                                worklist[$efront_string_push](element)
                            }
                        } else if (isNode(candidate)) {
                            if (candidateExistsInLeaveList(leavelist, candidate))
                                continue;
                            worklist[$efront_string_push](new Element(candidate, key, null, null))
                        }
                    }
                }
            }
        }, Controller[$efront_string_protot][$efront_string_replac] = function replace(root, visitor) {
            function removeElem(element) {
                var i, key, nextElem, parent;
                if (element[$efront_string_ref][$efront_string_remove]()) {
                    key = element[$efront_string_ref][$efront_string_key], parent = element[$efront_string_ref][$efront_string_parent], i = worklist[$efront_string_length];
                    while (i--)
                        if (nextElem = worklist[i], nextElem[$efront_string_ref] && nextElem[$efront_string_ref][$efront_string_parent] === parent) {
                            if (nextElem[$efront_string_ref][$efront_string_key] < key)
                                break;
                            --nextElem[$efront_string_ref][$efront_string_key]
                        }
                }
            }
            var _a, worklist, leavelist, node, nodeType, target, element, current, current2, candidates, candidate, sentinel, outer, key;
            this[$efront_string___init](root, visitor), sentinel = {}, worklist = this[$efront_string___work], leavelist = this[$efront_string___leav], _a = {}, _a[$efront_string_root] = root, outer = _a, element = new Element(root, null, null, new Reference(outer, $efront_string_root)), worklist[$efront_string_push](element), leavelist[$efront_string_push](element);
            while (worklist[$efront_string_length]) {
                if (element = worklist[$efront_string_pop](), element === sentinel) {
                    if (element = leavelist[$efront_string_pop](), target = this[$efront_string___exec](visitor[$efront_string_leave], element), target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE && element[$efront_string_ref][$efront_string_replac](target), (this[$efront_string___stat] === REMOVE || target === REMOVE) && removeElem(element), this[$efront_string___stat] === BREAK || target === BREAK)
                        return outer[$efront_string_root];
                    continue
                }
                if (target = this[$efront_string___exec](visitor[$efront_string_enter], element), target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE && (element[$efront_string_ref][$efront_string_replac](target), element[$efront_string_node] = target), (this[$efront_string___stat] === REMOVE || target === REMOVE) && (removeElem(element), element[$efront_string_node] = null), this[$efront_string___stat] === BREAK || target === BREAK)
                    return outer[$efront_string_root];
                if (node = element[$efront_string_node], !node)
                    continue;
                if (worklist[$efront_string_push](sentinel), leavelist[$efront_string_push](element), this[$efront_string___stat] === SKIP || target === SKIP)
                    continue;
                if (nodeType = node[$efront_string_type] || element[$efront_string_wrap], candidates = this[$efront_string___keys][nodeType], !candidates)
                    if (this[$efront_string___fall])
                        candidates = this[$efront_string___fall](node);
                    else
                        throw new Error($efront_string_Unknow1 + nodeType + $efront_string__5);
                current = candidates[$efront_string_length];
                while ((current -= 1) >= 0) {
                    if (key = candidates[current], candidate = node[key], !candidate)
                        continue;
                    if (Array[$efront_string_isArra](candidate)) {
                        current2 = candidate[$efront_string_length];
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2])
                                continue;
                            if (isProperty(nodeType, candidates[current]))
                                element = new Element(candidate[current2], [
                                    key,
                                    current2
                                ], $efront_string_Proper, new Reference(candidate, current2));
                            else if (isNode(candidate[current2]))
                                element = new Element(candidate[current2], [
                                    key,
                                    current2
                                ], null, new Reference(candidate, current2));
                            else
                                continue;
                            worklist[$efront_string_push](element)
                        }
                    } else
                        isNode(candidate) && worklist[$efront_string_push](new Element(candidate, key, null, new Reference(node, key)))
                }
            }
            return outer[$efront_string_root]
        }, exports[$efront_string_Syntax] = Syntax, exports[$efront_string_traver] = traverse, exports[$efront_string_replac] = replace, exports[$efront_string_attach1] = attachComments, exports[$efront_string_Visito] = VisitorKeys, exports[$efront_string_Visito1] = VisitorOption, exports[$efront_string_Contro] = Controller, exports[$efront_string_cloneE] = function () {
            return clone({})
        }, exports
    }(exports)
}],
/** 400 $efront_string__from */ "_from",
/** 401 $efront_string_escode */ "escodegen@latest",
/** 402 $efront_string__id */ "_id",
/** 403 $efront_string_escode1 */ "escodegen@2.0.0",
/** 404 $efront_string__inBun */ "_inBundle",
/** 405 $efront_string__integ */ "_integrity",
/** 406 $efront_string_sha1_X */ "sha1-XjKxKDPoqo+jXhvwvvqJOASEx90=",
/** 407 $efront_string__locat */ "_location",
/** 408 $efront_string__escod */ "/escodegen",
/** 409 $efront_string__phant */ "_phantomChildren",
/** 410 $efront_string__reque */ "_requested",
/** 411 $efront_string_regist */ "registry",
/** 412 $efront_string_raw */ "raw",
/** 413 $efront_string_escode2 */ "escodegen",
/** 414 $efront_string_escape */ "escapedName",
/** 415 $efront_string_rawSpe */ "rawSpec",
/** 416 $efront_string_latest */ "latest",
/** 417 $efront_string_saveSp */ "saveSpec",
/** 418 $efront_string_fetchS */ "fetchSpec",
/** 419 $efront_string__requi */ "_requiredBy",
/** 420 $efront_string__USER */ "#USER",
/** 421 $efront_string__resol */ "_resolved",
/** 422 $efront_string_https_ */ "https://registry.npm.taobao.org/escodegen/download/escodegen-2.0.0.tgz",
/** 423 $efront_string__shasu */ "_shasum",
/** 424 $efront_string_5e32b1 */ "5e32b12833e8aa8fa35e1bf0befa89380484c7dd",
/** 425 $efront_string__spec */ "_spec",
/** 426 $efront_string__where */ "_where",
/** 427 $efront_string_D_work */ "D:\\work\\efront",
/** 428 $efront_string_bin */ "bin",
/** 429 $efront_string_esgene */ "esgenerate",
/** 430 $efront_string_bin_es */ "bin/esgenerate.js",
/** 431 $efront_string_bin_es1 */ "bin/escodegen.js",
/** 432 $efront_string_bugs */ "bugs",
/** 433 $efront_string_https_1 */ "https://github.com/estools/escodegen/issues",
/** 434 $efront_string_bundle */ "bundleDependencies",
/** 435 $efront_string_depend */ "dependencies",
/** 436 $efront_string_esprim */ "esprima",
/** 437 $efront_string__4_0_1 */ "^4.0.1",
/** 438 $efront_string_estrav */ "estraverse",
/** 439 $efront_string__5_2_0 */ "^5.2.0",
/** 440 $efront_string_esutil */ "esutils",
/** 441 $efront_string__2_0_2 */ "^2.0.2",
/** 442 $efront_string_option */ "optionator",
/** 443 $efront_string__0_8_1 */ "^0.8.1",
/** 444 $efront_string_source6 */ "source-map",
/** 445 $efront_string__0_6_1 */ "~0.6.1",
/** 446 $efront_string_deprec */ "deprecated",
/** 447 $efront_string_descri */ "description",
/** 448 $efront_string_ECMASc */ /** text */ "ECMAScript code generator",
/** 449 $efront_string_devDep */ "devDependencies",
/** 450 $efront_string_acorn */ "acorn",
/** 451 $efront_string__7_3_1 */ "^7.3.1",
/** 452 $efront_string_bluebi */ "bluebird",
/** 453 $efront_string__3_4_7 */ "^3.4.7",
/** 454 $efront_string_bower_ */ "bower-registry-client",
/** 455 $efront_string__1_0_0 */ "^1.0.0",
/** 456 $efront_string_chai */ "chai",
/** 457 $efront_string__4_2_0 */ "^4.2.0",
/** 458 $efront_string_chai_e */ "chai-exclude",
/** 459 $efront_string_common */ "commonjs-everywhere",
/** 460 $efront_string__0_9_7 */ "^0.9.7",
/** 461 $efront_string_gulp */ "gulp",
/** 462 $efront_string__3_8_1 */ "^3.8.10",
/** 463 $efront_string_gulp_e */ "gulp-eslint",
/** 464 $efront_string__3_0_1 */ "^3.0.1",
/** 465 $efront_string_gulp_m */ "gulp-mocha",
/** 466 $efront_string_semver */ "semver",
/** 467 $efront_string__5_1_0 */ "^5.1.0",
/** 468 $efront_string_engine */ "engines",
/** 469 $efront_string__6_0 */ ">=6.0",
/** 470 $efront_string_files */ "files",
/** 471 $efront_string_LICENS */ "LICENSE.BSD",
/** 472 $efront_string_README */ "README.md",
/** 473 $efront_string_escode3 */ "escodegen.js",
/** 474 $efront_string_packag */ "package.json",
/** 475 $efront_string_homepa */ "homepage",
/** 476 $efront_string_http_g */ "http://github.com/estools/escodegen",
/** 477 $efront_string_licens */ "license",
/** 478 $efront_string_BSD_2_ */ "BSD-2-Clause",
/** 479 $efront_string_main */ "main",
/** 480 $efront_string_mainta */ "maintainers",
/** 481 $efront_string_Yusuke */ /** text */ "Yusuke Suzuki",
/** 482 $efront_string_email */ "email",
/** 483 $efront_string_utatan */ "utatane.tea@gmail.com",
/** 484 $efront_string_http_g1 */ "http://github.com/Constellation",
/** 485 $efront_string_option1 */ "optionalDependencies",
/** 486 $efront_string_reposi */ "repository",
/** 487 $efront_string_git */ "git",
/** 488 $efront_string_git_ss */ "git+ssh://git@github.com/estools/escodegen.git",
/** 489 $efront_string_script */ "scripts",
/** 490 $efront_string_build */ "build",
/** 491 $efront_string_cjsify */ /** text */ "cjsify -a path: tools/entry-point.js > escodegen.browser.js",
/** 492 $efront_string_build_ */ "build-min",
/** 493 $efront_string_cjsify1 */ /** text */ "cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js",
/** 494 $efront_string_lint */ "lint",
/** 495 $efront_string_gulp_l */ /** text */ "gulp lint",
/** 496 $efront_string_releas */ "release",
/** 497 $efront_string_node_t */ /** text */ "node tools/release.js",
/** 498 $efront_string_gulp_t */ /** text */ "gulp travis",
/** 499 $efront_string_unit_t */ "unit-test",
/** 500 $efront_string_gulp_t1 */ /** text */ "gulp test",
/** 501 $efront_string_2_0_0 */ "2.0.0",
/** 502 package.json */ [400,401,402,403,404,405,406,407,408,409,410,235,348,411,412,70,413,414,415,416,417,418,419,420,47,421,422,423,424,425,426,427,428,429,430,431,432,208,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,361,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,52,498,499,500,164,501,function($efront_string__from, $efront_string_escode, $efront_string__id, $efront_string_escode1, $efront_string__inBun, $efront_string__integ, $efront_string_sha1_X, $efront_string__locat, $efront_string__escod, $efront_string__phant, $efront_string__reque, $efront_string_type, $efront_string_tag, $efront_string_regist, $efront_string_raw, $efront_string_name, $efront_string_escode2, $efront_string_escape, $efront_string_rawSpe, $efront_string_latest, $efront_string_saveSp, $efront_string_fetchS, $efront_string__requi, $efront_string__USER, $efront_string__7, $efront_string__resol, $efront_string_https_, $efront_string__shasu, $efront_string_5e32b1, $efront_string__spec, $efront_string__where, $efront_string_D_work, $efront_string_bin, $efront_string_esgene, $efront_string_bin_es, $efront_string_bin_es1, $efront_string_bugs, $efront_string_url, $efront_string_https_1, $efront_string_bundle, $efront_string_depend, $efront_string_esprim, $efront_string__4_0_1, $efront_string_estrav, $efront_string__5_2_0, $efront_string_esutil, $efront_string__2_0_2, $efront_string_option, $efront_string__0_8_1, $efront_string_source6, $efront_string__0_6_1, $efront_string_deprec, $efront_string_descri, $efront_string_ECMASc, $efront_string_devDep, $efront_string_acorn, $efront_string__7_3_1, $efront_string_bluebi, $efront_string__3_4_7, $efront_string_bower_, $efront_string__1_0_0, $efront_string_chai, $efront_string__4_2_0, $efront_string_chai_e, $efront_string_common, $efront_string__0_9_7, $efront_string_gulp, $efront_string__3_8_1, $efront_string_gulp_e, $efront_string__3_0_1, $efront_string_gulp_m, $efront_string_semver, $efront_string__5_1_0, $efront_string_engine, $efront_string_node, $efront_string__6_0, $efront_string_files, $efront_string_LICENS, $efront_string_README, $efront_string_escode3, $efront_string_packag, $efront_string_homepa, $efront_string_http_g, $efront_string_licens, $efront_string_BSD_2_, $efront_string_main, $efront_string_mainta, $efront_string_Yusuke, $efront_string_email, $efront_string_utatan, $efront_string_http_g1, $efront_string_option1, $efront_string_reposi, $efront_string_git, $efront_string_git_ss, $efront_string_script, $efront_string_build, $efront_string_cjsify, $efront_string_build_, $efront_string_cjsify1, $efront_string_lint, $efront_string_gulp_l, $efront_string_releas, $efront_string_node_t, $efront_string_test, $efront_string_gulp_t, $efront_string_unit_t, $efront_string_gulp_t1, $efront_string_versio, $efront_string_2_0_0) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return _a = {}, _a[$efront_string__from] = $efront_string_escode, _a[$efront_string__id] = $efront_string_escode1, _a[$efront_string__inBun] = !1, _a[$efront_string__integ] = $efront_string_sha1_X, _a[$efront_string__locat] = $efront_string__escod, _a[$efront_string__phant] = {}, _b = {}, _b[$efront_string_type] = $efront_string_tag, _b[$efront_string_regist] = !0, _b[$efront_string_raw] = $efront_string_escode, _b[$efront_string_name] = $efront_string_escode2, _b[$efront_string_escape] = $efront_string_escode2, _b[$efront_string_rawSpe] = $efront_string_latest, _b[$efront_string_saveSp] = null, _b[$efront_string_fetchS] = $efront_string_latest, _a[$efront_string__reque] = _b, _a[$efront_string__requi] = [
        $efront_string__USER,
        $efront_string__7
    ], _a[$efront_string__resol] = $efront_string_https_, _a[$efront_string__shasu] = $efront_string_5e32b1, _a[$efront_string__spec] = $efront_string_escode, _a[$efront_string__where] = $efront_string_D_work, _c = {}, _c[$efront_string_esgene] = $efront_string_bin_es, _c[$efront_string_escode2] = $efront_string_bin_es1, _a[$efront_string_bin] = _c, _d = {}, _d[$efront_string_url] = $efront_string_https_1, _a[$efront_string_bugs] = _d, _a[$efront_string_bundle] = !1, _e = {}, _e[$efront_string_esprim] = $efront_string__4_0_1, _e[$efront_string_estrav] = $efront_string__5_2_0, _e[$efront_string_esutil] = $efront_string__2_0_2, _e[$efront_string_option] = $efront_string__0_8_1, _e[$efront_string_source6] = $efront_string__0_6_1, _a[$efront_string_depend] = _e, _a[$efront_string_deprec] = !1, _a[$efront_string_descri] = $efront_string_ECMASc, _f = {}, _f[$efront_string_acorn] = $efront_string__7_3_1, _f[$efront_string_bluebi] = $efront_string__3_4_7, _f[$efront_string_bower_] = $efront_string__1_0_0, _f[$efront_string_chai] = $efront_string__4_2_0, _f[$efront_string_chai_e] = $efront_string__2_0_2, _f[$efront_string_common] = $efront_string__0_9_7, _f[$efront_string_gulp] = $efront_string__3_8_1, _f[$efront_string_gulp_e] = $efront_string__3_0_1, _f[$efront_string_gulp_m] = $efront_string__3_0_1, _f[$efront_string_semver] = $efront_string__5_1_0, _a[$efront_string_devDep] = _f, _g = {}, _g[$efront_string_node] = $efront_string__6_0, _a[$efront_string_engine] = _g, _a[$efront_string_files] = [
        $efront_string_LICENS,
        $efront_string_README,
        $efront_string_bin,
        $efront_string_escode3,
        $efront_string_packag
    ], _a[$efront_string_homepa] = $efront_string_http_g, _a[$efront_string_licens] = $efront_string_BSD_2_, _a[$efront_string_main] = $efront_string_escode3, _a[$efront_string_mainta] = [(_h = {}, _h[$efront_string_name] = $efront_string_Yusuke, _h[$efront_string_email] = $efront_string_utatan, _h[$efront_string_url] = $efront_string_http_g1, _h)], _a[$efront_string_name] = $efront_string_escode2, _j = {}, _j[$efront_string_source6] = $efront_string__0_6_1, _a[$efront_string_option1] = _j, _k = {}, _k[$efront_string_type] = $efront_string_git, _k[$efront_string_url] = $efront_string_git_ss, _a[$efront_string_reposi] = _k, _l = {}, _l[$efront_string_build] = $efront_string_cjsify, _l[$efront_string_build_] = $efront_string_cjsify1, _l[$efront_string_lint] = $efront_string_gulp_l, _l[$efront_string_releas] = $efront_string_node_t, _l[$efront_string_test] = $efront_string_gulp_t, _l[$efront_string_unit_t] = $efront_string_gulp_t1, _a[$efront_string_script] = _l, _a[$efront_string_versio] = $efront_string_2_0_0, _a
}],
/** 503 estraverse */ [1,function(require) {
    return require(399)
}],
/** 504 RegExp */ RegExp,
/** 505 Number */ Number,
/** 506 global */ typeof global!=="undefined"?global:void 0,
/** 507 $efront_regexp__r_n_ */ /(\r?\n)/,
/** 508 $efront_string_$$$isS */ "$$$isSourceNode$$$",
/** 509 $efront_string_childr */ "children",
/** 510 $efront_string_source7 */ "sourceContents",
/** 511 $efront_string_fromSt */ "fromStringWithSourceMap",
/** 512 $efront_string_Expect1 */ /** text */ "Expected a SourceNode, string, or an array of SourceNodes and strings. Got ",
/** 513 $efront_string_prepen */ "prepend",
/** 514 $efront_string_unshif */ "unshift",
/** 515 $efront_string_walk */ "walk",
/** 516 $efront_string_replac1 */ "replaceRight",
/** 517 $efront_string_walkSo */ "walkSourceContents",
/** 518 $efront_string_toStri1 */ "toStringWithSourceMap",
/** 519 $efront_string_code */ "code",
/** 520 $efront_string_Source3 */ "SourceNode",
/** 521 source-map$lib$source-node.js */ [1,123,23,16,24,15,169,507,508,509,510,139,140,65,70,92,511,4,3,137,69,57,68,45,11,143,91,144,145,66,67,89,360,10,93,512,513,514,515,516,50,62,517,147,63,168,518,519,142,141,138,64,162,520,function(require, undefined, Array, TypeError, Object, exports, $efront_string_Source1, $efront_regexp__r_n_, $efront_string_$$$isS, $efront_string_childr, $efront_string_source7, $efront_string_line, $efront_string_column, $efront_string_source, $efront_string_name, $efront_string_add, $efront_string_fromSt, $efront_string_split, $efront_string_length, $efront_string_eachMa, $efront_string_genera1, $efront_string_substr, $efront_string_genera, $efront_string_splice, $efront_string_join, $efront_string_source3, $efront_string_forEac, $efront_string_source4, $efront_string_setSou, $efront_string_origin, $efront_string_origin1, $efront_string_protot, $efront_string_isArra, $efront_string_string, $efront_string_push, $efront_string_Expect1, $efront_string_prepen, $efront_string_unshif, $efront_string_walk, $efront_string_replac1, $efront_string_replac, $efront_string_toSetS, $efront_string_walkSo, $efront_string_keys, $efront_string_fromSe, $efront_string_toStri, $efront_string_toStri1, $efront_string_code, $efront_string_addMap, $efront_string_origin2, $efront_string_genera2, $efront_string_charCo, $efront_string_map, $efront_string_Source3) {
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
        this[$efront_string_childr] = [], this[$efront_string_source7] = {}, this[$efront_string_line] = aLine == null ? null : aLine, this[$efront_string_column] = aColumn == null ? null : aColumn, this[$efront_string_source] = aSource == null ? null : aSource, this[$efront_string_name] = aName == null ? null : aName, this[isSourceNode] = !0, aChunks != null && this[$efront_string_add](aChunks)
    }
    var SourceMapGenerator = require(170)[$efront_string_Source1], util = require(80), REGEX_NEWLINE = $efront_regexp__r_n_, NEWLINE_CODE = 10, isSourceNode = $efront_string_$$$isS;
    return SourceNode[$efront_string_fromSt] = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
        function addMappingWithCode(mapping, code) {
            if (mapping === null || mapping[$efront_string_source] === undefined)
                node[$efront_string_add](code);
            else {
                var source = aRelativePath ? util[$efront_string_join](aRelativePath, mapping[$efront_string_source]) : mapping[$efront_string_source];
                node[$efront_string_add](new SourceNode(mapping[$efront_string_origin], mapping[$efront_string_origin1], source, code, mapping[$efront_string_name]))
            }
        }
        var node = new SourceNode, remainingLines = aGeneratedCode[$efront_string_split](REGEX_NEWLINE), remainingLinesIndex = 0, shiftNextLine = function () {
                function getNextLine() {
                    return remainingLinesIndex < remainingLines[$efront_string_length] ? remainingLines[remainingLinesIndex++] : undefined
                }
                var lineContents = getNextLine(), newLine = getNextLine() || '';
                return lineContents + newLine
            }, lastGeneratedLine = 1, lastGeneratedColumn = 0, lastMapping = null;
        return aSourceMapConsumer[$efront_string_eachMa](function (mapping) {
            if (lastMapping !== null)
                if (lastGeneratedLine < mapping[$efront_string_genera1])
                    addMappingWithCode(lastMapping, shiftNextLine()), lastGeneratedLine++, lastGeneratedColumn = 0;
                else {
                    var nextLine = remainingLines[remainingLinesIndex] || '', code = nextLine[$efront_string_substr](0, mapping[$efront_string_genera] - lastGeneratedColumn);
                    remainingLines[remainingLinesIndex] = nextLine[$efront_string_substr](mapping[$efront_string_genera] - lastGeneratedColumn), lastGeneratedColumn = mapping[$efront_string_genera], addMappingWithCode(lastMapping, code), lastMapping = mapping;
                    return
                }
            while (lastGeneratedLine < mapping[$efront_string_genera1])
                node[$efront_string_add](shiftNextLine()), lastGeneratedLine++;
            if (lastGeneratedColumn < mapping[$efront_string_genera]) {
                var nextLine = remainingLines[remainingLinesIndex] || '';
                node[$efront_string_add](nextLine[$efront_string_substr](0, mapping[$efront_string_genera])), remainingLines[remainingLinesIndex] = nextLine[$efront_string_substr](mapping[$efront_string_genera]), lastGeneratedColumn = mapping[$efront_string_genera]
            }
            lastMapping = mapping
        }, this), remainingLinesIndex < remainingLines[$efront_string_length] && (lastMapping && addMappingWithCode(lastMapping, shiftNextLine()), node[$efront_string_add](remainingLines[$efront_string_splice](remainingLinesIndex)[$efront_string_join](''))), aSourceMapConsumer[$efront_string_source3][$efront_string_forEac](function (sourceFile) {
            var content = aSourceMapConsumer[$efront_string_source4](sourceFile);
            content != null && (aRelativePath != null && (sourceFile = util[$efront_string_join](aRelativePath, sourceFile)), node[$efront_string_setSou](sourceFile, content))
        }), node
    }, SourceNode[$efront_string_protot][$efront_string_add] = function SourceNode_add(aChunk) {
        if (Array[$efront_string_isArra](aChunk))
            aChunk[$efront_string_forEac](function (chunk) {
                this[$efront_string_add](chunk)
            }, this);
        else if (aChunk[isSourceNode] || typeof aChunk === $efront_string_string)
            aChunk && this[$efront_string_childr][$efront_string_push](aChunk);
        else
            throw new TypeError($efront_string_Expect1 + aChunk);
        return this
    }, SourceNode[$efront_string_protot][$efront_string_prepen] = function SourceNode_prepend(aChunk) {
        if (Array[$efront_string_isArra](aChunk))
            for (var i = aChunk[$efront_string_length] - 1; i >= 0; i--)
                this[$efront_string_prepen](aChunk[i]);
        else if (aChunk[isSourceNode] || typeof aChunk === $efront_string_string)
            this[$efront_string_childr][$efront_string_unshif](aChunk);
        else
            throw new TypeError($efront_string_Expect1 + aChunk);
        return this
    }, SourceNode[$efront_string_protot][$efront_string_walk] = function SourceNode_walk(aFn) {
        var _a, chunk;
        for (var i = 0, len = this[$efront_string_childr][$efront_string_length]; i < len; i++)
            chunk = this[$efront_string_childr][i], chunk[isSourceNode] ? chunk[$efront_string_walk](aFn) : chunk !== '' && aFn(chunk, (_a = {}, _a[$efront_string_source] = this[$efront_string_source], _a[$efront_string_line] = this[$efront_string_line], _a[$efront_string_column] = this[$efront_string_column], _a[$efront_string_name] = this[$efront_string_name], _a))
    }, SourceNode[$efront_string_protot][$efront_string_join] = function SourceNode_join(aSep) {
        var newChildren, i, len = this[$efront_string_childr][$efront_string_length];
        if (len > 0) {
            for (newChildren = [], i = 0; i < len - 1; i++)
                newChildren[$efront_string_push](this[$efront_string_childr][i]), newChildren[$efront_string_push](aSep);
            newChildren[$efront_string_push](this[$efront_string_childr][i]), this[$efront_string_childr] = newChildren
        }
        return this
    }, SourceNode[$efront_string_protot][$efront_string_replac1] = function SourceNode_replaceRight(aPattern, aReplacement) {
        var lastChild = this[$efront_string_childr][this[$efront_string_childr][$efront_string_length] - 1];
        return lastChild[isSourceNode] ? lastChild[$efront_string_replac1](aPattern, aReplacement) : typeof lastChild === $efront_string_string ? this[$efront_string_childr][this[$efront_string_childr][$efront_string_length] - 1] = lastChild[$efront_string_replac](aPattern, aReplacement) : this[$efront_string_childr][$efront_string_push](''[$efront_string_replac](aPattern, aReplacement)), this
    }, SourceNode[$efront_string_protot][$efront_string_setSou] = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
        this[$efront_string_source7][util[$efront_string_toSetS](aSourceFile)] = aSourceContent
    }, SourceNode[$efront_string_protot][$efront_string_walkSo] = function SourceNode_walkSourceContents(aFn) {
        for (var i = 0, len = this[$efront_string_childr][$efront_string_length]; i < len; i++)
            this[$efront_string_childr][i][isSourceNode] && this[$efront_string_childr][i][$efront_string_walkSo](aFn);
        var sources = Object[$efront_string_keys](this[$efront_string_source7]);
        for (var i = 0, len = sources[$efront_string_length]; i < len; i++)
            aFn(util[$efront_string_fromSe](sources[i]), this[$efront_string_source7][sources[i]])
    }, SourceNode[$efront_string_protot][$efront_string_toStri] = function SourceNode_toString() {
        var str = '';
        return this[$efront_string_walk](function (chunk) {
            str += chunk
        }), str
    }, SourceNode[$efront_string_protot][$efront_string_toStri1] = function SourceNode_toStringWithSourceMap(aArgs) {
        var _a, _b, generated = (_a = {}, _a[$efront_string_code] = '', _a[$efront_string_line] = 1, _a[$efront_string_column] = 0, _a), map = new SourceMapGenerator(aArgs), sourceMappingActive = !1, lastOriginalSource = null, lastOriginalLine = null, lastOriginalColumn = null, lastOriginalName = null;
        return this[$efront_string_walk](function (chunk, original) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            generated[$efront_string_code] += chunk, original[$efront_string_source] !== null && original[$efront_string_line] !== null && original[$efront_string_column] !== null ? ((lastOriginalSource !== original[$efront_string_source] || lastOriginalLine !== original[$efront_string_line] || lastOriginalColumn !== original[$efront_string_column] || lastOriginalName !== original[$efront_string_name]) && map[$efront_string_addMap]((_a = {}, _a[$efront_string_source] = original[$efront_string_source], _b = {}, _b[$efront_string_line] = original[$efront_string_line], _b[$efront_string_column] = original[$efront_string_column], _a[$efront_string_origin2] = _b, _c = {}, _c[$efront_string_line] = generated[$efront_string_line], _c[$efront_string_column] = generated[$efront_string_column], _a[$efront_string_genera2] = _c, _a[$efront_string_name] = original[$efront_string_name], _a)), lastOriginalSource = original[$efront_string_source], lastOriginalLine = original[$efront_string_line], lastOriginalColumn = original[$efront_string_column], lastOriginalName = original[$efront_string_name], sourceMappingActive = !0) : sourceMappingActive && (map[$efront_string_addMap]((_d = {}, _e = {}, _e[$efront_string_line] = generated[$efront_string_line], _e[$efront_string_column] = generated[$efront_string_column], _d[$efront_string_genera2] = _e, _d)), lastOriginalSource = null, sourceMappingActive = !1);
            for (var idx = 0, length = chunk[$efront_string_length]; idx < length; idx++)
                chunk[$efront_string_charCo](idx) === NEWLINE_CODE ? (generated[$efront_string_line]++, generated[$efront_string_column] = 0, idx + 1 === length ? (lastOriginalSource = null, sourceMappingActive = !1) : sourceMappingActive && map[$efront_string_addMap]((_f = {}, _f[$efront_string_source] = original[$efront_string_source], _g = {}, _g[$efront_string_line] = original[$efront_string_line], _g[$efront_string_column] = original[$efront_string_column], _f[$efront_string_origin2] = _g, _h = {}, _h[$efront_string_line] = generated[$efront_string_line], _h[$efront_string_column] = generated[$efront_string_column], _f[$efront_string_genera2] = _h, _f[$efront_string_name] = original[$efront_string_name], _f))) : generated[$efront_string_column]++
        }), this[$efront_string_walkSo](function (sourceFile, sourceContent) {
            map[$efront_string_setSou](sourceFile, sourceContent)
        }), _b = {}, _b[$efront_string_code] = generated[$efront_string_code], _b[$efront_string_map] = map, _b
    }, exports[$efront_string_Source3] = SourceNode, exports
}],
/** 522 $efront_string_implem */ "implements",
/** 523 $efront_string_interf */ "interface",
/** 524 $efront_string_packag1 */ "package",
/** 525 $efront_string_privat */ "private",
/** 526 $efront_string_protec */ "protected",
/** 527 $efront_string_public */ "public",
/** 528 $efront_string_static */ "static",
/** 529 $efront_string_let */ "let",
/** 530 $efront_string_yield */ "yield",
/** 531 $efront_string_if */ "if",
/** 532 $efront_string_in */ "in",
/** 533 $efront_string_do */ "do",
/** 534 $efront_string_var */ "var",
/** 535 $efront_string_for */ "for",
/** 536 $efront_string_new */ "new",
/** 537 $efront_string_try */ "try",
/** 538 $efront_string_this */ "this",
/** 539 $efront_string_else */ "else",
/** 540 $efront_string_case */ "case",
/** 541 $efront_string_void */ "void",
/** 542 $efront_string_with */ "with",
/** 543 $efront_string_enum */ "enum",
/** 544 $efront_string_while */ "while",
/** 545 $efront_string_catch */ "catch",
/** 546 $efront_string_throw */ "throw",
/** 547 $efront_string_const */ "const",
/** 548 $efront_string_class */ "class",
/** 549 $efront_string_super */ "super",
/** 550 $efront_string_return */ "return",
/** 551 $efront_string_typeof */ "typeof",
/** 552 $efront_string_delete */ "delete",
/** 553 $efront_string_switch */ "switch",
/** 554 $efront_string_export2 */ "export",
/** 555 $efront_string_import1 */ "import",
/** 556 $efront_string_defaul */ "default",
/** 557 $efront_string_finall */ "finally",
/** 558 $efront_string_extend1 */ "extends",
/** 559 $efront_string_contin */ "continue",
/** 560 $efront_string_debugg */ "debugger",
/** 561 $efront_string_instan */ "instanceof",
/** 562 $efront_string_null */ "null",
/** 563 $efront_string_true */ "true",
/** 564 $efront_string_false */ "false",
/** 565 $efront_string_eval */ "eval",
/** 566 $efront_string_isKeyw */ "isKeywordES5",
/** 567 $efront_string_isKeyw1 */ "isKeywordES6",
/** 568 $efront_string_isRese */ "isReservedWordES5",
/** 569 $efront_string_isRese1 */ "isReservedWordES6",
/** 570 $efront_string_isRest */ "isRestrictedWord",
/** 571 $efront_string_isIden4 */ "isIdentifierNameES5",
/** 572 $efront_string_isIden5 */ "isIdentifierNameES6",
/** 573 $efront_string_isIden6 */ "isIdentifierES5",
/** 574 $efront_string_isIden7 */ "isIdentifierES6",
/** 575 esutils$lib$keyword.js */ [1,217,522,523,524,525,526,527,528,529,530,3,531,532,533,534,535,536,537,538,539,540,541,542,543,544,372,545,546,547,548,549,550,551,552,553,554,555,556,557,558,380,559,560,561,562,563,564,565,327,64,230,231,232,233,13,566,567,568,569,570,571,572,573,574,function(require, module, $efront_string_implem, $efront_string_interf, $efront_string_packag1, $efront_string_privat, $efront_string_protec, $efront_string_public, $efront_string_static, $efront_string_let, $efront_string_yield, $efront_string_length, $efront_string_if, $efront_string_in, $efront_string_do, $efront_string_var, $efront_string_for, $efront_string_new, $efront_string_try, $efront_string_this, $efront_string_else, $efront_string_case, $efront_string_void, $efront_string_with, $efront_string_enum, $efront_string_while, $efront_string_break, $efront_string_catch, $efront_string_throw, $efront_string_const, $efront_string_class, $efront_string_super, $efront_string_return, $efront_string_typeof, $efront_string_delete, $efront_string_switch, $efront_string_export2, $efront_string_import1, $efront_string_defaul, $efront_string_finall, $efront_string_extend1, $efront_string_functi, $efront_string_contin, $efront_string_debugg, $efront_string_instan, $efront_string_null, $efront_string_true, $efront_string_false, $efront_string_eval, $efront_string_argume1, $efront_string_charCo, $efront_string_isIden, $efront_string_isIden1, $efront_string_isIden2, $efront_string_isIden3, $efront_string_export, $efront_string_isKeyw, $efront_string_isKeyw1, $efront_string_isRese, $efront_string_isRese1, $efront_string_isRest, $efront_string_isIden4, $efront_string_isIden5, $efront_string_isIden6, $efront_string_isIden7) {
    return function (_a, code) {
        'use strict';
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
                return !0;
            default:
                return !1
            }
        }
        function isKeywordES5(id, strict) {
            return !strict && id === $efront_string_yield ? !1 : isKeywordES6(id, strict)
        }
        function isKeywordES6(id, strict) {
            if (strict && isStrictModeReservedWordES6(id))
                return !0;
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
                return id === $efront_string_return || id === $efront_string_typeof || id === $efront_string_delete || id === $efront_string_switch || id === $efront_string_export2 || id === $efront_string_import1;
            case 7:
                return id === $efront_string_defaul || id === $efront_string_finall || id === $efront_string_extend1;
            case 8:
                return id === $efront_string_functi || id === $efront_string_contin || id === $efront_string_debugg;
            case 10:
                return id === $efront_string_instan;
            default:
                return !1
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
            if (id[$efront_string_length] === 0)
                return !1;
            if (ch = id[$efront_string_charCo](0), !code[$efront_string_isIden](ch))
                return !1;
            for (i = 1, iz = id[$efront_string_length]; i < iz; ++i)
                if (ch = id[$efront_string_charCo](i), !code[$efront_string_isIden1](ch))
                    return !1;
            return !0
        }
        function decodeUtf16(lead, trail) {
            return (lead - 55296) * 1024 + (trail - 56320) + 65536
        }
        function isIdentifierNameES6(id) {
            var i, iz, ch, lowCh, check;
            if (id[$efront_string_length] === 0)
                return !1;
            for (check = code[$efront_string_isIden2], i = 0, iz = id[$efront_string_length]; i < iz; ++i) {
                if (ch = id[$efront_string_charCo](i), 55296 <= ch && ch <= 56319) {
                    if (++i, i >= iz)
                        return !1;
                    if (lowCh = id[$efront_string_charCo](i), !(56320 <= lowCh && lowCh <= 57343))
                        return !1;
                    ch = decodeUtf16(ch, lowCh)
                }
                if (!check(ch))
                    return !1;
                check = code[$efront_string_isIden3]
            }
            return !0
        }
        function isIdentifierES5(id, strict) {
            return isIdentifierNameES5(id) && !isReservedWordES5(id, strict)
        }
        function isIdentifierES6(id, strict) {
            return isIdentifierNameES6(id) && !isReservedWordES6(id, strict)
        }
        code = require(234), _a = {}, _a[$efront_string_isKeyw] = isKeywordES5, _a[$efront_string_isKeyw1] = isKeywordES6, _a[$efront_string_isRese] = isReservedWordES5, _a[$efront_string_isRese1] = isReservedWordES6, _a[$efront_string_isRest] = isRestrictedWord, _a[$efront_string_isIden4] = isIdentifierNameES5, _a[$efront_string_isIden5] = isIdentifierNameES6, _a[$efront_string_isIden6] = isIdentifierES5, _a[$efront_string_isIden7] = isIdentifierES6, module[$efront_string_export] = _a
    }()
}],
/** 576 source-map$source-map.js */ [15,1,169,191,520,function(exports, require, $efront_string_Source1, $efront_string_Source2, $efront_string_Source3) {
    return exports[$efront_string_Source1] = require(170)[$efront_string_Source1], exports[$efront_string_Source2] = require(216)[$efront_string_Source2], exports[$efront_string_Source3] = require(521)[$efront_string_Source3], exports
}],
/** 577 $efront_string_ast */ "ast",
/** 578 $efront_string_keywor */ "keyword",
/** 579 esutils$lib$utils.js */ [15,1,577,519,578,function(exports, require, $efront_string_ast, $efront_string_code, $efront_string_keywor) {
    return function () {
        'use strict';
        exports[$efront_string_ast] = require(280), exports[$efront_string_code] = require(234), exports[$efront_string_keywor] = require(575)
    }()
}],
/** 580 source-map */ [1,function(require) {
    return require(576)
}],
/** 581 esutils */ [1,function(require) {
    return require(579)
}],
/** 582 $efront_string_Expres1 */ "Expression",
/** 583 $efront_string_Statem */ "Statement",
/** 584 $efront_string_Sequen1 */ "Sequence",
/** 585 $efront_string_Yield */ "Yield",
/** 586 $efront_string_Assign2 */ "Assignment",
/** 587 $efront_string_Condit1 */ "Conditional",
/** 588 $efront_string_ArrowF1 */ "ArrowFunction",
/** 589 $efront_string_Logica1 */ "LogicalOR",
/** 590 $efront_string_Logica2 */ "LogicalAND",
/** 591 $efront_string_Bitwis */ "BitwiseOR",
/** 592 $efront_string_Bitwis1 */ "BitwiseXOR",
/** 593 $efront_string_Bitwis2 */ "BitwiseAND",
/** 594 $efront_string_Equali */ "Equality",
/** 595 $efront_string_Relati */ "Relational",
/** 596 $efront_string_Bitwis3 */ "BitwiseSHIFT",
/** 597 $efront_string_Additi */ "Additive",
/** 598 $efront_string_Multip */ "Multiplicative",
/** 599 $efront_string_Expone */ "Exponentiation",
/** 600 $efront_string_Await */ "Await",
/** 601 $efront_string_Unary */ "Unary",
/** 602 $efront_string_Postfi */ "Postfix",
/** 603 $efront_string_Option */ "OptionalChaining",
/** 604 $efront_string_Call */ "Call",
/** 605 $efront_string_New */ "New",
/** 606 $efront_string_Tagged1 */ "TaggedTemplate",
/** 607 $efront_string_Member1 */ "Member",
/** 608 $efront_string_Primar */ "Primary",
/** 609 $efront_string__11 */ "||",
/** 610 $efront_string__12 */ "&&",
/** 611 $efront_string__13 */ "|",
/** 612 $efront_string__14 */ "^",
/** 613 $efront_string__15 */ "&",
/** 614 $efront_string__16 */ "==",
/** 615 $efront_string__17 */ "!=",
/** 616 $efront_string__18 */ "===",
/** 617 $efront_string__19 */ "!==",
/** 618 $efront_string_is */ "is",
/** 619 $efront_string_isnt */ "isnt",
/** 620 $efront_string__20 */ "<",
/** 621 $efront_string__21 */ ">",
/** 622 $efront_string__22 */ "<=",
/** 623 $efront_string__23 */ ">=",
/** 624 $efront_string__24 */ "<<",
/** 625 $efront_string__25 */ ">>",
/** 626 $efront_string__26 */ ">>>",
/** 627 $efront_string__27 */ "+",
/** 628 $efront_string__28 */ "-",
/** 629 $efront_string__29 */ "*",
/** 630 $efront_string__30 */ "%",
/** 631 $efront_string__31 */ "**",
/** 632 $efront_string_indent */ "indent",
/** 633 $efront_string_base */ "base",
/** 634 $efront_string_commen */ "comment",
/** 635 $efront_string_format */ "format",
/** 636 $efront_string_style */ "style",
/** 637 $efront_string__32 */ /** text */ "    ",
/** 638 $efront_string_adjust */ "adjustMultilineComment",
/** 639 $efront_string_newlin */ "newline",
/** 640 $efront_string__33 */ /** text */ "\n",
/** 641 $efront_string_space */ "space",
/** 642 $efront_string__34 */ /** text */ " ",
/** 643 $efront_string_json */ "json",
/** 644 $efront_string_renumb */ "renumber",
/** 645 $efront_string_hexade */ "hexadecimal",
/** 646 $efront_string_quotes */ "quotes",
/** 647 $efront_string_single */ "single",
/** 648 $efront_string_escape1 */ "escapeless",
/** 649 $efront_string_compac */ "compact",
/** 650 $efront_string_parent2 */ "parentheses",
/** 651 $efront_string_semico */ "semicolons",
/** 652 $efront_string_safeCo */ "safeConcatenation",
/** 653 $efront_string_preser */ "preserveBlankLines",
/** 654 $efront_string_moz */ "moz",
/** 655 $efront_string_compre */ "comprehensionExpressionStartsWithAssignment",
/** 656 $efront_string_starle */ "starlessGenerator",
/** 657 $efront_string_source8 */ "sourceMap",
/** 658 $efront_string_source9 */ "sourceMapRoot",
/** 659 $efront_string_source10 */ "sourceMapWithCode",
/** 660 $efront_string_direct */ "directive",
/** 661 $efront_string_verbat */ "verbatim",
/** 662 $efront_string_source11 */ "sourceCode",
/** 663 $efront_regexp__r_n_g */ /[\r\n]/g,
/** 664 $efront_string_Numeri */ /** text */ "Numeric literal whose value is NaN",
/** 665 $efront_string_Numeri1 */ /** text */ "Numeric literal whose value is negative",
/** 666 $efront_string_1e400 */ "1e400",
/** 667 $efront_string_1e_400 */ "1e+400",
/** 668 $efront_string_e_ */ "e+",
/** 669 $efront_string_e */ "e",
/** 670 $efront_string_0x */ "0x",
/** 671 $efront_string_u */ "u",
/** 672 $efront_string__u */ "\\u",
/** 673 $efront_string_2028 */ "2028",
/** 674 $efront_string_2029 */ "2029",
/** 675 $efront_string__35 */ "\\",
/** 676 $efront_string_n */ "n",
/** 677 $efront_string_r */ "r",
/** 678 $efront_regexp__$_3 */ /\/([^\/]*)$/,
/** 679 $efront_string__b */ "\\b",
/** 680 $efront_string__f */ "\\f",
/** 681 $efront_string__t */ "\\t",
/** 682 $efront_string_toUppe */ "toUpperCase",
/** 683 $efront_string_0000 */ "0000",
/** 684 $efront_string__0 */ "\\0",
/** 685 $efront_string__x0B */ "\\x0B",
/** 686 $efront_string__x */ "\\x",
/** 687 $efront_string_00 */ "00",
/** 688 $efront_string__36 */ "\\\\",
/** 689 $efront_string__n */ "\\n",
/** 690 $efront_string__r */ "\\r",
/** 691 $efront_string__u2028 */ "\\u2028",
/** 692 $efront_string__u2029 */ "\\u2029",
/** 693 $efront_string_Incorr */ /** text */ "Incorrectly classified character",
/** 694 $efront_string_double */ "double",
/** 695 $efront_string__37 */ "'",
/** 696 $efront_string_auto */ "auto",
/** 697 $efront_string_loc */ "loc",
/** 698 $efront_string_start */ "start",
/** 699 $efront_regexp__r_n_r */ /\r\n|[\r\n]/,
/** 700 $efront_string_MAX_VA */ "MAX_VALUE",
/** 701 $efront_string_Line */ "Line",
/** 702 $efront_regexp__n_r_ */ /[\n\r]/,
/** 703 $efront_string__38 */ "/*",
/** 704 $efront_string__39 */ "*/",
/** 705 $efront_regexp__n_g */ /\n/g,
/** 706 $efront_string__40 */ "(",
/** 707 $efront_string__41 */ ")",
/** 708 $efront_regexp__r_n_n */ /\r\n|\n/,
/** 709 $efront_string_conten */ "content",
/** 710 $efront_string_preced */ "precedence",
/** 711 $efront_string_maybeB */ "maybeBlock",
/** 712 $efront_string_genera5 */ "generateStatement",
/** 713 $efront_string_maybeB1 */ "maybeBlockSuffix",
/** 714 $efront_string_async */ "async",
/** 715 $efront_string_genera6 */ "generator",
/** 716 $efront_string_comput2 */ "computed",
/** 717 $efront_string_genera7 */ "generatePattern",
/** 718 $efront_string_genera8 */ "generateExpression",
/** 719 $efront_string_genera9 */ "generateFunctionParams",
/** 720 $efront_string_defaul1 */ "defaults",
/** 721 $efront_string_genera10 */ "generateAssignment",
/** 722 $efront_string__42 */ "=",
/** 723 $efront_string__43 */ "...",
/** 724 $efront_string_genera11 */ "generateFunctionBody",
/** 725 $efront_string__44 */ "=>",
/** 726 $efront_string__45 */ "{",
/** 727 $efront_string_genera12 */ "generateIterationForStatement",
/** 728 $efront_string_await */ "await",
/** 729 $efront_string_kind */ "kind",
/** 730 $efront_string_genera13 */ "generatePropertyKey",
/** 731 $efront_string__46 */ "[",
/** 732 $efront_string__47 */ "]",
/** 733 $efront_string_semico1 */ "semicolon",
/** 734 $efront_string__48 */ "}",
/** 735 $efront_string_break_ */ /** text */ "break ",
/** 736 $efront_string_contin1 */ /** text */ "continue ",
/** 737 $efront_string_guard */ "guard",
/** 738 $efront_string__if_ */ /** text */ " if ",
/** 739 $efront_string_Export4 */ "ExportBatchSpecifier",
/** 740 $efront_string_from */ "from",
/** 741 $efront_string_handle1 */ "handlers",
/** 742 $efront_string_guarde */ "guardedHandlers",
/** 743 $efront_string_defaul2 */ "default:",
/** 744 $efront_string_else_ */ /** text */ "else ",
/** 745 $efront_string_of */ "of",
/** 746 $efront_string_operat */ "operator",
/** 747 $efront_string__49 */ "?",
/** 748 $efront_string__50 */ "!--",
/** 749 $efront_string_option2 */ "optional",
/** 750 $efront_string__51 */ "?.",
/** 751 $efront_regexp__eExX_ */ /[eExX]/,
/** 752 $efront_string_delega */ "delegate",
/** 753 $efront_string_yield_ */ "yield*",
/** 754 $efront_string_all */ "all",
/** 755 $efront_string_await_ */ "await*",
/** 756 $efront_string_prefix */ "prefix",
/** 757 $efront_string__52 */ "[]",
/** 758 $efront_string_shorth */ "shorthand",
/** 759 $efront_string_method */ "method",
/** 760 $efront_string__53 */ "{}",
/** 761 $efront_string_as */ "as",
/** 762 $efront_string_regex */ "regex",
/** 763 $efront_string_patter */ "pattern",
/** 764 $efront_string_flags */ "flags",
/** 765 $efront_string_boolea */ "boolean",
/** 766 $efront_string__54 */ "`",
/** 767 $efront_string_$_ */ "${",
/** 768 $efront_string_import2 */ "import(",
/** 769 $efront_regexp__s_$_ */ /\s+$/,
/** 770 $efront_string_Unknow2 */ /** text */ "Unknown node type: ",
/** 771 $efront_string_browse */ "browser",
/** 772 $efront_string_source12 */ "sourceContent",
/** 773 $efront_string_genera14 */ "generate",
/** 774 $efront_string_Preced */ "Precedence",
/** 775 $efront_string_FORMAT */ "FORMAT_MINIFY",
/** 776 $efront_string_FORMAT1 */ "FORMAT_DEFAULTS",
/** 777 escodegen.js */ [1,24,504,22,81,124,23,505,15,506,393,582,109,235,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599,600,601,602,603,604,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,532,561,624,625,626,627,628,629,630,47,631,632,633,74,634,635,636,637,638,639,640,641,642,643,644,645,646,647,648,649,650,651,652,653,654,655,656,657,658,659,660,412,661,662,663,52,3,519,229,64,281,664,665,562,666,667,9,44,2,50,668,669,100,670,168,671,672,673,674,675,676,677,224,65,31,678,679,680,681,682,683,225,684,685,686,687,688,689,690,691,692,693,694,26,695,231,696,360,697,70,698,139,140,228,4,699,700,110,11,701,105,39,702,703,704,391,389,388,78,705,93,309,273,392,706,707,708,10,709,710,89,711,256,712,260,159,713,714,715,716,717,242,718,719,284,106,720,323,721,722,160,723,724,725,329,49,726,727,535,728,320,268,729,354,321,730,731,732,733,734,257,325,735,372,258,736,559,288,289,548,330,331,558,293,252,533,544,286,328,545,737,45,738,259,560,295,554,556,334,296,335,739,740,294,261,380,243,301,555,302,303,318,338,266,546,324,267,537,351,741,353,742,352,557,265,553,346,347,314,540,38,743,272,262,531,271,744,539,254,339,253,298,745,263,270,264,550,255,269,542,248,345,237,746,240,747,244,238,748,239,326,749,750,327,287,246,536,245,341,152,751,305,342,250,319,752,753,530,285,754,755,251,756,241,283,236,322,757,311,290,306,528,117,116,343,310,758,282,759,247,344,760,308,249,538,313,549,337,761,304,340,297,336,762,763,764,765,563,564,299,292,332,333,291,312,315,348,349,316,317,766,350,767,307,300,768,516,769,770,771,520,162,518,126,128,772,145,164,773,394,774,775,776,function(require, Object, RegExp, Error, Math, String, Array, Number, exports, global, $efront_string_Syntax, $efront_string_Expres1, $efront_string_hasOwn, $efront_string_type, $efront_string_Statem, $efront_string_Sequen1, $efront_string_Yield, $efront_string_Assign2, $efront_string_Condit1, $efront_string_ArrowF1, $efront_string_Logica1, $efront_string_Logica2, $efront_string_Bitwis, $efront_string_Bitwis1, $efront_string_Bitwis2, $efront_string_Equali, $efront_string_Relati, $efront_string_Bitwis3, $efront_string_Additi, $efront_string_Multip, $efront_string_Expone, $efront_string_Await, $efront_string_Unary, $efront_string_Postfi, $efront_string_Option, $efront_string_Call, $efront_string_New, $efront_string_Tagged1, $efront_string_Member1, $efront_string_Primar, $efront_string__11, $efront_string__12, $efront_string__13, $efront_string__14, $efront_string__15, $efront_string__16, $efront_string__17, $efront_string__18, $efront_string__19, $efront_string_is, $efront_string_isnt, $efront_string__20, $efront_string__21, $efront_string__22, $efront_string__23, $efront_string_in, $efront_string_instan, $efront_string__24, $efront_string__25, $efront_string__26, $efront_string__27, $efront_string__28, $efront_string__29, $efront_string__30, $efront_string__7, $efront_string__31, $efront_string_indent, $efront_string_base, $efront_string_parse, $efront_string_commen, $efront_string_format, $efront_string_style, $efront_string__32, $efront_string_adjust, $efront_string_newlin, $efront_string__33, $efront_string_space, $efront_string__34, $efront_string_json, $efront_string_renumb, $efront_string_hexade, $efront_string_quotes, $efront_string_single, $efront_string_escape1, $efront_string_compac, $efront_string_parent2, $efront_string_semico, $efront_string_safeCo, $efront_string_preser, $efront_string_moz, $efront_string_compre, $efront_string_starle, $efront_string_source8, $efront_string_source9, $efront_string_source10, $efront_string_direct, $efront_string_raw, $efront_string_verbat, $efront_string_source11, $efront_regexp__r_n_g, $efront_string_test, $efront_string_length, $efront_string_code, $efront_string_isLine, $efront_string_charCo, $efront_string_object, $efront_string_Numeri, $efront_string_Numeri1, $efront_string_null, $efront_string_1e400, $efront_string_1e_400, $efront_string_indexO, $efront_string__5, $efront_string_slice, $efront_string_replac, $efront_string_e_, $efront_string_e, $efront_string_floor, $efront_string_0x, $efront_string_toStri, $efront_string_u, $efront_string__u, $efront_string_2028, $efront_string_2029, $efront_string__35, $efront_string_n, $efront_string_r, $efront_string_fromCh, $efront_string_source, $efront_string_match, $efront_regexp__$_3, $efront_string__b, $efront_string__f, $efront_string__t, $efront_string_toUppe, $efront_string_0000, $efront_string_isDeci, $efront_string__0, $efront_string__x0B, $efront_string__x, $efront_string_00, $efront_string__36, $efront_string__n, $efront_string__r, $efront_string__u2028, $efront_string__u2029, $efront_string_Incorr, $efront_string_double, $efront_string__, $efront_string__37, $efront_string_isIden1, $efront_string_auto, $efront_string_isArra, $efront_string_loc, $efront_string_name, $efront_string_start, $efront_string_line, $efront_string_column, $efront_string_isWhit, $efront_string_split, $efront_regexp__r_n_r, $efront_string_MAX_VA, $efront_string_undefi, $efront_string_join, $efront_string_Line, $efront_string_value, $efront_string__2, $efront_regexp__n_r_, $efront_string__38, $efront_string__39, $efront_string_leadin, $efront_string_extend, $efront_string_range, $efront_string_substr1, $efront_regexp__n_g, $efront_string_push, $efront_string_Progra, $efront_string_body, $efront_string_traili1, $efront_string__40, $efront_string__41, $efront_regexp__r_n_n, $efront_string_string, $efront_string_conten, $efront_string_preced, $efront_string_protot, $efront_string_maybeB, $efront_string_BlockS, $efront_string_genera5, $efront_string_EmptyS, $efront_string__9, $efront_string_maybeB1, $efront_string_async, $efront_string_genera6, $efront_string_comput2, $efront_string_genera7, $efront_string_Identi, $efront_string_genera8, $efront_string_genera9, $efront_string_ArrowF, $efront_string_rest, $efront_string_defaul1, $efront_string_params, $efront_string_genera10, $efront_string__42, $efront_string__10, $efront_string__43, $efront_string_genera11, $efront_string__44, $efront_string_expres, $efront_string_charAt, $efront_string__45, $efront_string_genera12, $efront_string_for, $efront_string_await, $efront_string_left, $efront_string_Variab, $efront_string_kind, $efront_string_declar1, $efront_string_right, $efront_string_genera13, $efront_string__46, $efront_string__47, $efront_string_semico1, $efront_string__48, $efront_string_BreakS, $efront_string_label, $efront_string_break_, $efront_string_break, $efront_string_Contin, $efront_string_contin1, $efront_string_contin, $efront_string_ClassB, $efront_string_ClassD, $efront_string_class, $efront_string_id, $efront_string_superC, $efront_string_extend1, $efront_string_Direct, $efront_string_DoWhil, $efront_string_do, $efront_string_while, $efront_string_CatchC, $efront_string_param, $efront_string_catch, $efront_string_guard, $efront_string_splice, $efront_string__if_, $efront_string_Debugg, $efront_string_debugg, $efront_string_Export1, $efront_string_export2, $efront_string_defaul, $efront_string_declar, $efront_string_Export2, $efront_string_specif, $efront_string_Export4, $efront_string_from, $efront_string_Export, $efront_string_Expres, $efront_string_functi, $efront_string_Litera, $efront_string_Import1, $efront_string_import1, $efront_string_Import2, $efront_string_Import3, $efront_string_Variab1, $efront_string_init, $efront_string_ThrowS, $efront_string_throw, $efront_string_argume, $efront_string_TrySta, $efront_string_try, $efront_string_block, $efront_string_handle1, $efront_string_finali, $efront_string_guarde, $efront_string_handle, $efront_string_finall, $efront_string_Switch, $efront_string_switch, $efront_string_discri, $efront_string_cases, $efront_string_Switch1, $efront_string_case, $efront_string__1, $efront_string_defaul2, $efront_string_conseq, $efront_string_IfStat, $efront_string_if, $efront_string_altern, $efront_string_else_, $efront_string_else, $efront_string_ForSta, $efront_string_update, $efront_string_ForInS, $efront_string_ForOfS, $efront_string_of, $efront_string_Labele, $efront_string_Functi1, $efront_string_Return, $efront_string_return, $efront_string_WhileS, $efront_string_WithSt, $efront_string_with, $efront_string_Sequen, $efront_string_expres1, $efront_string_Assign, $efront_string_operat, $efront_string_Condit, $efront_string__49, $efront_string_Logica, $efront_string_Binary, $efront_string__50, $efront_string_CallEx, $efront_string_callee, $efront_string_option2, $efront_string__51, $efront_string_argume1, $efront_string_ChainE, $efront_string_NewExp, $efront_string_new, $efront_string_Member, $efront_string_proper, $efront_string_number, $efront_regexp__eExX_, $efront_string_MetaPr, $efront_string_meta, $efront_string_UnaryE, $efront_string_YieldE, $efront_string_delega, $efront_string_yield_, $efront_string_yield, $efront_string_AwaitE, $efront_string_all, $efront_string_await_, $efront_string_Update, $efront_string_prefix, $efront_string_Functi, $efront_string_ArrayP, $efront_string_ArrayE, $efront_string_elemen, $efront_string__52, $efront_string_RestEl, $efront_string_ClassE, $efront_string_Method, $efront_string_static, $efront_string_get, $efront_string_set, $efront_string_key, $efront_string_Proper, $efront_string_shorth, $efront_string_Assign1, $efront_string_method, $efront_string_Object, $efront_string_proper1, $efront_string__53, $efront_string_Object1, $efront_string_ThisEx, $efront_string_this, $efront_string_Super, $efront_string_super, $efront_string_local, $efront_string_as, $efront_string_Import4, $efront_string_import, $efront_string_Export3, $efront_string_export1, $efront_string_regex, $efront_string_patter, $efront_string_flags, $efront_string_boolea, $efront_string_true, $efront_string_false, $efront_string_Genera, $efront_string_Compre1, $efront_string_blocks, $efront_string_filter, $efront_string_Compre, $efront_string_Spread, $efront_string_Tagged, $efront_string_tag, $efront_string_quasi, $efront_string_Templa, $efront_string_Templa1, $efront_string__54, $efront_string_quasis, $efront_string_$_, $efront_string_Module, $efront_string_Import, $efront_string_import2, $efront_string_replac1, $efront_regexp__s_$_, $efront_string_Unknow2, $efront_string_browse, $efront_string_Source3, $efront_string_map, $efront_string_toStri1, $efront_string_file, $efront_string_source2, $efront_string_source12, $efront_string_setSou, $efront_string_versio, $efront_string_genera14, $efront_string_attach1, $efront_string_Preced, $efront_string_FORMAT, $efront_string_FORMAT1) {
    return function (_a, _b, _c, _d, _e, _f, Syntax, Precedence, BinaryPrecedence, SourceNode, estraverse, esutils, base, indent, json, renumber, hexadecimal, quotes, escapeless, newline, space, parentheses, semicolons, safeConcatenation, directive, extra, parse, sourceMap, sourceCode, preserveBlankLines, FORMAT_MINIFY, FORMAT_DEFAULTS, F_ALLOW_IN, F_ALLOW_CALL, F_ALLOW_UNPARATH_NEW, F_FUNC_BODY, F_DIRECTIVE_CTX, F_SEMICOLON_OPT, E_FTT, E_TTF, E_TTT, E_TFF, E_FFT, E_TFT, S_TFFF, S_TFFT, S_FFFF, S_TFTF, S_TTFF) {
        'use strict';
        function isExpression(node) {
            return CodeGenerator[$efront_string_Expres1][$efront_string_hasOwn](node[$efront_string_type])
        }
        function isStatement(node) {
            return CodeGenerator[$efront_string_Statem][$efront_string_hasOwn](node[$efront_string_type])
        }
        function getDefaultOptions() {
            var _a, _b, _c, _d;
            return _a = {}, _a[$efront_string_indent] = null, _a[$efront_string_base] = null, _a[$efront_string_parse] = null, _a[$efront_string_commen] = !1, _b = {}, _c = {}, _c[$efront_string_style] = $efront_string__32, _c[$efront_string_base] = 0, _c[$efront_string_adjust] = !1, _b[$efront_string_indent] = _c, _b[$efront_string_newlin] = $efront_string__33, _b[$efront_string_space] = $efront_string__34, _b[$efront_string_json] = !1, _b[$efront_string_renumb] = !1, _b[$efront_string_hexade] = !1, _b[$efront_string_quotes] = $efront_string_single, _b[$efront_string_escape1] = !1, _b[$efront_string_compac] = !1, _b[$efront_string_parent2] = !0, _b[$efront_string_semico] = !0, _b[$efront_string_safeCo] = !1, _b[$efront_string_preser] = !1, _a[$efront_string_format] = _b, _d = {}, _d[$efront_string_compre] = !1, _d[$efront_string_starle] = !1, _a[$efront_string_moz] = _d, _a[$efront_string_source8] = null, _a[$efront_string_source9] = null, _a[$efront_string_source10] = !1, _a[$efront_string_direct] = !1, _a[$efront_string_raw] = !0, _a[$efront_string_verbat] = null, _a[$efront_string_source11] = null, _a
        }
        function stringRepeat(str, num) {
            var result = '';
            for (num |= 0; num > 0; num >>>= 1, str += str)
                num & 1 && (result += str);
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
            for (key in override)
                override[$efront_string_hasOwn](key) && (target[key] = override[key]);
            return target
        }
        function updateDeeply(target, override) {
            function isHashObject(target) {
                return typeof target === $efront_string_object && target instanceof Object && !(target instanceof RegExp)
            }
            var key, val;
            for (key in override)
                override[$efront_string_hasOwn](key) && (val = override[key], isHashObject(val) ? isHashObject(target[key]) ? updateDeeply(target[key], val) : target[key] = updateDeeply({}, val) : target[key] = val);
            return target
        }
        function generateNumber(value) {
            var result, point, temp, exponent, pos;
            if (value !== value)
                throw new Error($efront_string_Numeri);
            if (value < 0 || value === 0 && 1 / value < 0)
                throw new Error($efront_string_Numeri1);
            if (value === 1 / 0)
                return json ? $efront_string_null : renumber ? $efront_string_1e400 : $efront_string_1e_400;
            if (result = '' + value, !renumber || result[$efront_string_length] < 3)
                return result;
            point = result[$efront_string_indexO]($efront_string__5), !json && result[$efront_string_charCo](0) === 48 && point === 1 && (point = 0, result = result[$efront_string_slice](1)), temp = result, result = result[$efront_string_replac]($efront_string_e_, $efront_string_e), exponent = 0, (pos = temp[$efront_string_indexO]($efront_string_e)) > 0 && (exponent = +temp[$efront_string_slice](pos + 1), temp = temp[$efront_string_slice](0, pos)), point >= 0 && (exponent -= temp[$efront_string_length] - point - 1, temp = +(temp[$efront_string_slice](0, point) + temp[$efront_string_slice](point + 1)) + ''), pos = 0;
            while (temp[$efront_string_charCo](temp[$efront_string_length] + pos - 1) === 48)
                --pos;
            return pos !== 0 && (exponent -= pos, temp = temp[$efront_string_slice](0, pos)), exponent !== 0 && (temp += $efront_string_e + exponent), (temp[$efront_string_length] < result[$efront_string_length] || hexadecimal && value > 1e12 && Math[$efront_string_floor](value) === value && (temp = $efront_string_0x + value[$efront_string_toStri](16))[$efront_string_length] < result[$efront_string_length]) && +temp === value && (result = temp), result
        }
        function escapeRegExpCharacter(ch, previousIsBackslash) {
            return (ch & -2) === 8232 ? (previousIsBackslash ? $efront_string_u : $efront_string__u) + (ch === 8232 ? $efront_string_2028 : $efront_string_2029) : ch === 10 || ch === 13 ? (previousIsBackslash ? '' : $efront_string__35) + (ch === 10 ? $efront_string_n : $efront_string_r) : String[$efront_string_fromCh](ch)
        }
        function generateRegExp(reg) {
            var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;
            if (result = reg[$efront_string_toStri](), reg[$efront_string_source]) {
                if (match = result[$efront_string_match]($efront_regexp__$_3), !match)
                    return result;
                for (flags = match[1], result = '', characterInBrack = !1, previousIsBackslash = !1, i = 0, iz = reg[$efront_string_source][$efront_string_length]; i < iz; ++i)
                    ch = reg[$efront_string_source][$efront_string_charCo](i), previousIsBackslash ? (result += escapeRegExpCharacter(ch, previousIsBackslash), previousIsBackslash = !1) : (characterInBrack ? ch === 93 && (characterInBrack = !1) : ch === 47 ? result += $efront_string__35 : ch === 91 && (characterInBrack = !0), result += escapeRegExpCharacter(ch, previousIsBackslash), previousIsBackslash = ch === 92);
                return $efront_string__7 + result + $efront_string__7 + flags
            }
            return result
        }
        function escapeAllowedCharacter(code, next) {
            var hex;
            return code === 8 ? $efront_string__b : code === 12 ? $efront_string__f : code === 9 ? $efront_string__t : (hex = code[$efront_string_toStri](16)[$efront_string_toUppe](), json || code > 255 ? $efront_string__u + $efront_string_0000[$efront_string_slice](hex[$efront_string_length]) + hex : code === 0 && !esutils[$efront_string_code][$efront_string_isDeci](next) ? $efront_string__0 : code === 11 ? $efront_string__x0B : $efront_string__x + $efront_string_00[$efront_string_slice](hex[$efront_string_length]) + hex)
        }
        function escapeDisallowedCharacter(code) {
            if (code === 92)
                return $efront_string__36;
            if (code === 10)
                return $efront_string__n;
            if (code === 13)
                return $efront_string__r;
            if (code === 8232)
                return $efront_string__u2028;
            if (code === 8233)
                return $efront_string__u2029;
            throw new Error($efront_string_Incorr)
        }
        function escapeDirective(str) {
            var i, iz, code, quote;
            for (quote = quotes === $efront_string_double ? $efront_string__ : $efront_string__37, i = 0, iz = str[$efront_string_length]; i < iz; ++i) {
                if (code = str[$efront_string_charCo](i), code === 39) {
                    quote = $efront_string__;
                    break
                }
                if (code === 34) {
                    quote = $efront_string__37;
                    break
                }
                code === 92 && ++i
            }
            return quote + str + quote
        }
        function escapeString(str) {
            var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;
            for (i = 0, len = str[$efront_string_length]; i < len; ++i) {
                if (code = str[$efront_string_charCo](i), code === 39)
                    ++singleQuotes;
                else if (code === 34)
                    ++doubleQuotes;
                else if (code === 47 && json)
                    result += $efront_string__35;
                else if (esutils[$efront_string_code][$efront_string_isLine](code) || code === 92) {
                    result += escapeDisallowedCharacter(code);
                    continue
                } else if (!esutils[$efront_string_code][$efront_string_isIden1](code) && (json && code < 32 || !(json || escapeless) && (code < 32 || code > 126))) {
                    result += escapeAllowedCharacter(code, str[$efront_string_charCo](i + 1));
                    continue
                }
                result += String[$efront_string_fromCh](code)
            }
            if (single = !(quotes === $efront_string_double || quotes === $efront_string_auto && doubleQuotes < singleQuotes), quote = single ? $efront_string__37 : $efront_string__, !(single ? singleQuotes : doubleQuotes))
                return quote + result + quote;
            for (str = result, result = quote, i = 0, len = str[$efront_string_length]; i < len; ++i)
                code = str[$efront_string_charCo](i), (code === 39 && single || code === 34 && !single) && (result += $efront_string__35), result += String[$efront_string_fromCh](code);
            return result + quote
        }
        function flattenToString(arr) {
            var i, iz, elem, result = '';
            for (i = 0, iz = arr[$efront_string_length]; i < iz; ++i)
                elem = arr[i], result += Array[$efront_string_isArra](elem) ? flattenToString(elem) : elem;
            return result
        }
        function toSourceNodeWhenNeeded(generated, node) {
            if (!sourceMap)
                return Array[$efront_string_isArra](generated) ? flattenToString(generated) : generated;
            if (node == null)
                if (generated instanceof SourceNode)
                    return generated;
                else
                    node = {};
            return node[$efront_string_loc] == null ? new SourceNode(null, null, sourceMap, generated, node[$efront_string_name] || null) : new SourceNode(node[$efront_string_loc][$efront_string_start][$efront_string_line], node[$efront_string_loc][$efront_string_start][$efront_string_column], sourceMap === !0 ? node[$efront_string_loc][$efront_string_source] || null : sourceMap, generated, node[$efront_string_name] || null)
        }
        function noEmptySpace() {
            return space ? space : $efront_string__34
        }
        function join(left, right) {
            var leftSource, rightSource, leftCharCode, rightCharCode;
            return leftSource = toSourceNodeWhenNeeded(left)[$efront_string_toStri](), leftSource[$efront_string_length] === 0 ? [right] : (rightSource = toSourceNodeWhenNeeded(right)[$efront_string_toStri](), rightSource[$efront_string_length] === 0 ? [left] : (leftCharCode = leftSource[$efront_string_charCo](leftSource[$efront_string_length] - 1), rightCharCode = rightSource[$efront_string_charCo](0), (leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils[$efront_string_code][$efront_string_isIden1](leftCharCode) && esutils[$efront_string_code][$efront_string_isIden1](rightCharCode) || leftCharCode === 47 && rightCharCode === 105 ? [
                left,
                noEmptySpace(),
                right
            ] : esutils[$efront_string_code][$efront_string_isWhit](leftCharCode) || esutils[$efront_string_code][$efront_string_isLine](leftCharCode) || esutils[$efront_string_code][$efront_string_isWhit](rightCharCode) || esutils[$efront_string_code][$efront_string_isLine](rightCharCode) ? [
                left,
                right
            ] : [
                left,
                space,
                right
            ]))
        }
        function addIndent(stmt) {
            return [
                base,
                stmt
            ]
        }
        function withIndent(fn) {
            var previousBase;
            previousBase = base, base += indent, fn(base), base = previousBase
        }
        function calculateSpaces(str) {
            var i;
            for (i = str[$efront_string_length] - 1; i >= 0; --i)
                if (esutils[$efront_string_code][$efront_string_isLine](str[$efront_string_charCo](i)))
                    break;
            return str[$efront_string_length] - 1 - i
        }
        function adjustMultilineComment(value, specialBase) {
            var array, i, len, line, j, spaces, previousBase, sn;
            for (array = value[$efront_string_split]($efront_regexp__r_n_r), spaces = Number[$efront_string_MAX_VA], i = 1, len = array[$efront_string_length]; i < len; ++i) {
                line = array[i], j = 0;
                while (j < line[$efront_string_length] && esutils[$efront_string_code][$efront_string_isWhit](line[$efront_string_charCo](j)))
                    ++j;
                spaces > j && (spaces = j)
            }
            for (typeof specialBase !== $efront_string_undefi ? (previousBase = base, array[1][spaces] === $efront_string__29 && (specialBase += $efront_string__34), base = specialBase) : (spaces & 1 && --spaces, previousBase = base), i = 1, len = array[$efront_string_length]; i < len; ++i)
                sn = toSourceNodeWhenNeeded(addIndent(array[i][$efront_string_slice](spaces))), array[i] = sourceMap ? sn[$efront_string_join]('') : sn;
            return base = previousBase, array[$efront_string_join]($efront_string__33)
        }
        function generateComment(comment, specialBase) {
            if (comment[$efront_string_type] === $efront_string_Line)
                if (endsWithLineTerminator(comment[$efront_string_value]))
                    return $efront_string__2 + comment[$efront_string_value];
                else {
                    var result = $efront_string__2 + comment[$efront_string_value];
                    return preserveBlankLines || (result += $efront_string__33), result
                }
            return extra[$efront_string_format][$efront_string_indent][$efront_string_adjust] && $efront_regexp__n_r_[$efront_string_test](comment[$efront_string_value]) ? adjustMultilineComment($efront_string__38 + comment[$efront_string_value] + $efront_string__39, specialBase) : $efront_string__38 + comment[$efront_string_value] + $efront_string__39
        }
        function addComments(stmt, result) {
            var i, len, comment, save, tailingToStatement, specialBase, fragment, extRange, range, prevRange, prefix, infix, suffix, count;
            if (stmt[$efront_string_leadin] && stmt[$efront_string_leadin][$efront_string_length] > 0) {
                if (save = result, preserveBlankLines) {
                    for (comment = stmt[$efront_string_leadin][0], result = [], extRange = comment[$efront_string_extend], range = comment[$efront_string_range], prefix = sourceCode[$efront_string_substr1](extRange[0], range[0]), count = (prefix[$efront_string_match]($efront_regexp__n_g) || [])[$efront_string_length], count > 0 ? (result[$efront_string_push](stringRepeat($efront_string__33, count)), result[$efront_string_push](addIndent(generateComment(comment)))) : (result[$efront_string_push](prefix), result[$efront_string_push](generateComment(comment))), prevRange = range, i = 1, len = stmt[$efront_string_leadin][$efront_string_length]; i < len; i++)
                        comment = stmt[$efront_string_leadin][i], range = comment[$efront_string_range], infix = sourceCode[$efront_string_substr1](prevRange[1], range[0]), count = (infix[$efront_string_match]($efront_regexp__n_g) || [])[$efront_string_length], result[$efront_string_push](stringRepeat($efront_string__33, count)), result[$efront_string_push](addIndent(generateComment(comment))), prevRange = range;
                    suffix = sourceCode[$efront_string_substr1](range[1], extRange[1]), count = (suffix[$efront_string_match]($efront_regexp__n_g) || [])[$efront_string_length], result[$efront_string_push](stringRepeat($efront_string__33, count))
                } else
                    for (comment = stmt[$efront_string_leadin][0], result = [], safeConcatenation && stmt[$efront_string_type] === Syntax[$efront_string_Progra] && stmt[$efront_string_body][$efront_string_length] === 0 && result[$efront_string_push]($efront_string__33), result[$efront_string_push](generateComment(comment)), endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]()) || result[$efront_string_push]($efront_string__33), i = 1, len = stmt[$efront_string_leadin][$efront_string_length]; i < len; ++i)
                        comment = stmt[$efront_string_leadin][i], fragment = [generateComment(comment)], endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]()) || fragment[$efront_string_push]($efront_string__33), result[$efront_string_push](addIndent(fragment));
                result[$efront_string_push](addIndent(save))
            }
            if (stmt[$efront_string_traili1])
                if (preserveBlankLines)
                    comment = stmt[$efront_string_traili1][0], extRange = comment[$efront_string_extend], range = comment[$efront_string_range], prefix = sourceCode[$efront_string_substr1](extRange[0], range[0]), count = (prefix[$efront_string_match]($efront_regexp__n_g) || [])[$efront_string_length], count > 0 ? (result[$efront_string_push](stringRepeat($efront_string__33, count)), result[$efront_string_push](addIndent(generateComment(comment)))) : (result[$efront_string_push](prefix), result[$efront_string_push](generateComment(comment)));
                else
                    for (tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]()), specialBase = stringRepeat($efront_string__34, calculateSpaces(toSourceNodeWhenNeeded([
                            base,
                            result,
                            indent
                        ])[$efront_string_toStri]())), i = 0, len = stmt[$efront_string_traili1][$efront_string_length]; i < len; ++i)
                        comment = stmt[$efront_string_traili1][i], tailingToStatement ? (i === 0 ? result = [
                            result,
                            indent
                        ] : result = [
                            result,
                            specialBase
                        ], result[$efront_string_push](generateComment(comment, specialBase))) : result = [
                            result,
                            addIndent(generateComment(comment))
                        ], i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]()) && (result = [
                            result,
                            $efront_string__33
                        ]);
            return result
        }
        function generateBlankLines(start, end, result) {
            var j, newlineCount = 0;
            for (j = start; j < end; j++)
                sourceCode[j] === $efront_string__33 && newlineCount++;
            for (j = 1; j < newlineCount; j++)
                result[$efront_string_push](newline)
        }
        function parenthesize(text, current, should) {
            return current < should ? [
                $efront_string__40,
                text,
                $efront_string__41
            ] : text
        }
        function generateVerbatimString(string) {
            var i, iz, result;
            for (result = string[$efront_string_split]($efront_regexp__r_n_n), i = 1, iz = result[$efront_string_length]; i < iz; i++)
                result[i] = newline + base + result[i];
            return result
        }
        function generateVerbatim(expr, precedence) {
            var verbatim, result, prec;
            return verbatim = expr[extra[$efront_string_verbat]], typeof verbatim === $efront_string_string ? result = parenthesize(generateVerbatimString(verbatim), Precedence[$efront_string_Sequen1], precedence) : (result = generateVerbatimString(verbatim[$efront_string_conten]), prec = verbatim[$efront_string_preced] != null ? verbatim[$efront_string_preced] : Precedence[$efront_string_Sequen1], result = parenthesize(result, prec, precedence)), toSourceNodeWhenNeeded(result, expr)
        }
        function CodeGenerator() {
        }
        function generateIdentifier(node) {
            return toSourceNodeWhenNeeded(node[$efront_string_name], node)
        }
        function generateAsyncPrefix(node, spaceRequired) {
            return node[$efront_string_async] ? $efront_string_async + (spaceRequired ? noEmptySpace() : space) : ''
        }
        function generateStarSuffix(node) {
            var isGenerator = node[$efront_string_genera6] && !extra[$efront_string_moz][$efront_string_starle];
            return isGenerator ? $efront_string__29 + space : ''
        }
        function generateMethodPrefix(prop) {
            var func = prop[$efront_string_value], prefix = '';
            return func[$efront_string_async] && (prefix += generateAsyncPrefix(func, !prop[$efront_string_comput2])), func[$efront_string_genera6] && (prefix += generateStarSuffix(func) ? $efront_string__29 : ''), prefix
        }
        function generateInternal(node) {
            var codegen;
            if (codegen = new CodeGenerator, isStatement(node))
                return codegen[$efront_string_genera5](node, S_TFFF);
            if (isExpression(node))
                return codegen[$efront_string_genera8](node, Precedence[$efront_string_Sequen1], E_TTT);
            throw new Error($efront_string_Unknow2 + node[$efront_string_type])
        }
        function generate(node, options) {
            var _a, _b, defaultOptions = getDefaultOptions(), result, pair;
            return options != null ? (typeof options[$efront_string_indent] === $efront_string_string && (defaultOptions[$efront_string_format][$efront_string_indent][$efront_string_style] = options[$efront_string_indent]), typeof options[$efront_string_base] === $efront_string_number && (defaultOptions[$efront_string_format][$efront_string_indent][$efront_string_base] = options[$efront_string_base]), options = updateDeeply(defaultOptions, options), indent = options[$efront_string_format][$efront_string_indent][$efront_string_style], typeof options[$efront_string_base] === $efront_string_string ? base = options[$efront_string_base] : base = stringRepeat(indent, options[$efront_string_format][$efront_string_indent][$efront_string_base])) : (options = defaultOptions, indent = options[$efront_string_format][$efront_string_indent][$efront_string_style], base = stringRepeat(indent, options[$efront_string_format][$efront_string_indent][$efront_string_base])), json = options[$efront_string_format][$efront_string_json], renumber = options[$efront_string_format][$efront_string_renumb], hexadecimal = json ? !1 : options[$efront_string_format][$efront_string_hexade], quotes = json ? $efront_string_double : options[$efront_string_format][$efront_string_quotes], escapeless = options[$efront_string_format][$efront_string_escape1], newline = options[$efront_string_format][$efront_string_newlin], space = options[$efront_string_format][$efront_string_space], options[$efront_string_format][$efront_string_compac] && (newline = space = indent = base = ''), parentheses = options[$efront_string_format][$efront_string_parent2], semicolons = options[$efront_string_format][$efront_string_semico], safeConcatenation = options[$efront_string_format][$efront_string_safeCo], directive = options[$efront_string_direct], parse = json ? null : options[$efront_string_parse], sourceMap = options[$efront_string_source8], sourceCode = options[$efront_string_source11], preserveBlankLines = options[$efront_string_format][$efront_string_preser] && sourceCode !== null, extra = options, sourceMap && (exports[$efront_string_browse] ? SourceNode = global[$efront_string_source8][$efront_string_Source3] : SourceNode = require(580)[$efront_string_Source3]), result = generateInternal(node), sourceMap ? (pair = result[$efront_string_toStri1]((_b = {}, _b[$efront_string_file] = options[$efront_string_file], _b[$efront_string_source2] = options[$efront_string_source9], _b)), options[$efront_string_source12] && pair[$efront_string_map][$efront_string_setSou](options[$efront_string_source8], options[$efront_string_source12]), options[$efront_string_source10] ? pair : pair[$efront_string_map][$efront_string_toStri]()) : (_a = {}, _a[$efront_string_code] = result[$efront_string_toStri](), _a[$efront_string_map] = null, pair = _a, options[$efront_string_source10] ? pair : pair[$efront_string_code])
        }
        estraverse = require(503), esutils = require(581), Syntax = estraverse[$efront_string_Syntax], _a = {}, _a[$efront_string_Sequen1] = 0, _a[$efront_string_Yield] = 1, _a[$efront_string_Assign2] = 1, _a[$efront_string_Condit1] = 2, _a[$efront_string_ArrowF1] = 2, _a[$efront_string_Logica1] = 3, _a[$efront_string_Logica2] = 4, _a[$efront_string_Bitwis] = 5, _a[$efront_string_Bitwis1] = 6, _a[$efront_string_Bitwis2] = 7, _a[$efront_string_Equali] = 8, _a[$efront_string_Relati] = 9, _a[$efront_string_Bitwis3] = 10, _a[$efront_string_Additi] = 11, _a[$efront_string_Multip] = 12, _a[$efront_string_Expone] = 13, _a[$efront_string_Await] = 14, _a[$efront_string_Unary] = 14, _a[$efront_string_Postfi] = 15, _a[$efront_string_Option] = 16, _a[$efront_string_Call] = 17, _a[$efront_string_New] = 18, _a[$efront_string_Tagged1] = 19, _a[$efront_string_Member1] = 20, _a[$efront_string_Primar] = 21, Precedence = _a, _b = {}, _b[$efront_string__11] = Precedence[$efront_string_Logica1], _b[$efront_string__12] = Precedence[$efront_string_Logica2], _b[$efront_string__13] = Precedence[$efront_string_Bitwis], _b[$efront_string__14] = Precedence[$efront_string_Bitwis1], _b[$efront_string__15] = Precedence[$efront_string_Bitwis2], _b[$efront_string__16] = Precedence[$efront_string_Equali], _b[$efront_string__17] = Precedence[$efront_string_Equali], _b[$efront_string__18] = Precedence[$efront_string_Equali], _b[$efront_string__19] = Precedence[$efront_string_Equali], _b[$efront_string_is] = Precedence[$efront_string_Equali], _b[$efront_string_isnt] = Precedence[$efront_string_Equali], _b[$efront_string__20] = Precedence[$efront_string_Relati], _b[$efront_string__21] = Precedence[$efront_string_Relati], _b[$efront_string__22] = Precedence[$efront_string_Relati], _b[$efront_string__23] = Precedence[$efront_string_Relati], _b[$efront_string_in] = Precedence[$efront_string_Relati], _b[$efront_string_instan] = Precedence[$efront_string_Relati], _b[$efront_string__24] = Precedence[$efront_string_Bitwis3], _b[$efront_string__25] = Precedence[$efront_string_Bitwis3], _b[$efront_string__26] = Precedence[$efront_string_Bitwis3], _b[$efront_string__27] = Precedence[$efront_string_Additi], _b[$efront_string__28] = Precedence[$efront_string_Additi], _b[$efront_string__29] = Precedence[$efront_string_Multip], _b[$efront_string__30] = Precedence[$efront_string_Multip], _b[$efront_string__7] = Precedence[$efront_string_Multip], _b[$efront_string__31] = Precedence[$efront_string_Expone], BinaryPrecedence = _b, F_ALLOW_IN = 1, F_ALLOW_CALL = 2, F_ALLOW_UNPARATH_NEW = 4, F_FUNC_BODY = 8, F_DIRECTIVE_CTX = 16, F_SEMICOLON_OPT = 32, E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TTF = F_ALLOW_IN | F_ALLOW_CALL, E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TFF = F_ALLOW_IN, E_FFT = F_ALLOW_UNPARATH_NEW, E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW, S_TFFF = F_ALLOW_IN, S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT, S_FFFF = 0, S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX, S_TTFF = F_ALLOW_IN | F_FUNC_BODY, CodeGenerator[$efront_string_protot][$efront_string_maybeB] = function (stmt, flags) {
            var result, noLeadingComment, that = this;
            return noLeadingComment = !extra[$efront_string_commen] || !stmt[$efront_string_leadin], stmt[$efront_string_type] === Syntax[$efront_string_BlockS] && noLeadingComment ? [
                space,
                this[$efront_string_genera5](stmt, flags)
            ] : stmt[$efront_string_type] === Syntax[$efront_string_EmptyS] && noLeadingComment ? $efront_string__9 : (withIndent(function () {
                result = [
                    newline,
                    addIndent(that[$efront_string_genera5](stmt, flags))
                ]
            }), result)
        }, CodeGenerator[$efront_string_protot][$efront_string_maybeB1] = function (stmt, result) {
            var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]());
            return stmt[$efront_string_type] === Syntax[$efront_string_BlockS] && !(extra[$efront_string_commen] && stmt[$efront_string_leadin]) && !ends ? [
                result,
                space
            ] : ends ? [
                result,
                base
            ] : [
                result,
                newline,
                base
            ]
        }, CodeGenerator[$efront_string_protot][$efront_string_genera7] = function (node, precedence, flags) {
            return node[$efront_string_type] === Syntax[$efront_string_Identi] ? generateIdentifier(node) : this[$efront_string_genera8](node, precedence, flags)
        }, CodeGenerator[$efront_string_protot][$efront_string_genera9] = function (node) {
            var i, iz, result, hasDefault;
            if (hasDefault = !1, node[$efront_string_type] === Syntax[$efront_string_ArrowF] && !node[$efront_string_rest] && (!node[$efront_string_defaul1] || node[$efront_string_defaul1][$efront_string_length] === 0) && node[$efront_string_params][$efront_string_length] === 1 && node[$efront_string_params][0][$efront_string_type] === Syntax[$efront_string_Identi])
                result = [
                    generateAsyncPrefix(node, !0),
                    generateIdentifier(node[$efront_string_params][0])
                ];
            else {
                for (result = node[$efront_string_type] === Syntax[$efront_string_ArrowF] ? [generateAsyncPrefix(node, !1)] : [], result[$efront_string_push]($efront_string__40), node[$efront_string_defaul1] && (hasDefault = !0), i = 0, iz = node[$efront_string_params][$efront_string_length]; i < iz; ++i)
                    hasDefault && node[$efront_string_defaul1][i] ? result[$efront_string_push](this[$efront_string_genera10](node[$efront_string_params][i], node[$efront_string_defaul1][i], $efront_string__42, Precedence[$efront_string_Assign2], E_TTT)) : result[$efront_string_push](this[$efront_string_genera7](node[$efront_string_params][i], Precedence[$efront_string_Assign2], E_TTT)), i + 1 < iz && result[$efront_string_push]($efront_string__10 + space);
                node[$efront_string_rest] && (node[$efront_string_params][$efront_string_length] && result[$efront_string_push]($efront_string__10 + space), result[$efront_string_push]($efront_string__43), result[$efront_string_push](generateIdentifier(node[$efront_string_rest]))), result[$efront_string_push]($efront_string__41)
            }
            return result
        }, CodeGenerator[$efront_string_protot][$efront_string_genera11] = function (node) {
            var result, expr;
            return result = this[$efront_string_genera9](node), node[$efront_string_type] === Syntax[$efront_string_ArrowF] && (result[$efront_string_push](space), result[$efront_string_push]($efront_string__44)), node[$efront_string_expres] ? (result[$efront_string_push](space), expr = this[$efront_string_genera8](node[$efront_string_body], Precedence[$efront_string_Assign2], E_TTT), expr[$efront_string_toStri]()[$efront_string_charAt](0) === $efront_string__45 && (expr = [
                $efront_string__40,
                expr,
                $efront_string__41
            ]), result[$efront_string_push](expr)) : result[$efront_string_push](this[$efront_string_maybeB](node[$efront_string_body], S_TTFF)), result
        }, CodeGenerator[$efront_string_protot][$efront_string_genera12] = function (operator, stmt, flags) {
            var result = [$efront_string_for + (stmt[$efront_string_await] ? noEmptySpace() + $efront_string_await : '') + space + $efront_string__40], that = this;
            return withIndent(function () {
                stmt[$efront_string_left][$efront_string_type] === Syntax[$efront_string_Variab] ? withIndent(function () {
                    result[$efront_string_push](stmt[$efront_string_left][$efront_string_kind] + noEmptySpace()), result[$efront_string_push](that[$efront_string_genera5](stmt[$efront_string_left][$efront_string_declar1][0], S_FFFF))
                }) : result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_left], Precedence[$efront_string_Call], E_TTT)), result = join(result, operator), result = [
                    join(result, that[$efront_string_genera8](stmt[$efront_string_right], Precedence[$efront_string_Assign2], E_TTT)),
                    $efront_string__41
                ]
            }), result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_body], flags)), result
        }, CodeGenerator[$efront_string_protot][$efront_string_genera13] = function (expr, computed) {
            var result = [];
            return computed && result[$efront_string_push]($efront_string__46), result[$efront_string_push](this[$efront_string_genera8](expr, Precedence[$efront_string_Assign2], E_TTT)), computed && result[$efront_string_push]($efront_string__47), result
        }, CodeGenerator[$efront_string_protot][$efront_string_genera10] = function (left, right, operator, precedence, flags) {
            return Precedence[$efront_string_Assign2] < precedence && (flags |= F_ALLOW_IN), parenthesize([
                this[$efront_string_genera8](left, Precedence[$efront_string_Call], flags),
                space + operator + space,
                this[$efront_string_genera8](right, Precedence[$efront_string_Assign2], flags)
            ], Precedence[$efront_string_Assign2], precedence)
        }, CodeGenerator[$efront_string_protot][$efront_string_semico1] = function (flags) {
            return !semicolons && flags & F_SEMICOLON_OPT ? '' : $efront_string__9
        }, _c = {}, _c[$efront_string_BlockS] = function (stmt, flags) {
            var range, content, result = [
                    $efront_string__45,
                    newline
                ], that = this;
            return withIndent(function () {
                stmt[$efront_string_body][$efront_string_length] === 0 && preserveBlankLines && (range = stmt[$efront_string_range], range[1] - range[0] > 2) && (content = sourceCode[$efront_string_substr1](range[0] + 1, range[1] - 1), content[0] === $efront_string__33 && (result = [$efront_string__45]), result[$efront_string_push](content));
                var i, iz, fragment, bodyFlags;
                for (bodyFlags = S_TFFF, flags & F_FUNC_BODY && (bodyFlags |= F_DIRECTIVE_CTX), i = 0, iz = stmt[$efront_string_body][$efront_string_length]; i < iz; ++i)
                    preserveBlankLines && (i === 0 && (stmt[$efront_string_body][0][$efront_string_leadin] && (range = stmt[$efront_string_body][0][$efront_string_leadin][0][$efront_string_extend], content = sourceCode[$efront_string_substr1](range[0], range[1]), content[0] === $efront_string__33 && (result = [$efront_string__45])), stmt[$efront_string_body][0][$efront_string_leadin] || generateBlankLines(stmt[$efront_string_range][0], stmt[$efront_string_body][0][$efront_string_range][0], result)), i > 0 && !(stmt[$efront_string_body][i - 1][$efront_string_traili1] || stmt[$efront_string_body][i][$efront_string_leadin]) && generateBlankLines(stmt[$efront_string_body][i - 1][$efront_string_range][1], stmt[$efront_string_body][i][$efront_string_range][0], result)), i === iz - 1 && (bodyFlags |= F_SEMICOLON_OPT), stmt[$efront_string_body][i][$efront_string_leadin] && preserveBlankLines ? fragment = that[$efront_string_genera5](stmt[$efront_string_body][i], bodyFlags) : fragment = addIndent(that[$efront_string_genera5](stmt[$efront_string_body][i], bodyFlags)), result[$efront_string_push](fragment), endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]()) || (preserveBlankLines && i < iz - 1 ? stmt[$efront_string_body][i + 1][$efront_string_leadin] || result[$efront_string_push](newline) : result[$efront_string_push](newline)), preserveBlankLines && i === iz - 1 && (stmt[$efront_string_body][i][$efront_string_traili1] || generateBlankLines(stmt[$efront_string_body][i][$efront_string_range][1], stmt[$efront_string_range][1], result))
            }), result[$efront_string_push](addIndent($efront_string__48)), result
        }, _c[$efront_string_BreakS] = function (stmt, flags) {
            return stmt[$efront_string_label] ? $efront_string_break_ + stmt[$efront_string_label][$efront_string_name] + this[$efront_string_semico1](flags) : $efront_string_break + this[$efront_string_semico1](flags)
        }, _c[$efront_string_Contin] = function (stmt, flags) {
            return stmt[$efront_string_label] ? $efront_string_contin1 + stmt[$efront_string_label][$efront_string_name] + this[$efront_string_semico1](flags) : $efront_string_contin + this[$efront_string_semico1](flags)
        }, _c[$efront_string_ClassB] = function (stmt, flags) {
            var result = [
                    $efront_string__45,
                    newline
                ], that = this;
            return withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = stmt[$efront_string_body][$efront_string_length]; i < iz; ++i)
                    result[$efront_string_push](indent), result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_body][i], Precedence[$efront_string_Sequen1], E_TTT)), i + 1 < iz && result[$efront_string_push](newline)
            }), endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]()) || result[$efront_string_push](newline), result[$efront_string_push](base), result[$efront_string_push]($efront_string__48), result
        }, _c[$efront_string_ClassD] = function (stmt, flags) {
            var result, fragment;
            return result = [$efront_string_class], stmt[$efront_string_id] && (result = join(result, this[$efront_string_genera8](stmt[$efront_string_id], Precedence[$efront_string_Sequen1], E_TTT))), stmt[$efront_string_superC] && (fragment = join($efront_string_extend1, this[$efront_string_genera8](stmt[$efront_string_superC], Precedence[$efront_string_Unary], E_TTT)), result = join(result, fragment)), result[$efront_string_push](space), result[$efront_string_push](this[$efront_string_genera5](stmt[$efront_string_body], S_TFFT)), result
        }, _c[$efront_string_Direct] = function (stmt, flags) {
            return extra[$efront_string_raw] && stmt[$efront_string_raw] ? stmt[$efront_string_raw] + this[$efront_string_semico1](flags) : escapeDirective(stmt[$efront_string_direct]) + this[$efront_string_semico1](flags)
        }, _c[$efront_string_DoWhil] = function (stmt, flags) {
            var result = join($efront_string_do, this[$efront_string_maybeB](stmt[$efront_string_body], S_TFFF));
            return result = this[$efront_string_maybeB1](stmt[$efront_string_body], result), join(result, [
                $efront_string_while + space + $efront_string__40,
                this[$efront_string_genera8](stmt[$efront_string_test], Precedence[$efront_string_Sequen1], E_TTT),
                $efront_string__41 + this[$efront_string_semico1](flags)
            ])
        }, _c[$efront_string_CatchC] = function (stmt, flags) {
            var result, that = this;
            return withIndent(function () {
                var guard;
                stmt[$efront_string_param] ? (result = [
                    $efront_string_catch + space + $efront_string__40,
                    that[$efront_string_genera8](stmt[$efront_string_param], Precedence[$efront_string_Sequen1], E_TTT),
                    $efront_string__41
                ], stmt[$efront_string_guard] && (guard = that[$efront_string_genera8](stmt[$efront_string_guard], Precedence[$efront_string_Sequen1], E_TTT), result[$efront_string_splice](2, 0, $efront_string__if_, guard))) : result = [$efront_string_catch]
            }), result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_body], S_TFFF)), result
        }, _c[$efront_string_Debugg] = function (stmt, flags) {
            return $efront_string_debugg + this[$efront_string_semico1](flags)
        }, _c[$efront_string_EmptyS] = function (stmt, flags) {
            return $efront_string__9
        }, _c[$efront_string_Export1] = function (stmt, flags) {
            var result = [$efront_string_export2], bodyFlags;
            return bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF, result = join(result, $efront_string_defaul), isStatement(stmt[$efront_string_declar]) ? result = join(result, this[$efront_string_genera5](stmt[$efront_string_declar], bodyFlags)) : result = join(result, this[$efront_string_genera8](stmt[$efront_string_declar], Precedence[$efront_string_Assign2], E_TTT) + this[$efront_string_semico1](flags)), result
        }, _c[$efront_string_Export2] = function (stmt, flags) {
            var result = [$efront_string_export2], bodyFlags, that = this;
            return bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF, stmt[$efront_string_declar] ? join(result, this[$efront_string_genera5](stmt[$efront_string_declar], bodyFlags)) : (stmt[$efront_string_specif] && (stmt[$efront_string_specif][$efront_string_length] === 0 ? result = join(result, $efront_string__45 + space + $efront_string__48) : stmt[$efront_string_specif][0][$efront_string_type] === Syntax[$efront_string_Export4] ? result = join(result, this[$efront_string_genera8](stmt[$efront_string_specif][0], Precedence[$efront_string_Sequen1], E_TTT)) : (result = join(result, $efront_string__45), withIndent(function (indent) {
                var i, iz;
                for (result[$efront_string_push](newline), i = 0, iz = stmt[$efront_string_specif][$efront_string_length]; i < iz; ++i)
                    result[$efront_string_push](indent), result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_specif][i], Precedence[$efront_string_Sequen1], E_TTT)), i + 1 < iz && result[$efront_string_push]($efront_string__10 + newline)
            }), endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]()) || result[$efront_string_push](newline), result[$efront_string_push](base + $efront_string__48)), stmt[$efront_string_source] ? result = join(result, [
                $efront_string_from + space,
                this[$efront_string_genera8](stmt[$efront_string_source], Precedence[$efront_string_Sequen1], E_TTT),
                this[$efront_string_semico1](flags)
            ]) : result[$efront_string_push](this[$efront_string_semico1](flags))), result)
        }, _c[$efront_string_Export] = function (stmt, flags) {
            return [
                $efront_string_export2 + space,
                $efront_string__29 + space,
                $efront_string_from + space,
                this[$efront_string_genera8](stmt[$efront_string_source], Precedence[$efront_string_Sequen1], E_TTT),
                this[$efront_string_semico1](flags)
            ]
        }, _c[$efront_string_Expres] = function (stmt, flags) {
            function isClassPrefixed(fragment) {
                var code;
                return fragment[$efront_string_slice](0, 5) !== $efront_string_class ? !1 : (code = fragment[$efront_string_charCo](5), code === 123 || esutils[$efront_string_code][$efront_string_isWhit](code) || esutils[$efront_string_code][$efront_string_isLine](code))
            }
            function isFunctionPrefixed(fragment) {
                var code;
                return fragment[$efront_string_slice](0, 8) !== $efront_string_functi ? !1 : (code = fragment[$efront_string_charCo](8), code === 40 || esutils[$efront_string_code][$efront_string_isWhit](code) || code === 42 || esutils[$efront_string_code][$efront_string_isLine](code))
            }
            function isAsyncPrefixed(fragment) {
                var code, i, iz;
                if (fragment[$efront_string_slice](0, 5) !== $efront_string_async)
                    return !1;
                if (!esutils[$efront_string_code][$efront_string_isWhit](fragment[$efront_string_charCo](5)))
                    return !1;
                for (i = 6, iz = fragment[$efront_string_length]; i < iz; ++i)
                    if (!esutils[$efront_string_code][$efront_string_isWhit](fragment[$efront_string_charCo](i)))
                        break;
                return i === iz ? !1 : fragment[$efront_string_slice](i, i + 8) !== $efront_string_functi ? !1 : (code = fragment[$efront_string_charCo](i + 8), code === 40 || esutils[$efront_string_code][$efront_string_isWhit](code) || code === 42 || esutils[$efront_string_code][$efront_string_isLine](code))
            }
            var result, fragment;
            return result = [this[$efront_string_genera8](stmt[$efront_string_expres], Precedence[$efront_string_Sequen1], E_TTT)], fragment = toSourceNodeWhenNeeded(result)[$efront_string_toStri](), fragment[$efront_string_charCo](0) === 123 || isClassPrefixed(fragment) || isFunctionPrefixed(fragment) || isAsyncPrefixed(fragment) || directive && flags & F_DIRECTIVE_CTX && stmt[$efront_string_expres][$efront_string_type] === Syntax[$efront_string_Litera] && typeof stmt[$efront_string_expres][$efront_string_value] === $efront_string_string ? result = [
                $efront_string__40,
                result,
                $efront_string__41 + this[$efront_string_semico1](flags)
            ] : result[$efront_string_push](this[$efront_string_semico1](flags)), result
        }, _c[$efront_string_Import1] = function (stmt, flags) {
            var result, cursor, that = this;
            return stmt[$efront_string_specif][$efront_string_length] === 0 ? [
                $efront_string_import1,
                space,
                this[$efront_string_genera8](stmt[$efront_string_source], Precedence[$efront_string_Sequen1], E_TTT),
                this[$efront_string_semico1](flags)
            ] : (result = [$efront_string_import1], cursor = 0, stmt[$efront_string_specif][cursor][$efront_string_type] === Syntax[$efront_string_Import2] && (result = join(result, [this[$efront_string_genera8](stmt[$efront_string_specif][cursor], Precedence[$efront_string_Sequen1], E_TTT)]), ++cursor), stmt[$efront_string_specif][cursor] && (cursor !== 0 && result[$efront_string_push]($efront_string__10), stmt[$efront_string_specif][cursor][$efront_string_type] === Syntax[$efront_string_Import3] ? result = join(result, [
                space,
                this[$efront_string_genera8](stmt[$efront_string_specif][cursor], Precedence[$efront_string_Sequen1], E_TTT)
            ]) : (result[$efront_string_push](space + $efront_string__45), stmt[$efront_string_specif][$efront_string_length] - cursor === 1 ? (result[$efront_string_push](space), result[$efront_string_push](this[$efront_string_genera8](stmt[$efront_string_specif][cursor], Precedence[$efront_string_Sequen1], E_TTT)), result[$efront_string_push](space + $efront_string__48 + space)) : (withIndent(function (indent) {
                var i, iz;
                for (result[$efront_string_push](newline), i = cursor, iz = stmt[$efront_string_specif][$efront_string_length]; i < iz; ++i)
                    result[$efront_string_push](indent), result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_specif][i], Precedence[$efront_string_Sequen1], E_TTT)), i + 1 < iz && result[$efront_string_push]($efront_string__10 + newline)
            }), endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]()) || result[$efront_string_push](newline), result[$efront_string_push](base + $efront_string__48 + space)))), result = join(result, [
                $efront_string_from + space,
                this[$efront_string_genera8](stmt[$efront_string_source], Precedence[$efront_string_Sequen1], E_TTT),
                this[$efront_string_semico1](flags)
            ]), result)
        }, _c[$efront_string_Variab1] = function (stmt, flags) {
            var itemFlags = flags & F_ALLOW_IN ? E_TTT : E_FTT;
            return stmt[$efront_string_init] ? [
                this[$efront_string_genera8](stmt[$efront_string_id], Precedence[$efront_string_Assign2], itemFlags),
                space,
                $efront_string__42,
                space,
                this[$efront_string_genera8](stmt[$efront_string_init], Precedence[$efront_string_Assign2], itemFlags)
            ] : this[$efront_string_genera7](stmt[$efront_string_id], Precedence[$efront_string_Assign2], itemFlags)
        }, _c[$efront_string_Variab] = function (stmt, flags) {
            function block() {
                for (node = stmt[$efront_string_declar1][0], extra[$efront_string_commen] && node[$efront_string_leadin] ? (result[$efront_string_push]($efront_string__33), result[$efront_string_push](addIndent(that[$efront_string_genera5](node, bodyFlags)))) : (result[$efront_string_push](noEmptySpace()), result[$efront_string_push](that[$efront_string_genera5](node, bodyFlags))), i = 1, iz = stmt[$efront_string_declar1][$efront_string_length]; i < iz; ++i)
                    node = stmt[$efront_string_declar1][i], extra[$efront_string_commen] && node[$efront_string_leadin] ? (result[$efront_string_push]($efront_string__10 + newline), result[$efront_string_push](addIndent(that[$efront_string_genera5](node, bodyFlags)))) : (result[$efront_string_push]($efront_string__10 + space), result[$efront_string_push](that[$efront_string_genera5](node, bodyFlags)))
            }
            var result, i, iz, node, bodyFlags, that = this;
            return result = [stmt[$efront_string_kind]], bodyFlags = flags & F_ALLOW_IN ? S_TFFF : S_FFFF, stmt[$efront_string_declar1][$efront_string_length] > 1 ? withIndent(block) : block(), result[$efront_string_push](this[$efront_string_semico1](flags)), result
        }, _c[$efront_string_ThrowS] = function (stmt, flags) {
            return [
                join($efront_string_throw, this[$efront_string_genera8](stmt[$efront_string_argume], Precedence[$efront_string_Sequen1], E_TTT)),
                this[$efront_string_semico1](flags)
            ]
        }, _c[$efront_string_TrySta] = function (stmt, flags) {
            var result, i, iz, guardedHandlers;
            if (result = [
                    $efront_string_try,
                    this[$efront_string_maybeB](stmt[$efront_string_block], S_TFFF)
                ], result = this[$efront_string_maybeB1](stmt[$efront_string_block], result), stmt[$efront_string_handle1])
                for (i = 0, iz = stmt[$efront_string_handle1][$efront_string_length]; i < iz; ++i)
                    result = join(result, this[$efront_string_genera5](stmt[$efront_string_handle1][i], S_TFFF)), (stmt[$efront_string_finali] || i + 1 !== iz) && (result = this[$efront_string_maybeB1](stmt[$efront_string_handle1][i][$efront_string_body], result));
            else {
                for (guardedHandlers = stmt[$efront_string_guarde] || [], i = 0, iz = guardedHandlers[$efront_string_length]; i < iz; ++i)
                    result = join(result, this[$efront_string_genera5](guardedHandlers[i], S_TFFF)), (stmt[$efront_string_finali] || i + 1 !== iz) && (result = this[$efront_string_maybeB1](guardedHandlers[i][$efront_string_body], result));
                if (stmt[$efront_string_handle])
                    if (Array[$efront_string_isArra](stmt[$efront_string_handle]))
                        for (i = 0, iz = stmt[$efront_string_handle][$efront_string_length]; i < iz; ++i)
                            result = join(result, this[$efront_string_genera5](stmt[$efront_string_handle][i], S_TFFF)), (stmt[$efront_string_finali] || i + 1 !== iz) && (result = this[$efront_string_maybeB1](stmt[$efront_string_handle][i][$efront_string_body], result));
                    else
                        result = join(result, this[$efront_string_genera5](stmt[$efront_string_handle], S_TFFF)), stmt[$efront_string_finali] && (result = this[$efront_string_maybeB1](stmt[$efront_string_handle][$efront_string_body], result))
            }
            return stmt[$efront_string_finali] && (result = join(result, [
                $efront_string_finall,
                this[$efront_string_maybeB](stmt[$efront_string_finali], S_TFFF)
            ])), result
        }, _c[$efront_string_Switch] = function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            if (withIndent(function () {
                    result = [
                        $efront_string_switch + space + $efront_string__40,
                        that[$efront_string_genera8](stmt[$efront_string_discri], Precedence[$efront_string_Sequen1], E_TTT),
                        $efront_string__41 + space + $efront_string__45 + newline
                    ]
                }), stmt[$efront_string_cases])
                for (bodyFlags = S_TFFF, i = 0, iz = stmt[$efront_string_cases][$efront_string_length]; i < iz; ++i)
                    i === iz - 1 && (bodyFlags |= F_SEMICOLON_OPT), fragment = addIndent(this[$efront_string_genera5](stmt[$efront_string_cases][i], bodyFlags)), result[$efront_string_push](fragment), endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]()) || result[$efront_string_push](newline);
            return result[$efront_string_push](addIndent($efront_string__48)), result
        }, _c[$efront_string_Switch1] = function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            return withIndent(function () {
                for (stmt[$efront_string_test] ? result = [
                        join($efront_string_case, that[$efront_string_genera8](stmt[$efront_string_test], Precedence[$efront_string_Sequen1], E_TTT)),
                        $efront_string__1
                    ] : result = [$efront_string_defaul2], i = 0, iz = stmt[$efront_string_conseq][$efront_string_length], iz && stmt[$efront_string_conseq][0][$efront_string_type] === Syntax[$efront_string_BlockS] && (fragment = that[$efront_string_maybeB](stmt[$efront_string_conseq][0], S_TFFF), result[$efront_string_push](fragment), i = 1), i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]()) && result[$efront_string_push](newline), bodyFlags = S_TFFF; i < iz; ++i)
                    i === iz - 1 && flags & F_SEMICOLON_OPT && (bodyFlags |= F_SEMICOLON_OPT), fragment = addIndent(that[$efront_string_genera5](stmt[$efront_string_conseq][i], bodyFlags)), result[$efront_string_push](fragment), i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]()) && result[$efront_string_push](newline)
            }), result
        }, _c[$efront_string_IfStat] = function (stmt, flags) {
            var result, bodyFlags, semicolonOptional, that = this;
            return withIndent(function () {
                result = [
                    $efront_string_if + space + $efront_string__40,
                    that[$efront_string_genera8](stmt[$efront_string_test], Precedence[$efront_string_Sequen1], E_TTT),
                    $efront_string__41
                ]
            }), semicolonOptional = flags & F_SEMICOLON_OPT, bodyFlags = S_TFFF, semicolonOptional && (bodyFlags |= F_SEMICOLON_OPT), stmt[$efront_string_altern] ? (result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_conseq], S_TFFF)), result = this[$efront_string_maybeB1](stmt[$efront_string_conseq], result), stmt[$efront_string_altern][$efront_string_type] === Syntax[$efront_string_IfStat] ? result = join(result, [
                $efront_string_else_,
                this[$efront_string_genera5](stmt[$efront_string_altern], bodyFlags)
            ]) : result = join(result, join($efront_string_else, this[$efront_string_maybeB](stmt[$efront_string_altern], bodyFlags)))) : result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_conseq], bodyFlags)), result
        }, _c[$efront_string_ForSta] = function (stmt, flags) {
            var result, that = this;
            return withIndent(function () {
                result = [$efront_string_for + space + $efront_string__40], stmt[$efront_string_init] ? stmt[$efront_string_init][$efront_string_type] === Syntax[$efront_string_Variab] ? result[$efront_string_push](that[$efront_string_genera5](stmt[$efront_string_init], S_FFFF)) : (result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_init], Precedence[$efront_string_Sequen1], E_FTT)), result[$efront_string_push]($efront_string__9)) : result[$efront_string_push]($efront_string__9), stmt[$efront_string_test] ? (result[$efront_string_push](space), result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_test], Precedence[$efront_string_Sequen1], E_TTT)), result[$efront_string_push]($efront_string__9)) : result[$efront_string_push]($efront_string__9), stmt[$efront_string_update] ? (result[$efront_string_push](space), result[$efront_string_push](that[$efront_string_genera8](stmt[$efront_string_update], Precedence[$efront_string_Sequen1], E_TTT)), result[$efront_string_push]($efront_string__41)) : result[$efront_string_push]($efront_string__41)
            }), result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_body], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)), result
        }, _c[$efront_string_ForInS] = function (stmt, flags) {
            return this[$efront_string_genera12]($efront_string_in, stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)
        }, _c[$efront_string_ForOfS] = function (stmt, flags) {
            return this[$efront_string_genera12]($efront_string_of, stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)
        }, _c[$efront_string_Labele] = function (stmt, flags) {
            return [
                stmt[$efront_string_label][$efront_string_name] + $efront_string__1,
                this[$efront_string_maybeB](stmt[$efront_string_body], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)
            ]
        }, _c[$efront_string_Progra] = function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags;
            for (iz = stmt[$efront_string_body][$efront_string_length], result = [safeConcatenation && iz > 0 ? $efront_string__33 : ''], bodyFlags = S_TFTF, i = 0; i < iz; ++i)
                !safeConcatenation && i === iz - 1 && (bodyFlags |= F_SEMICOLON_OPT), preserveBlankLines && (i === 0 && (stmt[$efront_string_body][0][$efront_string_leadin] || generateBlankLines(stmt[$efront_string_range][0], stmt[$efront_string_body][i][$efront_string_range][0], result)), i > 0 && !(stmt[$efront_string_body][i - 1][$efront_string_traili1] || stmt[$efront_string_body][i][$efront_string_leadin]) && generateBlankLines(stmt[$efront_string_body][i - 1][$efront_string_range][1], stmt[$efront_string_body][i][$efront_string_range][0], result)), fragment = addIndent(this[$efront_string_genera5](stmt[$efront_string_body][i], bodyFlags)), result[$efront_string_push](fragment), i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]()) && (preserveBlankLines ? stmt[$efront_string_body][i + 1][$efront_string_leadin] || result[$efront_string_push](newline) : result[$efront_string_push](newline)), preserveBlankLines && i === iz - 1 && (stmt[$efront_string_body][i][$efront_string_traili1] || generateBlankLines(stmt[$efront_string_body][i][$efront_string_range][1], stmt[$efront_string_range][1], result));
            return result
        }, _c[$efront_string_Functi1] = function (stmt, flags) {
            return [
                generateAsyncPrefix(stmt, !0),
                $efront_string_functi,
                generateStarSuffix(stmt) || noEmptySpace(),
                stmt[$efront_string_id] ? generateIdentifier(stmt[$efront_string_id]) : '',
                this[$efront_string_genera11](stmt)
            ]
        }, _c[$efront_string_Return] = function (stmt, flags) {
            return stmt[$efront_string_argume] ? [
                join($efront_string_return, this[$efront_string_genera8](stmt[$efront_string_argume], Precedence[$efront_string_Sequen1], E_TTT)),
                this[$efront_string_semico1](flags)
            ] : [$efront_string_return + this[$efront_string_semico1](flags)]
        }, _c[$efront_string_WhileS] = function (stmt, flags) {
            var result, that = this;
            return withIndent(function () {
                result = [
                    $efront_string_while + space + $efront_string__40,
                    that[$efront_string_genera8](stmt[$efront_string_test], Precedence[$efront_string_Sequen1], E_TTT),
                    $efront_string__41
                ]
            }), result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_body], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)), result
        }, _c[$efront_string_WithSt] = function (stmt, flags) {
            var result, that = this;
            return withIndent(function () {
                result = [
                    $efront_string_with + space + $efront_string__40,
                    that[$efront_string_genera8](stmt[$efront_string_object], Precedence[$efront_string_Sequen1], E_TTT),
                    $efront_string__41
                ]
            }), result[$efront_string_push](this[$efront_string_maybeB](stmt[$efront_string_body], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)), result
        }, CodeGenerator[$efront_string_Statem] = _c, merge(CodeGenerator[$efront_string_protot], CodeGenerator[$efront_string_Statem]), _d = {}, _d[$efront_string_Sequen] = function (expr, precedence, flags) {
            var result, i, iz;
            for (Precedence[$efront_string_Sequen1] < precedence && (flags |= F_ALLOW_IN), result = [], i = 0, iz = expr[$efront_string_expres1][$efront_string_length]; i < iz; ++i)
                result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_expres1][i], Precedence[$efront_string_Assign2], flags)), i + 1 < iz && result[$efront_string_push]($efront_string__10 + space);
            return parenthesize(result, Precedence[$efront_string_Sequen1], precedence)
        }, _d[$efront_string_Assign] = function (expr, precedence, flags) {
            return this[$efront_string_genera10](expr[$efront_string_left], expr[$efront_string_right], expr[$efront_string_operat], precedence, flags)
        }, _d[$efront_string_ArrowF] = function (expr, precedence, flags) {
            return parenthesize(this[$efront_string_genera11](expr), Precedence[$efront_string_ArrowF1], precedence)
        }, _d[$efront_string_Condit] = function (expr, precedence, flags) {
            return Precedence[$efront_string_Condit1] < precedence && (flags |= F_ALLOW_IN), parenthesize([
                this[$efront_string_genera8](expr[$efront_string_test], Precedence[$efront_string_Logica1], flags),
                space + $efront_string__49 + space,
                this[$efront_string_genera8](expr[$efront_string_conseq], Precedence[$efront_string_Assign2], flags),
                space + $efront_string__1 + space,
                this[$efront_string_genera8](expr[$efront_string_altern], Precedence[$efront_string_Assign2], flags)
            ], Precedence[$efront_string_Condit1], precedence)
        }, _d[$efront_string_Logica] = function (expr, precedence, flags) {
            return this[$efront_string_Binary](expr, precedence, flags)
        }, _d[$efront_string_Binary] = function (expr, precedence, flags) {
            var result, leftPrecedence, rightPrecedence, currentPrecedence, fragment, leftSource;
            return currentPrecedence = BinaryPrecedence[expr[$efront_string_operat]], leftPrecedence = expr[$efront_string_operat] === $efront_string__31 ? Precedence[$efront_string_Postfi] : currentPrecedence, rightPrecedence = expr[$efront_string_operat] === $efront_string__31 ? currentPrecedence : currentPrecedence + 1, currentPrecedence < precedence && (flags |= F_ALLOW_IN), fragment = this[$efront_string_genera8](expr[$efront_string_left], leftPrecedence, flags), leftSource = fragment[$efront_string_toStri](), leftSource[$efront_string_charCo](leftSource[$efront_string_length] - 1) === 47 && esutils[$efront_string_code][$efront_string_isIden1](expr[$efront_string_operat][$efront_string_charCo](0)) ? result = [
                fragment,
                noEmptySpace(),
                expr[$efront_string_operat]
            ] : result = join(fragment, expr[$efront_string_operat]), fragment = this[$efront_string_genera8](expr[$efront_string_right], rightPrecedence, flags), expr[$efront_string_operat] === $efront_string__7 && fragment[$efront_string_toStri]()[$efront_string_charAt](0) === $efront_string__7 || expr[$efront_string_operat][$efront_string_slice](-1) === $efront_string__20 && fragment[$efront_string_toStri]()[$efront_string_slice](0, 3) === $efront_string__50 ? (result[$efront_string_push](noEmptySpace()), result[$efront_string_push](fragment)) : result = join(result, fragment), expr[$efront_string_operat] === $efront_string_in && !(flags & F_ALLOW_IN) ? [
                $efront_string__40,
                result,
                $efront_string__41
            ] : parenthesize(result, currentPrecedence, precedence)
        }, _d[$efront_string_CallEx] = function (expr, precedence, flags) {
            var result, i, iz;
            for (result = [this[$efront_string_genera8](expr[$efront_string_callee], Precedence[$efront_string_Call], E_TTF)], expr[$efront_string_option2] && result[$efront_string_push]($efront_string__51), result[$efront_string_push]($efront_string__40), i = 0, iz = expr[$efront_string_argume1][$efront_string_length]; i < iz; ++i)
                result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_argume1][i], Precedence[$efront_string_Assign2], E_TTT)), i + 1 < iz && result[$efront_string_push]($efront_string__10 + space);
            return result[$efront_string_push]($efront_string__41), flags & F_ALLOW_CALL ? parenthesize(result, Precedence[$efront_string_Call], precedence) : [
                $efront_string__40,
                result,
                $efront_string__41
            ]
        }, _d[$efront_string_ChainE] = function (expr, precedence, flags) {
            Precedence[$efront_string_Option] < precedence && (flags |= F_ALLOW_CALL);
            var result = this[$efront_string_genera8](expr[$efront_string_expres], Precedence[$efront_string_Option], flags);
            return parenthesize(result, Precedence[$efront_string_Option], precedence)
        }, _d[$efront_string_NewExp] = function (expr, precedence, flags) {
            var result, length, i, iz, itemFlags;
            if (length = expr[$efront_string_argume1][$efront_string_length], itemFlags = flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0 ? E_TFT : E_TFF, result = join($efront_string_new, this[$efront_string_genera8](expr[$efront_string_callee], Precedence[$efront_string_New], itemFlags)), !(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
                for (result[$efront_string_push]($efront_string__40), i = 0, iz = length; i < iz; ++i)
                    result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_argume1][i], Precedence[$efront_string_Assign2], E_TTT)), i + 1 < iz && result[$efront_string_push]($efront_string__10 + space);
                result[$efront_string_push]($efront_string__41)
            }
            return parenthesize(result, Precedence[$efront_string_New], precedence)
        }, _d[$efront_string_Member] = function (expr, precedence, flags) {
            var result, fragment;
            return result = [this[$efront_string_genera8](expr[$efront_string_object], Precedence[$efront_string_Call], flags & F_ALLOW_CALL ? E_TTF : E_TFF)], expr[$efront_string_comput2] ? (expr[$efront_string_option2] && result[$efront_string_push]($efront_string__51), result[$efront_string_push]($efront_string__46), result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_proper], Precedence[$efront_string_Sequen1], flags & F_ALLOW_CALL ? E_TTT : E_TFT)), result[$efront_string_push]($efront_string__47)) : (!expr[$efront_string_option2] && expr[$efront_string_object][$efront_string_type] === Syntax[$efront_string_Litera] && typeof expr[$efront_string_object][$efront_string_value] === $efront_string_number && (fragment = toSourceNodeWhenNeeded(result)[$efront_string_toStri](), fragment[$efront_string_indexO]($efront_string__5) < 0 && !$efront_regexp__eExX_[$efront_string_test](fragment) && esutils[$efront_string_code][$efront_string_isDeci](fragment[$efront_string_charCo](fragment[$efront_string_length] - 1)) && !(fragment[$efront_string_length] >= 2 && fragment[$efront_string_charCo](0) === 48) && result[$efront_string_push]($efront_string__34)), result[$efront_string_push](expr[$efront_string_option2] ? $efront_string__51 : $efront_string__5), result[$efront_string_push](generateIdentifier(expr[$efront_string_proper]))), parenthesize(result, Precedence[$efront_string_Member1], precedence)
        }, _d[$efront_string_MetaPr] = function (expr, precedence, flags) {
            var result;
            return result = [], result[$efront_string_push](typeof expr[$efront_string_meta] === $efront_string_string ? expr[$efront_string_meta] : generateIdentifier(expr[$efront_string_meta])), result[$efront_string_push]($efront_string__5), result[$efront_string_push](typeof expr[$efront_string_proper] === $efront_string_string ? expr[$efront_string_proper] : generateIdentifier(expr[$efront_string_proper])), parenthesize(result, Precedence[$efront_string_Member1], precedence)
        }, _d[$efront_string_UnaryE] = function (expr, precedence, flags) {
            var result, fragment, rightCharCode, leftSource, leftCharCode;
            return fragment = this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Unary], E_TTT), space === '' ? result = join(expr[$efront_string_operat], fragment) : (result = [expr[$efront_string_operat]], expr[$efront_string_operat][$efront_string_length] > 2 ? result = join(result, fragment) : (leftSource = toSourceNodeWhenNeeded(result)[$efront_string_toStri](), leftCharCode = leftSource[$efront_string_charCo](leftSource[$efront_string_length] - 1), rightCharCode = fragment[$efront_string_toStri]()[$efront_string_charCo](0), (leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils[$efront_string_code][$efront_string_isIden1](leftCharCode) && esutils[$efront_string_code][$efront_string_isIden1](rightCharCode) ? (result[$efront_string_push](noEmptySpace()), result[$efront_string_push](fragment)) : result[$efront_string_push](fragment))), parenthesize(result, Precedence[$efront_string_Unary], precedence)
        }, _d[$efront_string_YieldE] = function (expr, precedence, flags) {
            var result;
            return expr[$efront_string_delega] ? result = $efront_string_yield_ : result = $efront_string_yield, expr[$efront_string_argume] && (result = join(result, this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Yield], E_TTT))), parenthesize(result, Precedence[$efront_string_Yield], precedence)
        }, _d[$efront_string_AwaitE] = function (expr, precedence, flags) {
            var result = join(expr[$efront_string_all] ? $efront_string_await_ : $efront_string_await, this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Await], E_TTT));
            return parenthesize(result, Precedence[$efront_string_Await], precedence)
        }, _d[$efront_string_Update] = function (expr, precedence, flags) {
            return expr[$efront_string_prefix] ? parenthesize([
                expr[$efront_string_operat],
                this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Unary], E_TTT)
            ], Precedence[$efront_string_Unary], precedence) : parenthesize([
                this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Postfi], E_TTT),
                expr[$efront_string_operat]
            ], Precedence[$efront_string_Postfi], precedence)
        }, _d[$efront_string_Functi] = function (expr, precedence, flags) {
            var result = [
                generateAsyncPrefix(expr, !0),
                $efront_string_functi
            ];
            return expr[$efront_string_id] ? (result[$efront_string_push](generateStarSuffix(expr) || noEmptySpace()), result[$efront_string_push](generateIdentifier(expr[$efront_string_id]))) : result[$efront_string_push](generateStarSuffix(expr) || space), result[$efront_string_push](this[$efront_string_genera11](expr)), result
        }, _d[$efront_string_ArrayP] = function (expr, precedence, flags) {
            return this[$efront_string_ArrayE](expr, precedence, flags, !0)
        }, _d[$efront_string_ArrayE] = function (expr, precedence, flags, isPattern) {
            var result, multiline, that = this;
            return expr[$efront_string_elemen][$efront_string_length] ? (multiline = isPattern ? !1 : expr[$efront_string_elemen][$efront_string_length] > 1, result = [
                $efront_string__46,
                multiline ? newline : ''
            ], withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr[$efront_string_elemen][$efront_string_length]; i < iz; ++i)
                    expr[$efront_string_elemen][i] ? (result[$efront_string_push](multiline ? indent : ''), result[$efront_string_push](that[$efront_string_genera8](expr[$efront_string_elemen][i], Precedence[$efront_string_Assign2], E_TTT))) : (multiline && result[$efront_string_push](indent), i + 1 === iz && result[$efront_string_push]($efront_string__10)), i + 1 < iz && result[$efront_string_push]($efront_string__10 + (multiline ? newline : space))
            }), multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]()) && result[$efront_string_push](newline), result[$efront_string_push](multiline ? base : ''), result[$efront_string_push]($efront_string__47), result) : $efront_string__52
        }, _d[$efront_string_RestEl] = function (expr, precedence, flags) {
            return $efront_string__43 + this[$efront_string_genera7](expr[$efront_string_argume])
        }, _d[$efront_string_ClassE] = function (expr, precedence, flags) {
            var result, fragment;
            return result = [$efront_string_class], expr[$efront_string_id] && (result = join(result, this[$efront_string_genera8](expr[$efront_string_id], Precedence[$efront_string_Sequen1], E_TTT))), expr[$efront_string_superC] && (fragment = join($efront_string_extend1, this[$efront_string_genera8](expr[$efront_string_superC], Precedence[$efront_string_Unary], E_TTT)), result = join(result, fragment)), result[$efront_string_push](space), result[$efront_string_push](this[$efront_string_genera5](expr[$efront_string_body], S_TFFT)), result
        }, _d[$efront_string_Method] = function (expr, precedence, flags) {
            var result, fragment;
            return expr[$efront_string_static] ? result = [$efront_string_static + space] : result = [], expr[$efront_string_kind] === $efront_string_get || expr[$efront_string_kind] === $efront_string_set ? fragment = [
                join(expr[$efront_string_kind], this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2])),
                this[$efront_string_genera11](expr[$efront_string_value])
            ] : fragment = [
                generateMethodPrefix(expr),
                this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2]),
                this[$efront_string_genera11](expr[$efront_string_value])
            ], join(result, fragment)
        }, _d[$efront_string_Proper] = function (expr, precedence, flags) {
            return expr[$efront_string_kind] === $efront_string_get || expr[$efront_string_kind] === $efront_string_set ? [
                expr[$efront_string_kind],
                noEmptySpace(),
                this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2]),
                this[$efront_string_genera11](expr[$efront_string_value])
            ] : expr[$efront_string_shorth] ? expr[$efront_string_value][$efront_string_type] === $efront_string_Assign1 ? this[$efront_string_Assign1](expr[$efront_string_value], Precedence[$efront_string_Sequen1], E_TTT) : this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2]) : expr[$efront_string_method] ? [
                generateMethodPrefix(expr),
                this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2]),
                this[$efront_string_genera11](expr[$efront_string_value])
            ] : [
                this[$efront_string_genera13](expr[$efront_string_key], expr[$efront_string_comput2]),
                $efront_string__1 + space,
                this[$efront_string_genera8](expr[$efront_string_value], Precedence[$efront_string_Assign2], E_TTT)
            ]
        }, _d[$efront_string_Object] = function (expr, precedence, flags) {
            var multiline, result, fragment, that = this;
            return expr[$efront_string_proper1][$efront_string_length] ? (multiline = expr[$efront_string_proper1][$efront_string_length] > 1, withIndent(function () {
                fragment = that[$efront_string_genera8](expr[$efront_string_proper1][0], Precedence[$efront_string_Sequen1], E_TTT)
            }), multiline || hasLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string_toStri]()) ? (withIndent(function (indent) {
                var i, iz;
                if (result = [
                        $efront_string__45,
                        newline,
                        indent,
                        fragment
                    ], multiline)
                    for (result[$efront_string_push]($efront_string__10 + newline), i = 1, iz = expr[$efront_string_proper1][$efront_string_length]; i < iz; ++i)
                        result[$efront_string_push](indent), result[$efront_string_push](that[$efront_string_genera8](expr[$efront_string_proper1][i], Precedence[$efront_string_Sequen1], E_TTT)), i + 1 < iz && result[$efront_string_push]($efront_string__10 + newline)
            }), endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]()) || result[$efront_string_push](newline), result[$efront_string_push](base), result[$efront_string_push]($efront_string__48), result) : [
                $efront_string__45,
                space,
                fragment,
                space,
                $efront_string__48
            ]) : $efront_string__53
        }, _d[$efront_string_Assign1] = function (expr, precedence, flags) {
            return this[$efront_string_genera10](expr[$efront_string_left], expr[$efront_string_right], $efront_string__42, precedence, flags)
        }, _d[$efront_string_Object1] = function (expr, precedence, flags) {
            var result, i, iz, multiline, property, that = this;
            if (!expr[$efront_string_proper1][$efront_string_length])
                return $efront_string__53;
            if (multiline = !1, expr[$efront_string_proper1][$efront_string_length] === 1)
                property = expr[$efront_string_proper1][0], property[$efront_string_type] === Syntax[$efront_string_Proper] && property[$efront_string_value][$efront_string_type] !== Syntax[$efront_string_Identi] && (multiline = !0);
            else
                for (i = 0, iz = expr[$efront_string_proper1][$efront_string_length]; i < iz; ++i)
                    if (property = expr[$efront_string_proper1][i], property[$efront_string_type] === Syntax[$efront_string_Proper] && !property[$efront_string_shorth]) {
                        multiline = !0;
                        break
                    }
            return result = [
                $efront_string__45,
                multiline ? newline : ''
            ], withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr[$efront_string_proper1][$efront_string_length]; i < iz; ++i)
                    result[$efront_string_push](multiline ? indent : ''), result[$efront_string_push](that[$efront_string_genera8](expr[$efront_string_proper1][i], Precedence[$efront_string_Sequen1], E_TTT)), i + 1 < iz && result[$efront_string_push]($efront_string__10 + (multiline ? newline : space))
            }), multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string_toStri]()) && result[$efront_string_push](newline), result[$efront_string_push](multiline ? base : ''), result[$efront_string_push]($efront_string__48), result
        }, _d[$efront_string_ThisEx] = function (expr, precedence, flags) {
            return $efront_string_this
        }, _d[$efront_string_Super] = function (expr, precedence, flags) {
            return $efront_string_super
        }, _d[$efront_string_Identi] = function (expr, precedence, flags) {
            return generateIdentifier(expr)
        }, _d[$efront_string_Import2] = function (expr, precedence, flags) {
            return generateIdentifier(expr[$efront_string_id] || expr[$efront_string_local])
        }, _d[$efront_string_Import3] = function (expr, precedence, flags) {
            var result = [$efront_string__29], id = expr[$efront_string_id] || expr[$efront_string_local];
            return id && result[$efront_string_push](space + $efront_string_as + noEmptySpace() + generateIdentifier(id)), result
        }, _d[$efront_string_Import4] = function (expr, precedence, flags) {
            var imported = expr[$efront_string_import], result = [imported[$efront_string_name]], local = expr[$efront_string_local];
            return local && local[$efront_string_name] !== imported[$efront_string_name] && result[$efront_string_push](noEmptySpace() + $efront_string_as + noEmptySpace() + generateIdentifier(local)), result
        }, _d[$efront_string_Export3] = function (expr, precedence, flags) {
            var local = expr[$efront_string_local], result = [local[$efront_string_name]], exported = expr[$efront_string_export1];
            return exported && exported[$efront_string_name] !== local[$efront_string_name] && result[$efront_string_push](noEmptySpace() + $efront_string_as + noEmptySpace() + generateIdentifier(exported)), result
        }, _d[$efront_string_Litera] = function (expr, precedence, flags) {
            var raw;
            if (expr[$efront_string_hasOwn]($efront_string_raw) && parse && extra[$efront_string_raw])
                try {
                    if (raw = parse(expr[$efront_string_raw])[$efront_string_body][0][$efront_string_expres], raw[$efront_string_type] === Syntax[$efront_string_Litera] && raw[$efront_string_value] === expr[$efront_string_value])
                        return expr[$efront_string_raw]
                } catch (e) {
                }
            return expr[$efront_string_regex] ? $efront_string__7 + expr[$efront_string_regex][$efront_string_patter] + $efront_string__7 + expr[$efront_string_regex][$efront_string_flags] : expr[$efront_string_value] === null ? $efront_string_null : typeof expr[$efront_string_value] === $efront_string_string ? escapeString(expr[$efront_string_value]) : typeof expr[$efront_string_value] === $efront_string_number ? generateNumber(expr[$efront_string_value]) : typeof expr[$efront_string_value] === $efront_string_boolea ? expr[$efront_string_value] ? $efront_string_true : $efront_string_false : generateRegExp(expr[$efront_string_value])
        }, _d[$efront_string_Genera] = function (expr, precedence, flags) {
            return this[$efront_string_Compre1](expr, precedence, flags)
        }, _d[$efront_string_Compre1] = function (expr, precedence, flags) {
            var result, i, iz, fragment, that = this;
            return result = expr[$efront_string_type] === Syntax[$efront_string_Genera] ? [$efront_string__40] : [$efront_string__46], extra[$efront_string_moz][$efront_string_compre] && (fragment = this[$efront_string_genera8](expr[$efront_string_body], Precedence[$efront_string_Assign2], E_TTT), result[$efront_string_push](fragment)), expr[$efront_string_blocks] && withIndent(function () {
                for (i = 0, iz = expr[$efront_string_blocks][$efront_string_length]; i < iz; ++i)
                    fragment = that[$efront_string_genera8](expr[$efront_string_blocks][i], Precedence[$efront_string_Sequen1], E_TTT), i > 0 || extra[$efront_string_moz][$efront_string_compre] ? result = join(result, fragment) : result[$efront_string_push](fragment)
            }), expr[$efront_string_filter] && (result = join(result, $efront_string_if + space), fragment = this[$efront_string_genera8](expr[$efront_string_filter], Precedence[$efront_string_Sequen1], E_TTT), result = join(result, [
                $efront_string__40,
                fragment,
                $efront_string__41
            ])), extra[$efront_string_moz][$efront_string_compre] || (fragment = this[$efront_string_genera8](expr[$efront_string_body], Precedence[$efront_string_Assign2], E_TTT), result = join(result, fragment)), result[$efront_string_push](expr[$efront_string_type] === Syntax[$efront_string_Genera] ? $efront_string__41 : $efront_string__47), result
        }, _d[$efront_string_Compre] = function (expr, precedence, flags) {
            var fragment;
            return expr[$efront_string_left][$efront_string_type] === Syntax[$efront_string_Variab] ? fragment = [
                expr[$efront_string_left][$efront_string_kind],
                noEmptySpace(),
                this[$efront_string_genera5](expr[$efront_string_left][$efront_string_declar1][0], S_FFFF)
            ] : fragment = this[$efront_string_genera8](expr[$efront_string_left], Precedence[$efront_string_Call], E_TTT), fragment = join(fragment, expr[$efront_string_of] ? $efront_string_of : $efront_string_in), fragment = join(fragment, this[$efront_string_genera8](expr[$efront_string_right], Precedence[$efront_string_Sequen1], E_TTT)), [
                $efront_string_for + space + $efront_string__40,
                fragment,
                $efront_string__41
            ]
        }, _d[$efront_string_Spread] = function (expr, precedence, flags) {
            return [
                $efront_string__43,
                this[$efront_string_genera8](expr[$efront_string_argume], Precedence[$efront_string_Assign2], E_TTT)
            ]
        }, _d[$efront_string_Tagged] = function (expr, precedence, flags) {
            var itemFlags = E_TTF;
            flags & F_ALLOW_CALL || (itemFlags = E_TFF);
            var result = [
                this[$efront_string_genera8](expr[$efront_string_tag], Precedence[$efront_string_Call], itemFlags),
                this[$efront_string_genera8](expr[$efront_string_quasi], Precedence[$efront_string_Primar], E_FFT)
            ];
            return parenthesize(result, Precedence[$efront_string_Tagged1], precedence)
        }, _d[$efront_string_Templa] = function (expr, precedence, flags) {
            return expr[$efront_string_value][$efront_string_raw]
        }, _d[$efront_string_Templa1] = function (expr, precedence, flags) {
            var result, i, iz;
            for (result = [$efront_string__54], i = 0, iz = expr[$efront_string_quasis][$efront_string_length]; i < iz; ++i)
                result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_quasis][i], Precedence[$efront_string_Primar], E_TTT)), i + 1 < iz && (result[$efront_string_push]($efront_string_$_ + space), result[$efront_string_push](this[$efront_string_genera8](expr[$efront_string_expres1][i], Precedence[$efront_string_Sequen1], E_TTT)), result[$efront_string_push](space + $efront_string__48));
            return result[$efront_string_push]($efront_string__54), result
        }, _d[$efront_string_Module] = function (expr, precedence, flags) {
            return this[$efront_string_Litera](expr, precedence, flags)
        }, _d[$efront_string_Import] = function (expr, precedence, flag) {
            return parenthesize([
                $efront_string_import2,
                this[$efront_string_genera8](expr[$efront_string_source], Precedence[$efront_string_Assign2], E_TTT),
                $efront_string__41
            ], Precedence[$efront_string_Call], precedence)
        }, CodeGenerator[$efront_string_Expres1] = _d, merge(CodeGenerator[$efront_string_protot], CodeGenerator[$efront_string_Expres1]), CodeGenerator[$efront_string_protot][$efront_string_genera8] = function (expr, precedence, flags) {
            var result, type;
            return type = expr[$efront_string_type] || Syntax[$efront_string_Proper], extra[$efront_string_verbat] && expr[$efront_string_hasOwn](extra[$efront_string_verbat]) ? generateVerbatim(expr, precedence) : (result = this[type](expr, precedence, flags), extra[$efront_string_commen] && (result = addComments(expr, result)), toSourceNodeWhenNeeded(result, expr))
        }, CodeGenerator[$efront_string_protot][$efront_string_genera5] = function (stmt, flags) {
            var result, fragment;
            return result = this[stmt[$efront_string_type]](stmt, flags), extra[$efront_string_commen] && (result = addComments(stmt, result)), fragment = toSourceNodeWhenNeeded(result)[$efront_string_toStri](), stmt[$efront_string_type] === Syntax[$efront_string_Progra] && !safeConcatenation && newline === '' && fragment[$efront_string_charAt](fragment[$efront_string_length] - 1) === $efront_string__33 && (result = sourceMap ? toSourceNodeWhenNeeded(result)[$efront_string_replac1]($efront_regexp__s_$_, '') : fragment[$efront_string_replac]($efront_regexp__s_$_, '')), toSourceNodeWhenNeeded(result, stmt)
        }, _e = {}, _f = {}, _f[$efront_string_style] = '', _f[$efront_string_base] = 0, _e[$efront_string_indent] = _f, _e[$efront_string_renumb] = !0, _e[$efront_string_hexade] = !0, _e[$efront_string_quotes] = $efront_string_auto, _e[$efront_string_escape1] = !0, _e[$efront_string_compac] = !0, _e[$efront_string_parent2] = !1, _e[$efront_string_semico] = !1, FORMAT_MINIFY = _e, FORMAT_DEFAULTS = getDefaultOptions()[$efront_string_format], exports[$efront_string_versio] = require(502)[$efront_string_versio], exports[$efront_string_genera14] = generate, exports[$efront_string_attach1] = estraverse[$efront_string_attach1], exports[$efront_string_Preced] = updateDeeply({}, Precedence), exports[$efront_string_browse] = !1, exports[$efront_string_FORMAT] = FORMAT_MINIFY, exports[$efront_string_FORMAT1] = FORMAT_DEFAULTS
    }()
}],
/** 778 "e" */ "e",
/** 779 "d" */ "d",
/** 780 "o" */ "o",
/** 781 "C" */ "C",
/** 782 "r" */ "r",
/** 783 "a" */ "a",
/** 784 "h" */ "h",
/** 785 "m" */ "m",
/** 786 "f" */ "f",
/** 787 "t" */ "t",
/** 788 "A" */ "A",
/** 789 "c" */ "c"],function (a, c,s) {
        var x=s[8],
    B=s[12],
    m=s[2],
    e=s[7],
    v=s[6],
    q=s[3],
    o=s[4],
    z=s[9],
    n=s[1],
    y=s[5],
    M=217,
    w=s[10],
    E=15,
        u,p=[x,m,n,q,o,y,B,e,v,z,w,s[11]],
        h=s[M-1][0],
        j=s[123],
        $=[s[777],s[778],s[779],s[780],s[781],s[782],s[783],s[780],s[784],s[779],s[781],s[785]],
        _=[s[786],s[787],s[777],s[778],s[779],s[780],s[781],s[782],s[783],s[788]][v]()[w](''),T = this,R;
        if (!(a instanceof s[22])){
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
    },[this.window||global])[776]()