module.exports=([/*Mon Feb 22 2021 04:34:55 GMT+0800 (中国标准时间) by efront 2.16.6*/].map||function (f, t) {
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
/** 2 $efront_string__slice */ "slice",
/** 3 $efront_string__lengt */ "length",
/** 4 $efront_string__split */ "split",
/** 5 $efront_string__conca */ "concat",
/** 6 $efront_string__apply */ "apply",
/** 7 $efront_string__rever */ "reverse",
/** 8 $efront_string__exec_ */ "exec",
/** 9 $efront_string__index */ "indexOf",
/** 10 $efront_string__strin */ "string",
/** 11 $efront_string__join_ */ "join",
/** 12 $efront_string__call_ */ "call",
/** 13 $efront_string__expor */ "exports",
/** 14 $efront_regexp__funct */ /^function[^\(]*?\(([^\)]+?)\)/,
/** 15 $efront_global_Array */ Array,
/** 16 $efront_global_String */ String,
/** 17 $efront_global__t_ */ "t",
/** 18 $efront_global__A_ */ "A",
/** 19 $efront_global__e_ */ "e",
/** 20 $efront_global__d_ */ "d",
/** 21 $efront_global__o_ */ "o",
/** 22 $efront_global__C_ */ "C",
/** 23 $efront_global__r_ */ "r",
/** 24 $efront_global__a_ */ "a",
/** 25 $efront_global__h_ */ "h",
/** 26 $efront_global__c_ */ "c",
/** 27 $efront_global__m_ */ "m",
/** 28 $efront_global__f_ */ "f",
/** 29 exports */ [1363],
/** 30 TypeError */ typeof TypeError!=="undefined"?TypeError:void 0,
/** 31 $efront_string__ABCDE */ 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
/** 32 $efront_string__split1 */ 'split',
/** 33 $efront_string__encod */ 'encode',
/** 34 $efront_string__lengt1 */ 'length',
/** 35 $efront_string__Must_ */ /** text */ 'Must be between 0 and 63: ',
/** 36 $efront_string__decod */ 'decode',
/** 37 source-map$lib$base64.js */ [29,30,31,32,33,34,35,36,function(exports, TypeError, $efront_string__ABCDE, $efront_string__split1, $efront_string__encod, $efront_string__lengt1, $efront_string__Must_, $efront_string__decod) {
    var intToCharMap = $efront_string__ABCDE[$efront_string__split1]('');
    exports[$efront_string__encod] = function (number) {
        if (0 <= number && number < intToCharMap[$efront_string__lengt1]) {
            return intToCharMap[number]
        }
        throw new TypeError($efront_string__Must_ + number)
    };
    exports[$efront_string__decod] = function (charCode) {
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
/** 38 Error */ Error,
/** 39 Array */ Array,
/** 40 Object */ Object,
/** 41 JSON */ typeof JSON!=="undefined"?JSON:void 0,
/** 42 $efront_string__ */ '"',
/** 43 $efront_string__is_a_ */ /** text */ '" is a required argument.',
/** 44 $efront_string__getAr */ 'getArg',
/** 45 $efront_regexp__w_w_w */ /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,
/** 46 $efront_regexp__data_ */ /^data:.+\,.+$/,
/** 47 $efront_string__match */ 'match',
/** 48 $efront_string__schem */ 'scheme',
/** 49 $efront_string__auth_ */ 'auth',
/** 50 $efront_string__host_ */ 'host',
/** 51 $efront_string__port_ */ 'port',
/** 52 $efront_string__path_ */ 'path',
/** 53 $efront_string__urlPa */ 'urlParse',
/** 54 $efront_string__1 */ ':',
/** 55 $efront_string__2 */ '//',
/** 56 $efront_string__3 */ '@',
/** 57 $efront_string__urlGe */ 'urlGenerate',
/** 58 $efront_string__isAbs */ 'isAbsolute',
/** 59 $efront_regexp__4 */ /\/+/,
/** 60 $efront_string__5 */ '.',
/** 61 $efront_string__splic */ 'splice',
/** 62 $efront_string__6 */ '..',
/** 63 $efront_string__join_1 */ 'join',
/** 64 $efront_string__7 */ '/',
/** 65 $efront_string__norma */ 'normalize',
/** 66 $efront_string__charA */ 'charAt',
/** 67 $efront_string__repla */ 'replace',
/** 68 $efront_regexp__$_ */ /\/+$/,
/** 69 $efront_string__test_ */ 'test',
/** 70 $efront_regexp__$_1 */ /\/$/,
/** 71 $efront_string__index1 */ 'indexOf',
/** 72 $efront_string__lastI */ 'lastIndexOf',
/** 73 $efront_string__slice1 */ 'slice',
/** 74 $efront_regexp__$_2 */ /^([^\/]+:\/)?\/*$/,
/** 75 $efront_string__8 */ '../',
/** 76 $efront_string__subst */ 'substr',
/** 77 $efront_string__relat */ 'relative',
/** 78 $efront_string__creat */ 'create',
/** 79 $efront_string____pro */ '__proto__',
/** 80 $efront_string__$_3 */ '$',
/** 81 $efront_string__toSet */ 'toSetString',
/** 82 $efront_string__fromS */ 'fromSetString',
/** 83 $efront_string__charC */ 'charCodeAt',
/** 84 $efront_string__sourc */ 'source',
/** 85 $efront_string__origi */ 'originalLine',
/** 86 $efront_string__origi1 */ 'originalColumn',
/** 87 $efront_string__gener */ 'generatedColumn',
/** 88 $efront_string__gener1 */ 'generatedLine',
/** 89 $efront_string__name_ */ 'name',
/** 90 $efront_string__compa */ 'compareByOriginalPositions',
/** 91 $efront_string__compa1 */ 'compareByGeneratedPositionsDeflated',
/** 92 $efront_string__compa2 */ 'compareByGeneratedPositionsInflated',
/** 93 $efront_string__parse */ 'parse',
/** 94 $efront_regexp__n_n_ */ /^\)]}'[^\n]*\n/,
/** 95 $efront_string__parse1 */ 'parseSourceMapInput',
/** 96 $efront_string__sourc1 */ /** text */ 'sourceMapURL could not be parsed',
/** 97 $efront_string__subst1 */ 'substring',
/** 98 $efront_string__compu */ 'computeSourceURL',
/** 99 source-map$lib$util.js */ [38,29,39,40,41,34,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,32,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,function(Error, exports, Array, Object, JSON, $efront_string__lengt1, $efront_string__, $efront_string__is_a_, $efront_string__getAr, $efront_regexp__w_w_w, $efront_regexp__data_, $efront_string__match, $efront_string__schem, $efront_string__auth_, $efront_string__host_, $efront_string__port_, $efront_string__path_, $efront_string__urlPa, $efront_string__1, $efront_string__2, $efront_string__3, $efront_string__urlGe, $efront_string__isAbs, $efront_string__split1, $efront_regexp__4, $efront_string__5, $efront_string__splic, $efront_string__6, $efront_string__join_1, $efront_string__7, $efront_string__norma, $efront_string__charA, $efront_string__repla, $efront_regexp__$_, $efront_string__test_, $efront_regexp__$_1, $efront_string__index1, $efront_string__lastI, $efront_string__slice1, $efront_regexp__$_2, $efront_string__8, $efront_string__subst, $efront_string__relat, $efront_string__creat, $efront_string____pro, $efront_string__$_3, $efront_string__toSet, $efront_string__fromS, $efront_string__charC, $efront_string__sourc, $efront_string__origi, $efront_string__origi1, $efront_string__gener, $efront_string__gener1, $efront_string__name_, $efront_string__compa, $efront_string__compa1, $efront_string__compa2, $efront_string__parse, $efront_regexp__n_n_, $efront_string__parse1, $efront_string__sourc1, $efront_string__subst1, $efront_string__compu) {
    function getArg(aArgs, aName, aDefaultValue) {
        if (aName in aArgs) {
            return aArgs[aName]
        } else if (arguments[$efront_string__lengt1] === 3) {
            return aDefaultValue
        } else {
            throw new Error($efront_string__ + aName + $efront_string__is_a_)
        }
    }
    exports[$efront_string__getAr] = getArg;
    var urlRegexp = $efront_regexp__w_w_w;
    var dataUrlRegexp = $efront_regexp__data_;
    function urlParse(aUrl) {
        var _a;
        var match = aUrl[$efront_string__match](urlRegexp);
        if (!match) {
            return null
        }
        return _a = {}, _a[$efront_string__schem] = match[1], _a[$efront_string__auth_] = match[2], _a[$efront_string__host_] = match[3], _a[$efront_string__port_] = match[4], _a[$efront_string__path_] = match[5], _a
    }
    exports[$efront_string__urlPa] = urlParse;
    function urlGenerate(aParsedUrl) {
        var url = '';
        if (aParsedUrl[$efront_string__schem]) {
            url += aParsedUrl[$efront_string__schem] + $efront_string__1
        }
        url += $efront_string__2;
        if (aParsedUrl[$efront_string__auth_]) {
            url += aParsedUrl[$efront_string__auth_] + $efront_string__3
        }
        if (aParsedUrl[$efront_string__host_]) {
            url += aParsedUrl[$efront_string__host_]
        }
        if (aParsedUrl[$efront_string__port_]) {
            url += $efront_string__1 + aParsedUrl[$efront_string__port_]
        }
        if (aParsedUrl[$efront_string__path_]) {
            url += aParsedUrl[$efront_string__path_]
        }
        return url
    }
    exports[$efront_string__urlGe] = urlGenerate;
    function normalize(aPath) {
        var path = aPath;
        var url = urlParse(aPath);
        if (url) {
            if (!url[$efront_string__path_]) {
                return aPath
            }
            path = url[$efront_string__path_]
        }
        var isAbsolute = exports[$efront_string__isAbs](path);
        var parts = path[$efront_string__split1]($efront_regexp__4);
        for (var part, up = 0, i = parts[$efront_string__lengt1] - 1; i >= 0; i--) {
            part = parts[i];
            if (part === $efront_string__5) {
                parts[$efront_string__splic](i, 1)
            } else if (part === $efront_string__6) {
                up++
            } else if (up > 0) {
                if (part === '') {
                    parts[$efront_string__splic](i + 1, up);
                    up = 0
                } else {
                    parts[$efront_string__splic](i, 2);
                    up--
                }
            }
        }
        path = parts[$efront_string__join_1]($efront_string__7);
        if (path === '') {
            path = isAbsolute ? $efront_string__7 : $efront_string__5
        }
        if (url) {
            url[$efront_string__path_] = path;
            return urlGenerate(url)
        }
        return path
    }
    exports[$efront_string__norma] = normalize;
    function join(aRoot, aPath) {
        if (aRoot === '') {
            aRoot = $efront_string__5
        }
        if (aPath === '') {
            aPath = $efront_string__5
        }
        var aPathUrl = urlParse(aPath);
        var aRootUrl = urlParse(aRoot);
        if (aRootUrl) {
            aRoot = aRootUrl[$efront_string__path_] || $efront_string__7
        }
        if (aPathUrl && !aPathUrl[$efront_string__schem]) {
            if (aRootUrl) {
                aPathUrl[$efront_string__schem] = aRootUrl[$efront_string__schem]
            }
            return urlGenerate(aPathUrl)
        }
        if (aPathUrl || aPath[$efront_string__match](dataUrlRegexp)) {
            return aPath
        }
        if (aRootUrl && !aRootUrl[$efront_string__host_] && !aRootUrl[$efront_string__path_]) {
            aRootUrl[$efront_string__host_] = aPath;
            return urlGenerate(aRootUrl)
        }
        var joined = aPath[$efront_string__charA](0) === $efront_string__7 ? aPath : normalize(aRoot[$efront_string__repla]($efront_regexp__$_, '') + $efront_string__7 + aPath);
        if (aRootUrl) {
            aRootUrl[$efront_string__path_] = joined;
            return urlGenerate(aRootUrl)
        }
        return joined
    }
    exports[$efront_string__join_1] = join;
    exports[$efront_string__isAbs] = function (aPath) {
        return aPath[$efront_string__charA](0) === $efront_string__7 || urlRegexp[$efront_string__test_](aPath)
    };
    function relative(aRoot, aPath) {
        if (aRoot === '') {
            aRoot = $efront_string__5
        }
        aRoot = aRoot[$efront_string__repla]($efront_regexp__$_1, '');
        var level = 0;
        while (aPath[$efront_string__index1](aRoot + $efront_string__7) !== 0) {
            var index = aRoot[$efront_string__lastI]($efront_string__7);
            if (index < 0) {
                return aPath
            }
            aRoot = aRoot[$efront_string__slice1](0, index);
            if (aRoot[$efront_string__match]($efront_regexp__$_2)) {
                return aPath
            }
            ++level
        }
        return Array(level + 1)[$efront_string__join_1]($efront_string__8) + aPath[$efront_string__subst](aRoot[$efront_string__lengt1] + 1)
    }
    exports[$efront_string__relat] = relative;
    var supportsNullProto = function () {
        var obj = Object[$efront_string__creat](null);
        return !($efront_string____pro in obj)
    }();
    function identity(s) {
        return s
    }
    function toSetString(aStr) {
        if (isProtoString(aStr)) {
            return $efront_string__$_3 + aStr
        }
        return aStr
    }
    exports[$efront_string__toSet] = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
        if (isProtoString(aStr)) {
            return aStr[$efront_string__slice1](1)
        }
        return aStr
    }
    exports[$efront_string__fromS] = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
        if (!s) {
            return false
        }
        var length = s[$efront_string__lengt1];
        if (length < 9) {
            return false
        }
        if (s[$efront_string__charC](length - 1) !== 95 || s[$efront_string__charC](length - 2) !== 95 || s[$efront_string__charC](length - 3) !== 111 || s[$efront_string__charC](length - 4) !== 116 || s[$efront_string__charC](length - 5) !== 111 || s[$efront_string__charC](length - 6) !== 114 || s[$efront_string__charC](length - 7) !== 112 || s[$efront_string__charC](length - 8) !== 95 || s[$efront_string__charC](length - 9) !== 95) {
            return false
        }
        for (var i = length - 10; i >= 0; i--) {
            if (s[$efront_string__charC](i) !== 36) {
                return false
            }
        }
        return true
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
        var cmp = strcmp(mappingA[$efront_string__sourc], mappingB[$efront_string__sourc]);
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string__origi] - mappingB[$efront_string__origi];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string__origi1] - mappingB[$efront_string__origi1];
        if (cmp !== 0 || onlyCompareOriginal) {
            return cmp
        }
        cmp = mappingA[$efront_string__gener] - mappingB[$efront_string__gener];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string__gener1] - mappingB[$efront_string__gener1];
        if (cmp !== 0) {
            return cmp
        }
        return strcmp(mappingA[$efront_string__name_], mappingB[$efront_string__name_])
    }
    exports[$efront_string__compa] = compareByOriginalPositions;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
        var cmp = mappingA[$efront_string__gener1] - mappingB[$efront_string__gener1];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string__gener] - mappingB[$efront_string__gener];
        if (cmp !== 0 || onlyCompareGenerated) {
            return cmp
        }
        cmp = strcmp(mappingA[$efront_string__sourc], mappingB[$efront_string__sourc]);
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string__origi] - mappingB[$efront_string__origi];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string__origi1] - mappingB[$efront_string__origi1];
        if (cmp !== 0) {
            return cmp
        }
        return strcmp(mappingA[$efront_string__name_], mappingB[$efront_string__name_])
    }
    exports[$efront_string__compa1] = compareByGeneratedPositionsDeflated;
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
        var cmp = mappingA[$efront_string__gener1] - mappingB[$efront_string__gener1];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string__gener] - mappingB[$efront_string__gener];
        if (cmp !== 0) {
            return cmp
        }
        cmp = strcmp(mappingA[$efront_string__sourc], mappingB[$efront_string__sourc]);
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string__origi] - mappingB[$efront_string__origi];
        if (cmp !== 0) {
            return cmp
        }
        cmp = mappingA[$efront_string__origi1] - mappingB[$efront_string__origi1];
        if (cmp !== 0) {
            return cmp
        }
        return strcmp(mappingA[$efront_string__name_], mappingB[$efront_string__name_])
    }
    exports[$efront_string__compa2] = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
        return JSON[$efront_string__parse](str[$efront_string__repla]($efront_regexp__n_n_, ''))
    }
    exports[$efront_string__parse1] = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
        sourceURL = sourceURL || '';
        if (sourceRoot) {
            if (sourceRoot[sourceRoot[$efront_string__lengt1] - 1] !== $efront_string__7 && sourceURL[0] !== $efront_string__7) {
                sourceRoot += $efront_string__7
            }
            sourceURL = sourceRoot + sourceURL
        }
        if (sourceMapURL) {
            var parsed = urlParse(sourceMapURL);
            if (!parsed) {
                throw new Error($efront_string__sourc1)
            }
            if (parsed[$efront_string__path_]) {
                var index = parsed[$efront_string__path_][$efront_string__lastI]($efront_string__7);
                if (index >= 0) {
                    parsed[$efront_string__path_] = parsed[$efront_string__path_][$efront_string__subst1](0, index + 1)
                }
            }
            sourceURL = join(urlGenerate(parsed), sourceURL)
        }
        return normalize(sourceURL)
    }
    exports[$efront_string__compu] = computeSourceURL;
    return exports
}],
/** 100 Math */ Math,
/** 101 $efront_string__round */ 'round',
/** 102 $efront_string__rando */ 'random',
/** 103 $efront_string__quick */ 'quickSort',
/** 104 source-map$lib$quick-sort.js */ [100,29,101,102,103,34,function(Math, exports, $efront_string__round, $efront_string__rando, $efront_string__quick, $efront_string__lengt1) {
    function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y];
        ary[y] = temp
    }
    function randomIntInRange(low, high) {
        return Math[$efront_string__round](low + Math[$efront_string__rando]() * (high - low))
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
    exports[$efront_string__quick] = function (ary, comparator) {
        doQuickSort(ary, comparator, 0, ary[$efront_string__lengt1] - 1)
    };
    return exports
}],
/** 105 $efront_string___arra */ '_array',
/** 106 $efront_string___sort */ '_sorted',
/** 107 $efront_string___last */ '_last',
/** 108 $efront_string__proto */ 'prototype',
/** 109 $efront_string__unsor */ 'unsortedForEach',
/** 110 $efront_string__forEa */ 'forEach',
/** 111 $efront_string__add_ */ 'add',
/** 112 $efront_string__push_ */ 'push',
/** 113 $efront_string__toArr */ 'toArray',
/** 114 $efront_string__sort_ */ 'sort',
/** 115 $efront_string__Mappi */ 'MappingList',
/** 116 source-map$lib$mapping-list.js */ [1,29,88,87,92,105,106,107,108,109,110,111,112,113,114,115,function(require, exports, $efront_string__gener1, $efront_string__gener, $efront_string__compa2, $efront_string___arra, $efront_string___sort, $efront_string___last, $efront_string__proto, $efront_string__unsor, $efront_string__forEa, $efront_string__add_, $efront_string__push_, $efront_string__toArr, $efront_string__sort_, $efront_string__Mappi) {
    var util = require(99);
    function generatedPositionAfter(mappingA, mappingB) {
        var lineA = mappingA[$efront_string__gener1];
        var lineB = mappingB[$efront_string__gener1];
        var columnA = mappingA[$efront_string__gener];
        var columnB = mappingB[$efront_string__gener];
        return lineB > lineA || lineB == lineA && columnB >= columnA || util[$efront_string__compa2](mappingA, mappingB) <= 0
    }
    function MappingList() {
        var _a;
        this[$efront_string___arra] = [];
        this[$efront_string___sort] = true;
        this[$efront_string___last] = (_a = {}, _a[$efront_string__gener1] = -1, _a[$efront_string__gener] = 0, _a)
    }
    MappingList[$efront_string__proto][$efront_string__unsor] = function MappingList_forEach(aCallback, aThisArg) {
        this[$efront_string___arra][$efront_string__forEa](aCallback, aThisArg)
    };
    MappingList[$efront_string__proto][$efront_string__add_] = function MappingList_add(aMapping) {
        if (generatedPositionAfter(this[$efront_string___last], aMapping)) {
            this[$efront_string___last] = aMapping;
            this[$efront_string___arra][$efront_string__push_](aMapping)
        } else {
            this[$efront_string___sort] = false;
            this[$efront_string___arra][$efront_string__push_](aMapping)
        }
    };
    MappingList[$efront_string__proto][$efront_string__toArr] = function MappingList_toArray() {
        if (!this[$efront_string___sort]) {
            this[$efront_string___arra][$efront_string__sort_](util[$efront_string__compa2]);
            this[$efront_string___sort] = true
        }
        return this[$efront_string___arra]
    };
    exports[$efront_string__Mappi] = MappingList;
    return exports
}],
/** 117 $efront_string__GREAT */ 'GREATEST_LOWER_BOUND',
/** 118 $efront_string__LEAST */ 'LEAST_UPPER_BOUND',
/** 119 $efront_string__floor */ 'floor',
/** 120 $efront_string__searc */ 'search',
/** 121 source-map$lib$binary-search.js */ [29,100,117,118,119,34,120,function(exports, Math, $efront_string__GREAT, $efront_string__LEAST, $efront_string__floor, $efront_string__lengt1, $efront_string__searc) {
    exports[$efront_string__GREAT] = 1;
    exports[$efront_string__LEAST] = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
        var mid = Math[$efront_string__floor]((aHigh - aLow) / 2) + aLow;
        var cmp = aCompare(aNeedle, aHaystack[mid], true);
        if (cmp === 0) {
            return mid
        } else if (cmp > 0) {
            if (aHigh - mid > 1) {
                return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias)
            }
            if (aBias == exports[$efront_string__LEAST]) {
                return aHigh < aHaystack[$efront_string__lengt1] ? aHigh : -1
            } else {
                return mid
            }
        } else {
            if (mid - aLow > 1) {
                return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias)
            }
            if (aBias == exports[$efront_string__LEAST]) {
                return mid
            } else {
                return aLow < 0 ? -1 : aLow
            }
        }
    }
    exports[$efront_string__searc] = function search(aNeedle, aHaystack, aCompare, aBias) {
        if (aHaystack[$efront_string__lengt1] === 0) {
            return -1
        }
        var index = recursiveSearch(-1, aHaystack[$efront_string__lengt1], aNeedle, aHaystack, aCompare, aBias || exports[$efront_string__GREAT]);
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
/** 122 $efront_string__Expec */ /** text */ 'Expected more digits in base 64 VLQ value.',
/** 123 $efront_string__Inval */ /** text */ 'Invalid base64 digit: ',
/** 124 $efront_string__value */ 'value',
/** 125 $efront_string__rest_ */ 'rest',
/** 126 source-map$lib$base64-vlq.js */ [1,29,38,33,36,34,122,83,123,66,124,125,function(require, exports, Error, $efront_string__encod, $efront_string__decod, $efront_string__lengt1, $efront_string__Expec, $efront_string__charC, $efront_string__Inval, $efront_string__charA, $efront_string__value, $efront_string__rest_) {
    var base64 = require(37);
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
    exports[$efront_string__encod] = function base64VLQ_encode(aValue) {
        var encoded = '';
        var digit;
        var vlq = toVLQSigned(aValue);
        do {
            digit = vlq & VLQ_BASE_MASK;
            vlq >>>= VLQ_BASE_SHIFT;
            if (vlq > 0) {
                digit |= VLQ_CONTINUATION_BIT
            }
            encoded += base64[$efront_string__encod](digit)
        } while (vlq > 0);
        return encoded
    };
    exports[$efront_string__decod] = function base64VLQ_decode(aStr, aIndex, aOutParam) {
        var strLen = aStr[$efront_string__lengt1];
        var result = 0;
        var shift = 0;
        var continuation, digit;
        do {
            if (aIndex >= strLen) {
                throw new Error($efront_string__Expec)
            }
            digit = base64[$efront_string__decod](aStr[$efront_string__charC](aIndex++));
            if (digit === -1) {
                throw new Error($efront_string__Inval + aStr[$efront_string__charA](aIndex - 1))
            }
            continuation = !!(digit & VLQ_CONTINUATION_BIT);
            digit &= VLQ_BASE_MASK;
            result = result + (digit << shift);
            shift += VLQ_BASE_SHIFT
        } while (continuation);
        aOutParam[$efront_string__value] = fromVLQSigned(result);
        aOutParam[$efront_string__rest_] = aIndex
    };
    return exports
}],
/** 127 Map */ typeof Map!=="undefined"?Map:void 0,
/** 128 $efront_string__hasOw */ 'hasOwnProperty',
/** 129 $efront_string__undef */ 'undefined',
/** 130 $efront_string___set_ */ '_set',
/** 131 $efront_string__fromA */ 'fromArray',
/** 132 $efront_string__size_ */ 'size',
/** 133 $efront_string__getOw */ 'getOwnPropertyNames',
/** 134 $efront_string__has_ */ 'has',
/** 135 $efront_string__call_1 */ 'call',
/** 136 $efront_string__set_ */ 'set',
/** 137 $efront_string__get_ */ 'get',
/** 138 $efront_string__is_no */ /** text */ '" is not in the set.',
/** 139 $efront_string__at_ */ 'at',
/** 140 $efront_string__No_el */ /** text */ 'No element indexed by ',
/** 141 $efront_string__Array */ 'ArraySet',
/** 142 source-map$lib$array-set.js */ [1,40,127,38,29,108,128,129,105,130,78,131,34,111,132,133,81,134,135,112,136,71,137,42,138,139,140,113,73,141,function(require, Object, Map, Error, exports, $efront_string__proto, $efront_string__hasOw, $efront_string__undef, $efront_string___arra, $efront_string___set_, $efront_string__creat, $efront_string__fromA, $efront_string__lengt1, $efront_string__add_, $efront_string__size_, $efront_string__getOw, $efront_string__toSet, $efront_string__has_, $efront_string__call_1, $efront_string__push_, $efront_string__set_, $efront_string__index1, $efront_string__get_, $efront_string__, $efront_string__is_no, $efront_string__at_, $efront_string__No_el, $efront_string__toArr, $efront_string__slice1, $efront_string__Array) {
    var util = require(99);
    var has = Object[$efront_string__proto][$efront_string__hasOw];
    var hasNativeMap = typeof Map !== $efront_string__undef;
    function ArraySet() {
        this[$efront_string___arra] = [];
        this[$efront_string___set_] = hasNativeMap ? new Map : Object[$efront_string__creat](null)
    }
    ArraySet[$efront_string__fromA] = function ArraySet_fromArray(aArray, aAllowDuplicates) {
        var set = new ArraySet;
        for (var i = 0, len = aArray[$efront_string__lengt1]; i < len; i++) {
            set[$efront_string__add_](aArray[i], aAllowDuplicates)
        }
        return set
    };
    ArraySet[$efront_string__proto][$efront_string__size_] = function ArraySet_size() {
        return hasNativeMap ? this[$efront_string___set_][$efront_string__size_] : Object[$efront_string__getOw](this[$efront_string___set_])[$efront_string__lengt1]
    };
    ArraySet[$efront_string__proto][$efront_string__add_] = function ArraySet_add(aStr, aAllowDuplicates) {
        var sStr = hasNativeMap ? aStr : util[$efront_string__toSet](aStr);
        var isDuplicate = hasNativeMap ? this[$efront_string__has_](aStr) : has[$efront_string__call_1](this[$efront_string___set_], sStr);
        var idx = this[$efront_string___arra][$efront_string__lengt1];
        if (!isDuplicate || aAllowDuplicates) {
            this[$efront_string___arra][$efront_string__push_](aStr)
        }
        if (!isDuplicate) {
            if (hasNativeMap) {
                this[$efront_string___set_][$efront_string__set_](aStr, idx)
            } else {
                this[$efront_string___set_][sStr] = idx
            }
        }
    };
    ArraySet[$efront_string__proto][$efront_string__has_] = function ArraySet_has(aStr) {
        if (hasNativeMap) {
            return this[$efront_string___set_][$efront_string__has_](aStr)
        } else {
            var sStr = util[$efront_string__toSet](aStr);
            return has[$efront_string__call_1](this[$efront_string___set_], sStr)
        }
    };
    ArraySet[$efront_string__proto][$efront_string__index1] = function ArraySet_indexOf(aStr) {
        if (hasNativeMap) {
            var idx = this[$efront_string___set_][$efront_string__get_](aStr);
            if (idx >= 0) {
                return idx
            }
        } else {
            var sStr = util[$efront_string__toSet](aStr);
            if (has[$efront_string__call_1](this[$efront_string___set_], sStr)) {
                return this[$efront_string___set_][sStr]
            }
        }
        throw new Error($efront_string__ + aStr + $efront_string__is_no)
    };
    ArraySet[$efront_string__proto][$efront_string__at_] = function ArraySet_at(aIdx) {
        if (aIdx >= 0 && aIdx < this[$efront_string___arra][$efront_string__lengt1]) {
            return this[$efront_string___arra][aIdx]
        }
        throw new Error($efront_string__No_el + aIdx)
    };
    ArraySet[$efront_string__proto][$efront_string__toArr] = function ArraySet_toArray() {
        return this[$efront_string___arra][$efront_string__slice1]()
    };
    exports[$efront_string__Array] = ArraySet;
    return exports
}],
/** 143 undefined */ undefined,
/** 144 String */ String,
/** 145 $efront_string___file */ '_file',
/** 146 $efront_string__file_ */ 'file',
/** 147 $efront_string___sour */ '_sourceRoot',
/** 148 $efront_string__sourc2 */ 'sourceRoot',
/** 149 $efront_string___skip */ '_skipValidation',
/** 150 $efront_string__skipV */ 'skipValidation',
/** 151 $efront_string___sour1 */ '_sources',
/** 152 $efront_string___name */ '_names',
/** 153 $efront_string___mapp */ '_mappings',
/** 154 $efront_string___sour2 */ '_sourcesContents',
/** 155 $efront_string___vers */ '_version',
/** 156 $efront_string__fromS1 */ 'fromSourceMap',
/** 157 $efront_string__eachM */ 'eachMapping',
/** 158 $efront_string__gener2 */ 'generated',
/** 159 $efront_string__line_ */ 'line',
/** 160 $efront_string__colum */ 'column',
/** 161 $efront_string__origi2 */ 'original',
/** 162 $efront_string__addMa */ 'addMapping',
/** 163 $efront_string__sourc3 */ 'sources',
/** 164 $efront_string__sourc4 */ 'sourceContentFor',
/** 165 $efront_string__setSo */ 'setSourceContent',
/** 166 $efront_string___vali */ '_validateMapping',
/** 167 $efront_string__keys_ */ 'keys',
/** 168 $efront_string__apply1 */ 'applySourceMap',
/** 169 $efront_string__Sourc */ /** text */ 'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ',
/** 170 $efront_string__or_th */ /** text */ 'or the source map\'s "file" property. Both were omitted.',
/** 171 $efront_string__origi3 */ 'originalPositionFor',
/** 172 $efront_string__numbe */ 'number',
/** 173 $efront_string__origi4 */ /** text */ 'original.line and original.column are not numbers -- you probably meant to omit ',
/** 174 $efront_string__the_o */ /** text */ 'the original mapping entirely and only map the generated position. If so, pass ',
/** 175 $efront_string__null_ */ /** text */ 'null for the original mapping instead of an object with empty or null values.',
/** 176 $efront_string__Inval1 */ /** text */ 'Invalid mapping: ',
/** 177 $efront_string__strin1 */ 'stringify',
/** 178 $efront_string___seri */ '_serializeMappings',
/** 179 $efront_string__9 */ ';',
/** 180 $efront_string__10 */ ',',
/** 181 $efront_string___gene */ '_generateSourcesContent',
/** 182 $efront_string__map_ */ 'map',
/** 183 $efront_string__toJSO */ 'toJSON',
/** 184 $efront_string__versi */ 'version',
/** 185 $efront_string__names */ 'names',
/** 186 $efront_string__mappi */ 'mappings',
/** 187 $efront_string__sourc5 */ 'sourcesContent',
/** 188 $efront_string__toStr */ 'toString',
/** 189 $efront_string__Sourc1 */ 'SourceMapGenerator',
/** 190 source-map$lib$source-map-generator.js */ [1,144,40,38,41,29,141,115,145,44,146,147,148,149,150,151,152,153,154,108,155,156,157,158,159,88,160,87,84,77,161,85,86,89,162,163,110,134,111,164,165,166,78,81,167,34,168,169,170,109,171,63,172,173,174,175,176,177,178,113,179,92,180,33,71,181,182,128,135,183,184,185,186,187,188,189,function(require, String, Object, Error, JSON, exports, $efront_string__Array, $efront_string__Mappi, $efront_string___file, $efront_string__getAr, $efront_string__file_, $efront_string___sour, $efront_string__sourc2, $efront_string___skip, $efront_string__skipV, $efront_string___sour1, $efront_string___name, $efront_string___mapp, $efront_string___sour2, $efront_string__proto, $efront_string___vers, $efront_string__fromS1, $efront_string__eachM, $efront_string__gener2, $efront_string__line_, $efront_string__gener1, $efront_string__colum, $efront_string__gener, $efront_string__sourc, $efront_string__relat, $efront_string__origi2, $efront_string__origi, $efront_string__origi1, $efront_string__name_, $efront_string__addMa, $efront_string__sourc3, $efront_string__forEa, $efront_string__has_, $efront_string__add_, $efront_string__sourc4, $efront_string__setSo, $efront_string___vali, $efront_string__creat, $efront_string__toSet, $efront_string__keys_, $efront_string__lengt1, $efront_string__apply1, $efront_string__Sourc, $efront_string__or_th, $efront_string__unsor, $efront_string__origi3, $efront_string__join_1, $efront_string__numbe, $efront_string__origi4, $efront_string__the_o, $efront_string__null_, $efront_string__Inval1, $efront_string__strin1, $efront_string___seri, $efront_string__toArr, $efront_string__9, $efront_string__compa2, $efront_string__10, $efront_string__encod, $efront_string__index1, $efront_string___gene, $efront_string__map_, $efront_string__hasOw, $efront_string__call_1, $efront_string__toJSO, $efront_string__versi, $efront_string__names, $efront_string__mappi, $efront_string__sourc5, $efront_string__toStr, $efront_string__Sourc1) {
    var base64VLQ = require(126);
    var util = require(99);
    var ArraySet = require(142)[$efront_string__Array];
    var MappingList = require(116)[$efront_string__Mappi];
    function SourceMapGenerator(aArgs) {
        if (!aArgs) {
            aArgs = {}
        }
        this[$efront_string___file] = util[$efront_string__getAr](aArgs, $efront_string__file_, null);
        this[$efront_string___sour] = util[$efront_string__getAr](aArgs, $efront_string__sourc2, null);
        this[$efront_string___skip] = util[$efront_string__getAr](aArgs, $efront_string__skipV, false);
        this[$efront_string___sour1] = new ArraySet;
        this[$efront_string___name] = new ArraySet;
        this[$efront_string___mapp] = new MappingList;
        this[$efront_string___sour2] = null
    }
    SourceMapGenerator[$efront_string__proto][$efront_string___vers] = 3;
    SourceMapGenerator[$efront_string__fromS1] = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
        var _a;
        var sourceRoot = aSourceMapConsumer[$efront_string__sourc2];
        var generator = new SourceMapGenerator((_a = {}, _a[$efront_string__file_] = aSourceMapConsumer[$efront_string__file_], _a[$efront_string__sourc2] = sourceRoot, _a));
        aSourceMapConsumer[$efront_string__eachM](function (mapping) {
            var _a, _b, _c;
            var newMapping = (_a = {}, _a[$efront_string__gener2] = (_b = {}, _b[$efront_string__line_] = mapping[$efront_string__gener1], _b[$efront_string__colum] = mapping[$efront_string__gener], _b), _a);
            if (mapping[$efront_string__sourc] != null) {
                newMapping[$efront_string__sourc] = mapping[$efront_string__sourc];
                if (sourceRoot != null) {
                    newMapping[$efront_string__sourc] = util[$efront_string__relat](sourceRoot, newMapping[$efront_string__sourc])
                }
                newMapping[$efront_string__origi2] = (_c = {}, _c[$efront_string__line_] = mapping[$efront_string__origi], _c[$efront_string__colum] = mapping[$efront_string__origi1], _c);
                if (mapping[$efront_string__name_] != null) {
                    newMapping[$efront_string__name_] = mapping[$efront_string__name_]
                }
            }
            generator[$efront_string__addMa](newMapping)
        });
        aSourceMapConsumer[$efront_string__sourc3][$efront_string__forEa](function (sourceFile) {
            var sourceRelative = sourceFile;
            if (sourceRoot !== null) {
                sourceRelative = util[$efront_string__relat](sourceRoot, sourceFile)
            }
            if (!generator[$efront_string___sour1][$efront_string__has_](sourceRelative)) {
                generator[$efront_string___sour1][$efront_string__add_](sourceRelative)
            }
            var content = aSourceMapConsumer[$efront_string__sourc4](sourceFile);
            if (content != null) {
                generator[$efront_string__setSo](sourceFile, content)
            }
        });
        return generator
    };
    SourceMapGenerator[$efront_string__proto][$efront_string__addMa] = function SourceMapGenerator_addMapping(aArgs) {
        var _a;
        var generated = util[$efront_string__getAr](aArgs, $efront_string__gener2);
        var original = util[$efront_string__getAr](aArgs, $efront_string__origi2, null);
        var source = util[$efront_string__getAr](aArgs, $efront_string__sourc, null);
        var name = util[$efront_string__getAr](aArgs, $efront_string__name_, null);
        if (!this[$efront_string___skip]) {
            this[$efront_string___vali](generated, original, source, name)
        }
        if (source != null) {
            source = String(source);
            if (!this[$efront_string___sour1][$efront_string__has_](source)) {
                this[$efront_string___sour1][$efront_string__add_](source)
            }
        }
        if (name != null) {
            name = String(name);
            if (!this[$efront_string___name][$efront_string__has_](name)) {
                this[$efront_string___name][$efront_string__add_](name)
            }
        }
        this[$efront_string___mapp][$efront_string__add_]((_a = {}, _a[$efront_string__gener1] = generated[$efront_string__line_], _a[$efront_string__gener] = generated[$efront_string__colum], _a[$efront_string__origi] = original != null && original[$efront_string__line_], _a[$efront_string__origi1] = original != null && original[$efront_string__colum], _a[$efront_string__sourc] = source, _a[$efront_string__name_] = name, _a))
    };
    SourceMapGenerator[$efront_string__proto][$efront_string__setSo] = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
        var source = aSourceFile;
        if (this[$efront_string___sour] != null) {
            source = util[$efront_string__relat](this[$efront_string___sour], source)
        }
        if (aSourceContent != null) {
            if (!this[$efront_string___sour2]) {
                this[$efront_string___sour2] = Object[$efront_string__creat](null)
            }
            this[$efront_string___sour2][util[$efront_string__toSet](source)] = aSourceContent
        } else if (this[$efront_string___sour2]) {
            delete this[$efront_string___sour2][util[$efront_string__toSet](source)];
            if (Object[$efront_string__keys_](this[$efront_string___sour2])[$efront_string__lengt1] === 0) {
                this[$efront_string___sour2] = null
            }
        }
    };
    SourceMapGenerator[$efront_string__proto][$efront_string__apply1] = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
        var sourceFile = aSourceFile;
        if (aSourceFile == null) {
            if (aSourceMapConsumer[$efront_string__file_] == null) {
                throw new Error($efront_string__Sourc + $efront_string__or_th)
            }
            sourceFile = aSourceMapConsumer[$efront_string__file_]
        }
        var sourceRoot = this[$efront_string___sour];
        if (sourceRoot != null) {
            sourceFile = util[$efront_string__relat](sourceRoot, sourceFile)
        }
        var newSources = new ArraySet;
        var newNames = new ArraySet;
        this[$efront_string___mapp][$efront_string__unsor](function (mapping) {
            var _a;
            if (mapping[$efront_string__sourc] === sourceFile && mapping[$efront_string__origi] != null) {
                var original = aSourceMapConsumer[$efront_string__origi3]((_a = {}, _a[$efront_string__line_] = mapping[$efront_string__origi], _a[$efront_string__colum] = mapping[$efront_string__origi1], _a));
                if (original[$efront_string__sourc] != null) {
                    mapping[$efront_string__sourc] = original[$efront_string__sourc];
                    if (aSourceMapPath != null) {
                        mapping[$efront_string__sourc] = util[$efront_string__join_1](aSourceMapPath, mapping[$efront_string__sourc])
                    }
                    if (sourceRoot != null) {
                        mapping[$efront_string__sourc] = util[$efront_string__relat](sourceRoot, mapping[$efront_string__sourc])
                    }
                    mapping[$efront_string__origi] = original[$efront_string__line_];
                    mapping[$efront_string__origi1] = original[$efront_string__colum];
                    if (original[$efront_string__name_] != null) {
                        mapping[$efront_string__name_] = original[$efront_string__name_]
                    }
                }
            }
            var source = mapping[$efront_string__sourc];
            if (source != null && !newSources[$efront_string__has_](source)) {
                newSources[$efront_string__add_](source)
            }
            var name = mapping[$efront_string__name_];
            if (name != null && !newNames[$efront_string__has_](name)) {
                newNames[$efront_string__add_](name)
            }
        }, this);
        this[$efront_string___sour1] = newSources;
        this[$efront_string___name] = newNames;
        aSourceMapConsumer[$efront_string__sourc3][$efront_string__forEa](function (sourceFile) {
            var content = aSourceMapConsumer[$efront_string__sourc4](sourceFile);
            if (content != null) {
                if (aSourceMapPath != null) {
                    sourceFile = util[$efront_string__join_1](aSourceMapPath, sourceFile)
                }
                if (sourceRoot != null) {
                    sourceFile = util[$efront_string__relat](sourceRoot, sourceFile)
                }
                this[$efront_string__setSo](sourceFile, content)
            }
        }, this)
    };
    SourceMapGenerator[$efront_string__proto][$efront_string___vali] = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
        var _a;
        if (aOriginal && typeof aOriginal[$efront_string__line_] !== $efront_string__numbe && typeof aOriginal[$efront_string__colum] !== $efront_string__numbe) {
            throw new Error($efront_string__origi4 + $efront_string__the_o + $efront_string__null_)
        }
        if (aGenerated && $efront_string__line_ in aGenerated && $efront_string__colum in aGenerated && aGenerated[$efront_string__line_] > 0 && aGenerated[$efront_string__colum] >= 0 && !aOriginal && !aSource && !aName) {
            return
        } else if (aGenerated && $efront_string__line_ in aGenerated && $efront_string__colum in aGenerated && aOriginal && $efront_string__line_ in aOriginal && $efront_string__colum in aOriginal && aGenerated[$efront_string__line_] > 0 && aGenerated[$efront_string__colum] >= 0 && aOriginal[$efront_string__line_] > 0 && aOriginal[$efront_string__colum] >= 0 && aSource) {
            return
        } else {
            throw new Error($efront_string__Inval1 + JSON[$efront_string__strin1]((_a = {}, _a[$efront_string__gener2] = aGenerated, _a[$efront_string__sourc] = aSource, _a[$efront_string__origi2] = aOriginal, _a[$efront_string__name_] = aName, _a)))
        }
    };
    SourceMapGenerator[$efront_string__proto][$efront_string___seri] = function SourceMapGenerator_serializeMappings() {
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
        var mappings = this[$efront_string___mapp][$efront_string__toArr]();
        for (var i = 0, len = mappings[$efront_string__lengt1]; i < len; i++) {
            mapping = mappings[i];
            next = '';
            if (mapping[$efront_string__gener1] !== previousGeneratedLine) {
                previousGeneratedColumn = 0;
                while (mapping[$efront_string__gener1] !== previousGeneratedLine) {
                    next += $efront_string__9;
                    previousGeneratedLine++
                }
            } else {
                if (i > 0) {
                    if (!util[$efront_string__compa2](mapping, mappings[i - 1])) {
                        continue
                    }
                    next += $efront_string__10
                }
            }
            next += base64VLQ[$efront_string__encod](mapping[$efront_string__gener] - previousGeneratedColumn);
            previousGeneratedColumn = mapping[$efront_string__gener];
            if (mapping[$efront_string__sourc] != null) {
                sourceIdx = this[$efront_string___sour1][$efront_string__index1](mapping[$efront_string__sourc]);
                next += base64VLQ[$efront_string__encod](sourceIdx - previousSource);
                previousSource = sourceIdx;
                next += base64VLQ[$efront_string__encod](mapping[$efront_string__origi] - 1 - previousOriginalLine);
                previousOriginalLine = mapping[$efront_string__origi] - 1;
                next += base64VLQ[$efront_string__encod](mapping[$efront_string__origi1] - previousOriginalColumn);
                previousOriginalColumn = mapping[$efront_string__origi1];
                if (mapping[$efront_string__name_] != null) {
                    nameIdx = this[$efront_string___name][$efront_string__index1](mapping[$efront_string__name_]);
                    next += base64VLQ[$efront_string__encod](nameIdx - previousName);
                    previousName = nameIdx
                }
            }
            result += next
        }
        return result
    };
    SourceMapGenerator[$efront_string__proto][$efront_string___gene] = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
        return aSources[$efront_string__map_](function (source) {
            if (!this[$efront_string___sour2]) {
                return null
            }
            if (aSourceRoot != null) {
                source = util[$efront_string__relat](aSourceRoot, source)
            }
            var key = util[$efront_string__toSet](source);
            return Object[$efront_string__proto][$efront_string__hasOw][$efront_string__call_1](this[$efront_string___sour2], key) ? this[$efront_string___sour2][key] : null
        }, this)
    };
    SourceMapGenerator[$efront_string__proto][$efront_string__toJSO] = function SourceMapGenerator_toJSON() {
        var _a;
        var map = (_a = {}, _a[$efront_string__versi] = this[$efront_string___vers], _a[$efront_string__sourc3] = this[$efront_string___sour1][$efront_string__toArr](), _a[$efront_string__names] = this[$efront_string___name][$efront_string__toArr](), _a[$efront_string__mappi] = this[$efront_string___seri](), _a);
        if (this[$efront_string___file] != null) {
            map[$efront_string__file_] = this[$efront_string___file]
        }
        if (this[$efront_string___sour] != null) {
            map[$efront_string__sourc2] = this[$efront_string___sour]
        }
        if (this[$efront_string___sour2]) {
            map[$efront_string__sourc5] = this[$efront_string___gene](map[$efront_string__sourc3], map[$efront_string__sourc2])
        }
        return map
    };
    SourceMapGenerator[$efront_string__proto][$efront_string__toStr] = function SourceMapGenerator_toString() {
        return JSON[$efront_string__strin1](this[$efront_string__toJSO]())
    };
    exports[$efront_string__Sourc1] = SourceMapGenerator;
    return exports
}],
/** 191 $efront_string__strin2 */ 'string',
/** 192 $efront_string__secti */ 'sections',
/** 193 $efront_string____gen */ '__generatedMappings',
/** 194 $efront_string__defin */ 'defineProperty',
/** 195 $efront_string___gene1 */ '_generatedMappings',
/** 196 $efront_string__confi */ 'configurable',
/** 197 $efront_string__enume */ 'enumerable',
/** 198 $efront_string___pars */ '_parseMappings',
/** 199 $efront_string____ori */ '__originalMappings',
/** 200 $efront_string___orig */ '_originalMappings',
/** 201 $efront_string___char */ '_charIsMappingSeparator',
/** 202 $efront_string__Subcl */ /** text */ 'Subclasses must implement _parseMappings',
/** 203 $efront_string__GENER */ 'GENERATED_ORDER',
/** 204 $efront_string__ORIGI */ 'ORIGINAL_ORDER',
/** 205 $efront_string__Unkno */ /** text */ 'Unknown order of iteration.',
/** 206 $efront_string___sour3 */ '_sourceMapURL',
/** 207 $efront_string__allGe */ 'allGeneratedPositionsFor',
/** 208 $efront_string___find */ '_findSourceIndex',
/** 209 $efront_string___find1 */ '_findMapping',
/** 210 $efront_string__lastC */ 'lastColumn',
/** 211 $efront_string__lastG */ 'lastGeneratedColumn',
/** 212 $efront_string__Sourc2 */ 'SourceMapConsumer',
/** 213 $efront_string__Unsup */ /** text */ 'Unsupported version: ',
/** 214 $efront_string___abso */ '_absoluteSources',
/** 215 $efront_string__consu */ 'consumer',
/** 216 $efront_string__Found */ /** text */ 'Found a source, but no line and column',
/** 217 $efront_string__Found1 */ /** text */ 'Found a source and line, but no column',
/** 218 $efront_string__Line_ */ /** text */ 'Line must be greater than or equal to 1, got ',
/** 219 $efront_string__Colum */ /** text */ 'Column must be greater than or equal to 0, got ',
/** 220 $efront_string__compu1 */ 'computeColumnSpans',
/** 221 $efront_string__bias_ */ 'bias',
/** 222 $efront_string__hasCo */ 'hasContentsOfAllSources',
/** 223 $efront_string__some_ */ 'some',
/** 224 $efront_regexp__file_1 */ /^file:\/\//,
/** 225 $efront_string__is_no1 */ /** text */ '" is not in the SourceMap.',
/** 226 $efront_string__gener3 */ 'generatedPositionFor',
/** 227 $efront_string__Basic */ 'BasicSourceMapConsumer',
/** 228 $efront_string___sect */ '_sections',
/** 229 $efront_string__url_ */ 'url',
/** 230 $efront_string__Suppo */ /** text */ 'Support for url field in sections not implemented.',
/** 231 $efront_string__offse */ 'offset',
/** 232 $efront_string__Secti */ /** text */ 'Section offsets must be ordered and non-overlapping.',
/** 233 $efront_string__gener4 */ 'generatedOffset',
/** 234 $efront_string__const */ 'constructor',
/** 235 $efront_string__every */ 'every',
/** 236 $efront_string__Index */ 'IndexedSourceMapConsumer',
/** 237 source-map$lib$source-map-consumer.js */ [1,40,38,143,29,144,30,141,103,191,95,192,156,108,155,193,194,195,196,197,137,198,153,148,199,200,201,66,179,180,202,203,204,117,118,157,205,182,84,151,139,98,206,88,87,85,86,89,152,110,207,44,159,160,208,209,90,112,210,211,212,184,163,185,187,186,146,213,65,58,77,131,214,113,78,215,134,71,34,147,181,145,73,36,124,125,216,217,172,91,218,219,120,220,171,221,222,132,223,164,53,67,224,48,52,64,42,225,226,227,228,229,230,231,232,233,234,235,111,236,function(require, Object, Error, undefined, exports, String, TypeError, $efront_string__Array, $efront_string__quick, $efront_string__strin2, $efront_string__parse1, $efront_string__secti, $efront_string__fromS1, $efront_string__proto, $efront_string___vers, $efront_string____gen, $efront_string__defin, $efront_string___gene1, $efront_string__confi, $efront_string__enume, $efront_string__get_, $efront_string___pars, $efront_string___mapp, $efront_string__sourc2, $efront_string____ori, $efront_string___orig, $efront_string___char, $efront_string__charA, $efront_string__9, $efront_string__10, $efront_string__Subcl, $efront_string__GENER, $efront_string__ORIGI, $efront_string__GREAT, $efront_string__LEAST, $efront_string__eachM, $efront_string__Unkno, $efront_string__map_, $efront_string__sourc, $efront_string___sour1, $efront_string__at_, $efront_string__compu, $efront_string___sour3, $efront_string__gener1, $efront_string__gener, $efront_string__origi, $efront_string__origi1, $efront_string__name_, $efront_string___name, $efront_string__forEa, $efront_string__allGe, $efront_string__getAr, $efront_string__line_, $efront_string__colum, $efront_string___find, $efront_string___find1, $efront_string__compa, $efront_string__push_, $efront_string__lastC, $efront_string__lastG, $efront_string__Sourc2, $efront_string__versi, $efront_string__sourc3, $efront_string__names, $efront_string__sourc5, $efront_string__mappi, $efront_string__file_, $efront_string__Unsup, $efront_string__norma, $efront_string__isAbs, $efront_string__relat, $efront_string__fromA, $efront_string___abso, $efront_string__toArr, $efront_string__creat, $efront_string__consu, $efront_string__has_, $efront_string__index1, $efront_string__lengt1, $efront_string___sour, $efront_string___gene, $efront_string___file, $efront_string__slice1, $efront_string__decod, $efront_string__value, $efront_string__rest_, $efront_string__Found, $efront_string__Found1, $efront_string__numbe, $efront_string__compa1, $efront_string__Line_, $efront_string__Colum, $efront_string__searc, $efront_string__compu1, $efront_string__origi3, $efront_string__bias_, $efront_string__hasCo, $efront_string__size_, $efront_string__some_, $efront_string__sourc4, $efront_string__urlPa, $efront_string__repla, $efront_regexp__file_1, $efront_string__schem, $efront_string__path_, $efront_string__7, $efront_string__, $efront_string__is_no1, $efront_string__gener3, $efront_string__Basic, $efront_string___sect, $efront_string__url_, $efront_string__Suppo, $efront_string__offse, $efront_string__Secti, $efront_string__gener4, $efront_string__const, $efront_string__every, $efront_string__add_, $efront_string__Index) {
    var _a, _b, _c, _d;
    var util = require(99);
    var binarySearch = require(121);
    var ArraySet = require(142)[$efront_string__Array];
    var base64VLQ = require(126);
    var quickSort = require(104)[$efront_string__quick];
    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === $efront_string__strin2) {
            sourceMap = util[$efront_string__parse1](aSourceMap)
        }
        return sourceMap[$efront_string__secti] != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL)
    }
    SourceMapConsumer[$efront_string__fromS1] = function (aSourceMap, aSourceMapURL) {
        return BasicSourceMapConsumer[$efront_string__fromS1](aSourceMap, aSourceMapURL)
    };
    SourceMapConsumer[$efront_string__proto][$efront_string___vers] = 3;
    SourceMapConsumer[$efront_string__proto][$efront_string____gen] = null;
    Object[$efront_string__defin](SourceMapConsumer[$efront_string__proto], $efront_string___gene1, (_a = {}, _a[$efront_string__confi] = true, _a[$efront_string__enume] = true, _a[$efront_string__get_] = function () {
        if (!this[$efront_string____gen]) {
            this[$efront_string___pars](this[$efront_string___mapp], this[$efront_string__sourc2])
        }
        return this[$efront_string____gen]
    }, _a));
    SourceMapConsumer[$efront_string__proto][$efront_string____ori] = null;
    Object[$efront_string__defin](SourceMapConsumer[$efront_string__proto], $efront_string___orig, (_b = {}, _b[$efront_string__confi] = true, _b[$efront_string__enume] = true, _b[$efront_string__get_] = function () {
        if (!this[$efront_string____ori]) {
            this[$efront_string___pars](this[$efront_string___mapp], this[$efront_string__sourc2])
        }
        return this[$efront_string____ori]
    }, _b));
    SourceMapConsumer[$efront_string__proto][$efront_string___char] = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
        var c = aStr[$efront_string__charA](index);
        return c === $efront_string__9 || c === $efront_string__10
    };
    SourceMapConsumer[$efront_string__proto][$efront_string___pars] = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        throw new Error($efront_string__Subcl)
    };
    SourceMapConsumer[$efront_string__GENER] = 1;
    SourceMapConsumer[$efront_string__ORIGI] = 2;
    SourceMapConsumer[$efront_string__GREAT] = 1;
    SourceMapConsumer[$efront_string__LEAST] = 2;
    SourceMapConsumer[$efront_string__proto][$efront_string__eachM] = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
        var context = aContext || null;
        var order = aOrder || SourceMapConsumer[$efront_string__GENER];
        var mappings;
        switch (order) {
        case SourceMapConsumer[$efront_string__GENER]:
            mappings = this[$efront_string___gene1];
            break;
        case SourceMapConsumer[$efront_string__ORIGI]:
            mappings = this[$efront_string___orig];
            break;
        default:
            throw new Error($efront_string__Unkno)
        }
        var sourceRoot = this[$efront_string__sourc2];
        mappings[$efront_string__map_](function (mapping) {
            var _a;
            var source = mapping[$efront_string__sourc] === null ? null : this[$efront_string___sour1][$efront_string__at_](mapping[$efront_string__sourc]);
            source = util[$efront_string__compu](sourceRoot, source, this[$efront_string___sour3]);
            return _a = {}, _a[$efront_string__sourc] = source, _a[$efront_string__gener1] = mapping[$efront_string__gener1], _a[$efront_string__gener] = mapping[$efront_string__gener], _a[$efront_string__origi] = mapping[$efront_string__origi], _a[$efront_string__origi1] = mapping[$efront_string__origi1], _a[$efront_string__name_] = mapping[$efront_string__name_] === null ? null : this[$efront_string___name][$efront_string__at_](mapping[$efront_string__name_]), _a
        }, this)[$efront_string__forEa](aCallback, context)
    };
    SourceMapConsumer[$efront_string__proto][$efront_string__allGe] = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
        var _a, _b, _c;
        var line = util[$efront_string__getAr](aArgs, $efront_string__line_);
        var needle = (_a = {}, _a[$efront_string__sourc] = util[$efront_string__getAr](aArgs, $efront_string__sourc), _a[$efront_string__origi] = line, _a[$efront_string__origi1] = util[$efront_string__getAr](aArgs, $efront_string__colum, 0), _a);
        needle[$efront_string__sourc] = this[$efront_string___find](needle[$efront_string__sourc]);
        if (needle[$efront_string__sourc] < 0) {
            return []
        }
        var mappings = [];
        var index = this[$efront_string___find1](needle, this[$efront_string___orig], $efront_string__origi, $efront_string__origi1, util[$efront_string__compa], binarySearch[$efront_string__LEAST]);
        if (index >= 0) {
            var mapping = this[$efront_string___orig][index];
            if (aArgs[$efront_string__colum] === undefined) {
                var originalLine = mapping[$efront_string__origi];
                while (mapping && mapping[$efront_string__origi] === originalLine) {
                    mappings[$efront_string__push_]((_b = {}, _b[$efront_string__line_] = util[$efront_string__getAr](mapping, $efront_string__gener1, null), _b[$efront_string__colum] = util[$efront_string__getAr](mapping, $efront_string__gener, null), _b[$efront_string__lastC] = util[$efront_string__getAr](mapping, $efront_string__lastG, null), _b));
                    mapping = this[$efront_string___orig][++index]
                }
            } else {
                var originalColumn = mapping[$efront_string__origi1];
                while (mapping && mapping[$efront_string__origi] === line && mapping[$efront_string__origi1] == originalColumn) {
                    mappings[$efront_string__push_]((_c = {}, _c[$efront_string__line_] = util[$efront_string__getAr](mapping, $efront_string__gener1, null), _c[$efront_string__colum] = util[$efront_string__getAr](mapping, $efront_string__gener, null), _c[$efront_string__lastC] = util[$efront_string__getAr](mapping, $efront_string__lastG, null), _c));
                    mapping = this[$efront_string___orig][++index]
                }
            }
        }
        return mappings
    };
    exports[$efront_string__Sourc2] = SourceMapConsumer;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === $efront_string__strin2) {
            sourceMap = util[$efront_string__parse1](aSourceMap)
        }
        var version = util[$efront_string__getAr](sourceMap, $efront_string__versi);
        var sources = util[$efront_string__getAr](sourceMap, $efront_string__sourc3);
        var names = util[$efront_string__getAr](sourceMap, $efront_string__names, []);
        var sourceRoot = util[$efront_string__getAr](sourceMap, $efront_string__sourc2, null);
        var sourcesContent = util[$efront_string__getAr](sourceMap, $efront_string__sourc5, null);
        var mappings = util[$efront_string__getAr](sourceMap, $efront_string__mappi);
        var file = util[$efront_string__getAr](sourceMap, $efront_string__file_, null);
        if (version != this[$efront_string___vers]) {
            throw new Error($efront_string__Unsup + version)
        }
        if (sourceRoot) {
            sourceRoot = util[$efront_string__norma](sourceRoot)
        }
        sources = sources[$efront_string__map_](String)[$efront_string__map_](util[$efront_string__norma])[$efront_string__map_](function (source) {
            return sourceRoot && util[$efront_string__isAbs](sourceRoot) && util[$efront_string__isAbs](source) ? util[$efront_string__relat](sourceRoot, source) : source
        });
        this[$efront_string___name] = ArraySet[$efront_string__fromA](names[$efront_string__map_](String), true);
        this[$efront_string___sour1] = ArraySet[$efront_string__fromA](sources, true);
        this[$efront_string___abso] = this[$efront_string___sour1][$efront_string__toArr]()[$efront_string__map_](function (s) {
            return util[$efront_string__compu](sourceRoot, s, aSourceMapURL)
        });
        this[$efront_string__sourc2] = sourceRoot;
        this[$efront_string__sourc5] = sourcesContent;
        this[$efront_string___mapp] = mappings;
        this[$efront_string___sour3] = aSourceMapURL;
        this[$efront_string__file_] = file
    }
    BasicSourceMapConsumer[$efront_string__proto] = Object[$efront_string__creat](SourceMapConsumer[$efront_string__proto]);
    BasicSourceMapConsumer[$efront_string__proto][$efront_string__consu] = SourceMapConsumer;
    BasicSourceMapConsumer[$efront_string__proto][$efront_string___find] = function (aSource) {
        var relativeSource = aSource;
        if (this[$efront_string__sourc2] != null) {
            relativeSource = util[$efront_string__relat](this[$efront_string__sourc2], relativeSource)
        }
        if (this[$efront_string___sour1][$efront_string__has_](relativeSource)) {
            return this[$efront_string___sour1][$efront_string__index1](relativeSource)
        }
        var i;
        for (i = 0; i < this[$efront_string___abso][$efront_string__lengt1]; ++i) {
            if (this[$efront_string___abso][i] == aSource) {
                return i
            }
        }
        return -1
    };
    BasicSourceMapConsumer[$efront_string__fromS1] = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
        var smc = Object[$efront_string__creat](BasicSourceMapConsumer[$efront_string__proto]);
        var names = smc[$efront_string___name] = ArraySet[$efront_string__fromA](aSourceMap[$efront_string___name][$efront_string__toArr](), true);
        var sources = smc[$efront_string___sour1] = ArraySet[$efront_string__fromA](aSourceMap[$efront_string___sour1][$efront_string__toArr](), true);
        smc[$efront_string__sourc2] = aSourceMap[$efront_string___sour];
        smc[$efront_string__sourc5] = aSourceMap[$efront_string___gene](smc[$efront_string___sour1][$efront_string__toArr](), smc[$efront_string__sourc2]);
        smc[$efront_string__file_] = aSourceMap[$efront_string___file];
        smc[$efront_string___sour3] = aSourceMapURL;
        smc[$efront_string___abso] = smc[$efront_string___sour1][$efront_string__toArr]()[$efront_string__map_](function (s) {
            return util[$efront_string__compu](smc[$efront_string__sourc2], s, aSourceMapURL)
        });
        var generatedMappings = aSourceMap[$efront_string___mapp][$efront_string__toArr]()[$efront_string__slice1]();
        var destGeneratedMappings = smc[$efront_string____gen] = [];
        var destOriginalMappings = smc[$efront_string____ori] = [];
        for (var i = 0, length = generatedMappings[$efront_string__lengt1]; i < length; i++) {
            var srcMapping = generatedMappings[i];
            var destMapping = new Mapping;
            destMapping[$efront_string__gener1] = srcMapping[$efront_string__gener1];
            destMapping[$efront_string__gener] = srcMapping[$efront_string__gener];
            if (srcMapping[$efront_string__sourc]) {
                destMapping[$efront_string__sourc] = sources[$efront_string__index1](srcMapping[$efront_string__sourc]);
                destMapping[$efront_string__origi] = srcMapping[$efront_string__origi];
                destMapping[$efront_string__origi1] = srcMapping[$efront_string__origi1];
                if (srcMapping[$efront_string__name_]) {
                    destMapping[$efront_string__name_] = names[$efront_string__index1](srcMapping[$efront_string__name_])
                }
                destOriginalMappings[$efront_string__push_](destMapping)
            }
            destGeneratedMappings[$efront_string__push_](destMapping)
        }
        quickSort(smc[$efront_string____ori], util[$efront_string__compa]);
        return smc
    };
    BasicSourceMapConsumer[$efront_string__proto][$efront_string___vers] = 3;
    Object[$efront_string__defin](BasicSourceMapConsumer[$efront_string__proto], $efront_string__sourc3, (_c = {}, _c[$efront_string__get_] = function () {
        return this[$efront_string___abso][$efront_string__slice1]()
    }, _c));
    function Mapping() {
        this[$efront_string__gener1] = 0;
        this[$efront_string__gener] = 0;
        this[$efront_string__sourc] = null;
        this[$efront_string__origi] = null;
        this[$efront_string__origi1] = null;
        this[$efront_string__name_] = null
    }
    BasicSourceMapConsumer[$efront_string__proto][$efront_string___pars] = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        var generatedLine = 1;
        var previousGeneratedColumn = 0;
        var previousOriginalLine = 0;
        var previousOriginalColumn = 0;
        var previousSource = 0;
        var previousName = 0;
        var length = aStr[$efront_string__lengt1];
        var index = 0;
        var cachedSegments = {};
        var temp = {};
        var originalMappings = [];
        var generatedMappings = [];
        var mapping, str, segment, end, value;
        while (index < length) {
            if (aStr[$efront_string__charA](index) === $efront_string__9) {
                generatedLine++;
                index++;
                previousGeneratedColumn = 0
            } else if (aStr[$efront_string__charA](index) === $efront_string__10) {
                index++
            } else {
                mapping = new Mapping;
                mapping[$efront_string__gener1] = generatedLine;
                for (end = index; end < length; end++) {
                    if (this[$efront_string___char](aStr, end)) {
                        break
                    }
                }
                str = aStr[$efront_string__slice1](index, end);
                segment = cachedSegments[str];
                if (segment) {
                    index += str[$efront_string__lengt1]
                } else {
                    segment = [];
                    while (index < end) {
                        base64VLQ[$efront_string__decod](aStr, index, temp);
                        value = temp[$efront_string__value];
                        index = temp[$efront_string__rest_];
                        segment[$efront_string__push_](value)
                    }
                    if (segment[$efront_string__lengt1] === 2) {
                        throw new Error($efront_string__Found)
                    }
                    if (segment[$efront_string__lengt1] === 3) {
                        throw new Error($efront_string__Found1)
                    }
                    cachedSegments[str] = segment
                }
                mapping[$efront_string__gener] = previousGeneratedColumn + segment[0];
                previousGeneratedColumn = mapping[$efront_string__gener];
                if (segment[$efront_string__lengt1] > 1) {
                    mapping[$efront_string__sourc] = previousSource + segment[1];
                    previousSource += segment[1];
                    mapping[$efront_string__origi] = previousOriginalLine + segment[2];
                    previousOriginalLine = mapping[$efront_string__origi];
                    mapping[$efront_string__origi] += 1;
                    mapping[$efront_string__origi1] = previousOriginalColumn + segment[3];
                    previousOriginalColumn = mapping[$efront_string__origi1];
                    if (segment[$efront_string__lengt1] > 4) {
                        mapping[$efront_string__name_] = previousName + segment[4];
                        previousName += segment[4]
                    }
                }
                generatedMappings[$efront_string__push_](mapping);
                if (typeof mapping[$efront_string__origi] === $efront_string__numbe) {
                    originalMappings[$efront_string__push_](mapping)
                }
            }
        }
        quickSort(generatedMappings, util[$efront_string__compa1]);
        this[$efront_string____gen] = generatedMappings;
        quickSort(originalMappings, util[$efront_string__compa]);
        this[$efront_string____ori] = originalMappings
    };
    BasicSourceMapConsumer[$efront_string__proto][$efront_string___find1] = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
        if (aNeedle[aLineName] <= 0) {
            throw new TypeError($efront_string__Line_ + aNeedle[aLineName])
        }
        if (aNeedle[aColumnName] < 0) {
            throw new TypeError($efront_string__Colum + aNeedle[aColumnName])
        }
        return binarySearch[$efront_string__searc](aNeedle, aMappings, aComparator, aBias)
    };
    BasicSourceMapConsumer[$efront_string__proto][$efront_string__compu1] = function SourceMapConsumer_computeColumnSpans() {
        for (var index = 0; index < this[$efront_string___gene1][$efront_string__lengt1]; ++index) {
            var mapping = this[$efront_string___gene1][index];
            if (index + 1 < this[$efront_string___gene1][$efront_string__lengt1]) {
                var nextMapping = this[$efront_string___gene1][index + 1];
                if (mapping[$efront_string__gener1] === nextMapping[$efront_string__gener1]) {
                    mapping[$efront_string__lastG] = nextMapping[$efront_string__gener] - 1;
                    continue
                }
            }
            mapping[$efront_string__lastG] = Infinity
        }
    };
    BasicSourceMapConsumer[$efront_string__proto][$efront_string__origi3] = function SourceMapConsumer_originalPositionFor(aArgs) {
        var _a, _b, _c;
        var needle = (_a = {}, _a[$efront_string__gener1] = util[$efront_string__getAr](aArgs, $efront_string__line_), _a[$efront_string__gener] = util[$efront_string__getAr](aArgs, $efront_string__colum), _a);
        var index = this[$efront_string___find1](needle, this[$efront_string___gene1], $efront_string__gener1, $efront_string__gener, util[$efront_string__compa1], util[$efront_string__getAr](aArgs, $efront_string__bias_, SourceMapConsumer[$efront_string__GREAT]));
        if (index >= 0) {
            var mapping = this[$efront_string___gene1][index];
            if (mapping[$efront_string__gener1] === needle[$efront_string__gener1]) {
                var source = util[$efront_string__getAr](mapping, $efront_string__sourc, null);
                if (source !== null) {
                    source = this[$efront_string___sour1][$efront_string__at_](source);
                    source = util[$efront_string__compu](this[$efront_string__sourc2], source, this[$efront_string___sour3])
                }
                var name = util[$efront_string__getAr](mapping, $efront_string__name_, null);
                if (name !== null) {
                    name = this[$efront_string___name][$efront_string__at_](name)
                }
                return _b = {}, _b[$efront_string__sourc] = source, _b[$efront_string__line_] = util[$efront_string__getAr](mapping, $efront_string__origi, null), _b[$efront_string__colum] = util[$efront_string__getAr](mapping, $efront_string__origi1, null), _b[$efront_string__name_] = name, _b
            }
        }
        return _c = {}, _c[$efront_string__sourc] = null, _c[$efront_string__line_] = null, _c[$efront_string__colum] = null, _c[$efront_string__name_] = null, _c
    };
    BasicSourceMapConsumer[$efront_string__proto][$efront_string__hasCo] = function BasicSourceMapConsumer_hasContentsOfAllSources() {
        if (!this[$efront_string__sourc5]) {
            return false
        }
        return this[$efront_string__sourc5][$efront_string__lengt1] >= this[$efront_string___sour1][$efront_string__size_]() && !this[$efront_string__sourc5][$efront_string__some_](function (sc) {
            return sc == null
        })
    };
    BasicSourceMapConsumer[$efront_string__proto][$efront_string__sourc4] = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        if (!this[$efront_string__sourc5]) {
            return null
        }
        var index = this[$efront_string___find](aSource);
        if (index >= 0) {
            return this[$efront_string__sourc5][index]
        }
        var relativeSource = aSource;
        if (this[$efront_string__sourc2] != null) {
            relativeSource = util[$efront_string__relat](this[$efront_string__sourc2], relativeSource)
        }
        var url;
        if (this[$efront_string__sourc2] != null && (url = util[$efront_string__urlPa](this[$efront_string__sourc2]))) {
            var fileUriAbsPath = relativeSource[$efront_string__repla]($efront_regexp__file_1, '');
            if (url[$efront_string__schem] == $efront_string__file_ && this[$efront_string___sour1][$efront_string__has_](fileUriAbsPath)) {
                return this[$efront_string__sourc5][this[$efront_string___sour1][$efront_string__index1](fileUriAbsPath)]
            }
            if ((!url[$efront_string__path_] || url[$efront_string__path_] == $efront_string__7) && this[$efront_string___sour1][$efront_string__has_]($efront_string__7 + relativeSource)) {
                return this[$efront_string__sourc5][this[$efront_string___sour1][$efront_string__index1]($efront_string__7 + relativeSource)]
            }
        }
        if (nullOnMissing) {
            return null
        } else {
            throw new Error($efront_string__ + relativeSource + $efront_string__is_no1)
        }
    };
    BasicSourceMapConsumer[$efront_string__proto][$efront_string__gener3] = function SourceMapConsumer_generatedPositionFor(aArgs) {
        var _a, _b, _c, _d;
        var source = util[$efront_string__getAr](aArgs, $efront_string__sourc);
        source = this[$efront_string___find](source);
        if (source < 0) {
            return _a = {}, _a[$efront_string__line_] = null, _a[$efront_string__colum] = null, _a[$efront_string__lastC] = null, _a
        }
        var needle = (_b = {}, _b[$efront_string__sourc] = source, _b[$efront_string__origi] = util[$efront_string__getAr](aArgs, $efront_string__line_), _b[$efront_string__origi1] = util[$efront_string__getAr](aArgs, $efront_string__colum), _b);
        var index = this[$efront_string___find1](needle, this[$efront_string___orig], $efront_string__origi, $efront_string__origi1, util[$efront_string__compa], util[$efront_string__getAr](aArgs, $efront_string__bias_, SourceMapConsumer[$efront_string__GREAT]));
        if (index >= 0) {
            var mapping = this[$efront_string___orig][index];
            if (mapping[$efront_string__sourc] === needle[$efront_string__sourc]) {
                return _c = {}, _c[$efront_string__line_] = util[$efront_string__getAr](mapping, $efront_string__gener1, null), _c[$efront_string__colum] = util[$efront_string__getAr](mapping, $efront_string__gener, null), _c[$efront_string__lastC] = util[$efront_string__getAr](mapping, $efront_string__lastG, null), _c
            }
        }
        return _d = {}, _d[$efront_string__line_] = null, _d[$efront_string__colum] = null, _d[$efront_string__lastC] = null, _d
    };
    exports[$efront_string__Basic] = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
        var _a;
        var sourceMap = aSourceMap;
        if (typeof aSourceMap === $efront_string__strin2) {
            sourceMap = util[$efront_string__parse1](aSourceMap)
        }
        var version = util[$efront_string__getAr](sourceMap, $efront_string__versi);
        var sections = util[$efront_string__getAr](sourceMap, $efront_string__secti);
        if (version != this[$efront_string___vers]) {
            throw new Error($efront_string__Unsup + version)
        }
        this[$efront_string___sour1] = new ArraySet;
        this[$efront_string___name] = new ArraySet;
        var lastOffset = (_a = {}, _a[$efront_string__line_] = -1, _a[$efront_string__colum] = 0, _a);
        this[$efront_string___sect] = sections[$efront_string__map_](function (s) {
            var _a, _b;
            if (s[$efront_string__url_]) {
                throw new Error($efront_string__Suppo)
            }
            var offset = util[$efront_string__getAr](s, $efront_string__offse);
            var offsetLine = util[$efront_string__getAr](offset, $efront_string__line_);
            var offsetColumn = util[$efront_string__getAr](offset, $efront_string__colum);
            if (offsetLine < lastOffset[$efront_string__line_] || offsetLine === lastOffset[$efront_string__line_] && offsetColumn < lastOffset[$efront_string__colum]) {
                throw new Error($efront_string__Secti)
            }
            lastOffset = offset;
            return _a = {}, _a[$efront_string__gener4] = (_b = {}, _b[$efront_string__gener1] = offsetLine + 1, _b[$efront_string__gener] = offsetColumn + 1, _b), _a[$efront_string__consu] = new SourceMapConsumer(util[$efront_string__getAr](s, $efront_string__map_), aSourceMapURL), _a
        })
    }
    IndexedSourceMapConsumer[$efront_string__proto] = Object[$efront_string__creat](SourceMapConsumer[$efront_string__proto]);
    IndexedSourceMapConsumer[$efront_string__proto][$efront_string__const] = SourceMapConsumer;
    IndexedSourceMapConsumer[$efront_string__proto][$efront_string___vers] = 3;
    Object[$efront_string__defin](IndexedSourceMapConsumer[$efront_string__proto], $efront_string__sourc3, (_d = {}, _d[$efront_string__get_] = function () {
        var sources = [];
        for (var i = 0; i < this[$efront_string___sect][$efront_string__lengt1]; i++) {
            for (var j = 0; j < this[$efront_string___sect][i][$efront_string__consu][$efront_string__sourc3][$efront_string__lengt1]; j++) {
                sources[$efront_string__push_](this[$efront_string___sect][i][$efront_string__consu][$efront_string__sourc3][j])
            }
        }
        return sources
    }, _d));
    IndexedSourceMapConsumer[$efront_string__proto][$efront_string__origi3] = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
        var _a, _b, _c;
        var needle = (_a = {}, _a[$efront_string__gener1] = util[$efront_string__getAr](aArgs, $efront_string__line_), _a[$efront_string__gener] = util[$efront_string__getAr](aArgs, $efront_string__colum), _a);
        var sectionIndex = binarySearch[$efront_string__searc](needle, this[$efront_string___sect], function (needle, section) {
            var cmp = needle[$efront_string__gener1] - section[$efront_string__gener4][$efront_string__gener1];
            if (cmp) {
                return cmp
            }
            return needle[$efront_string__gener] - section[$efront_string__gener4][$efront_string__gener]
        });
        var section = this[$efront_string___sect][sectionIndex];
        if (!section) {
            return _b = {}, _b[$efront_string__sourc] = null, _b[$efront_string__line_] = null, _b[$efront_string__colum] = null, _b[$efront_string__name_] = null, _b
        }
        return section[$efront_string__consu][$efront_string__origi3]((_c = {}, _c[$efront_string__line_] = needle[$efront_string__gener1] - (section[$efront_string__gener4][$efront_string__gener1] - 1), _c[$efront_string__colum] = needle[$efront_string__gener] - (section[$efront_string__gener4][$efront_string__gener1] === needle[$efront_string__gener1] ? section[$efront_string__gener4][$efront_string__gener] - 1 : 0), _c[$efront_string__bias_] = aArgs[$efront_string__bias_], _c))
    };
    IndexedSourceMapConsumer[$efront_string__proto][$efront_string__hasCo] = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
        return this[$efront_string___sect][$efront_string__every](function (s) {
            return s[$efront_string__consu][$efront_string__hasCo]()
        })
    };
    IndexedSourceMapConsumer[$efront_string__proto][$efront_string__sourc4] = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
        for (var i = 0; i < this[$efront_string___sect][$efront_string__lengt1]; i++) {
            var section = this[$efront_string___sect][i];
            var content = section[$efront_string__consu][$efront_string__sourc4](aSource, true);
            if (content) {
                return content
            }
        }
        if (nullOnMissing) {
            return null
        } else {
            throw new Error($efront_string__ + aSource + $efront_string__is_no1)
        }
    };
    IndexedSourceMapConsumer[$efront_string__proto][$efront_string__gener3] = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
        var _a, _b;
        for (var i = 0; i < this[$efront_string___sect][$efront_string__lengt1]; i++) {
            var section = this[$efront_string___sect][i];
            if (section[$efront_string__consu][$efront_string___find](util[$efront_string__getAr](aArgs, $efront_string__sourc)) === -1) {
                continue
            }
            var generatedPosition = section[$efront_string__consu][$efront_string__gener3](aArgs);
            if (generatedPosition) {
                var ret = (_a = {}, _a[$efront_string__line_] = generatedPosition[$efront_string__line_] + (section[$efront_string__gener4][$efront_string__gener1] - 1), _a[$efront_string__colum] = generatedPosition[$efront_string__colum] + (section[$efront_string__gener4][$efront_string__gener1] === generatedPosition[$efront_string__line_] ? section[$efront_string__gener4][$efront_string__gener] - 1 : 0), _a);
                return ret
            }
        }
        return _b = {}, _b[$efront_string__line_] = null, _b[$efront_string__colum] = null, _b
    };
    IndexedSourceMapConsumer[$efront_string__proto][$efront_string___pars] = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
        var _a;
        this[$efront_string____gen] = [];
        this[$efront_string____ori] = [];
        for (var i = 0; i < this[$efront_string___sect][$efront_string__lengt1]; i++) {
            var section = this[$efront_string___sect][i];
            var sectionMappings = section[$efront_string__consu][$efront_string___gene1];
            for (var j = 0; j < sectionMappings[$efront_string__lengt1]; j++) {
                var mapping = sectionMappings[j];
                var source = section[$efront_string__consu][$efront_string___sour1][$efront_string__at_](mapping[$efront_string__sourc]);
                source = util[$efront_string__compu](section[$efront_string__consu][$efront_string__sourc2], source, this[$efront_string___sour3]);
                this[$efront_string___sour1][$efront_string__add_](source);
                source = this[$efront_string___sour1][$efront_string__index1](source);
                var name = null;
                if (mapping[$efront_string__name_]) {
                    name = section[$efront_string__consu][$efront_string___name][$efront_string__at_](mapping[$efront_string__name_]);
                    this[$efront_string___name][$efront_string__add_](name);
                    name = this[$efront_string___name][$efront_string__index1](name)
                }
                var adjustedMapping = (_a = {}, _a[$efront_string__sourc] = source, _a[$efront_string__gener1] = mapping[$efront_string__gener1] + (section[$efront_string__gener4][$efront_string__gener1] - 1), _a[$efront_string__gener] = mapping[$efront_string__gener] + (section[$efront_string__gener4][$efront_string__gener1] === mapping[$efront_string__gener1] ? section[$efront_string__gener4][$efront_string__gener] - 1 : 0), _a[$efront_string__origi] = mapping[$efront_string__origi], _a[$efront_string__origi1] = mapping[$efront_string__origi1], _a[$efront_string__name_] = name, _a);
                this[$efront_string____gen][$efront_string__push_](adjustedMapping);
                if (typeof adjustedMapping[$efront_string__origi] === $efront_string__numbe) {
                    this[$efront_string____ori][$efront_string__push_](adjustedMapping)
                }
            }
        }
        quickSort(this[$efront_string____gen], util[$efront_string__compa1]);
        quickSort(this[$efront_string____ori], util[$efront_string__compa])
    };
    exports[$efront_string__Index] = IndexedSourceMapConsumer;
    return exports
}],
/** 238 module */ [1613939487],
/** 239 $efront_string__NonAs */ 'NonAsciiIdentifierStart',
/** 240 $efront_regexp__xAA_x */ /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
/** 241 $efront_string__NonAs1 */ 'NonAsciiIdentifierPart',
/** 242 $efront_regexp__xAA_x1 */ /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
/** 243 $efront_regexp__xAA_x2 */ /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
/** 244 $efront_regexp__xAA_x3 */ /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/,
/** 245 $efront_string__fromC */ 'fromCharCode',
/** 246 $efront_string__expor1 */ 'exports',
/** 247 $efront_string__isDec */ 'isDecimalDigit',
/** 248 $efront_string__isHex */ 'isHexDigit',
/** 249 $efront_string__isOct */ 'isOctalDigit',
/** 250 $efront_string__isWhi */ 'isWhiteSpace',
/** 251 $efront_string__isLin */ 'isLineTerminator',
/** 252 $efront_string__isIde */ 'isIdentifierStartES5',
/** 253 $efront_string__isIde1 */ 'isIdentifierPartES5',
/** 254 $efront_string__isIde2 */ 'isIdentifierStartES6',
/** 255 $efront_string__isIde3 */ 'isIdentifierPartES6',
/** 256 esutils$lib$code.js */ [144,100,39,238,239,240,241,242,243,244,71,245,119,69,246,247,248,249,250,251,252,253,254,255,function(String, Math, Array, module, $efront_string__NonAs, $efront_regexp__xAA_x, $efront_string__NonAs1, $efront_regexp__xAA_x1, $efront_regexp__xAA_x2, $efront_regexp__xAA_x3, $efront_string__index1, $efront_string__fromC, $efront_string__floor, $efront_string__test_, $efront_string__expor1, $efront_string__isDec, $efront_string__isHex, $efront_string__isOct, $efront_string__isWhi, $efront_string__isLin, $efront_string__isIde, $efront_string__isIde1, $efront_string__isIde2, $efront_string__isIde3) {
    return function () {
        'use strict';
        var _a, _b, _c;
        var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;
        ES5Regex = (_a = {}, _a[$efront_string__NonAs] = $efront_regexp__xAA_x, _a[$efront_string__NonAs1] = $efront_regexp__xAA_x1, _a);
        ES6Regex = (_b = {}, _b[$efront_string__NonAs] = $efront_regexp__xAA_x2, _b[$efront_string__NonAs1] = $efront_regexp__xAA_x3, _b);
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
            return ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch >= 5760 && NON_ASCII_WHITESPACES[$efront_string__index1](ch) >= 0
        }
        function isLineTerminator(ch) {
            return ch === 10 || ch === 13 || ch === 8232 || ch === 8233
        }
        function fromCodePoint(cp) {
            if (cp <= 65535) {
                return String[$efront_string__fromC](cp)
            }
            var cu1 = String[$efront_string__fromC](Math[$efront_string__floor]((cp - 65536) / 1024) + 55296);
            var cu2 = String[$efront_string__fromC]((cp - 65536) % 1024 + 56320);
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
            return ch < 128 ? IDENTIFIER_START[ch] : ES5Regex[$efront_string__NonAs][$efront_string__test_](fromCodePoint(ch))
        }
        function isIdentifierPartES5(ch) {
            return ch < 128 ? IDENTIFIER_PART[ch] : ES5Regex[$efront_string__NonAs1][$efront_string__test_](fromCodePoint(ch))
        }
        function isIdentifierStartES6(ch) {
            return ch < 128 ? IDENTIFIER_START[ch] : ES6Regex[$efront_string__NonAs][$efront_string__test_](fromCodePoint(ch))
        }
        function isIdentifierPartES6(ch) {
            return ch < 128 ? IDENTIFIER_PART[ch] : ES6Regex[$efront_string__NonAs1][$efront_string__test_](fromCodePoint(ch))
        }
        module[$efront_string__expor1] = (_c = {}, _c[$efront_string__isDec] = isDecimalDigit, _c[$efront_string__isHex] = isHexDigit, _c[$efront_string__isOct] = isOctalDigit, _c[$efront_string__isWhi] = isWhiteSpace, _c[$efront_string__isLin] = isLineTerminator, _c[$efront_string__isIde] = isIdentifierStartES5, _c[$efront_string__isIde1] = isIdentifierPartES5, _c[$efront_string__isIde2] = isIdentifierStartES6, _c[$efront_string__isIde3] = isIdentifierPartES6, _c)
    }()
}],
/** 257 $efront_string__type_ */ 'type',
/** 258 $efront_string__Array1 */ 'ArrayExpression',
/** 259 $efront_string__Assig */ 'AssignmentExpression',
/** 260 $efront_string__Binar */ 'BinaryExpression',
/** 261 $efront_string__CallE */ 'CallExpression',
/** 262 $efront_string__Condi */ 'ConditionalExpression',
/** 263 $efront_string__Funct */ 'FunctionExpression',
/** 264 $efront_string__Ident */ 'Identifier',
/** 265 $efront_string__Liter */ 'Literal',
/** 266 $efront_string__Logic */ 'LogicalExpression',
/** 267 $efront_string__Membe */ 'MemberExpression',
/** 268 $efront_string__NewEx */ 'NewExpression',
/** 269 $efront_string__Objec */ 'ObjectExpression',
/** 270 $efront_string__Seque */ 'SequenceExpression',
/** 271 $efront_string__ThisE */ 'ThisExpression',
/** 272 $efront_string__Unary */ 'UnaryExpression',
/** 273 $efront_string__Updat */ 'UpdateExpression',
/** 274 $efront_string__DoWhi */ 'DoWhileStatement',
/** 275 $efront_string__ForIn */ 'ForInStatement',
/** 276 $efront_string__ForSt */ 'ForStatement',
/** 277 $efront_string__While */ 'WhileStatement',
/** 278 $efront_string__Block */ 'BlockStatement',
/** 279 $efront_string__Break */ 'BreakStatement',
/** 280 $efront_string__Conti */ 'ContinueStatement',
/** 281 $efront_string__Debug */ 'DebuggerStatement',
/** 282 $efront_string__Empty */ 'EmptyStatement',
/** 283 $efront_string__Expre */ 'ExpressionStatement',
/** 284 $efront_string__IfSta */ 'IfStatement',
/** 285 $efront_string__Label */ 'LabeledStatement',
/** 286 $efront_string__Retur */ 'ReturnStatement',
/** 287 $efront_string__Switc */ 'SwitchStatement',
/** 288 $efront_string__Throw */ 'ThrowStatement',
/** 289 $efront_string__TrySt */ 'TryStatement',
/** 290 $efront_string__Varia */ 'VariableDeclaration',
/** 291 $efront_string__WithS */ 'WithStatement',
/** 292 $efront_string__Funct1 */ 'FunctionDeclaration',
/** 293 $efront_string__alter */ 'alternate',
/** 294 $efront_string__conse */ 'consequent',
/** 295 $efront_string__body_ */ 'body',
/** 296 $efront_string__isExp */ 'isExpression',
/** 297 $efront_string__isSta */ 'isStatement',
/** 298 $efront_string__isIte */ 'isIterationStatement',
/** 299 $efront_string__isSou */ 'isSourceElement',
/** 300 $efront_string__isPro */ 'isProblematicIfStatement',
/** 301 $efront_string__trail */ 'trailingStatement',
/** 302 esutils$lib$ast.js */ [238,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,246,296,297,298,299,300,301,function(module, $efront_string__type_, $efront_string__Array1, $efront_string__Assig, $efront_string__Binar, $efront_string__CallE, $efront_string__Condi, $efront_string__Funct, $efront_string__Ident, $efront_string__Liter, $efront_string__Logic, $efront_string__Membe, $efront_string__NewEx, $efront_string__Objec, $efront_string__Seque, $efront_string__ThisE, $efront_string__Unary, $efront_string__Updat, $efront_string__DoWhi, $efront_string__ForIn, $efront_string__ForSt, $efront_string__While, $efront_string__Block, $efront_string__Break, $efront_string__Conti, $efront_string__Debug, $efront_string__Empty, $efront_string__Expre, $efront_string__IfSta, $efront_string__Label, $efront_string__Retur, $efront_string__Switc, $efront_string__Throw, $efront_string__TrySt, $efront_string__Varia, $efront_string__WithS, $efront_string__Funct1, $efront_string__alter, $efront_string__conse, $efront_string__body_, $efront_string__expor1, $efront_string__isExp, $efront_string__isSta, $efront_string__isIte, $efront_string__isSou, $efront_string__isPro, $efront_string__trail) {
    return function () {
        'use strict';
        var _a;
        function isExpression(node) {
            if (node == null) {
                return false
            }
            switch (node[$efront_string__type_]) {
            case $efront_string__Array1:
            case $efront_string__Assig:
            case $efront_string__Binar:
            case $efront_string__CallE:
            case $efront_string__Condi:
            case $efront_string__Funct:
            case $efront_string__Ident:
            case $efront_string__Liter:
            case $efront_string__Logic:
            case $efront_string__Membe:
            case $efront_string__NewEx:
            case $efront_string__Objec:
            case $efront_string__Seque:
            case $efront_string__ThisE:
            case $efront_string__Unary:
            case $efront_string__Updat:
                return true
            }
            return false
        }
        function isIterationStatement(node) {
            if (node == null) {
                return false
            }
            switch (node[$efront_string__type_]) {
            case $efront_string__DoWhi:
            case $efront_string__ForIn:
            case $efront_string__ForSt:
            case $efront_string__While:
                return true
            }
            return false
        }
        function isStatement(node) {
            if (node == null) {
                return false
            }
            switch (node[$efront_string__type_]) {
            case $efront_string__Block:
            case $efront_string__Break:
            case $efront_string__Conti:
            case $efront_string__Debug:
            case $efront_string__DoWhi:
            case $efront_string__Empty:
            case $efront_string__Expre:
            case $efront_string__ForIn:
            case $efront_string__ForSt:
            case $efront_string__IfSta:
            case $efront_string__Label:
            case $efront_string__Retur:
            case $efront_string__Switc:
            case $efront_string__Throw:
            case $efront_string__TrySt:
            case $efront_string__Varia:
            case $efront_string__While:
            case $efront_string__WithS:
                return true
            }
            return false
        }
        function isSourceElement(node) {
            return isStatement(node) || node != null && node[$efront_string__type_] === $efront_string__Funct1
        }
        function trailingStatement(node) {
            switch (node[$efront_string__type_]) {
            case $efront_string__IfSta:
                if (node[$efront_string__alter] != null) {
                    return node[$efront_string__alter]
                }
                return node[$efront_string__conse];
            case $efront_string__Label:
            case $efront_string__ForSt:
            case $efront_string__ForIn:
            case $efront_string__While:
            case $efront_string__WithS:
                return node[$efront_string__body_]
            }
            return null
        }
        function isProblematicIfStatement(node) {
            var current;
            if (node[$efront_string__type_] !== $efront_string__IfSta) {
                return false
            }
            if (node[$efront_string__alter] == null) {
                return false
            }
            current = node[$efront_string__conse];
            do {
                if (current[$efront_string__type_] === $efront_string__IfSta) {
                    if (current[$efront_string__alter] == null) {
                        return true
                    }
                }
                current = trailingStatement(current)
            } while (current);
            return false
        }
        module[$efront_string__expor1] = (_a = {}, _a[$efront_string__isExp] = isExpression, _a[$efront_string__isSta] = isStatement, _a[$efront_string__isIte] = isIterationStatement, _a[$efront_string__isSou] = isSourceElement, _a[$efront_string__isPro] = isProblematicIfStatement, _a[$efront_string__trail] = trailingStatement, _a)
    }()
}],
/** 303 $efront_string__objec */ 'object',
/** 304 $efront_string__Assig1 */ 'AssignmentPattern',
/** 305 $efront_string__Array2 */ 'ArrayPattern',
/** 306 $efront_string__Arrow */ 'ArrowFunctionExpression',
/** 307 $efront_string__Await */ 'AwaitExpression',
/** 308 $efront_string__Catch */ 'CatchClause',
/** 309 $efront_string__Chain */ 'ChainExpression',
/** 310 $efront_string__Class */ 'ClassBody',
/** 311 $efront_string__Class1 */ 'ClassDeclaration',
/** 312 $efront_string__Class2 */ 'ClassExpression',
/** 313 $efront_string__Compr */ 'ComprehensionBlock',
/** 314 $efront_string__Compr1 */ 'ComprehensionExpression',
/** 315 $efront_string__Direc */ 'DirectiveStatement',
/** 316 $efront_string__Expor */ 'ExportAllDeclaration',
/** 317 $efront_string__Expor1 */ 'ExportDefaultDeclaration',
/** 318 $efront_string__Expor2 */ 'ExportNamedDeclaration',
/** 319 $efront_string__Expor3 */ 'ExportSpecifier',
/** 320 $efront_string__ForOf */ 'ForOfStatement',
/** 321 $efront_string__Gener */ 'GeneratorExpression',
/** 322 $efront_string__Impor */ 'ImportExpression',
/** 323 $efront_string__Impor1 */ 'ImportDeclaration',
/** 324 $efront_string__Impor2 */ 'ImportDefaultSpecifier',
/** 325 $efront_string__Impor3 */ 'ImportNamespaceSpecifier',
/** 326 $efront_string__Impor4 */ 'ImportSpecifier',
/** 327 $efront_string__MetaP */ 'MetaProperty',
/** 328 $efront_string__Metho */ 'MethodDefinition',
/** 329 $efront_string__Modul */ 'ModuleSpecifier',
/** 330 $efront_string__Objec1 */ 'ObjectPattern',
/** 331 $efront_string__Progr */ 'Program',
/** 332 $efront_string__Prope */ 'Property',
/** 333 $efront_string__RestE */ 'RestElement',
/** 334 $efront_string__Sprea */ 'SpreadElement',
/** 335 $efront_string__Super */ 'Super',
/** 336 $efront_string__Switc1 */ 'SwitchCase',
/** 337 $efront_string__Tagge */ 'TaggedTemplateExpression',
/** 338 $efront_string__Templ */ 'TemplateElement',
/** 339 $efront_string__Templ1 */ 'TemplateLiteral',
/** 340 $efront_string__Varia1 */ 'VariableDeclarator',
/** 341 $efront_string__Yield */ 'YieldExpression',
/** 342 $efront_string__left_ */ 'left',
/** 343 $efront_string__right */ 'right',
/** 344 $efront_string__eleme */ 'elements',
/** 345 $efront_string__param */ 'params',
/** 346 $efront_string__argum */ 'argument',
/** 347 $efront_string__label */ 'label',
/** 348 $efront_string__calle */ 'callee',
/** 349 $efront_string__argum1 */ 'arguments',
/** 350 $efront_string__param1 */ 'param',
/** 351 $efront_string__expre */ 'expression',
/** 352 $efront_string__id_ */ 'id',
/** 353 $efront_string__super */ 'superClass',
/** 354 $efront_string__block */ 'blocks',
/** 355 $efront_string__filte */ 'filter',
/** 356 $efront_string__decla */ 'declaration',
/** 357 $efront_string__speci */ 'specifiers',
/** 358 $efront_string__expor2 */ 'exported',
/** 359 $efront_string__local */ 'local',
/** 360 $efront_string__init_ */ 'init',
/** 361 $efront_string__updat */ 'update',
/** 362 $efront_string__impor */ 'imported',
/** 363 $efront_string__prope */ 'property',
/** 364 $efront_string__meta_ */ 'meta',
/** 365 $efront_string__key_ */ 'key',
/** 366 $efront_string__prope1 */ 'properties',
/** 367 $efront_string__expre1 */ 'expressions',
/** 368 $efront_string__discr */ 'discriminant',
/** 369 $efront_string__cases */ 'cases',
/** 370 $efront_string__tag_ */ 'tag',
/** 371 $efront_string__quasi */ 'quasi',
/** 372 $efront_string__quasi1 */ 'quasis',
/** 373 $efront_string__block1 */ 'block',
/** 374 $efront_string__handl */ 'handler',
/** 375 $efront_string__final */ 'finalizer',
/** 376 $efront_string__decla1 */ 'declarations',
/** 377 $efront_string__Break1 */ 'Break',
/** 378 $efront_string__Skip_ */ 'Skip',
/** 379 $efront_string__Remov */ 'Remove',
/** 380 $efront_string__paren */ 'parent',
/** 381 $efront_string__remov */ 'remove',
/** 382 $efront_string__isArr */ 'isArray',
/** 383 $efront_string__node_ */ 'node',
/** 384 $efront_string__wrap_ */ 'wrap',
/** 385 $efront_string__ref_ */ 'ref',
/** 386 $efront_string____cur */ '__current',
/** 387 $efront_string____lea */ '__leavelist',
/** 388 $efront_string__curre */ 'current',
/** 389 $efront_string__paren1 */ 'parents',
/** 390 $efront_string____exe */ '__execute',
/** 391 $efront_string____sta */ '__state',
/** 392 $efront_string__notif */ 'notify',
/** 393 $efront_string__skip_ */ 'skip',
/** 394 $efront_string__break */ 'break',
/** 395 $efront_string____ini */ '__initialize',
/** 396 $efront_string__visit */ 'visitor',
/** 397 $efront_string__root_ */ 'root',
/** 398 $efront_string____wor */ '__worklist',
/** 399 $efront_string____fal */ '__fallback',
/** 400 $efront_string__fallb */ 'fallback',
/** 401 $efront_string__itera */ 'iteration',
/** 402 $efront_string__funct1 */ 'function',
/** 403 $efront_string____key */ '__keys',
/** 404 $efront_string__assig */ 'assign',
/** 405 $efront_string__trave */ 'traverse',
/** 406 $efront_string__pop_ */ 'pop',
/** 407 $efront_string__leave */ 'leave',
/** 408 $efront_string__enter */ 'enter',
/** 409 $efront_string__Unkno1 */ /** text */ 'Unknown node type ',
/** 410 $efront_string__range */ 'range',
/** 411 $efront_string__exten */ 'extendedRange',
/** 412 $efront_string__attac */ /** text */ 'attachComments needs range information',
/** 413 $efront_string__leadi */ 'leadingComments',
/** 414 $efront_string__trail1 */ 'trailingComments',
/** 415 $efront_string__Synta */ 'Syntax',
/** 416 $efront_string__attac1 */ 'attachComments',
/** 417 $efront_string__Visit */ 'VisitorKeys',
/** 418 $efront_string__Visit1 */ 'VisitorOption',
/** 419 $efront_string__Contr */ 'Controller',
/** 420 $efront_string__clone */ 'cloneEnvironment',
/** 421 estraverse$estraverse.js */ [39,143,40,38,29,128,303,34,259,304,258,305,306,307,278,260,279,261,308,309,310,311,312,313,314,262,280,281,315,274,282,316,317,318,319,283,276,275,320,292,263,321,264,284,322,323,324,325,326,265,285,266,267,327,328,329,268,269,330,331,332,333,286,270,334,335,287,336,337,338,339,271,288,289,272,273,290,340,277,291,341,342,343,344,345,295,346,347,348,349,350,351,352,353,354,355,69,294,293,84,356,357,358,359,360,361,362,363,364,365,124,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,108,67,381,382,61,383,52,384,385,112,386,387,257,388,389,390,391,135,392,393,394,395,396,397,398,399,400,401,167,402,403,404,78,191,405,406,407,408,409,60,410,411,412,413,414,415,416,417,418,419,420,function(Array, undefined, Object, Error, exports, $efront_string__hasOw, $efront_string__objec, $efront_string__lengt1, $efront_string__Assig, $efront_string__Assig1, $efront_string__Array1, $efront_string__Array2, $efront_string__Arrow, $efront_string__Await, $efront_string__Block, $efront_string__Binar, $efront_string__Break, $efront_string__CallE, $efront_string__Catch, $efront_string__Chain, $efront_string__Class, $efront_string__Class1, $efront_string__Class2, $efront_string__Compr, $efront_string__Compr1, $efront_string__Condi, $efront_string__Conti, $efront_string__Debug, $efront_string__Direc, $efront_string__DoWhi, $efront_string__Empty, $efront_string__Expor, $efront_string__Expor1, $efront_string__Expor2, $efront_string__Expor3, $efront_string__Expre, $efront_string__ForSt, $efront_string__ForIn, $efront_string__ForOf, $efront_string__Funct1, $efront_string__Funct, $efront_string__Gener, $efront_string__Ident, $efront_string__IfSta, $efront_string__Impor, $efront_string__Impor1, $efront_string__Impor2, $efront_string__Impor3, $efront_string__Impor4, $efront_string__Liter, $efront_string__Label, $efront_string__Logic, $efront_string__Membe, $efront_string__MetaP, $efront_string__Metho, $efront_string__Modul, $efront_string__NewEx, $efront_string__Objec, $efront_string__Objec1, $efront_string__Progr, $efront_string__Prope, $efront_string__RestE, $efront_string__Retur, $efront_string__Seque, $efront_string__Sprea, $efront_string__Super, $efront_string__Switc, $efront_string__Switc1, $efront_string__Tagge, $efront_string__Templ, $efront_string__Templ1, $efront_string__ThisE, $efront_string__Throw, $efront_string__TrySt, $efront_string__Unary, $efront_string__Updat, $efront_string__Varia, $efront_string__Varia1, $efront_string__While, $efront_string__WithS, $efront_string__Yield, $efront_string__left_, $efront_string__right, $efront_string__eleme, $efront_string__param, $efront_string__body_, $efront_string__argum, $efront_string__label, $efront_string__calle, $efront_string__argum1, $efront_string__param1, $efront_string__expre, $efront_string__id_, $efront_string__super, $efront_string__block, $efront_string__filte, $efront_string__test_, $efront_string__conse, $efront_string__alter, $efront_string__sourc, $efront_string__decla, $efront_string__speci, $efront_string__expor2, $efront_string__local, $efront_string__init_, $efront_string__updat, $efront_string__impor, $efront_string__prope, $efront_string__meta_, $efront_string__key_, $efront_string__value, $efront_string__prope1, $efront_string__expre1, $efront_string__discr, $efront_string__cases, $efront_string__tag_, $efront_string__quasi, $efront_string__quasi1, $efront_string__block1, $efront_string__handl, $efront_string__final, $efront_string__decla1, $efront_string__Break1, $efront_string__Skip_, $efront_string__Remov, $efront_string__paren, $efront_string__proto, $efront_string__repla, $efront_string__remov, $efront_string__isArr, $efront_string__splic, $efront_string__node_, $efront_string__path_, $efront_string__wrap_, $efront_string__ref_, $efront_string__push_, $efront_string____cur, $efront_string____lea, $efront_string__type_, $efront_string__curre, $efront_string__paren1, $efront_string____exe, $efront_string____sta, $efront_string__call_1, $efront_string__notif, $efront_string__skip_, $efront_string__break, $efront_string____ini, $efront_string__visit, $efront_string__root_, $efront_string____wor, $efront_string____fal, $efront_string__fallb, $efront_string__itera, $efront_string__keys_, $efront_string__funct1, $efront_string____key, $efront_string__assig, $efront_string__creat, $efront_string__strin2, $efront_string__trave, $efront_string__pop_, $efront_string__leave, $efront_string__enter, $efront_string__Unkno1, $efront_string__5, $efront_string__range, $efront_string__exten, $efront_string__attac, $efront_string__leadi, $efront_string__trail1, $efront_string__Synta, $efront_string__attac1, $efront_string__Visit, $efront_string__Visit1, $efront_string__Contr, $efront_string__clone) {
    return function clone(exports) {
        'use strict';
        var _a, _b, _c;
        var Syntax, VisitorOption, VisitorKeys, BREAK, SKIP, REMOVE;
        function deepCopy(obj) {
            var ret = {}, key, val;
            for (key in obj) {
                if (obj[$efront_string__hasOw](key)) {
                    val = obj[key];
                    if (typeof val === $efront_string__objec && val !== null) {
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
            len = array[$efront_string__lengt1];
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
        Syntax = (_a = {}, _a[$efront_string__Assig] = $efront_string__Assig, _a[$efront_string__Assig1] = $efront_string__Assig1, _a[$efront_string__Array1] = $efront_string__Array1, _a[$efront_string__Array2] = $efront_string__Array2, _a[$efront_string__Arrow] = $efront_string__Arrow, _a[$efront_string__Await] = $efront_string__Await, _a[$efront_string__Block] = $efront_string__Block, _a[$efront_string__Binar] = $efront_string__Binar, _a[$efront_string__Break] = $efront_string__Break, _a[$efront_string__CallE] = $efront_string__CallE, _a[$efront_string__Catch] = $efront_string__Catch, _a[$efront_string__Chain] = $efront_string__Chain, _a[$efront_string__Class] = $efront_string__Class, _a[$efront_string__Class1] = $efront_string__Class1, _a[$efront_string__Class2] = $efront_string__Class2, _a[$efront_string__Compr] = $efront_string__Compr, _a[$efront_string__Compr1] = $efront_string__Compr1, _a[$efront_string__Condi] = $efront_string__Condi, _a[$efront_string__Conti] = $efront_string__Conti, _a[$efront_string__Debug] = $efront_string__Debug, _a[$efront_string__Direc] = $efront_string__Direc, _a[$efront_string__DoWhi] = $efront_string__DoWhi, _a[$efront_string__Empty] = $efront_string__Empty, _a[$efront_string__Expor] = $efront_string__Expor, _a[$efront_string__Expor1] = $efront_string__Expor1, _a[$efront_string__Expor2] = $efront_string__Expor2, _a[$efront_string__Expor3] = $efront_string__Expor3, _a[$efront_string__Expre] = $efront_string__Expre, _a[$efront_string__ForSt] = $efront_string__ForSt, _a[$efront_string__ForIn] = $efront_string__ForIn, _a[$efront_string__ForOf] = $efront_string__ForOf, _a[$efront_string__Funct1] = $efront_string__Funct1, _a[$efront_string__Funct] = $efront_string__Funct, _a[$efront_string__Gener] = $efront_string__Gener, _a[$efront_string__Ident] = $efront_string__Ident, _a[$efront_string__IfSta] = $efront_string__IfSta, _a[$efront_string__Impor] = $efront_string__Impor, _a[$efront_string__Impor1] = $efront_string__Impor1, _a[$efront_string__Impor2] = $efront_string__Impor2, _a[$efront_string__Impor3] = $efront_string__Impor3, _a[$efront_string__Impor4] = $efront_string__Impor4, _a[$efront_string__Liter] = $efront_string__Liter, _a[$efront_string__Label] = $efront_string__Label, _a[$efront_string__Logic] = $efront_string__Logic, _a[$efront_string__Membe] = $efront_string__Membe, _a[$efront_string__MetaP] = $efront_string__MetaP, _a[$efront_string__Metho] = $efront_string__Metho, _a[$efront_string__Modul] = $efront_string__Modul, _a[$efront_string__NewEx] = $efront_string__NewEx, _a[$efront_string__Objec] = $efront_string__Objec, _a[$efront_string__Objec1] = $efront_string__Objec1, _a[$efront_string__Progr] = $efront_string__Progr, _a[$efront_string__Prope] = $efront_string__Prope, _a[$efront_string__RestE] = $efront_string__RestE, _a[$efront_string__Retur] = $efront_string__Retur, _a[$efront_string__Seque] = $efront_string__Seque, _a[$efront_string__Sprea] = $efront_string__Sprea, _a[$efront_string__Super] = $efront_string__Super, _a[$efront_string__Switc] = $efront_string__Switc, _a[$efront_string__Switc1] = $efront_string__Switc1, _a[$efront_string__Tagge] = $efront_string__Tagge, _a[$efront_string__Templ] = $efront_string__Templ, _a[$efront_string__Templ1] = $efront_string__Templ1, _a[$efront_string__ThisE] = $efront_string__ThisE, _a[$efront_string__Throw] = $efront_string__Throw, _a[$efront_string__TrySt] = $efront_string__TrySt, _a[$efront_string__Unary] = $efront_string__Unary, _a[$efront_string__Updat] = $efront_string__Updat, _a[$efront_string__Varia] = $efront_string__Varia, _a[$efront_string__Varia1] = $efront_string__Varia1, _a[$efront_string__While] = $efront_string__While, _a[$efront_string__WithS] = $efront_string__WithS, _a[$efront_string__Yield] = $efront_string__Yield, _a);
        VisitorKeys = (_b = {}, _b[$efront_string__Assig] = [
            $efront_string__left_,
            $efront_string__right
        ], _b[$efront_string__Assig1] = [
            $efront_string__left_,
            $efront_string__right
        ], _b[$efront_string__Array1] = [$efront_string__eleme], _b[$efront_string__Array2] = [$efront_string__eleme], _b[$efront_string__Arrow] = [
            $efront_string__param,
            $efront_string__body_
        ], _b[$efront_string__Await] = [$efront_string__argum], _b[$efront_string__Block] = [$efront_string__body_], _b[$efront_string__Binar] = [
            $efront_string__left_,
            $efront_string__right
        ], _b[$efront_string__Break] = [$efront_string__label], _b[$efront_string__CallE] = [
            $efront_string__calle,
            $efront_string__argum1
        ], _b[$efront_string__Catch] = [
            $efront_string__param1,
            $efront_string__body_
        ], _b[$efront_string__Chain] = [$efront_string__expre], _b[$efront_string__Class] = [$efront_string__body_], _b[$efront_string__Class1] = [
            $efront_string__id_,
            $efront_string__super,
            $efront_string__body_
        ], _b[$efront_string__Class2] = [
            $efront_string__id_,
            $efront_string__super,
            $efront_string__body_
        ], _b[$efront_string__Compr] = [
            $efront_string__left_,
            $efront_string__right
        ], _b[$efront_string__Compr1] = [
            $efront_string__block,
            $efront_string__filte,
            $efront_string__body_
        ], _b[$efront_string__Condi] = [
            $efront_string__test_,
            $efront_string__conse,
            $efront_string__alter
        ], _b[$efront_string__Conti] = [$efront_string__label], _b[$efront_string__Debug] = [], _b[$efront_string__Direc] = [], _b[$efront_string__DoWhi] = [
            $efront_string__body_,
            $efront_string__test_
        ], _b[$efront_string__Empty] = [], _b[$efront_string__Expor] = [$efront_string__sourc], _b[$efront_string__Expor1] = [$efront_string__decla], _b[$efront_string__Expor2] = [
            $efront_string__decla,
            $efront_string__speci,
            $efront_string__sourc
        ], _b[$efront_string__Expor3] = [
            $efront_string__expor2,
            $efront_string__local
        ], _b[$efront_string__Expre] = [$efront_string__expre], _b[$efront_string__ForSt] = [
            $efront_string__init_,
            $efront_string__test_,
            $efront_string__updat,
            $efront_string__body_
        ], _b[$efront_string__ForIn] = [
            $efront_string__left_,
            $efront_string__right,
            $efront_string__body_
        ], _b[$efront_string__ForOf] = [
            $efront_string__left_,
            $efront_string__right,
            $efront_string__body_
        ], _b[$efront_string__Funct1] = [
            $efront_string__id_,
            $efront_string__param,
            $efront_string__body_
        ], _b[$efront_string__Funct] = [
            $efront_string__id_,
            $efront_string__param,
            $efront_string__body_
        ], _b[$efront_string__Gener] = [
            $efront_string__block,
            $efront_string__filte,
            $efront_string__body_
        ], _b[$efront_string__Ident] = [], _b[$efront_string__IfSta] = [
            $efront_string__test_,
            $efront_string__conse,
            $efront_string__alter
        ], _b[$efront_string__Impor] = [$efront_string__sourc], _b[$efront_string__Impor1] = [
            $efront_string__speci,
            $efront_string__sourc
        ], _b[$efront_string__Impor2] = [$efront_string__local], _b[$efront_string__Impor3] = [$efront_string__local], _b[$efront_string__Impor4] = [
            $efront_string__impor,
            $efront_string__local
        ], _b[$efront_string__Liter] = [], _b[$efront_string__Label] = [
            $efront_string__label,
            $efront_string__body_
        ], _b[$efront_string__Logic] = [
            $efront_string__left_,
            $efront_string__right
        ], _b[$efront_string__Membe] = [
            $efront_string__objec,
            $efront_string__prope
        ], _b[$efront_string__MetaP] = [
            $efront_string__meta_,
            $efront_string__prope
        ], _b[$efront_string__Metho] = [
            $efront_string__key_,
            $efront_string__value
        ], _b[$efront_string__Modul] = [], _b[$efront_string__NewEx] = [
            $efront_string__calle,
            $efront_string__argum1
        ], _b[$efront_string__Objec] = [$efront_string__prope1], _b[$efront_string__Objec1] = [$efront_string__prope1], _b[$efront_string__Progr] = [$efront_string__body_], _b[$efront_string__Prope] = [
            $efront_string__key_,
            $efront_string__value
        ], _b[$efront_string__RestE] = [$efront_string__argum], _b[$efront_string__Retur] = [$efront_string__argum], _b[$efront_string__Seque] = [$efront_string__expre1], _b[$efront_string__Sprea] = [$efront_string__argum], _b[$efront_string__Super] = [], _b[$efront_string__Switc] = [
            $efront_string__discr,
            $efront_string__cases
        ], _b[$efront_string__Switc1] = [
            $efront_string__test_,
            $efront_string__conse
        ], _b[$efront_string__Tagge] = [
            $efront_string__tag_,
            $efront_string__quasi
        ], _b[$efront_string__Templ] = [], _b[$efront_string__Templ1] = [
            $efront_string__quasi1,
            $efront_string__expre1
        ], _b[$efront_string__ThisE] = [], _b[$efront_string__Throw] = [$efront_string__argum], _b[$efront_string__TrySt] = [
            $efront_string__block1,
            $efront_string__handl,
            $efront_string__final
        ], _b[$efront_string__Unary] = [$efront_string__argum], _b[$efront_string__Updat] = [$efront_string__argum], _b[$efront_string__Varia] = [$efront_string__decla1], _b[$efront_string__Varia1] = [
            $efront_string__id_,
            $efront_string__init_
        ], _b[$efront_string__While] = [
            $efront_string__test_,
            $efront_string__body_
        ], _b[$efront_string__WithS] = [
            $efront_string__objec,
            $efront_string__body_
        ], _b[$efront_string__Yield] = [$efront_string__argum], _b);
        BREAK = {};
        SKIP = {};
        REMOVE = {};
        VisitorOption = (_c = {}, _c[$efront_string__Break1] = BREAK, _c[$efront_string__Skip_] = SKIP, _c[$efront_string__Remov] = REMOVE, _c);
        function Reference(parent, key) {
            this[$efront_string__paren] = parent;
            this[$efront_string__key_] = key
        }
        Reference[$efront_string__proto][$efront_string__repla] = function replace(node) {
            this[$efront_string__paren][this[$efront_string__key_]] = node
        };
        Reference[$efront_string__proto][$efront_string__remov] = function remove() {
            if (Array[$efront_string__isArr](this[$efront_string__paren])) {
                this[$efront_string__paren][$efront_string__splic](this[$efront_string__key_], 1);
                return true
            } else {
                this[$efront_string__repla](null);
                return false
            }
        };
        function Element(node, path, wrap, ref) {
            this[$efront_string__node_] = node;
            this[$efront_string__path_] = path;
            this[$efront_string__wrap_] = wrap;
            this[$efront_string__ref_] = ref
        }
        function Controller() {
        }
        Controller[$efront_string__proto][$efront_string__path_] = function path() {
            var i, iz, j, jz, result, element;
            function addToPath(result, path) {
                if (Array[$efront_string__isArr](path)) {
                    for (j = 0, jz = path[$efront_string__lengt1]; j < jz; ++j) {
                        result[$efront_string__push_](path[j])
                    }
                } else {
                    result[$efront_string__push_](path)
                }
            }
            if (!this[$efront_string____cur][$efront_string__path_]) {
                return null
            }
            result = [];
            for (i = 2, iz = this[$efront_string____lea][$efront_string__lengt1]; i < iz; ++i) {
                element = this[$efront_string____lea][i];
                addToPath(result, element[$efront_string__path_])
            }
            addToPath(result, this[$efront_string____cur][$efront_string__path_]);
            return result
        };
        Controller[$efront_string__proto][$efront_string__type_] = function () {
            var node = this[$efront_string__curre]();
            return node[$efront_string__type_] || this[$efront_string____cur][$efront_string__wrap_]
        };
        Controller[$efront_string__proto][$efront_string__paren1] = function parents() {
            var i, iz, result;
            result = [];
            for (i = 1, iz = this[$efront_string____lea][$efront_string__lengt1]; i < iz; ++i) {
                result[$efront_string__push_](this[$efront_string____lea][i][$efront_string__node_])
            }
            return result
        };
        Controller[$efront_string__proto][$efront_string__curre] = function current() {
            return this[$efront_string____cur][$efront_string__node_]
        };
        Controller[$efront_string__proto][$efront_string____exe] = function __execute(callback, element) {
            var previous, result;
            result = undefined;
            previous = this[$efront_string____cur];
            this[$efront_string____cur] = element;
            this[$efront_string____sta] = null;
            if (callback) {
                result = callback[$efront_string__call_1](this, element[$efront_string__node_], this[$efront_string____lea][this[$efront_string____lea][$efront_string__lengt1] - 1][$efront_string__node_])
            }
            this[$efront_string____cur] = previous;
            return result
        };
        Controller[$efront_string__proto][$efront_string__notif] = function notify(flag) {
            this[$efront_string____sta] = flag
        };
        Controller[$efront_string__proto][$efront_string__skip_] = function () {
            this[$efront_string__notif](SKIP)
        };
        Controller[$efront_string__proto][$efront_string__break] = function () {
            this[$efront_string__notif](BREAK)
        };
        Controller[$efront_string__proto][$efront_string__remov] = function () {
            this[$efront_string__notif](REMOVE)
        };
        Controller[$efront_string__proto][$efront_string____ini] = function (root, visitor) {
            this[$efront_string__visit] = visitor;
            this[$efront_string__root_] = root;
            this[$efront_string____wor] = [];
            this[$efront_string____lea] = [];
            this[$efront_string____cur] = null;
            this[$efront_string____sta] = null;
            this[$efront_string____fal] = null;
            if (visitor[$efront_string__fallb] === $efront_string__itera) {
                this[$efront_string____fal] = Object[$efront_string__keys_]
            } else if (typeof visitor[$efront_string__fallb] === $efront_string__funct1) {
                this[$efront_string____fal] = visitor[$efront_string__fallb]
            }
            this[$efront_string____key] = VisitorKeys;
            if (visitor[$efront_string__keys_]) {
                this[$efront_string____key] = Object[$efront_string__assig](Object[$efront_string__creat](this[$efront_string____key]), visitor[$efront_string__keys_])
            }
        };
        function isNode(node) {
            if (node == null) {
                return false
            }
            return typeof node === $efront_string__objec && typeof node[$efront_string__type_] === $efront_string__strin2
        }
        function isProperty(nodeType, key) {
            return (nodeType === Syntax[$efront_string__Objec] || nodeType === Syntax[$efront_string__Objec1]) && $efront_string__prope1 === key
        }
        function candidateExistsInLeaveList(leavelist, candidate) {
            for (var i = leavelist[$efront_string__lengt1] - 1; i >= 0; --i) {
                if (leavelist[i][$efront_string__node_] === candidate) {
                    return true
                }
            }
            return false
        }
        Controller[$efront_string__proto][$efront_string__trave] = function traverse(root, visitor) {
            var worklist, leavelist, element, node, nodeType, ret, key, current, current2, candidates, candidate, sentinel;
            this[$efront_string____ini](root, visitor);
            sentinel = {};
            worklist = this[$efront_string____wor];
            leavelist = this[$efront_string____lea];
            worklist[$efront_string__push_](new Element(root, null, null, null));
            leavelist[$efront_string__push_](new Element(null, null, null, null));
            while (worklist[$efront_string__lengt1]) {
                element = worklist[$efront_string__pop_]();
                if (element === sentinel) {
                    element = leavelist[$efront_string__pop_]();
                    ret = this[$efront_string____exe](visitor[$efront_string__leave], element);
                    if (this[$efront_string____sta] === BREAK || ret === BREAK) {
                        return
                    }
                    continue
                }
                if (element[$efront_string__node_]) {
                    ret = this[$efront_string____exe](visitor[$efront_string__enter], element);
                    if (this[$efront_string____sta] === BREAK || ret === BREAK) {
                        return
                    }
                    worklist[$efront_string__push_](sentinel);
                    leavelist[$efront_string__push_](element);
                    if (this[$efront_string____sta] === SKIP || ret === SKIP) {
                        continue
                    }
                    node = element[$efront_string__node_];
                    nodeType = node[$efront_string__type_] || element[$efront_string__wrap_];
                    candidates = this[$efront_string____key][nodeType];
                    if (!candidates) {
                        if (this[$efront_string____fal]) {
                            candidates = this[$efront_string____fal](node)
                        } else {
                            throw new Error($efront_string__Unkno1 + nodeType + $efront_string__5)
                        }
                    }
                    current = candidates[$efront_string__lengt1];
                    while ((current -= 1) >= 0) {
                        key = candidates[current];
                        candidate = node[key];
                        if (!candidate) {
                            continue
                        }
                        if (Array[$efront_string__isArr](candidate)) {
                            current2 = candidate[$efront_string__lengt1];
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
                                    ], $efront_string__Prope, null)
                                } else if (isNode(candidate[current2])) {
                                    element = new Element(candidate[current2], [
                                        key,
                                        current2
                                    ], null, null)
                                } else {
                                    continue
                                }
                                worklist[$efront_string__push_](element)
                            }
                        } else if (isNode(candidate)) {
                            if (candidateExistsInLeaveList(leavelist, candidate)) {
                                continue
                            }
                            worklist[$efront_string__push_](new Element(candidate, key, null, null))
                        }
                    }
                }
            }
        };
        Controller[$efront_string__proto][$efront_string__repla] = function replace(root, visitor) {
            var _a;
            var worklist, leavelist, node, nodeType, target, element, current, current2, candidates, candidate, sentinel, outer, key;
            function removeElem(element) {
                var i, key, nextElem, parent;
                if (element[$efront_string__ref_][$efront_string__remov]()) {
                    key = element[$efront_string__ref_][$efront_string__key_];
                    parent = element[$efront_string__ref_][$efront_string__paren];
                    i = worklist[$efront_string__lengt1];
                    while (i--) {
                        nextElem = worklist[i];
                        if (nextElem[$efront_string__ref_] && nextElem[$efront_string__ref_][$efront_string__paren] === parent) {
                            if (nextElem[$efront_string__ref_][$efront_string__key_] < key) {
                                break
                            }
                            --nextElem[$efront_string__ref_][$efront_string__key_]
                        }
                    }
                }
            }
            this[$efront_string____ini](root, visitor);
            sentinel = {};
            worklist = this[$efront_string____wor];
            leavelist = this[$efront_string____lea];
            outer = (_a = {}, _a[$efront_string__root_] = root, _a);
            element = new Element(root, null, null, new Reference(outer, $efront_string__root_));
            worklist[$efront_string__push_](element);
            leavelist[$efront_string__push_](element);
            while (worklist[$efront_string__lengt1]) {
                element = worklist[$efront_string__pop_]();
                if (element === sentinel) {
                    element = leavelist[$efront_string__pop_]();
                    target = this[$efront_string____exe](visitor[$efront_string__leave], element);
                    if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                        element[$efront_string__ref_][$efront_string__repla](target)
                    }
                    if (this[$efront_string____sta] === REMOVE || target === REMOVE) {
                        removeElem(element)
                    }
                    if (this[$efront_string____sta] === BREAK || target === BREAK) {
                        return outer[$efront_string__root_]
                    }
                    continue
                }
                target = this[$efront_string____exe](visitor[$efront_string__enter], element);
                if (target !== undefined && target !== BREAK && target !== SKIP && target !== REMOVE) {
                    element[$efront_string__ref_][$efront_string__repla](target);
                    element[$efront_string__node_] = target
                }
                if (this[$efront_string____sta] === REMOVE || target === REMOVE) {
                    removeElem(element);
                    element[$efront_string__node_] = null
                }
                if (this[$efront_string____sta] === BREAK || target === BREAK) {
                    return outer[$efront_string__root_]
                }
                node = element[$efront_string__node_];
                if (!node) {
                    continue
                }
                worklist[$efront_string__push_](sentinel);
                leavelist[$efront_string__push_](element);
                if (this[$efront_string____sta] === SKIP || target === SKIP) {
                    continue
                }
                nodeType = node[$efront_string__type_] || element[$efront_string__wrap_];
                candidates = this[$efront_string____key][nodeType];
                if (!candidates) {
                    if (this[$efront_string____fal]) {
                        candidates = this[$efront_string____fal](node)
                    } else {
                        throw new Error($efront_string__Unkno1 + nodeType + $efront_string__5)
                    }
                }
                current = candidates[$efront_string__lengt1];
                while ((current -= 1) >= 0) {
                    key = candidates[current];
                    candidate = node[key];
                    if (!candidate) {
                        continue
                    }
                    if (Array[$efront_string__isArr](candidate)) {
                        current2 = candidate[$efront_string__lengt1];
                        while ((current2 -= 1) >= 0) {
                            if (!candidate[current2]) {
                                continue
                            }
                            if (isProperty(nodeType, candidates[current])) {
                                element = new Element(candidate[current2], [
                                    key,
                                    current2
                                ], $efront_string__Prope, new Reference(candidate, current2))
                            } else if (isNode(candidate[current2])) {
                                element = new Element(candidate[current2], [
                                    key,
                                    current2
                                ], null, new Reference(candidate, current2))
                            } else {
                                continue
                            }
                            worklist[$efront_string__push_](element)
                        }
                    } else if (isNode(candidate)) {
                        worklist[$efront_string__push_](new Element(candidate, key, null, new Reference(node, key)))
                    }
                }
            }
            return outer[$efront_string__root_]
        };
        function traverse(root, visitor) {
            var controller = new Controller;
            return controller[$efront_string__trave](root, visitor)
        }
        function replace(root, visitor) {
            var controller = new Controller;
            return controller[$efront_string__repla](root, visitor)
        }
        function extendCommentRange(comment, tokens) {
            var target;
            target = upperBound(tokens, function search(token) {
                return token[$efront_string__range][0] > comment[$efront_string__range][0]
            });
            comment[$efront_string__exten] = [
                comment[$efront_string__range][0],
                comment[$efront_string__range][1]
            ];
            if (target !== tokens[$efront_string__lengt1]) {
                comment[$efront_string__exten][1] = tokens[target][$efront_string__range][0]
            }
            target -= 1;
            if (target >= 0) {
                comment[$efront_string__exten][0] = tokens[target][$efront_string__range][1]
            }
            return comment
        }
        function attachComments(tree, providedComments, tokens) {
            var _a, _b;
            var comments = [], comment, len, i, cursor;
            if (!tree[$efront_string__range]) {
                throw new Error($efront_string__attac)
            }
            if (!tokens[$efront_string__lengt1]) {
                if (providedComments[$efront_string__lengt1]) {
                    for (i = 0, len = providedComments[$efront_string__lengt1]; i < len; i += 1) {
                        comment = deepCopy(providedComments[i]);
                        comment[$efront_string__exten] = [
                            0,
                            tree[$efront_string__range][0]
                        ];
                        comments[$efront_string__push_](comment)
                    }
                    tree[$efront_string__leadi] = comments
                }
                return tree
            }
            for (i = 0, len = providedComments[$efront_string__lengt1]; i < len; i += 1) {
                comments[$efront_string__push_](extendCommentRange(deepCopy(providedComments[i]), tokens))
            }
            cursor = 0;
            traverse(tree, (_a = {}, _a[$efront_string__enter] = function (node) {
                var comment;
                while (cursor < comments[$efront_string__lengt1]) {
                    comment = comments[cursor];
                    if (comment[$efront_string__exten][1] > node[$efront_string__range][0]) {
                        break
                    }
                    if (comment[$efront_string__exten][1] === node[$efront_string__range][0]) {
                        if (!node[$efront_string__leadi]) {
                            node[$efront_string__leadi] = []
                        }
                        node[$efront_string__leadi][$efront_string__push_](comment);
                        comments[$efront_string__splic](cursor, 1)
                    } else {
                        cursor += 1
                    }
                }
                if (cursor === comments[$efront_string__lengt1]) {
                    return VisitorOption[$efront_string__Break1]
                }
                if (comments[cursor][$efront_string__exten][0] > node[$efront_string__range][1]) {
                    return VisitorOption[$efront_string__Skip_]
                }
            }, _a));
            cursor = 0;
            traverse(tree, (_b = {}, _b[$efront_string__leave] = function (node) {
                var comment;
                while (cursor < comments[$efront_string__lengt1]) {
                    comment = comments[cursor];
                    if (node[$efront_string__range][1] < comment[$efront_string__exten][0]) {
                        break
                    }
                    if (node[$efront_string__range][1] === comment[$efront_string__exten][0]) {
                        if (!node[$efront_string__trail1]) {
                            node[$efront_string__trail1] = []
                        }
                        node[$efront_string__trail1][$efront_string__push_](comment);
                        comments[$efront_string__splic](cursor, 1)
                    } else {
                        cursor += 1
                    }
                }
                if (cursor === comments[$efront_string__lengt1]) {
                    return VisitorOption[$efront_string__Break1]
                }
                if (comments[cursor][$efront_string__exten][0] > node[$efront_string__range][1]) {
                    return VisitorOption[$efront_string__Skip_]
                }
            }, _b));
            return tree
        }
        exports[$efront_string__Synta] = Syntax;
        exports[$efront_string__trave] = traverse;
        exports[$efront_string__repla] = replace;
        exports[$efront_string__attac1] = attachComments;
        exports[$efront_string__Visit] = VisitorKeys;
        exports[$efront_string__Visit1] = VisitorOption;
        exports[$efront_string__Contr] = Controller;
        exports[$efront_string__clone] = function () {
            return clone({})
        };
        return exports
    }(exports)
}],
/** 422 $efront_string___from */ '_from',
/** 423 $efront_string__escod */ 'escodegen@latest',
/** 424 $efront_string___id_ */ '_id',
/** 425 $efront_string__escod1 */ 'escodegen@2.0.0',
/** 426 $efront_string___inBu */ '_inBundle',
/** 427 $efront_string___inte */ '_integrity',
/** 428 $efront_string__sha1_ */ 'sha1-XjKxKDPoqo+jXhvwvvqJOASEx90=',
/** 429 $efront_string___loca */ '_location',
/** 430 $efront_string__escod2 */ '/escodegen',
/** 431 $efront_string___phan */ '_phantomChildren',
/** 432 $efront_string___requ */ '_requested',
/** 433 $efront_string__regis */ 'registry',
/** 434 $efront_string__raw_ */ 'raw',
/** 435 $efront_string__escod3 */ 'escodegen',
/** 436 $efront_string__escap */ 'escapedName',
/** 437 $efront_string__rawSp */ 'rawSpec',
/** 438 $efront_string__lates */ 'latest',
/** 439 $efront_string__saveS */ 'saveSpec',
/** 440 $efront_string__fetch */ 'fetchSpec',
/** 441 $efront_string___requ1 */ '_requiredBy',
/** 442 $efront_string__USER_ */ '#USER',
/** 443 $efront_string___reso */ '_resolved',
/** 444 $efront_string__https */ 'https://registry.npm.taobao.org/escodegen/download/escodegen-2.0.0.tgz',
/** 445 $efront_string___shas */ '_shasum',
/** 446 $efront_string__5e32b */ '5e32b12833e8aa8fa35e1bf0befa89380484c7dd',
/** 447 $efront_string___spec */ '_spec',
/** 448 $efront_string___wher */ '_where',
/** 449 $efront_string__D_wor */ 'D:\\work\\efront2',
/** 450 $efront_string__bin_ */ 'bin',
/** 451 $efront_string__esgen */ 'esgenerate',
/** 452 $efront_string__bin_e */ 'bin/esgenerate.js',
/** 453 $efront_string__bin_e1 */ 'bin/escodegen.js',
/** 454 $efront_string__bugs_ */ 'bugs',
/** 455 $efront_string__https1 */ 'https://github.com/estools/escodegen/issues',
/** 456 $efront_string__bundl */ 'bundleDependencies',
/** 457 $efront_string__depen */ 'dependencies',
/** 458 $efront_string__espri */ 'esprima',
/** 459 $efront_string__4_0_1 */ '^4.0.1',
/** 460 $efront_string__estra */ 'estraverse',
/** 461 $efront_string__5_2_0 */ '^5.2.0',
/** 462 $efront_string__esuti */ 'esutils',
/** 463 $efront_string__2_0_2 */ '^2.0.2',
/** 464 $efront_string__optio */ 'optionator',
/** 465 $efront_string__0_8_1 */ '^0.8.1',
/** 466 $efront_string__sourc6 */ 'source-map',
/** 467 $efront_string__0_6_1 */ '~0.6.1',
/** 468 $efront_string__depre */ 'deprecated',
/** 469 $efront_string__descr */ 'description',
/** 470 $efront_string__ECMAS */ /** text */ 'ECMAScript code generator',
/** 471 $efront_string__devDe */ 'devDependencies',
/** 472 $efront_string__acorn */ 'acorn',
/** 473 $efront_string__7_3_1 */ '^7.3.1',
/** 474 $efront_string__blueb */ 'bluebird',
/** 475 $efront_string__3_4_7 */ '^3.4.7',
/** 476 $efront_string__bower */ 'bower-registry-client',
/** 477 $efront_string__1_0_0 */ '^1.0.0',
/** 478 $efront_string__chai_ */ 'chai',
/** 479 $efront_string__4_2_0 */ '^4.2.0',
/** 480 $efront_string__chai_1 */ 'chai-exclude',
/** 481 $efront_string__commo */ 'commonjs-everywhere',
/** 482 $efront_string__0_9_7 */ '^0.9.7',
/** 483 $efront_string__gulp_ */ 'gulp',
/** 484 $efront_string__3_8_1 */ '^3.8.10',
/** 485 $efront_string__gulp_1 */ 'gulp-eslint',
/** 486 $efront_string__3_0_1 */ '^3.0.1',
/** 487 $efront_string__gulp_2 */ 'gulp-mocha',
/** 488 $efront_string__semve */ 'semver',
/** 489 $efront_string__5_1_0 */ '^5.1.0',
/** 490 $efront_string__engin */ 'engines',
/** 491 $efront_string__6_0_ */ '>=6.0',
/** 492 $efront_string__files */ 'files',
/** 493 $efront_string__LICEN */ 'LICENSE.BSD',
/** 494 $efront_string__READM */ 'README.md',
/** 495 $efront_string__escod4 */ 'escodegen.js',
/** 496 $efront_string__packa */ 'package.json',
/** 497 $efront_string__homep */ 'homepage',
/** 498 $efront_string__http_ */ 'http://github.com/estools/escodegen',
/** 499 $efront_string__licen */ 'license',
/** 500 $efront_string__BSD_2 */ 'BSD-2-Clause',
/** 501 $efront_string__main_ */ 'main',
/** 502 $efront_string__maint */ 'maintainers',
/** 503 $efront_string__Yusuk */ /** text */ 'Yusuke Suzuki',
/** 504 $efront_string__email */ 'email',
/** 505 $efront_string__utata */ 'utatane.tea@gmail.com',
/** 506 $efront_string__http_1 */ 'http://github.com/Constellation',
/** 507 $efront_string__optio1 */ 'optionalDependencies',
/** 508 $efront_string__repos */ 'repository',
/** 509 $efront_string__git_ */ 'git',
/** 510 $efront_string__git_s */ 'git+ssh://git@github.com/estools/escodegen.git',
/** 511 $efront_string__scrip */ 'scripts',
/** 512 $efront_string__build */ 'build',
/** 513 $efront_string__cjsif */ /** text */ 'cjsify -a path: tools/entry-point.js > escodegen.browser.js',
/** 514 $efront_string__build1 */ 'build-min',
/** 515 $efront_string__cjsif1 */ /** text */ 'cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js',
/** 516 $efront_string__lint_ */ 'lint',
/** 517 $efront_string__gulp_3 */ /** text */ 'gulp lint',
/** 518 $efront_string__relea */ 'release',
/** 519 $efront_string__node_1 */ /** text */ 'node tools/release.js',
/** 520 $efront_string__gulp_4 */ /** text */ 'gulp travis',
/** 521 $efront_string__unit_ */ 'unit-test',
/** 522 $efront_string__gulp_5 */ /** text */ 'gulp test',
/** 523 $efront_string__2_0_0 */ '2.0.0',
/** 524 package.json */ [422,423,424,425,426,427,428,429,430,431,432,257,370,433,434,89,435,436,437,438,439,440,441,442,64,443,444,445,446,447,448,449,450,451,452,453,454,229,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,383,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,69,520,521,522,184,523,function($efront_string___from, $efront_string__escod, $efront_string___id_, $efront_string__escod1, $efront_string___inBu, $efront_string___inte, $efront_string__sha1_, $efront_string___loca, $efront_string__escod2, $efront_string___phan, $efront_string___requ, $efront_string__type_, $efront_string__tag_, $efront_string__regis, $efront_string__raw_, $efront_string__name_, $efront_string__escod3, $efront_string__escap, $efront_string__rawSp, $efront_string__lates, $efront_string__saveS, $efront_string__fetch, $efront_string___requ1, $efront_string__USER_, $efront_string__7, $efront_string___reso, $efront_string__https, $efront_string___shas, $efront_string__5e32b, $efront_string___spec, $efront_string___wher, $efront_string__D_wor, $efront_string__bin_, $efront_string__esgen, $efront_string__bin_e, $efront_string__bin_e1, $efront_string__bugs_, $efront_string__url_, $efront_string__https1, $efront_string__bundl, $efront_string__depen, $efront_string__espri, $efront_string__4_0_1, $efront_string__estra, $efront_string__5_2_0, $efront_string__esuti, $efront_string__2_0_2, $efront_string__optio, $efront_string__0_8_1, $efront_string__sourc6, $efront_string__0_6_1, $efront_string__depre, $efront_string__descr, $efront_string__ECMAS, $efront_string__devDe, $efront_string__acorn, $efront_string__7_3_1, $efront_string__blueb, $efront_string__3_4_7, $efront_string__bower, $efront_string__1_0_0, $efront_string__chai_, $efront_string__4_2_0, $efront_string__chai_1, $efront_string__commo, $efront_string__0_9_7, $efront_string__gulp_, $efront_string__3_8_1, $efront_string__gulp_1, $efront_string__3_0_1, $efront_string__gulp_2, $efront_string__semve, $efront_string__5_1_0, $efront_string__engin, $efront_string__node_, $efront_string__6_0_, $efront_string__files, $efront_string__LICEN, $efront_string__READM, $efront_string__escod4, $efront_string__packa, $efront_string__homep, $efront_string__http_, $efront_string__licen, $efront_string__BSD_2, $efront_string__main_, $efront_string__maint, $efront_string__Yusuk, $efront_string__email, $efront_string__utata, $efront_string__http_1, $efront_string__optio1, $efront_string__repos, $efront_string__git_, $efront_string__git_s, $efront_string__scrip, $efront_string__build, $efront_string__cjsif, $efront_string__build1, $efront_string__cjsif1, $efront_string__lint_, $efront_string__gulp_3, $efront_string__relea, $efront_string__node_1, $efront_string__test_, $efront_string__gulp_4, $efront_string__unit_, $efront_string__gulp_5, $efront_string__versi, $efront_string__2_0_0) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return _a = {}, _a[$efront_string___from] = $efront_string__escod, _a[$efront_string___id_] = $efront_string__escod1, _a[$efront_string___inBu] = false, _a[$efront_string___inte] = $efront_string__sha1_, _a[$efront_string___loca] = $efront_string__escod2, _a[$efront_string___phan] = {}, _a[$efront_string___requ] = (_b = {}, _b[$efront_string__type_] = $efront_string__tag_, _b[$efront_string__regis] = true, _b[$efront_string__raw_] = $efront_string__escod, _b[$efront_string__name_] = $efront_string__escod3, _b[$efront_string__escap] = $efront_string__escod3, _b[$efront_string__rawSp] = $efront_string__lates, _b[$efront_string__saveS] = null, _b[$efront_string__fetch] = $efront_string__lates, _b), _a[$efront_string___requ1] = [
        $efront_string__USER_,
        $efront_string__7
    ], _a[$efront_string___reso] = $efront_string__https, _a[$efront_string___shas] = $efront_string__5e32b, _a[$efront_string___spec] = $efront_string__escod, _a[$efront_string___wher] = $efront_string__D_wor, _a[$efront_string__bin_] = (_c = {}, _c[$efront_string__esgen] = $efront_string__bin_e, _c[$efront_string__escod3] = $efront_string__bin_e1, _c), _a[$efront_string__bugs_] = (_d = {}, _d[$efront_string__url_] = $efront_string__https1, _d), _a[$efront_string__bundl] = false, _a[$efront_string__depen] = (_e = {}, _e[$efront_string__espri] = $efront_string__4_0_1, _e[$efront_string__estra] = $efront_string__5_2_0, _e[$efront_string__esuti] = $efront_string__2_0_2, _e[$efront_string__optio] = $efront_string__0_8_1, _e[$efront_string__sourc6] = $efront_string__0_6_1, _e), _a[$efront_string__depre] = false, _a[$efront_string__descr] = $efront_string__ECMAS, _a[$efront_string__devDe] = (_f = {}, _f[$efront_string__acorn] = $efront_string__7_3_1, _f[$efront_string__blueb] = $efront_string__3_4_7, _f[$efront_string__bower] = $efront_string__1_0_0, _f[$efront_string__chai_] = $efront_string__4_2_0, _f[$efront_string__chai_1] = $efront_string__2_0_2, _f[$efront_string__commo] = $efront_string__0_9_7, _f[$efront_string__gulp_] = $efront_string__3_8_1, _f[$efront_string__gulp_1] = $efront_string__3_0_1, _f[$efront_string__gulp_2] = $efront_string__3_0_1, _f[$efront_string__semve] = $efront_string__5_1_0, _f), _a[$efront_string__engin] = (_g = {}, _g[$efront_string__node_] = $efront_string__6_0_, _g), _a[$efront_string__files] = [
        $efront_string__LICEN,
        $efront_string__READM,
        $efront_string__bin_,
        $efront_string__escod4,
        $efront_string__packa
    ], _a[$efront_string__homep] = $efront_string__http_, _a[$efront_string__licen] = $efront_string__BSD_2, _a[$efront_string__main_] = $efront_string__escod4, _a[$efront_string__maint] = [(_h = {}, _h[$efront_string__name_] = $efront_string__Yusuk, _h[$efront_string__email] = $efront_string__utata, _h[$efront_string__url_] = $efront_string__http_1, _h)], _a[$efront_string__name_] = $efront_string__escod3, _a[$efront_string__optio1] = (_j = {}, _j[$efront_string__sourc6] = $efront_string__0_6_1, _j), _a[$efront_string__repos] = (_k = {}, _k[$efront_string__type_] = $efront_string__git_, _k[$efront_string__url_] = $efront_string__git_s, _k), _a[$efront_string__scrip] = (_l = {}, _l[$efront_string__build] = $efront_string__cjsif, _l[$efront_string__build1] = $efront_string__cjsif1, _l[$efront_string__lint_] = $efront_string__gulp_3, _l[$efront_string__relea] = $efront_string__node_1, _l[$efront_string__test_] = $efront_string__gulp_4, _l[$efront_string__unit_] = $efront_string__gulp_5, _l), _a[$efront_string__versi] = $efront_string__2_0_0, _a
}],
/** 525 estraverse */ [1,function(require) {
    return require(421)
}],
/** 526 RegExp */ RegExp,
/** 527 Number */ Number,
/** 528 global */ typeof global!=="undefined"?global:void 0,
/** 529 $efront_regexp__r_n_ */ /(\r?\n)/,
/** 530 $efront_string__$$$is */ '$$$isSourceNode$$$',
/** 531 $efront_string__child */ 'children',
/** 532 $efront_string__sourc7 */ 'sourceContents',
/** 533 $efront_string__fromS2 */ 'fromStringWithSourceMap',
/** 534 $efront_string__Expec1 */ /** text */ 'Expected a SourceNode, string, or an array of SourceNodes and strings. Got ',
/** 535 $efront_string__prepe */ 'prepend',
/** 536 $efront_string__unshi */ 'unshift',
/** 537 $efront_string__walk_ */ 'walk',
/** 538 $efront_string__repla1 */ 'replaceRight',
/** 539 $efront_string__walkS */ 'walkSourceContents',
/** 540 $efront_string__toStr1 */ 'toStringWithSourceMap',
/** 541 $efront_string__code_ */ 'code',
/** 542 $efront_string__Sourc3 */ 'SourceNode',
/** 543 source-map$lib$source-node.js */ [1,143,39,30,40,29,189,529,530,531,532,159,160,84,89,111,533,32,34,157,88,76,87,61,63,163,110,164,165,85,86,108,382,191,112,534,535,536,537,538,67,81,539,167,82,188,540,541,162,161,158,83,182,542,function(require, undefined, Array, TypeError, Object, exports, $efront_string__Sourc1, $efront_regexp__r_n_, $efront_string__$$$is, $efront_string__child, $efront_string__sourc7, $efront_string__line_, $efront_string__colum, $efront_string__sourc, $efront_string__name_, $efront_string__add_, $efront_string__fromS2, $efront_string__split1, $efront_string__lengt1, $efront_string__eachM, $efront_string__gener1, $efront_string__subst, $efront_string__gener, $efront_string__splic, $efront_string__join_1, $efront_string__sourc3, $efront_string__forEa, $efront_string__sourc4, $efront_string__setSo, $efront_string__origi, $efront_string__origi1, $efront_string__proto, $efront_string__isArr, $efront_string__strin2, $efront_string__push_, $efront_string__Expec1, $efront_string__prepe, $efront_string__unshi, $efront_string__walk_, $efront_string__repla1, $efront_string__repla, $efront_string__toSet, $efront_string__walkS, $efront_string__keys_, $efront_string__fromS, $efront_string__toStr, $efront_string__toStr1, $efront_string__code_, $efront_string__addMa, $efront_string__origi2, $efront_string__gener2, $efront_string__charC, $efront_string__map_, $efront_string__Sourc3) {
    var SourceMapGenerator = require(190)[$efront_string__Sourc1];
    var util = require(99);
    var REGEX_NEWLINE = $efront_regexp__r_n_;
    var NEWLINE_CODE = 10;
    var isSourceNode = $efront_string__$$$is;
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
        this[$efront_string__child] = [];
        this[$efront_string__sourc7] = {};
        this[$efront_string__line_] = aLine == null ? null : aLine;
        this[$efront_string__colum] = aColumn == null ? null : aColumn;
        this[$efront_string__sourc] = aSource == null ? null : aSource;
        this[$efront_string__name_] = aName == null ? null : aName;
        this[isSourceNode] = true;
        if (aChunks != null)
            this[$efront_string__add_](aChunks)
    }
    SourceNode[$efront_string__fromS2] = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
        var node = new SourceNode;
        var remainingLines = aGeneratedCode[$efront_string__split1](REGEX_NEWLINE);
        var remainingLinesIndex = 0;
        var shiftNextLine = function () {
            var lineContents = getNextLine();
            var newLine = getNextLine() || '';
            return lineContents + newLine;
            function getNextLine() {
                return remainingLinesIndex < remainingLines[$efront_string__lengt1] ? remainingLines[remainingLinesIndex++] : undefined
            }
        };
        var lastGeneratedLine = 1, lastGeneratedColumn = 0;
        var lastMapping = null;
        aSourceMapConsumer[$efront_string__eachM](function (mapping) {
            if (lastMapping !== null) {
                if (lastGeneratedLine < mapping[$efront_string__gener1]) {
                    addMappingWithCode(lastMapping, shiftNextLine());
                    lastGeneratedLine++;
                    lastGeneratedColumn = 0
                } else {
                    var nextLine = remainingLines[remainingLinesIndex] || '';
                    var code = nextLine[$efront_string__subst](0, mapping[$efront_string__gener] - lastGeneratedColumn);
                    remainingLines[remainingLinesIndex] = nextLine[$efront_string__subst](mapping[$efront_string__gener] - lastGeneratedColumn);
                    lastGeneratedColumn = mapping[$efront_string__gener];
                    addMappingWithCode(lastMapping, code);
                    lastMapping = mapping;
                    return
                }
            }
            while (lastGeneratedLine < mapping[$efront_string__gener1]) {
                node[$efront_string__add_](shiftNextLine());
                lastGeneratedLine++
            }
            if (lastGeneratedColumn < mapping[$efront_string__gener]) {
                var nextLine = remainingLines[remainingLinesIndex] || '';
                node[$efront_string__add_](nextLine[$efront_string__subst](0, mapping[$efront_string__gener]));
                remainingLines[remainingLinesIndex] = nextLine[$efront_string__subst](mapping[$efront_string__gener]);
                lastGeneratedColumn = mapping[$efront_string__gener]
            }
            lastMapping = mapping
        }, this);
        if (remainingLinesIndex < remainingLines[$efront_string__lengt1]) {
            if (lastMapping) {
                addMappingWithCode(lastMapping, shiftNextLine())
            }
            node[$efront_string__add_](remainingLines[$efront_string__splic](remainingLinesIndex)[$efront_string__join_1](''))
        }
        aSourceMapConsumer[$efront_string__sourc3][$efront_string__forEa](function (sourceFile) {
            var content = aSourceMapConsumer[$efront_string__sourc4](sourceFile);
            if (content != null) {
                if (aRelativePath != null) {
                    sourceFile = util[$efront_string__join_1](aRelativePath, sourceFile)
                }
                node[$efront_string__setSo](sourceFile, content)
            }
        });
        return node;
        function addMappingWithCode(mapping, code) {
            if (mapping === null || mapping[$efront_string__sourc] === undefined) {
                node[$efront_string__add_](code)
            } else {
                var source = aRelativePath ? util[$efront_string__join_1](aRelativePath, mapping[$efront_string__sourc]) : mapping[$efront_string__sourc];
                node[$efront_string__add_](new SourceNode(mapping[$efront_string__origi], mapping[$efront_string__origi1], source, code, mapping[$efront_string__name_]))
            }
        }
    };
    SourceNode[$efront_string__proto][$efront_string__add_] = function SourceNode_add(aChunk) {
        if (Array[$efront_string__isArr](aChunk)) {
            aChunk[$efront_string__forEa](function (chunk) {
                this[$efront_string__add_](chunk)
            }, this)
        } else if (aChunk[isSourceNode] || typeof aChunk === $efront_string__strin2) {
            if (aChunk) {
                this[$efront_string__child][$efront_string__push_](aChunk)
            }
        } else {
            throw new TypeError($efront_string__Expec1 + aChunk)
        }
        return this
    };
    SourceNode[$efront_string__proto][$efront_string__prepe] = function SourceNode_prepend(aChunk) {
        if (Array[$efront_string__isArr](aChunk)) {
            for (var i = aChunk[$efront_string__lengt1] - 1; i >= 0; i--) {
                this[$efront_string__prepe](aChunk[i])
            }
        } else if (aChunk[isSourceNode] || typeof aChunk === $efront_string__strin2) {
            this[$efront_string__child][$efront_string__unshi](aChunk)
        } else {
            throw new TypeError($efront_string__Expec1 + aChunk)
        }
        return this
    };
    SourceNode[$efront_string__proto][$efront_string__walk_] = function SourceNode_walk(aFn) {
        var _a;
        var chunk;
        for (var i = 0, len = this[$efront_string__child][$efront_string__lengt1]; i < len; i++) {
            chunk = this[$efront_string__child][i];
            if (chunk[isSourceNode]) {
                chunk[$efront_string__walk_](aFn)
            } else {
                if (chunk !== '') {
                    aFn(chunk, (_a = {}, _a[$efront_string__sourc] = this[$efront_string__sourc], _a[$efront_string__line_] = this[$efront_string__line_], _a[$efront_string__colum] = this[$efront_string__colum], _a[$efront_string__name_] = this[$efront_string__name_], _a))
                }
            }
        }
    };
    SourceNode[$efront_string__proto][$efront_string__join_1] = function SourceNode_join(aSep) {
        var newChildren;
        var i;
        var len = this[$efront_string__child][$efront_string__lengt1];
        if (len > 0) {
            newChildren = [];
            for (i = 0; i < len - 1; i++) {
                newChildren[$efront_string__push_](this[$efront_string__child][i]);
                newChildren[$efront_string__push_](aSep)
            }
            newChildren[$efront_string__push_](this[$efront_string__child][i]);
            this[$efront_string__child] = newChildren
        }
        return this
    };
    SourceNode[$efront_string__proto][$efront_string__repla1] = function SourceNode_replaceRight(aPattern, aReplacement) {
        var lastChild = this[$efront_string__child][this[$efront_string__child][$efront_string__lengt1] - 1];
        if (lastChild[isSourceNode]) {
            lastChild[$efront_string__repla1](aPattern, aReplacement)
        } else if (typeof lastChild === $efront_string__strin2) {
            this[$efront_string__child][this[$efront_string__child][$efront_string__lengt1] - 1] = lastChild[$efront_string__repla](aPattern, aReplacement)
        } else {
            this[$efront_string__child][$efront_string__push_](''[$efront_string__repla](aPattern, aReplacement))
        }
        return this
    };
    SourceNode[$efront_string__proto][$efront_string__setSo] = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
        this[$efront_string__sourc7][util[$efront_string__toSet](aSourceFile)] = aSourceContent
    };
    SourceNode[$efront_string__proto][$efront_string__walkS] = function SourceNode_walkSourceContents(aFn) {
        for (var i = 0, len = this[$efront_string__child][$efront_string__lengt1]; i < len; i++) {
            if (this[$efront_string__child][i][isSourceNode]) {
                this[$efront_string__child][i][$efront_string__walkS](aFn)
            }
        }
        var sources = Object[$efront_string__keys_](this[$efront_string__sourc7]);
        for (var i = 0, len = sources[$efront_string__lengt1]; i < len; i++) {
            aFn(util[$efront_string__fromS](sources[i]), this[$efront_string__sourc7][sources[i]])
        }
    };
    SourceNode[$efront_string__proto][$efront_string__toStr] = function SourceNode_toString() {
        var str = '';
        this[$efront_string__walk_](function (chunk) {
            str += chunk
        });
        return str
    };
    SourceNode[$efront_string__proto][$efront_string__toStr1] = function SourceNode_toStringWithSourceMap(aArgs) {
        var _a, _b;
        var generated = (_a = {}, _a[$efront_string__code_] = '', _a[$efront_string__line_] = 1, _a[$efront_string__colum] = 0, _a);
        var map = new SourceMapGenerator(aArgs);
        var sourceMappingActive = false;
        var lastOriginalSource = null;
        var lastOriginalLine = null;
        var lastOriginalColumn = null;
        var lastOriginalName = null;
        this[$efront_string__walk_](function (chunk, original) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            generated[$efront_string__code_] += chunk;
            if (original[$efront_string__sourc] !== null && original[$efront_string__line_] !== null && original[$efront_string__colum] !== null) {
                if (lastOriginalSource !== original[$efront_string__sourc] || lastOriginalLine !== original[$efront_string__line_] || lastOriginalColumn !== original[$efront_string__colum] || lastOriginalName !== original[$efront_string__name_]) {
                    map[$efront_string__addMa]((_a = {}, _a[$efront_string__sourc] = original[$efront_string__sourc], _a[$efront_string__origi2] = (_b = {}, _b[$efront_string__line_] = original[$efront_string__line_], _b[$efront_string__colum] = original[$efront_string__colum], _b), _a[$efront_string__gener2] = (_c = {}, _c[$efront_string__line_] = generated[$efront_string__line_], _c[$efront_string__colum] = generated[$efront_string__colum], _c), _a[$efront_string__name_] = original[$efront_string__name_], _a))
                }
                lastOriginalSource = original[$efront_string__sourc];
                lastOriginalLine = original[$efront_string__line_];
                lastOriginalColumn = original[$efront_string__colum];
                lastOriginalName = original[$efront_string__name_];
                sourceMappingActive = true
            } else if (sourceMappingActive) {
                map[$efront_string__addMa]((_d = {}, _d[$efront_string__gener2] = (_e = {}, _e[$efront_string__line_] = generated[$efront_string__line_], _e[$efront_string__colum] = generated[$efront_string__colum], _e), _d));
                lastOriginalSource = null;
                sourceMappingActive = false
            }
            for (var idx = 0, length = chunk[$efront_string__lengt1]; idx < length; idx++) {
                if (chunk[$efront_string__charC](idx) === NEWLINE_CODE) {
                    generated[$efront_string__line_]++;
                    generated[$efront_string__colum] = 0;
                    if (idx + 1 === length) {
                        lastOriginalSource = null;
                        sourceMappingActive = false
                    } else if (sourceMappingActive) {
                        map[$efront_string__addMa]((_f = {}, _f[$efront_string__sourc] = original[$efront_string__sourc], _f[$efront_string__origi2] = (_g = {}, _g[$efront_string__line_] = original[$efront_string__line_], _g[$efront_string__colum] = original[$efront_string__colum], _g), _f[$efront_string__gener2] = (_h = {}, _h[$efront_string__line_] = generated[$efront_string__line_], _h[$efront_string__colum] = generated[$efront_string__colum], _h), _f[$efront_string__name_] = original[$efront_string__name_], _f))
                    }
                } else {
                    generated[$efront_string__colum]++
                }
            }
        });
        this[$efront_string__walkS](function (sourceFile, sourceContent) {
            map[$efront_string__setSo](sourceFile, sourceContent)
        });
        return _b = {}, _b[$efront_string__code_] = generated[$efront_string__code_], _b[$efront_string__map_] = map, _b
    };
    exports[$efront_string__Sourc3] = SourceNode;
    return exports
}],
/** 544 $efront_string__imple */ 'implements',
/** 545 $efront_string__inter */ 'interface',
/** 546 $efront_string__packa1 */ 'package',
/** 547 $efront_string__priva */ 'private',
/** 548 $efront_string__prote */ 'protected',
/** 549 $efront_string__publi */ 'public',
/** 550 $efront_string__stati */ 'static',
/** 551 $efront_string__let_ */ 'let',
/** 552 $efront_string__yield */ 'yield',
/** 553 $efront_string__if_ */ 'if',
/** 554 $efront_string__in_ */ 'in',
/** 555 $efront_string__do_ */ 'do',
/** 556 $efront_string__var_ */ 'var',
/** 557 $efront_string__for_ */ 'for',
/** 558 $efront_string__new_ */ 'new',
/** 559 $efront_string__try_ */ 'try',
/** 560 $efront_string__this_ */ 'this',
/** 561 $efront_string__else_ */ 'else',
/** 562 $efront_string__case_ */ 'case',
/** 563 $efront_string__void_ */ 'void',
/** 564 $efront_string__with_ */ 'with',
/** 565 $efront_string__enum_ */ 'enum',
/** 566 $efront_string__while */ 'while',
/** 567 $efront_string__catch */ 'catch',
/** 568 $efront_string__throw */ 'throw',
/** 569 $efront_string__const1 */ 'const',
/** 570 $efront_string__class */ 'class',
/** 571 $efront_string__super1 */ 'super',
/** 572 $efront_string__retur */ 'return',
/** 573 $efront_string__typeo */ 'typeof',
/** 574 $efront_string__delet */ 'delete',
/** 575 $efront_string__switc */ 'switch',
/** 576 $efront_string__expor3 */ 'export',
/** 577 $efront_string__impor1 */ 'import',
/** 578 $efront_string__defau */ 'default',
/** 579 $efront_string__final1 */ 'finally',
/** 580 $efront_string__exten1 */ 'extends',
/** 581 $efront_string__conti */ 'continue',
/** 582 $efront_string__debug */ 'debugger',
/** 583 $efront_string__insta */ 'instanceof',
/** 584 $efront_string__null_1 */ 'null',
/** 585 $efront_string__true_ */ 'true',
/** 586 $efront_string__false */ 'false',
/** 587 $efront_string__eval_ */ 'eval',
/** 588 $efront_string__isKey */ 'isKeywordES5',
/** 589 $efront_string__isKey1 */ 'isKeywordES6',
/** 590 $efront_string__isRes */ 'isReservedWordES5',
/** 591 $efront_string__isRes1 */ 'isReservedWordES6',
/** 592 $efront_string__isRes2 */ 'isRestrictedWord',
/** 593 $efront_string__isIde4 */ 'isIdentifierNameES5',
/** 594 $efront_string__isIde5 */ 'isIdentifierNameES6',
/** 595 $efront_string__isIde6 */ 'isIdentifierES5',
/** 596 $efront_string__isIde7 */ 'isIdentifierES6',
/** 597 esutils$lib$keyword.js */ [1,238,544,545,546,547,548,549,550,551,552,34,553,554,555,556,557,558,559,560,561,562,563,564,565,566,394,567,568,569,570,571,572,573,574,575,576,577,578,579,580,402,581,582,583,584,585,586,587,349,83,252,253,254,255,246,588,589,590,591,592,593,594,595,596,function(require, module, $efront_string__imple, $efront_string__inter, $efront_string__packa1, $efront_string__priva, $efront_string__prote, $efront_string__publi, $efront_string__stati, $efront_string__let_, $efront_string__yield, $efront_string__lengt1, $efront_string__if_, $efront_string__in_, $efront_string__do_, $efront_string__var_, $efront_string__for_, $efront_string__new_, $efront_string__try_, $efront_string__this_, $efront_string__else_, $efront_string__case_, $efront_string__void_, $efront_string__with_, $efront_string__enum_, $efront_string__while, $efront_string__break, $efront_string__catch, $efront_string__throw, $efront_string__const1, $efront_string__class, $efront_string__super1, $efront_string__retur, $efront_string__typeo, $efront_string__delet, $efront_string__switc, $efront_string__expor3, $efront_string__impor1, $efront_string__defau, $efront_string__final1, $efront_string__exten1, $efront_string__funct1, $efront_string__conti, $efront_string__debug, $efront_string__insta, $efront_string__null_1, $efront_string__true_, $efront_string__false, $efront_string__eval_, $efront_string__argum1, $efront_string__charC, $efront_string__isIde, $efront_string__isIde1, $efront_string__isIde2, $efront_string__isIde3, $efront_string__expor1, $efront_string__isKey, $efront_string__isKey1, $efront_string__isRes, $efront_string__isRes1, $efront_string__isRes2, $efront_string__isIde4, $efront_string__isIde5, $efront_string__isIde6, $efront_string__isIde7) {
    return function () {
        'use strict';
        var _a;
        var code = require(256);
        function isStrictModeReservedWordES6(id) {
            switch (id) {
            case $efront_string__imple:
            case $efront_string__inter:
            case $efront_string__packa1:
            case $efront_string__priva:
            case $efront_string__prote:
            case $efront_string__publi:
            case $efront_string__stati:
            case $efront_string__let_:
                return true;
            default:
                return false
            }
        }
        function isKeywordES5(id, strict) {
            if (!strict && id === $efront_string__yield) {
                return false
            }
            return isKeywordES6(id, strict)
        }
        function isKeywordES6(id, strict) {
            if (strict && isStrictModeReservedWordES6(id)) {
                return true
            }
            switch (id[$efront_string__lengt1]) {
            case 2:
                return id === $efront_string__if_ || id === $efront_string__in_ || id === $efront_string__do_;
            case 3:
                return id === $efront_string__var_ || id === $efront_string__for_ || id === $efront_string__new_ || id === $efront_string__try_;
            case 4:
                return id === $efront_string__this_ || id === $efront_string__else_ || id === $efront_string__case_ || id === $efront_string__void_ || id === $efront_string__with_ || id === $efront_string__enum_;
            case 5:
                return id === $efront_string__while || id === $efront_string__break || id === $efront_string__catch || id === $efront_string__throw || id === $efront_string__const1 || id === $efront_string__yield || id === $efront_string__class || id === $efront_string__super1;
            case 6:
                return id === $efront_string__retur || id === $efront_string__typeo || id === $efront_string__delet || id === $efront_string__switc || id === $efront_string__expor3 || id === $efront_string__impor1;
            case 7:
                return id === $efront_string__defau || id === $efront_string__final1 || id === $efront_string__exten1;
            case 8:
                return id === $efront_string__funct1 || id === $efront_string__conti || id === $efront_string__debug;
            case 10:
                return id === $efront_string__insta;
            default:
                return false
            }
        }
        function isReservedWordES5(id, strict) {
            return id === $efront_string__null_1 || id === $efront_string__true_ || id === $efront_string__false || isKeywordES5(id, strict)
        }
        function isReservedWordES6(id, strict) {
            return id === $efront_string__null_1 || id === $efront_string__true_ || id === $efront_string__false || isKeywordES6(id, strict)
        }
        function isRestrictedWord(id) {
            return id === $efront_string__eval_ || id === $efront_string__argum1
        }
        function isIdentifierNameES5(id) {
            var i, iz, ch;
            if (id[$efront_string__lengt1] === 0) {
                return false
            }
            ch = id[$efront_string__charC](0);
            if (!code[$efront_string__isIde](ch)) {
                return false
            }
            for (i = 1, iz = id[$efront_string__lengt1]; i < iz; ++i) {
                ch = id[$efront_string__charC](i);
                if (!code[$efront_string__isIde1](ch)) {
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
            if (id[$efront_string__lengt1] === 0) {
                return false
            }
            check = code[$efront_string__isIde2];
            for (i = 0, iz = id[$efront_string__lengt1]; i < iz; ++i) {
                ch = id[$efront_string__charC](i);
                if (55296 <= ch && ch <= 56319) {
                    ++i;
                    if (i >= iz) {
                        return false
                    }
                    lowCh = id[$efront_string__charC](i);
                    if (!(56320 <= lowCh && lowCh <= 57343)) {
                        return false
                    }
                    ch = decodeUtf16(ch, lowCh)
                }
                if (!check(ch)) {
                    return false
                }
                check = code[$efront_string__isIde3]
            }
            return true
        }
        function isIdentifierES5(id, strict) {
            return isIdentifierNameES5(id) && !isReservedWordES5(id, strict)
        }
        function isIdentifierES6(id, strict) {
            return isIdentifierNameES6(id) && !isReservedWordES6(id, strict)
        }
        module[$efront_string__expor1] = (_a = {}, _a[$efront_string__isKey] = isKeywordES5, _a[$efront_string__isKey1] = isKeywordES6, _a[$efront_string__isRes] = isReservedWordES5, _a[$efront_string__isRes1] = isReservedWordES6, _a[$efront_string__isRes2] = isRestrictedWord, _a[$efront_string__isIde4] = isIdentifierNameES5, _a[$efront_string__isIde5] = isIdentifierNameES6, _a[$efront_string__isIde6] = isIdentifierES5, _a[$efront_string__isIde7] = isIdentifierES6, _a)
    }()
}],
/** 598 source-map$source-map.js */ [29,1,189,212,542,function(exports, require, $efront_string__Sourc1, $efront_string__Sourc2, $efront_string__Sourc3) {
    exports[$efront_string__Sourc1] = require(190)[$efront_string__Sourc1];
    exports[$efront_string__Sourc2] = require(237)[$efront_string__Sourc2];
    exports[$efront_string__Sourc3] = require(543)[$efront_string__Sourc3];
    return exports
}],
/** 599 $efront_string__ast_ */ 'ast',
/** 600 $efront_string__keywo */ 'keyword',
/** 601 esutils$lib$utils.js */ [29,1,599,541,600,function(exports, require, $efront_string__ast_, $efront_string__code_, $efront_string__keywo) {
    return function () {
        'use strict';
        exports[$efront_string__ast_] = require(302);
        exports[$efront_string__code_] = require(256);
        exports[$efront_string__keywo] = require(597)
    }()
}],
/** 602 source-map */ [1,function(require) {
    return require(598)
}],
/** 603 esutils */ [1,function(require) {
    return require(601)
}],
/** 604 $efront_string__Expre1 */ 'Expression',
/** 605 $efront_string__State */ 'Statement',
/** 606 $efront_string__Seque1 */ 'Sequence',
/** 607 $efront_string__Yield1 */ 'Yield',
/** 608 $efront_string__Assig2 */ 'Assignment',
/** 609 $efront_string__Condi1 */ 'Conditional',
/** 610 $efront_string__Arrow1 */ 'ArrowFunction',
/** 611 $efront_string__Logic1 */ 'LogicalOR',
/** 612 $efront_string__Logic2 */ 'LogicalAND',
/** 613 $efront_string__Bitwi */ 'BitwiseOR',
/** 614 $efront_string__Bitwi1 */ 'BitwiseXOR',
/** 615 $efront_string__Bitwi2 */ 'BitwiseAND',
/** 616 $efront_string__Equal */ 'Equality',
/** 617 $efront_string__Relat */ 'Relational',
/** 618 $efront_string__Bitwi3 */ 'BitwiseSHIFT',
/** 619 $efront_string__Addit */ 'Additive',
/** 620 $efront_string__Multi */ 'Multiplicative',
/** 621 $efront_string__Expon */ 'Exponentiation',
/** 622 $efront_string__Await1 */ 'Await',
/** 623 $efront_string__Unary1 */ 'Unary',
/** 624 $efront_string__Postf */ 'Postfix',
/** 625 $efront_string__Optio */ 'OptionalChaining',
/** 626 $efront_string__Call_ */ 'Call',
/** 627 $efront_string__New_ */ 'New',
/** 628 $efront_string__Tagge1 */ 'TaggedTemplate',
/** 629 $efront_string__Membe1 */ 'Member',
/** 630 $efront_string__Prima */ 'Primary',
/** 631 $efront_string__11 */ '||',
/** 632 $efront_string__12 */ '&&',
/** 633 $efront_string__13 */ '|',
/** 634 $efront_string__14 */ '^',
/** 635 $efront_string__15 */ '&',
/** 636 $efront_string__16 */ '==',
/** 637 $efront_string__17 */ '!=',
/** 638 $efront_string__18 */ '===',
/** 639 $efront_string__19 */ '!==',
/** 640 $efront_string__is_ */ 'is',
/** 641 $efront_string__isnt_ */ 'isnt',
/** 642 $efront_string__20 */ '<',
/** 643 $efront_string__21 */ '>',
/** 644 $efront_string__22 */ '<=',
/** 645 $efront_string__23 */ '>=',
/** 646 $efront_string__24 */ '<<',
/** 647 $efront_string__25 */ '>>',
/** 648 $efront_string__26 */ '>>>',
/** 649 $efront_string__27 */ '+',
/** 650 $efront_string__28 */ '-',
/** 651 $efront_string__29 */ '*',
/** 652 $efront_string__30 */ '%',
/** 653 $efront_string__31 */ '**',
/** 654 $efront_string__inden */ 'indent',
/** 655 $efront_string__base_ */ 'base',
/** 656 $efront_string__comme */ 'comment',
/** 657 $efront_string__forma */ 'format',
/** 658 $efront_string__style */ 'style',
/** 659 $efront_string__32 */ /** text */ '    ',
/** 660 $efront_string__adjus */ 'adjustMultilineComment',
/** 661 $efront_string__newli */ 'newline',
/** 662 $efront_string__n_ */ /** text */ '\n',
/** 663 $efront_string__space */ 'space',
/** 664 $efront_string__33 */ /** text */ ' ',
/** 665 $efront_string__json_ */ 'json',
/** 666 $efront_string__renum */ 'renumber',
/** 667 $efront_string__hexad */ 'hexadecimal',
/** 668 $efront_string__quote */ 'quotes',
/** 669 $efront_string__singl */ 'single',
/** 670 $efront_string__escap1 */ 'escapeless',
/** 671 $efront_string__compa3 */ 'compact',
/** 672 $efront_string__paren2 */ 'parentheses',
/** 673 $efront_string__semic */ 'semicolons',
/** 674 $efront_string__safeC */ 'safeConcatenation',
/** 675 $efront_string__prese */ 'preserveBlankLines',
/** 676 $efront_string__moz_ */ 'moz',
/** 677 $efront_string__compr */ 'comprehensionExpressionStartsWithAssignment',
/** 678 $efront_string__starl */ 'starlessGenerator',
/** 679 $efront_string__sourc8 */ 'sourceMap',
/** 680 $efront_string__sourc9 */ 'sourceMapRoot',
/** 681 $efront_string__sourc10 */ 'sourceMapWithCode',
/** 682 $efront_string__direc */ 'directive',
/** 683 $efront_string__verba */ 'verbatim',
/** 684 $efront_string__sourc11 */ 'sourceCode',
/** 685 $efront_regexp__r_n_g */ /[\r\n]/g,
/** 686 $efront_string__Numer */ /** text */ 'Numeric literal whose value is NaN',
/** 687 $efront_string__Numer1 */ /** text */ 'Numeric literal whose value is negative',
/** 688 $efront_string__1e400 */ '1e400',
/** 689 $efront_string__1e_40 */ '1e+400',
/** 690 $efront_string__e_1 */ 'e+',
/** 691 $efront_string__e_2 */ 'e',
/** 692 $efront_string__0x_ */ '0x',
/** 693 $efront_string__u_ */ 'u',
/** 694 $efront_string__u_1 */ '\\u',
/** 695 $efront_string__2028_ */ '2028',
/** 696 $efront_string__2029_ */ '2029',
/** 697 $efront_string__34 */ '\\',
/** 698 $efront_string__n_1 */ 'n',
/** 699 $efront_string__r_1 */ 'r',
/** 700 $efront_regexp__$_4 */ /\/([^\/]*)$/,
/** 701 $efront_string__b_ */ '\\b',
/** 702 $efront_string__f_1 */ '\\f',
/** 703 $efront_string__t_1 */ '\\t',
/** 704 $efront_string__toUpp */ 'toUpperCase',
/** 705 $efront_string__0000_ */ '0000',
/** 706 $efront_string__0_ */ '\\0',
/** 707 $efront_string__x0B_ */ '\\x0B',
/** 708 $efront_string__x_ */ '\\x',
/** 709 $efront_string__00_ */ '00',
/** 710 $efront_string__35 */ '\\\\',
/** 711 $efront_string__n_2 */ '\\n',
/** 712 $efront_string__r_2 */ '\\r',
/** 713 $efront_string__u2028 */ '\\u2028',
/** 714 $efront_string__u2029 */ '\\u2029',
/** 715 $efront_string__Incor */ /** text */ 'Incorrectly classified character',
/** 716 $efront_string__doubl */ 'double',
/** 717 $efront_string__36 */ '\'',
/** 718 $efront_string__auto_ */ 'auto',
/** 719 $efront_string__loc_ */ 'loc',
/** 720 $efront_string__start */ 'start',
/** 721 $efront_regexp__r_n_r */ /\r\n|[\r\n]/,
/** 722 $efront_string__MAX_V */ 'MAX_VALUE',
/** 723 $efront_string__Line_1 */ 'Line',
/** 724 $efront_regexp__n_r_ */ /[\n\r]/,
/** 725 $efront_string__37 */ '/*',
/** 726 $efront_string__38 */ '*/',
/** 727 $efront_regexp__n_g */ /\n/g,
/** 728 $efront_string__39 */ '(',
/** 729 $efront_string__40 */ ')',
/** 730 $efront_regexp__r_n_n */ /\r\n|\n/,
/** 731 $efront_string__conte */ 'content',
/** 732 $efront_string__prece */ 'precedence',
/** 733 $efront_string__maybe */ 'maybeBlock',
/** 734 $efront_string__gener5 */ 'generateStatement',
/** 735 $efront_string__maybe1 */ 'maybeBlockSuffix',
/** 736 $efront_string__async */ 'async',
/** 737 $efront_string__gener6 */ 'generator',
/** 738 $efront_string__compu2 */ 'computed',
/** 739 $efront_string__gener7 */ 'generatePattern',
/** 740 $efront_string__gener8 */ 'generateExpression',
/** 741 $efront_string__gener9 */ 'generateFunctionParams',
/** 742 $efront_string__defau1 */ 'defaults',
/** 743 $efront_string__gener10 */ 'generateAssignment',
/** 744 $efront_string__41 */ '=',
/** 745 $efront_string__42 */ '...',
/** 746 $efront_string__gener11 */ 'generateFunctionBody',
/** 747 $efront_string__43 */ '=>',
/** 748 $efront_string__44 */ '{',
/** 749 $efront_string__gener12 */ 'generateIterationForStatement',
/** 750 $efront_string__await */ 'await',
/** 751 $efront_string__kind_ */ 'kind',
/** 752 $efront_string__gener13 */ 'generatePropertyKey',
/** 753 $efront_string__45 */ '[',
/** 754 $efront_string__46 */ ']',
/** 755 $efront_string__semic1 */ 'semicolon',
/** 756 $efront_string__47 */ '}',
/** 757 $efront_string__break1 */ /** text */ 'break ',
/** 758 $efront_string__conti1 */ /** text */ 'continue ',
/** 759 $efront_string__guard */ 'guard',
/** 760 $efront_string__if_1 */ /** text */ ' if ',
/** 761 $efront_string__Expor4 */ 'ExportBatchSpecifier',
/** 762 $efront_string__from_ */ 'from',
/** 763 $efront_string__handl1 */ 'handlers',
/** 764 $efront_string__guard1 */ 'guardedHandlers',
/** 765 $efront_string__defau2 */ 'default:',
/** 766 $efront_string__else_1 */ /** text */ 'else ',
/** 767 $efront_string__of_ */ 'of',
/** 768 $efront_string__opera */ 'operator',
/** 769 $efront_string__48 */ '?',
/** 770 $efront_string__49 */ '!--',
/** 771 $efront_string__optio2 */ 'optional',
/** 772 $efront_string__50 */ '?.',
/** 773 $efront_regexp__eExX_ */ /[eExX]/,
/** 774 $efront_string__deleg */ 'delegate',
/** 775 $efront_string__yield1 */ 'yield*',
/** 776 $efront_string__all_ */ 'all',
/** 777 $efront_string__await1 */ 'await*',
/** 778 $efront_string__prefi */ 'prefix',
/** 779 $efront_string__51 */ '[]',
/** 780 $efront_string__short */ 'shorthand',
/** 781 $efront_string__metho */ 'method',
/** 782 $efront_string__52 */ '{}',
/** 783 $efront_string__as_ */ 'as',
/** 784 $efront_string__regex */ 'regex',
/** 785 $efront_string__patte */ 'pattern',
/** 786 $efront_string__flags */ 'flags',
/** 787 $efront_string__boole */ 'boolean',
/** 788 $efront_string__53 */ '`',
/** 789 $efront_string__$_5 */ '${',
/** 790 $efront_string__impor2 */ 'import(',
/** 791 $efront_regexp__s_$_ */ /\s+$/,
/** 792 $efront_string__Unkno2 */ /** text */ 'Unknown node type: ',
/** 793 $efront_string__brows */ 'browser',
/** 794 $efront_string__sourc12 */ 'sourceContent',
/** 795 $efront_string__gener14 */ 'generate',
/** 796 $efront_string__Prece */ 'Precedence',
/** 797 $efront_string__FORMA */ 'FORMAT_MINIFY',
/** 798 $efront_string__FORMA1 */ 'FORMAT_DEFAULTS',
/** 799 escodegen.js */ [1,40,526,38,100,144,39,527,29,528,415,604,128,257,605,606,607,608,609,610,611,612,613,614,615,616,617,618,619,620,621,622,623,624,625,626,627,628,629,630,631,632,633,634,635,636,637,638,639,640,641,642,643,644,645,554,583,646,647,648,649,650,651,652,64,653,654,655,93,656,657,658,659,660,661,662,663,664,665,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,434,683,684,685,69,34,541,251,83,303,686,687,584,688,689,71,60,73,67,690,691,119,692,188,693,694,695,696,697,698,699,245,84,47,700,701,702,703,704,705,247,706,707,708,709,710,711,712,713,714,715,716,42,717,253,718,382,719,89,720,159,160,250,32,721,722,129,63,723,124,55,724,725,726,413,411,410,97,727,112,331,295,414,728,729,730,191,731,732,108,733,278,734,282,179,735,736,737,738,739,264,740,741,306,125,742,345,743,744,180,745,746,747,351,66,748,749,557,750,342,290,751,376,343,752,753,754,755,756,279,347,757,394,280,758,581,310,311,570,352,353,580,315,274,555,566,308,350,567,759,61,760,281,582,317,576,578,356,318,357,761,762,316,283,402,265,323,577,324,325,340,360,288,568,346,289,559,373,763,375,764,374,579,287,575,368,369,336,562,54,765,294,284,553,293,766,561,276,361,275,320,767,285,292,286,572,277,291,564,270,367,259,768,262,769,266,260,770,261,348,771,772,349,309,268,558,267,363,172,773,327,364,272,341,774,775,552,307,776,777,273,778,263,305,258,344,779,333,312,328,550,137,136,365,332,780,304,781,269,366,782,330,271,560,335,571,359,783,326,362,319,358,784,785,786,787,585,586,321,314,354,355,313,334,337,370,371,338,339,788,372,789,329,322,790,538,791,792,793,542,182,540,146,148,794,165,184,795,416,796,797,798,function(require, Object, RegExp, Error, Math, String, Array, Number, exports, global, $efront_string__Synta, $efront_string__Expre1, $efront_string__hasOw, $efront_string__type_, $efront_string__State, $efront_string__Seque1, $efront_string__Yield1, $efront_string__Assig2, $efront_string__Condi1, $efront_string__Arrow1, $efront_string__Logic1, $efront_string__Logic2, $efront_string__Bitwi, $efront_string__Bitwi1, $efront_string__Bitwi2, $efront_string__Equal, $efront_string__Relat, $efront_string__Bitwi3, $efront_string__Addit, $efront_string__Multi, $efront_string__Expon, $efront_string__Await1, $efront_string__Unary1, $efront_string__Postf, $efront_string__Optio, $efront_string__Call_, $efront_string__New_, $efront_string__Tagge1, $efront_string__Membe1, $efront_string__Prima, $efront_string__11, $efront_string__12, $efront_string__13, $efront_string__14, $efront_string__15, $efront_string__16, $efront_string__17, $efront_string__18, $efront_string__19, $efront_string__is_, $efront_string__isnt_, $efront_string__20, $efront_string__21, $efront_string__22, $efront_string__23, $efront_string__in_, $efront_string__insta, $efront_string__24, $efront_string__25, $efront_string__26, $efront_string__27, $efront_string__28, $efront_string__29, $efront_string__30, $efront_string__7, $efront_string__31, $efront_string__inden, $efront_string__base_, $efront_string__parse, $efront_string__comme, $efront_string__forma, $efront_string__style, $efront_string__32, $efront_string__adjus, $efront_string__newli, $efront_string__n_, $efront_string__space, $efront_string__33, $efront_string__json_, $efront_string__renum, $efront_string__hexad, $efront_string__quote, $efront_string__singl, $efront_string__escap1, $efront_string__compa3, $efront_string__paren2, $efront_string__semic, $efront_string__safeC, $efront_string__prese, $efront_string__moz_, $efront_string__compr, $efront_string__starl, $efront_string__sourc8, $efront_string__sourc9, $efront_string__sourc10, $efront_string__direc, $efront_string__raw_, $efront_string__verba, $efront_string__sourc11, $efront_regexp__r_n_g, $efront_string__test_, $efront_string__lengt1, $efront_string__code_, $efront_string__isLin, $efront_string__charC, $efront_string__objec, $efront_string__Numer, $efront_string__Numer1, $efront_string__null_1, $efront_string__1e400, $efront_string__1e_40, $efront_string__index1, $efront_string__5, $efront_string__slice1, $efront_string__repla, $efront_string__e_1, $efront_string__e_2, $efront_string__floor, $efront_string__0x_, $efront_string__toStr, $efront_string__u_, $efront_string__u_1, $efront_string__2028_, $efront_string__2029_, $efront_string__34, $efront_string__n_1, $efront_string__r_1, $efront_string__fromC, $efront_string__sourc, $efront_string__match, $efront_regexp__$_4, $efront_string__b_, $efront_string__f_1, $efront_string__t_1, $efront_string__toUpp, $efront_string__0000_, $efront_string__isDec, $efront_string__0_, $efront_string__x0B_, $efront_string__x_, $efront_string__00_, $efront_string__35, $efront_string__n_2, $efront_string__r_2, $efront_string__u2028, $efront_string__u2029, $efront_string__Incor, $efront_string__doubl, $efront_string__, $efront_string__36, $efront_string__isIde1, $efront_string__auto_, $efront_string__isArr, $efront_string__loc_, $efront_string__name_, $efront_string__start, $efront_string__line_, $efront_string__colum, $efront_string__isWhi, $efront_string__split1, $efront_regexp__r_n_r, $efront_string__MAX_V, $efront_string__undef, $efront_string__join_1, $efront_string__Line_1, $efront_string__value, $efront_string__2, $efront_regexp__n_r_, $efront_string__37, $efront_string__38, $efront_string__leadi, $efront_string__exten, $efront_string__range, $efront_string__subst1, $efront_regexp__n_g, $efront_string__push_, $efront_string__Progr, $efront_string__body_, $efront_string__trail1, $efront_string__39, $efront_string__40, $efront_regexp__r_n_n, $efront_string__strin2, $efront_string__conte, $efront_string__prece, $efront_string__proto, $efront_string__maybe, $efront_string__Block, $efront_string__gener5, $efront_string__Empty, $efront_string__9, $efront_string__maybe1, $efront_string__async, $efront_string__gener6, $efront_string__compu2, $efront_string__gener7, $efront_string__Ident, $efront_string__gener8, $efront_string__gener9, $efront_string__Arrow, $efront_string__rest_, $efront_string__defau1, $efront_string__param, $efront_string__gener10, $efront_string__41, $efront_string__10, $efront_string__42, $efront_string__gener11, $efront_string__43, $efront_string__expre, $efront_string__charA, $efront_string__44, $efront_string__gener12, $efront_string__for_, $efront_string__await, $efront_string__left_, $efront_string__Varia, $efront_string__kind_, $efront_string__decla1, $efront_string__right, $efront_string__gener13, $efront_string__45, $efront_string__46, $efront_string__semic1, $efront_string__47, $efront_string__Break, $efront_string__label, $efront_string__break1, $efront_string__break, $efront_string__Conti, $efront_string__conti1, $efront_string__conti, $efront_string__Class, $efront_string__Class1, $efront_string__class, $efront_string__id_, $efront_string__super, $efront_string__exten1, $efront_string__Direc, $efront_string__DoWhi, $efront_string__do_, $efront_string__while, $efront_string__Catch, $efront_string__param1, $efront_string__catch, $efront_string__guard, $efront_string__splic, $efront_string__if_1, $efront_string__Debug, $efront_string__debug, $efront_string__Expor1, $efront_string__expor3, $efront_string__defau, $efront_string__decla, $efront_string__Expor2, $efront_string__speci, $efront_string__Expor4, $efront_string__from_, $efront_string__Expor, $efront_string__Expre, $efront_string__funct1, $efront_string__Liter, $efront_string__Impor1, $efront_string__impor1, $efront_string__Impor2, $efront_string__Impor3, $efront_string__Varia1, $efront_string__init_, $efront_string__Throw, $efront_string__throw, $efront_string__argum, $efront_string__TrySt, $efront_string__try_, $efront_string__block1, $efront_string__handl1, $efront_string__final, $efront_string__guard1, $efront_string__handl, $efront_string__final1, $efront_string__Switc, $efront_string__switc, $efront_string__discr, $efront_string__cases, $efront_string__Switc1, $efront_string__case_, $efront_string__1, $efront_string__defau2, $efront_string__conse, $efront_string__IfSta, $efront_string__if_, $efront_string__alter, $efront_string__else_1, $efront_string__else_, $efront_string__ForSt, $efront_string__updat, $efront_string__ForIn, $efront_string__ForOf, $efront_string__of_, $efront_string__Label, $efront_string__Funct1, $efront_string__Retur, $efront_string__retur, $efront_string__While, $efront_string__WithS, $efront_string__with_, $efront_string__Seque, $efront_string__expre1, $efront_string__Assig, $efront_string__opera, $efront_string__Condi, $efront_string__48, $efront_string__Logic, $efront_string__Binar, $efront_string__49, $efront_string__CallE, $efront_string__calle, $efront_string__optio2, $efront_string__50, $efront_string__argum1, $efront_string__Chain, $efront_string__NewEx, $efront_string__new_, $efront_string__Membe, $efront_string__prope, $efront_string__numbe, $efront_regexp__eExX_, $efront_string__MetaP, $efront_string__meta_, $efront_string__Unary, $efront_string__Yield, $efront_string__deleg, $efront_string__yield1, $efront_string__yield, $efront_string__Await, $efront_string__all_, $efront_string__await1, $efront_string__Updat, $efront_string__prefi, $efront_string__Funct, $efront_string__Array2, $efront_string__Array1, $efront_string__eleme, $efront_string__51, $efront_string__RestE, $efront_string__Class2, $efront_string__Metho, $efront_string__stati, $efront_string__get_, $efront_string__set_, $efront_string__key_, $efront_string__Prope, $efront_string__short, $efront_string__Assig1, $efront_string__metho, $efront_string__Objec, $efront_string__prope1, $efront_string__52, $efront_string__Objec1, $efront_string__ThisE, $efront_string__this_, $efront_string__Super, $efront_string__super1, $efront_string__local, $efront_string__as_, $efront_string__Impor4, $efront_string__impor, $efront_string__Expor3, $efront_string__expor2, $efront_string__regex, $efront_string__patte, $efront_string__flags, $efront_string__boole, $efront_string__true_, $efront_string__false, $efront_string__Gener, $efront_string__Compr1, $efront_string__block, $efront_string__filte, $efront_string__Compr, $efront_string__Sprea, $efront_string__Tagge, $efront_string__tag_, $efront_string__quasi, $efront_string__Templ, $efront_string__Templ1, $efront_string__53, $efront_string__quasi1, $efront_string__$_5, $efront_string__Modul, $efront_string__Impor, $efront_string__impor2, $efront_string__repla1, $efront_regexp__s_$_, $efront_string__Unkno2, $efront_string__brows, $efront_string__Sourc3, $efront_string__map_, $efront_string__toStr1, $efront_string__file_, $efront_string__sourc2, $efront_string__sourc12, $efront_string__setSo, $efront_string__versi, $efront_string__gener14, $efront_string__attac1, $efront_string__Prece, $efront_string__FORMA, $efront_string__FORMA1) {
    return function () {
        'use strict';
        var _a, _b, _c, _d, _e, _f;
        var Syntax, Precedence, BinaryPrecedence, SourceNode, estraverse, esutils, base, indent, json, renumber, hexadecimal, quotes, escapeless, newline, space, parentheses, semicolons, safeConcatenation, directive, extra, parse, sourceMap, sourceCode, preserveBlankLines, FORMAT_MINIFY, FORMAT_DEFAULTS;
        estraverse = require(525);
        esutils = require(603);
        Syntax = estraverse[$efront_string__Synta];
        function isExpression(node) {
            return CodeGenerator[$efront_string__Expre1][$efront_string__hasOw](node[$efront_string__type_])
        }
        function isStatement(node) {
            return CodeGenerator[$efront_string__State][$efront_string__hasOw](node[$efront_string__type_])
        }
        Precedence = (_a = {}, _a[$efront_string__Seque1] = 0, _a[$efront_string__Yield1] = 1, _a[$efront_string__Assig2] = 1, _a[$efront_string__Condi1] = 2, _a[$efront_string__Arrow1] = 2, _a[$efront_string__Logic1] = 3, _a[$efront_string__Logic2] = 4, _a[$efront_string__Bitwi] = 5, _a[$efront_string__Bitwi1] = 6, _a[$efront_string__Bitwi2] = 7, _a[$efront_string__Equal] = 8, _a[$efront_string__Relat] = 9, _a[$efront_string__Bitwi3] = 10, _a[$efront_string__Addit] = 11, _a[$efront_string__Multi] = 12, _a[$efront_string__Expon] = 13, _a[$efront_string__Await1] = 14, _a[$efront_string__Unary1] = 14, _a[$efront_string__Postf] = 15, _a[$efront_string__Optio] = 16, _a[$efront_string__Call_] = 17, _a[$efront_string__New_] = 18, _a[$efront_string__Tagge1] = 19, _a[$efront_string__Membe1] = 20, _a[$efront_string__Prima] = 21, _a);
        BinaryPrecedence = (_b = {}, _b[$efront_string__11] = Precedence[$efront_string__Logic1], _b[$efront_string__12] = Precedence[$efront_string__Logic2], _b[$efront_string__13] = Precedence[$efront_string__Bitwi], _b[$efront_string__14] = Precedence[$efront_string__Bitwi1], _b[$efront_string__15] = Precedence[$efront_string__Bitwi2], _b[$efront_string__16] = Precedence[$efront_string__Equal], _b[$efront_string__17] = Precedence[$efront_string__Equal], _b[$efront_string__18] = Precedence[$efront_string__Equal], _b[$efront_string__19] = Precedence[$efront_string__Equal], _b[$efront_string__is_] = Precedence[$efront_string__Equal], _b[$efront_string__isnt_] = Precedence[$efront_string__Equal], _b[$efront_string__20] = Precedence[$efront_string__Relat], _b[$efront_string__21] = Precedence[$efront_string__Relat], _b[$efront_string__22] = Precedence[$efront_string__Relat], _b[$efront_string__23] = Precedence[$efront_string__Relat], _b[$efront_string__in_] = Precedence[$efront_string__Relat], _b[$efront_string__insta] = Precedence[$efront_string__Relat], _b[$efront_string__24] = Precedence[$efront_string__Bitwi3], _b[$efront_string__25] = Precedence[$efront_string__Bitwi3], _b[$efront_string__26] = Precedence[$efront_string__Bitwi3], _b[$efront_string__27] = Precedence[$efront_string__Addit], _b[$efront_string__28] = Precedence[$efront_string__Addit], _b[$efront_string__29] = Precedence[$efront_string__Multi], _b[$efront_string__30] = Precedence[$efront_string__Multi], _b[$efront_string__7] = Precedence[$efront_string__Multi], _b[$efront_string__31] = Precedence[$efront_string__Expon], _b);
        var F_ALLOW_IN = 1, F_ALLOW_CALL = 1 << 1, F_ALLOW_UNPARATH_NEW = 1 << 2, F_FUNC_BODY = 1 << 3, F_DIRECTIVE_CTX = 1 << 4, F_SEMICOLON_OPT = 1 << 5;
        var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TTF = F_ALLOW_IN | F_ALLOW_CALL, E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW, E_TFF = F_ALLOW_IN, E_FFT = F_ALLOW_UNPARATH_NEW, E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;
        var S_TFFF = F_ALLOW_IN, S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT, S_FFFF = 0, S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX, S_TTFF = F_ALLOW_IN | F_FUNC_BODY;
        function getDefaultOptions() {
            var _a, _b, _c, _d;
            return _a = {}, _a[$efront_string__inden] = null, _a[$efront_string__base_] = null, _a[$efront_string__parse] = null, _a[$efront_string__comme] = false, _a[$efront_string__forma] = (_b = {}, _b[$efront_string__inden] = (_c = {}, _c[$efront_string__style] = $efront_string__32, _c[$efront_string__base_] = 0, _c[$efront_string__adjus] = false, _c), _b[$efront_string__newli] = $efront_string__n_, _b[$efront_string__space] = $efront_string__33, _b[$efront_string__json_] = false, _b[$efront_string__renum] = false, _b[$efront_string__hexad] = false, _b[$efront_string__quote] = $efront_string__singl, _b[$efront_string__escap1] = false, _b[$efront_string__compa3] = false, _b[$efront_string__paren2] = true, _b[$efront_string__semic] = true, _b[$efront_string__safeC] = false, _b[$efront_string__prese] = false, _b), _a[$efront_string__moz_] = (_d = {}, _d[$efront_string__compr] = false, _d[$efront_string__starl] = false, _d), _a[$efront_string__sourc8] = null, _a[$efront_string__sourc9] = null, _a[$efront_string__sourc10] = false, _a[$efront_string__direc] = false, _a[$efront_string__raw_] = true, _a[$efront_string__verba] = null, _a[$efront_string__sourc11] = null, _a
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
            return $efront_regexp__r_n_g[$efront_string__test_](str)
        }
        function endsWithLineTerminator(str) {
            var len = str[$efront_string__lengt1];
            return len && esutils[$efront_string__code_][$efront_string__isLin](str[$efront_string__charC](len - 1))
        }
        function merge(target, override) {
            var key;
            for (key in override) {
                if (override[$efront_string__hasOw](key)) {
                    target[key] = override[key]
                }
            }
            return target
        }
        function updateDeeply(target, override) {
            var key, val;
            function isHashObject(target) {
                return typeof target === $efront_string__objec && target instanceof Object && !(target instanceof RegExp)
            }
            for (key in override) {
                if (override[$efront_string__hasOw](key)) {
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
                throw new Error($efront_string__Numer)
            }
            if (value < 0 || value === 0 && 1 / value < 0) {
                throw new Error($efront_string__Numer1)
            }
            if (value === 1 / 0) {
                return json ? $efront_string__null_1 : renumber ? $efront_string__1e400 : $efront_string__1e_40
            }
            result = '' + value;
            if (!renumber || result[$efront_string__lengt1] < 3) {
                return result
            }
            point = result[$efront_string__index1]($efront_string__5);
            if (!json && result[$efront_string__charC](0) === 48 && point === 1) {
                point = 0;
                result = result[$efront_string__slice1](1)
            }
            temp = result;
            result = result[$efront_string__repla]($efront_string__e_1, $efront_string__e_2);
            exponent = 0;
            if ((pos = temp[$efront_string__index1]($efront_string__e_2)) > 0) {
                exponent = +temp[$efront_string__slice1](pos + 1);
                temp = temp[$efront_string__slice1](0, pos)
            }
            if (point >= 0) {
                exponent -= temp[$efront_string__lengt1] - point - 1;
                temp = +(temp[$efront_string__slice1](0, point) + temp[$efront_string__slice1](point + 1)) + ''
            }
            pos = 0;
            while (temp[$efront_string__charC](temp[$efront_string__lengt1] + pos - 1) === 48) {
                --pos
            }
            if (pos !== 0) {
                exponent -= pos;
                temp = temp[$efront_string__slice1](0, pos)
            }
            if (exponent !== 0) {
                temp += $efront_string__e_2 + exponent
            }
            if ((temp[$efront_string__lengt1] < result[$efront_string__lengt1] || hexadecimal && value > 1e12 && Math[$efront_string__floor](value) === value && (temp = $efront_string__0x_ + value[$efront_string__toStr](16))[$efront_string__lengt1] < result[$efront_string__lengt1]) && +temp === value) {
                result = temp
            }
            return result
        }
        function escapeRegExpCharacter(ch, previousIsBackslash) {
            if ((ch & ~1) === 8232) {
                return (previousIsBackslash ? $efront_string__u_ : $efront_string__u_1) + (ch === 8232 ? $efront_string__2028_ : $efront_string__2029_)
            } else if (ch === 10 || ch === 13) {
                return (previousIsBackslash ? '' : $efront_string__34) + (ch === 10 ? $efront_string__n_1 : $efront_string__r_1)
            }
            return String[$efront_string__fromC](ch)
        }
        function generateRegExp(reg) {
            var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;
            result = reg[$efront_string__toStr]();
            if (reg[$efront_string__sourc]) {
                match = result[$efront_string__match]($efront_regexp__$_4);
                if (!match) {
                    return result
                }
                flags = match[1];
                result = '';
                characterInBrack = false;
                previousIsBackslash = false;
                for (i = 0, iz = reg[$efront_string__sourc][$efront_string__lengt1]; i < iz; ++i) {
                    ch = reg[$efront_string__sourc][$efront_string__charC](i);
                    if (!previousIsBackslash) {
                        if (characterInBrack) {
                            if (ch === 93) {
                                characterInBrack = false
                            }
                        } else {
                            if (ch === 47) {
                                result += $efront_string__34
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
                return $efront_string__7 + result + $efront_string__7 + flags
            }
            return result
        }
        function escapeAllowedCharacter(code, next) {
            var hex;
            if (code === 8) {
                return $efront_string__b_
            }
            if (code === 12) {
                return $efront_string__f_1
            }
            if (code === 9) {
                return $efront_string__t_1
            }
            hex = code[$efront_string__toStr](16)[$efront_string__toUpp]();
            if (json || code > 255) {
                return $efront_string__u_1 + $efront_string__0000_[$efront_string__slice1](hex[$efront_string__lengt1]) + hex
            } else if (code === 0 && !esutils[$efront_string__code_][$efront_string__isDec](next)) {
                return $efront_string__0_
            } else if (code === 11) {
                return $efront_string__x0B_
            } else {
                return $efront_string__x_ + $efront_string__00_[$efront_string__slice1](hex[$efront_string__lengt1]) + hex
            }
        }
        function escapeDisallowedCharacter(code) {
            if (code === 92) {
                return $efront_string__35
            }
            if (code === 10) {
                return $efront_string__n_2
            }
            if (code === 13) {
                return $efront_string__r_2
            }
            if (code === 8232) {
                return $efront_string__u2028
            }
            if (code === 8233) {
                return $efront_string__u2029
            }
            throw new Error($efront_string__Incor)
        }
        function escapeDirective(str) {
            var i, iz, code, quote;
            quote = quotes === $efront_string__doubl ? $efront_string__ : $efront_string__36;
            for (i = 0, iz = str[$efront_string__lengt1]; i < iz; ++i) {
                code = str[$efront_string__charC](i);
                if (code === 39) {
                    quote = $efront_string__;
                    break
                } else if (code === 34) {
                    quote = $efront_string__36;
                    break
                } else if (code === 92) {
                    ++i
                }
            }
            return quote + str + quote
        }
        function escapeString(str) {
            var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;
            for (i = 0, len = str[$efront_string__lengt1]; i < len; ++i) {
                code = str[$efront_string__charC](i);
                if (code === 39) {
                    ++singleQuotes
                } else if (code === 34) {
                    ++doubleQuotes
                } else if (code === 47 && json) {
                    result += $efront_string__34
                } else if (esutils[$efront_string__code_][$efront_string__isLin](code) || code === 92) {
                    result += escapeDisallowedCharacter(code);
                    continue
                } else if (!esutils[$efront_string__code_][$efront_string__isIde1](code) && (json && code < 32 || !json && !escapeless && (code < 32 || code > 126))) {
                    result += escapeAllowedCharacter(code, str[$efront_string__charC](i + 1));
                    continue
                }
                result += String[$efront_string__fromC](code)
            }
            single = !(quotes === $efront_string__doubl || quotes === $efront_string__auto_ && doubleQuotes < singleQuotes);
            quote = single ? $efront_string__36 : $efront_string__;
            if (!(single ? singleQuotes : doubleQuotes)) {
                return quote + result + quote
            }
            str = result;
            result = quote;
            for (i = 0, len = str[$efront_string__lengt1]; i < len; ++i) {
                code = str[$efront_string__charC](i);
                if (code === 39 && single || code === 34 && !single) {
                    result += $efront_string__34
                }
                result += String[$efront_string__fromC](code)
            }
            return result + quote
        }
        function flattenToString(arr) {
            var i, iz, elem, result = '';
            for (i = 0, iz = arr[$efront_string__lengt1]; i < iz; ++i) {
                elem = arr[i];
                result += Array[$efront_string__isArr](elem) ? flattenToString(elem) : elem
            }
            return result
        }
        function toSourceNodeWhenNeeded(generated, node) {
            if (!sourceMap) {
                if (Array[$efront_string__isArr](generated)) {
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
            if (node[$efront_string__loc_] == null) {
                return new SourceNode(null, null, sourceMap, generated, node[$efront_string__name_] || null)
            }
            return new SourceNode(node[$efront_string__loc_][$efront_string__start][$efront_string__line_], node[$efront_string__loc_][$efront_string__start][$efront_string__colum], sourceMap === true ? node[$efront_string__loc_][$efront_string__sourc] || null : sourceMap, generated, node[$efront_string__name_] || null)
        }
        function noEmptySpace() {
            return space ? space : $efront_string__33
        }
        function join(left, right) {
            var leftSource, rightSource, leftCharCode, rightCharCode;
            leftSource = toSourceNodeWhenNeeded(left)[$efront_string__toStr]();
            if (leftSource[$efront_string__lengt1] === 0) {
                return [right]
            }
            rightSource = toSourceNodeWhenNeeded(right)[$efront_string__toStr]();
            if (rightSource[$efront_string__lengt1] === 0) {
                return [left]
            }
            leftCharCode = leftSource[$efront_string__charC](leftSource[$efront_string__lengt1] - 1);
            rightCharCode = rightSource[$efront_string__charC](0);
            if ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils[$efront_string__code_][$efront_string__isIde1](leftCharCode) && esutils[$efront_string__code_][$efront_string__isIde1](rightCharCode) || leftCharCode === 47 && rightCharCode === 105) {
                return [
                    left,
                    noEmptySpace(),
                    right
                ]
            } else if (esutils[$efront_string__code_][$efront_string__isWhi](leftCharCode) || esutils[$efront_string__code_][$efront_string__isLin](leftCharCode) || esutils[$efront_string__code_][$efront_string__isWhi](rightCharCode) || esutils[$efront_string__code_][$efront_string__isLin](rightCharCode)) {
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
            for (i = str[$efront_string__lengt1] - 1; i >= 0; --i) {
                if (esutils[$efront_string__code_][$efront_string__isLin](str[$efront_string__charC](i))) {
                    break
                }
            }
            return str[$efront_string__lengt1] - 1 - i
        }
        function adjustMultilineComment(value, specialBase) {
            var array, i, len, line, j, spaces, previousBase, sn;
            array = value[$efront_string__split1]($efront_regexp__r_n_r);
            spaces = Number[$efront_string__MAX_V];
            for (i = 1, len = array[$efront_string__lengt1]; i < len; ++i) {
                line = array[i];
                j = 0;
                while (j < line[$efront_string__lengt1] && esutils[$efront_string__code_][$efront_string__isWhi](line[$efront_string__charC](j))) {
                    ++j
                }
                if (spaces > j) {
                    spaces = j
                }
            }
            if (typeof specialBase !== $efront_string__undef) {
                previousBase = base;
                if (array[1][spaces] === $efront_string__29) {
                    specialBase += $efront_string__33
                }
                base = specialBase
            } else {
                if (spaces & 1) {
                    --spaces
                }
                previousBase = base
            }
            for (i = 1, len = array[$efront_string__lengt1]; i < len; ++i) {
                sn = toSourceNodeWhenNeeded(addIndent(array[i][$efront_string__slice1](spaces)));
                array[i] = sourceMap ? sn[$efront_string__join_1]('') : sn
            }
            base = previousBase;
            return array[$efront_string__join_1]($efront_string__n_)
        }
        function generateComment(comment, specialBase) {
            if (comment[$efront_string__type_] === $efront_string__Line_1) {
                if (endsWithLineTerminator(comment[$efront_string__value])) {
                    return $efront_string__2 + comment[$efront_string__value]
                } else {
                    var result = $efront_string__2 + comment[$efront_string__value];
                    if (!preserveBlankLines) {
                        result += $efront_string__n_
                    }
                    return result
                }
            }
            if (extra[$efront_string__forma][$efront_string__inden][$efront_string__adjus] && $efront_regexp__n_r_[$efront_string__test_](comment[$efront_string__value])) {
                return adjustMultilineComment($efront_string__37 + comment[$efront_string__value] + $efront_string__38, specialBase)
            }
            return $efront_string__37 + comment[$efront_string__value] + $efront_string__38
        }
        function addComments(stmt, result) {
            var i, len, comment, save, tailingToStatement, specialBase, fragment, extRange, range, prevRange, prefix, infix, suffix, count;
            if (stmt[$efront_string__leadi] && stmt[$efront_string__leadi][$efront_string__lengt1] > 0) {
                save = result;
                if (preserveBlankLines) {
                    comment = stmt[$efront_string__leadi][0];
                    result = [];
                    extRange = comment[$efront_string__exten];
                    range = comment[$efront_string__range];
                    prefix = sourceCode[$efront_string__subst1](extRange[0], range[0]);
                    count = (prefix[$efront_string__match]($efront_regexp__n_g) || [])[$efront_string__lengt1];
                    if (count > 0) {
                        result[$efront_string__push_](stringRepeat($efront_string__n_, count));
                        result[$efront_string__push_](addIndent(generateComment(comment)))
                    } else {
                        result[$efront_string__push_](prefix);
                        result[$efront_string__push_](generateComment(comment))
                    }
                    prevRange = range;
                    for (i = 1, len = stmt[$efront_string__leadi][$efront_string__lengt1]; i < len; i++) {
                        comment = stmt[$efront_string__leadi][i];
                        range = comment[$efront_string__range];
                        infix = sourceCode[$efront_string__subst1](prevRange[1], range[0]);
                        count = (infix[$efront_string__match]($efront_regexp__n_g) || [])[$efront_string__lengt1];
                        result[$efront_string__push_](stringRepeat($efront_string__n_, count));
                        result[$efront_string__push_](addIndent(generateComment(comment)));
                        prevRange = range
                    }
                    suffix = sourceCode[$efront_string__subst1](range[1], extRange[1]);
                    count = (suffix[$efront_string__match]($efront_regexp__n_g) || [])[$efront_string__lengt1];
                    result[$efront_string__push_](stringRepeat($efront_string__n_, count))
                } else {
                    comment = stmt[$efront_string__leadi][0];
                    result = [];
                    if (safeConcatenation && stmt[$efront_string__type_] === Syntax[$efront_string__Progr] && stmt[$efront_string__body_][$efront_string__lengt1] === 0) {
                        result[$efront_string__push_]($efront_string__n_)
                    }
                    result[$efront_string__push_](generateComment(comment));
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]())) {
                        result[$efront_string__push_]($efront_string__n_)
                    }
                    for (i = 1, len = stmt[$efront_string__leadi][$efront_string__lengt1]; i < len; ++i) {
                        comment = stmt[$efront_string__leadi][i];
                        fragment = [generateComment(comment)];
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string__toStr]())) {
                            fragment[$efront_string__push_]($efront_string__n_)
                        }
                        result[$efront_string__push_](addIndent(fragment))
                    }
                }
                result[$efront_string__push_](addIndent(save))
            }
            if (stmt[$efront_string__trail1]) {
                if (preserveBlankLines) {
                    comment = stmt[$efront_string__trail1][0];
                    extRange = comment[$efront_string__exten];
                    range = comment[$efront_string__range];
                    prefix = sourceCode[$efront_string__subst1](extRange[0], range[0]);
                    count = (prefix[$efront_string__match]($efront_regexp__n_g) || [])[$efront_string__lengt1];
                    if (count > 0) {
                        result[$efront_string__push_](stringRepeat($efront_string__n_, count));
                        result[$efront_string__push_](addIndent(generateComment(comment)))
                    } else {
                        result[$efront_string__push_](prefix);
                        result[$efront_string__push_](generateComment(comment))
                    }
                } else {
                    tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]());
                    specialBase = stringRepeat($efront_string__33, calculateSpaces(toSourceNodeWhenNeeded([
                        base,
                        result,
                        indent
                    ])[$efront_string__toStr]()));
                    for (i = 0, len = stmt[$efront_string__trail1][$efront_string__lengt1]; i < len; ++i) {
                        comment = stmt[$efront_string__trail1][i];
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
                            result[$efront_string__push_](generateComment(comment, specialBase))
                        } else {
                            result = [
                                result,
                                addIndent(generateComment(comment))
                            ]
                        }
                        if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]())) {
                            result = [
                                result,
                                $efront_string__n_
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
                if (sourceCode[j] === $efront_string__n_) {
                    newlineCount++
                }
            }
            for (j = 1; j < newlineCount; j++) {
                result[$efront_string__push_](newline)
            }
        }
        function parenthesize(text, current, should) {
            if (current < should) {
                return [
                    $efront_string__39,
                    text,
                    $efront_string__40
                ]
            }
            return text
        }
        function generateVerbatimString(string) {
            var i, iz, result;
            result = string[$efront_string__split1]($efront_regexp__r_n_n);
            for (i = 1, iz = result[$efront_string__lengt1]; i < iz; i++) {
                result[i] = newline + base + result[i]
            }
            return result
        }
        function generateVerbatim(expr, precedence) {
            var verbatim, result, prec;
            verbatim = expr[extra[$efront_string__verba]];
            if (typeof verbatim === $efront_string__strin2) {
                result = parenthesize(generateVerbatimString(verbatim), Precedence[$efront_string__Seque1], precedence)
            } else {
                result = generateVerbatimString(verbatim[$efront_string__conte]);
                prec = verbatim[$efront_string__prece] != null ? verbatim[$efront_string__prece] : Precedence[$efront_string__Seque1];
                result = parenthesize(result, prec, precedence)
            }
            return toSourceNodeWhenNeeded(result, expr)
        }
        function CodeGenerator() {
        }
        CodeGenerator[$efront_string__proto][$efront_string__maybe] = function (stmt, flags) {
            var result, noLeadingComment, that = this;
            noLeadingComment = !extra[$efront_string__comme] || !stmt[$efront_string__leadi];
            if (stmt[$efront_string__type_] === Syntax[$efront_string__Block] && noLeadingComment) {
                return [
                    space,
                    this[$efront_string__gener5](stmt, flags)
                ]
            }
            if (stmt[$efront_string__type_] === Syntax[$efront_string__Empty] && noLeadingComment) {
                return $efront_string__9
            }
            withIndent(function () {
                result = [
                    newline,
                    addIndent(that[$efront_string__gener5](stmt, flags))
                ]
            });
            return result
        };
        CodeGenerator[$efront_string__proto][$efront_string__maybe1] = function (stmt, result) {
            var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]());
            if (stmt[$efront_string__type_] === Syntax[$efront_string__Block] && (!extra[$efront_string__comme] || !stmt[$efront_string__leadi]) && !ends) {
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
            return toSourceNodeWhenNeeded(node[$efront_string__name_], node)
        }
        function generateAsyncPrefix(node, spaceRequired) {
            return node[$efront_string__async] ? $efront_string__async + (spaceRequired ? noEmptySpace() : space) : ''
        }
        function generateStarSuffix(node) {
            var isGenerator = node[$efront_string__gener6] && !extra[$efront_string__moz_][$efront_string__starl];
            return isGenerator ? $efront_string__29 + space : ''
        }
        function generateMethodPrefix(prop) {
            var func = prop[$efront_string__value], prefix = '';
            if (func[$efront_string__async]) {
                prefix += generateAsyncPrefix(func, !prop[$efront_string__compu2])
            }
            if (func[$efront_string__gener6]) {
                prefix += generateStarSuffix(func) ? $efront_string__29 : ''
            }
            return prefix
        }
        CodeGenerator[$efront_string__proto][$efront_string__gener7] = function (node, precedence, flags) {
            if (node[$efront_string__type_] === Syntax[$efront_string__Ident]) {
                return generateIdentifier(node)
            }
            return this[$efront_string__gener8](node, precedence, flags)
        };
        CodeGenerator[$efront_string__proto][$efront_string__gener9] = function (node) {
            var i, iz, result, hasDefault;
            hasDefault = false;
            if (node[$efront_string__type_] === Syntax[$efront_string__Arrow] && !node[$efront_string__rest_] && (!node[$efront_string__defau1] || node[$efront_string__defau1][$efront_string__lengt1] === 0) && node[$efront_string__param][$efront_string__lengt1] === 1 && node[$efront_string__param][0][$efront_string__type_] === Syntax[$efront_string__Ident]) {
                result = [
                    generateAsyncPrefix(node, true),
                    generateIdentifier(node[$efront_string__param][0])
                ]
            } else {
                result = node[$efront_string__type_] === Syntax[$efront_string__Arrow] ? [generateAsyncPrefix(node, false)] : [];
                result[$efront_string__push_]($efront_string__39);
                if (node[$efront_string__defau1]) {
                    hasDefault = true
                }
                for (i = 0, iz = node[$efront_string__param][$efront_string__lengt1]; i < iz; ++i) {
                    if (hasDefault && node[$efront_string__defau1][i]) {
                        result[$efront_string__push_](this[$efront_string__gener10](node[$efront_string__param][i], node[$efront_string__defau1][i], $efront_string__41, Precedence[$efront_string__Assig2], E_TTT))
                    } else {
                        result[$efront_string__push_](this[$efront_string__gener7](node[$efront_string__param][i], Precedence[$efront_string__Assig2], E_TTT))
                    }
                    if (i + 1 < iz) {
                        result[$efront_string__push_]($efront_string__10 + space)
                    }
                }
                if (node[$efront_string__rest_]) {
                    if (node[$efront_string__param][$efront_string__lengt1]) {
                        result[$efront_string__push_]($efront_string__10 + space)
                    }
                    result[$efront_string__push_]($efront_string__42);
                    result[$efront_string__push_](generateIdentifier(node[$efront_string__rest_]))
                }
                result[$efront_string__push_]($efront_string__40)
            }
            return result
        };
        CodeGenerator[$efront_string__proto][$efront_string__gener11] = function (node) {
            var result, expr;
            result = this[$efront_string__gener9](node);
            if (node[$efront_string__type_] === Syntax[$efront_string__Arrow]) {
                result[$efront_string__push_](space);
                result[$efront_string__push_]($efront_string__43)
            }
            if (node[$efront_string__expre]) {
                result[$efront_string__push_](space);
                expr = this[$efront_string__gener8](node[$efront_string__body_], Precedence[$efront_string__Assig2], E_TTT);
                if (expr[$efront_string__toStr]()[$efront_string__charA](0) === $efront_string__44) {
                    expr = [
                        $efront_string__39,
                        expr,
                        $efront_string__40
                    ]
                }
                result[$efront_string__push_](expr)
            } else {
                result[$efront_string__push_](this[$efront_string__maybe](node[$efront_string__body_], S_TTFF))
            }
            return result
        };
        CodeGenerator[$efront_string__proto][$efront_string__gener12] = function (operator, stmt, flags) {
            var result = [$efront_string__for_ + (stmt[$efront_string__await] ? noEmptySpace() + $efront_string__await : '') + space + $efront_string__39], that = this;
            withIndent(function () {
                if (stmt[$efront_string__left_][$efront_string__type_] === Syntax[$efront_string__Varia]) {
                    withIndent(function () {
                        result[$efront_string__push_](stmt[$efront_string__left_][$efront_string__kind_] + noEmptySpace());
                        result[$efront_string__push_](that[$efront_string__gener5](stmt[$efront_string__left_][$efront_string__decla1][0], S_FFFF))
                    })
                } else {
                    result[$efront_string__push_](that[$efront_string__gener8](stmt[$efront_string__left_], Precedence[$efront_string__Call_], E_TTT))
                }
                result = join(result, operator);
                result = [
                    join(result, that[$efront_string__gener8](stmt[$efront_string__right], Precedence[$efront_string__Assig2], E_TTT)),
                    $efront_string__40
                ]
            });
            result[$efront_string__push_](this[$efront_string__maybe](stmt[$efront_string__body_], flags));
            return result
        };
        CodeGenerator[$efront_string__proto][$efront_string__gener13] = function (expr, computed) {
            var result = [];
            if (computed) {
                result[$efront_string__push_]($efront_string__45)
            }
            result[$efront_string__push_](this[$efront_string__gener8](expr, Precedence[$efront_string__Assig2], E_TTT));
            if (computed) {
                result[$efront_string__push_]($efront_string__46)
            }
            return result
        };
        CodeGenerator[$efront_string__proto][$efront_string__gener10] = function (left, right, operator, precedence, flags) {
            if (Precedence[$efront_string__Assig2] < precedence) {
                flags |= F_ALLOW_IN
            }
            return parenthesize([
                this[$efront_string__gener8](left, Precedence[$efront_string__Call_], flags),
                space + operator + space,
                this[$efront_string__gener8](right, Precedence[$efront_string__Assig2], flags)
            ], Precedence[$efront_string__Assig2], precedence)
        };
        CodeGenerator[$efront_string__proto][$efront_string__semic1] = function (flags) {
            if (!semicolons && flags & F_SEMICOLON_OPT) {
                return ''
            }
            return $efront_string__9
        };
        CodeGenerator[$efront_string__State] = (_c = {}, _c[$efront_string__Block] = function (stmt, flags) {
            var range, content, result = [
                    $efront_string__44,
                    newline
                ], that = this;
            withIndent(function () {
                if (stmt[$efront_string__body_][$efront_string__lengt1] === 0 && preserveBlankLines) {
                    range = stmt[$efront_string__range];
                    if (range[1] - range[0] > 2) {
                        content = sourceCode[$efront_string__subst1](range[0] + 1, range[1] - 1);
                        if (content[0] === $efront_string__n_) {
                            result = [$efront_string__44]
                        }
                        result[$efront_string__push_](content)
                    }
                }
                var i, iz, fragment, bodyFlags;
                bodyFlags = S_TFFF;
                if (flags & F_FUNC_BODY) {
                    bodyFlags |= F_DIRECTIVE_CTX
                }
                for (i = 0, iz = stmt[$efront_string__body_][$efront_string__lengt1]; i < iz; ++i) {
                    if (preserveBlankLines) {
                        if (i === 0) {
                            if (stmt[$efront_string__body_][0][$efront_string__leadi]) {
                                range = stmt[$efront_string__body_][0][$efront_string__leadi][0][$efront_string__exten];
                                content = sourceCode[$efront_string__subst1](range[0], range[1]);
                                if (content[0] === $efront_string__n_) {
                                    result = [$efront_string__44]
                                }
                            }
                            if (!stmt[$efront_string__body_][0][$efront_string__leadi]) {
                                generateBlankLines(stmt[$efront_string__range][0], stmt[$efront_string__body_][0][$efront_string__range][0], result)
                            }
                        }
                        if (i > 0) {
                            if (!stmt[$efront_string__body_][i - 1][$efront_string__trail1] && !stmt[$efront_string__body_][i][$efront_string__leadi]) {
                                generateBlankLines(stmt[$efront_string__body_][i - 1][$efront_string__range][1], stmt[$efront_string__body_][i][$efront_string__range][0], result)
                            }
                        }
                    }
                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT
                    }
                    if (stmt[$efront_string__body_][i][$efront_string__leadi] && preserveBlankLines) {
                        fragment = that[$efront_string__gener5](stmt[$efront_string__body_][i], bodyFlags)
                    } else {
                        fragment = addIndent(that[$efront_string__gener5](stmt[$efront_string__body_][i], bodyFlags))
                    }
                    result[$efront_string__push_](fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string__toStr]())) {
                        if (preserveBlankLines && i < iz - 1) {
                            if (!stmt[$efront_string__body_][i + 1][$efront_string__leadi]) {
                                result[$efront_string__push_](newline)
                            }
                        } else {
                            result[$efront_string__push_](newline)
                        }
                    }
                    if (preserveBlankLines) {
                        if (i === iz - 1) {
                            if (!stmt[$efront_string__body_][i][$efront_string__trail1]) {
                                generateBlankLines(stmt[$efront_string__body_][i][$efront_string__range][1], stmt[$efront_string__range][1], result)
                            }
                        }
                    }
                }
            });
            result[$efront_string__push_](addIndent($efront_string__47));
            return result
        }, _c[$efront_string__Break] = function (stmt, flags) {
            if (stmt[$efront_string__label]) {
                return $efront_string__break1 + stmt[$efront_string__label][$efront_string__name_] + this[$efront_string__semic1](flags)
            }
            return $efront_string__break + this[$efront_string__semic1](flags)
        }, _c[$efront_string__Conti] = function (stmt, flags) {
            if (stmt[$efront_string__label]) {
                return $efront_string__conti1 + stmt[$efront_string__label][$efront_string__name_] + this[$efront_string__semic1](flags)
            }
            return $efront_string__conti + this[$efront_string__semic1](flags)
        }, _c[$efront_string__Class] = function (stmt, flags) {
            var result = [
                    $efront_string__44,
                    newline
                ], that = this;
            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = stmt[$efront_string__body_][$efront_string__lengt1]; i < iz; ++i) {
                    result[$efront_string__push_](indent);
                    result[$efront_string__push_](that[$efront_string__gener8](stmt[$efront_string__body_][i], Precedence[$efront_string__Seque1], E_TTT));
                    if (i + 1 < iz) {
                        result[$efront_string__push_](newline)
                    }
                }
            });
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]())) {
                result[$efront_string__push_](newline)
            }
            result[$efront_string__push_](base);
            result[$efront_string__push_]($efront_string__47);
            return result
        }, _c[$efront_string__Class1] = function (stmt, flags) {
            var result, fragment;
            result = [$efront_string__class];
            if (stmt[$efront_string__id_]) {
                result = join(result, this[$efront_string__gener8](stmt[$efront_string__id_], Precedence[$efront_string__Seque1], E_TTT))
            }
            if (stmt[$efront_string__super]) {
                fragment = join($efront_string__exten1, this[$efront_string__gener8](stmt[$efront_string__super], Precedence[$efront_string__Unary1], E_TTT));
                result = join(result, fragment)
            }
            result[$efront_string__push_](space);
            result[$efront_string__push_](this[$efront_string__gener5](stmt[$efront_string__body_], S_TFFT));
            return result
        }, _c[$efront_string__Direc] = function (stmt, flags) {
            if (extra[$efront_string__raw_] && stmt[$efront_string__raw_]) {
                return stmt[$efront_string__raw_] + this[$efront_string__semic1](flags)
            }
            return escapeDirective(stmt[$efront_string__direc]) + this[$efront_string__semic1](flags)
        }, _c[$efront_string__DoWhi] = function (stmt, flags) {
            var result = join($efront_string__do_, this[$efront_string__maybe](stmt[$efront_string__body_], S_TFFF));
            result = this[$efront_string__maybe1](stmt[$efront_string__body_], result);
            return join(result, [
                $efront_string__while + space + $efront_string__39,
                this[$efront_string__gener8](stmt[$efront_string__test_], Precedence[$efront_string__Seque1], E_TTT),
                $efront_string__40 + this[$efront_string__semic1](flags)
            ])
        }, _c[$efront_string__Catch] = function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                var guard;
                if (stmt[$efront_string__param1]) {
                    result = [
                        $efront_string__catch + space + $efront_string__39,
                        that[$efront_string__gener8](stmt[$efront_string__param1], Precedence[$efront_string__Seque1], E_TTT),
                        $efront_string__40
                    ];
                    if (stmt[$efront_string__guard]) {
                        guard = that[$efront_string__gener8](stmt[$efront_string__guard], Precedence[$efront_string__Seque1], E_TTT);
                        result[$efront_string__splic](2, 0, $efront_string__if_1, guard)
                    }
                } else {
                    result = [$efront_string__catch]
                }
            });
            result[$efront_string__push_](this[$efront_string__maybe](stmt[$efront_string__body_], S_TFFF));
            return result
        }, _c[$efront_string__Debug] = function (stmt, flags) {
            return $efront_string__debug + this[$efront_string__semic1](flags)
        }, _c[$efront_string__Empty] = function (stmt, flags) {
            return $efront_string__9
        }, _c[$efront_string__Expor1] = function (stmt, flags) {
            var result = [$efront_string__expor3], bodyFlags;
            bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF;
            result = join(result, $efront_string__defau);
            if (isStatement(stmt[$efront_string__decla])) {
                result = join(result, this[$efront_string__gener5](stmt[$efront_string__decla], bodyFlags))
            } else {
                result = join(result, this[$efront_string__gener8](stmt[$efront_string__decla], Precedence[$efront_string__Assig2], E_TTT) + this[$efront_string__semic1](flags))
            }
            return result
        }, _c[$efront_string__Expor2] = function (stmt, flags) {
            var result = [$efront_string__expor3], bodyFlags, that = this;
            bodyFlags = flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF;
            if (stmt[$efront_string__decla]) {
                return join(result, this[$efront_string__gener5](stmt[$efront_string__decla], bodyFlags))
            }
            if (stmt[$efront_string__speci]) {
                if (stmt[$efront_string__speci][$efront_string__lengt1] === 0) {
                    result = join(result, $efront_string__44 + space + $efront_string__47)
                } else if (stmt[$efront_string__speci][0][$efront_string__type_] === Syntax[$efront_string__Expor4]) {
                    result = join(result, this[$efront_string__gener8](stmt[$efront_string__speci][0], Precedence[$efront_string__Seque1], E_TTT))
                } else {
                    result = join(result, $efront_string__44);
                    withIndent(function (indent) {
                        var i, iz;
                        result[$efront_string__push_](newline);
                        for (i = 0, iz = stmt[$efront_string__speci][$efront_string__lengt1]; i < iz; ++i) {
                            result[$efront_string__push_](indent);
                            result[$efront_string__push_](that[$efront_string__gener8](stmt[$efront_string__speci][i], Precedence[$efront_string__Seque1], E_TTT));
                            if (i + 1 < iz) {
                                result[$efront_string__push_]($efront_string__10 + newline)
                            }
                        }
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]())) {
                        result[$efront_string__push_](newline)
                    }
                    result[$efront_string__push_](base + $efront_string__47)
                }
                if (stmt[$efront_string__sourc]) {
                    result = join(result, [
                        $efront_string__from_ + space,
                        this[$efront_string__gener8](stmt[$efront_string__sourc], Precedence[$efront_string__Seque1], E_TTT),
                        this[$efront_string__semic1](flags)
                    ])
                } else {
                    result[$efront_string__push_](this[$efront_string__semic1](flags))
                }
            }
            return result
        }, _c[$efront_string__Expor] = function (stmt, flags) {
            return [
                $efront_string__expor3 + space,
                $efront_string__29 + space,
                $efront_string__from_ + space,
                this[$efront_string__gener8](stmt[$efront_string__sourc], Precedence[$efront_string__Seque1], E_TTT),
                this[$efront_string__semic1](flags)
            ]
        }, _c[$efront_string__Expre] = function (stmt, flags) {
            var result, fragment;
            function isClassPrefixed(fragment) {
                var code;
                if (fragment[$efront_string__slice1](0, 5) !== $efront_string__class) {
                    return false
                }
                code = fragment[$efront_string__charC](5);
                return code === 123 || esutils[$efront_string__code_][$efront_string__isWhi](code) || esutils[$efront_string__code_][$efront_string__isLin](code)
            }
            function isFunctionPrefixed(fragment) {
                var code;
                if (fragment[$efront_string__slice1](0, 8) !== $efront_string__funct1) {
                    return false
                }
                code = fragment[$efront_string__charC](8);
                return code === 40 || esutils[$efront_string__code_][$efront_string__isWhi](code) || code === 42 || esutils[$efront_string__code_][$efront_string__isLin](code)
            }
            function isAsyncPrefixed(fragment) {
                var code, i, iz;
                if (fragment[$efront_string__slice1](0, 5) !== $efront_string__async) {
                    return false
                }
                if (!esutils[$efront_string__code_][$efront_string__isWhi](fragment[$efront_string__charC](5))) {
                    return false
                }
                for (i = 6, iz = fragment[$efront_string__lengt1]; i < iz; ++i) {
                    if (!esutils[$efront_string__code_][$efront_string__isWhi](fragment[$efront_string__charC](i))) {
                        break
                    }
                }
                if (i === iz) {
                    return false
                }
                if (fragment[$efront_string__slice1](i, i + 8) !== $efront_string__funct1) {
                    return false
                }
                code = fragment[$efront_string__charC](i + 8);
                return code === 40 || esutils[$efront_string__code_][$efront_string__isWhi](code) || code === 42 || esutils[$efront_string__code_][$efront_string__isLin](code)
            }
            result = [this[$efront_string__gener8](stmt[$efront_string__expre], Precedence[$efront_string__Seque1], E_TTT)];
            fragment = toSourceNodeWhenNeeded(result)[$efront_string__toStr]();
            if (fragment[$efront_string__charC](0) === 123 || isClassPrefixed(fragment) || isFunctionPrefixed(fragment) || isAsyncPrefixed(fragment) || directive && flags & F_DIRECTIVE_CTX && stmt[$efront_string__expre][$efront_string__type_] === Syntax[$efront_string__Liter] && typeof stmt[$efront_string__expre][$efront_string__value] === $efront_string__strin2) {
                result = [
                    $efront_string__39,
                    result,
                    $efront_string__40 + this[$efront_string__semic1](flags)
                ]
            } else {
                result[$efront_string__push_](this[$efront_string__semic1](flags))
            }
            return result
        }, _c[$efront_string__Impor1] = function (stmt, flags) {
            var result, cursor, that = this;
            if (stmt[$efront_string__speci][$efront_string__lengt1] === 0) {
                return [
                    $efront_string__impor1,
                    space,
                    this[$efront_string__gener8](stmt[$efront_string__sourc], Precedence[$efront_string__Seque1], E_TTT),
                    this[$efront_string__semic1](flags)
                ]
            }
            result = [$efront_string__impor1];
            cursor = 0;
            if (stmt[$efront_string__speci][cursor][$efront_string__type_] === Syntax[$efront_string__Impor2]) {
                result = join(result, [this[$efront_string__gener8](stmt[$efront_string__speci][cursor], Precedence[$efront_string__Seque1], E_TTT)]);
                ++cursor
            }
            if (stmt[$efront_string__speci][cursor]) {
                if (cursor !== 0) {
                    result[$efront_string__push_]($efront_string__10)
                }
                if (stmt[$efront_string__speci][cursor][$efront_string__type_] === Syntax[$efront_string__Impor3]) {
                    result = join(result, [
                        space,
                        this[$efront_string__gener8](stmt[$efront_string__speci][cursor], Precedence[$efront_string__Seque1], E_TTT)
                    ])
                } else {
                    result[$efront_string__push_](space + $efront_string__44);
                    if (stmt[$efront_string__speci][$efront_string__lengt1] - cursor === 1) {
                        result[$efront_string__push_](space);
                        result[$efront_string__push_](this[$efront_string__gener8](stmt[$efront_string__speci][cursor], Precedence[$efront_string__Seque1], E_TTT));
                        result[$efront_string__push_](space + $efront_string__47 + space)
                    } else {
                        withIndent(function (indent) {
                            var i, iz;
                            result[$efront_string__push_](newline);
                            for (i = cursor, iz = stmt[$efront_string__speci][$efront_string__lengt1]; i < iz; ++i) {
                                result[$efront_string__push_](indent);
                                result[$efront_string__push_](that[$efront_string__gener8](stmt[$efront_string__speci][i], Precedence[$efront_string__Seque1], E_TTT));
                                if (i + 1 < iz) {
                                    result[$efront_string__push_]($efront_string__10 + newline)
                                }
                            }
                        });
                        if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]())) {
                            result[$efront_string__push_](newline)
                        }
                        result[$efront_string__push_](base + $efront_string__47 + space)
                    }
                }
            }
            result = join(result, [
                $efront_string__from_ + space,
                this[$efront_string__gener8](stmt[$efront_string__sourc], Precedence[$efront_string__Seque1], E_TTT),
                this[$efront_string__semic1](flags)
            ]);
            return result
        }, _c[$efront_string__Varia1] = function (stmt, flags) {
            var itemFlags = flags & F_ALLOW_IN ? E_TTT : E_FTT;
            if (stmt[$efront_string__init_]) {
                return [
                    this[$efront_string__gener8](stmt[$efront_string__id_], Precedence[$efront_string__Assig2], itemFlags),
                    space,
                    $efront_string__41,
                    space,
                    this[$efront_string__gener8](stmt[$efront_string__init_], Precedence[$efront_string__Assig2], itemFlags)
                ]
            }
            return this[$efront_string__gener7](stmt[$efront_string__id_], Precedence[$efront_string__Assig2], itemFlags)
        }, _c[$efront_string__Varia] = function (stmt, flags) {
            var result, i, iz, node, bodyFlags, that = this;
            result = [stmt[$efront_string__kind_]];
            bodyFlags = flags & F_ALLOW_IN ? S_TFFF : S_FFFF;
            function block() {
                node = stmt[$efront_string__decla1][0];
                if (extra[$efront_string__comme] && node[$efront_string__leadi]) {
                    result[$efront_string__push_]($efront_string__n_);
                    result[$efront_string__push_](addIndent(that[$efront_string__gener5](node, bodyFlags)))
                } else {
                    result[$efront_string__push_](noEmptySpace());
                    result[$efront_string__push_](that[$efront_string__gener5](node, bodyFlags))
                }
                for (i = 1, iz = stmt[$efront_string__decla1][$efront_string__lengt1]; i < iz; ++i) {
                    node = stmt[$efront_string__decla1][i];
                    if (extra[$efront_string__comme] && node[$efront_string__leadi]) {
                        result[$efront_string__push_]($efront_string__10 + newline);
                        result[$efront_string__push_](addIndent(that[$efront_string__gener5](node, bodyFlags)))
                    } else {
                        result[$efront_string__push_]($efront_string__10 + space);
                        result[$efront_string__push_](that[$efront_string__gener5](node, bodyFlags))
                    }
                }
            }
            if (stmt[$efront_string__decla1][$efront_string__lengt1] > 1) {
                withIndent(block)
            } else {
                block()
            }
            result[$efront_string__push_](this[$efront_string__semic1](flags));
            return result
        }, _c[$efront_string__Throw] = function (stmt, flags) {
            return [
                join($efront_string__throw, this[$efront_string__gener8](stmt[$efront_string__argum], Precedence[$efront_string__Seque1], E_TTT)),
                this[$efront_string__semic1](flags)
            ]
        }, _c[$efront_string__TrySt] = function (stmt, flags) {
            var result, i, iz, guardedHandlers;
            result = [
                $efront_string__try_,
                this[$efront_string__maybe](stmt[$efront_string__block1], S_TFFF)
            ];
            result = this[$efront_string__maybe1](stmt[$efront_string__block1], result);
            if (stmt[$efront_string__handl1]) {
                for (i = 0, iz = stmt[$efront_string__handl1][$efront_string__lengt1]; i < iz; ++i) {
                    result = join(result, this[$efront_string__gener5](stmt[$efront_string__handl1][i], S_TFFF));
                    if (stmt[$efront_string__final] || i + 1 !== iz) {
                        result = this[$efront_string__maybe1](stmt[$efront_string__handl1][i][$efront_string__body_], result)
                    }
                }
            } else {
                guardedHandlers = stmt[$efront_string__guard1] || [];
                for (i = 0, iz = guardedHandlers[$efront_string__lengt1]; i < iz; ++i) {
                    result = join(result, this[$efront_string__gener5](guardedHandlers[i], S_TFFF));
                    if (stmt[$efront_string__final] || i + 1 !== iz) {
                        result = this[$efront_string__maybe1](guardedHandlers[i][$efront_string__body_], result)
                    }
                }
                if (stmt[$efront_string__handl]) {
                    if (Array[$efront_string__isArr](stmt[$efront_string__handl])) {
                        for (i = 0, iz = stmt[$efront_string__handl][$efront_string__lengt1]; i < iz; ++i) {
                            result = join(result, this[$efront_string__gener5](stmt[$efront_string__handl][i], S_TFFF));
                            if (stmt[$efront_string__final] || i + 1 !== iz) {
                                result = this[$efront_string__maybe1](stmt[$efront_string__handl][i][$efront_string__body_], result)
                            }
                        }
                    } else {
                        result = join(result, this[$efront_string__gener5](stmt[$efront_string__handl], S_TFFF));
                        if (stmt[$efront_string__final]) {
                            result = this[$efront_string__maybe1](stmt[$efront_string__handl][$efront_string__body_], result)
                        }
                    }
                }
            }
            if (stmt[$efront_string__final]) {
                result = join(result, [
                    $efront_string__final1,
                    this[$efront_string__maybe](stmt[$efront_string__final], S_TFFF)
                ])
            }
            return result
        }, _c[$efront_string__Switc] = function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                result = [
                    $efront_string__switc + space + $efront_string__39,
                    that[$efront_string__gener8](stmt[$efront_string__discr], Precedence[$efront_string__Seque1], E_TTT),
                    $efront_string__40 + space + $efront_string__44 + newline
                ]
            });
            if (stmt[$efront_string__cases]) {
                bodyFlags = S_TFFF;
                for (i = 0, iz = stmt[$efront_string__cases][$efront_string__lengt1]; i < iz; ++i) {
                    if (i === iz - 1) {
                        bodyFlags |= F_SEMICOLON_OPT
                    }
                    fragment = addIndent(this[$efront_string__gener5](stmt[$efront_string__cases][i], bodyFlags));
                    result[$efront_string__push_](fragment);
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string__toStr]())) {
                        result[$efront_string__push_](newline)
                    }
                }
            }
            result[$efront_string__push_](addIndent($efront_string__47));
            return result
        }, _c[$efront_string__Switc1] = function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags, that = this;
            withIndent(function () {
                if (stmt[$efront_string__test_]) {
                    result = [
                        join($efront_string__case_, that[$efront_string__gener8](stmt[$efront_string__test_], Precedence[$efront_string__Seque1], E_TTT)),
                        $efront_string__1
                    ]
                } else {
                    result = [$efront_string__defau2]
                }
                i = 0;
                iz = stmt[$efront_string__conse][$efront_string__lengt1];
                if (iz && stmt[$efront_string__conse][0][$efront_string__type_] === Syntax[$efront_string__Block]) {
                    fragment = that[$efront_string__maybe](stmt[$efront_string__conse][0], S_TFFF);
                    result[$efront_string__push_](fragment);
                    i = 1
                }
                if (i !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]())) {
                    result[$efront_string__push_](newline)
                }
                bodyFlags = S_TFFF;
                for (; i < iz; ++i) {
                    if (i === iz - 1 && flags & F_SEMICOLON_OPT) {
                        bodyFlags |= F_SEMICOLON_OPT
                    }
                    fragment = addIndent(that[$efront_string__gener5](stmt[$efront_string__conse][i], bodyFlags));
                    result[$efront_string__push_](fragment);
                    if (i + 1 !== iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string__toStr]())) {
                        result[$efront_string__push_](newline)
                    }
                }
            });
            return result
        }, _c[$efront_string__IfSta] = function (stmt, flags) {
            var result, bodyFlags, semicolonOptional, that = this;
            withIndent(function () {
                result = [
                    $efront_string__if_ + space + $efront_string__39,
                    that[$efront_string__gener8](stmt[$efront_string__test_], Precedence[$efront_string__Seque1], E_TTT),
                    $efront_string__40
                ]
            });
            semicolonOptional = flags & F_SEMICOLON_OPT;
            bodyFlags = S_TFFF;
            if (semicolonOptional) {
                bodyFlags |= F_SEMICOLON_OPT
            }
            if (stmt[$efront_string__alter]) {
                result[$efront_string__push_](this[$efront_string__maybe](stmt[$efront_string__conse], S_TFFF));
                result = this[$efront_string__maybe1](stmt[$efront_string__conse], result);
                if (stmt[$efront_string__alter][$efront_string__type_] === Syntax[$efront_string__IfSta]) {
                    result = join(result, [
                        $efront_string__else_1,
                        this[$efront_string__gener5](stmt[$efront_string__alter], bodyFlags)
                    ])
                } else {
                    result = join(result, join($efront_string__else_, this[$efront_string__maybe](stmt[$efront_string__alter], bodyFlags)))
                }
            } else {
                result[$efront_string__push_](this[$efront_string__maybe](stmt[$efront_string__conse], bodyFlags))
            }
            return result
        }, _c[$efront_string__ForSt] = function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [$efront_string__for_ + space + $efront_string__39];
                if (stmt[$efront_string__init_]) {
                    if (stmt[$efront_string__init_][$efront_string__type_] === Syntax[$efront_string__Varia]) {
                        result[$efront_string__push_](that[$efront_string__gener5](stmt[$efront_string__init_], S_FFFF))
                    } else {
                        result[$efront_string__push_](that[$efront_string__gener8](stmt[$efront_string__init_], Precedence[$efront_string__Seque1], E_FTT));
                        result[$efront_string__push_]($efront_string__9)
                    }
                } else {
                    result[$efront_string__push_]($efront_string__9)
                }
                if (stmt[$efront_string__test_]) {
                    result[$efront_string__push_](space);
                    result[$efront_string__push_](that[$efront_string__gener8](stmt[$efront_string__test_], Precedence[$efront_string__Seque1], E_TTT));
                    result[$efront_string__push_]($efront_string__9)
                } else {
                    result[$efront_string__push_]($efront_string__9)
                }
                if (stmt[$efront_string__updat]) {
                    result[$efront_string__push_](space);
                    result[$efront_string__push_](that[$efront_string__gener8](stmt[$efront_string__updat], Precedence[$efront_string__Seque1], E_TTT));
                    result[$efront_string__push_]($efront_string__40)
                } else {
                    result[$efront_string__push_]($efront_string__40)
                }
            });
            result[$efront_string__push_](this[$efront_string__maybe](stmt[$efront_string__body_], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result
        }, _c[$efront_string__ForIn] = function (stmt, flags) {
            return this[$efront_string__gener12]($efront_string__in_, stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)
        }, _c[$efront_string__ForOf] = function (stmt, flags) {
            return this[$efront_string__gener12]($efront_string__of_, stmt, flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)
        }, _c[$efront_string__Label] = function (stmt, flags) {
            return [
                stmt[$efront_string__label][$efront_string__name_] + $efront_string__1,
                this[$efront_string__maybe](stmt[$efront_string__body_], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF)
            ]
        }, _c[$efront_string__Progr] = function (stmt, flags) {
            var result, fragment, i, iz, bodyFlags;
            iz = stmt[$efront_string__body_][$efront_string__lengt1];
            result = [safeConcatenation && iz > 0 ? $efront_string__n_ : ''];
            bodyFlags = S_TFTF;
            for (i = 0; i < iz; ++i) {
                if (!safeConcatenation && i === iz - 1) {
                    bodyFlags |= F_SEMICOLON_OPT
                }
                if (preserveBlankLines) {
                    if (i === 0) {
                        if (!stmt[$efront_string__body_][0][$efront_string__leadi]) {
                            generateBlankLines(stmt[$efront_string__range][0], stmt[$efront_string__body_][i][$efront_string__range][0], result)
                        }
                    }
                    if (i > 0) {
                        if (!stmt[$efront_string__body_][i - 1][$efront_string__trail1] && !stmt[$efront_string__body_][i][$efront_string__leadi]) {
                            generateBlankLines(stmt[$efront_string__body_][i - 1][$efront_string__range][1], stmt[$efront_string__body_][i][$efront_string__range][0], result)
                        }
                    }
                }
                fragment = addIndent(this[$efront_string__gener5](stmt[$efront_string__body_][i], bodyFlags));
                result[$efront_string__push_](fragment);
                if (i + 1 < iz && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string__toStr]())) {
                    if (preserveBlankLines) {
                        if (!stmt[$efront_string__body_][i + 1][$efront_string__leadi]) {
                            result[$efront_string__push_](newline)
                        }
                    } else {
                        result[$efront_string__push_](newline)
                    }
                }
                if (preserveBlankLines) {
                    if (i === iz - 1) {
                        if (!stmt[$efront_string__body_][i][$efront_string__trail1]) {
                            generateBlankLines(stmt[$efront_string__body_][i][$efront_string__range][1], stmt[$efront_string__range][1], result)
                        }
                    }
                }
            }
            return result
        }, _c[$efront_string__Funct1] = function (stmt, flags) {
            return [
                generateAsyncPrefix(stmt, true),
                $efront_string__funct1,
                generateStarSuffix(stmt) || noEmptySpace(),
                stmt[$efront_string__id_] ? generateIdentifier(stmt[$efront_string__id_]) : '',
                this[$efront_string__gener11](stmt)
            ]
        }, _c[$efront_string__Retur] = function (stmt, flags) {
            if (stmt[$efront_string__argum]) {
                return [
                    join($efront_string__retur, this[$efront_string__gener8](stmt[$efront_string__argum], Precedence[$efront_string__Seque1], E_TTT)),
                    this[$efront_string__semic1](flags)
                ]
            }
            return [$efront_string__retur + this[$efront_string__semic1](flags)]
        }, _c[$efront_string__While] = function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    $efront_string__while + space + $efront_string__39,
                    that[$efront_string__gener8](stmt[$efront_string__test_], Precedence[$efront_string__Seque1], E_TTT),
                    $efront_string__40
                ]
            });
            result[$efront_string__push_](this[$efront_string__maybe](stmt[$efront_string__body_], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result
        }, _c[$efront_string__WithS] = function (stmt, flags) {
            var result, that = this;
            withIndent(function () {
                result = [
                    $efront_string__with_ + space + $efront_string__39,
                    that[$efront_string__gener8](stmt[$efront_string__objec], Precedence[$efront_string__Seque1], E_TTT),
                    $efront_string__40
                ]
            });
            result[$efront_string__push_](this[$efront_string__maybe](stmt[$efront_string__body_], flags & F_SEMICOLON_OPT ? S_TFFT : S_TFFF));
            return result
        }, _c);
        merge(CodeGenerator[$efront_string__proto], CodeGenerator[$efront_string__State]);
        CodeGenerator[$efront_string__Expre1] = (_d = {}, _d[$efront_string__Seque] = function (expr, precedence, flags) {
            var result, i, iz;
            if (Precedence[$efront_string__Seque1] < precedence) {
                flags |= F_ALLOW_IN
            }
            result = [];
            for (i = 0, iz = expr[$efront_string__expre1][$efront_string__lengt1]; i < iz; ++i) {
                result[$efront_string__push_](this[$efront_string__gener8](expr[$efront_string__expre1][i], Precedence[$efront_string__Assig2], flags));
                if (i + 1 < iz) {
                    result[$efront_string__push_]($efront_string__10 + space)
                }
            }
            return parenthesize(result, Precedence[$efront_string__Seque1], precedence)
        }, _d[$efront_string__Assig] = function (expr, precedence, flags) {
            return this[$efront_string__gener10](expr[$efront_string__left_], expr[$efront_string__right], expr[$efront_string__opera], precedence, flags)
        }, _d[$efront_string__Arrow] = function (expr, precedence, flags) {
            return parenthesize(this[$efront_string__gener11](expr), Precedence[$efront_string__Arrow1], precedence)
        }, _d[$efront_string__Condi] = function (expr, precedence, flags) {
            if (Precedence[$efront_string__Condi1] < precedence) {
                flags |= F_ALLOW_IN
            }
            return parenthesize([
                this[$efront_string__gener8](expr[$efront_string__test_], Precedence[$efront_string__Logic1], flags),
                space + $efront_string__48 + space,
                this[$efront_string__gener8](expr[$efront_string__conse], Precedence[$efront_string__Assig2], flags),
                space + $efront_string__1 + space,
                this[$efront_string__gener8](expr[$efront_string__alter], Precedence[$efront_string__Assig2], flags)
            ], Precedence[$efront_string__Condi1], precedence)
        }, _d[$efront_string__Logic] = function (expr, precedence, flags) {
            return this[$efront_string__Binar](expr, precedence, flags)
        }, _d[$efront_string__Binar] = function (expr, precedence, flags) {
            var result, leftPrecedence, rightPrecedence, currentPrecedence, fragment, leftSource;
            currentPrecedence = BinaryPrecedence[expr[$efront_string__opera]];
            leftPrecedence = expr[$efront_string__opera] === $efront_string__31 ? Precedence[$efront_string__Postf] : currentPrecedence;
            rightPrecedence = expr[$efront_string__opera] === $efront_string__31 ? currentPrecedence : currentPrecedence + 1;
            if (currentPrecedence < precedence) {
                flags |= F_ALLOW_IN
            }
            fragment = this[$efront_string__gener8](expr[$efront_string__left_], leftPrecedence, flags);
            leftSource = fragment[$efront_string__toStr]();
            if (leftSource[$efront_string__charC](leftSource[$efront_string__lengt1] - 1) === 47 && esutils[$efront_string__code_][$efront_string__isIde1](expr[$efront_string__opera][$efront_string__charC](0))) {
                result = [
                    fragment,
                    noEmptySpace(),
                    expr[$efront_string__opera]
                ]
            } else {
                result = join(fragment, expr[$efront_string__opera])
            }
            fragment = this[$efront_string__gener8](expr[$efront_string__right], rightPrecedence, flags);
            if (expr[$efront_string__opera] === $efront_string__7 && fragment[$efront_string__toStr]()[$efront_string__charA](0) === $efront_string__7 || expr[$efront_string__opera][$efront_string__slice1](-1) === $efront_string__20 && fragment[$efront_string__toStr]()[$efront_string__slice1](0, 3) === $efront_string__49) {
                result[$efront_string__push_](noEmptySpace());
                result[$efront_string__push_](fragment)
            } else {
                result = join(result, fragment)
            }
            if (expr[$efront_string__opera] === $efront_string__in_ && !(flags & F_ALLOW_IN)) {
                return [
                    $efront_string__39,
                    result,
                    $efront_string__40
                ]
            }
            return parenthesize(result, currentPrecedence, precedence)
        }, _d[$efront_string__CallE] = function (expr, precedence, flags) {
            var result, i, iz;
            result = [this[$efront_string__gener8](expr[$efront_string__calle], Precedence[$efront_string__Call_], E_TTF)];
            if (expr[$efront_string__optio2]) {
                result[$efront_string__push_]($efront_string__50)
            }
            result[$efront_string__push_]($efront_string__39);
            for (i = 0, iz = expr[$efront_string__argum1][$efront_string__lengt1]; i < iz; ++i) {
                result[$efront_string__push_](this[$efront_string__gener8](expr[$efront_string__argum1][i], Precedence[$efront_string__Assig2], E_TTT));
                if (i + 1 < iz) {
                    result[$efront_string__push_]($efront_string__10 + space)
                }
            }
            result[$efront_string__push_]($efront_string__40);
            if (!(flags & F_ALLOW_CALL)) {
                return [
                    $efront_string__39,
                    result,
                    $efront_string__40
                ]
            }
            return parenthesize(result, Precedence[$efront_string__Call_], precedence)
        }, _d[$efront_string__Chain] = function (expr, precedence, flags) {
            if (Precedence[$efront_string__Optio] < precedence) {
                flags |= F_ALLOW_CALL
            }
            var result = this[$efront_string__gener8](expr[$efront_string__expre], Precedence[$efront_string__Optio], flags);
            return parenthesize(result, Precedence[$efront_string__Optio], precedence)
        }, _d[$efront_string__NewEx] = function (expr, precedence, flags) {
            var result, length, i, iz, itemFlags;
            length = expr[$efront_string__argum1][$efront_string__lengt1];
            itemFlags = flags & F_ALLOW_UNPARATH_NEW && !parentheses && length === 0 ? E_TFT : E_TFF;
            result = join($efront_string__new_, this[$efront_string__gener8](expr[$efront_string__calle], Precedence[$efront_string__New_], itemFlags));
            if (!(flags & F_ALLOW_UNPARATH_NEW) || parentheses || length > 0) {
                result[$efront_string__push_]($efront_string__39);
                for (i = 0, iz = length; i < iz; ++i) {
                    result[$efront_string__push_](this[$efront_string__gener8](expr[$efront_string__argum1][i], Precedence[$efront_string__Assig2], E_TTT));
                    if (i + 1 < iz) {
                        result[$efront_string__push_]($efront_string__10 + space)
                    }
                }
                result[$efront_string__push_]($efront_string__40)
            }
            return parenthesize(result, Precedence[$efront_string__New_], precedence)
        }, _d[$efront_string__Membe] = function (expr, precedence, flags) {
            var result, fragment;
            result = [this[$efront_string__gener8](expr[$efront_string__objec], Precedence[$efront_string__Call_], flags & F_ALLOW_CALL ? E_TTF : E_TFF)];
            if (expr[$efront_string__compu2]) {
                if (expr[$efront_string__optio2]) {
                    result[$efront_string__push_]($efront_string__50)
                }
                result[$efront_string__push_]($efront_string__45);
                result[$efront_string__push_](this[$efront_string__gener8](expr[$efront_string__prope], Precedence[$efront_string__Seque1], flags & F_ALLOW_CALL ? E_TTT : E_TFT));
                result[$efront_string__push_]($efront_string__46)
            } else {
                if (!expr[$efront_string__optio2] && expr[$efront_string__objec][$efront_string__type_] === Syntax[$efront_string__Liter] && typeof expr[$efront_string__objec][$efront_string__value] === $efront_string__numbe) {
                    fragment = toSourceNodeWhenNeeded(result)[$efront_string__toStr]();
                    if (fragment[$efront_string__index1]($efront_string__5) < 0 && !$efront_regexp__eExX_[$efront_string__test_](fragment) && esutils[$efront_string__code_][$efront_string__isDec](fragment[$efront_string__charC](fragment[$efront_string__lengt1] - 1)) && !(fragment[$efront_string__lengt1] >= 2 && fragment[$efront_string__charC](0) === 48)) {
                        result[$efront_string__push_]($efront_string__33)
                    }
                }
                result[$efront_string__push_](expr[$efront_string__optio2] ? $efront_string__50 : $efront_string__5);
                result[$efront_string__push_](generateIdentifier(expr[$efront_string__prope]))
            }
            return parenthesize(result, Precedence[$efront_string__Membe1], precedence)
        }, _d[$efront_string__MetaP] = function (expr, precedence, flags) {
            var result;
            result = [];
            result[$efront_string__push_](typeof expr[$efront_string__meta_] === $efront_string__strin2 ? expr[$efront_string__meta_] : generateIdentifier(expr[$efront_string__meta_]));
            result[$efront_string__push_]($efront_string__5);
            result[$efront_string__push_](typeof expr[$efront_string__prope] === $efront_string__strin2 ? expr[$efront_string__prope] : generateIdentifier(expr[$efront_string__prope]));
            return parenthesize(result, Precedence[$efront_string__Membe1], precedence)
        }, _d[$efront_string__Unary] = function (expr, precedence, flags) {
            var result, fragment, rightCharCode, leftSource, leftCharCode;
            fragment = this[$efront_string__gener8](expr[$efront_string__argum], Precedence[$efront_string__Unary1], E_TTT);
            if (space === '') {
                result = join(expr[$efront_string__opera], fragment)
            } else {
                result = [expr[$efront_string__opera]];
                if (expr[$efront_string__opera][$efront_string__lengt1] > 2) {
                    result = join(result, fragment)
                } else {
                    leftSource = toSourceNodeWhenNeeded(result)[$efront_string__toStr]();
                    leftCharCode = leftSource[$efront_string__charC](leftSource[$efront_string__lengt1] - 1);
                    rightCharCode = fragment[$efront_string__toStr]()[$efront_string__charC](0);
                    if ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils[$efront_string__code_][$efront_string__isIde1](leftCharCode) && esutils[$efront_string__code_][$efront_string__isIde1](rightCharCode)) {
                        result[$efront_string__push_](noEmptySpace());
                        result[$efront_string__push_](fragment)
                    } else {
                        result[$efront_string__push_](fragment)
                    }
                }
            }
            return parenthesize(result, Precedence[$efront_string__Unary1], precedence)
        }, _d[$efront_string__Yield] = function (expr, precedence, flags) {
            var result;
            if (expr[$efront_string__deleg]) {
                result = $efront_string__yield1
            } else {
                result = $efront_string__yield
            }
            if (expr[$efront_string__argum]) {
                result = join(result, this[$efront_string__gener8](expr[$efront_string__argum], Precedence[$efront_string__Yield1], E_TTT))
            }
            return parenthesize(result, Precedence[$efront_string__Yield1], precedence)
        }, _d[$efront_string__Await] = function (expr, precedence, flags) {
            var result = join(expr[$efront_string__all_] ? $efront_string__await1 : $efront_string__await, this[$efront_string__gener8](expr[$efront_string__argum], Precedence[$efront_string__Await1], E_TTT));
            return parenthesize(result, Precedence[$efront_string__Await1], precedence)
        }, _d[$efront_string__Updat] = function (expr, precedence, flags) {
            if (expr[$efront_string__prefi]) {
                return parenthesize([
                    expr[$efront_string__opera],
                    this[$efront_string__gener8](expr[$efront_string__argum], Precedence[$efront_string__Unary1], E_TTT)
                ], Precedence[$efront_string__Unary1], precedence)
            }
            return parenthesize([
                this[$efront_string__gener8](expr[$efront_string__argum], Precedence[$efront_string__Postf], E_TTT),
                expr[$efront_string__opera]
            ], Precedence[$efront_string__Postf], precedence)
        }, _d[$efront_string__Funct] = function (expr, precedence, flags) {
            var result = [
                generateAsyncPrefix(expr, true),
                $efront_string__funct1
            ];
            if (expr[$efront_string__id_]) {
                result[$efront_string__push_](generateStarSuffix(expr) || noEmptySpace());
                result[$efront_string__push_](generateIdentifier(expr[$efront_string__id_]))
            } else {
                result[$efront_string__push_](generateStarSuffix(expr) || space)
            }
            result[$efront_string__push_](this[$efront_string__gener11](expr));
            return result
        }, _d[$efront_string__Array2] = function (expr, precedence, flags) {
            return this[$efront_string__Array1](expr, precedence, flags, true)
        }, _d[$efront_string__Array1] = function (expr, precedence, flags, isPattern) {
            var result, multiline, that = this;
            if (!expr[$efront_string__eleme][$efront_string__lengt1]) {
                return $efront_string__51
            }
            multiline = isPattern ? false : expr[$efront_string__eleme][$efront_string__lengt1] > 1;
            result = [
                $efront_string__45,
                multiline ? newline : ''
            ];
            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr[$efront_string__eleme][$efront_string__lengt1]; i < iz; ++i) {
                    if (!expr[$efront_string__eleme][i]) {
                        if (multiline) {
                            result[$efront_string__push_](indent)
                        }
                        if (i + 1 === iz) {
                            result[$efront_string__push_]($efront_string__10)
                        }
                    } else {
                        result[$efront_string__push_](multiline ? indent : '');
                        result[$efront_string__push_](that[$efront_string__gener8](expr[$efront_string__eleme][i], Precedence[$efront_string__Assig2], E_TTT))
                    }
                    if (i + 1 < iz) {
                        result[$efront_string__push_]($efront_string__10 + (multiline ? newline : space))
                    }
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]())) {
                result[$efront_string__push_](newline)
            }
            result[$efront_string__push_](multiline ? base : '');
            result[$efront_string__push_]($efront_string__46);
            return result
        }, _d[$efront_string__RestE] = function (expr, precedence, flags) {
            return $efront_string__42 + this[$efront_string__gener7](expr[$efront_string__argum])
        }, _d[$efront_string__Class2] = function (expr, precedence, flags) {
            var result, fragment;
            result = [$efront_string__class];
            if (expr[$efront_string__id_]) {
                result = join(result, this[$efront_string__gener8](expr[$efront_string__id_], Precedence[$efront_string__Seque1], E_TTT))
            }
            if (expr[$efront_string__super]) {
                fragment = join($efront_string__exten1, this[$efront_string__gener8](expr[$efront_string__super], Precedence[$efront_string__Unary1], E_TTT));
                result = join(result, fragment)
            }
            result[$efront_string__push_](space);
            result[$efront_string__push_](this[$efront_string__gener5](expr[$efront_string__body_], S_TFFT));
            return result
        }, _d[$efront_string__Metho] = function (expr, precedence, flags) {
            var result, fragment;
            if (expr[$efront_string__stati]) {
                result = [$efront_string__stati + space]
            } else {
                result = []
            }
            if (expr[$efront_string__kind_] === $efront_string__get_ || expr[$efront_string__kind_] === $efront_string__set_) {
                fragment = [
                    join(expr[$efront_string__kind_], this[$efront_string__gener13](expr[$efront_string__key_], expr[$efront_string__compu2])),
                    this[$efront_string__gener11](expr[$efront_string__value])
                ]
            } else {
                fragment = [
                    generateMethodPrefix(expr),
                    this[$efront_string__gener13](expr[$efront_string__key_], expr[$efront_string__compu2]),
                    this[$efront_string__gener11](expr[$efront_string__value])
                ]
            }
            return join(result, fragment)
        }, _d[$efront_string__Prope] = function (expr, precedence, flags) {
            if (expr[$efront_string__kind_] === $efront_string__get_ || expr[$efront_string__kind_] === $efront_string__set_) {
                return [
                    expr[$efront_string__kind_],
                    noEmptySpace(),
                    this[$efront_string__gener13](expr[$efront_string__key_], expr[$efront_string__compu2]),
                    this[$efront_string__gener11](expr[$efront_string__value])
                ]
            }
            if (expr[$efront_string__short]) {
                if (expr[$efront_string__value][$efront_string__type_] === $efront_string__Assig1) {
                    return this[$efront_string__Assig1](expr[$efront_string__value], Precedence[$efront_string__Seque1], E_TTT)
                }
                return this[$efront_string__gener13](expr[$efront_string__key_], expr[$efront_string__compu2])
            }
            if (expr[$efront_string__metho]) {
                return [
                    generateMethodPrefix(expr),
                    this[$efront_string__gener13](expr[$efront_string__key_], expr[$efront_string__compu2]),
                    this[$efront_string__gener11](expr[$efront_string__value])
                ]
            }
            return [
                this[$efront_string__gener13](expr[$efront_string__key_], expr[$efront_string__compu2]),
                $efront_string__1 + space,
                this[$efront_string__gener8](expr[$efront_string__value], Precedence[$efront_string__Assig2], E_TTT)
            ]
        }, _d[$efront_string__Objec] = function (expr, precedence, flags) {
            var multiline, result, fragment, that = this;
            if (!expr[$efront_string__prope1][$efront_string__lengt1]) {
                return $efront_string__52
            }
            multiline = expr[$efront_string__prope1][$efront_string__lengt1] > 1;
            withIndent(function () {
                fragment = that[$efront_string__gener8](expr[$efront_string__prope1][0], Precedence[$efront_string__Seque1], E_TTT)
            });
            if (!multiline) {
                if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment)[$efront_string__toStr]())) {
                    return [
                        $efront_string__44,
                        space,
                        fragment,
                        space,
                        $efront_string__47
                    ]
                }
            }
            withIndent(function (indent) {
                var i, iz;
                result = [
                    $efront_string__44,
                    newline,
                    indent,
                    fragment
                ];
                if (multiline) {
                    result[$efront_string__push_]($efront_string__10 + newline);
                    for (i = 1, iz = expr[$efront_string__prope1][$efront_string__lengt1]; i < iz; ++i) {
                        result[$efront_string__push_](indent);
                        result[$efront_string__push_](that[$efront_string__gener8](expr[$efront_string__prope1][i], Precedence[$efront_string__Seque1], E_TTT));
                        if (i + 1 < iz) {
                            result[$efront_string__push_]($efront_string__10 + newline)
                        }
                    }
                }
            });
            if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]())) {
                result[$efront_string__push_](newline)
            }
            result[$efront_string__push_](base);
            result[$efront_string__push_]($efront_string__47);
            return result
        }, _d[$efront_string__Assig1] = function (expr, precedence, flags) {
            return this[$efront_string__gener10](expr[$efront_string__left_], expr[$efront_string__right], $efront_string__41, precedence, flags)
        }, _d[$efront_string__Objec1] = function (expr, precedence, flags) {
            var result, i, iz, multiline, property, that = this;
            if (!expr[$efront_string__prope1][$efront_string__lengt1]) {
                return $efront_string__52
            }
            multiline = false;
            if (expr[$efront_string__prope1][$efront_string__lengt1] === 1) {
                property = expr[$efront_string__prope1][0];
                if (property[$efront_string__type_] === Syntax[$efront_string__Prope] && property[$efront_string__value][$efront_string__type_] !== Syntax[$efront_string__Ident]) {
                    multiline = true
                }
            } else {
                for (i = 0, iz = expr[$efront_string__prope1][$efront_string__lengt1]; i < iz; ++i) {
                    property = expr[$efront_string__prope1][i];
                    if (property[$efront_string__type_] === Syntax[$efront_string__Prope] && !property[$efront_string__short]) {
                        multiline = true;
                        break
                    }
                }
            }
            result = [
                $efront_string__44,
                multiline ? newline : ''
            ];
            withIndent(function (indent) {
                var i, iz;
                for (i = 0, iz = expr[$efront_string__prope1][$efront_string__lengt1]; i < iz; ++i) {
                    result[$efront_string__push_](multiline ? indent : '');
                    result[$efront_string__push_](that[$efront_string__gener8](expr[$efront_string__prope1][i], Precedence[$efront_string__Seque1], E_TTT));
                    if (i + 1 < iz) {
                        result[$efront_string__push_]($efront_string__10 + (multiline ? newline : space))
                    }
                }
            });
            if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result)[$efront_string__toStr]())) {
                result[$efront_string__push_](newline)
            }
            result[$efront_string__push_](multiline ? base : '');
            result[$efront_string__push_]($efront_string__47);
            return result
        }, _d[$efront_string__ThisE] = function (expr, precedence, flags) {
            return $efront_string__this_
        }, _d[$efront_string__Super] = function (expr, precedence, flags) {
            return $efront_string__super1
        }, _d[$efront_string__Ident] = function (expr, precedence, flags) {
            return generateIdentifier(expr)
        }, _d[$efront_string__Impor2] = function (expr, precedence, flags) {
            return generateIdentifier(expr[$efront_string__id_] || expr[$efront_string__local])
        }, _d[$efront_string__Impor3] = function (expr, precedence, flags) {
            var result = [$efront_string__29];
            var id = expr[$efront_string__id_] || expr[$efront_string__local];
            if (id) {
                result[$efront_string__push_](space + $efront_string__as_ + noEmptySpace() + generateIdentifier(id))
            }
            return result
        }, _d[$efront_string__Impor4] = function (expr, precedence, flags) {
            var imported = expr[$efront_string__impor];
            var result = [imported[$efront_string__name_]];
            var local = expr[$efront_string__local];
            if (local && local[$efront_string__name_] !== imported[$efront_string__name_]) {
                result[$efront_string__push_](noEmptySpace() + $efront_string__as_ + noEmptySpace() + generateIdentifier(local))
            }
            return result
        }, _d[$efront_string__Expor3] = function (expr, precedence, flags) {
            var local = expr[$efront_string__local];
            var result = [local[$efront_string__name_]];
            var exported = expr[$efront_string__expor2];
            if (exported && exported[$efront_string__name_] !== local[$efront_string__name_]) {
                result[$efront_string__push_](noEmptySpace() + $efront_string__as_ + noEmptySpace() + generateIdentifier(exported))
            }
            return result
        }, _d[$efront_string__Liter] = function (expr, precedence, flags) {
            var raw;
            if (expr[$efront_string__hasOw]($efront_string__raw_) && parse && extra[$efront_string__raw_]) {
                try {
                    raw = parse(expr[$efront_string__raw_])[$efront_string__body_][0][$efront_string__expre];
                    if (raw[$efront_string__type_] === Syntax[$efront_string__Liter]) {
                        if (raw[$efront_string__value] === expr[$efront_string__value]) {
                            return expr[$efront_string__raw_]
                        }
                    }
                } catch (e) {
                }
            }
            if (expr[$efront_string__regex]) {
                return $efront_string__7 + expr[$efront_string__regex][$efront_string__patte] + $efront_string__7 + expr[$efront_string__regex][$efront_string__flags]
            }
            if (expr[$efront_string__value] === null) {
                return $efront_string__null_1
            }
            if (typeof expr[$efront_string__value] === $efront_string__strin2) {
                return escapeString(expr[$efront_string__value])
            }
            if (typeof expr[$efront_string__value] === $efront_string__numbe) {
                return generateNumber(expr[$efront_string__value])
            }
            if (typeof expr[$efront_string__value] === $efront_string__boole) {
                return expr[$efront_string__value] ? $efront_string__true_ : $efront_string__false
            }
            return generateRegExp(expr[$efront_string__value])
        }, _d[$efront_string__Gener] = function (expr, precedence, flags) {
            return this[$efront_string__Compr1](expr, precedence, flags)
        }, _d[$efront_string__Compr1] = function (expr, precedence, flags) {
            var result, i, iz, fragment, that = this;
            result = expr[$efront_string__type_] === Syntax[$efront_string__Gener] ? [$efront_string__39] : [$efront_string__45];
            if (extra[$efront_string__moz_][$efront_string__compr]) {
                fragment = this[$efront_string__gener8](expr[$efront_string__body_], Precedence[$efront_string__Assig2], E_TTT);
                result[$efront_string__push_](fragment)
            }
            if (expr[$efront_string__block]) {
                withIndent(function () {
                    for (i = 0, iz = expr[$efront_string__block][$efront_string__lengt1]; i < iz; ++i) {
                        fragment = that[$efront_string__gener8](expr[$efront_string__block][i], Precedence[$efront_string__Seque1], E_TTT);
                        if (i > 0 || extra[$efront_string__moz_][$efront_string__compr]) {
                            result = join(result, fragment)
                        } else {
                            result[$efront_string__push_](fragment)
                        }
                    }
                })
            }
            if (expr[$efront_string__filte]) {
                result = join(result, $efront_string__if_ + space);
                fragment = this[$efront_string__gener8](expr[$efront_string__filte], Precedence[$efront_string__Seque1], E_TTT);
                result = join(result, [
                    $efront_string__39,
                    fragment,
                    $efront_string__40
                ])
            }
            if (!extra[$efront_string__moz_][$efront_string__compr]) {
                fragment = this[$efront_string__gener8](expr[$efront_string__body_], Precedence[$efront_string__Assig2], E_TTT);
                result = join(result, fragment)
            }
            result[$efront_string__push_](expr[$efront_string__type_] === Syntax[$efront_string__Gener] ? $efront_string__40 : $efront_string__46);
            return result
        }, _d[$efront_string__Compr] = function (expr, precedence, flags) {
            var fragment;
            if (expr[$efront_string__left_][$efront_string__type_] === Syntax[$efront_string__Varia]) {
                fragment = [
                    expr[$efront_string__left_][$efront_string__kind_],
                    noEmptySpace(),
                    this[$efront_string__gener5](expr[$efront_string__left_][$efront_string__decla1][0], S_FFFF)
                ]
            } else {
                fragment = this[$efront_string__gener8](expr[$efront_string__left_], Precedence[$efront_string__Call_], E_TTT)
            }
            fragment = join(fragment, expr[$efront_string__of_] ? $efront_string__of_ : $efront_string__in_);
            fragment = join(fragment, this[$efront_string__gener8](expr[$efront_string__right], Precedence[$efront_string__Seque1], E_TTT));
            return [
                $efront_string__for_ + space + $efront_string__39,
                fragment,
                $efront_string__40
            ]
        }, _d[$efront_string__Sprea] = function (expr, precedence, flags) {
            return [
                $efront_string__42,
                this[$efront_string__gener8](expr[$efront_string__argum], Precedence[$efront_string__Assig2], E_TTT)
            ]
        }, _d[$efront_string__Tagge] = function (expr, precedence, flags) {
            var itemFlags = E_TTF;
            if (!(flags & F_ALLOW_CALL)) {
                itemFlags = E_TFF
            }
            var result = [
                this[$efront_string__gener8](expr[$efront_string__tag_], Precedence[$efront_string__Call_], itemFlags),
                this[$efront_string__gener8](expr[$efront_string__quasi], Precedence[$efront_string__Prima], E_FFT)
            ];
            return parenthesize(result, Precedence[$efront_string__Tagge1], precedence)
        }, _d[$efront_string__Templ] = function (expr, precedence, flags) {
            return expr[$efront_string__value][$efront_string__raw_]
        }, _d[$efront_string__Templ1] = function (expr, precedence, flags) {
            var result, i, iz;
            result = [$efront_string__53];
            for (i = 0, iz = expr[$efront_string__quasi1][$efront_string__lengt1]; i < iz; ++i) {
                result[$efront_string__push_](this[$efront_string__gener8](expr[$efront_string__quasi1][i], Precedence[$efront_string__Prima], E_TTT));
                if (i + 1 < iz) {
                    result[$efront_string__push_]($efront_string__$_5 + space);
                    result[$efront_string__push_](this[$efront_string__gener8](expr[$efront_string__expre1][i], Precedence[$efront_string__Seque1], E_TTT));
                    result[$efront_string__push_](space + $efront_string__47)
                }
            }
            result[$efront_string__push_]($efront_string__53);
            return result
        }, _d[$efront_string__Modul] = function (expr, precedence, flags) {
            return this[$efront_string__Liter](expr, precedence, flags)
        }, _d[$efront_string__Impor] = function (expr, precedence, flag) {
            return parenthesize([
                $efront_string__impor2,
                this[$efront_string__gener8](expr[$efront_string__sourc], Precedence[$efront_string__Assig2], E_TTT),
                $efront_string__40
            ], Precedence[$efront_string__Call_], precedence)
        }, _d);
        merge(CodeGenerator[$efront_string__proto], CodeGenerator[$efront_string__Expre1]);
        CodeGenerator[$efront_string__proto][$efront_string__gener8] = function (expr, precedence, flags) {
            var result, type;
            type = expr[$efront_string__type_] || Syntax[$efront_string__Prope];
            if (extra[$efront_string__verba] && expr[$efront_string__hasOw](extra[$efront_string__verba])) {
                return generateVerbatim(expr, precedence)
            }
            result = this[type](expr, precedence, flags);
            if (extra[$efront_string__comme]) {
                result = addComments(expr, result)
            }
            return toSourceNodeWhenNeeded(result, expr)
        };
        CodeGenerator[$efront_string__proto][$efront_string__gener5] = function (stmt, flags) {
            var result, fragment;
            result = this[stmt[$efront_string__type_]](stmt, flags);
            if (extra[$efront_string__comme]) {
                result = addComments(stmt, result)
            }
            fragment = toSourceNodeWhenNeeded(result)[$efront_string__toStr]();
            if (stmt[$efront_string__type_] === Syntax[$efront_string__Progr] && !safeConcatenation && newline === '' && fragment[$efront_string__charA](fragment[$efront_string__lengt1] - 1) === $efront_string__n_) {
                result = sourceMap ? toSourceNodeWhenNeeded(result)[$efront_string__repla1]($efront_regexp__s_$_, '') : fragment[$efront_string__repla]($efront_regexp__s_$_, '')
            }
            return toSourceNodeWhenNeeded(result, stmt)
        };
        function generateInternal(node) {
            var codegen;
            codegen = new CodeGenerator;
            if (isStatement(node)) {
                return codegen[$efront_string__gener5](node, S_TFFF)
            }
            if (isExpression(node)) {
                return codegen[$efront_string__gener8](node, Precedence[$efront_string__Seque1], E_TTT)
            }
            throw new Error($efront_string__Unkno2 + node[$efront_string__type_])
        }
        function generate(node, options) {
            var _a, _b;
            var defaultOptions = getDefaultOptions(), result, pair;
            if (options != null) {
                if (typeof options[$efront_string__inden] === $efront_string__strin2) {
                    defaultOptions[$efront_string__forma][$efront_string__inden][$efront_string__style] = options[$efront_string__inden]
                }
                if (typeof options[$efront_string__base_] === $efront_string__numbe) {
                    defaultOptions[$efront_string__forma][$efront_string__inden][$efront_string__base_] = options[$efront_string__base_]
                }
                options = updateDeeply(defaultOptions, options);
                indent = options[$efront_string__forma][$efront_string__inden][$efront_string__style];
                if (typeof options[$efront_string__base_] === $efront_string__strin2) {
                    base = options[$efront_string__base_]
                } else {
                    base = stringRepeat(indent, options[$efront_string__forma][$efront_string__inden][$efront_string__base_])
                }
            } else {
                options = defaultOptions;
                indent = options[$efront_string__forma][$efront_string__inden][$efront_string__style];
                base = stringRepeat(indent, options[$efront_string__forma][$efront_string__inden][$efront_string__base_])
            }
            json = options[$efront_string__forma][$efront_string__json_];
            renumber = options[$efront_string__forma][$efront_string__renum];
            hexadecimal = json ? false : options[$efront_string__forma][$efront_string__hexad];
            quotes = json ? $efront_string__doubl : options[$efront_string__forma][$efront_string__quote];
            escapeless = options[$efront_string__forma][$efront_string__escap1];
            newline = options[$efront_string__forma][$efront_string__newli];
            space = options[$efront_string__forma][$efront_string__space];
            if (options[$efront_string__forma][$efront_string__compa3]) {
                newline = space = indent = base = ''
            }
            parentheses = options[$efront_string__forma][$efront_string__paren2];
            semicolons = options[$efront_string__forma][$efront_string__semic];
            safeConcatenation = options[$efront_string__forma][$efront_string__safeC];
            directive = options[$efront_string__direc];
            parse = json ? null : options[$efront_string__parse];
            sourceMap = options[$efront_string__sourc8];
            sourceCode = options[$efront_string__sourc11];
            preserveBlankLines = options[$efront_string__forma][$efront_string__prese] && sourceCode !== null;
            extra = options;
            if (sourceMap) {
                if (!exports[$efront_string__brows]) {
                    SourceNode = require(602)[$efront_string__Sourc3]
                } else {
                    SourceNode = global[$efront_string__sourc8][$efront_string__Sourc3]
                }
            }
            result = generateInternal(node);
            if (!sourceMap) {
                pair = (_a = {}, _a[$efront_string__code_] = result[$efront_string__toStr](), _a[$efront_string__map_] = null, _a);
                return options[$efront_string__sourc10] ? pair : pair[$efront_string__code_]
            }
            pair = result[$efront_string__toStr1]((_b = {}, _b[$efront_string__file_] = options[$efront_string__file_], _b[$efront_string__sourc2] = options[$efront_string__sourc9], _b));
            if (options[$efront_string__sourc12]) {
                pair[$efront_string__map_][$efront_string__setSo](options[$efront_string__sourc8], options[$efront_string__sourc12])
            }
            if (options[$efront_string__sourc10]) {
                return pair
            }
            return pair[$efront_string__map_][$efront_string__toStr]()
        }
        FORMAT_MINIFY = (_e = {}, _e[$efront_string__inden] = (_f = {}, _f[$efront_string__style] = '', _f[$efront_string__base_] = 0, _f), _e[$efront_string__renum] = true, _e[$efront_string__hexad] = true, _e[$efront_string__quote] = $efront_string__auto_, _e[$efront_string__escap1] = true, _e[$efront_string__compa3] = true, _e[$efront_string__paren2] = false, _e[$efront_string__semic] = false, _e);
        FORMAT_DEFAULTS = getDefaultOptions()[$efront_string__forma];
        exports[$efront_string__versi] = require(524)[$efront_string__versi];
        exports[$efront_string__gener14] = generate;
        exports[$efront_string__attac1] = estraverse[$efront_string__attac1];
        exports[$efront_string__Prece] = updateDeeply({}, Precedence);
        exports[$efront_string__brows] = false;
        exports[$efront_string__FORMA] = FORMAT_MINIFY;
        exports[$efront_string__FORMA1] = FORMAT_DEFAULTS
    }()
}]],function (a, c,s) {
        var 
    m=s[2],
    e=s[7],
    n=s[1],
    q=s[3],
    v=s[6],x=s[8],
    M=238,
    z=s[9],
    o=s[4],
    B=s[12],
    w=s[10],
    E=29,
    y=s[5],
        u,p=[x,m,n,q,o,y,B,e,v,z,w,s[11]],
        h=s[M-1][0],
        j=s[15],
        $=[s[18],s[19],s[20],s[21],s[22],s[23],s[24],s[21],s[26],s[20],s[22],s[27]],
        _=[s[16],s[17],s[18],s[19],s[20],s[21],s[22],s[23],s[24],s[25]][v]()[w](''),T = this,R;
        if (!(a instanceof s[14])){
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
    },[this.window||global])[798]()