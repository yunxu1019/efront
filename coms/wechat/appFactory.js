var appFactory = {
    globalData: {
        chatList: []
    },
    init: function () {
        var e = $q.defer();
        return mmHttp({
            method: "POST",
            url: confFactory.API_webwxinit,
            MMRetry: {
                count: 1,
                timeout: 1
            },
            data: {
                BaseRequest: {
                    Uin: accountFactory.getUin(),
                    Sid: accountFactory.getSid(),
                    Skey: accountFactory.getSkey(),
                    DeviceID: accountFactory.getDeviceID()
                }
            }
        }).success(function (t) {
            e.resolve(t)
        }).error(function (t) {
            e.reject("error:" + t)
        }),
            e.promise
    },
    sync: function () {
        var e = $q.defer();
        return mmHttp({
            method: "POST",
            MMRetry: {
                serial: !0
            },
            url: confFactory.API_webwxsync + "?" + ["sid=" + accountFactory.getSid(), "skey=" + accountFactory.getSkey()].join("&"),
            data: angular.extend(accountFactory.getBaseRequest(), {
                SyncKey: accountFactory.getSyncKey(),
                rr: ~new Date
            })
        }).success(function (t) {
            e.resolve(t),
                utilFactory.getCookie("webwx_data_ticket") || reportService.report(reportService.ReportType.cookieError, {
                    text: "webwx_data_ticket 票据丢失",
                    cookie: document.cookie
                })
        }).error(function (t) {
            e.reject("error:" + t),
                utilFactory.log("sync error")
        }),
            e.promise
    },
    syncCheck: function () {
        var e = $q.defer()
            , c = this
            , s = confFactory.API_synccheck + "?" + ["r=" + utilFactory.now(), "skey=" + encodeURIComponent(accountFactory.getSkey()), "sid=" + encodeURIComponent(accountFactory.getSid()), "uin=" + accountFactory.getUin(), "deviceid=" + accountFactory.getDeviceID(), "synckey=" + encodeURIComponent(accountFactory.getFormateSyncCheckKey())].join("&");
        return window.synccheck && (window.synccheck.selector = 0),
            $.ajax({
                url: s,
                dataType: "script",
                timeout: 35e3
            }).done(function () {
                window.synccheck && "0" == window.synccheck.retcode ? "0" != window.synccheck.selector ? c.sync().then(function (t) {
                    e.resolve(t)
                }, function (e) { }) : e.reject(window.synccheck && window.synccheck.selector) : !window.synccheck || "1101" != window.synccheck.retcode && "1102" != window.synccheck.retcode ? window.synccheck && "1100" == window.synccheck.retcode ? loginFactory.loginout(0) : (e.reject("syncCheck net error"),
                    reportService.report(reportService.ReportType.netError, {
                        text: "syncCheck net error",
                        url: s
                    })) : loginFactory.loginout(1)
            }),
            e.promise
    },
    report: function (e) { }
};
