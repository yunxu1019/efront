var loginFactory = {
    getUUID: function () {
        var e = $q.defer();
        return window.QRLogin = {},
            $.ajax({
                url: confFactory.API_jsLogin,
                dataType: "script"
            }).done(function () {
                200 == window.QRLogin.code ? e.resolve(window.QRLogin.uuid) : e.reject(window.QRLogin.code)
            }).fail(function () {
                e.reject()
            }),
            e.promise
    },
    getQrcode: function (e) { },
    checkLogin: function (e, a) {
        var n = $q.defer(),
            a = a || 0;
        return window.code = 0,
            window.checkLoginPromise = $.ajax({
                url: confFactory.API_login + "?loginicon=true&uuid=" + e + "&tip=" + a + "&r=" + ~new Date,
                dataType: "script",
                timeout: 35e3
            }).done(function () {
                // new RegExp("/" + location.host + "/");
                // if (window.redirect_uri && window.redirect_uri.indexOf("/" + location.host + "/") < 0)
                    // return void (location.href = window.redirect_uri);
                var e = {
                    code: window.code,
                    redirect_uri: window.redirect_uri,
                    userAvatar: window.userAvatar
                };
                n.resolve(e)
            }).fail(function () {
                n.reject()
            }),
            n.promise
    },
    associationLogin: function (e) {
        var a = $q.defer(),
            n = confFactory.API_webwxpushloginurl + "?uin=" + encodeURIComponent(e);
        return $.ajax({
            url: n,
            dataType: "json"
        }).done(function (e) {
            0 == e.ret ? a.resolve(e) : a.reject(e)
        }).fail(function () {
            a.reject()
        }),
            a.promise
    },
    newLoginPage: function (e) {
        var a = $q.defer();
        return mmHttp({
            method: "GET",
            url: e + "&fun=new&version=v2",
            MMRetry: {
                count: 3,
                timeout: 1e4,
                serial: !0
            }
        }).success(function (e) {
            reportService.report(reportService.ReportType.timing, {
                timing: {
                    loginEnd: Date.now()
                }
            }),
                a.resolve(e)
        }).error(function (e) {
            a.reject("error:" + e)
        }),
            a.promise
    },
    loginout: function (e) {
        window.onbeforeunload = null;
        var t = confFactory.API_webwxlogout + "?redirect=1&type=" + (e || 0) + "&skey=" + encodeURIComponent(accountFactory.getSkey());
        utilFactory.form(t, {
            sid: accountFactory.getSid(),
            uin: accountFactory.getUin()
        })
    },
    timeoutDetect: function (e) {
        return e = +e,
            1100 == e ? (window.onbeforeunload = null,
                this.loginout(0), !0) : 1101 == e || 1102 == e ? (window.onbeforeunload = null,
                    this.loginout(0), !0) : void (1205 == e && this.loginout(1))
    }
};