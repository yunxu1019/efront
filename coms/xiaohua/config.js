new Promise(function (ok) {
    var base = "//efront.cc/@/data/xiaohua/";
    var config = {
        target: 'fc',
        api_domain: "efront.cc:5989",
        base,
        filebase: base + 'photos/',
        videobase: base + 'videos/',
        api_base: "http://efront.cc:5989/",
    };
    data.loadConfig("data/source-config.json");
    user.setLoginPath("/user/login");
    user.avatar = 'images/avatar.jpg';
    user.name = '小花';
    api.setBaseUrl(config.api_base, cross);
    api.setHeaders({}, false);
    api.onerror = function (error) {
        try {
            error = JSON.parse(error).reason;
        } catch (e) {
        }
        alert.error(i18n(error));
    };
    cross.digest = render.digest;
    if (!user.isLogin) {
        var logout = function () {
            user.Logout();
        };
        user.loadSession().then(function (session) {
            if (!session) return;
            cross.addCookie(session, config.api_domain);
            api("get", "_session").success(function (result) {
                if (result.ok && result.userCtx && result.userCtx.name) {
                    user.Login(result.userCtx);
                } else {
                    logout();
                }
            }).error(function (error) {
                logout();
                alert.error(JSON.parse(error).reason);
            });
        });
    }

    ok(config);
})