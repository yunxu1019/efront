function a(e) {
    if ("object" == typeof e)
        for (var t in e)
            i[t] !== e[t] && n(t, e[t]),
            i[t] = e[t]
}

function n(e, t) {
    var a = o[e];
    if (a)
        for (var n = 0; n < a.length; n++)
            a[n](t)
}
var i = {
        "sender:hasText": !1,
        "sender:active": !1,
        "navChat:active": !1,
        "navContact:active": !1,
        "contactPicker:active": !1,
        "dialog:open": !1
    },
    o = {},
    r = {
        "navChat:active": {
            "navContact:active": !1,
            "navRead:active": !1
        },
        "navRead:active": {
            "navChat:active": !1,
            "navContact:active": !1
        },
        "navContact:active": {
            "navChat:active": !1,
            "navRead:active": !1
        }
    },
    c = {
        navKeydown: function () {
            return !i["sender:hasText"] && !i["contactPicker:active"]
        },
        pasteFile: function () {
            return !i["dialog:open"]
        }
    },
    s = {},
    stateManagerService = {
        change: function (e, t) {
            var o, c = r[e],
                s = t.toString();
            c && (o = c.false || c.true ? c[s] : "true" == s ? c : void 0),
                i[e] !== t && n(e, t),
                i[e] = t,
                a(o)
        },
        canDo: function (e) {
            return c[e]()
        },
        on: function (e, t) {
            o[e] || (o[e] = []);
            var a = i[e];
            "undefined" != typeof a && n(e, a),
                o[e].push(t)
        },
        off: function (e, t) {
            var a, n = o[e];
            if (n)
                for (var i = 0; i < n.length; i++)
                    if (a = n[i],
                        a == t)
                        return void n.splice(i, 1)
        },
        data: function (e, t) {
            return 2 === arguments.length && (s[e] = t),
                s[e]
        }
    };