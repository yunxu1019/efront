var unstruct = require('./unstruct');
var scanner2 = require("./scanner2");
var { createString } = require("./common");
var r = 10;
function test(codetext, expect, ret = false) {
    var code = scanner2(codetext), i = -2;
    try { code = unstruct(code, () => ++i >= 0 ? "_" + i : '_', ret && "@"); } catch (e) { console.log(r); throw e }
    assert(code.map(createString).join(";\r\n "), expect, r++);
}
test('a+b', "a + b");
test('var a = b', "a = b");
test('a + !c', "_ = !c, a + _");
test('a + b * c', "_ = b * c, a + _");
test('a + b * !c', "_ = !c, _ = b * _, a + _");
test('a + b * c ** !d', '_ = !d, _ = c ** _, _ = b * _, a + _');
test('a * a + b * c', "_ = a * a, _0 = b * c, _ + _0");
test('a * a + b * c * c ** d', "_ = a * a, _0 = b * c, _1 = c ** d, _0 = _0 * _1, _ + _0");
test('a * a || b * c * c ** d', "_ = a * a @re _ = b * c, _0 = c ** d, _ * _0");
test('a * a || b * c || c * d', "_ = a * a @re _ = b * c @re c * d");
test('a || b || c', "_ = a; if (_) return [1, 0]; _ = b; if (_) return [1, 0]; c", true);
test('a?b:c', "if (!a) return [1, 0]; _ = b; return [2, 0];\r\n _ = c; return [1, 0]");
test('a * a && b * c * c ** d', "_ = a * a @rz _ = b * c, _0 = c ** d, _ * _0");
test('a = 1 + 2', "a = 1 + 2", true);
test('a = b', "a = b", true);
test('a.a = b', "a.a = b", true);
test('loaded[f.name] = a', "_ = f.name; loaded[_] = a", true);
test('a = b = c', "b = c; a = c", true);
test('a = b.b = c.c', "_ = c.c; b.b = _; a = _", true);
test('a = b = c + d', "b = c + d; a = b", true);
test('a = b = c + d * 1', "_ = d * 1, b = c + _; a = b", true);
test('return a = b', "a = b; return [b, 2]", true);
test('a*a', "a * a", true);
test('a * a && b * c * c ** d', "_ = a * a; if (!_) return [1, 0]; _ = b * c, _0 = c ** d, _ * _0", true);
test('a * a || b * c * c ** d', "_ = a * a; if (_) return [1, 0]; _ = b * c, _0 = c ** d, _ * _0", true);
test('a * a ?? b * c * c ** d', "_ = a * a; if (_ !== null && _ !== undefined) return [1, 0]; _ = b * c, _0 = c ** d, _ * _0", true);
test('a * a && await b*c', "_ = a * a; if (!_) return [2, 0]; _ = b; return [_, 1];\r\n _ = @; _ * c", true);
test("await a", "_ = a; return [_, 1]", true);
test("yield a", "return [a, 3]", true);
test("await a()", "_ = a(); return [_, 1]", true);
test("yield a()", "_ = a(); return [_, 3]", true);
test("(1+ +1)", "_ = +1, _ = 1 + _; (_)", true);
test("await a(await b)", "_ = b; return [_, 1];\r\n _ = @; _ = a(_); return [_, 1]", true);
test("await a(await b).s(await c)", "_ = b; return [_, 1];\r\n _ = @; _ = a(_); _0 = c; return [_0, 1];\r\n _0 = @; _ = _.s(_0); return [_, 1]", true);
test("a*a + await a(await b).s(await c)", "_ = a * a, _0 = b; return [_0, 1];\r\n _0 = @; _0 = a(_0); _1 = c; return [_1, 1];\r\n _1 = @; _0 = _0.s(_1); return [_0, 1];\r\n _0 = @; _ + _0", true);
test("a*a + await a(await b(await c)).s(await c)", "_ = a * a, _0 = c; return [_0, 1];\r\n _0 = @; _0 = b(_0); return [_0, 1];\r\n _0 = @; _0 = a(_0); _1 = c; return [_1, 1];\r\n _1 = @; _0 = _0.s(_1); return [_0, 1];\r\n _0 = @; _ + _0", true);
test("await a, await b", "_ = a; return [_, 1];\r\n _ = @; _ = b; return [_, 1]", true);
test("await a * b, await b", "_ = a; return [_, 1];\r\n _ = @; _ * b; _ = b; return [_, 1]", true);
test("if(a);", "if (!a) return [1, 0]; return [1, 0]", true);
test("if(a) return a;", "if (a) return [a, 2]", true);
test("if(a) { if(b) return a;} else return d", "if (!a) return [2, 0]; if (b) return [a, 2]; return [1, 0];\r\n return [2, 0];\r\n return [d, 2]", true);
test("if(a) return a; else return b", "if (a) return [a, 2]; return [b, 2]", true);
test("if(a) await b", "if (!a) return [2, 0]; _ = b; return [_, 1];\r\n _ = @; return [1, 0]", true);
test("if(a) await b; else await c", "if (!a) return [2, 0]; _ = b; return [_, 1];\r\n _ = @; return [3, 0];\r\n _ = c; return [_, 1];\r\n _ = @; return [1, 0]", true);
test("if(a) b; else await c", "if (!a) return [1, 0]; b; return [3, 0];\r\n _ = c; return [_, 1];\r\n _ = @; return [1, 0]", true);
test("if(a) await b; else if(e) await c", "if (!a) return [2, 0]; _ = b; return [_, 1];\r\n _ = @; return [3, 0];\r\n if (!e) return [2, 0]; _ = c; return [_, 1];\r\n _ = @; return [1, 0]", true);
test("if(a) await b; else if(e) await c else await d", "if (!a) return [2, 0]; _ = b; return [_, 1];\r\n _ = @; return [5, 0];\r\n if (!e) return [2, 0]; _ = c; return [_, 1];\r\n _ = @; return [3, 0];\r\n _ = d; return [_, 1];\r\n _ = @; return [1, 0]", true);
test("if(await a) await b", "_ = a; return [_, 1];\r\n if (!@) return [2, 0]; _ = b; return [_, 1];\r\n _ = @; return [1, 0]", true);
test("for(a in b)", "for (a in b)", true);
test("for(var a in b) a.push()", "for (var a in b) a.push()", true);
test("for(;;)", "return [0, 0]", true);
test("for(a = os[Symbol.iterator] || os[Symbol.asyncIterator] || Array.prototype[Symbol.iterator], a = a.call(os), b = a.next(); !b.done && (o = b.value, true); b = a.next())", "_ = Symbol.iterator; _ = os[_]; if (_) return [1, 0]; _ = Symbol.asyncIterator; _ = os[_]; if (_) return [1, 0]; _ = Symbol.iterator; _ = Array.prototype[_];\r\n a = _; a = a.call(os); b = a.next(); return [1, 0];\r\n _ = !b.done; if (!_) return [1, 0]; o = b.value; _ = (true);\r\n if (!_) return [1, 0]; b = a.next(); return [-1, 0]", true);
test("for(a=0;a<1;a++)if(a==0)continue\r\n else a=1", `a = 0; return [1, 0];\r\n _ = a < 1; if (!_) return [3, 0]; _ = a == 0; if (_) return [2, 0]; return [1, 0];\r\n a = 1; return [1, 0];\r\n _ = a++; return [-2, 0]`, true);
test("for(a=0;a<1;a++)if(a==0){continue} else {a=1}", `a = 0; return [1, 0];\r\n _ = a < 1; if (!_) return [3, 0]; _ = a == 0; if (!_) return [1, 0]; return [2, 0];\r\n a = 1; return [1, 0];\r\n _ = a++; return [-2, 0]`, true);
test("for(a=0;a<1;a++){if(a==0){a=2;continue} else if(b) {a=1;continue} c=3}", `a = 0; return [1, 0];\r\n _ = a < 1; if (!_) return [4, 0]; _ = a == 0; if (!_) return [1, 0]; a = 2; return [3, 0];\r\n if (!b) return [1, 0]; a = 1; return [2, 0];\r\n c = 3; return [1, 0];\r\n _ = a++; return [-3, 0]`, true);
test("for(a=0;a<10;a++) await a", "a = 0; return [1, 0];\r\n _ = a < 10; if (!_) return [2, 0]; _ = a; return [_, 1];\r\n _ = @; _ = a++; return [-1, 0]", true);
test("for(a=0;a<10;a++) await a, await b", "a = 0; return [1, 0];\r\n _ = a < 10; if (!_) return [3, 0]; _ = a; return [_, 1];\r\n _ = @; _ = b; return [_, 1];\r\n _ = @; _ = a++; return [-2, 0]", true);
test("for(a=0;b=2,a<10;a++) await a, await b", "a = 0; return [1, 0];\r\n b = 2; _ = a < 10; if (!_) return [3, 0]; _ = a; return [_, 1];\r\n _ = @; _ = b; return [_, 1];\r\n _ = @; _ = a++; return [-2, 0]", true);
test("while(a) await b", "if (!a) return [2, 0]; _ = b; return [_, 1];\r\n _ = @; return [-1, 0]", true);
test("do{await b}while(a)", "_ = b; return [_, 1];\r\n _ = @; if (a) return [-1, 0]", true);
test("switch(a){case 1:}", "if (a === 1) return [1, 0]; return [1, 0]", true);
test("switch(a){case 1: default:}", "if (a === 1) return [1, 0]; return [1, 0]", true);
test("switch(a.a){case 1:}", "_ = a.a; if (_ === 1) return [1, 0]; return [1, 0]", true);
test("switch(a){case 1:break;}", "if (a === 1) return [1, 0]; return [1, 0]", true);
test("switch(a){case 1:break;case 2:break;}", "if (a === 1) return [1, 0]; if (a === 2) return [1, 0]; return [1, 0]", true);
test("switch(a){case 1:case 2:break;}", "if (a === 1) return [1, 0]; if (a === 2) return [1, 0]; return [1, 0]", true);
test("switch(a){case 1:case 2:x=1;}", "if (a === 1) return [1, 0]; if (a === 2) return [1, 0]; return [2, 0];\r\n x = 1; return [1, 0]", true);
test("switch(a){case 1:case 2:x=1;}", "if (a === 1) return [1, 0]; if (a === 2) return [1, 0]; return [2, 0];\r\n x = 1; return [1, 0]", true);
test("with(a){ a = 1}", `if (_ = with_("a", [a])) _.a = 1; else a = 1;`, true);
test("try{a=2+1}catch(e){return;}", 'return [65537, 7];\r\n a = 2 + 1; return [0, 9];\r\n e = @; return [undefined, 2];\r\n return [1, 9]', true);
test("try{a=2+1}catch(e){}", 'return [1, 7];\r\n a = 2 + 1; return [0, 9];\r\n return [1, 9]', true);
test("try{a=2+1}catch(e){a=3}", 'return [65537, 7];\r\n a = 2 + 1; return [0, 9];\r\n e = @; a = 3; return [0, 9];\r\n return [1, 9]', true);
test("(function(){})", '_ = function () {}; (_)', true);
test("(1+2*function(){}())", '_ = 2 * function () {}(), _ = 1 + _; (_)', true);
test("function a(){}", 'function a() {}', true);
test("await new Promise(function(){})", '_ = function () {}; _ = new Promise(_); return [_, 1]', true);
test(`onerror({ status: xhr.status, response: "Cookie解析异常!", toString: toResponse })`, '_ = { status: xhr.status, response: "Cookie解析异常!", toString: toResponse }; onerror(_)', true);
test(`if (!/^https\\:\\/\\/|^s\\/\\//.test(url)) console.warn("请使用https访问如下路径:" + url)`, '_ = /^https\\:\\/\\/|^s\\/\\//.test(url); if (_) return [1, 0]; _ = "请使用https访问如下路径:" + url; _ = console.warn(_); return [1, 0]', true);
test(`url += (/\\?/.test(url) ? "&" : "?") + datas;`, '_ = /\\?/.test(url); if (!_) return [1, 0]; _ = "&"; return [2, 0];\r\n _ = "?"; return [1, 0];\r\n _ = (_); _ = _ + datas; url = url + _', true);
test(`a = newname.querySelector("input,textarea").value = c.name.replace(/\\/$/, '')`, `_ = c.name.replace(/\\/$/, ''); newname.querySelector("input,textarea").value = _; a = _`, true);
test(`if (selected[f.url]) f.selected = true;`, `_ = f.url; _ = selected[_]; if (!_) return [1, 0]; f.selected = true; return [1, 0]`, true);
test(`location.protocol  + parseURL(a.b).host `, `_ = a.b; _ = parseURL(_); location.protocol + _.host`, true);
test(`var base = location.protocol + "//" + parseURL(this.$scope.data.host).host + "/";`, `_ = location.protocol + "//", _0 = this.$scope.data.host; _0 = parseURL(_0); _ = _ + _0.host, base = _ + "/"`, true);
test(`a=a+b*c+c*d`, `_ = b * c, _ = a + _, _0 = c * d, a = _ + _0`, true);
test(`cc.name += "<f test></f>"`, `_ = cc.name + "<f test></f>"; cc.name = _`, true);
test("yield a", 'return [a, 3]', true);
test("throw a", 'throw a', true);
test("debugger", 'debugger', true);
test("a(b,b+=1)", '_ = b; _0 = b + 1; b = _0; a(_, _0)', true);
test("while(a){if(b){if(c);else d;continue;}}", 'if (!a) return [4, 0]; if (!b) return [3, 0]; if (!c) return [1, 0]; return [2, 0];\r\n d; return [1, 0];\r\n return [-2, 0];\r\n return [-3, 0]', true);
test("/*abc*/", '/*abc*/', true);
test("//aaa", '//aaa', true);