function testPickSentence(text, index, except) {
    var js = new Javascript;
    js.defaultType = common.STRAP;
    var code = scanner2(text, js);
    assert(common.createString(common.pickSentence(code[index])), except);
}
testPickSentence(`function 九尾妖狐(){}`, 0, "function 九尾妖狐() {}")
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
assert(common.createString(common.pickArgument(scanner2(`a={a:1,c:d}`)[2][4])), 'c: d')
assert(common.createString(common.pickArgument(scanner2(`a=class{a=1\r\nc=d}`)[3][4])), 'c = d')
assert(common.createString(common.pickArgument(scanner2(`(a=1,c=d)`)[0][4])), 'c = d')
