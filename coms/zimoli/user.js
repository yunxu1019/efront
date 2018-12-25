var proto = {
    isLogin: false,
    roles: null,
    targetUrl: null,
    loginPath: null,
    name: "",
    getName() {
    },
    Login(name, password) {
        return new Promise(function (ok, oh) {
            api("_session", {
                name,
                password
            }).success(ok).error(function (result) {
                oh(result);
                alert.error(i18n(JSON.parse(result).reason));
            });
        }).then(function (result) {
            proto.roles = result.roles || [];
            proto.isLogin = true;
            proto.name = result.name;
            user.clean && user.clean(proto.loginPath);
        });
    },
    Logout() {
        proto.roles = null;
        proto.isLogin = false;
        proto.name = "";
    },
    setLoginPath(pathname) {
        proto.loginPath = pathname;
    }
}
var user = enrich(proto);