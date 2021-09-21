
titlebar(i18n`login`);
var config=require("../config");
var page = div();
page.innerHTML = login;
var go_args;

render(page, {
    loading: {},
    go,
    name: input,
    pswd: password,
    button,
    username: user.name || "",
    password: null,
    request(name, password) {
        var that = this;
        var login = this.loading;
        login.ing = true;
        api("_session", {
            name,
            password
        }).success(function (result) {
            login.ing = false;
            user.Login(result).then(function () {
                that.password = "";
                user.setSessionTime(60 * 60 * 1000 * 7 * 24);
                user.saveSession(cross.getCookies(config.api_domain));
                if (!go_args.length) go("profile");
                else go.apply(null, go_args);
            });
        }).error(function (result) {
            login.ing = false;
            alert.error(i18n(JSON.parse(result).reason));
        });

    },
    login() {
        if (!this.username) this.request("guest", "123456");
        else this.request(this.username, this.password);
    }
});
vbox(page);
page.initialStyle = 'marginLeft:100%;';
var [_username, _password, _loginBtn] = page.children;

function main(args) {
    go_args = args instanceof Array ? args : [];
    return page;
}