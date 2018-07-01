function i() {
    var e, t = {};
    return t.appTiming = G,
        window.performance && (e = window.performance.timing) && (t.pageTiming = e),
        t
}

function o(e) {
    e.needSend ? (p({
            Type: 1,
            Text: JSON.stringify({
                type: N.timing,
                data: i()
            })
        }, !0),
        k = !0,
        f()) : e.fullTiming ? p({
        Type: 1,
        Text: JSON.stringify({
            type: N.timing,
            data: e.fullTiming
        })
    }, !0) : extend(G, e.timing)
}

function r(e) {
    return {
        message: e.message,
        stack: e.stack && e.stack.replace(/\n/g, "\\n"),
        other: e.other
    }
}

function c(e, t) {
    return e
}

function s(e, t) {
    var a = E[e],
        n = t;
    "function" == typeof a ? n = a(t) : "string" == typeof a && (n = c(a, t));
    var i = JSON.stringify({
        type: e,
        data: n
    });
    return i
}

function l() {
    var e = JSON.parse(T.getItem(S));
    if (e && e.length > 0) {
        for (var t = 0; t < e.length; t++)
            d(e[t].type, e[t].data);
        T.setItem(S, null)
    }
}

function d(e, t, a) {
    if (void 0 != typeof e) {
        if (e == N.timing)
            return void o(t);
        var n, i = a || !1;
        e.indexOf("send-error") > 0 ? (i = !0,
            n = {
                Type: 16,
                Text: s(e, t)
            }) : (e.indexOf("-error") > 0 ? (i = !0,
                n = {
                    Type: 2,
                    Text: s(e, t)
                }) : n = {
                Type: 1,
                Text: s(e, t)
            },
            p(n, i))
    }
}

function f() {
    for (var e = [0, 15e3, 6e5], a = 0; a < e.length; a++)
        setTimeout(function (e) {
            return function () {
                w[e] = g($rootScope)
            }
        }(e[a]), e[a])
}

function u() {
    // $(window).unload(function () {
    //     w.unload = g($rootScope),
    //         C.push({
    //             type: N.runtime,
    //             data: w
    //         }), !k && C.push({
    //             type: N.timing,
    //             data: {
    //                 fullTiming: i()
    //             }
    //         }),
    //         localStorage.setItem(S, JSON.stringify(C))
    // })
}

function m() {
    var e, t = window.localStorage;
    return e = t ? {
        setItem: function () {
            try {
                t.setItem.apply(t, arguments)
            } catch (e) {}
        },
        getItem: function () {
            try {
                return t.getItem.apply(t, arguments)
            } catch (e) {}
        }
    } : {
        setItem: function () {},
        getItem: function () {}
    }
}

function g(e, t) {
    t || (t = {
        listenerCount: 0,
        watchersCount: 0,
        scopesCount: 0
    });
    for (var a = e.$$childHead; a;)
        g(a, t),
        a = a.$$nextSibling;
    var n = e.$$listenerCount;
    for (var i in n)
        t.listenerCount += n[i];
    return t.watchersCount += e.$$watchers && e.$$watchers.length,
        t.scopesCount += 1,
        t
}

function p(e, t) {
    b.push(e),
        t ? h() : (v && clearTimeout(v),
            v = setTimeout(function () {
                h()
            }, y))
}

function h() {
    var e = b.splice(0);
    M(e)
}

function M(t) {
    $http({
        method: "POST",
        url: confFactory.API_webwxreport + "?fun=new",
        data: {
            BaseRequest: {
                Uin: accountFactory.getUin(),
                Sid: accountFactory.getSid(),
                DeviceID: accountFactory.getDeviceID()
            },
            Count: t.length,
            List: t
        }
    }).success(function (e) {}).error(function (e) {})
}
var v, y = 3e3,
    b = [],
    C = [],
    w = {},
    S = "reportService",
    T = m(),
    N = {
        jsError: "[js-error]",
        initError: "[init-error]",
        logicError: "[logic-error]",
        uploaderError: "[uploader-error]",
        netError: "[net-error]",
        imageLoadError: "[image-load-error]",
        picError: "[pic-error]",
        cookieError: "[cookie-error]",
        sendError: "[send-error]",
        timing: "[app-timing]",
        runtime: "[app-runtime]",
        contactReady: "[contact-ready-time]",
        initReady: "[init-ready-time]",
        actionRecord: "[action-record]",
        WinAdPV: "[win-ad-pv]",
        click2CloseAd: "[click-to-close-ad]",
        clickAndCloseAd: "[click-and-close-ad]",
        sessionData: "[session-data]"
    },
    E = {};
E[N.jsError] = r,
    l(),
    u();
var G = {},
    k = !1;
window._errorHandler = function (e) {
    d(N.jsError, e)
};
var reportService = {
    report: d,
    ReportType: N
};