
titlebar(i18n`login`);
var page = div();
page.innerHTML = `
<name placeholder=${i18n`name`}></name>
<pswd placeholder=${i18n`password`}></pswd>
<btn ng-if='!login.ing' ng-click=login()>${i18n`login`}</btn>
<btn ng-if='login.ing'>${i18n('登录中', 'Logon')}</btn>
<a class=anchor ng-click=go('getPassword')>${i18n`Forgot password`}</a>
`;
var go_args;
render(page, {
    login: {},
    go,
    name: input,
    pswd: password,
    btn: button,
    login() {
        var login = this.login;
        login.ing = true;
        user.Login(_username.value, _password.value).then(function () {
            login.ing = false;
            go.apply(null, go_args);
        }).catch(function () {
            login.ing = false;
        });
    }
});
vbox(page);
page.initialStyle = 'marginLeft:100%;';
var [_username, _password, _loginBtn] = page.children;

function login(args) {
    go_args = args;
    return page;
}