var downLevel = require("./downLevel");
// 声明及解构
assert(downLevel(`const`), 'var');
assert(downLevel(`let`), 'var');
assert(downLevel(`var`), 'var');
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
assert(downLevel(`={a,[a]:c}={}`), '= _ = {}, a = _.a, c = _[a]');
assert(downLevel(`function (){var [a]=a;}`), "function () { var a = a[0]; }")
// 参数解构
assert(downLevel(`function ([a]){}`), "function (arg) { var a = arg[0]; }")
assert(downLevel(`function ([a],b){}`), "function (arg0, b) { var a = arg0[0]; }")
assert(downLevel(`function ([a],{b}){}`), "function (arg0, arg1) { var a = arg0[0], b = arg1.b; }")
assert(downLevel(`function (){var {a},{b};}`), "function () { var a, b; }")
assert(downLevel(`function (){var {a}=a,{b}=a;}`), "function () { var a = a.a, b = a.b; }")
assert(downLevel(`function (a=b){}`), "function (a) { if (a === undefined) a = b; }")
assert(downLevel(`function (a=b,[c],d,e=f){}`), "function (a, arg1, d, e) { if (a === undefined) a = b; var c = arg1[0]; if (e === undefined) e = f; }")
assert(downLevel(`function (arg1=b,[c],d,e=f){}`), "function (arg1, arg2, d, e) { if (arg1 === undefined) arg1 = b; var c = arg2[0]; if (e === undefined) e = f; }")
// class降级
assert(downLevel(`class a {}`), "function a() {}")
assert(downLevel(`class a {a=1}`), "function a() { this.a = 1 }")
assert(downLevel(`class a {a=1; b(){}}`), "function a() { this.a = 1; }; a.prototype.b = function () {}")
assert(downLevel(`=class a {a=1; b(){}}`), "= function (a) { a.prototype.b = function () {}; return a }(function a() { this.a = 1; })")
assert(downLevel(`class a {static b(){}}`), "function a() {}; a.b = function () {}")
assert(downLevel(`class a extends b{}`), "function a() {}; extends_(a, b)");
assert(downLevel(`class a extends class b{}{}`), "var a = function (b, a) { extends_(a, b); return a }(function b() {}, function a() {})");
assert(downLevel(`class a {get a(){}}`), `function a() {}; Object.defineProperty(a.prototype, "a", { get: function () {} })`);
assert(downLevel(`class a {set a(){}}`), `function a() {}; Object.defineProperty(a.prototype, "a", { set: function () {} })`);
assert(downLevel(`class a {get a(){}; get b(){}; set a(){}}`), `function a() {}; Object.defineProperty(a.prototype, "a", { get: function () {}, set: function () {} }); Object.defineProperty(a.prototype, "b", { get: function () {} });`);
assert(downLevel(`class a {set a(){}; get b(){}; set a(){}}`), `function a() {}; Object.defineProperty(a.prototype, "a", { set: function () {}, set: function () {} }); Object.defineProperty(a.prototype, "b", { get: function () {} });`);
// 属性降级
assert(downLevel(`={[a]:b}`), `= (_ = {}, _[a] = b, _)`);
assert(downLevel(`={a:1,[a]:1}`), `= (_ = { a: 1 }, _[a] = 1, _)`);
assert(downLevel(`={a,[a]:1}`), `= (_ = {}, _.a = a, _[a] = 1, _)`);
assert(downLevel(`={[a]:{[b]:1}}`), `= (_ = {}, _[a] = (_0 = {}, _0[b] = 1, _0), _)`);
assert(downLevel(`={[a]:{[b]:{[c]:1}}}`), `= (_ = {}, _[a] = (_0 = {}, _0[b] = (_1 = {}, _1[c] = 1, _1), _0), _)`);
assert(downLevel(`={[a]:{[b]:{[c]:1}},[b]:{[a]:1})}`), `= (_ = {}, _[a] = (_0 = {}, _0[b] = (_1 = {}, _1[c] = 1, _1), _0), _[b] = (_0 = {}, _0[a] = 1, _0), _)`);
// 对象展开
assert(downLevel(`={...a}`), `= extend({}, a)`);
assert(downLevel(`={...{a:1}}`), `= extend({}, { a: 1 })`);
assert(downLevel(`={...a,...c}`), `= extend({}, a, c)`);
assert(downLevel(`={...a,b}`), `= (_ = extend({}, a), _.b = b, _)`);
assert(downLevel(`={...a,b,...c}`), `= (_ = extend({}, a), _.b = b, extend(_, c), _)`);
assert(downLevel(`={...a,...c,b}`), `= (_ = extend({}, a, c), _.b = b, _)`);
assert(downLevel(`={...{},...c,b}`), `= (_ = extend({}, {}, c), _.b = b, _)`);
assert(downLevel(`={a(){},get c(){},b}`), `= (_ = {}, _.a = function () {}, Object.defineProperty(_, "c", { get: function () {} }), _.b = b, _)`);
assert(downLevel(`=[...a]`), `= Array.prototype.slice.call(a)`)
assert(downLevel(`=[...a,...b]`), `= (slice_ = Array.prototype.slice).call(a).concat(slice_.call(b))`)
assert(downLevel(`=[a,...b]`), `= [a].concat(Array.prototype.slice.call(b))`)
assert(downLevel(`=[a,...b,...c]`), `= [a].concat((slice_ = Array.prototype.slice).call(b), slice_.call(c))`)
assert(downLevel(`=[a,b,...c]`), `= [a, b].concat(Array.prototype.slice.call(c))`)
assert(downLevel(`=[a,b,...c,d]`), `= [a, b].concat(Array.prototype.slice.call(c), [d])`)
assert(downLevel(`=[a,b,...c,d,e,f]`), `= [a, b].concat(Array.prototype.slice.call(c), [d, e, f])`)
assert(downLevel(`=[a,b,...c,d,e,f,...g]`), `= [a, b].concat((slice_ = Array.prototype.slice).call(c), [d, e, f], slice_.call(g))`)
assert(downLevel(`=[a,b,...c,d,...e]`), `= [a, b].concat((slice_ = Array.prototype.slice).call(c), [d], slice_.call(e))`)
assert(downLevel(`a(...b)`), `a.apply(null, b)`)
assert(downLevel(`a(...b,...c)`), `a.apply(null, (slice_ = Array.prototype.slice).call(b).concat(slice_.call(c)))`)
assert(downLevel(`a(...b,c)`), `a.apply(null, Array.prototype.slice.call(b).concat([c]))`)
assert(downLevel(`a(b,...c)`), `a.apply(null, [b].concat(Array.prototype.slice.call(c)))`)
assert(downLevel(`a(a,b,...c,d,...e)`), `a.apply(null, [a, b].concat((slice_ = Array.prototype.slice).call(c), [d], slice_.call(e)))`)
assert(downLevel(`a.call(a,b,...c,d,...e)`), `a.call.apply(a, [a, b].concat((slice_ = Array.prototype.slice).call(c), [d], slice_.call(e)))`)
assert(downLevel(`a.b(a,b,...c,d,...e)`), `a.b.apply(a, [a, b].concat((slice_ = Array.prototype.slice).call(c), [d], slice_.call(e)))`)
assert(downLevel(`[].b(a,b,...c,d,...e)`), `(_ = []).b.apply(_, [a, b].concat((slice_ = Array.prototype.slice).call(c), [d], slice_.call(e)))`)
assert(downLevel(`a(...b).c(...d)`), `(_ = a.apply(null, b)).c.apply(_, d)`)
assert(downLevel(`a(...b).c(...d).e(...f)`), `(_ = (_ = a.apply(null, b)).c.apply(_, d)).e.apply(_, f)`)
// 对象收集
assert(downLevel(`function (a,...b){}`), "function (a) { var b = Array.prototype.slice.call(arguments, 1); }")
assert(downLevel(`function (a,...b,c){}`), "function (a, c) { var b = Array.prototype.slice.call(arguments, 1, -1); c = arguments.length > 1 ? arguments[arguments.length - 1] : undefined; }")
assert(downLevel(`function (a,...,c){}`), "function (a, c) { c = arguments.length > 1 ? arguments[arguments.length - 1] : undefined; }")
assert(downLevel(`function (a,...b,b){}`), "function (a, b) { b = arguments.length > 1 ? arguments[arguments.length - 1] : undefined; }")
assert(downLevel(`(a)=>k`), "function (a) { return k }")
assert(downLevel(`(...a) => k`), "function () { var a = Array.prototype.slice.call(arguments, 0); return k }")
assert(downLevel(`for(var o of os)`), "for (var _ = 0; _ < os.length && (o = os[_], true); _++)")
assert(downLevel(`for(var [a] of os)`), "for (var _ = 0; _ < os.length && (a = os[_][0], true); _++)")
assert(downLevel(`for(var [a,b] of os)`), "for (var _ = 0; _ < os.length && (_0 = os[_], a = _0[0], b = _0[1], true); _++)")
assert(downLevel(`[...a]=a`), "a = Array.prototype.slice.call(a, 0)")
assert(downLevel(`[c,...a]=a`), "c = a[0], a = Array.prototype.slice.call(a, 1)")
assert(downLevel(`[...a]=a`), "a = Array.prototype.slice.call(a, 0)")
assert(downLevel(`[...a,c]=a`), "_ = a, a = Array.prototype.slice.call(a, 0, -1), c = _.length > 1 ? _[_.length - 1] : undefined")
assert(downLevel(`{...a,c}=a`), `c = a.c, a = rest_(a, ["c"])`)
assert(downLevel(`{c,...a}=a`), `c = a.c, a = rest_(a, ["c"])`)
assert(downLevel(`{c,[c]:b,...a}=a`), `c = a.c, b = a[c], a = rest_(a, ["c", c])`)
assert(downLevel(`async function(){}`), `function(){return Promise.resolve()}`)
assert(downLevel(`async function(a){await a}`), `function(a){return Promise.resolve(a)}`)
assert(downLevel(`async function(a){await a,await b}`), `function(a){return async_(function(){return a},function(){return b}})`)
assert(downLevel(`async function(){await a,await b}`), `function(){return async_(function(){return a},function(){return b}})`)
assert(downLevel(`async function(a){ if(c)await a}`), `function(){return Promise.resolve(a).then(b)}`)
