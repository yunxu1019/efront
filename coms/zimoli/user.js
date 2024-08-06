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
    clean: null,
    loadSession: function () {
        var object = userInstance;
        if (object.session && !(new Date() > object.session_time)) {
            this.session_time = object.session_time;
            this.session = object.session;
            this.Login(object);
        }
        return object.session || "";
    },
    saveSession: function (session = this.session) {
        this.session = session;
        data.setInstance(USERINFO, {
            roles: this.roles,
            name: this.name,
            _id: this._id,
            session: session,
            _passport: this._passport,
            isLogin: !!session,
            session_time: +new Date() + this.session_time
        });
    },
    setLoginPath(pathname) {
        this.loginPath = pathname;
    },
    setUserDataLoader(method) {
        loadUserData = method;
    },
    setSessionTime(session_time) {
        this.session_time = session_time;
    },
    refresh() {
        loadUserData instanceof Function && loadUserData();
    },
    getPassport() {
        if (!passport) {
            passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
        }
        return passport = encode62.timeupdate(passport);
    },
    Login(userinfo) {
        this.login(userinfo);
    },
    login(userinfo) {
        this.roles = userinfo.roles || [];
        this.isLogin = true;
        this.name = userinfo.name;
        this._id = "org.couchdb.user:" + userinfo.name;
        this.clean?.(this.loginPath);
        this.refresh();
    },
    Logout() {
        this.logout();
    },
    logout() {
        delete user.isLogin;
        delete user.roles;
        delete user._passport;
        this._passport = "";
        this.roles = null;
        this.isLogin = false;
        passport = '';
        this.saveSession("");
    },
};
extend(proto, emptyProto, userInstance);
var user = enrich(proto);
