function S() {
    return contactFactory.pickContacts(["friend", "chatroom"], {
        chatroom: {
            keyword: $scope.keyword,
            isNewArray: true
        },
        friend: {
            keyword: $scope.keyword,
            isNewArray: true,
            isWithoutBrand: true,
            showFriendHeader: true
        }
    }, true).result
}
function T() {
    var e = F;
    e && setTimeout(function () {
        var t = (e[0].clientHeight - e.find(".ngdialog-content").height()) / 2;
        e.css("paddingTop", t)
    }, 20)
}
function loadContacts() {
    $scope.isLoaded = true;
    $scope.isUnLogin = false;
    reportService.report(reportService.ReportType.timing, {
        timing: {
            initStart: Date.now()
        }
    });
    appFactory.init().then(function (n) {
        if (utilFactory.log("initData", n), n.BaseResponse && "0" != n.BaseResponse.Ret) {
            return void (loginFactory.timeoutDetect(n.BaseResponse.Ret) || (ngDialog.openConfirm({
                className: "default ",
                templateUrl: "comfirmTips.html",
                controller: ["$scope", function (e) {
                    e.title = _("02d9819"),
                        e.content = _("0d2fc2c"),
                        reportService.report(reportService.ReportType.initError, {
                            text: "程序初始化失败，点击确认刷新页面",
                            code: n.BaseResponse.Ret,
                            cookie: document.cookie
                        }),
                        e.callback = function () {
                            document.location.reload(true)
                        }
                }
                ]
            }),
                monitorService.report(monitorService.INIT_EXCEPTION_COUNT, 1)));
        }
        accountFactory.setLoginTime((new Date).getTime()),
            accountFactory.setUserInfo(n.User),
            accountFactory.setSkey(n.SKey),
            accountFactory.setSyncKey(n.SyncKey),
            contactFactory.addContact(n.User),
            contactFactory.addContacts(n.ContactList),
            chatFactory.initChatList(n.ChatSet),
            chatFactory.notifyMobile(accountFactory.getUserName(), confFactory.StatusNotifyCode_INITED),
            subscribeMsgService.init(n.MPSubscribeMsgList),
            $rootScope.$broadcast("root:pageInit:success"),
            utilFactory.setCheckUrl(accountFactory),
            utilFactory.log("getUserInfo", accountFactory.getUserInfo()),
            $scope.$broadcast("updateUser"),
            reportService.report(reportService.ReportType.timing, {
                timing: {
                    initEnd: Date.now()
                }
            });
        var i = n.ClickReportInterval || 3e5;
        setTimeout(function e() {
            actionTrack.report(),
                setTimeout(e, i)
        }, i),
            $timeout(function () {
                function e(a) {
                    contactFactory.initContact(a).then(function (a) {
                        contactFactory.addContacts(a.MemberList),
                            reportService.report(reportService.ReportType.timing, {
                                timing: {
                                    initContactEnd: Date.now()
                                },
                                needSend: true
                            }),
                            t <= 16 && a.Seq && 0 != a.Seq && (t++ ,
                                e(a.Seq))
                    })
                }
                reportService.report(reportService.ReportType.timing, {
                    timing: {
                        initContactStart: Date.now()
                    }
                });
                var t = 1;
                e(0)
            }, 0),
            $scope.account = contactFactory.getContact(accountFactory.getUserName()),
            E()
    }),
        utilFactory.browser.chrome && (window.onbeforeunload = function (e) {
            return e = e || window.event,
                e && (e.returnValue = "关闭浏览器聊天内容将会丢失。"),
                setTimeout(function () {
                    var e = (new Date).getTime() - accountFactory.getLoginTime();
                    reportService.report(reportService.ReportType.sessionData, {
                        uin: accountFactory.getUin(),
                        browser: navigator.userAgent,
                        rmsg: accountFactory.getRMsgCount(),
                        rconv: accountFactory.getRConvCount(),
                        smsg: accountFactory.getSMsgCount(),
                        sconv: accountFactory.getSConvCount(),
                        lifetime: e
                    }, true)
                }, 0),
                "关闭浏览器聊天内容将会丢失。"
        }
        )
}
function E() {
    $scope.debug && (D && $timeout.cancel(D),
        surviveCheckService.start(4e4),
        D = $timeout(function () {
            appFactory.syncCheck().then(function (e) {
                return surviveCheckService.start(5e3),
                    e
            }, function (e) {
                return surviveCheckService.start(2e3),
                    e
            }).then(G, k)
        }, confFactory.TIMEOUT_SYNC_CHECK))
}
function G(e) {
    utilFactory.log("syncCheckHasChange", e);
    try {
        accountFactory.setSyncKey(e.SyncKey),
            accountFactory.setSyncCheckKey(e.SyncCheckKey),
            accountFactory.updateUserInfo(e.Profile, function () { }),
            angular.forEach(e.DelContactList, function (e, t) {
                chatFactory.deleteChatList(e.UserName),
                    chatFactory.deleteChatMessage(e.UserName),
                    contactFactory.deleteContact(e),
                    chatFactory.getCurrentUserName() == e.UserName && chatFactory.setCurrentUserName("")
            }),
            angular.forEach(e.ModContactList, function (e, t) {
                contactFactory.addContact(e)
            }),
            angular.forEach(e.AddMsgList, function (e, t) {
                if (chatFactory.messageProcess(e),
                    e.FromUserName != accountFactory.getUserName()) {
                    accountFactory.setRMsgCount(accountFactory.getRMsgCount() + 1);
                    var t = P.indexOf(e.FromUserName);
                    t == -1 && (accountFactory.setRConvCount(accountFactory.getRConvCount() + 1),
                        P.push(e.FromUserName))
                }
            })
    } catch (e) {
        e.other = {
            reason: "throw err when syncChackHasChange"
        },
            window._errorHandler && window._errorHandler(e)
    } finally {
        E()
    }
}
function k(e) {
    E()
}
function I(e) {
    var t = utilFactory.getCookie("last_wxuin") || ""
        , a = parseInt(utilFactory.getCookie("login_frequency") || 1);
    t !== e ? a = 1 : a += 1,
        utilFactory.setCookie("login_frequency", a, 2),
        utilFactory.setCookie("last_wxuin", e, 2),
        utilFactory.getLocalStorage().setItem("userAvatar", window.userAvatar)
}
1 == Math.floor(100 * Math.random()) && monitorService.report(monitorService.PV, 1);
window._appTiming = {};
$state.go("chat"),
    $rootScope.CONF = confFactory,
    $scope.isUnLogin = !window.MMCgi.isLogin,
    $scope.debug = true,
    $scope.isShowReader = /qq\.com/gi.test(location.href);
