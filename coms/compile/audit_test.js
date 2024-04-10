// 执行 efront audit compile/audit_test，检查本文件中的错误
// body中不一定有b
while (body[i] !== b) i++;
// 参数有修改并使用了arguments
function a(a) {
    a = 1;
    console.log(arguments);
}

class a {
    a
    b(c) {
        c = 2;
        arguments;
    }
}


// 正则表达式在异步函数中无法并发执行，是efront提取正则所致，目前要由用户手动处理
async function c() {
    var reg = /a/g;
    while (true) {
        await wait(20);
        reg.exec("aaa");
    }
}

// 正则表达式在步进函数中无法并发执行，是efront提取正则所致，目前要由用户手动处理
async function *c() {
    var reg = /a/g;
}