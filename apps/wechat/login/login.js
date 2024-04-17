var setTimeout = $timeout;
var $scope = $rootScope.$new();
function onloginResponse(c) {
    switch (c.code) {
        case 200:
            loginFactory.newLoginPage(c.redirect_uri).then(function ({ response }) {
                var ret = response.match(/<ret>(.*)<\/ret>/),
                    script = response.match(/<script>(.*)<\/script>/),
                    skey = response.match(/<skey>(.*)<\/skey>/),
                    wxsid = response.match(/<wxsid>(.*)<\/wxsid>/),
                    wxuin = response.match(/<wxuin>(.*)<\/wxuin>/),
                    pass_ticket = response.match(/<pass_ticket>(.*)<\/pass_ticket>/),
                    message = response.match(/<message>(.*)<\/message>/),
                    redirecturl = response.match(/<redirecturl>(.*)<\/redirecturl>/);
                var loginUserInfo = {
                    UserAvatar: $scope.userAvatar,
                    Ret: ret && ret[1],
                    SKey: skey && skey[1],
                    Sid: wxsid && wxsid[1],
                    Uin: wxuin && wxuin[1],
                    Passticket: pass_ticket && pass_ticket[1],
                    Code: script
                };
                if (redirecturl) {
                    cross("get", redirecturl[1]).done(go.bind(null, "/chat/main", loginUserInfo));
                } else if (ret && "0" != ret[1]) {
                    alert(message && message[1] || "登陆失败").then(function () {
                        location.reload();
                    });
                    monitorService.report(monitorService.AUTH_FAIL_COUNT, 1);
                } else {
                    utilFactory.getCookie("webwx_data_ticket") || reportService.report(reportService.ReportType.cookieError, {
                        text: "webwx_data_ticket 票据丢失",
                        cookie: document.cookie
                    })
                    go("/chat/main", loginUserInfo);
                }
            });
            break;
        case 201:
            $scope.isScan = !0;
            reportService.report(reportService.ReportType.timing, {
                timing: {
                    scan: +new Date
                }
            });
            loginFactory.checkLogin($scope.uuid).then(onloginResponse, function (t) {
                !t && window.checkLoginPromise && ($scope.isBrokenNetwork = !0)
            });
            break;
        case 408:
            loginFactory.checkLogin($scope.uuid).then(onloginResponse, function (t) {
                !t && window.checkLoginPromise && ($scope.isBrokenNetwork = !0)
            });
            break;
        case 400:
        case 500:
        case 0:
            var s = utilFactory.getCookie("refreshTimes") || 0;
            s < 5 ? (s++ ,
                utilFactory.setCookie("refreshTimes", s, .5),
                document.location.reload()) : $scope.isNeedRefresh = !0;
            break;
        case 202:
            $scope.isScan = !1,
                $scope.isAssociationLogin = !1,
                utilFactory.setCookie("login_frequency", 0, 2),
                window.checkLoginPromise && (window.checkLoginPromise.abort(),
                    window.checkLoginPromise = null),
                refreshQRCode()
    }
    $scope.code = c.code,
        $scope.userAvatar = c.userAvatar,
        utilFactory.log("get code", c.code)
}
function refreshQRCode() {
    loginFactory.getUUID().then(function (i) {
        utilFactory.log("login", i);
        $scope.uuid = i;
        $scope.qrcodeUrl = "https://login.weixin.qq.com/qrcode/" + i;
        $scope.code = 0;
        $scope.isScan = !1;
        $scope.isIPad = utilFactory.isIPad;
        $scope.isMacOS = utilFactory.isMacOS;
        $scope.isWindows = utilFactory.isWindows;
        $scope.lang = utilFactory.queryParser().lang || "zh_CN";
        var r = !1;
        reportService.report(reportService.ReportType.timing, {
            timing: {
                qrcodeStart: +new Date
            }
        });
        setTimeout(function () {
            r || reportService.report(reportService.ReportType.picError, {
                text: "qrcode can not load",
                src: $scope.qrcodeUrl
            })
        }, 3e3);
        $scope.qrcodeLoad = function () {
            r = !0;
            reportService.report(reportService.ReportType.timing, {
                timing: {
                    qrcodeEnd: +new Date
                }
            });
        };
        loginFactory.checkLogin(i, 1).then(onloginResponse, function (t) {
            !t && window.checkLoginPromise && ($scope.isBrokenNetwork = !0)
        });
    }, function (t) {
        t || ($scope.isBrokenNetwork = !0)
    })
}
function checkLogin() {
    loginFactory.checkLogin($scope.uuid, 1).then(onloginResponse, function (t) {
        !t && window.checkLoginPromise && ($scope.isBrokenNetwork = !0)
    });
}
window.MMCgi = {};
if (!window.MMCgi.isLogin) {
    $scope.isAssociationLogin = parseInt(utilFactory.getCookie("login_frequency") || 0) >= 2,
        $scope.isWaitingAsConfirm = !1,
        $scope.isNeedRefresh = !1,
        $scope.isRotateLoading = !1,
        $scope.isBrokenNetwork = !1;
    var s;
    $scope.isAssociationLogin && ($scope.userAvatar = utilFactory.getLocalStorage().getItem("userAvatar")),
        $scope.showPrivacyTips = /wechat\.com/gi.test(location.host),
        $scope.associationLogin = function () {
            var n = utilFactory.getCookie("last_wxuin");
            $scope.isWaitingAsConfirm = !0;
            loginFactory.associationLogin(n).then(function (t) {
                $scope.uuid = t.uuid,
                    checkLogin()
            }, function (t) {
                t ? ($scope.isAssociationLogin = !1,
                    utilFactory.setCookie("login_frequency", 0, 2),
                    refreshQRCode(),
                    monitorService.report(monitorService.ASSOCIATION_AUTH_FAIL_COUNT, 1)) : $scope.isBrokenNetwork = !0
            });
            s && clearTimeout(s);
            monitorService.report(monitorService.ASSOCIATION_AUTH_COUNT, 1);
        };
    $scope.qrcodeLogin = function () {
        $scope.isAssociationLogin && ($scope.isAssociationLogin = !1,
            utilFactory.setCookie("login_frequency", 0, 2),
            window.checkLoginPromise && (window.checkLoginPromise.abort(),
                window.checkLoginPromise = null),
            refreshQRCode())
    };
    $scope.refreshQrcode = function () {
        $scope.isRotateLoading = !0;
        main();
        setTimeout(function () {
            refreshQRCode();
            $scope.isRotateLoading = !1;
            $scope.isNeedRefresh = !1;
            main();
        }, 1200);
    };
    $scope.qrcodeException = function () {
        monitorService.report(monitorService.QRCODE_EXCEPTION_COUNT, 1)
    };
    window.MMCgi.isLogin || $scope.isAssociationLogin ? s = setTimeout(function () {
        $scope.qrcodeLogin()
    }, 3e5) : refreshQRCode()
}




