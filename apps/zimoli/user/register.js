var page = createElement("div");
var usernameElement = createElement(input);
var passwordElement = createElement(input);
passwordElement.type = "password";
var repeatpwElement = createElement(passwordElement);
var submitButton = button("立即注册");
css(submitButton, "height:36px;vertical-align:middle;width:100%");
var headWidth = 8;
var options = group(
    field("用户名", usernameElement, false, headWidth),
    field("密码", passwordElement, false, headWidth),
    field("确认密码", repeatpwElement, false, headWidth),
    field("", submitButton, false, headWidth)
);
appendChild(page, options);
titlebar("注册", ["提交"]);
function register() {
    return page;
}