var P = [];
window.MMCgi.isLogin && loadContacts(),
    $scope.$on("newLoginPage", function (e, t) {
        accountFactory.setSkey(t.SKey),
            accountFactory.setSid(t.Sid),
            accountFactory.setUin(t.Uin),
            accountFactory.setPassticket(t.Passticket),
            loadContacts(),
            I(t.Uin)
    });
var U, A;
$scope.search = function (e) {
    U && $timeout.cancel(U),
        U = $timeout(function () {
            return $scope.keyword ? (A && A.close(),
                void (A = mmpop.open({
                    templateUrl: "searchList.html",
                    controller: ["$rootScope", "$scope", "$state", function (e, t, a) {
                        t.$watch(function () {
                            return contactFactory.contactChangeFlag
                        }, function (e) {
                            t.allContacts.length = 0,
                                t.allContacts.push.apply(t.allContacts, S())
                        }),
                            t.clickUserCallback = function (n) {
                                n.UserName && (a.go("chat", {
                                    userName: n.UserName
                                }),
                                    t.closeThisMmPop(),
                                    e.$broadcast("root:searchList:cleanKeyWord"))
                            }
                    }
                    ],
                    scope: {
                        keyword: $scope.keyword,
                        allContacts: S(),
                        heightCalc: function (e) {
                            return "header" === e.type ? 31 : 60
                        }
                    },
                    className: "recommendation",
                    autoFoucs: false,
                    container: angular.element(document.querySelector("#search_bar"))
                }))) : void (A && A.close())
        }, 200)
}
    ,
    $scope.searchKeydown = function (t) {
        switch (t.keyCode) {
            case confFactory.KEYCODE_ARROW_UP:
                A && A.isOpen() && $rootScope.$broadcast("root:searchList:keyArrowUp"),
                    t.preventDefault(),
                    t.stopPropagation();
                break;
            case confFactory.KEYCODE_ARROW_DOWN:
                A && A.isOpen() && $rootScope.$broadcast("root:searchList:keyArrowDown"),
                    t.preventDefault(),
                    t.stopPropagation();
                break;
            case confFactory.KEYCODE_ENTER:
                A && A.isOpen() && $rootScope.$broadcast("root:searchList:keyEnter"),
                    t.preventDefault(),
                    t.stopPropagation()
        }
    }
    ,
    $scope.$on("root:searchList:cleanKeyWord", function (e) {
        $scope.keyword = ""
    });
