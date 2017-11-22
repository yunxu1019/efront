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
var _loginBtn = button("登录", "dark");
var _logoArea = icon("QQ");
css(_logoArea, "width:80px;height:80px;margin:60px auto 40px auto;")
css(_loginBtn, "width:200px;height:50px;margin:20px auto;");
var _pageCount = createElement(div);
css(_pageCount, "white-space:nowrap;right:0;bottom:0;color:#888;right:0;position:absolute;height:50px;line-height:50px;padding:0 16px;");
var register = anchor("注册", "/user/register");
vbox(_login);

appendChild(_login, _logoArea, _username, _password, _loginBtn, _pageCount, register);
function login(dst_url, src_url) {
    api("/server/count", { path: "/" }).success(function (response) {
        text(_pageCount, "累计访问量：" + response.result);
    });
    return _login;
}