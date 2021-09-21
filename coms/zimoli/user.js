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
var passport;
var loadUserData;
var proto = {
    targetUrl: null,
    loginPath: null,
    session_time: 300000,
    session: "",
    loadSession: function () {
        var object = userInstance;
        if (object.session && !(new Date() > object.session_time)) {
            proto.session_time = object.session_time;
            proto.session = object.session;
            this.Login(object);
        }
        return object.session || "";
    },
    saveSession: function (session = this.session) {
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
        this.login(userinfo);
    },
    Logout() {
        this.logout();
    }
};
extend(proto, emptyProto, userInstance);
var user = enrich(proto);
user.setLoginPath = function (pathname) {
    proto.loginPath = pathname;
};
user.setUserDataLoader = function (method) {
    loadUserData = method;
};
user.setSessionTime = function (session_time) {
    proto.session_time = session_time;
};
user.refresh = function () {
    loadUserData instanceof Function && loadUserData();
};

user.getPassport = function () {
    if (!passport) {
        passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
    }
    return passport = encode62.timeupdate(passport);
};
user.login = function (userinfo) {
    proto.roles = userinfo.roles || [];
    proto.isLogin = true;
    proto.name = userinfo.name;
    proto._id = "org.couchdb.user:" + userinfo.name;
    user.clean && user.clean(proto.loginPath);
    this.refresh();
};
user.logout = function () {
    delete user.isLogin;
    delete user.roles;
    delete user._passport;
    proto._passport = "";
    proto.roles = null;
    proto.isLogin = false;
    passport = '';
    this.saveSession("");
};