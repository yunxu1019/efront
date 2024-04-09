// 执行 efront audit compile/audit_test，检查本文件中的错误
// body中不一定有b
while (body[i] !== b) i++;
// 参数有修改并使用了arguments
function a(a) {
    a = 1;
    console.log(arguments);
}

class a{
    a
    b(c){
        c=2;
        arguments;
    }
}