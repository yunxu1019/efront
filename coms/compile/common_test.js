function testPickSentence(text, index, except) {
    var js = new Javascript;
    js.defaultType = common.STRAP;
    var code = scanner2(text, js);
    assert(common.createString(common.pickSentence(code[index])), except);
}
testPickSentence(`function 九尾妖狐(){}`, 0, "function 九尾妖狐() {}")
testPickSentence(`async function 九尾妖狐(){}`, 1, "async function 九尾妖狐() {}")
testPickSentence(`async\r\nfunction 九尾妖狐(){}`, 2, "function 九尾妖狐() {}")
testPickSentence(`function 九尾妖狐(){}`, 2, "function 九尾妖狐() {}")
testPickSentence(`a: function 九尾妖狐(){}`, 1, "a: function 九尾妖狐() {}")
testPickSentence(`a: function 九尾妖狐(){}`, 0, "a: function 九尾妖狐() {}")
testPickSentence(`a: function 九尾妖狐(){}`, 2, "a: function 九尾妖狐() {}")
testPickSentence(`a: 王天霸, 步惊云 b:叶流云, 四顾剑`, 2, "a: 王天霸, 步惊云")
testPickSentence(`a: 王天霸, 步惊云 b:叶流云, 四顾剑`, 4, "b: 叶流云, 四顾剑")
testPickSentence(`a: 王天霸, 步惊云; b:叶流云, 四顾剑`, 4, "a: 王天霸, 步惊云")
testPickSentence(`return a`, 1, "return a")
testPickSentence(`a=yield 1`, 3, "a = yield 1")
testPickSentence(`return a=yield 1`, 3, "return a = yield 1")
testPickSentence(`if(a)return a=yield 1`, 6, "return a = yield 1")
testPickSentence(`if(a)return\r\na=yield 1`, 6, "a = yield 1")
testPickSentence(`if(a)return\r\na=yield 1`, 3, "return\r\n")
testPickSentence(`if(a)import(a)`, 3, "import(a)")
testPickSentence(`for(;;) a:{import(a)}`, 2, "for (;;) a: { import(a) }")
testPickSentence(`for(;;) a:{import(a)}`, 3, "for (;;) a: { import(a) }")
testPickSentence(`while() a:{import(a)}`, 3, "while () a: { import(a) }")
testPickSentence(`do a:{}while() a:{import(a)}`, 2, "do a: {} while ()")
testPickSentence(`do a:{}while() a:{import(a)}`, 4, "do a: {} while ()")
testPickSentence(`do a:{}while() a:{import(a)}`, 5, "a: { import(a) }")
testPickSentence(`import(b)import(a)`, 3, "import(a)")
testPickSentence(`1+import(a)`, 3, "1 + import(a)")
testPickSentence(`1+await import(a)`, 3, "1 + await import(a)")
testPickSentence(`a as b`, 2, "a as b")
testPickSentence(`a of b`, 2, "a of b")
testPickSentence(`a in b`, 2, "a in b")
testPickSentence(`a instanceof b`, 2, "a instanceof b")
testPickSentence(`import a from b`, 3, "import a from b")
testPickSentence(`1+2+3`, 3, "1 + 2 + 3")
testPickSentence(`1+2+3`, 2, "1 + 2 + 3")
testPickSentence(`a+b+ ++c`, 5, "a + b + ++c")
testPickSentence(`a+b\r\n++c`, 5, "++c")
testPickSentence(`a+b++\r\nc`, 5, "c")
testPickSentence(`a+b++\r\nc`, 5, "c")
testPickSentence(`a+b++\r\n+c`, 6, "a + b++\r\n+ c")
testPickSentence(`if(a)try{}catch{}a;`, 0, "if (a) try {} catch {}")
testPickSentence(`if(a)try{}catch(a){}a;`, 0, "if (a) try {} catch (a) {}")
testPickSentence(`if(a)try{}catch{} else a;`, 0, "if (a) try {} catch {} else a")
testPickSentence(`if(a)try{}catch{} else if(a);`, 0, "if (a) try {} catch {} else if (a)")
assert(common.createString(common.pickArgument(scanner2(`a={a:1,c:d}`)[2][4])), 'c: d')
assert(common.createString(common.pickArgument(scanner2(`a=class{a=1\r\nc=d}`)[3][4])), 'c = d')
assert(common.createString(common.pickArgument(scanner2(`(a=1,c=d)`)[0][4])), 'c = d')
assert(scanner2(`for (let len of codeLengths) if (len) count[len]++;`).envs, { len: undefined })
function testCreateScope(code) {
    code = scanner2(code);
    common.createScoped(code);
}
testCreateScope(`class a{ static barch = new arch('b')}`)
assert(common.number_reg.test("00080000h"), true)
assert(common.number_reg.test("1.1920928955078125e-07F"), true)
assert(new RegExp(common.number_reg.source.replace(/^\^|\$$/g, ''), 'ig').exec("00080000h"), ["00080000h"])
assert(new RegExp(common.number_reg.source.replace(/^\^|\$$/g, ''), 'ig').exec("2A3h"), ["2A3h"])
assert(new RegExp(common.number_reg.source.replace(/^\^|\$$/g, ''), 'ig').exec("1.1920928955078125e-07F"), ["1.1920928955078125e-07F"])
function testCrateString(text, want = text) {
    var code = scanner2(text);
    code.keepspace = false;
    var res = common.createString(code);
    assert(res, want);
}
testCrateString('else\r\na:{break a}', 'else a:{break a}')
testCrateString('do\r\na:{break a}', 'do a:{break a}')
testCrateString('try\r\na:{break a}', 'try a:{break a}')
testCrateString('finally\r\na:{break a}', 'finally a:{break a}')
testCrateString('catch\r\na:{break a}', 'catch a:{break a}')
testCrateString(
    'a = function () {}\r\n a: do { break a } white(true)',
    'a=function(){};a:do{break a}white(true)'
)
testCrateString(
    'function a() {}\r\nreturn',
    'function a(){}return'
)
testCrateString(
    'a = function () {}()\r\n return',
    'a=function(){}();return'
)
testCrateString(
    'a = class{}\r\n return',
    'a=class{};return'
)
testCrateString(
    'class a{}\r\n return',
    'class a{}return'
)
testCrateString(
    'class a extends class b{}{}\r\n return',
    'class a extends class b{}{}return'
)
testCrateString(
    'new class a extends class b{}{}\r\n return',
    'new class a extends class b{}{};return'
)
testCrateString(
    'new class a extends function b(){}{}\r\n return',
    'new class a extends function b(){}{};return'
)
testCrateString(
    'new class a extends()=>{}{}\r\n return',
    'new class a extends()=>{}{};return'
)
testCrateString('if(true){}a:do{break a}white(true)')
common.createString.debug = true;
testCrateString('`${getobjname()},`')