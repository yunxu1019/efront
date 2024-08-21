var downLevel = require("./downLevel");
var _asert = assert, i = 12;
assert = function (a, b) {
    var d = 1;
    b = b.split(/(?<!\r)\n/), d = b["length"], b = b["join"]("\r\n");
    _asert(a, b, i);
    i += d;
}
var innerJs = new Javascript;
innerJs.defaultType = common.STRAP;
// 运算符
assert(downLevel(`a??b`), 'nullish_(a, b)', true);
assert(downLevel(`a**b`), 'power_(a, b)', true);
assert(downLevel(`a.c**b`), 'power_(a.c, b)', true);
assert(downLevel(`a??=b`), 'a = nullish_(a, b)', true);
assert(downLevel(`a**=b`), 'a = power_(a, b)', true);
assert(downLevel(`a+=b+c**d`), 'a += b + power_(c, d)', true);
assert(downLevel(`a(c**=d)`), 'a(c = power_(c, d))', true);
assert(downLevel(`a(c.b.d**=d)`), 'a((_ = c.b, _.d = power_(_.d, d)))\r\nvar _', true);
assert(downLevel(`a(c.b[a.b]**=d)`), 'a((_ = c.b, _[_0 = a.b] = power_(_[_0], d)))\r\nvar _, _0', true);
assert(downLevel(`c.b[a.b]**=d`), '_ = c.b, _[_0 = a.b] = power_(_[_0], d)\r\nvar _, _0', true);
i++// 声明及解构
assert(downLevel(`var [data, args, strs] = breakcode(data, occurs), strs = []`), 'var _ = breakcode(data, occurs), data = _[0], args = _[1], strs = _[2], strs = []\r\nvar _');
assert(downLevel(`var [name, type, options] = piece, key, repeat;`), 'var name = piece[0], type = piece[1], options = piece[2], key, repeat;');
assert(downLevel(`var [] = piece, key,[]= repeat;`), 'var key;');
assert(downLevel(`var [] = piece, key,[]`), 'var key');
assert(downLevel(`const`), 'const');
assert(downLevel(`let`), 'let');
assert(downLevel(`var`), '');
assert(downLevel(`new.target`), 'undefined');
assert(downLevel(`{let a; function b(){a};return;}`), `if (tmp = 0, tmp0 =function (a) { a; function b() { a }; return tmp = 1, void 0; }(a)) { if (tmp === 1) return tmp0; }
var tmp, a, tmp0`);
assert(downLevel(`const a,b,c`), 'var a, b, c');
assert(downLevel(`let a,b,c`), 'var a, b, c');
assert(downLevel(`for(let a in b)`), 'for (var a in b)');
assert(downLevel(`a;for(let a in b)`), 'a; for (var a0 in b)');
assert(downLevel(`for(let a in b)setTimeout(function(){console.log(a)})`), 'for (var a in b)(function (a) { setTimeout(function () { console.log(a) }) }(a))\r\nvar tmp, a');
assert(downLevel(`var a;{let a,b,c}`), 'var a; { var a0 = undefined, b = undefined, c = undefined }');
assert(downLevel(`var a;{let {a,b},c=1}`), 'var a; { var a0 = undefined, b = undefined, c = 1 }');
assert(downLevel(`var a;{let {a,b},c}`), 'var a; { var a0 = undefined, b = undefined, c = undefined }');
assert(downLevel(`var {a,b,c}`), 'var a, b, c');
assert(downLevel(`let {a,b,c}`), 'var a, b, c');
assert(downLevel(`const {a,b,c}`), 'var a, b, c');
assert(downLevel(`var [a,b,c]`), 'var a, b, c');
assert(downLevel(`var [a,b,c];`), 'var a, b, c;');
assert(downLevel(`var [a,b,c],{d,e,f};`), 'var a, b, c, d, e, f;');
assert(downLevel(`var {1:a}`), 'var a');
assert(downLevel(`var {c:a}`), 'var a');
assert(downLevel(`var {a}=b`), 'var a = b.a');
assert(downLevel(`var {a}=1`), 'var a = 1 .a');
assert(downLevel(`var {a}=1.1`), 'var a = 1.1.a');
assert(downLevel(`var {c:a}=b`), 'var a = b.c');
assert(downLevel(`[...[a]]=[1]`), 'a = [1][0]');
assert(downLevel(`[...[a]]=[...[1]]`), 'a = [1][0]');
assert(downLevel(`[a[a]]=[1]`), 'a[a] = [1][0]');
assert(downLevel(`[a,b]=[b,a]`), '_ = [b, a], a = _[0], b = _[1]\r\nvar _');
assert(downLevel(`var {c:a=2}=b`), 'var _ = b.c, a = _ !== undefined ? _ : 2\r\nvar _');
assert(downLevel(`var {"c":a}=b`), 'var a = b["c"]');
assert(downLevel(`var {1:a}=b`), 'var a = b[1]');
assert(downLevel(`var [,a]=b`), 'var a = b[1]');
assert(downLevel(`var {[c]:a}=b`), 'var a = b[c]');
assert(downLevel(`var {1:a}=b`), 'var a = b[1]');
assert(downLevel(`var {.1:a}=b`), 'var a = b[.1]');
assert(downLevel(`var {a,[a]:c}=b`), 'var a = b.a, c = b[a]');
assert(downLevel(`var {a}=a`), 'var a = a.a');
assert(downLevel(`var {a,b}=a`), 'var _ = a, a = a.a, b = _.b\r\nvar _');
assert(downLevel(`var {a:{a:{a}}}=b`), 'var a = b.a.a.a');
assert(downLevel(`var {a,[a]:c}={}`), 'var _ = {}, a = _.a, c = _[a]\r\nvar _');
assert(downLevel(`={a,[a]:c}={}`), '= _ = {}, a = _.a, c = _[a]\r\nvar _');
var tmp = scanner2(`var {window}=this`); tmp.helpcode = false; tmp.detour(); assert(downLevel.code(tmp).toString(), `var window = this["window"]`);
assert(downLevel(`function (){var [a]=a;}`), "function () { var a = a[0]; }")
i++// 参数解构
assert(downLevel(`function ([a]){}`), "function (arg) { var a = arg[0]; }")
assert(downLevel(`function ([a],b){}`), "function (arg0, b) { var a = arg0[0]; }")
assert(downLevel(`function ([a],{b}){}`), "function (arg0, arg1) { var a = arg0[0], b = arg1.b; }")
assert(downLevel(`function (){var {a},{b};}`), "function () { var a, b; }")
assert(downLevel(`function (){var {a}=a,{b}=a;}`), "function () { var a = a.a, b = a.b; }")
assert(downLevel(`function (a=b){}`), "function (a) { if (a === undefined) a = b; }")
assert(downLevel(`function (a=b,[c],d,e=f){}`), "function (a, arg1, d, e) { if (a === undefined) a = b; var c = arg1[0]; if (e === undefined) e = f; }")
assert(downLevel(`function (arg1=b,[c],d,e=f){}`), "function (arg1, arg2, d, e) { if (arg1 === undefined) arg1 = b; var c = arg2[0]; if (e === undefined) e = f; }")
i++// class降级
assert(downLevel(`class a {}`), "function a() {}")
var tmp = scanner2('export class a{a(){}}'); tmp.fix(); assert(downLevel.code(tmp).toString(), `exports.a = function (a) { a["prototype"].a = function () {}\r\nreturn a }(function a() {})`);
assert(downLevel(`class a { static{ a.a=1}}`), "function a() {}; (function () { a.a = 1 }())")
assert(downLevel(`if(a) a = 1; class a {}`), "if (a) a = 1; function a() {}")
assert(downLevel(`async function(){if(a) a = 1; class a {}}`), `function () { return async_(
function () {
a = function () {}; if (!a) return [1, 0]; a = 1; return [1, 0]
})
var a, _0 }`)
assert(downLevel(`if(a) class b{ c(){}};`), `if (a) var b = function (b) { b["prototype"].c = function () {}\r\nreturn b }(function b() {});`)
assert(downLevel(`class a {a=1}`), "function a() { this.a = 1 }")
assert(downLevel(`class a {a=1; b(){}}`), `function a() { this.a = 1; }; a["prototype"].b = function () {}`)
assert(downLevel(`=class a {a=1; b(){}}`), `= function (a) { a["prototype"].b = function () {}\r\nreturn a }(function a() { this.a = 1; })`)
assert(downLevel(`var a=class {a=1; static b=2 b(){}};`), `var a = function (cls0) { cls0.b = 2\r\ncls0["prototype"].b = function () {}\r\nreturn cls0 }(function () { this.a = 1; });`)
assert(downLevel(`var a=class { constructor(){this.a=1}; static b=2 b(){}};`), `var a = function (cls0) { cls0.b = 2\r\ncls0["prototype"].b = function () {}\r\nreturn cls0 }(function () { this.a = 1 });`)
assert(downLevel(`class a {static b(){}}`), "function a() {}; a.b = function () {}")
assert(downLevel(`class a extends b{}`), `function a() {
var this_ = b["apply"](this, arguments) || this;
return this_ }; extends_(a, b)`);
assert(downLevel(`class a extends class b{}{}`), `var a = function (b, a) { extends_(a, b)\r\nreturn a }(function b() {}, function a() {
var this_ = b["apply"](this, arguments) || this;
return this_ })`);
assert(downLevel(`class a {get a(){}}`), `function a() {};
Object["defineProperty"](a["prototype"], "a", (tmp = {}, tmp["get"] = function () {}, tmp))
var tmp`);
assert(downLevel(`class a {set a(){}}`), `function a() {};
Object["defineProperty"](a["prototype"], "a", (tmp = {}, tmp["set"] = function () {}, tmp))
var tmp`);
assert(downLevel(`class a {get a(){}; get b(){}; set a(){}}`), `function a() {};
Object["defineProperty"](a["prototype"], "a", (tmp = {}, tmp["get"] = function () {}, tmp["set"] = function () {}, tmp));
Object["defineProperty"](a["prototype"], "b", (tmp = {}, tmp["get"] = function () {}, tmp));
var tmp`);
assert(downLevel(`class a {set a(){}; get b(){}; set a(){}}`), `function a() {};
Object["defineProperty"](a["prototype"], "a", (tmp = {}, tmp["set"] = function () {}, tmp["set"] = function () {}, tmp));
Object["defineProperty"](a["prototype"], "b", (tmp = {}, tmp["get"] = function () {}, tmp));
var tmp`);
i++// 属性降级
assert(downLevel(`return ({b,async a(){}})`), `return ((_ = {},
_.b = b,
_.a = function () { return async_() }, _))\r\nvar _`);
assert(downLevel(`var a={b,async a(){}}`), `var a = (_ = {},
_.b = b,
_.a = function () { return async_() }, _)\r\nvar _`);
assert(downLevel(`var a={b:a=>b,c}`), `var a = (_ = {},
_.b = function (a) { return b },
_.c = c, _)\r\nvar _`);
assert(downLevel(`={b,async a(){}}`), `= (_ = {},
_.b = b,
_.a = function () { return async_() }, _)\r\nvar _`);
assert(downLevel(`={async [a](){}}`), `= (_ = {},
_[a] = function () { return async_() }, _)\r\nvar _`);
assert(downLevel(`={[a]:b}`), `= (_ = {},
_[a] = b, _)\r\nvar _`);
assert(downLevel(`={a:1,[a]:1}`), `= (_ = { a: 1 },
_[a] = 1, _)\r\nvar _`);
assert(downLevel(`={a,[a]:1}`), `= (_ = {},
_.a = a,
_[a] = 1, _)\r\nvar _`);
assert(downLevel(`={[a]:{[b]:1}}`), `= (_ = {},
_[a] = (_0 = {},
_0[b] = 1, _0), _)\r\nvar _, _0`);
assert(downLevel(`={[a]:{[b]:{[c]:1}}}`), `= (_ = {},
_[a] = (_0 = {},
_0[b] = (_1 = {},
_1[c] = 1, _1), _0), _)\r\nvar _, _0, _1`);
assert(downLevel(`={[a]:{[b]:{[c]:1}},[b]:{[a]:1}}`), `= (_ = {},
_[a] = (_0 = {},
_0[b] = (_1 = {},
_1[c] = 1, _1), _0),
_[b] = (_0 = {},
_0[a] = 1, _0), _)\r\nvar _, _0, _1`);
i++// 对象展开
assert(downLevel(`={ok:ok}`), `= { ok: ok }`);
assert(downLevel(`={...a}`), `= extend({}, a)`);
assert(downLevel(`={...a&&b}`), `= extend({}, a && b)`);
assert(downLevel(`()=>({\r\nfileName: entry.fileName,\r\ntextSpan: highlightSpan.textSpan,\r\nisWriteAccess: highlightSpan.kind === "writtenReference" /* writtenReference */,\r\n...highlightSpan.isInString && { isInString: true },\r\n...highlightSpan.contextSpan && { contextSpan: highlightSpan.contextSpan }})`), `function () { return (extend({
fileName: entry.fileName,
textSpan: highlightSpan.textSpan,
isWriteAccess: highlightSpan.kind === "writtenReference" /* writtenReference */ }, highlightSpan.isInString && { isInString: true }, highlightSpan.contextSpan && { contextSpan: highlightSpan.contextSpan })) }`);
assert(downLevel(`async()=>({ [argitem.sort ? argitem.sort : 'date']: "desc" })`), `function () { return async_(
function () {
_ = {}; if (!argitem.sort) return [1, 0]; _1 = argitem.sort; return [2, 0]
},
function () {
_1 = 'date'; return [1, 0]
},
function () {
_[_1] = "desc"; _0 = _; return [_0, 2]
})
var _0, _1 }
var _`);
assert(downLevel(`={...{a:1}}`), `= extend({}, { a: 1 })`);
assert(downLevel(`={...a,...c}`), `= extend({}, a, c)`);
assert(downLevel(`={a:a,...b,c}`), `= (_ = extend({ a: a }, b),\r\n_.c = c, _)\r\nvar _`);
assert(downLevel(`={...b,c,...d,e}`), `= (_ = extend({}, b),\r\n_.c = c, extend(_, d),\r\n_.e = e, _)\r\nvar _`);
assert(downLevel(`={...a,b}`), `= (_ = extend({}, a),
_.b = b, _)\r\nvar _`);
assert(downLevel(`={...a,b,...c}`), `= (_ = extend({}, a),
_.b = b, extend(_, c), _)\r\nvar _`);
assert(downLevel(`={...a,...c,b}`), `= (_ = extend({}, a, c),
_.b = b, _)\r\nvar _`);
assert(downLevel(`={...{},...c,b}`), `= (_ = extend({}, {}, c),
_.b = b, _)\r\nvar _`);
assert(downLevel(`={a(){},get c(){},b}`), `= (_ = {},
_.a = function () {},
Object["defineProperty"](_, "c", (_0 = {}, _0["get"] = function () {}, _0)),
_.b = b, _)\r\nvar _, _0`);
assert(downLevel(`if(){Promise.reslove({get then() {}})}`), `if () { Promise.reslove((_ = {},\r\nObject["defineProperty"](_, "then", (_0 = {}, _0["get"] = function () {}, _0)), _)) }\r\nvar _, _0`)
assert(downLevel(`=[...a]`), `var slice_ = Array["prototype"]["slice"];\r\n= slice_["call"](a)`)
assert(downLevel(`let a = [...a,...a()];`), `var slice_ = Array["prototype"]["slice"];\r\nvar a = slice_["call"](a)["concat"](slice_["call"](a()));`)
assert(downLevel(`=[...a,...b]`), `var slice_ = Array["prototype"]["slice"];\r\n= slice_["call"](a)["concat"](slice_["call"](b))`)
assert(downLevel(`=[a,...b]`), `var slice_ = Array["prototype"]["slice"];\r\n= [a]["concat"](slice_["call"](b))`)
assert(downLevel(`=[a,...b,...c]`), `var slice_ = Array["prototype"]["slice"];\r\n= [a]["concat"](slice_["call"](b), slice_["call"](c))`)
assert(downLevel(`=[a,b,...c]`), `var slice_ = Array["prototype"]["slice"];\r\n= [a, b]["concat"](slice_["call"](c))`)
assert(downLevel(`=[a,b,...c,d]`), `var slice_ = Array["prototype"]["slice"];\r\n= [a, b]["concat"](slice_["call"](c), [d])`)
assert(downLevel(`=[a,b,...c,d,e,f]`), `var slice_ = Array["prototype"]["slice"];\r\n= [a, b]["concat"](slice_["call"](c), [d, e, f])`)
assert(downLevel(`=[a,b,...c,d,e,f,...g]`), `var slice_ = Array["prototype"]["slice"];\r\n= [a, b]["concat"](slice_["call"](c), [d, e, f], slice_["call"](g))`)
assert(downLevel(`=[a,b,...c,d,...e]`), `var slice_ = Array["prototype"]["slice"];\r\n= [a, b]["concat"](slice_["call"](c), [d], slice_["call"](e))`)
assert(downLevel(`a(...b)`), `a["apply"](null, b)`)
assert(downLevel(`a(..."b,c".split(","))`), `a["apply"](null, "b,c".split(","))`)
assert(downLevel(`new a(...args)`), `var slice_ = Array["prototype"]["slice"];\r\nnew (a['bind']['apply'](a, [null]["concat"](slice_["call"](args))))`)
assert(downLevel(`a(c,d,e,...b(...c))`), `var slice_ = Array["prototype"]["slice"];\r\na["apply"](null, [c, d, e]["concat"](slice_["call"](b["apply"](null, c))))`)
assert(downLevel(`a(c,d,e,...b.a(...c))`), `var slice_ = Array["prototype"]["slice"];\r\na["apply"](null, [c, d, e]["concat"](slice_["call"](b.a["apply"](b, c))))`)
assert(downLevel(`a(c,d,e,...b.a.c(...c))`), `var slice_ = Array["prototype"]["slice"];\r\na["apply"](null, [c, d, e]["concat"](slice_["call"]((_ = b.a).c["apply"](_, c))))\r\nvar _`)
assert(downLevel(`a(...b,...c)`), `var slice_ = Array["prototype"]["slice"];\r\na["apply"](null, slice_["call"](b)["concat"](slice_["call"](c)))`)
assert(downLevel(`a(...b,c)`), `var slice_ = Array["prototype"]["slice"];\r\na["apply"](null, slice_["call"](b)["concat"]([c]))`)
assert(downLevel(`getPendingExpressions()[_push](...flattenCommaList(expr));`), `(_ = getPendingExpressions())[_push]["apply"](_, flattenCommaList(expr));\r\nvar _`)
assert(downLevel(`a(b,...c)`), `var slice_ = Array["prototype"]["slice"];\r\na["apply"](null, [b]["concat"](slice_["call"](c)))`)
assert(downLevel(`a(a,b,...c,d,...e)`), `var slice_ = Array["prototype"]["slice"];\r\na["apply"](null, [a, b]["concat"](slice_["call"](c), [d], slice_["call"](e)))`)
assert(downLevel(`a["call"](a,b,...c,d,...e)`), `var slice_ = Array["prototype"]["slice"];\r\na["call"]["apply"](a, [a, b]["concat"](slice_["call"](c), [d], slice_["call"](e)))`)
assert(downLevel(`a.b(a,b,...c,d,...e)`), `var slice_ = Array["prototype"]["slice"];\r\na.b["apply"](a, [a, b]["concat"](slice_["call"](c), [d], slice_["call"](e)))`)
assert(downLevel(`[].b(a,b,...c,d,...e)`), `var slice_ = Array["prototype"]["slice"];\r\n(_ = []).b["apply"](_, [a, b]["concat"](slice_["call"](c), [d], slice_["call"](e)))\r\nvar _`)
assert(downLevel(`a(...b).c(...d)`), `(_ = a["apply"](null, b)).c["apply"](_, d)\r\nvar _`)
assert(downLevel(`a(...b).c(...d).e(...f)`), `(_ = (_ = a["apply"](null, b)).c["apply"](_, d)).e["apply"](_, f)\r\nvar _`)
assert(downLevel(`diagnostic.relatedInformation.push(...relatedInformation);`), `(_ = diagnostic.relatedInformation).push["apply"](_, relatedInformation);\r\nvar _`);
assert(downLevel(`const typeNames = [79 /* Identifier */, ...typeKeywords];`), `var slice_ = Array["prototype"]["slice"];\r\nvar typeNames = [79 /* Identifier */]["concat"](slice_["call"](typeKeywords));`);
i++// 箭头函数
assert(downLevel(`a=>k`), "function (a) { return k }")
assert(downLevel(`function (a,...b,b){}`), `function (a, b) { b = arguments["length"] > 1 ? arguments[arguments["length"] - 1] : undefined; }`)
assert(downLevel(`(a)=>k`), "function (a) { return k }")
assert(downLevel(`(a=1)=>k`), "function (a) { if (a === undefined) a = 1; return k }")
assert(downLevel(`([a])=>b`), "function (arg) { var a = arg[0]; return b }")
assert(downLevel(`map(([a])=>a)`), "map(function (arg) { var a = arg[0]; return a })")
assert(downLevel(`var [_, R, G, B, A] = rgbHex.exec(color).map(a => parseInt(a + a, 16));`), "var _0 = rgbHex.exec(color).map(function (a) { return parseInt(a + a, 16) }), _ = _0[0], R = _0[1], G = _0[2], B = _0[3], A = _0[4];\r\nvar _0")
assert(downLevel(`if (/^(?:select|input|textarea)$/i.test(initialEvent.target.tagName) || getTargetIn(a => a.nodrag || a.hasAttribute('nodrag'), initialEvent.target)) return;`), "if (/^(?:select|input|textarea)$/i.test(initialEvent.target.tagName) || getTargetIn(function (a) { return a.nodrag || a.hasAttribute('nodrag') }, initialEvent.target)) return;")
i++// 对象收集
assert(downLevel(`function (a,...b){}`), `var slice_ = Array["prototype"]["slice"];\r\nfunction (a) { var b = slice_["call"](arguments, 1); }`)
assert(downLevel(`function (a,...b,c){}`), `var slice_ = Array["prototype"]["slice"];\r\nfunction (a, c) { var b = slice_["call"](arguments, 1, -1); c = arguments["length"] > 1 ? arguments[arguments["length"] - 1] : undefined; }`)
assert(downLevel(`function (a,...,c){}`), `function (a, c) { c = arguments["length"] > 1 ? arguments[arguments["length"] - 1] : undefined; }`)
assert(downLevel(`(...a) => k`), `var slice_ = Array["prototype"]["slice"];\r\nfunction () { var a = slice_["call"](arguments, 0); return k }`)
assert(downLevel(`for await(o of os) noSymbol`), `return async_(
function () {
return [8, 8]
},
function () {
_2 = Symbol["asyncIterator"]; _2 = os[_2]; if (_2) return [1, 0]; _2 = Symbol["iterator"]; _2 = os[_2]; if (_2) return [1, 0]; _2 = Array["prototype"]; _3 = Symbol["iterator"]; _2 = _2[_3]
},
function () {
_0 = _2; _0 = _0["call"](os); _2 = _0["next"](); return [_2, 1]
},
function (_1) {
_2 = _1; _ = _2; return [1, 0]
},
function () {
_2 = !_["done"]; if (!_2) return [2, 0]; _2 = _["value"]; return [_2, 1]
},
function (_1) {
_2 = _1; o = _2; _2 = true
},
function () {
if (!_2) return [2, 0]; noSymbol; _2 = _0["next"](); return [_2, 1]
},
function (_1) {
_2 = _1; _ = _2; return [-3, 0]
},
function () {
return [0, 9]
},
function () {
_2 = _; if (!_2) return [1, 0]; _2 = !_["done"]; if (!_2) return [1, 0]; _2 = _0["return"]; _2 = isFunction(_2)
},
function () {
if (!_2) return [1, 0]; _2 = _0["return"](); return [1, 0]
},
function () {
return [1, 9]
})
var _, _0, _2, _3`)
assert(downLevel(`for await(var [o,s] of os) noSymbol`), `return async_(
function () {
return [11, 8]
},
function () {
o; s; _5 = Symbol["asyncIterator"]; _5 = os[_5]; if (_5) return [1, 0]; _5 = Symbol["iterator"]; _5 = os[_5]; if (_5) return [1, 0]; _5 = Array["prototype"]; _6 = Symbol["iterator"]; _5 = _5[_6]
},
function () {
_0 = _5; _0 = _0["call"](os); _5 = _0["next"](); return [_5, 1]
},
function (_4) {
_5 = _4; _ = _5; return [1, 0]
},
function () {
_5 = !_["done"]; if (!_5) return [5, 0]; _5 = _["value"]; return [_5, 1]
},
function (_4) {
_5 = _4; _1 = _5; _6 = Symbol["iterator"]; _6 = _1[_6]; if (_6) return [1, 0]; _6 = Array["prototype"]; _7 = Symbol["iterator"]; _6 = _6[_7]
},
function () {
_2 = _6["call"](_1); _3 = undefined; _3 = _2["next"](); o = _3["value"]; _3 = _2["next"](); s = _3["value"]; _10 = !_3; if (_10) return [1, 0]; _10 = !_3["done"]
},
function () {
if (!_10) return [1, 0]; _10 = _2["return"]; _10 = isFunction(_10); if (!_10) return [1, 0]; _10 = _2["return"]()
},
function () {
_3 = _10; _5 = true
},
function () {
if (!_5) return [2, 0]; noSymbol; _5 = _0["next"](); return [_5, 1]
},
function (_4) {
_5 = _4; _ = _5; return [-6, 0]
},
function () {
return [0, 9]
},
function () {
_5 = _; if (!_5) return [1, 0]; _5 = !_["done"]; if (!_5) return [1, 0]; _5 = _0["return"]; _5 = isFunction(_5)
},
function () {
if (!_5) return [1, 0]; _5 = _0["return"](); return [1, 0]
},
function () {
return [1, 9]
})
var o, s, _, _0, _1, _2, _3, _5, _6, _7, _8, _9, _10`);
assert(downLevel(`for(o of os) noSymbol`), `for (_ = 0; _ < os["length"] && (o = os[_], true); _++) noSymbol\r\nvar _, _0`)
assert(downLevel(`for(var o of os) Symbol`), `try { for (var o, _0 = os[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]], _0 = _0["call"](os), _ = _0["next"](); !_["done"] && (o = _["value"], true); _ = _0["next"]()) Symbol } finally { if (_ && !_["done"] && isFunction(_0["return"])) _0["return"]() }\r\nvar _, _0`)
assert(downLevel(`for(var o of os) Symbol`), `try { for (var o, _0 = os[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]], _0 = _0["call"](os), _ = _0["next"](); !_["done"] && (o = _["value"], true); _ = _0["next"]()) Symbol } finally { if (_ && !_["done"] && isFunction(_0["return"])) _0["return"]() }\r\nvar _, _0`)
assert(downLevel(`for(var o of o)Symbol`), `try { for (var o, _1 = o, _0 = _1[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]], _0 = _0["call"](_1), _ = _0["next"](); !_["done"] && (o = _["value"], true); _ = _0["next"]()) Symbol } finally { if (_ && !_["done"] && isFunction(_0["return"])) _0["return"]() }\r\nvar _, _0, _1`)
assert(downLevel(`for(var [a] of os)Symbol`), `try { for (var a, _0 = os[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]], _0 = _0["call"](os), _ = _0["next"](); !_["done"] && (_1 = _["value"], _2 = (_1[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]])["call"](_1), _3 = undefined, _3 = _2["next"](), a = _3["value"], _3 = (!_3 || !_3["done"]) && isFunction(_2["return"]) && _2["return"](), true); _ = _0["next"]()) Symbol } finally { if (_ && !_["done"] && isFunction(_0["return"])) _0["return"]() }
var _, _0, _1, _2, _3`)
assert(downLevel(`for(var [a,b] of os)Symbol`), `try { for (var a, b, _0 = os[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]], _0 = _0["call"](os), _ = _0["next"](); !_["done"] && (_1 = _["value"], _2 = (_1[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]])["call"](_1), _3 = undefined, _3 = _2["next"](), a = _3["value"], _3 = _2["next"](), b = _3["value"], _3 = (!_3 || !_3["done"]) && isFunction(_2["return"]) && _2["return"](), true); _ = _0["next"]()) Symbol } finally { if (_ && !_["done"] && isFunction(_0["return"])) _0["return"]() }
var _, _0, _1, _2, _3`)
assert(downLevel(`[...a]=a`), `var slice_ = Array["prototype"]["slice"];\r\na = slice_["call"](a, 0)`)
assert(downLevel(`[c,...a]=a`), `var slice_ = Array["prototype"]["slice"];\r\nc = a[0], a = slice_["call"](a, 1)`)
assert(downLevel(`[...a]=a`), `var slice_ = Array["prototype"]["slice"];\r\na = slice_["call"](a, 0)`)
assert(downLevel(`[...a,c]=a`), `var slice_ = Array["prototype"]["slice"];\r\n_ = a, a = slice_["call"](a, 0, -1), c = _["length"] > 1 ? _[_["length"] - 1] : undefined\r\nvar _`)
assert(downLevel(`{...a,c}=a`), `c = a.c, a = rest_(a, ["c"])`)
assert(downLevel(`{c,...a}=a`), `c = a.c, a = rest_(a, ["c"])`)
assert(downLevel("if(a){}[r, g, b] = rgb4s(r, g, b, s)"), "if (a) {} _ = rgb4s(r, g, b, s), r = _[0], g = _[1], b = _[2]\r\nvar _", true);
assert(downLevel(`{c,[c]:b,...a}=a`), `c = a.c, b = a[c], a = rest_(a, ["c", c])`)
assert(downLevel(`async()=>name = require("./$split")(name)["join"]("/");`), `function () { return async_(
function () {
_0 = require("./$split"); _0 = _0(name); name = _0["join"]("/"); return [name, 2]
})
var _0 };`);
i++//异步或步进函数
assert(downLevel(`function *(){yield *a}`), `function () { return aster_(
function () {
return [9, 8]
},
function () {
_; _3 = Symbol["asyncIterator"]; _3 = a[_3]; if (_3) return [1, 0]; _3 = Symbol["iterator"]; _3 = a[_3]; if (_3) return [1, 0]; _3 = Array["prototype"]; _4 = Symbol["iterator"]; _3 = _3[_4]
},
function () {
_1 = _3; _1 = _1["call"](a); _3 = _1["next"](); return [_3, 1]
},
function (_2) {
_3 = _2; _0 = _3; return [1, 0]
},
function () {
_3 = !_0["done"]; if (!_3) return [2, 0]; _3 = _0["value"]; return [_3, 1]
},
function (_2) {
_3 = _2; _ = _3; _3 = true
},
function () {
if (!_3) return [3, 0]; return [_, 3]
},
function () {
_3 = _1["next"](); return [_3, 1]
},
function (_2) {
_3 = _2; _0 = _3; return [-4, 0]
},
function () {
return [0, 9]
},
function () {
_3 = _0; if (!_3) return [1, 0]; _3 = !_0["done"]; if (!_3) return [1, 0]; _3 = _1["return"]; _3 = isFunction(_3)
},
function () {
if (!_3) return [1, 0]; _3 = _1["return"](); return [1, 0]
},
function () {
return [1, 9]
})
var _, _0, _1, _3, _4 }`)
assert(downLevel(`async function(){}`), `function () { return async_() }`)
assert(downLevel(`async function(){for(var a of b){Symbol}}`), `function () { return async_(
function () {
return [5, 8]
},
function () {
a; _2 = Symbol["iterator"]; _2 = b[_2]; if (_2) return [1, 0]; _2 = Array["prototype"]; _3 = Symbol["iterator"]; _2 = _2[_3]
},
function () {
_0 = _2; _0 = _0["call"](b); _ = _0["next"](); return [1, 0]
},
function () {
_2 = !_["done"]; if (!_2) return [1, 0]; a = _["value"]; _2 = true
},
function () {
if (!_2) return [1, 0]; Symbol; _ = _0["next"](); return [-1, 0]
},
function () {
return [0, 9]
},
function () {
_2 = _; if (!_2) return [1, 0]; _2 = !_["done"]; if (!_2) return [1, 0]; _2 = _0["return"]; _2 = isFunction(_2)
},
function () {
if (!_2) return [1, 0]; _2 = _0["return"](); return [1, 0]
},
function () {
return [1, 9]
})
var a, _, _0, _2, _3 }`)
assert(downLevel(`a={async a(){var b =c;return 1}}`), `a = (_ = {},
_.a = function () { return async_(\r\nfunction () {\r\nb = c; return [1, 2]\r\n})\r\nvar b }, _)\r\nvar _`)
assert(downLevel(`async function(){return 1}`), `function () { return async_(\r\nfunction () {\r\nreturn [1, 2]\r\n}) }`)
assert(downLevel(`async function(a){await a}`), `function (a) { return async_(\r\nfunction () {\r\n_0 = a; return [_0, 1]\r\n})\r\nvar _0 }`)
assert(downLevel(`async function(a){return await a}`), `function (a) { return async_(\r\nfunction () {\r\n_0 = a; return [_0, 1]\r\n},\r\nfunction (_) {\r\n_0 = _; return [_0, 2]\r\n})\r\nvar _0 }`)
assert(downLevel(`async function(a){await a,await b}`), `function (a) { return async_(\r\nfunction () {\r\n_0 = a; return [_0, 1]\r\n},\r\nfunction (_) {\r\n_0 = _; _0 = b; return [_0, 1]\r\n})\r\nvar _0 }`)
assert(downLevel(`async function(){await a,await b}`), `function () { return async_(\r\nfunction () {\r\n_0 = a; return [_0, 1]\r\n},\r\nfunction (_) {\r\n_0 = _; _0 = b; return [_0, 1]\r\n})\r\nvar _0 }`)
assert(downLevel(`async function(a){ if(c)await a,await b;else if(s) await c;}`), `function (a) { return async_(
function () {
if (!c) return [3, 0]; _0 = a; return [_0, 1]
},
function (_) {
_0 = _; _0 = b; return [_0, 1]
},
function (_) {
_0 = _; return [3, 0]
},
function () {
if (!s) return [2, 0]; _0 = c; return [_0, 1]
},
function (_) {
_0 = _; return [1, 0]
})
var _0 }`)
assert(downLevel(`async function(a){ for(var i=1;i<2;i++) await 1 }`), `function (a) { return async_(\r\nfunction () {\r\ni = 1; return [1, 0]\r\n},\r\nfunction () {\r\n_0 = i < 2; if (!_0) return [2, 0]; _0 = 1; return [_0, 1]\r\n},\r\nfunction (_) {\r\n_0 = _; _0 = i++; return [-1, 0]\r\n})\r\nvar i, _0 }`)
assert(downLevel('async function(){ if(b); else {if (a){}else{location = getRequestProtocol(url) + "//" + location;}}}'), `function () { return async_(
function () {
if (!b) return [1, 0]; return [3, 0]
},
function () {
if (!a) return [1, 0]; return [2, 0]
},
function () {
_1 = getRequestProtocol(url); _0 = _1 + "//", location = _0 + location; return [1, 0]
})
var _0, _1 }`);
assert(downLevel("var{a}=await b"), `return async_(
function () {
_0 = b; return [_0, 1]
},
function (_) {
_0 = _; _0 = _0.a; a = _0
})
var a, _0`)
assert(downLevel(`async a=>await a`), `function (a) { return return async_(
function () {
_0 = a; return [_0, 1]
})
var a, _0 }`)
assert(downLevel(`function(a=b=>b,c){c}`), 'function (a, c) { if (a === undefined) a = function (b) { return b }; c }')
assert(downLevel(`Object.defineProperty(dis, f.key, {get() {}, set(v) {}})`), `Object.defineProperty(dis, f.key, (_ = {},
_.get = function () {},
_.set = function (v) {}, _))
var _`);
assert(downLevel(`var restq = splice(queue, i, i2 - i, ...a[1], { type: STAMP, text: "=" });`), `var slice_ = Array["prototype"]["slice"];
var restq = splice["apply"](null, [queue, i, i2 - i]["concat"](slice_["call"](a[1]), [{ type: STAMP, text: "=" }]));`)
var c = scanner2(`\r\n    if (search.length) return null;\r\n    return path.join(...pathlist);\r\n`); i++
c.fix(); i++
c.break(); i++
assert(c.toString(), `\r\n    if (search["length"]) return null;\r\n    return path["join"](...pathlist);\r\n`);
assert(downLevel.code(c).toString(), `\r\n    if (search["length"]) return null;\r\n    return path["join"]["apply"](path, pathlist);\r\n`);
downLevel.debug = true; i++;
assert(downLevel(`Symbol;var c = (a.data || (a.data = {})).transition = no(this);`), 'Symbol; var c = (a.data || (a.data = {})).transition = no(this);', true);
assert(downLevel(`[a.b]=[1]`), 'a.b = [1][0]')
assert(downLevel(`[a[b]]=[1]`), 'a[b] = [1][0]')
assert(downLevel(`[(a)[b]]=[1]`), '(a)[b] = [1][0]')
assert(downLevel(`[[a][b]]=[1]`), '[a][b] = [1][0]')
assert(downLevel(`[a,{}.b,c]=[1]`), '_ = [1], a = _[0], {}.b = _[1], c = _[2]\r\nvar _')
assert(downLevel(`[{}.b,c]=[1]`), '_ = [1], {}.b = _[0], c = _[1]\r\nvar _')
assert(downLevel(`[{}.b]=[1]`), '({}).b = [1][0]')
assert(downLevel(`[[[a[b]]]]=[1]`), 'a[b] = [1][0][0][0]')
assert(downLevel(`[[[{}[b]]]]=[1]`), '({})[b] = [1][0][0][0]')
assert(downLevel(`[...a[b]]=[1]`), 'var slice_ = Array["prototype"]["slice"];\r\n_ = [1], a[b] = slice_["call"](_, 0)\r\nvar _')
assert(downLevel(`[a,...{length}]=[1]`), 'var slice_ = Array["prototype"]["slice"];\r\n_ = [1], a = _[0], _0 = slice_["call"](_, 1), length = _0.length\r\nvar _, _0')
assert(downLevel(`[...{length}]=[1]`), `var slice_ = Array["prototype"]["slice"];
_ = [1], _0 = slice_["call"](_, 0), length = _0.length
var _, _0`)
assert(downLevel(`[...{}[a]]=[1]`), `var slice_ = Array["prototype"]["slice"];
_ = [1], {}[a] = slice_["call"](_, 0)
var _`)
assert(downLevel(`,{...{}[a]}=[1]`), `_ = [1], {}[a] = rest_(_, [])
var _`)
assert(downLevel(`var res=null,res2=1,{...{}[a]}=[1]`), `var res = null, res2 = 1, _ = [1], {}[a] = rest_(_, [])
var _`);
assert(downLevel(`var res=null,{...{}[a]}=[1]`), `var res = null, _ = [1], {}[a] = rest_(_, [])
var _`)
assert(downLevel(`,{b,...{}[a]}=[1]`), `_ = [1], b = _.b, {}[a] = rest_(_, ["b"])
var _`)
assert(downLevel(`var penddings = {}, circle = [], module_keys = [];`), `var penddings = {}, circle = [], module_keys = [];`)
