factory("notificationFactory", ["utilFactory", function(utilFactory) {
    function t(e, t) {
        var a;
        return window.Notification ? a = new window.Notification(e,{
            icon: angular.isString(t.icon) ? t.icon : t.icon.x32,
            body: t.body || m,
            tag: t.tag || m
        }) : window.webkitNotifications ? (a = window.webkitNotifications.createNotification(t.icon, e, t.body),
        a.show()) : navigator.mozNotification ? (a = navigator.mozNotification.createNotification(e, t.body, t.icon),
        a.show()) : window.external && window.external.msIsSiteMode() && (window.external.msSiteModeClearIconOverlay(),
        window.external.msSiteModeSetIconOverlay(angular.isString(t.icon) ? t.icon : t.icon.x16, e),
        window.external.msSiteModeActivate(),
        a = {
            ieVerification: p + 1
        }),
        a
    }
    function a(e) {
        return {
            close: function() {
                e && (e.close ? e.close() : e.cancel ? e.cancel() : window.external && window.external.msIsSiteMode() && e.ieVerification === p && window.external.msSiteModeClearIconOverlay())
            }
        }
    }
    function n(e) {
        if (g) {
            var t = angular.isFunction(e) ? e : angular.noop;
            window.webkitNotifications && window.webkitNotifications.checkPermission ? window.webkitNotifications.requestPermission(t) : window.Notification && window.Notification.requestPermission && window.Notification.requestPermission(t)
        }
    }
    function i() {
        var e;
        if (g)
            return window.Notification && window.Notification.permissionLevel ? e = window.Notification.permissionLevel() : window.webkitNotifications && window.webkitNotifications.checkPermission ? e = f[window.webkitNotifications.checkPermission()] : window.Notification && window.Notification.permission ? e = window.Notification.permission : navigator.mozNotification ? e = l : window.external && void 0 !== window.external.msIsSiteMode() && (e = window.external.msIsSiteMode() ? l : s),
            e
    }
    function o(e) {
        return e && angular.isObject(e) && angular.extend(M, e),
        M
    }
    function r() {
        return !M.pageVisibility || (document.hidden || document.msHidden || document.mozHidden || document.webkitHidden)
    }
    function c(e, n) {
        h.length >= M.total && h.shift().close();
        var o, c;
        return g && r() && angular.isString(e) && n && (angular.isString(n.icon) || angular.isObject(n.icon)) && i() === l && (o = t(e, n)),
        c = a(o),
        h.push(c),
        M.autoClose && o && !o.ieVerification && o.addEventListener && o.addEventListener("show", function() {
            var e = c;
            setTimeout(function() {
                e.close()
            }, M.autoClose)
        }),
        o
    }
    var s = "default"
      , l = "granted"
      , d = "denied"
      , f = [l, s, d]
      , u = {
        pageVisibility: !1,
        autoClose: 5e3,
        total: 3
    }
      , m = ""
      , g = function() {
        var t = !1;
        try {
            t = !!(window.Notification || window.webkitNotifications || navigator.mozNotification || window.external && void 0 !== window.external.msIsSiteMode())
        } catch (t) {
            utilFactory.log("Services.notificationFactory.isSupport error: ", t)
        }
        return t
    }()
      , p = Math.floor(10 * Math.random() + 1)
      , h = []
      , M = u
      , notifiactionFactory = {
        PERMISSION_DEFAULT: s,
        PERMISSION_GRANTED: l,
        PERMISSION_DENIED: d,
        isSupported: g,
        config: o,
        createNotification: c,
        permissionLevel: i,
        requestPermission: n
    };
    return angular.isFunction(Object.seal) && Object.seal(notifiactionFactory),
    notifiactionFactory
}
])