var F;
$scope.$on("ngDialog.opened", function (e, t) {
    stateManageService.change("dialog:open", true),
        F = t,
        T()
}),
    $scope.$on("ngDialog.closed", function (e, t) {
        stateManageService.change("dialog:open", false),
            F = null
    }),
    $(window).on("resize", function (e) {
        T()
    }),
    $scope.appClick = function (e) {
        $scope.$broadcast("app:contextMenu:hide", e)
    }
    ;
var V, x = $(document.body);
x.on("dragenter", function (e) {
    var t = e.originalEvent;
    V = t.target,
        t.dataTransfer.dropEffect = "none",
        x.addClass("drop-enter"),
        t.stopPropagation(),
        t.preventDefault()
}),
    x.on("dragleave", function (e) {
        var t = e.originalEvent;
        t.dataTransfer.dropEffect = "none",
            V === t.target && x.removeClass("drop-enter"),
            t.stopPropagation(),
            t.preventDefault()
    }),
    x.on("dragover", function (e) {
        var t = e.originalEvent;
        t.dataTransfer.dropEffect = "none",
            t.stopPropagation(),
            t.preventDefault()
    }),
    x.on("drop", function (e) {
        var t = e.originalEvent;
        t.dataTransfer.dropEffect = "none",
            t.stopPropagation(),
            t.preventDefault()
    }),
    $scope.showContextMenu = function (e) {
        $scope.$broadcast("app:contextMenu:show", e)
    }
    ,
    $scope.toggleSystemMenu = function (e) {
        mmpop.toggleOpen({
            templateUrl: "systemMenu.html",
            top: 60,
            left: 85,
            container: angular.element(document.querySelector(".panel")),
            controller: "systemMenuController",
            singletonId: "mmpop_system_menu",
            className: "system_menu"
        })
    }
    ,
    $scope.showProfile = function (e) {
        if ($scope.account) {
            var a = $scope.account
                , n = e.pageY + 25
                , o = e.pageX + 6;
            mmpop.open({
                templateUrl: "profile_mini.html",
                className: "profile_mini_wrap scale-fade",
                top: n,
                left: o,
                blurClose: true,
                singletonId: "mmpop_profile",
                controller: ["$scope", function (e) {
                    e.contact = a,
                        e.addUserContent = "",
                        e.isShowSendBox = false,
                        e.chat = function (t) {
                            $state.go("chat", {
                                userName: t
                            }),
                                e.closeThisMmPop()
                        }
                }
                ]
            })
        }
    }
    ,
    $scope.dblclickChat = function () {
        $scope.$broadcast("app:chat:dblclick")
    }
    ,
    $scope.requestPermission = function () {
        notificationFactory.requestPermission(function () {
            utilFactory.log("请求权限了...")
        })
    }
    ,
    surviveCheckService.callback(E);
var D;
$scope.isIPad = utilFactory.isIPad,
    $scope.isMacOS = utilFactory.isMacOS,
    $scope.isWindows = utilFactory.isWindows,
    $scope.showDownloadEntry = $scope.isMacOS || $scope.isWindows,
    $scope.closeDownloadEntry = function () {
        $scope.showDownloadEntry = false,
            reportService.report(reportService.ReportType.click2CloseAd, {
                count: 1
            }),
            (new Image).src = "https://support.weixin.qq.com/cgi-bin/mmsupport-bin/reportforweb?rid=69373&rkey=17&rvalue=1"
    }
    ,
    $scope.clickAndClose = function () {
        reportService.report(reportService.ReportType.clickAndCloseAd, {
            count: 1
        }),
            (new Image).src = "https://support.weixin.qq.com/cgi-bin/mmsupport-bin/reportforweb?rid=69373&rkey=16&rvalue=1"
    }
