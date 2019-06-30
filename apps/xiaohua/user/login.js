
function main() {
    var page = div();
    page.innerHTML = login;
    var forms = page.querySelectorAll('form');
    forms[0].initialStyle = {
        opacity: 0,
        transform: 'rotateY(180deg)',
        transition: 'transform .5s,opacity .5s',
    };
    forms[1].initialStyle = {
        opacity: 0,
        transform: 'rotateY(-180deg)',
        transition: 'transform .5s,opacity .5s',
    };
    forms[1].leave
    render(page, {
        loading: {},
        go,
        user,
        input,
        name: input,
        pswd: password,
        button,
        username: user.name || "",
        password: null,
        settings: {
            show: false,
            data: 'data/source-config.json',
        },
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
                    var session = cross.getCookies(config.api_domain);
                    user._passport = encode62.encode62(password, session);
                    user.saveSession(session);
                    page.$reload();
                });
            }).error(function (result) {
                login.ing = false;
                alert.error(i18n(JSON.parse(result).reason));
            });

        },
        login() {
            this.request(this.username, this.password);
        }
    });
    vbox(page);
    page.initialStyle = 'marginLeft:100%;';
    return page;
}