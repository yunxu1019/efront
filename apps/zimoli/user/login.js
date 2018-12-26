
titlebar(i18n`login`);
var page = div();
page.innerHTML = `
<name placeholder=${i18n`name`} ng-model='username'></name>
<pswd placeholder=${i18n`password`} ng-model='password'></pswd>
<btn ng-if='!login.ing' ng-click=login()>
<span ng-if='!username'>${i18n(`游客`, "Guest")}</span>${i18n`login`}</btn>
<btn ng-if='login.ing' class='busy'>
<span ng-if='!username'>${i18n(`游客`, "Guest")}</span>${i18n('登录中', 'Logon')}</btn>
<a class=anchor ng-click=go('getPassword')>${i18n`Forgot password`}</a>
`;
var go_args;
render(page, {
    login: {},
    go,
    name: input,
    pswd: password,
    btn: button,
    username: "",
    password: null,
    guest() {
        var login = this.login;
        login.ing = true;
        user.Login("guest", "123456").then(function () {
            login.ing = false;
            if (!go_args.length) go("profile");
            else go.apply(null, go_args);
        }).catch(function () {
            login.ing = false;
        });
    },
    login() {
        if (!this.username) return this.guest();
        var login = this.login;
        login.ing = true;
        user.Login(this.username, this.password).then(function () {
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
    go_args = args instanceof Array ? args : [];
    return page;
}