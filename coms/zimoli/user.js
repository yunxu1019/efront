var state = function () { };
var proto = {
    isLogin: false,
    roles: null,
    targetUrl: null,
    loginPath: null,
    name: "",
    session_time: 300000,
    setStateFunction(stateFunc) {
        if (!isFunction(stateFunc)) throw new Error("只能传入函数类型的参数");
        state = stateFunc;
    },
    loadSession() {
        var object = state() || {};
        if (object.session && !(new Date() > object.session_time)) {
            proto.session_time = object.session_time;
            this.Login(object);
        }
        return object.session || "";
    },
    setSessionTime(session_time) {
        proto.session_time = session_time;
    },
    saveSession(session) {
        state({
            roles: proto.roles,
            name: proto.name,
            session: session,
            session_time: +new Date() + proto.session_time
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
        this.saveSession("");
    },
    setLoginPath(pathname) {
        proto.loginPath = pathname;
    }
}
var user = enrich(proto);