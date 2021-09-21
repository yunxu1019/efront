function f(e) {
    return e = angular.extend({
        RemarkPYQuanPin: "",
        RemarkPYInitial: "",
        PYInitial: "",
        PYQuanPin: ""
    }, e, G),
        e.HeadImgUrl || (e.HeadImgUrl = confFactory.API_webwxgeticon + "?seq=0&username=" + e.UserName + "&skey=" + accountFactory.getSkey()),
        e
}
var u, m = window._contacts = {}, g = window._strangerContacts = {}, p = [], h = [], M = [], v = [], y = window._chatRoomMemberDisplayNames = {}, b = [], C = [], w = [], S = {}, T = {}, N = 0, E = ["fmessage"], G = {
    isSelf: function () {
        return accountFactory.getUserName() == this.UserName
    },
    isContact: function () {
        return !!(this.ContactFlag & confFactory.CONTACTFLAG_CONTACT) || this.UserName == accountFactory.getUserName()
    },
    isBlackContact: function () {
        return !!(this.ContactFlag & confFactory.CONTACTFLAG_BLACKLISTCONTACT)
    },
    isConversationContact: function () {
        return !!(this.ContactFlag & confFactory.CONTACTFLAG_CHATCONTACT)
    },
    isRoomContact: function () {
        return utilFactory.isRoomContact(this.UserName)
    },
    isRoomContactDel: function () {
        return this.isRoomContact() && !(this.ContactFlag & confFactory.CONTACTFLAG_CHATROOMCONTACT)
    },
    isRoomOwner: function () {
        return this.isRoomContact() && this.IsOwner
    },
    isBrandContact: function () {
        return this.VerifyFlag & confFactory.MM_USERATTRVERIFYFALG_BIZ_BRAND
    },
    isSpContact: function () {
        return utilFactory.isSpUser(this.UserName)
    },
    isShieldUser: function () {
        var e = utilFactory.isShieldUser(this.UserName) || this.isRoomContact() && !this.isInChatroom();
        return e
    },
    isFileHelper: function () {
        return this.UserName == confFactory.SP_CONTACT_FILE_HELPER
    },
    isRecommendHelper: function () {
        return this.UserName == confFactory.SP_CONTACT_RECOMMEND_HELPER
    },
    isNewsApp: function () {
        return this.UserName == confFactory.SP_CONTACT_NEWSAPP
    },
    isMuted: function () {
        return this.isRoomContact() ? this.Statues === confFactory.CHATROOM_NOTIFY_CLOSE : this.ContactFlag & confFactory.CONTACTFLAG_NOTIFYCLOSECONTACT
    },
    isTop: function () {
        return this.ContactFlag & confFactory.CONTACTFLAG_TOPCONTACT
    },
    hasPhotoAlbum: function () {
        return 1 & this.SnsFlag
    },
    isInChatroom: function () {
        var e = this;
        return 0 == this.MemberList.length && 0 != this.ContactFlag || (e.MMInChatroom === !1 || e.MMInChatroom === !0 ? e.MMInChatroom : (angular.forEach(this.MemberList, function (t) {
            if (t.UserName == accountFactory.getUserInfo().UserName)
                return void (e.MMInChatroom = !0)
        }),
            e.MMInChatroom = e.MMInChatroom || !1,
            e.MMInChatroom))
    },
    isReadOnlyContact: function () {
        return E.indexOf(this.UserName) > -1
    },
    getDisplayName: function (e) {
        var t = this
            , a = "";
        if (utilFactory.isRoomContact(t.UserName))
            if (a = t.RemarkName || t.NickName,
                !a && t.MemberList)
                for (var n = 0, i = t.MemberList.length; n < i && n < 10; ++n) {
                    a.length > 0 && (a += ", ");
                    var o = t.MemberList[n]
                        , r = contactFactory.getContact(o.UserName);
                    a += r && r.RemarkName || r && r.NickName || o.NickName
                }
            else
                a || (a = t.UserName);
        else
            a = t.RemarkName || e && e != t.UserName && t.getMemberDisplayName(e) || t.NickName;
        return a
    },
    getMemberDisplayName: function (e) {
        contactFactory.getChatroomIdByUserName(e);
        return e && y[e] ? y[e][this.UserName] : ""
    },
    chatroomCanSearch: function (e) {
        if (this.isRoomContact()) {
            if (this.canSearch(e))
                return !0;
            for (var t = 0, a = this.MemberList.length; t < a; t++) {
                var n = this.MemberList[t].UserName
                    , i = contactFactory.getContact(n);
                if (i && i.canSearch(e))
                    return !0
            }
        }
    },
    canSearch: function (e, t) {
        if (!e)
            return !0;
        e = e.toUpperCase();
        var a = this.RemarkName || ""
            , n = this.RemarkPYQuanPin || ""
            , i = this.NickName || ""
            , o = this.PYQuanPin || ""
            , r = this.Alias || ""
            , c = this.KeyWord || ""
            , s = 0
            , l = 0;
        return s = a.toUpperCase().indexOf(e),
            l = n.toUpperCase().indexOf(e),
            s >= 0 || l >= 0 || (s = i.toUpperCase().indexOf(e),
                l = o.toUpperCase().indexOf(e),
                s >= 0 || l >= 0 || (r.toUpperCase().indexOf(e) >= 0 || c.toUpperCase().indexOf(e) >= 0))
    },
    update: function (e) {
        e && angular.extend(this, e)
    }
}, contactFactory = {
    contactChangeFlag: "",
    setCurrentContact: function (e) {
        u = e
    },
    getCurrentContact: function () {
        return u
    },
    isSelf: function (e) {
        return accountFactory.getUserName() == e
    },
    initContact: function (e) {
        var n = $q.defer();
        return $http({
            method: "GET",
            url: confFactory.API_webwxgetcontact,
            params: {
                skey: accountFactory.getSkey(),
                pass_ticket: accountFactory.getPassticket(),
                seq: e,
                r: utilFactory.now()
            }
        }).success(function (e) {
            n.resolve(e)
        }).error(function (e) {
            n.reject("error:" + e),
                reportService.report(reportService.ReportType.netError, {
                    text: "init contact",
                    url: confFactory.API_webwxgetcontact,
                    params: {
                        skey: accountFactory.getSkey(),
                        pass_ticket: accountFactory.getPassticket()
                    }
                })
        }),
            n.promise
    },
    specialContactHandler: function (e) {
        var t = {
            weixin: _("6c2fc35"),
            filehelper: _("eb7ec65"),
            newsapp: _("0469c27"),
            fmessage: _("a82c4c4")
        };
        return t[e.UserName] && (e.NickName = t[e.UserName]),
            "fmessage" == e.UserName && (e.ContactFlag = 0),
            e
    },
    addContact: function (e) {
        e && (e.isContact || (e = f(e),
            e.MMOrderSymbol = this.getContactOrderSymbol(e)),
            e.EncryChatRoomId && e.UserName && (e.MMFromBatchget = !0),
            e.RemarkName = e.RemarkName && emojiFactory.transformSpanToImg(e.RemarkName),
            e.NickName = e.NickName && emojiFactory.transformSpanToImg(e.NickName),
            e.isShieldUser() || !e.isContact() && !e.isRoomContact() ? this.addStrangerContact(e) : this.addFriendContact(e))
    },
    addFriendContact: function (e) {
        var t, a = this;
        if (e) {
            if (e = a.specialContactHandler(e),
                t = m[e.UserName]) {
                for (var n in e)
                    e[n] || delete e[n];
                angular.extend(t, e)
            } else
                m[e.UserName] = e;
            a.contactChangeFlag = +new Date,
                resourceService.load({
                    url: e.HeadImgUrl,
                    type: "image"
                })
        }
    },
    addContacts: function (e, t) {
        var a = this;
        angular.forEach(e, function (e, n) {
            t && (e.MMFromBatchGet = !0),
                a.addContact(e)
        })
    },
    deleteContact: function (e) {
        var t = this.getContact(e.UserName);
        t && (delete m[e.UserName],
            angular.extend(t, e),
            g[e.UserName] = t)
    },
    getContact: function (e, t, a) {
        var n, i = this;
        return n = m[e],
            n || (n = i.getStrangerContacts(e)),
            a ? n : ((!n || utilFactory.isRoomContact(e) && 0 == n.MemberList.length) && i.addBatchgetContact({
                UserName: e,
                EncryChatRoomId: t || ""
            }),
                n)
    },
    getStrangerContacts: function (e) {
        return g[e]
    },
    addStrangerContact: function (e) {
        var t;
        if (t = g[e.UserName]) {
            for (var a in e)
                e[a] || delete e[a];
            angular.extend(t, e)
        } else
            g[e.UserName] = e;
        resourceService.load({
            url: e.HeadImgUrl,
            type: "image"
        })
    },
    addChatroomMemberDisplayName: function (e, t) {
        e.DisplayName && t && (y[t] || (y[t] = {}),
            y[t][e.UserName] = e.DisplayName)
    },
    getChatroomIdByUserName: function (e) {
        var t = m[e] || {};
        return t.EncryChatRoomId
    },
    inContactsWithErrorToGetList: function (e) {
        for (var t = 0, a = w.length; t < a; t++)
            if (w[t].UserName == e.UserName)
                return t;
        return -1
    },
    inContactsToGetList: function (e) {
        for (var t = 0, a = b.length; t < a; t++)
            if (b[t].UserName == e.UserName)
                return t;
        return -1
    },
    inContactsGettingList: function (e) {
        for (var t = 0, a = C.length; t < a; t++)
            if (C[t].UserName == e.UserName)
                return t;
        return -1
    },
    inContactsGetErrMap: function (e) {
        return S[e.UserName]
    },
    addBatchgetContact: function (e, t, i) {
        function r(e) {
            f.resolve(e.ContactList),
                N = 0,
                angular.forEach(e.ContactList, function (e) {
                    var t = u.inContactsToGetList({
                        UserName: e.UserName
                    });
                    t > -1 && b.splice(t, 1),
                        utilFactory.isRoomContact(e.UserName) && e.MemberList && e.MemberList.length ? angular.forEach(e.MemberList, function (t) {
                            var a = u.getContact(t.UserName, "", !0);
                            a && a.isContact() || (t.HeadImgUrl = utilFactory.getContactHeadImgUrl({
                                EncryChatRoomId: e.EncryChatRoomId,
                                UserName: t.UserName,
                                Skey: accountFactory.getSkey()
                            }),
                                u.addContact(t)),
                                u.addChatroomMemberDisplayName(t, e.UserName);
                            var n = u.inContactsToGetList({
                                UserName: t.UserName
                            });
                            n > -1 && b.splice(n, 1)
                        }) : u.addChatroomMemberDisplayName(e, e.UserName)
                }),
                u.addContacts(e.ContactList, !0),
                C = [],
                !C.length && b.length > 0 && u.batchGetContact().then(r, s)
        }
        function s(e) {
            var t = C;
            C = [],
                N++ ,
                f.reject(e),
                1 == t.length ? S[t[0].UserName] = 1 : angular.forEach(t, function (e) {
                    u.addBatchgetContact(e, !1, !0)
                }),
                C.length || !b.length && !w.length || u.batchGetContact().then(r, s)
        }
        var l, d, f = $q.defer(), u = this;
        if (e && e.UserName) {
            if (i) {
                if (u.inContactsWithErrorToGetList(e) > -1)
                    return;
                w.push(e),
                    l = u.inContactsToGetList(e),
                    l > -1 && b.splice(l, 1)
            } else {
                if (u.inContactsToGetList(e) > -1 || u.inContactsGettingList(e) > -1 || u.inContactsGetErrMap(e))
                    return;
                utilFactory.isRoomContact(e.UserName) || t ? b.unshift(e) : b.push(e)
            }
            return d && $timeout.cancel(d),
                d = $timeout(function () {
                    C.length || !b.length && !w.length || u.batchGetContact().then(r, s)
                }, 200),
                f.promise
        }
    },
    addBatchgetChatroomContact: function (e) {
        if (utilFactory.isRoomContact(e)) {
            var t = this.getContact(e);
            t && t.MMFromBatchGet || this.addBatchgetContact({
                UserName: e,
                ChatRoomId: ""
            })
        }
    },
    addBatchgetChatroomMembersContact: function (e) {
        var t = this
            , a = t.getContact(e);
        a && a.isRoomContact() && !a.MMBatchgetMember && a.MemberList.length > 0 && (a.MMBatchgetMember = !0,
            angular.forEach(a.MemberList, function (e) {
                var n = t.getContact(e.UserName);
                !n || n.isContact() || n.MMFromBatchget || t.addBatchgetContact({
                    UserName: n.UserName,
                    EncryChatRoomId: a.UserName
                })
            }))
    },
    batchGetContact: function (e) {
        var n = $q.defer()
            , r = 1;
        return w.length ? (r = w.length < 6 || N > 2 ? 1 : w.length < 40 ? 5 : 10,
            C = w.splice(0, r)) : C = b.splice(0, 50),
            $http({
                method: "POST",
                url: confFactory.API_webwxbatchgetcontact + "?type=ex&r=" + utilFactory.now(),
                data: angular.extend(accountFactory.getBaseRequest(), {
                    Count: C.length,
                    List: C
                })
            }).success(function (t) {
                t && t.BaseResponse && 0 == t.BaseResponse.Ret ? n.resolve(t) : n.reject(e)
            }).error(function (t) {
                reportService.report(reportService.ReportType.netError, {
                    text: "batchGetContact",
                    url: confFactory.API_webwxbatchgetcontact
                }),
                    n.reject(e)
            }),
            n.promise
    },
    getChatRoomMembersContact: function (e, t) {
        var a = this
            , n = m[e]
            , i = [];
        return n ? (angular.forEach(n.MemberList, function (e) {
            var n = a.getContact(e.UserName);
            n || (n = e),
                t && n.UserName == accountFactory.getUserName() || i.push(n)
        }),
            i) : []
    },
    getAllContacts: function () {
        return m
    },
    getAllStarContact: function (e) {
        e = e || {};
        var t;
        t = e.isNewArray ? [] : h,
            t.length = 0;
        var a = e.filterContacts || {};
        for (var n in m) {
            var i = m[n];
            i.isSelf() || 1 != i.StarFriend || a[n] || !i.canSearch(e.keyword) || t.push(i)
        }
        return t = t.sort(function (e, t) {
            return e.MMOrderSymbol > t.MMOrderSymbol ? 1 : -1
        })
    },
    getAllChatroomContact: function (e) {
        e = e || {};
        var t;
        t = e.isNewArray ? [] : M,
            t.length = 0;
        var a = e.filterContacts || {};
        for (var n in m) {
            var i = m[n];
            if (i.isRoomContact() && (!e.keyword || i.chatroomCanSearch(e.keyword)) && !a[n]) {
                if (e.isSaved && !i.isContact())
                    continue;
                t.push(i)
            }
        }
        return t.sort(function (e, t) {
            return e.MMOrderSymbol > t.MMOrderSymbol ? 1 : -1
        }),
            t
    },
    getAllBrandContact: function (e) {
        e = e || {};
        var t;
        t = e.isNewArray ? [] : v,
            t.length = 0;
        for (var a in m) {
            var n = m[a];
            n.isBrandContact() && n.canSearch(e.keyword) && t.push(n)
        }
        return t.sort(function (e, t) {
            return e.MMOrderSymbol > t.MMOrderSymbol ? 1 : -1
        }),
            t
    },
    getAllFriendContact: function (e) {
        e = e || {};
        var t;
        t = e.isNewArray ? [] : p,
            t.length = 0,
            e.filterContacts = e.filterContacts || {};
        for (var a in m)
            if (!e.filterContacts[a]) {
                var n = m[a];
                n.isSelf() && !accountFactory.isHigherVer() || !n.isContact() || e.isWithoutStar && 1 == n.StarFriend || n.isRoomContact() || e.isWithoutBrand && n.isBrandContact() || n.isShieldUser() || n.canSearch(e.keyword) && t.push(n)
            }
        return t.sort(function (e, t) {
            return e.MMOrderSymbol > t.MMOrderSymbol ? 1 : -1
        }),
            t
    },
    remoteSearch: function (e) {
        function n(e) {
            for (var t, a, n = [], i = 0; i < e.length; i++)
                t = e[i].EncryUserName,
                    a = m[t],
                    a && a.isContact() && !a.isBrandContact() && n.push(a);
            return n
        }
        var r = $q.defer();
        return this.prevSearchCanceler && this.prevSearchCanceler.resolve(),
            this.prevSearchCanceler = $q.defer(),
            T[e] ? r.resolve(n(T[e])) : $http({
                method: "POST",
                url: confFactory.API_webwxsearch,
                timeout: this.prevSearchCanceler.promise,
                data: angular.extend(accountFactory.getBaseRequest(), {
                    KeyWord: e
                })
            }).success(function (t) {
                if (t.BaseResponse && 0 == t.BaseResponse.Ret) {
                    var a = t.List;
                    a.length > 0 && (T[e] = a),
                        r.resolve(n(a))
                }
            }).error(function (e) { }),
            r.promise
    },
    pickContacts: function (e, t, a) {
        for (var n, i, o, r = [], c = this, s = t.all || {}, l = 0; l < e.length; l++)
            switch (n = e[l],
            o = t[n] || {},
            o = $.extend({}, o, s),
            n) {
                case "star":
                    i = c.getAllStarContact(o),
                        i.length > 0 && (o.noHeader || r.push({
                            text: _("f13fb20"),
                            type: "header"
                        }),
                            [].push.apply(r, i));
                    break;
                case "friend":
                    if (i = c.getAllFriendContact(o),
                        i.length > 0) {
                        o.showFriendHeader && r.push({
                            text: _("59d29a3"),
                            type: "header"
                        });
                        var d = "";
                        o.showFriendHeader || o.noHeader || angular.forEach(i, function (e, t) {
                            if (e.MMOrderSymbol) {
                                var a = e.MMOrderSymbol.charAt(0);
                                d != a && (d = a,
                                    i.splice(t, 0, {
                                        text: a,
                                        type: "header"
                                    }))
                            }
                        }),
                            [].push.apply(r, i)
                    }
                    break;
                case "chatroom":
                    i = c.getAllChatroomContact(o),
                        i.length > 0 && (o.noHeader || r.push({
                            text: _("4b0ab7b"),
                            type: "header"
                        }),
                            [].push.apply(r, i));
                    break;
                case "brand":
                    i = c.getAllBrandContact(o),
                        i.length > 0 && (t[n].noHeader || r.push({
                            text: _("215feec"),
                            type: "header"
                        }),
                            [].push.apply(r, i))
            }
        return a && (r = angular.copy(r)),
            {
                result: r
            }
    },
    getContactOrderSymbol: function (e) {
        if (!e)
            return "";
        var t = "";
        return t = utilFactory.clearHtmlStr(e.RemarkPYQuanPin || e.PYQuanPin || e.NickName || "").toLocaleUpperCase().replace(/\W/gi, ""),
            t.charAt(0) < "A" && (t = "~"),
            t
    },
    verifyUser: function (e) {
        var n = $q.defer()
            , r = {
                Opcode: e.Opcode || confFactory.VERIFYUSER_OPCODE_VERIFYOK,
                VerifyUserListSize: 1,
                VerifyUserList: [{
                    Value: e.UserName,
                    VerifyUserTicket: e.Ticket || ""
                }],
                VerifyContent: e.VerifyContent || "",
                SceneListCount: 1,
                SceneList: [e.Scene],
                skey: accountFactory.getSkey()
            };
        return $http({
            method: "POST",
            url: confFactory.API_webwxverifyuser + "?r=" + utilFactory.now(),
            data: angular.extend(accountFactory.getBaseRequest(), r)
        }).success(function (e) {
            e.BaseResponse && 0 == e.BaseResponse.Ret ? n.resolve(e) : (n.reject(e),
                reportService.report(reportService.ReportType.netError, {
                    text: "添加验证好友，服务器返回错误",
                    url: confFactory.API_webwxverifyuser,
                    params: r,
                    res: e
                }))
        }).error(function (e) {
            n.reject(e),
                reportService.report(reportService.ReportType.netError, {
                    text: "添加验证好友，请求失败",
                    url: confFactory.API_webwxverifyuser,
                    params: r,
                    res: e
                })
        }),
            n.promise
    },
    setTopContact: function (t, a) {
        var n = this.getContact(t);
        a ? n.ContactFlag = n.ContactFlag | confFactory.CONTACTFLAG_TOPCONTACT : n.ContactFlag = n.ContactFlag & ~confFactory.CONTACTFLAG_TOPCONTACT,
            $rootScope.$broadcast("contact:settop", n),
            mmHttp({
                method: "POST",
                url: confFactory.API_webwxoplog,
                data: angular.extend({
                    UserName: t,
                    CmdId: confFactory.oplogCmdId.TOPCONTACT,
                    OP: a ? 1 : 0,
                    RemarkName: n.RemarkName
                }, accountFactory.getBaseRequest()),
                MMRetry: {
                    count: 3,
                    timeout: 1e4,
                    serial: !0
                }
            }).success(function (e) { }).error(function (e) { })
    }
};
