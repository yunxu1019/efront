var downLevel = require("./downLevel");
var _asert = assert, i = downLevel.debugid = 14;
assert = function (a, b) {
    var d = 1;
    d = b.split(/\r+\n/).length, b = b.replace(/(\r\n|\n|\r)/g, '\r\n');
    a = a.replace(/\r\n|\r|\n/g, '\r\n');
    _asert(a, b, i);
    i += d;
    downLevel.debugid = i;
}
var innerJs = new Javascript;
innerJs.defaultType = common.STRAP;
// 运算符
assert(downLevel(`a??b`), '&nullish(a, b)', true);
assert(downLevel(`a**b`), '&power(a, b)', true);
assert(downLevel(`a.c**b`), '&power(a.c, b)', true);
assert(downLevel(`a??=b`), 'a = &nullish(a, b)', true);
assert(downLevel(`a**=b`), 'a = &power(a, b)', true);
assert(downLevel(`a+=b+c**d`), 'a += b + &power(c, d)', true);
assert(downLevel(`a(c**=d)`), 'a(c = &power(c, d))', true);
assert(downLevel(`a(c.b.d**=d)`), 'a((_ = c.b, _.d = &power(_.d, d)))\nvar _', true);
assert(downLevel(`a(c.b[a.b]**=d)`), 'a((_ = c.b, _[_0 = a.b] = &power(_[_0], d)))\nvar _, _0', true);
assert(downLevel(`c.b[a.b]**=d`), '_ = c.b, _[_0 = a.b] = &power(_[_0], d)\nvar _, _0', true);
i++// 声明及解构
assert(downLevel(`var [data, args, strs] = breakcode(data, occurs), strs = []`), 'var _ = breakcode(data, occurs), data = _[0], args = _[1], strs = _[2], strs = []\nvar _');
assert(downLevel(`var [name, type, options] = piece, key, repeat;`), 'var name = piece[0], type = piece[1], options = piece[2], key, repeat;');
assert(downLevel(`var [] = piece, key,[]= repeat;`), 'var key;');
assert(downLevel(`var [] = piece, key,[]`), 'var key');
assert(downLevel(`const`), 'const');
assert(downLevel(`let`), 'let');
assert(downLevel(`var`), '');
assert(downLevel(`new.target`), 'new.target');
assert((tmp = scanner2(`new.target`), tmp.detour(), downLevel.code(tmp).toString()), 'undefined');
assert(downLevel(`{let a; function b(){a};return;}`), `if (tmp = 0, tmp0 =function (a) { a; function b() { a }; return tmp = 1, void 0; }(a)) { if (tmp === 1) return tmp0; }\r
var tmp, a, tmp0`);
assert(downLevel(`const a,b,c`), 'var a, b, c');
assert(downLevel(`let a,b,c`), 'var a, b, c');
assert(downLevel(`for(let a in b)`), 'for (var a in b)');
assert(downLevel(`a;for(let a in b)`), 'a; for (var a0 in b)');
assert(downLevel(`for(let a in b)setTimeout(function(){console.log(a)})`), 'for (var a in b)(function (a) { setTimeout(function () { console.log(a) }) }(a))\nvar tmp, a');
assert(downLevel(`var a;{let a,b,c}`), 'var a; { var a0 = void 0, b = void 0, c = void 0 }');
assert(downLevel(`var a;{let {a,b},c=1}`), 'var a; { var a0 = void 0, b = void 0, c = 1 }');
assert(downLevel(`var a;{let {a,b},c}`), 'var a; { var a0 = void 0, b = void 0, c = void 0 }');
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
assert(downLevel(`[a,b]=[b,a]`), '_ = [b, a], a = _[0], b = _[1]\nvar _');
assert(downLevel(`var {c:a=2}=b`), 'var _ = b.c, a = _ !== void 0 ? _ : 2\nvar _');
assert(downLevel(`var {"c":a}=b`), 'var a = b["c"]');
assert(downLevel(`var {1:a}=b`), 'var a = b[1]');
assert(downLevel(`var [,a]=b`), 'var a = b[1]');
assert(downLevel(`var {[c]:a}=b`), 'var a = b[c]');
assert(downLevel(`var {1:a}=b`), 'var a = b[1]');
assert(downLevel(`var {.1:a}=b`), 'var a = b[.1]');
assert(downLevel(`var {a,[a]:c}=b`), 'var a = b.a, c = b[a]');
assert(downLevel(`var {a}=a`), 'var a = a.a');
assert(downLevel(`var {a,b}=a`), 'var _ = a, a = a.a, b = _.b\nvar _');
assert(downLevel(`var {a:{a:{a}}}=b`), 'var a = b.a.a.a');
assert(downLevel(`var {a,[a]:c}={}`), 'var _ = {}, a = _.a, c = _[a]\nvar _');
assert(downLevel(`={a,[a]:c}={}`), '= _ = {}, a = _.a, c = _[a]\nvar _');
var tmp = scanner2(`var {window}=this`); tmp.helpcode = false; tmp.detour(); assert(downLevel.code(tmp).toString(), `var window = this["window"]`);
assert(downLevel(`function (){var [a]=a;}`), "function () { var a = a[0]; }")
i++// 参数解构
assert(downLevel(`function ([a]){}`), "function (arg0_) { var a = arg0_[0];\n}")
assert(downLevel(`function ([a],b){}`), "function (arg0_, b) { var a = arg0_[0];\n}")
assert(downLevel(`function ([a],{b}){}`), "function (arg0_, arg1_) { var a = arg0_[0];\nvar b = arg1_.b;\n}")
assert(downLevel(`function (){var {a},{b};}`), "function () { var a, b; }")
assert(downLevel(`function (){var {a}=a,{b}=a;}`), "function () { var a = a.a, b = a.b; }")
assert(downLevel(`function (a=b){}`), "function () { var a = arguments[0];\nif (a === void 0) a = b;\n}")
assert(downLevel(`function (a=b,[c],d,e=f){}`), "function () { var a = arguments[0];\nif (a === void 0) a = b;\nvar c = (arguments[1])[0];\nvar d = arguments[2];\nvar e = arguments[3];\nif (e === void 0) e = f;\n}")
assert(downLevel(`function (arg1=b,[c],d,e=f){}`), "function () { var arg1 = arguments[0];\nif (arg1 === void 0) arg1 = b;\nvar c = (arguments[1])[0];\nvar d = arguments[2];\nvar e = arguments[3];\nif (e === void 0) e = f;\n}")
i++// class降级
assert(downLevel(`class a {}`), "function a() {}")
var tmp = scanner2('export class a{a(){}}'); tmp.fix(); assert(downLevel.code(tmp).toString(), `exports.a = function (a) { a["prototype"].a = function () {}\nreturn a }(function a() {})`);
assert(downLevel(`class a { static{ a.a=1}}`), "function a() {}; (function () { a.a = 1 }())")
assert(downLevel(`if(a) a = 1; class a {}`), "if (a) a = 1; function a() {}")
assert(downLevel(`async function(){if(a) a = 1; class a {}}`), `function () { return &async(\r
function () {\r
a = function () {}; if (!a) return [1, 0]; a = 1; return [1, 0]\r
})\r
var a, _0 }`)
assert(downLevel(`if(a) class b{ c(){}};`), `if (a) var b = function (b) { b["prototype"].c = function () {}\nreturn b }(function b() {});`)
assert(downLevel(`class a {a=1}`), "function a() { this.a = 1 }")
assert(downLevel(`class a {#a=1}`), "function a() { this.#a = 1 }")
assert(downLevel(`class a {a=1; b(){}}`), `function a() { this.a = 1; }; a["prototype"].b = function () {}`)
assert(downLevel(`=class a {a=1; b(){}}`), `= function (a) { a["prototype"].b = function () {}\nreturn a }(function a() { this.a = 1; })`)
assert(downLevel(`var a=class {a=1; static b=2 b(){}};`), `var a = function (cls0) { cls0.b = 2\ncls0["prototype"].b = function () {}\nreturn cls0 }(function () { this.a = 1; });`)
assert(downLevel(`var a=class { constructor(){this.a=1}; static b=2 b(){}};`), `var a = function (cls0) { cls0.b = 2\ncls0["prototype"].b = function () {}\nreturn cls0 }(function () { this.a = 1 });`)
assert(downLevel(`class a {static b(){}}`), "function a() {}; a.b = function () {}")
assert(downLevel(`class a extends b{}`), `function a() {\r
var this_ = b["apply"](this, arguments) || this;\r
return this_ }; &extends(a, b)`);
assert(downLevel(`class a extends class b{}{}`), `var a = function (b, a) { &extends(a, b)\r
return a }(function b() {}, function a() {\r
var this_ = b["apply"](this, arguments) || this;\r
return this_ })`);
assert(downLevel(`class a {get a(){}}`), `function a() {};\r
Object["defineProperty"](a["prototype"], "a", (tmp = {}, tmp["get"] = function () {}, tmp))\r
var tmp`);
assert(downLevel(`class a {set a(){}}`), `function a() {};\r
Object["defineProperty"](a["prototype"], "a", (tmp = {}, tmp["set"] = function () {}, tmp))\r
var tmp`);
assert(downLevel(`class a {get a(){}; get b(){}; set a(){}}`), `function a() {};\r
Object["defineProperty"](a["prototype"], "a", (tmp = {}, tmp["get"] = function () {}, tmp["set"] = function () {}, tmp));\r
Object["defineProperty"](a["prototype"], "b", (tmp = {}, tmp["get"] = function () {}, tmp));\r
var tmp`);
assert(downLevel(`class a {set a(){}; get b(){}; set a(){}}`), `function a() {};\r
Object["defineProperty"](a["prototype"], "a", (tmp = {}, tmp["set"] = function () {}, tmp["set"] = function () {}, tmp));\r
Object["defineProperty"](a["prototype"], "b", (tmp = {}, tmp["get"] = function () {}, tmp));\r
var tmp`);
i++// 属性降级
assert(downLevel(`return ({b,async a(){}})`), `return ((_ = {},\r
_.b = b,\r
_.a = function () { return &async() }, _))\nvar _`);
assert(downLevel(`var a={b,async a(){}}`), `var a = (_ = {},\r
_.b = b,\r
_.a = function () { return &async() }, _)\nvar _`);
assert(downLevel(`var a={b:a=>b,c}`), `var a = (_ = {},\r
_.b = function (a) { return b },\r
_.c = c, _)\nvar _`);
assert(downLevel(`={b,async a(){}}`), `= (_ = {},\r
_.b = b,\r
_.a = function () { return &async() }, _)\nvar _`);
assert(downLevel(`={async [a](){}}`), `= (_ = {},\r
_[a] = function () { return &async() }, _)\nvar _`);
assert(downLevel(`={[a]:b}`), `= (_ = {},\r
_[a] = b, _)\nvar _`);
assert(downLevel(`={a:1,[a]:1}`), `= (_ = { a: 1 },\r
_[a] = 1, _)\nvar _`);
assert(downLevel(`={a,[a]:1}`), `= (_ = {},\r
_.a = a,\r
_[a] = 1, _)\nvar _`);
assert(downLevel(`={[a]:{[b]:1}}`), `= (_ = {},\r
_[a] = (_0 = {},\r
_0[b] = 1, _0), _)\nvar _, _0`);
assert(downLevel(`={[a]:{[b]:{[c]:1}}}`), `= (_ = {},\r
_[a] = (_0 = {},\r
_0[b] = (_1 = {},\r
_1[c] = 1, _1), _0), _)\nvar _, _0, _1`);
assert(downLevel(`={[a]:{[b]:{[c]:1}},[b]:{[a]:1}}`), `= (_ = {},\r
_[a] = (_0 = {},\r
_0[b] = (_1 = {},\r
_1[c] = 1, _1), _0),\r
_[b] = (_0 = {},\r
_0[a] = 1, _0), _)\nvar _, _0, _1`);
i++// 对象展开
assert(downLevel(`={ok:ok}`), `= { ok: ok }`);
assert(downLevel(`={...a}`), `= &extend({}, a)`);
assert(downLevel(`={...a&&b}`), `= &extend({}, a && b)`);
assert(downLevel(`()=>({\nfileName: entry.fileName,\ntextSpan: highlightSpan.textSpan,\nisWriteAccess: highlightSpan.kind === "writtenReference" /* writtenReference */,\n...highlightSpan.isInString && { isInString: true },\n...highlightSpan.contextSpan && { contextSpan: highlightSpan.contextSpan }})`), `function () { return (&extend({\r
fileName: entry.fileName,\r
textSpan: highlightSpan.textSpan,\r
isWriteAccess: highlightSpan.kind === "writtenReference"/* writtenReference */ }, highlightSpan.isInString && { isInString: true }, highlightSpan.contextSpan && { contextSpan: highlightSpan.contextSpan })) }`);
assert(downLevel(`async()=>({ [argitem.sort ? argitem.sort : 'date']: "desc" })`), `function () { return &async(\r
function () {\r
_ = {}; if (!argitem.sort) return [1, 0]; _2 = argitem.sort; return [2, 0]\r
},\r
function () {\r
_2 = 'date'; return [1, 0]\r
},\r
function () {\r
_[_2] = "desc"; _1 = _; return [_1, 2]\r
})\r
var _, _1, _2 }`);
assert(downLevel(`={...{a:1}}`), `= &extend({}, { a: 1 })`);
assert(downLevel(`={...a,...c}`), `= &extend({}, a, c)`);
assert(downLevel(`={a:a,...b,c}`), `= (_ = &extend({ a: a }, b),\n_.c = c, _)\nvar _`);
assert(downLevel(`={...b,c,...d,e}`), `= (_ = &extend({}, b),\n_.c = c, &extend(_, d),\n_.e = e, _)\nvar _`);
assert(downLevel(`={...a,b}`), `= (_ = &extend({}, a),\r
_.b = b, _)\nvar _`);
assert(downLevel(`={...a,b,...c}`), `= (_ = &extend({}, a),\r
_.b = b, &extend(_, c), _)\nvar _`);
assert(downLevel(`={...a,...c,b}`), `= (_ = &extend({}, a, c),\r
_.b = b, _)\nvar _`);
assert(downLevel(`={...{},...c,b}`), `= (_ = &extend({}, {}, c),\r
_.b = b, _)\nvar _`);
assert(downLevel(`={a(){},get c(){},b}`), `= (_ = {},\r
_.a = function () {},\r
Object["defineProperty"](_, "c", (_0 = {}, _0["get"] = function () {}, _0)),\r
_.b = b, _)\nvar _, _0`);
assert(downLevel(`if(){Promise.reslove({get then() {}})}`), `if () { Promise.reslove((_ = {},\nObject["defineProperty"](_, "then", (_0 = {}, _0["get"] = function () {}, _0)), _)) }\nvar _, _0`)
assert(downLevel(`=[...a]`), `= &slice(a)`)
assert(downLevel(`let a = [...a,...a()];`), `var a = &slice(a)["concat"](&slice(a()));`)
assert(downLevel(`=[...a,...b]`), `= &slice(a)["concat"](&slice(b))`)
assert(downLevel(`=[a,...b]`), `= [a]["concat"](&slice(b))`)
assert(downLevel(`=[a,...b,...c]`), `= [a]["concat"](&slice(b), &slice(c))`)
assert(downLevel(`=[a,b,...c]`), `= [a, b]["concat"](&slice(c))`)
assert(downLevel(`=[a,b,...c,d]`), `= [a, b]["concat"](&slice(c), [d])`)
assert(downLevel(`=[a,b,...c,d,e,f]`), `= [a, b]["concat"](&slice(c), [d, e, f])`)
assert(downLevel(`=[a,b,...c,d,e,f,...g]`), `= [a, b]["concat"](&slice(c), [d, e, f], &slice(g))`)
assert(downLevel(`=[a,b,...c,d,...e]`), `= [a, b]["concat"](&slice(c), [d], &slice(e))`)
assert(downLevel(`[...new Set(keys)]`), '&values(new Set(keys))');
assert(downLevel(`[...new Array(20)]`), '&slice(new Array(20))');
assert(downLevel(`a=[]["concat"](...b)`), `a = (_ = [])["concat"]["apply"](_, b)\r
var _`)
downLevel.debug = true; i++;
assert(downLevel(`a={async check(...args) {return this.each(args, (a) => require("./checkVariable")(a))}}`), `a = (_ = {},
_.check = function () { this_ = this; arguments_ = arguments;
return &async(
function () {
args = &slice(arguments_, 0); _0 = function (a) { return require("./checkVariable")(a) }; _0 = this_.each(args, _0); return [_0, 2]
})
var args, this_, arguments_, _0 }, _)
var _`)
downLevel.debug = false; i++;
assert(downLevel(`a(...b)`), `a["apply"](null, b)`)
assert(downLevel(`a(..."b,c".split(","))`), `a["apply"](null, "b,c".split(","))`)
assert(downLevel(`new a(...args)`), `new(a['bind']['apply'](a, [null]["concat"](&slice(args))))`)
assert(downLevel(`a(c,d,e,...b(...c))`), `a["apply"](null, [c, d, e]["concat"](&slice(b["apply"](null, c))))`)
assert(downLevel(`a(c,d,e,...b.a(...c))`), `a["apply"](null, [c, d, e]["concat"](&slice(b.a["apply"](b, c))))`)
assert(downLevel(`a(c,d,e,...b.a.c(...c))`), `a["apply"](null, [c, d, e]["concat"](&slice((_ = b.a).c["apply"](_, c))))\nvar _`)
assert(downLevel(`a(...b,...c)`), `a["apply"](null, &slice(b)["concat"](&slice(c)))`)
assert(downLevel(`a(...b,c)`), `a["apply"](null, &slice(b)["concat"]([c]))`)
assert(downLevel(`getPendingExpressions()[_push](...flattenCommaList(expr));`), `(_ = getPendingExpressions())[_push]["apply"](_, flattenCommaList(expr));\nvar _`)
assert(downLevel(`a(b,...c)`), `a["apply"](null, [b]["concat"](&slice(c)))`)
assert(downLevel(`a(a,b,...c,d,...e)`), `a["apply"](null, [a, b]["concat"](&slice(c), [d], &slice(e)))`)
assert(downLevel(`a["call"](a,b,...c,d,...e)`), `a["call"]["apply"](a, [a, b]["concat"](&slice(c), [d], &slice(e)))`)
assert(downLevel(`a.b(a,b,...c,d,...e)`), `a.b["apply"](a, [a, b]["concat"](&slice(c), [d], &slice(e)))`)
assert(downLevel(`[].b(a,b,...c,d,...e)`), `(_ = []).b["apply"](_, [a, b]["concat"](&slice(c), [d], &slice(e)))\nvar _`)
assert(downLevel(`a(...b).c(...d)`), `(_ = a["apply"](null, b)).c["apply"](_, d)\nvar _`)
assert(downLevel(`a(...b).c(...d).e(...f)`), `(_ = (_ = a["apply"](null, b)).c["apply"](_, d)).e["apply"](_, f)\nvar _`)
assert(downLevel(`diagnostic.relatedInformation.push(...relatedInformation);`), `(_ = diagnostic.relatedInformation).push["apply"](_, relatedInformation);\nvar _`);
assert(downLevel(`const typeNames = [79 /* Identifier */, ...typeKeywords];`), `var typeNames = [79/* Identifier */]["concat"](&slice(typeKeywords));`);
i++// 箭头函数
assert(downLevel(`a=>k`), "function (a) { return k }")
assert(downLevel(`function (a,...b,b){}`), `function (a) { var b = &slice(arguments, 1, -1);\nvar b = arguments[arguments["length"] - 1];\n}`)
assert(downLevel(`(a)=>k`), "function (a) { return k }")
assert(downLevel(`(a=1)=>k`), "function () { var a = arguments[0];\nif (a === void 0) a = 1;\nreturn k }")
assert(downLevel(`([a])=>b`), "function (arg0_) { var a = arg0_[0];\nreturn b }")
assert(downLevel(`map(([a])=>a)`), "map(function (arg0_) { var a = arg0_[0];\nreturn a })")
assert(downLevel(`var [_, R, G, B, A] = rgbHex.exec(color).map(a => parseInt(a + a, 16));`), "var _0 = rgbHex.exec(color).map(function (a) { return parseInt(a + a, 16) }), _ = _0[0], R = _0[1], G = _0[2], B = _0[3], A = _0[4];\nvar _0")
assert(downLevel(`if (/^(?:select|input|textarea)$/i.test(initialEvent.target.tagName) || getTargetIn(a => a.nodrag || a.hasAttribute('nodrag'), initialEvent.target)) return;`), "if (/^(?:select|input|textarea)$/i.test(initialEvent.target.tagName) || getTargetIn(function (a) { return a.nodrag || a.hasAttribute('nodrag') }, initialEvent.target)) return;")
i++// 对象收集
assert(downLevel(`function (a,...b){}`), `function (a) { var b = &slice(arguments, 1);\n}`)
assert(downLevel(`function (a,...b,c){}`), `function (a) { var b = &slice(arguments, 1, -1);\nvar c = arguments[arguments["length"] - 1];\n}`)
assert(downLevel(`function (a,...,c){}`), `function (a) { var c = arguments[arguments["length"] - 1];\n}`)
assert(downLevel(`(...a) => k`), `function () { var a = &slice(arguments, 0);\nreturn k }`)
assert(downLevel(`for await(o of os) noSymbol`), `return &async(\r
function () {\r
return [8, 8]\r
},\r
function () {\r
_2 = Symbol["asyncIterator"]; _2 = os[_2]; if (_2) return [1, 0]; _2 = Symbol["iterator"]; _2 = os[_2]; if (_2) return [1, 0]; _2 = Array["prototype"]; _3 = Symbol["iterator"]; _2 = _2[_3]; return [1, 0]\r
},\r
function () {\r
_0 = _2; _0 = _0["call"](os); _2 = _0["next"](); return [_2, 1]\r
},\r
function (_1) {\r
_ = _1; return [1, 0]\r
},\r
function () {\r
_2 = !_["done"]; if (!_2) return [2, 0]; _2 = _["value"]; return [_2, 1]\r
},\r
function (_1) {\r
o = _1; _2 = true; return [1, 0]\r
},\r
function () {\r
if (!_2) return [2, 0]; noSymbol; _2 = _0["next"](); return [_2, 1]\r
},\r
function (_1) {\r
_ = _1; return [-3, 0]\r
},\r
function () {\r
return [0, 9]\r
},\r
function () {\r
_2 = _; if (!_2) return [1, 0]; _2 = !_["done"]; if (!_2) return [1, 0]; _2 = _0["return"], _2 = typeof _2, _2 = _2 === "function"; return [1, 0]\r
},\r
function () {\r
if (!_2) return [1, 0]; _2 = _0["return"](); return [1, 0]\r
},\r
function () {\r
return [1, 9]\r
})\r
var _, _0, _2, _3`)
assert(downLevel(`for await(var [o,s] of os) noSymbol`), `return &async(\r
function () {\r
return [11, 8]\r
},\r
function () {\r
o; s; _5 = Symbol["asyncIterator"]; _5 = os[_5]; if (_5) return [1, 0]; _5 = Symbol["iterator"]; _5 = os[_5]; if (_5) return [1, 0]; _5 = Array["prototype"]; _6 = Symbol["iterator"]; _5 = _5[_6]; return [1, 0]\r
},\r
function () {\r
_0 = _5; _0 = _0["call"](os); _5 = _0["next"](); return [_5, 1]\r
},\r
function (_4) {\r
_ = _4; return [1, 0]\r
},\r
function () {\r
_5 = !_["done"]; if (!_5) return [5, 0]; _5 = _["value"]; return [_5, 1]\r
},\r
function (_4) {\r
_1 = _4; _6 = Symbol["iterator"]; _6 = _1[_6]; if (_6) return [1, 0]; _6 = Array["prototype"]; _7 = Symbol["iterator"]; _6 = _6[_7]; return [1, 0]\r
},\r
function () {\r
_2 = _6["call"](_1); _3 = void 0; _3 = _2["next"](); o = _3["value"]; _3 = _2["next"](); s = _3["value"]; _11 = !_3; if (_11) return [1, 0]; _11 = !_3["done"]; return [1, 0]\r
},\r
function () {\r
_10 = _11; if (!_10) return [1, 0]; _10 = _2["return"], _10 = typeof _10, _10 = _10 === "function"; if (!_10) return [1, 0]; _10 = _2["return"](); return [1, 0]\r
},\r
function () {\r
_3 = _10; _5 = true; return [1, 0]\r
},\r
function () {\r
if (!_5) return [2, 0]; noSymbol; _5 = _0["next"](); return [_5, 1]\r
},\r
function (_4) {\r
_ = _4; return [-6, 0]\r
},\r
function () {\r
return [0, 9]\r
},\r
function () {\r
_5 = _; if (!_5) return [1, 0]; _5 = !_["done"]; if (!_5) return [1, 0]; _5 = _0["return"], _5 = typeof _5, _5 = _5 === "function"; return [1, 0]\r
},\r
function () {\r
if (!_5) return [1, 0]; _5 = _0["return"](); return [1, 0]\r
},\r
function () {\r
return [1, 9]\r
})\r
var o, s, _, _0, _1, _2, _3, _5, _6, _7, _8, _9, _10, _11`);
assert(downLevel(`for(o of os) noSymbol`), `for (_ = 0; _ < os["length"] && (o = os[_], true); _++) noSymbol\nvar _, _0`)
assert(downLevel(`for(var o of os) Symbol`), `try { for (var o, _0 = os[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]], _0 = _0["call"](os), _ = _0["next"](); !_["done"] && (o = _["value"], true); _ = _0["next"]()) Symbol } finally { if (_ && !_["done"] && typeof _0["return"] === "function") _0["return"]() }\nvar _, _0`)
assert(downLevel(`for(var o of os) Symbol`), `try { for (var o, _0 = os[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]], _0 = _0["call"](os), _ = _0["next"](); !_["done"] && (o = _["value"], true); _ = _0["next"]()) Symbol } finally { if (_ && !_["done"] && typeof _0["return"] === "function") _0["return"]() }\nvar _, _0`)
assert(downLevel(`for(var o of o)Symbol`), `try { for (var o, _1 = o, _0 = _1[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]], _0 = _0["call"](_1), _ = _0["next"](); !_["done"] && (o = _["value"], true); _ = _0["next"]()) Symbol } finally { if (_ && !_["done"] && typeof _0["return"] === "function") _0["return"]() }\nvar _, _0, _1`)
assert(downLevel(`for(var [a] of os)Symbol`), `try { for (var a, _0 = os[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]], _0 = _0["call"](os), _ = _0["next"](); !_["done"] && (_1 = _["value"], _2 = (_1[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]])["call"](_1), _3 = void 0, _3 = _2["next"](), a = _3["value"], _3 = (!_3 || !_3["done"]) && typeof _2["return"] === "function" && _2["return"](), true); _ = _0["next"]()) Symbol } finally { if (_ && !_["done"] && typeof _0["return"] === "function") _0["return"]() }\r
var _, _0, _1, _2, _3`)
assert(downLevel(`for(var [a,b] of os)Symbol`), `try { for (var a, b, _0 = os[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]], _0 = _0["call"](os), _ = _0["next"](); !_["done"] && (_1 = _["value"], _2 = (_1[Symbol["iterator"]] || Array["prototype"][Symbol["iterator"]])["call"](_1), _3 = void 0, _3 = _2["next"](), a = _3["value"], _3 = _2["next"](), b = _3["value"], _3 = (!_3 || !_3["done"]) && typeof _2["return"] === "function" && _2["return"](), true); _ = _0["next"]()) Symbol } finally { if (_ && !_["done"] && typeof _0["return"] === "function") _0["return"]() }\r
var _, _0, _1, _2, _3`)
assert(downLevel(`[...a]=a`), `a = &slice(a, 0)`)
assert(downLevel(`[c,...a]=a`), `c = a[0], a = &slice(a, 1)`)
assert(downLevel(`[...a]=a`), `a = &slice(a, 0)`)
assert(downLevel(`[...a,c]=a`), `_ = a, a = &slice(a, 0, -1), c = _["length"] > 1 ? _[_["length"] - 1] : void 0\nvar _`)
assert(downLevel(`{...a,c}=a`), `c = a.c, a = &rest(a, ["c"])`)
assert(downLevel(`{c,...a}=a`), `c = a.c, a = &rest(a, ["c"])`)
assert(downLevel("if(a){}[r, g, b] = rgb4s(r, g, b, s)"), "if (a) {} _ = rgb4s(r, g, b, s), r = _[0], g = _[1], b = _[2]\nvar _", true);
assert(downLevel(`{c,[c]:b,...a}=a`), `c = a.c, b = a[c], a = &rest(a, ["c", c])`)
assert(downLevel(`async()=>name = require("./$split")(name)["join"]("/");`), `function () { return &async(\r
function () {\r
_0 = require("./$split"); _0 = _0(name); name = _0["join"]("/"); return [name, 2]\r
})\r
var _0 };`);
i++//异步或步进函数
assert(downLevel(`function *(){yield *a}`), `function () { return &aster(\r
function () {\r
return [9, 8]\r
},\r
function () {\r
_; _3 = Symbol["asyncIterator"]; _3 = a[_3]; if (_3) return [1, 0]; _3 = Symbol["iterator"]; _3 = a[_3]; if (_3) return [1, 0]; _3 = Array["prototype"]; _4 = Symbol["iterator"]; _3 = _3[_4]; return [1, 0]\r
},\r
function () {\r
_1 = _3; _1 = _1["call"](a); _3 = _1["next"](); return [_3, 1]\r
},\r
function (_2) {\r
_0 = _2; return [1, 0]\r
},\r
function () {\r
_3 = !_0["done"]; if (!_3) return [2, 0]; _3 = _0["value"]; return [_3, 1]\r
},\r
function (_2) {\r
_ = _2; _3 = true; return [1, 0]\r
},\r
function () {\r
if (!_3) return [3, 0]; return [_, 3]\r
},\r
function (_2) {\r
_3 = _1["next"](); return [_3, 1]\r
},\r
function (_2) {\r
_0 = _2; return [-4, 0]\r
},\r
function () {\r
return [0, 9]\r
},\r
function () {\r
_3 = _0; if (!_3) return [1, 0]; _3 = !_0["done"]; if (!_3) return [1, 0]; _3 = _1["return"], _3 = typeof _3, _3 = _3 === "function"; return [1, 0]\r
},\r
function () {\r
if (!_3) return [1, 0]; _3 = _1["return"](); return [1, 0]\r
},\r
function () {\r
return [1, 9]\r
})\r
var _, _0, _1, _3, _4 }`)
assert(downLevel(`[a]=yield a`), `return &aster(\r
function () {\r
return [a, 3]\r
},\r
function (_) {\r
_0 = _; a = _0[0]\r
})\r
var _0`)
assert(downLevel(`a=yield a`), `return &aster(\r
function () {\r
return [a, 3]\r
},\r
function (_) {\r
a = _\r
})`)
assert(downLevel(`var { value, done } = emiter.next(await value);`), `return &async(\r
function () {\r
_1 = value; return [_1, 1]\r
},\r
function (_0) {\r
_ = emiter.next(_0); value = _.value; done = _.done\r
})\r
var value, done, _, _1`)
assert(downLevel(`var { value, done } = emiter.next(yield value);`), `return &aster(\r
function () {\r
return [value, 3]\r
},\r
function (_0) {\r
_ = emiter.next(_0); value = _.value; done = _.done\r
})\r
var value, done, _, _1`)
assert(downLevel(`async function(){}`), `function () { return &async() }`)
assert(downLevel(`async function(){for(var a of b){Symbol}}`), `function () { return &async(\r
function () {\r
return [5, 8]\r
},\r
function () {\r
a; _2 = Symbol["iterator"]; _2 = b[_2]; if (_2) return [1, 0]; _2 = Array["prototype"]; _3 = Symbol["iterator"]; _2 = _2[_3]; return [1, 0]\r
},\r
function () {\r
_0 = _2; _0 = _0["call"](b); _ = _0["next"](); return [1, 0]\r
},\r
function () {\r
_2 = !_["done"]; if (!_2) return [1, 0]; a = _["value"]; _2 = true; return [1, 0]\r
},\r
function () {\r
if (!_2) return [1, 0]; Symbol; _ = _0["next"](); return [-1, 0]\r
},\r
function () {\r
return [0, 9]\r
},\r
function () {\r
_2 = _; if (!_2) return [1, 0]; _2 = !_["done"]; if (!_2) return [1, 0]; _2 = _0["return"], _2 = typeof _2, _2 = _2 === "function"; return [1, 0]\r
},\r
function () {\r
if (!_2) return [1, 0]; _2 = _0["return"](); return [1, 0]\r
},\r
function () {\r
return [1, 9]\r
})\r
var a, _, _0, _2, _3 }`)
assert(downLevel(`a={async a(){var b =c;return 1}}`), `a = (_ = {},\r
_.a = function () { return &async(\nfunction () {\nb = c; return [1, 2]\n})\nvar b }, _)\nvar _`)
assert(downLevel(`async function(){return 1}`), `function () { return &async(\nfunction () {\nreturn [1, 2]\n}) }`)
assert(downLevel(`async function(a){await a}`), `function (a) { return &async(\nfunction () {\n_0 = a; return [_0, 1]\n})\nvar _0 }`)
assert(downLevel(`async function(a){return await a}`), `function (a) { return &async(\nfunction () {\n_0 = a; return [_0, 1]\n},\nfunction (_) {\nreturn [_, 2]\n})\nvar _0 }`)
assert(downLevel(`async function(a){await a,await b}`), `function (a) { return &async(\nfunction () {\n_0 = a; return [_0, 1]\n},\nfunction (_) {\n_0 = b; return [_0, 1]\n})\nvar _0 }`)
assert(downLevel(`async function(){await a,await b}`), `function () { return &async(\nfunction () {\n_0 = a; return [_0, 1]\n},\nfunction (_) {\n_0 = b; return [_0, 1]\n})\nvar _0 }`)
assert(downLevel(`async function(a){ if(c)await a,await b;else if(s) await c;}`), `function (a) { return &async(\r
function () {\r
if (!c) return [3, 0]; _0 = a; return [_0, 1]\r
},\r
function (_) {\r
_0 = b; return [_0, 1]\r
},\r
function (_) {\r
return [3, 0]\r
},\r
function () {\r
if (!s) return [2, 0]; _0 = c; return [_0, 1]\r
},\r
function (_) {\r
return [1, 0]\r
})\r
var _0 }`)
assert(downLevel(`async function(a){ for(var i=1;i<2;i++) await 1 }`), `function (a) { return &async(\r
function () {\r
i = 1; return [1, 0]\r
},\r
function () {\r
_0 = i < 2; if (!_0) return [2, 0]; _0 = 1; return [_0, 1]\r
},\r
function (_) {\r
i++; return [-1, 0]\r
})\r
var i, _0 }`)
assert(downLevel('async function(){ if(b); else {if (a){}else{location = getRequestProtocol(url) + "//" + location;}}}'), `function () { return &async(\r
function () {\r
if (!b) return [1, 0]; return [3, 0]\r
},\r
function () {\r
if (!a) return [1, 0]; return [2, 0]\r
},\r
function () {\r
_0 = getRequestProtocol(url), _0 = _0 + "//", location = _0 + location; return [1, 0]\r
})\r
var _0 }`);
assert(downLevel("var{a}=await b"), `return &async(\r
function () {\r
_0 = b; return [_0, 1]\r
},\r
function (_) {\r
_0 = _; _0 = _0.a; a = _0\r
})\r
var a, _0`)
assert(downLevel(`async a=>await a`), `function (a) { return &async(\r
function () {\r
_0 = a; return [_0, 1]\r
},\r
function (_) {\r
return [_, 2]\r
})\r
var _0 }`)
assert(downLevel(`function(a=b=>b,c){c}`), `function () { var a = arguments[0];\r
if (a === void 0) a = function (b) { return b };\r
var c = arguments[1];\r
c }`)
assert(downLevel(`Object.defineProperty(dis, f.key, {get() {}, set(v) {}})`), `Object.defineProperty(dis, f.key, (_ = {},\r
_.get = function () {},\r
_.set = function (v) {}, _))\r
var _`);
assert(downLevel(`var restq = splice(queue, i, i2 - i, ...a[1], { type: STAMP, text: "=" });`), `var restq = splice["apply"](null, [queue, i, i2 - i]["concat"](&slice(a[1]), [{ type: STAMP, text: "=" }]));`)
var c = scanner2(`\n    if (search.length) return null;\n    return path.join(...pathlist);\n`); i++
c.fix(); i++
c.break(); i++
assert(c.toString(), `\n    if (search["length"]) return null;\n    return path["join"](...pathlist);\n`);
assert(downLevel.code(c).toString(), `\n    if (search["length"]) return null;\n    return path["join"]["apply"](path, pathlist);\n`);
assert(downLevel(`Symbol;var c = (a.data || (a.data = {})).transition = no(this);`), 'Symbol; var c = (a.data || (a.data = {})).transition = no(this);', true);
assert(downLevel(`[a.b]=[1]`), 'a.b = [1][0]')
assert(downLevel(`[a[b]]=[1]`), 'a[b] = [1][0]')
assert(downLevel(`[(a)[b]]=[1]`), '(a)[b] = [1][0]')
assert(downLevel(`[[a][b]]=[1]`), '[a][b] = [1][0]')
assert(downLevel(`[a,{}.b,c]=[1]`), '_ = [1], a = _[0], {}.b = _[1], c = _[2]\nvar _')
assert(downLevel(`[{}.b,c]=[1]`), '_ = [1], {}.b = _[0], c = _[1]\nvar _')
assert(downLevel(`[{}.b]=[1]`), '({}).b = [1][0]')
assert(downLevel(`[[[a[b]]]]=[1]`), 'a[b] = [1][0][0][0]')
assert(downLevel(`[[[{}[b]]]]=[1]`), '({})[b] = [1][0][0][0]')
assert(downLevel(`[...a[b]]=[1]`), '_ = [1], a[b] = &slice(_, 0)\nvar _')
assert(downLevel(`[a,...{length}]=[1]`), '_ = [1], a = _[0], _0 = &slice(_, 1), length = _0.length\nvar _, _0')
assert(downLevel(`[...{length}]=[1]`), `_ = [1], _0 = &slice(_, 0), length = _0.length\r
var _, _0`)
assert(downLevel(`[...{}[a]]=[1]`), `_ = [1], {}[a] = &slice(_, 0)\r
var _`)
assert(downLevel(`,{...{}[a]}=[1]`), `, _ = [1], {}[a] = &rest(_, [])\r
var _`)
assert(downLevel(`var res=null,res2=1,{...{}[a]}=[1]`), `var res = null, res2 = 1, _ = [1], {}[a] = &rest(_, [])\r
var _`);
assert(downLevel(`var res=null,{...{}[a]}=[1]`), `var res = null, _ = [1], {}[a] = &rest(_, [])\r
var _`)
assert(downLevel(`,{b,...{}[a]}=[1]`), `, _ = [1], b = _.b, {}[a] = &rest(_, ["b"])\r
var _`)
assert(downLevel(`var penddings = {}, circle = [], module_keys = [];`), `var penddings = {}, circle = [], module_keys = [];`)
assert(downLevel(`0,{a,b}=this`), '0, _ = this, a = _.a, b = _.b\nvar _')
assert(downLevel(`0,{a,b}=1`), '0, _ = 1, a = _.a, b = _.b\nvar _')
assert(downLevel(`0,{a,b}=true`), '0, _ = true, a = _.a, b = _.b\nvar _')
assert(downLevel(`0,{a,b}=eval`), '0, _ = eval, a = _.a, b = _.b\nvar _')
assert(downLevel(`0,{a,b}=a`), '0, _ = a, a = a.a, b = _.b\nvar _')
assert(downLevel(`0,{a,b}=[]`), '0, _ = [], a = _.a, b = _.b\nvar _')
assert(downLevel(`0,{a,b}=a.b`), '0, _ = a.b, a = _.a, b = _.b\nvar _')
assert(downLevel(`var [list = this] = arguments;`), `var list = (_ = arguments[0], _ !== void 0 ? _ : this);\r
var _`)
assert(downLevel(`var [list = this] = arguments`), `var list = (_ = arguments[0], _ !== void 0 ? _ : this)\r
var _`)
assert(downLevel(`var [list = this] = 0;`), `var list = (_ = 0[0], _ !== void 0 ? _ : this);\r
var _`)
assert(downLevel(`a => a() + a(1), a => a`), `function (a) { return a() + a(1) }, function (a) { return a }`)
assert(downLevel(`a(a,)`), `a(a)`);
assert(downLevel(`class{a=[...presets.source]}`), `function () { this.a = &slice(presets.source) }`);
assert(downLevel(`class{a=a=>a}`), `function () { this.a = function (a) { return a } }`);
assert(downLevel(`class{static groupBy(){}'a'(){}}`), `function (cls0) { cls0.groupBy = function () {}\r
cls0["prototype"]['a'] = function () {}\r
return cls0 }(function () {})`);
assert(downLevel(`class{a}`), "function () { this.a = void 0; }");
assert(downLevel(`class{a;}`), "function () { this.a = void 0; }");
assert(downLevel(`class{#a;a(){a=this.#a}}`), `function (cls0) { cls0["prototype"].a = function () { a = this.#a }\r
return cls0 }(function () { this.#a = void 0; })`);
tmp = scanner2(`class{#a;a(){a=this.#a}}`), tmp.detour(), i++;
assert(downLevel.code(tmp).toString(), `var # = new WeakMap function (cls0) { cls0["prototype"]["a"] = function () { a = #["get"](this)["a"/* #a */] }\r
return cls0 }(function () { #["set"](this, {}); #["get"](this)["a"/* #a */] = undefined; })`);
assert(downLevel(`class{ get a(){[...a]}}`), `function (cls0) {\r
Object["defineProperty"](cls0["prototype"], "a", (tmp = {}, tmp["get"] = function () { &slice(a) }, tmp))\r
return cls0 }(function () {})\r
var tmp`);
assert(downLevel(`class{ get (){[...a]}}`), `function (cls0) { cls0["prototype"].get = function () { &slice(a) }\r
return cls0 }(function () {})`);
assert(downLevel(`class{ async get a(){[...a]}}`), `function (cls0) {\r
Object["defineProperty"](cls0["prototype"], "a", (tmp = {}, tmp["get"] = function () { &slice(a) }, tmp))\r
return cls0 }(function () {})\r
var tmp`);
assert(downLevel(`a=class{ static a(){[...a]}}`), `a = function (cls0) { cls0.a = function () { &slice(a) }\r
return cls0 }(function () {})`);
assert(downLevel(`a=class{ static(){[...a]}}`), `a = function (cls0) { cls0["prototype"].static = function () { &slice(a) }\r
return cls0 }(function () {})`);
assert(downLevel(`a=class{ static{[...a]}}`), `a = function (cls0) { (function () { &slice(a) }())\r
return cls0 }(function () {})`);
assert(downLevel(`geta=()=>({[a]:1})`), `geta = function () { return ((_ = {},\r
_[a] = 1, _))\r
var _ }`);
assert(downLevel(`if(){var a;const b;let c = c=>c(a,b);}`), `if ()(function (b, c) { a; b; c =function (c) { return c(a, b) }; }(b, c))\r
var a, tmp, b, c`);