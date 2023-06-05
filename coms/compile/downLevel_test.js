var downLevel = require("./downLevel");
var _asert = assert, i = 10;
assert = function (a, b) {
    var d = 1;
    b = b.split(/(?<!\r)\n/), d = b.length, b = b.join("\r\n");
    _asert(a, b, i);
    i += d;
}
// 声明及解构
assert(downLevel(`var [name, type, options] = piece, key, repeat;`), 'var name = piece[0], type = piece[1], options = piece[2], key, repeat;');
assert(downLevel(`const`), '');
assert(downLevel(`let`), '');
assert(downLevel(`var`), '');
assert(downLevel(`{let a; function b(){a};return;}`), `if (tmp = 0, tmp0 =function (a) { a; function b() { a }; return tmp = 1, void 0; }(a)) { if (tmp === 1) return tmp0; }
var tmp, a, tmp0`);
assert(downLevel(`const a,b,c`), 'var a, b, c');
assert(downLevel(`let a,b,c`), 'var a, b, c');
assert(downLevel(`var a;{let a,b,c}`), 'var a; { var a0, b, c }');
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
assert(downLevel(`var {a}=1.1`), 'var a = 1.1 .a');
assert(downLevel(`var {c:a}=b`), 'var a = b.c');
assert(downLevel(`var {"c":a}=b`), 'var a = b["c"]');
assert(downLevel(`var {1:a}=b`), 'var a = b[1]');
assert(downLevel(`var [,a]=b`), 'var a = b[1]');
assert(downLevel(`var {[c]:a}=b`), 'var a = b[c]');
assert(downLevel(`var {1:a}=b`), 'var a = b[1]');
assert(downLevel(`var {.1:a}=b`), 'var a = b[.1]');
assert(downLevel(`var {a,[a]:c}=b`), 'var a = b.a, c = b[a]');
assert(downLevel(`var {a}=a`), 'var a = a.a');
assert(downLevel(`var {a,b}=a`), 'var _ = a, a = a.a, b = _.b');
assert(downLevel(`var {a:{a:{a}}}=b`), 'var a = b.a.a.a');
assert(downLevel(`var {a,[a]:c}={}`), 'var _ = {}, a = _.a, c = _[a]');
assert(downLevel(`={a,[a]:c}={}`), '= _ = {}, a = _.a, c = _[a]\r\nvar _');
var tmp = scanner2(`var {window}=this`); tmp.helpcode = false; tmp.detour(); assert(downLevel.code(tmp).toString(), `this_ = this; var window = this_["window"]
var this_`);
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
assert(downLevel(`class a {a=1}`), "function a() { this.a = 1 }")
assert(downLevel(`class a {a=1; b(){}}`), "function a() { this.a = 1; }; a.prototype.b = function () {}")
assert(downLevel(`=class a {a=1; b(){}}`), "= function (a) { a.prototype.b = function () {}\r\nreturn a }(function a() { this.a = 1; })")
assert(downLevel(`var a=class {a=1; static b=2 b(){}};`), "var a = function (cls0) { cls0.b = 2\r\ncls0.prototype.b = function () {}\r\nreturn cls0 }(function () { this.a = 1; });")
assert(downLevel(`var a=class { constructor(){this.a=1}; static b=2 b(){}};`), "var a = function (cls0) { cls0.b = 2\r\ncls0.prototype.b = function () {}\r\nreturn cls0 }(function () { this_ = this; this_.a = 1\r\nvar this_ });")
assert(downLevel(`class a {static b(){}}`), "function a() {}; a.b = function () {}")
assert(downLevel(`class a extends b{}`), `function a() {
var this_ = b.apply(this, arguments) || this;
return this_ }; extends_(a, b)`);
assert(downLevel(`class a extends class b{}{}`), `var a = function (b, a) { extends_(a, b)\r\nreturn a }(function b() {}, function a() {
var this_ = b.apply(this, arguments) || this;
return this_ })`);
assert(downLevel(`class a {get a(){}}`), `function a() {};
Object.defineProperty(a.prototype, "a", { get: function () {} })`);
assert(downLevel(`class a {set a(){}}`), `function a() {};
Object.defineProperty(a.prototype, "a", { set: function () {} })`);
assert(downLevel(`class a {get a(){}; get b(){}; set a(){}}`), `function a() {};
Object.defineProperty(a.prototype, "a", { get: function () {}, set: function () {} });
Object.defineProperty(a.prototype, "b", { get: function () {} });`);
assert(downLevel(`class a {set a(){}; get b(){}; set a(){}}`), `function a() {};
Object.defineProperty(a.prototype, "a", { set: function () {}, set: function () {} });
Object.defineProperty(a.prototype, "b", { get: function () {} });`);
i++// 属性降级
assert(downLevel(`return ({b,async a(){}})`), `return ((_ = {},
_.b = b,
_.a = function () { return async_() }, _))\r\nvar _`);
assert(downLevel(`var a={b,async a(){}}`), `var a = (_ = {},
_.b = b,
_.a = function () { return async_() }, _)\r\nvar _`);
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
Object.defineProperty(_, "c", { get: function () {} }),
_.b = b, _)\r\nvar _`);
assert(downLevel(`=[...a]`), `= Array.prototype.slice.call(a)`)
assert(downLevel(`let a = [...a,...a()];`), `var a = (slice_ = Array.prototype.slice).call(a).concat(slice_.call(a()));
var slice_`)
assert(downLevel(`=[...a,...b]`), `= (slice_ = Array.prototype.slice).call(a).concat(slice_.call(b))\r\nvar slice_`)
assert(downLevel(`=[a,...b]`), `= [a].concat(Array.prototype.slice.call(b))`)
assert(downLevel(`=[a,...b,...c]`), `= [a].concat((slice_ = Array.prototype.slice).call(b), slice_.call(c))\r\nvar slice_`)
assert(downLevel(`=[a,b,...c]`), `= [a, b].concat(Array.prototype.slice.call(c))`)
assert(downLevel(`=[a,b,...c,d]`), `= [a, b].concat(Array.prototype.slice.call(c), [d])`)
assert(downLevel(`=[a,b,...c,d,e,f]`), `= [a, b].concat(Array.prototype.slice.call(c), [d, e, f])`)
assert(downLevel(`=[a,b,...c,d,e,f,...g]`), `= [a, b].concat((slice_ = Array.prototype.slice).call(c), [d, e, f], slice_.call(g))\r\nvar slice_`)
assert(downLevel(`=[a,b,...c,d,...e]`), `= [a, b].concat((slice_ = Array.prototype.slice).call(c), [d], slice_.call(e))\r\nvar slice_`)
assert(downLevel(`a(...b)`), `a.apply(null, b)`)
assert(downLevel(`a(c,d,e,...b(...c))`), `a.apply(null, [c, d, e].concat(Array.prototype.slice.call(b.apply(null, c))))`)
assert(downLevel(`a(c,d,e,...b.a(...c))`), `a.apply(null, [c, d, e].concat(Array.prototype.slice.call(b.a.apply(b, c))))`)
assert(downLevel(`a(c,d,e,...b.a.c(...c))`), `a.apply(null, [c, d, e].concat(Array.prototype.slice.call((_ = b.a).c.apply(_, c))))\r\nvar _`)
assert(downLevel(`a(...b,...c)`), `a.apply(null, (slice_ = Array.prototype.slice).call(b).concat(slice_.call(c)))\r\nvar slice_`)
assert(downLevel(`a(...b,c)`), `a.apply(null, Array.prototype.slice.call(b).concat([c]))`)
assert(downLevel(`a(b,...c)`), `a.apply(null, [b].concat(Array.prototype.slice.call(c)))`)
assert(downLevel(`a(a,b,...c,d,...e)`), `a.apply(null, [a, b].concat((slice_ = Array.prototype.slice).call(c), [d], slice_.call(e)))\r\nvar slice_`)
assert(downLevel(`a.call(a,b,...c,d,...e)`), `a.call.apply(a, [a, b].concat((slice_ = Array.prototype.slice).call(c), [d], slice_.call(e)))\r\nvar slice_`)
assert(downLevel(`a.b(a,b,...c,d,...e)`), `a.b.apply(a, [a, b].concat((slice_ = Array.prototype.slice).call(c), [d], slice_.call(e)))\r\nvar slice_`)
assert(downLevel(`[].b(a,b,...c,d,...e)`), `(_ = []).b.apply(_, [a, b].concat((slice_ = Array.prototype.slice).call(c), [d], slice_.call(e)))\r\nvar _, slice_`)
assert(downLevel(`a(...b).c(...d)`), `(_ = a.apply(null, b)).c.apply(_, d)\r\nvar _`)
assert(downLevel(`a(...b).c(...d).e(...f)`), `(_ = (_ = a.apply(null, b)).c.apply(_, d)).e.apply(_, f)\r\nvar _`)
assert(downLevel(`diagnostic.relatedInformation.push(...relatedInformation);`), `(_ = diagnostic.relatedInformation).push.apply(_, relatedInformation);\r\nvar _`);
assert(downLevel(`const typeNames = [79 /* Identifier */, ...typeKeywords];`), `var typeNames = [79 /* Identifier */].concat(Array.prototype.slice.call(typeKeywords));`);
i++// 箭头函数
assert(downLevel(`a=>k`), "function (a) { return k }")
assert(downLevel(`function (a,...b,b){}`), "function (a, b) { b = arguments.length > 1 ? arguments[arguments.length - 1] : undefined; }")
assert(downLevel(`(a)=>k`), "function (a) { return k }")
assert(downLevel(`(a=1)=>k`), "function (a) { if (a === undefined) a = 1; return k }")
assert(downLevel(`([a])=>b`), "function (arg) { var a = arg[0]; return b }")
assert(downLevel(`map(([a])=>a)`), "map(function (arg) { var a = arg[0]; return a })")
assert(downLevel(`var [_, R, G, B, A] = rgbHex.exec(color).map(a => parseInt(a + a, 16));`), "var _0 = rgbHex.exec(color).map(function (a) { return parseInt(a + a, 16) }), _ = _0[0], R = _0[1], G = _0[2], B = _0[3], A = _0[4];")
assert(downLevel(`if (/^(?:select|input|textarea)$/i.test(initialEvent.target.tagName) || getTargetIn(a => a.nodrag || a.hasAttribute('nodrag'), initialEvent.target)) return;`), "if (/^(?:select|input|textarea)$/i.test(initialEvent.target.tagName) || getTargetIn(function (a) { return a.nodrag || a.hasAttribute('nodrag') }, initialEvent.target)) return;")
i++// 对象收集
assert(downLevel(`function (a,...b){}`), "function (a) { var b = Array.prototype.slice.call(arguments, 1); }")
assert(downLevel(`function (a,...b,c){}`), "function (a, c) { var b = Array.prototype.slice.call(arguments, 1, -1); c = arguments.length > 1 ? arguments[arguments.length - 1] : undefined; }")
assert(downLevel(`function (a,...,c){}`), "function (a, c) { c = arguments.length > 1 ? arguments[arguments.length - 1] : undefined; }")
assert(downLevel(`(...a) => k`), "function () { var a = Array.prototype.slice.call(arguments, 0); return k }")
assert(downLevel(`for(o of os) noSymbol`), "for (_ = 0, _0 = os.length; _ < _0 && (o = os[_], true); _++) noSymbol\r\nvar _, _0")
assert(downLevel(`for(var o of os) Symbol`), "for (var o, _0 = os[Symbol.iterator] || os[Symbol.asyncIterator] || Array.prototype[Symbol.iterator], _0 = _0.call(os), _ = _0.next(); !_.done && (o = _.value, true); _ = _0.next()) Symbol\r\nvar _, _0")
assert(downLevel(`for(var o of os) Symbol`), "for (var o, _0 = os[Symbol.iterator] || os[Symbol.asyncIterator] || Array.prototype[Symbol.iterator], _0 = _0.call(os), _ = _0.next(); !_.done && (o = _.value, true); _ = _0.next()) Symbol\r\nvar _, _0")
assert(downLevel(`for(var o of o)Symbol`), "for (var o, _1 = o, _0 = _1[Symbol.iterator] || _1[Symbol.asyncIterator] || Array.prototype[Symbol.iterator], _0 = _0.call(_1), _ = _0.next(); !_.done && (o = _.value, true); _ = _0.next()) Symbol\r\nvar _, _0, _1")
assert(downLevel(`for(var [a] of os)Symbol`), "for (var a, _0 = os[Symbol.iterator] || os[Symbol.asyncIterator] || Array.prototype[Symbol.iterator], _0 = _0.call(os), _ = _0.next(); !_.done && (a = _.value[0], true); _ = _0.next()) Symbol\r\nvar _, _0")
assert(downLevel(`for(var [a,b] of os)Symbol`), "for (var a, b, _0 = os[Symbol.iterator] || os[Symbol.asyncIterator] || Array.prototype[Symbol.iterator], _0 = _0.call(os), _ = _0.next(); !_.done && (_1 = _.value, a = _1[0], b = _1[1], true); _ = _0.next()) Symbol\r\nvar _, _0, _1")
assert(downLevel(`[...a]=a`), "a = Array.prototype.slice.call(a, 0)")
assert(downLevel(`[c,...a]=a`), "c = a[0], a = Array.prototype.slice.call(a, 1)")
assert(downLevel(`[...a]=a`), "a = Array.prototype.slice.call(a, 0)")
assert(downLevel(`[...a,c]=a`), "_ = a, a = Array.prototype.slice.call(a, 0, -1), c = _.length > 1 ? _[_.length - 1] : undefined\r\nvar _")
assert(downLevel(`{...a,c}=a`), `c = a.c, a = rest_(a, ["c"])`)
assert(downLevel(`{c,...a}=a`), `c = a.c, a = rest_(a, ["c"])`)
assert(downLevel(`{c,[c]:b,...a}=a`), `c = a.c, b = a[c], a = rest_(a, ["c", c])`)
i++//异步或步进函数
assert(downLevel(`function *(){yield *a}`), `function () { return aster_(
function () {
_; _0 = 0; _3 = a.length; _1 = _3; return [1, 0]
},
function () {
_3 = _0 < _1; if (!_3) return [1, 0]; _4 = a[_0]; _ = _4; _3 = (_4, true)
},
function () {
if (!_3) return [2, 0]; return [_, 3]
},
function () {
_3 = _0++; return [-2, 0]
})
var _, _0, _1, _3, _4 }`)
assert(downLevel(`async function(){}`), `function () { return async_() }`)
assert(downLevel(`async function(){for(var a of b){Symbol}}`), `function () { return async_(
function () {
a; _3 = Symbol.iterator; _2 = b[_3]; if (_2) return [1, 0]; _3 = Symbol.asyncIterator; _2 = b[_3]; if (_2) return [1, 0]; _3 = Symbol.iterator; _2 = Array.prototype[_3]
},
function () {
_0 = _2; _2 = _0.call(b); _0 = _2; _2 = _0.next(); _ = _2; return [1, 0]
},
function () {
_2 = !_.done; if (!_2) return [1, 0]; _3 = _.value; a = _3; _2 = (_3, true)
},
function () {
if (!_2) return [1, 0]; Symbol; _2 = _0.next(); _ = _2; return [-1, 0]
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
if (!b) return [1, 0]; return [4, 0]
},
function () {
if (!a) return [1, 0]; return [2, 0]
},
function () {
_0 = getRequestProtocol(url) + "//", _0 = _0 + location; location = _0; return [1, 0]
},
function () {
return [1, 0]
})
var _0 }`);
