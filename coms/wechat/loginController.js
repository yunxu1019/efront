controller("loginController", ["$scope", "loginFactory", "utilFactory", "reportService", "monitorService", 
function($scope, loginFactory, utilFactory, reportService, monitorService) {
    function o(c) {
        switch (c.code) {
        case 200:
            loginFactory.newLoginPage(c.redirect_uri).then(function(t) {
                var o = t.match(/<ret>(.*)<\/ret>/)
                  , r = t.match(/<script>(.*)<\/script>/)
                  , c = t.match(/<skey>(.*)<\/skey>/)
                  , s = t.match(/<wxsid>(.*)<\/wxsid>/)
                  , l = t.match(/<wxuin>(.*)<\/wxuin>/)
                  , d = t.match(/<pass_ticket>(.*)<\/pass_ticket>/)
                  , f = t.match(/<message>(.*)<\/message>/)
                  , u = t.match(/<redirecturl>(.*)<\/redirecturl>/);
                return u ? void (window.location.href = u[1]) : o && "0" != o[1] ? (alert(f && f[1] || "登陆失败"),
                monitorService.report(monitorService.AUTH_FAIL_COUNT, 1),
                void location.reload()) : ($scope.$emit("newLoginPage", {
                    Ret: o && o[1],
                    SKey: c && c[1],
                    Sid: s && s[1],
                    Uin: l && l[1],
                    Passticket: d && d[1],
                    Code: r
                }),
                void (utilFactory.getCookie("webwx_data_ticket") || reportService.report(reportService.ReportType.cookieError, {
                    text: "webwx_data_ticket 票据丢失",
                    cookie: document.cookie
                })))
            });
            break;
        case 201:
            $scope.isScan = !0,
            reportService.report(reportService.ReportType.timing, {
                timing: {
                    scan: Date.now()
                }
            }),
            loginFactory.checkLogin($scope.uuid).then(o, function(t) {
                !t && window.checkLoginPromise && ($scope.isBrokenNetwork = !0)
            });
            break;
        case 408:
            loginFactory.checkLogin($scope.uuid).then(o, function(t) {
                !t && window.checkLoginPromise && ($scope.isBrokenNetwork = !0)
            });
            break;
        case 400:
        case 500:
        case 0:
            var s = utilFactory.getCookie("refreshTimes") || 0;
            s < 5 ? (s++,
            utilFactory.setCookie("refreshTimes", s, .5),
            document.location.reload()) : $scope.isNeedRefresh = !0;
            break;
        case 202:
            $scope.isScan = !1,
            $scope.isAssociationLogin = !1,
            utilFactory.setCookie("login_frequency", 0, 2),
            window.checkLoginPromise && (window.checkLoginPromise.abort(),
            window.checkLoginPromise = null),
            r()
        }
        $scope.code = c.code,
        $scope.userAvatar = c.userAvatar,
        utilFactory.log("get code", c.code)
    }
    function r() {
        loginFactory.getUUID().then(function(i) {
            utilFactory.log("login", i),
            $scope.uuid = i,
            $scope.qrcodeUrl = "https://login.weixin.qq.com/qrcode/" + i,
            $scope.code = 0,
            $scope.isScan = !1,
            $scope.isIPad = utilFactory.isIPad,
            $scope.isMacOS = utilFactory.isMacOS,
            $scope.isWindows = utilFactory.isWindows,
            $scope.lang = utilFactory.queryParser().lang || "zh_CN";
            var r = !1;
            reportService.report(reportService.ReportType.timing, {
                timing: {
                    qrcodeStart: Date.now()
                }
            }),
            setTimeout(function() {
                r || reportService.report(reportService.ReportType.picError, {
                    text: "qrcode can not load",
                    src: $scope.qrcodeUrl
                })
            }, 3e3),
            $scope.qrcodeLoad = function() {
                r = !0,
                reportService.report(reportService.ReportType.timing, {
                    timing: {
                        qrcodeEnd: Date.now()
                    }
                })
            }
            ,
            loginFactory.checkLogin(i, 1).then(o, function(t) {
                !t && window.checkLoginPromise && ($scope.isBrokenNetwork = !0)
            })
        }, function(t) {
            t || ($scope.isBrokenNetwork = !0)
        })
    }
    function c() {
        loginFactory.checkLogin($scope.uuid, 1).then(o, function(t) {
            !t && window.checkLoginPromise && ($scope.isBrokenNetwork = !0)
        })
    }
    if ($(".lang .lang-item").click(function(e) {
        $("script").remove(),
        location.href = e.target.href,
        e.preventDefault()
    }),
    !window.MMCgi.isLogin) {
        $scope.isAssociationLogin = parseInt(utilFactory.getCookie("login_frequency") || 0) >= 2,
        $scope.isWaitingAsConfirm = !1,
        $scope.isNeedRefresh = !1,
        $scope.isRotateLoading = !1,
        $scope.isBrokenNetwork = !1;
        var s;
        $scope.isAssociationLogin && ($scope.userAvatar = utilFactory.getLocalStorage().getItem("userAvatar")),
        $scope.showPrivacyTips = /wechat\.com/gi.test(location.host),
        $scope.associationLogin = function() {
            var n = utilFactory.getCookie("last_wxuin");
            $scope.isWaitingAsConfirm = !0,
            loginFactory.associationLogin(n).then(function(t) {
                $scope.uuid = t.uuid,
                c()
            }, function(t) {
                t ? ($scope.isAssociationLogin = !1,
                utilFactory.setCookie("login_frequency", 0, 2),
                r(),
                monitorService.report(monitorService.ASSOCIATION_AUTH_FAIL_COUNT, 1)) : $scope.isBrokenNetwork = !0
            }),
            s && clearTimeout(s),
            monitorService.report(monitorService.ASSOCIATION_AUTH_COUNT, 1)
        }
        ,
        $scope.qrcodeLogin = function() {
            $scope.isAssociationLogin && ($scope.isAssociationLogin = !1,
            utilFactory.setCookie("login_frequency", 0, 2),
            window.checkLoginPromise && (window.checkLoginPromise.abort(),
            window.checkLoginPromise = null),
            r())
        }
        ,
        $scope.refreshQrcode = function() {
            $scope.isRotateLoading = !0,
            setTimeout(function() {
                r(),
                $scope.isRotateLoading = !1,
                $scope.isNeedRefresh = !1
            }, 1200)
        }
        ,
        $scope.qrcodeException = function() {
            monitorService.report(monitorService.QRCODE_EXCEPTION_COUNT, 1)
        }
        ,
        window.MMCgi.isLogin || $scope.isAssociationLogin ? s = setTimeout(function() {
            $scope.qrcodeLogin()
        }, 3e5) : r()
    }
}
])