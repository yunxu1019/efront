var USERINFO = 'userinfo';
var userInstance = data.getInstance(USERINFO);
var emptyProto = {
    name: "",
    _id: "",
    _passport: '',
    avatar: null,
    isLogin: false,
    roles: null
};
var loadUserData;
var proto = {
    targetUrl: null,
    loginPath: null,
    session_time: 300000,
    session: "",
    setStateFunction(stateFunc) {
        if (!isFunction(stateFunc)) throw new Error("只能传入函数类型的参数");
    },
    loadSession() {
        var object = userInstance;
        if (object.session && !(new Date() > object.session_time)) {
            proto.session_time = object.session_time;
            proto.session = object.session;
            this.Login(object);
        }
        return object.session || "";
    },
    setSessionTime(session_time) {
        proto.session_time = session_time;
    },
    saveSession(session = this.session) {
        this.session = session;
        data.setInstance(USERINFO, {
            roles: proto.roles,
            name: proto.name,
            _id: proto._id,
            session: session,
            _passport: this._passport,
            isLogin: !!session,
            session_time: +new Date() + proto.session_time
        });
    },
    Login(userinfo) {
        proto.roles = userinfo.roles || [];
        proto.isLogin = true;
        proto.name = userinfo.name;
        proto._id = "org.couchdb.user:" + userinfo.name;
        user.clean && user.clean(proto.loginPath);
        this.refresh();
    },
    setUserDataLoader(method) {
        loadUserData = method;
    },
    refresh() {
        loadUserData instanceof Function && loadUserData();
    },
    Logout() {
        extend(proto, emptyProto);
        for (var k in user) {
            if (!isFunction(user[k])) delete user[k];
        }
        this.saveSession("");
    },
    setLoginPath(pathname) {
        proto.loginPath = pathname;
    }
};
extend(proto, emptyProto, userInstance);
var user = enrich(proto);