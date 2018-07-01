function t(e, t) {
    function a() {
        n[i] ? e() : t()
    }
    var i, o;
    "undefined" != typeof n.hidden ? (i = "hidden",
            o = "visibilitychange") : "undefined" != typeof n.mozHidden ? (i = "mozHidden",
            o = "mozvisibilitychange") : "undefined" != typeof n.msHidden ? (i = "msHidden",
            o = "msvisibilitychange") : "undefined" != typeof n.webkitHidden && (i = "webkitHidden",
            o = "webkitvisibilitychange"),
        "undefined" == typeof n.addEventListener || "undefined" == typeof i ? ($(window).focus(function () {
                t()
            }),
            $(window).blur(function () {
                e()
            })) : n.addEventListener(o, a, !1)
}
var a = !0,
    n = $window.document,
    i = {
        defaultTitle: _("2f521c5"),
        unreadMsgNum: 0,
        start: function () {
            var e = this;
            this.unreadMsgNum = 0,
                this.timer && clearTimeout(this.timer),
                this.timer = setTimeout(function t() {
                    e._toggle(),
                        e.timer = setTimeout(t, 2e3)
                }, 2e3)
        },
        _toggle: function () {
            n.title == this.defaultTitle && this.unreadMsgNum > 0 ? n.title = _("cfbf6f4") + "(" + this.unreadMsgNum + ")" : n.title = this.defaultTitle
        },
        stop: function () {
            var e = this;
            this.timer && clearTimeout(this.timer),
                setTimeout(function () {
                    n.title = e.defaultTitle
                }, 100)
        },
        increaseUnreadMsgNum: function () {
            a || this.unreadMsgNum++
        }
    };
t(function () {
    a = !1,
        i.start()
}, function () {
    a = !0,
        i.stop()
});
var titleRemand = {
    increaseUnreadMsgNum: function () {
        i.increaseUnreadMsgNum()
    }
};