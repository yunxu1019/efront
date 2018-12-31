var state = function () { };
var emptyProto = {
    name: "",
    _id: "",
    avatar: null,
    isLogin: false,
    roles: null
};
var proto = {
    targetUrl: null,
    loginPath: null,
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
            _id: proto._id,
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
        proto._id = "org.couchdb.user:" + userinfo.name;
        proto.avatar = `${cross.getCrossUrl(config.api_base)}_users/${proto._id}/avatar`;
        user.clean && user.clean(proto.loginPath);
    },
    Logout() {
        extend(proto, emptyProto);
        this.saveSession("");
    },
    setLoginPath(pathname) {
        proto.loginPath = pathname;
    }
};
extend(proto, emptyProto);
var user = enrich(proto);