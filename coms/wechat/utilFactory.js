var host, cookie, Skey;

function pushhost(e, t, a, n) {
    var i;
    (i = d[e]) ? (i.intervalSum += a,
        n && n <= i.intervalSum && (setTimeout(t, 0),
            d[e].intervalSum = 0),
        clearTimeout(i.timer),
        i.timer = setTimeout(function () {
            delete d[e],
                setTimeout(t, 0)
        }, a)) : (setTimeout(t, 0),
            d[e] = {
                intervalSum: 0,
                timer: setTimeout(function () {
                    delete d[e]
                }, a)
            })
}
window.isFocus = !0;
var Passticket, r = {},
    SyncKey = "(\\s|\\n|<br>|^)(http(s)?://.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?(&|&amp;)//=]*)",
    s = ["weibo", "qqmail", "fmessage", "tmessage", "qmessage", "qqsync", "floatbottle", "lbsapp", "shakeapp", "medianote", "qqfriend", "readerapp", "blogapp", "facebookapp", "masssendapp", "meishiapp", "feedsapp", "voip", "blogappweixin", "weixin", "brandsessionholder", "weixinreminder", "wxid_novlwrv3lqwv11", "gh_22b87fa7cb3c", "officialaccounts", "notification_messages"],
    HigherVer = ["newsapp", "wxid_novlwrv3lqwv11", "gh_22b87fa7cb3c", "notification_messages"],
    d = {};
window.onfocus = function () {
    window.isFocus = !0
},
    window.onblur = function () {
        window.isFocus = !1
    };
