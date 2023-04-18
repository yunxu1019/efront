var { createExpressList, createString } = common;
var test = function (text) {
    var code = scanner2(text);
    var exps = createExpressList(code);
    console.log(code.isExpressQueue(),exps.map(createString))
};
test('a')
test('a+b=c')
test('if(a)a+b=c')
test('if(a)b=c; else c=d+a')
test('if(a)b=c; else if(m)c=d+a;else aa')
test('with(a)b=c; if(m)c=d+a;else aa')
test('try{}catch(){}finally{} if(m)c=d+a;else aa')
test('try{}catch{}finally{} if(m)c=d+a;else aa')
test('try{}catch{}finally{} if(m)c=d+a;else aa debugger\r\n a')
test('try{}catch{}\r\nfinally{}\r\n if(m)c=d+a;else aa debugger\r\n a')
test('var a')
test('var a,b,c=1;')
test('a:')