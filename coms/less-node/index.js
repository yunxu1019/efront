module.exports=([/*Sun Oct 02 2022 04:24:51 GMT+0800 (中国标准时间) by efront 3.26.2*/].map).call([
/* 1 init */ [],
/* 2 string _length */ "length",
/* 3 string _indexOf */ "indexOf",
/* 4 string _string */ "string",
/* 5 string _exec */ "exec",
/* 6 string _split */ "split",
/* 7 string _exports */ "exports",
/* 8 string _concat */ "concat",
/* 9 string _apply */ "apply",
/* 10 Object */ Object,
/* 11 exports */ [1060],
/* 12 isNaN */ isNaN,
/* 13 Function */ Function,
/* 14 TypeError */ typeof TypeError!=="undefined"?TypeError:void 0,
/* 15 Boolean */ typeof Boolean!=="undefined"?Boolean:void 0,
/* 16 string _definePr */ "defineProperty",
/* 17 string __esModu */ "__esModule",
/* 18 string _value */ "value",
/* 19 string _prototyp */ "prototype",
/* 20 string _toString */ "toString",
/* 21 string _call */ "call",
/* 22 string _slice */ "slice",
/* 23 string _Undefine */ "Undefined",
/* 24 string _Null */ "Null",
/* 25 string _Object */ "Object",
/* 26 string _construc */ "constructor",
/* 27 string _getProto */ "getPrototypeOf",
/* 28 string _keys */ "keys",
/* 29 string _function */ "function",
/* 30 string _Array */ "Array",
/* 31 string _String */ "String",
/* 32 string _Number */ "Number",
/* 33 string _Boolean */ "Boolean",
/* 34 string _RegExp */ "RegExp",
/* 35 string _Map */ "Map",
/* 36 string _WeakMap */ "WeakMap",
/* 37 string _Set */ "Set",
/* 38 string _WeakSet */ "WeakSet",
/* 39 string _Symbol */ "Symbol",
/* 40 string _Date */ "Date",
/* 41 string _Blob */ "Blob",
/* 42 string _File */ "File",
/* 43 string _Promise */ "Promise",
/* 44 string _Error */ "Error",
/* 45 string _Type_mus */ /* text */ "Type must be a function",
/* 46 string _hasOwnPr */ "hasOwnProperty",
/* 47 string _Type_is_ */ /* text */ "Type is not a class",
/* 48 string _name */ "name",
/* 49 string _getType */ "getType",
/* 50 string _isAnyObj */ "isAnyObject",
/* 51 string _isArray */ "isArray",
/* 52 string _isBlob */ "isBlob",
/* 53 string _isBoolea */ "isBoolean",
/* 54 string _isDate */ "isDate",
/* 55 string _isEmptyA */ "isEmptyArray",
/* 56 string _isEmptyO */ "isEmptyObject",
/* 57 string _isEmptyS */ "isEmptyString",
/* 58 string _isError */ "isError",
/* 59 string _isFile */ "isFile",
/* 60 string _isFullAr */ "isFullArray",
/* 61 string _isFullOb */ "isFullObject",
/* 62 string _isFullSt */ "isFullString",
/* 63 string _isFuncti */ "isFunction",
/* 64 string _isMap */ "isMap",
/* 65 string _isNaNVal */ "isNaNValue",
/* 66 string _isNull */ "isNull",
/* 67 string _isNullOr */ "isNullOrUndefined",
/* 68 string _isNumber */ "isNumber",
/* 69 string _isObject */ "isObject",
/* 70 string _isObject1 */ "isObjectLike",
/* 71 string _isOneOf */ "isOneOf",
/* 72 string _isPlainO */ "isPlainObject",
/* 73 string _isPrimit */ "isPrimitive",
/* 74 string _isPromis */ "isPromise",
/* 75 string _isRegExp */ "isRegExp",
/* 76 string _isSet */ "isSet",
/* 77 string _isString */ "isString",
/* 78 string _isSymbol */ "isSymbol",
/* 79 string _isType */ "isType",
/* 80 string _isUndefi */ "isUndefined",
/* 81 string _isWeakMa */ "isWeakMap",
/* 82 string _isWeakSe */ "isWeakSet",
/* 83 is-what$dist$index.cjs.js */ [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,2,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,function(Object,exports,isNaN,Function,TypeError,Boolean,_definePr,__esModu,_value,_prototyp,_toString,_call,_slice,_Undefine,_Null,_Object,_construc,_getProto,_keys,_length,_function,_Array,_String,_Number,_Boolean,_RegExp,_Map,_WeakMap,_Set,_WeakSet,_Symbol,_Date,_Blob,_File,_Promise,_Error,_Type_mus,_hasOwnPr,_Type_is_,_name,_getType,_isAnyObj,_isArray,_isBlob,_isBoolea,_isDate,_isEmptyA,_isEmptyO,_isEmptyS,_isError,_isFile,_isFullAr,_isFullOb,_isFullSt,_isFuncti,_isMap,_isNaNVal,_isNull,_isNullOr,_isNumber,_isObject,_isObject1,_isOneOf,_isPlainO,_isPrimit,_isPromis,_isRegExp,_isSet,_isString,_isSymbol,_isType,_isUndefi,_isWeakMa,_isWeakSe){
 "use strict";

Object[_definePr](exports, __esModu, { [_value]: true });

/**
 * Returns the object type of the given payload
 *
 * @param {*} payload
 * @returns {string}
 */
function getType(payload) { 
    return Object[_prototyp][_toString][_call](payload) [_slice](8, -1);
}
/**
 * Returns whether the payload is undefined
 *
 * @param {*} payload
 * @returns {payload is undefined}
 */
function isUndefined(payload) { 
    return getType(payload) === _Undefine;
}
/**
 * Returns whether the payload is null
 *
 * @param {*} payload
 * @returns {payload is null}
 */
function isNull(payload) { 
    return getType(payload) === _Null;
}
/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
function isPlainObject(payload) { 
    if (getType(payload) !== _Object)
        return false;
    return payload[_construc] === Object && Object[_getProto](payload) === Object[_prototyp];
}
/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
function isObject(payload) { 
    return isPlainObject(payload);
}
/**
 * Returns whether the payload is a an empty object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is { [K in any]: never }}
 */
function isEmptyObject(payload) { 
    return isPlainObject(payload) && Object[_keys](payload) [_length] === 0;
}
/**
 * Returns whether the payload is a an empty object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
function isFullObject(payload) { 
    return isPlainObject(payload) && Object[_keys](payload) [_length] > 0;
}
/**
 * Returns whether the payload is an any kind of object (including special classes or objects with different prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
function isAnyObject(payload) { 
    return getType(payload) === _Object;
}
/**
 * Returns whether the payload is an object like a type passed in < >
 *
 * Usage: isObjectLike<{id: any}>(payload) // will make sure it's an object and has an `id` prop.
 *
 * @template T this must be passed in < >
 * @param {*} payload
 * @returns {payload is T}
 */
function isObjectLike(payload) { 
    return isAnyObject(payload);
}
/**
 * Returns whether the payload is a function (regular or async)
 *
 * @param {*} payload
 * @returns {payload is AnyFunction}
 */
function isFunction(payload) { 
    return typeof payload === _function;
}
/**
 * Returns whether the payload is an array
 *
 * @param {any} payload
 * @returns {payload is any[]}
 */
function isArray(payload) { 
    return getType(payload) === _Array;
}
/**
 * Returns whether the payload is a an array with at least 1 item
 *
 * @param {*} payload
 * @returns {payload is any[]}
 */
function isFullArray(payload) { 
    return isArray(payload) && payload[_length] > 0;
}
/**
 * Returns whether the payload is a an empty array
 *
 * @param {*} payload
 * @returns {payload is []}
 */
function isEmptyArray(payload) { 
    return isArray(payload) && payload[_length] === 0;
}
/**
 * Returns whether the payload is a string
 *
 * @param {*} payload
 * @returns {payload is string}
 */
function isString(payload) { 
    return getType(payload) === _String;
}
/**
 * Returns whether the payload is a string, BUT returns false for ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */
function isFullString(payload) { 
    return isString(payload) && payload !== '';
}
/**
 * Returns whether the payload is ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */
function isEmptyString(payload) { 
    return payload === '';
}
/**
 * Returns whether the payload is a number (but not NaN)
 *
 * This will return `false` for `NaN`!!
 *
 * @param {*} payload
 * @returns {payload is number}
 */
function isNumber(payload) { 
    return getType(payload) === _Number && !isNaN(payload);
}
/**
 * Returns whether the payload is a boolean
 *
 * @param {*} payload
 * @returns {payload is boolean}
 */
function isBoolean(payload) { 
    return getType(payload) === _Boolean;
}
/**
 * Returns whether the payload is a regular expression (RegExp)
 *
 * @param {*} payload
 * @returns {payload is RegExp}
 */
function isRegExp(payload) { 
    return getType(payload) === _RegExp;
}
/**
 * Returns whether the payload is a Map
 *
 * @param {*} payload
 * @returns {payload is Map<any, any>}
 */
function isMap(payload) { 
    return getType(payload) === _Map;
}
/**
 * Returns whether the payload is a WeakMap
 *
 * @param {*} payload
 * @returns {payload is WeakMap<any, any>}
 */
function isWeakMap(payload) { 
    return getType(payload) === _WeakMap;
}
/**
 * Returns whether the payload is a Set
 *
 * @param {*} payload
 * @returns {payload is Set<any>}
 */
function isSet(payload) { 
    return getType(payload) === _Set;
}
/**
 * Returns whether the payload is a WeakSet
 *
 * @param {*} payload
 * @returns {payload is WeakSet<any>}
 */
function isWeakSet(payload) { 
    return getType(payload) === _WeakSet;
}
/**
 * Returns whether the payload is a Symbol
 *
 * @param {*} payload
 * @returns {payload is symbol}
 */
function isSymbol(payload) { 
    return getType(payload) === _Symbol;
}
/**
 * Returns whether the payload is a Date, and that the date is valid
 *
 * @param {*} payload
 * @returns {payload is Date}
 */
function isDate(payload) { 
    return getType(payload) === _Date && !isNaN(payload);
}
/**
 * Returns whether the payload is a Blob
 *
 * @param {*} payload
 * @returns {payload is Blob}
 */
function isBlob(payload) { 
    return getType(payload) === _Blob;
}
/**
 * Returns whether the payload is a File
 *
 * @param {*} payload
 * @returns {payload is File}
 */
function isFile(payload) { 
    return getType(payload) === _File;
}
/**
 * Returns whether the payload is a Promise
 *
 * @param {*} payload
 * @returns {payload is Promise<any>}
 */
function isPromise(payload) { 
    return getType(payload) === _Promise;
}
/**
 * Returns whether the payload is an Error
 *
 * @param {*} payload
 * @returns {payload is Error}
 */
function isError(payload) { 
    return getType(payload) === _Error;
}
/**
 * Returns whether the payload is literally the value `NaN` (it's `NaN` and also a `number`)
 *
 * @param {*} payload
 * @returns {payload is typeof NaN}
 */
function isNaNValue(payload) { 
    return getType(payload) === _Number && isNaN(payload);
}
/**
 * Returns whether the payload is a primitive type (eg. Boolean | Null | Undefined | Number | String | Symbol)
 *
 * @param {*} payload
 * @returns {(payload is boolean | null | undefined | number | string | symbol)}
 */
function isPrimitive(payload) { 
    return (isBoolean(payload) ||
        isNull(payload) ||
        isUndefined(payload) ||
        isNumber(payload) ||
        isString(payload) ||
        isSymbol(payload));
}
/**
 * Returns true whether the payload is null or undefined
 *
 * @param {*} payload
 * @returns {(payload is null | undefined)}
 */
var isNullOrUndefined = isOneOf(isNull, isUndefined);
function isOneOf(a, b, c, d, e) { 
    return function (value) { 
        return a(value) || b(value) || (!!c && c(value)) || (!!d && d(value)) || (!!e && e(value));
    };
}
/**
 * Does a generic check to check that the given payload is of a given type.
 * In cases like Number, it will return true for NaN as NaN is a Number (thanks javascript!);
 * It will, however, differentiate between object and null
 *
 * @template T
 * @param {*} payload
 * @param {T} type
 * @throws {TypeError} Will throw type error if type is an invalid type
 * @returns {payload is T}
 */
function isType(payload, type) { 
    if (!(type instanceof Function)) { 
        throw new TypeError(_Type_mus);
    }
    if (!Object[_prototyp][_hasOwnPr][_call](type, _prototyp)) { 
        throw new TypeError(_Type_is_);
    }
    // Classes usually have names (as functions usually have names)
    var name = type[_name];
    return getType(payload) === name || Boolean(payload && payload[_construc] === type);
}

exports[_getType] = getType;
exports[_isAnyObj] = isAnyObject;
exports[_isArray] = isArray;
exports[_isBlob] = isBlob;
exports[_isBoolea] = isBoolean;
exports[_isDate] = isDate;
exports[_isEmptyA] = isEmptyArray;
exports[_isEmptyO] = isEmptyObject;
exports[_isEmptyS] = isEmptyString;
exports[_isError] = isError;
exports[_isFile] = isFile;
exports[_isFullAr] = isFullArray;
exports[_isFullOb] = isFullObject;
exports[_isFullSt] = isFullString;
exports[_isFuncti] = isFunction;
exports[_isMap] = isMap;
exports[_isNaNVal] = isNaNValue;
exports[_isNull] = isNull;
exports[_isNullOr] = isNullOrUndefined;
exports[_isNumber] = isNumber;
exports[_isObject] = isObject;
exports[_isObject1] = isObjectLike;
exports[_isOneOf] = isOneOf;
exports[_isPlainO] = isPlainObject;
exports[_isPrimit] = isPrimitive;
exports[_isPromis] = isPromise;
exports[_isRegExp] = isRegExp;
exports[_isSet] = isSet;
exports[_isString] = isString;
exports[_isSymbol] = isSymbol;
exports[_isType] = isType;
exports[_isUndefi] = isUndefined;
exports[_isWeakMa] = isWeakMap;
exports[_isWeakSe] = isWeakSet;

return exports
}],
/* 84 Array */ Array,
/* 85 string _imports */ "imports",
/* 86 string _variable */ "variableImports",
/* 87 string _onSeque */ "_onSequencerEmpty",
/* 88 string _current */ "_currentDepth",
/* 89 string _addImpor */ "addImport",
/* 90 string _callback */ "callback",
/* 91 string _args */ "args",
/* 92 string _isReady */ "isReady",
/* 93 string _push */ "push",
/* 94 string _tryRun */ "tryRun",
/* 95 string _addVaria */ "addVariableImport",
/* 96 string _default */ "default",
/* 97 less$visitors$import-sequencer.js */ [10,11,84,16,17,18,85,86,87,88,19,89,90,91,92,93,22,21,94,95,2,9,96,function(Object,exports,Array,_definePr,__esModu,_value,_imports,_variable,_onSeque,_current,_prototyp,_addImpor,_callback,_args,_isReady,_push,_slice,_call,_tryRun,_addVaria,_length,_apply,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var ImportSequencer = /** @class */ (function () { 
    function ImportSequencer(onSequencerEmpty) { 
        this[_imports] = [];
        this[_variable] = [];
        this[_onSeque] = onSequencerEmpty;
        this[_current] = 0;
    }
    ImportSequencer[_prototyp][_addImpor] = function (callback) { 
        var importSequencer = this, importItem = { 
            [_callback]: callback,
            [_args]: null,
            [_isReady]: false
        };
        this[_imports][_push](importItem);
        return function () { 
            importItem[_args] = Array[_prototyp][_slice][_call](arguments, 0);
            importItem[_isReady] = true;
            importSequencer[_tryRun]();
        };
    };
    ImportSequencer[_prototyp][_addVaria] = function (callback) { 
        this[_variable][_push](callback);
    };
    ImportSequencer[_prototyp][_tryRun] = function () { 
        this[_current]++;
        try { 
            while (true) { 
                while (this[_imports][_length] > 0) { 
                    var importItem = this[_imports][0];
                    if (!importItem[_isReady]) { 
                        return;
                    }
                    this[_imports] = this[_imports][_slice](1);
                    importItem[_callback][_apply](null, importItem[_args]);
                }
                if (this[_variable][_length] === 0) { 
                    break;
                }
                var variableImport = this[_variable][0];
                this[_variable] = this[_variable][_slice](1);
                variableImport();
            }
        }
        finally { 
            this[_current]--;
        }
        if (this[_current] === 0 && this[_onSeque]) { 
            this[_onSeque]();
        }
    };
    return ImportSequencer;
}());
exports[_default] = ImportSequencer;
//# sourceMappingURL=import-sequencer.js.map
return exports
}],
/* 98 string _line_ */ /* text */ "/* line ",
/* 99 string _debugInf */ "debugInfo",
/* 100 string _lineNumb */ "lineNumber",
/* 101 string _1 */ /* text */ ", ",
/* 102 string _fileName */ "fileName",
/* 103 string _2 */ /* text */ " */\n",
/* 104 regexp _a_z_i */ /^[a-z]+:\/\//i,
/* 105 string _test */ "test",
/* 106 string _file_ */ "file://",
/* 107 string _media_s */ /* text */ "@media -sass-debug-info{filename{font-family:",
/* 108 string _replace */ "replace",
/* 109 regexp _g */ /([.:\/\\])/g,
/* 110 string _3 */ "\\",
/* 111 string _4 */ "/",
/* 112 string _line_fo */ "}line{font-family:\\00003",
/* 113 string _5 */ /* text */ "}}\n",
/* 114 string _dumpLine */ "dumpLineNumbers",
/* 115 string _compress */ "compress",
/* 116 string _comments */ "comments",
/* 117 string _mediaque */ "mediaquery",
/* 118 string _all */ "all",
/* 119 less$tree$debug-info.js */ [10,11,16,17,18,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,96,function(Object,exports,_definePr,__esModu,_value,_line_,_debugInf,_lineNumb,_1,_fileName,_2,_a_z_i,_test,_file_,_media_s,_replace,_g,_3,_4,_line_fo,_5,_dumpLine,_compress,_comments,_mediaque,_all,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
function asComment(ctx) { 
    return _line_ + ctx[_debugInf][_lineNumb] + _1 + ctx[_debugInf][_fileName] + _2;
}
function asMediaQuery(ctx) { 
    var filenameWithProtocol = ctx[_debugInf][_fileName];
    if (!_a_z_i [_test](filenameWithProtocol)) { 
        filenameWithProtocol = _file_ + filenameWithProtocol;
    }
    return _media_s + filenameWithProtocol[_replace](_g, function (a) { 
        if (a == _3) { 
            a = _4;
        }
        return _3 + a;
    }) + _line_fo + ctx[_debugInf][_lineNumb] + _5;
}
function debugInfo(context, ctx, lineSeparator) { 
    var result = '';
    if (context[_dumpLine] && !context[_compress]) { 
        switch (context[_dumpLine]) { 
            case _comments :
                result = asComment(ctx);
                break;
            case _mediaque :
                result = asMediaQuery(ctx);
                break;
            case _all :
                result = asComment(ctx) + (lineSeparator || '') + asMediaQuery(ctx);
                break;
        }
    }
    return result;
}
exports[_default] = debugInfo;
//# sourceMappingURL=debug-info.js.map
return exports
}],
/* 120 parseFloat */ parseFloat,
/* 121 Promise */ typeof Promise!=="undefined"?Promise:void 0,
/* 122 is-what */ [1,function(require){
return require(83)
}],
/* 123 undefined */ undefined,
/* 124 string _visible */ "visible",
/* 125 string _run */ "run",
/* 126 string _visit */ "visit",
/* 127 string _visitArr */ "visitArray",
/* 128 string _blocksVi */ "blocksVisibility",
/* 129 string _ensureVi */ "ensureVisibility",
/* 130 string _ensureIn */ "ensureInvisibility",
/* 131 string _accept */ "accept",
/* 132 less$visitors$set-tree-visibility-visitor.js */ [10,11,84,16,17,18,124,19,125,126,127,2,26,128,129,130,131,96,function(Object,exports,Array,_definePr,__esModu,_value,_visible,_prototyp,_run,_visit,_visitArr,_length,_construc,_blocksVi,_ensureVi,_ensureIn,_accept,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var SetTreeVisibilityVisitor = /** @class */ (function () { 
    function SetTreeVisibilityVisitor(visible) { 
        this[_visible] = visible;
    }
    SetTreeVisibilityVisitor[_prototyp][_run] = function (root) { 
        this[_visit](root);
    };
    SetTreeVisibilityVisitor[_prototyp][_visitArr] = function (nodes) { 
        if (!nodes) { 
            return nodes;
        }
        var cnt = nodes[_length];
        var i;
        for (i = 0; i < cnt; i++) { 
            this[_visit](nodes[i]);
        }
        return nodes;
    };
    SetTreeVisibilityVisitor[_prototyp][_visit] = function (node) { 
        if (!node) { 
            return node;
        }
        if (node[_construc] === Array) { 
            return this[_visitArr](node);
        }
        if (!node[_blocksVi] || node[_blocksVi]()) { 
            return node;
        }
        if (this[_visible]) { 
            node[_ensureVi]();
        }
        else { 
            node[_ensureIn]();
        }
        node[_accept](this);
        return node;
    };
    return SetTreeVisibilityVisitor;
}());
exports[_default] = SetTreeVisibilityVisitor;
//# sourceMappingURL=set-tree-visibility-visitor.js.map
return exports
}],
/* 133 Error */ Error,
/* 134 RegExp */ RegExp,
/* 135 Number */ Number,
/* 136 string _parent */ "parent",
/* 137 string _visibili */ "visibilityBlocks",
/* 138 string _nodeVisi */ "nodeVisible",
/* 139 string _rootNode */ "rootNode",
/* 140 string _parsed */ "parsed",
/* 141 string _currentF */ "currentFileInfo",
/* 142 string _get */ "get",
/* 143 string _fileInfo */ "fileInfo",
/* 144 string _enumerab */ "enumerable",
/* 145 string _configur */ "configurable",
/* 146 string _index */ "index",
/* 147 string _getIndex */ "getIndex",
/* 148 string _setParen */ "setParent",
/* 149 string _forEach */ "forEach",
/* 150 string _index1 */ "_index",
/* 151 string _fileInf */ "_fileInfo",
/* 152 string _isRulese */ "isRulesetLike",
/* 153 string _toCSS */ "toCSS",
/* 154 string _genCSS */ "genCSS",
/* 155 string _add */ "add",
/* 156 string _isEmpty */ "isEmpty",
/* 157 string _join */ "join",
/* 158 string _eval */ "eval",
/* 159 string _operate */ "_operate",
/* 160 string _6 */ "+",
/* 161 string _7 */ "-",
/* 162 string _8 */ "*",
/* 163 string _fround */ "fround",
/* 164 string _numPreci */ "numPrecision",
/* 165 string _toFixed */ "toFixed",
/* 166 string _compare */ "compare",
/* 167 string _type */ "type",
/* 168 string _Quoted */ "Quoted",
/* 169 string _Anonymou */ "Anonymous",
/* 170 string _numericC */ "numericCompare",
/* 171 string _addVisib */ "addVisibilityBlock",
/* 172 string _removeVi */ "removeVisibilityBlock",
/* 173 string _isVisibl */ "isVisible",
/* 174 string _visibili1 */ "visibilityInfo",
/* 175 string _copyVisi */ "copyVisibilityInfo",
/* 176 less$tree$node.js */ [10,11,123,84,135,16,17,18,136,137,138,139,140,19,141,142,143,144,145,146,147,148,51,149,150,151,152,153,154,155,93,156,2,157,131,126,158,159,160,161,162,111,163,164,165,166,167,168,169,170,128,171,172,129,130,173,174,175,96,function(Object,exports,undefined,Array,Number,_definePr,__esModu,_value,_parent,_visibili,_nodeVisi,_rootNode,_parsed,_prototyp,_currentF,_get,_fileInfo,_enumerab,_configur,_index,_getIndex,_setParen,_isArray,_forEach,_index1,_fileInf,_isRulese,_toCSS,_genCSS,_add,_push,_isEmpty,_length,_join,_accept,_visit,_eval,_operate,_6,_7,_8,_4,_fround,_numPreci,_toFixed,_compare,_type,_Quoted,_Anonymou,_numericC,_blocksVi,_addVisib,_removeVi,_ensureVi,_ensureIn,_isVisibl,_visibili1,_copyVisi,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
/**
 * The reason why Node is a class and other nodes simply do not extend
 * from Node (since we're transpiling) is due to this issue:
 *
 * https://github.com/less/less.js/issues/3434
 */
var Node = /** @class */ (function () { 
    function Node() { 
        this[_parent] = null;
        this[_visibili] = undefined;
        this[_nodeVisi] = undefined;
        this[_rootNode] = null;
        this[_parsed] = null;
    }
    Object[_definePr](Node[_prototyp], _currentF, { 
        [_get]: function () { 
            return this[_fileInfo]();
        },
        [_enumerab]: false,
        [_configur]: true
    });
    Object[_definePr](Node[_prototyp], _index, { 
        [_get]: function () { 
            return this[_getIndex]();
        },
        [_enumerab]: false,
        [_configur]: true
    });
    Node[_prototyp][_setParen] = function (nodes, parent) { 
        function set(node) { 
            if (node && node instanceof Node) { 
                node[_parent] = parent;
            }
        }
        if (Array[_isArray](nodes)) { 
            nodes[_forEach](set);
        }
        else { 
            set(nodes);
        }
    };
    Node[_prototyp][_getIndex] = function () { 
        return this[_index1] || (this[_parent] && this[_parent][_getIndex]()) || 0;
    };
    Node[_prototyp][_fileInfo] = function () { 
        return this[_fileInf] || (this[_parent] && this[_parent][_fileInfo]()) || {};
    };
    Node[_prototyp][_isRulese] = function () { return false; };
    Node[_prototyp][_toCSS] = function (context) { 
        var strs = [];
        this[_genCSS](context, { 
            [_add]: function (chunk, fileInfo, index) { 
                strs[_push](chunk);
            },
            [_isEmpty]: function () { 
                return strs[_length] === 0;
            }
        });
        return strs[_join]('');
    };
    Node[_prototyp][_genCSS] = function (context, output) { 
        output[_add](this[_value]);
    };
    Node[_prototyp][_accept] = function (visitor) { 
        this[_value] = visitor[_visit](this[_value]);
    };
    Node[_prototyp][_eval] = function () { return this; };
    Node[_prototyp][_operate] = function (context, op, a, b) { 
        switch (op) { 
            case _6 : return a + b;
            case _7 : return a - b;
            case _8 : return a * b;
            case _4 : return a / b;
        }
    };
    Node[_prototyp][_fround] = function (context, value) { 
        var precision = context && context[_numPreci];
        // add "epsilon" to ensure numbers like 1.000000005 (represented as 1.000000004999...) are properly rounded:
        return (precision) ? Number((value + 2e-16) [_toFixed](precision)) : value;
    };
    Node[_compare] = function (a, b) { 
        /* returns:
         -1: a < b
         0: a = b
         1: a > b
         and *any* other value for a != b (e.g. undefined, NaN, -2 etc.) */
        if ((a[_compare]) &&
            // for "symmetric results" force toCSS-based comparison
            // of Quoted or Anonymous if either value is one of those
            !(b[_type] === _Quoted || b[_type] === _Anonymou)) { 
            return a[_compare](b);
        }
        else if (b[_compare]) { 
            return -b[_compare](a);
        }
        else if (a[_type] !== b[_type]) { 
            return undefined;
        }
        a = a[_value];
        b = b[_value];
        if (!Array[_isArray](a)) { 
            return a === b ? 0 : undefined;
        }
        if (a[_length] !== b[_length]) { 
            return undefined;
        }
        for (var i = 0; i < a[_length]; i++) { 
            if (Node[_compare](a[i], b[i]) !== 0) { 
                return undefined;
            }
        }
        return 0;
    };
    Node[_numericC] = function (a, b) { 
        return a < b ? -1
            : a === b ? 0
                : a > b ? 1 : undefined;
    };
    // Returns true if this node represents root of ast imported by reference
    Node[_prototyp][_blocksVi] = function () { 
        if (this[_visibili] == null) { 
            this[_visibili] = 0;
        }
        return this[_visibili] !== 0;
    };
    Node[_prototyp][_addVisib] = function () { 
        if (this[_visibili] == null) { 
            this[_visibili] = 0;
        }
        this[_visibili] = this[_visibili] + 1;
    };
    Node[_prototyp][_removeVi] = function () { 
        if (this[_visibili] == null) { 
            this[_visibili] = 0;
        }
        this[_visibili] = this[_visibili] - 1;
    };
    // Turns on node visibility - if called node will be shown in output regardless
    // of whether it comes from import by reference or not
    Node[_prototyp][_ensureVi] = function () { 
        this[_nodeVisi] = true;
    };
    // Turns off node visibility - if called node will NOT be shown in output regardless
    // of whether it comes from import by reference or not
    Node[_prototyp][_ensureIn] = function () { 
        this[_nodeVisi] = false;
    };
    // return values:
    // false - the node must not be visible
    // true - the node must be visible
    // undefined or null - the node has the same visibility as its parent
    Node[_prototyp][_isVisibl] = function () { 
        return this[_nodeVisi];
    };
    Node[_prototyp][_visibili1] = function () { 
        return { 
            [_visibili]: this[_visibili],
            [_nodeVisi]: this[_nodeVisi]
        };
    };
    Node[_prototyp][_copyVisi] = function (info) { 
        if (!info) { 
            return;
        }
        this[_visibili] = info[_visibili];
        this[_nodeVisi] = info[_nodeVisi];
    };
    return Node;
}());
exports[_default] = Node;
//# sourceMappingURL=node.js.map
return exports
}],
/* 177 Math */ Math,
/* 178 String */ String,
/* 179 parseInt */ parseInt,
/* 180 string _charCode */ "charCodeAt",
/* 181 string _missing_ */ /* text */ "missing opening `(`",
/* 182 string _missing_1 */ /* text */ "missing opening `{`",
/* 183 string _unescape */ /* text */ "unescaped `\\`",
/* 184 string _unmatche */ /* text */ "unmatched `",
/* 185 string _fromChar */ "fromCharCode",
/* 186 string _9 */ "`",
/* 187 string _missing_2 */ /* text */ "missing closing `*/`",
/* 188 string _unmatche1 */ /* text */ "unmatched `/*`",
/* 189 string _missing_3 */ /* text */ "missing closing `}` or `*/`",
/* 190 string _missing_4 */ /* text */ "missing closing `}`",
/* 191 string _missing_5 */ /* text */ "missing closing `)`",
/* 192 less$parser$chunker.js */ [10,11,178,16,17,18,2,93,22,180,181,182,183,184,185,186,187,188,189,190,191,96,function(Object,exports,String,_definePr,__esModu,_value,_length,_push,_slice,_charCode,_missing_,_missing_1,_unescape,_unmatche,_fromChar,_9,_missing_2,_unmatche1,_missing_3,_missing_4,_missing_5,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
// Split the input into chunks.
function default_1(input, fail) { 
    var len = input[_length];
    var level = 0;
    var parenLevel = 0;
    var lastOpening;
    var lastOpeningParen;
    var lastMultiComment;
    var lastMultiCommentEndBrace;
    var chunks = [];
    var emitFrom = 0;
    var chunkerCurrentIndex;
    var currentChunkStartIndex;
    var cc;
    var cc2;
    var matched;
    function emitChunk(force) { 
        var len = chunkerCurrentIndex - emitFrom;
        if (((len < 512) && !force) || !len) { 
            return;
        }
        chunks[_push](input[_slice](emitFrom, chunkerCurrentIndex + 1));
        emitFrom = chunkerCurrentIndex + 1;
    }
    for (chunkerCurrentIndex = 0; chunkerCurrentIndex < len; chunkerCurrentIndex++) { 
        cc = input[_charCode](chunkerCurrentIndex);
        if (((cc >= 97) && (cc <= 122)) || (cc < 34)) { 
            // a-z or whitespace
            continue;
        }
        switch (cc) { 
            case 40: // (
                parenLevel++;
                lastOpeningParen = chunkerCurrentIndex;
                continue;
            case 41: // )
                if (--parenLevel < 0) { 
                    return fail(_missing_, chunkerCurrentIndex);
                }
                continue;
            case 59: // ;
                if (!parenLevel) { 
                    emitChunk();
                }
                continue;
            case 123: // {
                level++;
                lastOpening = chunkerCurrentIndex;
                continue;
            case 125: // }
                if (--level < 0) { 
                    return fail(_missing_1, chunkerCurrentIndex);
                }
                if (!level && !parenLevel) { 
                    emitChunk();
                }
                continue;
            case 92: // \
                if (chunkerCurrentIndex < len - 1) { 
                    chunkerCurrentIndex++;
                    continue;
                }
                return fail(_unescape, chunkerCurrentIndex);
            case 34:
            case 39:
            case 96: // ", ' and `
                matched = 0;
                currentChunkStartIndex = chunkerCurrentIndex;
                for (chunkerCurrentIndex = chunkerCurrentIndex + 1; chunkerCurrentIndex < len; chunkerCurrentIndex++) { 
                    cc2 = input[_charCode](chunkerCurrentIndex);
                    if (cc2 > 96) { 
                        continue;
                    }
                    if (cc2 == cc) { 
                        matched = 1;
                        break;
                    }
                    if (cc2 == 92) { // \
                        if (chunkerCurrentIndex == len - 1) { 
                            return fail(_unescape, chunkerCurrentIndex);
                        }
                        chunkerCurrentIndex++;
                    }
                }
                if (matched) { 
                    continue;
                }
                return fail(_unmatche + String[_fromChar](cc) + _9, currentChunkStartIndex);
            case 47: // /, check for comment
                if (parenLevel || (chunkerCurrentIndex == len - 1)) { 
                    continue;
                }
                cc2 = input[_charCode](chunkerCurrentIndex + 1);
                if (cc2 == 47) { 
                    // //, find lnfeed
                    for (chunkerCurrentIndex = chunkerCurrentIndex + 2; chunkerCurrentIndex < len; chunkerCurrentIndex++) { 
                        cc2 = input[_charCode](chunkerCurrentIndex);
                        if ((cc2 <= 13) && ((cc2 == 10) || (cc2 == 13))) { 
                            break;
                        }
                    }
                }
                else if (cc2 == 42) { 
                    // /*, find */
                    lastMultiComment = currentChunkStartIndex = chunkerCurrentIndex;
                    for (chunkerCurrentIndex = chunkerCurrentIndex + 2; chunkerCurrentIndex < len - 1; chunkerCurrentIndex++) { 
                        cc2 = input[_charCode](chunkerCurrentIndex);
                        if (cc2 == 125) { 
                            lastMultiCommentEndBrace = chunkerCurrentIndex;
                        }
                        if (cc2 != 42) { 
                            continue;
                        }
                        if (input[_charCode](chunkerCurrentIndex + 1) == 47) { 
                            break;
                        }
                    }
                    if (chunkerCurrentIndex == len - 1) { 
                        return fail(_missing_2, currentChunkStartIndex);
                    }
                    chunkerCurrentIndex++;
                }
                continue;
            case 42: // *, check for unmatched */
                if ((chunkerCurrentIndex < len - 1) && (input[_charCode](chunkerCurrentIndex + 1) == 47)) { 
                    return fail(_unmatche1, chunkerCurrentIndex);
                }
                continue;
        }
    }
    if (level !== 0) { 
        if ((lastMultiComment > lastOpening) && (lastMultiCommentEndBrace > lastMultiComment)) { 
            return fail(_missing_3, lastOpening);
        }
        else { 
            return fail(_missing_4, lastOpening);
        }
    }
    else if (parenLevel !== 0) { 
        return fail(_missing_5, lastOpeningParen);
    }
    emitChunk(true);
    return chunks;
}
exports[_default] = default_1;
;
//# sourceMappingURL=chunker.js.map
return exports
}],
/* 193 encodeURIComponent */ encodeURIComponent,
/* 194 encodeURI */ encodeURI,
/* 195 string _m */ "m",
/* 196 string _cm */ "cm",
/* 197 string _mm */ "mm",
/* 198 string _in */ "in",
/* 199 string _px */ "px",
/* 200 string _pt */ "pt",
/* 201 string _pc */ "pc",
/* 202 string _duration */ "duration",
/* 203 string _s */ "s",
/* 204 string _ms */ "ms",
/* 205 string _angle */ "angle",
/* 206 string _rad */ "rad",
/* 207 string _PI */ "PI",
/* 208 string _deg */ "deg",
/* 209 string _grad */ "grad",
/* 210 string _turn */ "turn",
/* 211 less$data$unit-conversions.js */ [10,11,177,16,17,18,96,2,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,function(Object,exports,Math,_definePr,__esModu,_value,_default,_length,_m,_cm,_mm,_in,_px,_pt,_pc,_duration,_s,_ms,_angle,_rad,_PI,_deg,_grad,_turn){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
exports[_default] = { 
    [_length]: { 
        [_m]: 1,
        [_cm]: 0.01,
        [_mm]: 0.001,
        [_in]: 0.0254,
        [_px]: 0.0254 / 96,
        [_pt]: 0.0254 / 72,
        [_pc]: 0.0254 / 72 * 12
    },
    [_duration]: { 
        [_s]: 1,
        [_ms]: 0.001
    },
    [_angle]: { 
        [_rad]: 1 / (2 * Math[_PI]),
        [_deg]: 1 / 360,
        [_grad]: 1 / 400,
        [_turn]: 1
    }
};
//# sourceMappingURL=unit-conversions.js.map
return exports
}],
/* 212 string _aliceblu */ "aliceblue",
/* 213 string _f0f8ff */ "#f0f8ff",
/* 214 string _antiquew */ "antiquewhite",
/* 215 string _faebd7 */ "#faebd7",
/* 216 string _aqua */ "aqua",
/* 217 string _00ffff */ "#00ffff",
/* 218 string _aquamari */ "aquamarine",
/* 219 string _7fffd4 */ "#7fffd4",
/* 220 string _azure */ "azure",
/* 221 string _f0ffff */ "#f0ffff",
/* 222 string _beige */ "beige",
/* 223 string _f5f5dc */ "#f5f5dc",
/* 224 string _bisque */ "bisque",
/* 225 string _ffe4c4 */ "#ffe4c4",
/* 226 string _black */ "black",
/* 227 string _000000 */ "#000000",
/* 228 string _blanched */ "blanchedalmond",
/* 229 string _ffebcd */ "#ffebcd",
/* 230 string _blue */ "blue",
/* 231 string _0000ff */ "#0000ff",
/* 232 string _blueviol */ "blueviolet",
/* 233 string _8a2be2 */ "#8a2be2",
/* 234 string _brown */ "brown",
/* 235 string _a52a2a */ "#a52a2a",
/* 236 string _burlywoo */ "burlywood",
/* 237 string _deb887 */ "#deb887",
/* 238 string _cadetblu */ "cadetblue",
/* 239 string _5f9ea0 */ "#5f9ea0",
/* 240 string _chartreu */ "chartreuse",
/* 241 string _7fff00 */ "#7fff00",
/* 242 string _chocolat */ "chocolate",
/* 243 string _d2691e */ "#d2691e",
/* 244 string _coral */ "coral",
/* 245 string _ff7f50 */ "#ff7f50",
/* 246 string _cornflow */ "cornflowerblue",
/* 247 string _6495ed */ "#6495ed",
/* 248 string _cornsilk */ "cornsilk",
/* 249 string _fff8dc */ "#fff8dc",
/* 250 string _crimson */ "crimson",
/* 251 string _dc143c */ "#dc143c",
/* 252 string _cyan */ "cyan",
/* 253 string _darkblue */ "darkblue",
/* 254 string _00008b */ "#00008b",
/* 255 string _darkcyan */ "darkcyan",
/* 256 string _008b8b */ "#008b8b",
/* 257 string _darkgold */ "darkgoldenrod",
/* 258 string _b8860b */ "#b8860b",
/* 259 string _darkgray */ "darkgray",
/* 260 string _a9a9a9 */ "#a9a9a9",
/* 261 string _darkgrey */ "darkgrey",
/* 262 string _darkgree */ "darkgreen",
/* 263 string _006400 */ "#006400",
/* 264 string _darkkhak */ "darkkhaki",
/* 265 string _bdb76b */ "#bdb76b",
/* 266 string _darkmage */ "darkmagenta",
/* 267 string _8b008b */ "#8b008b",
/* 268 string _darkoliv */ "darkolivegreen",
/* 269 string _556b2f */ "#556b2f",
/* 270 string _darkoran */ "darkorange",
/* 271 string _ff8c00 */ "#ff8c00",
/* 272 string _darkorch */ "darkorchid",
/* 273 string _9932cc */ "#9932cc",
/* 274 string _darkred */ "darkred",
/* 275 string _8b0000 */ "#8b0000",
/* 276 string _darksalm */ "darksalmon",
/* 277 string _e9967a */ "#e9967a",
/* 278 string _darkseag */ "darkseagreen",
/* 279 string _8fbc8f */ "#8fbc8f",
/* 280 string _darkslat */ "darkslateblue",
/* 281 string _483d8b */ "#483d8b",
/* 282 string _darkslat1 */ "darkslategray",
/* 283 string _2f4f4f */ "#2f4f4f",
/* 284 string _darkslat2 */ "darkslategrey",
/* 285 string _darkturq */ "darkturquoise",
/* 286 string _00ced1 */ "#00ced1",
/* 287 string _darkviol */ "darkviolet",
/* 288 string _9400d3 */ "#9400d3",
/* 289 string _deeppink */ "deeppink",
/* 290 string _ff1493 */ "#ff1493",
/* 291 string _deepskyb */ "deepskyblue",
/* 292 string _00bfff */ "#00bfff",
/* 293 string _dimgray */ "dimgray",
/* 294 string _696969 */ "#696969",
/* 295 string _dimgrey */ "dimgrey",
/* 296 string _dodgerbl */ "dodgerblue",
/* 297 string _1e90ff */ "#1e90ff",
/* 298 string _firebric */ "firebrick",
/* 299 string _b22222 */ "#b22222",
/* 300 string _floralwh */ "floralwhite",
/* 301 string _fffaf0 */ "#fffaf0",
/* 302 string _forestgr */ "forestgreen",
/* 303 string _228b22 */ "#228b22",
/* 304 string _fuchsia */ "fuchsia",
/* 305 string _ff00ff */ "#ff00ff",
/* 306 string _gainsbor */ "gainsboro",
/* 307 string _dcdcdc */ "#dcdcdc",
/* 308 string _ghostwhi */ "ghostwhite",
/* 309 string _f8f8ff */ "#f8f8ff",
/* 310 string _gold */ "gold",
/* 311 string _ffd700 */ "#ffd700",
/* 312 string _goldenro */ "goldenrod",
/* 313 string _daa520 */ "#daa520",
/* 314 string _gray */ "gray",
/* 315 string _808080 */ "#808080",
/* 316 string _grey */ "grey",
/* 317 string _green */ "green",
/* 318 string _008000 */ "#008000",
/* 319 string _greenyel */ "greenyellow",
/* 320 string _adff2f */ "#adff2f",
/* 321 string _honeydew */ "honeydew",
/* 322 string _f0fff0 */ "#f0fff0",
/* 323 string _hotpink */ "hotpink",
/* 324 string _ff69b4 */ "#ff69b4",
/* 325 string _indianre */ "indianred",
/* 326 string _cd5c5c */ "#cd5c5c",
/* 327 string _indigo */ "indigo",
/* 328 string _4b0082 */ "#4b0082",
/* 329 string _ivory */ "ivory",
/* 330 string _fffff0 */ "#fffff0",
/* 331 string _khaki */ "khaki",
/* 332 string _f0e68c */ "#f0e68c",
/* 333 string _lavender */ "lavender",
/* 334 string _e6e6fa */ "#e6e6fa",
/* 335 string _lavender1 */ "lavenderblush",
/* 336 string _fff0f5 */ "#fff0f5",
/* 337 string _lawngree */ "lawngreen",
/* 338 string _7cfc00 */ "#7cfc00",
/* 339 string _lemonchi */ "lemonchiffon",
/* 340 string _fffacd */ "#fffacd",
/* 341 string _lightblu */ "lightblue",
/* 342 string _add8e6 */ "#add8e6",
/* 343 string _lightcor */ "lightcoral",
/* 344 string _f08080 */ "#f08080",
/* 345 string _lightcya */ "lightcyan",
/* 346 string _e0ffff */ "#e0ffff",
/* 347 string _lightgol */ "lightgoldenrodyellow",
/* 348 string _fafad2 */ "#fafad2",
/* 349 string _lightgra */ "lightgray",
/* 350 string _d3d3d3 */ "#d3d3d3",
/* 351 string _lightgre */ "lightgrey",
/* 352 string _lightgre1 */ "lightgreen",
/* 353 string _90ee90 */ "#90ee90",
/* 354 string _lightpin */ "lightpink",
/* 355 string _ffb6c1 */ "#ffb6c1",
/* 356 string _lightsal */ "lightsalmon",
/* 357 string _ffa07a */ "#ffa07a",
/* 358 string _lightsea */ "lightseagreen",
/* 359 string _20b2aa */ "#20b2aa",
/* 360 string _lightsky */ "lightskyblue",
/* 361 string _87cefa */ "#87cefa",
/* 362 string _lightsla */ "lightslategray",
/* 363 string _778899 */ "#778899",
/* 364 string _lightsla1 */ "lightslategrey",
/* 365 string _lightste */ "lightsteelblue",
/* 366 string _b0c4de */ "#b0c4de",
/* 367 string _lightyel */ "lightyellow",
/* 368 string _ffffe0 */ "#ffffe0",
/* 369 string _lime */ "lime",
/* 370 string _00ff00 */ "#00ff00",
/* 371 string _limegree */ "limegreen",
/* 372 string _32cd32 */ "#32cd32",
/* 373 string _linen */ "linen",
/* 374 string _faf0e6 */ "#faf0e6",
/* 375 string _magenta */ "magenta",
/* 376 string _maroon */ "maroon",
/* 377 string _800000 */ "#800000",
/* 378 string _mediumaq */ "mediumaquamarine",
/* 379 string _66cdaa */ "#66cdaa",
/* 380 string _mediumbl */ "mediumblue",
/* 381 string _0000cd */ "#0000cd",
/* 382 string _mediumor */ "mediumorchid",
/* 383 string _ba55d3 */ "#ba55d3",
/* 384 string _mediumpu */ "mediumpurple",
/* 385 string _9370d8 */ "#9370d8",
/* 386 string _mediumse */ "mediumseagreen",
/* 387 string _3cb371 */ "#3cb371",
/* 388 string _mediumsl */ "mediumslateblue",
/* 389 string _7b68ee */ "#7b68ee",
/* 390 string _mediumsp */ "mediumspringgreen",
/* 391 string _00fa9a */ "#00fa9a",
/* 392 string _mediumtu */ "mediumturquoise",
/* 393 string _48d1cc */ "#48d1cc",
/* 394 string _mediumvi */ "mediumvioletred",
/* 395 string _c71585 */ "#c71585",
/* 396 string _midnight */ "midnightblue",
/* 397 string _191970 */ "#191970",
/* 398 string _mintcrea */ "mintcream",
/* 399 string _f5fffa */ "#f5fffa",
/* 400 string _mistyros */ "mistyrose",
/* 401 string _ffe4e1 */ "#ffe4e1",
/* 402 string _moccasin */ "moccasin",
/* 403 string _ffe4b5 */ "#ffe4b5",
/* 404 string _navajowh */ "navajowhite",
/* 405 string _ffdead */ "#ffdead",
/* 406 string _navy */ "navy",
/* 407 string _000080 */ "#000080",
/* 408 string _oldlace */ "oldlace",
/* 409 string _fdf5e6 */ "#fdf5e6",
/* 410 string _olive */ "olive",
/* 411 string _808000 */ "#808000",
/* 412 string _olivedra */ "olivedrab",
/* 413 string _6b8e23 */ "#6b8e23",
/* 414 string _orange */ "orange",
/* 415 string _ffa500 */ "#ffa500",
/* 416 string _orangere */ "orangered",
/* 417 string _ff4500 */ "#ff4500",
/* 418 string _orchid */ "orchid",
/* 419 string _da70d6 */ "#da70d6",
/* 420 string _palegold */ "palegoldenrod",
/* 421 string _eee8aa */ "#eee8aa",
/* 422 string _palegree */ "palegreen",
/* 423 string _98fb98 */ "#98fb98",
/* 424 string _paleturq */ "paleturquoise",
/* 425 string _afeeee */ "#afeeee",
/* 426 string _paleviol */ "palevioletred",
/* 427 string _d87093 */ "#d87093",
/* 428 string _papayawh */ "papayawhip",
/* 429 string _ffefd5 */ "#ffefd5",
/* 430 string _peachpuf */ "peachpuff",
/* 431 string _ffdab9 */ "#ffdab9",
/* 432 string _peru */ "peru",
/* 433 string _cd853f */ "#cd853f",
/* 434 string _pink */ "pink",
/* 435 string _ffc0cb */ "#ffc0cb",
/* 436 string _plum */ "plum",
/* 437 string _dda0dd */ "#dda0dd",
/* 438 string _powderbl */ "powderblue",
/* 439 string _b0e0e6 */ "#b0e0e6",
/* 440 string _purple */ "purple",
/* 441 string _800080 */ "#800080",
/* 442 string _rebeccap */ "rebeccapurple",
/* 443 string _663399 */ "#663399",
/* 444 string _red */ "red",
/* 445 string _ff0000 */ "#ff0000",
/* 446 string _rosybrow */ "rosybrown",
/* 447 string _bc8f8f */ "#bc8f8f",
/* 448 string _royalblu */ "royalblue",
/* 449 string _4169e1 */ "#4169e1",
/* 450 string _saddlebr */ "saddlebrown",
/* 451 string _8b4513 */ "#8b4513",
/* 452 string _salmon */ "salmon",
/* 453 string _fa8072 */ "#fa8072",
/* 454 string _sandybro */ "sandybrown",
/* 455 string _f4a460 */ "#f4a460",
/* 456 string _seagreen */ "seagreen",
/* 457 string _2e8b57 */ "#2e8b57",
/* 458 string _seashell */ "seashell",
/* 459 string _fff5ee */ "#fff5ee",
/* 460 string _sienna */ "sienna",
/* 461 string _a0522d */ "#a0522d",
/* 462 string _silver */ "silver",
/* 463 string _c0c0c0 */ "#c0c0c0",
/* 464 string _skyblue */ "skyblue",
/* 465 string _87ceeb */ "#87ceeb",
/* 466 string _slateblu */ "slateblue",
/* 467 string _6a5acd */ "#6a5acd",
/* 468 string _slategra */ "slategray",
/* 469 string _708090 */ "#708090",
/* 470 string _slategre */ "slategrey",
/* 471 string _snow */ "snow",
/* 472 string _fffafa */ "#fffafa",
/* 473 string _springgr */ "springgreen",
/* 474 string _00ff7f */ "#00ff7f",
/* 475 string _steelblu */ "steelblue",
/* 476 string _4682b4 */ "#4682b4",
/* 477 string _tan */ "tan",
/* 478 string _d2b48c */ "#d2b48c",
/* 479 string _teal */ "teal",
/* 480 string _008080 */ "#008080",
/* 481 string _thistle */ "thistle",
/* 482 string _d8bfd8 */ "#d8bfd8",
/* 483 string _tomato */ "tomato",
/* 484 string _ff6347 */ "#ff6347",
/* 485 string _turquois */ "turquoise",
/* 486 string _40e0d0 */ "#40e0d0",
/* 487 string _violet */ "violet",
/* 488 string _ee82ee */ "#ee82ee",
/* 489 string _wheat */ "wheat",
/* 490 string _f5deb3 */ "#f5deb3",
/* 491 string _white */ "white",
/* 492 string _ffffff */ "#ffffff",
/* 493 string _whitesmo */ "whitesmoke",
/* 494 string _f5f5f5 */ "#f5f5f5",
/* 495 string _yellow */ "yellow",
/* 496 string _ffff00 */ "#ffff00",
/* 497 string _yellowgr */ "yellowgreen",
/* 498 string _9acd32 */ "#9acd32",
/* 499 less$data$colors.js */ [10,11,16,17,18,96,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,function(Object,exports,_definePr,__esModu,_value,_default,_aliceblu,_f0f8ff,_antiquew,_faebd7,_aqua,_00ffff,_aquamari,_7fffd4,_azure,_f0ffff,_beige,_f5f5dc,_bisque,_ffe4c4,_black,_000000,_blanched,_ffebcd,_blue,_0000ff,_blueviol,_8a2be2,_brown,_a52a2a,_burlywoo,_deb887,_cadetblu,_5f9ea0,_chartreu,_7fff00,_chocolat,_d2691e,_coral,_ff7f50,_cornflow,_6495ed,_cornsilk,_fff8dc,_crimson,_dc143c,_cyan,_darkblue,_00008b,_darkcyan,_008b8b,_darkgold,_b8860b,_darkgray,_a9a9a9,_darkgrey,_darkgree,_006400,_darkkhak,_bdb76b,_darkmage,_8b008b,_darkoliv,_556b2f,_darkoran,_ff8c00,_darkorch,_9932cc,_darkred,_8b0000,_darksalm,_e9967a,_darkseag,_8fbc8f,_darkslat,_483d8b,_darkslat1,_2f4f4f,_darkslat2,_darkturq,_00ced1,_darkviol,_9400d3,_deeppink,_ff1493,_deepskyb,_00bfff,_dimgray,_696969,_dimgrey,_dodgerbl,_1e90ff,_firebric,_b22222,_floralwh,_fffaf0,_forestgr,_228b22,_fuchsia,_ff00ff,_gainsbor,_dcdcdc,_ghostwhi,_f8f8ff,_gold,_ffd700,_goldenro,_daa520,_gray,_808080,_grey,_green,_008000,_greenyel,_adff2f,_honeydew,_f0fff0,_hotpink,_ff69b4,_indianre,_cd5c5c,_indigo,_4b0082,_ivory,_fffff0,_khaki,_f0e68c,_lavender,_e6e6fa,_lavender1,_fff0f5,_lawngree,_7cfc00,_lemonchi,_fffacd,_lightblu,_add8e6,_lightcor,_f08080,_lightcya,_e0ffff,_lightgol,_fafad2,_lightgra,_d3d3d3,_lightgre,_lightgre1,_90ee90,_lightpin,_ffb6c1,_lightsal,_ffa07a,_lightsea,_20b2aa,_lightsky,_87cefa,_lightsla,_778899,_lightsla1,_lightste,_b0c4de,_lightyel,_ffffe0,_lime,_00ff00,_limegree,_32cd32,_linen,_faf0e6,_magenta,_maroon,_800000,_mediumaq,_66cdaa,_mediumbl,_0000cd,_mediumor,_ba55d3,_mediumpu,_9370d8,_mediumse,_3cb371,_mediumsl,_7b68ee,_mediumsp,_00fa9a,_mediumtu,_48d1cc,_mediumvi,_c71585,_midnight,_191970,_mintcrea,_f5fffa,_mistyros,_ffe4e1,_moccasin,_ffe4b5,_navajowh,_ffdead,_navy,_000080,_oldlace,_fdf5e6,_olive,_808000,_olivedra,_6b8e23,_orange,_ffa500,_orangere,_ff4500,_orchid,_da70d6,_palegold,_eee8aa,_palegree,_98fb98,_paleturq,_afeeee,_paleviol,_d87093,_papayawh,_ffefd5,_peachpuf,_ffdab9,_peru,_cd853f,_pink,_ffc0cb,_plum,_dda0dd,_powderbl,_b0e0e6,_purple,_800080,_rebeccap,_663399,_red,_ff0000,_rosybrow,_bc8f8f,_royalblu,_4169e1,_saddlebr,_8b4513,_salmon,_fa8072,_sandybro,_f4a460,_seagreen,_2e8b57,_seashell,_fff5ee,_sienna,_a0522d,_silver,_c0c0c0,_skyblue,_87ceeb,_slateblu,_6a5acd,_slategra,_708090,_slategre,_snow,_fffafa,_springgr,_00ff7f,_steelblu,_4682b4,_tan,_d2b48c,_teal,_008080,_thistle,_d8bfd8,_tomato,_ff6347,_turquois,_40e0d0,_violet,_ee82ee,_wheat,_f5deb3,_white,_ffffff,_whitesmo,_f5f5f5,_yellow,_ffff00,_yellowgr,_9acd32){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
exports[_default] = { 
    [_aliceblu]: _f0f8ff,
    [_antiquew]: _faebd7,
    [_aqua]: _00ffff,
    [_aquamari]: _7fffd4,
    [_azure]: _f0ffff,
    [_beige]: _f5f5dc,
    [_bisque]: _ffe4c4,
    [_black]: _000000,
    [_blanched]: _ffebcd,
    [_blue]: _0000ff,
    [_blueviol]: _8a2be2,
    [_brown]: _a52a2a,
    [_burlywoo]: _deb887,
    [_cadetblu]: _5f9ea0,
    [_chartreu]: _7fff00,
    [_chocolat]: _d2691e,
    [_coral]: _ff7f50,
    [_cornflow]: _6495ed,
    [_cornsilk]: _fff8dc,
    [_crimson]: _dc143c,
    [_cyan]: _00ffff,
    [_darkblue]: _00008b,
    [_darkcyan]: _008b8b,
    [_darkgold]: _b8860b,
    [_darkgray]: _a9a9a9,
    [_darkgrey]: _a9a9a9,
    [_darkgree]: _006400,
    [_darkkhak]: _bdb76b,
    [_darkmage]: _8b008b,
    [_darkoliv]: _556b2f,
    [_darkoran]: _ff8c00,
    [_darkorch]: _9932cc,
    [_darkred]: _8b0000,
    [_darksalm]: _e9967a,
    [_darkseag]: _8fbc8f,
    [_darkslat]: _483d8b,
    [_darkslat1]: _2f4f4f,
    [_darkslat2]: _2f4f4f,
    [_darkturq]: _00ced1,
    [_darkviol]: _9400d3,
    [_deeppink]: _ff1493,
    [_deepskyb]: _00bfff,
    [_dimgray]: _696969,
    [_dimgrey]: _696969,
    [_dodgerbl]: _1e90ff,
    [_firebric]: _b22222,
    [_floralwh]: _fffaf0,
    [_forestgr]: _228b22,
    [_fuchsia]: _ff00ff,
    [_gainsbor]: _dcdcdc,
    [_ghostwhi]: _f8f8ff,
    [_gold]: _ffd700,
    [_goldenro]: _daa520,
    [_gray]: _808080,
    [_grey]: _808080,
    [_green]: _008000,
    [_greenyel]: _adff2f,
    [_honeydew]: _f0fff0,
    [_hotpink]: _ff69b4,
    [_indianre]: _cd5c5c,
    [_indigo]: _4b0082,
    [_ivory]: _fffff0,
    [_khaki]: _f0e68c,
    [_lavender]: _e6e6fa,
    [_lavender1]: _fff0f5,
    [_lawngree]: _7cfc00,
    [_lemonchi]: _fffacd,
    [_lightblu]: _add8e6,
    [_lightcor]: _f08080,
    [_lightcya]: _e0ffff,
    [_lightgol]: _fafad2,
    [_lightgra]: _d3d3d3,
    [_lightgre]: _d3d3d3,
    [_lightgre1]: _90ee90,
    [_lightpin]: _ffb6c1,
    [_lightsal]: _ffa07a,
    [_lightsea]: _20b2aa,
    [_lightsky]: _87cefa,
    [_lightsla]: _778899,
    [_lightsla1]: _778899,
    [_lightste]: _b0c4de,
    [_lightyel]: _ffffe0,
    [_lime]: _00ff00,
    [_limegree]: _32cd32,
    [_linen]: _faf0e6,
    [_magenta]: _ff00ff,
    [_maroon]: _800000,
    [_mediumaq]: _66cdaa,
    [_mediumbl]: _0000cd,
    [_mediumor]: _ba55d3,
    [_mediumpu]: _9370d8,
    [_mediumse]: _3cb371,
    [_mediumsl]: _7b68ee,
    [_mediumsp]: _00fa9a,
    [_mediumtu]: _48d1cc,
    [_mediumvi]: _c71585,
    [_midnight]: _191970,
    [_mintcrea]: _f5fffa,
    [_mistyros]: _ffe4e1,
    [_moccasin]: _ffe4b5,
    [_navajowh]: _ffdead,
    [_navy]: _000080,
    [_oldlace]: _fdf5e6,
    [_olive]: _808000,
    [_olivedra]: _6b8e23,
    [_orange]: _ffa500,
    [_orangere]: _ff4500,
    [_orchid]: _da70d6,
    [_palegold]: _eee8aa,
    [_palegree]: _98fb98,
    [_paleturq]: _afeeee,
    [_paleviol]: _d87093,
    [_papayawh]: _ffefd5,
    [_peachpuf]: _ffdab9,
    [_peru]: _cd853f,
    [_pink]: _ffc0cb,
    [_plum]: _dda0dd,
    [_powderbl]: _b0e0e6,
    [_purple]: _800080,
    [_rebeccap]: _663399,
    [_red]: _ff0000,
    [_rosybrow]: _bc8f8f,
    [_royalblu]: _4169e1,
    [_saddlebr]: _8b4513,
    [_salmon]: _fa8072,
    [_sandybro]: _f4a460,
    [_seagreen]: _2e8b57,
    [_seashell]: _fff5ee,
    [_sienna]: _a0522d,
    [_silver]: _c0c0c0,
    [_skyblue]: _87ceeb,
    [_slateblu]: _6a5acd,
    [_slategra]: _708090,
    [_slategre]: _708090,
    [_snow]: _fffafa,
    [_springgr]: _00ff7f,
    [_steelblu]: _4682b4,
    [_tan]: _d2b48c,
    [_teal]: _008080,
    [_thistle]: _d8bfd8,
    [_tomato]: _ff6347,
    [_turquois]: _40e0d0,
    [_violet]: _ee82ee,
    [_wheat]: _f5deb3,
    [_white]: _ffffff,
    [_whitesmo]: _f5f5f5,
    [_yellow]: _ffff00,
    [_yellowgr]: _9acd32
};
//# sourceMappingURL=colors.js.map
return exports
}],
/* 500 string _property */ "propertyIsEnumerable",
/* 501 string _nonenume */ "nonenumerable",
/* 502 string _writable */ "writable",
/* 503 string _map */ "map",
/* 504 string _getOwnPr */ "getOwnPropertyNames",
/* 505 string _getOwnPr1 */ "getOwnPropertySymbols",
/* 506 string _reduce */ "reduce",
/* 507 string _props */ "props",
/* 508 string _includes */ "includes",
/* 509 string _copy */ "copy",
/* 510 copy-anything$dist$index.cjs */ [10,11,1,16,17,18,500,21,144,501,502,145,51,503,72,504,505,506,507,508,509,function(Object,exports,require,_definePr,__esModu,_value,_property,_call,_enumerab,_nonenume,_writable,_configur,_isArray,_map,_isPlainO,_getOwnPr,_getOwnPr1,_reduce,_props,_includes,_copy){
 "use strict";

Object[_definePr](exports, __esModu, { [_value]: true });

var isWhat = require(122);

function assignProp(carry, key, newVal, originalObject, includeNonenumerable) { 
    const propType = {} [_property][_call](originalObject, key)
        ? _enumerab
        : _nonenume;
    if (propType === _enumerab)
        carry[key] = newVal;
    if (includeNonenumerable && propType === _nonenume) { 
        Object[_definePr](carry, key, { 
            [_value]: newVal,
            [_enumerab]: false,
            [_writable]: true,
            [_configur]: true,
        });
    }
}
/**
 * Copy (clone) an object and all its props recursively to get rid of any prop referenced of the original object. Arrays are also cloned, however objects inside arrays are still linked.
 *
 * @export
 * @template T
 * @param {T} target Target can be anything
 * @param {Options} [options = {}] Options can be `props` or `nonenumerable`
 * @returns {T} the target with replaced values
 * @export
 */
function copy(target, options = {}) { 
    if (isWhat[_isArray](target)) { 
        return target[_map]((item) => copy(item, options));
    }
    if (!isWhat[_isPlainO](target)) { 
        return target;
    }
    const props = Object[_getOwnPr](target);
    const symbols = Object[_getOwnPr1](target);
    return [...props,...symbols] [_reduce]((carry, key) => { 
        if (isWhat[_isArray](options[_props]) && !options[_props][_includes](key)) { 
            return carry;
        }
        const val = target[key];
        const newVal = copy(val, options);
        assignProp(carry, key, newVal, target, options[_nonenume]);
        return carry;
    }, {});
}

exports[_copy] = copy;

return exports
}],
/* 511 global */ typeof global!=="undefined"?global:void 0,
/* 512 self */ typeof self!=="undefined"?self:void 0,
/* 513 define */ typeof define!=="undefined"?define:void 0,
/* 514 module */ [1664656464],
/* 515 Reflect */ typeof Reflect!=="undefined"?Reflect:void 0,
/* 516 Symbol */ typeof Symbol!=="undefined"?Symbol:void 0,
/* 517 string _object */ "object",
/* 518 string _amd */ "amd",
/* 519 string _tslib */ "tslib",
/* 520 string _create */ "create",
/* 521 string _setProto */ "setPrototypeOf",
/* 522 string __proto_ */ "__proto__",
/* 523 string _Class_ex */ /* text */ "Class extends value ",
/* 524 string _is_not_ */ /* text */ " is not a constructor or null",
/* 525 string _assign */ "assign",
/* 526 string _getOwnPr2 */ "getOwnPropertyDescriptor",
/* 527 string _decorate */ "decorate",
/* 528 string _metadata */ "metadata",
/* 529 string _next */ "next",
/* 530 string _throw */ "throw",
/* 531 string _done */ "done",
/* 532 string _then */ "then",
/* 533 string _label */ "label",
/* 534 string _sent */ "sent",
/* 535 string _trys */ "trys",
/* 536 string _ops */ "ops",
/* 537 string _return */ "return",
/* 538 string _iterator */ "iterator",
/* 539 string _Generato */ /* text */ "Generator is already executing.",
/* 540 string _pop */ "pop",
/* 541 string _number */ "number",
/* 542 string _Object_i */ /* text */ "Object is not iterable.",
/* 543 string _Symbol_i */ /* text */ "Symbol.iterator is not defined.",
/* 544 string _error */ "error",
/* 545 string _v */ "v",
/* 546 string _asyncIte */ "asyncIterator",
/* 547 string _Symbol_a */ /* text */ "Symbol.asyncIterator is not defined.",
/* 548 string _resolve */ "resolve",
/* 549 string _shift */ "shift",
/* 550 string _raw */ "raw",
/* 551 string _a */ "a",
/* 552 string _Private_ */ /* text */ "Private accessor was defined without a getter",
/* 553 string _has */ "has",
/* 554 string _Cannot_r */ /* text */ "Cannot read private member from an object whose class did not declare it",
/* 555 string _Private_1 */ /* text */ "Private method is not writable",
/* 556 string _Private_2 */ /* text */ "Private accessor was defined without a setter",
/* 557 string _Cannot_w */ /* text */ "Cannot write private member to an object whose class did not declare it",
/* 558 string _set */ "set",
/* 559 string _Cannot_u */ /* text */ "Cannot use 'in' operator on non-object",
/* 560 string __extend */ "__extends",
/* 561 string __assign1 */ "__assign",
/* 562 string __rest1 */ "__rest",
/* 563 string __decora */ "__decorate",
/* 564 string __param1 */ "__param",
/* 565 string __metada */ "__metadata",
/* 566 string __awaite */ "__awaiter",
/* 567 string __genera */ "__generator",
/* 568 string __export */ "__exportStar",
/* 569 string __create */ "__createBinding",
/* 570 string __values1 */ "__values",
/* 571 string __read1 */ "__read",
/* 572 string __spread1 */ "__spread",
/* 573 string __spread2 */ "__spreadArrays",
/* 574 string __spread3 */ "__spreadArray",
/* 575 string __await1 */ "__await",
/* 576 string __asyncG */ "__asyncGenerator",
/* 577 string __asyncD */ "__asyncDelegator",
/* 578 string __asyncV */ "__asyncValues",
/* 579 string __makeTe */ "__makeTemplateObject",
/* 580 string __import */ "__importStar",
/* 581 string __import1 */ "__importDefault",
/* 582 string __classP */ "__classPrivateFieldGet",
/* 583 string __classP1 */ "__classPrivateFieldSet",
/* 584 string __classP2 */ "__classPrivateFieldIn",
/* 585 tslib$tslib.js */ [511,512,513,514,10,84,14,178,515,121,516,123,517,29,518,519,7,520,16,17,18,521,522,19,46,21,523,524,26,525,2,3,505,500,526,527,528,529,530,531,532,9,533,534,535,536,537,538,539,540,93,96,142,502,145,144,541,542,543,544,8,22,545,546,547,548,549,550,551,552,553,554,195,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,function(global,self,define,module,Object,Array,TypeError,String,Reflect,Promise,Symbol,undefined,_object,_function,_amd,_tslib,_exports,_create,_definePr,__esModu,_value,_setProto,__proto_,_prototyp,_hasOwnPr,_call,_Class_ex,_is_not_,_construc,_assign,_length,_indexOf,_getOwnPr1,_property,_getOwnPr2,_decorate,_metadata,_next,_throw,_done,_then,_apply,_label,_sent,_trys,_ops,_return,_iterator,_Generato,_pop,_push,_default,_get,_writable,_configur,_enumerab,_number,_Object_i,_Symbol_i,_error,_concat,_slice,_v,_asyncIte,_Symbol_a,_resolve,_shift,_raw,_a,_Private_,_has,_Cannot_r,_m,_Private_1,_Private_2,_Cannot_w,_set,_Cannot_u,__extend,__assign1,__rest1,__decora,__param1,__metada,__awaite,__genera,__export,__create,__values1,__read1,__spread1,__spread2,__spread3,__await1,__asyncG,__asyncD,__asyncV,__makeTe,__import,__import1,__classP,__classP1,__classP2){
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __spreadArray;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
var __classPrivateFieldIn;
var __createBinding;
(function (factory) { 
    var root = typeof global === _object ? global : typeof self === _object ? self : typeof this === _object ? this : {};
    if (typeof define === _function && define[_amd]) { 
        define(_tslib, [_exports], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === _object && typeof module[_exports] === _object) { 
        factory(createExporter(root, createExporter(module[_exports])));
    }
    else { 
        factory(createExporter(root));
    }
    function createExporter(exports, previous) { 
        if (exports !== root) { 
            if (typeof Object[_create] === _function) { 
                Object[_definePr](exports, __esModu, { [_value]: true });
            }
            else { 
                exports[__esModu] = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) { 
    var extendStatics = Object[_setProto] ||
        ({ [__proto_]: [] } instanceof Array && function (d, b) { d[__proto_] = b; }) ||
        function (d, b) { for (var p in b) if (Object[_prototyp][_hasOwnPr][_call](b, p)) d[p] = b[p]; };

    __extends = function (d, b) { 
        if (typeof b !== _function && b !== null)
            throw new TypeError(_Class_ex + String(b) + _is_not_);
        extendStatics(d, b);
        function __() { this[_construc] = d; }
        d[_prototyp] = b === null ? Object[_create](b) : (__[_prototyp] = b[_prototyp], new __());
    };

    __assign = Object[_assign] || function (t) { 
        for (var s, i = 1, n = arguments[_length]; i < n; i++) { 
            s = arguments[i];
            for (var p in s) if (Object[_prototyp][_hasOwnPr][_call](s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) { 
        var t = {};
        for (var p in s) if (Object[_prototyp][_hasOwnPr][_call](s, p) && e[_indexOf](p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object[_getOwnPr1] === _function)
            for (var i = 0, p = Object[_getOwnPr1](s); i < p[_length]; i++) { 
                if (e[_indexOf](p[i]) < 0 && Object[_prototyp][_property][_call](s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) { 
        var c = arguments[_length], r = c < 3 ? target : desc === null ? desc = Object[_getOwnPr2](target, key) : desc, d;
        if (typeof Reflect === _object && typeof Reflect[_decorate] === _function) r = Reflect[_decorate](decorators, target, key, desc);
        else for (var i = decorators[_length] - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object[_definePr](target, key, r), r;
    };

    __param = function (paramIndex, decorator) { 
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) { 
        if (typeof Reflect === _object && typeof Reflect[_metadata] === _function) return Reflect[_metadata](metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) { 
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) { 
            function fulfilled(value) { try { step(generator[_next](value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator[_throw](value)); } catch (e) { reject(e); } }
            function step(result) { result[_done] ? resolve(result[_value]) : adopt(result[_value]) [_then](fulfilled, rejected); }
            step((generator = generator[_apply](thisArg, _arguments || [])) [_next]());
        });
    };

    __generator = function (thisArg, body) { 
        var _ = { [_label]: 0, [_sent]: function () { if (t[0] & 1) throw t[1]; return t[1]; }, [_trys]: [], [_ops]: [] }, f, y, t, g;
        return g = { [_next]: verb(0), [_throw]: verb(1), [_return]: verb(2) }, typeof Symbol === _function && (g[Symbol[_iterator]] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) { 
            if (f) throw new TypeError(_Generato);
            while (_) try { 
                if (f = 1, y && (t = op[0] & 2 ? y[_return] : op[0] ? y[_throw] || ((t = y[_return]) && t[_call](y), 0) : y[_next]) && !(t = t[_call](y, op[1])) [_done]) return t;
                if (y = 0, t) op = [op[0] & 2, t[_value]];
                switch (op[0]) { 
                    case 0: case 1: t = op; break;
                    case 4: _[_label]++; return { [_value]: op[1], [_done]: false };
                    case 5: _[_label]++; y = op[1]; op = [0]; continue;
                    case 7: op = _[_ops][_pop](); _[_trys][_pop](); continue;
                    default:
                        if (!(t = _[_trys], t = t[_length] > 0 && t[t[_length] - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _[_label] = op[1]; break; }
                        if (op[0] === 6 && _[_label] < t[1]) { _[_label] = t[1]; t = op; break; }
                        if (t && _[_label] < t[2]) { _[_label] = t[2]; _[_ops][_push](op); break; }
                        if (t[2]) _[_ops][_pop]();
                        _[_trys][_pop](); continue;
                }
                op = body[_call](thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { [_value]: op[0] ? op[1] : void 0, [_done]: true };
        }
    };

    __exportStar = function (m, o) { 
        for (var p in m) if (p !== _default && !Object[_prototyp][_hasOwnPr][_call](o, p)) __createBinding(o, m, p);
    };

    __createBinding = Object[_create] ? (function (o, m, k, k2) { 
        if (k2 === undefined) k2 = k;
        var desc = Object[_getOwnPr2](m, k);
        if (!desc || (_get in desc ? !m[__esModu] : desc[_writable] || desc[_configur])) { 
            desc = { [_enumerab]: true, [_get]: function () { return m[k]; } };
        }
        Object[_definePr](o, k2, desc);
    }) : (function (o, m, k, k2) { 
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    __values = function (o) { 
        var s = typeof Symbol === _function && Symbol[_iterator], m = s && o[s], i = 0;
        if (m) return m[_call](o);
        if (o && typeof o[_length] === _number) return { 
            [_next]: function () { 
                if (o && i >= o[_length]) o = void 0;
                return { [_value]: o && o[i++], [_done]: !o };
            }
        };
        throw new TypeError(s ? _Object_i : _Symbol_i);
    };

    __read = function (o, n) { 
        var m = typeof Symbol === _function && o[Symbol[_iterator]];
        if (!m) return o;
        var i = m[_call](o), r, ar = [], e;
        try { 
            while ((n === void 0 || n-- > 0) && !(r = i[_next]()) [_done]) ar[_push](r[_value]);
        }
        catch (error) { e = { [_error]: error }; }
        finally { 
            try { 
                if (r && !r[_done] && (m = i[_return])) m[_call](i);
            }
            finally { if (e) throw e[_error]; }
        }
        return ar;
    };

    /** @deprecated */
    __spread = function () { 
        for (var ar = [], i = 0; i < arguments[_length]; i++)
            ar = ar[_concat](__read(arguments[i]));
        return ar;
    };

    /** @deprecated */
    __spreadArrays = function () { 
        for (var s = 0, i = 0, il = arguments[_length]; i < il; i++) s += arguments[i] [_length];
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a[_length]; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __spreadArray = function (to, from, pack) { 
        if (pack || arguments[_length] === 2) for (var i = 0, l = from[_length], ar; i < l; i++) { 
            if (ar || !(i in from)) { 
                if (!ar) ar = Array[_prototyp][_slice][_call](from, 0, i);
                ar[i] = from[i];
            }
        }
        return to[_concat](ar || Array[_prototyp][_slice][_call](from));
    };

    __await = function (v) { 
        return this instanceof __await ? (this[_v] = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) { 
        if (!Symbol[_asyncIte]) throw new TypeError(_Symbol_a);
        var g = generator[_apply](thisArg, _arguments || []), i, q = [];
        return i = {}, verb(_next), verb(_throw), verb(_return), i[Symbol[_asyncIte]] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q[_push]([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r[_value] instanceof __await ? Promise[_resolve](r[_value][_v]) [_then](fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume(_next, value); }
        function reject(value) { resume(_throw, value); }
        function settle(f, v) { if (f(v), q[_shift](), q[_length]) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) { 
        var i, p;
        return i = {}, verb(_next), verb(_throw, function (e) { throw e; }), verb(_return), i[Symbol[_iterator]] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { [_value]: __await(o[n](v)), [_done]: n === _return } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) { 
        if (!Symbol[_asyncIte]) throw new TypeError(_Symbol_a);
        var m = o[Symbol[_asyncIte]], i;
        return m ? m[_call](o) : (o = typeof __values === _function ? __values(o) : o[Symbol[_iterator]](), i = {}, verb(_next), verb(_throw), verb(_return), i[Symbol[_asyncIte]] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v[_done], v[_value]); }); }; }
        function settle(resolve, reject, d, v) { Promise[_resolve](v) [_then](function (v) { resolve({ [_value]: v, [_done]: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) { 
        if (Object[_definePr]) { Object[_definePr](cooked, _raw, { [_value]: raw }); } else { cooked[_raw] = raw; }
        return cooked;
    };

    var __setModuleDefault = Object[_create] ? (function (o, v) { 
        Object[_definePr](o, _default, { [_enumerab]: true, [_value]: v });
    }) : function (o, v) { 
        o[_default] = v;
    };

    __importStar = function (mod) { 
        if (mod && mod[__esModu]) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== _default && Object[_prototyp][_hasOwnPr][_call](mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };

    __importDefault = function (mod) { 
        return (mod && mod[__esModu]) ? mod : { [_default]: mod };
    };

    __classPrivateFieldGet = function (receiver, state, kind, f) { 
        if (kind === _a && !f) throw new TypeError(_Private_);
        if (typeof state === _function ? receiver !== state || !f : !state[_has](receiver)) throw new TypeError(_Cannot_r);
        return kind === _m ? f : kind === _a ? f[_call](receiver) : f ? f[_value] : state[_get](receiver);
    };

    __classPrivateFieldSet = function (receiver, state, value, kind, f) { 
        if (kind === _m) throw new TypeError(_Private_1);
        if (kind === _a && !f) throw new TypeError(_Private_2);
        if (typeof state === _function ? receiver !== state || !f : !state[_has](receiver)) throw new TypeError(_Cannot_w);
        return (kind === _a ? f[_call](receiver, value) : f ? f[_value] = value : state[_set](receiver, value)), value;
    };

    __classPrivateFieldIn = function (state, receiver) { 
        if (receiver === null || (typeof receiver !== _object && typeof receiver !== _function)) throw new TypeError(_Cannot_u);
        return typeof state === _function ? receiver === state : state[_has](receiver);
    };

    exporter(__extend, __extends);
    exporter(__assign1, __assign);
    exporter(__rest1, __rest);
    exporter(__decora, __decorate);
    exporter(__param1, __param);
    exporter(__metada, __metadata);
    exporter(__awaite, __awaiter);
    exporter(__genera, __generator);
    exporter(__export, __exportStar);
    exporter(__create, __createBinding);
    exporter(__values1, __values);
    exporter(__read1, __read);
    exporter(__spread1, __spread);
    exporter(__spread2, __spreadArrays);
    exporter(__spread3, __spreadArray);
    exporter(__await1, __await);
    exporter(__asyncG, __asyncGenerator);
    exporter(__asyncD, __asyncDelegator);
    exporter(__asyncV, __asyncValues);
    exporter(__makeTe, __makeTemplateObject);
    exporter(__import, __importStar);
    exporter(__import1, __importDefault);
    exporter(__classP, __classPrivateFieldGet);
    exporter(__classP1, __classPrivateFieldSet);
    exporter(__classP2, __classPrivateFieldIn);
});

return module[_exports]
}],
/* 586 string _match */ "match",
/* 587 regexp _v_d_1_2 */ /^v(\d{1,2})\.(\d{1,2})\.(\d{1,2})(?:-([0-9A-Za-z-.]+))?(?:\+([0-9A-Za-z-.]+))?$/,
/* 588 string _Unable_t */ /* text */ "Unable to parse: ",
/* 589 string _major */ "major",
/* 590 string _minor */ "minor",
/* 591 string _patch */ "patch",
/* 592 string _pre */ "pre",
/* 593 string _build */ "build",
/* 594 parse-node-version$index.js */ [133,179,514,586,587,588,589,590,591,592,593,7,function(Error,parseInt,module,_match,_v_d_1_2,_Unable_t,_major,_minor,_patch,_pre,_build,_exports){
 "use strict";

function parseNodeVersion(version) { 
  var match = version[_match](_v_d_1_2); // eslint-disable-line max-len
  if (!match) { 
    throw new Error(_Unable_t + version);
  }

  var res = { 
    [_major]: parseInt(match[1], 10),
    [_minor]: parseInt(match[2], 10),
    [_patch]: parseInt(match[3], 10),
    [_pre]: match[4] || '',
    [_build]: match[5] || '',
  };

  return res;
}

module[_exports] = parseNodeVersion;

return module[_exports]
}],
/* 595 string _data */ "_data",
/* 596 string _toLowerC */ "toLowerCase",
/* 597 string _addMulti */ "addMultiple",
/* 598 string _getLocal */ "getLocalFunctions",
/* 599 string _inherit */ "inherit",
/* 600 less$functions$function-registry.js */ [10,11,16,17,18,595,155,596,46,597,28,149,142,598,599,520,96,function(Object,exports,_definePr,__esModu,_value,_data,_add,_toLowerC,_hasOwnPr,_addMulti,_keys,_forEach,_get,_getLocal,_inherit,_create,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
function makeRegistry(base) { 
    return { 
        [_data]: {},
        [_add]: function (name, func) { 
            // precautionary case conversion, as later querying of
            // the registry by function-caller uses lower case as well.
            name = name[_toLowerC]();
            if (this[_data][_hasOwnPr](name)) { 
                // TODO warn
            }
            this[_data][name] = func;
        },
        [_addMulti]: function (functions) { 
            var _this = this;
            Object[_keys](functions) [_forEach](function (name) { 
                _this[_add](name, functions[name]);
            });
        },
        [_get]: function (name) { 
            return this[_data][name] || (base && base[_get](name));
        },
        [_getLocal]: function () { 
            return this[_data];
        },
        [_inherit]: function () { 
            return makeRegistry(this);
        },
        [_create]: function (base) { 
            return makeRegistry(base);
        }
    };
}
exports[_default] = makeRegistry(null);
//# sourceMappingURL=function-registry.js.map
return exports
}],
/* 601 string _RewriteU */ "RewriteUrls",
/* 602 string _Math */ "Math",
/* 603 string _ALWAYS */ "ALWAYS",
/* 604 string _PARENS_D */ "PARENS_DIVISION",
/* 605 string _PARENS */ "PARENS",
/* 606 string _OFF */ "OFF",
/* 607 string _LOCAL */ "LOCAL",
/* 608 string _ALL */ "ALL",
/* 609 less$constants.js */ [10,11,16,17,18,601,602,603,604,605,606,607,608,function(Object,exports,_definePr,__esModu,_value,_RewriteU,_Math,_ALWAYS,_PARENS_D,_PARENS,_OFF,_LOCAL,_ALL){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
exports[_RewriteU] = exports[_Math] = void 0;
exports[_Math] = { 
    [_ALWAYS]: 0,
    [_PARENS_D]: 1,
    [_PARENS]: 2
    // removed - STRICT_LEGACY: 3
};
exports[_RewriteU] = { 
    [_OFF]: 0,
    [_LOCAL]: 1,
    [_ALL]: 2
};
//# sourceMappingURL=constants.js.map
return exports
}],
/* 610 copy-anything */ [1,function(require){
return require(510)
}],
/* 611 tslib */ [1,function(require){
return require(585)
}],
/* 612 parse-node-version */ [1,function(require){
return require(594)
}],
/* 613 string _flattenA */ "flattenArray",
/* 614 string _merge */ "merge",
/* 615 string _copyOpti */ "copyOptions",
/* 616 string _defaults */ "defaults",
/* 617 string _clone */ "clone",
/* 618 string _copyArra */ "copyArray",
/* 619 string _getLocat */ "getLocation",
/* 620 string _charAt */ "charAt",
/* 621 string _10 */ /* text */ "\n",
/* 622 regexp _n_g */ /\n/g,
/* 623 string _line */ "line",
/* 624 string _column */ "column",
/* 625 string _default1 */ "_defaults",
/* 626 string _strictMa */ "strictMath",
/* 627 string _math */ "math",
/* 628 string _relative */ "relativeUrls",
/* 629 string _rewriteU */ "rewriteUrls",
/* 630 string _always */ "always",
/* 631 string _parens_d */ "parens-division",
/* 632 string _strict */ "strict",
/* 633 string _parens */ "parens",
/* 634 string _off */ "off",
/* 635 string _local */ "local",
/* 636 less$utils.js */ [10,11,1,84,123,16,17,18,613,614,615,616,617,618,619,580,620,621,541,22,586,622,2,623,624,46,625,509,525,626,627,602,605,628,629,601,608,4,596,630,603,631,604,632,633,634,606,635,607,118,51,93,function(Object,exports,require,Array,undefined,_definePr,__esModu,_value,_flattenA,_merge,_copyOpti,_defaults,_clone,_copyArra,_getLocat,__import,_charAt,_10,_number,_slice,_match,_n_g,_length,_line,_column,_hasOwnPr,_default1,_copy,_assign,_strictMa,_math,_Math,_PARENS,_relative,_rewriteU,_RewriteU,_ALL,_string,_toLowerC,_always,_ALWAYS,_parens_d,_PARENS_D,_strict,_parens,_off,_OFF,_local,_LOCAL,_all,_isArray,_push){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
exports[_flattenA] = exports[_merge] = exports[_copyOpti] = exports[_defaults] = exports[_clone] = exports[_copyArra] = exports[_getLocat] = void 0;
var tslib_1 = require(611);
/* jshint proto: true */
var Constants = tslib_1[__import](require(609));
var copy_anything_1 = require(610);
function getLocation(index, inputStream) { 
    var n = index + 1;
    var line = null;
    var column = -1;
    while (--n >= 0 && inputStream[_charAt](n) !== _10) { 
        column++;
    }
    if (typeof index === _number) { 
        line = (inputStream[_slice](0, index) [_match](_n_g) || '') [_length];
    }
    return { 
        [_line]: line,
        [_column]: column
    };
}
exports[_getLocat] = getLocation;
function copyArray(arr) { 
    var i;
    var length = arr[_length];
    var copy = new Array(length);
    for (i = 0; i < length; i++) { 
        copy[i] = arr[i];
    }
    return copy;
}
exports[_copyArra] = copyArray;
function clone(obj) { 
    var cloned = {};
    for (var prop in obj) { 
        if (obj[_hasOwnPr](prop)) { 
            cloned[prop] = obj[prop];
        }
    }
    return cloned;
}
exports[_clone] = clone;
function defaults(obj1, obj2) { 
    var newObj = obj2 || {};
    if (!obj2[_default1]) { 
        newObj = {};
        var defaults_1 = copy_anything_1[_copy](obj1);
        newObj[_default1] = defaults_1;
        var cloned = obj2 ? copy_anything_1[_copy](obj2) : {};
        Object[_assign](newObj, defaults_1, cloned);
    }
    return newObj;
}
exports[_defaults] = defaults;
function copyOptions(obj1, obj2) { 
    if (obj2 && obj2[_default1]) { 
        return obj2;
    }
    var opts = defaults(obj1, obj2);
    if (opts[_strictMa]) { 
        opts[_math] = Constants[_Math][_PARENS];
    }
    // Back compat with changed relativeUrls option
    if (opts[_relative]) { 
        opts[_rewriteU] = Constants[_RewriteU][_ALL];
    }
    if (typeof opts[_math] === _string) { 
        switch (opts[_math][_toLowerC]()) { 
            case _always :
                opts[_math] = Constants[_Math][_ALWAYS];
                break;
            case _parens_d :
                opts[_math] = Constants[_Math][_PARENS_D];
                break;
            case _strict :
            case _parens :
                opts[_math] = Constants[_Math][_PARENS];
                break;
            default:
                opts[_math] = Constants[_Math][_PARENS];
        }
    }
    if (typeof opts[_rewriteU] === _string) { 
        switch (opts[_rewriteU][_toLowerC]()) { 
            case _off :
                opts[_rewriteU] = Constants[_RewriteU][_OFF];
                break;
            case _local :
                opts[_rewriteU] = Constants[_RewriteU][_LOCAL];
                break;
            case _all :
                opts[_rewriteU] = Constants[_RewriteU][_ALL];
                break;
        }
    }
    return opts;
}
exports[_copyOpti] = copyOptions;
function merge(obj1, obj2) { 
    for (var prop in obj2) { 
        if (obj2[_hasOwnPr](prop)) { 
            obj1[prop] = obj2[prop];
        }
    }
    return obj1;
}
exports[_merge] = merge;
function flattenArray(arr, result) { 
    if (result === void 0) { result = []; }
    for (var i = 0, length_1 = arr[_length]; i < length_1; i++) { 
        var value = arr[i];
        if (Array[_isArray](value)) { 
            flattenArray(value, result);
        }
        else { 
            if (value !== undefined) { 
                result[_push](value);
            }
        }
    }
    return result;
}
exports[_flattenA] = flattenArray;
//# sourceMappingURL=utils.js.map
return exports
}],
/* 637 JSON */ typeof JSON!=="undefined"?JSON:void 0,
/* 638 string _css */ "_css",
/* 639 string _rootNod */ "_rootNode",
/* 640 string _content */ "_contentsMap",
/* 641 string _contents */ "contentsMap",
/* 642 string _content1 */ "_contentsIgnoredCharsMap",
/* 643 string _contents1 */ "contentsIgnoredCharsMap",
/* 644 string _sourceMa */ "sourceMapFilename",
/* 645 string _sourceM */ "_sourceMapFilename",
/* 646 regexp _g1 */ /\\/g,
/* 647 string _outputF */ "_outputFilename",
/* 648 string _outputFi */ "outputFilename",
/* 649 string _sourceMa1 */ "sourceMapURL",
/* 650 string _sourceMa2 */ "sourceMapBasepath",
/* 651 string _sourceM1 */ "_sourceMapBasepath",
/* 652 string _sourceMa3 */ "sourceMapRootpath",
/* 653 string _sourceM2 */ "_sourceMapRootpath",
/* 654 string _outputS */ "_outputSourceFiles",
/* 655 string _outputSo */ "outputSourceFiles",
/* 656 string _sourceM3 */ "_sourceMapGeneratorConstructor",
/* 657 string _getSourc */ "getSourceMapGenerator",
/* 658 string _lineNum */ "_lineNumber",
/* 659 string _column1 */ "_column",
/* 660 string _removeBa */ "removeBasepath",
/* 661 string _substrin */ "substring",
/* 662 string _normaliz */ "normalizeFilename",
/* 663 string _filename */ "filename",
/* 664 string _sourceM4 */ "_sourceMapGenerator",
/* 665 string _addMappi */ "addMapping",
/* 666 string _generate */ "generated",
/* 667 string _original */ "original",
/* 668 string _source */ "source",
/* 669 string _file */ "file",
/* 670 string _sourceRo */ "sourceRoot",
/* 671 string _setSourc */ "setSourceContent",
/* 672 string _stringif */ "stringify",
/* 673 string _toJSON */ "toJSON",
/* 674 string _sourceMa4 */ "sourceMap",
/* 675 less$source-map-output.js */ [10,11,123,637,16,17,18,638,639,139,640,641,642,643,644,645,108,646,111,647,648,649,650,651,652,653,620,2,654,655,656,657,658,659,19,660,3,661,110,662,155,663,22,93,6,621,664,665,666,623,624,667,668,156,153,669,670,46,671,154,672,673,674,157,96,function(Object,exports,undefined,JSON,_definePr,__esModu,_value,_css,_rootNod,_rootNode,_content,_contents,_content1,_contents1,_sourceMa,_sourceM,_replace,_g1,_4,_outputF,_outputFi,_sourceMa1,_sourceMa2,_sourceM1,_sourceMa3,_sourceM2,_charAt,_length,_outputS,_outputSo,_sourceM3,_getSourc,_lineNum,_column1,_prototyp,_removeBa,_indexOf,_substrin,_3,_normaliz,_add,_filename,_slice,_push,_split,_10,_sourceM4,_addMappi,_generate,_line,_column,_original,_source,_isEmpty,_toCSS,_file,_sourceRo,_hasOwnPr,_setSourc,_genCSS,_stringif,_toJSON,_sourceMa4,_join,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
function default_1(environment) { 
    var SourceMapOutput = /** @class */ (function () { 
        function SourceMapOutput(options) { 
            this[_css] = [];
            this[_rootNod] = options[_rootNode];
            this[_content] = options[_contents];
            this[_content1] = options[_contents1];
            if (options[_sourceMa]) { 
                this[_sourceM] = options[_sourceMa][_replace](_g1, _4);
            }
            this[_outputF] = options[_outputFi];
            this[_sourceMa1] = options[_sourceMa1];
            if (options[_sourceMa2]) { 
                this[_sourceM1] = options[_sourceMa2][_replace](_g1, _4);
            }
            if (options[_sourceMa3]) { 
                this[_sourceM2] = options[_sourceMa3][_replace](_g1, _4);
                if (this[_sourceM2][_charAt](this[_sourceM2][_length] - 1) !== _4) { 
                    this[_sourceM2] += _4;
                }
            }
            else { 
                this[_sourceM2] = '';
            }
            this[_outputS] = options[_outputSo];
            this[_sourceM3] = environment[_getSourc]();
            this[_lineNum] = 0;
            this[_column1] = 0;
        }
        SourceMapOutput[_prototyp][_removeBa] = function (path) { 
            if (this[_sourceM1] && path[_indexOf](this[_sourceM1]) === 0) { 
                path = path[_substrin](this[_sourceM1][_length]);
                if (path[_charAt](0) === _3 || path[_charAt](0) === _4) { 
                    path = path[_substrin](1);
                }
            }
            return path;
        };
        SourceMapOutput[_prototyp][_normaliz] = function (filename) { 
            filename = filename[_replace](_g1, _4);
            filename = this[_removeBa](filename);
            return (this[_sourceM2] || '') + filename;
        };
        SourceMapOutput[_prototyp][_add] = function (chunk, fileInfo, index, mapLines) { 
            // ignore adding empty strings
            if (!chunk) { 
                return;
            }
            var lines, sourceLines, columns, sourceColumns, i;
            if (fileInfo && fileInfo[_filename]) { 
                var inputSource = this[_content][fileInfo[_filename]];
                // remove vars/banner added to the top of the file
                if (this[_content1][fileInfo[_filename]]) { 
                    // adjust the index
                    index -= this[_content1][fileInfo[_filename]];
                    if (index < 0) { 
                        index = 0;
                    }
                    // adjust the source
                    inputSource = inputSource[_slice](this[_content1][fileInfo[_filename]]);
                }
                /**
                 * ignore empty content, or failsafe
                 * if contents map is incorrect
                 */
                if (inputSource === undefined) { 
                    this[_css][_push](chunk);
                    return;
                }
                inputSource = inputSource[_substrin](0, index);
                sourceLines = inputSource[_split](_10);
                sourceColumns = sourceLines[sourceLines[_length] - 1];
            }
            lines = chunk[_split](_10);
            columns = lines[lines[_length] - 1];
            if (fileInfo && fileInfo[_filename]) { 
                if (!mapLines) { 
                    this[_sourceM4][_addMappi]({ [_generate]: { [_line]: this[_lineNum] + 1, [_column]: this[_column1] },
                        [_original]: { [_line]: sourceLines[_length], [_column]: sourceColumns[_length] },
                        [_source]: this[_normaliz](fileInfo[_filename]) });
                }
                else { 
                    for (i = 0; i < lines[_length]; i++) { 
                        this[_sourceM4][_addMappi]({ [_generate]: { [_line]: this[_lineNum] + i + 1, [_column]: i === 0 ? this[_column1] : 0 },
                            [_original]: { [_line]: sourceLines[_length] + i, [_column]: i === 0 ? sourceColumns[_length] : 0 },
                            [_source]: this[_normaliz](fileInfo[_filename]) });
                    }
                }
            }
            if (lines[_length] === 1) { 
                this[_column1] += columns[_length];
            }
            else { 
                this[_lineNum] += lines[_length] - 1;
                this[_column1] = columns[_length];
            }
            this[_css][_push](chunk);
        };
        SourceMapOutput[_prototyp][_isEmpty] = function () { 
            return this[_css][_length] === 0;
        };
        SourceMapOutput[_prototyp][_toCSS] = function (context) { 
            this[_sourceM4] = new this[_sourceM3]({ [_file]: this[_outputF], [_sourceRo]: null });
            if (this[_outputS]) { 
                for (var filename in this[_content]) { 
                    if (this[_content][_hasOwnPr](filename)) { 
                        var source = this[_content][filename];
                        if (this[_content1][filename]) { 
                            source = source[_slice](this[_content1][filename]);
                        }
                        this[_sourceM4][_setSourc](this[_normaliz](filename), source);
                    }
                }
            }
            this[_rootNod][_genCSS](context, this);
            if (this[_css][_length] > 0) { 
                var sourceMapURL = void 0;
                var sourceMapContent = JSON[_stringif](this[_sourceM4][_toJSON]());
                if (this[_sourceMa1]) { 
                    sourceMapURL = this[_sourceMa1];
                }
                else if (this[_sourceM]) { 
                    sourceMapURL = this[_sourceM];
                }
                this[_sourceMa1] = sourceMapURL;
                this[_sourceMa4] = sourceMapContent;
            }
            return this[_css][_join]('');
        };
        return SourceMapOutput;
    }());
    return SourceMapOutput;
}
exports[_default] = default_1;
;
//# sourceMappingURL=source-map-output.js.map
return exports
}],
/* 676 string _options */ "options",
/* 677 string _contents2 */ "contentsIgnoredChars",
/* 678 string _contents3 */ "contents",
/* 679 string _sourceMa5 */ "sourceMapOutputFilename",
/* 680 string _sourceMa6 */ "sourceMapGenerator",
/* 681 string _sourceMa7 */ "sourceMapFileInline",
/* 682 string _disableS */ "disableSourcemapAnnotation",
/* 683 string _sourceMa8 */ "sourceMapInputFilename",
/* 684 string _getCSSAp */ "getCSSAppendage",
/* 685 string _data_app */ "data:application/json;base64,",
/* 686 string _encodeBa */ "encodeBase64",
/* 687 string _sourceM5 */ /* text */ "/*# sourceMappingURL=",
/* 688 string _11 */ /* text */ " */",
/* 689 string _getExter */ "getExternalSourceMap",
/* 690 string _setExter */ "setExternalSourceMap",
/* 691 string _isInline */ "isInline",
/* 692 string _getSourc1 */ "getSourceMapURL",
/* 693 string _getOutpu */ "getOutputFilename",
/* 694 string _getInput */ "getInputFilename",
/* 695 less$source-map-builder.js */ [10,11,123,16,17,18,676,19,153,643,677,139,641,678,644,649,648,679,650,652,655,680,681,682,674,683,662,660,684,685,686,687,688,689,690,691,692,693,694,96,function(Object,exports,undefined,_definePr,__esModu,_value,_options,_prototyp,_toCSS,_contents1,_contents2,_rootNode,_contents,_contents3,_sourceMa,_sourceMa1,_outputFi,_sourceMa5,_sourceMa2,_sourceMa3,_outputSo,_sourceMa6,_sourceMa7,_disableS,_sourceMa4,_sourceMa8,_normaliz,_removeBa,_getCSSAp,_data_app,_encodeBa,_sourceM5,_11,_getExter,_setExter,_isInline,_getSourc1,_getOutpu,_getInput,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
function default_1(SourceMapOutput, environment) { 
    var SourceMapBuilder = /** @class */ (function () { 
        function SourceMapBuilder(options) { 
            this[_options] = options;
        }
        SourceMapBuilder[_prototyp][_toCSS] = function (rootNode, options, imports) { 
            var sourceMapOutput = new SourceMapOutput({ 
                [_contents1]: imports[_contents2],
                [_rootNode]: rootNode,
                [_contents]: imports[_contents3],
                [_sourceMa]: this[_options][_sourceMa],
                [_sourceMa1]: this[_options][_sourceMa1],
                [_outputFi]: this[_options][_sourceMa5],
                [_sourceMa2]: this[_options][_sourceMa2],
                [_sourceMa3]: this[_options][_sourceMa3],
                [_outputSo]: this[_options][_outputSo],
                [_sourceMa6]: this[_options][_sourceMa6],
                [_sourceMa7]: this[_options][_sourceMa7],
                [_disableS]: this[_options][_disableS]
            });
            var css = sourceMapOutput[_toCSS](options);
            this[_sourceMa4] = sourceMapOutput[_sourceMa4];
            this[_sourceMa1] = sourceMapOutput[_sourceMa1];
            if (this[_options][_sourceMa8]) { 
                this[_sourceMa8] = sourceMapOutput[_normaliz](this[_options][_sourceMa8]);
            }
            if (this[_options][_sourceMa2] !== undefined && this[_sourceMa1] !== undefined) { 
                this[_sourceMa1] = sourceMapOutput[_removeBa](this[_sourceMa1]);
            }
            return css + this[_getCSSAp]();
        };
        SourceMapBuilder[_prototyp][_getCSSAp] = function () { 
            var sourceMapURL = this[_sourceMa1];
            if (this[_options][_sourceMa7]) { 
                if (this[_sourceMa4] === undefined) { 
                    return '';
                }
                sourceMapURL = _data_app + environment[_encodeBa](this[_sourceMa4]);
            }
            if (this[_options][_disableS]) { 
                return '';
            }
            if (sourceMapURL) { 
                return _sourceM5 + sourceMapURL + _11;
            }
            return '';
        };
        SourceMapBuilder[_prototyp][_getExter] = function () { 
            return this[_sourceMa4];
        };
        SourceMapBuilder[_prototyp][_setExter] = function (sourceMap) { 
            this[_sourceMa4] = sourceMap;
        };
        SourceMapBuilder[_prototyp][_isInline] = function () { 
            return this[_options][_sourceMa7];
        };
        SourceMapBuilder[_prototyp][_getSourc1] = function () { 
            return this[_sourceMa1];
        };
        SourceMapBuilder[_prototyp][_getOutpu] = function () { 
            return this[_options][_sourceMa5];
        };
        SourceMapBuilder[_prototyp][_getInput] = function () { 
            return this[_sourceMa8];
        };
        return SourceMapBuilder;
    }());
    return SourceMapBuilder;
}
exports[_default] = default_1;
;
//# sourceMappingURL=source-map-builder.js.map
return exports
}],
/* 696 string _parse */ "parse",
/* 697 less$render.js */ [10,11,1,121,16,17,18,580,29,615,676,21,696,153,96,function(Object,exports,require,Promise,_definePr,__esModu,_value,__import,_function,_copyOpti,_options,_call,_parse,_toCSS,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var utils = tslib_1[__import](require(636));
function default_1(environment, ParseTree, ImportManager) { 
    var render = function (input, options, callback) { 
        if (typeof options === _function) { 
            callback = options;
            options = utils[_copyOpti](this[_options], {});
        }
        else { 
            options = utils[_copyOpti](this[_options], options || {});
        }
        if (!callback) { 
            var self_1 = this;
            return new Promise(function (resolve, reject) { 
                render[_call](self_1, input, options, function (err, output) { 
                    if (err) { 
                        reject(err);
                    }
                    else { 
                        resolve(output);
                    }
                });
            });
        }
        else { 
            this[_parse](input, options, function (err, root, imports, options) { 
                if (err) { 
                    return callback(err);
                }
                var result;
                try { 
                    var parseTree = new ParseTree(root, imports);
                    result = parseTree[_toCSS](options);
                }
                catch (err) { 
                    return callback(err);
                }
                callback(null, result);
            });
        }
    };
    return render;
}
exports[_default] = default_1;
;
//# sourceMappingURL=render.js.map
return exports
}],
/* 698 string _less */ "less",
/* 699 string _visitors */ "visitors",
/* 700 string _preProce */ "preProcessors",
/* 701 string _postProc */ "postProcessors",
/* 702 string _installe */ "installedPlugins",
/* 703 string _fileMana */ "fileManagers",
/* 704 string _pluginCa */ "pluginCache",
/* 705 string _Loader */ "Loader",
/* 706 string _PluginLo */ "PluginLoader",
/* 707 string _addPlugi */ "addPlugins",
/* 708 string _addPlugi1 */ "addPlugin",
/* 709 string _install */ "install",
/* 710 string _function1 */ "functions",
/* 711 string _function2 */ "functionRegistry",
/* 712 string _addVisit */ "addVisitor",
/* 713 string _addPrePr */ "addPreProcessor",
/* 714 string _priority */ "priority",
/* 715 string _splice */ "splice",
/* 716 string _preProce1 */ "preProcessor",
/* 717 string _addPostP */ "addPostProcessor",
/* 718 string _postProc1 */ "postProcessor",
/* 719 string _addFileM */ "addFileManager",
/* 720 string _getPrePr */ "getPreProcessors",
/* 721 string _getPostP */ "getPostProcessors",
/* 722 string _getVisit */ "getVisitors",
/* 723 string _visitor */ "visitor",
/* 724 string _first */ "first",
/* 725 string _getFileM */ "getFileManagers",
/* 726 less$plugin-manager.js */ [10,11,16,17,18,698,699,700,701,702,703,538,704,705,706,19,707,2,708,93,709,710,711,142,712,713,714,715,716,717,718,719,720,721,722,723,724,725,96,function(Object,exports,_definePr,__esModu,_value,_less,_visitors,_preProce,_postProc,_installe,_fileMana,_iterator,_pluginCa,_Loader,_PluginLo,_prototyp,_addPlugi,_length,_addPlugi1,_push,_install,_function1,_function2,_get,_addVisit,_addPrePr,_priority,_splice,_preProce1,_addPostP,_postProc1,_addFileM,_getPrePr,_getPostP,_getVisit,_visitor,_first,_getFileM,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
/**
 * Plugin Manager
 */
var PluginManager = /** @class */ (function () { 
    function PluginManager(less) { 
        this[_less] = less;
        this[_visitors] = [];
        this[_preProce] = [];
        this[_postProc] = [];
        this[_installe] = [];
        this[_fileMana] = [];
        this[_iterator] = -1;
        this[_pluginCa] = {};
        this[_Loader] = new less[_PluginLo](less);
    }
    /**
     * Adds all the plugins in the array
     * @param {Array} plugins
     */
    PluginManager[_prototyp][_addPlugi] = function (plugins) { 
        if (plugins) { 
            for (var i = 0; i < plugins[_length]; i++) { 
                this[_addPlugi1](plugins[i]);
            }
        }
    };
    /**
     *
     * @param plugin
     * @param {String} filename
     */
    PluginManager[_prototyp][_addPlugi1] = function (plugin, filename, functionRegistry) { 
        this[_installe][_push](plugin);
        if (filename) { 
            this[_pluginCa][filename] = plugin;
        }
        if (plugin[_install]) { 
            plugin[_install](this[_less], this, functionRegistry || this[_less][_function1][_function2]);
        }
    };
    /**
     *
     * @param filename
     */
    PluginManager[_prototyp][_get] = function (filename) { 
        return this[_pluginCa][filename];
    };
    /**
     * Adds a visitor. The visitor object has options on itself to determine
     * when it should run.
     * @param visitor
     */
    PluginManager[_prototyp][_addVisit] = function (visitor) { 
        this[_visitors][_push](visitor);
    };
    /**
     * Adds a pre processor object
     * @param {object} preProcessor
     * @param {number} priority - guidelines 1 = before import, 1000 = import, 2000 = after import
     */
    PluginManager[_prototyp][_addPrePr] = function (preProcessor, priority) { 
        var indexToInsertAt;
        for (indexToInsertAt = 0; indexToInsertAt < this[_preProce][_length]; indexToInsertAt++) { 
            if (this[_preProce][indexToInsertAt] [_priority] >= priority) { 
                break;
            }
        }
        this[_preProce][_splice](indexToInsertAt, 0, { [_preProce1]: preProcessor, [_priority]: priority });
    };
    /**
     * Adds a post processor object
     * @param {object} postProcessor
     * @param {number} priority - guidelines 1 = before compression, 1000 = compression, 2000 = after compression
     */
    PluginManager[_prototyp][_addPostP] = function (postProcessor, priority) { 
        var indexToInsertAt;
        for (indexToInsertAt = 0; indexToInsertAt < this[_postProc][_length]; indexToInsertAt++) { 
            if (this[_postProc][indexToInsertAt] [_priority] >= priority) { 
                break;
            }
        }
        this[_postProc][_splice](indexToInsertAt, 0, { [_postProc1]: postProcessor, [_priority]: priority });
    };
    /**
     *
     * @param manager
     */
    PluginManager[_prototyp][_addFileM] = function (manager) { 
        this[_fileMana][_push](manager);
    };
    /**
     *
     * @returns {Array}
     * @private
     */
    PluginManager[_prototyp][_getPrePr] = function () { 
        var preProcessors = [];
        for (var i = 0; i < this[_preProce][_length]; i++) { 
            preProcessors[_push](this[_preProce][i] [_preProce1]);
        }
        return preProcessors;
    };
    /**
     *
     * @returns {Array}
     * @private
     */
    PluginManager[_prototyp][_getPostP] = function () { 
        var postProcessors = [];
        for (var i = 0; i < this[_postProc][_length]; i++) { 
            postProcessors[_push](this[_postProc][i] [_postProc1]);
        }
        return postProcessors;
    };
    /**
     *
     * @returns {Array}
     * @private
     */
    PluginManager[_prototyp][_getVisit] = function () { 
        return this[_visitors];
    };
    PluginManager[_prototyp][_visitor] = function () { 
        var self = this;
        return { 
            [_first]: function () { 
                self[_iterator] = -1;
                return self[_visitors][self[_iterator]];
            },
            [_get]: function () { 
                self[_iterator] += 1;
                return self[_visitors][self[_iterator]];
            }
        };
    };
    /**
     *
     * @returns {Array}
     * @private
     */
    PluginManager[_prototyp][_getFileM] = function () { 
        return this[_fileMana];
    };
    return PluginManager;
}());
var pm;
var PluginManagerFactory = function (less, newFactory) { 
    if (newFactory || !pm) { 
        pm = new PluginManager(less);
    }
    return pm;
};
//
exports[_default] = PluginManagerFactory;
//# sourceMappingURL=plugin-manager.js.map
return exports
}],
/* 727 string _version */ "version",
/* 728 string _4_1_3 */ "4.1.3",
/* 729 string _descript */ "description",
/* 730 string _Leaner_C */ /* text */ "Leaner CSS",
/* 731 string _homepage */ "homepage",
/* 732 string _http_les */ "http://lesscss.org",
/* 733 string _author */ "author",
/* 734 string _Alexis_S */ /* text */ "Alexis Sellier",
/* 735 string _email */ "email",
/* 736 string _self_clo */ "self@cloudhead.net",
/* 737 string _contribu */ "contributors",
/* 738 string _The_Core */ /* text */ "The Core Less Team",
/* 739 string _bugs */ "bugs",
/* 740 string _url */ "url",
/* 741 string _https_gi */ "https://github.com/less/less.js/issues",
/* 742 string _reposito */ "repository",
/* 743 string _git */ "git",
/* 744 string _https_gi1 */ "https://github.com/less/less.js.git",
/* 745 string _master */ "master",
/* 746 string _https_gi2 */ "https://github.com/less/less.js/blob/master/",
/* 747 string _https_ra */ "https://raw.githubusercontent.com/less/less.js/master/",
/* 748 string _license */ "license",
/* 749 string _Apache_2 */ "Apache-2.0",
/* 750 string _bin */ "bin",
/* 751 string _lessc */ "lessc",
/* 752 string _bin_les */ "./bin/lessc",
/* 753 string _main */ "main",
/* 754 string _module */ "module",
/* 755 string _lib_les */ "./lib/less-node/index",
/* 756 string _director */ "directories",
/* 757 string _test1 */ "./test",
/* 758 string _browser */ "browser",
/* 759 string _dist_le */ "./dist/less.js",
/* 760 string _engines */ "engines",
/* 761 string _node */ "node",
/* 762 string _12 */ ">=6",
/* 763 string _scripts */ "scripts",
/* 764 string _grunt_te */ /* text */ "grunt test",
/* 765 string _grunt */ "grunt",
/* 766 string _npm_run_ */ /* text */ "npm-run-all clean compile",
/* 767 string _clean */ "clean",
/* 768 string _shx_rm_r */ /* text */ "shx rm -rf ./lib tsconfig.tsbuildinfo",
/* 769 string _compile */ "compile",
/* 770 string _tsc_p_ts */ /* text */ "tsc -p tsconfig.json",
/* 771 string _copy_roo */ "copy:root",
/* 772 string _shx_cp_r */ /* text */ "shx cp -rf ./dist ../../",
/* 773 string _dev */ "dev",
/* 774 string _tsc_p_ts1 */ /* text */ "tsc -p tsconfig.json -w",
/* 775 string _prepubli */ "prepublishOnly",
/* 776 string _grunt_di */ /* text */ "grunt dist",
/* 777 string _optional */ "optionalDependencies",
/* 778 string _errno */ "errno",
/* 779 string _0_1_1 */ "^0.1.1",
/* 780 string _graceful */ "graceful-fs",
/* 781 string _4_1_2 */ "^4.1.2",
/* 782 string _image_si */ "image-size",
/* 783 string _0_5_0 */ "~0.5.0",
/* 784 string _make_dir */ "make-dir",
/* 785 string _2_1_0 */ "^2.1.0",
/* 786 string _mime */ "mime",
/* 787 string _1_4_1 */ "^1.4.1",
/* 788 string _needle */ "needle",
/* 789 string _3_1_0 */ "^3.1.0",
/* 790 string _source_m */ "source-map",
/* 791 string _0_6_0 */ "~0.6.0",
/* 792 string _devDepen */ "devDependencies",
/* 793 string _less_te */ "@less/test-data",
/* 794 string _4_1_0 */ "^4.1.0",
/* 795 string _less_te1 */ "@less/test-import-module",
/* 796 string _4_0_0 */ "^4.0.0",
/* 797 string _rollup_ */ "@rollup/plugin-commonjs",
/* 798 string _17_0_0 */ "^17.0.0",
/* 799 string _rollup_1 */ "@rollup/plugin-json",
/* 800 string _rollup_2 */ "@rollup/plugin-node-resolve",
/* 801 string _11_0_0 */ "^11.0.0",
/* 802 string _typescr */ "@typescript-eslint/eslint-plugin",
/* 803 string _4_28_0 */ "^4.28.0",
/* 804 string _typescr1 */ "@typescript-eslint/parser",
/* 805 string _benny */ "benny",
/* 806 string _3_6_12 */ "^3.6.12",
/* 807 string _bootstra */ "bootstrap-less-port",
/* 808 string _0_3_0 */ "0.3.0",
/* 809 string _chai */ "chai",
/* 810 string _4_2_0 */ "^4.2.0",
/* 811 string _cross_en */ "cross-env",
/* 812 string _7_0_3 */ "^7.0.3",
/* 813 string _diff */ "diff",
/* 814 string _3_2_0 */ "^3.2.0",
/* 815 string _eslint */ "eslint",
/* 816 string _7_29_0 */ "^7.29.0",
/* 817 string _fs_extra */ "fs-extra",
/* 818 string _8_1_0 */ "^8.1.0",
/* 819 string _git_rev */ "git-rev",
/* 820 string _0_2_1 */ "^0.2.1",
/* 821 string _globby */ "globby",
/* 822 string _10_0_1 */ "^10.0.1",
/* 823 string _1_0_4 */ "^1.0.4",
/* 824 string _grunt_cl */ "grunt-cli",
/* 825 string _1_3_2 */ "^1.3.2",
/* 826 string _grunt_co */ "grunt-contrib-clean",
/* 827 string _1_0_0 */ "^1.0.0",
/* 828 string _grunt_co1 */ "grunt-contrib-connect",
/* 829 string _1_0_2 */ "^1.0.2",
/* 830 string _grunt_es */ "grunt-eslint",
/* 831 string _23_0_0 */ "^23.0.0",
/* 832 string _grunt_sa */ "grunt-saucelabs",
/* 833 string _9_0_1 */ "^9.0.1",
/* 834 string _grunt_sh */ "grunt-shell",
/* 835 string _1_3_0 */ "^1.3.0",
/* 836 string _html_tem */ "html-template-tag",
/* 837 string _jit_grun */ "jit-grunt",
/* 838 string _0_10_0 */ "^0.10.0",
/* 839 string _less_plu */ "less-plugin-autoprefix",
/* 840 string _1_5_1 */ "^1.5.1",
/* 841 string _less_plu1 */ "less-plugin-clean-css",
/* 842 string _minimist */ "minimist",
/* 843 string _1_2_0 */ "^1.2.0",
/* 844 string _mocha */ "mocha",
/* 845 string _6_2_1 */ "^6.2.1",
/* 846 string _mocha_he */ "mocha-headless-chrome",
/* 847 string _2_0_3 */ "^2.0.3",
/* 848 string _mocha_te */ "mocha-teamcity-reporter",
/* 849 string _3_0_0 */ "^3.0.0",
/* 850 string _nock */ "nock",
/* 851 string _11_8_2 */ "^11.8.2",
/* 852 string _npm_run_1 */ "npm-run-all",
/* 853 string _4_1_5 */ "^4.1.5",
/* 854 string _performa */ "performance-now",
/* 855 string _0_2_0 */ "^0.2.0",
/* 856 string _phin */ "phin",
/* 857 string _2_2_3 */ "^2.2.3",
/* 858 string _promise */ "promise",
/* 859 string _7_1_1 */ "^7.1.1",
/* 860 string _read_glo */ "read-glob",
/* 861 string _1_17_0 */ "^1.17.0",
/* 862 string _rollup */ "rollup",
/* 863 string _2_52_2 */ "^2.52.2",
/* 864 string _rollup_p */ "rollup-plugin-terser",
/* 865 string _5_1_1 */ "^5.1.1",
/* 866 string _rollup_p1 */ "rollup-plugin-typescript2",
/* 867 string _0_29_0 */ "^0.29.0",
/* 868 string _semver */ "semver",
/* 869 string _6_3_0 */ "^6.3.0",
/* 870 string _shx */ "shx",
/* 871 string _0_3_2 */ "^0.3.2",
/* 872 string _time_gru */ "time-grunt",
/* 873 string _ts_node */ "ts-node",
/* 874 string _9_1_1 */ "^9.1.1",
/* 875 string _typescri */ "typescript",
/* 876 string _4_3_4 */ "^4.3.4",
/* 877 string _uikit */ "uikit",
/* 878 string _2_27_4 */ "2.27.4",
/* 879 string _keywords */ "keywords",
/* 880 string _compile_ */ /* text */ "compile less",
/* 881 string _css_nest */ /* text */ "css nesting",
/* 882 string _css_vari */ /* text */ "css variable",
/* 883 string _css1 */ "css",
/* 884 string _gradient */ /* text */ "gradients css",
/* 885 string _gradient1 */ /* text */ "gradients css3",
/* 886 string _less_com */ /* text */ "less compiler",
/* 887 string _less_css */ /* text */ "less css",
/* 888 string _less_mix */ /* text */ "less mixins",
/* 889 string _less_js */ "less.js",
/* 890 string _lesscss */ "lesscss",
/* 891 string _mixins */ "mixins",
/* 892 string _nested_c */ /* text */ "nested css",
/* 893 string _parser */ "parser",
/* 894 string _preproce */ "preprocessor",
/* 895 string _bootstra1 */ /* text */ "bootstrap css",
/* 896 string _bootstra2 */ /* text */ "bootstrap less",
/* 897 string _style */ "style",
/* 898 string _styles */ "styles",
/* 899 string _styleshe */ "stylesheet",
/* 900 string _variable1 */ /* text */ "variables in css",
/* 901 string _css_less */ /* text */ "css less",
/* 902 string _rawcurre */ "rawcurrent",
/* 903 string _https_ra1 */ "https://raw.github.com/less/less.js/v",
/* 904 string _sourcear */ "sourcearchive",
/* 905 string _https_gi3 */ "https://github.com/less/less.js/archive/v",
/* 906 string _dependen */ "dependencies",
/* 907 string _copy_any */ "copy-anything",
/* 908 string _2_0_1 */ "^2.0.1",
/* 909 string _parse_no */ "parse-node-version",
/* 910 string _1_0_1 */ "^1.0.1",
/* 911 string _2_3_0 */ "^2.3.0",
/* 912 less$package.json */ [48,698,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,167,743,744,745,746,550,747,748,749,750,751,752,753,146,754,755,756,105,757,758,759,760,761,762,763,764,765,593,766,767,768,769,770,771,772,773,774,775,776,777,778,779,780,781,782,783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804,805,806,807,808,809,810,811,812,813,814,815,816,817,818,819,820,821,822,823,824,825,826,827,828,829,830,831,832,833,834,835,836,837,838,839,840,841,842,843,844,845,846,847,848,849,850,851,852,853,854,855,856,857,858,859,860,548,861,862,863,864,865,866,867,868,869,870,871,872,873,874,875,876,877,878,879,880,881,882,883,884,885,886,887,888,889,890,891,892,893,894,895,896,897,898,899,900,901,902,903,904,905,906,907,908,909,910,519,911,function(_name,_less,_version,_4_1_3,_descript,_Leaner_C,_homepage,_http_les,_author,_Alexis_S,_email,_self_clo,_contribu,_The_Core,_bugs,_url,_https_gi,_reposito,_type,_git,_https_gi1,_master,_https_gi2,_raw,_https_ra,_license,_Apache_2,_bin,_lessc,_bin_les,_main,_index,_module,_lib_les,_director,_test,_test1,_browser,_dist_le,_engines,_node,_12,_scripts,_grunt_te,_grunt,_build,_npm_run_,_clean,_shx_rm_r,_compile,_tsc_p_ts,_copy_roo,_shx_cp_r,_dev,_tsc_p_ts1,_prepubli,_grunt_di,_optional,_errno,_0_1_1,_graceful,_4_1_2,_image_si,_0_5_0,_make_dir,_2_1_0,_mime,_1_4_1,_needle,_3_1_0,_source_m,_0_6_0,_devDepen,_less_te,_4_1_0,_less_te1,_4_0_0,_rollup_,_17_0_0,_rollup_1,_rollup_2,_11_0_0,_typescr,_4_28_0,_typescr1,_benny,_3_6_12,_bootstra,_0_3_0,_chai,_4_2_0,_cross_en,_7_0_3,_diff,_3_2_0,_eslint,_7_29_0,_fs_extra,_8_1_0,_git_rev,_0_2_1,_globby,_10_0_1,_1_0_4,_grunt_cl,_1_3_2,_grunt_co,_1_0_0,_grunt_co1,_1_0_2,_grunt_es,_23_0_0,_grunt_sa,_9_0_1,_grunt_sh,_1_3_0,_html_tem,_jit_grun,_0_10_0,_less_plu,_1_5_1,_less_plu1,_minimist,_1_2_0,_mocha,_6_2_1,_mocha_he,_2_0_3,_mocha_te,_3_0_0,_nock,_11_8_2,_npm_run_1,_4_1_5,_performa,_0_2_0,_phin,_2_2_3,_promise,_7_1_1,_read_glo,_resolve,_1_17_0,_rollup,_2_52_2,_rollup_p,_5_1_1,_rollup_p1,_0_29_0,_semver,_6_3_0,_shx,_0_3_2,_time_gru,_ts_node,_9_1_1,_typescri,_4_3_4,_uikit,_2_27_4,_keywords,_compile_,_css_nest,_css_vari,_css1,_gradient,_gradient1,_less_com,_less_css,_less_mix,_less_js,_lesscss,_mixins,_nested_c,_parser,_preproce,_bootstra1,_bootstra2,_style,_styles,_styleshe,_variable1,_css_less,_rawcurre,_https_ra1,_sourcear,_https_gi3,_dependen,_copy_any,_2_0_1,_parse_no,_1_0_1,_tslib,_2_3_0){
return ({ 
	[_name]: _less,
	[_version]: _4_1_3,
	[_descript]: _Leaner_C,
	[_homepage]: _http_les,
	[_author]: { 
		[_name]: _Alexis_S,
		[_email]: _self_clo
	},
	[_contribu]: [
		_The_Core
	],
	[_bugs]: { 
		[_url]: _https_gi
	},
	[_reposito]: { 
		[_type]: _git,
		[_url]: _https_gi1
	},
	[_master]: { 
		[_url]: _https_gi2,
		[_raw]: _https_ra
	},
	[_license]: _Apache_2,
	[_bin]: { 
		[_lessc]: _bin_les
	},
	[_main]: _index,
	[_module]: _lib_les,
	[_director]: { 
		[_test]: _test1
	},
	[_browser]: _dist_le,
	[_engines]: { 
		[_node]: _12
	},
	[_scripts]: { 
		[_test]: _grunt_te,
		[_grunt]: _grunt,
		[_build]: _npm_run_,
		[_clean]: _shx_rm_r,
		[_compile]: _tsc_p_ts,
		[_copy_roo]: _shx_cp_r,
		[_dev]: _tsc_p_ts1,
		[_prepubli]: _grunt_di
	},
	[_optional]: { 
		[_errno]: _0_1_1,
		[_graceful]: _4_1_2,
		[_image_si]: _0_5_0,
		[_make_dir]: _2_1_0,
		[_mime]: _1_4_1,
		[_needle]: _3_1_0,
		[_source_m]: _0_6_0
	},
	[_devDepen]: { 
		[_less_te]: _4_1_0,
		[_less_te1]: _4_0_0,
		[_rollup_]: _17_0_0,
		[_rollup_1]: _4_1_0,
		[_rollup_2]: _11_0_0,
		[_typescr]: _4_28_0,
		[_typescr1]: _4_28_0,
		[_benny]: _3_6_12,
		[_bootstra]: _0_3_0,
		[_chai]: _4_2_0,
		[_cross_en]: _7_0_3,
		[_diff]: _3_2_0,
		[_eslint]: _7_29_0,
		[_fs_extra]: _8_1_0,
		[_git_rev]: _0_2_1,
		[_globby]: _10_0_1,
		[_grunt]: _1_0_4,
		[_grunt_cl]: _1_3_2,
		[_grunt_co]: _1_0_0,
		[_grunt_co1]: _1_0_2,
		[_grunt_es]: _23_0_0,
		[_grunt_sa]: _9_0_1,
		[_grunt_sh]: _1_3_0,
		[_html_tem]: _3_2_0,
		[_jit_grun]: _0_10_0,
		[_less_plu]: _1_5_1,
		[_less_plu1]: _1_5_1,
		[_minimist]: _1_2_0,
		[_mocha]: _6_2_1,
		[_mocha_he]: _2_0_3,
		[_mocha_te]: _3_0_0,
		[_nock]: _11_8_2,
		[_npm_run_1]: _4_1_5,
		[_performa]: _0_2_0,
		[_phin]: _2_2_3,
		[_promise]: _7_1_1,
		[_read_glo]: _3_0_0,
		[_resolve]: _1_17_0,
		[_rollup]: _2_52_2,
		[_rollup_p]: _5_1_1,
		[_rollup_p1]: _0_29_0,
		[_semver]: _6_3_0,
		[_shx]: _0_3_2,
		[_time_gru]: _1_3_0,
		[_ts_node]: _9_1_1,
		[_typescri]: _4_3_4,
		[_uikit]: _2_27_4
	},
	[_keywords]: [
		_compile_,
		_css_nest,
		_css_vari,
		_css1,
		_gradient,
		_gradient1,
		_less_com,
		_less_css,
		_less_mix,
		_less,
		_less_js,
		_lesscss,
		_mixins,
		_nested_c,
		_parser,
		_preproce,
		_bootstra1,
		_bootstra2,
		_style,
		_styles,
		_styleshe,
		_variable1,
		_css_less
	],
	[_rawcurre]: _https_ra1,
	[_sourcear]: _https_gi3,
	[_dependen]: { 
		[_copy_any]: _2_0_1,
		[_parse_no]: _1_0_1,
		[_tslib]: _2_3_0
	}
}
)
}],
/* 913 string _fireEve */ "_fireEvent",
/* 914 string _warn */ "warn",
/* 915 string _info */ "info",
/* 916 string _debug */ "debug",
/* 917 string _addListe */ "addListener",
/* 918 string _listene */ "_listeners",
/* 919 string _removeLi */ "removeListener",
/* 920 less$logger.js */ [10,11,16,17,18,96,544,913,914,915,916,917,918,93,919,2,715,function(Object,exports,_definePr,__esModu,_value,_default,_error,_fireEve,_warn,_info,_debug,_addListe,_listene,_push,_removeLi,_length,_splice){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
exports[_default] = { 
    [_error]: function (msg) { 
        this[_fireEve](_error, msg);
    },
    [_warn]: function (msg) { 
        this[_fireEve](_warn, msg);
    },
    [_info]: function (msg) { 
        this[_fireEve](_info, msg);
    },
    [_debug]: function (msg) { 
        this[_fireEve](_debug, msg);
    },
    [_addListe]: function (listener) { 
        this[_listene][_push](listener);
    },
    [_removeLi]: function (listener) { 
        for (var i = 0; i < this[_listene][_length]; i++) { 
            if (this[_listene][i] === listener) { 
                this[_listene][_splice](i, 1);
                return;
            }
        }
    },
    [_fireEve]: function (type, msg) { 
        for (var i = 0; i < this[_listene][_length]; i++) { 
            var logFunction = this[_listene][i][type];
            if (logFunction) { 
                logFunction(msg);
            }
        }
    },
    [_listene]: []
};
//# sourceMappingURL=logger.js.map
return exports
}],
/* 921 regexp _anonymo */ /(<anonymous>|Function):(\d+):(\d+)/,
/* 922 string _message */ "message",
/* 923 string _stack */ "stack",
/* 924 string _Syntax */ "Syntax",
/* 925 string _throw_ne */ /* text */ "throw new Error()",
/* 926 string _callLine */ "callLine",
/* 927 string _callExtr */ "callExtract",
/* 928 string _extract */ "extract",
/* 929 string _undefine */ "undefined",
/* 930 string _stylize */ "stylize",
/* 931 string _options_ */ /* text */ "options.stylize should be a function, got a ",
/* 932 string _13 */ "!",
/* 933 string _14 */ /* text */ " ",
/* 934 string _substr */ "substr",
/* 935 string _bold */ "bold",
/* 936 string _inverse */ "inverse",
/* 937 string _reset */ "reset",
/* 938 string _Error_ */ /* text */ "Error: ",
/* 939 string _in_ */ /* text */ " in ",
/* 940 string _on_line */ /* text */ " on line ",
/* 941 string _column_ */ /* text */ ", column ",
/* 942 string _15 */ ":",
/* 943 string _from_ */ /* text */ "from ",
/* 944 string _n */ "/n",
/* 945 less$less-error.js */ [10,11,1,133,13,179,16,17,18,580,921,21,663,922,923,678,619,146,623,624,6,621,167,924,541,586,551,925,926,927,928,520,929,19,26,20,930,29,931,932,4,93,933,316,22,934,935,444,936,157,937,938,939,940,941,942,943,944,96,function(Object,exports,require,Error,Function,parseInt,_definePr,__esModu,_value,__import,_anonymo,_call,_filename,_message,_stack,_contents3,_getLocat,_index,_line,_column,_split,_10,_type,_Syntax,_number,_match,_a,_throw_ne,_callLine,_callExtr,_extract,_create,_undefine,_prototyp,_construc,_toString,_stylize,_function,_options_,_13,_string,_push,_14,_grey,_slice,_substr,_bold,_red,_inverse,_join,_reset,_Error_,_in_,_on_line,_column_,_15,_from_,_n,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var utils = tslib_1[__import](require(636));
var anonymousFunc = _anonymo;
/**
 * This is a centralized class of any error that could be thrown internally (mostly by the parser).
 * Besides standard .message it keeps some additional data like a path to the file where the error
 * occurred along with line and column numbers.
 *
 * @class
 * @extends Error
 * @type {module.LessError}
 *
 * @prop {string} type
 * @prop {string} filename
 * @prop {number} index
 * @prop {number} line
 * @prop {number} column
 * @prop {number} callLine
 * @prop {number} callExtract
 * @prop {string[]} extract
 *
 * @param {Object} e              - An error object to wrap around or just a descriptive object
 * @param {Object} fileContentMap - An object with file contents in 'contents' property (like importManager) @todo - move to fileManager?
 * @param {string} [currentFilename]
 */
var LessError = function (e, fileContentMap, currentFilename) { 
    Error[_call](this);
    var filename = e[_filename] || currentFilename;
    this[_message] = e[_message];
    this[_stack] = e[_stack];
    if (fileContentMap && filename) { 
        var input = fileContentMap[_contents3][filename];
        var loc = utils[_getLocat](e[_index], input);
        var line = loc[_line];
        var col = loc[_column];
        var callLine = e[_call] && utils[_getLocat](e[_call], input) [_line];
        var lines = input ? input[_split](_10) : '';
        this[_type] = e[_type] || _Syntax;
        this[_filename] = filename;
        this[_index] = e[_index];
        this[_line] = typeof line === _number ? line + 1 : null;
        this[_column] = col;
        if (!this[_line] && this[_stack]) { 
            var found = this[_stack][_match](anonymousFunc);
            /**
             * We have to figure out how this environment stringifies anonymous functions
             * so we can correctly map plugin errors.
             *
             * Note, in Node 8, the output of anonymous funcs varied based on parameters
             * being present or not, so we inject dummy params.
             */
            var func = new Function(_a, _throw_ne);
            var lineAdjust = 0;
            try { 
                func();
            }
            catch (e) { 
                var match = e[_stack][_match](anonymousFunc);
                var line = parseInt(match[2]);
                lineAdjust = 1 - line;
            }
            if (found) { 
                if (found[2]) { 
                    this[_line] = parseInt(found[2]) + lineAdjust;
                }
                if (found[3]) { 
                    this[_column] = parseInt(found[3]);
                }
            }
        }
        this[_callLine] = callLine + 1;
        this[_callExtr] = lines[callLine];
        this[_extract] = [
            lines[this[_line] - 2],
            lines[this[_line] - 1],
            lines[this[_line]]
        ];
    }
};
if (typeof Object[_create] === _undefine) { 
    var F = function () {};
    F[_prototyp] = Error[_prototyp];
    LessError[_prototyp] = new F();
}
else { 
    LessError[_prototyp] = Object[_create](Error[_prototyp]);
}
LessError[_prototyp][_construc] = LessError;
/**
 * An overridden version of the default Object.prototype.toString
 * which uses additional information to create a helpful message.
 *
 * @param {Object} options
 * @returns {string}
 */
LessError[_prototyp][_toString] = function (options) { 
    options = options || {};
    var message = '';
    var extract = this[_extract] || [];
    var error = [];
    var stylize = function (str) { return str; };
    if (options[_stylize]) { 
        var type = typeof options[_stylize];
        if (type !== _function) { 
            throw Error(_options_ + type + _13);
        }
        stylize = options[_stylize];
    }
    if (this[_line] !== null) { 
        if (typeof extract[0] === _string) { 
            error[_push](stylize(this[_line] - 1 + _14 + extract[0], _grey));
        }
        if (typeof extract[1] === _string) { 
            var errorTxt = this[_line] + _14;
            if (extract[1]) { 
                errorTxt += extract[1] [_slice](0, this[_column]) +
                    stylize(stylize(stylize(extract[1] [_substr](this[_column], 1), _bold) +
                        extract[1] [_slice](this[_column] + 1), _red), _inverse);
            }
            error[_push](errorTxt);
        }
        if (typeof extract[2] === _string) { 
            error[_push](stylize(this[_line] + 1 + _14 + extract[2], _grey));
        }
        error = error[_join](_10) + stylize('', _reset) + _10;
    }
    message += stylize(this[_type] + _Error_ + this[_message], _red);
    if (this[_filename]) { 
        message += stylize(_in_, _red) + this[_filename];
    }
    if (this[_line]) { 
        message += stylize(_on_line + this[_line] + _column_ + (this[_column] + 1) + _15, _grey);
    }
    message += _10 + error;
    if (this[_callLine]) { 
        message += stylize(_from_, _red) + (this[_filename] || '') + _n;
        message += stylize(this[_callLine], _grey) + _14 + this[_callExtr] + _n;
    }
    return message;
};
exports[_default] = LessError;
//# sourceMappingURL=less-error.js.map
return exports
}],
/* 946 string _mimeLook */ "mimeLookup",
/* 947 string _charsetL */ "charsetLookup",
/* 948 string _bind */ "bind",
/* 949 string _missing_6 */ /* text */ "missing required function in environment - ",
/* 950 string _getFileM1 */ "getFileManager",
/* 951 string _getFileM2 */ /* text */ "getFileManager called with no filename.. Please report this issue. continuing.",
/* 952 string _getFileM3 */ /* text */ "getFileManager called with null directory.. Please report this issue. continuing.",
/* 953 string _pluginMa */ "pluginManager",
/* 954 string _supports */ "supportsSync",
/* 955 string _supports1 */ "supports",
/* 956 string _clearFil */ "clearFileManagers",
/* 957 less$environment$environment.js */ [10,11,1,16,17,18,581,703,686,946,947,657,8,2,948,914,949,19,950,96,951,952,953,725,954,955,719,93,956,function(Object,exports,require,_definePr,__esModu,_value,__import1,_fileMana,_encodeBa,_mimeLook,_charsetL,_getSourc,_concat,_length,_bind,_warn,_missing_6,_prototyp,_getFileM1,_default,_getFileM2,_getFileM3,_pluginMa,_getFileM,_supports,_supports1,_addFileM,_push,_clearFil){
 "use strict";
/**
 * @todo Document why this abstraction exists, and the relationship between
 *       environment, file managers, and plugin manager
 */
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var logger_1 = tslib_1[__import1](require(920));
var Environment = /** @class */ (function () { 
    function Environment(externalEnvironment, fileManagers) { 
        this[_fileMana] = fileManagers || [];
        externalEnvironment = externalEnvironment || {};
        var optionalFunctions = [_encodeBa, _mimeLook, _charsetL, _getSourc];
        var requiredFunctions = [];
        var functions = requiredFunctions[_concat](optionalFunctions);
        for (var i = 0; i < functions[_length]; i++) { 
            var propName = functions[i];
            var environmentFunc = externalEnvironment[propName];
            if (environmentFunc) { 
                this[propName] = environmentFunc[_bind](externalEnvironment);
            }
            else if (i < requiredFunctions[_length]) { 
                this[_warn](_missing_6 + propName);
            }
        }
    }
    Environment[_prototyp][_getFileM1] = function (filename, currentDirectory, options, environment, isSync) { 
        if (!filename) { 
            logger_1[_default][_warn](_getFileM2);
        }
        if (currentDirectory == null) { 
            logger_1[_default][_warn](_getFileM3);
        }
        var fileManagers = this[_fileMana];
        if (options[_pluginMa]) { 
            fileManagers = [] [_concat](fileManagers) [_concat](options[_pluginMa][_getFileM]());
        }
        for (var i = fileManagers[_length] - 1; i >= 0; i--) { 
            var fileManager = fileManagers[i];
            if (fileManager[isSync ? _supports : _supports1](filename, currentDirectory, options, environment)) { 
                return fileManager;
            }
        }
        return null;
    };
    Environment[_prototyp][_addFileM] = function (fileManager) { 
        this[_fileMana][_push](fileManager);
    };
    Environment[_prototyp][_clearFil] = function () { 
        this[_fileMana] = [];
    };
    return Environment;
}());
exports[_default] = Environment;
//# sourceMappingURL=environment.js.map
return exports
}],
/* 958 string _require */ "require",
/* 959 string _evalPlug */ "evalPlugin",
/* 960 string _FileMana */ "FileManager",
/* 961 string _extractU */ "extractUrlParts",
/* 962 string _trySetOp */ "trySetOptions",
/* 963 string _use */ "use",
/* 964 string _context */ "context",
/* 965 string _Error_du */ /* text */ "Error during @plugin call",
/* 966 string _register */ "registerPlugin",
/* 967 string _tree */ "tree",
/* 968 string _validate */ "validatePlugin",
/* 969 string _minVersi */ "minVersion",
/* 970 string _compareV */ "compareVersion",
/* 971 string _3_0_1 */ "3.0.0",
/* 972 string _Not_a_va */ /* text */ "Not a valid plugin",
/* 973 string _setOptio */ "setOptions",
/* 974 string _Options_ */ /* text */ "Options have been provided but the plugin ",
/* 975 string _does_no */ /* text */ " does not support any options.",
/* 976 string _Plugin_ */ /* text */ "Plugin ",
/* 977 string _require1 */ /* text */ " requires version ",
/* 978 string _versionT */ "versionToString",
/* 979 regexp _d_d_d_ */ /^(\d+)\.?(\d+)?\.?(\d+)?/,
/* 980 string _16 */ ".",
/* 981 string _printUsa */ "printUsage",
/* 982 less$environment$abstract-plugin-loader.js */ [10,11,1,13,179,16,17,18,581,958,19,959,953,4,663,698,960,961,142,962,963,21,964,922,965,96,7,143,520,754,966,710,967,968,85,969,970,971,708,598,972,973,974,975,29,727,976,977,978,586,979,549,2,980,981,function(Object,exports,require,Function,parseInt,_definePr,__esModu,_value,__import1,_require,_prototyp,_evalPlug,_pluginMa,_string,_filename,_less,_FileMana,_extractU,_get,_trySetOp,_use,_call,_context,_message,_Error_du,_default,_exports,_fileInfo,_create,_module,_register,_function1,_tree,_validate,_imports,_minVersi,_compareV,_3_0_1,_addPlugi1,_getLocal,_Not_a_va,_setOptio,_Options_,_does_no,_function,_version,_Plugin_,_require1,_versionT,_match,_d_d_d_,_shift,_length,_16,_printUsa){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var function_registry_1 = tslib_1[__import1](require(600));
var less_error_1 = tslib_1[__import1](require(945));
var AbstractPluginLoader = /** @class */ (function () { 
    function AbstractPluginLoader() { 
        // Implemented by Node.js plugin loader
        this[_require] = function () { 
            return null;
        };
    }
    AbstractPluginLoader[_prototyp][_evalPlug] = function (contents, context, imports, pluginOptions, fileInfo) { 
        var loader, registry, pluginObj, localModule, pluginManager, filename, result;
        pluginManager = context[_pluginMa];
        if (fileInfo) { 
            if (typeof fileInfo === _string) { 
                filename = fileInfo;
            }
            else { 
                filename = fileInfo[_filename];
            }
        }
        var shortname = (new this[_less][_FileMana]()) [_extractU](filename) [_filename];
        if (filename) { 
            pluginObj = pluginManager[_get](filename);
            if (pluginObj) { 
                result = this[_trySetOp](pluginObj, filename, shortname, pluginOptions);
                if (result) { 
                    return result;
                }
                try { 
                    if (pluginObj[_use]) { 
                        pluginObj[_use][_call](this[_context], pluginObj);
                    }
                }
                catch (e) { 
                    e[_message] = e[_message] || _Error_du;
                    return new less_error_1[_default](e, imports, filename);
                }
                return pluginObj;
            }
        }
        localModule = { 
            [_exports]: {},
            [_pluginMa]: pluginManager,
            [_fileInfo]: fileInfo
        };
        registry = function_registry_1[_default][_create]();
        var registerPlugin = function (obj) { 
            pluginObj = obj;
        };
        try { 
            loader = new Function(_module, _require, _register, _function1, _tree, _less, _fileInfo, contents);
            loader(localModule, this[_require](filename), registerPlugin, registry, this[_less][_tree], this[_less], fileInfo);
        }
        catch (e) { 
            return new less_error_1[_default](e, imports, filename);
        }
        if (!pluginObj) { 
            pluginObj = localModule[_exports];
        }
        pluginObj = this[_validate](pluginObj, filename, shortname);
        if (pluginObj instanceof less_error_1[_default]) { 
            return pluginObj;
        }
        if (pluginObj) { 
            pluginObj[_imports] = imports;
            pluginObj[_filename] = filename;
            // For < 3.x (or unspecified minVersion) - setOptions() before install()
            if (!pluginObj[_minVersi] || this[_compareV](_3_0_1, pluginObj[_minVersi]) < 0) { 
                result = this[_trySetOp](pluginObj, filename, shortname, pluginOptions);
                if (result) { 
                    return result;
                }
            }
            // Run on first load
            pluginManager[_addPlugi1](pluginObj, fileInfo[_filename], registry);
            pluginObj[_function1] = registry[_getLocal]();
            // Need to call setOptions again because the pluginObj might have functions
            result = this[_trySetOp](pluginObj, filename, shortname, pluginOptions);
            if (result) { 
                return result;
            }
            // Run every @plugin call
            try { 
                if (pluginObj[_use]) { 
                    pluginObj[_use][_call](this[_context], pluginObj);
                }
            }
            catch (e) { 
                e[_message] = e[_message] || _Error_du;
                return new less_error_1[_default](e, imports, filename);
            }
        }
        else { 
            return new less_error_1[_default]({ [_message]: _Not_a_va }, imports, filename);
        }
        return pluginObj;
    };
    AbstractPluginLoader[_prototyp][_trySetOp] = function (plugin, filename, name, options) { 
        if (options && !plugin[_setOptio]) { 
            return new less_error_1[_default]({ 
                [_message]: _Options_ + name + _does_no
            });
        }
        try { 
            plugin[_setOptio] && plugin[_setOptio](options);
        }
        catch (e) { 
            return new less_error_1[_default](e);
        }
    };
    AbstractPluginLoader[_prototyp][_validate] = function (plugin, filename, name) { 
        if (plugin) { 
            // support plugins being a function
            // so that the plugin can be more usable programmatically
            if (typeof plugin === _function) { 
                plugin = new plugin();
            }
            if (plugin[_minVersi]) { 
                if (this[_compareV](plugin[_minVersi], this[_less][_version]) < 0) { 
                    return new less_error_1[_default]({ 
                        [_message]: _Plugin_ + name + _require1 + this[_versionT](plugin[_minVersi])
                    });
                }
            }
            return plugin;
        }
        return null;
    };
    AbstractPluginLoader[_prototyp][_compareV] = function (aVersion, bVersion) { 
        if (typeof aVersion === _string) { 
            aVersion = aVersion[_match](_d_d_d_);
            aVersion[_shift]();
        }
        for (var i = 0; i < aVersion[_length]; i++) { 
            if (aVersion[i] !== bVersion[i]) { 
                return parseInt(aVersion[i]) > parseInt(bVersion[i]) ? -1 : 1;
            }
        }
        return 0;
    };
    AbstractPluginLoader[_prototyp][_versionT] = function (version) { 
        var versionString = '';
        for (var i = 0; i < version[_length]; i++) { 
            versionString += (versionString ? _16 : '') + version[i];
        }
        return versionString;
    };
    AbstractPluginLoader[_prototyp][_printUsa] = function (plugins) { 
        for (var i = 0; i < plugins[_length]; i++) { 
            var plugin = plugins[i];
            if (plugin[_printUsa]) { 
                plugin[_printUsa]();
            }
        }
    };
    return AbstractPluginLoader;
}());
exports[_default] = AbstractPluginLoader;
//# sourceMappingURL=abstract-plugin-loader.js.map
return exports
}],
/* 983 string _getPath */ "getPath",
/* 984 string _lastInde */ "lastIndexOf",
/* 985 string _17 */ "?",
/* 986 string _tryAppen */ "tryAppendExtension",
/* 987 regexp _a_z_$_$ */ /(\.[a-z]*$)|([\?;].*)$/,
/* 988 string _tryAppen1 */ "tryAppendLessExtension",
/* 989 string _less1 */ ".less",
/* 990 string _alwaysMa */ "alwaysMakePathsAbsolute",
/* 991 string _isPathAb */ "isPathAbsolute",
/* 992 regexp _a_z_i1 */ /^(?:[a-z-]+:|\/|\\|#)/i,
/* 993 string _pathDiff */ "pathDiff",
/* 994 string _hostPart */ "hostPart",
/* 995 string _max */ "max",
/* 996 string _18 */ "../",
/* 997 regexp _a_z_2_$ */ /^((?:[a-z-]+:)?\/{2}(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i,
/* 998 string _Could_no */ /* text */ "Could not parse sheet href - '",
/* 999 string _19 */ "'",
/* 1000 string _Could_no1 */ /* text */ "Could not parse page url - '",
/* 1001 string _20 */ "..",
/* 1002 string _rawPath */ "rawPath",
/* 1003 string _path */ "path",
/* 1004 string _fileUrl */ "fileUrl",
/* 1005 less$environment$abstract-file-manager.js */ [10,11,177,133,16,17,18,19,983,984,985,22,111,110,986,987,105,988,989,954,990,991,992,157,993,961,994,995,756,2,996,997,586,998,999,1000,108,646,6,1001,540,980,93,1002,1003,663,1004,740,96,function(Object,exports,Math,Error,_definePr,__esModu,_value,_prototyp,_getPath,_lastInde,_17,_slice,_4,_3,_tryAppen,_a_z_$_$,_test,_tryAppen1,_less1,_supports,_alwaysMa,_isPathAb,_a_z_i1,_join,_pathDiff,_extractU,_hostPart,_max,_director,_length,_18,_a_z_2_$,_match,_Could_no,_19,_Could_no1,_replace,_g1,_split,_20,_pop,_16,_push,_rawPath,_path,_filename,_fileUrl,_url,_default){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var AbstractFileManager = /** @class */ (function () { 
    function AbstractFileManager() { 
    }
    AbstractFileManager[_prototyp][_getPath] = function (filename) { 
        var j = filename[_lastInde](_17);
        if (j > 0) { 
            filename = filename[_slice](0, j);
        }
        j = filename[_lastInde](_4);
        if (j < 0) { 
            j = filename[_lastInde](_3);
        }
        if (j < 0) { 
            return '';
        }
        return filename[_slice](0, j + 1);
    };
    AbstractFileManager[_prototyp][_tryAppen] = function (path, ext) { 
        return _a_z_$_$ [_test](path) ? path : path + ext;
    };
    AbstractFileManager[_prototyp][_tryAppen1] = function (path) { 
        return this[_tryAppen](path, _less1);
    };
    AbstractFileManager[_prototyp][_supports] = function () { 
        return false;
    };
    AbstractFileManager[_prototyp][_alwaysMa] = function () { 
        return false;
    };
    AbstractFileManager[_prototyp][_isPathAb] = function (filename) { 
        return (_a_z_i1) [_test](filename);
    };
    // TODO: pull out / replace?
    AbstractFileManager[_prototyp][_join] = function (basePath, laterPath) { 
        if (!basePath) { 
            return laterPath;
        }
        return basePath + laterPath;
    };
    AbstractFileManager[_prototyp][_pathDiff] = function (url, baseUrl) { 
        // diff between two paths to create a relative path
        var urlParts = this[_extractU](url);
        var baseUrlParts = this[_extractU](baseUrl);
        var i;
        var max;
        var urlDirectories;
        var baseUrlDirectories;
        var diff = '';
        if (urlParts[_hostPart] !== baseUrlParts[_hostPart]) { 
            return '';
        }
        max = Math[_max](baseUrlParts[_director][_length], urlParts[_director][_length]);
        for (i = 0; i < max; i++) { 
            if (baseUrlParts[_director][i] !== urlParts[_director][i]) { 
                break;
            }
        }
        baseUrlDirectories = baseUrlParts[_director][_slice](i);
        urlDirectories = urlParts[_director][_slice](i);
        for (i = 0; i < baseUrlDirectories[_length] - 1; i++) { 
            diff += _18;
        }
        for (i = 0; i < urlDirectories[_length] - 1; i++) { 
            diff += urlDirectories[i] + _4;
        }
        return diff;
    };
    // helper function, not part of API
    AbstractFileManager[_prototyp][_extractU] = function (url, baseUrl) { 
        // urlParts[1] = protocol://hostname/ OR /
        // urlParts[2] = / if path relative to host base
        // urlParts[3] = directories
        // urlParts[4] = filename
        // urlParts[5] = parameters
        var urlPartsRegex = _a_z_2_$;
        var urlParts = url[_match](urlPartsRegex);
        var returner = {};
        var rawDirectories = [];
        var directories = [];
        var i;
        var baseUrlParts;
        if (!urlParts) { 
            throw new Error(_Could_no + url + _19);
        }
        // Stylesheets in IE don't always return the full path
        if (baseUrl && (!urlParts[1] || urlParts[2])) { 
            baseUrlParts = baseUrl[_match](urlPartsRegex);
            if (!baseUrlParts) { 
                throw new Error(_Could_no1 + baseUrl + _19);
            }
            urlParts[1] = urlParts[1] || baseUrlParts[1] || '';
            if (!urlParts[2]) { 
                urlParts[3] = baseUrlParts[3] + urlParts[3];
            }
        }
        if (urlParts[3]) { 
            rawDirectories = urlParts[3] [_replace](_g1, _4) [_split](_4);
            // collapse '..' and skip '.'
            for (i = 0; i < rawDirectories[_length]; i++) { 
                if (rawDirectories[i] === _20) { 
                    directories[_pop]();
                }
                else if (rawDirectories[i] !== _16) { 
                    directories[_push](rawDirectories[i]);
                }
            }
        }
        returner[_hostPart] = urlParts[1];
        returner[_director] = directories;
        returner[_rawPath] = (urlParts[1] || '') + rawDirectories[_join](_4);
        returner[_path] = (urlParts[1] || '') + directories[_join](_4);
        returner[_filename] = urlParts[4];
        returner[_fileUrl] = returner[_path] + (urlParts[4] || '');
        returner[_url] = returner[_fileUrl] + (urlParts[5] || '');
        return returner;
    };
    return AbstractFileManager;
}());
exports[_default] = AbstractFileManager;
//# sourceMappingURL=abstract-file-manager.js.map
return exports
}],
/* 1006 string _paths */ "paths",
/* 1007 string _rootpath */ "rootpath",
/* 1008 string _strictIm */ "strictImports",
/* 1009 string _insecure */ "insecure",
/* 1010 string _syncImpo */ "syncImport",
/* 1011 string _chunkInp */ "chunkInput",
/* 1012 string _useFileC */ "useFileCache",
/* 1013 string _processI */ "processImports",
/* 1014 string _Parse */ "Parse",
/* 1015 string _strictUn */ "strictUnits",
/* 1016 string _importMu */ "importMultiple",
/* 1017 string _urlArgs */ "urlArgs",
/* 1018 string _javascri */ "javascriptEnabled",
/* 1019 string _importan */ "importantScope",
/* 1020 string _Eval */ "Eval",
/* 1021 string _frames */ "frames",
/* 1022 string _enterCal */ "enterCalc",
/* 1023 string _calcStac */ "calcStack",
/* 1024 string _inCalc */ "inCalc",
/* 1025 string _exitCalc */ "exitCalc",
/* 1026 string _inParent */ "inParenthesis",
/* 1027 string _parensSt */ "parensStack",
/* 1028 string _outOfPar */ "outOfParenthesis",
/* 1029 string _mathOn */ "mathOn",
/* 1030 string _isMathOn */ "isMathOn",
/* 1031 string _pathRequ */ "pathRequiresRewrite",
/* 1032 string _rewriteP */ "rewritePath",
/* 1033 string _normaliz1 */ "normalizePath",
/* 1034 string _21 */ "./",
/* 1035 string _reverse */ "reverse",
/* 1036 regexp _a_z_i2 */ /^(?:[a-z-]+:|\/|#)/i,
/* 1037 less$contexts.js */ [10,11,1,16,17,18,96,580,2,46,1006,629,1007,1008,1009,114,115,1010,1011,786,1012,1013,953,1014,4,627,1015,674,1016,1017,1018,1019,1020,1021,19,1022,1023,93,1024,1025,540,1026,1027,1028,1029,1030,111,602,603,604,1031,601,607,1032,1033,1034,6,1035,980,1001,157,1036,105,620,function(Object,exports,require,_definePr,__esModu,_value,_default,__import,_length,_hasOwnPr,_paths,_rewriteU,_rootpath,_strictIm,_insecure,_dumpLine,_compress,_syncImpo,_chunkInp,_mime,_useFileC,_processI,_pluginMa,_Parse,_string,_math,_strictUn,_sourceMa4,_importMu,_urlArgs,_javascri,_importan,_Eval,_frames,_prototyp,_enterCal,_calcStac,_push,_inCalc,_exitCalc,_pop,_inParent,_parensSt,_outOfPar,_mathOn,_isMathOn,_4,_Math,_ALWAYS,_PARENS_D,_pathRequ,_RewriteU,_LOCAL,_rewriteP,_normaliz1,_21,_split,_reverse,_16,_20,_join,_a_z_i2,_test,_charAt){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var contexts = {};
exports[_default] = contexts;
var Constants = tslib_1[__import](require(609));
var copyFromOriginal = function copyFromOriginal(original, destination, propertiesToCopy) { 
    if (!original) { 
        return;
    }
    for (var i = 0; i < propertiesToCopy[_length]; i++) { 
        if (original[_hasOwnPr](propertiesToCopy[i])) { 
            destination[propertiesToCopy[i]] = original[propertiesToCopy[i]];
        }
    }
};
/*
 parse is used whilst parsing
 */
var parseCopyProperties = [
    // options
    _paths,
    _rewriteU,
    _rootpath,
    _strictIm,
    _insecure,
    _dumpLine,
    _compress,
    _syncImpo,
    _chunkInp,
    _mime,
    _useFileC,
    // context
    _processI,
    // Used by the import manager to stop multiple import visitors being created.
    _pluginMa // Used as the plugin manager for the session
];
contexts[_Parse] = function (options) { 
    copyFromOriginal(options, this, parseCopyProperties);
    if (typeof this[_paths] === _string) { 
        this[_paths] = [this[_paths]];
    }
};
var evalCopyProperties = [
    _paths,
    _compress,
    _math,
    _strictUn,
    _sourceMa4,
    _importMu,
    _urlArgs,
    _javascri,
    _pluginMa,
    _importan,
    _rewriteU // option - whether to adjust URL's to be relative
];
contexts[_Eval] = function (options, frames) { 
    copyFromOriginal(options, this, evalCopyProperties);
    if (typeof this[_paths] === _string) { 
        this[_paths] = [this[_paths]];
    }
    this[_frames] = frames || [];
    this[_importan] = this[_importan] || [];
};
contexts[_Eval][_prototyp][_enterCal] = function () { 
    if (!this[_calcStac]) { 
        this[_calcStac] = [];
    }
    this[_calcStac][_push](true);
    this[_inCalc] = true;
};
contexts[_Eval][_prototyp][_exitCalc] = function () { 
    this[_calcStac][_pop]();
    if (!this[_calcStac][_length]) { 
        this[_inCalc] = false;
    }
};
contexts[_Eval][_prototyp][_inParent] = function () { 
    if (!this[_parensSt]) { 
        this[_parensSt] = [];
    }
    this[_parensSt][_push](true);
};
contexts[_Eval][_prototyp][_outOfPar] = function () { 
    this[_parensSt][_pop]();
};
contexts[_Eval][_prototyp][_inCalc] = false;
contexts[_Eval][_prototyp][_mathOn] = true;
contexts[_Eval][_prototyp][_isMathOn] = function (op) { 
    if (!this[_mathOn]) { 
        return false;
    }
    if (op === _4 && this[_math] !== Constants[_Math][_ALWAYS] && (!this[_parensSt] || !this[_parensSt][_length])) { 
        return false;
    }
    if (this[_math] > Constants[_Math][_PARENS_D]) { 
        return this[_parensSt] && this[_parensSt][_length];
    }
    return true;
};
contexts[_Eval][_prototyp][_pathRequ] = function (path) { 
    var isRelative = this[_rewriteU] === Constants[_RewriteU][_LOCAL] ? isPathLocalRelative : isPathRelative;
    return isRelative(path);
};
contexts[_Eval][_prototyp][_rewriteP] = function (path, rootpath) { 
    var newPath;
    rootpath = rootpath || '';
    newPath = this[_normaliz1](rootpath + path);
    // If a path was explicit relative and the rootpath was not an absolute path
    // we must ensure that the new path is also explicit relative.
    if (isPathLocalRelative(path) &&
        isPathRelative(rootpath) &&
        isPathLocalRelative(newPath) === false) { 
        newPath = _21 + newPath;
    }
    return newPath;
};
contexts[_Eval][_prototyp][_normaliz1] = function (path) { 
    var segments = path[_split](_4) [_reverse]();
    var segment;
    path = [];
    while (segments[_length] !== 0) { 
        segment = segments[_pop]();
        switch (segment) { 
            case _16 :
                break;
            case _20 :
                if ((path[_length] === 0) || (path[path[_length] - 1] === _20)) { 
                    path[_push](segment);
                }
                else { 
                    path[_pop]();
                }
                break;
            default:
                path[_push](segment);
                break;
        }
    }
    return path[_join](_4);
};
function isPathRelative(path) { 
    return !_a_z_i2 [_test](path);
}
function isPathLocalRelative(path) { 
    return path[_charAt](0) === _16;
}
// todo - do the same for the toCSS ?
//# sourceMappingURL=contexts.js.map
return exports
}],
/* 1038 string _Value_re */ /* text */ "Value requires an array argument",
/* 1039 string _Value */ "Value",
/* 1040 string _22 */ ",",
/* 1041 less$tree$value.js */ [10,11,1,133,84,16,17,18,581,1038,51,19,525,96,167,1039,131,127,158,2,503,154,155,115,1040,101,function(Object,exports,require,Error,Array,_definePr,__esModu,_value,__import1,_Value_re,_isArray,_prototyp,_assign,_default,_type,_Value,_accept,_visitArr,_eval,_length,_map,_genCSS,_add,_compress,_22,_1){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var Value = function (value) { 
    if (!value) { 
        throw new Error(_Value_re);
    }
    if (!Array[_isArray](value)) { 
        this[_value] = [value];
    }
    else { 
        this[_value] = value;
    }
};
Value[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Value,
    [_accept]: function (visitor) { 
        if (this[_value]) { 
            this[_value] = visitor[_visitArr](this[_value]);
        }
    },
    [_eval]: function (context) { 
        if (this[_value][_length] === 1) { 
            return this[_value][0] [_eval](context);
        }
        else { 
            return new Value(this[_value][_map](function (v) { 
                return v[_eval](context);
            }));
        }
    },
    [_genCSS]: function (context, output) { 
        var i;
        for (i = 0; i < this[_value][_length]; i++) { 
            this[_value][i] [_genCSS](context, output);
            if (i + 1 < this[_value][_length]) { 
                output[_add]((context && context[_compress]) ? _22 : _1);
            }
        }
    }
});
exports[_default] = Value;
//# sourceMappingURL=value.js.map
return exports
}],
/* 1042 regexp _s_g */ /[\(\)'"\s]/g,
/* 1043 string _isEvald */ "isEvald",
/* 1044 string _Url */ "Url",
/* 1045 string _url_ */ "url(",
/* 1046 string _23 */ ")",
/* 1047 string _quote */ "quote",
/* 1048 regexp _s_data_ */ /^\s*data:/,
/* 1049 string _24 */ "&",
/* 1050 string _25 */ "#",
/* 1051 less$tree$url.js */ [10,11,1,16,17,18,581,108,1042,110,150,151,1043,19,525,96,167,1044,131,126,154,155,1045,1046,158,143,1007,4,1031,1047,1032,1033,1017,586,1048,3,985,1049,1050,147,function(Object,exports,require,_definePr,__esModu,_value,__import1,_replace,_s_g,_3,_index1,_fileInf,_isEvald,_prototyp,_assign,_default,_type,_Url,_accept,_visit,_genCSS,_add,_url_,_23,_eval,_fileInfo,_rootpath,_string,_pathRequ,_quote,_rewriteP,_normaliz1,_urlArgs,_match,_s_data_,_indexOf,_17,_24,_25,_getIndex){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
function escapePath(path) { 
    return path[_replace](_s_g, function (match) { return _3 + match; });
}
var URL = function (val, index, currentFileInfo, isEvald) { 
    this[_value] = val;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_isEvald] = isEvald;
};
URL[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Url,
    [_accept]: function (visitor) { 
        this[_value] = visitor[_visit](this[_value]);
    },
    [_genCSS]: function (context, output) { 
        output[_add](_url_);
        this[_value][_genCSS](context, output);
        output[_add](_23);
    },
    [_eval]: function (context) { 
        var val = this[_value][_eval](context);
        var rootpath;
        if (!this[_isEvald]) { 
            // Add the rootpath if the URL requires a rewrite
            rootpath = this[_fileInfo]() && this[_fileInfo]() [_rootpath];
            if (typeof rootpath === _string &&
                typeof val[_value] === _string &&
                context[_pathRequ](val[_value])) { 
                if (!val[_quote]) { 
                    rootpath = escapePath(rootpath);
                }
                val[_value] = context[_rewriteP](val[_value], rootpath);
            }
            else { 
                val[_value] = context[_normaliz1](val[_value]);
            }
            // Add url args if enabled
            if (context[_urlArgs]) { 
                if (!val[_value][_match](_s_data_)) { 
                    var delimiter = val[_value][_indexOf](_17) === -1 ? _17 : _24;
                    var urlArgs = delimiter + context[_urlArgs];
                    if (val[_value][_indexOf](_25) !== -1) { 
                        val[_value] = val[_value][_replace](_25, urlArgs + _25);
                    }
                    else { 
                        val[_value] += urlArgs;
                    }
                }
            }
        }
        return new URL(val, this[_getIndex](), this[_fileInfo](), true);
    }
});
exports[_default] = URL;
//# sourceMappingURL=url.js.map
return exports
}],
/* 1052 string _numerato */ "numerator",
/* 1053 string _sort */ "sort",
/* 1054 string _denomina */ "denominator",
/* 1055 string _backupUn */ "backupUnit",
/* 1056 string _Unit */ "Unit",
/* 1057 string _is */ "is",
/* 1058 string _toUpperC */ "toUpperCase",
/* 1059 string _isLength */ "isLength",
/* 1060 string _px_em_e */ "^(px|em|ex|ch|rem|in|cm|mm|pc|pt|ex|vw|vh|vmin|vmax)$",
/* 1061 string _gi */ "gi",
/* 1062 string _isSingul */ "isSingular",
/* 1063 string _usedUnit */ "usedUnits",
/* 1064 string _cancel */ "cancel",
/* 1065 less$tree$unit.js */ [10,11,1,123,134,16,17,18,581,580,1052,618,1053,1054,1055,2,19,525,96,167,1056,617,154,1015,155,20,157,162,111,166,1057,1058,1059,1060,1061,105,153,156,1062,503,1063,46,1064,93,function(Object,exports,require,undefined,RegExp,_definePr,__esModu,_value,__import1,__import,_numerato,_copyArra,_sort,_denomina,_backupUn,_length,_prototyp,_assign,_default,_type,_Unit,_clone,_genCSS,_strictUn,_add,_toString,_join,_8,_4,_compare,_is,_toUpperC,_isLength,_px_em_e,_gi,_test,_toCSS,_isEmpty,_isSingul,_map,_usedUnit,_hasOwnPr,_cancel,_push){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var unit_conversions_1 = tslib_1[__import1](require(211));
var utils = tslib_1[__import](require(636));
var Unit = function (numerator, denominator, backupUnit) { 
    this[_numerato] = numerator ? utils[_copyArra](numerator) [_sort]() : [];
    this[_denomina] = denominator ? utils[_copyArra](denominator) [_sort]() : [];
    if (backupUnit) { 
        this[_backupUn] = backupUnit;
    }
    else if (numerator && numerator[_length]) { 
        this[_backupUn] = numerator[0];
    }
};
Unit[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Unit,
    [_clone]: function () { 
        return new Unit(utils[_copyArra](this[_numerato]), utils[_copyArra](this[_denomina]), this[_backupUn]);
    },
    [_genCSS]: function (context, output) { 
        // Dimension checks the unit is singular and throws an error if in strict math mode.
        var strictUnits = context && context[_strictUn];
        if (this[_numerato][_length] === 1) { 
            output[_add](this[_numerato][0]); // the ideal situation
        }
        else if (!strictUnits && this[_backupUn]) { 
            output[_add](this[_backupUn]);
        }
        else if (!strictUnits && this[_denomina][_length]) { 
            output[_add](this[_denomina][0]);
        }
    },
    [_toString]: function () { 
        var i, returnStr = this[_numerato][_join](_8);
        for (i = 0; i < this[_denomina][_length]; i++) { 
            returnStr += _4 + this[_denomina][i];
        }
        return returnStr;
    },
    [_compare]: function (other) { 
        return this[_is](other[_toString]()) ? 0 : undefined;
    },
    [_is]: function (unitString) { 
        return this[_toString]() [_toUpperC]() === unitString[_toUpperC]();
    },
    [_isLength]: function () { 
        return RegExp(_px_em_e, _gi) [_test](this[_toCSS]());
    },
    [_isEmpty]: function () { 
        return this[_numerato][_length] === 0 && this[_denomina][_length] === 0;
    },
    [_isSingul]: function () { 
        return this[_numerato][_length] <= 1 && this[_denomina][_length] === 0;
    },
    [_map]: function (callback) { 
        var i;
        for (i = 0; i < this[_numerato][_length]; i++) { 
            this[_numerato][i] = callback(this[_numerato][i], false);
        }
        for (i = 0; i < this[_denomina][_length]; i++) { 
            this[_denomina][i] = callback(this[_denomina][i], true);
        }
    },
    [_usedUnit]: function () { 
        var group;
        var result = {};
        var mapUnit;
        var groupName;
        mapUnit = function (atomicUnit) { 
            /* jshint loopfunc:true */
            if (group[_hasOwnPr](atomicUnit) && !result[groupName]) { 
                result[groupName] = atomicUnit;
            }
            return atomicUnit;
        };
        for (groupName in unit_conversions_1[_default]) { 
            if (unit_conversions_1[_default][_hasOwnPr](groupName)) { 
                group = unit_conversions_1[_default][groupName];
                this[_map](mapUnit);
            }
        }
        return result;
    },
    [_cancel]: function () { 
        var counter = {};
        var atomicUnit;
        var i;
        for (i = 0; i < this[_numerato][_length]; i++) { 
            atomicUnit = this[_numerato][i];
            counter[atomicUnit] = (counter[atomicUnit] || 0) + 1;
        }
        for (i = 0; i < this[_denomina][_length]; i++) { 
            atomicUnit = this[_denomina][i];
            counter[atomicUnit] = (counter[atomicUnit] || 0) - 1;
        }
        this[_numerato] = [];
        this[_denomina] = [];
        for (atomicUnit in counter) { 
            if (counter[_hasOwnPr](atomicUnit)) { 
                var count = counter[atomicUnit];
                if (count > 0) { 
                    for (i = 0; i < count; i++) { 
                        this[_numerato][_push](atomicUnit);
                    }
                }
                else if (count < 0) { 
                    for (i = 0; i < -count; i++) { 
                        this[_denomina][_push](atomicUnit);
                    }
                }
            }
        }
        this[_numerato][_sort]();
        this[_denomina][_sort]();
    }
});
exports[_default] = Unit;
//# sourceMappingURL=unit.js.map
return exports
}],
/* 1066 string _UnicodeD */ "UnicodeDescriptor",
/* 1067 less$tree$unicode-descriptor.js */ [10,11,1,16,17,18,581,19,525,96,167,1066,function(Object,exports,require,_definePr,__esModu,_value,__import1,_prototyp,_assign,_default,_type,_UnicodeD){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var UnicodeDescriptor = function (value) { 
    this[_value] = value;
};
UnicodeDescriptor[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _UnicodeD
});
exports[_default] = UnicodeDescriptor;
//# sourceMappingURL=unicode-descriptor.js.map
return exports
}],
/* 1068 string _Paren */ "Paren",
/* 1069 string _26 */ "(",
/* 1070 less$tree$paren.js */ [10,11,1,16,17,18,581,19,525,96,167,1068,154,155,1069,1046,158,function(Object,exports,require,_definePr,__esModu,_value,__import1,_prototyp,_assign,_default,_type,_Paren,_genCSS,_add,_26,_23,_eval){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var Paren = function (node) { 
    this[_value] = node;
};
Paren[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Paren,
    [_genCSS]: function (context, output) { 
        output[_add](_26);
        this[_value][_genCSS](context, output);
        output[_add](_23);
    },
    [_eval]: function (context) { 
        return new Paren(this[_value][_eval](context));
    }
});
exports[_default] = Paren;
//# sourceMappingURL=paren.js.map
return exports
}],
/* 1071 string _Keyword */ "Keyword",
/* 1072 string _27 */ "%",
/* 1073 string _Invalid_ */ /* text */ "Invalid % without number",
/* 1074 string _True */ "True",
/* 1075 string _true */ "true",
/* 1076 string _False */ "False",
/* 1077 string _false */ "false",
/* 1078 less$tree$keyword.js */ [10,11,1,16,17,18,581,19,525,96,167,1071,154,1072,924,922,1073,155,1074,1075,1076,1077,function(Object,exports,require,_definePr,__esModu,_value,__import1,_prototyp,_assign,_default,_type,_Keyword,_genCSS,_27,_Syntax,_message,_Invalid_,_add,_True,_true,_False,_false){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var Keyword = function (value) { 
    this[_value] = value;
};
Keyword[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Keyword,
    [_genCSS]: function (context, output) { 
        if (this[_value] === _27) { 
            throw { [_type]: _Syntax, [_message]: _Invalid_ };
        }
        output[_add](this[_value]);
    }
});
Keyword[_True] = new Keyword(_true);
Keyword[_False] = new Keyword(_false);
exports[_default] = Keyword;
//# sourceMappingURL=keyword.js.map
return exports
}],
/* 1079 string _ruleset */ "ruleset",
/* 1080 string _Detached */ "DetachedRuleset",
/* 1081 string _evalFirs */ "evalFirst",
/* 1082 string _callEval */ "callEval",
/* 1083 less$tree$detached-ruleset.js */ [10,11,1,16,17,18,581,580,1079,1021,148,19,525,96,167,1080,1081,131,126,158,618,1082,1020,8,function(Object,exports,require,_definePr,__esModu,_value,__import1,__import,_ruleset,_frames,_setParen,_prototyp,_assign,_default,_type,_Detached,_evalFirs,_accept,_visit,_eval,_copyArra,_callEval,_Eval,_concat){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var contexts_1 = tslib_1[__import1](require(1037));
var utils = tslib_1[__import](require(636));
var DetachedRuleset = function (ruleset, frames) { 
    this[_ruleset] = ruleset;
    this[_frames] = frames;
    this[_setParen](this[_ruleset], this);
};
DetachedRuleset[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Detached,
    [_evalFirs]: true,
    [_accept]: function (visitor) { 
        this[_ruleset] = visitor[_visit](this[_ruleset]);
    },
    [_eval]: function (context) { 
        var frames = this[_frames] || utils[_copyArra](context[_frames]);
        return new DetachedRuleset(this[_ruleset], frames);
    },
    [_callEval]: function (context) { 
        return this[_ruleset][_eval](this[_frames] ? new contexts_1[_default][_Eval](context, this[_frames][_concat](context[_frames])) : context);
    }
});
exports[_default] = DetachedRuleset;
//# sourceMappingURL=detached-ruleset.js.map
return exports
}],
/* 1084 string _op */ "op",
/* 1085 string _trim */ "trim",
/* 1086 string _lvalue */ "lvalue",
/* 1087 string _rvalue */ "rvalue",
/* 1088 string _negate */ "negate",
/* 1089 string _Conditio */ "Condition",
/* 1090 string _and */ "and",
/* 1091 string _or */ "or",
/* 1092 string _28 */ "<",
/* 1093 string _29 */ "=<",
/* 1094 string _30 */ "<=",
/* 1095 string _31 */ "=",
/* 1096 string _32 */ ">=",
/* 1097 string _33 */ ">",
/* 1098 less$tree$condition.js */ [10,11,1,16,17,18,581,1084,1085,1086,1087,150,1088,19,525,96,167,1089,131,126,158,1090,1091,166,1092,1093,1094,1095,1096,1097,function(Object,exports,require,_definePr,__esModu,_value,__import1,_op,_trim,_lvalue,_rvalue,_index1,_negate,_prototyp,_assign,_default,_type,_Conditio,_accept,_visit,_eval,_and,_or,_compare,_28,_29,_30,_31,_32,_33){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var Condition = function (op, l, r, i, negate) { 
    this[_op] = op[_trim]();
    this[_lvalue] = l;
    this[_rvalue] = r;
    this[_index1] = i;
    this[_negate] = negate;
};
Condition[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Conditio,
    [_accept]: function (visitor) { 
        this[_lvalue] = visitor[_visit](this[_lvalue]);
        this[_rvalue] = visitor[_visit](this[_rvalue]);
    },
    [_eval]: function (context) { 
        var result = (function (op, a, b) { 
            switch (op) { 
                case _and : return a && b;
                case _or : return a || b;
                default:
                    switch (node_1[_default][_compare](a, b)) { 
                        case -1:
                            return op === _28 || op === _29 || op === _30;
                        case 0:
                            return op === _31 || op === _32 || op === _29 || op === _30;
                        case 1:
                            return op === _33 || op === _32;
                        default:
                            return false;
                    }
            }
        })(this[_op], this[_lvalue][_eval](context), this[_rvalue][_eval](context));
        return this[_negate] ? !result : result;
    }
});
exports[_default] = Condition;
//# sourceMappingURL=condition.js.map
return exports
}],
/* 1099 string _isLineCo */ "isLineComment",
/* 1100 string _allowRoo */ "allowRoot",
/* 1101 string _Comment */ "Comment",
/* 1102 string _isSilent */ "isSilent",
/* 1103 less$tree$comment.js */ [10,11,1,16,17,18,581,1099,150,151,1100,19,525,96,167,1101,154,99,155,143,147,1102,115,932,function(Object,exports,require,_definePr,__esModu,_value,__import1,_isLineCo,_index1,_fileInf,_allowRoo,_prototyp,_assign,_default,_type,_Comment,_genCSS,_debugInf,_add,_fileInfo,_getIndex,_isSilent,_compress,_13){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var debug_info_1 = tslib_1[__import1](require(119));
var Comment = function (value, isLineComment, index, currentFileInfo) { 
    this[_value] = value;
    this[_isLineCo] = isLineComment;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_allowRoo] = true;
};
Comment[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Comment,
    [_genCSS]: function (context, output) { 
        if (this[_debugInf]) { 
            output[_add](debug_info_1[_default](context, this), this[_fileInfo](), this[_getIndex]());
        }
        output[_add](this[_value]);
    },
    [_isSilent]: function (context) { 
        var isCompressed = context[_compress] && this[_value][2] !== _13;
        return this[_isLineCo] || isCompressed;
    }
});
exports[_default] = Comment;
//# sourceMappingURL=comment.js.map
return exports
}],
/* 1104 string _34 */ "|",
/* 1105 string _emptyOrW */ "emptyOrWhitespace",
/* 1106 string _Combinat */ "Combinator",
/* 1107 less$tree$combinator.js */ [10,11,1,16,17,18,581,933,1104,1105,1085,19,525,96,167,1106,154,115,155,function(Object,exports,require,_definePr,__esModu,_value,__import1,_14,_34,_emptyOrW,_trim,_prototyp,_assign,_default,_type,_Combinat,_genCSS,_compress,_add){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var _noSpaceCombinators = { 
    [""]: true,
    [_14]: true,
    [_34]: true
};
var Combinator = function (value) { 
    if (value === _14) { 
        this[_value] = _14;
        this[_emptyOrW] = true;
    }
    else { 
        this[_value] = value ? value[_trim]() : '';
        this[_emptyOrW] = this[_value] === '';
    }
};
Combinator[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Combinat,
    [_genCSS]: function (context, output) { 
        var spaceOrEmpty = (context[_compress] || _noSpaceCombinators[this[_value]]) ? '' : _14;
        output[_add](spaceOrEmpty + this[_value] + spaceOrEmpty);
    }
});
exports[_default] = Combinator;
//# sourceMappingURL=combinator.js.map
return exports
}],
/* 1108 string _rgb */ "rgb",
/* 1109 regexp _2_g */ /.{2}/g,
/* 1110 string _alpha */ "alpha",
/* 1111 string _Color */ "Color",
/* 1112 string _luma */ "luma",
/* 1113 string _pow */ "pow",
/* 1114 string _rgba */ "rgba",
/* 1115 string _hsl */ "hsl",
/* 1116 string _hsla */ "hsla",
/* 1117 string _round */ "round",
/* 1118 string _toHSL */ "toHSL",
/* 1119 string _h */ "h",
/* 1120 string _l */ "l",
/* 1121 string _toRGB */ "toRGB",
/* 1122 string _operate1 */ "operate",
/* 1123 string _min */ "min",
/* 1124 string _toHSV */ "toHSV",
/* 1125 string _toARGB */ "toARGB",
/* 1126 string _fromKeyw */ "fromKeyword",
/* 1127 string _transpar */ "transparent",
/* 1128 string _0 */ "0",
/* 1129 less$tree$color.js */ [10,11,1,84,179,177,123,16,17,18,581,51,1108,2,586,1109,503,93,1110,6,541,929,19,525,96,167,1111,1112,1113,154,155,153,115,163,3,1114,1115,1116,1117,8,1118,1119,203,1072,1120,1069,157,1040,933,1046,1121,1050,1122,159,995,1123,551,1124,545,1125,166,1126,596,46,22,1127,1128,20,function(Object,exports,require,Array,parseInt,Math,undefined,_definePr,__esModu,_value,__import1,_isArray,_rgb,_length,_match,_2_g,_map,_push,_alpha,_split,_number,_undefine,_prototyp,_assign,_default,_type,_Color,_luma,_pow,_genCSS,_add,_toCSS,_compress,_fround,_indexOf,_rgba,_hsl,_hsla,_round,_concat,_toHSL,_h,_s,_27,_l,_26,_join,_22,_14,_23,_toRGB,_25,_operate1,_operate,_max,_min,_a,_toHSV,_v,_toARGB,_compare,_fromKeyw,_toLowerC,_hasOwnPr,_slice,_transpar,_0,_toString){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var colors_1 = tslib_1[__import1](require(499));
//
// RGB Colors - #ff0014, #eee
//
var Color = function (rgb, a, originalForm) { 
    var self = this;
    //
    // The end goal here, is to parse the arguments
    // into an integer triplet, such as `128, 255, 0`
    //
    // This facilitates operations and conversions.
    //
    if (Array[_isArray](rgb)) { 
        this[_rgb] = rgb;
    }
    else if (rgb[_length] >= 6) { 
        this[_rgb] = [];
        rgb[_match](_2_g) [_map](function (c, i) { 
            if (i < 3) { 
                self[_rgb][_push](parseInt(c, 16));
            }
            else { 
                self[_alpha] = (parseInt(c, 16)) / 255;
            }
        });
    }
    else { 
        this[_rgb] = [];
        rgb[_split]('') [_map](function (c, i) { 
            if (i < 3) { 
                self[_rgb][_push](parseInt(c + c, 16));
            }
            else { 
                self[_alpha] = (parseInt(c + c, 16)) / 255;
            }
        });
    }
    this[_alpha] = this[_alpha] || (typeof a === _number ? a : 1);
    if (typeof originalForm !== _undefine) { 
        this[_value] = originalForm;
    }
};
Color[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Color,
    [_luma]: function () { 
        var r = this[_rgb][0] / 255, g = this[_rgb][1] / 255, b = this[_rgb][2] / 255;
        r = (r <= 0.03928) ? r / 12.92 : Math[_pow](((r + 0.055) / 1.055), 2.4);
        g = (g <= 0.03928) ? g / 12.92 : Math[_pow](((g + 0.055) / 1.055), 2.4);
        b = (b <= 0.03928) ? b / 12.92 : Math[_pow](((b + 0.055) / 1.055), 2.4);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    },
    [_genCSS]: function (context, output) { 
        output[_add](this[_toCSS](context));
    },
    [_toCSS]: function (context, doNotCompress) { 
        var compress = context && context[_compress] && !doNotCompress;
        var color;
        var alpha;
        var colorFunction;
        var args = [];
        // `value` is set if this color was originally
        // converted from a named color string so we need
        // to respect this and try to output named color too.
        alpha = this[_fround](context, this[_alpha]);
        if (this[_value]) { 
            if (this[_value][_indexOf](_rgb) === 0) { 
                if (alpha < 1) { 
                    colorFunction = _rgba;
                }
            }
            else if (this[_value][_indexOf](_hsl) === 0) { 
                if (alpha < 1) { 
                    colorFunction = _hsla;
                }
                else { 
                    colorFunction = _hsl;
                }
            }
            else { 
                return this[_value];
            }
        }
        else { 
            if (alpha < 1) { 
                colorFunction = _rgba;
            }
        }
        switch (colorFunction) { 
            case _rgba :
                args = this[_rgb][_map](function (c) { 
                    return clamp(Math[_round](c), 255);
                }) [_concat](clamp(alpha, 1));
                break;
            case _hsla :
                args[_push](clamp(alpha, 1));
            case _hsl :
                color = this[_toHSL]();
                args = [
                    this[_fround](context, color[_h]),
                    this[_fround](context, color[_s] * 100) + _27,
                    this[_fround](context, color[_l] * 100) + _27
                ] [_concat](args);
        }
        if (colorFunction) { 
            // Values are capped between `0` and `255`, rounded and zero-padded.
            return colorFunction + _26 + args[_join](_22 + (compress ? '' : _14)) + _23;
        }
        color = this[_toRGB]();
        if (compress) { 
            var splitcolor = color[_split]('');
            // Convert color to short format
            if (splitcolor[1] === splitcolor[2] && splitcolor[3] === splitcolor[4] && splitcolor[5] === splitcolor[6]) { 
                color = _25 + splitcolor[1] + splitcolor[3] + splitcolor[5];
            }
        }
        return color;
    },
    //
    // Operations have to be done per-channel, if not,
    // channels will spill onto each other. Once we have
    // our result, in the form of an integer triplet,
    // we create a new Color node to hold the result.
    //
    [_operate1]: function (context, op, other) { 
        var rgb = new Array(3);
        var alpha = this[_alpha] * (1 - other[_alpha]) + other[_alpha];
        for (var c = 0; c < 3; c++) { 
            rgb[c] = this[_operate](context, op, this[_rgb][c], other[_rgb][c]);
        }
        return new Color(rgb, alpha);
    },
    [_toRGB]: function () { 
        return toHex(this[_rgb]);
    },
    [_toHSL]: function () { 
        var r = this[_rgb][0] / 255, g = this[_rgb][1] / 255, b = this[_rgb][2] / 255, a = this[_alpha];
        var max = Math[_max](r, g, b), min = Math[_min](r, g, b);
        var h;
        var s;
        var l = (max + min) / 2;
        var d = max - min;
        if (max === min) { 
            h = s = 0;
        }
        else { 
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) { 
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return { [_h]: h * 360, [_s]: s, [_l]: l, [_a]: a };
    },
    // Adapted from http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    [_toHSV]: function () { 
        var r = this[_rgb][0] / 255, g = this[_rgb][1] / 255, b = this[_rgb][2] / 255, a = this[_alpha];
        var max = Math[_max](r, g, b), min = Math[_min](r, g, b);
        var h;
        var s;
        var v = max;
        var d = max - min;
        if (max === 0) { 
            s = 0;
        }
        else { 
            s = d / max;
        }
        if (max === min) { 
            h = 0;
        }
        else { 
            switch (max) { 
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return { [_h]: h * 360, [_s]: s, [_v]: v, [_a]: a };
    },
    [_toARGB]: function () { 
        return toHex([this[_alpha] * 255] [_concat](this[_rgb]));
    },
    [_compare]: function (x) { 
        return (x[_rgb] &&
            x[_rgb][0] === this[_rgb][0] &&
            x[_rgb][1] === this[_rgb][1] &&
            x[_rgb][2] === this[_rgb][2] &&
            x[_alpha] === this[_alpha]) ? 0 : undefined;
    }
});
Color[_fromKeyw] = function (keyword) { 
    var c;
    var key = keyword[_toLowerC]();
    if (colors_1[_default][_hasOwnPr](key)) { 
        c = new Color(colors_1[_default][key] [_slice](1));
    }
    else if (key === _transpar) { 
        c = new Color([0, 0, 0], 0);
    }
    if (c) { 
        c[_value] = keyword;
        return c;
    }
};
function clamp(v, max) { 
    return Math[_min](Math[_max](v, 0), max);
}
function toHex(v) { 
    return _25 + v[_map](function (c) { 
        c = clamp(Math[_round](c), 255);
        return (c < 16 ? _0 : '') + c[_toString](16);
    }) [_join]('');
}
exports[_default] = Color;
//# sourceMappingURL=color.js.map
return exports
}],
/* 1130 string _key */ "key",
/* 1131 string _cif */ "cif",
/* 1132 string _Attribut */ "Attribute",
/* 1133 string _35 */ "[",
/* 1134 string _36 */ "]",
/* 1135 less$tree$attribute.js */ [10,11,1,16,17,18,581,1130,1084,1131,19,525,96,167,1132,158,154,155,153,933,1133,1134,function(Object,exports,require,_definePr,__esModu,_value,__import1,_key,_op,_cif,_prototyp,_assign,_default,_type,_Attribut,_eval,_genCSS,_add,_toCSS,_14,_35,_36){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var Attribute = function (key, op, value, cif) { 
    this[_key] = key;
    this[_op] = op;
    this[_value] = value;
    this[_cif] = cif;
};
Attribute[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Attribut,
    [_eval]: function (context) { 
        return new Attribute(this[_key][_eval] ? this[_key][_eval](context) : this[_key], this[_op], (this[_value] && this[_value][_eval]) ? this[_value][_eval](context) : this[_value], this[_cif]);
    },
    [_genCSS]: function (context, output) { 
        output[_add](this[_toCSS](context));
    },
    [_toCSS]: function (context) { 
        var value = this[_key][_toCSS] ? this[_key][_toCSS](context) : this[_key];
        if (this[_op]) { 
            value += this[_op];
            value += (this[_value][_toCSS] ? this[_value][_toCSS](context) : this[_value]);
        }
        if (this[_cif]) { 
            value = value + _14 + this[_cif];
        }
        return _35 + value + _36;
    }
});
exports[_default] = Attribute;
//# sourceMappingURL=attribute.js.map
return exports
}],
/* 1136 string _Assignme */ "Assignment",
/* 1137 less$tree$assignment.js */ [10,11,1,16,17,18,581,1130,19,525,96,167,1136,131,126,158,154,155,1095,function(Object,exports,require,_definePr,__esModu,_value,__import1,_key,_prototyp,_assign,_default,_type,_Assignme,_accept,_visit,_eval,_genCSS,_add,_31){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var Assignment = function (key, val) { 
    this[_key] = key;
    this[_value] = val;
};
Assignment[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Assignme,
    [_accept]: function (visitor) { 
        this[_value] = visitor[_visit](this[_value]);
    },
    [_eval]: function (context) { 
        if (this[_value][_eval]) { 
            return new Assignment(this[_key], this[_value][_eval](context));
        }
        return this;
    },
    [_genCSS]: function (context, output) { 
        output[_add](this[_key] + _31);
        if (this[_value][_genCSS]) { 
            this[_value][_genCSS](context, output);
        }
        else { 
            output[_add](this[_value]);
        }
    }
});
exports[_default] = Assignment;
//# sourceMappingURL=assignment.js.map
return exports
}],
/* 1138 string _mapLines */ "mapLines",
/* 1139 string _rulesetL */ "rulesetLike",
/* 1140 less$tree$anonymous.js */ [10,11,1,123,15,16,17,18,581,150,151,1138,1139,929,1100,175,19,525,96,167,169,158,174,166,153,152,154,138,155,function(Object,exports,require,undefined,Boolean,_definePr,__esModu,_value,__import1,_index1,_fileInf,_mapLines,_rulesetL,_undefine,_allowRoo,_copyVisi,_prototyp,_assign,_default,_type,_Anonymou,_eval,_visibili1,_compare,_toCSS,_isRulese,_genCSS,_nodeVisi,_add){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var Anonymous = function (value, index, currentFileInfo, mapLines, rulesetLike, visibilityInfo) { 
    this[_value] = value;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_mapLines] = mapLines;
    this[_rulesetL] = (typeof rulesetLike === _undefine) ? false : rulesetLike;
    this[_allowRoo] = true;
    this[_copyVisi](visibilityInfo);
};
Anonymous[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Anonymou,
    [_eval]: function () { 
        return new Anonymous(this[_value], this[_index1], this[_fileInf], this[_mapLines], this[_rulesetL], this[_visibili1]());
    },
    [_compare]: function (other) { 
        return other[_toCSS] && this[_toCSS]() === other[_toCSS]() ? 0 : undefined;
    },
    [_isRulese]: function () { 
        return this[_rulesetL];
    },
    [_genCSS]: function (context, output) { 
        this[_nodeVisi] = Boolean(this[_value]);
        if (this[_nodeVisi]) { 
            output[_add](this[_value], this[_fileInf], this[_index1], this[_mapLines]);
        }
    }
});
exports[_default] = Anonymous;
//# sourceMappingURL=anonymous.js.map
return exports
}],
/* 1141 string _value_ */ "value_",
/* 1142 string _error_ */ "error_",
/* 1143 less$functions$default.js */ [10,11,1,16,17,18,581,158,1141,1142,96,1074,1076,544,937,function(Object,exports,require,_definePr,__esModu,_value,__import1,_eval,_value_,_error_,_default,_True,_False,_error,_reset){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var keyword_1 = tslib_1[__import1](require(1078));
var defaultFunc = { 
    [_eval]: function () { 
        var v = this[_value_];
        var e = this[_error_];
        if (e) { 
            throw e;
        }
        if (v != null) { 
            return v ? keyword_1[_default][_True] : keyword_1[_default][_False];
        }
    },
    [_value]: function (v) { 
        this[_value_] = v;
    },
    [_error]: function (e) { 
        this[_error_] = e;
    },
    [_reset]: function () { 
        this[_value_] = this[_error_] = null;
    }
};
exports[_default] = defaultFunc;
//# sourceMappingURL=default.js.map
return exports
}],
/* 1144 string _multiply */ "multiply",
/* 1145 string _screen */ "screen",
/* 1146 string _overlay */ "overlay",
/* 1147 string _softligh */ "softlight",
/* 1148 string _sqrt */ "sqrt",
/* 1149 string _hardligh */ "hardlight",
/* 1150 string _differen */ "difference",
/* 1151 string _abs */ "abs",
/* 1152 string _exclusio */ "exclusion",
/* 1153 string _average */ "average",
/* 1154 string _negation */ "negation",
/* 1155 less$functions$color-blending.js */ [10,11,1,177,16,17,18,581,1110,1108,96,1144,1145,1146,1147,1148,1149,1150,1151,1152,1153,1154,46,948,function(Object,exports,require,Math,_definePr,__esModu,_value,__import1,_alpha,_rgb,_default,_multiply,_screen,_overlay,_softligh,_sqrt,_hardligh,_differen,_abs,_exclusio,_average,_negation,_hasOwnPr,_bind){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var color_1 = tslib_1[__import1](require(1129));
// Color Blending
// ref: http://www.w3.org/TR/compositing-1
function colorBlend(mode, color1, color2) { 
    var ab = color1[_alpha]; // result
    var // backdrop
    cb;
    var as = color2[_alpha];
    var // source
    cs;
    var ar;
    var cr;
    var r = [];
    ar = as + ab * (1 - as);
    for (var i = 0; i < 3; i++) { 
        cb = color1[_rgb][i] / 255;
        cs = color2[_rgb][i] / 255;
        cr = mode(cb, cs);
        if (ar) { 
            cr = (as * cs + ab * (cb -
                as * (cb + cs - cr))) / ar;
        }
        r[i] = cr * 255;
    }
    return new color_1[_default](r, ar);
}
var colorBlendModeFunctions = { 
    [_multiply]: function (cb, cs) { 
        return cb * cs;
    },
    [_screen]: function (cb, cs) { 
        return cb + cs - cb * cs;
    },
    [_overlay]: function (cb, cs) { 
        cb *= 2;
        return (cb <= 1) ?
            colorBlendModeFunctions[_multiply](cb, cs) :
            colorBlendModeFunctions[_screen](cb - 1, cs);
    },
    [_softligh]: function (cb, cs) { 
        var d = 1;
        var e = cb;
        if (cs > 0.5) { 
            e = 1;
            d = (cb > 0.25) ? Math[_sqrt](cb)
                : ((16 * cb - 12) * cb + 4) * cb;
        }
        return cb - (1 - 2 * cs) * e * (d - cb);
    },
    [_hardligh]: function (cb, cs) { 
        return colorBlendModeFunctions[_overlay](cs, cb);
    },
    [_differen]: function (cb, cs) { 
        return Math[_abs](cb - cs);
    },
    [_exclusio]: function (cb, cs) { 
        return cb + cs - 2 * cb * cs;
    },
    // non-w3c functions:
    [_average]: function (cb, cs) { 
        return (cb + cs) / 2;
    },
    [_negation]: function (cb, cs) { 
        return 1 - Math[_abs](cb + cs - 1);
    }
};
for (var f in colorBlendModeFunctions) { 
    if (colorBlendModeFunctions[_hasOwnPr](f)) { 
        colorBlend[f] = colorBlend[_bind](null, colorBlendModeFunctions[f]);
    }
}
exports[_default] = colorBlend;
//# sourceMappingURL=color-blending.js.map
return exports
}],
/* 1156 string _evalArgs */ "evalArgs",
/* 1157 string _isdefine */ "isdefined",
/* 1158 string _boolean */ "boolean",
/* 1159 string _if */ "if",
/* 1160 less$functions$boolean.js */ [10,11,1,16,17,18,581,96,1074,1076,158,1156,1157,1158,1159,function(Object,exports,require,_definePr,__esModu,_value,__import1,_default,_True,_False,_eval,_evalArgs,_isdefine,_boolean,_if){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var anonymous_1 = tslib_1[__import1](require(1140));
var keyword_1 = tslib_1[__import1](require(1078));
function boolean(condition) { 
    return condition ? keyword_1[_default][_True] : keyword_1[_default][_False];
}
/**
 * Functions with evalArgs set to false are sent context
 * as the first argument.
 */
function If(context, condition, trueValue, falseValue) { 
    return condition[_eval](context) ? trueValue[_eval](context)
        : (falseValue ? falseValue[_eval](context) : new anonymous_1[_default]);
}
If[_evalArgs] = false;
function isdefined(context, variable) { 
    try { 
        variable[_eval](context);
        return keyword_1[_default][_True];
    }
    catch (e) { 
        return keyword_1[_default][_False];
    }
}
isdefined[_evalArgs] = false;
exports[_default] = { [_isdefine]: isdefined, [_boolean]: boolean, [_if]: If };
//# sourceMappingURL=boolean.js.map
return exports
}],
/* 1161 string _i1 */ "i",
/* 1162 string _autoComm */ "autoCommentAbsorb",
/* 1163 string _text */ "text",
/* 1164 string _commentS */ "commentStore",
/* 1165 string _37 */ "*/",
/* 1166 string _finished */ "finished",
/* 1167 string _save */ "save",
/* 1168 string _current1 */ "current",
/* 1169 string _j */ "j",
/* 1170 string _restore */ "restore",
/* 1171 string _forget */ "forget",
/* 1172 string _isWhites */ "isWhitespace",
/* 1173 string _$re */ "$re",
/* 1174 string _$char */ "$char",
/* 1175 string _$str */ "$str",
/* 1176 string _$quoted */ "$quoted",
/* 1177 string _38 */ "\"",
/* 1178 string _39 */ /* text */ "\r",
/* 1179 string _$parseUn */ "$parseUntil",
/* 1180 string _40 */ "{",
/* 1181 string _41 */ "}",
/* 1182 string _peek */ "peek",
/* 1183 string _peekChar */ "peekChar",
/* 1184 string _currentC */ "currentChar",
/* 1185 string _prevChar */ "prevChar",
/* 1186 string _getInput1 */ "getInput",
/* 1187 string _peekNotN */ "peekNotNumeric",
/* 1188 string _start */ "start",
/* 1189 string _end */ "end",
/* 1190 string _isFinish */ "isFinished",
/* 1191 string _furthest */ "furthest",
/* 1192 string _furthest1 */ "furthestPossibleErrorMessage",
/* 1193 string _furthest2 */ "furthestReachedEnd",
/* 1194 string _furthest3 */ "furthestChar",
/* 1195 less$parser$parser-input.js */ [10,11,1,16,17,18,581,96,1161,2,180,1162,620,111,146,1099,3,621,1163,934,1164,93,162,1165,22,1166,1167,1168,1169,1170,540,1171,1172,1173,5,4,1174,1175,1176,999,1177,110,1178,1179,105,933,1180,1181,1069,1046,1133,1134,1182,1183,1184,1185,1186,1187,1188,1189,1190,1191,1192,1193,1194,function(Object,exports,require,_definePr,__esModu,_value,__import1,_default,_i1,_length,_charCode,_autoComm,_charAt,_4,_index,_isLineCo,_indexOf,_10,_text,_substr,_commentS,_push,_8,_37,_slice,_finished,_save,_current1,_j,_restore,_pop,_forget,_isWhites,_$re,_exec,_string,_$char,_$str,_$quoted,_19,_38,_3,_39,_$parseUn,_test,_14,_40,_41,_26,_23,_35,_36,_peek,_peekChar,_currentC,_prevChar,_getInput1,_peekNotN,_start,_end,_isFinish,_furthest,_furthest1,_furthest2,_furthest3){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var chunker_1 = tslib_1[__import1](require(192));
exports[_default] = (function () { 
    var // Less input string
    input;
    var // current chunk
    j;
    var // holds state for backtracking
    saveStack = [];
    var // furthest index the parser has gone to
    furthest;
    var // if this is furthest we got to, this is the probably cause
    furthestPossibleErrorMessage;
    var // chunkified input
    chunks;
    var // current chunk
    current;
    var // index of current chunk, in `input`
    currentPos;
    var parserInput = {};
    var CHARCODE_SPACE = 32;
    var CHARCODE_TAB = 9;
    var CHARCODE_LF = 10;
    var CHARCODE_CR = 13;
    var CHARCODE_PLUS = 43;
    var CHARCODE_COMMA = 44;
    var CHARCODE_FORWARD_SLASH = 47;
    var CHARCODE_9 = 57;
    function skipWhitespace(length) { 
        var oldi = parserInput[_i1];
        var oldj = j;
        var curr = parserInput[_i1] - currentPos;
        var endIndex = parserInput[_i1] + current[_length] - curr;
        var mem = (parserInput[_i1] += length);
        var inp = input;
        var c;
        var nextChar;
        var comment;
        for (; parserInput[_i1] < endIndex; parserInput[_i1]++) { 
            c = inp[_charCode](parserInput[_i1]);
            if (parserInput[_autoComm] && c === CHARCODE_FORWARD_SLASH) { 
                nextChar = inp[_charAt](parserInput[_i1] + 1);
                if (nextChar === _4) { 
                    comment = { [_index]: parserInput[_i1], [_isLineCo]: true };
                    var nextNewLine = inp[_indexOf](_10, parserInput[_i1] + 2);
                    if (nextNewLine < 0) { 
                        nextNewLine = endIndex;
                    }
                    parserInput[_i1] = nextNewLine;
                    comment[_text] = inp[_substr](comment[_index], parserInput[_i1] - comment[_index]);
                    parserInput[_commentS][_push](comment);
                    continue;
                }
                else if (nextChar === _8) { 
                    var nextStarSlash = inp[_indexOf](_37, parserInput[_i1] + 2);
                    if (nextStarSlash >= 0) { 
                        comment = { 
                            [_index]: parserInput[_i1],
                            [_text]: inp[_substr](parserInput[_i1], nextStarSlash + 2 - parserInput[_i1]),
                            [_isLineCo]: false
                        };
                        parserInput[_i1] += comment[_text][_length] - 1;
                        parserInput[_commentS][_push](comment);
                        continue;
                    }
                }
                break;
            }
            if ((c !== CHARCODE_SPACE) && (c !== CHARCODE_LF) && (c !== CHARCODE_TAB) && (c !== CHARCODE_CR)) { 
                break;
            }
        }
        current = current[_slice](length + parserInput[_i1] - mem + curr);
        currentPos = parserInput[_i1];
        if (!current[_length]) { 
            if (j < chunks[_length] - 1) { 
                current = chunks[++j];
                skipWhitespace(0); // skip space at the beginning of a chunk
                return true; // things changed
            }
            parserInput[_finished] = true;
        }
        return oldi !== parserInput[_i1] || oldj !== j;
    }
    parserInput[_save] = function () { 
        currentPos = parserInput[_i1];
        saveStack[_push]({ [_current1]: current, [_i1]: parserInput[_i1], [_j]: j });
    };
    parserInput[_restore] = function (possibleErrorMessage) { 
        if (parserInput[_i1] > furthest || (parserInput[_i1] === furthest && possibleErrorMessage && !furthestPossibleErrorMessage)) { 
            furthest = parserInput[_i1];
            furthestPossibleErrorMessage = possibleErrorMessage;
        }
        var state = saveStack[_pop]();
        current = state[_current1];
        currentPos = parserInput[_i1] = state[_i1];
        j = state[_j];
    };
    parserInput[_forget] = function () { 
        saveStack[_pop]();
    };
    parserInput[_isWhites] = function (offset) { 
        var pos = parserInput[_i1] + (offset || 0);
        var code = input[_charCode](pos);
        return (code === CHARCODE_SPACE || code === CHARCODE_CR || code === CHARCODE_TAB || code === CHARCODE_LF);
    };
    // Specialization of $(tok)
    parserInput[_$re] = function (tok) { 
        if (parserInput[_i1] > currentPos) { 
            current = current[_slice](parserInput[_i1] - currentPos);
            currentPos = parserInput[_i1];
        }
        var m = tok[_exec](current);
        if (!m) { 
            return null;
        }
        skipWhitespace(m[0] [_length]);
        if (typeof m === _string) { 
            return m;
        }
        return m[_length] === 1 ? m[0] : m;
    };
    parserInput[_$char] = function (tok) { 
        if (input[_charAt](parserInput[_i1]) !== tok) { 
            return null;
        }
        skipWhitespace(1);
        return tok;
    };
    parserInput[_$str] = function (tok) { 
        var tokLength = tok[_length];
        // https://jsperf.com/string-startswith/21
        for (var i = 0; i < tokLength; i++) { 
            if (input[_charAt](parserInput[_i1] + i) !== tok[_charAt](i)) { 
                return null;
            }
        }
        skipWhitespace(tokLength);
        return tok;
    };
    parserInput[_$quoted] = function (loc) { 
        var pos = loc || parserInput[_i1];
        var startChar = input[_charAt](pos);
        if (startChar !== _19 && startChar !== _38) { 
            return;
        }
        var length = input[_length];
        var currentPosition = pos;
        for (var i = 1; i + currentPosition < length; i++) { 
            var nextChar = input[_charAt](i + currentPosition);
            switch (nextChar) { 
                case _3 :
                    i++;
                    continue;
                case _39 :
                case _10 :
                    break;
                case startChar:
                    var str = input[_substr](currentPosition, i + 1);
                    if (!loc && loc !== 0) { 
                        skipWhitespace(i + 1);
                        return str;
                    }
                    return [startChar, str];
                default:
            }
        }
        return null;
    };
    /**
     * Permissive parsing. Ignores everything except matching {} [] () and quotes
     * until matching token (outside of blocks)
     */
    parserInput[_$parseUn] = function (tok) { 
        var quote = '';
        var returnVal = null;
        var inComment = false;
        var blockDepth = 0;
        var blockStack = [];
        var parseGroups = [];
        var length = input[_length];
        var startPos = parserInput[_i1];
        var lastPos = parserInput[_i1];
        var i = parserInput[_i1];
        var loop = true;
        var testChar;
        if (typeof tok === _string) { 
            testChar = function (char) { return char === tok; };
        }
        else { 
            testChar = function (char) { return tok[_test](char); };
        }
        do { 
            var prevChar = void 0;
            var nextChar = input[_charAt](i);
            if (blockDepth === 0 && testChar(nextChar)) { 
                returnVal = input[_substr](lastPos, i - lastPos);
                if (returnVal) { 
                    parseGroups[_push](returnVal);
                }
                else { 
                    parseGroups[_push](_14);
                }
                returnVal = parseGroups;
                skipWhitespace(i - startPos);
                loop = false;
            }
            else { 
                if (inComment) { 
                    if (nextChar === _8 &&
                        input[_charAt](i + 1) === _4) { 
                        i++;
                        blockDepth--;
                        inComment = false;
                    }
                    i++;
                    continue;
                }
                switch (nextChar) { 
                    case _3 :
                        i++;
                        nextChar = input[_charAt](i);
                        parseGroups[_push](input[_substr](lastPos, i - lastPos + 1));
                        lastPos = i + 1;
                        break;
                    case _4 :
                        if (input[_charAt](i + 1) === _8) { 
                            i++;
                            inComment = true;
                            blockDepth++;
                        }
                        break;
                    case _19 :
                    case _38 :
                        quote = parserInput[_$quoted](i);
                        if (quote) { 
                            parseGroups[_push](input[_substr](lastPos, i - lastPos), quote);
                            i += quote[1] [_length] - 1;
                            lastPos = i + 1;
                        }
                        else { 
                            skipWhitespace(i - startPos);
                            returnVal = nextChar;
                            loop = false;
                        }
                        break;
                    case _40 :
                        blockStack[_push](_41);
                        blockDepth++;
                        break;
                    case _26 :
                        blockStack[_push](_23);
                        blockDepth++;
                        break;
                    case _35 :
                        blockStack[_push](_36);
                        blockDepth++;
                        break;
                    case _41 :
                    case _23 :
                    case _36 :
                        var expected = blockStack[_pop]();
                        if (nextChar === expected) { 
                            blockDepth--;
                        }
                        else { 
                            // move the parser to the error and return expected
                            skipWhitespace(i - startPos);
                            returnVal = expected;
                            loop = false;
                        }
                }
                i++;
                if (i > length) { 
                    loop = false;
                }
            }
            prevChar = nextChar;
        } while (loop);
        return returnVal ? returnVal : null;
    };
    parserInput[_autoComm] = true;
    parserInput[_commentS] = [];
    parserInput[_finished] = false;
    // Same as $(), but don't change the state of the parser,
    // just return the match.
    parserInput[_peek] = function (tok) { 
        if (typeof tok === _string) { 
            // https://jsperf.com/string-startswith/21
            for (var i = 0; i < tok[_length]; i++) { 
                if (input[_charAt](parserInput[_i1] + i) !== tok[_charAt](i)) { 
                    return false;
                }
            }
            return true;
        }
        else { 
            return tok[_test](current);
        }
    };
    // Specialization of peek()
    // TODO remove or change some currentChar calls to peekChar
    parserInput[_peekChar] = function (tok) { return input[_charAt](parserInput[_i1]) === tok; };
    parserInput[_currentC] = function () { return input[_charAt](parserInput[_i1]); };
    parserInput[_prevChar] = function () { return input[_charAt](parserInput[_i1] - 1); };
    parserInput[_getInput1] = function () { return input; };
    parserInput[_peekNotN] = function () { 
        var c = input[_charCode](parserInput[_i1]);
        // Is the first char of the dimension 0-9, '.', '+' or '-'
        return (c > CHARCODE_9 || c < CHARCODE_PLUS) || c === CHARCODE_FORWARD_SLASH || c === CHARCODE_COMMA;
    };
    parserInput[_start] = function (str, chunkInput, failFunction) { 
        input = str;
        parserInput[_i1] = j = currentPos = furthest = 0;
        // chunking apparently makes things quicker (but my tests indicate
        // it might actually make things slower in node at least)
        // and it is a non-perfect parse - it can't recognise
        // unquoted urls, meaning it can't distinguish comments
        // meaning comments with quotes or {}() in them get 'counted'
        // and then lead to parse errors.
        // In addition if the chunking chunks in the wrong place we might
        // not be able to parse a parser statement in one go
        // this is officially deprecated but can be switched on via an option
        // in the case it causes too much performance issues.
        if (chunkInput) { 
            chunks = chunker_1[_default](str, failFunction);
        }
        else { 
            chunks = [str];
        }
        current = chunks[0];
        skipWhitespace(0);
    };
    parserInput[_end] = function () { 
        var message;
        var isFinished = parserInput[_i1] >= input[_length];
        if (parserInput[_i1] < furthest) { 
            message = furthestPossibleErrorMessage;
            parserInput[_i1] = furthest;
        }
        return { 
            [_isFinish]: isFinished,
            [_furthest]: parserInput[_i1],
            [_furthest1]: message,
            [_furthest2]: parserInput[_i1] >= input[_length] - 1,
            [_furthest3]: input[parserInput[_i1]]
        };
    };
    return parserInput;
});
//# sourceMappingURL=parser-input.js.map
return exports
}],
/* 1196 string _colors */ "colors",
/* 1197 string _unitConv */ "unitConversions",
/* 1198 less$data$index.js */ [10,11,1,16,17,18,581,96,1196,1197,function(Object,exports,require,_definePr,__esModu,_value,__import1,_default,_colors,_unitConv){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var colors_1 = tslib_1[__import1](require(499));
var unit_conversions_1 = tslib_1[__import1](require(211));
exports[_default] = { [_colors]: colors_1[_default], [_unitConv]: unit_conversions_1[_default] };
//# sourceMappingURL=index.js.map
return exports
}],
/* 1199 less$data */ [1,function(require){
return require(1198)
}],
/* 1200 string _combinat */ "combinator",
/* 1201 string _isVariab */ "isVariable",
/* 1202 string _Element */ "Element",
/* 1203 string _firstSel */ "firstSelector",
/* 1204 less$tree$element.js */ [10,11,1,16,17,18,581,1200,96,4,1085,1201,150,151,175,148,19,525,167,1202,131,126,517,158,147,143,174,617,154,155,153,1203,620,1049,function(Object,exports,require,_definePr,__esModu,_value,__import1,_combinat,_default,_string,_trim,_isVariab,_index1,_fileInf,_copyVisi,_setParen,_prototyp,_assign,_type,_Element,_accept,_visit,_object,_eval,_getIndex,_fileInfo,_visibili1,_clone,_genCSS,_add,_toCSS,_firstSel,_charAt,_24){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var paren_1 = tslib_1[__import1](require(1070));
var combinator_1 = tslib_1[__import1](require(1107));
var Element = function (combinator, value, isVariable, index, currentFileInfo, visibilityInfo) { 
    this[_combinat] = combinator instanceof combinator_1[_default] ?
        combinator : new combinator_1[_default](combinator);
    if (typeof value === _string) { 
        this[_value] = value[_trim]();
    }
    else if (value) { 
        this[_value] = value;
    }
    else { 
        this[_value] = '';
    }
    this[_isVariab] = isVariable;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_copyVisi](visibilityInfo);
    this[_setParen](this[_combinat], this);
};
Element[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Element,
    [_accept]: function (visitor) { 
        var value = this[_value];
        this[_combinat] = visitor[_visit](this[_combinat]);
        if (typeof value === _object) { 
            this[_value] = visitor[_visit](value);
        }
    },
    [_eval]: function (context) { 
        return new Element(this[_combinat], this[_value][_eval] ? this[_value][_eval](context) : this[_value], this[_isVariab], this[_getIndex](), this[_fileInfo](), this[_visibili1]());
    },
    [_clone]: function () { 
        return new Element(this[_combinat], this[_value], this[_isVariab], this[_getIndex](), this[_fileInfo](), this[_visibili1]());
    },
    [_genCSS]: function (context, output) { 
        output[_add](this[_toCSS](context), this[_fileInfo](), this[_getIndex]());
    },
    [_toCSS]: function (context) { 
        context = context || {};
        var value = this[_value];
        var firstSelector = context[_firstSel];
        if (value instanceof paren_1[_default]) { 
            // selector in parens should not be affected by outer selector
            // flags (breaks only interpolated selectors - see rgba(17,153,119,0.2000))
            context[_firstSel] = true;
        }
        value = value[_toCSS] ? value[_toCSS](context) : value;
        context[_firstSel] = firstSelector;
        if (value === '' && this[_combinat][_value][_charAt](0) === _24) { 
            return '';
        }
        else { 
            return this[_combinat][_toCSS](context) + value;
        }
    }
});
exports[_default] = Element;
//# sourceMappingURL=element.js.map
return exports
}],
/* 1205 string _Dimensio */ /* text */ "Dimension is not a number.",
/* 1206 string _unit */ "unit",
/* 1207 string _Dimensio1 */ "Dimension",
/* 1208 string _toColor */ "toColor",
/* 1209 string _Multiple */ /* text */ "Multiple units in dimension. Correct the units or use the unit function. Bad unit: ",
/* 1210 regexp _0_$_ */ /0+$/,
/* 1211 string _convertT */ "convertTo",
/* 1212 string _Incompat */ /* text */ "Incompatible units. Change the units or use the unit function. ",
/* 1213 string _Bad_unit */ /* text */ "Bad units: '",
/* 1214 string _and_ */ /* text */ "' and '",
/* 1215 string _42 */ "'.",
/* 1216 string _unify */ "unify",
/* 1217 less$tree$dimension.js */ [10,11,1,120,12,133,123,178,16,17,18,581,1205,1206,96,148,19,525,167,1207,131,126,158,1208,154,1015,1062,1209,20,163,165,108,1210,115,1059,155,934,1122,159,617,160,161,1052,2,1054,1055,1211,1063,1212,1213,1214,1215,162,8,1053,1064,111,166,156,1216,170,199,202,203,205,206,4,46,503,function(Object,exports,require,parseFloat,isNaN,Error,undefined,String,_definePr,__esModu,_value,__import1,_Dimensio,_unit,_default,_setParen,_prototyp,_assign,_type,_Dimensio1,_accept,_visit,_eval,_toColor,_genCSS,_strictUn,_isSingul,_Multiple,_toString,_fround,_toFixed,_replace,_0_$_,_compress,_isLength,_add,_substr,_operate1,_operate,_clone,_6,_7,_numerato,_length,_denomina,_backupUn,_convertT,_usedUnit,_Incompat,_Bad_unit,_and_,_42,_8,_concat,_sort,_cancel,_4,_compare,_isEmpty,_unify,_numericC,_px,_duration,_s,_angle,_rad,_string,_hasOwnPr,_map){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var unit_conversions_1 = tslib_1[__import1](require(211));
var unit_1 = tslib_1[__import1](require(1065));
var color_1 = tslib_1[__import1](require(1129));
//
// A number with a unit
//
var Dimension = function (value, unit) { 
    this[_value] = parseFloat(value);
    if (isNaN(this[_value])) { 
        throw new Error(_Dimensio);
    }
    this[_unit] = (unit && unit instanceof unit_1[_default]) ? unit :
        new unit_1[_default](unit ? [unit] : undefined);
    this[_setParen](this[_unit], this);
};
Dimension[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Dimensio1,
    [_accept]: function (visitor) { 
        this[_unit] = visitor[_visit](this[_unit]);
    },
    [_eval]: function (context) { 
        return this;
    },
    [_toColor]: function () { 
        return new color_1[_default]([this[_value], this[_value], this[_value]]);
    },
    [_genCSS]: function (context, output) { 
        if ((context && context[_strictUn]) && !this[_unit][_isSingul]()) { 
            throw new Error(_Multiple + this[_unit][_toString]());
        }
        var value = this[_fround](context, this[_value]);
        var strValue = String(value);
        if (value !== 0 && value < 0.000001 && value > -0.000001) { 
            // would be output 1e-6 etc.
            strValue = value[_toFixed](20) [_replace](_0_$_, '');
        }
        if (context && context[_compress]) { 
            // Zero values doesn't need a unit
            if (value === 0 && this[_unit][_isLength]()) { 
                output[_add](strValue);
                return;
            }
            // Float values doesn't need a leading zero
            if (value > 0 && value < 1) { 
                strValue = (strValue) [_substr](1);
            }
        }
        output[_add](strValue);
        this[_unit][_genCSS](context, output);
    },
    // In an operation between two Dimensions,
    // we default to the first Dimension's unit,
    // so `1px + 2` will yield `3px`.
    [_operate1]: function (context, op, other) { 
        /* jshint noempty:false */
        var value = this[_operate](context, op, this[_value], other[_value]);
        var unit = this[_unit][_clone]();
        if (op === _6 || op === _7) { 
            if (unit[_numerato][_length] === 0 && unit[_denomina][_length] === 0) { 
                unit = other[_unit][_clone]();
                if (this[_unit][_backupUn]) { 
                    unit[_backupUn] = this[_unit][_backupUn];
                }
            }
            else if (other[_unit][_numerato][_length] === 0 && unit[_denomina][_length] === 0) { 
                // do nothing
            }
            else { 
                other = other[_convertT](this[_unit][_usedUnit]());
                if (context[_strictUn] && other[_unit][_toString]() !== unit[_toString]()) { 
                    throw new Error(_Incompat
                        + (_Bad_unit + unit[_toString]() + _and_ + other[_unit][_toString]() + _42));
                }
                value = this[_operate](context, op, this[_value], other[_value]);
            }
        }
        else if (op === _8) { 
            unit[_numerato] = unit[_numerato][_concat](other[_unit][_numerato]) [_sort]();
            unit[_denomina] = unit[_denomina][_concat](other[_unit][_denomina]) [_sort]();
            unit[_cancel]();
        }
        else if (op === _4) { 
            unit[_numerato] = unit[_numerato][_concat](other[_unit][_denomina]) [_sort]();
            unit[_denomina] = unit[_denomina][_concat](other[_unit][_numerato]) [_sort]();
            unit[_cancel]();
        }
        return new Dimension(value, unit);
    },
    [_compare]: function (other) { 
        var a, b;
        if (!(other instanceof Dimension)) { 
            return undefined;
        }
        if (this[_unit][_isEmpty]() || other[_unit][_isEmpty]()) { 
            a = this;
            b = other;
        }
        else { 
            a = this[_unify]();
            b = other[_unify]();
            if (a[_unit][_compare](b[_unit]) !== 0) { 
                return undefined;
            }
        }
        return node_1[_default][_numericC](a[_value], b[_value]);
    },
    [_unify]: function () { 
        return this[_convertT]({ [_length]: _px, [_duration]: _s, [_angle]: _rad });
    },
    [_convertT]: function (conversions) { 
        var value = this[_value];
        var unit = this[_unit][_clone]();
        var i;
        var groupName;
        var group;
        var targetUnit;
        var derivedConversions = {};
        var applyUnit;
        if (typeof conversions === _string) { 
            for (i in unit_conversions_1[_default]) { 
                if (unit_conversions_1[_default][i] [_hasOwnPr](conversions)) { 
                    derivedConversions = {};
                    derivedConversions[i] = conversions;
                }
            }
            conversions = derivedConversions;
        }
        applyUnit = function (atomicUnit, denominator) { 
            /* jshint loopfunc:true */
            if (group[_hasOwnPr](atomicUnit)) { 
                if (denominator) { 
                    value = value / (group[atomicUnit] / group[targetUnit]);
                }
                else { 
                    value = value * (group[atomicUnit] / group[targetUnit]);
                }
                return targetUnit;
            }
            return atomicUnit;
        };
        for (groupName in conversions) { 
            if (conversions[_hasOwnPr](groupName)) { 
                targetUnit = conversions[groupName];
                group = unit_conversions_1[_default][groupName];
                unit[_map](applyUnit);
            }
        }
        unit[_cancel]();
        return new Dimension(value, unit);
    }
});
exports[_default] = Dimension;
//# sourceMappingURL=dimension.js.map
return exports
}],
/* 1218 string _importan1 */ "important",
/* 1219 string _inline */ "inline",
/* 1220 string _variable2 */ "variable",
/* 1221 string _43 */ "@",
/* 1222 string _Declarat */ "Declaration",
/* 1223 string _44 */ /* text */ ": ",
/* 1224 string _lastRule */ "lastRule",
/* 1225 string _45 */ ";",
/* 1226 string _font */ "font",
/* 1227 string _Rulesets */ /* text */ "Rulesets cannot be evaluated on a property.",
/* 1228 string _makeImpo */ "makeImportant",
/* 1229 string _importa */ "!important",
/* 1230 less$tree$declaration.js */ [10,11,1,123,16,17,18,581,580,602,2,155,158,154,48,96,1218,933,1085,614,150,151,1219,1220,620,1221,1100,148,19,525,167,1222,115,942,1223,143,147,146,663,1224,1225,4,1226,627,603,604,1019,93,1080,922,1227,540,541,1228,1229,function(Object,exports,require,undefined,_definePr,__esModu,_value,__import1,__import,_Math,_length,_add,_eval,_genCSS,_name,_default,_importan1,_14,_trim,_merge,_index1,_fileInf,_inline,_variable2,_charAt,_43,_allowRoo,_setParen,_prototyp,_assign,_type,_Declarat,_compress,_15,_44,_fileInfo,_getIndex,_index,_filename,_lastRule,_45,_string,_font,_math,_ALWAYS,_PARENS_D,_importan,_push,_Detached,_message,_Rulesets,_pop,_number,_makeImpo,_importa){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var value_1 = tslib_1[__import1](require(1041));
var keyword_1 = tslib_1[__import1](require(1078));
var anonymous_1 = tslib_1[__import1](require(1140));
var Constants = tslib_1[__import](require(609));
var MATH = Constants[_Math];
function evalName(context, name) { 
    var value = '';
    var i;
    var n = name[_length];
    var output = { [_add]: function (s) { value += s; } };
    for (i = 0; i < n; i++) { 
        name[i] [_eval](context) [_genCSS](context, output);
    }
    return value;
}
var Declaration = function (name, value, important, merge, index, currentFileInfo, inline, variable) { 
    this[_name] = name;
    this[_value] = (value instanceof node_1[_default]) ? value : new value_1[_default]([value ? new anonymous_1[_default](value) : null]);
    this[_importan1] = important ? _14 + important[_trim]() : '';
    this[_merge] = merge;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_inline] = inline || false;
    this[_variable2] = (variable !== undefined) ? variable
        : (name[_charAt] && (name[_charAt](0) === _43));
    this[_allowRoo] = true;
    this[_setParen](this[_value], this);
};
Declaration[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Declarat,
    [_genCSS]: function (context, output) { 
        output[_add](this[_name] + (context[_compress] ? _15 : _44), this[_fileInfo](), this[_getIndex]());
        try { 
            this[_value][_genCSS](context, output);
        }
        catch (e) { 
            e[_index] = this[_index1];
            e[_filename] = this[_fileInf][_filename];
            throw e;
        }
        output[_add](this[_importan1] + ((this[_inline] || (context[_lastRule] && context[_compress])) ? '' : _45), this[_fileInf], this[_index1]);
    },
    [_eval]: function (context) { 
        var mathBypass = false, prevMath, name = this[_name], evaldValue, variable = this[_variable2];
        if (typeof name !== _string) { 
            // expand 'primitive' name directly to get
            // things faster (~10% for benchmark.less):
            name = (name[_length] === 1) && (name[0] instanceof keyword_1[_default]) ?
                name[0] [_value] : evalName(context, name);
            variable = false; // never treat expanded interpolation as new variable name
        }
        // @todo remove when parens-division is default
        if (name === _font && context[_math] === MATH[_ALWAYS]) { 
            mathBypass = true;
            prevMath = context[_math];
            context[_math] = MATH[_PARENS_D];
        }
        try { 
            context[_importan][_push]({});
            evaldValue = this[_value][_eval](context);
            if (!this[_variable2] && evaldValue[_type] === _Detached) { 
                throw { [_message]: _Rulesets,
                    [_index]: this[_getIndex](), [_filename]: this[_fileInfo]() [_filename] };
            }
            var important = this[_importan1];
            var importantResult = context[_importan][_pop]();
            if (!important && importantResult[_importan1]) { 
                important = importantResult[_importan1];
            }
            return new Declaration(name, evaldValue, important, this[_merge], this[_getIndex](), this[_fileInfo](), this[_inline], variable);
        }
        catch (e) { 
            if (typeof e[_index] !== _number) { 
                e[_index] = this[_getIndex]();
                e[_filename] = this[_fileInfo]() [_filename];
            }
            throw e;
        }
        finally { 
            if (mathBypass) { 
                context[_math] = prevMath;
            }
        }
    },
    [_makeImpo]: function () { 
        return new Declaration(this[_name], this[_value], _importa, this[_merge], this[_getIndex](), this[_fileInfo](), this[_inline]);
    }
});
exports[_default] = Declaration;
//# sourceMappingURL=declaration.js.map
return exports
}],
/* 1231 string _Argument */ "Argument",
/* 1232 string _argument */ /* text */ "argument must be a number",
/* 1233 less$functions$math-helper.js */ [10,11,1,120,16,17,18,581,96,167,1231,922,1232,1206,1216,function(Object,exports,require,parseFloat,_definePr,__esModu,_value,__import1,_default,_type,_Argument,_message,_argument,_unit,_unify){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var dimension_1 = tslib_1[__import1](require(1217));
var MathHelper = function (fn, unit, n) { 
    if (!(n instanceof dimension_1[_default])) { 
        throw { [_type]: _Argument, [_message]: _argument };
    }
    if (unit == null) { 
        unit = n[_unit];
    }
    else { 
        n = n[_unify]();
    }
    return new dimension_1[_default](fn(parseFloat(n[_value])), unit);
};
exports[_default] = MathHelper;
//# sourceMappingURL=math-helper.js.map
return exports
}],
/* 1234 string _extendLi */ "extendList",
/* 1235 string _conditio */ "condition",
/* 1236 string _evaldCon */ "evaldCondition",
/* 1237 string _elements */ "elements",
/* 1238 string _getEleme */ "getElements",
/* 1239 string _mixinEle */ "mixinElements_",
/* 1240 string _Selector */ "Selector",
/* 1241 string _createDe */ "createDerived",
/* 1242 string _mediaEmp */ "mediaEmpty",
/* 1243 string _parseNod */ "parseNode",
/* 1244 string _selector */ "selector",
/* 1245 string _createEm */ "createEmptySelectors",
/* 1246 string _mixinEle1 */ "mixinElements",
/* 1247 regexp _w_w_g */ /[,&#\*\.\w-]([\w-]|(\\.))*/g,
/* 1248 string _isJustPa */ "isJustParentSelector",
/* 1249 string _getIsOut */ "getIsOutput",
/* 1250 less$tree$selector.js */ [10,11,1,123,16,17,18,581,1234,1235,1236,150,151,1237,1238,1239,175,148,19,525,96,167,1240,131,127,126,1241,147,143,174,1242,1049,4,696,1243,1244,146,922,85,663,1245,586,2,1246,503,1200,157,1247,549,1248,933,158,154,1203,155,1249,function(Object,exports,require,undefined,_definePr,__esModu,_value,__import1,_extendLi,_conditio,_evaldCon,_index1,_fileInf,_elements,_getEleme,_mixinEle,_copyVisi,_setParen,_prototyp,_assign,_default,_type,_Selector,_accept,_visitArr,_visit,_createDe,_getIndex,_fileInfo,_visibili1,_mediaEmp,_24,_string,_parse,_parseNod,_selector,_index,_message,_imports,_filename,_createEm,_match,_length,_mixinEle1,_map,_combinat,_join,_w_w_g,_shift,_isJustPa,_14,_eval,_genCSS,_firstSel,_add,_getIsOut){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var element_1 = tslib_1[__import1](require(1204));
var less_error_1 = tslib_1[__import1](require(945));
var Selector = function (elements, extendList, condition, index, currentFileInfo, visibilityInfo) { 
    this[_extendLi] = extendList;
    this[_conditio] = condition;
    this[_evaldCon] = !condition;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_elements] = this[_getEleme](elements);
    this[_mixinEle] = undefined;
    this[_copyVisi](visibilityInfo);
    this[_setParen](this[_elements], this);
};
Selector[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Selector,
    [_accept]: function (visitor) { 
        if (this[_elements]) { 
            this[_elements] = visitor[_visitArr](this[_elements]);
        }
        if (this[_extendLi]) { 
            this[_extendLi] = visitor[_visitArr](this[_extendLi]);
        }
        if (this[_conditio]) { 
            this[_conditio] = visitor[_visit](this[_conditio]);
        }
    },
    [_createDe]: function (elements, extendList, evaldCondition) { 
        elements = this[_getEleme](elements);
        var newSelector = new Selector(elements, extendList || this[_extendLi], null, this[_getIndex](), this[_fileInfo](), this[_visibili1]());
        newSelector[_evaldCon] = (evaldCondition != null) ? evaldCondition : this[_evaldCon];
        newSelector[_mediaEmp] = this[_mediaEmp];
        return newSelector;
    },
    [_getEleme]: function (els) { 
        if (!els) { 
            return [new element_1[_default]('', _24, false, this[_index1], this[_fileInf])];
        }
        if (typeof els === _string) { 
            this[_parse][_parseNod](els, [_selector], this[_index1], this[_fileInf], function (err, result) { 
                if (err) { 
                    throw new less_error_1[_default]({ 
                        [_index]: err[_index],
                        [_message]: err[_message]
                    }, this[_parse][_imports], this[_fileInf][_filename]);
                }
                els = result[0] [_elements];
            });
        }
        return els;
    },
    [_createEm]: function () { 
        var el = new element_1[_default]('', _24, false, this[_index1], this[_fileInf]), sels = [new Selector([el], null, null, this[_index1], this[_fileInf])];
        sels[0] [_mediaEmp] = true;
        return sels;
    },
    [_match]: function (other) { 
        var elements = this[_elements];
        var len = elements[_length];
        var olen;
        var i;
        other = other[_mixinEle1]();
        olen = other[_length];
        if (olen === 0 || len < olen) { 
            return 0;
        }
        else { 
            for (i = 0; i < olen; i++) { 
                if (elements[i] [_value] !== other[i]) { 
                    return 0;
                }
            }
        }
        return olen; // return number of matched elements
    },
    [_mixinEle1]: function () { 
        if (this[_mixinEle]) { 
            return this[_mixinEle];
        }
        var elements = this[_elements][_map](function (v) { 
            return v[_combinat][_value] + (v[_value][_value] || v[_value]);
        }) [_join]('') [_match](_w_w_g);
        if (elements) { 
            if (elements[0] === _24) { 
                elements[_shift]();
            }
        }
        else { 
            elements = [];
        }
        return (this[_mixinEle] = elements);
    },
    [_isJustPa]: function () { 
        return !this[_mediaEmp] &&
            this[_elements][_length] === 1 &&
            this[_elements][0] [_value] === _24 &&
            (this[_elements][0] [_combinat][_value] === _14 || this[_elements][0] [_combinat][_value] === '');
    },
    [_eval]: function (context) { 
        var evaldCondition = this[_conditio] && this[_conditio][_eval](context);
        var elements = this[_elements];
        var extendList = this[_extendLi];
        elements = elements && elements[_map](function (e) { return e[_eval](context); });
        extendList = extendList && extendList[_map](function (extend) { return extend[_eval](context); });
        return this[_createDe](elements, extendList, evaldCondition);
    },
    [_genCSS]: function (context, output) { 
        var i, element;
        if ((!context || !context[_firstSel]) && this[_elements][0] [_combinat][_value] === '') { 
            output[_add](_14, this[_fileInfo](), this[_getIndex]());
        }
        for (i = 0; i < this[_elements][_length]; i++) { 
            element = this[_elements][i];
            element[_genCSS](context, output);
        }
    },
    [_getIsOut]: function () { 
        return this[_evaldCon];
    }
});
exports[_default] = Selector;
//# sourceMappingURL=selector.js.map
return exports
}],
/* 1251 string _selector1 */ "selectors",
/* 1252 string _rules */ "rules",
/* 1253 string _lookups */ "_lookups",
/* 1254 string _variabl */ "_variables",
/* 1255 string _propert */ "_properties",
/* 1256 string _Ruleset */ "Ruleset",
/* 1257 string _isRulese1 */ "isRuleset",
/* 1258 string _it_is_cu */ /* text */ "it is currently only allowed in parametric mixin guards,",
/* 1259 string _original1 */ "originalRuleset",
/* 1260 string _root */ "root",
/* 1261 string _firstRoo */ "firstRoot",
/* 1262 string _allowImp */ "allowImports",
/* 1263 string _unshift */ "unshift",
/* 1264 string _evalImpo */ "evalImports",
/* 1265 string _mediaBlo */ "mediaBlocks",
/* 1266 string _MixinCal */ "MixinCall",
/* 1267 string _filter */ "filter",
/* 1268 string _resetCac */ "resetCache",
/* 1269 string _Variable */ "VariableCall",
/* 1270 string _bubbleSe */ "bubbleSelectors",
/* 1271 string _Import */ "Import",
/* 1272 string _matchArg */ "matchArgs",
/* 1273 string _matchCon */ "matchCondition",
/* 1274 string _ruleset1 */ "_rulesets",
/* 1275 string _variable3 */ "variables",
/* 1276 string _properti */ "properties",
/* 1277 string _$ */ "$",
/* 1278 string _parseVal */ "parseValue",
/* 1279 string _property1 */ "property",
/* 1280 string _lastDecl */ "lastDeclaration",
/* 1281 string _rulesets */ "rulesets",
/* 1282 string _prependR */ "prependRule",
/* 1283 string _find */ "find",
/* 1284 string _rule */ "rule",
/* 1285 string _tabLevel */ "tabLevel",
/* 1286 string _46 */ /* text */ "  ",
/* 1287 string _isCharse */ "isCharset",
/* 1288 string _47 */ /* text */ ",\n",
/* 1289 string _48 */ /* text */ " {\n",
/* 1290 string _joinSele */ "joinSelectors",
/* 1291 string _joinSele1 */ "joinSelector",
/* 1292 less$tree$ruleset.js */ [10,11,1,84,16,17,18,581,580,1251,1252,1253,1254,1255,1008,175,1100,148,19,525,96,167,1256,1257,152,131,1006,127,2,158,544,924,922,1258,1237,1201,1236,153,696,1243,157,1040,147,143,613,937,618,174,1259,1260,1261,1262,99,711,1021,599,1263,1264,1081,1265,1266,1267,1220,48,715,9,8,1268,1269,1248,549,1270,1271,1228,503,1272,1273,1235,1020,1274,1275,506,46,1276,1277,93,1278,1279,1280,140,4,1218,51,21,149,1281,1282,1283,586,22,1003,1284,154,1285,115,1286,1287,155,1288,1203,1180,1289,1224,20,173,621,1181,156,1290,1291,150,151,540,1241,1200,1105,1049,1234,948,function(Object,exports,require,Array,_definePr,__esModu,_value,__import1,__import,_selector1,_rules,_lookups,_variabl,_propert,_strictIm,_copyVisi,_allowRoo,_setParen,_prototyp,_assign,_default,_type,_Ruleset,_isRulese1,_isRulese,_accept,_paths,_visitArr,_length,_eval,_error,_Syntax,_message,_it_is_cu,_elements,_isVariab,_evaldCon,_toCSS,_parse,_parseNod,_join,_22,_getIndex,_fileInfo,_flattenA,_reset,_copyArra,_visibili1,_original1,_root,_firstRoo,_allowImp,_debugInf,_function2,_frames,_inherit,_unshift,_evalImpo,_evalFirs,_mediaBlo,_MixinCal,_filter,_variable2,_name,_splice,_apply,_concat,_resetCac,_Variable,_isJustPa,_shift,_bubbleSe,_Import,_makeImpo,_map,_matchArg,_matchCon,_conditio,_Eval,_ruleset1,_variable3,_reduce,_hasOwnPr,_properti,_$,_push,_parseVal,_property1,_lastDecl,_parsed,_string,_importan1,_isArray,_call,_forEach,_rulesets,_prependR,_find,_match,_slice,_path,_rule,_genCSS,_tabLevel,_compress,_46,_isCharse,_add,_47,_firstSel,_40,_48,_lastRule,_toString,_isVisibl,_10,_41,_isEmpty,_joinSele,_joinSele1,_index1,_fileInf,_pop,_createDe,_combinat,_emptyOrW,_24,_extendLi,_bind){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var declaration_1 = tslib_1[__import1](require(1230));
var keyword_1 = tslib_1[__import1](require(1078));
var comment_1 = tslib_1[__import1](require(1103));
var paren_1 = tslib_1[__import1](require(1070));
var selector_1 = tslib_1[__import1](require(1250));
var element_1 = tslib_1[__import1](require(1204));
var anonymous_1 = tslib_1[__import1](require(1140));
var contexts_1 = tslib_1[__import1](require(1037));
var function_registry_1 = tslib_1[__import1](require(600));
var default_1 = tslib_1[__import1](require(1143));
var debug_info_1 = tslib_1[__import1](require(119));
var utils = tslib_1[__import](require(636));
var Ruleset = function (selectors, rules, strictImports, visibilityInfo) { 
    this[_selector1] = selectors;
    this[_rules] = rules;
    this[_lookups] = {};
    this[_variabl] = null;
    this[_propert] = null;
    this[_strictIm] = strictImports;
    this[_copyVisi](visibilityInfo);
    this[_allowRoo] = true;
    this[_setParen](this[_selector1], this);
    this[_setParen](this[_rules], this);
};
Ruleset[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Ruleset,
    [_isRulese1]: true,
    [_isRulese]: function () { return true; },
    [_accept]: function (visitor) { 
        if (this[_paths]) { 
            this[_paths] = visitor[_visitArr](this[_paths], true);
        }
        else if (this[_selector1]) { 
            this[_selector1] = visitor[_visitArr](this[_selector1]);
        }
        if (this[_rules] && this[_rules][_length]) { 
            this[_rules] = visitor[_visitArr](this[_rules]);
        }
    },
    [_eval]: function (context) { 
        var that = this;
        var selectors;
        var selCnt;
        var selector;
        var i;
        var hasVariable;
        var hasOnePassingSelector = false;
        if (this[_selector1] && (selCnt = this[_selector1][_length])) { 
            selectors = new Array(selCnt);
            default_1[_default][_error]({ 
                [_type]: _Syntax,
                [_message]: _it_is_cu
            });
            for (i = 0; i < selCnt; i++) { 
                selector = this[_selector1][i] [_eval](context);
                for (var j = 0; j < selector[_elements][_length]; j++) { 
                    if (selector[_elements][j] [_isVariab]) { 
                        hasVariable = true;
                        break;
                    }
                }
                selectors[i] = selector;
                if (selector[_evaldCon]) { 
                    hasOnePassingSelector = true;
                }
            }
            if (hasVariable) { 
                var toParseSelectors = new Array(selCnt);
                for (i = 0; i < selCnt; i++) { 
                    selector = selectors[i];
                    toParseSelectors[i] = selector[_toCSS](context);
                }
                this[_parse][_parseNod](toParseSelectors[_join](_22), [_selector1], selectors[0] [_getIndex](), selectors[0] [_fileInfo](), function (err, result) { 
                    if (result) { 
                        selectors = utils[_flattenA](result);
                    }
                });
            }
            default_1[_default][_reset]();
        }
        else { 
            hasOnePassingSelector = true;
        }
        var rules = this[_rules] ? utils[_copyArra](this[_rules]) : null;
        var ruleset = new Ruleset(selectors, rules, this[_strictIm], this[_visibili1]());
        var rule;
        var subRule;
        ruleset[_original1] = this;
        ruleset[_root] = this[_root];
        ruleset[_firstRoo] = this[_firstRoo];
        ruleset[_allowImp] = this[_allowImp];
        if (this[_debugInf]) { 
            ruleset[_debugInf] = this[_debugInf];
        }
        if (!hasOnePassingSelector) { 
            rules[_length] = 0;
        }
        // inherit a function registry from the frames stack when possible;
        // otherwise from the global registry
        ruleset[_function2] = (function (frames) { 
            var i = 0;
            var n = frames[_length];
            var found;
            for (; i !== n; ++i) { 
                found = frames[i] [_function2];
                if (found) { 
                    return found;
                }
            }
            return function_registry_1[_default];
        }(context[_frames])) [_inherit]();
        // push the current ruleset to the frames stack
        var ctxFrames = context[_frames];
        ctxFrames[_unshift](ruleset);
        // currrent selectors
        var ctxSelectors = context[_selector1];
        if (!ctxSelectors) { 
            context[_selector1] = ctxSelectors = [];
        }
        ctxSelectors[_unshift](this[_selector1]);
        // Evaluate imports
        if (ruleset[_root] || ruleset[_allowImp] || !ruleset[_strictIm]) { 
            ruleset[_evalImpo](context);
        }
        // Store the frames around mixin definitions,
        // so they can be evaluated like closures when the time comes.
        var rsRules = ruleset[_rules];
        for (i = 0; (rule = rsRules[i]); i++) { 
            if (rule[_evalFirs]) { 
                rsRules[i] = rule[_eval](context);
            }
        }
        var mediaBlockCount = (context[_mediaBlo] && context[_mediaBlo][_length]) || 0;
        // Evaluate mixin calls.
        for (i = 0; (rule = rsRules[i]); i++) { 
            if (rule[_type] === _MixinCal) { 
                /* jshint loopfunc:true */
                rules = rule[_eval](context) [_filter](function (r) { 
                    if ((r instanceof declaration_1[_default]) && r[_variable2]) { 
                        // do not pollute the scope if the variable is
                        // already there. consider returning false here
                        // but we need a way to "return" variable from mixins
                        return !(ruleset[_variable2](r[_name]));
                    }
                    return true;
                });
                rsRules[_splice][_apply](rsRules, [i, 1] [_concat](rules));
                i += rules[_length] - 1;
                ruleset[_resetCac]();
            }
            else if (rule[_type] === _Variable) { 
                /* jshint loopfunc:true */
                rules = rule[_eval](context) [_rules][_filter](function (r) { 
                    if ((r instanceof declaration_1[_default]) && r[_variable2]) { 
                        // do not pollute the scope at all
                        return false;
                    }
                    return true;
                });
                rsRules[_splice][_apply](rsRules, [i, 1] [_concat](rules));
                i += rules[_length] - 1;
                ruleset[_resetCac]();
            }
        }
        // Evaluate everything else
        for (i = 0; (rule = rsRules[i]); i++) { 
            if (!rule[_evalFirs]) { 
                rsRules[i] = rule = rule[_eval] ? rule[_eval](context) : rule;
            }
        }
        // Evaluate everything else
        for (i = 0; (rule = rsRules[i]); i++) { 
            // for rulesets, check if it is a css guard and can be removed
            if (rule instanceof Ruleset && rule[_selector1] && rule[_selector1][_length] === 1) { 
                // check if it can be folded in (e.g. & where)
                if (rule[_selector1][0] && rule[_selector1][0] [_isJustPa]()) { 
                    rsRules[_splice](i--, 1);
                    for (var j = 0; (subRule = rule[_rules][j]); j++) { 
                        if (subRule instanceof node_1[_default]) { 
                            subRule[_copyVisi](rule[_visibili1]());
                            if (!(subRule instanceof declaration_1[_default]) || !subRule[_variable2]) { 
                                rsRules[_splice](++i, 0, subRule);
                            }
                        }
                    }
                }
            }
        }
        // Pop the stack
        ctxFrames[_shift]();
        ctxSelectors[_shift]();
        if (context[_mediaBlo]) { 
            for (i = mediaBlockCount; i < context[_mediaBlo][_length]; i++) { 
                context[_mediaBlo][i] [_bubbleSe](selectors);
            }
        }
        return ruleset;
    },
    [_evalImpo]: function (context) { 
        var rules = this[_rules];
        var i;
        var importRules;
        if (!rules) { 
            return;
        }
        for (i = 0; i < rules[_length]; i++) { 
            if (rules[i] [_type] === _Import) { 
                importRules = rules[i] [_eval](context);
                if (importRules && (importRules[_length] || importRules[_length] === 0)) { 
                    rules[_splice][_apply](rules, [i, 1] [_concat](importRules));
                    i += importRules[_length] - 1;
                }
                else { 
                    rules[_splice](i, 1, importRules);
                }
                this[_resetCac]();
            }
        }
    },
    [_makeImpo]: function () { 
        var result = new Ruleset(this[_selector1], this[_rules][_map](function (r) { 
            if (r[_makeImpo]) { 
                return r[_makeImpo]();
            }
            else { 
                return r;
            }
        }), this[_strictIm], this[_visibili1]());
        return result;
    },
    [_matchArg]: function (args) { 
        return !args || args[_length] === 0;
    },
    // lets you call a css selector with a guard
    [_matchCon]: function (args, context) { 
        var lastSelector = this[_selector1][this[_selector1][_length] - 1];
        if (!lastSelector[_evaldCon]) { 
            return false;
        }
        if (lastSelector[_conditio] &&
            !lastSelector[_conditio][_eval](new contexts_1[_default][_Eval](context, context[_frames]))) { 
            return false;
        }
        return true;
    },
    [_resetCac]: function () { 
        this[_ruleset1] = null;
        this[_variabl] = null;
        this[_propert] = null;
        this[_lookups] = {};
    },
    [_variable3]: function () { 
        if (!this[_variabl]) { 
            this[_variabl] = !this[_rules] ? {} : this[_rules][_reduce](function (hash, r) { 
                if (r instanceof declaration_1[_default] && r[_variable2] === true) { 
                    hash[r[_name]] = r;
                }
                // when evaluating variables in an import statement, imports have not been eval'd
                // so we need to go inside import statements.
                // guard against root being a string (in the case of inlined less)
                if (r[_type] === _Import && r[_root] && r[_root][_variable3]) { 
                    var vars = r[_root][_variable3]();
                    for (var name_1 in vars) { 
                        if (vars[_hasOwnPr](name_1)) { 
                            hash[name_1] = r[_root][_variable2](name_1);
                        }
                    }
                }
                return hash;
            }, {});
        }
        return this[_variabl];
    },
    [_properti]: function () { 
        if (!this[_propert]) { 
            this[_propert] = !this[_rules] ? {} : this[_rules][_reduce](function (hash, r) { 
                if (r instanceof declaration_1[_default] && r[_variable2] !== true) { 
                    var name_2 = (r[_name][_length] === 1) && (r[_name][0] instanceof keyword_1[_default]) ?
                        r[_name][0] [_value] : r[_name];
                    // Properties don't overwrite as they can merge
                    if (!hash[_$ + name_2]) { 
                        hash[_$ + name_2] = [r];
                    }
                    else { 
                        hash[_$ + name_2] [_push](r);
                    }
                }
                return hash;
            }, {});
        }
        return this[_propert];
    },
    [_variable2]: function (name) { 
        var decl = this[_variable3]()[name];
        if (decl) { 
            return this[_parseVal](decl);
        }
    },
    [_property1]: function (name) { 
        var decl = this[_properti]()[name];
        if (decl) { 
            return this[_parseVal](decl);
        }
    },
    [_lastDecl]: function () { 
        for (var i = this[_rules][_length]; i > 0; i--) { 
            var decl = this[_rules][i - 1];
            if (decl instanceof declaration_1[_default]) { 
                return this[_parseVal](decl);
            }
        }
    },
    [_parseVal]: function (toParse) { 
        var self = this;
        function transformDeclaration(decl) { 
            if (decl[_value] instanceof anonymous_1[_default] && !decl[_parsed]) { 
                if (typeof decl[_value][_value] === _string) { 
                    this[_parse][_parseNod](decl[_value][_value], [_value, _importan1], decl[_value][_getIndex](), decl[_fileInfo](), function (err, result) { 
                        if (err) { 
                            decl[_parsed] = true;
                        }
                        if (result) { 
                            decl[_value] = result[0];
                            decl[_importan1] = result[1] || '';
                            decl[_parsed] = true;
                        }
                    });
                }
                else { 
                    decl[_parsed] = true;
                }
                return decl;
            }
            else { 
                return decl;
            }
        }
        if (!Array[_isArray](toParse)) { 
            return transformDeclaration[_call](self, toParse);
        }
        else { 
            var nodes_1 = [];
            toParse[_forEach](function (n) { 
                nodes_1[_push](transformDeclaration[_call](self, n));
            });
            return nodes_1;
        }
    },
    [_rulesets]: function () { 
        if (!this[_rules]) { 
            return [];
        }
        var filtRules = [];
        var rules = this[_rules];
        var i;
        var rule;
        for (i = 0; (rule = rules[i]); i++) { 
            if (rule[_isRulese1]) { 
                filtRules[_push](rule);
            }
        }
        return filtRules;
    },
    [_prependR]: function (rule) { 
        var rules = this[_rules];
        if (rules) { 
            rules[_unshift](rule);
        }
        else { 
            this[_rules] = [rule];
        }
        this[_setParen](rule, this);
    },
    [_find]: function (selector, self, filter) { 
        self = self || this;
        var rules = [];
        var match;
        var foundMixins;
        var key = selector[_toCSS]();
        if (key in this[_lookups]) { 
            return this[_lookups][key];
        }
        this[_rulesets]() [_forEach](function (rule) { 
            if (rule !== self) { 
                for (var j = 0; j < rule[_selector1][_length]; j++) { 
                    match = selector[_match](rule[_selector1][j]);
                    if (match) { 
                        if (selector[_elements][_length] > match) { 
                            if (!filter || filter(rule)) { 
                                foundMixins = rule[_find](new selector_1[_default](selector[_elements][_slice](match)), self, filter);
                                for (var i = 0; i < foundMixins[_length]; ++i) { 
                                    foundMixins[i] [_path][_push](rule);
                                }
                                Array[_prototyp][_push][_apply](rules, foundMixins);
                            }
                        }
                        else { 
                            rules[_push]({ [_rule]: rule, [_path]: [] });
                        }
                        break;
                    }
                }
            }
        });
        this[_lookups][key] = rules;
        return rules;
    },
    [_genCSS]: function (context, output) { 
        var i;
        var j;
        var charsetRuleNodes = [];
        var ruleNodes = [];
        var // Line number debugging
        debugInfo;
        var rule;
        var path;
        context[_tabLevel] = (context[_tabLevel] || 0);
        if (!this[_root]) { 
            context[_tabLevel]++;
        }
        var tabRuleStr = context[_compress] ? '' : Array(context[_tabLevel] + 1) [_join](_46);
        var tabSetStr = context[_compress] ? '' : Array(context[_tabLevel]) [_join](_46);
        var sep;
        var charsetNodeIndex = 0;
        var importNodeIndex = 0;
        for (i = 0; (rule = this[_rules][i]); i++) { 
            if (rule instanceof comment_1[_default]) { 
                if (importNodeIndex === i) { 
                    importNodeIndex++;
                }
                ruleNodes[_push](rule);
            }
            else if (rule[_isCharse] && rule[_isCharse]()) { 
                ruleNodes[_splice](charsetNodeIndex, 0, rule);
                charsetNodeIndex++;
                importNodeIndex++;
            }
            else if (rule[_type] === _Import) { 
                ruleNodes[_splice](importNodeIndex, 0, rule);
                importNodeIndex++;
            }
            else { 
                ruleNodes[_push](rule);
            }
        }
        ruleNodes = charsetRuleNodes[_concat](ruleNodes);
        // If this is the root node, we don't render
        // a selector, or {}.
        if (!this[_root]) { 
            debugInfo = debug_info_1[_default](context, this, tabSetStr);
            if (debugInfo) { 
                output[_add](debugInfo);
                output[_add](tabSetStr);
            }
            var paths = this[_paths];
            var pathCnt = paths[_length];
            var pathSubCnt = void 0;
            sep = context[_compress] ? _22 : (_47 + tabSetStr);
            for (i = 0; i < pathCnt; i++) { 
                path = paths[i];
                if (!(pathSubCnt = path[_length])) { 
                    continue;
                }
                if (i > 0) { 
                    output[_add](sep);
                }
                context[_firstSel] = true;
                path[0] [_genCSS](context, output);
                context[_firstSel] = false;
                for (j = 1; j < pathSubCnt; j++) { 
                    path[j] [_genCSS](context, output);
                }
            }
            output[_add]((context[_compress] ? _40 : _48) + tabRuleStr);
        }
        // Compile rules and rulesets
        for (i = 0; (rule = ruleNodes[i]); i++) { 
            if (i + 1 === ruleNodes[_length]) { 
                context[_lastRule] = true;
            }
            var currentLastRule = context[_lastRule];
            if (rule[_isRulese](rule)) { 
                context[_lastRule] = false;
            }
            if (rule[_genCSS]) { 
                rule[_genCSS](context, output);
            }
            else if (rule[_value]) { 
                output[_add](rule[_value][_toString]());
            }
            context[_lastRule] = currentLastRule;
            if (!context[_lastRule] && rule[_isVisibl]()) { 
                output[_add](context[_compress] ? '' : (_10 + tabRuleStr));
            }
            else { 
                context[_lastRule] = false;
            }
        }
        if (!this[_root]) { 
            output[_add]((context[_compress] ? _41 : _10 + tabSetStr + _41));
            context[_tabLevel]--;
        }
        if (!output[_isEmpty]() && !context[_compress] && this[_firstRoo]) { 
            output[_add](_10);
        }
    },
    [_joinSele]: function (paths, context, selectors) { 
        for (var s = 0; s < selectors[_length]; s++) { 
            this[_joinSele1](paths, context, selectors[s]);
        }
    },
    [_joinSele1]: function (paths, context, selector) { 
        function createParenthesis(elementsToPak, originalElement) { 
            var replacementParen, j;
            if (elementsToPak[_length] === 0) { 
                replacementParen = new paren_1[_default](elementsToPak[0]);
            }
            else { 
                var insideParent = new Array(elementsToPak[_length]);
                for (j = 0; j < elementsToPak[_length]; j++) { 
                    insideParent[j] = new element_1[_default](null, elementsToPak[j], originalElement[_isVariab], originalElement[_index1], originalElement[_fileInf]);
                }
                replacementParen = new paren_1[_default](new selector_1[_default](insideParent));
            }
            return replacementParen;
        }
        function createSelector(containedElement, originalElement) { 
            var element, selector;
            element = new element_1[_default](null, containedElement, originalElement[_isVariab], originalElement[_index1], originalElement[_fileInf]);
            selector = new selector_1[_default]([element]);
            return selector;
        }
        // joins selector path from `beginningPath` with selector path in `addPath`
        // `replacedElement` contains element that is being replaced by `addPath`
        // returns concatenated path
        function addReplacementIntoPath(beginningPath, addPath, replacedElement, originalSelector) { 
            var newSelectorPath, lastSelector, newJoinedSelector;
            // our new selector path
            newSelectorPath = [];
            // construct the joined selector - if & is the first thing this will be empty,
            // if not newJoinedSelector will be the last set of elements in the selector
            if (beginningPath[_length] > 0) { 
                newSelectorPath = utils[_copyArra](beginningPath);
                lastSelector = newSelectorPath[_pop]();
                newJoinedSelector = originalSelector[_createDe](utils[_copyArra](lastSelector[_elements]));
            }
            else { 
                newJoinedSelector = originalSelector[_createDe]([]);
            }
            if (addPath[_length] > 0) { 
                // /deep/ is a CSS4 selector - (removed, so should deprecate)
                // that is valid without anything in front of it
                // so if the & does not have a combinator that is "" or " " then
                // and there is a combinator on the parent, then grab that.
                // this also allows + a { & .b { .a & { ... though not sure why you would want to do that
                var combinator = replacedElement[_combinat];
                var parentEl = addPath[0] [_elements][0];
                if (combinator[_emptyOrW] && !parentEl[_combinat][_emptyOrW]) { 
                    combinator = parentEl[_combinat];
                }
                // join the elements so far with the first part of the parent
                newJoinedSelector[_elements][_push](new element_1[_default](combinator, parentEl[_value], replacedElement[_isVariab], replacedElement[_index1], replacedElement[_fileInf]));
                newJoinedSelector[_elements] = newJoinedSelector[_elements][_concat](addPath[0] [_elements][_slice](1));
            }
            // now add the joined selector - but only if it is not empty
            if (newJoinedSelector[_elements][_length] !== 0) { 
                newSelectorPath[_push](newJoinedSelector);
            }
            // put together the parent selectors after the join (e.g. the rest of the parent)
            if (addPath[_length] > 1) { 
                var restOfPath = addPath[_slice](1);
                restOfPath = restOfPath[_map](function (selector) { 
                    return selector[_createDe](selector[_elements], []);
                });
                newSelectorPath = newSelectorPath[_concat](restOfPath);
            }
            return newSelectorPath;
        }
        // joins selector path from `beginningPath` with every selector path in `addPaths` array
        // `replacedElement` contains element that is being replaced by `addPath`
        // returns array with all concatenated paths
        function addAllReplacementsIntoPath(beginningPath, addPaths, replacedElement, originalSelector, result) { 
            var j;
            for (j = 0; j < beginningPath[_length]; j++) { 
                var newSelectorPath = addReplacementIntoPath(beginningPath[j], addPaths, replacedElement, originalSelector);
                result[_push](newSelectorPath);
            }
            return result;
        }
        function mergeElementsOnToSelectors(elements, selectors) { 
            var i, sel;
            if (elements[_length] === 0) { 
                return;
            }
            if (selectors[_length] === 0) { 
                selectors[_push]([new selector_1[_default](elements)]);
                return;
            }
            for (i = 0; (sel = selectors[i]); i++) { 
                // if the previous thing in sel is a parent this needs to join on to it
                if (sel[_length] > 0) { 
                    sel[sel[_length] - 1] = sel[sel[_length] - 1] [_createDe](sel[sel[_length] - 1] [_elements][_concat](elements));
                }
                else { 
                    sel[_push](new selector_1[_default](elements));
                }
            }
        }
        // replace all parent selectors inside `inSelector` by content of `context` array
        // resulting selectors are returned inside `paths` array
        // returns true if `inSelector` contained at least one parent selector
        function replaceParentSelector(paths, context, inSelector) { 
            // The paths are [[Selector]]
            // The first list is a list of comma separated selectors
            // The inner list is a list of inheritance separated selectors
            // e.g.
            // .a, .b {
            //   .c {
            //   }
            // }
            // == [[.a] [.c]] [[.b] [.c]]
            //
            var i, j, k, currentElements, newSelectors, selectorsMultiplied, sel, el, hadParentSelector = false, length, lastSelector;
            function findNestedSelector(element) { 
                var maybeSelector;
                if (!(element[_value] instanceof paren_1[_default])) { 
                    return null;
                }
                maybeSelector = element[_value][_value];
                if (!(maybeSelector instanceof selector_1[_default])) { 
                    return null;
                }
                return maybeSelector;
            }
            // the elements from the current selector so far
            currentElements = [];
            // the current list of new selectors to add to the path.
            // We will build it up. We initiate it with one empty selector as we "multiply" the new selectors
            // by the parents
            newSelectors = [
                []
            ];
            for (i = 0; (el = inSelector[_elements][i]); i++) { 
                // non parent reference elements just get added
                if (el[_value] !== _24) { 
                    var nestedSelector = findNestedSelector(el);
                    if (nestedSelector != null) { 
                        // merge the current list of non parent selector elements
                        // on to the current list of selectors to add
                        mergeElementsOnToSelectors(currentElements, newSelectors);
                        var nestedPaths = [];
                        var replaced = void 0;
                        var replacedNewSelectors = [];
                        replaced = replaceParentSelector(nestedPaths, context, nestedSelector);
                        hadParentSelector = hadParentSelector || replaced;
                        // the nestedPaths array should have only one member - replaceParentSelector does not multiply selectors
                        for (k = 0; k < nestedPaths[_length]; k++) { 
                            var replacementSelector = createSelector(createParenthesis(nestedPaths[k], el), el);
                            addAllReplacementsIntoPath(newSelectors, [replacementSelector], el, inSelector, replacedNewSelectors);
                        }
                        newSelectors = replacedNewSelectors;
                        currentElements = [];
                    }
                    else { 
                        currentElements[_push](el);
                    }
                }
                else { 
                    hadParentSelector = true;
                    // the new list of selectors to add
                    selectorsMultiplied = [];
                    // merge the current list of non parent selector elements
                    // on to the current list of selectors to add
                    mergeElementsOnToSelectors(currentElements, newSelectors);
                    // loop through our current selectors
                    for (j = 0; j < newSelectors[_length]; j++) { 
                        sel = newSelectors[j];
                        // if we don't have any parent paths, the & might be in a mixin so that it can be used
                        // whether there are parents or not
                        if (context[_length] === 0) { 
                            // the combinator used on el should now be applied to the next element instead so that
                            // it is not lost
                            if (sel[_length] > 0) { 
                                sel[0] [_elements][_push](new element_1[_default](el[_combinat], '', el[_isVariab], el[_index1], el[_fileInf]));
                            }
                            selectorsMultiplied[_push](sel);
                        }
                        else { 
                            // and the parent selectors
                            for (k = 0; k < context[_length]; k++) { 
                                // We need to put the current selectors
                                // then join the last selector's elements on to the parents selectors
                                var newSelectorPath = addReplacementIntoPath(sel, context[k], el, inSelector);
                                // add that to our new set of selectors
                                selectorsMultiplied[_push](newSelectorPath);
                            }
                        }
                    }
                    // our new selectors has been multiplied, so reset the state
                    newSelectors = selectorsMultiplied;
                    currentElements = [];
                }
            }
            // if we have any elements left over (e.g. .a& .b == .b)
            // add them on to all the current selectors
            mergeElementsOnToSelectors(currentElements, newSelectors);
            for (i = 0; i < newSelectors[_length]; i++) { 
                length = newSelectors[i] [_length];
                if (length > 0) { 
                    paths[_push](newSelectors[i]);
                    lastSelector = newSelectors[i][length - 1];
                    newSelectors[i][length - 1] = lastSelector[_createDe](lastSelector[_elements], inSelector[_extendLi]);
                }
            }
            return hadParentSelector;
        }
        function deriveSelector(visibilityInfo, deriveFrom) { 
            var newSelector = deriveFrom[_createDe](deriveFrom[_elements], deriveFrom[_extendLi], deriveFrom[_evaldCon]);
            newSelector[_copyVisi](visibilityInfo);
            return newSelector;
        }
        // joinSelector code follows
        var i, newPaths, hadParentSelector;
        newPaths = [];
        hadParentSelector = replaceParentSelector(newPaths, context, selector);
        if (!hadParentSelector) { 
            if (context[_length] > 0) { 
                newPaths = [];
                for (i = 0; i < context[_length]; i++) { 
                    var concatenated = context[i] [_map](deriveSelector[_bind](this, selector[_visibili1]()));
                    concatenated[_push](selector);
                    newPaths[_push](concatenated);
                }
            }
            else { 
                newPaths = [[selector]];
            }
        }
        for (i = 0; i < newPaths[_length]; i++) { 
            paths[_push](newPaths[i]);
        }
    }
});
exports[_default] = Ruleset;
//# sourceMappingURL=ruleset.js.map
return exports
}],
/* 1293 string _Property */ "Property",
/* 1294 string _ToCSSVis */ "ToCSSVisitor",
/* 1295 string _mergeRu */ "_mergeRules",
/* 1296 string _evaluati */ "evaluating",
/* 1297 string _Name */ "Name",
/* 1298 string _Recursiv */ /* text */ "Recursive property reference for ",
/* 1299 string _Property1 */ /* text */ "Property '",
/* 1300 string _is_unde */ /* text */ "' is undefined",
/* 1301 less$tree$property.js */ [10,11,1,16,17,18,581,48,150,151,19,525,96,167,1293,158,953,698,699,1294,1295,1296,1297,922,1298,663,143,146,147,1283,1021,1279,2,1218,614,141,1219,1220,1019,1299,1300,21,function(Object,exports,require,_definePr,__esModu,_value,__import1,_name,_index1,_fileInf,_prototyp,_assign,_default,_type,_Property,_eval,_pluginMa,_less,_visitors,_ToCSSVis,_mergeRu,_evaluati,_Name,_message,_Recursiv,_filename,_fileInfo,_index,_getIndex,_find,_frames,_property1,_length,_importan1,_merge,_currentF,_inline,_variable2,_importan,_Property1,_is_unde,_call){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var declaration_1 = tslib_1[__import1](require(1230));
var Property = function (name, index, currentFileInfo) { 
    this[_name] = name;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
};
Property[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Property,
    [_eval]: function (context) { 
        var property;
        var name = this[_name];
        // TODO: shorten this reference
        var mergeRules = context[_pluginMa][_less][_visitors][_ToCSSVis][_prototyp][_mergeRu];
        if (this[_evaluati]) { 
            throw { [_type]: _Name,
                [_message]: _Recursiv + name,
                [_filename]: this[_fileInfo]() [_filename],
                [_index]: this[_getIndex]() };
        }
        this[_evaluati] = true;
        property = this[_find](context[_frames], function (frame) { 
            var v;
            var vArr = frame[_property1](name);
            if (vArr) { 
                for (var i = 0; i < vArr[_length]; i++) { 
                    v = vArr[i];
                    vArr[i] = new declaration_1[_default](v[_name], v[_value], v[_importan1], v[_merge], v[_index], v[_currentF], v[_inline], v[_variable2]);
                }
                mergeRules(vArr);
                v = vArr[vArr[_length] - 1];
                if (v[_importan1]) { 
                    var importantScope = context[_importan][context[_importan][_length] - 1];
                    importantScope[_importan1] = v[_importan1];
                }
                v = v[_value][_eval](context);
                return v;
            }
        });
        if (property) { 
            this[_evaluati] = false;
            return property;
        }
        else { 
            throw { [_type]: _Name,
                [_message]: _Property1 + name + _is_unde,
                [_filename]: this[_currentF][_filename],
                [_index]: this[_index] };
        }
    },
    [_find]: function (obj, fun) { 
        for (var i = 0, r = void 0; i < obj[_length]; i++) { 
            r = fun[_call](obj, obj[i]);
            if (r) { 
                return r;
            }
        }
        return null;
    }
});
exports[_default] = Property;
//# sourceMappingURL=property.js.map
return exports
}],
/* 1302 string _operands */ "operands",
/* 1303 string _isSpaced */ "isSpaced",
/* 1304 string _Operatio */ "Operation",
/* 1305 string _Operatio1 */ /* text */ "Operation on an invalid type",
/* 1306 less$tree$operation.js */ [10,11,1,16,17,18,581,580,602,1084,1085,1302,1303,19,525,96,167,1304,131,127,158,1030,1034,111,1208,1122,627,604,922,1305,154,155,933,function(Object,exports,require,_definePr,__esModu,_value,__import1,__import,_Math,_op,_trim,_operands,_isSpaced,_prototyp,_assign,_default,_type,_Operatio,_accept,_visitArr,_eval,_isMathOn,_21,_4,_toColor,_operate1,_math,_PARENS_D,_message,_Operatio1,_genCSS,_add,_14){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var color_1 = tslib_1[__import1](require(1129));
var dimension_1 = tslib_1[__import1](require(1217));
var Constants = tslib_1[__import](require(609));
var MATH = Constants[_Math];
var Operation = function (op, operands, isSpaced) { 
    this[_op] = op[_trim]();
    this[_operands] = operands;
    this[_isSpaced] = isSpaced;
};
Operation[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Operatio,
    [_accept]: function (visitor) { 
        this[_operands] = visitor[_visitArr](this[_operands]);
    },
    [_eval]: function (context) { 
        var a = this[_operands][0] [_eval](context), b = this[_operands][1] [_eval](context), op;
        if (context[_isMathOn](this[_op])) { 
            op = this[_op] === _21 ? _4 : this[_op];
            if (a instanceof dimension_1[_default] && b instanceof color_1[_default]) { 
                a = a[_toColor]();
            }
            if (b instanceof dimension_1[_default] && a instanceof color_1[_default]) { 
                b = b[_toColor]();
            }
            if (!a[_operate1] || !b[_operate1]) { 
                if ((a instanceof Operation || b instanceof Operation)
                    && a[_op] === _4 && context[_math] === MATH[_PARENS_D]) { 
                    return new Operation(this[_op], [a, b], this[_isSpaced]);
                }
                throw { [_type]: _Operatio,
                    [_message]: _Operatio1 };
            }
            return a[_operate1](context, op, b);
        }
        else { 
            return new Operation(this[_op], [a, b], this[_isSpaced]);
        }
    },
    [_genCSS]: function (context, output) { 
        this[_operands][0] [_genCSS](context, output);
        if (this[_isSpaced]) { 
            output[_add](_14);
        }
        output[_add](this[_op]);
        if (this[_isSpaced]) { 
            output[_add](_14);
        }
        this[_operands][1] [_genCSS](context, output);
    }
});
exports[_default] = Operation;
//# sourceMappingURL=operation.js.map
return exports
}],
/* 1307 string _Negative */ "Negative",
/* 1308 less$tree$negative.js */ [10,11,1,16,17,18,581,19,525,96,167,1307,154,155,161,158,1030,162,function(Object,exports,require,_definePr,__esModu,_value,__import1,_prototyp,_assign,_default,_type,_Negative,_genCSS,_add,_7,_eval,_isMathOn,_8){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var operation_1 = tslib_1[__import1](require(1306));
var dimension_1 = tslib_1[__import1](require(1217));
var Negative = function (node) { 
    this[_value] = node;
};
Negative[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Negative,
    [_genCSS]: function (context, output) { 
        output[_add](_7);
        this[_value][_genCSS](context, output);
    },
    [_eval]: function (context) { 
        if (context[_isMathOn]()) { 
            return (new operation_1[_default](_8, [new dimension_1[_default](-1), this[_value]])) [_eval](context);
        }
        return new Negative(this[_value][_eval](context));
    }
});
exports[_default] = Negative;
//# sourceMappingURL=negative.js.map
return exports
}],
/* 1309 string _option */ "option",
/* 1310 string _object_i */ "object_id",
/* 1311 string _next_id */ "next_id",
/* 1312 string _parent_i */ "parent_ids",
/* 1313 string _allowBef */ "allowBefore",
/* 1314 string _allowAft */ "allowAfter",
/* 1315 string _Extend */ "Extend",
/* 1316 string _findSelf */ "findSelfSelectors",
/* 1317 string _selfSele */ "selfSelectors",
/* 1318 less$tree$extend.js */ [10,11,1,16,17,18,581,1244,1309,1310,1311,1312,150,151,175,1100,118,1313,1314,148,19,525,96,167,1315,131,126,158,147,143,174,617,1316,2,1237,1200,933,8,1317,function(Object,exports,require,_definePr,__esModu,_value,__import1,_selector,_option,_object_i,_next_id,_parent_i,_index1,_fileInf,_copyVisi,_allowRoo,_all,_allowBef,_allowAft,_setParen,_prototyp,_assign,_default,_type,_Extend,_accept,_visit,_eval,_getIndex,_fileInfo,_visibili1,_clone,_findSelf,_length,_elements,_combinat,_14,_concat,_selfSele){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var selector_1 = tslib_1[__import1](require(1250));
var Extend = function (selector, option, index, currentFileInfo, visibilityInfo) { 
    this[_selector] = selector;
    this[_option] = option;
    this[_object_i] = Extend[_next_id]++;
    this[_parent_i] = [this[_object_i]];
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_copyVisi](visibilityInfo);
    this[_allowRoo] = true;
    switch (option) { 
        case _all :
            this[_allowBef] = true;
            this[_allowAft] = true;
            break;
        default:
            this[_allowBef] = false;
            this[_allowAft] = false;
            break;
    }
    this[_setParen](this[_selector], this);
};
Extend[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Extend,
    [_accept]: function (visitor) { 
        this[_selector] = visitor[_visit](this[_selector]);
    },
    [_eval]: function (context) { 
        return new Extend(this[_selector][_eval](context), this[_option], this[_getIndex](), this[_fileInfo](), this[_visibili1]());
    },
    [_clone]: function (context) { 
        return new Extend(this[_selector], this[_option], this[_getIndex](), this[_fileInfo](), this[_visibili1]());
    },
    // it concatenates (joins) all selectors in selector array
    [_findSelf]: function (selectors) { 
        var selfElements = [], i, selectorElements;
        for (i = 0; i < selectors[_length]; i++) { 
            selectorElements = selectors[i] [_elements];
            // duplicate the logic in genCSS function inside the selector node.
            // future TODO - move both logics into the selector joiner visitor
            if (i > 0 && selectorElements[_length] && selectorElements[0] [_combinat][_value] === '') { 
                selectorElements[0] [_combinat][_value] = _14;
            }
            selfElements = selfElements[_concat](selectors[i] [_elements]);
        }
        this[_selfSele] = [new selector_1[_default](selfElements)];
        this[_selfSele][0] [_copyVisi](this[_visibili1]());
    }
});
Extend[_next_id] = 0;
exports[_default] = Extend;
//# sourceMappingURL=extend.js.map
return exports
}],
/* 1319 string _noSpacin */ "noSpacing",
/* 1320 string _Expressi */ /* text */ "Expression requires an array parameter",
/* 1321 string _Expressi1 */ "Expression",
/* 1322 string _parensIn */ "parensInOp",
/* 1323 string _throwAwa */ "throwAwayComments",
/* 1324 less$tree$expression.js */ [10,11,1,133,16,17,18,581,1319,1320,19,525,96,167,1321,131,127,158,1030,633,1026,2,503,1322,1024,1028,154,155,933,1323,1267,function(Object,exports,require,Error,_definePr,__esModu,_value,__import1,_noSpacin,_Expressi,_prototyp,_assign,_default,_type,_Expressi1,_accept,_visitArr,_eval,_isMathOn,_parens,_inParent,_length,_map,_parensIn,_inCalc,_outOfPar,_genCSS,_add,_14,_throwAwa,_filter){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var paren_1 = tslib_1[__import1](require(1070));
var comment_1 = tslib_1[__import1](require(1103));
var dimension_1 = tslib_1[__import1](require(1217));
var Expression = function (value, noSpacing) { 
    this[_value] = value;
    this[_noSpacin] = noSpacing;
    if (!value) { 
        throw new Error(_Expressi);
    }
};
Expression[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Expressi1,
    [_accept]: function (visitor) { 
        this[_value] = visitor[_visitArr](this[_value]);
    },
    [_eval]: function (context) { 
        var returnValue;
        var mathOn = context[_isMathOn]();
        var inParenthesis = this[_parens];
        var doubleParen = false;
        if (inParenthesis) { 
            context[_inParent]();
        }
        if (this[_value][_length] > 1) { 
            returnValue = new Expression(this[_value][_map](function (e) { 
                if (!e[_eval]) { 
                    return e;
                }
                return e[_eval](context);
            }), this[_noSpacin]);
        }
        else if (this[_value][_length] === 1) { 
            if (this[_value][0] [_parens] && !this[_value][0] [_parensIn] && !context[_inCalc]) { 
                doubleParen = true;
            }
            returnValue = this[_value][0] [_eval](context);
        }
        else { 
            returnValue = this;
        }
        if (inParenthesis) { 
            context[_outOfPar]();
        }
        if (this[_parens] && this[_parensIn] && !mathOn && !doubleParen
            && (!(returnValue instanceof dimension_1[_default]))) { 
            returnValue = new paren_1[_default](returnValue);
        }
        return returnValue;
    },
    [_genCSS]: function (context, output) { 
        for (var i = 0; i < this[_value][_length]; i++) { 
            this[_value][i] [_genCSS](context, output);
            if (!this[_noSpacin] && i + 1 < this[_value][_length]) { 
                output[_add](_14);
            }
        }
    },
    [_throwAwa]: function () { 
        this[_value] = this[_value][_filter](function (v) { 
            return !(v instanceof comment_1[_default]);
        });
    }
});
exports[_default] = Expression;
//# sourceMappingURL=expression.js.map
return exports
}],
/* 1325 string _isRooted */ "isRooted",
/* 1326 string _AtRule */ "AtRule",
/* 1327 string _charset */ "@charset",
/* 1328 string _outputRu */ "outputRuleset",
/* 1329 string _mediaPat */ "mediaPath",
/* 1330 string _49 */ /* text */ " {",
/* 1331 less$tree$atrule.js */ [10,11,1,84,16,17,18,581,48,96,51,1252,1251,1245,2,1262,148,150,151,99,1325,175,1100,19,525,167,1326,131,127,126,152,1287,1327,154,155,143,147,933,1328,1225,158,1329,1265,1260,174,1220,21,1283,9,1281,1285,115,1180,1181,621,157,1286,1330,function(Object,exports,require,Array,_definePr,__esModu,_value,__import1,_name,_default,_isArray,_rules,_selector1,_createEm,_length,_allowImp,_setParen,_index1,_fileInf,_debugInf,_isRooted,_copyVisi,_allowRoo,_prototyp,_assign,_type,_AtRule,_accept,_visitArr,_visit,_isRulese,_isCharse,_charset,_genCSS,_add,_fileInfo,_getIndex,_14,_outputRu,_45,_eval,_mediaPat,_mediaBlo,_root,_visibili1,_variable2,_call,_find,_apply,_rulesets,_tabLevel,_compress,_40,_41,_10,_join,_46,_49){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var selector_1 = tslib_1[__import1](require(1250));
var ruleset_1 = tslib_1[__import1](require(1292));
var anonymous_1 = tslib_1[__import1](require(1140));
var AtRule = function (name, value, rules, index, currentFileInfo, debugInfo, isRooted, visibilityInfo) { 
    var i;
    this[_name] = name;
    this[_value] = (value instanceof node_1[_default]) ? value : (value ? new anonymous_1[_default](value) : value);
    if (rules) { 
        if (Array[_isArray](rules)) { 
            this[_rules] = rules;
        }
        else { 
            this[_rules] = [rules];
            this[_rules][0] [_selector1] = (new selector_1[_default]([], null, null, index, currentFileInfo)) [_createEm]();
        }
        for (i = 0; i < this[_rules][_length]; i++) { 
            this[_rules][i] [_allowImp] = true;
        }
        this[_setParen](this[_rules], this);
    }
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_debugInf] = debugInfo;
    this[_isRooted] = isRooted || false;
    this[_copyVisi](visibilityInfo);
    this[_allowRoo] = true;
};
AtRule[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _AtRule,
    [_accept]: function (visitor) { 
        var value = this[_value], rules = this[_rules];
        if (rules) { 
            this[_rules] = visitor[_visitArr](rules);
        }
        if (value) { 
            this[_value] = visitor[_visit](value);
        }
    },
    [_isRulese]: function () { 
        return this[_rules] || !this[_isCharse]();
    },
    [_isCharse]: function () { 
        return _charset === this[_name];
    },
    [_genCSS]: function (context, output) { 
        var value = this[_value], rules = this[_rules];
        output[_add](this[_name], this[_fileInfo](), this[_getIndex]());
        if (value) { 
            output[_add](_14);
            value[_genCSS](context, output);
        }
        if (rules) { 
            this[_outputRu](context, output, rules);
        }
        else { 
            output[_add](_45);
        }
    },
    [_eval]: function (context) { 
        var mediaPathBackup, mediaBlocksBackup, value = this[_value], rules = this[_rules];
        // media stored inside other atrule should not bubble over it
        // backpup media bubbling information
        mediaPathBackup = context[_mediaPat];
        mediaBlocksBackup = context[_mediaBlo];
        // deleted media bubbling information
        context[_mediaPat] = [];
        context[_mediaBlo] = [];
        if (value) { 
            value = value[_eval](context);
        }
        if (rules) { 
            // assuming that there is only one rule at this point - that is how parser constructs the rule
            rules = [rules[0] [_eval](context)];
            rules[0] [_root] = true;
        }
        // restore media bubbling information
        context[_mediaPat] = mediaPathBackup;
        context[_mediaBlo] = mediaBlocksBackup;
        return new AtRule(this[_name], value, rules, this[_getIndex](), this[_fileInfo](), this[_debugInf], this[_isRooted], this[_visibili1]());
    },
    [_variable2]: function (name) { 
        if (this[_rules]) { 
            // assuming that there is only one rule at this point - that is how parser constructs the rule
            return ruleset_1[_default][_prototyp][_variable2][_call](this[_rules][0], name);
        }
    },
    [_find]: function () { 
        if (this[_rules]) { 
            // assuming that there is only one rule at this point - that is how parser constructs the rule
            return ruleset_1[_default][_prototyp][_find][_apply](this[_rules][0], arguments);
        }
    },
    [_rulesets]: function () { 
        if (this[_rules]) { 
            // assuming that there is only one rule at this point - that is how parser constructs the rule
            return ruleset_1[_default][_prototyp][_rulesets][_apply](this[_rules][0]);
        }
    },
    [_outputRu]: function (context, output, rules) { 
        var ruleCnt = rules[_length];
        var i;
        context[_tabLevel] = (context[_tabLevel] | 0) + 1;
        // Compressed
        if (context[_compress]) { 
            output[_add](_40);
            for (i = 0; i < ruleCnt; i++) { 
                rules[i] [_genCSS](context, output);
            }
            output[_add](_41);
            context[_tabLevel]--;
            return;
        }
        // Non-compressed
        var tabSetStr = _10 + Array(context[_tabLevel]) [_join](_46), tabRuleStr = tabSetStr + _46;
        if (!ruleCnt) { 
            output[_add](_49 + tabSetStr + _41);
        }
        else { 
            output[_add](_49 + tabRuleStr);
            rules[0] [_genCSS](context, output);
            for (i = 1; i < ruleCnt; i++) { 
                output[_add](tabRuleStr);
                rules[i] [_genCSS](context, output);
            }
            output[_add](tabSetStr + _41);
        }
        context[_tabLevel]--;
    }
});
exports[_default] = AtRule;
//# sourceMappingURL=atrule.js.map
return exports
}],
/* 1332 string _one_or_m */ /* text */ "one or more arguments required",
/* 1333 string _incompat */ /* text */ "incompatible types",
/* 1334 string _convert */ "convert",
/* 1335 string _pi */ "pi",
/* 1336 string _mod */ "mod",
/* 1337 string _argument1 */ /* text */ "arguments must be numbers",
/* 1338 string _percenta */ "percentage",
/* 1339 less$functions$number.js */ [10,11,1,84,123,177,16,17,18,581,19,22,21,2,167,1231,922,1332,96,51,93,9,1206,20,1216,1333,503,153,964,157,115,1040,101,1123,995,1069,1046,1334,1211,1335,207,1336,1113,541,1337,1338,1072,function(Object,exports,require,Array,undefined,Math,_definePr,__esModu,_value,__import1,_prototyp,_slice,_call,_length,_type,_Argument,_message,_one_or_m,_default,_isArray,_push,_apply,_unit,_toString,_unify,_incompat,_map,_toCSS,_context,_join,_compress,_22,_1,_min,_max,_26,_23,_convert,_convertT,_pi,_PI,_mod,_pow,_number,_argument1,_percenta,_27){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var dimension_1 = tslib_1[__import1](require(1217));
var anonymous_1 = tslib_1[__import1](require(1140));
var math_helper_js_1 = tslib_1[__import1](require(1233));
var minMax = function (isMin, args) { 
    args = Array[_prototyp][_slice][_call](args);
    switch (args[_length]) { 
        case 0: throw { [_type]: _Argument, [_message]: _one_or_m };
    }
    var i; // key is the unit.toString() for unified Dimension values,
    var j;
    var current;
    var currentUnified;
    var referenceUnified;
    var unit;
    var unitStatic;
    var unitClone;
    var // elems only contains original argument values.
    order = [];
    var values = {};
    // value is the index into the order array.
    for (i = 0; i < args[_length]; i++) { 
        current = args[i];
        if (!(current instanceof dimension_1[_default])) { 
            if (Array[_isArray](args[i] [_value])) { 
                Array[_prototyp][_push][_apply](args, Array[_prototyp][_slice][_call](args[i] [_value]));
            }
            continue;
        }
        currentUnified = current[_unit][_toString]() === '' && unitClone !== undefined ? new dimension_1[_default](current[_value], unitClone) [_unify]() : current[_unify]();
        unit = currentUnified[_unit][_toString]() === '' && unitStatic !== undefined ? unitStatic : currentUnified[_unit][_toString]();
        unitStatic = unit !== '' && unitStatic === undefined || unit !== '' && order[0] [_unify]() [_unit][_toString]() === '' ? unit : unitStatic;
        unitClone = unit !== '' && unitClone === undefined ? current[_unit][_toString]() : unitClone;
        j = values[''] !== undefined && unit !== '' && unit === unitStatic ? values[''] : values[unit];
        if (j === undefined) { 
            if (unitStatic !== undefined && unit !== unitStatic) { 
                throw { [_type]: _Argument, [_message]: _incompat };
            }
            values[unit] = order[_length];
            order[_push](current);
            continue;
        }
        referenceUnified = order[j] [_unit][_toString]() === '' && unitClone !== undefined ? new dimension_1[_default](order[j] [_value], unitClone) [_unify]() : order[j] [_unify]();
        if (isMin && currentUnified[_value] < referenceUnified[_value] ||
            !isMin && currentUnified[_value] > referenceUnified[_value]) { 
            order[j] = current;
        }
    }
    if (order[_length] == 1) { 
        return order[0];
    }
    args = order[_map](function (a) { return a[_toCSS](this[_context]); }) [_join](this[_context][_compress] ? _22 : _1);
    return new anonymous_1[_default]((isMin ? _min : _max) + _26 + args + _23);
};
exports[_default] = { 
    [_min]: function () { 
        var args = [];
        for (var _i = 0; _i < arguments[_length]; _i++) { 
            args[_i] = arguments[_i];
        }
        try { 
            return minMax(true, args);
        }
        catch (e) {}
    },
    [_max]: function () { 
        var args = [];
        for (var _i = 0; _i < arguments[_length]; _i++) { 
            args[_i] = arguments[_i];
        }
        try { 
            return minMax(false, args);
        }
        catch (e) {}
    },
    [_convert]: function (val, unit) { 
        return val[_convertT](unit[_value]);
    },
    [_pi]: function () { 
        return new dimension_1[_default](Math[_PI]);
    },
    [_mod]: function (a, b) { 
        return new dimension_1[_default](a[_value] % b[_value], a[_unit]);
    },
    [_pow]: function (x, y) { 
        if (typeof x === _number && typeof y === _number) { 
            x = new dimension_1[_default](x);
            y = new dimension_1[_default](y);
        }
        else if (!(x instanceof dimension_1[_default]) || !(y instanceof dimension_1[_default])) { 
            throw { [_type]: _Argument, [_message]: _argument1 };
        }
        return new dimension_1[_default](Math[_pow](x[_value], y[_value]), x[_unit]);
    },
    [_percenta]: function (n) { 
        var result = math_helper_js_1[_default](function (num) { return num * 100; }, _27, n);
        return result;
    }
};
//# sourceMappingURL=number.js.map
return exports
}],
/* 1340 string _ceil */ "ceil",
/* 1341 string _floor */ "floor",
/* 1342 string _sin */ "sin",
/* 1343 string _cos */ "cos",
/* 1344 string _atan */ "atan",
/* 1345 string _asin */ "asin",
/* 1346 string _acos */ "acos",
/* 1347 less$functions$math.js */ [10,11,1,177,16,17,18,581,1340,1341,1148,1151,477,1342,1343,1344,206,1345,1346,46,96,948,1117,929,165,function(Object,exports,require,Math,_definePr,__esModu,_value,__import1,_ceil,_floor,_sqrt,_abs,_tan,_sin,_cos,_atan,_rad,_asin,_acos,_hasOwnPr,_default,_bind,_round,_undefine,_toFixed){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var math_helper_js_1 = tslib_1[__import1](require(1233));
var mathFunctions = { 
    // name,  unit
    [_ceil]: null,
    [_floor]: null,
    [_sqrt]: null,
    [_abs]: null,
    [_tan]: '',
    [_sin]: '',
    [_cos]: '',
    [_atan]: _rad,
    [_asin]: _rad,
    [_acos]: _rad
};
for (var f in mathFunctions) { 
    if (mathFunctions[_hasOwnPr](f)) { 
        mathFunctions[f] = math_helper_js_1[_default][_bind](null, Math[f], mathFunctions[f]);
    }
}
mathFunctions[_round] = function (n, f) { 
    var fraction = typeof f === _undefine ? 0 : f[_value];
    return math_helper_js_1[_default](function (num) { return num[_toFixed](fraction); }, null, n);
};
exports[_default] = mathFunctions;
//# sourceMappingURL=math.js.map
return exports
}],
/* 1348 string _func */ "func",
/* 1349 string _isValid */ "isValid",
/* 1350 less$functions$function-caller.js */ [10,11,1,15,84,16,17,18,581,48,596,146,964,141,1348,1021,711,142,19,1349,21,51,1156,503,158,167,1101,1267,1321,2,633,1084,111,96,9,574,function(Object,exports,require,Boolean,Array,_definePr,__esModu,_value,__import1,_name,_toLowerC,_index,_context,_currentF,_func,_frames,_function2,_get,_prototyp,_isValid,_call,_isArray,_evalArgs,_map,_eval,_type,_Comment,_filter,_Expressi1,_length,_parens,_op,_4,_default,_apply,__spread3){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var expression_1 = tslib_1[__import1](require(1324));
var functionCaller = /** @class */ (function () { 
    function functionCaller(name, context, index, currentFileInfo) { 
        this[_name] = name[_toLowerC]();
        this[_index] = index;
        this[_context] = context;
        this[_currentF] = currentFileInfo;
        this[_func] = context[_frames][0] [_function2][_get](this[_name]);
    }
    functionCaller[_prototyp][_isValid] = function () { 
        return Boolean(this[_func]);
    };
    functionCaller[_prototyp][_call] = function (args) { 
        var _this = this;
        if (!(Array[_isArray](args))) { 
            args = [args];
        }
        var evalArgs = this[_func][_evalArgs];
        if (evalArgs !== false) { 
            args = args[_map](function (a) { return a[_eval](_this[_context]); });
        }
        var commentFilter = function (item) { return !(item[_type] === _Comment); };
        // This code is terrible and should be replaced as per this issue...
        // https://github.com/less/less.js/issues/2477
        args = args
            [_filter](commentFilter)
            [_map](function (item) { 
            if (item[_type] === _Expressi1) { 
                var subNodes = item[_value][_filter](commentFilter);
                if (subNodes[_length] === 1) { 
                    // https://github.com/less/less.js/issues/3616
                    if (item[_parens] && subNodes[0] [_op] === _4) { 
                        return item;
                    }
                    return subNodes[0];
                }
                else { 
                    return new expression_1[_default](subNodes);
                }
            }
            return item;
        });
        if (evalArgs === false) { 
            return this[_func][_apply](this, tslib_1[__spread3]([this[_context]], args));
        }
        return this[_func][_apply](this, args);
    };
    return functionCaller;
}());
exports[_default] = functionCaller;
//# sourceMappingURL=function-caller.js.map
return exports
}],
/* 1351 string _anonymou */ /* text */ "anonymous mixin",
/* 1352 string _params */ "params",
/* 1353 string _variadic */ "variadic",
/* 1354 string _arity */ "arity",
/* 1355 string _required */ "required",
/* 1356 string _optional1 */ "optionalParameters",
/* 1357 string _MixinDef */ "MixinDefinition",
/* 1358 string _evalPara */ "evalParams",
/* 1359 string _Runtime */ "Runtime",
/* 1360 string _Named_ar */ /* text */ "Named argument for ",
/* 1361 string _not_fou */ /* text */ " not found",
/* 1362 string _wrong_nu */ /* text */ "wrong number of arguments for ",
/* 1363 string _50 */ /* text */ " (",
/* 1364 string _for_ */ /* text */ " for ",
/* 1365 string _evalCall */ "evalCall",
/* 1366 string _argumen */ "@arguments",
/* 1367 less$tree$mixin-definition.js */ [10,11,1,84,177,16,17,18,581,580,48,1351,1251,96,150,151,1352,1235,1353,1354,2,1252,1253,1355,506,93,1356,1021,175,1100,19,525,167,1357,1081,131,127,126,1358,618,711,599,1020,8,158,1282,715,1359,922,1360,933,1361,51,1268,1362,1363,1364,1046,1228,503,1365,1366,1259,1273,1272,3,1123,153,function(Object,exports,require,Array,Math,_definePr,__esModu,_value,__import1,__import,_name,_anonymou,_selector1,_default,_index1,_fileInf,_params,_conditio,_variadic,_arity,_length,_rules,_lookups,_required,_reduce,_push,_optional1,_frames,_copyVisi,_allowRoo,_prototyp,_assign,_type,_MixinDef,_evalFirs,_accept,_visitArr,_visit,_evalPara,_copyArra,_function2,_inherit,_Eval,_concat,_eval,_prependR,_splice,_Runtime,_message,_Named_ar,_14,_not_fou,_isArray,_resetCac,_wrong_nu,_50,_for_,_23,_makeImpo,_map,_evalCall,_argumen,_original1,_matchCon,_matchArg,_indexOf,_min,_toCSS){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var selector_1 = tslib_1[__import1](require(1250));
var element_1 = tslib_1[__import1](require(1204));
var ruleset_1 = tslib_1[__import1](require(1292));
var declaration_1 = tslib_1[__import1](require(1230));
var detached_ruleset_1 = tslib_1[__import1](require(1083));
var expression_1 = tslib_1[__import1](require(1324));
var contexts_1 = tslib_1[__import1](require(1037));
var utils = tslib_1[__import](require(636));
var Definition = function (name, params, rules, condition, variadic, frames, visibilityInfo) { 
    this[_name] = name || _anonymou;
    this[_selector1] = [new selector_1[_default]([new element_1[_default](null, name, false, this[_index1], this[_fileInf])])];
    this[_params] = params;
    this[_conditio] = condition;
    this[_variadic] = variadic;
    this[_arity] = params[_length];
    this[_rules] = rules;
    this[_lookups] = {};
    var optionalParameters = [];
    this[_required] = params[_reduce](function (count, p) { 
        if (!p[_name] || (p[_name] && !p[_value])) { 
            return count + 1;
        }
        else { 
            optionalParameters[_push](p[_name]);
            return count;
        }
    }, 0);
    this[_optional1] = optionalParameters;
    this[_frames] = frames;
    this[_copyVisi](visibilityInfo);
    this[_allowRoo] = true;
};
Definition[_prototyp] = Object[_assign](new ruleset_1[_default](), { 
    [_type]: _MixinDef,
    [_evalFirs]: true,
    [_accept]: function (visitor) { 
        if (this[_params] && this[_params][_length]) { 
            this[_params] = visitor[_visitArr](this[_params]);
        }
        this[_rules] = visitor[_visitArr](this[_rules]);
        if (this[_conditio]) { 
            this[_conditio] = visitor[_visit](this[_conditio]);
        }
    },
    [_evalPara]: function (context, mixinEnv, args, evaldArguments) { 
        /* jshint boss:true */
        var frame = new ruleset_1[_default](null, null);
        var varargs;
        var arg;
        var params = utils[_copyArra](this[_params]);
        var i;
        var j;
        var val;
        var name;
        var isNamedFound;
        var argIndex;
        var argsLength = 0;
        if (mixinEnv[_frames] && mixinEnv[_frames][0] && mixinEnv[_frames][0] [_function2]) { 
            frame[_function2] = mixinEnv[_frames][0] [_function2][_inherit]();
        }
        mixinEnv = new contexts_1[_default][_Eval](mixinEnv, [frame] [_concat](mixinEnv[_frames]));
        if (args) { 
            args = utils[_copyArra](args);
            argsLength = args[_length];
            for (i = 0; i < argsLength; i++) { 
                arg = args[i];
                if (name = (arg && arg[_name])) { 
                    isNamedFound = false;
                    for (j = 0; j < params[_length]; j++) { 
                        if (!evaldArguments[j] && name === params[j] [_name]) { 
                            evaldArguments[j] = arg[_value][_eval](context);
                            frame[_prependR](new declaration_1[_default](name, arg[_value][_eval](context)));
                            isNamedFound = true;
                            break;
                        }
                    }
                    if (isNamedFound) { 
                        args[_splice](i, 1);
                        i--;
                        continue;
                    }
                    else { 
                        throw { [_type]: _Runtime, [_message]: _Named_ar + this[_name] + _14 + args[i] [_name] + _not_fou };
                    }
                }
            }
        }
        argIndex = 0;
        for (i = 0; i < params[_length]; i++) { 
            if (evaldArguments[i]) { 
                continue;
            }
            arg = args && args[argIndex];
            if (name = params[i] [_name]) { 
                if (params[i] [_variadic]) { 
                    varargs = [];
                    for (j = argIndex; j < argsLength; j++) { 
                        varargs[_push](args[j] [_value][_eval](context));
                    }
                    frame[_prependR](new declaration_1[_default](name, new expression_1[_default](varargs) [_eval](context)));
                }
                else { 
                    val = arg && arg[_value];
                    if (val) { 
                        // This was a mixin call, pass in a detached ruleset of it's eval'd rules
                        if (Array[_isArray](val)) { 
                            val = new detached_ruleset_1[_default](new ruleset_1[_default]('', val));
                        }
                        else { 
                            val = val[_eval](context);
                        }
                    }
                    else if (params[i] [_value]) { 
                        val = params[i] [_value][_eval](mixinEnv);
                        frame[_resetCac]();
                    }
                    else { 
                        throw { [_type]: _Runtime, [_message]: _wrong_nu + this[_name] + _50 + argsLength + _for_ + this[_arity] + _23 };
                    }
                    frame[_prependR](new declaration_1[_default](name, val));
                    evaldArguments[i] = val;
                }
            }
            if (params[i] [_variadic] && args) { 
                for (j = argIndex; j < argsLength; j++) { 
                    evaldArguments[j] = args[j] [_value][_eval](context);
                }
            }
            argIndex++;
        }
        return frame;
    },
    [_makeImpo]: function () { 
        var rules = !this[_rules] ? this[_rules] : this[_rules][_map](function (r) { 
            if (r[_makeImpo]) { 
                return r[_makeImpo](true);
            }
            else { 
                return r;
            }
        });
        var result = new Definition(this[_name], this[_params], rules, this[_conditio], this[_variadic], this[_frames]);
        return result;
    },
    [_eval]: function (context) { 
        return new Definition(this[_name], this[_params], this[_rules], this[_conditio], this[_variadic], this[_frames] || utils[_copyArra](context[_frames]));
    },
    [_evalCall]: function (context, args, important) { 
        var _arguments = [];
        var mixinFrames = this[_frames] ? this[_frames][_concat](context[_frames]) : context[_frames];
        var frame = this[_evalPara](context, new contexts_1[_default][_Eval](context, mixinFrames), args, _arguments);
        var rules;
        var ruleset;
        frame[_prependR](new declaration_1[_default](_argumen, new expression_1[_default](_arguments) [_eval](context)));
        rules = utils[_copyArra](this[_rules]);
        ruleset = new ruleset_1[_default](null, rules);
        ruleset[_original1] = this;
        ruleset = ruleset[_eval](new contexts_1[_default][_Eval](context, [this, frame] [_concat](mixinFrames)));
        if (important) { 
            ruleset = ruleset[_makeImpo]();
        }
        return ruleset;
    },
    [_matchCon]: function (args, context) { 
        if (this[_conditio] && !this[_conditio][_eval](new contexts_1[_default][_Eval](context, [this[_evalPara](context, /* the parameter variables */ new contexts_1[_default][_Eval](context, this[_frames] ? this[_frames][_concat](context[_frames]) : context[_frames]), args, [])]
            [_concat](this[_frames] || []) // the parent namespace/mixin frames
            [_concat](context[_frames])))) { // the current environment frames
            return false;
        }
        return true;
    },
    [_matchArg]: function (args, context) { 
        var allArgsCnt = (args && args[_length]) || 0;
        var len;
        var optionalParameters = this[_optional1];
        var requiredArgsCnt = !args ? 0 : args[_reduce](function (count, p) { 
            if (optionalParameters[_indexOf](p[_name]) < 0) { 
                return count + 1;
            }
            else { 
                return count;
            }
        }, 0);
        if (!this[_variadic]) { 
            if (requiredArgsCnt < this[_required]) { 
                return false;
            }
            if (allArgsCnt > this[_params][_length]) { 
                return false;
            }
        }
        else { 
            if (requiredArgsCnt < (this[_required] - 1)) { 
                return false;
            }
        }
        // check patterns
        len = Math[_min](requiredArgsCnt, this[_arity]);
        for (var i = 0; i < len; i++) { 
            if (!this[_params][i] [_name] && !this[_params][i] [_variadic]) { 
                if (args[i] [_value][_eval](context) [_toCSS]() != this[_params][i] [_value][_eval](context) [_toCSS]()) { 
                    return false;
                }
            }
        }
        return true;
    }
});
exports[_default] = Definition;
//# sourceMappingURL=mixin-definition.js.map
return exports
}],
/* 1368 string _argument2 */ "arguments",
/* 1369 string _expand */ "expand",
/* 1370 string _mixin */ "mixin",
/* 1371 string _group */ "group",
/* 1372 string _Ambiguou */ /* text */ "Ambiguous use of `default()` found when matching for `",
/* 1373 string _format */ "format",
/* 1374 string _setVisi */ "_setVisibilityToReplacement",
/* 1375 string _No_match */ /* text */ "No matching definition was found for `",
/* 1376 string _is_unde1 */ /* text */ " is undefined",
/* 1377 string _51 */ "???",
/* 1378 less$tree$mixin-call.js */ [10,11,1,84,16,17,18,581,1244,96,1368,150,151,1218,1100,148,19,525,167,1266,131,126,2,127,158,1273,1369,51,93,48,1272,1021,1283,1284,1003,1259,1370,1371,937,1359,922,1372,1373,186,146,147,663,143,1252,174,1365,1374,9,923,1375,1297,153,1085,1376,128,171,1069,503,942,1377,157,101,1046,function(Object,exports,require,Array,_definePr,__esModu,_value,__import1,_selector,_default,_argument2,_index1,_fileInf,_importan1,_allowRoo,_setParen,_prototyp,_assign,_type,_MixinCal,_accept,_visit,_length,_visitArr,_eval,_matchCon,_expand,_isArray,_push,_name,_matchArg,_frames,_find,_rule,_path,_original1,_mixin,_group,_reset,_Runtime,_message,_Ambiguou,_format,_9,_index,_getIndex,_filename,_fileInfo,_rules,_visibili1,_evalCall,_setVisi,_apply,_stack,_No_match,_Name,_toCSS,_trim,_is_unde1,_blocksVi,_addVisib,_26,_map,_15,_51,_join,_1,_23){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var selector_1 = tslib_1[__import1](require(1250));
var mixin_definition_1 = tslib_1[__import1](require(1367));
var default_1 = tslib_1[__import1](require(1143));
var MixinCall = function (elements, args, index, currentFileInfo, important) { 
    this[_selector] = new selector_1[_default](elements);
    this[_argument2] = args || [];
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_importan1] = important;
    this[_allowRoo] = true;
    this[_setParen](this[_selector], this);
};
MixinCall[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _MixinCal,
    [_accept]: function (visitor) { 
        if (this[_selector]) { 
            this[_selector] = visitor[_visit](this[_selector]);
        }
        if (this[_argument2][_length]) { 
            this[_argument2] = visitor[_visitArr](this[_argument2]);
        }
    },
    [_eval]: function (context) { 
        var mixins;
        var mixin;
        var mixinPath;
        var args = [];
        var arg;
        var argValue;
        var rules = [];
        var match = false;
        var i;
        var m;
        var f;
        var isRecursive;
        var isOneFound;
        var candidates = [];
        var candidate;
        var conditionResult = [];
        var defaultResult;
        var defFalseEitherCase = -1;
        var defNone = 0;
        var defTrue = 1;
        var defFalse = 2;
        var count;
        var originalRuleset;
        var noArgumentsFilter;
        this[_selector] = this[_selector][_eval](context);
        function calcDefGroup(mixin, mixinPath) { 
            var f, p, namespace;
            for (f = 0; f < 2; f++) { 
                conditionResult[f] = true;
                default_1[_default][_value](f);
                for (p = 0; p < mixinPath[_length] && conditionResult[f]; p++) { 
                    namespace = mixinPath[p];
                    if (namespace[_matchCon]) { 
                        conditionResult[f] = conditionResult[f] && namespace[_matchCon](null, context);
                    }
                }
                if (mixin[_matchCon]) { 
                    conditionResult[f] = conditionResult[f] && mixin[_matchCon](args, context);
                }
            }
            if (conditionResult[0] || conditionResult[1]) { 
                if (conditionResult[0] != conditionResult[1]) { 
                    return conditionResult[1] ?
                        defTrue : defFalse;
                }
                return defNone;
            }
            return defFalseEitherCase;
        }
        for (i = 0; i < this[_argument2][_length]; i++) { 
            arg = this[_argument2][i];
            argValue = arg[_value][_eval](context);
            if (arg[_expand] && Array[_isArray](argValue[_value])) { 
                argValue = argValue[_value];
                for (m = 0; m < argValue[_length]; m++) { 
                    args[_push]({ [_value]: argValue[m] });
                }
            }
            else { 
                args[_push]({ [_name]: arg[_name], [_value]: argValue });
            }
        }
        noArgumentsFilter = function (rule) { return rule[_matchArg](null, context); };
        for (i = 0; i < context[_frames][_length]; i++) { 
            if ((mixins = context[_frames][i] [_find](this[_selector], null, noArgumentsFilter)) [_length] > 0) { 
                isOneFound = true;
                // To make `default()` function independent of definition order we have two "subpasses" here.
                // At first we evaluate each guard *twice* (with `default() == true` and `default() == false`),
                // and build candidate list with corresponding flags. Then, when we know all possible matches,
                // we make a final decision.
                for (m = 0; m < mixins[_length]; m++) { 
                    mixin = mixins[m] [_rule];
                    mixinPath = mixins[m] [_path];
                    isRecursive = false;
                    for (f = 0; f < context[_frames][_length]; f++) { 
                        if ((!(mixin instanceof mixin_definition_1[_default])) && mixin === (context[_frames][f] [_original1] || context[_frames][f])) { 
                            isRecursive = true;
                            break;
                        }
                    }
                    if (isRecursive) { 
                        continue;
                    }
                    if (mixin[_matchArg](args, context)) { 
                        candidate = { [_mixin]: mixin, [_group]: calcDefGroup(mixin, mixinPath) };
                        if (candidate[_group] !== defFalseEitherCase) { 
                            candidates[_push](candidate);
                        }
                        match = true;
                    }
                }
                default_1[_default][_reset]();
                count = [0, 0, 0];
                for (m = 0; m < candidates[_length]; m++) { 
                    count[candidates[m] [_group]]++;
                }
                if (count[defNone] > 0) { 
                    defaultResult = defFalse;
                }
                else { 
                    defaultResult = defTrue;
                    if ((count[defTrue] + count[defFalse]) > 1) { 
                        throw { [_type]: _Runtime,
                            [_message]: _Ambiguou + this[_format](args) + _9,
                            [_index]: this[_getIndex](), [_filename]: this[_fileInfo]() [_filename] };
                    }
                }
                for (m = 0; m < candidates[_length]; m++) { 
                    candidate = candidates[m] [_group];
                    if ((candidate === defNone) || (candidate === defaultResult)) { 
                        try { 
                            mixin = candidates[m] [_mixin];
                            if (!(mixin instanceof mixin_definition_1[_default])) { 
                                originalRuleset = mixin[_original1] || mixin;
                                mixin = new mixin_definition_1[_default]('', [], mixin[_rules], null, false, null, originalRuleset[_visibili1]());
                                mixin[_original1] = originalRuleset;
                            }
                            var newRules = mixin[_evalCall](context, args, this[_importan1]) [_rules];
                            this[_setVisi](newRules);
                            Array[_prototyp][_push][_apply](rules, newRules);
                        }
                        catch (e) { 
                            throw { [_message]: e[_message], [_index]: this[_getIndex](), [_filename]: this[_fileInfo]() [_filename], [_stack]: e[_stack] };
                        }
                    }
                }
                if (match) { 
                    return rules;
                }
            }
        }
        if (isOneFound) { 
            throw { [_type]: _Runtime,
                [_message]: _No_match + this[_format](args) + _9,
                [_index]: this[_getIndex](), [_filename]: this[_fileInfo]() [_filename] };
        }
        else { 
            throw { [_type]: _Name,
                [_message]: this[_selector][_toCSS]() [_trim]() + _is_unde1,
                [_index]: this[_getIndex](), [_filename]: this[_fileInfo]() [_filename] };
        }
    },
    [_setVisi]: function (replacement) { 
        var i, rule;
        if (this[_blocksVi]()) { 
            for (i = 0; i < replacement[_length]; i++) { 
                rule = replacement[i];
                rule[_addVisib]();
            }
        }
    },
    [_format]: function (args) { 
        return this[_selector][_toCSS]() [_trim]() + _26 + (args ? args[_map](function (a) { 
            var argValue = '';
            if (a[_name]) { 
                argValue += a[_name] + _15;
            }
            if (a[_value][_toCSS]) { 
                argValue += a[_value][_toCSS]();
            }
            else { 
                argValue += _51;
            }
            return argValue;
        }) [_join](_1) : '') + _23;
    }
});
exports[_default] = MixinCall;
//# sourceMappingURL=mixin-call.js.map
return exports
}],
/* 1379 string _features */ "features",
/* 1380 string _Media */ "Media",
/* 1381 string _media_ */ /* text */ "@media ",
/* 1382 string _evalTop */ "evalTop",
/* 1383 string _evalNest */ "evalNested",
/* 1384 string _multiMed */ "multiMedia",
/* 1385 string _permute */ "permute",
/* 1386 less$tree$media.js */ [10,11,1,84,16,17,18,581,580,150,151,96,1245,1379,1252,1262,175,1100,148,19,525,167,1380,152,131,126,127,154,155,1381,1328,158,1265,1329,174,99,93,711,1021,599,1263,549,540,2,1382,1383,147,143,1384,8,51,1385,503,153,715,1090,22,1270,618,function(Object,exports,require,Array,_definePr,__esModu,_value,__import1,__import,_index1,_fileInf,_default,_createEm,_features,_rules,_allowImp,_copyVisi,_allowRoo,_setParen,_prototyp,_assign,_type,_Media,_isRulese,_accept,_visit,_visitArr,_genCSS,_add,_media_,_outputRu,_eval,_mediaBlo,_mediaPat,_visibili1,_debugInf,_push,_function2,_frames,_inherit,_unshift,_shift,_pop,_length,_evalTop,_evalNest,_getIndex,_fileInfo,_multiMed,_concat,_isArray,_permute,_map,_toCSS,_splice,_and,_slice,_bubbleSe,_copyArra){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var ruleset_1 = tslib_1[__import1](require(1292));
var value_1 = tslib_1[__import1](require(1041));
var selector_1 = tslib_1[__import1](require(1250));
var anonymous_1 = tslib_1[__import1](require(1140));
var expression_1 = tslib_1[__import1](require(1324));
var atrule_1 = tslib_1[__import1](require(1331));
var utils = tslib_1[__import](require(636));
var Media = function (value, features, index, currentFileInfo, visibilityInfo) { 
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    var selectors = (new selector_1[_default]([], null, null, this[_index1], this[_fileInf])) [_createEm]();
    this[_features] = new value_1[_default](features);
    this[_rules] = [new ruleset_1[_default](selectors, value)];
    this[_rules][0] [_allowImp] = true;
    this[_copyVisi](visibilityInfo);
    this[_allowRoo] = true;
    this[_setParen](selectors, this);
    this[_setParen](this[_features], this);
    this[_setParen](this[_rules], this);
};
Media[_prototyp] = Object[_assign](new atrule_1[_default](), { 
    [_type]: _Media,
    [_isRulese]: function () { 
        return true;
    },
    [_accept]: function (visitor) { 
        if (this[_features]) { 
            this[_features] = visitor[_visit](this[_features]);
        }
        if (this[_rules]) { 
            this[_rules] = visitor[_visitArr](this[_rules]);
        }
    },
    [_genCSS]: function (context, output) { 
        output[_add](_media_, this[_fileInf], this[_index1]);
        this[_features][_genCSS](context, output);
        this[_outputRu](context, output, this[_rules]);
    },
    [_eval]: function (context) { 
        if (!context[_mediaBlo]) { 
            context[_mediaBlo] = [];
            context[_mediaPat] = [];
        }
        var media = new Media(null, [], this[_index1], this[_fileInf], this[_visibili1]());
        if (this[_debugInf]) { 
            this[_rules][0] [_debugInf] = this[_debugInf];
            media[_debugInf] = this[_debugInf];
        }
        media[_features] = this[_features][_eval](context);
        context[_mediaPat][_push](media);
        context[_mediaBlo][_push](media);
        this[_rules][0] [_function2] = context[_frames][0] [_function2][_inherit]();
        context[_frames][_unshift](this[_rules][0]);
        media[_rules] = [this[_rules][0] [_eval](context)];
        context[_frames][_shift]();
        context[_mediaPat][_pop]();
        return context[_mediaPat][_length] === 0 ? media[_evalTop](context) :
            media[_evalNest](context);
    },
    [_evalTop]: function (context) { 
        var result = this;
        // Render all dependent Media blocks.
        if (context[_mediaBlo][_length] > 1) { 
            var selectors = (new selector_1[_default]([], null, null, this[_getIndex](), this[_fileInfo]())) [_createEm]();
            result = new ruleset_1[_default](selectors, context[_mediaBlo]);
            result[_multiMed] = true;
            result[_copyVisi](this[_visibili1]());
            this[_setParen](result, this);
        }
        delete context[_mediaBlo];
        delete context[_mediaPat];
        return result;
    },
    [_evalNest]: function (context) { 
        var i;
        var value;
        var path = context[_mediaPat][_concat]([this]);
        // Extract the media-query conditions separated with `,` (OR).
        for (i = 0; i < path[_length]; i++) { 
            value = path[i] [_features] instanceof value_1[_default] ?
                path[i] [_features][_value] : path[i] [_features];
            path[i] = Array[_isArray](value) ? value : [value];
        }
        // Trace all permutations to generate the resulting media-query.
        //
        // (a, b and c) with nested (d, e) ->
        //    a and d
        //    a and e
        //    b and c and d
        //    b and c and e
        this[_features] = new value_1[_default](this[_permute](path) [_map](function (path) { 
            path = path[_map](function (fragment) { return fragment[_toCSS] ? fragment : new anonymous_1[_default](fragment); });
            for (i = path[_length] - 1; i > 0; i--) { 
                path[_splice](i, 0, new anonymous_1[_default](_and));
            }
            return new expression_1[_default](path);
        }));
        this[_setParen](this[_features], this);
        // Fake a tree-node that doesn't output anything.
        return new ruleset_1[_default]([], []);
    },
    [_permute]: function (arr) { 
        if (arr[_length] === 0) { 
            return [];
        }
        else if (arr[_length] === 1) { 
            return arr[0];
        }
        else { 
            var result = [];
            var rest = this[_permute](arr[_slice](1));
            for (var i = 0; i < rest[_length]; i++) { 
                for (var j = 0; j < arr[0] [_length]; j++) { 
                    result[_push]([arr[0][j]] [_concat](rest[i]));
                }
            }
            return result;
        }
    },
    [_bubbleSe]: function (selectors) { 
        if (!selectors) { 
            return;
        }
        this[_rules] = [new ruleset_1[_default](utils[_copyArra](selectors), [this[_rules][0]])];
        this[_setParen](this[_rules], this);
    }
});
exports[_default] = Media;
//# sourceMappingURL=media.js.map
return exports
}],
/* 1387 string _calc */ "calc",
/* 1388 string _Call */ "Call",
/* 1389 string _Error_ev */ /* text */ "Error evaluating function `",
/* 1390 string _columnNu */ "columnNumber",
/* 1391 less$tree$call.js */ [10,11,1,123,16,17,18,581,48,91,1387,150,151,19,525,96,167,1388,131,127,158,1029,1024,1022,1025,147,143,1349,21,46,623,624,1359,922,1389,186,1223,146,663,100,1390,20,503,154,155,1069,2,101,1046,function(Object,exports,require,undefined,_definePr,__esModu,_value,__import1,_name,_args,_calc,_index1,_fileInf,_prototyp,_assign,_default,_type,_Call,_accept,_visitArr,_eval,_mathOn,_inCalc,_enterCal,_exitCalc,_getIndex,_fileInfo,_isValid,_call,_hasOwnPr,_line,_column,_Runtime,_message,_Error_ev,_9,_44,_index,_filename,_lineNumb,_columnNu,_toString,_map,_genCSS,_add,_26,_length,_1,_23){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var anonymous_1 = tslib_1[__import1](require(1140));
var function_caller_1 = tslib_1[__import1](require(1350));
//
// A function call node.
//
var Call = function (name, args, index, currentFileInfo) { 
    this[_name] = name;
    this[_args] = args;
    this[_calc] = name === _calc;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
};
Call[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Call,
    [_accept]: function (visitor) { 
        if (this[_args]) { 
            this[_args] = visitor[_visitArr](this[_args]);
        }
    },
    //
    // When evaluating a function call,
    // we either find the function in the functionRegistry,
    // in which case we call it, passing the  evaluated arguments,
    // if this returns null or we cannot find the function, we
    // simply print it out as it appeared originally [2].
    //
    // The reason why we evaluate the arguments, is in the case where
    // we try to pass a variable to a function, like: `saturate(@color)`.
    // The function should receive the value, not the variable.
    //
    [_eval]: function (context) { 
        var _this = this;
        /**
         * Turn off math for calc(), and switch back on for evaluating nested functions
         */
        var currentMathContext = context[_mathOn];
        context[_mathOn] = !this[_calc];
        if (this[_calc] || context[_inCalc]) { 
            context[_enterCal]();
        }
        var exitCalc = function () { 
            if (_this[_calc] || context[_inCalc]) { 
                context[_exitCalc]();
            }
            context[_mathOn] = currentMathContext;
        };
        var result;
        var funcCaller = new function_caller_1[_default](this[_name], context, this[_getIndex](), this[_fileInfo]());
        if (funcCaller[_isValid]()) { 
            try { 
                result = funcCaller[_call](this[_args]);
                exitCalc();
            }
            catch (e) { 
                if (e[_hasOwnPr](_line) && e[_hasOwnPr](_column)) { 
                    throw e;
                }
                throw { 
                    [_type]: e[_type] || _Runtime,
                    [_message]: _Error_ev + this[_name] + _9 + (e[_message] ? _44 + e[_message] : ''),
                    [_index]: this[_getIndex](),
                    [_filename]: this[_fileInfo]() [_filename],
                    [_line]: e[_lineNumb],
                    [_column]: e[_columnNu]
                };
            }
        }
        if (result !== null && result !== undefined) { 
            // Results that that are not nodes are cast as Anonymous nodes
            // Falsy values or booleans are returned as empty nodes
            if (!(result instanceof node_1[_default])) { 
                if (!result || result === true) { 
                    result = new anonymous_1[_default](null);
                }
                else { 
                    result = new anonymous_1[_default](result[_toString]());
                }
            }
            result[_index1] = this[_index1];
            result[_fileInf] = this[_fileInf];
            return result;
        }
        var args = this[_args][_map](function (a) { return a[_eval](context); });
        exitCalc();
        return new Call(this[_name], args, this[_getIndex](), this[_fileInfo]());
    },
    [_genCSS]: function (context, output) { 
        output[_add](this[_name] + _26, this[_fileInfo](), this[_getIndex]());
        for (var i = 0; i < this[_args][_length]; i++) { 
            this[_args][i] [_genCSS](context, output);
            if (i + 1 < this[_args][_length]) { 
                output[_add](_1);
            }
        }
        output[_add](_23);
    }
});
exports[_default] = Call;
//# sourceMappingURL=call.js.map
return exports
}],
/* 1392 string _Variable1 */ "Variable",
/* 1393 string _52 */ "@@",
/* 1394 string _Recursiv1 */ /* text */ "Recursive variable definition for ",
/* 1395 string _SELF */ "_SELF",
/* 1396 string _variable4 */ /* text */ "variable ",
/* 1397 less$tree$variable.js */ [10,11,1,16,17,18,581,48,150,151,19,525,96,167,1392,158,3,1393,1221,22,147,143,1296,1297,922,1394,663,146,1283,1021,1220,1218,1019,2,1024,1395,1396,1376,21,function(Object,exports,require,_definePr,__esModu,_value,__import1,_name,_index1,_fileInf,_prototyp,_assign,_default,_type,_Variable1,_eval,_indexOf,_52,_43,_slice,_getIndex,_fileInfo,_evaluati,_Name,_message,_Recursiv1,_filename,_index,_find,_frames,_variable2,_importan1,_importan,_length,_inCalc,_SELF,_variable4,_is_unde1,_call){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var call_1 = tslib_1[__import1](require(1391));
var Variable = function (name, index, currentFileInfo) { 
    this[_name] = name;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
};
Variable[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Variable1,
    [_eval]: function (context) { 
        var variable, name = this[_name];
        if (name[_indexOf](_52) === 0) { 
            name = _43 + new Variable(name[_slice](1), this[_getIndex](), this[_fileInfo]()) [_eval](context) [_value];
        }
        if (this[_evaluati]) { 
            throw { [_type]: _Name,
                [_message]: _Recursiv1 + name,
                [_filename]: this[_fileInfo]() [_filename],
                [_index]: this[_getIndex]() };
        }
        this[_evaluati] = true;
        variable = this[_find](context[_frames], function (frame) { 
            var v = frame[_variable2](name);
            if (v) { 
                if (v[_importan1]) { 
                    var importantScope = context[_importan][context[_importan][_length] - 1];
                    importantScope[_importan1] = v[_importan1];
                }
                // If in calc, wrap vars in a function call to cascade evaluate args first
                if (context[_inCalc]) { 
                    return (new call_1[_default](_SELF, [v[_value]])) [_eval](context);
                }
                else { 
                    return v[_value][_eval](context);
                }
            }
        });
        if (variable) { 
            this[_evaluati] = false;
            return variable;
        }
        else { 
            throw { [_type]: _Name,
                [_message]: _variable4 + name + _is_unde1,
                [_filename]: this[_fileInfo]() [_filename],
                [_index]: this[_getIndex]() };
        }
    },
    [_find]: function (obj, fun) { 
        for (var i = 0, r = void 0; i < obj[_length]; i++) { 
            r = fun[_call](obj, obj[i]);
            if (r) { 
                return r;
            }
        }
        return null;
    }
});
exports[_default] = Variable;
//# sourceMappingURL=variable.js.map
return exports
}],
/* 1398 string _Could_no2 */ /* text */ "Could not evaluate variable call ",
/* 1399 less$tree$variable-call.js */ [10,11,1,84,16,17,18,581,1220,150,151,1100,19,525,96,167,1269,158,147,143,922,1398,1079,1252,51,1082,function(Object,exports,require,Array,_definePr,__esModu,_value,__import1,_variable2,_index1,_fileInf,_allowRoo,_prototyp,_assign,_default,_type,_Variable,_eval,_getIndex,_fileInfo,_message,_Could_no2,_ruleset,_rules,_isArray,_callEval){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var variable_1 = tslib_1[__import1](require(1397));
var ruleset_1 = tslib_1[__import1](require(1292));
var detached_ruleset_1 = tslib_1[__import1](require(1083));
var less_error_1 = tslib_1[__import1](require(945));
var VariableCall = function (variable, index, currentFileInfo) { 
    this[_variable2] = variable;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_allowRoo] = true;
};
VariableCall[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Variable,
    [_eval]: function (context) { 
        var rules;
        var detachedRuleset = new variable_1[_default](this[_variable2], this[_getIndex](), this[_fileInfo]()) [_eval](context);
        var error = new less_error_1[_default]({ [_message]: _Could_no2 + this[_variable2] });
        if (!detachedRuleset[_ruleset]) { 
            if (detachedRuleset[_rules]) { 
                rules = detachedRuleset;
            }
            else if (Array[_isArray](detachedRuleset)) { 
                rules = new ruleset_1[_default]('', detachedRuleset);
            }
            else if (Array[_isArray](detachedRuleset[_value])) { 
                rules = new ruleset_1[_default]('', detachedRuleset[_value]);
            }
            else { 
                throw error;
            }
            detachedRuleset = new detached_ruleset_1[_default](rules);
        }
        if (detachedRuleset[_ruleset]) { 
            return detachedRuleset[_callEval](context);
        }
        throw error;
    }
});
exports[_default] = VariableCall;
//# sourceMappingURL=variable-call.js.map
return exports
}],
/* 1400 string _escaped */ "escaped",
/* 1401 string _variable5 */ "variableRegex",
/* 1402 regexp _w_g */ /@\{([\w-]+)\}/g,
/* 1403 string _propRege */ "propRegex",
/* 1404 regexp _$_w_g */ /\$\{([\w-]+)\}/g,
/* 1405 string _contains */ "containsVariables",
/* 1406 less$tree$quoted.js */ [10,11,1,123,16,17,18,581,1400,1047,620,150,151,1401,1402,1403,1404,1100,19,525,96,167,168,154,155,143,147,1405,586,158,1221,153,1277,20,108,166,170,function(Object,exports,require,undefined,_definePr,__esModu,_value,__import1,_escaped,_quote,_charAt,_index1,_fileInf,_variable5,_w_g,_propRege,_$_w_g,_allowRoo,_prototyp,_assign,_default,_type,_Quoted,_genCSS,_add,_fileInfo,_getIndex,_contains,_match,_eval,_43,_toCSS,_$,_toString,_replace,_compare,_numericC){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var variable_1 = tslib_1[__import1](require(1397));
var property_1 = tslib_1[__import1](require(1301));
var Quoted = function (str, content, escaped, index, currentFileInfo) { 
    this[_escaped] = (escaped == null) ? true : escaped;
    this[_value] = content || '';
    this[_quote] = str[_charAt](0);
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_variable5] = _w_g;
    this[_propRege] = _$_w_g;
    this[_allowRoo] = escaped;
};
Quoted[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Quoted,
    [_genCSS]: function (context, output) { 
        if (!this[_escaped]) { 
            output[_add](this[_quote], this[_fileInfo](), this[_getIndex]());
        }
        output[_add](this[_value]);
        if (!this[_escaped]) { 
            output[_add](this[_quote]);
        }
    },
    [_contains]: function () { 
        return this[_value][_match](this[_variable5]);
    },
    [_eval]: function (context) { 
        var that = this;
        var value = this[_value];
        var variableReplacement = function (_, name) { 
            var v = new variable_1[_default](_43 + name, that[_getIndex](), that[_fileInfo]()) [_eval](context, true);
            return (v instanceof Quoted) ? v[_value] : v[_toCSS]();
        };
        var propertyReplacement = function (_, name) { 
            var v = new property_1[_default](_$ + name, that[_getIndex](), that[_fileInfo]()) [_eval](context, true);
            return (v instanceof Quoted) ? v[_value] : v[_toCSS]();
        };
        function iterativeReplace(value, regexp, replacementFnc) { 
            var evaluatedValue = value;
            do { 
                value = evaluatedValue[_toString]();
                evaluatedValue = value[_replace](regexp, replacementFnc);
            } while (value !== evaluatedValue);
            return evaluatedValue;
        }
        value = iterativeReplace(value, this[_variable5], variableReplacement);
        value = iterativeReplace(value, this[_propRege], propertyReplacement);
        return new Quoted(this[_quote] + value + this[_quote], value, this[_escaped], this[_getIndex](), this[_fileInfo]());
    },
    [_compare]: function (other) { 
        // when comparing quoted strings allow the quote to differ
        if (other[_type] === _Quoted && !this[_escaped] && !other[_escaped]) { 
            return node_1[_default][_numericC](this[_value], other[_value]);
        }
        else { 
            return other[_toCSS] && this[_toCSS]() === other[_toCSS]() ? 0 : undefined;
        }
    }
});
exports[_default] = Quoted;
//# sourceMappingURL=quoted.js.map
return exports
}],
/* 1407 string _lookups1 */ "lookups",
/* 1408 string _Namespac */ "NamespaceValue",
/* 1409 string _$_ */ "$@",
/* 1410 string _property2 */ /* text */ "property \"",
/* 1411 string _not_fou1 */ /* text */ "\" not found",
/* 1412 less$tree$namespace-value.js */ [10,11,1,84,16,17,18,581,1407,150,151,19,525,96,167,1408,158,2,51,1280,620,1221,934,1275,1220,1297,922,1396,1361,663,143,146,147,661,1409,1277,1276,1279,1410,1411,1079,function(Object,exports,require,Array,_definePr,__esModu,_value,__import1,_lookups1,_index1,_fileInf,_prototyp,_assign,_default,_type,_Namespac,_eval,_length,_isArray,_lastDecl,_charAt,_43,_substr,_variable3,_variable2,_Name,_message,_variable4,_not_fou,_filename,_fileInfo,_index,_getIndex,_substrin,_$_,_$,_properti,_property1,_property2,_not_fou1,_ruleset){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var variable_1 = tslib_1[__import1](require(1397));
var ruleset_1 = tslib_1[__import1](require(1292));
var selector_1 = tslib_1[__import1](require(1250));
var NamespaceValue = function (ruleCall, lookups, index, fileInfo) { 
    this[_value] = ruleCall;
    this[_lookups1] = lookups;
    this[_index1] = index;
    this[_fileInf] = fileInfo;
};
NamespaceValue[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Namespac,
    [_eval]: function (context) { 
        var i, j, name, rules = this[_value][_eval](context);
        for (i = 0; i < this[_lookups1][_length]; i++) { 
            name = this[_lookups1][i];
            /**
             * Eval'd DRs return rulesets.
             * Eval'd mixins return rules, so let's make a ruleset if we need it.
             * We need to do this because of late parsing of values
             */
            if (Array[_isArray](rules)) { 
                rules = new ruleset_1[_default]([new selector_1[_default]()], rules);
            }
            if (name === '') { 
                rules = rules[_lastDecl]();
            }
            else if (name[_charAt](0) === _43) { 
                if (name[_charAt](1) === _43) { 
                    name = _43 + new variable_1[_default](name[_substr](1)) [_eval](context) [_value];
                }
                if (rules[_variable3]) { 
                    rules = rules[_variable2](name);
                }
                if (!rules) { 
                    throw { [_type]: _Name,
                        [_message]: _variable4 + name + _not_fou,
                        [_filename]: this[_fileInfo]() [_filename],
                        [_index]: this[_getIndex]() };
                }
            }
            else { 
                if (name[_substrin](0, 2) === _$_) { 
                    name = _$ + new variable_1[_default](name[_substr](1)) [_eval](context) [_value];
                }
                else { 
                    name = name[_charAt](0) === _$ ? name : _$ + name;
                }
                if (rules[_properti]) { 
                    rules = rules[_property1](name);
                }
                if (!rules) { 
                    throw { [_type]: _Name,
                        [_message]: _property2 + name[_substr](1) + _not_fou1,
                        [_filename]: this[_fileInfo]() [_filename],
                        [_index]: this[_getIndex]() };
                }
                // Properties are an array of values, since a ruleset can have multiple props.
                // We pick the last one (the "cascaded" value)
                rules = rules[rules[_length] - 1];
            }
            if (rules[_value]) { 
                rules = rules[_eval](context) [_value];
            }
            if (rules[_ruleset]) { 
                rules = rules[_ruleset][_eval](context);
            }
        }
        return rules;
    }
});
exports[_default] = NamespaceValue;
//# sourceMappingURL=namespace-value.js.map
return exports
}],
/* 1413 regexp _css_$_ */ /[#\.\&\?]css([\?;].*)?$/,
/* 1414 string _isPlugin */ "isPlugin",
/* 1415 string _referenc */ "reference",
/* 1416 string _import_ */ /* text */ "@import ",
/* 1417 string _isVariab1 */ "isVariableImport",
/* 1418 string _evalForI */ "evalForImport",
/* 1419 string _evalPath */ "evalPath",
/* 1420 string _doEval */ "doEval",
/* 1421 string _Plugin_e */ /* text */ "Plugin error during evaluation",
/* 1422 string _skip */ "skip",
/* 1423 string _imported */ "importedFilename",
/* 1424 less$tree$import.js */ [10,11,1,123,16,17,18,581,580,676,150,151,1003,1379,1100,698,1219,883,983,1413,105,175,148,19,525,96,167,1271,131,126,1414,1260,154,1415,155,1416,933,1225,1417,1405,1418,158,174,1419,1031,1032,1007,1033,1420,128,2,149,171,922,1421,85,663,1021,711,710,597,1422,29,1423,544,618,1252,1264,function(Object,exports,require,undefined,_definePr,__esModu,_value,__import1,__import,_options,_index1,_fileInf,_path,_features,_allowRoo,_less,_inline,_css1,_getPath,_css_$_,_test,_copyVisi,_setParen,_prototyp,_assign,_default,_type,_Import,_accept,_visit,_isPlugin,_root,_genCSS,_referenc,_add,_import_,_14,_45,_isVariab1,_contains,_evalForI,_eval,_visibili1,_evalPath,_pathRequ,_rewriteP,_rootpath,_normaliz1,_doEval,_blocksVi,_length,_forEach,_addVisib,_message,_Plugin_e,_imports,_filename,_frames,_function2,_function1,_addMulti,_skip,_function,_imported,_error,_copyArra,_rules,_evalImpo){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var media_1 = tslib_1[__import1](require(1386));
var url_1 = tslib_1[__import1](require(1051));
var quoted_1 = tslib_1[__import1](require(1406));
var ruleset_1 = tslib_1[__import1](require(1292));
var anonymous_1 = tslib_1[__import1](require(1140));
var utils = tslib_1[__import](require(636));
var less_error_1 = tslib_1[__import1](require(945));
//
// CSS @import node
//
// The general strategy here is that we don't want to wait
// for the parsing to be completed, before we start importing
// the file. That's because in the context of a browser,
// most of the time will be spent waiting for the server to respond.
//
// On creation, we push the import path to our import queue, though
// `import,push`, we also pass it a callback, which it'll call once
// the file has been fetched, and parsed.
//
var Import = function (path, features, options, index, currentFileInfo, visibilityInfo) { 
    this[_options] = options;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
    this[_path] = path;
    this[_features] = features;
    this[_allowRoo] = true;
    if (this[_options][_less] !== undefined || this[_options][_inline]) { 
        this[_css1] = !this[_options][_less] || this[_options][_inline];
    }
    else { 
        var pathValue = this[_getPath]();
        if (pathValue && _css_$_ [_test](pathValue)) { 
            this[_css1] = true;
        }
    }
    this[_copyVisi](visibilityInfo);
    this[_setParen](this[_features], this);
    this[_setParen](this[_path], this);
};
Import[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_type]: _Import,
    [_accept]: function (visitor) { 
        if (this[_features]) { 
            this[_features] = visitor[_visit](this[_features]);
        }
        this[_path] = visitor[_visit](this[_path]);
        if (!this[_options][_isPlugin] && !this[_options][_inline] && this[_root]) { 
            this[_root] = visitor[_visit](this[_root]);
        }
    },
    [_genCSS]: function (context, output) { 
        if (this[_css1] && this[_path][_fileInf][_referenc] === undefined) { 
            output[_add](_import_, this[_fileInf], this[_index1]);
            this[_path][_genCSS](context, output);
            if (this[_features]) { 
                output[_add](_14);
                this[_features][_genCSS](context, output);
            }
            output[_add](_45);
        }
    },
    [_getPath]: function () { 
        return (this[_path] instanceof url_1[_default]) ?
            this[_path][_value][_value] : this[_path][_value];
    },
    [_isVariab1]: function () { 
        var path = this[_path];
        if (path instanceof url_1[_default]) { 
            path = path[_value];
        }
        if (path instanceof quoted_1[_default]) { 
            return path[_contains]();
        }
        return true;
    },
    [_evalForI]: function (context) { 
        var path = this[_path];
        if (path instanceof url_1[_default]) { 
            path = path[_value];
        }
        return new Import(path[_eval](context), this[_features], this[_options], this[_index1], this[_fileInf], this[_visibili1]());
    },
    [_evalPath]: function (context) { 
        var path = this[_path][_eval](context);
        var fileInfo = this[_fileInf];
        if (!(path instanceof url_1[_default])) { 
            // Add the rootpath if the URL requires a rewrite
            var pathValue = path[_value];
            if (fileInfo &&
                pathValue &&
                context[_pathRequ](pathValue)) { 
                path[_value] = context[_rewriteP](pathValue, fileInfo[_rootpath]);
            }
            else { 
                path[_value] = context[_normaliz1](path[_value]);
            }
        }
        return path;
    },
    [_eval]: function (context) { 
        var result = this[_doEval](context);
        if (this[_options][_referenc] || this[_blocksVi]()) { 
            if (result[_length] || result[_length] === 0) { 
                result[_forEach](function (node) { 
                    node[_addVisib]();
                });
            }
            else { 
                result[_addVisib]();
            }
        }
        return result;
    },
    [_doEval]: function (context) { 
        var ruleset;
        var registry;
        var features = this[_features] && this[_features][_eval](context);
        if (this[_options][_isPlugin]) { 
            if (this[_root] && this[_root][_eval]) { 
                try { 
                    this[_root][_eval](context);
                }
                catch (e) { 
                    e[_message] = _Plugin_e;
                    throw new less_error_1[_default](e, this[_root][_imports], this[_root][_filename]);
                }
            }
            registry = context[_frames][0] && context[_frames][0] [_function2];
            if (registry && this[_root] && this[_root][_function1]) { 
                registry[_addMulti](this[_root][_function1]);
            }
            return [];
        }
        if (this[_skip]) { 
            if (typeof this[_skip] === _function) { 
                this[_skip] = this[_skip]();
            }
            if (this[_skip]) { 
                return [];
            }
        }
        if (this[_options][_inline]) { 
            var contents = new anonymous_1[_default](this[_root], 0, { 
                [_filename]: this[_imported],
                [_referenc]: this[_path][_fileInf] && this[_path][_fileInf][_referenc]
            }, true, true);
            return this[_features] ? new media_1[_default]([contents], this[_features][_value]) : [contents];
        }
        else if (this[_css1]) { 
            var newImport = new Import(this[_evalPath](context), features, this[_options], this[_index1]);
            if (!newImport[_css1] && this[_error]) { 
                throw this[_error];
            }
            return newImport;
        }
        else if (this[_root]) { 
            ruleset = new ruleset_1[_default](null, utils[_copyArra](this[_root][_rules]));
            ruleset[_evalImpo](context);
            return this[_features] ? new media_1[_default](ruleset[_rules], this[_features][_value]) : ruleset[_rules];
        }
        else { 
            return [];
        }
    }
});
exports[_default] = Import;
//# sourceMappingURL=import.js.map
return exports
}],
/* 1425 string _missing_7 */ /* text */ "missing the required second argument to isunit.",
/* 1426 string _Second_a */ /* text */ "Second argument to isunit should be a unit or a string.",
/* 1427 string _isrulese */ "isruleset",
/* 1428 string _iscolor */ "iscolor",
/* 1429 string _isnumber */ "isnumber",
/* 1430 string _isstring */ "isstring",
/* 1431 string _iskeywor */ "iskeyword",
/* 1432 string _isurl */ "isurl",
/* 1433 string _ispixel */ "ispixel",
/* 1434 string _ispercen */ "ispercentage",
/* 1435 string _isem */ "isem",
/* 1436 string _em */ "em",
/* 1437 string _isunit */ "isunit",
/* 1438 string _the_firs */ /* text */ "the first argument to unit must be a number",
/* 1439 string _Have_yo */ /* text */ ". Have you forgotten parenthesis?",
/* 1440 string _get_unit */ "get-unit",
/* 1441 less$functions$types.js */ [10,11,1,123,16,17,18,581,96,1074,1076,167,1231,922,1425,4,1426,1206,1057,1427,1428,1429,1430,1431,1432,1433,199,1434,1072,1435,1436,1437,1438,1439,153,1440,function(Object,exports,require,undefined,_definePr,__esModu,_value,__import1,_default,_True,_False,_type,_Argument,_message,_missing_7,_string,_Second_a,_unit,_is,_isrulese,_iscolor,_isnumber,_isstring,_iskeywor,_isurl,_ispixel,_px,_ispercen,_27,_isem,_em,_isunit,_the_firs,_Have_yo,_toCSS,_get_unit){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var keyword_1 = tslib_1[__import1](require(1078));
var detached_ruleset_1 = tslib_1[__import1](require(1083));
var dimension_1 = tslib_1[__import1](require(1217));
var color_1 = tslib_1[__import1](require(1129));
var quoted_1 = tslib_1[__import1](require(1406));
var anonymous_1 = tslib_1[__import1](require(1140));
var url_1 = tslib_1[__import1](require(1051));
var operation_1 = tslib_1[__import1](require(1306));
var isa = function (n, Type) { return (n instanceof Type) ? keyword_1[_default][_True] : keyword_1[_default][_False]; };
var isunit = function (n, unit) { 
    if (unit === undefined) { 
        throw { [_type]: _Argument, [_message]: _missing_7 };
    }
    unit = typeof unit[_value] === _string ? unit[_value] : unit;
    if (typeof unit !== _string) { 
        throw { [_type]: _Argument, [_message]: _Second_a };
    }
    return (n instanceof dimension_1[_default]) && n[_unit][_is](unit) ? keyword_1[_default][_True] : keyword_1[_default][_False];
};
exports[_default] = { 
    [_isrulese]: function (n) { 
        return isa(n, detached_ruleset_1[_default]);
    },
    [_iscolor]: function (n) { 
        return isa(n, color_1[_default]);
    },
    [_isnumber]: function (n) { 
        return isa(n, dimension_1[_default]);
    },
    [_isstring]: function (n) { 
        return isa(n, quoted_1[_default]);
    },
    [_iskeywor]: function (n) { 
        return isa(n, keyword_1[_default]);
    },
    [_isurl]: function (n) { 
        return isa(n, url_1[_default]);
    },
    [_ispixel]: function (n) { 
        return isunit(n, _px);
    },
    [_ispercen]: function (n) { 
        return isunit(n, _27);
    },
    [_isem]: function (n) { 
        return isunit(n, _em);
    },
    [_isunit]: isunit,
    [_unit]: function (val, unit) { 
        if (!(val instanceof dimension_1[_default])) { 
            throw { [_type]: _Argument,
                [_message]: _the_firs + (val instanceof operation_1[_default] ? _Have_yo : '') };
        }
        if (unit) { 
            if (unit instanceof keyword_1[_default]) { 
                unit = unit[_value];
            }
            else { 
                unit = unit[_toCSS]();
            }
        }
        else { 
            unit = '';
        }
        return new dimension_1[_default](val[_value], unit);
    },
    [_get_unit]: function (n) { 
        return new anonymous_1[_default](n[_unit]);
    }
};
//# sourceMappingURL=types.js.map
return exports
}],
/* 1442 string _svg_grad */ "svg-gradient",
/* 1443 string _linear */ "linear",
/* 1444 string _x_0_y_0_ */ /* text */ "x=\"0\" y=\"0\" width=\"1\" height=\"1\"",
/* 1445 string _svg_grad1 */ /* text */ "svg-gradient expects direction, start_color [start_position], [color position,]...,",
/* 1446 string _end_col */ /* text */ " end_color [end_position] or direction, color list",
/* 1447 string _to_botto */ /* text */ "to bottom",
/* 1448 string _x1_0_y1_ */ /* text */ "x1=\"0%\" y1=\"0%\" x2=\"0%\" y2=\"100%\"",
/* 1449 string _to_right */ /* text */ "to right",
/* 1450 string _x1_0_y1_1 */ /* text */ "x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"",
/* 1451 string _to_botto1 */ /* text */ "to bottom right",
/* 1452 string _x1_0_y1_2 */ /* text */ "x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"100%\"",
/* 1453 string _to_top_r */ /* text */ "to top right",
/* 1454 string _x1_0_y1_3 */ /* text */ "x1=\"0%\" y1=\"100%\" x2=\"100%\" y2=\"0%\"",
/* 1455 string _ellipse */ "ellipse",
/* 1456 string _ellipse_ */ /* text */ "ellipse at center",
/* 1457 string _radial */ "radial",
/* 1458 string _cx_50_cy */ /* text */ "cx=\"50%\" cy=\"50%\" r=\"75%\"",
/* 1459 string _x_50_y_5 */ /* text */ "x=\"-50\" y=\"-50\" width=\"101\" height=\"101\"",
/* 1460 string _svg_grad2 */ /* text */ "svg-gradient direction must be 'to bottom', 'to right',",
/* 1461 string _to_bott */ /* text */ " 'to bottom right', 'to top right' or 'ellipse at center'",
/* 1462 string _svg_xml */ /* text */ "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1 1\"><",
/* 1463 string _Gradient */ /* text */ "Gradient id=\"g\" ",
/* 1464 string _0_ */ "0%",
/* 1465 string _100_ */ "100%",
/* 1466 string _stop_of */ /* text */ "<stop offset=\"",
/* 1467 string _stop_co */ /* text */ "\" stop-color=\"",
/* 1468 string _stop_op */ /* text */ " stop-opacity=\"",
/* 1469 string _53 */ "/>",
/* 1470 string _54 */ "</",
/* 1471 string _Gradient1 */ /* text */ "Gradient><rect ",
/* 1472 string _fill_ur */ /* text */ " fill=\"url(#g)\" /></svg>",
/* 1473 string _data_ima */ "data:image/svg+xml,",
/* 1474 less$functions$svg.js */ [10,11,1,84,123,193,16,17,18,581,96,1442,1443,1444,115,153,167,1231,922,1445,1446,2,19,22,21,1447,1448,1449,1450,1451,1452,1453,1454,1455,1456,1457,1458,1459,1460,1461,1462,1463,1097,1464,1465,1110,1466,1467,1121,1177,1468,1469,1470,1471,1472,1473,999,146,141,function(Object,exports,require,Array,undefined,encodeURIComponent,_definePr,__esModu,_value,__import1,_default,_svg_grad,_linear,_x_0_y_0_,_compress,_toCSS,_type,_Argument,_message,_svg_grad1,_end_col,_length,_prototyp,_slice,_call,_to_botto,_x1_0_y1_,_to_right,_x1_0_y1_1,_to_botto1,_x1_0_y1_2,_to_top_r,_x1_0_y1_3,_ellipse,_ellipse_,_radial,_cx_50_cy,_x_50_y_5,_svg_grad2,_to_bott,_svg_xml,_Gradient,_33,_0_,_100_,_alpha,_stop_of,_stop_co,_toRGB,_38,_stop_op,_53,_54,_Gradient1,_fill_ur,_data_ima,_19,_index,_currentF){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var dimension_1 = tslib_1[__import1](require(1217));
var color_1 = tslib_1[__import1](require(1129));
var expression_1 = tslib_1[__import1](require(1324));
var quoted_1 = tslib_1[__import1](require(1406));
var url_1 = tslib_1[__import1](require(1051));
exports[_default] = (function (environment) { 
    return { [_svg_grad]: function (direction) { 
            var stops;
            var gradientDirectionSvg;
            var gradientType = _linear;
            var rectangleDimension = _x_0_y_0_;
            var renderEnv = { [_compress]: false };
            var returner;
            var directionValue = direction[_toCSS](renderEnv);
            var i;
            var color;
            var position;
            var positionValue;
            var alpha;
            function throwArgumentDescriptor() { 
                throw { [_type]: _Argument,
                    [_message]: _svg_grad1 +
                        _end_col };
            }
            if (arguments[_length] == 2) { 
                if (arguments[1] [_value][_length] < 2) { 
                    throwArgumentDescriptor();
                }
                stops = arguments[1] [_value];
            }
            else if (arguments[_length] < 3) { 
                throwArgumentDescriptor();
            }
            else { 
                stops = Array[_prototyp][_slice][_call](arguments, 1);
            }
            switch (directionValue) { 
                case _to_botto :
                    gradientDirectionSvg = _x1_0_y1_;
                    break;
                case _to_right :
                    gradientDirectionSvg = _x1_0_y1_1;
                    break;
                case _to_botto1 :
                    gradientDirectionSvg = _x1_0_y1_2;
                    break;
                case _to_top_r :
                    gradientDirectionSvg = _x1_0_y1_3;
                    break;
                case _ellipse :
                case _ellipse_ :
                    gradientType = _radial;
                    gradientDirectionSvg = _cx_50_cy;
                    rectangleDimension = _x_50_y_5;
                    break;
                default:
                    throw { [_type]: _Argument, [_message]: _svg_grad2 +
                            _to_bott };
            }
            returner = _svg_xml + gradientType + _Gradient + gradientDirectionSvg + _33;
            for (i = 0; i < stops[_length]; i += 1) { 
                if (stops[i] instanceof expression_1[_default]) { 
                    color = stops[i] [_value][0];
                    position = stops[i] [_value][1];
                }
                else { 
                    color = stops[i];
                    position = undefined;
                }
                if (!(color instanceof color_1[_default]) || (!((i === 0 || i + 1 === stops[_length]) && position === undefined) && !(position instanceof dimension_1[_default]))) { 
                    throwArgumentDescriptor();
                }
                positionValue = position ? position[_toCSS](renderEnv) : i === 0 ? _0_ : _100_;
                alpha = color[_alpha];
                returner += _stop_of + positionValue + _stop_co + color[_toRGB]() + _38 + (alpha < 1 ? _stop_op + alpha + _38 : '') + _53;
            }
            returner += _54 + gradientType + _Gradient1 + rectangleDimension + _fill_ur;
            returner = encodeURIComponent(returner);
            returner = _data_ima + returner;
            return new url_1[_default](new quoted_1[_default](_19 + returner + _19, returner, false, this[_index], this[_currentF]), this[_index], this[_currentF]);
        } };
});
//# sourceMappingURL=svg.js.map
return exports
}],
/* 1475 string _55 */ "~",
/* 1476 string _range */ "range",
/* 1477 string _each */ "each",
/* 1478 string _value1 */ "@value",
/* 1479 string _key1 */ "@key",
/* 1480 string _index2 */ "@index",
/* 1481 less$functions$list.js */ [10,11,1,84,16,17,18,581,51,96,1395,1475,2,928,1476,93,1206,1477,158,964,503,1079,1252,1478,1479,1480,1352,48,4,22,146,141,1049,1008,174,function(Object,exports,require,Array,_definePr,__esModu,_value,__import1,_isArray,_default,_SELF,_55,_length,_extract,_range,_push,_unit,_each,_eval,_context,_map,_ruleset,_rules,_value1,_key1,_index2,_params,_name,_string,_slice,_index,_currentF,_24,_strictIm,_visibili1){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var comment_1 = tslib_1[__import1](require(1103));
var node_1 = tslib_1[__import1](require(176));
var dimension_1 = tslib_1[__import1](require(1217));
var declaration_1 = tslib_1[__import1](require(1230));
var expression_1 = tslib_1[__import1](require(1324));
var ruleset_1 = tslib_1[__import1](require(1292));
var selector_1 = tslib_1[__import1](require(1250));
var element_1 = tslib_1[__import1](require(1204));
var quoted_1 = tslib_1[__import1](require(1406));
var value_1 = tslib_1[__import1](require(1041));
var getItemsFromNode = function (node) { 
    // handle non-array values as an array of length 1
    // return 'undefined' if index is invalid
    var items = Array[_isArray](node[_value]) ?
        node[_value] : Array(node);
    return items;
};
exports[_default] = { 
    [_SELF]: function (n) { 
        return n;
    },
    [_55]: function () { 
        var expr = [];
        for (var _i = 0; _i < arguments[_length]; _i++) { 
            expr[_i] = arguments[_i];
        }
        if (expr[_length] === 1) { 
            return expr[0];
        }
        return new value_1[_default](expr);
    },
    [_extract]: function (values, index) { 
        // (1-based index)
        index = index[_value] - 1;
        return getItemsFromNode(values)[index];
    },
    [_length]: function (values) { 
        return new dimension_1[_default](getItemsFromNode(values) [_length]);
    },
    /**
     * Creates a Less list of incremental values.
     * Modeled after Lodash's range function, also exists natively in PHP
     *
     * @param {Dimension} [start=1]
     * @param {Dimension} end  - e.g. 10 or 10px - unit is added to output
     * @param {Dimension} [step=1]
     */
    [_range]: function (start, end, step) { 
        var from;
        var to;
        var stepValue = 1;
        var list = [];
        if (end) { 
            to = end;
            from = start[_value];
            if (step) { 
                stepValue = step[_value];
            }
        }
        else { 
            from = 1;
            to = start;
        }
        for (var i = from; i <= to[_value]; i += stepValue) { 
            list[_push](new dimension_1[_default](i, to[_unit]));
        }
        return new expression_1[_default](list);
    },
    [_each]: function (list, rs) { 
        var _this = this;
        var rules = [];
        var newRules;
        var iterator;
        var tryEval = function (val) { 
            if (val instanceof node_1[_default]) { 
                return val[_eval](_this[_context]);
            }
            return val;
        };
        if (list[_value] && !(list instanceof quoted_1[_default])) { 
            if (Array[_isArray](list[_value])) { 
                iterator = list[_value][_map](tryEval);
            }
            else { 
                iterator = [tryEval(list[_value])];
            }
        }
        else if (list[_ruleset]) { 
            iterator = tryEval(list[_ruleset]) [_rules];
        }
        else if (list[_rules]) { 
            iterator = list[_rules][_map](tryEval);
        }
        else if (Array[_isArray](list)) { 
            iterator = list[_map](tryEval);
        }
        else { 
            iterator = [tryEval(list)];
        }
        var valueName = _value1;
        var keyName = _key1;
        var indexName = _index2;
        if (rs[_params]) { 
            valueName = rs[_params][0] && rs[_params][0] [_name];
            keyName = rs[_params][1] && rs[_params][1] [_name];
            indexName = rs[_params][2] && rs[_params][2] [_name];
            rs = rs[_rules];
        }
        else { 
            rs = rs[_ruleset];
        }
        for (var i = 0; i < iterator[_length]; i++) { 
            var key = void 0;
            var value = void 0;
            var item = iterator[i];
            if (item instanceof declaration_1[_default]) { 
                key = typeof item[_name] === _string ? item[_name] : item[_name][0] [_value];
                value = item[_value];
            }
            else { 
                key = new dimension_1[_default](i + 1);
                value = item;
            }
            if (item instanceof comment_1[_default]) { 
                continue;
            }
            newRules = rs[_rules][_slice](0);
            if (valueName) { 
                newRules[_push](new declaration_1[_default](valueName, value, false, false, this[_index], this[_currentF]));
            }
            if (indexName) { 
                newRules[_push](new declaration_1[_default](indexName, new dimension_1[_default](i + 1), false, false, this[_index], this[_currentF]));
            }
            if (keyName) { 
                newRules[_push](new declaration_1[_default](keyName, key, false, false, this[_index], this[_currentF]));
            }
            rules[_push](new ruleset_1[_default]([new (selector_1[_default])([new element_1[_default]("", _24)])], newRules, rs[_strictIm], rs[_visibili1]()));
        }
        return new ruleset_1[_default]([new (selector_1[_default])([new element_1[_default]("", _24)])], rules, rs[_strictIm], rs[_visibili1]()) [_eval](this[_context]);
    }
};
//# sourceMappingURL=list.js.map
return exports
}],
/* 1482 string _data_uri */ "data-uri",
/* 1483 string _currentD */ "currentDirectory",
/* 1484 string _entryPat */ "entryPath",
/* 1485 string _rawBuffe */ "rawBuffer",
/* 1486 string _image_sv */ "image/svg+xml",
/* 1487 string _US_ASCII */ "US-ASCII",
/* 1488 string _UTF_8 */ "UTF-8",
/* 1489 string _base64 */ ";base64",
/* 1490 regexp _base64$ */ /;base64$/,
/* 1491 string _loadFile */ "loadFileSync",
/* 1492 string _Skipped_ */ /* text */ "Skipped data-uri embedding of ",
/* 1493 string _because */ /* text */ " because file not found",
/* 1494 string _data_ */ "data:",
/* 1495 less$functions$data-uri.js */ [10,11,1,193,16,17,18,581,580,96,146,141,158,964,1482,629,1483,1484,3,1050,22,617,1485,950,946,1486,947,1487,1488,1489,1490,105,1491,678,914,1492,1493,686,1494,1040,1177,function(Object,exports,require,encodeURIComponent,_definePr,__esModu,_value,__import1,__import,_default,_index,_currentF,_eval,_context,_data_uri,_rewriteU,_currentD,_entryPat,_indexOf,_25,_slice,_clone,_rawBuffe,_getFileM1,_mimeLook,_image_sv,_charsetL,_US_ASCII,_UTF_8,_base64,_base64$,_test,_loadFile,_contents3,_warn,_Skipped_,_because,_encodeBa,_data_,_22,_38){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var quoted_1 = tslib_1[__import1](require(1406));
var url_1 = tslib_1[__import1](require(1051));
var utils = tslib_1[__import](require(636));
var logger_1 = tslib_1[__import1](require(920));
exports[_default] = (function (environment) { 
    var fallback = function (functionThis, node) { return new url_1[_default](node, functionThis[_index], functionThis[_currentF]) [_eval](functionThis[_context]); };
    return { [_data_uri]: function (mimetypeNode, filePathNode) { 
            if (!filePathNode) { 
                filePathNode = mimetypeNode;
                mimetypeNode = null;
            }
            var mimetype = mimetypeNode && mimetypeNode[_value];
            var filePath = filePathNode[_value];
            var currentFileInfo = this[_currentF];
            var currentDirectory = currentFileInfo[_rewriteU] ?
                currentFileInfo[_currentD] : currentFileInfo[_entryPat];
            var fragmentStart = filePath[_indexOf](_25);
            var fragment = '';
            if (fragmentStart !== -1) { 
                fragment = filePath[_slice](fragmentStart);
                filePath = filePath[_slice](0, fragmentStart);
            }
            var context = utils[_clone](this[_context]);
            context[_rawBuffe] = true;
            var fileManager = environment[_getFileM1](filePath, currentDirectory, context, environment, true);
            if (!fileManager) { 
                return fallback(this, filePathNode);
            }
            var useBase64 = false;
            // detect the mimetype if not given
            if (!mimetypeNode) { 
                mimetype = environment[_mimeLook](filePath);
                if (mimetype === _image_sv) { 
                    useBase64 = false;
                }
                else { 
                    // use base 64 unless it's an ASCII or UTF-8 format
                    var charset = environment[_charsetL](mimetype);
                    useBase64 = [_US_ASCII, _UTF_8] [_indexOf](charset) < 0;
                }
                if (useBase64) { 
                    mimetype += _base64;
                }
            }
            else { 
                useBase64 = _base64$ [_test](mimetype);
            }
            var fileSync = fileManager[_loadFile](filePath, currentDirectory, context, environment);
            if (!fileSync[_contents3]) { 
                logger_1[_default][_warn](_Skipped_ + filePath + _because);
                return fallback(this, filePathNode || mimetypeNode);
            }
            var buf = fileSync[_contents3];
            if (useBase64 && !environment[_encodeBa]) { 
                return fallback(this, filePathNode);
            }
            buf = useBase64 ? environment[_encodeBa](buf) : encodeURIComponent(buf);
            var uri = _data_ + mimetype + _22 + buf + fragment;
            return new url_1[_default](new quoted_1[_default](_38 + uri + _38, uri, false, this[_index], this[_currentF]), this[_index], this[_currentF]);
        } };
});
//# sourceMappingURL=data-uri.js.map
return exports
}],
/* 1496 regexp _rgb_hsl */ /^(rgb|hsl)/,
/* 1497 string _Argument1 */ /* text */ "Argument cannot be evaluated to a color",
/* 1498 string _color_fu */ /* text */ "color functions take numbers as parameters",
/* 1499 string _hsv */ "hsv",
/* 1500 string _hsva */ "hsva",
/* 1501 string _hue */ "hue",
/* 1502 string _saturati */ "saturation",
/* 1503 string _lightnes */ "lightness",
/* 1504 string _hsvhue */ "hsvhue",
/* 1505 string _hsvsatur */ "hsvsaturation",
/* 1506 string _hsvvalue */ "hsvvalue",
/* 1507 string _luminanc */ "luminance",
/* 1508 string _saturate */ "saturate",
/* 1509 string _relative1 */ "relative",
/* 1510 string _desatura */ "desaturate",
/* 1511 string _lighten */ "lighten",
/* 1512 string _darken */ "darken",
/* 1513 string _fadein */ "fadein",
/* 1514 string _fadeout */ "fadeout",
/* 1515 string _fade */ "fade",
/* 1516 string _spin */ "spin",
/* 1517 string _mix */ "mix",
/* 1518 string _greyscal */ "greyscale",
/* 1519 string _contrast */ "contrast",
/* 1520 string _argb */ "argb",
/* 1521 string _color */ "color",
/* 1522 regexp _A_Fa_f0 */ /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4})$/i,
/* 1523 string _argument3 */ /* text */ "argument must be a color keyword or 3|4|6|8 digit hex e.g. #FFF",
/* 1524 string _tint */ "tint",
/* 1525 string _shade */ "shade",
/* 1526 less$functions$color.js */ [10,11,1,177,133,120,123,16,17,18,581,1123,995,1116,1119,203,1120,551,1496,105,1108,1118,1497,1124,96,1206,1057,1072,541,167,1231,922,1498,1302,1114,1110,503,1115,1499,1500,1341,1501,1502,1503,1504,1505,1506,545,444,317,230,1112,1507,1508,929,1509,1510,1511,1512,1513,1514,1515,1516,1517,1518,1519,1520,1125,1521,1522,22,1050,1126,1523,1524,1525,function(Object,exports,require,Math,Error,parseFloat,undefined,_definePr,__esModu,_value,__import1,_min,_max,_hsla,_h,_s,_l,_a,_rgb_hsl,_test,_rgb,_toHSL,_Argument1,_toHSV,_default,_unit,_is,_27,_number,_type,_Argument,_message,_color_fu,_operands,_rgba,_alpha,_map,_hsl,_hsv,_hsva,_floor,_hue,_saturati,_lightnes,_hsvhue,_hsvsatur,_hsvvalue,_v,_red,_green,_blue,_luma,_luminanc,_saturate,_undefine,_relative1,_desatura,_lighten,_darken,_fadein,_fadeout,_fade,_spin,_mix,_greyscal,_contrast,_argb,_toARGB,_color,_A_Fa_f0,_slice,_25,_fromKeyw,_argument3,_tint,_shade){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var dimension_1 = tslib_1[__import1](require(1217));
var color_1 = tslib_1[__import1](require(1129));
var quoted_1 = tslib_1[__import1](require(1406));
var anonymous_1 = tslib_1[__import1](require(1140));
var expression_1 = tslib_1[__import1](require(1324));
var operation_1 = tslib_1[__import1](require(1306));
var colorFunctions;
function clamp(val) { 
    return Math[_min](1, Math[_max](0, val));
}
function hsla(origColor, hsl) { 
    var color = colorFunctions[_hsla](hsl[_h], hsl[_s], hsl[_l], hsl[_a]);
    if (color) { 
        if (origColor[_value] &&
            _rgb_hsl [_test](origColor[_value])) { 
            color[_value] = origColor[_value];
        }
        else { 
            color[_value] = _rgb;
        }
        return color;
    }
}
function toHSL(color) { 
    if (color[_toHSL]) { 
        return color[_toHSL]();
    }
    else { 
        throw new Error(_Argument1);
    }
}
function toHSV(color) { 
    if (color[_toHSV]) { 
        return color[_toHSV]();
    }
    else { 
        throw new Error(_Argument1);
    }
}
function number(n) { 
    if (n instanceof dimension_1[_default]) { 
        return parseFloat(n[_unit][_is](_27) ? n[_value] / 100 : n[_value]);
    }
    else if (typeof n === _number) { 
        return n;
    }
    else { 
        throw { 
            [_type]: _Argument,
            [_message]: _color_fu
        };
    }
}
function scaled(n, size) { 
    if (n instanceof dimension_1[_default] && n[_unit][_is](_27)) { 
        return parseFloat(n[_value] * size / 100);
    }
    else { 
        return number(n);
    }
}
colorFunctions = { 
    [_rgb]: function (r, g, b) { 
        var a = 1;
        /**
         * Comma-less syntax
         *   e.g. rgb(0 128 255 / 50%)
         */
        if (r instanceof expression_1[_default]) { 
            var val = r[_value];
            r = val[0];
            g = val[1];
            b = val[2];
            /**
             * @todo - should this be normalized in
             *   function caller? Or parsed differently?
             */
            if (b instanceof operation_1[_default]) { 
                var op = b;
                b = op[_operands][0];
                a = op[_operands][1];
            }
        }
        var color = colorFunctions[_rgba](r, g, b, a);
        if (color) { 
            color[_value] = _rgb;
            return color;
        }
    },
    [_rgba]: function (r, g, b, a) { 
        try { 
            if (r instanceof color_1[_default]) { 
                if (g) { 
                    a = number(g);
                }
                else { 
                    a = r[_alpha];
                }
                return new color_1[_default](r[_rgb], a, _rgba);
            }
            var rgb = [r, g, b] [_map](function (c) { return scaled(c, 255); });
            a = number(a);
            return new color_1[_default](rgb, a, _rgba);
        }
        catch (e) {}
    },
    [_hsl]: function (h, s, l) { 
        var a = 1;
        if (h instanceof expression_1[_default]) { 
            var val = h[_value];
            h = val[0];
            s = val[1];
            l = val[2];
            if (l instanceof operation_1[_default]) { 
                var op = l;
                l = op[_operands][0];
                a = op[_operands][1];
            }
        }
        var color = colorFunctions[_hsla](h, s, l, a);
        if (color) { 
            color[_value] = _hsl;
            return color;
        }
    },
    [_hsla]: function (h, s, l, a) { 
        try { 
            if (h instanceof color_1[_default]) { 
                if (s) { 
                    a = number(s);
                }
                else { 
                    a = h[_alpha];
                }
                return new color_1[_default](h[_rgb], a, _hsla);
            }
            var m1_1;
            var m2_1;
            function hue(h) { 
                h = h < 0 ? h + 1 : (h > 1 ? h - 1 : h);
                if (h * 6 < 1) { 
                    return m1_1 + (m2_1 - m1_1) * h * 6;
                }
                else if (h * 2 < 1) { 
                    return m2_1;
                }
                else if (h * 3 < 2) { 
                    return m1_1 + (m2_1 - m1_1) * (2 / 3 - h) * 6;
                }
                else { 
                    return m1_1;
                }
            }
            h = (number(h) % 360) / 360;
            s = clamp(number(s));
            l = clamp(number(l));
            a = clamp(number(a));
            m2_1 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
            m1_1 = l * 2 - m2_1;
            var rgb = [
                hue(h + 1 / 3) * 255,
                hue(h) * 255,
                hue(h - 1 / 3) * 255
            ];
            a = number(a);
            return new color_1[_default](rgb, a, _hsla);
        }
        catch (e) {}
    },
    [_hsv]: function (h, s, v) { 
        return colorFunctions[_hsva](h, s, v, 1.0);
    },
    [_hsva]: function (h, s, v, a) { 
        h = ((number(h) % 360) / 360) * 360;
        s = number(s);
        v = number(v);
        a = number(a);
        var i;
        var f;
        i = Math[_floor]((h / 60) % 6);
        f = (h / 60) - i;
        var vs = [v,
            v * (1 - s),
            v * (1 - f * s),
            v * (1 - (1 - f) * s)];
        var perm = [[0, 3, 1],
            [2, 0, 1],
            [1, 0, 3],
            [1, 2, 0],
            [3, 1, 0],
            [0, 1, 2]];
        return colorFunctions[_rgba](vs[perm[i][0]] * 255, vs[perm[i][1]] * 255, vs[perm[i][2]] * 255, a);
    },
    [_hue]: function (color) { 
        return new dimension_1[_default](toHSL(color) [_h]);
    },
    [_saturati]: function (color) { 
        return new dimension_1[_default](toHSL(color) [_s] * 100, _27);
    },
    [_lightnes]: function (color) { 
        return new dimension_1[_default](toHSL(color) [_l] * 100, _27);
    },
    [_hsvhue]: function (color) { 
        return new dimension_1[_default](toHSV(color) [_h]);
    },
    [_hsvsatur]: function (color) { 
        return new dimension_1[_default](toHSV(color) [_s] * 100, _27);
    },
    [_hsvvalue]: function (color) { 
        return new dimension_1[_default](toHSV(color) [_v] * 100, _27);
    },
    [_red]: function (color) { 
        return new dimension_1[_default](color[_rgb][0]);
    },
    [_green]: function (color) { 
        return new dimension_1[_default](color[_rgb][1]);
    },
    [_blue]: function (color) { 
        return new dimension_1[_default](color[_rgb][2]);
    },
    [_alpha]: function (color) { 
        return new dimension_1[_default](toHSL(color) [_a]);
    },
    [_luma]: function (color) { 
        return new dimension_1[_default](color[_luma]() * color[_alpha] * 100, _27);
    },
    [_luminanc]: function (color) { 
        var luminance = (0.2126 * color[_rgb][0] / 255) +
            (0.7152 * color[_rgb][1] / 255) +
            (0.0722 * color[_rgb][2] / 255);
        return new dimension_1[_default](luminance * color[_alpha] * 100, _27);
    },
    [_saturate]: function (color, amount, method) { 
        // filter: saturate(3.2);
        // should be kept as is, so check for color
        if (!color[_rgb]) { 
            return null;
        }
        var hsl = toHSL(color);
        if (typeof method !== _undefine && method[_value] === _relative1) { 
            hsl[_s] += hsl[_s] * amount[_value] / 100;
        }
        else { 
            hsl[_s] += amount[_value] / 100;
        }
        hsl[_s] = clamp(hsl[_s]);
        return hsla(color, hsl);
    },
    [_desatura]: function (color, amount, method) { 
        var hsl = toHSL(color);
        if (typeof method !== _undefine && method[_value] === _relative1) { 
            hsl[_s] -= hsl[_s] * amount[_value] / 100;
        }
        else { 
            hsl[_s] -= amount[_value] / 100;
        }
        hsl[_s] = clamp(hsl[_s]);
        return hsla(color, hsl);
    },
    [_lighten]: function (color, amount, method) { 
        var hsl = toHSL(color);
        if (typeof method !== _undefine && method[_value] === _relative1) { 
            hsl[_l] += hsl[_l] * amount[_value] / 100;
        }
        else { 
            hsl[_l] += amount[_value] / 100;
        }
        hsl[_l] = clamp(hsl[_l]);
        return hsla(color, hsl);
    },
    [_darken]: function (color, amount, method) { 
        var hsl = toHSL(color);
        if (typeof method !== _undefine && method[_value] === _relative1) { 
            hsl[_l] -= hsl[_l] * amount[_value] / 100;
        }
        else { 
            hsl[_l] -= amount[_value] / 100;
        }
        hsl[_l] = clamp(hsl[_l]);
        return hsla(color, hsl);
    },
    [_fadein]: function (color, amount, method) { 
        var hsl = toHSL(color);
        if (typeof method !== _undefine && method[_value] === _relative1) { 
            hsl[_a] += hsl[_a] * amount[_value] / 100;
        }
        else { 
            hsl[_a] += amount[_value] / 100;
        }
        hsl[_a] = clamp(hsl[_a]);
        return hsla(color, hsl);
    },
    [_fadeout]: function (color, amount, method) { 
        var hsl = toHSL(color);
        if (typeof method !== _undefine && method[_value] === _relative1) { 
            hsl[_a] -= hsl[_a] * amount[_value] / 100;
        }
        else { 
            hsl[_a] -= amount[_value] / 100;
        }
        hsl[_a] = clamp(hsl[_a]);
        return hsla(color, hsl);
    },
    [_fade]: function (color, amount) { 
        var hsl = toHSL(color);
        hsl[_a] = amount[_value] / 100;
        hsl[_a] = clamp(hsl[_a]);
        return hsla(color, hsl);
    },
    [_spin]: function (color, amount) { 
        var hsl = toHSL(color);
        var hue = (hsl[_h] + amount[_value]) % 360;
        hsl[_h] = hue < 0 ? 360 + hue : hue;
        return hsla(color, hsl);
    },
    //
    // Copyright (c) 2006-2009 Hampton Catlin, Natalie Weizenbaum, and Chris Eppstein
    // http://sass-lang.com
    //
    [_mix]: function (color1, color2, weight) { 
        if (!weight) { 
            weight = new dimension_1[_default](50);
        }
        var p = weight[_value] / 100.0;
        var w = p * 2 - 1;
        var a = toHSL(color1) [_a] - toHSL(color2) [_a];
        var w1 = (((w * a == -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        var w2 = 1 - w1;
        var rgb = [color1[_rgb][0] * w1 + color2[_rgb][0] * w2,
            color1[_rgb][1] * w1 + color2[_rgb][1] * w2,
            color1[_rgb][2] * w1 + color2[_rgb][2] * w2];
        var alpha = color1[_alpha] * p + color2[_alpha] * (1 - p);
        return new color_1[_default](rgb, alpha);
    },
    [_greyscal]: function (color) { 
        return colorFunctions[_desatura](color, new dimension_1[_default](100));
    },
    [_contrast]: function (color, dark, light, threshold) { 
        // filter: contrast(3.2);
        // should be kept as is, so check for color
        if (!color[_rgb]) { 
            return null;
        }
        if (typeof light === _undefine) { 
            light = colorFunctions[_rgba](255, 255, 255, 1.0);
        }
        if (typeof dark === _undefine) { 
            dark = colorFunctions[_rgba](0, 0, 0, 1.0);
        }
        // Figure out which is actually light and dark:
        if (dark[_luma]() > light[_luma]()) { 
            var t = light;
            light = dark;
            dark = t;
        }
        if (typeof threshold === _undefine) { 
            threshold = 0.43;
        }
        else { 
            threshold = number(threshold);
        }
        if (color[_luma]() < threshold) { 
            return light;
        }
        else { 
            return dark;
        }
    },
    // Changes made in 2.7.0 - Reverted in 3.0.0
    // contrast: function (color, color1, color2, threshold) {
    //     // Return which of `color1` and `color2` has the greatest contrast with `color`
    //     // according to the standard WCAG contrast ratio calculation.
    //     // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
    //     // The threshold param is no longer used, in line with SASS.
    //     // filter: contrast(3.2);
    //     // should be kept as is, so check for color
    //     if (!color.rgb) {
    //         return null;
    //     }
    //     if (typeof color1 === 'undefined') {
    //         color1 = colorFunctions.rgba(0, 0, 0, 1.0);
    //     }
    //     if (typeof color2 === 'undefined') {
    //         color2 = colorFunctions.rgba(255, 255, 255, 1.0);
    //     }
    //     var contrast1, contrast2;
    //     var luma = color.luma();
    //     var luma1 = color1.luma();
    //     var luma2 = color2.luma();
    //     // Calculate contrast ratios for each color
    //     if (luma > luma1) {
    //         contrast1 = (luma + 0.05) / (luma1 + 0.05);
    //     } else {
    //         contrast1 = (luma1 + 0.05) / (luma + 0.05);
    //     }
    //     if (luma > luma2) {
    //         contrast2 = (luma + 0.05) / (luma2 + 0.05);
    //     } else {
    //         contrast2 = (luma2 + 0.05) / (luma + 0.05);
    //     }
    //     if (contrast1 > contrast2) {
    //         return color1;
    //     } else {
    //         return color2;
    //     }
    // },
    [_argb]: function (color) { 
        return new anonymous_1[_default](color[_toARGB]());
    },
    [_color]: function (c) { 
        if ((c instanceof quoted_1[_default]) &&
            (_A_Fa_f0 [_test](c[_value]))) { 
            var val = c[_value][_slice](1);
            return new color_1[_default](val, undefined, _25 + val);
        }
        if ((c instanceof color_1[_default]) || (c = color_1[_default][_fromKeyw](c[_value]))) { 
            c[_value] = undefined;
            return c;
        }
        throw { 
            [_type]: _Argument,
            [_message]: _argument3
        };
    },
    [_tint]: function (color, amount) { 
        return colorFunctions[_mix](colorFunctions[_rgb](255, 255, 255), color, amount);
    },
    [_shade]: function (color, amount) { 
        return colorFunctions[_mix](colorFunctions[_rgb](0, 0, 0), color, amount);
    }
};
exports[_default] = colorFunctions;
//# sourceMappingURL=color.js.map
return exports
}],
/* 1527 string _evaluate */ "evaluateJavaScript",
/* 1528 string _Inline_J */ /* text */ "Inline JavaScript is not enabled. Is it set in your options?",
/* 1529 string _jsify */ "jsify",
/* 1530 string _return_ */ /* text */ "return (",
/* 1531 string _JavaScri */ /* text */ "JavaScript evaluation error: ",
/* 1532 string _from_1 */ /* text */ " from `",
/* 1533 string _toJS */ "toJS",
/* 1534 string _JavaScri1 */ /* text */ "JavaScript evaluation error: '",
/* 1535 regexp _g2 */ /["]/g,
/* 1536 less$tree$js-eval-node.js */ [10,11,1,13,84,16,17,18,581,19,525,96,1527,1018,922,1528,663,143,146,147,108,1402,1529,1221,158,1530,1046,1531,1532,186,1021,1275,46,22,1533,153,21,1534,48,1223,1535,999,51,2,1133,503,157,101,1134,function(Object,exports,require,Function,Array,_definePr,__esModu,_value,__import1,_prototyp,_assign,_default,_evaluate,_javascri,_message,_Inline_J,_filename,_fileInfo,_index,_getIndex,_replace,_w_g,_jsify,_43,_eval,_return_,_23,_JavaScri,_from_1,_9,_frames,_variable3,_hasOwnPr,_slice,_toJS,_toCSS,_call,_JavaScri1,_name,_44,_g2,_19,_isArray,_length,_35,_map,_join,_1,_36){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var variable_1 = tslib_1[__import1](require(1397));
var JsEvalNode = function () {};
JsEvalNode[_prototyp] = Object[_assign](new node_1[_default](), { 
    [_evaluate]: function (expression, context) { 
        var result;
        var that = this;
        var evalContext = {};
        if (!context[_javascri]) { 
            throw { [_message]: _Inline_J,
                [_filename]: this[_fileInfo]() [_filename],
                [_index]: this[_getIndex]() };
        }
        expression = expression[_replace](_w_g, function (_, name) { 
            return that[_jsify](new variable_1[_default](_43 + name, that[_getIndex](), that[_fileInfo]()) [_eval](context));
        });
        try { 
            expression = new Function(_return_ + expression + _23);
        }
        catch (e) { 
            throw { [_message]: _JavaScri + e[_message] + _from_1 + expression + _9,
                [_filename]: this[_fileInfo]() [_filename],
                [_index]: this[_getIndex]() };
        }
        var variables = context[_frames][0] [_variable3]();
        for (var k in variables) { 
            if (variables[_hasOwnPr](k)) { 
                /* jshint loopfunc:true */
                evalContext[k[_slice](1)] = { 
                    [_value]: variables[k] [_value],
                    [_toJS]: function () { 
                        return this[_value][_eval](context) [_toCSS]();
                    }
                };
            }
        }
        try { 
            result = expression[_call](evalContext);
        }
        catch (e) { 
            throw { [_message]: _JavaScri1 + e[_name] + _44 + e[_message][_replace](_g2, _19) + _19,
                [_filename]: this[_fileInfo]() [_filename],
                [_index]: this[_getIndex]() };
        }
        return result;
    },
    [_jsify]: function (obj) { 
        if (Array[_isArray](obj[_value]) && (obj[_value][_length] > 1)) { 
            return _35 + obj[_value][_map](function (v) { return v[_toCSS](); }) [_join](_1) + _36;
        }
        else { 
            return obj[_toCSS]();
        }
    }
});
exports[_default] = JsEvalNode;
//# sourceMappingURL=js-eval-node.js.map
return exports
}],
/* 1537 string _expressi */ "expression",
/* 1538 string _JavaScri2 */ "JavaScript",
/* 1539 less$tree$javascript.js */ [10,11,1,12,84,16,17,18,581,1400,1537,150,151,19,525,96,167,1538,158,1527,541,4,1177,51,157,101,function(Object,exports,require,isNaN,Array,_definePr,__esModu,_value,__import1,_escaped,_expressi,_index1,_fileInf,_prototyp,_assign,_default,_type,_JavaScri2,_eval,_evaluate,_number,_string,_38,_isArray,_join,_1){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var js_eval_node_1 = tslib_1[__import1](require(1536));
var dimension_1 = tslib_1[__import1](require(1217));
var quoted_1 = tslib_1[__import1](require(1406));
var anonymous_1 = tslib_1[__import1](require(1140));
var JavaScript = function (string, escaped, index, currentFileInfo) { 
    this[_escaped] = escaped;
    this[_expressi] = string;
    this[_index1] = index;
    this[_fileInf] = currentFileInfo;
};
JavaScript[_prototyp] = Object[_assign](new js_eval_node_1[_default](), { 
    [_type]: _JavaScri2,
    [_eval]: function (context) { 
        var result = this[_evaluate](this[_expressi], context);
        var type = typeof result;
        if (type === _number && !isNaN(result)) { 
            return new dimension_1[_default](result);
        }
        else if (type === _string) { 
            return new quoted_1[_default](_38 + result + _38, result, this[_escaped], this[_index1]);
        }
        else if (Array[_isArray](result)) { 
            return new anonymous_1[_default](result[_join](_1));
        }
        else { 
            return new anonymous_1[_default](result);
        }
    }
});
exports[_default] = JavaScript;
//# sourceMappingURL=javascript.js.map
return exports
}],
/* 1540 string _e */ "e",
/* 1541 string _evaluate1 */ "evaluated",
/* 1542 string _escape */ "escape",
/* 1543 regexp _g3 */ /=/g,
/* 1544 string _3D */ "%3D",
/* 1545 regexp _g4 */ /:/g,
/* 1546 string _3A */ "%3A",
/* 1547 regexp _g5 */ /#/g,
/* 1548 string _56 */ "%23",
/* 1549 regexp _g6 */ /;/g,
/* 1550 string _3B */ "%3B",
/* 1551 regexp _g7 */ /\(/g,
/* 1552 string _57 */ "%28",
/* 1553 regexp _g8 */ /\)/g,
/* 1554 string _58 */ "%29",
/* 1555 regexp _sda_i */ /%[sda]/i,
/* 1556 regexp _s_i */ /s/i,
/* 1557 regexp _A_Z_$_ */ /[A-Z]$/,
/* 1558 regexp _g9 */ /%%/g,
/* 1559 less$functions$string.js */ [10,11,1,194,134,84,193,16,17,18,581,96,1540,1177,1541,1542,108,1543,1544,1545,1546,1547,1548,1549,1550,1551,1552,1553,1554,167,168,153,1047,1400,1072,19,22,21,1555,586,1556,1557,2,1558,function(Object,exports,require,encodeURI,RegExp,Array,encodeURIComponent,_definePr,__esModu,_value,__import1,_default,_e,_38,_evaluate1,_escape,_replace,_g3,_3D,_g4,_3A,_g5,_56,_g6,_3B,_g7,_57,_g8,_58,_type,_Quoted,_toCSS,_quote,_escaped,_27,_prototyp,_slice,_call,_sda_i,_match,_s_i,_A_Z_$_,_length,_g9){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var quoted_1 = tslib_1[__import1](require(1406));
var anonymous_1 = tslib_1[__import1](require(1140));
var javascript_1 = tslib_1[__import1](require(1539));
exports[_default] = { 
    [_e]: function (str) { 
        return new quoted_1[_default](_38, str instanceof javascript_1[_default] ? str[_evaluate1] : str[_value], true);
    },
    [_escape]: function (str) { 
        return new anonymous_1[_default](encodeURI(str[_value]) [_replace](_g3, _3D) [_replace](_g4, _3A) [_replace](_g5, _56) [_replace](_g6, _3B)
            [_replace](_g7, _57) [_replace](_g8, _58));
    },
    [_replace]: function (string, pattern, replacement, flags) { 
        var result = string[_value];
        replacement = (replacement[_type] === _Quoted) ?
            replacement[_value] : replacement[_toCSS]();
        result = result[_replace](new RegExp(pattern[_value], flags ? flags[_value] : ''), replacement);
        return new quoted_1[_default](string[_quote] || '', result, string[_escaped]);
    },
    [_27]: function (string /* arg, arg, ... */) { 
        var args = Array[_prototyp][_slice][_call](arguments, 1);
        var result = string[_value];
        var _loop_1 = function (i) { 
            /* jshint loopfunc:true */
            result = result[_replace](_sda_i, function (token) { 
                var value = ((args[i] [_type] === _Quoted) &&
                    token[_match](_s_i)) ? args[i] [_value] : args[i] [_toCSS]();
                return token[_match](_A_Z_$_) ? encodeURIComponent(value) : value;
            });
        };
        for (var i = 0; i < args[_length]; i++) { 
            _loop_1(i);
        }
        result = result[_replace](_g9, _27);
        return new quoted_1[_default](string[_quote] || '', result, string[_escaped]);
    }
};
//# sourceMappingURL=string.js.map
return exports
}],
/* 1560 string _Node */ "Node",
/* 1561 string _URL */ "URL",
/* 1562 string _Definiti */ "Definition",
/* 1563 less$tree$index.js */ [10,11,1,16,17,18,581,96,1560,1111,1326,1080,1304,1207,1056,1071,1392,1293,1256,1202,1132,1106,1240,168,1321,1222,1388,1561,1271,1101,169,1039,1538,1136,1089,1068,1380,1066,1307,1315,1269,1408,1370,1562,function(Object,exports,require,_definePr,__esModu,_value,__import1,_default,_Node,_Color,_AtRule,_Detached,_Operatio,_Dimensio1,_Unit,_Keyword,_Variable1,_Property,_Ruleset,_Element,_Attribut,_Combinat,_Selector,_Quoted,_Expressi1,_Declarat,_Call,_URL,_Import,_Comment,_Anonymou,_Value,_JavaScri2,_Assignme,_Conditio,_Paren,_Media,_UnicodeD,_Negative,_Extend,_Variable,_Namespac,_mixin,_Definiti){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var node_1 = tslib_1[__import1](require(176));
var color_1 = tslib_1[__import1](require(1129));
var atrule_1 = tslib_1[__import1](require(1331));
var detached_ruleset_1 = tslib_1[__import1](require(1083));
var operation_1 = tslib_1[__import1](require(1306));
var dimension_1 = tslib_1[__import1](require(1217));
var unit_1 = tslib_1[__import1](require(1065));
var keyword_1 = tslib_1[__import1](require(1078));
var variable_1 = tslib_1[__import1](require(1397));
var property_1 = tslib_1[__import1](require(1301));
var ruleset_1 = tslib_1[__import1](require(1292));
var element_1 = tslib_1[__import1](require(1204));
var attribute_1 = tslib_1[__import1](require(1135));
var combinator_1 = tslib_1[__import1](require(1107));
var selector_1 = tslib_1[__import1](require(1250));
var quoted_1 = tslib_1[__import1](require(1406));
var expression_1 = tslib_1[__import1](require(1324));
var declaration_1 = tslib_1[__import1](require(1230));
var call_1 = tslib_1[__import1](require(1391));
var url_1 = tslib_1[__import1](require(1051));
var import_1 = tslib_1[__import1](require(1424));
var comment_1 = tslib_1[__import1](require(1103));
var anonymous_1 = tslib_1[__import1](require(1140));
var value_1 = tslib_1[__import1](require(1041));
var javascript_1 = tslib_1[__import1](require(1539));
var assignment_1 = tslib_1[__import1](require(1137));
var condition_1 = tslib_1[__import1](require(1098));
var paren_1 = tslib_1[__import1](require(1070));
var media_1 = tslib_1[__import1](require(1386));
var unicode_descriptor_1 = tslib_1[__import1](require(1067));
var negative_1 = tslib_1[__import1](require(1308));
var extend_1 = tslib_1[__import1](require(1318));
var variable_call_1 = tslib_1[__import1](require(1399));
var namespace_value_1 = tslib_1[__import1](require(1412));
// mixins
var mixin_call_1 = tslib_1[__import1](require(1378));
var mixin_definition_1 = tslib_1[__import1](require(1367));
exports[_default] = { 
    [_Node]: node_1[_default],
    [_Color]: color_1[_default],
    [_AtRule]: atrule_1[_default],
    [_Detached]: detached_ruleset_1[_default],
    [_Operatio]: operation_1[_default],
    [_Dimensio1]: dimension_1[_default],
    [_Unit]: unit_1[_default],
    [_Keyword]: keyword_1[_default],
    [_Variable1]: variable_1[_default],
    [_Property]: property_1[_default],
    [_Ruleset]: ruleset_1[_default],
    [_Element]: element_1[_default],
    [_Attribut]: attribute_1[_default],
    [_Combinat]: combinator_1[_default],
    [_Selector]: selector_1[_default],
    [_Quoted]: quoted_1[_default],
    [_Expressi1]: expression_1[_default],
    [_Declarat]: declaration_1[_default],
    [_Call]: call_1[_default],
    [_URL]: url_1[_default],
    [_Import]: import_1[_default],
    [_Comment]: comment_1[_default],
    [_Anonymou]: anonymous_1[_default],
    [_Value]: value_1[_default],
    [_JavaScri2]: javascript_1[_default],
    [_Assignme]: assignment_1[_default],
    [_Conditio]: condition_1[_default],
    [_Paren]: paren_1[_default],
    [_Media]: media_1[_default],
    [_UnicodeD]: unicode_descriptor_1[_default],
    [_Negative]: negative_1[_default],
    [_Extend]: extend_1[_default],
    [_Variable]: variable_call_1[_default],
    [_Namespac]: namespace_value_1[_default],
    [_mixin]: { 
        [_Call]: mixin_call_1[_default],
        [_Definiti]: mixin_definition_1[_default]
    }
};
//# sourceMappingURL=index.js.map
return exports
}],
/* 1564 string _function3 */ "functionCaller",
/* 1565 less$functions$index.js */ [10,11,1,16,17,18,581,96,711,1564,597,155,158,948,function(Object,exports,require,_definePr,__esModu,_value,__import1,_default,_function2,_function3,_addMulti,_add,_eval,_bind){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var function_registry_1 = tslib_1[__import1](require(600));
var function_caller_1 = tslib_1[__import1](require(1350));
var boolean_1 = tslib_1[__import1](require(1160));
var default_1 = tslib_1[__import1](require(1143));
var color_1 = tslib_1[__import1](require(1526));
var color_blending_1 = tslib_1[__import1](require(1155));
var data_uri_1 = tslib_1[__import1](require(1495));
var list_1 = tslib_1[__import1](require(1481));
var math_1 = tslib_1[__import1](require(1347));
var number_1 = tslib_1[__import1](require(1339));
var string_1 = tslib_1[__import1](require(1559));
var svg_1 = tslib_1[__import1](require(1474));
var types_1 = tslib_1[__import1](require(1441));
exports[_default] = (function (environment) { 
    var functions = { [_function2]: function_registry_1[_default], [_function3]: function_caller_1[_default] };
    // register functions
    function_registry_1[_default][_addMulti](boolean_1[_default]);
    function_registry_1[_default][_add](_default, default_1[_default][_eval][_bind](default_1[_default]));
    function_registry_1[_default][_addMulti](color_1[_default]);
    function_registry_1[_default][_addMulti](color_blending_1[_default]);
    function_registry_1[_default][_addMulti](data_uri_1[_default](environment));
    function_registry_1[_default][_addMulti](list_1[_default]);
    function_registry_1[_default][_addMulti](math_1[_default]);
    function_registry_1[_default][_addMulti](number_1[_default]);
    function_registry_1[_default][_addMulti](string_1[_default]);
    function_registry_1[_default][_addMulti](svg_1[_default](environment));
    function_registry_1[_default][_addMulti](types_1[_default]);
    return functions;
});
//# sourceMappingURL=index.js.map
return exports
}],
/* 1566 less$tree */ [1,function(require){
return require(1563)
}],
/* 1567 less$functions */ [1,function(require){
return require(1565)
}],
/* 1568 string _visitDee */ "visitDeeper",
/* 1569 string _typeInde */ "typeIndex",
/* 1570 string _impleme */ "_implementation",
/* 1571 string _visitIn */ "_visitInCache",
/* 1572 string _visitOu */ "_visitOutCache",
/* 1573 string _Out */ "Out",
/* 1574 string _isReplac */ "isReplacing",
/* 1575 string _flatten */ "flatten",
/* 1576 less$visitors$visitor.js */ [10,11,1,123,16,17,18,581,1568,29,19,167,1569,517,1570,1571,1572,96,126,1573,21,1574,2,131,127,715,93,1575,function(Object,exports,require,undefined,_definePr,__esModu,_value,__import1,_visitDee,_function,_prototyp,_type,_typeInde,_object,_impleme,_visitIn,_visitOu,_default,_visit,_Out,_call,_isReplac,_length,_accept,_visitArr,_splice,_push,_flatten){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var tree_1 = tslib_1[__import1](require(1566));
var _visitArgs = { [_visitDee]: true };
var _hasIndexed = false;
function _noop(node) { 
    return node;
}
function indexNodeTypes(parent, ticker) { 
    // add .typeIndex to tree node types for lookup table
    var key, child;
    for (key in parent) { 
        /* eslint guard-for-in: 0 */
        child = parent[key];
        switch (typeof child) { 
            case _function :
                // ignore bound functions directly on tree which do not have a prototype
                // or aren't nodes
                if (child[_prototyp] && child[_prototyp][_type]) { 
                    child[_prototyp][_typeInde] = ticker++;
                }
                break;
            case _object :
                ticker = indexNodeTypes(child, ticker);
                break;
        }
    }
    return ticker;
}
var Visitor = /** @class */ (function () { 
    function Visitor(implementation) { 
        this[_impleme] = implementation;
        this[_visitIn] = {};
        this[_visitOu] = {};
        if (!_hasIndexed) { 
            indexNodeTypes(tree_1[_default], 1);
            _hasIndexed = true;
        }
    }
    Visitor[_prototyp][_visit] = function (node) { 
        if (!node) { 
            return node;
        }
        var nodeTypeIndex = node[_typeInde];
        if (!nodeTypeIndex) { 
            // MixinCall args aren't a node type?
            if (node[_value] && node[_value][_typeInde]) { 
                this[_visit](node[_value]);
            }
            return node;
        }
        var impl = this[_impleme];
        var func = this[_visitIn][nodeTypeIndex];
        var funcOut = this[_visitOu][nodeTypeIndex];
        var visitArgs = _visitArgs;
        var fnName;
        visitArgs[_visitDee] = true;
        if (!func) { 
            fnName = _visit + node[_type];
            func = impl[fnName] || _noop;
            funcOut = impl[fnName + _Out] || _noop;
            this[_visitIn][nodeTypeIndex] = func;
            this[_visitOu][nodeTypeIndex] = funcOut;
        }
        if (func !== _noop) { 
            var newNode = func[_call](impl, node, visitArgs);
            if (node && impl[_isReplac]) { 
                node = newNode;
            }
        }
        if (visitArgs[_visitDee] && node) { 
            if (node[_length]) { 
                for (var i = 0, cnt = node[_length]; i < cnt; i++) { 
                    if (node[i] [_accept]) { 
                        node[i] [_accept](this);
                    }
                }
            }
            else if (node[_accept]) { 
                node[_accept](this);
            }
        }
        if (funcOut != _noop) { 
            funcOut[_call](impl, node);
        }
        return node;
    };
    Visitor[_prototyp][_visitArr] = function (nodes, nonReplacing) { 
        if (!nodes) { 
            return nodes;
        }
        var cnt = nodes[_length];
        var i;
        // Non-replacing
        if (nonReplacing || !this[_impleme][_isReplac]) { 
            for (i = 0; i < cnt; i++) { 
                this[_visit](nodes[i]);
            }
            return nodes;
        }
        // Replacing
        var out = [];
        for (i = 0; i < cnt; i++) { 
            var evald = this[_visit](nodes[i]);
            if (evald === undefined) { 
                continue;
            }
            if (!evald[_splice]) { 
                out[_push](evald);
            }
            else if (evald[_length]) { 
                this[_flatten](evald, out);
            }
        }
        return out;
    };
    Visitor[_prototyp][_flatten] = function (arr, out) { 
        if (!out) { 
            out = [];
        }
        var cnt, i, item, nestedCnt, j, nestedItem;
        for (i = 0, cnt = arr[_length]; i < cnt; i++) { 
            item = arr[i];
            if (item === undefined) { 
                continue;
            }
            if (!item[_splice]) { 
                out[_push](item);
                continue;
            }
            for (j = 0, nestedCnt = item[_length]; j < nestedCnt; j++) { 
                nestedItem = item[j];
                if (nestedItem === undefined) { 
                    continue;
                }
                if (!nestedItem[_splice]) { 
                    out[_push](nestedItem);
                }
                else if (nestedItem[_length]) { 
                    this[_flatten](nestedItem, out);
                }
            }
        }
        return out;
    };
    return Visitor;
}());
exports[_default] = Visitor;
//# sourceMappingURL=visitor.js.map
return exports
}],
/* 1577 string _visitor1 */ "_visitor",
/* 1578 string _context1 */ "_context",
/* 1579 string _contains1 */ "containsSilentNonBlockedChild",
/* 1580 string _keepOnly */ "keepOnlyVisibleChilds",
/* 1581 string _hasVisib */ "hasVisibleSelector",
/* 1582 string _resolveV */ "resolveVisibility",
/* 1583 string _isVisibl1 */ "isVisibleRuleset",
/* 1584 string _utils */ "utils",
/* 1585 string _visitDec */ "visitDeclaration",
/* 1586 string _visitMix */ "visitMixinDefinition",
/* 1587 string _visitExt */ "visitExtend",
/* 1588 string _visitCom */ "visitComment",
/* 1589 string _visitMed */ "visitMedia",
/* 1590 string _visitImp */ "visitImport",
/* 1591 string _visitAtR */ "visitAtRule",
/* 1592 string _visitAtR1 */ "visitAtRuleWithBody",
/* 1593 string _visitAtR2 */ "visitAtRuleWithoutBody",
/* 1594 string _visitAno */ "visitAnonymous",
/* 1595 string _charset1 */ "charset",
/* 1596 string _59 */ /* text */ "/* ",
/* 1597 string _checkVal */ "checkValidNodes",
/* 1598 string _Properti */ /* text */ "Properties must be inside selector blocks. They cannot be in the root",
/* 1599 string _Function */ /* text */ "Function '",
/* 1600 string _did_not */ /* text */ "' did not return a root node",
/* 1601 string _node_re */ /* text */ " node returned by a function is not valid here",
/* 1602 string _visitRul */ "visitRuleset",
/* 1603 string _compile1 */ "_compileRulesetPaths",
/* 1604 string _removeD */ "_removeDuplicateRules",
/* 1605 less$visitors$to-css-visitor.js */ [10,11,1,16,17,18,581,1577,96,1578,19,1579,2,1102,128,1580,1252,1267,173,156,1581,1006,1582,129,172,1583,1261,1260,1584,1574,125,126,1585,1220,1586,1021,1587,1588,1589,131,1568,1590,1591,1592,1593,1594,1295,48,1327,1595,99,1101,1596,153,108,622,103,1597,1222,922,1598,146,147,663,143,1388,1599,1600,167,1100,1601,1602,1603,93,715,1604,1237,1200,933,1106,1249,3,614,149,1321,160,1218,1039,function(Object,exports,require,_definePr,__esModu,_value,__import1,_visitor1,_default,_context1,_prototyp,_contains1,_length,_isSilent,_blocksVi,_keepOnly,_rules,_filter,_isVisibl,_isEmpty,_hasVisib,_paths,_resolveV,_ensureVi,_removeVi,_isVisibl1,_firstRoo,_root,_utils,_isReplac,_run,_visit,_visitDec,_variable2,_visitMix,_frames,_visitExt,_visitCom,_visitMed,_accept,_visitDee,_visitImp,_visitAtR,_visitAtR1,_visitAtR2,_visitAno,_mergeRu,_name,_charset,_charset1,_debugInf,_Comment,_59,_toCSS,_replace,_n_g,_2,_checkVal,_Declarat,_message,_Properti,_index,_getIndex,_filename,_fileInfo,_Call,_Function,_did_not,_type,_allowRoo,_node_re,_visitRul,_compile1,_push,_splice,_removeD,_elements,_combinat,_14,_Combinat,_getIsOut,_indexOf,_merge,_forEach,_Expressi1,_6,_importan1,_Value){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var tree_1 = tslib_1[__import1](require(1566));
var visitor_1 = tslib_1[__import1](require(1576));
var CSSVisitorUtils = /** @class */ (function () { 
    function CSSVisitorUtils(context) { 
        this[_visitor1] = new visitor_1[_default](this);
        this[_context1] = context;
    }
    CSSVisitorUtils[_prototyp][_contains1] = function (bodyRules) { 
        var rule;
        if (!bodyRules) { 
            return false;
        }
        for (var r = 0; r < bodyRules[_length]; r++) { 
            rule = bodyRules[r];
            if (rule[_isSilent] && rule[_isSilent](this[_context1]) && !rule[_blocksVi]()) { 
                // the atrule contains something that was referenced (likely by extend)
                // therefore it needs to be shown in output too
                return true;
            }
        }
        return false;
    };
    CSSVisitorUtils[_prototyp][_keepOnly] = function (owner) { 
        if (owner && owner[_rules]) { 
            owner[_rules] = owner[_rules][_filter](function (thing) { return thing[_isVisibl](); });
        }
    };
    CSSVisitorUtils[_prototyp][_isEmpty] = function (owner) { 
        return (owner && owner[_rules])
            ? (owner[_rules][_length] === 0) : true;
    };
    CSSVisitorUtils[_prototyp][_hasVisib] = function (rulesetNode) { 
        return (rulesetNode && rulesetNode[_paths])
            ? (rulesetNode[_paths][_length] > 0) : false;
    };
    CSSVisitorUtils[_prototyp][_resolveV] = function (node, originalRules) { 
        if (!node[_blocksVi]()) { 
            if (this[_isEmpty](node) && !this[_contains1](originalRules)) { 
                return;
            }
            return node;
        }
        var compiledRulesBody = node[_rules][0];
        this[_keepOnly](compiledRulesBody);
        if (this[_isEmpty](compiledRulesBody)) { 
            return;
        }
        node[_ensureVi]();
        node[_removeVi]();
        return node;
    };
    CSSVisitorUtils[_prototyp][_isVisibl1] = function (rulesetNode) { 
        if (rulesetNode[_firstRoo]) { 
            return true;
        }
        if (this[_isEmpty](rulesetNode)) { 
            return false;
        }
        if (!rulesetNode[_root] && !this[_hasVisib](rulesetNode)) { 
            return false;
        }
        return true;
    };
    return CSSVisitorUtils;
}());
var ToCSSVisitor = function (context) { 
    this[_visitor1] = new visitor_1[_default](this);
    this[_context1] = context;
    this[_utils] = new CSSVisitorUtils(context);
};
ToCSSVisitor[_prototyp] = { 
    [_isReplac]: true,
    [_run]: function (root) { 
        return this[_visitor1][_visit](root);
    },
    [_visitDec]: function (declNode, visitArgs) { 
        if (declNode[_blocksVi]() || declNode[_variable2]) { 
            return;
        }
        return declNode;
    },
    [_visitMix]: function (mixinNode, visitArgs) { 
        // mixin definitions do not get eval'd - this means they keep state
        // so we have to clear that state here so it isn't used if toCSS is called twice
        mixinNode[_frames] = [];
    },
    [_visitExt]: function (extendNode, visitArgs) { 
    },
    [_visitCom]: function (commentNode, visitArgs) { 
        if (commentNode[_blocksVi]() || commentNode[_isSilent](this[_context1])) { 
            return;
        }
        return commentNode;
    },
    [_visitMed]: function (mediaNode, visitArgs) { 
        var originalRules = mediaNode[_rules][0] [_rules];
        mediaNode[_accept](this[_visitor1]);
        visitArgs[_visitDee] = false;
        return this[_utils][_resolveV](mediaNode, originalRules);
    },
    [_visitImp]: function (importNode, visitArgs) { 
        if (importNode[_blocksVi]()) { 
            return;
        }
        return importNode;
    },
    [_visitAtR]: function (atRuleNode, visitArgs) { 
        if (atRuleNode[_rules] && atRuleNode[_rules][_length]) { 
            return this[_visitAtR1](atRuleNode, visitArgs);
        }
        else { 
            return this[_visitAtR2](atRuleNode, visitArgs);
        }
    },
    [_visitAno]: function (anonymousNode, visitArgs) { 
        if (!anonymousNode[_blocksVi]()) { 
            anonymousNode[_accept](this[_visitor1]);
            return anonymousNode;
        }
    },
    [_visitAtR1]: function (atRuleNode, visitArgs) { 
        // if there is only one nested ruleset and that one has no path, then it is
        // just fake ruleset
        function hasFakeRuleset(atRuleNode) { 
            var bodyRules = atRuleNode[_rules];
            return bodyRules[_length] === 1 && (!bodyRules[0] [_paths] || bodyRules[0] [_paths][_length] === 0);
        }
        function getBodyRules(atRuleNode) { 
            var nodeRules = atRuleNode[_rules];
            if (hasFakeRuleset(atRuleNode)) { 
                return nodeRules[0] [_rules];
            }
            return nodeRules;
        }
        // it is still true that it is only one ruleset in array
        // this is last such moment
        // process childs
        var originalRules = getBodyRules(atRuleNode);
        atRuleNode[_accept](this[_visitor1]);
        visitArgs[_visitDee] = false;
        if (!this[_utils][_isEmpty](atRuleNode)) { 
            this[_mergeRu](atRuleNode[_rules][0] [_rules]);
        }
        return this[_utils][_resolveV](atRuleNode, originalRules);
    },
    [_visitAtR2]: function (atRuleNode, visitArgs) { 
        if (atRuleNode[_blocksVi]()) { 
            return;
        }
        if (atRuleNode[_name] === _charset) { 
            // Only output the debug info together with subsequent @charset definitions
            // a comment (or @media statement) before the actual @charset atrule would
            // be considered illegal css as it has to be on the first line
            if (this[_charset1]) { 
                if (atRuleNode[_debugInf]) { 
                    var comment = new tree_1[_default][_Comment](_59 + atRuleNode[_toCSS](this[_context1]) [_replace](_n_g, '') + _2);
                    comment[_debugInf] = atRuleNode[_debugInf];
                    return this[_visitor1][_visit](comment);
                }
                return;
            }
            this[_charset1] = true;
        }
        return atRuleNode;
    },
    [_checkVal]: function (rules, isRoot) { 
        if (!rules) { 
            return;
        }
        for (var i = 0; i < rules[_length]; i++) { 
            var ruleNode = rules[i];
            if (isRoot && ruleNode instanceof tree_1[_default][_Declarat] && !ruleNode[_variable2]) { 
                throw { [_message]: _Properti,
                    [_index]: ruleNode[_getIndex](), [_filename]: ruleNode[_fileInfo]() && ruleNode[_fileInfo]() [_filename] };
            }
            if (ruleNode instanceof tree_1[_default][_Call]) { 
                throw { [_message]: _Function + ruleNode[_name] + _did_not,
                    [_index]: ruleNode[_getIndex](), [_filename]: ruleNode[_fileInfo]() && ruleNode[_fileInfo]() [_filename] };
            }
            if (ruleNode[_type] && !ruleNode[_allowRoo]) { 
                throw { [_message]: ruleNode[_type] + _node_re,
                    [_index]: ruleNode[_getIndex](), [_filename]: ruleNode[_fileInfo]() && ruleNode[_fileInfo]() [_filename] };
            }
        }
    },
    [_visitRul]: function (rulesetNode, visitArgs) { 
        // at this point rulesets are nested into each other
        var rule;
        var rulesets = [];
        this[_checkVal](rulesetNode[_rules], rulesetNode[_firstRoo]);
        if (!rulesetNode[_root]) { 
            // remove invisible paths
            this[_compile1](rulesetNode);
            // remove rulesets from this ruleset body and compile them separately
            var nodeRules = rulesetNode[_rules];
            var nodeRuleCnt = nodeRules ? nodeRules[_length] : 0;
            for (var i = 0; i < nodeRuleCnt;) { 
                rule = nodeRules[i];
                if (rule && rule[_rules]) { 
                    // visit because we are moving them out from being a child
                    rulesets[_push](this[_visitor1][_visit](rule));
                    nodeRules[_splice](i, 1);
                    nodeRuleCnt--;
                    continue;
                }
                i++;
            }
            // accept the visitor to remove rules and refactor itself
            // then we can decide nogw whether we want it or not
            // compile body
            if (nodeRuleCnt > 0) { 
                rulesetNode[_accept](this[_visitor1]);
            }
            else { 
                rulesetNode[_rules] = null;
            }
            visitArgs[_visitDee] = false;
        }
        else { // if (! rulesetNode.root) {
            rulesetNode[_accept](this[_visitor1]);
            visitArgs[_visitDee] = false;
        }
        if (rulesetNode[_rules]) { 
            this[_mergeRu](rulesetNode[_rules]);
            this[_removeD](rulesetNode[_rules]);
        }
        // now decide whether we keep the ruleset
        if (this[_utils][_isVisibl1](rulesetNode)) { 
            rulesetNode[_ensureVi]();
            rulesets[_splice](0, 0, rulesetNode);
        }
        if (rulesets[_length] === 1) { 
            return rulesets[0];
        }
        return rulesets;
    },
    [_compile1]: function (rulesetNode) { 
        if (rulesetNode[_paths]) { 
            rulesetNode[_paths] = rulesetNode[_paths]
                [_filter](function (p) { 
                var i;
                if (p[0] [_elements][0] [_combinat][_value] === _14) { 
                    p[0] [_elements][0] [_combinat] = new (tree_1[_default][_Combinat])('');
                }
                for (i = 0; i < p[_length]; i++) { 
                    if (p[i] [_isVisibl]() && p[i] [_getIsOut]()) { 
                        return true;
                    }
                }
                return false;
            });
        }
    },
    [_removeD]: function (rules) { 
        if (!rules) { 
            return;
        }
        // remove duplicates
        var ruleCache = {};
        var ruleList;
        var rule;
        var i;
        for (i = rules[_length] - 1; i >= 0; i--) { 
            rule = rules[i];
            if (rule instanceof tree_1[_default][_Declarat]) { 
                if (!ruleCache[rule[_name]]) { 
                    ruleCache[rule[_name]] = rule;
                }
                else { 
                    ruleList = ruleCache[rule[_name]];
                    if (ruleList instanceof tree_1[_default][_Declarat]) { 
                        ruleList = ruleCache[rule[_name]] = [ruleCache[rule[_name]] [_toCSS](this[_context1])];
                    }
                    var ruleCSS = rule[_toCSS](this[_context1]);
                    if (ruleList[_indexOf](ruleCSS) !== -1) { 
                        rules[_splice](i, 1);
                    }
                    else { 
                        ruleList[_push](ruleCSS);
                    }
                }
            }
        }
    },
    [_mergeRu]: function (rules) { 
        if (!rules) { 
            return;
        }
        var groups = {};
        var groupsArr = [];
        for (var i = 0; i < rules[_length]; i++) { 
            var rule = rules[i];
            if (rule[_merge]) { 
                var key = rule[_name];
                groups[key] ? rules[_splice](i--, 1) :
                    groupsArr[_push](groups[key] = []);
                groups[key] [_push](rule);
            }
        }
        groupsArr[_forEach](function (group) { 
            if (group[_length] > 0) { 
                var result_1 = group[0];
                var space_1 = [];
                var comma_1 = [new tree_1[_default][_Expressi1](space_1)];
                group[_forEach](function (rule) { 
                    if ((rule[_merge] === _6) && (space_1[_length] > 0)) { 
                        comma_1[_push](new tree_1[_default][_Expressi1](space_1 = []));
                    }
                    space_1[_push](rule[_value]);
                    result_1[_importan1] = result_1[_importan1] || rule[_importan1];
                });
                result_1[_value] = new tree_1[_default][_Value](comma_1);
            }
        });
    }
};
exports[_default] = ToCSSVisitor;
//# sourceMappingURL=to-css-visitor.js.map
return exports
}],
/* 1606 string _contexts */ "contexts",
/* 1607 string _visitRul1 */ "visitRulesetOut",
/* 1608 less$visitors$join-selector-visitor.js */ [10,11,1,16,17,18,581,1606,1577,96,19,125,126,1585,1568,1586,1602,2,93,1260,1251,1267,1249,1290,1252,1006,1607,1589,1384,1591,1325,function(Object,exports,require,_definePr,__esModu,_value,__import1,_contexts,_visitor1,_default,_prototyp,_run,_visit,_visitDec,_visitDee,_visitMix,_visitRul,_length,_push,_root,_selector1,_filter,_getIsOut,_joinSele,_rules,_paths,_visitRul1,_visitMed,_multiMed,_visitAtR,_isRooted){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var visitor_1 = tslib_1[__import1](require(1576));
var JoinSelectorVisitor = /** @class */ (function () { 
    function JoinSelectorVisitor() { 
        this[_contexts] = [[]];
        this[_visitor1] = new visitor_1[_default](this);
    }
    JoinSelectorVisitor[_prototyp][_run] = function (root) { 
        return this[_visitor1][_visit](root);
    };
    JoinSelectorVisitor[_prototyp][_visitDec] = function (declNode, visitArgs) { 
        visitArgs[_visitDee] = false;
    };
    JoinSelectorVisitor[_prototyp][_visitMix] = function (mixinDefinitionNode, visitArgs) { 
        visitArgs[_visitDee] = false;
    };
    JoinSelectorVisitor[_prototyp][_visitRul] = function (rulesetNode, visitArgs) { 
        var context = this[_contexts][this[_contexts][_length] - 1];
        var paths = [];
        var selectors;
        this[_contexts][_push](paths);
        if (!rulesetNode[_root]) { 
            selectors = rulesetNode[_selector1];
            if (selectors) { 
                selectors = selectors[_filter](function (selector) { return selector[_getIsOut](); });
                rulesetNode[_selector1] = selectors[_length] ? selectors : (selectors = null);
                if (selectors) { 
                    rulesetNode[_joinSele](paths, context, selectors);
                }
            }
            if (!selectors) { 
                rulesetNode[_rules] = null;
            }
            rulesetNode[_paths] = paths;
        }
    };
    JoinSelectorVisitor[_prototyp][_visitRul1] = function (rulesetNode) { 
        this[_contexts][_length] = this[_contexts][_length] - 1;
    };
    JoinSelectorVisitor[_prototyp][_visitMed] = function (mediaNode, visitArgs) { 
        var context = this[_contexts][this[_contexts][_length] - 1];
        mediaNode[_rules][0] [_root] = (context[_length] === 0 || context[0] [_multiMed]);
    };
    JoinSelectorVisitor[_prototyp][_visitAtR] = function (atRuleNode, visitArgs) { 
        var context = this[_contexts][this[_contexts][_length] - 1];
        if (atRuleNode[_rules] && atRuleNode[_rules][_length]) { 
            atRuleNode[_rules][0] [_root] = (atRuleNode[_isRooted] || context[_length] === 0 || null);
        }
    };
    return JoinSelectorVisitor;
}());
exports[_default] = JoinSelectorVisitor;
//# sourceMappingURL=join-selector-visitor.js.map
return exports
}],
/* 1609 string _importe */ "_importer",
/* 1610 string _finish */ "_finish",
/* 1611 string _importCo */ "importCount",
/* 1612 string _onceFile */ "onceFileDetectionMap",
/* 1613 string _recursio */ "recursionDetector",
/* 1614 string _sequenc */ "_sequencer",
/* 1615 string _processI1 */ "processImportNode",
/* 1616 string _multiple */ "multiple",
/* 1617 string _onImport */ "onImported",
/* 1618 string _optional2 */ "optional",
/* 1619 string _visitDec1 */ "visitDeclarationOut",
/* 1620 string _visitAtR3 */ "visitAtRuleOut",
/* 1621 string _visitMix1 */ "visitMixinDefinitionOut",
/* 1622 string _visitMed1 */ "visitMediaOut",
/* 1623 less$visitors$import-visitor.js */ [10,11,1,123,16,17,18,581,580,1577,96,1609,1610,964,1020,1611,1612,1613,1614,87,948,19,1574,125,126,544,1190,94,1590,676,1219,883,618,1021,1417,95,1615,1568,1418,663,146,147,143,1616,1016,1252,2,1617,89,93,983,1414,1618,1422,1260,1423,1585,167,1080,1263,1619,549,1591,1620,1586,1621,1602,1607,1589,1622,function(Object,exports,require,undefined,_definePr,__esModu,_value,__import1,__import,_visitor1,_default,_importe,_finish,_context,_Eval,_importCo,_onceFile,_recursio,_sequenc,_onSeque,_bind,_prototyp,_isReplac,_run,_visit,_error,_isFinish,_tryRun,_visitImp,_options,_inline,_css1,_copyArra,_frames,_isVariab1,_addVaria,_processI1,_visitDee,_evalForI,_filename,_index,_getIndex,_fileInfo,_multiple,_importMu,_rules,_length,_onImport,_addImpor,_push,_getPath,_isPlugin,_optional2,_skip,_root,_imported,_visitDec,_type,_Detached,_unshift,_visitDec1,_shift,_visitAtR,_visitAtR3,_visitMix,_visitMix1,_visitRul,_visitRul1,_visitMed,_visitMed1){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var contexts_1 = tslib_1[__import1](require(1037));
var visitor_1 = tslib_1[__import1](require(1576));
var import_sequencer_1 = tslib_1[__import1](require(97));
var utils = tslib_1[__import](require(636));
var ImportVisitor = function (importer, finish) { 
    this[_visitor1] = new visitor_1[_default](this);
    this[_importe] = importer;
    this[_finish] = finish;
    this[_context] = new contexts_1[_default][_Eval]();
    this[_importCo] = 0;
    this[_onceFile] = {};
    this[_recursio] = {};
    this[_sequenc] = new import_sequencer_1[_default](this[_onSeque][_bind](this));
};
ImportVisitor[_prototyp] = { 
    [_isReplac]: false,
    [_run]: function (root) { 
        try { 
            // process the contents
            this[_visitor1][_visit](root);
        }
        catch (e) { 
            this[_error] = e;
        }
        this[_isFinish] = true;
        this[_sequenc][_tryRun]();
    },
    [_onSeque]: function () { 
        if (!this[_isFinish]) { 
            return;
        }
        this[_finish](this[_error]);
    },
    [_visitImp]: function (importNode, visitArgs) { 
        var inlineCSS = importNode[_options][_inline];
        if (!importNode[_css1] || inlineCSS) { 
            var context = new contexts_1[_default][_Eval](this[_context], utils[_copyArra](this[_context][_frames]));
            var importParent = context[_frames][0];
            this[_importCo]++;
            if (importNode[_isVariab1]()) { 
                this[_sequenc][_addVaria](this[_processI1][_bind](this, importNode, context, importParent));
            }
            else { 
                this[_processI1](importNode, context, importParent);
            }
        }
        visitArgs[_visitDee] = false;
    },
    [_processI1]: function (importNode, context, importParent) { 
        var evaldImportNode;
        var inlineCSS = importNode[_options][_inline];
        try { 
            evaldImportNode = importNode[_evalForI](context);
        }
        catch (e) { 
            if (!e[_filename]) { 
                e[_index] = importNode[_getIndex]();
                e[_filename] = importNode[_fileInfo]() [_filename];
            }
            // attempt to eval properly and treat as css
            importNode[_css1] = true;
            // if that fails, this error will be thrown
            importNode[_error] = e;
        }
        if (evaldImportNode && (!evaldImportNode[_css1] || inlineCSS)) { 
            if (evaldImportNode[_options][_multiple]) { 
                context[_importMu] = true;
            }
            // try appending if we haven't determined if it is css or not
            var tryAppendLessExtension = evaldImportNode[_css1] === undefined;
            for (var i = 0; i < importParent[_rules][_length]; i++) { 
                if (importParent[_rules][i] === importNode) { 
                    importParent[_rules][i] = evaldImportNode;
                    break;
                }
            }
            var onImported = this[_onImport][_bind](this, evaldImportNode, context), sequencedOnImported = this[_sequenc][_addImpor](onImported);
            this[_importe][_push](evaldImportNode[_getPath](), tryAppendLessExtension, evaldImportNode[_fileInfo](), evaldImportNode[_options], sequencedOnImported);
        }
        else { 
            this[_importCo]--;
            if (this[_isFinish]) { 
                this[_sequenc][_tryRun]();
            }
        }
    },
    [_onImport]: function (importNode, context, e, root, importedAtRoot, fullPath) { 
        if (e) { 
            if (!e[_filename]) { 
                e[_index] = importNode[_getIndex]();
                e[_filename] = importNode[_fileInfo]() [_filename];
            }
            this[_error] = e;
        }
        var importVisitor = this, inlineCSS = importNode[_options][_inline], isPlugin = importNode[_options][_isPlugin], isOptional = importNode[_options][_optional2], duplicateImport = importedAtRoot || fullPath in importVisitor[_recursio];
        if (!context[_importMu]) { 
            if (duplicateImport) { 
                importNode[_skip] = true;
            }
            else { 
                importNode[_skip] = function () { 
                    if (fullPath in importVisitor[_onceFile]) { 
                        return true;
                    }
                    importVisitor[_onceFile][fullPath] = true;
                    return false;
                };
            }
        }
        if (!fullPath && isOptional) { 
            importNode[_skip] = true;
        }
        if (root) { 
            importNode[_root] = root;
            importNode[_imported] = fullPath;
            if (!inlineCSS && !isPlugin && (context[_importMu] || !duplicateImport)) { 
                importVisitor[_recursio][fullPath] = true;
                var oldContext = this[_context];
                this[_context] = context;
                try { 
                    this[_visitor1][_visit](root);
                }
                catch (e) { 
                    this[_error] = e;
                }
                this[_context] = oldContext;
            }
        }
        importVisitor[_importCo]--;
        if (importVisitor[_isFinish]) { 
            importVisitor[_sequenc][_tryRun]();
        }
    },
    [_visitDec]: function (declNode, visitArgs) { 
        if (declNode[_value][_type] === _Detached) { 
            this[_context][_frames][_unshift](declNode);
        }
        else { 
            visitArgs[_visitDee] = false;
        }
    },
    [_visitDec1]: function (declNode) { 
        if (declNode[_value][_type] === _Detached) { 
            this[_context][_frames][_shift]();
        }
    },
    [_visitAtR]: function (atRuleNode, visitArgs) { 
        this[_context][_frames][_unshift](atRuleNode);
    },
    [_visitAtR3]: function (atRuleNode) { 
        this[_context][_frames][_shift]();
    },
    [_visitMix]: function (mixinDefinitionNode, visitArgs) { 
        this[_context][_frames][_unshift](mixinDefinitionNode);
    },
    [_visitMix1]: function (mixinDefinitionNode) { 
        this[_context][_frames][_shift]();
    },
    [_visitRul]: function (rulesetNode, visitArgs) { 
        this[_context][_frames][_unshift](rulesetNode);
    },
    [_visitRul1]: function (rulesetNode) { 
        this[_context][_frames][_shift]();
    },
    [_visitMed]: function (mediaNode, visitArgs) { 
        this[_context][_frames][_unshift](mediaNode[_rules][0]);
    },
    [_visitMed1]: function (mediaNode) { 
        this[_context][_frames][_shift]();
    }
};
exports[_default] = ImportVisitor;
//# sourceMappingURL=import-visitor.js.map
return exports
}],
/* 1624 string _allExten */ "allExtendsStack",
/* 1625 string _allExten1 */ "allExtends",
/* 1626 string _extendOn */ "extendOnEveryPath",
/* 1627 string _foundExt */ "foundExtends",
/* 1628 string _firstExt */ "firstExtendOnThisSelectorPath",
/* 1629 string _extendIn */ "extendIndices",
/* 1630 string _doExtend */ "doExtendChaining",
/* 1631 string _checkExt */ "checkExtendsForNonMatched",
/* 1632 string _hasFound */ "hasFoundMatches",
/* 1633 string _unknown */ "_unknown_",
/* 1634 string _extend_ */ /* text */ "extend '",
/* 1635 string _has_no_ */ /* text */ "' has no matches",
/* 1636 string _findMatc */ "findMatch",
/* 1637 string _extendSe */ "extendSelector",
/* 1638 string _extendCh */ "extendChainCount",
/* 1639 string _unable_ */ /* text */ "{unable to calculate}",
/* 1640 string _extend_c */ /* text */ "extend circular reference detected. One of the circular extends is currently:",
/* 1641 string _extend_1 */ ":extend(",
/* 1642 string _visitSel */ "visitSelector",
/* 1643 string _pathInde */ "pathIndex",
/* 1644 string _matched */ "matched",
/* 1645 string _initialC */ "initialCombinator",
/* 1646 string _isElemen */ "isElementValuesEqual",
/* 1647 string _endPathI */ "endPathIndex",
/* 1648 string _endPathE */ "endPathElementIndex",
/* 1649 less$visitors$extend-visitor.js */ [10,11,1,16,17,18,581,580,1577,96,1606,1624,19,125,126,1625,1585,1568,1586,1602,1260,1252,2,1315,93,1626,1006,1234,618,8,503,617,1627,1316,1079,1628,1251,1607,1589,1622,1591,1620,1629,1630,1631,1267,1632,1312,149,1633,1244,153,146,933,914,1634,1635,3,1310,1317,1636,174,1637,173,1309,143,1638,1639,922,1640,1641,1046,1642,1237,1313,1643,1644,1645,1200,1646,1166,1314,1647,1648,715,4,1132,1084,1130,1240,1202,1201,147,22,1241,129,130,function(Object,exports,require,_definePr,__esModu,_value,__import1,__import,_visitor1,_default,_contexts,_allExten,_prototyp,_run,_visit,_allExten1,_visitDec,_visitDee,_visitMix,_visitRul,_root,_rules,_length,_Extend,_push,_extendOn,_paths,_extendLi,_copyArra,_concat,_map,_clone,_foundExt,_findSelf,_ruleset,_firstExt,_selector1,_visitRul1,_visitMed,_visitMed1,_visitAtR,_visitAtR3,_extendIn,_doExtend,_checkExt,_filter,_hasFound,_parent_i,_forEach,_unknown,_selector,_toCSS,_index,_14,_warn,_extend_,_has_no_,_indexOf,_object_i,_selfSele,_findMatc,_visibili1,_extendSe,_isVisibl,_option,_fileInfo,_extendCh,_unable_,_message,_extend_c,_extend_1,_23,_visitSel,_elements,_allowBef,_pathInde,_matched,_initialC,_combinat,_isElemen,_finished,_allowAft,_endPathI,_endPathE,_splice,_string,_Attribut,_op,_key,_Selector,_Element,_isVariab,_getIndex,_slice,_createDe,_ensureVi,_ensureIn){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var tree_1 = tslib_1[__import1](require(1566));
var visitor_1 = tslib_1[__import1](require(1576));
var logger_1 = tslib_1[__import1](require(920));
var utils = tslib_1[__import](require(636));
/* jshint loopfunc:true */
var ExtendFinderVisitor = /** @class */ (function () { 
    function ExtendFinderVisitor() { 
        this[_visitor1] = new visitor_1[_default](this);
        this[_contexts] = [];
        this[_allExten] = [[]];
    }
    ExtendFinderVisitor[_prototyp][_run] = function (root) { 
        root = this[_visitor1][_visit](root);
        root[_allExten1] = this[_allExten][0];
        return root;
    };
    ExtendFinderVisitor[_prototyp][_visitDec] = function (declNode, visitArgs) { 
        visitArgs[_visitDee] = false;
    };
    ExtendFinderVisitor[_prototyp][_visitMix] = function (mixinDefinitionNode, visitArgs) { 
        visitArgs[_visitDee] = false;
    };
    ExtendFinderVisitor[_prototyp][_visitRul] = function (rulesetNode, visitArgs) { 
        if (rulesetNode[_root]) { 
            return;
        }
        var i;
        var j;
        var extend;
        var allSelectorsExtendList = [];
        var extendList;
        // get &:extend(.a); rules which apply to all selectors in this ruleset
        var rules = rulesetNode[_rules], ruleCnt = rules ? rules[_length] : 0;
        for (i = 0; i < ruleCnt; i++) { 
            if (rulesetNode[_rules][i] instanceof tree_1[_default][_Extend]) { 
                allSelectorsExtendList[_push](rules[i]);
                rulesetNode[_extendOn] = true;
            }
        }
        // now find every selector and apply the extends that apply to all extends
        // and the ones which apply to an individual extend
        var paths = rulesetNode[_paths];
        for (i = 0; i < paths[_length]; i++) { 
            var selectorPath = paths[i], selector = selectorPath[selectorPath[_length] - 1], selExtendList = selector[_extendLi];
            extendList = selExtendList ? utils[_copyArra](selExtendList) [_concat](allSelectorsExtendList)
                : allSelectorsExtendList;
            if (extendList) { 
                extendList = extendList[_map](function (allSelectorsExtend) { 
                    return allSelectorsExtend[_clone]();
                });
            }
            for (j = 0; j < extendList[_length]; j++) { 
                this[_foundExt] = true;
                extend = extendList[j];
                extend[_findSelf](selectorPath);
                extend[_ruleset] = rulesetNode;
                if (j === 0) { 
                    extend[_firstExt] = true;
                }
                this[_allExten][this[_allExten][_length] - 1] [_push](extend);
            }
        }
        this[_contexts][_push](rulesetNode[_selector1]);
    };
    ExtendFinderVisitor[_prototyp][_visitRul1] = function (rulesetNode) { 
        if (!rulesetNode[_root]) { 
            this[_contexts][_length] = this[_contexts][_length] - 1;
        }
    };
    ExtendFinderVisitor[_prototyp][_visitMed] = function (mediaNode, visitArgs) { 
        mediaNode[_allExten1] = [];
        this[_allExten][_push](mediaNode[_allExten1]);
    };
    ExtendFinderVisitor[_prototyp][_visitMed1] = function (mediaNode) { 
        this[_allExten][_length] = this[_allExten][_length] - 1;
    };
    ExtendFinderVisitor[_prototyp][_visitAtR] = function (atRuleNode, visitArgs) { 
        atRuleNode[_allExten1] = [];
        this[_allExten][_push](atRuleNode[_allExten1]);
    };
    ExtendFinderVisitor[_prototyp][_visitAtR3] = function (atRuleNode) { 
        this[_allExten][_length] = this[_allExten][_length] - 1;
    };
    return ExtendFinderVisitor;
}());
var ProcessExtendsVisitor = /** @class */ (function () { 
    function ProcessExtendsVisitor() { 
        this[_visitor1] = new visitor_1[_default](this);
    }
    ProcessExtendsVisitor[_prototyp][_run] = function (root) { 
        var extendFinder = new ExtendFinderVisitor();
        this[_extendIn] = {};
        extendFinder[_run](root);
        if (!extendFinder[_foundExt]) { 
            return root;
        }
        root[_allExten1] = root[_allExten1][_concat](this[_doExtend](root[_allExten1], root[_allExten1]));
        this[_allExten] = [root[_allExten1]];
        var newRoot = this[_visitor1][_visit](root);
        this[_checkExt](root[_allExten1]);
        return newRoot;
    };
    ProcessExtendsVisitor[_prototyp][_checkExt] = function (extendList) { 
        var indices = this[_extendIn];
        extendList[_filter](function (extend) { 
            return !extend[_hasFound] && extend[_parent_i][_length] == 1;
        }) [_forEach](function (extend) { 
            var selector = _unknown;
            try { 
                selector = extend[_selector][_toCSS]({});
            }
            catch (_) {}
            if (!indices[extend[_index] + _14 + selector]) { 
                indices[extend[_index] + _14 + selector] = true;
                logger_1[_default][_warn](_extend_ + selector + _has_no_);
            }
        });
    };
    ProcessExtendsVisitor[_prototyp][_doExtend] = function (extendsList, extendsListTarget, iterationCount) { 
        //
        // chaining is different from normal extension.. if we extend an extend then we are not just copying, altering
        // and pasting the selector we would do normally, but we are also adding an extend with the same target selector
        // this means this new extend can then go and alter other extends
        //
        // this method deals with all the chaining work - without it, extend is flat and doesn't work on other extend selectors
        // this is also the most expensive.. and a match on one selector can cause an extension of a selector we had already
        // processed if we look at each selector at a time, as is done in visitRuleset
        var extendIndex;
        var targetExtendIndex;
        var matches;
        var extendsToAdd = [];
        var newSelector;
        var extendVisitor = this;
        var selectorPath;
        var extend;
        var targetExtend;
        var newExtend;
        iterationCount = iterationCount || 0;
        // loop through comparing every extend with every target extend.
        // a target extend is the one on the ruleset we are looking at copy/edit/pasting in place
        // e.g.  .a:extend(.b) {}  and .b:extend(.c) {} then the first extend extends the second one
        // and the second is the target.
        // the separation into two lists allows us to process a subset of chains with a bigger set, as is the
        // case when processing media queries
        for (extendIndex = 0; extendIndex < extendsList[_length]; extendIndex++) { 
            for (targetExtendIndex = 0; targetExtendIndex < extendsListTarget[_length]; targetExtendIndex++) { 
                extend = extendsList[extendIndex];
                targetExtend = extendsListTarget[targetExtendIndex];
                // look for circular references
                if (extend[_parent_i][_indexOf](targetExtend[_object_i]) >= 0) { 
                    continue;
                }
                // find a match in the target extends self selector (the bit before :extend)
                selectorPath = [targetExtend[_selfSele][0]];
                matches = extendVisitor[_findMatc](extend, selectorPath);
                if (matches[_length]) { 
                    extend[_hasFound] = true;
                    // we found a match, so for each self selector..
                    extend[_selfSele][_forEach](function (selfSelector) { 
                        var info = targetExtend[_visibili1]();
                        // process the extend as usual
                        newSelector = extendVisitor[_extendSe](matches, selectorPath, selfSelector, extend[_isVisibl]());
                        // but now we create a new extend from it
                        newExtend = new (tree_1[_default][_Extend])(targetExtend[_selector], targetExtend[_option], 0, targetExtend[_fileInfo](), info);
                        newExtend[_selfSele] = newSelector;
                        // add the extend onto the list of extends for that selector
                        newSelector[newSelector[_length] - 1] [_extendLi] = [newExtend];
                        // record that we need to add it.
                        extendsToAdd[_push](newExtend);
                        newExtend[_ruleset] = targetExtend[_ruleset];
                        // remember its parents for circular references
                        newExtend[_parent_i] = newExtend[_parent_i][_concat](targetExtend[_parent_i], extend[_parent_i]);
                        // only process the selector once.. if we have :extend(.a,.b) then multiple
                        // extends will look at the same selector path, so when extending
                        // we know that any others will be duplicates in terms of what is added to the css
                        if (targetExtend[_firstExt]) { 
                            newExtend[_firstExt] = true;
                            targetExtend[_ruleset][_paths][_push](newSelector);
                        }
                    });
                }
            }
        }
        if (extendsToAdd[_length]) { 
            // try to detect circular references to stop a stack overflow.
            // may no longer be needed.
            this[_extendCh]++;
            if (iterationCount > 100) { 
                var selectorOne = _unable_;
                var selectorTwo = _unable_;
                try { 
                    selectorOne = extendsToAdd[0] [_selfSele][0] [_toCSS]();
                    selectorTwo = extendsToAdd[0] [_selector][_toCSS]();
                }
                catch (e) {}
                throw { [_message]: _extend_c + selectorOne + _extend_1 + selectorTwo + _23 };
            }
            // now process the new extends on the existing rules so that we can handle a extending b extending c extending
            // d extending e...
            return extendsToAdd[_concat](extendVisitor[_doExtend](extendsToAdd, extendsListTarget, iterationCount + 1));
        }
        else { 
            return extendsToAdd;
        }
    };
    ProcessExtendsVisitor[_prototyp][_visitDec] = function (ruleNode, visitArgs) { 
        visitArgs[_visitDee] = false;
    };
    ProcessExtendsVisitor[_prototyp][_visitMix] = function (mixinDefinitionNode, visitArgs) { 
        visitArgs[_visitDee] = false;
    };
    ProcessExtendsVisitor[_prototyp][_visitSel] = function (selectorNode, visitArgs) { 
        visitArgs[_visitDee] = false;
    };
    ProcessExtendsVisitor[_prototyp][_visitRul] = function (rulesetNode, visitArgs) { 
        if (rulesetNode[_root]) { 
            return;
        }
        var matches;
        var pathIndex;
        var extendIndex;
        var allExtends = this[_allExten][this[_allExten][_length] - 1];
        var selectorsToAdd = [];
        var extendVisitor = this;
        var selectorPath;
        // look at each selector path in the ruleset, find any extend matches and then copy, find and replace
        for (extendIndex = 0; extendIndex < allExtends[_length]; extendIndex++) { 
            for (pathIndex = 0; pathIndex < rulesetNode[_paths][_length]; pathIndex++) { 
                selectorPath = rulesetNode[_paths][pathIndex];
                // extending extends happens initially, before the main pass
                if (rulesetNode[_extendOn]) { 
                    continue;
                }
                var extendList = selectorPath[selectorPath[_length] - 1] [_extendLi];
                if (extendList && extendList[_length]) { 
                    continue;
                }
                matches = this[_findMatc](allExtends[extendIndex], selectorPath);
                if (matches[_length]) { 
                    allExtends[extendIndex] [_hasFound] = true;
                    allExtends[extendIndex] [_selfSele][_forEach](function (selfSelector) { 
                        var extendedSelectors;
                        extendedSelectors = extendVisitor[_extendSe](matches, selectorPath, selfSelector, allExtends[extendIndex] [_isVisibl]());
                        selectorsToAdd[_push](extendedSelectors);
                    });
                }
            }
        }
        rulesetNode[_paths] = rulesetNode[_paths][_concat](selectorsToAdd);
    };
    ProcessExtendsVisitor[_prototyp][_findMatc] = function (extend, haystackSelectorPath) { 
        //
        // look through the haystack selector path to try and find the needle - extend.selector
        // returns an array of selector matches that can then be replaced
        //
        var haystackSelectorIndex;
        var hackstackSelector;
        var hackstackElementIndex;
        var haystackElement;
        var targetCombinator;
        var i;
        var extendVisitor = this;
        var needleElements = extend[_selector][_elements];
        var potentialMatches = [];
        var potentialMatch;
        var matches = [];
        // loop through the haystack elements
        for (haystackSelectorIndex = 0; haystackSelectorIndex < haystackSelectorPath[_length]; haystackSelectorIndex++) { 
            hackstackSelector = haystackSelectorPath[haystackSelectorIndex];
            for (hackstackElementIndex = 0; hackstackElementIndex < hackstackSelector[_elements][_length]; hackstackElementIndex++) { 
                haystackElement = hackstackSelector[_elements][hackstackElementIndex];
                // if we allow elements before our match we can add a potential match every time. otherwise only at the first element.
                if (extend[_allowBef] || (haystackSelectorIndex === 0 && hackstackElementIndex === 0)) { 
                    potentialMatches[_push]({ [_pathInde]: haystackSelectorIndex, [_index]: hackstackElementIndex, [_matched]: 0,
                        [_initialC]: haystackElement[_combinat] });
                }
                for (i = 0; i < potentialMatches[_length]; i++) { 
                    potentialMatch = potentialMatches[i];
                    // selectors add " " onto the first element. When we use & it joins the selectors together, but if we don't
                    // then each selector in haystackSelectorPath has a space before it added in the toCSS phase. so we need to
                    // work out what the resulting combinator will be
                    targetCombinator = haystackElement[_combinat][_value];
                    if (targetCombinator === '' && hackstackElementIndex === 0) { 
                        targetCombinator = _14;
                    }
                    // if we don't match, null our match to indicate failure
                    if (!extendVisitor[_isElemen](needleElements[potentialMatch[_matched]] [_value], haystackElement[_value]) ||
                        (potentialMatch[_matched] > 0 && needleElements[potentialMatch[_matched]] [_combinat][_value] !== targetCombinator)) { 
                        potentialMatch = null;
                    }
                    else { 
                        potentialMatch[_matched]++;
                    }
                    // if we are still valid and have finished, test whether we have elements after and whether these are allowed
                    if (potentialMatch) { 
                        potentialMatch[_finished] = potentialMatch[_matched] === needleElements[_length];
                        if (potentialMatch[_finished] &&
                            (!extend[_allowAft] &&
                                (hackstackElementIndex + 1 < hackstackSelector[_elements][_length] || haystackSelectorIndex + 1 < haystackSelectorPath[_length]))) { 
                            potentialMatch = null;
                        }
                    }
                    // if null we remove, if not, we are still valid, so either push as a valid match or continue
                    if (potentialMatch) { 
                        if (potentialMatch[_finished]) { 
                            potentialMatch[_length] = needleElements[_length];
                            potentialMatch[_endPathI] = haystackSelectorIndex;
                            potentialMatch[_endPathE] = hackstackElementIndex + 1; // index after end of match
                            potentialMatches[_length] = 0; // we don't allow matches to overlap, so start matching again
                            matches[_push](potentialMatch);
                        }
                    }
                    else { 
                        potentialMatches[_splice](i, 1);
                        i--;
                    }
                }
            }
        }
        return matches;
    };
    ProcessExtendsVisitor[_prototyp][_isElemen] = function (elementValue1, elementValue2) { 
        if (typeof elementValue1 === _string || typeof elementValue2 === _string) { 
            return elementValue1 === elementValue2;
        }
        if (elementValue1 instanceof tree_1[_default][_Attribut]) { 
            if (elementValue1[_op] !== elementValue2[_op] || elementValue1[_key] !== elementValue2[_key]) { 
                return false;
            }
            if (!elementValue1[_value] || !elementValue2[_value]) { 
                if (elementValue1[_value] || elementValue2[_value]) { 
                    return false;
                }
                return true;
            }
            elementValue1 = elementValue1[_value][_value] || elementValue1[_value];
            elementValue2 = elementValue2[_value][_value] || elementValue2[_value];
            return elementValue1 === elementValue2;
        }
        elementValue1 = elementValue1[_value];
        elementValue2 = elementValue2[_value];
        if (elementValue1 instanceof tree_1[_default][_Selector]) { 
            if (!(elementValue2 instanceof tree_1[_default][_Selector]) || elementValue1[_elements][_length] !== elementValue2[_elements][_length]) { 
                return false;
            }
            for (var i = 0; i < elementValue1[_elements][_length]; i++) { 
                if (elementValue1[_elements][i] [_combinat][_value] !== elementValue2[_elements][i] [_combinat][_value]) { 
                    if (i !== 0 || (elementValue1[_elements][i] [_combinat][_value] || _14) !== (elementValue2[_elements][i] [_combinat][_value] || _14)) { 
                        return false;
                    }
                }
                if (!this[_isElemen](elementValue1[_elements][i] [_value], elementValue2[_elements][i] [_value])) { 
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    ProcessExtendsVisitor[_prototyp][_extendSe] = function (matches, selectorPath, replacementSelector, isVisible) { 
        // for a set of matches, replace each match with the replacement selector
        var currentSelectorPathIndex = 0, currentSelectorPathElementIndex = 0, path = [], matchIndex, selector, firstElement, match, newElements;
        for (matchIndex = 0; matchIndex < matches[_length]; matchIndex++) { 
            match = matches[matchIndex];
            selector = selectorPath[match[_pathInde]];
            firstElement = new tree_1[_default][_Element](match[_initialC], replacementSelector[_elements][0] [_value], replacementSelector[_elements][0] [_isVariab], replacementSelector[_elements][0] [_getIndex](), replacementSelector[_elements][0] [_fileInfo]());
            if (match[_pathInde] > currentSelectorPathIndex && currentSelectorPathElementIndex > 0) { 
                path[path[_length] - 1] [_elements] = path[path[_length] - 1]
                    [_elements][_concat](selectorPath[currentSelectorPathIndex] [_elements][_slice](currentSelectorPathElementIndex));
                currentSelectorPathElementIndex = 0;
                currentSelectorPathIndex++;
            }
            newElements = selector[_elements]
                [_slice](currentSelectorPathElementIndex, match[_index])
                [_concat]([firstElement])
                [_concat](replacementSelector[_elements][_slice](1));
            if (currentSelectorPathIndex === match[_pathInde] && matchIndex > 0) { 
                path[path[_length] - 1] [_elements] =
                    path[path[_length] - 1] [_elements][_concat](newElements);
            }
            else { 
                path = path[_concat](selectorPath[_slice](currentSelectorPathIndex, match[_pathInde]));
                path[_push](new tree_1[_default][_Selector](newElements));
            }
            currentSelectorPathIndex = match[_endPathI];
            currentSelectorPathElementIndex = match[_endPathE];
            if (currentSelectorPathElementIndex >= selectorPath[currentSelectorPathIndex] [_elements][_length]) { 
                currentSelectorPathElementIndex = 0;
                currentSelectorPathIndex++;
            }
        }
        if (currentSelectorPathIndex < selectorPath[_length] && currentSelectorPathElementIndex > 0) { 
            path[path[_length] - 1] [_elements] = path[path[_length] - 1]
                [_elements][_concat](selectorPath[currentSelectorPathIndex] [_elements][_slice](currentSelectorPathElementIndex));
            currentSelectorPathIndex++;
        }
        path = path[_concat](selectorPath[_slice](currentSelectorPathIndex, selectorPath[_length]));
        path = path[_map](function (currentValue) { 
            // we can re-use elements here, because the visibility property matters only for selectors
            var derived = currentValue[_createDe](currentValue[_elements]);
            if (isVisible) { 
                derived[_ensureVi]();
            }
            else { 
                derived[_ensureIn]();
            }
            return derived;
        });
        return path;
    };
    ProcessExtendsVisitor[_prototyp][_visitMed] = function (mediaNode, visitArgs) { 
        var newAllExtends = mediaNode[_allExten1][_concat](this[_allExten][this[_allExten][_length] - 1]);
        newAllExtends = newAllExtends[_concat](this[_doExtend](newAllExtends, mediaNode[_allExten1]));
        this[_allExten][_push](newAllExtends);
    };
    ProcessExtendsVisitor[_prototyp][_visitMed1] = function (mediaNode) { 
        var lastIndex = this[_allExten][_length] - 1;
        this[_allExten][_length] = lastIndex;
    };
    ProcessExtendsVisitor[_prototyp][_visitAtR] = function (atRuleNode, visitArgs) { 
        var newAllExtends = atRuleNode[_allExten1][_concat](this[_allExten][this[_allExten][_length] - 1]);
        newAllExtends = newAllExtends[_concat](this[_doExtend](newAllExtends, atRuleNode[_allExten1]));
        this[_allExten][_push](newAllExtends);
    };
    ProcessExtendsVisitor[_prototyp][_visitAtR3] = function (atRuleNode) { 
        var lastIndex = this[_allExten][_length] - 1;
        this[_allExten][_length] = lastIndex;
    };
    return ProcessExtendsVisitor;
}());
exports[_default] = ProcessExtendsVisitor;
//# sourceMappingURL=extend-visitor.js.map
return exports
}],
/* 1650 string _Visitor */ "Visitor",
/* 1651 string _ImportVi */ "ImportVisitor",
/* 1652 string _MarkVisi */ "MarkVisibleSelectorsVisitor",
/* 1653 string _ExtendVi */ "ExtendVisitor",
/* 1654 string _JoinSele */ "JoinSelectorVisitor",
/* 1655 less$visitors$index.js */ [10,11,1,16,17,18,581,96,1650,1651,1652,1653,1654,1294,function(Object,exports,require,_definePr,__esModu,_value,__import1,_default,_Visitor,_ImportVi,_MarkVisi,_ExtendVi,_JoinSele,_ToCSSVis){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var visitor_1 = tslib_1[__import1](require(1576));
var import_visitor_1 = tslib_1[__import1](require(1623));
var set_tree_visibility_visitor_1 = tslib_1[__import1](require(132));
var extend_visitor_1 = tslib_1[__import1](require(1649));
var join_selector_visitor_1 = tslib_1[__import1](require(1608));
var to_css_visitor_1 = tslib_1[__import1](require(1605));
exports[_default] = { 
    [_Visitor]: visitor_1[_default],
    [_ImportVi]: import_visitor_1[_default],
    [_MarkVisi]: set_tree_visibility_visitor_1[_default],
    [_ExtendVi]: extend_visitor_1[_default],
    [_JoinSele]: join_selector_visitor_1[_default],
    [_ToCSSVis]: to_css_visitor_1[_default]
};
//# sourceMappingURL=index.js.map
return exports
}],
/* 1656 less$visitors */ [1,function(require){
return require(1655)
}],
/* 1657 string _isPreEva */ "isPreEvalVisitor",
/* 1658 string _isPreVis */ "isPreVisitor",
/* 1659 less$transform-tree.js */ [10,11,1,84,15,16,17,18,581,1275,96,1020,517,51,28,503,1039,1321,1222,1221,1021,1256,1654,1652,1653,1294,115,953,723,724,142,1657,3,93,125,1658,1263,158,2,function(Object,exports,require,Array,Boolean,_definePr,__esModu,_value,__import1,_variable3,_default,_Eval,_object,_isArray,_keys,_map,_Value,_Expressi1,_Declarat,_43,_frames,_Ruleset,_JoinSele,_MarkVisi,_ExtendVi,_ToCSSVis,_compress,_pluginMa,_visitor,_first,_get,_isPreEva,_indexOf,_push,_run,_isPreVis,_unshift,_eval,_length){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var contexts_1 = tslib_1[__import1](require(1037));
var visitors_1 = tslib_1[__import1](require(1656));
var tree_1 = tslib_1[__import1](require(1566));
function default_1(root, options) { 
    options = options || {};
    var evaldRoot;
    var variables = options[_variable3];
    var evalEnv = new contexts_1[_default][_Eval](options);
    //
    // Allows setting variables with a hash, so:
    //
    //   `{ color: new tree.Color('#f01') }` will become:
    //
    //   new tree.Declaration('@color',
    //     new tree.Value([
    //       new tree.Expression([
    //         new tree.Color('#f01')
    //       ])
    //     ])
    //   )
    //
    if (typeof variables === _object && !Array[_isArray](variables)) { 
        variables = Object[_keys](variables) [_map](function (k) { 
            var value = variables[k];
            if (!(value instanceof tree_1[_default][_Value])) { 
                if (!(value instanceof tree_1[_default][_Expressi1])) { 
                    value = new tree_1[_default][_Expressi1]([value]);
                }
                value = new tree_1[_default][_Value]([value]);
            }
            return new tree_1[_default][_Declarat](_43 + k, value, false, null, 0);
        });
        evalEnv[_frames] = [new tree_1[_default][_Ruleset](null, variables)];
    }
    var visitors = [
        new visitors_1[_default][_JoinSele](),
        new visitors_1[_default][_MarkVisi](true),
        new visitors_1[_default][_ExtendVi](),
        new visitors_1[_default][_ToCSSVis]({ [_compress]: Boolean(options[_compress]) })
    ];
    var preEvalVisitors = [];
    var v;
    var visitorIterator;
    /**
     * first() / get() allows visitors to be added while visiting
     *
     * @todo Add scoping for visitors just like functions for @plugin; right now they're global
     */
    if (options[_pluginMa]) { 
        visitorIterator = options[_pluginMa][_visitor]();
        for (var i = 0; i < 2; i++) { 
            visitorIterator[_first]();
            while ((v = visitorIterator[_get]())) { 
                if (v[_isPreEva]) { 
                    if (i === 0 || preEvalVisitors[_indexOf](v) === -1) { 
                        preEvalVisitors[_push](v);
                        v[_run](root);
                    }
                }
                else { 
                    if (i === 0 || visitors[_indexOf](v) === -1) { 
                        if (v[_isPreVis]) { 
                            visitors[_unshift](v);
                        }
                        else { 
                            visitors[_push](v);
                        }
                    }
                }
            }
        }
    }
    evaldRoot = root[_eval](evalEnv);
    for (var i = 0; i < visitors[_length]; i++) { 
        visitors[i] [_run](evaldRoot);
    }
    // Run any remaining visitors added after eval pass
    if (options[_pluginMa]) { 
        visitorIterator[_first]();
        while ((v = visitorIterator[_get]())) { 
            if (visitors[_indexOf](v) === -1 && preEvalVisitors[_indexOf](v) === -1) { 
                v[_run](evaldRoot);
            }
        }
    }
    return evaldRoot;
}
exports[_default] = default_1;
;
//# sourceMappingURL=transform-tree.js.map
return exports
}],
/* 1660 string _expected */ /* text */ "expected '",
/* 1661 string _got_ */ /* text */ "' got '",
/* 1662 string _unexpect */ /* text */ "unexpected token",
/* 1663 string _parserIn */ "parserInput",
/* 1664 string _disableP */ "disablePluginRule",
/* 1665 string _plugin */ "plugin",
/* 1666 regexp _plugin_ */ /^@plugin?\s+/,
/* 1667 string _plugin_1 */ /* text */ "@plugin statements are not allowed when disablePluginRule is set to true",
/* 1668 string _globalVa */ "globalVars",
/* 1669 string _serializ */ "serializeVars",
/* 1670 string _modifyVa */ "modifyVars",
/* 1671 string _process */ "process",
/* 1672 string _banner */ "banner",
/* 1673 regexp _r_n_g */ /\r\n?/g,
/* 1674 regexp _uFEFF_ */ /^\uFEFF/,
/* 1675 string _parsers */ "parsers",
/* 1676 string _primary */ "primary",
/* 1677 string _Unrecogn */ /* text */ "Unrecognised input",
/* 1678 string _Possibl */ /* text */ ". Possibly missing opening '{'",
/* 1679 string _Possibl1 */ /* text */ ". Possibly missing opening '('",
/* 1680 string _Possibl2 */ /* text */ ". Possibly missing something",
/* 1681 string _comment */ "comment",
/* 1682 string _extendRu */ "extendRule",
/* 1683 string _definiti */ "definition",
/* 1684 string _declarat */ "declaration",
/* 1685 string _variable6 */ "variableCall",
/* 1686 string _entities */ "entities",
/* 1687 string _atrule */ "atrule",
/* 1688 string _mixinLoo */ "mixinLookup",
/* 1689 string _quoted */ "quoted",
/* 1690 string _keyword */ "keyword",
/* 1691 regexp _w_A_Fa_ */ /^\[?(?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+\]?/,
/* 1692 regexp _url_i */ /^url\(/i,
/* 1693 regexp _w_progi */ /^([\w-]+|%|~|progid:[\w\.]+)\(/,
/* 1694 string _customFu */ "customFuncCall",
/* 1695 string _stop */ "stop",
/* 1696 string _Could_no3 */ /* text */ "Could not parse call arguments or missing ')'",
/* 1697 string _ieAlpha */ "ieAlpha",
/* 1698 string _expected1 */ /* text */ "expected condition",
/* 1699 string _detached */ "detachedRuleset",
/* 1700 string _assignme */ "assignment",
/* 1701 string _literal */ "literal",
/* 1702 string _dimensio */ "dimension",
/* 1703 string _unicodeD */ "unicodeDescriptor",
/* 1704 regexp _w_s_i */ /^\w+(?=\s?=)/i,
/* 1705 string _entity */ "entity",
/* 1706 regexp _60 */ /^(?:(?:\\[\(\)'"])|[^\(\)'"])+/,
/* 1707 regexp _w_ */ /^@@?[\w-]+/,
/* 1708 regexp _s_ */ /^\s/,
/* 1709 string _variable7 */ "variableCurly",
/* 1710 regexp _w_1 */ /^@\{([\w-]+)\}/,
/* 1711 regexp _$_w_ */ /^\$[\w-]+/,
/* 1712 string _property3 */ "propertyCurly",
/* 1713 regexp _$_w_1 */ /^\$\{([\w-]+)\}/,
/* 1714 regexp _A_Fa_f1 */ /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4})([\w.#\[])?/,
/* 1715 string _colorKey */ "colorKeyword",
/* 1716 regexp __A_Za_z */ /^[_A-Za-z-][_A-Za-z0-9-]+/,
/* 1717 regexp _d_d_a_z */ /^([+-]?\d*\.?\d+)(%|[a-z_]+)?/i,
/* 1718 regexp _U_0_9a_ */ /^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/,
/* 1719 string _javascri1 */ "javascript",
/* 1720 regexp _61 */ /^[^`]*`/,
/* 1721 string _invalid_ */ /* text */ "invalid javascript definition",
/* 1722 regexp _w_s_ */ /^(@[\w-]+)\s*:/,
/* 1723 regexp _w_s_1 */ /^(@[\w-]+)(\(\s*\))?/,
/* 1724 string _ruleLook */ "ruleLookups",
/* 1725 string _62 */ "()",
/* 1726 string _Missing_ */ /* text */ "Missing '[...]' lookup in variable call",
/* 1727 string _extend */ "extend",
/* 1728 string _extend_2 */ "&:extend(",
/* 1729 regexp _all_s_ */ /^(all)(?=\s*(\)|,))/,
/* 1730 string _element */ "element",
/* 1731 string _Missing_1 */ /* text */ "Missing target selector for :extend().",
/* 1732 regexp _63 */ /^\)/,
/* 1733 regexp _64 */ /^;/,
/* 1734 regexp _w_A_Fa_1 */ /^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/,
/* 1735 string _65 */ "...",
/* 1736 string _Cannot_m */ /* text */ "Cannot mix ; and , as delimiter types",
/* 1737 string _could_no */ /* text */ "could not understand value for named argument",
/* 1738 regexp _66 */ /^[^{]*\}/,
/* 1739 regexp _w_A_Fa_2 */ /^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/,
/* 1740 string _Missing_2 */ /* text */ "Missing closing ')'",
/* 1741 string _when */ "when",
/* 1742 string _conditio1 */ "conditions",
/* 1743 string _block */ "block",
/* 1744 string _lookupVa */ "lookupValue",
/* 1745 regexp _$_0_2__ */ /^(?:[@$]{0,2})[_a-zA-Z0-9-]*/,
/* 1746 regexp _opacity */ /^opacity=/i,
/* 1747 regexp _d_ */ /^\d+/,
/* 1748 string _Could_no4 */ /* text */ "Could not parse alpha",
/* 1749 string _67 */ "@{",
/* 1750 string _alpha_op */ "alpha(opacity=",
/* 1751 regexp _d_d_d_1 */ /^(?:\d+\.\d+|\d+)%/,
/* 1752 regexp _w_x00_x */ /^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/,
/* 1753 string _attribut */ "attribute",
/* 1754 regexp _68 */ /^\([^&()@]+\)/,
/* 1755 regexp _69 */ /^[\.#:](?=@)/,
/* 1756 regexp _a_z_i3 */ /^\/[a-z]+\//i,
/* 1757 string _70 */ "^",
/* 1758 string _71 */ "^^",
/* 1759 string _CSS_guar */ /* text */ "CSS guard can only be used at the end of selector",
/* 1760 string _Extend_c */ /* text */ "Extend can only be used at the end of selector",
/* 1761 string _Extend_m */ /* text */ "Extend must be used to extend a selector, it cannot be used on its own",
/* 1762 string _Guards_a */ /* text */ "Guards are only currently allowed on a single selector.",
/* 1763 regexp __A_Za_z1 */ /^(?:[_A-Za-z0-9-\*]*\|)?(?:[_A-Za-z0-9-]|\\.)+/,
/* 1764 regexp _$_1 */ /^[|~*$^]?=/,
/* 1765 regexp _0_9_ */ /^[0-9]+%/,
/* 1766 regexp _w_2 */ /^[\w-]+/,
/* 1767 regexp _iIsS_ */ /^[iIsS]/,
/* 1768 string _blockRul */ "blockRuleset",
/* 1769 regexp _72 */ /^[.#]\(/,
/* 1770 string _ruleProp */ "ruleProperty",
/* 1771 string _73 */ "--",
/* 1772 string _permissi */ "permissiveValue",
/* 1773 string _anonymou1 */ "anonymousValue",
/* 1774 regexp _$_2 */ /^([^.#@\$+\/'"*`(;{}-]*);/,
/* 1775 string _Expected */ /* text */ "Expected '",
/* 1776 regexp _w_g1 */ /@([\w-]+)/g,
/* 1777 regexp _$_w_g1 */ /\$([\w-]+)/g,
/* 1778 string _import */ "import",
/* 1779 regexp _import_1 */ /^@import\s+/,
/* 1780 string _importOp */ "importOptions",
/* 1781 string _mediaFea */ "mediaFeatures",
/* 1782 string _missing_8 */ /* text */ "missing semi-colon or unrecognised media features on import",
/* 1783 string _malforme */ /* text */ "malformed import statement",
/* 1784 string _importOp1 */ "importOption",
/* 1785 string _once */ "once",
/* 1786 regexp _less_cs */ /^(less|css|multiple|once|inline|reference|optional)/,
/* 1787 string _mediaFea1 */ "mediaFeature",
/* 1788 string _badly_fo */ /* text */ "badly formed media feature definition",
/* 1789 string _media */ "media",
/* 1790 string _media1 */ "@media",
/* 1791 string _media_de */ /* text */ "media definitions require block statements after any features",
/* 1792 regexp _plugin_2 */ /^@plugin\s+/,
/* 1793 string _pluginAr */ "pluginArgs",
/* 1794 string _missing_9 */ /* text */ "missing semi-colon on @plugin",
/* 1795 string _malforme1 */ /* text */ "malformed @plugin statement",
/* 1796 regexp _s_s_ */ /^\s*([^\);]+)\)\s*/,
/* 1797 regexp _a_z_ */ /^@[a-z-]+/,
/* 1798 string _namespa */ "@namespace",
/* 1799 string _keyfram */ "@keyframes",
/* 1800 string _counter */ "@counter-style",
/* 1801 string _documen */ "@document",
/* 1802 string _support */ "@supports",
/* 1803 string _expected2 */ /* text */ "expected ",
/* 1804 string _identif */ /* text */ " identifier",
/* 1805 string _express */ /* text */ " expression",
/* 1806 regexp _74 */ /^[{;]/,
/* 1807 string _rule_is */ /* text */ " rule is missing block or ending semi-colon",
/* 1808 string _at_rule_ */ /* text */ "at-rule options not recognised",
/* 1809 regexp _importa1 */ /^! *important/,
/* 1810 string _sub */ "sub",
/* 1811 string _addition */ "addition",
/* 1812 string _Expected1 */ /* text */ "Expected ')'",
/* 1813 string _multipli */ "multiplication",
/* 1814 string _operand */ "operand",
/* 1815 regexp _75 */ /^\/[*\/]/,
/* 1816 regexp _s_1 */ /^[-+]\s+/,
/* 1817 regexp _s_not_s */ /^,\s*(not\s*)?\(/,
/* 1818 string _conditio2 */ "conditionAnd",
/* 1819 string _negatedC */ "negatedCondition",
/* 1820 string _parenthe */ "parenthesisCondition",
/* 1821 string _atomicCo */ "atomicCondition",
/* 1822 string _not */ "not",
/* 1823 string _expected3 */ /* text */ "expected ')' got '",
/* 1824 string _76 */ "=>",
/* 1825 string _expected4 */ /* text */ "expected expression",
/* 1826 regexp _$_3 */ /^-[@\$\(]/,
/* 1827 regexp _77 */ /^\/[\/*]/,
/* 1828 regexp __a_zA_Z */ /^(\*?-?[_a-zA-Z0-9-]+)\s*:/,
/* 1829 regexp __a_zA_Z1 */ /^([_a-zA-Z0-9-]+)\s*:/,
/* 1830 regexp _78 */ /^(\*?)/,
/* 1831 regexp _w_$_w_ */ /^((?:[\w-]+)|(?:[@\$]\{[\w-]+\}))/,
/* 1832 regexp ___s_ */ /^((?:\+_|\+)?)\s*:/,
/* 1833 less$parser$parser.js */ [10,11,1,13,123,15,84,178,16,17,18,581,580,96,146,1161,663,167,924,922,21,1173,4,1660,1661,1184,999,1662,1174,100,619,1186,623,102,1188,150,151,93,1189,1190,1663,85,143,1243,696,1664,1665,1666,1667,1668,1669,621,1670,953,720,2,1671,964,1672,677,108,1673,1674,678,1011,1014,1560,19,1256,1675,1676,139,1260,1261,711,599,1192,1677,1194,1181,1678,1046,1679,1193,1680,1191,544,1013,1651,125,1370,1681,1166,1182,1682,8,1683,1684,1079,1685,1686,1687,1225,1164,549,1101,1163,1099,1688,1689,1167,1475,1170,1176,1171,168,620,934,1690,1072,1691,1111,1126,1071,1692,1693,1694,1695,1368,1696,1388,1110,1697,1158,1159,596,1235,1698,1699,1700,1537,1040,1039,1701,1702,1521,1703,1704,1095,1705,1136,740,1162,1175,1045,1220,1279,1706,1561,1392,1293,169,1221,1707,1069,1133,1185,586,1708,1709,1710,1277,1711,1712,1713,1050,1714,1715,1716,1187,1717,1207,1718,1066,1719,186,1720,1538,1721,1722,1723,1724,1725,1726,1269,1408,1727,1728,1641,1729,1730,1731,1315,1240,1732,1733,980,1237,91,1218,1734,1202,1097,1353,1735,1323,942,1736,1737,48,1369,1738,1739,1740,1741,1742,1743,1562,1744,1745,1134,1746,1747,1748,1749,22,1750,1200,1751,1752,162,1049,1753,1754,1755,1244,1068,111,1756,1106,160,1104,1757,1758,1172,933,1759,1760,1180,1761,1251,1762,1763,1764,1765,1766,1767,1132,1768,1769,1080,114,1008,99,1770,540,1771,1772,1773,1222,1774,105,1321,1179,1775,51,1085,1401,1776,1403,1777,1778,1779,1780,1781,1782,1271,1783,1784,883,698,1785,1616,1786,1787,1788,1789,1790,1791,1380,1792,1793,1414,1794,1795,1796,1797,161,3,1327,1798,1799,1800,1801,1802,1803,1804,1805,1806,1807,1326,1808,932,1809,1810,1811,633,1812,1813,1814,1815,1034,1322,1304,1816,1817,1089,1091,1818,1819,1820,1821,1090,1822,1088,1823,948,1096,1092,1094,1824,1093,1825,1075,1826,1307,1827,1828,1829,1830,1831,1832,46,1223,function(Object,exports,require,Function,undefined,Boolean,Array,String,_definePr,__esModu,_value,__import1,__import,_default,_index,_i1,_filename,_type,_Syntax,_message,_call,_$re,_string,_expected,_got_,_currentC,_19,_unexpect,_$char,_lineNumb,_getLocat,_getInput1,_line,_fileName,_start,_index1,_fileInf,_push,_end,_isFinish,_parserIn,_imports,_fileInfo,_parseNod,_parse,_disableP,_plugin,_plugin_,_plugin_1,_globalVa,_serializ,_10,_modifyVa,_pluginMa,_getPrePr,_length,_process,_context,_banner,_contents2,_replace,_r_n_g,_uFEFF_,_contents3,_chunkInp,_Parse,_Node,_prototyp,_Ruleset,_parsers,_primary,_rootNode,_root,_firstRoo,_function2,_inherit,_furthest1,_Unrecogn,_furthest3,_41,_Possibl,_23,_Possibl1,_furthest2,_Possibl2,_furthest,_error,_processI,_ImportVi,_run,_mixin,_comment,_finished,_peek,_extendRu,_concat,_definiti,_declarat,_ruleset,_variable6,_entities,_atrule,_45,_commentS,_shift,_Comment,_text,_isLineCo,_mixinLoo,_quoted,_save,_55,_restore,_$quoted,_forget,_Quoted,_charAt,_substr,_keyword,_27,_w_A_Fa_,_Color,_fromKeyw,_Keyword,_url_i,_w_progi,_customFu,_stop,_argument2,_Could_no3,_Call,_alpha,_ieAlpha,_boolean,_if,_toLowerC,_conditio,_expected1,_detached,_assignme,_expressi,_22,_Value,_literal,_dimensio,_color,_unicodeD,_w_s_i,_31,_entity,_Assignme,_url,_autoComm,_$str,_url_,_variable2,_property1,_60,_URL,_Variable1,_Property,_Anonymou,_43,_w_,_26,_35,_prevChar,_match,_s_,_variable7,_w_1,_$,_$_w_,_property3,_$_w_1,_25,_A_Fa_f1,_colorKey,__A_Za_z,_peekNotN,_d_d_a_z,_Dimensio1,_U_0_9a_,_UnicodeD,_javascri1,_9,_61,_JavaScri2,_invalid_,_w_s_,_w_s_1,_ruleLook,_62,_Missing_,_Variable,_Namespac,_extend,_extend_2,_extend_1,_all_s_,_element,_Missing_1,_Extend,_Selector,_63,_64,_16,_elements,_args,_importan1,_w_A_Fa_1,_Element,_33,_variadic,_65,_throwAwa,_15,_Cannot_m,_could_no,_name,_expand,_66,_w_A_Fa_2,_Missing_2,_when,_conditio1,_block,_Definiti,_lookupVa,_$_0_2__,_36,_opacity,_d_,_Could_no4,_67,_slice,_alpha_op,_combinat,_d_d_d_1,_w_x00_x,_8,_24,_attribut,_68,_69,_selector,_Paren,_4,_a_z_i3,_Combinat,_6,_34,_70,_71,_isWhites,_14,_CSS_guar,_Extend_c,_40,_Extend_m,_selector1,_Guards_a,__A_Za_z1,_$_1,_0_9_,_w_2,_iIsS_,_Attribut,_blockRul,_72,_Detached,_dumpLine,_strictIm,_debugInf,_ruleProp,_pop,_73,_permissi,_anonymou1,_Declarat,_$_2,_test,_Expressi1,_$parseUn,_Expected,_isArray,_trim,_variable5,_w_g1,_propRege,_$_w_g1,_import,_import_1,_importOp,_mediaFea,_missing_8,_Import,_malforme,_importOp1,_css1,_less,_once,_multiple,_less_cs,_mediaFea1,_badly_fo,_media,_media1,_media_de,_Media,_plugin_2,_pluginAr,_isPlugin,_missing_9,_malforme1,_s_s_,_a_z_,_7,_indexOf,_charset,_namespa,_keyfram,_counter,_documen,_support,_expected2,_identif,_express,_74,_rule_is,_AtRule,_at_rule_,_13,_importa1,_sub,_addition,_parens,_Expected1,_multipli,_operand,_75,_21,_parensIn,_Operatio,_s_1,_s_not_s,_Conditio,_or,_conditio2,_negatedC,_parenthe,_atomicCo,_and,_not,_negate,_expected3,_bind,_32,_28,_30,_76,_29,_expected4,_true,_$_3,_Negative,_77,__a_zA_Z,__a_zA_Z1,_78,_w_$_w_,___s_,_hasOwnPr,_44){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var less_error_1 = tslib_1[__import1](require(945));
var tree_1 = tslib_1[__import1](require(1566));
var visitors_1 = tslib_1[__import1](require(1656));
var parser_input_1 = tslib_1[__import1](require(1195));
var utils = tslib_1[__import](require(636));
var function_registry_1 = tslib_1[__import1](require(600));
//
// less.js - parser
//
//    A relatively straight-forward predictive parser.
//    There is no tokenization/lexing stage, the input is parsed
//    in one sweep.
//
//    To make the parser fast enough to run in the browser, several
//    optimization had to be made:
//
//    - Matching and slicing on a huge input is often cause of slowdowns.
//      The solution is to chunkify the input into smaller strings.
//      The chunks are stored in the `chunks` var,
//      `j` holds the current chunk index, and `currentPos` holds
//      the index of the current chunk in relation to `input`.
//      This gives us an almost 4x speed-up.
//
//    - In many cases, we don't need to match individual tokens;
//      for example, if a value doesn't hold any variables, operations
//      or dynamic references, the parser can effectively 'skip' it,
//      treating it as a literal.
//      An example would be '1px solid #000' - which evaluates to itself,
//      we don't need to know what the individual components are.
//      The drawback, of course is that you don't get the benefits of
//      syntax-checking on the CSS. This gives us a 50% speed-up in the parser,
//      and a smaller speed-up in the code-gen.
//
//
//    Token matching is done with the `$` function, which either takes
//    a terminal string or regexp, or a non-terminal function to call.
//    It also takes care of moving all the indices forwards.
//
var Parser = function Parser(context, imports, fileInfo) { 
    var parsers;
    var parserInput = parser_input_1[_default]();
    function error(msg, type) { 
        throw new less_error_1[_default]({ 
            [_index]: parserInput[_i1],
            [_filename]: fileInfo[_filename],
            [_type]: type || _Syntax,
            [_message]: msg
        }, imports);
    }
    function expect(arg, msg) { 
        // some older browsers return typeof 'function' for RegExp
        var result = (arg instanceof Function) ? arg[_call](parsers) : parserInput[_$re](arg);
        if (result) { 
            return result;
        }
        error(msg || (typeof arg === _string
            ? _expected + arg + _got_ + parserInput[_currentC]() + _19
            : _unexpect));
    }
    // Specialization of expect()
    function expectChar(arg, msg) { 
        if (parserInput[_$char](arg)) { 
            return arg;
        }
        error(msg || _expected + arg + _got_ + parserInput[_currentC]() + _19);
    }
    function getDebugInfo(index) { 
        var filename = fileInfo[_filename];
        return { 
            [_lineNumb]: utils[_getLocat](index, parserInput[_getInput1]()) [_line] + 1,
            [_fileName]: filename
        };
    }
    /**
     *  Used after initial parsing to create nodes on the fly
     *
     *  @param {String} str          - string to parse
     *  @param {Array}  parseList    - array of parsers to run input through e.g. ["value", "important"]
     *  @param {Number} currentIndex - start number to begin indexing
     *  @param {Object} fileInfo     - fileInfo to attach to created nodes
     */
    function parseNode(str, parseList, currentIndex, fileInfo, callback) { 
        var result;
        var returnNodes = [];
        var parser = parserInput;
        try { 
            parser[_start](str, false, function fail(msg, index) { 
                callback({ 
                    [_message]: msg,
                    [_index]: index + currentIndex
                });
            });
            for (var x = 0, p = void 0, i = void 0; (p = parseList[x]); x++) { 
                i = parser[_i1];
                result = parsers[p]();
                if (result) { 
                    try { 
                        result[_index1] = i + currentIndex;
                        result[_fileInf] = fileInfo;
                    }
                    catch (e) {}
                    returnNodes[_push](result);
                }
                else { 
                    returnNodes[_push](null);
                }
            }
            var endInfo = parser[_end]();
            if (endInfo[_isFinish]) { 
                callback(null, returnNodes);
            }
            else { 
                callback(true, null);
            }
        }
        catch (e) { 
            throw new less_error_1[_default]({ 
                [_index]: e[_index] + currentIndex,
                [_message]: e[_message]
            }, imports, fileInfo[_filename]);
        }
    }
    //
    // The Parser
    //
    return { 
        [_parserIn]: parserInput,
        [_imports]: imports,
        [_fileInfo]: fileInfo,
        [_parseNod]: parseNode,
        //
        // Parse an input string into an abstract syntax tree,
        // @param str A string containing 'less' markup
        // @param callback call `callback` when done.
        // @param [additionalData] An optional map which can contains vars - a map (key, value) of variables to apply
        //
        [_parse]: function (str, callback, additionalData) { 
            var root;
            var err = null;
            var globalVars;
            var modifyVars;
            var ignored;
            var preText = '';
            // Optionally disable @plugin parsing
            if (additionalData && additionalData[_disableP]) { 
                parsers[_plugin] = function () { 
                    var dir = parserInput[_$re](_plugin_);
                    if (dir) { 
                        error(_plugin_1);
                    }
                };
            }
            ;
            globalVars = (additionalData && additionalData[_globalVa]) ? Parser[_serializ](additionalData[_globalVa]) + _10 : '';
            modifyVars = (additionalData && additionalData[_modifyVa]) ? _10 + Parser[_serializ](additionalData[_modifyVa]) : '';
            if (context[_pluginMa]) { 
                var preProcessors = context[_pluginMa][_getPrePr]();
                for (var i = 0; i < preProcessors[_length]; i++) { 
                    str = preProcessors[i] [_process](str, { [_context]: context, [_imports]: imports, [_fileInfo]: fileInfo });
                }
            }
            if (globalVars || (additionalData && additionalData[_banner])) { 
                preText = ((additionalData && additionalData[_banner]) ? additionalData[_banner] : '') + globalVars;
                ignored = imports[_contents2];
                ignored[fileInfo[_filename]] = ignored[fileInfo[_filename]] || 0;
                ignored[fileInfo[_filename]] += preText[_length];
            }
            str = str[_replace](_r_n_g, _10);
            // Remove potential UTF Byte Order Mark
            str = preText + str[_replace](_uFEFF_, '') + modifyVars;
            imports[_contents3][fileInfo[_filename]] = str;
            // Start with the primary rule.
            // The whole syntax tree is held under a Ruleset node,
            // with the `root` property set to true, so no `{}` are
            // output. The callback is called when the input is parsed.
            try { 
                parserInput[_start](str, context[_chunkInp], function fail(msg, index) { 
                    throw new less_error_1[_default]({ 
                        [_index]: index,
                        [_type]: _Parse,
                        [_message]: msg,
                        [_filename]: fileInfo[_filename]
                    }, imports);
                });
                tree_1[_default][_Node][_prototyp][_parse] = this;
                root = new tree_1[_default][_Ruleset](null, this[_parsers][_primary]());
                tree_1[_default][_Node][_prototyp][_rootNode] = root;
                root[_root] = true;
                root[_firstRoo] = true;
                root[_function2] = function_registry_1[_default][_inherit]();
            }
            catch (e) { 
                return callback(new less_error_1[_default](e, imports, fileInfo[_filename]));
            }
            // If `i` is smaller than the `input.length - 1`,
            // it means the parser wasn't able to parse the whole
            // string, so we've got a parsing error.
            //
            // We try to extract a \n delimited string,
            // showing the line where the parse error occurred.
            // We split it up into two parts (the part which parsed,
            // and the part which didn't), so we can color them differently.
            var endInfo = parserInput[_end]();
            if (!endInfo[_isFinish]) { 
                var message = endInfo[_furthest1];
                if (!message) { 
                    message = _Unrecogn;
                    if (endInfo[_furthest3] === _41) { 
                        message += _Possibl;
                    }
                    else if (endInfo[_furthest3] === _23) { 
                        message += _Possibl1;
                    }
                    else if (endInfo[_furthest2]) { 
                        message += _Possibl2;
                    }
                }
                err = new less_error_1[_default]({ 
                    [_type]: _Parse,
                    [_message]: message,
                    [_index]: endInfo[_furthest],
                    [_filename]: fileInfo[_filename]
                }, imports);
            }
            var finish = function (e) { 
                e = err || e || imports[_error];
                if (e) { 
                    if (!(e instanceof less_error_1[_default])) { 
                        e = new less_error_1[_default](e, imports, fileInfo[_filename]);
                    }
                    return callback(e);
                }
                else { 
                    return callback(null, root);
                }
            };
            if (context[_processI] !== false) { 
                new visitors_1[_default][_ImportVi](imports, finish)
                    [_run](root);
            }
            else { 
                return finish();
            }
        },
        //
        // Here in, the parsing rules/functions
        //
        // The basic structure of the syntax tree generated is as follows:
        //
        //   Ruleset ->  Declaration -> Value -> Expression -> Entity
        //
        // Here's some Less code:
        //
        //    .class {
        //      color: #fff;
        //      border: 1px solid #000;
        //      width: @w + 4px;
        //      > .child {...}
        //    }
        //
        // And here's what the parse tree might look like:
        //
        //     Ruleset (Selector '.class', [
        //         Declaration ("color",  Value ([Expression [Color #fff]]))
        //         Declaration ("border", Value ([Expression [Dimension 1px][Keyword "solid"][Color #000]]))
        //         Declaration ("width",  Value ([Expression [Operation " + " [Variable "@w"][Dimension 4px]]]))
        //         Ruleset (Selector [Element '>', '.child'], [...])
        //     ])
        //
        //  In general, most rules will try to parse a token with the `$re()` function, and if the return
        //  value is truly, will return a new node, of the relevant type. Sometimes, we need to check
        //  first, before parsing, that's when we use `peek()`.
        //
        [_parsers]: parsers = { 
            //
            // The `primary` rule is the *entry* and *exit* point of the parser.
            // The rules here can appear at any level of the parse tree.
            //
            // The recursive nature of the grammar is an interplay between the `block`
            // rule, which represents `{ ... }`, the `ruleset` rule, and this `primary` rule,
            // as represented by this simplified grammar:
            //
            //     primary  →  (ruleset | declaration)+
            //     ruleset  →  selector+ block
            //     block    →  '{' primary '}'
            //
            // Only at one point is the primary rule not called from the
            // block rule: at the root level.
            //
            [_primary]: function () { 
                var mixin = this[_mixin];
                var root = [];
                var node;
                while (true) { 
                    while (true) { 
                        node = this[_comment]();
                        if (!node) { 
                            break;
                        }
                        root[_push](node);
                    }
                    // always process comments before deciding if finished
                    if (parserInput[_finished]) { 
                        break;
                    }
                    if (parserInput[_peek](_41)) { 
                        break;
                    }
                    node = this[_extendRu]();
                    if (node) { 
                        root = root[_concat](node);
                        continue;
                    }
                    node = mixin[_definiti]() || this[_declarat]() || mixin[_call](false, false) ||
                        this[_ruleset]() || this[_variable6]() || this[_entities][_call]() || this[_atrule]();
                    if (node) { 
                        root[_push](node);
                    }
                    else { 
                        var foundSemiColon = false;
                        while (parserInput[_$char](_45)) { 
                            foundSemiColon = true;
                        }
                        if (!foundSemiColon) { 
                            break;
                        }
                    }
                }
                return root;
            },
            // comments are collected by the main parsing mechanism and then assigned to nodes
            // where the current structure allows it
            [_comment]: function () { 
                if (parserInput[_commentS][_length]) { 
                    var comment = parserInput[_commentS][_shift]();
                    return new (tree_1[_default][_Comment])(comment[_text], comment[_isLineCo], comment[_index], fileInfo);
                }
            },
            //
            // Entities are tokens which can be found inside an Expression
            //
            [_entities]: { 
                [_mixinLoo]: function () { 
                    return parsers[_mixin][_call](true, true);
                },
                //
                // A string, which supports escaping " and '
                //
                //     "milky way" 'he\'s the one!'
                //
                [_quoted]: function (forceEscaped) { 
                    var str;
                    var index = parserInput[_i1];
                    var isEscaped = false;
                    parserInput[_save]();
                    if (parserInput[_$char](_55)) { 
                        isEscaped = true;
                    }
                    else if (forceEscaped) { 
                        parserInput[_restore]();
                        return;
                    }
                    str = parserInput[_$quoted]();
                    if (!str) { 
                        parserInput[_restore]();
                        return;
                    }
                    parserInput[_forget]();
                    return new (tree_1[_default][_Quoted])(str[_charAt](0), str[_substr](1, str[_length] - 2), isEscaped, index, fileInfo);
                },
                //
                // A catch-all word, such as:
                //
                //     black border-collapse
                //
                [_keyword]: function () { 
                    var k = parserInput[_$char](_27) || parserInput[_$re](_w_A_Fa_);
                    if (k) { 
                        return tree_1[_default][_Color][_fromKeyw](k) || new (tree_1[_default][_Keyword])(k);
                    }
                },
                //
                // A function call
                //
                //     rgb(255, 0, 255)
                //
                // The arguments are parsed with the `entities.arguments` parser.
                //
                [_call]: function () { 
                    var name;
                    var args;
                    var func;
                    var index = parserInput[_i1];
                    // http://jsperf.com/case-insensitive-regex-vs-strtolower-then-regex/18
                    if (parserInput[_peek](_url_i)) { 
                        return;
                    }
                    parserInput[_save]();
                    name = parserInput[_$re](_w_progi);
                    if (!name) { 
                        parserInput[_forget]();
                        return;
                    }
                    name = name[1];
                    func = this[_customFu](name);
                    if (func) { 
                        args = func[_parse]();
                        if (args && func[_stop]) { 
                            parserInput[_forget]();
                            return args;
                        }
                    }
                    args = this[_argument2](args);
                    if (!parserInput[_$char](_23)) { 
                        parserInput[_restore](_Could_no3);
                        return;
                    }
                    parserInput[_forget]();
                    return new (tree_1[_default][_Call])(name, args, index, fileInfo);
                },
                //
                // Parsing rules for functions with non-standard args, e.g.:
                //
                //     boolean(not(2 > 1))
                //
                //     This is a quick prototype, to be modified/improved when
                //     more custom-parsed funcs come (e.g. `selector(...)`)
                //
                [_customFu]: function (name) { 
                    /* Ideally the table is to be moved out of here for faster perf.,
                       but it's quite tricky since it relies on all these `parsers`
                       and `expect` available only here */
                    return { 
                        [_alpha]: f(parsers[_ieAlpha], true),
                        [_boolean]: f(condition),
                        [_if]: f(condition)
                    }[name[_toLowerC]()];
                    function f(parse, stop) { 
                        return { 
                            [_parse]: parse,
                            [_stop]: stop // when true - stop after parse() and return its result, 
                            // otherwise continue for plain args
                        };
                    }
                    function condition() { 
                        return [expect(parsers[_conditio], _expected1)];
                    }
                },
                [_argument2]: function (prevArgs) { 
                    var argsComma = prevArgs || [];
                    var argsSemiColon = [];
                    var isSemiColonSeparated;
                    var value;
                    parserInput[_save]();
                    while (true) { 
                        if (prevArgs) { 
                            prevArgs = false;
                        }
                        else { 
                            value = parsers[_detached]() || this[_assignme]() || parsers[_expressi]();
                            if (!value) { 
                                break;
                            }
                            if (value[_value] && value[_value][_length] == 1) { 
                                value = value[_value][0];
                            }
                            argsComma[_push](value);
                        }
                        if (parserInput[_$char](_22)) { 
                            continue;
                        }
                        if (parserInput[_$char](_45) || isSemiColonSeparated) { 
                            isSemiColonSeparated = true;
                            value = (argsComma[_length] < 1) ? argsComma[0]
                                : new tree_1[_default][_Value](argsComma);
                            argsSemiColon[_push](value);
                            argsComma = [];
                        }
                    }
                    parserInput[_forget]();
                    return isSemiColonSeparated ? argsSemiColon : argsComma;
                },
                [_literal]: function () { 
                    return this[_dimensio]() ||
                        this[_color]() ||
                        this[_quoted]() ||
                        this[_unicodeD]();
                },
                // Assignments are argument entities for calls.
                // They are present in ie filter properties as shown below.
                //
                //     filter: progid:DXImageTransform.Microsoft.Alpha( *opacity=50* )
                //
                [_assignme]: function () { 
                    var key;
                    var value;
                    parserInput[_save]();
                    key = parserInput[_$re](_w_s_i);
                    if (!key) { 
                        parserInput[_restore]();
                        return;
                    }
                    if (!parserInput[_$char](_31)) { 
                        parserInput[_restore]();
                        return;
                    }
                    value = parsers[_entity]();
                    if (value) { 
                        parserInput[_forget]();
                        return new (tree_1[_default][_Assignme])(key, value);
                    }
                    else { 
                        parserInput[_restore]();
                    }
                },
                //
                // Parse url() tokens
                //
                // We use a specific rule for urls, because they don't really behave like
                // standard function calls. The difference is that the argument doesn't have
                // to be enclosed within a string, so it can't be parsed as an Expression.
                //
                [_url]: function () { 
                    var value;
                    var index = parserInput[_i1];
                    parserInput[_autoComm] = false;
                    if (!parserInput[_$str](_url_)) { 
                        parserInput[_autoComm] = true;
                        return;
                    }
                    value = this[_quoted]() || this[_variable2]() || this[_property1]() ||
                        parserInput[_$re](_60) || '';
                    parserInput[_autoComm] = true;
                    expectChar(_23);
                    return new (tree_1[_default][_URL])((value[_value] != null ||
                        value instanceof tree_1[_default][_Variable1] ||
                        value instanceof tree_1[_default][_Property]) ?
                        value : new (tree_1[_default][_Anonymou])(value, index), index, fileInfo);
                },
                //
                // A Variable entity, such as `@fink`, in
                //
                //     width: @fink + 2px
                //
                // We use a different parser for variable definitions,
                // see `parsers.variable`.
                //
                [_variable2]: function () { 
                    var ch;
                    var name;
                    var index = parserInput[_i1];
                    parserInput[_save]();
                    if (parserInput[_currentC]() === _43 && (name = parserInput[_$re](_w_))) { 
                        ch = parserInput[_currentC]();
                        if (ch === _26 || ch === _35 && !parserInput[_prevChar]() [_match](_s_)) { 
                            // this may be a VariableCall lookup
                            var result = parsers[_variable6](name);
                            if (result) { 
                                parserInput[_forget]();
                                return result;
                            }
                        }
                        parserInput[_forget]();
                        return new (tree_1[_default][_Variable1])(name, index, fileInfo);
                    }
                    parserInput[_restore]();
                },
                // A variable entity using the protective {} e.g. @{var}
                [_variable7]: function () { 
                    var curly;
                    var index = parserInput[_i1];
                    if (parserInput[_currentC]() === _43 && (curly = parserInput[_$re](_w_1))) { 
                        return new (tree_1[_default][_Variable1])(_43 + curly[1], index, fileInfo);
                    }
                },
                //
                // A Property accessor, such as `$color`, in
                //
                //     background-color: $color
                //
                [_property1]: function () { 
                    var name;
                    var index = parserInput[_i1];
                    if (parserInput[_currentC]() === _$ && (name = parserInput[_$re](_$_w_))) { 
                        return new (tree_1[_default][_Property])(name, index, fileInfo);
                    }
                },
                // A property entity useing the protective {} e.g. ${prop}
                [_property3]: function () { 
                    var curly;
                    var index = parserInput[_i1];
                    if (parserInput[_currentC]() === _$ && (curly = parserInput[_$re](_$_w_1))) { 
                        return new (tree_1[_default][_Property])(_$ + curly[1], index, fileInfo);
                    }
                },
                //
                // A Hexadecimal color
                //
                //     #4F3C2F
                //
                // `rgb` and `hsl` colors are parsed through the `entities.call` parser.
                //
                [_color]: function () { 
                    var rgb;
                    parserInput[_save]();
                    if (parserInput[_currentC]() === _25 && (rgb = parserInput[_$re](_A_Fa_f1))) { 
                        if (!rgb[2]) { 
                            parserInput[_forget]();
                            return new (tree_1[_default][_Color])(rgb[1], undefined, rgb[0]);
                        }
                    }
                    parserInput[_restore]();
                },
                [_colorKey]: function () { 
                    parserInput[_save]();
                    var autoCommentAbsorb = parserInput[_autoComm];
                    parserInput[_autoComm] = false;
                    var k = parserInput[_$re](__A_Za_z);
                    parserInput[_autoComm] = autoCommentAbsorb;
                    if (!k) { 
                        parserInput[_forget]();
                        return;
                    }
                    parserInput[_restore]();
                    var color = tree_1[_default][_Color][_fromKeyw](k);
                    if (color) { 
                        parserInput[_$str](k);
                        return color;
                    }
                },
                //
                // A Dimension, that is, a number and a unit
                //
                //     0.5em 95%
                //
                [_dimensio]: function () { 
                    if (parserInput[_peekNotN]()) { 
                        return;
                    }
                    var value = parserInput[_$re](_d_d_a_z);
                    if (value) { 
                        return new (tree_1[_default][_Dimensio1])(value[1], value[2]);
                    }
                },
                //
                // A unicode descriptor, as is used in unicode-range
                //
                // U+0??  or U+00A1-00A9
                //
                [_unicodeD]: function () { 
                    var ud;
                    ud = parserInput[_$re](_U_0_9a_);
                    if (ud) { 
                        return new (tree_1[_default][_UnicodeD])(ud[0]);
                    }
                },
                //
                // JavaScript code to be evaluated
                //
                //     `window.location.href`
                //
                [_javascri1]: function () { 
                    var js;
                    var index = parserInput[_i1];
                    parserInput[_save]();
                    var escape = parserInput[_$char](_55);
                    var jsQuote = parserInput[_$char](_9);
                    if (!jsQuote) { 
                        parserInput[_restore]();
                        return;
                    }
                    js = parserInput[_$re](_61);
                    if (js) { 
                        parserInput[_forget]();
                        return new (tree_1[_default][_JavaScri2])(js[_substr](0, js[_length] - 1), Boolean(escape), index, fileInfo);
                    }
                    parserInput[_restore](_invalid_);
                }
            },
            //
            // The variable part of a variable definition. Used in the `rule` parser
            //
            //     @fink:
            //
            [_variable2]: function () { 
                var name;
                if (parserInput[_currentC]() === _43 && (name = parserInput[_$re](_w_s_))) { 
                    return name[1];
                }
            },
            //
            // Call a variable value to retrieve a detached ruleset
            // or a value from a detached ruleset's rules.
            //
            //     @fink();
            //     @fink;
            //     color: @fink[@color];
            //
            [_variable6]: function (parsedName) { 
                var lookups;
                var i = parserInput[_i1];
                var inValue = !!parsedName;
                var name = parsedName;
                parserInput[_save]();
                if (name || (parserInput[_currentC]() === _43
                    && (name = parserInput[_$re](_w_s_1)))) { 
                    lookups = this[_mixin][_ruleLook]();
                    if (!lookups && ((inValue && parserInput[_$str](_62) !== _62) || (name[2] !== _62))) { 
                        parserInput[_restore](_Missing_);
                        return;
                    }
                    if (!inValue) { 
                        name = name[1];
                    }
                    var call = new tree_1[_default][_Variable](name, i, fileInfo);
                    if (!inValue && parsers[_end]()) { 
                        parserInput[_forget]();
                        return call;
                    }
                    else { 
                        parserInput[_forget]();
                        return new tree_1[_default][_Namespac](call, lookups, i, fileInfo);
                    }
                }
                parserInput[_restore]();
            },
            //
            // extend syntax - used to extend selectors
            //
            [_extend]: function (isRule) { 
                var elements;
                var e;
                var index = parserInput[_i1];
                var option;
                var extendList;
                var extend;
                if (!parserInput[_$str](isRule ? _extend_2 : _extend_1)) { 
                    return;
                }
                do { 
                    option = null;
                    elements = null;
                    while (!(option = parserInput[_$re](_all_s_))) { 
                        e = this[_element]();
                        if (!e) { 
                            break;
                        }
                        if (elements) { 
                            elements[_push](e);
                        }
                        else { 
                            elements = [e];
                        }
                    }
                    option = option && option[1];
                    if (!elements) { 
                        error(_Missing_1);
                    }
                    extend = new (tree_1[_default][_Extend])(new (tree_1[_default][_Selector])(elements), option, index, fileInfo);
                    if (extendList) { 
                        extendList[_push](extend);
                    }
                    else { 
                        extendList = [extend];
                    }
                } while (parserInput[_$char](_22));
                expect(_63);
                if (isRule) { 
                    expect(_64);
                }
                return extendList;
            },
            //
            // extendRule - used in a rule to extend all the parent selectors
            //
            [_extendRu]: function () { 
                return this[_extend](true);
            },
            //
            // Mixins
            //
            [_mixin]: { 
                //
                // A Mixin call, with an optional argument list
                //
                //     #mixins > .square(#fff);
                //     #mixins.square(#fff);
                //     .rounded(4px, black);
                //     .button;
                //
                // We can lookup / return a value using the lookup syntax:
                //
                //     color: #mixin.square(#fff)[@color];
                //
                // The `while` loop is there because mixins can be
                // namespaced, but we only support the child and descendant
                // selector for now.
                //
                [_call]: function (inValue, getLookup) { 
                    var s = parserInput[_currentC]();
                    var important = false;
                    var lookups;
                    var index = parserInput[_i1];
                    var elements;
                    var args;
                    var hasParens;
                    if (s !== _16 && s !== _25) { 
                        return;
                    }
                    parserInput[_save](); // stop us absorbing part of an invalid selector
                    elements = this[_elements]();
                    if (elements) { 
                        if (parserInput[_$char](_26)) { 
                            args = this[_args](true) [_args];
                            expectChar(_23);
                            hasParens = true;
                        }
                        if (getLookup !== false) { 
                            lookups = this[_ruleLook]();
                        }
                        if (getLookup === true && !lookups) { 
                            parserInput[_restore]();
                            return;
                        }
                        if (inValue && !lookups && !hasParens) { 
                            // This isn't a valid in-value mixin call
                            parserInput[_restore]();
                            return;
                        }
                        if (!inValue && parsers[_importan1]()) { 
                            important = true;
                        }
                        if (inValue || parsers[_end]()) { 
                            parserInput[_forget]();
                            var mixin = new (tree_1[_default][_mixin][_Call])(elements, args, index, fileInfo, !lookups && important);
                            if (lookups) { 
                                return new tree_1[_default][_Namespac](mixin, lookups);
                            }
                            else { 
                                return mixin;
                            }
                        }
                    }
                    parserInput[_restore]();
                },
                /**
                 * Matching elements for mixins
                 * (Start with . or # and can have > )
                 */
                [_elements]: function () { 
                    var elements;
                    var e;
                    var c;
                    var elem;
                    var elemIndex;
                    var re = _w_A_Fa_1;
                    while (true) { 
                        elemIndex = parserInput[_i1];
                        e = parserInput[_$re](re);
                        if (!e) { 
                            break;
                        }
                        elem = new (tree_1[_default][_Element])(c, e, false, elemIndex, fileInfo);
                        if (elements) { 
                            elements[_push](elem);
                        }
                        else { 
                            elements = [elem];
                        }
                        c = parserInput[_$char](_33);
                    }
                    return elements;
                },
                [_args]: function (isCall) { 
                    var entities = parsers[_entities];
                    var returner = { [_args]: null, [_variadic]: false };
                    var expressions = [];
                    var argsSemiColon = [];
                    var argsComma = [];
                    var isSemiColonSeparated;
                    var expressionContainsNamed;
                    var name;
                    var nameLoop;
                    var value;
                    var arg;
                    var expand;
                    var hasSep = true;
                    parserInput[_save]();
                    while (true) { 
                        if (isCall) { 
                            arg = parsers[_detached]() || parsers[_expressi]();
                        }
                        else { 
                            parserInput[_commentS][_length] = 0;
                            if (parserInput[_$str](_65)) { 
                                returner[_variadic] = true;
                                if (parserInput[_$char](_45) && !isSemiColonSeparated) { 
                                    isSemiColonSeparated = true;
                                }
                                (isSemiColonSeparated ? argsSemiColon : argsComma)
                                    [_push]({ [_variadic]: true });
                                break;
                            }
                            arg = entities[_variable2]() || entities[_property1]() || entities[_literal]() || entities[_keyword]() || this[_call](true);
                        }
                        if (!arg || !hasSep) { 
                            break;
                        }
                        nameLoop = null;
                        if (arg[_throwAwa]) { 
                            arg[_throwAwa]();
                        }
                        value = arg;
                        var val = null;
                        if (isCall) { 
                            // Variable
                            if (arg[_value] && arg[_value][_length] == 1) { 
                                val = arg[_value][0];
                            }
                        }
                        else { 
                            val = arg;
                        }
                        if (val && (val instanceof tree_1[_default][_Variable1] || val instanceof tree_1[_default][_Property])) { 
                            if (parserInput[_$char](_15)) { 
                                if (expressions[_length] > 0) { 
                                    if (isSemiColonSeparated) { 
                                        error(_Cannot_m);
                                    }
                                    expressionContainsNamed = true;
                                }
                                value = parsers[_detached]() || parsers[_expressi]();
                                if (!value) { 
                                    if (isCall) { 
                                        error(_could_no);
                                    }
                                    else { 
                                        parserInput[_restore]();
                                        returner[_args] = [];
                                        return returner;
                                    }
                                }
                                nameLoop = (name = val[_name]);
                            }
                            else if (parserInput[_$str](_65)) { 
                                if (!isCall) { 
                                    returner[_variadic] = true;
                                    if (parserInput[_$char](_45) && !isSemiColonSeparated) { 
                                        isSemiColonSeparated = true;
                                    }
                                    (isSemiColonSeparated ? argsSemiColon : argsComma)
                                        [_push]({ [_name]: arg[_name], [_variadic]: true });
                                    break;
                                }
                                else { 
                                    expand = true;
                                }
                            }
                            else if (!isCall) { 
                                name = nameLoop = val[_name];
                                value = null;
                            }
                        }
                        if (value) { 
                            expressions[_push](value);
                        }
                        argsComma[_push]({ [_name]: nameLoop, [_value]: value, [_expand]: expand });
                        if (parserInput[_$char](_22)) { 
                            hasSep = true;
                            continue;
                        }
                        hasSep = parserInput[_$char](_45) === _45;
                        if (hasSep || isSemiColonSeparated) { 
                            if (expressionContainsNamed) { 
                                error(_Cannot_m);
                            }
                            isSemiColonSeparated = true;
                            if (expressions[_length] > 1) { 
                                value = new (tree_1[_default][_Value])(expressions);
                            }
                            argsSemiColon[_push]({ [_name]: name, [_value]: value, [_expand]: expand });
                            name = null;
                            expressions = [];
                            expressionContainsNamed = false;
                        }
                    }
                    parserInput[_forget]();
                    returner[_args] = isSemiColonSeparated ? argsSemiColon : argsComma;
                    return returner;
                },
                //
                // A Mixin definition, with a list of parameters
                //
                //     .rounded (@radius: 2px, @color) {
                //        ...
                //     }
                //
                // Until we have a finer grained state-machine, we have to
                // do a look-ahead, to make sure we don't have a mixin call.
                // See the `rule` function for more information.
                //
                // We start by matching `.rounded (`, and then proceed on to
                // the argument list, which has optional default values.
                // We store the parameters in `params`, with a `value` key,
                // if there is a value, such as in the case of `@radius`.
                //
                // Once we've got our params list, and a closing `)`, we parse
                // the `{...}` block.
                //
                [_definiti]: function () { 
                    var name;
                    var params = [];
                    var match;
                    var ruleset;
                    var cond;
                    var variadic = false;
                    if ((parserInput[_currentC]() !== _16 && parserInput[_currentC]() !== _25) ||
                        parserInput[_peek](_66)) { 
                        return;
                    }
                    parserInput[_save]();
                    match = parserInput[_$re](_w_A_Fa_2);
                    if (match) { 
                        name = match[1];
                        var argInfo = this[_args](false);
                        params = argInfo[_args];
                        variadic = argInfo[_variadic];
                        // .mixincall("@{a}");
                        // looks a bit like a mixin definition..
                        // also
                        // .mixincall(@a: {rule: set;});
                        // so we have to be nice and restore
                        if (!parserInput[_$char](_23)) { 
                            parserInput[_restore](_Missing_2);
                            return;
                        }
                        parserInput[_commentS][_length] = 0;
                        if (parserInput[_$str](_when)) { // Guard
                            cond = expect(parsers[_conditio1], _expected1);
                        }
                        ruleset = parsers[_block]();
                        if (ruleset) { 
                            parserInput[_forget]();
                            return new (tree_1[_default][_mixin][_Definiti])(name, params, ruleset, cond, variadic);
                        }
                        else { 
                            parserInput[_restore]();
                        }
                    }
                    else { 
                        parserInput[_restore]();
                    }
                },
                [_ruleLook]: function () { 
                    var rule;
                    var args;
                    var lookups = [];
                    if (parserInput[_currentC]() !== _35) { 
                        return;
                    }
                    while (true) { 
                        parserInput[_save]();
                        args = null;
                        rule = this[_lookupVa]();
                        if (!rule && rule !== '') { 
                            parserInput[_restore]();
                            break;
                        }
                        lookups[_push](rule);
                        parserInput[_forget]();
                    }
                    if (lookups[_length] > 0) { 
                        return lookups;
                    }
                },
                [_lookupVa]: function () { 
                    parserInput[_save]();
                    if (!parserInput[_$char](_35)) { 
                        parserInput[_restore]();
                        return;
                    }
                    var name = parserInput[_$re](_$_0_2__);
                    if (!parserInput[_$char](_36)) { 
                        parserInput[_restore]();
                        return;
                    }
                    if (name || name === '') { 
                        parserInput[_forget]();
                        return name;
                    }
                    parserInput[_restore]();
                }
            },
            //
            // Entities are the smallest recognized token,
            // and can be found inside a rule's value.
            //
            [_entity]: function () { 
                var entities = this[_entities];
                return this[_comment]() || entities[_literal]() || entities[_variable2]() || entities[_url]() ||
                    entities[_property1]() || entities[_call]() || entities[_keyword]() || this[_mixin][_call](true) ||
                    entities[_javascri1]();
            },
            //
            // A Declaration terminator. Note that we use `peek()` to check for '}',
            // because the `block` rule will be expecting it, but we still need to make sure
            // it's there, if ';' was omitted.
            //
            [_end]: function () { 
                return parserInput[_$char](_45) || parserInput[_peek](_41);
            },
            //
            // IE's alpha function
            //
            //     alpha(opacity=88)
            //
            [_ieAlpha]: function () { 
                var value;
                // http://jsperf.com/case-insensitive-regex-vs-strtolower-then-regex/18
                if (!parserInput[_$re](_opacity)) { 
                    return;
                }
                value = parserInput[_$re](_d_);
                if (!value) { 
                    value = expect(parsers[_entities][_variable2], _Could_no4);
                    value = _67 + value[_name][_slice](1) + _41;
                }
                expectChar(_23);
                return new tree_1[_default][_Quoted]('', _alpha_op + value + _23);
            },
            //
            // A Selector Element
            //
            //     div
            //     + h1
            //     #socks
            //     input[type="text"]
            //
            // Elements are the building blocks for Selectors,
            // they are made out of a `Combinator` (see combinator rule),
            // and an element name, such as a tag a class, or `*`.
            //
            [_element]: function () { 
                var e;
                var c;
                var v;
                var index = parserInput[_i1];
                c = this[_combinat]();
                e = parserInput[_$re](_d_d_d_1) ||
                    parserInput[_$re](_w_x00_x) ||
                    parserInput[_$char](_8) || parserInput[_$char](_24) || this[_attribut]() ||
                    parserInput[_$re](_68) || parserInput[_$re](_69) ||
                    this[_entities][_variable7]();
                if (!e) { 
                    parserInput[_save]();
                    if (parserInput[_$char](_26)) { 
                        if ((v = this[_selector](false)) && parserInput[_$char](_23)) { 
                            e = new (tree_1[_default][_Paren])(v);
                            parserInput[_forget]();
                        }
                        else { 
                            parserInput[_restore](_Missing_2);
                        }
                    }
                    else { 
                        parserInput[_forget]();
                    }
                }
                if (e) { 
                    return new (tree_1[_default][_Element])(c, e, e instanceof tree_1[_default][_Variable1], index, fileInfo);
                }
            },
            //
            // Combinators combine elements together, in a Selector.
            //
            // Because our parser isn't white-space sensitive, special care
            // has to be taken, when parsing the descendant combinator, ` `,
            // as it's an empty space. We have to check the previous character
            // in the input, to see if it's a ` ` character. More info on how
            // we deal with this in *combinator.js*.
            //
            [_combinat]: function () { 
                var c = parserInput[_currentC]();
                if (c === _4) { 
                    parserInput[_save]();
                    var slashedCombinator = parserInput[_$re](_a_z_i3);
                    if (slashedCombinator) { 
                        parserInput[_forget]();
                        return new (tree_1[_default][_Combinat])(slashedCombinator);
                    }
                    parserInput[_restore]();
                }
                if (c === _33 || c === _6 || c === _55 || c === _34 || c === _70) { 
                    parserInput[_i1]++;
                    if (c === _70 && parserInput[_currentC]() === _70) { 
                        c = _71;
                        parserInput[_i1]++;
                    }
                    while (parserInput[_isWhites]()) { 
                        parserInput[_i1]++;
                    }
                    return new (tree_1[_default][_Combinat])(c);
                }
                else if (parserInput[_isWhites](-1)) { 
                    return new (tree_1[_default][_Combinat])(_14);
                }
                else { 
                    return new (tree_1[_default][_Combinat])(null);
                }
            },
            //
            // A CSS Selector
            // with less extensions e.g. the ability to extend and guard
            //
            //     .class > div + h1
            //     li a:hover
            //
            // Selectors are made out of one or more Elements, see above.
            //
            [_selector]: function (isLess) { 
                var index = parserInput[_i1];
                var elements;
                var extendList;
                var c;
                var e;
                var allExtends;
                var when;
                var condition;
                isLess = isLess !== false;
                while ((isLess && (extendList = this[_extend]())) || (isLess && (when = parserInput[_$str](_when))) || (e = this[_element]())) { 
                    if (when) { 
                        condition = expect(this[_conditio1], _expected1);
                    }
                    else if (condition) { 
                        error(_CSS_guar);
                    }
                    else if (extendList) { 
                        if (allExtends) { 
                            allExtends = allExtends[_concat](extendList);
                        }
                        else { 
                            allExtends = extendList;
                        }
                    }
                    else { 
                        if (allExtends) { 
                            error(_Extend_c);
                        }
                        c = parserInput[_currentC]();
                        if (elements) { 
                            elements[_push](e);
                        }
                        else { 
                            elements = [e];
                        }
                        e = null;
                    }
                    if (c === _40 || c === _41 || c === _45 || c === _22 || c === _23) { 
                        break;
                    }
                }
                if (elements) { 
                    return new (tree_1[_default][_Selector])(elements, allExtends, condition, index, fileInfo);
                }
                if (allExtends) { 
                    error(_Extend_m);
                }
            },
            [_selector1]: function () { 
                var s;
                var selectors;
                while (true) { 
                    s = this[_selector]();
                    if (!s) { 
                        break;
                    }
                    if (selectors) { 
                        selectors[_push](s);
                    }
                    else { 
                        selectors = [s];
                    }
                    parserInput[_commentS][_length] = 0;
                    if (s[_conditio] && selectors[_length] > 1) { 
                        error(_Guards_a);
                    }
                    if (!parserInput[_$char](_22)) { 
                        break;
                    }
                    if (s[_conditio]) { 
                        error(_Guards_a);
                    }
                    parserInput[_commentS][_length] = 0;
                }
                return selectors;
            },
            [_attribut]: function () { 
                if (!parserInput[_$char](_35)) { 
                    return;
                }
                var entities = this[_entities];
                var key;
                var val;
                var op;
                //
                // case-insensitive flag
                // e.g. [attr operator value i]
                //
                var cif;
                if (!(key = entities[_variable7]())) { 
                    key = expect(__A_Za_z1);
                }
                op = parserInput[_$re](_$_1);
                if (op) { 
                    val = entities[_quoted]() || parserInput[_$re](_0_9_) || parserInput[_$re](_w_2) || entities[_variable7]();
                    if (val) { 
                        cif = parserInput[_$re](_iIsS_);
                    }
                }
                expectChar(_36);
                return new (tree_1[_default][_Attribut])(key, op, val, cif);
            },
            //
            // The `block` rule is used by `ruleset` and `mixin.definition`.
            // It's a wrapper around the `primary` rule, with added `{}`.
            //
            [_block]: function () { 
                var content;
                if (parserInput[_$char](_40) && (content = this[_primary]()) && parserInput[_$char](_41)) { 
                    return content;
                }
            },
            [_blockRul]: function () { 
                var block = this[_block]();
                if (block) { 
                    block = new tree_1[_default][_Ruleset](null, block);
                }
                return block;
            },
            [_detached]: function () { 
                var argInfo;
                var params;
                var variadic;
                parserInput[_save]();
                if (parserInput[_$re](_72)) { 
                    /**
                     * DR args currently only implemented for each() function, and not
                     * yet settable as `@dr: #(@arg) {}`
                     * This should be done when DRs are merged with mixins.
                     * See: https://github.com/less/less-meta/issues/16
                     */
                    argInfo = this[_mixin][_args](false);
                    params = argInfo[_args];
                    variadic = argInfo[_variadic];
                    if (!parserInput[_$char](_23)) { 
                        parserInput[_restore]();
                        return;
                    }
                }
                var blockRuleset = this[_blockRul]();
                if (blockRuleset) { 
                    parserInput[_forget]();
                    if (params) { 
                        return new tree_1[_default][_mixin][_Definiti](null, params, blockRuleset, null, variadic);
                    }
                    return new tree_1[_default][_Detached](blockRuleset);
                }
                parserInput[_restore]();
            },
            //
            // div, .class, body > p {...}
            //
            [_ruleset]: function () { 
                var selectors;
                var rules;
                var debugInfo;
                parserInput[_save]();
                if (context[_dumpLine]) { 
                    debugInfo = getDebugInfo(parserInput[_i1]);
                }
                selectors = this[_selector1]();
                if (selectors && (rules = this[_block]())) { 
                    parserInput[_forget]();
                    var ruleset = new (tree_1[_default][_Ruleset])(selectors, rules, context[_strictIm]);
                    if (context[_dumpLine]) { 
                        ruleset[_debugInf] = debugInfo;
                    }
                    return ruleset;
                }
                else { 
                    parserInput[_restore]();
                }
            },
            [_declarat]: function () { 
                var name;
                var value;
                var index = parserInput[_i1];
                var hasDR;
                var c = parserInput[_currentC]();
                var important;
                var merge;
                var isVariable;
                if (c === _16 || c === _25 || c === _24 || c === _15) { 
                    return;
                }
                parserInput[_save]();
                name = this[_variable2]() || this[_ruleProp]();
                if (name) { 
                    isVariable = typeof name === _string;
                    if (isVariable) { 
                        value = this[_detached]();
                        if (value) { 
                            hasDR = true;
                        }
                    }
                    parserInput[_commentS][_length] = 0;
                    if (!value) { 
                        // a name returned by this.ruleProperty() is always an array of the form:
                        // [string-1, ..., string-n, ""] or [string-1, ..., string-n, "+"]
                        // where each item is a tree.Keyword or tree.Variable
                        merge = !isVariable && name[_length] > 1 && name[_pop]() [_value];
                        // Custom property values get permissive parsing
                        if (name[0] [_value] && name[0] [_value][_slice](0, 2) === _73) { 
                            value = this[_permissi]();
                        }
                        // Try to store values as anonymous
                        // If we need the value later we'll re-parse it in ruleset.parseValue
                        else { 
                            value = this[_anonymou1]();
                        }
                        if (value) { 
                            parserInput[_forget]();
                            // anonymous values absorb the end ';' which is required for them to work
                            return new (tree_1[_default][_Declarat])(name, value, false, merge, index, fileInfo);
                        }
                        if (!value) { 
                            value = this[_value]();
                        }
                        if (value) { 
                            important = this[_importan1]();
                        }
                        else if (isVariable) { 
                            // As a last resort, try permissiveValue
                            value = this[_permissi]();
                        }
                    }
                    if (value && (this[_end]() || hasDR)) { 
                        parserInput[_forget]();
                        return new (tree_1[_default][_Declarat])(name, value, important, merge, index, fileInfo);
                    }
                    else { 
                        parserInput[_restore]();
                    }
                }
                else { 
                    parserInput[_restore]();
                }
            },
            [_anonymou1]: function () { 
                var index = parserInput[_i1];
                var match = parserInput[_$re](_$_2);
                if (match) { 
                    return new (tree_1[_default][_Anonymou])(match[1], index);
                }
            },
            /**
             * Used for custom properties, at-rules, and variables (as fallback)
             * Parses almost anything inside of {} [] () "" blocks
             * until it reaches outer-most tokens.
             *
             * First, it will try to parse comments and entities to reach
             * the end. This is mostly like the Expression parser except no
             * math is allowed.
             */
            [_permissi]: function (untilTokens) { 
                var i;
                var e;
                var done;
                var value;
                var tok = untilTokens || _45;
                var index = parserInput[_i1];
                var result = [];
                function testCurrentChar() { 
                    var char = parserInput[_currentC]();
                    if (typeof tok === _string) { 
                        return char === tok;
                    }
                    else { 
                        return tok[_test](char);
                    }
                }
                if (testCurrentChar()) { 
                    return;
                }
                value = [];
                do { 
                    e = this[_comment]();
                    if (e) { 
                        value[_push](e);
                        continue;
                    }
                    e = this[_entity]();
                    if (e) { 
                        value[_push](e);
                    }
                } while (e);
                done = testCurrentChar();
                if (value[_length] > 0) { 
                    value = new (tree_1[_default][_Expressi1])(value);
                    if (done) { 
                        return value;
                    }
                    else { 
                        result[_push](value);
                    }
                    // Preserve space before $parseUntil as it will not
                    if (parserInput[_prevChar]() === _14) { 
                        result[_push](new tree_1[_default][_Anonymou](_14, index));
                    }
                }
                parserInput[_save]();
                value = parserInput[_$parseUn](tok);
                if (value) { 
                    if (typeof value === _string) { 
                        error(_Expected + value + _19, _Parse);
                    }
                    if (value[_length] === 1 && value[0] === _14) { 
                        parserInput[_forget]();
                        return new tree_1[_default][_Anonymou]('', index);
                    }
                    var item = void 0;
                    for (i = 0; i < value[_length]; i++) { 
                        item = value[i];
                        if (Array[_isArray](item)) { 
                            // Treat actual quotes as normal quoted values
                            result[_push](new tree_1[_default][_Quoted](item[0], item[1], true, index, fileInfo));
                        }
                        else { 
                            if (i === value[_length] - 1) { 
                                item = item[_trim]();
                            }
                            // Treat like quoted values, but replace vars like unquoted expressions
                            var quote = new tree_1[_default][_Quoted](_19, item, true, index, fileInfo);
                            quote[_variable5] = _w_g1;
                            quote[_propRege] = _$_w_g1;
                            result[_push](quote);
                        }
                    }
                    parserInput[_forget]();
                    return new tree_1[_default][_Expressi1](result, true);
                }
                parserInput[_restore]();
            },
            //
            // An @import atrule
            //
            //     @import "lib";
            //
            // Depending on our environment, importing is done differently:
            // In the browser, it's an XHR request, in Node, it would be a
            // file-system operation. The function used for importing is
            // stored in `import`, which we pass to the Import constructor.
            //
            [_import]: function () { 
                var path;
                var features;
                var index = parserInput[_i1];
                var dir = parserInput[_$re](_import_1);
                if (dir) { 
                    var options = (dir ? this[_importOp]() : null) || {};
                    if ((path = this[_entities][_quoted]() || this[_entities][_url]())) { 
                        features = this[_mediaFea]();
                        if (!parserInput[_$char](_45)) { 
                            parserInput[_i1] = index;
                            error(_missing_8);
                        }
                        features = features && new (tree_1[_default][_Value])(features);
                        return new (tree_1[_default][_Import])(path, features, options, index, fileInfo);
                    }
                    else { 
                        parserInput[_i1] = index;
                        error(_malforme);
                    }
                }
            },
            [_importOp]: function () { 
                var o;
                var options = {};
                var optionName;
                var value;
                // list of options, surrounded by parens
                if (!parserInput[_$char](_26)) { 
                    return null;
                }
                do { 
                    o = this[_importOp1]();
                    if (o) { 
                        optionName = o;
                        value = true;
                        switch (optionName) { 
                            case _css1 :
                                optionName = _less;
                                value = false;
                                break;
                            case _once :
                                optionName = _multiple;
                                value = false;
                                break;
                        }
                        options[optionName] = value;
                        if (!parserInput[_$char](_22)) { 
                            break;
                        }
                    }
                } while (o);
                expectChar(_23);
                return options;
            },
            [_importOp1]: function () { 
                var opt = parserInput[_$re](_less_cs);
                if (opt) { 
                    return opt[1];
                }
            },
            [_mediaFea1]: function () { 
                var entities = this[_entities];
                var nodes = [];
                var e;
                var p;
                parserInput[_save]();
                do { 
                    e = entities[_keyword]() || entities[_variable2]() || entities[_mixinLoo]();
                    if (e) { 
                        nodes[_push](e);
                    }
                    else if (parserInput[_$char](_26)) { 
                        p = this[_property1]();
                        e = this[_value]();
                        if (parserInput[_$char](_23)) { 
                            if (p && e) { 
                                nodes[_push](new (tree_1[_default][_Paren])(new (tree_1[_default][_Declarat])(p, e, null, null, parserInput[_i1], fileInfo, true)));
                            }
                            else if (e) { 
                                nodes[_push](new (tree_1[_default][_Paren])(e));
                            }
                            else { 
                                error(_badly_fo);
                            }
                        }
                        else { 
                            error(_Missing_2, _Parse);
                        }
                    }
                } while (e);
                parserInput[_forget]();
                if (nodes[_length] > 0) { 
                    return new (tree_1[_default][_Expressi1])(nodes);
                }
            },
            [_mediaFea]: function () { 
                var entities = this[_entities];
                var features = [];
                var e;
                do { 
                    e = this[_mediaFea1]();
                    if (e) { 
                        features[_push](e);
                        if (!parserInput[_$char](_22)) { 
                            break;
                        }
                    }
                    else { 
                        e = entities[_variable2]() || entities[_mixinLoo]();
                        if (e) { 
                            features[_push](e);
                            if (!parserInput[_$char](_22)) { 
                                break;
                            }
                        }
                    }
                } while (e);
                return features[_length] > 0 ? features : null;
            },
            [_media]: function () { 
                var features;
                var rules;
                var media;
                var debugInfo;
                var index = parserInput[_i1];
                if (context[_dumpLine]) { 
                    debugInfo = getDebugInfo(index);
                }
                parserInput[_save]();
                if (parserInput[_$str](_media1)) { 
                    features = this[_mediaFea]();
                    rules = this[_block]();
                    if (!rules) { 
                        error(_media_de);
                    }
                    parserInput[_forget]();
                    media = new (tree_1[_default][_Media])(rules, features, index, fileInfo);
                    if (context[_dumpLine]) { 
                        media[_debugInf] = debugInfo;
                    }
                    return media;
                }
                parserInput[_restore]();
            },
            //
            // A @plugin directive, used to import plugins dynamically.
            //
            //     @plugin (args) "lib";
            //
            [_plugin]: function () { 
                var path;
                var args;
                var options;
                var index = parserInput[_i1];
                var dir = parserInput[_$re](_plugin_2);
                if (dir) { 
                    args = this[_pluginAr]();
                    if (args) { 
                        options = { 
                            [_pluginAr]: args,
                            [_isPlugin]: true
                        };
                    }
                    else { 
                        options = { [_isPlugin]: true };
                    }
                    if ((path = this[_entities][_quoted]() || this[_entities][_url]())) { 
                        if (!parserInput[_$char](_45)) { 
                            parserInput[_i1] = index;
                            error(_missing_9);
                        }
                        return new (tree_1[_default][_Import])(path, null, options, index, fileInfo);
                    }
                    else { 
                        parserInput[_i1] = index;
                        error(_malforme1);
                    }
                }
            },
            [_pluginAr]: function () { 
                // list of options, surrounded by parens
                parserInput[_save]();
                if (!parserInput[_$char](_26)) { 
                    parserInput[_restore]();
                    return null;
                }
                var args = parserInput[_$re](_s_s_);
                if (args[1]) { 
                    parserInput[_forget]();
                    return args[1] [_trim]();
                }
                else { 
                    parserInput[_restore]();
                    return null;
                }
            },
            //
            // A CSS AtRule
            //
            //     @charset "utf-8";
            //
            [_atrule]: function () { 
                var index = parserInput[_i1];
                var name;
                var value;
                var rules;
                var nonVendorSpecificName;
                var hasIdentifier;
                var hasExpression;
                var hasUnknown;
                var hasBlock = true;
                var isRooted = true;
                if (parserInput[_currentC]() !== _43) { 
                    return;
                }
                value = this[_import]() || this[_plugin]() || this[_media]();
                if (value) { 
                    return value;
                }
                parserInput[_save]();
                name = parserInput[_$re](_a_z_);
                if (!name) { 
                    return;
                }
                nonVendorSpecificName = name;
                if (name[_charAt](1) == _7 && name[_indexOf](_7, 2) > 0) { 
                    nonVendorSpecificName = _43 + name[_slice](name[_indexOf](_7, 2) + 1);
                }
                switch (nonVendorSpecificName) { 
                    case _charset :
                        hasIdentifier = true;
                        hasBlock = false;
                        break;
                    case _namespa :
                        hasExpression = true;
                        hasBlock = false;
                        break;
                    case _keyfram :
                    case _counter :
                        hasIdentifier = true;
                        break;
                    case _documen :
                    case _support :
                        hasUnknown = true;
                        isRooted = false;
                        break;
                    default:
                        hasUnknown = true;
                        break;
                }
                parserInput[_commentS][_length] = 0;
                if (hasIdentifier) { 
                    value = this[_entity]();
                    if (!value) { 
                        error(_expected2 + name + _identif);
                    }
                }
                else if (hasExpression) { 
                    value = this[_expressi]();
                    if (!value) { 
                        error(_expected2 + name + _express);
                    }
                }
                else if (hasUnknown) { 
                    value = this[_permissi](_74);
                    hasBlock = (parserInput[_currentC]() === _40);
                    if (!value) { 
                        if (!hasBlock && parserInput[_currentC]() !== _45) { 
                            error(name + _rule_is);
                        }
                    }
                    else if (!value[_value]) { 
                        value = null;
                    }
                }
                if (hasBlock) { 
                    rules = this[_blockRul]();
                }
                if (rules || (!hasBlock && value && parserInput[_$char](_45))) { 
                    parserInput[_forget]();
                    return new (tree_1[_default][_AtRule])(name, value, rules, index, fileInfo, context[_dumpLine] ? getDebugInfo(index) : null, isRooted);
                }
                parserInput[_restore](_at_rule_);
            },
            //
            // A Value is a comma-delimited list of Expressions
            //
            //     font-family: Baskerville, Georgia, serif;
            //
            // In a Rule, a Value represents everything after the `:`,
            // and before the `;`.
            //
            [_value]: function () { 
                var e;
                var expressions = [];
                var index = parserInput[_i1];
                do { 
                    e = this[_expressi]();
                    if (e) { 
                        expressions[_push](e);
                        if (!parserInput[_$char](_22)) { 
                            break;
                        }
                    }
                } while (e);
                if (expressions[_length] > 0) { 
                    return new (tree_1[_default][_Value])(expressions, index);
                }
            },
            [_importan1]: function () { 
                if (parserInput[_currentC]() === _13) { 
                    return parserInput[_$re](_importa1);
                }
            },
            [_sub]: function () { 
                var a;
                var e;
                parserInput[_save]();
                if (parserInput[_$char](_26)) { 
                    a = this[_addition]();
                    if (a && parserInput[_$char](_23)) { 
                        parserInput[_forget]();
                        e = new (tree_1[_default][_Expressi1])([a]);
                        e[_parens] = true;
                        return e;
                    }
                    parserInput[_restore](_Expected1);
                    return;
                }
                parserInput[_restore]();
            },
            [_multipli]: function () { 
                var m;
                var a;
                var op;
                var operation;
                var isSpaced;
                m = this[_operand]();
                if (m) { 
                    isSpaced = parserInput[_isWhites](-1);
                    while (true) { 
                        if (parserInput[_peek](_75)) { 
                            break;
                        }
                        parserInput[_save]();
                        op = parserInput[_$char](_4) || parserInput[_$char](_8) || parserInput[_$str](_21);
                        if (!op) { 
                            parserInput[_forget]();
                            break;
                        }
                        a = this[_operand]();
                        if (!a) { 
                            parserInput[_restore]();
                            break;
                        }
                        parserInput[_forget]();
                        m[_parensIn] = true;
                        a[_parensIn] = true;
                        operation = new (tree_1[_default][_Operatio])(op, [operation || m, a], isSpaced);
                        isSpaced = parserInput[_isWhites](-1);
                    }
                    return operation || m;
                }
            },
            [_addition]: function () { 
                var m;
                var a;
                var op;
                var operation;
                var isSpaced;
                m = this[_multipli]();
                if (m) { 
                    isSpaced = parserInput[_isWhites](-1);
                    while (true) { 
                        op = parserInput[_$re](_s_1) || (!isSpaced && (parserInput[_$char](_6) || parserInput[_$char](_7)));
                        if (!op) { 
                            break;
                        }
                        a = this[_multipli]();
                        if (!a) { 
                            break;
                        }
                        m[_parensIn] = true;
                        a[_parensIn] = true;
                        operation = new (tree_1[_default][_Operatio])(op, [operation || m, a], isSpaced);
                        isSpaced = parserInput[_isWhites](-1);
                    }
                    return operation || m;
                }
            },
            [_conditio1]: function () { 
                var a;
                var b;
                var index = parserInput[_i1];
                var condition;
                a = this[_conditio](true);
                if (a) { 
                    while (true) { 
                        if (!parserInput[_peek](_s_not_s) || !parserInput[_$char](_22)) { 
                            break;
                        }
                        b = this[_conditio](true);
                        if (!b) { 
                            break;
                        }
                        condition = new (tree_1[_default][_Conditio])(_or, condition || a, b, index);
                    }
                    return condition || a;
                }
            },
            [_conditio]: function (needsParens) { 
                var result;
                var logical;
                var next;
                function or() { 
                    return parserInput[_$str](_or);
                }
                result = this[_conditio2](needsParens);
                if (!result) { 
                    return;
                }
                logical = or();
                if (logical) { 
                    next = this[_conditio](needsParens);
                    if (next) { 
                        result = new (tree_1[_default][_Conditio])(logical, result, next);
                    }
                    else { 
                        return;
                    }
                }
                return result;
            },
            [_conditio2]: function (needsParens) { 
                var result;
                var logical;
                var next;
                var self = this;
                function insideCondition() { 
                    var cond = self[_negatedC](needsParens) || self[_parenthe](needsParens);
                    if (!cond && !needsParens) { 
                        return self[_atomicCo](needsParens);
                    }
                    return cond;
                }
                function and() { 
                    return parserInput[_$str](_and);
                }
                result = insideCondition();
                if (!result) { 
                    return;
                }
                logical = and();
                if (logical) { 
                    next = this[_conditio2](needsParens);
                    if (next) { 
                        result = new (tree_1[_default][_Conditio])(logical, result, next);
                    }
                    else { 
                        return;
                    }
                }
                return result;
            },
            [_negatedC]: function (needsParens) { 
                if (parserInput[_$str](_not)) { 
                    var result = this[_parenthe](needsParens);
                    if (result) { 
                        result[_negate] = !result[_negate];
                    }
                    return result;
                }
            },
            [_parenthe]: function (needsParens) { 
                function tryConditionFollowedByParenthesis(me) { 
                    var body;
                    parserInput[_save]();
                    body = me[_conditio](needsParens);
                    if (!body) { 
                        parserInput[_restore]();
                        return;
                    }
                    if (!parserInput[_$char](_23)) { 
                        parserInput[_restore]();
                        return;
                    }
                    parserInput[_forget]();
                    return body;
                }
                var body;
                parserInput[_save]();
                if (!parserInput[_$str](_26)) { 
                    parserInput[_restore]();
                    return;
                }
                body = tryConditionFollowedByParenthesis(this);
                if (body) { 
                    parserInput[_forget]();
                    return body;
                }
                body = this[_atomicCo](needsParens);
                if (!body) { 
                    parserInput[_restore]();
                    return;
                }
                if (!parserInput[_$char](_23)) { 
                    parserInput[_restore](_expected3 + parserInput[_currentC]() + _19);
                    return;
                }
                parserInput[_forget]();
                return body;
            },
            [_atomicCo]: function (needsParens) { 
                var entities = this[_entities];
                var index = parserInput[_i1];
                var a;
                var b;
                var c;
                var op;
                function cond() { 
                    return this[_addition]() || entities[_keyword]() || entities[_quoted]() || entities[_mixinLoo]();
                }
                cond = cond[_bind](this);
                a = cond();
                if (a) { 
                    if (parserInput[_$char](_33)) { 
                        if (parserInput[_$char](_31)) { 
                            op = _32;
                        }
                        else { 
                            op = _33;
                        }
                    }
                    else if (parserInput[_$char](_28)) { 
                        if (parserInput[_$char](_31)) { 
                            op = _30;
                        }
                        else { 
                            op = _28;
                        }
                    }
                    else if (parserInput[_$char](_31)) { 
                        if (parserInput[_$char](_33)) { 
                            op = _76;
                        }
                        else if (parserInput[_$char](_28)) { 
                            op = _29;
                        }
                        else { 
                            op = _31;
                        }
                    }
                    if (op) { 
                        b = cond();
                        if (b) { 
                            c = new (tree_1[_default][_Conditio])(op, a, b, index, false);
                        }
                        else { 
                            error(_expected4);
                        }
                    }
                    else { 
                        c = new (tree_1[_default][_Conditio])(_31, a, new (tree_1[_default][_Keyword])(_true), index, false);
                    }
                    return c;
                }
            },
            //
            // An operand is anything that can be part of an operation,
            // such as a Color, or a Variable
            //
            [_operand]: function () { 
                var entities = this[_entities];
                var negate;
                if (parserInput[_peek](_$_3)) { 
                    negate = parserInput[_$char](_7);
                }
                var o = this[_sub]() || entities[_dimensio]() ||
                    entities[_color]() || entities[_variable2]() ||
                    entities[_property1]() || entities[_call]() ||
                    entities[_quoted](true) || entities[_colorKey]() ||
                    entities[_mixinLoo]();
                if (negate) { 
                    o[_parensIn] = true;
                    o = new (tree_1[_default][_Negative])(o);
                }
                return o;
            },
            //
            // Expressions either represent mathematical operations,
            // or white-space delimited Entities.
            //
            //     1px solid black
            //     @var * 2
            //
            [_expressi]: function () { 
                var entities = [];
                var e;
                var delim;
                var index = parserInput[_i1];
                do { 
                    e = this[_comment]();
                    if (e) { 
                        entities[_push](e);
                        continue;
                    }
                    e = this[_addition]() || this[_entity]();
                    if (e instanceof tree_1[_default][_Comment]) { 
                        e = null;
                    }
                    if (e) { 
                        entities[_push](e);
                        // operations do not allow keyword "/" dimension (e.g. small/20px) so we support that here
                        if (!parserInput[_peek](_77)) { 
                            delim = parserInput[_$char](_4);
                            if (delim) { 
                                entities[_push](new (tree_1[_default][_Anonymou])(delim, index));
                            }
                        }
                    }
                } while (e);
                if (entities[_length] > 0) { 
                    return new (tree_1[_default][_Expressi1])(entities);
                }
            },
            [_property1]: function () { 
                var name = parserInput[_$re](__a_zA_Z);
                if (name) { 
                    return name[1];
                }
            },
            [_ruleProp]: function () { 
                var name = [];
                var index = [];
                var s;
                var k;
                parserInput[_save]();
                var simpleProperty = parserInput[_$re](__a_zA_Z1);
                if (simpleProperty) { 
                    name = [new (tree_1[_default][_Keyword])(simpleProperty[1])];
                    parserInput[_forget]();
                    return name;
                }
                function match(re) { 
                    var i = parserInput[_i1];
                    var chunk = parserInput[_$re](re);
                    if (chunk) { 
                        index[_push](i);
                        return name[_push](chunk[1]);
                    }
                }
                match(_78);
                while (true) { 
                    if (!match(_w_$_w_)) { 
                        break;
                    }
                }
                if ((name[_length] > 1) && match(___s_)) { 
                    parserInput[_forget]();
                    // at last, we have the complete match now. move forward,
                    // convert name particles to tree objects and return:
                    if (name[0] === '') { 
                        name[_shift]();
                        index[_shift]();
                    }
                    for (k = 0; k < name[_length]; k++) { 
                        s = name[k];
                        name[k] = (s[_charAt](0) !== _43 && s[_charAt](0) !== _$) ?
                            new (tree_1[_default][_Keyword])(s) :
                            (s[_charAt](0) === _43 ?
                                new (tree_1[_default][_Variable1])(_43 + s[_slice](2, -1), index[k], fileInfo) :
                                new (tree_1[_default][_Property])(_$ + s[_slice](2, -1), index[k], fileInfo));
                    }
                    return name;
                }
                parserInput[_restore]();
            }
        }
    };
};
Parser[_serializ] = function (vars) { 
    var s = '';
    for (var name_1 in vars) { 
        if (Object[_hasOwnPr][_call](vars, name_1)) { 
            var value = vars[name_1];
            s += ((name_1[0] === _43) ? '' : _43) + name_1 + _44 + value + ((String(value) [_slice](-1) === _45) ? '' : _45);
        }
    }
    return s;
};
exports[_default] = Parser;
//# sourceMappingURL=parser.js.map
return exports
}],
/* 1834 string _reUsePlu */ "reUsePluginManager",
/* 1835 string _rootFile */ "rootFileInfo",
/* 1836 string _input */ "input",
/* 1837 regexp _$_4 */ /[^\/\\]*$/,
/* 1838 string _rootFile1 */ "rootFilename",
/* 1839 string _importMa */ "importManager",
/* 1840 string _plugins */ "plugins",
/* 1841 string _fileCont */ "fileContent",
/* 1842 less$parse.js */ [10,11,1,121,16,17,18,581,580,29,615,676,21,96,1834,953,1014,1835,663,1836,108,1837,629,1007,1483,1484,1838,22,111,1839,1840,149,1841,1674,705,959,708,696,function(Object,exports,require,Promise,_definePr,__esModu,_value,__import1,__import,_function,_copyOpti,_options,_call,_default,_reUsePlu,_pluginMa,_Parse,_rootFile,_filename,_input,_replace,_$_4,_rewriteU,_rootpath,_currentD,_entryPat,_rootFile1,_slice,_4,_importMa,_plugins,_forEach,_fileCont,_uFEFF_,_Loader,_evalPlug,_addPlugi1,_parse){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var contexts_1 = tslib_1[__import1](require(1037));
var parser_1 = tslib_1[__import1](require(1833));
var plugin_manager_1 = tslib_1[__import1](require(726));
var less_error_1 = tslib_1[__import1](require(945));
var utils = tslib_1[__import](require(636));
function default_1(environment, ParseTree, ImportManager) { 
    var parse = function (input, options, callback) { 
        if (typeof options === _function) { 
            callback = options;
            options = utils[_copyOpti](this[_options], {});
        }
        else { 
            options = utils[_copyOpti](this[_options], options || {});
        }
        if (!callback) { 
            var self_1 = this;
            return new Promise(function (resolve, reject) { 
                parse[_call](self_1, input, options, function (err, output) { 
                    if (err) { 
                        reject(err);
                    }
                    else { 
                        resolve(output);
                    }
                });
            });
        }
        else { 
            var context_1;
            var rootFileInfo = void 0;
            var pluginManager_1 = new plugin_manager_1[_default](this, !options[_reUsePlu]);
            options[_pluginMa] = pluginManager_1;
            context_1 = new contexts_1[_default][_Parse](options);
            if (options[_rootFile]) { 
                rootFileInfo = options[_rootFile];
            }
            else { 
                var filename = options[_filename] || _input;
                var entryPath = filename[_replace](_$_4, '');
                rootFileInfo = { 
                    [_filename]: filename,
                    [_rewriteU]: context_1[_rewriteU],
                    [_rootpath]: context_1[_rootpath] || '',
                    [_currentD]: entryPath,
                    [_entryPat]: entryPath,
                    [_rootFile1]: filename
                };
                // add in a missing trailing slash
                if (rootFileInfo[_rootpath] && rootFileInfo[_rootpath][_slice](-1) !== _4) { 
                    rootFileInfo[_rootpath] += _4;
                }
            }
            var imports_1 = new ImportManager(this, context_1, rootFileInfo);
            this[_importMa] = imports_1;
            // TODO: allow the plugins to be just a list of paths or names
            // Do an async plugin queue like lessc
            if (options[_plugins]) { 
                options[_plugins][_forEach](function (plugin) { 
                    var evalResult, contents;
                    if (plugin[_fileCont]) { 
                        contents = plugin[_fileCont][_replace](_uFEFF_, '');
                        evalResult = pluginManager_1[_Loader][_evalPlug](contents, context_1, imports_1, plugin[_options], plugin[_filename]);
                        if (evalResult instanceof less_error_1[_default]) { 
                            return callback(evalResult);
                        }
                    }
                    else { 
                        pluginManager_1[_addPlugi1](plugin);
                    }
                });
            }
            new parser_1[_default](context_1, imports_1, rootFileInfo)
                [_parse](input, function (e, root) { 
                if (e) { 
                    return callback(e);
                }
                callback(null, root, imports_1, options);
            }, options);
        }
    };
    return parse;
}
exports[_default] = default_1;
;
//# sourceMappingURL=parse.js.map
return exports
}],
/* 1843 string _The_comp */ /* text */ "The compress option has been deprecated. ",
/* 1844 string _We_recom */ /* text */ "We recommend you use a dedicated css minifier, for instance see less-plugin-clean-css.",
/* 1845 string _files */ "files",
/* 1846 less$parse-tree.js */ [10,11,1,15,16,17,18,581,1260,85,19,153,96,115,914,1843,1844,114,1015,164,674,883,953,721,2,1671,676,503,689,1845,46,1838,93,function(Object,exports,require,Boolean,_definePr,__esModu,_value,__import1,_root,_imports,_prototyp,_toCSS,_default,_compress,_warn,_The_comp,_We_recom,_dumpLine,_strictUn,_numPreci,_sourceMa4,_css1,_pluginMa,_getPostP,_length,_process,_options,_map,_getExter,_files,_hasOwnPr,_rootFile1,_push){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var less_error_1 = tslib_1[__import1](require(945));
var transform_tree_1 = tslib_1[__import1](require(1659));
var logger_1 = tslib_1[__import1](require(920));
function default_1(SourceMapBuilder) { 
    var ParseTree = /** @class */ (function () { 
        function ParseTree(root, imports) { 
            this[_root] = root;
            this[_imports] = imports;
        }
        ParseTree[_prototyp][_toCSS] = function (options) { 
            var evaldRoot;
            var result = {};
            var sourceMapBuilder;
            try { 
                evaldRoot = transform_tree_1[_default](this[_root], options);
            }
            catch (e) { 
                throw new less_error_1[_default](e, this[_imports]);
            }
            try { 
                var compress = Boolean(options[_compress]);
                if (compress) { 
                    logger_1[_default][_warn](_The_comp +
                        _We_recom);
                }
                var toCSSOptions = { 
                    [_compress]: compress,
                    [_dumpLine]: options[_dumpLine],
                    [_strictUn]: Boolean(options[_strictUn]),
                    [_numPreci]: 8
                };
                if (options[_sourceMa4]) { 
                    sourceMapBuilder = new SourceMapBuilder(options[_sourceMa4]);
                    result[_css1] = sourceMapBuilder[_toCSS](evaldRoot, toCSSOptions, this[_imports]);
                }
                else { 
                    result[_css1] = evaldRoot[_toCSS](toCSSOptions);
                }
            }
            catch (e) { 
                throw new less_error_1[_default](e, this[_imports]);
            }
            if (options[_pluginMa]) { 
                var postProcessors = options[_pluginMa][_getPostP]();
                for (var i = 0; i < postProcessors[_length]; i++) { 
                    result[_css1] = postProcessors[i] [_process](result[_css1], { [_sourceMa4]: sourceMapBuilder, [_options]: options, [_imports]: this[_imports] });
                }
            }
            if (options[_sourceMa4]) { 
                result[_map] = sourceMapBuilder[_getExter]();
            }
            result[_imports] = [];
            for (var file in this[_imports][_files]) { 
                if (this[_imports][_files][_hasOwnPr](file) && file !== this[_imports][_rootFile1]) { 
                    result[_imports][_push](file);
                }
            }
            return result;
        };
        return ParseTree;
    }());
    return ParseTree;
}
exports[_default] = default_1;
;
//# sourceMappingURL=parse-tree.js.map
return exports
}],
/* 1847 string _queue */ "queue",
/* 1848 string _The_file */ /* text */ "The file ",
/* 1849 string _was_ski */ /* text */ " was skipped because it was not found and the import was marked optional.",
/* 1850 string _Could_no5 */ /* text */ "Could not find a file-manager for ",
/* 1851 string _ext */ "ext",
/* 1852 string _js */ ".js",
/* 1853 string _applicat */ "application/javascript",
/* 1854 string _loadPlug */ "loadPluginSync",
/* 1855 string _loadPlug1 */ "loadPlugin",
/* 1856 string _loadFile1 */ "loadFile",
/* 1857 less$import-manager.js */ [10,11,1,16,17,18,581,580,698,1838,663,1006,678,677,786,544,964,1847,1845,19,93,953,705,715,3,1618,1252,96,915,1848,1849,1219,1260,676,629,1484,1007,950,1483,922,1850,108,1674,983,157,993,991,990,1014,1013,1415,1414,959,1793,1616,696,617,1851,1852,989,1853,1010,1854,1855,1491,1856,532,function(Object,exports,require,_definePr,__esModu,_value,__import1,__import,_less,_rootFile1,_filename,_paths,_contents3,_contents2,_mime,_error,_context,_queue,_files,_prototyp,_push,_pluginMa,_Loader,_splice,_indexOf,_optional2,_rules,_default,_info,_The_file,_was_ski,_inline,_root,_options,_rewriteU,_entryPat,_rootpath,_getFileM1,_currentD,_message,_Could_no5,_replace,_uFEFF_,_getPath,_join,_pathDiff,_isPathAb,_alwaysMa,_Parse,_processI,_referenc,_isPlugin,_evalPlug,_pluginAr,_multiple,_parse,_clone,_ext,_js,_less1,_applicat,_syncImpo,_loadPlug,_loadPlug1,_loadFile,_loadFile1,_then){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var contexts_1 = tslib_1[__import1](require(1037));
var parser_1 = tslib_1[__import1](require(1833));
var less_error_1 = tslib_1[__import1](require(945));
var utils = tslib_1[__import](require(636));
var logger_1 = tslib_1[__import1](require(920));
function default_1(environment) { 
    // FileInfo = {
    //  'rewriteUrls' - option - whether to adjust URL's to be relative
    //  'filename' - full resolved filename of current file
    //  'rootpath' - path to append to normal URLs for this node
    //  'currentDirectory' - path to the current file, absolute
    //  'rootFilename' - filename of the base file
    //  'entryPath' - absolute path to the entry file
    //  'reference' - whether the file should not be output and only output parts that are referenced
    var ImportManager = /** @class */ (function () { 
        function ImportManager(less, context, rootFileInfo) { 
            this[_less] = less;
            this[_rootFile1] = rootFileInfo[_filename];
            this[_paths] = context[_paths] || []; // Search paths, when importing
            this[_contents3] = {}; // map - filename to contents of all the files
            this[_contents2] = {}; // map - filename to lines at the beginning of each file to ignore
            this[_mime] = context[_mime];
            this[_error] = null;
            this[_context] = context;
            // Deprecated? Unused outside of here, could be useful.
            this[_queue] = []; // Files which haven't been imported yet
            this[_files] = {}; // Holds the imported parse trees.
        }
        /**
         * Add an import to be imported
         * @param path - the raw path
         * @param tryAppendExtension - whether to try appending a file extension (.less or .js if the path has no extension)
         * @param currentFileInfo - the current file info (used for instance to work out relative paths)
         * @param importOptions - import options
         * @param callback - callback for when it is imported
         */
        ImportManager[_prototyp][_push] = function (path, tryAppendExtension, currentFileInfo, importOptions, callback) { 
            var importManager = this, pluginLoader = this[_context][_pluginMa][_Loader];
            this[_queue][_push](path);
            var fileParsedFunc = function (e, root, fullPath) { 
                importManager[_queue][_splice](importManager[_queue][_indexOf](path), 1); // Remove the path from the queue
                var importedEqualsRoot = fullPath === importManager[_rootFile1];
                if (importOptions[_optional2] && e) { 
                    callback(null, { [_rules]: [] }, false, null);
                    logger_1[_default][_info](_The_file + fullPath + _was_ski);
                }
                else { 
                    // Inline imports aren't cached here.
                    // If we start to cache them, please make sure they won't conflict with non-inline imports of the
                    // same name as they used to do before this comment and the condition below have been added.
                    if (!importManager[_files][fullPath] && !importOptions[_inline]) { 
                        importManager[_files][fullPath] = { [_root]: root, [_options]: importOptions };
                    }
                    if (e && !importManager[_error]) { 
                        importManager[_error] = e;
                    }
                    callback(e, root, importedEqualsRoot, fullPath);
                }
            };
            var newFileInfo = { 
                [_rewriteU]: this[_context][_rewriteU],
                [_entryPat]: currentFileInfo[_entryPat],
                [_rootpath]: currentFileInfo[_rootpath],
                [_rootFile1]: currentFileInfo[_rootFile1]
            };
            var fileManager = environment[_getFileM1](path, currentFileInfo[_currentD], this[_context], environment);
            if (!fileManager) { 
                fileParsedFunc({ [_message]: _Could_no5 + path });
                return;
            }
            var loadFileCallback = function (loadedFile) { 
                var plugin;
                var resolvedFilename = loadedFile[_filename];
                var contents = loadedFile[_contents3][_replace](_uFEFF_, '');
                // Pass on an updated rootpath if path of imported file is relative and file
                // is in a (sub|sup) directory
                //
                // Examples:
                // - If path of imported file is 'module/nav/nav.less' and rootpath is 'less/',
                //   then rootpath should become 'less/module/nav/'
                // - If path of imported file is '../mixins.less' and rootpath is 'less/',
                //   then rootpath should become 'less/../'
                newFileInfo[_currentD] = fileManager[_getPath](resolvedFilename);
                if (newFileInfo[_rewriteU]) { 
                    newFileInfo[_rootpath] = fileManager[_join]((importManager[_context][_rootpath] || ''), fileManager[_pathDiff](newFileInfo[_currentD], newFileInfo[_entryPat]));
                    if (!fileManager[_isPathAb](newFileInfo[_rootpath]) && fileManager[_alwaysMa]()) { 
                        newFileInfo[_rootpath] = fileManager[_join](newFileInfo[_entryPat], newFileInfo[_rootpath]);
                    }
                }
                newFileInfo[_filename] = resolvedFilename;
                var newEnv = new contexts_1[_default][_Parse](importManager[_context]);
                newEnv[_processI] = false;
                importManager[_contents3][resolvedFilename] = contents;
                if (currentFileInfo[_referenc] || importOptions[_referenc]) { 
                    newFileInfo[_referenc] = true;
                }
                if (importOptions[_isPlugin]) { 
                    plugin = pluginLoader[_evalPlug](contents, newEnv, importManager, importOptions[_pluginAr], newFileInfo);
                    if (plugin instanceof less_error_1[_default]) { 
                        fileParsedFunc(plugin, null, resolvedFilename);
                    }
                    else { 
                        fileParsedFunc(null, plugin, resolvedFilename);
                    }
                }
                else if (importOptions[_inline]) { 
                    fileParsedFunc(null, contents, resolvedFilename);
                }
                else { 
                    // import (multiple) parse trees apparently get altered and can't be cached.
                    // TODO: investigate why this is
                    if (importManager[_files][resolvedFilename]
                        && !importManager[_files][resolvedFilename] [_options][_multiple]
                        && !importOptions[_multiple]) { 
                        fileParsedFunc(null, importManager[_files][resolvedFilename] [_root], resolvedFilename);
                    }
                    else { 
                        new parser_1[_default](newEnv, importManager, newFileInfo) [_parse](contents, function (e, root) { 
                            fileParsedFunc(e, root, resolvedFilename);
                        });
                    }
                }
            };
            var loadedFile;
            var promise;
            var context = utils[_clone](this[_context]);
            if (tryAppendExtension) { 
                context[_ext] = importOptions[_isPlugin] ? _js : _less1;
            }
            if (importOptions[_isPlugin]) { 
                context[_mime] = _applicat;
                if (context[_syncImpo]) { 
                    loadedFile = pluginLoader[_loadPlug](path, currentFileInfo[_currentD], context, environment, fileManager);
                }
                else { 
                    promise = pluginLoader[_loadPlug1](path, currentFileInfo[_currentD], context, environment, fileManager);
                }
            }
            else { 
                if (context[_syncImpo]) { 
                    loadedFile = fileManager[_loadFile](path, currentFileInfo[_currentD], context, environment);
                }
                else { 
                    promise = fileManager[_loadFile1](path, currentFileInfo[_currentD], context, environment, function (err, loadedFile) { 
                        if (err) { 
                            fileParsedFunc(err);
                        }
                        else { 
                            loadFileCallback(loadedFile);
                        }
                    });
                }
            }
            if (loadedFile) { 
                if (!loadedFile[_filename]) { 
                    fileParsedFunc(loadedFile);
                }
                else { 
                    loadFileCallback(loadedFile);
                }
            }
            else if (promise) { 
                promise[_then](loadFileCallback, fileParsedFunc);
            }
        };
        return ImportManager;
    }());
    return ImportManager;
}
exports[_default] = default_1;
;
//# sourceMappingURL=import-manager.js.map
return exports
}],
/* 1858 string _data1 */ "data",
/* 1859 string _Environm */ "Environment",
/* 1860 string _Abstract */ "AbstractFileManager",
/* 1861 string _Abstract1 */ "AbstractPluginLoader",
/* 1862 string _environm */ "environment",
/* 1863 string _Parser */ "Parser",
/* 1864 string _SourceMa */ "SourceMapOutput",
/* 1865 string _SourceMa1 */ "SourceMapBuilder",
/* 1866 string _ParseTre */ "ParseTree",
/* 1867 string _ImportMa */ "ImportManager",
/* 1868 string _render */ "render",
/* 1869 string _LessErro */ "LessError",
/* 1870 string _transfor */ "transformTree",
/* 1871 string _PluginMa */ "PluginManager",
/* 1872 string _logger */ "logger",
/* 1873 less$index.js */ [10,11,1,84,16,17,18,581,580,96,545,727,589,590,591,1858,967,1859,1860,1861,1862,699,1863,710,1606,1864,1865,1866,1867,1868,696,1869,1870,1584,1871,1872,520,19,9,22,21,29,596,948,function(Object,exports,require,Array,_definePr,__esModu,_value,__import1,__import,_default,_v,_version,_major,_minor,_patch,_data1,_tree,_Environm,_Abstract,_Abstract1,_environm,_visitors,_Parser,_function1,_contexts,_SourceMa,_SourceMa1,_ParseTre,_ImportMa,_render,_parse,_LessErro,_transfor,_utils,_PluginMa,_logger,_create,_prototyp,_apply,_slice,_call,_function,_toLowerC,_bind){
 "use strict";
Object[_definePr](exports, __esModu, { [_value]: true });
var tslib_1 = require(611);
var environment_1 = tslib_1[__import1](require(957));
var data_1 = tslib_1[__import1](require(1199));
var tree_1 = tslib_1[__import1](require(1566));
var abstract_file_manager_1 = tslib_1[__import1](require(1005));
var abstract_plugin_loader_1 = tslib_1[__import1](require(982));
var visitors_1 = tslib_1[__import1](require(1656));
var parser_1 = tslib_1[__import1](require(1833));
var functions_1 = tslib_1[__import1](require(1567));
var contexts_1 = tslib_1[__import1](require(1037));
var less_error_1 = tslib_1[__import1](require(945));
var transform_tree_1 = tslib_1[__import1](require(1659));
var utils = tslib_1[__import](require(636));
var plugin_manager_1 = tslib_1[__import1](require(726));
var logger_1 = tslib_1[__import1](require(920));
var source_map_output_1 = tslib_1[__import1](require(675));
var source_map_builder_1 = tslib_1[__import1](require(695));
var parse_tree_1 = tslib_1[__import1](require(1846));
var import_manager_1 = tslib_1[__import1](require(1857));
var parse_1 = tslib_1[__import1](require(1842));
var render_1 = tslib_1[__import1](require(697));
var package_json_1 = require(912);
var parse_node_version_1 = tslib_1[__import1](require(612));
function default_1(environment, fileManagers) { 
    var sourceMapOutput, sourceMapBuilder, parseTree, importManager;
    environment = new environment_1[_default](environment, fileManagers);
    sourceMapOutput = source_map_output_1[_default](environment);
    sourceMapBuilder = source_map_builder_1[_default](sourceMapOutput, environment);
    parseTree = parse_tree_1[_default](sourceMapBuilder);
    importManager = import_manager_1[_default](environment);
    var render = render_1[_default](environment, parseTree, importManager);
    var parse = parse_1[_default](environment, parseTree, importManager);
    var v = parse_node_version_1[_default](_v + package_json_1[_version]);
    var initial = { 
        [_version]: [v[_major], v[_minor], v[_patch]],
        [_data1]: data_1[_default],
        [_tree]: tree_1[_default],
        [_Environm]: environment_1[_default],
        [_Abstract]: abstract_file_manager_1[_default],
        [_Abstract1]: abstract_plugin_loader_1[_default],
        [_environm]: environment,
        [_visitors]: visitors_1[_default],
        [_Parser]: parser_1[_default],
        [_function1]: functions_1[_default](environment),
        [_contexts]: contexts_1[_default],
        [_SourceMa]: sourceMapOutput,
        [_SourceMa1]: sourceMapBuilder,
        [_ParseTre]: parseTree,
        [_ImportMa]: importManager,
        [_render]: render,
        [_parse]: parse,
        [_LessErro]: less_error_1[_default],
        [_transfor]: transform_tree_1[_default],
        [_utils]: utils,
        [_PluginMa]: plugin_manager_1[_default],
        [_logger]: logger_1[_default]
    };
    // Create a public API
    var ctor = function (t) { 
        return function () { 
            var obj = Object[_create](t[_prototyp]);
            t[_apply](obj, Array[_prototyp][_slice][_call](arguments, 0));
            return obj;
        };
    };
    var t;
    var api = Object[_create](initial);
    for (var n in initial[_tree]) { 
        /* eslint guard-for-in: 0 */
        t = initial[_tree][n];
        if (typeof t === _function) { 
            api[n[_toLowerC]()] = ctor(t);
        }
        else { 
            api[n] = Object[_create](null);
            for (var o in t) { 
                /* eslint guard-for-in: 0 */
                api[n][o[_toLowerC]()] = ctor(t[o]);
            }
        }
    }
    /**
     * Some of the functions assume a `this` context of the API object,
     * which causes it to fail when wrapped for ES6 imports.
     *
     * An assumed `this` should be removed in the future.
     */
    initial[_parse] = initial[_parse][_bind](api);
    initial[_render] = initial[_render][_bind](api);
    return api;
}
exports[_default] = default_1;
;
//# sourceMappingURL=index.js.map
return exports
}],
/* 1874 regexp _functio */ /^function[^\(]*?\(([^\)]+?)\)/],function (a, c, s) {
    var A = s[83], T = this, m = s[1], R, E = 11, M = 514, x = s[2], e = s[4], B = s[6], q = s[5], o = s[7], y = s[8];
    if (!(a instanceof A)) return T[c + 1] = function () { return a };
    else if(!a[m]) R = function (){ return function (i) { return T[i]() } };
    else R = function (Q) {
        if (~[E,M][x](c + 1)) return s[c][0];
        var r = s[1873], I, g = [], i, k = a[m] - 1, f = a[k], l = r[e](f);
        if (~a[x](E) || ~a[x](M)) I = {}, I[B] = Q;
        for (i = 0; i < k; i++) g[i] = a[i] === M ? I : a[i] === E ? I[B] : a[i] ? T[a[i]]() : T[0];
        if (l) l = l[1][q](','), g = g[o]([l]);
        r = f[y](I ? I[B] : T[0], g);
        return I ? I[B] : r
    };
    return T[c + 1] = function (S) {
        T[c + 1] = function () { return S };
        return S = {}, S = R(S);
    }
},[this.window||this.globalThis||global])[1872]()["default"]