var page = div();
html(page, `
<div class=logo></div>
<div class=code ng-class="{hide: isScan || isAssociationLogin || isBrokenNetwork}">
    <img mm-src=qrcodeUrl />
    <div ng-if=isNeedRefresh class=refresh ng-class={'rotate':isRotateLoading} ng-click=refreshQrcode() >
    <i></i>
    <p class="refresh_tips">二维码失效，点击刷新</p>
    </div>
    <div ng-show="!isNeedRefresh" class="ng-hide">
        <p class="sub_title">使用手机微信扫码登录</p>
        <p class="sub_desc ng-scope" ng-if="!showPrivacyTips">网页版微信需要配合手机使用</p>
    </div>
</div>
<div class="avatar" ng-class="{show: !isAssociationLogin && !isBrokenNetwork && isScan}">
    <img class="img" mm-src="userAvatar" alt="">
    <a ng-click="isScan = false;" class="action">切换帐号</a>
</div>
<div class="association" ng-class="{show: isAssociationLogin && !isBrokenNetwork}">
    <img class="img" mm-src="userAvatar">
    <p ng-show="isWaitingAsConfirm" class="waiting_confirm ng-hide">请在手机点击确认登录</p>
    <a ng-show="!isWaitingAsConfirm" ng-click="associationLogin()" class="button button_primary">登录</a>
    <a ng-click="qrcodeLogin()" class="button button_default">切换帐号</a>
</div>
`);
render(page, $scope);
function main() {
    return page;
}