
titlebar(i18n`login`);
var page = div();
page.innerHTML = `
<name placeholder=${i18n`name`}></name>
<pswd placeholder=${i18n`password`}></pswd>
<btn ng-click=login()>${i18n`login`}</btn>
<a class=anchor ng-click=go('getPassword')>${i18n`Forgot password`}</a>
`;
render(page, {
    go,
    name: input,
    pswd: password,
    btn: button,
    login() {
        user.Login(_username.value, _password.value).then(function () {
        });
    }
})
vbox(page);
page.initialStyle = 'marginLeft:100%;';
var [_username, _password, _loginBtn] = page.children;

function login(dst_url, src_url) {
    // api("/_urls", { path: "/" }).success(function (response) {
    //     text(_pageCount, "累计访问量：" + response.result);
    // });
    return page;
}