var utilFactory = {
    isLog: !1,
    log: function () {
        this.isLog && void 0
    },
    now: function () {
        return +new Date
    },
    getCookie: function (e) {
        for (var t = e + "=", a = cross.getCookies("wx2.qq.com/").split(";"), n = 0; n < a.length; n++) {
            for (var i = a[n];
                " " == i.charAt(0);)
                i = i.substring(1);
            if (i.indexOf(t) != -1)
                return i.substring(t.length, i.length)
        }
        return ""
    },
    setCookie: function (e, t, a) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * a * 60 * 60 * 1e3);
        var i = "expires=" + n.toUTCString();
        cross.addCookie(cookie = e + "=" + t + "; " + i, "wx2.qq.com/");
    },
    clearCookie: function () {
        for (var e = document.cookie.split(";"), t = 0; t < e.length; t++) {
            var a = e[t],
                n = a.indexOf("="),
                i = n > -1 ? a.substr(0, n) : a;
            cookie.addCookie(i + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT", "wx2.qq.com");
        }
    },
    getLocalStorage: function () {
        return window.localStorage || {
            getItem: function (e) { },
            setItem: function (e, t) { },
            removeItem: function (e) { },
            key: function (e) {
                return ""
            }
        }
    },
    htmlEncode: function (e) {
        return isString(e) ? e.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : ""
    },
    htmlDecode: function (e) {
        return e && 0 != e.length ? e.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&") : ""
    },
    hrefEncode: function (e) {
        var t = this,
            a = e.match(/&lt;a href=(?:'|").*?(?:'|").*?&gt;.*?&lt;\/a&gt;/g);
        if (a) {
            for (var n, i, o = 0, r = a.length; o < r; ++o)
                n = /&lt;a href=(?:'|")(.*?)(?:'|").*?&gt;.*?&lt;\/a&gt;/.exec(a[o]),
                    n && n[1] && (i = n[1],
                        t.isUrl(i) && (e = e.replace(n[0], this.htmlDecode(n[0])).replace(n[1], utilFactory.genCheckURL(n[1]))));
            return e
        }
        return e.replace(new RegExp(SyncKey, "ig"), function () {
            return '<a target="_blank" href="' + utilFactory.genCheckURL(arguments[0].replace(/^(\s|\n)/, "")) + '">' + arguments[0] + "</a>"
        })
    },
    clearHtmlStr: function (e) {
        return e ? e.replace(/<[^>]*>/g, "") : e
    },
    clearLinkTag: function (e) {
        return e
    },
    setCheckUrl: function (e) {
        Passticket = "&skey=" + encodeURIComponent(e.getSkey()) + "&deviceid=" + encodeURIComponent(e.getDeviceID()) + "&pass_ticket=" + encodeURIComponent(e.getPassticket()) + "&opcode=2&scene=1&username=" + e.getUserName()
    },
    genCheckURL: function (e) {
        if (!Passticket)
            throw "_checkURLsuffix is not ready!";
        return confFactory.API_webwxcheckurl + "?requrl=" + encodeURIComponent((0 == e.indexOf("http") ? "" : "http://") + utilFactory.clearHtmlStr(utilFactory.htmlDecode(e))) + Passticket
    },
    isUrl: function (e) {
        return new RegExp(SyncKey, "i").test(e)
    },
    formatNum: function (e, t) {
        var a = (isNaN(e) ? 0 : e).toString(),
            n = t - a.length;
        return n > 0 ? [new Array(n + 1).join("0"), a].join("") : a
    },
    getServerTime: function (e) {
        return (new Date).getTime()
    },
    globalEval: function (e) {
        e && /\S/.test(e) && (window.execScript || function (e) {
            window.eval.call(window, e)
        })(e)
    },
    evalVal: function (e) {
        var t, a = "a" + this.now();
        return this.globalEval(["(function(){try{window.", a, "=", e, ";}catch(_oError){}})();"].join("")),
            t = window[a],
            window[a] = null,
            t
    },
    browser: function () {
        var e, t = navigator.userAgent.toLowerCase();
        if (null != t.match(/trident/))
            e = {
                browser: "msie",
                version: null != t.match(/msie ([\d.]+)/) ? t.match(/msie ([\d.]+)/)[1] : t.match(/rv:([\d.]+)/)[1]
            };
        else {
            var a = /(msie) ([\w.]+)/.exec(t) || /(chrome)[ \/]([\w.]+)/.exec(t) || /(webkit)[ \/]([\w.]+)/.exec(t) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t) || t.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t) || [];
            e = {
                browser: a[1] || "",
                version: a[2] || "0"
            }
        }
        var n = {};
        return e.browser && (n[e.browser] = !0,
            n.version = e.version),
            n.chrome ? n.webkit = !0 : n.webkit && (n.safari = !0),
            n
    }(),
    isSpUser: function (e) {
        for (var t = 0, a = s.length; t < a; t++)
            if (s[t] === e || /@qqim$/.test(e))
                return !0;
        return !1
    },
    isShieldUser: function (e) {
        if (/@lbsroom$/.test(e) || /@talkroom$/.test(e))
            return !0;
        for (var t = 0, a = HigherVer.length; t < a; ++t)
            if (HigherVer[t] == e)
                return !0;
        return !1
    },
    isRoomContact: function (e) {
        return !!e && /^@@|@chatroom$/.test(e)
    },
    initMsgNoticePlayer: function (e,) {
        host.e(2, function (require) {
            var a = (host(281),
                document.querySelector("#msgNoticePlayer"));
            a.jPlayer({
                ready: function () { },
                swfPath: window.MMSource.jplayerSwfPath,
                solution: "html, flash",
                supplied: "mp3",
                wmode: "window"
            }),
                a.jPlayer("stop"),
                a.jPlayer("setMedia", {
                    mp3: e
                }),
                a.jPlayer("play")
        })
    },
    getContactHeadImgUrl: function (e) {
        return (this.isRoomContact(e.UserName) ? confFactory.API_webwxgetheadimg : confFactory.API_webwxgeticon) + "?seq=0&username=" + e.UserName + "&skey=" + e.Skey + (e.MsgId ? "&msgid=" + e.MsgId : "") + (e.EncryChatRoomId ? "&chatroomid=" + e.EncryChatRoomId : "")
    },
    form: function (uri, parameters) {
        // parameters = parameters || {};
        // var element, text = [];
        // text.push('<form method="POST" action="' + encodeURIComponent("{s//wx2.qq.com}@") + this.htmlEncode(uri) + '">');
        // for (var i in parameters)
        //     text.push('<input type="hidden" name="' + i + '" value="' + parameters[i] + '">');
        // text.push("</form>");
        // element = xml.parse(text.join(""))[0];
        // document.body.appendChild(element);
        // element.submit();
    },
    queryParser: function () {
        for (var e = {}, t = location.search.substring(1), a = t.split("&"), n = 0, i = a.length; n < i; n++) {
            var o = a[n].split("="),
                r = decodeURIComponent(o[0]);
            e[r] = decodeURIComponent(o[1] || "")
        }
        return e
    },
    getSize: function (e) {
        if (e = +e) {
            var t = 10,
                a = 10,
                n = 20,
                i = 1 << a,
                o = 1 << n;
            if (e >> n > 0) {
                var r = Math.round(e * t / o) / t;
                return "" + r + "MB"
            }
            if (e >> a - 1 > 0) {
                var c = Math.round(e * t / i) / t;
                return "" + c + "KB"
            }
            return "" + e + "B"
        }
    },
    xml2json: function (e) {
        if (!e)
            return {};
        try {
            var t = e.indexOf("<");
            return t && (e = e.substr(t)),
                $.xml2json(e)
        } catch (e) {
            return {}
        }
    },
    encodeEmoji: function (e) {
        return e = e || "",
            e = e.replace(/<span class="(emoji emoji[a-zA-Z0-9]+)"><\/span>/g, "###__EMOJI__$1__###")
    },
    decodeEmoji: function (e) {
        return e = e || "",
            e = e.replace(/###__EMOJI__(emoji emoji[a-zA-Z0-9]+)__###/g, '<span class="$1"></span>')
    },
    removeHtmlStrTag: function (e) {
        return e = e || "",
            e = this.encodeEmoji(e),
            e = this.htmlDecode(e),
            e = this.clearHtmlStr(e),
            e = this.decodeEmoji(e)
    },
    safeDigest: function (e) {
        e = e || $rootScope,
            e.$$phase || e.$digest()
    },
    wait: function (e, t, a) {
        var a = a || 10;
        setTimeout(function n() {
            e() ? t() : setTimeout(n, a)
        }, a)
    },
    fitRun: Skey,
    findIndex: function (e, t) {
        for (var a = 0; a < e.length; a++)
            if (e[a] == t)
                return a;
        return -1
    },
    genEmoticonHTML: function (e, t) {
        return '<img class="' + e + '" text="' + t + (t.indexOf(confFactory.MM_EMOTICON_WEB) > -1 ? "" : confFactory.MM_EMOTICON_WEB) + '" src="' + confFactory.RES_IMG_PLACEHOLDER + '" />'
    },
    getShareObject: function (e) {
        return r[e] = r[e] || {},
            r[e]
    },
    reportSendState: function (e, t) {
        var a = 63637,
            n = this.browser.msie,
            i = {
                sendFileWrong: {
                    ie: 63,
                    notIe: 64
                },
                sendImageWrong: {
                    ie: 65,
                    notIe: 66
                },
                uiCheckFail: {
                    ie: 84,
                    notIe: 84
                },
                MD5TimeBigFilePerMb: {
                    ie: 69,
                    notIe: 70
                },
                MD5TimeSmallFile: {
                    ie: 71,
                    notIe: 72
                },
                MD5TimeBigFilePerMbCount: {
                    ie: 73,
                    notIe: 74
                },
                MD5TimeSmallFileCount: {
                    ie: 75,
                    notIe: 76
                },
                sendcheckElementError: {
                    ie: 77,
                    notIe: 77
                },
                sendcheckAttrError: {
                    ie: 78,
                    notIe: 78
                },
                chatCurrentNameNotFound: {
                    ie: 79,
                    notIe: 79
                },
                navcurrentNameNotFound: {
                    ie: 80,
                    notIe: 80
                },
                toUserNameNotFound: {
                    ie: 81,
                    notIe: 81
                },
                toUserNameConflictNav: {
                    ie: 82,
                    notIe: 82
                },
                toUserNameConflictChat: {
                    ie: 83,
                    notIe: 83
                },
                sendFile: {
                    ie: 86,
                    notIe: 86
                }
            },
            o = i[e];
        o && this.reportIdkey(a, o[n ? "ie" : "notIe"], t)
    },
    reportIdkey: function (e, t, a) {
        var n = "https://support.weixin.qq.com/cgi-bin/mmsupport-bin/reportforweb?rid=" + e + "&rkey=" + t + "&rvalue=" + (a || 1);
        (new Image).src = n
    },
    isUserName: function () { },
    isWindows: /windows/gi.test(navigator.userAgent),
    isMacOS: /macintosh/gi.test(navigator.userAgent),
    isIPad: /ipad/gi.test(navigator.userAgent)
};