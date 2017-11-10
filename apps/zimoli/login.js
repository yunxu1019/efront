var tbar = titlebar("登录");
var _login = createElement(div, tbar);
css(_login, "padding-top:50px;position:absolute;background-color:#333636;top:0;bottom:0;left:0;right:0;height:100%;width:100%;");
var _input = createElement(input);
css(_input, "display:block;position:relative;background-color:rgba(255,255,255,.1);height:50px;font-size:16px;border:none;outline:none;color:#fff;text-align:left;padding:0 10px;margin:10px auto;width:300px");
var _password = createElement(_input);
_password.type = "password";
_password.placeholder = "密码";
var _username = createElement(_input);
_username.placeholder = "用户";
var _loginBtn = button("登录");
var _logoArea = icon("QQ");
css(_logoArea, "width:80px;height:80px;margin:60px auto 40px auto;")
css(_loginBtn, "width:200px;height:50px;background-color:rgba(255,255,255,.3);margin:20px auto;");
appendChild(_login, _logoArea, _username, _password, _loginBtn);
function login(dst_url, src_url) {
    console.error(arguments, dst_url, src_url)
    return _login;
}