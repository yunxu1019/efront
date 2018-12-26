var state = function () { };
var proto = {
    isLogin: false,
    roles: null,
    targetUrl: null,
    loginPath: null,
    name: "",
    setStateFunction(stateFunc) {
        if (!isFunction(stateFunc)) throw new Error("只能传入函数类型的参数");
        state = stateFunc;
    },
    loadSession() {
        var object = state() || {};
        if (object.session && !(new Date() > object.session_time)) {
            this.Login(object);
        }
        return object.session || "";
    },
    setSessionTime(session_time) {
        state({
            session_time: +new Date() + session_time
        });
    },
    saveSession(session) {
        state({
            roles: this.roles,
            name: this.name,
            session: session
        });
    },
    getName() {
    },
    Login(userinfo) {
        proto.roles = userinfo.roles || [];
        proto.isLogin = true;
        proto.name = userinfo.name;
        user.clean && user.clean(proto.loginPath);
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