/**
 * 繁星直播播放器
 */
var self, importScripts, $, global, MessageChannel, {
    TypeError,
    Blob,
    Worker,
    MediaSource,
    URL,
    DataView,
    Uint8Array,
    ArrayBuffer,
    Symbol,
    Int16Array,
    require,
    ReferenceError,
    Uint8ClampedArray,
    FileReader,
    Number,
    HTMLVideoElement,
    MediaError
} = self = window;

function detectFlashObjectElement(a, h, c) {
    var container = document.getElementById(a)
        , v = "";
    for (var p in c)
        v += "" === v ? "" : "&",
            v += p + "=" + c[p];
    return "OBJECT" !== container.nodeName && (container.outerHTML = '<object  type="application/x-shockwave-flash" id="' + a + '" width="' + h.width + '" height="' + h.height + '" data="' + h.src + '"><param name="scale" value="noScale"><param name="wmode" value="transparent"><param name="allowScriptAccess" value="always"/><param name="allowFullscreen" value="true"><param name="flashvars" value="' + v + '"><param name="movie" value="' + h.src + '"/></object>'),
        document.getElementById(a)
}
function FxPlayer(a, h) {
    this.id = a.id,
        this.data = a,
        this.root = h,
        this.isSupportMp4 = this.data.isSupportMp4 || fxPlayer.isSupportMp4,
        this.isPlayFlv = this.data.type === fileFormats.FLV,
        this.useFlash = !1,
        this.duration = 0,
        this.retrySecond = a.retrySecond || 5,
        this.httpFlv = a.httpFlv,
        this.httpIndex = 0,
        this.isAutoPlay = a.isAutoPlay,
        this.connectCount = 0,
        this.maxConnect = a.maxConnect,
        this.CONNECT_FREQUENCY = a.CONNECT_FREQUENCY || 15e3,
        this.element = document.getElementById(this.id),
        this._streamStatus = 2,
        this.isPlaying = !1,
        this.logHistory = [],
        this.initUI()
}
var fxJsPlayer = function e(t, i, n) {
    function r(o, a) {
        if (!i[o]) {
            if (!t[o]) {
                var u = "function" == typeof require && require;
                if (!a && u)
                    return u(o, !0);
                if (s)
                    return s(o, !0);
                var d = new Error("Cannot find module '" + o + "'");
                throw d.code = "MODULE_NOT_FOUND",
                d
            }
            var h = i[o] = {
                exports: {}
            };
            t[o][0].call(h.exports, function (e) {
                var i = t[o][1][e];
                return r(i || e)
            }, h, h.exports, e, t, i, n)
        }
        return i[o].exports
    }
    for (var s = "function" == typeof require && require, o = 0; o < n.length; o++)
        r(n[o]);
    return r
}({
    1: [function (t, i, n) {
        (function (r, s) {
            !function (t, r) {
                "object" == typeof n && void 0 !== i ? i.exports = r() : "function" == typeof e && e.amd ? e(r) : t.ES6Promise = r()
            }(this, function () {
                "use strict";
                function e(e) {
                    return "function" == typeof e || "object" == typeof e && null !== e
                }
                function i(e) {
                    return "function" == typeof e
                }
                function n(e) {
                    q = e
                }
                function o(e) {
                    K = e
                }
                function a() {
                    return void 0 !== H ? function () {
                        H(d)
                    }
                        : u()
                }
                function u() {
                    var e = setTimeout;
                    return function () {
                        return e(d, 1)
                    }
                }
                function d() {
                    for (var e = 0; z > e; e += 2)
                        Z[e](Z[e + 1]),
                            Z[e] = void 0,
                            Z[e + 1] = void 0;
                    z = 0
                }
                function h(e, t) {
                    var i = arguments
                        , n = this
                        , r = new this.constructor(c);
                    void 0 === r[et] && x(r);
                    var s = n._state;
                    return s ? function () {
                        var e = i[s - 1];
                        K(function () {
                            return T(s, r, e, n._result)
                        })
                    }() : O(n, r, e, t),
                        r
                }
                function l(e) {
                    var t = this;
                    if (e && "object" == typeof e && e.constructor === t)
                        return e;
                    var i = new t(c);
                    return b(i, e),
                        i
                }
                function c() { }
                function f() {
                    return new TypeError("You cannot resolve a promise with itself")
                }
                function _() {
                    return new TypeError("A promises callback cannot return that same promise.")
                }
                function m(e) {
                    try {
                        return e.then
                    } catch (e) {
                        return re.error = e,
                            re
                    }
                }
                function p(e, t, i, n) {
                    try {
                        e.call(t, i, n)
                    } catch (e) {
                        return e
                    }
                }
                function v(e, t, i) {
                    K(function (e) {
                        var n = !1
                            , r = p(i, t, function (i) {
                                n || (n = !0,
                                    t !== i ? b(e, i) : E(e, i))
                            }, function (t) {
                                n || (n = !0,
                                    k(e, t))
                            }, "Settle: " + (e._label || " unknown promise"));
                        !n && r && (n = !0,
                            k(e, r))
                    }, e)
                }
                function y(e, t) {
                    t._state === it ? E(e, t._result) : t._state === ne ? k(e, t._result) : O(t, void 0, function (t) {
                        return b(e, t)
                    }, function (t) {
                        return k(e, t)
                    })
                }
                function g(e, t, n) {
                    t.constructor === e.constructor && n === h && t.constructor.resolve === l ? y(e, t) : n === re ? (k(e, re.error),
                        re.error = null) : void 0 === n ? E(e, t) : i(n) ? v(e, t, n) : E(e, t)
                }
                function b(t, i) {
                    t === i ? k(t, f()) : e(i) ? g(t, i, m(i)) : E(t, i)
                }
                function S(e) {
                    e._onerror && e._onerror(e._result),
                        w(e)
                }
                function E(e, t) {
                    e._state === tt && (e._result = t,
                        e._state = it,
                        0 !== e._subscribers.length && K(w, e))
                }
                function k(e, t) {
                    e._state === tt && (e._state = ne,
                        e._result = t,
                        K(S, e))
                }
                function O(e, t, i, n) {
                    var r = e._subscribers
                        , s = r.length;
                    e._onerror = null,
                        r[s] = t,
                        r[s + it] = i,
                        r[s + ne] = n,
                        0 === s && e._state && K(w, e)
                }
                function w(e) {
                    var t = e._subscribers
                        , i = e._state;
                    if (0 !== t.length) {
                        for (var n = void 0, r = void 0, s = e._result, o = 0; o < t.length; o += 3)
                            n = t[o],
                                r = t[o + i],
                                n ? T(i, n, r, s) : r(s);
                        e._subscribers.length = 0
                    }
                }
                function L() {
                    this.error = null
                }
                function A(e, t) {
                    try {
                        return e(t)
                    } catch (e) {
                        return nt.error = e,
                            nt
                    }
                }
                function T(e, t, n, r) {
                    var s = i(n)
                        , o = void 0
                        , a = void 0
                        , u = void 0
                        , d = void 0;
                    if (s) {
                        if (o = A(n, r),
                            o === nt ? (d = !0,
                                a = o.error,
                                o.error = null) : u = !0,
                            t === o)
                            return void k(t, _())
                    } else
                        o = r,
                            u = !0;
                    t._state !== tt || (s && u ? b(t, o) : d ? k(t, a) : e === it ? E(t, o) : e === ne && k(t, o))
                }
                function R(e, t) {
                    try {
                        t(function (t) {
                            b(e, t)
                        }, function (t) {
                            k(e, t)
                        })
                    } catch (t) {
                        k(e, t)
                    }
                }
                function D() {
                    return st++
                }
                function x(e) {
                    e[et] = st++ ,
                        e._state = void 0,
                        e._result = void 0,
                        e._subscribers = []
                }
                function C(e, t) {
                    this._instanceConstructor = e,
                        this.promise = new e(c),
                        this.promise[et] || x(this.promise),
                        G(t) ? (this._input = t,
                            this.length = t.length,
                            this._remaining = t.length,
                            this._result = new Array(this.length),
                            0 === this.length ? E(this.promise, this._result) : (this.length = this.length || 0,
                                this._enumerate(),
                                0 === this._remaining && E(this.promise, this._result))) : k(this.promise, I())
                }
                function I() {
                    return new Error("Array Methods must be provided an Array")
                }
                function M(e) {
                    return new C(this, e).promise
                }
                function P(e) {
                    var t = this;
                    return new t(G(e) ? function (i, n) {
                        for (var r = e.length, s = 0; r > s; s++)
                            t.resolve(e[s]).then(i, n)
                    }
                        : function (e, t) {
                            return t(new TypeError("You must pass an array to race."))
                        }
                    )
                }
                function B(e) {
                    var t = this
                        , i = new t(c);
                    return k(i, e),
                        i
                }
                function U() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }
                function j() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }
                function N(e) {
                    this[et] = D(),
                        this._result = this._state = void 0,
                        this._subscribers = [],
                        c !== e && ("function" != typeof e && U(),
                            this instanceof N ? R(this, e) : j())
                }
                function F() {
                    var e = void 0;
                    if (void 0 !== s)
                        e = s;
                    else if ("undefined" != typeof self)
                        e = self;
                    else
                        try {
                            e = Function("return this")()
                        } catch (e) {
                            throw new Error("polyfill failed because global object is unavailable in this environment")
                        }
                    var t = e.Promise;
                    if (t) {
                        var i = null;
                        try {
                            i = Object.prototype.toString.call(t.resolve())
                        } catch (e) { }
                        if ("[object Promise]" === i && !t.cast)
                            return
                    }
                    e.Promise = N
                }
                var V = void 0;
                V = Array.isArray ? Array.isArray : function (e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                    ;
                var G = V
                    , z = 0
                    , H = void 0
                    , q = void 0
                    , K = function (e, t) {
                        Z[z] = e,
                            Z[z + 1] = t,
                            2 === (z += 2) && (q ? q(d) : $())
                    }
                    , W = "undefined" != typeof window ? window : void 0
                    , Y = W || {}
                    , X = Y.MutationObserver || Y.WebKitMutationObserver
                    , J = "undefined" == typeof self && void 0 !== r && "[object process]" === {}.toString.call(r)
                    , Q = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel
                    , Z = new Array(1e3)
                    , $ = void 0;
                $ = J ? function () {
                    return function () {
                        return r.nextTick(d)
                    }
                }() : X ? function () {
                    var e = 0
                        , t = new X(d)
                        , i = document.createTextNode("");
                    return t.observe(i, {
                        characterData: !0
                    }),
                        function () {
                            i.data = e = ++e % 2
                        }
                }() : Q ? function () {
                    var e = new MessageChannel;
                    return e.port1.onmessage = d,
                        function () {
                            return e.port2.postMessage(0)
                        }
                }() : void 0 === W && "function" == typeof t ? function () {
                    try {
                        var e = t
                            , i = e("vertx");
                        return H = i.runOnLoop || i.runOnContext,
                            a()
                    } catch (e) {
                        return u()
                    }
                }() : u();
                var et = Math.random().toString(36).substring(16)
                    , tt = void 0
                    , it = 1
                    , ne = 2
                    , re = new L
                    , nt = new L
                    , st = 0;
                return C.prototype._enumerate = function () {
                    for (var e = this.length, t = this._input, i = 0; this._state === tt && e > i; i++)
                        this._eachEntry(t[i], i)
                }
                    ,
                    C.prototype._eachEntry = function (e, t) {
                        var i = this._instanceConstructor
                            , n = i.resolve;
                        if (n === l) {
                            var r = m(e);
                            if (r === h && e._state !== tt)
                                this._settledAt(e._state, t, e._result);
                            else if ("function" != typeof r)
                                this._remaining-- ,
                                    this._result[t] = e;
                            else if (i === N) {
                                var s = new i(c);
                                g(s, e, r),
                                    this._willSettleAt(s, t)
                            } else
                                this._willSettleAt(new i(function (t) {
                                    return t(e)
                                }
                                ), t)
                        } else
                            this._willSettleAt(n(e), t)
                    }
                    ,
                    C.prototype._settledAt = function (e, t, i) {
                        var n = this.promise;
                        n._state === tt && (this._remaining-- ,
                            e === ne ? k(n, i) : this._result[t] = i),
                            0 === this._remaining && E(n, this._result)
                    }
                    ,
                    C.prototype._willSettleAt = function (e, t) {
                        var i = this;
                        O(e, void 0, function (e) {
                            return i._settledAt(it, t, e)
                        }, function (e) {
                            return i._settledAt(ne, t, e)
                        })
                    }
                    ,
                    N.all = M,
                    N.race = P,
                    N.resolve = l,
                    N.reject = B,
                    N._setScheduler = n,
                    N._setAsap = o,
                    N._asap = K,
                    N.prototype = {
                        constructor: N,
                        then: h,
                        "catch": function (e) {
                            return this.then(null, e)
                        }
                    },
                    N.polyfill = F,
                    N.Promise = N,
                    N
            })
        }
        ).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
        , {
        _process: 3
    }],
    2: [function (e, t) {
        function n() {
            this._events = this._events || {},
                this._maxListeners = this._maxListeners || void 0
        }
        function r(e) {
            return "function" == typeof e
        }
        function s(e) {
            return "number" == typeof e
        }
        function o(e) {
            return "object" == typeof e && null !== e
        }
        function a(e) {
            return void 0 === e
        }
        t.exports = n,
            n.EventEmitter = n,
            n.prototype._events = void 0,
            n.prototype._maxListeners = void 0,
            n.defaultMaxListeners = 10,
            n.prototype.setMaxListeners = function (e) {
                if (!s(e) || 0 > e || isNaN(e))
                    throw TypeError("n must be a positive number");
                return this._maxListeners = e,
                    this
            }
            ,
            n.prototype.emit = function (e) {
                var t, i, n, s, u, d;
                if (this._events || (this._events = {}),
                    "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length)) {
                    if ((t = arguments[1]) instanceof Error)
                        throw t;
                    var h = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                    throw h.context = t,
                    h
                }
                if (i = this._events[e],
                    a(i))
                    return !1;
                if (r(i))
                    switch (arguments.length) {
                        case 1:
                            i.call(this);
                            break;
                        case 2:
                            i.call(this, arguments[1]);
                            break;
                        case 3:
                            i.call(this, arguments[1], arguments[2]);
                            break;
                        default:
                            s = Array.prototype.slice.call(arguments, 1),
                                i.apply(this, s)
                    }
                else if (o(i))
                    for (s = Array.prototype.slice.call(arguments, 1),
                        d = i.slice(),
                        n = d.length,
                        u = 0; n > u; u++)
                        d[u].apply(this, s);
                return !0
            }
            ,
            n.prototype.addListener = function (e, t) {
                var i;
                if (!r(t))
                    throw TypeError("listener must be a function");
                return this._events || (this._events = {}),
                    this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t),
                    this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t,
                    o(this._events[e]) && !this._events[e].warned && (i = a(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners) && i > 0 && this._events[e].length > i && (this._events[e].warned = !0,
                        console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length),
                        "function" == typeof console.trace && console.trace()),
                    this
            }
            ,
            n.prototype.on = n.prototype.addListener,
            n.prototype.once = function (e, t) {
                function i() {
                    this.removeListener(e, i),
                        n || (n = !0,
                            t.apply(this, arguments))
                }
                if (!r(t))
                    throw TypeError("listener must be a function");
                var n = !1;
                return i.listener = t,
                    this.on(e, i),
                    this
            }
            ,
            n.prototype.removeListener = function (e, t) {
                var i, n, s, a;
                if (!r(t))
                    throw TypeError("listener must be a function");
                if (!this._events || !this._events[e])
                    return this;
                if (i = this._events[e],
                    s = i.length,
                    n = -1,
                    i === t || r(i.listener) && i.listener === t)
                    delete this._events[e],
                        this._events.removeListener && this.emit("removeListener", e, t);
                else if (o(i)) {
                    for (a = s; a-- > 0;)
                        if (i[a] === t || i[a].listener && i[a].listener === t) {
                            n = a;
                            break
                        }
                    if (0 > n)
                        return this;
                    1 === i.length ? (i.length = 0,
                        delete this._events[e]) : i.splice(n, 1),
                        this._events.removeListener && this.emit("removeListener", e, t)
                }
                return this
            }
            ,
            n.prototype.removeAllListeners = function (e) {
                var t, i;
                if (!this._events)
                    return this;
                if (!this._events.removeListener)
                    return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e],
                        this;
                if (0 === arguments.length) {
                    for (t in this._events)
                        "removeListener" !== t && this.removeAllListeners(t);
                    return this.removeAllListeners("removeListener"),
                        this._events = {},
                        this
                }
                if (i = this._events[e],
                    r(i))
                    this.removeListener(e, i);
                else if (i)
                    for (; i.length;)
                        this.removeListener(e, i[i.length - 1]);
                return delete this._events[e],
                    this
            }
            ,
            n.prototype.listeners = function (e) {
                return this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
            }
            ,
            n.prototype.listenerCount = function (e) {
                if (this._events) {
                    var t = this._events[e];
                    if (r(t))
                        return 1;
                    if (t)
                        return t.length
                }
                return 0
            }
            ,
            n.listenerCount = function (e, t) {
                return e.listenerCount(t)
            }
    }
        , {}],
    3: [function (e, t) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }
        function r() {
            throw new Error("clearTimeout has not been defined")
        }
        function s(e) {
            if (l === setTimeout)
                return setTimeout(e, 0);
            if ((l === n || !l) && setTimeout)
                return l = setTimeout,
                    setTimeout(e, 0);
            try {
                return l(e, 0)
            } catch (t) {
                try {
                    return l.call(null, e, 0)
                } catch (t) {
                    return l.call(this, e, 0)
                }
            }
        }
        function o(e) {
            if (c === clearTimeout)
                return clearTimeout(e);
            if ((c === r || !c) && clearTimeout)
                return c = clearTimeout,
                    clearTimeout(e);
            try {
                return c(e)
            } catch (t) {
                try {
                    return c.call(null, e)
                } catch (t) {
                    return c.call(this, e)
                }
            }
        }
        function a() {
            p && _ && (p = !1,
                _.length ? m = _.concat(m) : v = -1,
                m.length && u())
        }
        function u() {
            if (!p) {
                var e = s(a);
                p = !0;
                for (var t = m.length; t;) {
                    for (_ = m,
                        m = []; ++v < t;)
                        _ && _[v].run();
                    v = -1,
                        t = m.length
                }
                _ = null,
                    p = !1,
                    o(e)
            }
        }
        function d(e, t) {
            this.fun = e,
                this.array = t
        }
        function h() { }
        var l, c, f = t.exports = {};
        !function () {
            try {
                l = "function" == typeof setTimeout ? setTimeout : n
            } catch (e) {
                l = n
            }
            try {
                c = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (e) {
                c = r
            }
        }();
        var _, m = [], p = !1, v = -1;
        f.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var i = 1; i < arguments.length; i++)
                    t[i - 1] = arguments[i];
            m.push(new d(e, t)),
                1 !== m.length || p || s(u)
        }
            ,
            d.prototype.run = function () {
                this.fun.apply(null, this.array)
            }
            ,
            f.title = "browser",
            f.browser = !0,
            f.env = {},
            f.argv = [],
            f.version = "",
            f.versions = {},
            f.on = h,
            f.addListener = h,
            f.once = h,
            f.off = h,
            f.removeListener = h,
            f.removeAllListeners = h,
            f.emit = h,
            f.binding = function () {
                throw new Error("process.binding is not supported")
            }
            ,
            f.cwd = function () {
                return "/"
            }
            ,
            f.chdir = function () {
                throw new Error("process.chdir is not supported")
            }
            ,
            f.umask = function () {
                return 0
            }
    }
        , {}],
    4: [function (e, t) {
        var n = arguments[3]
            , r = arguments[4]
            , s = arguments[5]
            , o = JSON.stringify;
        t.exports = function (e, t) {
            function i(e) {
                p[e] = !0;
                for (var t in r[e][1]) {
                    var n = r[e][1][t];
                    p[n] || i(n)
                }
            }
            for (var a, u = Object.keys(s), d = 0, h = u.length; h > d; d++) {
                var l = u[d]
                    , c = s[l].exports;
                if (c === e || c && c.default === e) {
                    a = l;
                    break
                }
            }
            if (!a) {
                a = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
                for (var f = {}, d = 0, h = u.length; h > d; d++) {
                    var l = u[d];
                    f[l] = l
                }
                r[a] = [Function(["require", "module", "exports"], "(" + e + ")(self)"), f]
            }
            var _ = Math.floor(Math.pow(16, 8) * Math.random()).toString(16)
                , m = {};
            m[a] = a,
                r[_] = [Function(["require"], "var f = require(" + o(a) + ");(f.default ? f.default : f)(self);"), m];
            var p = {};
            i(_);
            var v = "(" + n + ")({" + Object.keys(p).map(function (e) {
                return o(e) + ":[" + r[e][0] + "," + o(r[e][1]) + "]"
            }).join(",") + "},{},[" + o(_) + "])"
                , y = window.URL || window.webkitURL || window.mozURL || window.msURL
                , g = new Blob([v], {
                    type: "text/javascript"
                });
            if (t && t.bare)
                return g;
            var b = y.createObjectURL(g)
                , S = new Worker(b);
            return S.objectURL = b,
                S
        }
    }
        , {}],
    5: [function (e, t, i) {
        "use strict";
        function n() {
            return Object.assign({}, r)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.createDefaultConfig = n;
        var r = i.defaultConfig = {
            enableStallDetect: !1,
            enableWorker: !1,
            enableStashBuffer: !0,
            stashInitialSize: void 0,
            isLive: !1,
            lazyLoad: !0,
            lazyLoadMaxDuration: 180,
            lazyLoadRecoverDuration: 30,
            deferLoadAfterSourceOpen: !0,
            statisticsInfoReportInterval: 600,
            accurateSeek: !1,
            seekType: "range",
            seekParamStart: "bstart",
            seekParamEnd: "bend",
            rangeLoadZeroStart: !1,
            customSeekHandler: void 0,
            reuseRedirectedURL: !1,
            resolutionPolicy: 3,
            playType: "all",
            autoplay: !0
        }
    }
        , {}],
    6: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = e("../io/io-controller.js")
            , o = function (e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }(s)
            , a = e("../config.js")
            , u = function () {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "supportMSEH264Playback",
                    value: function (e) {
                        return void 0 === e ? void 0 !== window.MediaSource : window.MediaSource && window.MediaSource.isTypeSupported(e)
                    }
                }, {
                    key: "supportNetworkStreamIO",
                    value: function () {
                        var e = new o.default({}, a.createDefaultConfig())
                            , t = e.loaderType;
                        return e.destroy(),
                            "fetch-stream-loader" == t || "xhr-moz-chunked-loader" == t
                    }
                }, {
                    key: "getNetworkLoaderTypeName",
                    value: function () {
                        var e = new o.default({}, a.createDefaultConfig())
                            , t = e.loaderType;
                        return e.destroy(),
                            t
                    }
                }, {
                    key: "supportNativeMediaPlayback",
                    value: function (t) {
                        void 0 == e.videoElement && (e.videoElement = window.document.createElement("video"));
                        var i = e.videoElement.canPlayType(t);
                        return "probably" === i || "maybe" == i
                    }
                }, {
                    key: "getFeatureList",
                    value: function () {
                        var t = {
                            mseFlvPlayback: !1,
                            mseLiveFlvPlayback: !1,
                            networkStreamIO: !1,
                            networkLoaderName: "",
                            nativeMP4H264Playback: !1,
                            nativeWebmVP8Playback: !1,
                            nativeWebmVP9Playback: !1
                        };
                        return t.mseFlvPlayback = e.supportMSEH264Playback(),
                            t.networkStreamIO = e.supportNetworkStreamIO(),
                            t.networkLoaderName = e.getNetworkLoaderTypeName(),
                            t.mseLiveFlvPlayback = t.mseFlvPlayback && t.networkStreamIO,
                            t.nativeMP4H264Playback = e.supportNativeMediaPlayback('video/mp4; codecs="avc1.42001E, mp4a.40.2"'),
                            t.nativeWebmVP8Playback = e.supportNativeMediaPlayback('video/webm; codecs="vp8.0, vorbis"'),
                            t.nativeWebmVP9Playback = e.supportNativeMediaPlayback('video/webm; codecs="vp9"'),
                            t
                    }
                }, {
                    key: "getVersion",
                    value: function () {
                        return "Kugou H5 player 2019/01/04"
                    }
                }]),
                    e
            }();
        u.mediaElement = null,
            i.default = u
    }
        , {
        "../config.js": 5,
        "../io/io-controller.js": 25
    }],
    7: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = function () {
                function e() {
                    n(this, e),
                        this.mimeType = null,
                        this.duration = null,
                        this.hasAudio = null,
                        this.hasVideo = null,
                        this.audioCodec = null,
                        this.videoCodec = null,
                        this.audioDataRate = null,
                        this.videoDataRate = null,
                        this.audioSampleRate = null,
                        this.audioChannelCount = null,
                        this.width = null,
                        this.height = null,
                        this.fps = null,
                        this.profile = null,
                        this.level = null,
                        this.chromaFormat = null,
                        this.sarNum = null,
                        this.sarDen = null,
                        this.metadata = null,
                        this.segments = null,
                        this.segmentCount = null,
                        this.hasKeyframesIndex = null,
                        this.keyframesIndex = null
                }
                return r(e, [{
                    key: "isComplete",
                    value: function () {
                        var e = !1 === this.hasAudio || !0 === this.hasAudio && null != this.audioCodec && null != this.audioSampleRate && null != this.audioChannelCount
                            , t = !1 === this.hasVideo || !0 === this.hasVideo && null != this.videoCodec && null != this.width && null != this.height && null != this.fps && null != this.profile && null != this.level && null != this.chromaFormat && null != this.sarNum && null != this.sarDen;
                        return null != this.mimeType && null != this.duration && null != this.metadata && null != this.hasKeyframesIndex && e && t
                    }
                }, {
                    key: "isSeekable",
                    value: function () {
                        return !0 === this.hasKeyframesIndex
                    }
                }, {
                    key: "getNearestKeyframe",
                    value: function (e) {
                        if (null == this.keyframesIndex)
                            return null;
                        var t = this.keyframesIndex
                            , i = this._search(t.times, e);
                        return {
                            index: i,
                            milliseconds: t.times[i],
                            fileposition: t.filepositions[i]
                        }
                    }
                }, {
                    key: "_search",
                    value: function (e, t) {
                        var i = 0
                            , n = e.length - 1
                            , r = 0
                            , s = 0
                            , o = n;
                        for (t < e[0] && (i = 0,
                            s = o + 1); o >= s;) {
                            if ((r = s + Math.floor((o - s) / 2)) === n || t >= e[r] && t < e[r + 1]) {
                                i = r;
                                break
                            }
                            e[r] < t ? s = r + 1 : o = r - 1
                        }
                        return i
                    }
                }]),
                    e
            }();
        i.default = s
    }
        , {}],
    8: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }();
        i.SampleInfo = function e(t, i, r, s, o) {
            n(this, e),
                this.dts = t,
                this.pts = i,
                this.duration = r,
                this.originalDts = s,
                this.isSyncPoint = o,
                this.fileposition = null
        }
            ,
            i.MediaSegmentInfo = function () {
                function e(t) {
                    n(this, e),
                        this.beginDts = 0,
                        this.endDts = 0,
                        this.beginPts = 0,
                        this.endPts = 0,
                        this.originalBeginDts = 0,
                        this.originalEndDts = 0,
                        this.syncPoints = [],
                        this.firstSample = null,
                        this.lastSample = null,
                        this.type = t
                }
                return r(e, [{
                    key: "appendSyncPoint",
                    value: function (e) {
                        e.isSyncPoint = !0,
                            this.syncPoints.push(e)
                    }
                }]),
                    e
            }(),
            i.IDRSampleList = function () {
                function e() {
                    n(this, e),
                        this._list = []
                }
                return r(e, [{
                    key: "clear",
                    value: function () {
                        this._list = []
                    }
                }, {
                    key: "appendArray",
                    value: function (e) {
                        var t = this._list;
                        0 !== e.length && (t.length > 0 && e[0].originalDts < t[t.length - 1].originalDts && this.clear(),
                            Array.prototype.push.apply(t, e))
                    }
                }, {
                    key: "getLastSyncPointBeforeDts",
                    value: function (e) {
                        if (0 == this._list.length)
                            return null;
                        var t = this._list
                            , i = 0
                            , n = t.length - 1
                            , r = 0
                            , s = 0
                            , o = n;
                        for (e < t[0].dts && (i = 0,
                            s = o + 1); o >= s;) {
                            if ((r = s + Math.floor((o - s) / 2)) === n || e >= t[r].dts && e < t[r + 1].dts) {
                                i = r;
                                break
                            }
                            t[r].dts < e ? s = r + 1 : o = r - 1
                        }
                        return this._list[i]
                    }
                }]),
                    e
            }(),
            i.MediaSegmentInfoList = function () {
                function e(t) {
                    n(this, e),
                        this._type = t,
                        this._list = [],
                        this._lastAppendLocation = -1
                }
                return r(e, [{
                    key: "isEmpty",
                    value: function () {
                        return 0 === this._list.length
                    }
                }, {
                    key: "clear",
                    value: function () {
                        this._list = [],
                            this._lastAppendLocation = -1
                    }
                }, {
                    key: "_searchNearestSegmentBefore",
                    value: function (e) {
                        var t = this._list;
                        if (0 === t.length)
                            return -2;
                        var i = t.length - 1
                            , n = 0
                            , r = 0
                            , s = i
                            , o = 0;
                        if (e < t[0].originalBeginDts)
                            return o = -1;
                        for (; s >= r;) {
                            if ((n = r + Math.floor((s - r) / 2)) === i || e > t[n].lastSample.originalDts && e < t[n + 1].originalBeginDts) {
                                o = n;
                                break
                            }
                            t[n].originalBeginDts < e ? r = n + 1 : s = n - 1
                        }
                        return o
                    }
                }, {
                    key: "_searchNearestSegmentAfter",
                    value: function (e) {
                        return this._searchNearestSegmentBefore(e) + 1
                    }
                }, {
                    key: "append",
                    value: function (e) {
                        var t = this._list
                            , i = e
                            , n = this._lastAppendLocation
                            , r = 0;
                        -1 !== n && n < t.length && i.originalBeginDts >= t[n].lastSample.originalDts && (n === t.length - 1 || n < t.length - 1 && i.originalBeginDts < t[n + 1].originalBeginDts) ? r = n + 1 : t.length > 0 && (r = this._searchNearestSegmentBefore(i.originalBeginDts) + 1),
                            this._lastAppendLocation = r,
                            this._list.splice(r, 0, i)
                    }
                }, {
                    key: "getLastSegmentBefore",
                    value: function (e) {
                        var t = this._searchNearestSegmentBefore(e);
                        return t >= 0 ? this._list[t] : null
                    }
                }, {
                    key: "getLastSampleBefore",
                    value: function (e) {
                        var t = this.getLastSegmentBefore(e);
                        return null != t ? t.lastSample : null
                    }
                }, {
                    key: "getLastSyncPointBefore",
                    value: function (e) {
                        for (var t = this._searchNearestSegmentBefore(e), i = this._list[t].syncPoints; 0 === i.length && t > 0;)
                            t-- ,
                                i = this._list[t].syncPoints;
                        return i.length > 0 ? i[i.length - 1] : null
                    }
                }, {
                    key: "type",
                    get: function () {
                        return this._type
                    }
                }, {
                    key: "length",
                    get: function () {
                        return this._list.length
                    }
                }]),
                    e
            }()
    }
        , {}],
    9: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , o = e("events")
            , a = n(o)
            , u = e("../utils/logger.js")
            , d = n(u)
            , h = e("./mse-events.js")
            , l = n(h)
            , c = e("./media-segment-info.js")
            , f = e("../utils/exception.js")
            , _ = e("../utils/utf8-conv.js")
            , m = n(_)
            , p = e("./features")
            , v = n(p)
            , y = function () {
                function e(t) {
                    r(this, e),
                        this.TAG = "MSEController",
                        this._config = t,
                        this._emitter = new a.default,
                        this.e = {
                            onSourceOpen: this._onSourceOpen.bind(this),
                            onSourceEnded: this._onSourceEnded.bind(this),
                            onSourceClose: this._onSourceClose.bind(this),
                            onSourceBufferError: this._onSourceBufferError.bind(this),
                            onSourceBufferUpdateEnd: this._onSourceBufferUpdateEnd.bind(this)
                        },
                        this._mediaSource = null,
                        this._mediaSourceObjectURL = null,
                        this._mediaElement = null,
                        this._pendingInitDic = {
                            single: null,
                            video: null,
                            audio: null
                        },
                        this._pendingSegmentDic = {
                            single: null,
                            video: null,
                            audio: null
                        },
                        this._sourceBufferDic = {
                            single: null,
                            video: null,
                            audio: null
                        },
                        this._renderElement = null,
                        this._renderMediaSource = null,
                        this._renderMediaSourceObjectURL = null,
                        this._renderSourceBufferDic = {
                            single: null,
                            video: null,
                            audio: null
                        },
                        this._isBufferFull = !1,
                        this._hasPendingEos = !1,
                        this._pendingSourceBufferInit = [],
                        this._mimeTypes = null,
                        this._lastInitSegments = null,
                        this._extendSegments = [],
                        this._pendingRemoveDic = {
                            single: null,
                            video: null,
                            audio: null
                        },
                        this._idrList = new c.IDRSampleList,
                        this._lastCurrentTime = 0,
                        this._lastRemoveTime = 0,
                        this._readyState = -1,
                        this._lastRemoveStart = -1,
                        this._lastRemoveEnd = -1,
                        this._lastCheckStallTime = -1,
                        this._isEndOfStream = !0,
                        this._streamRunning = !1,
                        this._attachSuccess = !1,
                        this._statistics = {
                            revInit: !1,
                            revCount: 0,
                            doneCount: 0
                        }
                }
                return s(e, [{
                    key: "destroy",
                    value: function () {
                        (this._mediaElement || this._mediaSource) && this.detachMediaElement(),
                            this.e = null,
                            this._emitter.removeAllListeners(),
                            this._emitter = null,
                            this._lastCurrentTime = 0,
                            this._lastRemoveTime = 0,
                            this._readyState = -1,
                            this._lastRemoveStart = -1,
                            this._lastRemoveEnd = -1,
                            this._lastCheckStallTime = -1,
                            this._isEndOfStream = !0,
                            this._streamRunning = !1,
                            this._attachSuccess = !1,
                            this._statistics.revInit = !1,
                            this._statistics.revCount = 0,
                            this._statistics.doneCount = 0,
                            this._pendingInitDic.single = null,
                            this._pendingInitDic.video = null,
                            this._pendingInitDic.audio = null,
                            this._pendingSegmentDic.single = null,
                            this._pendingSegmentDic.video = null,
                            this._pendingSegmentDic.audio = null,
                            this._pendingRemoveDic.single = null,
                            this._pendingRemoveDic.video = null,
                            this._pendingRemoveDic.audio = null
                    }
                }, {
                    key: "on",
                    value: function (e, t) {
                        this._emitter.addListener(e, t)
                    }
                }, {
                    key: "off",
                    value: function (e, t) {
                        this._emitter.removeListener(e, t)
                    }
                }, {
                    key: "attachMediaElement",
                    value: function (e, t) {
                        if (v.default.supportMSEH264Playback()) {
                            if (d.default.elk(this.TAG, "mse support"),
                                this._mediaSource)
                                throw new f.IllegalStateException("MediaSource has been attached to an HTMLMediaElement!");
                            this._mediaElement = e,
                                this._renderElement = t,
                                this._mediaSource = new MediaSource,
                                this._mediaSourceObjectURL = URL.createObjectURL(this._mediaSource),
                                this._mediaElement.src = this._mediaSourceObjectURL,
                                this._mediaSource.addEventListener("sourceopen", this.e.onSourceOpen),
                                this._mediaSource.addEventListener("sourceended", this.e.onSourceEnded),
                                this._mediaSource.addEventListener("sourceclose", this.e.onSourceClose),
                                this._renderElement && (this._renderMediaSource = new MediaSource,
                                    this._renderMediaSourceObjectURL = URL.createObjectURL(this._renderMediaSource),
                                    this._renderElement.src = this._renderMediaSourceObjectURL,
                                    this._renderMediaSource.addEventListener("sourceopen", this.e.onSourceOpen),
                                    this._renderMediaSource.addEventListener("sourceended", this.e.onSourceEnded),
                                    this._renderMediaSource.addEventListener("sourceclose", this.e.onSourceClose)),
                                this._attachSuccess = !0
                        } else
                            d.default.elk(this.TAG, "mse not support"),
                                this._emitter.emit(l.default.NOT_SUPPORT_MSE, {
                                    msg: "MediaSourceExtendtion not support"
                                })
                    }
                }, {
                    key: "detachMediaElement",
                    value: function () {
                        if (this._mediaSource) {
                            var e = this._mediaSource;
                            if (this._extendSegments = null,
                                this._lastInitSegments = null,
                                this._attachSuccess = !1,
                                this._destroySourceBuffer(this._sourceBufferDic.single, this._mediaSource),
                                this._sourceBufferDic.single = null,
                                this._destroySourceBuffer(this._sourceBufferDic.video, this._mediaSource),
                                this._sourceBufferDic.video = null,
                                this._destroySourceBuffer(this._sourceBufferDic.audio, this._mediaSource),
                                this._sourceBufferDic.audio = null,
                                "open" === e.readyState)
                                try {
                                    e.endOfStream()
                                } catch (e) {
                                    d.default.e(this.TAG, e.message)
                                }
                            e.removeEventListener("sourceopen", this.e.onSourceOpen),
                                e.removeEventListener("sourceended", this.e.onSourceEnded),
                                e.removeEventListener("sourceclose", this.e.onSourceClose),
                                this._pendingSourceBufferInit = [],
                                this._isBufferFull = !1,
                                this._idrList.clear(),
                                this._mediaSource = null
                        }
                        if (this._mediaElement && (this._mediaElement.src = "",
                            this._mediaElement.removeAttribute("src"),
                            this._mediaElement = null),
                            this._mediaSourceObjectURL && (window.URL.revokeObjectURL(this._mediaSourceObjectURL),
                                this._mediaSourceObjectURL = null),
                            this._renderElement) {
                            if (this._destroySourceBuffer(this._renderSourceBufferDic.single, this._renderMediaSource),
                                this._renderSourceBufferDic.single = null,
                                this._destroySourceBuffer(this._renderSourceBufferDic.video, this._renderMediaSource),
                                this._renderSourceBufferDic.video = null,
                                this._destroySourceBuffer(this._renderSourceBufferDic.audio, this._renderMediaSource),
                                this._renderSourceBufferDic.audio = null,
                                "open" === this._renderMediaSource.readyState)
                                try {
                                    this._renderMediaSource.endOfStream()
                                } catch (e) {
                                    d.default.d(this.TAG, "renderMediaSource.endOfStream() error,just ignore it")
                                }
                            this._renderMediaSource.removeEventListener("sourceopen", this.e.onSourceOpen),
                                this._renderMediaSource.removeEventListener("sourceended", this.e.onSourceEnded),
                                this._renderMediaSource.removeEventListener("sourceclose", this.e.onSourceClose),
                                this._renderElement.src = "",
                                this._renderElement.removeAttribute("src"),
                                this._renderElement = null,
                                window.URL.revokeObjectURL(this._renderMediaSourceObjectURL),
                                this._renderMediaSourceObjectURL = null
                        }
                    }
                }, {
                    key: "appendSingleInitSegment",
                    value: function (e, t) {
                        var i = e.mimeType
                            , n = v.default.supportMSEH264Playback(i);
                        if (this._statistics.revInit = !0,
                            d.default.i(this.TAG, "appendSingleInitSegment ms state:" + (this._mediaSource ? this._mediaSource.readyState : -1) + ", mimeType:" + i + ", isSupport:" + n, !0),
                            !this._mediaSource || "open" !== this._mediaSource.readyState || this._renderMediaSource && "open" !== this._renderMediaSource.readyState)
                            return this._pushSegment("single", e, this._pendingInitDic),
                                void this._pushSegment("single", e, this._pendingSegmentDic);
                        if (!n)
                            return void this._emitter.emit(l.default.NOT_SUPPORT_CODEC, {
                                msg: i + " not support"
                            });
                        try {
                            var r = this._createSourceBuffer(i, this._mediaSource, this.e.onSourceBufferError, this.e.onSourceBufferUpdateEnd);
                            this._sourceBufferDic.single = r;
                            try {
                                if (this._renderMediaSource) {
                                    var s = this._createSourceBuffer(i, this._renderMediaSource, this.e.onSourceBufferError, this.e.onSourceBufferUpdateEnd);
                                    this._renderSourceBufferDic.single = s
                                }
                            } catch (e) {
                                d.default.d(this.TAG, "renderSourceBufferError " + e.message + ", just ignore")
                            }
                        } catch (e) {
                            return d.default.e(this.TAG, e.message),
                                void this._emitter.emit(l.default.ERROR, {
                                    code: e.code,
                                    msg: e.message
                                })
                        }
                        t || this._pushSegment("single", e, this._pendingSegmentDic),
                            this._doAppendSegment("single")
                    }
                }, {
                    key: "appendSeperateInitSegment",
                    value: function (e, t, i) {
                        var n = e.mimeType
                            , r = v.default.supportMSEH264Playback(n)
                            , s = t.mimeType
                            , o = v.default.supportMSEH264Playback(s);
                        if (this._statistics.revInit = !0,
                            d.default.i(this.TAG, "appendSeperateInitSegment ms state:" + (this._mediaSource ? this._mediaSource.readyState : -1) + ", videoMimeType:" + n + ", isVideoSupport:" + r + ", audioMimeType:" + s + ", isAudioSupport:" + o, !0),
                            !this._mediaSource || "open" !== this._mediaSource.readyState || this._renderMediaSource && "open" !== this._renderMediaSource.readyState)
                            return this._pushSegment("video", e, this._pendingInitDic),
                                this._pushSegment("audio", t, this._pendingInitDic),
                                this._pushSegment("video", e, this._pendingSegmentDic),
                                void this._pushSegment("audio", t, this._pendingSegmentDic);
                        if (!r)
                            return void this._emitter.emit(l.default.NOT_SUPPORT_CODEC, {
                                msg: n + " not support"
                            });
                        if (!o)
                            return void this._emitter.emit(l.default.NOT_SUPPORT_CODEC, {
                                msg: s + " not support"
                            });
                        try {
                            var a = this._createSourceBuffer(n, this._mediaSource, this.e.onSourceBufferError, this.e.onSourceBufferUpdateEnd)
                                , u = this._createSourceBuffer(s, this._mediaSource, this.e.onSourceBufferError, this.e.onSourceBufferUpdateEnd);
                            this._sourceBufferDic.video = a,
                                this._sourceBufferDic.audio = u;
                            try {
                                if (this._renderMediaSource) {
                                    var h = this._createSourceBuffer(n, this._renderMediaSource, this.e.onSourceBufferError, this.e.onSourceBufferUpdateEnd)
                                        , c = this._createSourceBuffer(s, this._renderMediaSource, this.e.onSourceBufferError, this.e.onSourceBufferUpdateEnd);
                                    this._renderSourceBufferDic.video = h,
                                        this._renderSourceBufferDic.audio = c
                                }
                            } catch (e) {
                                d.default.d(this.TAG, "renderSourceBufferError " + e.message + ", just ignore")
                            }
                        } catch (e) {
                            return d.default.e(this.TAG, e.message),
                                void this._emitter.emit(l.default.ERROR, {
                                    code: e.code,
                                    msg: e.message
                                })
                        }
                        i || (this._pushSegment("video", e, this._pendingSegmentDic),
                            this._pushSegment("audio", t, this._pendingSegmentDic)),
                            this._doAppendSegment("video"),
                            this._doAppendSegment("audio")
                    }
                }, {
                    key: "appendMediaSegment",
                    value: function (e) {
                        "extend" === e.type ? this._extendSegments.push(e) : (this._statistics.revCount++ ,
                            this._pendingSegmentDic.single ? (this._pushSegment("single", e, this._pendingSegmentDic),
                                this._hasPendingRemoveRanges() || this._doAppendSegment("single")) : (this._pushSegment(e.type, e, this._pendingSegmentDic),
                                    this._hasPendingRemoveRanges() || this._doAppendSegment(e.type)))
                    }
                }, {
                    key: "endOfStream",
                    value: function () {
                        var e = this._mediaSource;
                        return e && "open" === e.readyState ? void (this._sourceBufferDic.single && this._sourceBufferDic.single.updating || this._sourceBufferDic.video && this._sourceBufferDic.video.updating || this._sourceBufferDic.audio && this._sourceBufferDic.audio.updating || this._renderSourceBufferDic.single && this._renderSourceBufferDic.single.updating || this._renderSourceBufferDic.video && this._renderSourceBufferDic.video.updating || this._renderSourceBufferDic.audio && this._renderSourceBufferDic.audio.updating ? this._hasPendingEos = !0 : (this._hasPendingEos = !1,
                            e.endOfStream(),
                            this._renderMediaSource && this._renderMediaSource.endOfStream())) : void (e && "closed" === e.readyState && this._hasPendingSegments() && (this._hasPendingEos = !0))
                    }
                }, {
                    key: "getNearestKeyframe",
                    value: function (e) {
                        return this._idrList.getLastSyncPointBeforeDts(e)
                    }
                }, {
                    key: "_onEnterFrame",
                    value: function () {
                        if (this._mediaElement) {
                            var t = this._mediaElement.readyState;
                            if (this._readyState !== t) {
                                this._readyState = t;
                                var i = "media element readyState change: " + this._getReadyStateDesc(this._readyState);
                                i += ", currentTime: " + this._mediaElement.currentTime,
                                    d.default.w(this.TAG, i)
                            }
                            for (var n = this._extendSegments && this._extendSegments.length > 0, r = 1e3 * this._mediaElement.currentTime; n;) {
                                var s = this._extendSegments[0].data
                                    , o = this._extendSegments[0].dts;
                                if (r >= o || Math.abs(r - o) < 30) {
                                    this._extendSegments.shift();
                                    var a = m.default(new Uint8Array(s));
                                    n = this._extendSegments.length > 0,
                                        this._emitter.emit(l.default.EXTEND_VIDEO_DATA, a, 0)
                                } else
                                    n = !1
                            }
                            this._detectStall(),
                                this._checkExpireBuffer(),
                                window.requestAnimationFrame(this._onEnterFrame.bind(this))
                        }
                    }
                }, {
                    key: "_detectStall",
                    value: function () {
                        var e = (new Date).valueOf();
                        if (!this._isEndOfStream && this._mediaElement && !this._mediaElement.paused && e - this._lastCheckStallTime > 1e3) {
                            this._lastCheckStallTime = e;
                            var t = this._mediaElement.currentTime - this._lastCurrentTime;
                            this._lastCurrentTime = this._mediaElement.currentTime,
                                this._setStreamRunningStatus(1e-7 >= t ? !1 : !0);
                            var i = this._sourceBufferDic.single ? this._sourceBufferDic.single : this._sourceBufferDic.video;
                            if (1e-7 >= t && i && i.buffered && i.buffered.length > 0) {
                                var n = void 0
                                    , r = i.buffered.start(i.buffered.length - 1)
                                    , s = i.buffered.end(i.buffered.length - 1);
                                if (this._mediaElement.currentTime < r ? n = r : this._mediaElement.currentTime < s && (n = this._mediaElement.currentTime + .5 > s ? (s - this._mediaElement.currentTime) / 2 : this._mediaElement.currentTime + .5),
                                    n > this._mediaElement.currentTime) {
                                    this._mediaElement.currentTime = n,
                                        this._renderElement && (this._renderElement.currentTime = this._mediaElement.currentTime);
                                    var o = "";
                                    this._sourceBufferDic.single ? o = "video buffer:" + this._printTimeRanges(i.buffered) : (this._sourceBufferDic.video && this._sourceBufferDic.video.buffered && (o = "video buffer:" + this._printTimeRanges(this._sourceBufferDic.video.buffered)),
                                        this._sourceBufferDic.audio && this._sourceBufferDic.audio.buffered && (o += "audio buffer:" + this._printTimeRanges(this._sourceBufferDic.audio.buffered))),
                                        d.default.w(this.TAG, "timeStep: " + t + ", detect stall,reset currentTime from " + this._lastCurrentTime + " to " + n + ", " + o)
                                }
                            }
                        }
                    }
                }, {
                    key: "_checkExpireBuffer",
                    value: function (e) {
                        var t = (new Date).valueOf()
                            , i = this._hasPendingRemoveRanges();
                        if (this._mediaSource && "open" === this._mediaSource.readyState && !i && (e || t - this._lastRemoveTime > 3e3)) {
                            var n = this._sourceBufferDic.single
                                , r = this._sourceBufferDic.video
                                , s = this._sourceBufferDic.audio
                                , o = !1;
                            if (n) {
                                var a = this._findRemoveRange(n, this._mediaElement.currentTime);
                                a[0] > -1 && a[1] > -1 && (o = !0,
                                    this._pendingRemoveDic.single = this._pendingRemoveDic.single || [],
                                    this._pendingRemoveDic.single.push({
                                        start: a[0],
                                        end: a[1]
                                    }))
                            } else if (r || s) {
                                if (r) {
                                    var u = this._findRemoveRange(r, this._mediaElement.currentTime);
                                    u[0] > -1 && u[1] > -1 && (o = !0,
                                        this._pendingRemoveDic.video = this._pendingRemoveDic.video || [],
                                        this._pendingRemoveDic.video.push({
                                            start: u[0],
                                            end: u[1]
                                        }))
                                }
                                if (s) {
                                    var d = this._findRemoveRange(s, this._mediaElement.currentTime);
                                    d[0] > -1 && d[1] > -1 && (o = !0,
                                        this._pendingRemoveDic.audio = this._pendingRemoveDic.audio || [],
                                        this._pendingRemoveDic.audio.push({
                                            start: d[0],
                                            end: d[1]
                                        }))
                                }
                            }
                            o && (this._lastRemoveTime = (new Date).valueOf(),
                                this._doRemoveRanges())
                        }
                    }
                }, {
                    key: "_findRemoveRange",
                    value: function (e, t) {
                        for (var i = -1, n = -1, r = e.buffered.length - 1; r > -1; r--) {
                            var s = e.buffered.start(r)
                                , o = e.buffered.end(r);
                            if (!(s > t) && t > s && o > t) {
                                i = e.buffered.start(0),
                                    n = Math.floor(t) - 10;
                                break
                            }
                        }
                        return 3 > n - i && (i = -1,
                            n = -1),
                            [i, n]
                    }
                }, {
                    key: "_doRemoveRanges",
                    value: function () {
                        if (this._pendingRemoveDic.single) {
                            if (this._renderSourceBufferDic.single && this._renderSourceBufferDic.single.updating)
                                return;
                            if (!this._sourceBufferDic.single || this._sourceBufferDic.single.updating)
                                return;
                            var e = this._pendingRemoveDic.single;
                            if (e.length > 0) {
                                var t = e.shift();
                                this._sourceBufferDic.single.remove(t.start, t.end),
                                    this._renderSourceBufferDic.single && this._renderSourceBufferDic.single.remove(t.start, t.end)
                            }
                        } else {
                            if (this._renderSourceBufferDic.video && this._renderSourceBufferDic.video.updating)
                                return;
                            if (this._renderSourceBufferDic.audio && this._renderSourceBufferDic.audio.updating)
                                return;
                            if (this._sourceBufferDic.video.updating || this._sourceBufferDic.audio.updating)
                                return;
                            var i = this._pendingRemoveDic.video;
                            if (i && i.length > 0) {
                                var n = i.shift();
                                this._sourceBufferDic.video.remove(n.start, n.end),
                                    this._renderSourceBufferDic.video && this._renderSourceBufferDic.video.remove(n.start, n.end)
                            }
                            if ((i = this._pendingRemoveDic.audio) && i.length > 0) {
                                var r = i.shift();
                                this._sourceBufferDic.audio.remove(r.start, r.end),
                                    this._renderSourceBufferDic.audio && this._renderSourceBufferDic.audio.remove(r.start, r.end)
                            }
                        }
                    }
                }, {
                    key: "_getNetworkStateDesc",
                    value: function (e) {
                        var t = "NETWORK_EMPTY";
                        switch (e) {
                            case 0:
                                t = "NETWORK_EMPTY";
                                break;
                            case 1:
                                t = "NETWORK_IDLE";
                                break;
                            case 2:
                                t = "NETWORK_LOADING";
                                break;
                            case 3:
                                t = "NETWORK_NO_SOURCE"
                        }
                        return t
                    }
                }, {
                    key: "_getReadyStateDesc",
                    value: function (e) {
                        var t = "NOT_INIT";
                        switch (e) {
                            case 0:
                                t = "HAVE_NOTHING";
                                break;
                            case 1:
                                t = "HAVE_METADATA";
                                break;
                            case 2:
                                t = "HAVE_CURRENT_DATA";
                                break;
                            case 3:
                                t = "HAVE_FUTURE_DATA";
                                break;
                            case 4:
                                t = "HAVE_ENOUGH_DATA"
                        }
                        return t
                    }
                }, {
                    key: "_printTimeRanges",
                    value: function (e) {
                        if (0 == e.length)
                            return "none";
                        for (var t = e.length + ": ", i = 0; i < e.length; i++)
                            t += e.start(i) + " - " + e.end(i) + "; ";
                        return t
                    }
                }, {
                    key: "_onSourceOpen",
                    value: function (e) {
                        e.target.removeEventListener("sourceopen", this.e.onSourceOpen),
                            e.target === this._mediaSource ? (d.default.v(this.TAG, "mediaSourceOpen", !0),
                                this._isEndOfStream = !1) : d.default.d(this.TAG, "renderMediaSourceOpen"),
                            "open" === this._mediaSource.readyState && (!this._renderMediaSource || this._renderMediaSource && "open" === this._renderMediaSource.readyState) && this._emitter.emit(l.default.SOURCE_OPEN),
                            this._pendingInitDic.single && this._pendingInitDic.single.length > 0 ? this.appendSingleInitSegment(this._pendingInitDic.single.shift(), !0) : this._pendingInitDic.video && this._pendingInitDic.video.length > 0 && this._pendingInitDic.audio && this._pendingInitDic.audio.length > 0 && this.appendSeperateInitSegment(this._pendingInitDic.video.shift(), this._pendingInitDic.audio.shift(), !0),
                            this._onEnterFrame((new Date).getTime())
                    }
                }, {
                    key: "_onSourceEnded",
                    value: function (e) {
                        e.target === this._mediaSource ? (d.default.v(this.TAG, "mediaSourceEnd", !0),
                            this._isEndOfStream = !0,
                            this._emitter.emit(l.default.SORCE_END)) : d.default.d(this.TAG, "renderMediaSourceEnd")
                    }
                }, {
                    key: "_onSourceClose",
                    value: function (e) {
                        e.target.removeEventListener("sourceopen", this.e.onSourceOpen),
                            e.target.removeEventListener("sourceended", this.e.onSourceEnded),
                            e.target.removeEventListener("sourceclose", this.e.onSourceClose),
                            e.target === this._mediaSource ? d.default.v(this.TAG, "mediaSourceClose", !0) : d.default.d(this.TAG, "renderMediaSourceClose")
                    }
                }, {
                    key: "_hasPendingSegments",
                    value: function () {
                        return !!(this._pendingSegmentDic.single && this._pendingSegmentDic.single.length > 0) || !!(this._pendingSegmentDic.video && this._pendingSegmentDic.video.length > 0) || !!(this._pendingSegmentDic.audio && this._pendingSegmentDic.audio.length > 0)
                    }
                }, {
                    key: "_hasPendingRemoveRanges",
                    value: function () {
                        return !!(this._pendingRemoveDic.single && this._pendingRemoveDic.single.length > 0) || !!(this._pendingRemoveDic.video && this._pendingRemoveDic.video.length > 0) || !!(this._pendingRemoveDic.audio && this._pendingRemoveDic.audio.length > 0)
                    }
                }, {
                    key: "_onSourceBufferUpdateEnd",
                    value: function (e) {
                        e.target !== this._sourceBufferDic.single && e.target !== this._sourceBufferDic.video && e.target !== this._sourceBufferDic.audio || this._statistics.doneCount++ ,
                            this._detectStall(),
                            this._hasPendingRemoveRanges() ? this._doRemoveRanges() : this._hasPendingSegments() ? (this._doAppendSegment("single"),
                                this._doAppendSegment("video"),
                                this._doAppendSegment("audio")) : this._hasPendingEos && this.endOfStream()
                    }
                }, {
                    key: "_onSourceBufferError",
                    value: function (e) {
                        if (e.target === this._sourceBuffers) {
                            var t = "SourceBufferError Code:" + e.code + " Error: " + e.message;
                            this._mediaElement && this._mediaElement.error && (t += ",MediaElement error=" + this._mediaElement.error.code),
                                d.default.e(this.TAG, t)
                        } else
                            d.default.d(this.TAG, "renderSourceBufferError  Code:" + e.code + " Error: " + e.message)
                    }
                }, {
                    key: "_setStreamRunningStatus",
                    value: function (e) {
                        var t = void 0;
                        t = !!e,
                            this._streamRunning != t && (this._streamRunning = t,
                                this._emitter.emit(l.default.STREAM_STATUS, this._streamRunning ? "play" : "stall"))
                    }
                }, {
                    key: "_createSourceBuffer",
                    value: function (e, t, i, n) {
                        var r = t.addSourceBuffer(e);
                        return r.addEventListener("error", i),
                            r.addEventListener("updateend", n),
                            r
                    }
                }, {
                    key: "_pushSegment",
                    value: function (e, t, i) {
                        i[e] = i[e] || [],
                            i[e].push(t)
                    }
                }, {
                    key: "_doAppendSegment",
                    value: function (e) {
                        var t = this._sourceBufferDic[e]
                            , i = this._renderSourceBufferDic[e];
                        if (!(!t || t.updating || i && i.updating)) {
                            var n = this._pendingSegmentDic[e];
                            if (n && n.length > 0) {
                                var r = n.shift();
                                if (!r.data || 0 === r.data.byteLength)
                                    return;
                                try {
                                    if (r.hasOwnProperty("dtsBase") && (t.timestampOffset = r.dtsBase),
                                        i && !this._renderElement.error && "open" === this._renderMediaSource.readyState)
                                        try {
                                            r.hasOwnProperty("dtsBase") && (i.timestampOffset = r.dtsBase),
                                                i.appendBuffer(r.data_dummy ? r.data_dummy : r.data)
                                        } catch (e) {
                                            d.default.v(this.TAG, "renderSourceBuffer append error:" + e.message)
                                        }
                                    t.appendBuffer(r.data),
                                        this._isBufferFull = !1
                                } catch (e) {
                                    d.default.e(this.TAG, e.message),
                                        this._checkExpireBuffer(!0)
                                }
                            }
                        }
                    }
                }, {
                    key: "_destroySourceBuffer",
                    value: function (e, t) {
                        e && (e.removeEventListener("error", this.e.onSourceBufferError),
                            e.removeEventListener("updateend", this.e.onSourceBufferUpdateEnd),
                            t && "closed" !== t.readyState && t.removeSourceBuffer(e))
                    }
                }, {
                    key: "isAttachSuccess",
                    get: function () {
                        return 1 == this._attachSuccess
                    }
                }, {
                    key: "readyState",
                    get: function () {
                        return this._getReadyStateDesc(this._readyState)
                    }
                }, {
                    key: "statisticsInfo",
                    get: function () {
                        return this._statistics
                    }
                }]),
                    e
            }();
        i.default = y
    }
        , {
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "../utils/utf8-conv.js": 48,
        "./features": 6,
        "./media-segment-info.js": 8,
        "./mse-events.js": 10,
        events: 2
    }],
    10: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = {
            ERROR: "error",
            SORCE_END: "source_end",
            SOURCE_OPEN: "source_open",
            UPDATE_END: "update_end",
            EXTEND_VIDEO_DATA: "extend_video_data",
            STREAM_STATUS: "stream_status",
            NOT_SUPPORT_CODEC: "not_support_codec",
            NOT_SUPPORT_MSE: "not_support_mse"
        };
        i.default = n
    }
        , {}],
    11: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , o = e("events")
            , a = n(o)
            , u = e("../utils/logger.js")
            , d = n(u)
            , h = e("../utils/logging-control.js")
            , l = n(h)
            , c = e("./transmuxing-controller.js")
            , f = n(c)
            , _ = e("./transmuxing-events.js")
            , m = n(_)
            , p = e("./transmuxing-worker.js")
            , v = n(p)
            , y = e("./media-info.js")
            , g = n(y)
            , b = function () {
                function t(i, n) {
                    if (r(this, t),
                        this.TAG = "Transmuxer",
                        this._emitter = new a.default,
                        n.enableWorker && "undefined" != typeof Worker)
                        try {
                            var s = e("webworkify");
                            this._worker = s(v.default),
                                this._workerDestroying = !1,
                                this._worker.addEventListener("message", this._onWorkerMessage.bind(this)),
                                this._worker.postMessage({
                                    cmd: "init",
                                    param: [i, n]
                                }),
                                this.e = {
                                    onLoggingConfigChanged: this._onLoggingConfigChanged.bind(this)
                                },
                                l.default.registerListener(this.e.onLoggingConfigChanged),
                                this._worker.postMessage({
                                    cmd: "logging_config",
                                    param: l.default.getConfig()
                                })
                        } catch (e) {
                            d.default.e(this.TAG, "Error while initialize transmuxing worker, fallback to inline transmuxing"),
                                this._worker = null,
                                this._controller = new f.default(i, n)
                        }
                    else
                        this._controller = new f.default(i, n);
                    if (this._controller) {
                        var o = this._controller;
                        o.on(m.default.IO_ERROR, this._onIOError.bind(this)),
                            o.on(m.default.DEMUX_ERROR, this._onDemuxError.bind(this)),
                            o.on(m.default.INIT_SEGMENT, this._onInitSegment.bind(this)),
                            o.on(m.default.MEDIA_SEGMENT, this._onMediaSegment.bind(this)),
                            o.on(m.default.LOADING_COMPLETE, this._onLoadingComplete.bind(this)),
                            o.on(m.default.RECOVERED_EARLY_EOF, this._onRecoveredEarlyEof.bind(this)),
                            o.on(m.default.MEDIA_INFO, this._onMediaInfo.bind(this)),
                            o.on(m.default.STATISTICS_INFO, this._onStatisticsInfo.bind(this)),
                            o.on(m.default.RECOMMEND_SEEKPOINT, this._onRecommendSeekpoint.bind(this)),
                            o.on(m.default.VIDEO_ARRIVAL_TIME, this._onVideoArrivalTime.bind(this))
                    }
                }
                return s(t, [{
                    key: "ignoreAudio",
                    value: function (e) {
                        this._controller.ignoreAudio(e)
                    }
                }, {
                    key: "ignoreVideo",
                    value: function (e) {
                        this._controller.ignoreVideo(e)
                    }
                }, {
                    key: "destroy",
                    value: function () {
                        this._worker ? this._workerDestroying || (this._workerDestroying = !0,
                            this._worker.postMessage({
                                cmd: "destroy"
                            }),
                            l.default.removeListener(this.e.onLoggingConfigChanged),
                            this.e = null) : (this._controller.destroy(),
                                this._controller = null),
                            this._emitter.removeAllListeners()
                    }
                }, {
                    key: "on",
                    value: function (e, t) {
                        this._emitter.addListener(e, t)
                    }
                }, {
                    key: "off",
                    value: function (e, t) {
                        this._emitter.removeListener(e, t)
                    }
                }, {
                    key: "hasWorker",
                    value: function () {
                        return null != this._worker
                    }
                }, {
                    key: "open",
                    value: function () {
                        this._worker ? this._worker.postMessage({
                            cmd: "start"
                        }) : this._controller.start()
                    }
                }, {
                    key: "close",
                    value: function () {
                        this._worker ? this._worker.postMessage({
                            cmd: "stop"
                        }) : this._controller.stop()
                    }
                }, {
                    key: "seek",
                    value: function (e) {
                        this._worker ? this._worker.postMessage({
                            cmd: "seek",
                            param: e
                        }) : this._controller.seek(e)
                    }
                }, {
                    key: "pause",
                    value: function () {
                        this._worker ? this._worker.postMessage({
                            cmd: "pause"
                        }) : this._controller.pause()
                    }
                }, {
                    key: "resume",
                    value: function () {
                        this._worker ? this._worker.postMessage({
                            cmd: "resume"
                        }) : this._controller.resume()
                    }
                }, {
                    key: "_onInitSegment",
                    value: function (e, t) {
                        var i = this;
                        Promise.resolve().then(function () {
                            i._emitter.emit(m.default.INIT_SEGMENT, e, t)
                        })
                    }
                }, {
                    key: "_onMediaSegment",
                    value: function (e, t) {
                        var i = this;
                        Promise.resolve().then(function () {
                            i._emitter.emit(m.default.MEDIA_SEGMENT, e, t)
                        })
                    }
                }, {
                    key: "_onLoadingComplete",
                    value: function () {
                        var e = this;
                        Promise.resolve().then(function () {
                            e._emitter.emit(m.default.LOADING_COMPLETE)
                        })
                    }
                }, {
                    key: "_onRecoveredEarlyEof",
                    value: function () {
                        var e = this;
                        Promise.resolve().then(function () {
                            e._emitter.emit(m.default.RECOVERED_EARLY_EOF)
                        })
                    }
                }, {
                    key: "_onMediaInfo",
                    value: function (e) {
                        var t = this;
                        Promise.resolve().then(function () {
                            t._emitter.emit(m.default.MEDIA_INFO, e)
                        })
                    }
                }, {
                    key: "_onStatisticsInfo",
                    value: function (e) {
                        var t = this;
                        Promise.resolve().then(function () {
                            t._emitter.emit(m.default.STATISTICS_INFO, e)
                        })
                    }
                }, {
                    key: "_onIOError",
                    value: function (e, t) {
                        var i = this;
                        Promise.resolve().then(function () {
                            i._emitter.emit(m.default.IO_ERROR, e, t)
                        })
                    }
                }, {
                    key: "_onDemuxError",
                    value: function (e, t) {
                        var i = this;
                        Promise.resolve().then(function () {
                            i._emitter.emit(m.default.DEMUX_ERROR, e, t)
                        })
                    }
                }, {
                    key: "_onRecommendSeekpoint",
                    value: function (e) {
                        var t = this;
                        Promise.resolve().then(function () {
                            t._emitter.emit(m.default.RECOMMEND_SEEKPOINT, e)
                        })
                    }
                }, {
                    key: "_onVideoArrivalTime",
                    value: function (e) {
                        var t = this;
                        Promise.resolve().then(function () {
                            t._emitter.emit(m.default.VIDEO_ARRIVAL_TIME, e)
                        })
                    }
                }, {
                    key: "_onLoggingConfigChanged",
                    value: function (e) {
                        this._worker && this._worker.postMessage({
                            cmd: "logging_config",
                            param: e
                        })
                    }
                }, {
                    key: "_onWorkerMessage",
                    value: function (e) {
                        var t = e.data
                            , i = t.data;
                        if ("destroyed" === t.msg || this._workerDestroying)
                            return this._workerDestroying = !1,
                                this._worker.terminate(),
                                void (this._worker = null);
                        switch (t.msg) {
                            case m.default.INIT_SEGMENT:
                                this._onInitSegment(i.audioInitSegment, i.videoInitSegment);
                                break;
                            case m.default.MEDIA_SEGMENT:
                                this._onMediaSegment(i.type, i.data);
                                break;
                            case m.default.LOADING_COMPLETE:
                                this._onLoadingComplete();
                                break;
                            case m.default.RECOVERED_EARLY_EOF:
                                this._onRecoveredEarlyEof();
                                break;
                            case m.default.MEDIA_INFO:
                                Object.setPrototypeOf(i, g.default.prototype),
                                    this._onMediaInfo(i);
                                break;
                            case m.default.STATISTICS_INFO:
                                this._onStatisticsInfo(i);
                                break;
                            case m.default.IO_ERROR:
                                this._onIOError(i.type, i.info);
                                break;
                            case m.default.DEMUX_ERROR:
                                this._onDemuxError(i.type, i.info);
                                break;
                            case m.default.RECOMMEND_SEEKPOINT:
                                this._onRecommendSeekpoint(i);
                                break;
                            case m.default.VIDEO_ARRIVAL_TIME:
                                this._onVideoArrivalTime(i)
                        }
                    }
                }]),
                    t
            }();
        i.default = b
    }
        , {
        "../utils/logger.js": 44,
        "../utils/logging-control.js": 45,
        "./media-info.js": 7,
        "./transmuxing-controller.js": 12,
        "./transmuxing-events.js": 13,
        "./transmuxing-worker.js": 14,
        events: 2,
        webworkify: 4
    }],
    12: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , o = e("events")
            , a = n(o)
            , u = e("../utils/logger.js")
            , d = n(u)
            , h = e("../utils/browser.js")
            , l = n(h)
            , c = e("./media-info.js")
            , f = n(c)
            , _ = e("../demux/flv-demuxer.js")
            , m = n(_)
            , p = e("../remux/mp4-remuxer.js")
            , v = n(p)
            , y = e("../demux/demux-errors.js")
            , g = n(y)
            , b = e("../io/io-controller.js")
            , S = n(b)
            , E = e("./transmuxing-events.js")
            , k = n(E)
            , O = (e("../io/loader.js"),
                function () {
                    function e(t, i) {
                        r(this, e),
                            this.TAG = "TransmuxingController",
                            this._emitter = new a.default,
                            this._config = i,
                            t.segments || (t.segments = [{
                                duration: t.duration,
                                filesize: t.filesize,
                                url: t.url
                            }]),
                            "boolean" != typeof t.cors && (t.cors = !0),
                            "boolean" != typeof t.withCredentials && (t.withCredentials = !1),
                            this._mediaDataSource = t,
                            this._currentSegmentIndex = 0;
                        var n = 0;
                        this._mediaDataSource.segments.forEach(function (e) {
                            e.timestampBase = n,
                                n += e.duration,
                                e.cors = t.cors,
                                e.withCredentials = t.withCredentials,
                                i.referrerPolicy && (e.referrerPolicy = i.referrerPolicy)
                        }),
                            isNaN(n) || this._mediaDataSource.duration === n || (this._mediaDataSource.duration = n),
                            this._mediaInfo = null,
                            this._demuxer = null,
                            this._remuxer = null,
                            this._ioctl = null,
                            this._pendingSeekTime = null,
                            this._pendingResolveSeekPoint = null,
                            this._statisticsReporter = null
                    }
                    return s(e, [{
                        key: "destroy",
                        value: function () {
                            this._mediaInfo = null,
                                this._mediaDataSource = null,
                                this._statisticsReporter && this._disableStatisticsReporter(),
                                this._ioctl && (this._ioctl.destroy(),
                                    this._ioctl = null),
                                this._demuxer && (this._demuxer.destroy(),
                                    this._demuxer = null),
                                this._remuxer && (this._remuxer.destroy(),
                                    this._remuxer = null),
                                this._emitter.removeAllListeners(),
                                this._emitter = null
                        }
                    }, {
                        key: "on",
                        value: function (e, t) {
                            this._emitter.addListener(e, t)
                        }
                    }, {
                        key: "off",
                        value: function (e, t) {
                            this._emitter.removeListener(e, t)
                        }
                    }, {
                        key: "start",
                        value: function () {
                            this._loadSegment(0),
                                this._enableStatisticsReporter()
                        }
                    }, {
                        key: "_loadSegment",
                        value: function (e, t) {
                            this._currentSegmentIndex = e;
                            var i = this._mediaDataSource.segments[e]
                                , n = this._ioctl = new S.default(i, this._config, e);
                            n.onError = this._onIOException.bind(this),
                                n.onSeeked = this._onIOSeeked.bind(this),
                                n.onComplete = this._onIOComplete.bind(this),
                                n.onRedirect = this._onIORedirect.bind(this),
                                n.onRecoveredEarlyEof = this._onIORecoveredEarlyEof.bind(this),
                                t ? this._demuxer.bindDataSource(this._ioctl) : n.onDataArrival = this._onInitChunkArrival.bind(this),
                                n.open(t)
                        }
                    }, {
                        key: "stop",
                        value: function () {
                            this._internalAbort(),
                                this._disableStatisticsReporter()
                        }
                    }, {
                        key: "_internalAbort",
                        value: function () {
                            this._ioctl && (this._ioctl.destroy(),
                                this._ioctl = null)
                        }
                    }, {
                        key: "pause",
                        value: function () {
                            this._ioctl && this._ioctl.isWorking() && (this._ioctl.pause(),
                                this._disableStatisticsReporter())
                        }
                    }, {
                        key: "resume",
                        value: function () {
                            this._ioctl && this._ioctl.isPaused() && (this._ioctl.resume(),
                                this._enableStatisticsReporter())
                        }
                    }, {
                        key: "ignoreAudio",
                        value: function (e) {
                            this._demuxer.ignoreAudio = e
                        }
                    }, {
                        key: "ignoreVideo",
                        value: function (e) {
                            this._demuxer.ignoreVideo = e
                        }
                    }, {
                        key: "seek",
                        value: function (e) {
                            if (null != this._mediaInfo && this._mediaInfo.isSeekable()) {
                                var t = this._searchSegmentIndexContains(e);
                                if (t === this._currentSegmentIndex) {
                                    var i = this._mediaInfo.segments[t];
                                    if (void 0 == i)
                                        this._pendingSeekTime = e;
                                    else {
                                        var n = i.getNearestKeyframe(e);
                                        this._remuxer.seek(n.milliseconds),
                                            this._ioctl.seek(n.fileposition),
                                            this._pendingResolveSeekPoint = n.milliseconds
                                    }
                                } else {
                                    var r = this._mediaInfo.segments[t];
                                    if (void 0 == r)
                                        this._pendingSeekTime = e,
                                            this._internalAbort(),
                                            this._remuxer.seek(),
                                            this._remuxer.insertDiscontinuity(),
                                            this._loadSegment(t);
                                    else {
                                        var s = r.getNearestKeyframe(e);
                                        this._internalAbort(),
                                            this._remuxer.seek(e),
                                            this._remuxer.insertDiscontinuity(),
                                            this._demuxer.resetMediaInfo(),
                                            this._demuxer.timestampBase = this._mediaDataSource.segments[t].timestampBase,
                                            this._loadSegment(t, s.fileposition),
                                            this._pendingResolveSeekPoint = s.milliseconds,
                                            this._reportSegmentMediaInfo(t)
                                    }
                                }
                                this._enableStatisticsReporter()
                            }
                        }
                    }, {
                        key: "_searchSegmentIndexContains",
                        value: function (e) {
                            for (var t = this._mediaDataSource.segments, i = t.length - 1, n = 0; n < t.length; n++)
                                if (e < t[n].timestampBase) {
                                    i = n - 1;
                                    break
                                }
                            return i
                        }
                    }, {
                        key: "_onInitChunkArrival",
                        value: function (e, t) {
                            var i = this
                                , n = null
                                , r = 0;
                            if (t > 0)
                                this._demuxer.bindDataSource(this._ioctl),
                                    this._demuxer.timestampBase = this._mediaDataSource.segments[this._currentSegmentIndex].timestampBase,
                                    r = this._demuxer.parseChunks(e, t);
                            else if ((n = m.default.probe(e)).match) {
                                d.default.v(this.TAG, "receive first chunk,size " + e.byteLength, !0),
                                    this._demuxer = new m.default(n, this._config),
                                    this._remuxer || (this._remuxer = new v.default(this._config));
                                var s = this._mediaDataSource;
                                void 0 == s.duration || isNaN(s.duration) || (this._demuxer.overridedDuration = s.duration),
                                    "boolean" == typeof s.hasAudio && (this._demuxer.overridedHasAudio = s.hasAudio),
                                    "boolean" == typeof s.hasVideo && (this._demuxer.overridedHasVideo = s.hasVideo),
                                    this._demuxer.timestampBase = s.segments[this._currentSegmentIndex].timestampBase,
                                    this._demuxer.onError = this._onDemuxException.bind(this),
                                    this._demuxer.onMediaInfo = this._onMediaInfo.bind(this),
                                    this._demuxer.onVideoArrivalTime = this._onDemuxVideoArrivalTime.bind(this),
                                    this._remuxer.bindDataSource(this._demuxer.bindDataSource(this._ioctl)),
                                    this._remuxer.onInitSegment = this._onRemuxerInitSegmentArrival.bind(this),
                                    this._remuxer.onMediaSegment = this._onRemuxerMediaSegmentArrival.bind(this),
                                    r = this._demuxer.parseChunks(e, t)
                            } else
                                n = null,
                                    d.default.e(this.TAG, "Non-FLV, Unsupported media type!"),
                                    Promise.resolve().then(function () {
                                        i._internalAbort()
                                    }),
                                    this._emitter.emit(k.default.DEMUX_ERROR, g.default.FORMAT_UNSUPPORTED, "Non-FLV, Unsupported media type"),
                                    r = 0;
                            return r
                        }
                    }, {
                        key: "_onMediaInfo",
                        value: function (e) {
                            var t = this;
                            null == this._mediaInfo && (this._mediaInfo = Object.assign({}, e),
                                this._mediaInfo.keyframesIndex = null,
                                this._mediaInfo.segments = [],
                                this._mediaInfo.segmentCount = this._mediaDataSource.segments.length,
                                Object.setPrototypeOf(this._mediaInfo, f.default.prototype));
                            var i = Object.assign({}, e);
                            Object.setPrototypeOf(i, f.default.prototype),
                                this._mediaInfo.segments[this._currentSegmentIndex] = i,
                                this._reportSegmentMediaInfo(this._currentSegmentIndex),
                                null != this._pendingSeekTime && Promise.resolve().then(function () {
                                    var e = t._pendingSeekTime;
                                    t._pendingSeekTime = null,
                                        t.seek(e)
                                })
                        }
                    }, {
                        key: "_onIOSeeked",
                        value: function () {
                            this._remuxer.insertDiscontinuity()
                        }
                    }, {
                        key: "_onIOComplete",
                        value: function (e) {
                            var t = e
                                , i = t + 1;
                            i < this._mediaDataSource.segments.length ? (this._internalAbort(),
                                this._loadSegment(i)) : (this._emitter.emit(k.default.LOADING_COMPLETE),
                                    this._disableStatisticsReporter())
                        }
                    }, {
                        key: "_onIORedirect",
                        value: function (e) {
                            var t = this._ioctl.extraData;
                            this._mediaDataSource.segments[t].redirectedURL = e
                        }
                    }, {
                        key: "_onIORecoveredEarlyEof",
                        value: function () {
                            this._emitter.emit(k.default.RECOVERED_EARLY_EOF)
                        }
                    }, {
                        key: "_onIOException",
                        value: function (e, t) {
                            d.default.e(this.TAG, "IOException: type = " + e + ", code = " + t.code + ", msg = " + t.msg),
                                this._emitter.emit(k.default.IO_ERROR, e, t),
                                this._disableStatisticsReporter()
                        }
                    }, {
                        key: "_onDemuxException",
                        value: function (e, t) {
                            d.default.e(this.TAG, "DemuxException: type = " + e + ", info = " + t),
                                this._emitter.emit(k.default.DEMUX_ERROR, e, t)
                        }
                    }, {
                        key: "_onDemuxVideoArrivalTime",
                        value: function (e) {
                            this._emitter.emit(k.default.e, e)
                        }
                    }, {
                        key: "_onRemuxerInitSegmentArrival",
                        value: function (e, t) {
                            this._emitter.emit(k.default.INIT_SEGMENT, e, t)
                        }
                    }, {
                        key: "_onRemuxerMediaSegmentArrival",
                        value: function (e, t) {
                            if (null == this._pendingSeekTime && (this._emitter.emit(k.default.MEDIA_SEGMENT, e, t),
                                null != this._pendingResolveSeekPoint && "video" === e)) {
                                var i = t.info.syncPoints
                                    , n = this._pendingResolveSeekPoint;
                                this._pendingResolveSeekPoint = null,
                                    l.default.safari && i.length > 0 && i[0].originalDts === n && (n = i[0].pts),
                                    this._emitter.emit(k.default.RECOMMEND_SEEKPOINT, n)
                            }
                        }
                    }, {
                        key: "_enableStatisticsReporter",
                        value: function () {
                            null == this._statisticsReporter && (this._statisticsReporter = self.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval))
                        }
                    }, {
                        key: "_disableStatisticsReporter",
                        value: function () {
                            this._statisticsReporter && (self.clearInterval(this._statisticsReporter),
                                this._statisticsReporter = null)
                        }
                    }, {
                        key: "_reportSegmentMediaInfo",
                        value: function (e) {
                            var t = this._mediaInfo.segments[e]
                                , i = Object.assign({}, t);
                            i.duration = this._mediaInfo.duration,
                                i.segmentCount = this._mediaInfo.segmentCount,
                                delete i.segments,
                                delete i.keyframesIndex,
                                this._emitter.emit(k.default.MEDIA_INFO, i)
                        }
                    }, {
                        key: "_reportStatisticsInfo",
                        value: function () {
                            var e = {};
                            e.url = this._ioctl.currentURL,
                                e.hasRedirect = this._ioctl.hasRedirect,
                                e.hasRedirect && (e.redirectedURL = this._ioctl.currentRedirectedURL),
                                e.speed = this._ioctl.currentSpeed,
                                e.receivedBytes = this._ioctl.receivedBytes,
                                e.loaderType = this._ioctl.loaderType,
                                this._emitter.emit(k.default.STATISTICS_INFO, e)
                        }
                    }]),
                        e
                }());
        i.default = O
    }
        , {
        "../demux/demux-errors.js": 16,
        "../demux/flv-demuxer.js": 18,
        "../io/io-controller.js": 25,
        "../io/loader.js": 26,
        "../remux/mp4-remuxer.js": 40,
        "../utils/browser.js": 42,
        "../utils/logger.js": 44,
        "./media-info.js": 7,
        "./transmuxing-events.js": 13,
        events: 2
    }],
    13: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = {
            IO_ERROR: "io_error",
            DEMUX_ERROR: "demux_error",
            REMUX_ERROR: "remux_error",
            INIT_SEGMENT: "init_segment",
            MEDIA_SEGMENT: "media_segment",
            LOADING_COMPLETE: "loading_complete",
            RECOVERED_EARLY_EOF: "recovered_early_eof",
            MEDIA_INFO: "media_info",
            STATISTICS_INFO: "statistics_info",
            RECOMMEND_SEEKPOINT: "recommend_seekpoint",
            VIDEO_ARRIVAL_TIME: "video_arrival_time"
        };
        i.default = n
    }
        , {}],
    14: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = e("../utils/logger.js")
            , s = n(r)
            , o = e("../utils/logging-control.js")
            , a = n(o)
            , u = e("../utils/polyfill.js")
            , d = n(u)
            , h = e("./transmuxing-controller.js")
            , l = n(h)
            , c = e("./transmuxing-events.js")
            , f = n(c)
            , _ = e("../utils/requestAnimationFrame")
            , m = (n(_),
                function (e) {
                    function t(t, i) {
                        var n = {
                            msg: f.default.INIT_SEGMENT,
                            data: {
                                audioInitSegment: t,
                                videoInitSegment: i
                            }
                        };
                        e.postMessage(n)
                    }
                    function i(t, i) {
                        var n = {
                            msg: f.default.MEDIA_SEGMENT,
                            data: {
                                type: t,
                                data: i
                            }
                        };
                        e.postMessage(n, [i.data])
                    }
                    function n() {
                        var t = {
                            msg: f.default.LOADING_COMPLETE
                        };
                        e.postMessage(t)
                    }
                    function r() {
                        var t = {
                            msg: f.default.RECOVERED_EARLY_EOF
                        };
                        e.postMessage(t)
                    }
                    function o(t) {
                        var i = {
                            msg: f.default.MEDIA_INFO,
                            data: t
                        };
                        e.postMessage(i)
                    }
                    function u(t) {
                        var i = {
                            msg: f.default.STATISTICS_INFO,
                            data: t
                        };
                        e.postMessage(i)
                    }
                    function h(t, i) {
                        e.postMessage({
                            msg: f.default.IO_ERROR,
                            data: {
                                type: t,
                                info: i
                            }
                        })
                    }
                    function c(t, i) {
                        e.postMessage({
                            msg: f.default.DEMUX_ERROR,
                            data: {
                                type: t,
                                info: i
                            }
                        })
                    }
                    function _(t) {
                        e.postMessage({
                            msg: f.default.RECOMMEND_SEEKPOINT,
                            data: t
                        })
                    }
                    function m(t) {
                        e.postMessage({
                            msg: f.default.VIDEO_ARRIVAL_TIME,
                            data: t
                        })
                    }
                    var p = null;
                    d.default.install(),
                        s.default.v("TransmuxingWorker", "TransmuxingWorker enable"),
                        e.addEventListener("message", function (s) {
                            switch (s.data.cmd) {
                                case "init":
                                    p = new l.default(s.data.param[0], s.data.param[1]),
                                        p.on(f.default.IO_ERROR, h.bind(this)),
                                        p.on(f.default.DEMUX_ERROR, c.bind(this)),
                                        p.on(f.default.INIT_SEGMENT, t.bind(this)),
                                        p.on(f.default.MEDIA_SEGMENT, i.bind(this)),
                                        p.on(f.default.LOADING_COMPLETE, n.bind(this)),
                                        p.on(f.default.RECOVERED_EARLY_EOF, r.bind(this)),
                                        p.on(f.default.MEDIA_INFO, o.bind(this)),
                                        p.on(f.default.STATISTICS_INFO, u.bind(this)),
                                        p.on(f.default.RECOMMEND_SEEKPOINT, _.bind(this)),
                                        p.on(f.default.VIDEO_ARRIVAL_TIME, m.bind(this));
                                    break;
                                case "destroy":
                                    p && (p.destroy(),
                                        p = null),
                                        e.postMessage({
                                            msg: "destroyed"
                                        });
                                    break;
                                case "start":
                                    p.start();
                                    break;
                                case "stop":
                                    p.stop();
                                    break;
                                case "seek":
                                    p.seek(s.data.param);
                                    break;
                                case "pause":
                                    p.pause();
                                    break;
                                case "resume":
                                    p.resume();
                                    break;
                                case "logging_config":
                                    a.default.applyConfig(s.data.param)
                            }
                        })
                }
            );
        i.default = m
    }
        , {
        "../utils/logger.js": 44,
        "../utils/logging-control.js": 45,
        "../utils/polyfill.js": 46,
        "../utils/requestAnimationFrame": 47,
        "./transmuxing-controller.js": 12,
        "./transmuxing-events.js": 13
    }],
    15: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , o = e("../utils/logger.js")
            , a = n(o)
            , u = e("../utils/utf8-conv.js")
            , d = n(u)
            , h = e("../utils/exception.js")
            , l = function () {
                var e = new ArrayBuffer(2);
                return new DataView(e).setInt16(0, 256, !0),
                    256 === new Int16Array(e)[0]
            }()
            , c = function () {
                function e() {
                    r(this, e)
                }
                return s(e, null, [{
                    key: "parseScriptData",
                    value: function (t, i, n) {
                        var r = {};
                        try {
                            var s = e.parseValue(t, i, n)
                                , o = e.parseValue(t, i + s.size, n - s.size);
                            r[s.data] = o.data
                        } catch (e) {
                            a.default.e("AMF", e.toString())
                        }
                        return r
                    }
                }, {
                    key: "parseObject",
                    value: function (t, i, n) {
                        if (3 > n)
                            throw new h.IllegalStateException("Data not enough when parse ScriptDataObject");
                        var r = e.parseString(t, i, n)
                            , s = e.parseValue(t, i + r.size, n - r.size)
                            , o = s.objectEnd;
                        return {
                            data: {
                                name: r.data,
                                value: s.data
                            },
                            size: r.size + s.size,
                            objectEnd: o
                        }
                    }
                }, {
                    key: "parseVariable",
                    value: function (t, i, n) {
                        return e.parseObject(t, i, n)
                    }
                }, {
                    key: "parseString",
                    value: function (e, t, i) {
                        if (2 > i)
                            throw new h.IllegalStateException("Data not enough when parse String");
                        var n = new DataView(e, t, i)
                            , r = n.getUint16(0, !l)
                            , s = void 0;
                        return s = r > 0 ? d.default(new Uint8Array(e, t + 2, r)) : "",
                            {
                                data: s,
                                size: 2 + r
                            }
                    }
                }, {
                    key: "parseLongString",
                    value: function (e, t, i) {
                        if (4 > i)
                            throw new h.IllegalStateException("Data not enough when parse LongString");
                        var n = new DataView(e, t, i)
                            , r = n.getUint32(0, !l)
                            , s = void 0;
                        return s = r > 0 ? d.default(new Uint8Array(e, t + 4, r)) : "",
                            {
                                data: s,
                                size: 4 + r
                            }
                    }
                }, {
                    key: "parseDate",
                    value: function (e, t, i) {
                        if (10 > i)
                            throw new h.IllegalStateException("Data size invalid when parse Date");
                        var n = new DataView(e, t, i)
                            , r = n.getFloat64(0, !l);
                        return r += 60 * n.getInt16(8, !l) * 1e3,
                            {
                                data: new Date(r),
                                size: 10
                            }
                    }
                }, {
                    key: "parseValue",
                    value: function (t, i, n) {
                        if (1 > n)
                            throw new h.IllegalStateException("Data not enough when parse Value");
                        var r = new DataView(t, i, n)
                            , s = 1
                            , o = r.getUint8(0)
                            , u = void 0
                            , d = !1;
                        try {
                            switch (o) {
                                case 0:
                                    u = r.getFloat64(1, !l),
                                        s += 8;
                                    break;
                                case 1:
                                    u = !!r.getUint8(1),
                                        s += 1;
                                    break;
                                case 2:
                                    var c = e.parseString(t, i + 1, n - 1);
                                    u = c.data,
                                        s += c.size;
                                    break;
                                case 3:
                                    u = {};
                                    var f = 0;
                                    for (9 == (16777215 & r.getUint32(n - 4, !l)) && (f = 3); n - 4 > s;) {
                                        var _ = e.parseObject(t, i + s, n - s - f);
                                        if (_.objectEnd)
                                            break;
                                        u[_.data.name] = _.data.value,
                                            s += _.size
                                    }
                                    n - 3 >= s && 9 === (16777215 & r.getUint32(s - 1, !l)) && (s += 3);
                                    break;
                                case 8:
                                    u = {},
                                        s += 4;
                                    var m = 0;
                                    for (9 == (16777215 & r.getUint32(n - 4, !l)) && (m = 3); n - 8 > s;) {
                                        var p = e.parseVariable(t, i + s, n - s - m);
                                        if (p.objectEnd)
                                            break;
                                        u[p.data.name] = p.data.value,
                                            s += p.size
                                    }
                                    n - 3 >= s && 9 === (16777215 & r.getUint32(s - 1, !l)) && (s += 3);
                                    break;
                                case 9:
                                    u = void 0,
                                        s = 1,
                                        d = !0;
                                    break;
                                case 10:
                                    u = [];
                                    var v = r.getUint32(1, !l);
                                    s += 4;
                                    for (var y = 0; v > y; y++) {
                                        var g = e.parseValue(t, i + s, n - s);
                                        u.push(g.data),
                                            s += g.size
                                    }
                                    break;
                                case 11:
                                    var b = e.parseDate(t, i + 1, n - 1);
                                    u = b.data,
                                        s += b.size;
                                    break;
                                case 12:
                                    var S = e.parseString(t, i + 1, n - 1);
                                    u = S.data,
                                        s += S.size;
                                    break;
                                default:
                                    s = n,
                                        a.default.w("AMF", "Unsupported AMF value type " + o)
                            }
                        } catch (e) {
                            a.default.e("AMF", e.toString())
                        }
                        return {
                            data: u,
                            size: s,
                            objectEnd: d
                        }
                    }
                }]),
                    e
            }();
        i.default = c
    }
        , {
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "../utils/utf8-conv.js": 48
    }],
    16: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = {
            OK: "OK",
            FORMAT_ERROR: "FormatError",
            FORMAT_UNSUPPORTED: "FormatUnsupported",
            CODEC_UNSUPPORTED: "CodecUnsupported",
            AUDIO_TIME_STAMP_INVALID: "audio_time_stamp_invalid",
            VIDEO_TIME_STAMP_INVALID: "video_time_stamp_invalid"
        };
        i.default = n
    }
        , {}],
    17: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = e("../utils/exception.js")
            , o = function () {
                function e(t) {
                    n(this, e),
                        this.TAG = "ExpGolomb",
                        this._buffer = t,
                        this._buffer_index = 0,
                        this._total_bytes = t.byteLength,
                        this._total_bits = 8 * t.byteLength,
                        this._current_word = 0,
                        this._current_word_bits_left = 0
                }
                return r(e, [{
                    key: "destroy",
                    value: function () {
                        this._buffer = null
                    }
                }, {
                    key: "_fillCurrentWord",
                    value: function () {
                        var e = this._total_bytes - this._buffer_index;
                        if (0 >= e)
                            throw new s.IllegalStateException("ExpGolomb: _fillCurrentWord() but no bytes available");
                        var t = Math.min(4, e)
                            , i = new Uint8Array(4);
                        i.set(this._buffer.subarray(this._buffer_index, this._buffer_index + t)),
                            this._current_word = new DataView(i.buffer).getUint32(0, !1),
                            this._buffer_index += t,
                            this._current_word_bits_left = 8 * t
                    }
                }, {
                    key: "readBits",
                    value: function (e) {
                        if (e > 32)
                            throw new s.InvalidArgumentException("ExpGolomb: readBits() bits exceeded max 32bits!");
                        if (e <= this._current_word_bits_left) {
                            var t = this._current_word >>> 32 - e;
                            return this._current_word <<= e,
                                this._current_word_bits_left -= e,
                                t
                        }
                        var i = this._current_word_bits_left ? this._current_word : 0;
                        i >>>= 32 - this._current_word_bits_left;
                        var n = e - this._current_word_bits_left;
                        this._fillCurrentWord();
                        var r = Math.min(n, this._current_word_bits_left)
                            , o = this._current_word >>> 32 - r;
                        return this._current_word <<= r,
                            this._current_word_bits_left -= r,
                            i = i << r | o
                    }
                }, {
                    key: "readBool",
                    value: function () {
                        return 1 === this.readBits(1)
                    }
                }, {
                    key: "readByte",
                    value: function () {
                        return this.readBits(8)
                    }
                }, {
                    key: "_skipLeadingZero",
                    value: function () {
                        var e = void 0;
                        for (e = 0; e < this._current_word_bits_left; e++)
                            if (0 != (this._current_word & 2147483648 >>> e))
                                return this._current_word <<= e,
                                    this._current_word_bits_left -= e,
                                    e;
                        return this._fillCurrentWord(),
                            e + this._skipLeadingZero()
                    }
                }, {
                    key: "readUEG",
                    value: function () {
                        var e = this._skipLeadingZero();
                        return this.readBits(e + 1) - 1
                    }
                }, {
                    key: "readSEG",
                    value: function () {
                        var e = this.readUEG();
                        return 1 & e ? e + 1 >>> 1 : -1 * (e >>> 1)
                    }
                }]),
                    e
            }();
        i.default = o
    }
        , {
        "../utils/exception.js": 43
    }],
    18: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function s(e, t) {
            return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , a = function () {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function (t, i, n) {
                    return i && e(t.prototype, i),
                        n && e(t, n),
                        t
                }
            }()
            , u = e("../utils/browser.js")
            , d = n(u)
            , h = e("../utils/logger.js")
            , l = n(h)
            , c = e("./amf-parser.js")
            , f = n(c)
            , _ = e("./sps-parser.js")
            , m = n(_)
            , p = e("./demux-errors.js")
            , v = n(p)
            , y = e("../core/media-info.js")
            , g = n(y)
            , b = e("../utils/exception.js")
            , S = function () {
                function e(t, i) {
                    r(this, e),
                        this.TAG = "FLVDemuxer",
                        this._config = i,
                        this._onError = null,
                        this._onMediaInfo = null,
                        this._onTrackMetadata = null,
                        this._onDataAvailable = null,
                        this._dataOffset = t.dataOffset,
                        this._firstParse = !0,
                        this._dispatch = !1,
                        this._hasAudio = t.hasAudioTrack,
                        this._hasVideo = t.hasVideoTrack,
                        this._hasAudioFlagOverrided = !1,
                        this._hasVideoFlagOverrided = !1,
                        this._audioInitialMetadataDispatched = !1,
                        this._videoInitialMetadataDispatched = !1,
                        this._mediaInfo = new g.default,
                        this._mediaInfo.hasAudio = this._hasAudio,
                        this._mediaInfo.hasVideo = this._hasVideo,
                        this._metadata = null,
                        this._audioMetadata = null,
                        this._videoMetadata = null,
                        this._naluLengthSize = 4,
                        this._timestampBase = 0,
                        this._timescale = 1e3,
                        this._duration = 0,
                        this._durationOverrided = !1,
                        this._referenceFrameRate = {
                            fixed: !0,
                            fps: 15,
                            fps_num: 30,
                            fps_den: 2
                        },
                        this._flvSoundRateTable = [5500, 11025, 22050, 44100, 48e3],
                        this._mpegSamplingRates = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350],
                        this._mpegAudioV10SampleRateTable = [44100, 48e3, 32e3, 0],
                        this._mpegAudioV20SampleRateTable = [22050, 24e3, 16e3, 0],
                        this._mpegAudioV25SampleRateTable = [11025, 12e3, 8e3, 0],
                        this._mpegAudioL1BitRateTable = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1],
                        this._mpegAudioL2BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1],
                        this._mpegAudioL3BitRateTable = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1],
                        this._videoTrack = {
                            type: "video",
                            id: 1,
                            sequenceNumber: 0,
                            samples: [],
                            length: 0,
                            length_dummy: 0,
                            "extends": []
                        },
                        this._audioTrack = {
                            type: "audio",
                            id: 2,
                            sequenceNumber: 0,
                            samples: [],
                            length: 0
                        },
                        this._flagFrame = !1,
                        this.DUMMY_AVC_DATA = new Uint8Array([1, 66, 0, 11, 255, 225, 0, 12, 103, 66, 192, 31, 140, 141, 78, 64, 60, 34, 17, 168, 1, 0, 4, 104, 206, 60, 128]),
                        this.DUMMY_BLUE_FRAME_NALU = new Uint8Array([0, 0, 0, 24, 101, 184, 0, 0, 17, 192, 0, 0, 158, 35, 20, 0, 4, 78, 227, 128, 0, 133, 212, 112, 0, 16, 3, 192]),
                        this.DUMMY_RED_FRAME_NALU = new Uint8Array([0, 0, 0, 24, 101, 184, 0, 0, 34, 0, 0, 3, 2, 120, 140, 80, 0, 16, 155, 142, 0, 2, 5, 113, 192, 0, 66, 243]),
                        this._videoArrivalTime = [],
                        this._littleEndian = function () {
                            var e = new ArrayBuffer(2);
                            return new DataView(e).setInt16(0, 256, !0),
                                256 === new Int16Array(e)[0]
                        }(),
                        this._audioLastDts = -1,
                        this._videoLastDts = -1,
                        this._invalidTSOccur = !1,
                        this.ignoreAudio = !1,
                        this.ignoreVideo = !1
                }
                return a(e, [{
                    key: "destroy",
                    value: function () {
                        this._mediaInfo = null,
                            this._metadata = null,
                            this._audioMetadata = null,
                            this._videoMetadata = null,
                            this._videoTrack = null,
                            this._audioTrack = null,
                            this._onError = null,
                            this._onMediaInfo = null,
                            this._onTrackMetadata = null,
                            this._onDataAvailable = null,
                            this._videoArrivalTime.splice(0, this._videoArrivalTime.length),
                            this._onVidelArrivalTime = null,
                            this._flagFrame = !0,
                            this._audioLastDts = -1,
                            this._videoLastDts = -1,
                            this._invalidTSOccur = !1,
                            this.ignoreAudio = !1,
                            this.ignoreVideo = !1
                    }
                }, {
                    key: "bindDataSource",
                    value: function (e) {
                        return e.onDataArrival = this.parseChunks.bind(this),
                            this
                    }
                }, {
                    key: "resetMediaInfo",
                    value: function () {
                        this._mediaInfo = new g.default
                    }
                }, {
                    key: "_isInitialMetadataDispatched",
                    value: function () {
                        return this._hasAudio && this._hasVideo ? this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched : this._hasAudio && !this._hasVideo ? this._audioInitialMetadataDispatched : !(this._hasAudio || !this._hasVideo) && this._videoInitialMetadataDispatched
                    }
                }, {
                    key: "parseChunks",
                    value: function (t, i) {
                        if (!(this._onError && this._onMediaInfo && this._onTrackMetadata && this._onDataAvailable))
                            throw new b.IllegalStateException("Flv: onError & onMediaInfo & onTrackMetadata & onDataAvailable callback must be specified");
                        var n = 0
                            , r = this._littleEndian;
                        if (0 === i) {
                            if (!(t.byteLength > 13))
                                return 0;
                            n = e.probe(t).dataOffset
                        }
                        for (this._firstParse && (this._firstParse = !1,
                            i + n !== this._dataOffset && l.default.w(this.TAG, "First time parsing but chunk byteStart invalid!"),
                            0 !== new DataView(t, n).getUint32(0, !r) && l.default.w(this.TAG, "PrevTagSize0 !== 0 !!!"),
                            n += 4); n < t.byteLength;) {
                            this._dispatch = !0;
                            var s = new DataView(t, n);
                            if (n + 11 + 4 > t.byteLength)
                                break;
                            var o = s.getUint8(0)
                                , a = 16777215 & s.getUint32(0, !r);
                            if (n + 11 + a + 4 > t.byteLength)
                                break;
                            if (8 === o || 9 === o || 18 === o) {
                                var u = s.getUint8(4)
                                    , d = s.getUint8(5)
                                    , h = s.getUint8(6)
                                    , c = s.getUint8(7)
                                    , f = h | d << 8 | u << 16 | c << 24;
                                0 !== (16777215 & s.getUint32(7, !r)) && l.default.w(this.TAG, "Meet tag which has StreamID != 0!");
                                var _ = n + 11;
                                switch (o) {
                                    case 8:
                                        this._parseAudioData(t, _, a, f);
                                        break;
                                    case 9:
                                        this._parseVideoData(t, _, a, f, i + n);
                                        break;
                                    case 18:
                                        this._parseScriptData(t, _, a)
                                }
                                var m = s.getUint32(11 + a, !r);
                                m !== 11 + a && l.default.w(this.TAG, "Invalid PrevTagSize " + m),
                                    n += 11 + a + 4
                            } else
                                l.default.w(this.TAG, "Unsupported tag type " + o + ", skipped"),
                                    n += 11 + a + 4
                        }
                        return this._isInitialMetadataDispatched() && this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack),
                            this._videoArrivalTime.length > 0 && this._onVidelArrivalTime && this.onVideoArrivalTime(this._videoArrivalTime.splice(0, this._videoArrivalTime.length)),
                            n
                    }
                }, {
                    key: "_parseScriptData",
                    value: function (e, t, i) {
                        var n = f.default.parseScriptData(e, t, i);
                        if (n.hasOwnProperty("onMetaData")) {
                            if (null == n.onMetaData || "object" !== o(n.onMetaData))
                                return void l.default.w(this.TAG, "Invalid onMetaData structure!");
                            var r = !0;
                            this._metadata && (r = !1,
                                l.default.w(this.TAG, "Found another onMetaData tag!")),
                                this._metadata = n;
                            var s = this._metadata.onMetaData;
                            if ("boolean" == typeof s.hasAudio && !1 === this._hasAudioFlagOverrided && (this._hasAudio = s.hasAudio,
                                this._mediaInfo.hasAudio = this._hasAudio),
                                "boolean" == typeof s.hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = s.hasVideo,
                                    this._mediaInfo.hasVideo = this._hasVideo),
                                "number" == typeof s.audiodatarate && (this._mediaInfo.audioDataRate = s.audiodatarate),
                                "number" == typeof s.videodatarate && (this._mediaInfo.videoDataRate = s.videodatarate),
                                "number" == typeof s.width && (this._mediaInfo.width = s.width),
                                "number" == typeof s.height && (this._mediaInfo.height = s.height),
                                "number" == typeof s.duration) {
                                if (!this._durationOverrided) {
                                    var a = Math.floor(s.duration * this._timescale);
                                    this._duration = a,
                                        this._mediaInfo.duration = a
                                }
                            } else
                                this._mediaInfo.duration = 0;
                            if ("number" == typeof s.framerate) {
                                var u = Math.floor(1e3 * s.framerate);
                                if (u > 0) {
                                    var d = u / 1e3;
                                    this._referenceFrameRate.fixed = !0,
                                        this._referenceFrameRate.fps = d,
                                        this._referenceFrameRate.fps_num = u,
                                        this._referenceFrameRate.fps_den = 1e3,
                                        this._mediaInfo.fps = d
                                }
                            }
                            if ("object" === o(s.keyframes)) {
                                this._mediaInfo.hasKeyframesIndex = !0;
                                var h = s.keyframes;
                                this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(h),
                                    s.keyframes = null
                            } else
                                this._mediaInfo.hasKeyframesIndex = !1;
                            this._dispatch = !1,
                                this._mediaInfo.metadata = s,
                                r && l.default.v(this.TAG, "Parsed onMetaData", !0),
                                this._mediaInfo.isComplete() && this._onMediaInfo(this._mediaInfo)
                        }
                    }
                }, {
                    key: "_parseKeyframesIndex",
                    value: function (e) {
                        for (var t = [], i = [], n = 1; n < e.times.length; n++) {
                            var r = this._timestampBase + Math.floor(1e3 * e.times[n]);
                            t.push(r),
                                i.push(e.filepositions[n])
                        }
                        return {
                            times: t,
                            filepositions: i
                        }
                    }
                }, {
                    key: "_parseAudioData",
                    value: function (e, t, i, n) {
                        if (1 >= i)
                            return void l.default.w(this.TAG, "Flv: Invalid audio packet, missing SoundData payload!");
                        if (!0 !== this._hasAudioFlagOverrided || !1 !== this._hasAudio) {
                            var r = (this._littleEndian,
                                new DataView(e, t, i))
                                , s = r.getUint8(0)
                                , o = s >>> 4;
                            if (2 !== o && 10 !== o)
                                return void this._onError(v.default.CODEC_UNSUPPORTED, "Flv: Unsupported audio codec idx: " + o);
                            var a = 0
                                , u = (12 & s) >>> 2;
                            if (!(u >= 0 && 4 >= u))
                                return void this._onError(v.default.FORMAT_ERROR, "Flv: Invalid audio sample rate idx: " + u);
                            a = this._flvSoundRateTable[u];
                            var d = (2 & s) >>> 1
                                , h = 1 & s
                                , c = this._audioMetadata
                                , f = this._audioTrack;
                            if (c || (!1 === this._hasAudio && !1 === this._hasAudioFlagOverrided && (this._hasAudio = !0,
                                this._mediaInfo.hasAudio = !0),
                                c = this._audioMetadata = {},
                                c.type = "audio",
                                c.id = f.id,
                                c.timescale = this._timescale,
                                c.duration = this._duration,
                                c.audioSampleRate = a,
                                c.flvSoundRate = a,
                                c.flvSoundSize = d,
                                c.flvSoundType = h,
                                c.channelCount = 0 === h ? 1 : 2),
                                10 === o) {
                                var _ = this._parseAACAudioData(e, t + 1, i - 1);
                                if (void 0 == _)
                                    return;
                                if (0 === _.packetType) {
                                    var m = !0;
                                    c.config && (m = !1);
                                    var p = _.data;
                                    c.audioSampleRate = p.samplingRate,
                                        c.channelCount = p.channelCount,
                                        c.codec = p.codec,
                                        c.originalCodec = p.originalCodec,
                                        c.refSampleDuration = 1024 / c.audioSampleRate * c.timescale,
                                        c.config = p.config,
                                        m && l.default.v(this.TAG, "Parsed AudioSpecificConfig", !0),
                                        this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._audioInitialMetadataDispatched = !0,
                                        this._dispatch = !1,
                                        this._onTrackMetadata("audio", c);
                                    var y = this._mediaInfo;
                                    y.audioCodec = c.originalCodec,
                                        y.audioSampleRate = c.audioSampleRate,
                                        y.audioChannelCount = c.channelCount,
                                        y.hasVideo ? null != y.videoCodec && (y.mimeType = 'video/x-flv; codecs="' + y.videoCodec + "," + y.audioCodec + '"') : y.mimeType = 'video/x-flv; codecs="' + y.audioCodec + '"',
                                        y.isComplete() && this._onMediaInfo(y)
                                } else if (1 === _.packetType) {
                                    var g = this._timestampBase + n;
                                    if (g < this._audioLastDts)
                                        this._invalidTSOccur || this._onError(v.default.AUDIO_TIME_STAMP_INVALID, "无效的音频时间戳 preDts:" + this._audioLastDts + ", newDts:" + g),
                                            this._invalidTSOccur = !0;
                                    else if (!this.ignoreAudio) {
                                        var b = {
                                            unit: _.data,
                                            dts: g,
                                            pts: g
                                        };
                                        this._audioLastDts = g,
                                            f.samples.push(b),
                                            f.length += _.data.length
                                    }
                                } else
                                    l.default.e(this.TAG, "Flv: Unsupported AAC data type " + _.packetType)
                            } else if (2 === o) {
                                if (!c.codec) {
                                    var S = this._parseMP3AudioData(e, t + 1, i - 1, !0);
                                    if (void 0 == S)
                                        return;
                                    c.audioSampleRate = S.samplingRate,
                                        c.channelCount = S.channelCount,
                                        c.codec = S.codec,
                                        c.originalCodec = S.originalCodec,
                                        c.refSampleDuration = 1152 / c.audioSampleRate * c.timescale,
                                        l.default.v(this.TAG, "Parsed MPEG Audio Frame Header:" + JSON.stringify(c)),
                                        this._audioInitialMetadataDispatched = !0,
                                        this._onTrackMetadata("audio", c);
                                    var E = this._mediaInfo;
                                    E.audioCodec = c.codec,
                                        E.audioSampleRate = c.audioSampleRate,
                                        E.audioChannelCount = c.channelCount,
                                        E.audioDataRate = S.bitRate,
                                        E.hasVideo ? null != E.videoCodec && (E.mimeType = 'video/x-flv; codecs="' + E.videoCodec + "," + E.audioCodec + '"') : E.mimeType = 'video/x-flv; codecs="' + E.audioCodec + '"',
                                        E.isComplete() && this._onMediaInfo(E)
                                }
                                var k = this._parseMP3AudioData(e, t + 1, i - 1, !1);
                                if (void 0 == k)
                                    return;
                                var O = this._timestampBase + n;
                                if (O < this._audioLastDts)
                                    this._invalidTSOccur || this._onError(v.default.AUDIO_TIME_STAMP_INVALID, "无效的音频时间戳 preDts:" + this._audioLastDts + ", newDts:" + O),
                                        this._invalidTSOccur = !0;
                                else if (!this.ignoreAudio) {
                                    var w = {
                                        unit: k,
                                        dts: O,
                                        pts: O
                                    };
                                    f.samples.push(w),
                                        f.length += k.length
                                }
                            }
                        }
                    }
                }, {
                    key: "_parseAACAudioData",
                    value: function (e, t, i) {
                        if (1 >= i)
                            return void l.default.w(this.TAG, "Flv: Invalid AAC packet, missing AACPacketType or/and Data!");
                        var n = {}
                            , r = new Uint8Array(e, t, i);
                        return n.packetType = r[0],
                            n.data = 0 === r[0] ? this._parseAACAudioSpecificConfig(e, t + 1, i - 1) : r.subarray(1),
                            n
                    }
                }, {
                    key: "_parseAACAudioSpecificConfig",
                    value: function (e, t, i) {
                        var n = new Uint8Array(e, t, i)
                            , r = null
                            , s = 0
                            , o = 0
                            , a = 0
                            , u = null
                            , d = 0;
                        if (s = o = (248 & n[0]) >>> 3,
                            (a = (7 & n[0]) << 1 | n[1] >>> 7) < 0 || a >= this._mpegSamplingRates.length)
                            return void this._onError(v.default.FORMAT_ERROR, "Flv: AAC invalid sampling frequency index!");
                        var h = n[1] >>> 3 & 15;
                        if (0 > h || h >= 8)
                            return void this._onError(v.default.FORMAT_ERROR, "Flv: AAC invalid channel configuration");
                        n[1],
                            n[1],
                            n[1],
                            5 === s && (u = (7 & n[1]) << 1 | n[2] >>> 7,
                                n[2]);
                        var l = self.navigator.userAgent.toLowerCase();
                        return -1 !== l.indexOf("firefox") ? a >= 6 ? (s = 5,
                            r = new Array(4),
                            u = a - 3) : (s = 2,
                                r = new Array(2),
                                u = a) : -1 !== l.indexOf("android") ? (s = 2,
                                    r = new Array(2),
                                    u = a) : (s = 5,
                                        u = a,
                                        r = new Array(4),
                                        a >= 6 ? u = a - 3 : 1 === h && (s = 2,
                                            r = new Array(2),
                                            u = a)),
                            d = this._mpegSamplingRates[a],
                            r[0] = s << 3,
                            r[0] |= (15 & a) >>> 1,
                            r[1] = (15 & a) << 7,
                            r[1] |= (15 & h) << 3,
                            5 === s && (r[1] |= (15 & u) >>> 1,
                                r[2] = (1 & u) << 7,
                                r[2] |= 8,
                                r[3] = 0),
                            {
                                config: r,
                                samplingRate: d,
                                channelCount: h,
                                codec: "mp4a.40." + s,
                                originalCodec: "mp4a.40." + o
                            }
                    }
                }, {
                    key: "_parseMP3AudioData",
                    value: function (e, t, i, n) {
                        if (4 > i)
                            return void l.default.w(this.TAG, "Flv: Invalid MP3 packet, header missing!");
                        var r = (this._littleEndian,
                            new Uint8Array(e, t, i))
                            , s = null;
                        if (n) {
                            if (255 !== r[0])
                                return;
                            var o = r[1] >>> 3 & 3
                                , a = (6 & r[1]) >> 1
                                , u = (240 & r[2]) >>> 4
                                , d = (12 & r[2]) >>> 2
                                , h = r[3] >>> 6 & 3
                                , c = 3 !== h ? 2 : 1
                                , f = 0
                                , _ = 0;
                            switch (o) {
                                case 0:
                                    f = this._mpegAudioV25SampleRateTable[d];
                                    break;
                                case 2:
                                    f = this._mpegAudioV20SampleRateTable[d];
                                    break;
                                case 3:
                                    f = this._mpegAudioV10SampleRateTable[d]
                            }
                            switch (a) {
                                case 1:
                                    u < this._mpegAudioL3BitRateTable.length && (_ = this._mpegAudioL3BitRateTable[u]);
                                    break;
                                case 2:
                                    u < this._mpegAudioL2BitRateTable.length && (_ = this._mpegAudioL2BitRateTable[u]);
                                    break;
                                case 3:
                                    u < this._mpegAudioL1BitRateTable.length && (_ = this._mpegAudioL1BitRateTable[u])
                            }
                            s = {
                                bitRate: _,
                                samplingRate: f,
                                channelCount: c,
                                codec: "mp3",
                                originalCodec: "mp3"
                            }
                        } else
                            s = r;
                        return s
                    }
                }, {
                    key: "_parseVideoData",
                    value: function (e, t, i, n, r) {
                        if (1 >= i)
                            return void l.default.w(this.TAG, "Flv: Invalid video packet, missing VideoData payload!");
                        if (!0 !== this._hasVideoFlagOverrided || !1 !== this._hasVideo) {
                            var s = new Uint8Array(e, t, i)[0]
                                , o = (240 & s) >>> 4
                                , a = 15 & s;
                            if (7 !== a)
                                return void this._onError(v.default.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: " + a);
                            this._parseAVCVideoPacket(e, t + 1, i - 1, n, r, o)
                        }
                    }
                }, {
                    key: "_parseAVCVideoPacket",
                    value: function (e, t, i, n, r, s) {
                        if (4 > i)
                            return void l.default.w(this.TAG, "Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime");
                        var o = this._littleEndian
                            , a = new DataView(e, t, i)
                            , u = a.getUint8(0)
                            , d = 16777215 & a.getUint32(0, !o);
                        if (0 === u)
                            this._parseAVCDecoderConfigurationRecord(e, t + 4, i - 4);
                        else if (1 === u)
                            this._parseAVCVideoData(e, t + 4, i - 4, n, r, s, d);
                        else if (2 !== u)
                            return void this._onError(v.default.FORMAT_ERROR, "Flv: Invalid video packet type " + u)
                    }
                }, {
                    key: "_resolveAVCHeaderTag",
                    value: function (e, t, i) {
                        var n = {}
                            , r = this._littleEndian
                            , s = new DataView(e, t, i)
                            , o = s.getUint8(0)
                            , a = s.getUint8(1);
                        if (s.getUint8(2),
                            s.getUint8(3),
                            1 !== o || 0 === a)
                            throw new v.default(v.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord");
                        if (this._naluLengthSize = 1 + (3 & s.getUint8(4)),
                            3 !== this._naluLengthSize && 4 !== this._naluLengthSize)
                            throw new v.default(v.default.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1));
                        var u = 31 & s.getUint8(5);
                        if (0 === u)
                            throw new v.default(v.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord: No SPS");
                        u > 1 && l.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: SPS Count = " + u);
                        for (var h = 6, c = 0; u > c; c++) {
                            var f = s.getUint16(h, !r);
                            if (h += 2,
                                0 !== f) {
                                var _ = new Uint8Array(e, t + h, f);
                                h += f,
                                    d.default.safari || 52 === _[3] && (_[3] = 31);
                                var p = m.default.parseSPS(_);
                                if (0 === c) {
                                    n.codecWidth = p.codec_size.width,
                                        n.codecHeight = p.codec_size.height,
                                        n.presentWidth = p.present_size.width,
                                        n.presentHeight = p.present_size.height,
                                        n.profile = p.profile_string,
                                        n.level = p.level_string,
                                        n.bitDepth = p.bit_depth,
                                        n.chromaFormat = p.chroma_format,
                                        n.chroma_format_string = p.chroma_format_string,
                                        n.sarRatio = p.sar_ratio,
                                        n.frameRate = p.frame_rate,
                                        !1 !== p.frame_rate.fixed && 0 !== p.frame_rate.fps_num && 0 !== p.frame_rate.fps_den || (n.frameRate = this._referenceFrameRate);
                                    var y = n.frameRate.fps_den
                                        , g = n.frameRate.fps_num;
                                    n.refSampleDuration = n.timescale * (y / g);
                                    for (var b = _.subarray(1, 4), S = "avc1.", E = 0; 3 > E; E++) {
                                        var k = b[E].toString(16);
                                        k.length < 2 && (k = "0" + k),
                                            S += k
                                    }
                                    n.codec = S
                                }
                            }
                        }
                        var O = s.getUint8(h);
                        if (0 === O)
                            throw new v.default(v.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord: No PPS");
                        O > 1 && l.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: PPS Count = " + O),
                            h++;
                        for (var w = 0; O > w; w++) {
                            var L = s.getUint16(h, !r);
                            h += 2,
                                0 !== L && (h += L)
                        }
                        return n
                    }
                }, {
                    key: "_parseAVCDecoderConfigurationRecord",
                    value: function (e, t, i) {
                        if (7 > i)
                            return void l.default.w(this.TAG, "Flv: Invalid AVCDecoderConfigurationRecord, lack of data!");
                        var n = this._videoMetadata
                            , r = void 0
                            , s = this._videoTrack
                            , o = !0;
                        n ? void 0 !== n.avcc && (o = !1,
                            l.default.w(this.TAG, "Found another AVCDecoderConfigurationRecord!")) : (!1 === this._hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = !0,
                                this._mediaInfo.hasVideo = !0),
                                n = this._videoMetadata = {},
                                n.type = "video",
                                n.id = s.id,
                                n.timescale = this._timescale,
                                n.duration = this._duration);
                        try {
                            r = this._resolveAVCHeaderTag(e, t, i)
                        } catch (e) {
                            return void this._onError(e.type, e.message)
                        }
                        n = Object.assign(n, r);
                        var a = this._mediaInfo;
                        a.width = n.codecWidth,
                            a.height = n.codecHeight,
                            a.fps = n.frameRate.fps,
                            a.profile = n.profile,
                            a.level = n.level,
                            a.chromaFormat = n.chroma_format_string,
                            a.sarNum = n.sarRatio.width,
                            a.sarDen = n.sarRatio.height,
                            a.videoCodec = n.codec,
                            a.hasAudio ? null != a.audioCodec && (a.mimeType = 'video/x-flv; codecs="' + a.videoCodec + "," + a.audioCodec + '"') : a.mimeType = 'video/x-flv; codecs="' + a.videoCodec + '"',
                            a.isComplete() && this._onMediaInfo(a),
                            n.avcc = new Uint8Array(i),
                            n.avcc.set(new Uint8Array(e, t, i), 0),
                            o && l.default.v(this.TAG, "Parsed AVC config", !0);
                        var u = null;
                        this._config.enableStallDetect && (r = this._resolveAVCHeaderTag(this.DUMMY_AVC_DATA.buffer, 0, this.DUMMY_AVC_DATA.byteLength),
                            u = Object.assign({}, n),
                            u = Object.assign(u, r),
                            u.avcc = this.DUMMY_AVC_DATA),
                            this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._videoInitialMetadataDispatched = !0,
                            this._dispatch = !1,
                            this._onTrackMetadata("video", n, u)
                    }
                }, {
                    key: "_parseAVCVideoData",
                    value: function (e, t, i, n, r, s, o) {
                        var a = this._littleEndian
                            , u = new DataView(e, t, i)
                            , d = 0;
                        i > 4 && 2 === s && (d = u.getUint8(4));
                        var h = []
                            , c = 0
                            , f = []
                            , _ = 0
                            , m = 0
                            , p = this._naluLengthSize
                            , y = this._timestampBase + n
                            , g = 1 === s;
                        if (6 == (d &= 31)) {
                            for (var b = 0, S = 0, E = 5; E < u.byteLength && b % 255 == 0;)
                                b += u.getUint8(E),
                                    E++;
                            for (; E < u.byteLength && S % 255 == 0;)
                                S += u.getUint8(E),
                                    E++;
                            if (S > 9) {
                                var k = u.getUint8(E + S - 8)
                                    , O = u.getUint8(E + S - 7)
                                    , w = u.getUint8(E + S - 6)
                                    , L = u.getUint8(E + S - 5)
                                    , A = u.getUint8(E + S - 4)
                                    , T = u.getUint8(E + S - 3)
                                    , R = u.getUint8(E + S - 2)
                                    , D = u.getUint8(E + S - 1);
                                if (90 == k && 234 == O && 21 == w && 22 == L && 201 == A && 245 == T && 72 == R && 193 == D) {
                                    var x = u.getUint8(E + S - 10) << 8 | u.getUint8(E + S - 9)
                                        , C = 31 & u.getUint8(E)
                                        , I = new Uint8Array(e, t + E + 1, x - 1);
                                    if (31 === C || 30 === C || 29 === C) {
                                        var M = {
                                            dts: y,
                                            data: I
                                        };
                                        this._videoTrack.extends.push(M)
                                    }
                                }
                            }
                        }
                        if (31 === d || 30 === d || 29 === d) {
                            var P = new Uint8Array(e, t + 5, i - 5)
                                , B = {
                                    dts: y,
                                    data: P
                                };
                            this._videoTrack.extends.push(B)
                        } else if (y < this._videoLastDts)
                            this._invalidTSOccur || this._onError(v.default.VIDEO_TIME_STAMP_INVALID, "无效的视频时间戳 preDts:" + this._videoLastDts + ", newDts:" + y),
                                this._invalidTSOccur = !0;
                        else if (!this.ignoreVideo) {
                            this._videoLastDts = y;
                            for (var U = (new Date).getTime(); i > m;) {
                                if (m + 4 >= i) {
                                    l.default.w(this.TAG, "Malformed Nalu near timestamp " + y + ", offset = " + m + ", dataSize = " + i);
                                    break
                                }
                                var j = u.getUint32(m, !a);
                                if (3 === p && (j >>>= 8),
                                    j > i - p)
                                    return void l.default.w(this.TAG, "Malformed Nalus near timestamp " + y + ", NaluSize > DataSize!");
                                var N = 31 & u.getUint8(m + p);
                                5 === N && (g = !0);
                                var F = new Uint8Array(e, t + m, p + j)
                                    , V = {
                                        type: N,
                                        data: F
                                    };
                                if (h.push(V),
                                    c += F.byteLength,
                                    this._config.enableStallDetect) {
                                    var G = void 0;
                                    G = this._flagFrame ? this.DUMMY_BLUE_FRAME_NALU : this.DUMMY_RED_FRAME_NALU;
                                    var z = {
                                        type: N,
                                        data: G
                                    };
                                    f.push(z),
                                        _ += z.data.byteLength,
                                        this._flagFrame = !this._flagFrame
                                }
                                m += p + j,
                                    this._videoArrivalTime.push(U)
                            }
                        }
                        if (h.length) {
                            var H = this._videoTrack
                                , q = {
                                    units: h,
                                    length: c,
                                    units_dummy: f,
                                    length_dummy: _,
                                    isKeyframe: g,
                                    dts: y,
                                    cts: o,
                                    pts: y + o
                                };
                            g && (q.fileposition = r),
                                H.samples.push(q),
                                H.length += c,
                                H.length_dummy += _
                        }
                    }
                }, {
                    key: "onTrackMetadata",
                    get: function () {
                        return this._onTrackMetadata
                    },
                    set: function (e) {
                        this._onTrackMetadata = e
                    }
                }, {
                    key: "onVideoArrivalTime",
                    get: function () {
                        return this._onVidelArrivalTime
                    },
                    set: function (e) {
                        this._onVidelArrivalTime = e
                    }
                }, {
                    key: "onMediaInfo",
                    get: function () {
                        return this._onMediaInfo
                    },
                    set: function (e) {
                        this._onMediaInfo = e
                    }
                }, {
                    key: "onError",
                    get: function () {
                        return this._onError
                    },
                    set: function (e) {
                        this._onError = e
                    }
                }, {
                    key: "onDataAvailable",
                    get: function () {
                        return this._onDataAvailable
                    },
                    set: function (e) {
                        this._onDataAvailable = e
                    }
                }, {
                    key: "timestampBase",
                    get: function () {
                        return this._timestampBase
                    },
                    set: function (e) {
                        this._timestampBase = e
                    }
                }, {
                    key: "overridedDuration",
                    get: function () {
                        return this._duration
                    },
                    set: function (e) {
                        this._durationOverrided = !0,
                            this._duration = e,
                            this._mediaInfo.duration = e
                    }
                }, {
                    key: "overridedHasAudio",
                    set: function (e) {
                        this._hasAudioFlagOverrided = !0,
                            this._hasAudio = e,
                            this._mediaInfo.hasAudio = e
                    }
                }, {
                    key: "overridedHasVideo",
                    set: function (e) {
                        this._hasVideoFlagOverrided = !0,
                            this._hasVideo = e,
                            this._mediaInfo.hasVideo = e
                    }
                }], [{
                    key: "probe",
                    value: function (e) {
                        var t = new Uint8Array(e)
                            , i = {
                                match: !1
                            };
                        if (70 !== t[0] || 76 !== t[1] || 86 !== t[2] || 1 !== t[3])
                            return i;
                        var n = (4 & t[4]) >>> 2 != 0
                            , r = 0 != (1 & t[4])
                            , o = s(t, 5);
                        return 9 > o ? i : {
                            match: !0,
                            consumed: o,
                            dataOffset: o,
                            hasAudioTrack: n,
                            hasVideoTrack: r
                        }
                    }
                }]),
                    e
            }();
        i.default = S
    }
        , {
        "../core/media-info.js": 7,
        "../utils/browser.js": 42,
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "./amf-parser.js": 15,
        "./demux-errors.js": 16,
        "./sps-parser.js": 21
    }],
    19: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function s(e, t) {
            return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , a = e("../utils/utf8-conv.js")
            , u = (n(a),
                e("../utils/logger.js"))
            , d = n(u)
            , h = e("./mp4-file.js")
            , l = function () {
                function e(t) {
                    r(this, e),
                        this.TAG = "MP4Demuxer",
                        this.mp4File = new h.MP4File(t),
                        this.mp4File.onParseSample = this._onParseSample.bind(this),
                        this.mp4File.onParseRootBox = this._onParseRootBox.bind(this),
                        this.mp4File.onExtendData = this._onExtendData.bind(this),
                        this.mp4File.onParseComplete = this._onComplete.bind(this),
                        this._playType = t,
                        this.ftyp = null,
                        this.moov = null,
                        this._onInitSegment = null,
                        this._onTrackSegment = null,
                        this._onParseComplete = null,
                        this._onParseExtendData = null,
                        this._sequnceNumber = 0
                }
                return o(e, [{
                    key: "destroy",
                    value: function () {
                        this.ftyp = null,
                            this.moov = null,
                            this.mp4File.disableParse(),
                            this._onInitSegment = null,
                            this._onTrackSegment = null,
                            this._onParseComplete = null,
                            this._onParseExtendData = null,
                            this._sequnceNumber = 0
                    }
                }, {
                    key: "parseChunks",
                    value: function (e, t) {
                        return this.mp4File.parse(e, 0, e.byteLength - 1, t)
                    }
                }, {
                    key: "getLeftMostSampleBeginByte",
                    value: function (e) {
                        return this.mp4File.getLeftMostSampleBeginByte(e)
                    }
                }, {
                    key: "seek",
                    value: function (e) {
                        return this.mp4File.seek(e)
                    }
                }, {
                    key: "_onParseRootBox",
                    value: function (e) {
                        d.default.d(this.TAG, "onParseRootBox " + e.boxType),
                            "ftyp" === e.boxType ? (this.ftyp = e,
                                this._decodeInitSegment()) : "moov" === e.boxType && (this.moov = e,
                                    this._decodeInitSegment())
                    }
                }, {
                    key: "_decodeInitSegment",
                    value: function () {
                        if (this.ftyp && this.moov) {
                            for (var e = this.moov.tracks.length, t = 0, i = 0, n = 0; e > n; n++) {
                                var r = this.moov.tracks[n].tkhd;
                                0 !== t && 0 !== i || (t = r.trackWidth,
                                    i = r.trackheight)
                            }
                            var o = s(this.moov.mvhd.duration, 0) / s(this.moov.mvhd.timescale, 0) * 1e3
                                , a = this.ftyp.decode()
                                , u = this.moov.decode(this._playType)
                                , h = new Uint8Array(a.byteLength + u.byteLength);
                            h.set(a, 0),
                                h.set(u, a.byteLength),
                                d.default.d(this.TAG, "create head box success, ftyp length=" + a.byteLength + ", moovBytes length=" + u.byteLength),
                                this.mp4File.enableParse(),
                                this._onInitSegment && this._onInitSegment(h, {
                                    width: t,
                                    height: i,
                                    duration: o,
                                    videoCodec: this.mp4File.sampleInfo.videoCodec,
                                    audioCodec: "mp4a.40.5"
                                })
                        }
                    }
                }, {
                    key: "_onParseSample",
                    value: function (e, t) {
                        var i = this._remuxVideo(e)
                            , n = this._remuxAudio(t);
                        this._onTrackSegment && this._onTrackSegment(i, n)
                    }
                }, {
                    key: "_remuxVideo",
                    value: function (e) {
                        if (e.samples.length > 0 && ("video" === this._playType || "all" === this._playType)) {
                            this._sequnceNumber += 1;
                            for (var t = {
                                sequenceNumber: this._sequnceNumber,
                                trackId: e.id,
                                baseMediaDecodeTime: e.samples[0].dts,
                                samples: []
                            }, i = 0, n = 0, r = new Uint8Array(e.length), s = 0; s < e.samples.length; s++) {
                                r.set(e.samples[s].unit, n),
                                    n += e.samples[s].unit.byteLength;
                                var o = e.samples[s].isKeyframe
                                    , a = {
                                        flags: {
                                            isLeading: 0,
                                            dependsOn: o ? 2 : 1,
                                            isDependedOn: o ? 1 : 0,
                                            hasRedundancy: 0,
                                            isNonSync: o ? 0 : 1
                                        },
                                        size: e.samples[s].unit.byteLength,
                                        duration: e.samples[s].duration,
                                        cts: 0
                                    };
                                i += e.samples[s].duration,
                                    t.samples.push(a)
                            }
                            e.samples.splice(0, e.samples.length),
                                e.length = 0;
                            var u = new h.MovieFragmentBox(t)
                                , d = u.decode()
                                , l = h.MediaDataBox.createByBytes(r)
                                , c = l.decode()
                                , f = new Uint8Array(d.byteLength + c.byteLength);
                            return f.set(d, 0),
                                f.set(c, d.byteLength),
                                {
                                    runBox: f,
                                    baseMediaDecodeTime: t.baseMediaDecodeTime,
                                    runDuration: i,
                                    seq: this._sequnceNumber,
                                    type: "video"
                                }
                        }
                        return null
                    }
                }, {
                    key: "_remuxAudio",
                    value: function (e) {
                        if (e.samples.length > 0 && ("audio" === this._playType || "all" === this._playType)) {
                            this._sequnceNumber += 1;
                            for (var t = {
                                sequenceNumber: this._sequnceNumber,
                                trackId: e.id,
                                baseMediaDecodeTime: e.samples[0].dts,
                                samples: []
                            }, i = new Uint8Array(e.length), n = 0, r = 0, s = 0; s < e.samples.length; s++) {
                                i.set(e.samples[s].unit, r),
                                    r += e.samples[s].unit.byteLength;
                                var o = {
                                    flags: {
                                        isLeading: 0,
                                        dependsOn: 1,
                                        isDependedOn: 0,
                                        hasRedundancy: 0,
                                        isNonSync: 0
                                    },
                                    size: e.samples[s].unit.byteLength,
                                    duration: e.samples[s].duration,
                                    cts: 0
                                };
                                n += e.samples[s].duration,
                                    t.samples.push(o)
                            }
                            e.samples.splice(0, e.samples.length),
                                e.length = 0;
                            var a = new h.MovieFragmentBox(t)
                                , u = a.decode()
                                , d = h.MediaDataBox.createByBytes(i)
                                , l = d.decode()
                                , c = new Uint8Array(u.byteLength + l.byteLength);
                            return c.set(u, 0),
                                c.set(l, u.byteLength),
                                {
                                    runBox: c,
                                    baseMediaDecodeTime: t.baseMediaDecodeTime,
                                    runDuration: n,
                                    seq: this._sequnceNumber,
                                    type: "audio"
                                }
                        }
                        return null
                    }
                }, {
                    key: "_onComplete",
                    value: function () {
                        this._onParseComplete && this._onParseComplete()
                    }
                }, {
                    key: "_onExtendData",
                    value: function (e) {
                        this._onParseExtendData && this._onParseExtendData(e)
                    }
                }, {
                    key: "onInitSegment",
                    set: function (e) {
                        this._onInitSegment = e
                    }
                }, {
                    key: "onTrackSegment",
                    set: function (e) {
                        this._onTrackSegment = e
                    }
                }, {
                    key: "onParseComplete",
                    set: function (e) {
                        this._onParseComplete = e
                    }
                }, {
                    key: "onParseExtendData",
                    set: function (e) {
                        this._onParseExtendData = e
                    }
                }, {
                    key: "onParseCodec",
                    set: function (e) {
                        this._onParseCodec = e
                    }
                }]),
                    e
            }();
        i.default = l
    }
        , {
        "../utils/logger.js": 44,
        "../utils/utf8-conv.js": 48,
        "./mp4-file.js": 20
    }],
    20: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function s(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        function o(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function a(e, t, i, n, r) {
            for (var s = 0; r > s; s++)
                if (t instanceof Uint8Array)
                    e[i++] = t[n++];
                else {
                    if (!(t instanceof DataView))
                        throw new v.RuntimeException("source type not supported");
                    e[i++] = t.getUint8(n++)
                }
        }
        function u(e, t) {
            return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.MovieFragmentBox = i.TrackExtendsBox = i.MovieExtendsHeaderBox = i.MovieExtendsBox = i.SyncSampleBox = i.SampleToChunkBox = i.SampleSizeBox = i.SampleDescriptionBox = i.ChunkOffsetBox = i.TimeToSampleBox = i.SampleTableBox = i.SoundMediaHeaderBox = i.VideoMediaHeaderBox = i.DataInformationBox = i.MediaInformationBox = i.HandlerBox = i.MediaHeaderBox = i.MediaBox = i.TrackHeaderBox = i.EditBox = i.TrackBox = i.MovieHeaderBox = i.MovieBox = i.MediaDataBox = i.FreeBox = i.FileTypeBox = i.MP4BoxParser = i.FullBox = i.Box = i.MP4File = void 0;
        var d = function e(t, i, n) {
            null === t && (t = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(t, i);
            if (void 0 === r) {
                var s = Object.getPrototypeOf(t);
                return null === s ? void 0 : e(s, i, n)
            }
            if ("value" in r)
                return r.value;
            var o = r.get;
            return void 0 !== o ? o.call(n) : void 0
        }
            , h = function () {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function (t, i, n) {
                    return i && e(t.prototype, i),
                        n && e(t, n),
                        t
                }
            }()
            , l = e("../utils/utf8-conv.js")
            , c = n(l)
            , f = e("../utils/algorithm.js")
            , _ = n(f)
            , m = e("../utils/logger.js")
            , p = n(m)
            , v = e("../utils/exception.js")
            , y = (e("../remux/mp4-generator"),
                "mp4-file")
            , g = (i.MP4File = function () {
                function e(t) {
                    o(this, e),
                        this._playType = t,
                        this.ftypBox = null,
                        this.moovBox = null,
                        this.mdatBox = null,
                        this._boxParser = new S,
                        this.extendData = [],
                        this.sampleInfo = {
                            video: [],
                            audio: [],
                            sequenceNumber: 0,
                            keyFrames: [],
                            videoCodec: "",
                            audioCodec: ""
                        },
                        this._videoTrack = {
                            type: "video",
                            id: 1,
                            sequenceNumber: 1,
                            samples: [],
                            length: 0
                        },
                        this._audioTrack = {
                            type: "audio",
                            id: 2,
                            sequenceNumber: 1,
                            samples: [],
                            length: 0
                        },
                        this._videoParsingIndex = 0,
                        this._audioParsingIndex = 0,
                        this._onParseRootBox = null,
                        this._onParseSample = null,
                        this._onExtendData = null,
                        this._onParseComplete = null,
                        this._enableParse = !1
                }
                return h(e, [{
                    key: "enableParse",
                    value: function () {
                        this._enableParse = !0,
                            this._doParse()
                    }
                }, {
                    key: "disableParse",
                    value: function () {
                        this._enableParse = !1
                    }
                }, {
                    key: "parse",
                    value: function (e, t, i, n) {
                        var r = this._boxParser.parse(e, t, i, n)
                            , s = r[0]
                            , o = r[1];
                        if (o) {
                            var a = !1;
                            switch (o.boxType) {
                                case "ftyp":
                                    a = !0,
                                        this.ftypBox = o;
                                    break;
                                case "moov":
                                    a = !0,
                                        this.moovBox = o,
                                        this._analyzeMoov();
                                    break;
                                case "mdat":
                                    null == this.mdatBox && p.default.w(y, "receive mdatBox byte"),
                                        this.mdatBox = o,
                                        this.mdatBox.isComplete && (a = !0)
                            }
                            a && this._onParseRootBox && this._onParseRootBox(o)
                        }
                        return s
                    }
                }, {
                    key: "getLeftMostSampleBeginByte",
                    value: function (e) {
                        var t = _.default.binaryNearestSearch(this.sampleInfo.keyFrames, e, {
                            sourceKeyName: "timestamp",
                            targetKeyName: null
                        })
                            , i = _.default.binaryNearestSearch(this.sampleInfo.audio, e, {
                                sourceKeyName: "timestamp",
                                targetKeyName: null
                            })
                            , n = this.sampleInfo.keyFrames[t]
                            , r = this.sampleInfo.audio[i];
                        return this._videoParsingIndex = n.sampleIndex,
                            this._audioParsingIndex = r.sampleIndex,
                            p.default.w(y, "preVideoSample dts:" + n.timestamp + " preAudioSample dts:" + r.timestamp + ", videoBegin:" + n.range.begin + ", audioBegin:" + r.range.begin + ", _videoParsingIndex:" + this._videoParsingIndex + ", _audioParsingIndex:" + this._audioParsingIndex),
                            Math.min(n.range.begin, r.range.begin)
                    }
                }, {
                    key: "seek",
                    value: function (e) {
                        this.mdatBox.adjustWriteOffset(e)
                    }
                }, {
                    key: "_analyzeMoov",
                    value: function () {
                        for (var e = u(this.moovBox.mvhd.duration, 0), t = u(this.moovBox.mvhd.timescale, 0), i = 0; i < this.moovBox.tracks.length; i++) {
                            var n = this.moovBox.tracks[i];
                            switch (n.mdia.hdlr.strSubtype) {
                                case "vide":
                                    p.default.d(y, "开始分析视频track的时空关系"),
                                        this._analyzeTrack(n, "vide", e, t),
                                        p.default.d(y, "分析视频track完毕");
                                    break;
                                case "soun":
                                    p.default.d(y, "开始分析音频track的时空关系"),
                                        this._analyzeTrack(n, "soun", e, t),
                                        p.default.d(y, "分析音频track完毕")
                            }
                        }
                    }
                }, {
                    key: "_analyzeTrack",
                    value: function (e, t, i, n) {
                        var r = "vide" === t ? this.sampleInfo.video : this.sampleInfo.audio
                            , s = e.mdia.mdhd.realTimeScale
                            , o = e.mdia.minf.stbl
                            , a = o.stsd;
                        "vide" === t ? this.sampleInfo.videoCodec = a.entry[0].codec : this.sampleInfo.audioCodec = a.entry[0].codec;
                        for (var u = o.stts, d = o.stss, h = o.stsc, l = o.stsz, c = o.stco, f = 0, _ = 0, m = 0; m < u.entryCount; m++)
                            for (var p = u.sample_count[m], y = Math.floor(u.sample_delta[m] / s * n), g = 0; p > g; g++) {
                                if (l.sampleSize > 0)
                                    throw v.RuntimeException("stsz not support non zego sample size field");
                                var b = 0 === l.sampleSize ? l.entry_size[f] : l.sampleSize
                                    , S = {
                                        type: t,
                                        sampleIndex: f,
                                        sampleSize: b,
                                        range: {},
                                        timestamp: _,
                                        parsed: !1,
                                        duration: 0
                                    };
                                if ("vide" === t) {
                                    var E = d.sample_number.indexOf(f + 1) > -1;
                                    S.isKeyframe = E,
                                        E && this.sampleInfo.keyFrames.push(S)
                                }
                                r.push(S),
                                    r.length > 1 && (r[r.length - 2].duration = r[r.length - 1].timestamp - r[r.length - 2].timestamp),
                                    m == u.entryCount - 1 && g == p - 1 && (r[r.length - 1].duration = Math.abs(i - r[r.length - 1].timestamp)),
                                    f++ ,
                                    _ += y
                            }
                        var k = 0;
                        f = 0;
                        for (var O = h.entryCount, w = 0; O > w; w++)
                            for (var L = h.entry[w].chunk_count, A = h.entry[w].samples_per_chunk, T = 0; L > T; T++) {
                                for (var R = c.chunk_offset[k], D = 0; A > D; D++)
                                    r[f].range.begin = 0 == D ? R : r[f - 1].range.end,
                                        r[f].range.end = r[f].range.begin + r[f].sampleSize,
                                        f++;
                                k++
                            }
                    }
                }, {
                    key: "_analyzeRawData",
                    value: function () {
                        var e = void 0
                            , t = void 0;
                        this._videoParsingIndex >= this.sampleInfo.video.length ? (e = "soun",
                            t = this.sampleInfo.audio) : this._audioParsingIndex >= this.sampleInfo.audio.length ? (e = "vide",
                                t = this.sampleInfo.video) : this.sampleInfo.video[this._videoParsingIndex].range.begin < this.sampleInfo.audio[this._audioParsingIndex].range.begin ? (e = "vide",
                                    t = this.sampleInfo.video) : (e = "soun",
                                        t = this.sampleInfo.audio);
                        var i = "vide" === e ? this._videoParsingIndex : this._audioParsingIndex;
                        if (i < t.length) {
                            var n = t[i];
                            if (this.mdatBox.writeOffset + this.mdatBox.dataOffsetInFile >= n.range.end) {
                                "vide" === e ? this._videoParsingIndex++ : this._audioParsingIndex++;
                                var r = n.range.begin - this.mdatBox.dataOffsetInFile
                                    , s = new Uint8Array(this.mdatBox.data.buffer, r, n.sampleSize);
                                if ("vide" === e) {
                                    for (var o = n.isKeyframe, a = 0; a < n.sampleSize;) {
                                        var d = u(this.mdatBox.data, r + a)
                                            , h = 31 & this.mdatBox.data[r + a + 4];
                                        if ((29 == h || 30 == h || 31 == h) && this._onExtendData) {
                                            var l = new Uint8Array(this.mdatBox.data.buffer, r + a + 5, d - 1);
                                            this._onExtendData({
                                                timestamp: n.timestamp,
                                                rawBytes: l
                                            })
                                        }
                                        a += 4 + d
                                    }
                                    var c = {
                                        unit: s,
                                        dts: n.timestamp,
                                        pts: n.timestamp,
                                        cts: 0,
                                        duration: n.duration,
                                        isKeyframe: o,
                                        filePosition: n.range.begin
                                    };
                                    this._videoTrack.samples.push(c),
                                        this._videoTrack.length += s.byteLength
                                } else if ("soun" === e) {
                                    var f = {
                                        unit: s,
                                        dts: n.timestamp,
                                        pts: n.timestamp,
                                        cts: 0,
                                        duration: n.duration
                                    };
                                    this._audioTrack.samples.push(f),
                                        this._audioTrack.length += s.byteLength
                                }
                                return n.parsed = !0,
                                    !0
                            }
                        }
                        return !1
                    }
                }, {
                    key: "_doParse",
                    value: function () {
                        if (this.mdatBox) {
                            for (var e = 0, t = !0; (this._videoTrack.samples.length < 3 || this._audioTrack.samples.length < 3) && 10 > e && t && (this._videoParsingIndex < this.sampleInfo.video.length || this._audioParsingIndex < this.sampleInfo.audio.length);)
                                e++ ,
                                    t = this._analyzeRawData();
                            this._onParseSample && this._onParseSample(this._videoTrack, this._audioTrack)
                        }
                        this._enableParse && window.requestAnimationFrame(this._doParse.bind(this))
                    }
                }, {
                    key: "onParseRootBox",
                    set: function (e) {
                        this._onParseRootBox = e
                    }
                }, {
                    key: "onParseSample",
                    set: function (e) {
                        this._onParseSample = e
                    }
                }, {
                    key: "onParseComplete",
                    set: function (e) {
                        this._onParseComplete = e
                    }
                }, {
                    key: "onExtendData",
                    set: function (e) {
                        this._onExtendData = e
                    }
                }]),
                    e
            }(),
                i.Box = function () {
                    function e(t, i) {
                        o(this, e),
                            this.boxSize = t,
                            this.boxType = i,
                            this.decodeBoxSize = t,
                            this.decodeOffset = 0
                    }
                    return h(e, [{
                        key: "parse",
                        value: function () {
                            return 0
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = new Uint8Array(this.decodeBoxSize);
                            return new DataView(e.buffer).setUint32(this.decodeOffset, this.decodeBoxSize),
                                this.decodeOffset += 4,
                                e[this.decodeOffset + 0] = this.boxType.charCodeAt(0),
                                e[this.decodeOffset + 1] = this.boxType.charCodeAt(1),
                                e[this.decodeOffset + 2] = this.boxType.charCodeAt(2),
                                e[this.decodeOffset + 3] = this.boxType.charCodeAt(3),
                                this.decodeOffset += 4,
                                e
                        }
                    }]),
                        e
                }())
            , b = i.FullBox = function (e) {
                function t(e, i) {
                    o(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, i));
                    return n.version = new Uint8Array([0]),
                        n.flags = new Uint8Array([0, 0, 0]),
                        n
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            if (this.version[0] = o.getUint8(s++),
                                1 == this.version[0])
                                throw v.RuntimeException("FullBox version 1 not support!");
                            return a(this.flags, o, 0, s, 3),
                                (s += 3) - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e[this.decodeOffset] = this.version,
                                this.decodeOffset += 1,
                                e.set(this.flags, this.decodeOffset),
                                this.decodeOffset += 3,
                                e
                        }
                    }]),
                    t
            }(g)
            , S = i.MP4BoxParser = function () {
                function e() {
                    o(this, e),
                        this.parseingMdat = !1,
                        this.parseingBox = null
                }
                return h(e, null, [{
                    key: "init",
                    value: function () {
                        e.types = {
                            ftyp: E,
                            free: k,
                            moov: w,
                            mdat: O
                        }
                    }
                }]),
                    h(e, [{
                        key: "parse",
                        value: function (t, i, n, r) {
                            var s = -1
                                , o = null
                                , u = i
                                , d = new DataView(t)
                                , h = null;
                            if (this.parseingMdat) {
                                var l = this.parseingBox.parse(t, u, n);
                                u += l,
                                    r += l,
                                    h = this.parseingBox
                            } else if (n - u + 1 > 7)
                                if (s = d.getUint32(u),
                                    u += 4,
                                    o = new Uint8Array(4),
                                    a(o, d, 0, u, 4),
                                    o = c.default(o),
                                    u += 4,
                                    r += 8,
                                    "mdat" == o) {
                                    this.parseingMdat = !0,
                                        this.parseingBox = h = new O(s, r);
                                    var f = h.parse(t, u, n);
                                    u += f
                                } else if (n - u + 1 >= s - 8) {
                                    var _ = e.types[o];
                                    _ && (h = new _(s),
                                        h.parse(t, u, i + s)),
                                        u = i + s
                                } else
                                    u -= 8;
                            return [u - i, h]
                        }
                    }]),
                    e
            }()
            , E = i.FileTypeBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "ftyp"));
                    return i.majorBrand = new Uint8Array(4),
                        i.minorVersion = new Uint8Array(4),
                        i.campatibleBrands = [],
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            a(this.majorBrand, o, 0, s, 4),
                                s += 4,
                                a(this.minorVersion, o, 0, s, 4),
                                s += 4;
                            for (var u = this.boxSize - 16, h = u / 4, l = 0; h > l; l++)
                                this.campatibleBrands[l] = new Uint8Array(4),
                                    a(this.campatibleBrands[l], o, 0, s, 4),
                                    s += 4;
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            a(e, this.majorBrand, this.decodeOffset, 0, 4),
                                this.decodeOffset += 4,
                                a(e, this.minorVersion, this.decodeOffset, 0, 4),
                                this.decodeOffset += 4;
                            for (var i = this.campatibleBrands.length, n = 0; i > n; n++)
                                a(e, this.campatibleBrands[n], this.decodeOffset, 0, 4),
                                    this.decodeOffset += 4;
                            return e
                        }
                    }]),
                    t
            }(g)
            , k = i.FreeBox = function (e) {
                function t(e) {
                    return o(this, t),
                        r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "free"))
                }
                return s(t, e),
                    t
            }(g)
            , O = i.MediaDataBox = function (e) {
                function t(e, i) {
                    o(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "mdat"));
                    return n.data = null,
                        n.isComplete = !1,
                        n.writeOffset = 0,
                        n.dataOffsetInFile = i,
                        n
                }
                return s(t, e),
                    h(t, [{
                        key: "adjustWriteOffset",
                        value: function (e) {
                            this.isComplete = !1,
                                this.writeOffset = e - this.dataOffsetInFile,
                                p.default.w(y, "mdat box adjustWriteOffset " + this.writeOffset + ", total box byteLength: " + this.data.byteLength)
                        }
                    }, {
                        key: "parse",
                        value: function (e, t, i) {
                            null == this.data && (this.data = new Uint8Array(this.boxSize - 8));
                            var n = new Uint8Array(e, t);
                            return this.data.set(n, this.writeOffset),
                                this.writeOffset += n.byteLength,
                                this.writeOffset == this.data.byteLength && (this.isComplete = !0),
                                i - t + 1
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            this.decodeBoxSize = 8 + this.data.byteLength;
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.data, this.decodeOffset),
                                this.decodeOffset += this.data.byteLength,
                                e
                        }
                    }], [{
                        key: "createByBytes",
                        value: function (e) {
                            var i = new t(0, 0);
                            return i.data = e,
                                i
                        }
                    }]),
                    t
            }(g)
            , w = i.MovieBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "moov"));
                    return i.mvhd = null,
                        i.tracks = [],
                        i.udta = null,
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            for (var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n), s = i + r, o = new DataView(e); n > s;) {
                                var u = o.getUint32(s)
                                    , h = new Uint8Array(4);
                                a(h, o, 0, s + 4, 4),
                                    h = c.default(h);
                                var l = null;
                                switch (h) {
                                    case "mvhd":
                                        this.mvhd = new L(u),
                                            this.mvhd.parse(e, s + 8, s + u);
                                        break;
                                    case "trak":
                                        l = new A(u),
                                            l.parse(e, s + 8, s + u),
                                            l.resetDuration(this.mvhd.duration),
                                            l.resetTimeScale(this.mvhd.timescale),
                                            this.tracks.push(l)
                                }
                                s += u
                            }
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function (e) {
                            for (var i = this.mvhd.decode(), n = null, r = null, s = 0; s < this.tracks.length; s++) {
                                var o = this.tracks[s];
                                "vide" === o.mdia.hdlr.strSubtype ? (o.tkhd.track_ID,
                                    n = o.decode()) : "soun" === o.mdia.hdlr.strSubtype && (o.tkhd.track_ID,
                                        r = o.decode())
                            }
                            var a = new W(this.mvhd.duration, 1, 2)
                                , u = a.decode();
                            this.decodeBoxSize = "audio" === e ? 8 + i.byteLength + r.byteLength + u.byteLength : "video" === e ? 8 + i.byteLength + n.byteLength + u.byteLength : 8 + i.byteLength + n.byteLength + r.byteLength + u.byteLength;
                            var h = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return h.set(i, this.decodeOffset),
                                this.decodeOffset += i.byteLength,
                                "all" !== e && "video" !== e || (h.set(n, this.decodeOffset),
                                    this.decodeOffset += n.byteLength),
                                "all" !== e && "audio" !== e || (h.set(r, this.decodeOffset),
                                    this.decodeOffset += r.byteLength),
                                h.set(u, this.decodeOffset),
                                this.decodeOffset += u.byteLength,
                                h
                        }
                    }]),
                    t
            }(g)
            , L = i.MovieHeaderBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "mvhd"));
                    i.creation_time = new Uint8Array(4),
                        i.modification_time = new Uint8Array(4),
                        i.timescale = new Uint8Array(4),
                        i.duration = new Uint8Array(4),
                        i.rate = new Uint8Array(4),
                        i.reversed = new Uint8Array(10),
                        i.matrix = new Uint8Array(36),
                        i.pre_defined = new Uint8Array(24),
                        i.next_track_ID = new Uint8Array(4);
                    var n = e - 12 - i.creation_time.byteLength - i.modification_time.byteLength - i.timescale.byteLength - i.duration.byteLength - i.rate.byteLength - i.reversed.byteLength - i.matrix.byteLength - i.pre_defined.byteLength - i.next_track_ID.byteLength;
                    return i.left_body = new Uint8Array(n),
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            return a(this.creation_time, o, 0, s, 4),
                                s += 4,
                                a(this.modification_time, o, 0, s, 4),
                                s += 4,
                                a(this.timescale, o, 0, s, 4),
                                s += 4,
                                a(this.duration, o, 0, s, 4),
                                s += 4,
                                a(this.rate, o, 0, s, 4),
                                s += 4,
                                a(this.reversed, o, 0, s, 10),
                                s += 10,
                                a(this.matrix, o, 0, s, 36),
                                s += 36,
                                a(this.pre_defined, o, 0, s, 24),
                                s += 24,
                                a(this.next_track_ID, o, 0, s, 4),
                                s += 4,
                                a(this.left_body, o, 0, s, this.left_body.byteLength),
                                (s += this.left_body.byteLength) - i
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.creation_time, this.decodeOffset),
                                this.decodeOffset += this.creation_time.byteLength,
                                e.set(this.modification_time, this.decodeOffset),
                                this.decodeOffset += this.modification_time.byteLength,
                                e.set(this.timescale, this.decodeOffset),
                                this.decodeOffset += this.timescale.byteLength,
                                e.set(this.duration, this.decodeOffset),
                                this.decodeOffset += this.duration.byteLength,
                                e.set(this.rate, this.decodeOffset),
                                this.decodeOffset += this.rate.byteLength,
                                e.set(this.reversed, this.decodeOffset),
                                this.decodeOffset += this.reversed.byteLength,
                                e.set(this.matrix, this.decodeOffset),
                                this.decodeOffset += this.matrix.byteLength,
                                e.set(this.pre_defined, this.decodeOffset),
                                this.decodeOffset += this.pre_defined.byteLength,
                                this.next_track_ID[0] = 0,
                                this.next_track_ID[1] = 0,
                                this.next_track_ID[2] = 255,
                                this.next_track_ID[3] = 255,
                                e.set(this.next_track_ID, this.decodeOffset),
                                this.decodeOffset += this.next_track_ID.byteLength,
                                this.left_body[0] = 255,
                                this.left_body[1] = 255,
                                e.set(this.left_body, this.decodeOffset),
                                this.decodeOffset += this.left_body.byteLength,
                                e
                        }
                    }]),
                    t
            }(b)
            , A = i.TrackBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "trak"));
                    return i.tkhd = null,
                        i.mdia = null,
                        i.edts = null,
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "resetDuration",
                        value: function (e) {
                            this.tkhd.resetDuration(e),
                                this.mdia.resetDuration(e)
                        }
                    }, {
                        key: "resetTimeScale",
                        value: function (e) {
                            this.mdia.resetTimeScale(e)
                        }
                    }, {
                        key: "parse",
                        value: function (e, i, n) {
                            for (var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n), s = i + r, o = new DataView(e); n > s;) {
                                var u = o.getUint32(s)
                                    , h = new Uint8Array(4);
                                switch (a(h, o, 0, s + 4, 4),
                                h = c.default(h)) {
                                    case "tkhd":
                                        this.tkhd = new R(u),
                                            this.tkhd.parse(e, s + 8, s + u);
                                        break;
                                    case "edts":
                                        this.edts = new T(u),
                                            this.edts.parse(e, s + 8, s + u);
                                        break;
                                    case "mdia":
                                        this.mdia = new D(u),
                                            this.mdia.parse(e, s + 8, s + u)
                                }
                                s += u
                            }
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = this.tkhd.decode()
                                , i = this.mdia.decode();
                            this.decodeBoxSize = 8 + e.byteLength + i.byteLength;
                            var n = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return n.set(e, this.decodeOffset),
                                this.decodeOffset += e.byteLength,
                                n.set(i, this.decodeOffset),
                                this.decodeOffset += i.byteLength,
                                n
                        }
                    }]),
                    t
            }(g)
            , T = i.EditBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "edts"));
                    return i.bodyBytes = new Uint8Array(e - 8),
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            return a(this.bodyBytes, o, 0, s, this.bodyBytes.byteLength),
                                (s += this.bodyBytes.byteLength) - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.bodyBytes, this.decodeOffset),
                                this.decodeOffset += this.bodyBytes.byteLength,
                                e
                        }
                    }]),
                    t
            }(g)
            , R = i.TrackHeaderBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "tkhd"));
                    return i.creation_time = new Uint8Array(3),
                        i.modification_time = new Uint8Array(4),
                        i.track_ID = new Uint8Array(4),
                        i.reversed = new Uint8Array(4),
                        i.duration = new Uint8Array(4),
                        i.reversed2 = new Uint8Array(8),
                        i.layer = new Uint8Array(2),
                        i.alternate_group = new Uint8Array(2),
                        i.volume = new Uint8Array(2),
                        i.reversed3 = new Uint8Array(2),
                        i.matrix = new Uint8Array(36),
                        i.track_width = new Uint8Array(4),
                        i.track_height = new Uint8Array(4),
                        i.trackWidth = 0,
                        i.trackheight = 0,
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "resetDuration",
                        value: function (e) {
                            this.duration.set(e, 0)
                        }
                    }, {
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            return a(this.creation_time, o, 0, s, 3),
                                s += 3,
                                a(this.modification_time, o, 0, s, 4),
                                s += 4,
                                a(this.track_ID, o, 0, s, 4),
                                s += 4,
                                a(this.reversed, o, 0, s, 4),
                                s += 4,
                                a(this.duration, o, 0, s, 4),
                                s += 4,
                                a(this.reversed2, o, 0, s, 8),
                                s += 8,
                                a(this.layer, o, 0, s, 2),
                                s += 2,
                                a(this.alternate_group, o, 0, s, 2),
                                s += 2,
                                a(this.volume, o, 0, s, 2),
                                s += 2,
                                a(this.reversed3, o, 0, s, 2),
                                s += 2,
                                a(this.matrix, o, 0, s, 36),
                                s += 36,
                                a(this.track_width, o, 0, s, 4),
                                s += 4,
                                a(this.track_height, o, 0, s, 4),
                                s += 4,
                                this.trackWidth = this.track_width[0] << 16 | this.track_width[1] << 8 | this.track_width[2],
                                this.trackheight = this.track_height[0] << 16 | this.track_height[1] << 8 | this.track_height[2],
                                s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.creation_time, this.decodeOffset),
                                this.decodeOffset += this.creation_time.byteLength,
                                e.set(this.modification_time, this.decodeOffset),
                                this.decodeOffset += this.modification_time.byteLength,
                                e.set(this.track_ID, this.decodeOffset),
                                this.decodeOffset += this.track_ID.byteLength,
                                e.set(this.reversed, this.decodeOffset),
                                this.decodeOffset += this.reversed.byteLength,
                                e.set(this.duration, this.decodeOffset),
                                this.decodeOffset += this.duration.byteLength,
                                e.set(this.reversed2, this.decodeOffset),
                                this.decodeOffset += this.reversed2.byteLength,
                                e.set(this.layer, this.decodeOffset),
                                this.decodeOffset += this.layer.byteLength,
                                e.set(this.alternate_group, this.decodeOffset),
                                this.decodeOffset += this.alternate_group.byteLength,
                                e.set(this.volume, this.decodeOffset),
                                this.decodeOffset += this.volume.byteLength,
                                e.set(this.reversed3, this.decodeOffset),
                                this.decodeOffset += this.reversed3.byteLength,
                                e.set(this.matrix, this.decodeOffset),
                                this.decodeOffset += this.matrix.byteLength,
                                e.set(this.track_width, this.decodeOffset),
                                this.decodeOffset += this.track_width.byteLength,
                                e.set(this.track_height, this.decodeOffset),
                                this.decodeOffset += this.track_height.byteLength,
                                e
                        }
                    }]),
                    t
            }(b)
            , D = i.MediaBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "mdia"));
                    return i.mdhd = null,
                        i.hdlr = null,
                        i.minf = null,
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "resetDuration",
                        value: function (e) {
                            this.mdhd.resetDuration(e)
                        }
                    }, {
                        key: "resetTimeScale",
                        value: function (e) {
                            this.mdhd.resetTimeScale(e)
                        }
                    }, {
                        key: "parse",
                        value: function (e, i, n) {
                            for (var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n), s = i + r, o = new DataView(e); n > s;) {
                                var u = o.getUint32(s)
                                    , h = new Uint8Array(4);
                                switch (a(h, o, 0, s + 4, 4),
                                h = c.default(h)) {
                                    case "mdhd":
                                        this.mdhd = new x(u),
                                            this.mdhd.parse(e, s + 8, s + u);
                                        break;
                                    case "hdlr":
                                        this.hdlr = new C(u),
                                            this.hdlr.parse(e, s + 8, s + u);
                                        break;
                                    case "minf":
                                        this.minf = new I(u, this.hdlr.strSubtype),
                                            this.minf.parse(e, s + 8, s + u)
                                }
                                s += u
                            }
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = this.mdhd.decode()
                                , i = this.hdlr.decode()
                                , n = this.minf.decode();
                            this.decodeBoxSize = 8 + e.byteLength + i.byteLength + n.byteLength;
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return r.set(e, this.decodeOffset),
                                this.decodeOffset += e.byteLength,
                                r.set(i, this.decodeOffset),
                                this.decodeOffset += i.byteLength,
                                r.set(n, this.decodeOffset),
                                this.decodeOffset += n.byteLength,
                                r
                        }
                    }]),
                    t
            }(g)
            , x = i.MediaHeaderBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "mdhd"));
                    return i.creation_time = new Uint8Array(4),
                        i.modification_time = new Uint8Array(4),
                        i.timescale = new Uint8Array(4),
                        i.realTimeScale = 0,
                        i.duration = new Uint8Array(4),
                        i.language = new Uint8Array(2),
                        i.quality = new Uint8Array(2),
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "resetDuration",
                        value: function (e) {
                            this.duration.set(e, 0)
                        }
                    }, {
                        key: "resetTimeScale",
                        value: function (e) {
                            this.timescale.set(e, 0)
                        }
                    }, {
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            return a(this.creation_time, o, 0, s, 4),
                                s += 4,
                                a(this.modification_time, o, 0, s, 4),
                                s += 4,
                                a(this.timescale, o, 0, s, 4),
                                s += 4,
                                this.realTimeScale = u(this.timescale, 0),
                                a(this.duration, o, 0, s, 4),
                                s += 4,
                                a(this.language, o, 0, s, 2),
                                s += 2,
                                a(this.quality, o, 0, s, 2),
                                (s += 2) - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.creation_time, this.decodeOffset),
                                this.decodeOffset += this.creation_time.byteLength,
                                e.set(this.modification_time, this.decodeOffset),
                                this.decodeOffset += this.modification_time.byteLength,
                                e.set(this.timescale, this.decodeOffset),
                                this.decodeOffset += this.timescale.byteLength,
                                e.set(this.duration, this.decodeOffset),
                                this.decodeOffset += this.duration.byteLength,
                                e.set(this.language, this.decodeOffset),
                                this.decodeOffset += this.language.byteLength,
                                e.set(this.quality, this.decodeOffset),
                                this.decodeOffset += this.quality.byteLength,
                                e
                        }
                    }]),
                    t
            }(b)
            , C = i.HandlerBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "hdlr"));
                    return i.component_type = new Uint8Array(4),
                        i.component_subtype = new Uint8Array(4),
                        i.reversed = new Uint8Array(12),
                        i.component_name = new Uint8Array(13),
                        i.strSubtype = null,
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            return a(this.component_type, o, 0, s, 4),
                                s += 4,
                                a(this.component_subtype, o, 0, s, 4),
                                this.strSubtype = c.default(this.component_subtype),
                                s += 4,
                                a(this.reversed, o, 0, s, 12),
                                s += 12,
                                a(this.component_name, o, 0, s, 13),
                                (s += 13) - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.component_type, this.decodeOffset),
                                this.decodeOffset += this.component_type.byteLength,
                                e.set(this.component_subtype, this.decodeOffset),
                                this.decodeOffset += this.component_subtype.byteLength,
                                e.set(this.reversed, this.decodeOffset),
                                this.decodeOffset += this.reversed.byteLength,
                                e.set(this.component_name, this.decodeOffset),
                                this.decodeOffset += this.component_name.byteLength,
                                e
                        }
                    }]),
                    t
            }(b)
            , I = i.MediaInformationBox = function (e) {
                function t(e, i) {
                    o(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "minf"));
                    return n.handler_type = i,
                        n.vmhd = null,
                        n.smhd = null,
                        n.dinf = null,
                        n.stbl = null,
                        n
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            for (var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n), s = i + r, o = new DataView(e); n > s;) {
                                var u = o.getUint32(s)
                                    , h = new Uint8Array(4);
                                switch (a(h, o, 0, s + 4, 4),
                                h = c.default(h)) {
                                    case "vmhd":
                                        this.vmhd = new P(u),
                                            this.vmhd.parse(e, s + 8, s + u);
                                        break;
                                    case "smhd":
                                        this.smhd = new B(u),
                                            this.smhd.parse(e, s + 8, s + u);
                                        break;
                                    case "stbl":
                                        this.stbl = new U(u, this.handler_type),
                                            this.stbl.parse(e, s + 8, s + u);
                                        break;
                                    case "dinf":
                                        this.dinf = new M(u),
                                            this.dinf.parse(e, s + 8, s + u)
                                }
                                s += u
                            }
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = this.vmhd ? this.vmhd.decode() : this.smhd.decode()
                                , i = this.stbl.decode()
                                , n = this.dinf.decode();
                            this.decodeBoxSize = 8 + e.byteLength + i.byteLength + n.byteLength;
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return r.set(e, this.decodeOffset),
                                this.decodeOffset += e.byteLength,
                                r.set(n, this.decodeOffset),
                                this.decodeOffset += n.byteLength,
                                r.set(i, this.decodeOffset),
                                this.decodeOffset += i.byteLength,
                                r
                        }
                    }]),
                    t
            }(g)
            , M = i.DataInformationBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "dinf"));
                    return i.bodyData = new Uint8Array(i.boxSize - 8),
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            return a(this.bodyData, o, 0, s, this.bodyData.byteLength),
                                (s += this.bodyData.byteLength) - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.bodyData, this.decodeOffset),
                                this.decodeOffset += this.bodyData.byteLength,
                                e
                        }
                    }]),
                    t
            }(g)
            , P = i.VideoMediaHeaderBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "vmhd"));
                    return i.graphicsmode = new Uint8Array(2),
                        i.opcolor = new Uint8Array(6),
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            return a(this.graphicsmode, o, 0, s, 2),
                                s += 2,
                                a(this.opcolor, o, 0, s, 6),
                                (s += 6) - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.graphicsmode, this.decodeOffset),
                                this.decodeOffset += this.graphicsmode.byteLength,
                                e.set(this.opcolor, this.decodeOffset),
                                this.decodeOffset += this.opcolor.byteLength,
                                e
                        }
                    }]),
                    t
            }(b)
            , B = i.SoundMediaHeaderBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "smhd"));
                    return i.balance = new Uint8Array(2),
                        i.reserved = new Uint8Array(2),
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            return a(this.balance, o, 0, s, 2),
                                s += 2,
                                a(this.reserved, o, 0, s, 2),
                                (s += 2) - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.balance, this.decodeOffset),
                                this.decodeOffset += this.balance.byteLength,
                                e.set(this.reserved, this.decodeOffset),
                                this.decodeOffset += this.reserved.byteLength,
                                e
                        }
                    }]),
                    t
            }(b)
            , U = i.SampleTableBox = function (e) {
                function t(e, i) {
                    o(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "stbl"));
                    return n.handler_type = i,
                        n.stsd = null,
                        n.stts = null,
                        n.stss = null,
                        n.stsc = null,
                        n.stsz = null,
                        n.stco = null,
                        n
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            for (var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n), s = i + r, o = new DataView(e); n > s;) {
                                var u = o.getUint32(s)
                                    , h = new Uint8Array(4);
                                switch (a(h, o, 0, s + 4, 4),
                                h = c.default(h)) {
                                    case "stsd":
                                        this.stsd = new F(u, this.handler_type),
                                            this.stsd.parse(e, s + 8, s + u);
                                        break;
                                    case "stts":
                                        this.stts = new j(u),
                                            this.stts.parse(e, s + 8, s + u);
                                        break;
                                    case "stss":
                                        this.stss = new K(u),
                                            this.stss.parse(e, s + 8, s + u);
                                        break;
                                    case "stsc":
                                        this.stsc = new q(u),
                                            this.stsc.parse(e, s + 8, s + u),
                                            this._computeLastChunkCoutInGroup();
                                        break;
                                    case "stsz":
                                        this.stsz = new H(u),
                                            this.stsz.parse(e, s + 8, s + u);
                                        break;
                                    case "stco":
                                        this.stco = new N(u),
                                            this.stco.parse(e, s + 8, s + u),
                                            this._computeLastChunkCoutInGroup()
                                }
                                s += u
                            }
                            return s - i - r
                        }
                    }, {
                        key: "_computeLastChunkCoutInGroup",
                        value: function () {
                            this.stco && (this.stsc.entry[this.stsc.entryCount - 1].chunk_count = this.stco.entryCount - this.stsc.entry[this.stsc.entryCount - 1].first_chunk + 1)
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = new j(0).decode()
                                , i = new q(0).decode()
                                , n = new H(0).decode()
                                , r = new N(0).decode()
                                , s = this.stsd.decode();
                            this.decodeBoxSize = 8 + s.byteLength + e.byteLength + i.byteLength + n.byteLength + r.byteLength;
                            var o = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return o.set(s, this.decodeOffset),
                                this.decodeOffset += s.byteLength,
                                o.set(e, this.decodeOffset),
                                this.decodeOffset += e.byteLength,
                                o.set(i, this.decodeOffset),
                                this.decodeOffset += i.byteLength,
                                o.set(n, this.decodeOffset),
                                this.decodeOffset += n.byteLength,
                                o.set(r, this.decodeOffset),
                                this.decodeOffset += r.byteLength,
                                o
                        }
                    }]),
                    t
            }(g)
            , j = i.TimeToSampleBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "stts"));
                    return i.entryCount = 0,
                        i.entry_count = new Uint8Array(4),
                        i.sample_count = [],
                        i.sample_delta = [],
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            a(this.entry_count, o, 0, s, 4),
                                s += 4,
                                this.entryCount = u(this.entry_count, 0),
                                this.sample_count = [],
                                this.sample_delta = [];
                            for (var h = 0; h < this.entryCount; h++)
                                this.sample_count.push(o.getUint32(s)),
                                    s += 4,
                                    this.sample_delta.push(o.getUint32(s)),
                                    s += 4;
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            return this.decodeBoxSize = 12 + this.entry_count.byteLength,
                                d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this)
                        }
                    }]),
                    t
            }(b)
            , N = i.ChunkOffsetBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "stco"));
                    return i.entryCount = 0,
                        i.entry_count = new Uint8Array(4),
                        i.chunk_offset = [],
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            a(this.entry_count, o, 0, s, 4),
                                s += 4,
                                this.entryCount = u(this.entry_count, 0);
                            for (var h = 0; h < this.entryCount; h++) {
                                var l = o.getUint32(s);
                                s += 4,
                                    this.chunk_offset.push(l)
                            }
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            return this.decodeBoxSize = 12 + this.entry_count.byteLength,
                                d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this)
                        }
                    }]),
                    t
            }(b)
            , F = i.SampleDescriptionBox = function (e) {
                function t(e, i) {
                    o(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "stsd"));
                    return n.handler_type = i,
                        n.entryCount = 0,
                        n.entry_count = new Uint8Array(4),
                        n.entry = [],
                        n
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            a(this.entry_count, o, 0, s, 4),
                                s += 4,
                                this.entryCount = u(this.entry_count, 0);
                            for (var h = 0; h < this.entryCount; h++) {
                                var l = null
                                    , f = o.getUint32(s)
                                    , _ = new Uint8Array(4);
                                switch (a(_, o, 0, s + 4, _.byteLength),
                                _ = c.default(_),
                                this.handler_type) {
                                    case "soun":
                                        l = new z(f, _),
                                            l.parse(e, s + 8, s + f);
                                        break;
                                    case "vide":
                                        l = new G(f, _),
                                            l.parse(e, s + 8, s + f)
                                }
                                l && this.entry.push(l),
                                    s += f
                            }
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            e.set(this.entry_count, this.decodeOffset),
                                this.decodeOffset += this.entry_count.byteLength;
                            for (var i = 0; i < this.entryCount; i++) {
                                var n = this.entry[i]
                                    , r = n.decode();
                                e.set(r, this.decodeOffset),
                                    this.decodeOffset += r.byteLength
                            }
                            return e
                        }
                    }]),
                    t
            }(b)
            , V = function (e) {
                function t(e, i) {
                    o(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, i));
                    return n.codec = "",
                        n.reversed = new Uint8Array(6),
                        n.data_reference_index = new Uint8Array(2),
                        n
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            return a(this.reversed, o, 0, s, 6),
                                s += 6,
                                a(this.data_reference_index, o, 0, s, 2),
                                (s += 2) - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return a(e, this.reversed, this.decodeOffset, 0, this.reversed.byteLength),
                                this.decodeOffset += this.reversed.byteLength,
                                a(e, this.data_reference_index, this.decodeOffset, 0, this.data_reference_index.byteLength),
                                this.decodeOffset += this.data_reference_index.byteLength,
                                e
                        }
                    }]),
                    t
            }(g)
            , G = function (e) {
                function t(e, i) {
                    o(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, i));
                    n.version = new Uint8Array(2),
                        n.revision_level = new Uint8Array(2),
                        n.vender = new Uint8Array(4),
                        n.temporal_quality = new Uint8Array(4),
                        n.spatial_quality = new Uint8Array(4),
                        n.width = new Uint8Array(2),
                        n.height = new Uint8Array(2),
                        n.horizontal_res = new Uint8Array(2),
                        n.horizontal_res_dec = new Uint8Array(2),
                        n.vertical_res = new Uint8Array(2),
                        n.vertical_res_dec = new Uint8Array(2),
                        n.data_size = new Uint8Array(4),
                        n.frame_count = new Uint8Array(2),
                        n.compressor_name = new Uint8Array(32),
                        n.depth = new Uint8Array(2),
                        n.color_table_id = new Uint8Array(2);
                    var s = e - 16 - n.version.byteLength - n.revision_level.byteLength - n.vender.byteLength - n.temporal_quality.byteLength - n.spatial_quality.byteLength - n.width.byteLength - n.height.byteLength - n.horizontal_res.byteLength - n.horizontal_res_dec.byteLength - n.vertical_res.byteLength - n.vertical_res_dec.byteLength - n.data_size.byteLength - n.frame_count.byteLength - n.compressor_name.byteLength - n.depth.byteLength - n.color_table_id.byteLength;
                    return n.left_body = new Uint8Array(s),
                        n
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            a(this.version, o, 0, s, 2),
                                s += 2,
                                a(this.revision_level, o, 0, s, 2),
                                s += 2,
                                a(this.vender, o, 0, s, 4),
                                s += 4,
                                a(this.temporal_quality, o, 0, s, 4),
                                s += 4,
                                a(this.spatial_quality, o, 0, s, 4),
                                s += 4,
                                a(this.width, o, 0, s, 2),
                                s += 2,
                                a(this.height, o, 0, s, 2),
                                s += 2,
                                a(this.horizontal_res, o, 0, s, 2),
                                s += 2,
                                a(this.horizontal_res_dec, o, 0, s, 2),
                                s += 2,
                                a(this.vertical_res, o, 0, s, 2),
                                s += 2,
                                a(this.vertical_res_dec, o, 0, s, 2),
                                s += 2,
                                a(this.data_size, o, 0, s, 4),
                                s += 4,
                                a(this.frame_count, o, 0, s, 2),
                                s += 2,
                                a(this.compressor_name, o, 0, s, 32),
                                s += 32,
                                a(this.depth, o, 0, s, 2),
                                s += 2,
                                a(this.color_table_id, o, 0, s, 2),
                                s += 2,
                                a(this.left_body, o, 0, s, this.left_body.byteLength),
                                s += this.left_body.byteLength,
                                this.left_body[8],
                                this.left_body[9],
                                this.left_body[10],
                                this.left_body[11],
                                this.left_body[12],
                                this.left_body[13],
                                this.codec = "avc1.";
                            for (var u = (this.left_body[14],
                                this.left_body[15],
                                0); 3 > u; u++) {
                                var h = this.left_body[17 + u].toString(16);
                                h.length < 2 && (h = "0" + h),
                                    this.codec += h
                            }
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return a(e, this.version, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.revision_level, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.vender, this.decodeOffset, 0, 4),
                                this.decodeOffset += 4,
                                a(e, this.temporal_quality, this.decodeOffset, 0, 4),
                                this.decodeOffset += 4,
                                a(e, this.spatial_quality, this.decodeOffset, 0, 4),
                                this.decodeOffset += 4,
                                a(e, this.width, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.height, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.horizontal_res, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.horizontal_res_dec, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.vertical_res, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.vertical_res_dec, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.data_size, this.decodeOffset, 0, 4),
                                this.decodeOffset += 4,
                                a(e, this.frame_count, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.compressor_name, this.decodeOffset, 0, 32),
                                this.decodeOffset += 32,
                                a(e, this.depth, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.color_table_id, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.left_body, this.decodeOffset, 0, this.left_body.byteLength),
                                this.decodeOffset += this.left_body.byteLength,
                                e
                        }
                    }]),
                    t
            }(V)
            , z = function (e) {
                function t(e, i) {
                    o(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, i));
                    n.version = new Uint8Array(2),
                        n.revision_level = new Uint8Array(2),
                        n.vender = new Uint8Array(4),
                        n.number_of_channels = new Uint8Array(2),
                        n.sample_size = new Uint8Array(2),
                        n.compression_id = new Uint8Array(2),
                        n.packet_size = new Uint8Array(2),
                        n.sample_rate = new Uint8Array(4);
                    var s = e - 16 - n.version.byteLength - n.revision_level.byteLength - n.vender.byteLength - n.number_of_channels.byteLength - n.sample_size.byteLength - n.compression_id.byteLength - n.packet_size.byteLength - n.sample_rate.byteLength;
                    return n.left_body = new Uint8Array(s),
                        n
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            a(this.version, o, 0, s, 2),
                                s += 2,
                                a(this.revision_level, o, 0, s, 2),
                                s += 2,
                                a(this.vender, o, 0, s, 4),
                                s += 4,
                                a(this.number_of_channels, o, 0, s, 2),
                                s += 2,
                                a(this.sample_size, o, 0, s, 2),
                                s += 2,
                                a(this.compression_id, o, 0, s, 2),
                                s += 2,
                                a(this.packet_size, o, 0, s, 2),
                                s += 2,
                                a(this.sample_rate, o, 0, s, 4),
                                s += 4,
                                a(this.left_body, o, 0, s, this.left_body.byteLength),
                                s += this.left_body.byteLength;
                            var h = 0
                                , l = this.left_body[12 + h++]
                                , c = void this.left_body[12 + h++]
                                , f = void 0
                                , _ = void 0;
                            return 3 == l && (this.left_body[12 + h++] << 8 | this.left_body[12 + h++],
                                this.left_body[12 + h++]),
                                l = this.left_body[12 + h++],
                                this.left_body[12 + h++],
                                4 == l && (c = this.left_body[12 + h++],
                                    this.left_body[12 + h],
                                    h += 4,
                                    u(this.left_body, 12 + h),
                                    h += 4,
                                    u(this.left_body, 12 + h),
                                    h += 4),
                                l = this.left_body[12 + h++],
                                this.left_body[12 + h++],
                                5 == l && (f = this.left_body[12 + h] >> 3,
                                    _ = (7 & this.left_body[12 + h]) << 1,
                                    h++ ,
                                    _ |= (128 & this.left_body[12 + h]) >> 7,
                                    (120 & this.left_body[12 + h]) >> 3),
                                this.codec = c && f ? "mp4a." + c.toString(16) + "." + f.toString(16) : "mp4a.40.5",
                                s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return a(e, this.version, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.revision_level, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.vender, this.decodeOffset, 0, 4),
                                this.decodeOffset += 4,
                                a(e, this.number_of_channels, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.sample_size, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.compression_id, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.packet_size, this.decodeOffset, 0, 2),
                                this.decodeOffset += 2,
                                a(e, this.sample_rate, this.decodeOffset, 0, 4),
                                this.decodeOffset += 4,
                                a(e, this.left_body, this.decodeOffset, 0, this.left_body.byteLength),
                                this.decodeOffset += this.left_body.byteLength,
                                e
                        }
                    }]),
                    t
            }(V)
            , H = i.SampleSizeBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "stsz"));
                    return i.sampleCount = 0,
                        i.sampleSize = 0,
                        i.sample_size = new Uint8Array(4),
                        i.sample_count = new Uint8Array(4),
                        i.entry_size = [],
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            if (a(this.sample_size, o, 0, s, 4),
                                s += 4,
                                a(this.sample_count, o, 0, s, 4),
                                s += 4,
                                this.sampleSize = u(this.sample_size, 0),
                                this.sampleCount = u(this.sample_count, 0),
                                0 == this.sampleSize)
                                for (var h = 0; h < this.sampleCount; h++)
                                    this.entry_size.push(o.getUint32(s)),
                                        s += 4;
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            return this.decodeBoxSize = 12 + this.sample_size.byteLength + this.sample_count.byteLength,
                                d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this)
                        }
                    }]),
                    t
            }(b)
            , q = i.SampleToChunkBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "stsc"));
                    return i.entryCount = 0,
                        i.entry_count = new Uint8Array(4),
                        i.entry = [],
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            a(this.entry_count, o, 0, s, 4),
                                s += 4,
                                this.entryCount = u(this.entry_count, 0);
                            for (var h = 0; h < this.entryCount; h++) {
                                var l = o.getUint32(s);
                                s += 4;
                                var c = o.getUint32(s);
                                s += 4;
                                var f = o.getUint32(s);
                                s += 4,
                                    this.entry.push({
                                        first_chunk: l,
                                        samples_per_chunk: c,
                                        sample_description_index: f
                                    }),
                                    h > 0 && (this.entry[h - 1].chunk_count = l - this.entry[h - 1].first_chunk)
                            }
                            return s - i - r
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            return this.decodeBoxSize = 12 + this.entry_count.byteLength,
                                d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this)
                        }
                    }]),
                    t
            }(b)
            , K = i.SyncSampleBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "stss"));
                    return i.entryCount = 0,
                        i.entry_count = new Uint8Array(4),
                        i.sample_number = [],
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "parse",
                        value: function (e, i, n) {
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "parse", this).call(this, e, i, n)
                                , s = i + r
                                , o = new DataView(e);
                            a(this.entry_count, o, 0, s, 4),
                                s += 4,
                                this.entryCount = u(this.entry_count, 0);
                            for (var h = 0; h < this.entryCount; h++) {
                                var l = o.getUint32(s);
                                s += 4,
                                    this.sample_number.push(l)
                            }
                            return s - i - r
                        }
                    }]),
                    t
            }(b)
            , W = i.MovieExtendsBox = function (e) {
                function t(e, i, n) {
                    o(this, t);
                    var s = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 0, "mvex"));
                    return s.mehd = new Y(e),
                        s.vTrex = new X(i, 1),
                        s.aTrex = new X(n, 1),
                        s
                }
                return s(t, e),
                    h(t, [{
                        key: "decode",
                        value: function () {
                            var e = this.mehd.decode()
                                , i = this.vTrex.decode()
                                , n = this.aTrex.decode();
                            this.decodeBoxSize = 8 + e.byteLength + i.byteLength + n.byteLength;
                            var r = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return r.set(e, this.decodeOffset),
                                this.decodeOffset += e.byteLength,
                                r.set(i, this.decodeOffset),
                                this.decodeOffset += i.byteLength,
                                r.set(n, this.decodeOffset),
                                this.decodeOffset += n.byteLength,
                                r
                        }
                    }]),
                    t
            }(g)
            , Y = i.MovieExtendsHeaderBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 0, "mehd"));
                    return i.fragment_duration = new Uint8Array(4),
                        e instanceof Uint8Array ? i.fragment_duration.set(e) : new DataView(i.fragment_duration.buffer).setUint32(0, e),
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "decode",
                        value: function () {
                            this.decodeBoxSize = 12 + this.fragment_duration.byteLength;
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.fragment_duration, this.decodeOffset),
                                this.decodeOffset += this.fragment_duration.byteLength,
                                e
                        }
                    }]),
                    t
            }(b)
            , X = i.TrackExtendsBox = function (e) {
                function t(e, i) {
                    o(this, t);
                    var n = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 0, "trex"));
                    return n.track_ID = new Uint8Array(4),
                        e instanceof Uint8Array ? n.track_ID.set(e) : new DataView(n.track_ID.buffer).setUint32(0, e),
                        n.default_sample_description_index = new Uint8Array(4),
                        new DataView(n.default_sample_description_index.buffer).setUint32(0, i),
                        n.default_sample_duration = new Uint8Array([0, 0, 0, 0]),
                        n.default_sample_size = new Uint8Array([0, 0, 0, 0]),
                        n.default_sample_flags = new Uint8Array([0, 1, 0, 1]),
                        n
                }
                return s(t, e),
                    h(t, [{
                        key: "decode",
                        value: function () {
                            this.decodeBoxSize = 12 + this.track_ID.byteLength + this.default_sample_description_index.byteLength + this.default_sample_duration.byteLength + this.default_sample_size.byteLength + this.default_sample_flags.byteLength;
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.track_ID, this.decodeOffset, this.decodeOffset),
                                this.decodeOffset += this.track_ID.byteLength,
                                e.set(this.default_sample_description_index, this.decodeOffset),
                                this.decodeOffset += this.default_sample_description_index.byteLength,
                                e.set(this.default_sample_duration, this.decodeOffset),
                                this.decodeOffset += this.default_sample_duration.byteLength,
                                e.set(this.default_sample_size, this.decodeOffset),
                                this.decodeOffset += this.default_sample_size.byteLength,
                                e.set(this.default_sample_flags, this.decodeOffset),
                                this.decodeOffset += this.default_sample_flags.byteLength,
                                e
                        }
                    }]),
                    t
            }(b)
            , J = (i.MovieFragmentBox = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 0, "moof"));
                    return i.mfhd = new J(e.sequenceNumber),
                        i.traf = new Q(e),
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "decode",
                        value: function () {
                            this.decodeBoxSize = 8 + this.mfhd.decodeBoxSize + this.traf.decodeBoxSize,
                                this.traf.setDataOffset(this.decodeBoxSize + 8);
                            var e = this.mfhd.decode()
                                , i = this.traf.decode()
                                , n = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return n.set(e, this.decodeOffset),
                                this.decodeOffset += e.byteLength,
                                n.set(i, this.decodeOffset),
                                this.decodeOffset += i.byteLength,
                                n
                        }
                    }]),
                    t
            }(g),
                function (e) {
                    function t(e) {
                        o(this, t);
                        var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 0, "mfhd"));
                        return i.sequenceNumber = e,
                            i.sequence_number = new Uint8Array(4),
                            i.decodeBoxSize = 12 + i.sequence_number.byteLength,
                            i
                    }
                    return s(t, e),
                        h(t, [{
                            key: "decode",
                            value: function () {
                                new DataView(this.sequence_number.buffer).setUint32(0, this.sequenceNumber);
                                var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                                return e.set(this.sequence_number, this.decodeOffset),
                                    this.decodeOffset += this.sequence_number.byteLength,
                                    e
                            }
                        }]),
                        t
                }(b))
            , Q = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 0, "traf"));
                    return i.tfhd = new Z(e),
                        i.tfdt = new $(e),
                        i.sdtp = new et(e),
                        i.trun = new tt(e),
                        i.decodeBoxSize = 8 + i.tfhd.decodeBoxSize + i.tfdt.decodeBoxSize + i.sdtp.decodeBoxSize + i.trun.decodeBoxSize,
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "setDataOffset",
                        value: function (e) {
                            this.trun.baseDataOffset = e
                        }
                    }, {
                        key: "decode",
                        value: function () {
                            var e = this.tfhd.decode()
                                , i = this.tfdt.decode()
                                , n = this.sdtp.decode()
                                , r = this.trun.decode()
                                , s = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return s.set(e, this.decodeOffset),
                                this.decodeOffset += i.byteLength,
                                s.set(i, this.decodeOffset),
                                this.decodeOffset += i.byteLength,
                                s.set(n, this.decodeOffset),
                                this.decodeOffset += n.byteLength,
                                s.set(r, this.decodeOffset),
                                this.decodeOffset += r.byteLength,
                                s
                        }
                    }]),
                    t
            }(g)
            , Z = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 0, "tfhd"));
                    return i.segmentInfo = e,
                        i.track_ID = new Uint8Array(4),
                        i.decodeBoxSize = 12 + i.track_ID.byteLength,
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "decode",
                        value: function () {
                            new DataView(this.track_ID.buffer).setUint32(0, this.segmentInfo.trackId);
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.track_ID, this.decodeOffset),
                                this.decodeOffset += this.track_ID.byteLength,
                                e
                        }
                    }]),
                    t
            }(b)
            , $ = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 0, "tfdt"));
                    return i.segmentInfo = e,
                        i.baseMediaDecodeTime = new Uint8Array(4),
                        i.decodeBoxSize = 12 + i.baseMediaDecodeTime.byteLength,
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "decode",
                        value: function () {
                            new DataView(this.baseMediaDecodeTime.buffer).setUint32(0, this.segmentInfo.baseMediaDecodeTime);
                            var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return e.set(this.baseMediaDecodeTime, this.decodeOffset),
                                this.decodeOffset += this.baseMediaDecodeTime.byteLength,
                                e
                        }
                    }]),
                    t
            }(b)
            , et = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 0, "sdtp"));
                    return i.segmentInfo = e,
                        i.decodeBoxSize = 12 + i.segmentInfo.samples.length,
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "decode",
                        value: function () {
                            for (var e = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this), i = 0; i < this.segmentInfo.samples.length; i++) {
                                var n = this.segmentInfo.samples[i].flags;
                                e[this.decodeOffset] = n.isLeading << 6 | n.dependsOn << 4 | n.isDependedOn << 2 | n.hasRedundancy,
                                    this.decodeOffset += 1
                            }
                            return e
                        }
                    }]),
                    t
            }(b)
            , tt = function (e) {
                function t(e) {
                    o(this, t);
                    var i = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, 0, "trun"));
                    return i.flags[1] = 15,
                        i.flags[2] = 1,
                        i.segmentInfo = e,
                        i.sample_count = new Uint8Array(4),
                        i.base_data_offset = new Uint8Array(4),
                        i.decodeBoxSize = 12 + i.sample_count.byteLength + i.base_data_offset.byteLength + 16 * i.segmentInfo.samples.length,
                        i
                }
                return s(t, e),
                    h(t, [{
                        key: "decode",
                        value: function () {
                            new DataView(this.sample_count.buffer).setUint32(0, this.segmentInfo.samples.length);
                            for (var e = new Uint8Array(16 * this.segmentInfo.samples.length), i = 0, n = 0; n < this.segmentInfo.samples.length; n++) {
                                var r = this.segmentInfo.samples[n].duration
                                    , s = this.segmentInfo.samples[n].size
                                    , o = this.segmentInfo.samples[n].flags
                                    , a = this.segmentInfo.samples[n].cts
                                    , u = new Uint8Array(16)
                                    , h = new DataView(u.buffer);
                                h.setUint32(0, r),
                                    h.setUint32(4, s),
                                    u[8] = o.isLeading << 2 | o.dependsOn,
                                    u[9] = o.isDependedOn << 6 | o.hasRedundancy << 4 | o.isNonSync,
                                    u[10] = 0,
                                    u[11] = 0,
                                    h.setUint32(12, a),
                                    e.set(u, i),
                                    i += u.byteLength
                            }
                            var l = d(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "decode", this).call(this);
                            return l.set(this.sample_count, this.decodeOffset),
                                this.decodeOffset += this.sample_count.byteLength,
                                l.set(this.base_data_offset, this.decodeOffset),
                                this.decodeOffset += this.base_data_offset.byteLength,
                                l.set(e, this.decodeOffset),
                                this.decodeOffset += e.byteLength,
                                l
                        }
                    }, {
                        key: "baseDataOffset",
                        set: function (e) {
                            new DataView(this.base_data_offset.buffer).setUint32(0, e)
                        }
                    }]),
                    t
            }(b);
        S.init()
    }
        , {
        "../remux/mp4-generator": 39,
        "../utils/algorithm.js": 41,
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "../utils/utf8-conv.js": 48
    }],
    21: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = e("./exp-golomb.js")
            , o = function (e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }(s)
            , a = function () {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "_ebsp2rbsp",
                    value: function (e) {
                        for (var t = e, i = t.byteLength, n = new Uint8Array(i), r = 0, s = 0; i > s; s++)
                            s >= 2 && 3 === t[s] && 0 === t[s - 1] && 0 === t[s - 2] || (n[r] = t[s],
                                r++);
                        return new Uint8Array(n.buffer, 0, r)
                    }
                }, {
                    key: "parseSPS",
                    value: function (t) {
                        var i = e._ebsp2rbsp(t)
                            , n = new o.default(i);
                        n.readByte();
                        var r = n.readByte();
                        n.readByte();
                        var s = n.readByte();
                        n.readUEG();
                        var a = e.getProfileString(r)
                            , u = e.getLevelString(s)
                            , d = 1
                            , h = 420
                            , l = [0, 420, 422, 444]
                            , c = 8;
                        if ((100 === r || 110 === r || 122 === r || 244 === r || 44 === r || 83 === r || 86 === r || 118 === r || 128 === r || 138 === r || 144 === r) && (d = n.readUEG(),
                            3 === d && n.readBits(1),
                            3 >= d && (h = l[d]),
                            c = n.readUEG() + 8,
                            n.readUEG(),
                            n.readBits(1),
                            n.readBool()))
                            for (var f = 3 !== d ? 8 : 12, _ = 0; f > _; _++)
                                n.readBool() && (6 > _ ? e._skipScalingList(n, 16) : e._skipScalingList(n, 64));
                        n.readUEG();
                        var m = n.readUEG();
                        if (0 === m)
                            n.readUEG();
                        else if (1 === m) {
                            n.readBits(1),
                                n.readSEG(),
                                n.readSEG();
                            for (var p = n.readUEG(), v = 0; p > v; v++)
                                n.readSEG()
                        }
                        n.readUEG(),
                            n.readBits(1);
                        var y = n.readUEG()
                            , g = n.readUEG()
                            , b = n.readBits(1);
                        0 === b && n.readBits(1),
                            n.readBits(1);
                        var S = 0
                            , E = 0
                            , k = 0
                            , O = 0;
                        n.readBool() && (S = n.readUEG(),
                            E = n.readUEG(),
                            k = n.readUEG(),
                            O = n.readUEG());
                        var w = 1
                            , L = 1
                            , A = 0
                            , T = !0
                            , R = 0
                            , D = 0;
                        if (n.readBool()) {
                            if (n.readBool()) {
                                var x = n.readByte()
                                    , C = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2]
                                    , I = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];
                                x > 0 && 16 > x ? (w = C[x - 1],
                                    L = I[x - 1]) : 255 === x && (w = n.readByte() << 8 | n.readByte(),
                                        L = n.readByte() << 8 | n.readByte())
                            }
                            if (n.readBool() && n.readBool(),
                                n.readBool() && (n.readBits(4),
                                    n.readBool() && n.readBits(24)),
                                n.readBool() && (n.readUEG(),
                                    n.readUEG()),
                                n.readBool()) {
                                var M = n.readBits(32)
                                    , P = n.readBits(32);
                                T = n.readBool(),
                                    R = P,
                                    D = 2 * M,
                                    A = R / D
                            }
                        }
                        var B = 1;
                        1 === w && 1 === L || (B = w / L);
                        var U = 0
                            , j = 0;
                        if (0 === d)
                            U = 1,
                                j = 2 - b;
                        else {
                            var N = 3 === d ? 1 : 2
                                , F = 1 === d ? 2 : 1;
                            U = N,
                                j = F * (2 - b)
                        }
                        var V = 16 * (y + 1)
                            , G = 16 * (g + 1) * (2 - b);
                        V -= (S + E) * U,
                            G -= (k + O) * j;
                        var z = Math.ceil(V * B);
                        return n.destroy(),
                            n = null,
                            {
                                profile_string: a,
                                level_string: u,
                                bit_depth: c,
                                chroma_format: h,
                                chroma_format_string: e.getChromaFormatString(h),
                                frame_rate: {
                                    fixed: T,
                                    fps: A,
                                    fps_den: D,
                                    fps_num: R
                                },
                                sar_ratio: {
                                    width: w,
                                    height: L
                                },
                                codec_size: {
                                    width: V,
                                    height: G
                                },
                                present_size: {
                                    width: z,
                                    height: G
                                }
                            }
                    }
                }, {
                    key: "_skipScalingList",
                    value: function (e, t) {
                        for (var i = 8, n = 8, r = 0, s = 0; t > s; s++)
                            0 !== n && (r = e.readSEG(),
                                n = (i + r + 256) % 256),
                                i = 0 === n ? i : n
                    }
                }, {
                    key: "getProfileString",
                    value: function (e) {
                        switch (e) {
                            case 66:
                                return "Baseline";
                            case 77:
                                return "Main";
                            case 88:
                                return "Extended";
                            case 100:
                                return "High";
                            case 110:
                                return "High10";
                            case 122:
                                return "High422";
                            case 244:
                                return "High444";
                            default:
                                return "Unknown"
                        }
                    }
                }, {
                    key: "getLevelString",
                    value: function (e) {
                        return (e / 10).toFixed(1)
                    }
                }, {
                    key: "getChromaFormatString",
                    value: function (e) {
                        switch (e) {
                            case 420:
                                return "4:2:0";
                            case 422:
                                return "4:2:2";
                            case 444:
                                return "4:4:4";
                            default:
                                return "Unknown"
                        }
                    }
                }]),
                    e
            }();
        i.default = a
    }
        , {
        "./exp-golomb.js": 17
    }],
    22: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            var i = e;
            if (null == i || "object" !== (void 0 === i ? "undefined" : u(i)))
                throw new O.InvalidArgumentException("MediaDataSource must be an javascript object!");
            if (!i.hasOwnProperty("type"))
                throw new O.InvalidArgumentException("MediaDataSource must has type field to indicate video file type!");
            if ("flv" === i.type)
                return new p.default(i, t);
            if ("mp4" === i.type)
                return new y.default(i, t);
            throw new O.InvalidArgumentException("Only support flv or mp4 video file type!")
        }
        function s() {
            return c.default.supportMSEH264Playback()
        }
        function o() {
            return c.default.getFeatureList()
        }
        function a() {
            return c.default.getVersion()
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , d = e("./utils/polyfill.js")
            , h = n(d)
            , l = e("./core/features.js")
            , c = n(l)
            , f = e("./utils/requestAnimationFrame")
            , _ = n(f)
            , m = e("./player/flv-player.js")
            , p = n(m)
            , v = e("./player/mp4-player.js")
            , y = n(v)
            , g = e("./player/player-events.js")
            , b = n(g)
            , S = e("./player/player-errors.js")
            , E = e("./utils/logging-control.js")
            , k = n(E)
            , O = e("./utils/exception.js");
        h.default.install(),
            _.default.install();
        var w = {};
        w.createPlayer = r,
            w.isSupported = s,
            w.getFeatureList = o,
            w.getVersion = a,
            w.Events = b.default,
            w.ErrorTypes = S.ErrorTypes,
            w.ErrorDetails = S.ErrorDetails,
            w.FlvPlayer = p.default,
            w.LoggingControl = k.default,
            Object.defineProperty(w, "version", {
                enumerable: !0,
                get: function () {
                    return "1.0.15"
                }
            }),
            i.default = w
    }
        , {
        "./core/features.js": 6,
        "./player/flv-player.js": 34,
        "./player/mp4-player.js": 35,
        "./player/player-errors.js": 36,
        "./player/player-events.js": 37,
        "./utils/exception.js": 43,
        "./utils/logging-control.js": 45,
        "./utils/polyfill.js": 46,
        "./utils/requestAnimationFrame": 47
    }],
    23: [function (e, t) {
        "use strict";
        t.exports = e("./fxJsPlayer.js").default
    }
        , {
        "./fxJsPlayer.js": 22
    }],
    24: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function s(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function o(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , u = function e(t, i, n) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, i);
                if (void 0 === r) {
                    var s = Object.getPrototypeOf(t);
                    return null === s ? void 0 : e(s, i, n)
                }
                if ("value" in r)
                    return r.value;
                var o = r.get;
                return void 0 !== o ? o.call(n) : void 0
            }
            , d = function () {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function (t, i, n) {
                    return i && e(t.prototype, i),
                        n && e(t, n),
                        t
                }
            }()
            , h = e("../utils/logger.js")
            , l = n(h)
            , c = e("../utils/browser.js")
            , f = n(c)
            , _ = e("./loader.js")
            , m = e("../utils/exception.js")
            , p = function (e) {
                function t(e, i) {
                    r(this, t);
                    var n = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "fetch-stream-loader"));
                    return n.TAG = "FetchStreamLoader",
                        n._seekHandler = e,
                        n._config = i,
                        n._needStash = !0,
                        n._requestAbort = !1,
                        n._contentLength = null,
                        n._receivedLength = 0,
                        n
                }
                return o(t, e),
                    d(t, null, [{
                        key: "isSupported",
                        value: function () {
                            try {
                                var e = f.default.msedge && f.default.version.minor >= 15048
                                    , t = !f.default.msedge || e;
                                return self.fetch && self.ReadableStream && t
                            } catch (e) {
                                return !1
                            }
                        }
                    }]),
                    d(t, [{
                        key: "destroy",
                        value: function () {
                            this.isWorking() && this.abort(),
                                u(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                        }
                    }, {
                        key: "open",
                        value: function (e, t) {
                            var i = this;
                            this._dataSource = e,
                                this._range = t;
                            var n = e.url;
                            this._config.reuseRedirectedURL && void 0 != e.redirectedURL && (n = e.redirectedURL);
                            var r = this._seekHandler.getConfig(n, t)
                                , s = new self.Headers;
                            if ("object" === a(r.headers)) {
                                var o = r.headers;
                                for (var u in o)
                                    o.hasOwnProperty(u) && s.append(u, o[u])
                            }
                            var d = {
                                method: "GET",
                                headers: s,
                                mode: "cors",
                                cache: "default",
                                referrerPolicy: "no-referrer-when-downgrade"
                            };
                            !1 === e.cors && (d.mode = "same-origin"),
                                e.withCredentials && (d.credentials = "include"),
                                e.referrerPolicy && (d.referrerPolicy = e.referrerPolicy),
                                this._status = _.LoaderStatus.kConnecting,
                                self.fetch(r.url, d).then(function (e) {
                                    if (l.default.i(i.TAG, "response isOk:" + e.ok + ", status:" + e.status, !0),
                                        e.ok && e.status >= 200 && e.status <= 299) {
                                        if (e.url !== r.url && i._onURLRedirect) {
                                            var t = i._seekHandler.removeURLParameters(e.url);
                                            i._onURLRedirect(t)
                                        }
                                        var n = e.headers.get("Content-Length");
                                        return null != n && (i._contentLength = parseInt(n),
                                            0 !== i._contentLength && i._onContentLengthKnown && i._onContentLengthKnown(i._contentLength)),
                                            i._pump.call(i, e.body.getReader())
                                    }
                                    if (i._status = _.LoaderStatus.kError,
                                        !i._onError)
                                        throw new m.RuntimeException("FetchStreamLoader: Http code invalid, " + e.status + " " + e.statusText);
                                    i._onError(_.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
                                        code: e.status,
                                        msg: e.statusText
                                    })
                                }).catch(function (e) {
                                    if (i._status = _.LoaderStatus.kError,
                                        !i._onError)
                                        throw e;
                                    i._onError(_.LoaderErrors.EXCEPTION, {
                                        code: -1,
                                        msg: e.message
                                    })
                                })
                        }
                    }, {
                        key: "abort",
                        value: function () {
                            this._requestAbort = !0
                        }
                    }, {
                        key: "_pump",
                        value: function (e) {
                            var t = this;
                            return e.read().then(function (i) {
                                if (!i.done) {
                                    if (!0 === t._requestAbort)
                                        return t._requestAbort = !1,
                                            t._status = _.LoaderStatus.kComplete,
                                            e.cancel();
                                    t._status = _.LoaderStatus.kBuffering;
                                    var n = i.value.buffer
                                        , r = t._range.from + t._receivedLength;
                                    return t._receivedLength += n.byteLength,
                                        t._onDataArrival && t._onDataArrival(n, r, t._receivedLength),
                                        t._pump(e)
                                }
                                t._status = _.LoaderStatus.kComplete,
                                    t._onComplete && t._onComplete(t._range.from, t._range.from + t._receivedLength - 1)
                            }).catch(function (e) {
                                if (11 !== e.code || !f.default.msedge) {
                                    t._status = _.LoaderStatus.kError;
                                    var i = 0
                                        , n = null;
                                    if (19 !== e.code && "network error" !== e.message || !(null === t._contentLength || null !== t._contentLength && t._receivedLength < t._contentLength) ? (i = _.LoaderErrors.EXCEPTION,
                                        n = {
                                            code: e.code,
                                            msg: e.message
                                        }) : (i = _.LoaderErrors.EARLY_EOF,
                                            n = {
                                                code: e.code,
                                                msg: "Fetch stream meet Early-EOF"
                                            }),
                                        !t._onError)
                                        throw new m.RuntimeException(n.msg);
                                    t._onError(i, n)
                                }
                            })
                        }
                    }]),
                    t
            }(_.BaseLoader);
        i.default = p
    }
        , {
        "../utils/browser.js": 42,
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "./loader.js": 26
    }],
    25: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , o = e("../utils/logger.js")
            , a = n(o)
            , u = e("./speed-sampler.js")
            , d = n(u)
            , h = e("./loader.js")
            , l = e("./fetch-stream-loader.js")
            , c = n(l)
            , f = e("./xhr-moz-chunked-loader.js")
            , _ = n(f)
            , m = e("./xhr-msstream-loader.js")
            , p = (n(m),
                e("./xhr-range-loader.js"))
            , v = n(p)
            , y = e("./websocket-loader.js")
            , g = n(y)
            , b = e("./range-seek-handler.js")
            , S = n(b)
            , E = e("./param-seek-handler.js")
            , k = n(E)
            , O = e("../utils/exception.js")
            , w = function () {
                function e(t, i, n) {
                    r(this, e),
                        this.TAG = "IOController",
                        this._config = i,
                        this._extraData = n,
                        this._stashInitialSize = 393216,
                        void 0 != i.stashInitialSize && i.stashInitialSize > 0 && (this._stashInitialSize = i.stashInitialSize),
                        this._stashUsed = 0,
                        this._stashSize = this._stashInitialSize,
                        this._bufferSize = 3145728,
                        this._stashBuffer = new ArrayBuffer(this._bufferSize),
                        this._stashByteStart = 0,
                        this._enableStash = !0,
                        !1 === i.enableStashBuffer && (this._enableStash = !1),
                        this._loader = null,
                        this._loaderClass = null,
                        this._seekHandler = null,
                        this._dataSource = t,
                        this._isWebSocketURL = /wss?:\/\/(.+?)/.test(t.url),
                        this._refTotalLength = t.filesize ? t.filesize : null,
                        this._totalLength = this._refTotalLength,
                        this._fullRequestFlag = !1,
                        this._currentRange = null,
                        this._redirectedURL = null,
                        this._speedNormalized = 0,
                        this._speedSampler = new d.default,
                        this._speedNormalizeList = [64, 128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096],
                        this._isEarlyEofReconnecting = !1,
                        this._paused = !1,
                        this._resumeFrom = 0,
                        this._onDataArrival = null,
                        this._onSeeked = null,
                        this._onError = null,
                        this._onComplete = null,
                        this._onRedirect = null,
                        this._onRecoveredEarlyEof = null,
                        this._selectSeekHandler(),
                        this._selectLoader(),
                        this._createLoader()
                }
                return s(e, [{
                    key: "destroy",
                    value: function () {
                        this._loader.isWorking() && this._loader.abort(),
                            this._loader.destroy(),
                            this._loader = null,
                            this._loaderClass = null,
                            this._dataSource = null,
                            this._stashBuffer = null,
                            this._stashUsed = this._stashSize = this._bufferSize = this._stashByteStart = 0,
                            this._currentRange = null,
                            this._speedSampler = null,
                            this._isEarlyEofReconnecting = !1,
                            this._onDataArrival = null,
                            this._onSeeked = null,
                            this._onError = null,
                            this._onComplete = null,
                            this._onRedirect = null,
                            this._onRecoveredEarlyEof = null,
                            this._extraData = null
                    }
                }, {
                    key: "isWorking",
                    value: function () {
                        return this._loader && this._loader.isWorking() && !this._paused
                    }
                }, {
                    key: "isPaused",
                    value: function () {
                        return this._paused
                    }
                }, {
                    key: "_selectSeekHandler",
                    value: function () {
                        var e = this._config;
                        if ("range" === e.seekType)
                            this._seekHandler = new S.default(this._config.rangeLoadZeroStart);
                        else if ("param" === e.seekType) {
                            var t = e.seekParamStart || "bstart"
                                , i = e.seekParamEnd || "bend";
                            this._seekHandler = new k.default(t, i)
                        } else {
                            if ("custom" !== e.seekType)
                                throw new O.InvalidArgumentException("Invalid seekType in config: " + e.seekType);
                            if ("function" != typeof e.customSeekHandler)
                                throw new O.InvalidArgumentException("Custom seekType specified in config but invalid customSeekHandler!");
                            this._seekHandler = new e.customSeekHandler
                        }
                    }
                }, {
                    key: "_selectLoader",
                    value: function () {
                        if (this._isWebSocketURL)
                            this._loaderClass = g.default,
                                a.default.v(this.TAG, "loader: WebSocketLoader", !0);
                        else if (c.default.isSupported())
                            this._loaderClass = c.default,
                                a.default.v(this.TAG, "loader: FetchStreamLoader", !0);
                        else if (_.default.isSupported())
                            this._loaderClass = _.default,
                                a.default.v(this.TAG, "loader: MozChunkedLoader", !0);
                        else {
                            if (!v.default.isSupported())
                                throw a.default.e(this.TAG, "Your browser doesn't support xhr with arraybuffer responseType!"),
                                new O.RuntimeException("Your browser doesn't support xhr with arraybuffer responseType!");
                            this._loaderClass = v.default,
                                a.default.v(this.TAG, "loader: RangeLoader", !0)
                        }
                    }
                }, {
                    key: "_createLoader",
                    value: function () {
                        this._loader = new this._loaderClass(this._seekHandler, this._config),
                            !1 === this._loader.needStashBuffer && (this._enableStash = !1),
                            this._loader.onContentLengthKnown = this._onContentLengthKnown.bind(this),
                            this._loader.onURLRedirect = this._onURLRedirect.bind(this),
                            this._loader.onDataArrival = this._onLoaderChunkArrival.bind(this),
                            this._loader.onComplete = this._onLoaderComplete.bind(this),
                            this._loader.onError = this._onLoaderError.bind(this)
                    }
                }, {
                    key: "open",
                    value: function (e) {
                        a.default.elk(this.TAG, "open " + this._dataSource.url),
                            this._currentRange = {
                                from: 0,
                                to: -1
                            },
                            e && (this._currentRange.from = e),
                            this._speedSampler.reset(),
                            e || (this._fullRequestFlag = !0),
                            this._loader.open(this._dataSource, Object.assign({}, this._currentRange))
                    }
                }, {
                    key: "abort",
                    value: function () {
                        this._loader.abort(),
                            this._paused && (this._paused = !1,
                                this._resumeFrom = 0)
                    }
                }, {
                    key: "pause",
                    value: function () {
                        this.isWorking() && (this._loader.abort(),
                            0 !== this._stashUsed ? (this._resumeFrom = this._stashByteStart,
                                this._currentRange.to = this._stashByteStart - 1) : this._resumeFrom = this._currentRange.to + 1,
                            this._stashUsed = 0,
                            this._stashByteStart = 0,
                            this._paused = !0)
                    }
                }, {
                    key: "resume",
                    value: function () {
                        if (this._paused) {
                            this._paused = !1;
                            var e = this._resumeFrom;
                            this._resumeFrom = 0,
                                this._internalSeek(e, !0)
                        }
                    }
                }, {
                    key: "seek",
                    value: function (e) {
                        this._paused = !1,
                            this._stashUsed = 0,
                            this._stashByteStart = 0,
                            this._internalSeek(e, !0)
                    }
                }, {
                    key: "_internalSeek",
                    value: function (e, t) {
                        this._loader.isWorking() && this._loader.abort(),
                            this._flushStashBuffer(t),
                            this._loader.destroy(),
                            this._loader = null;
                        var i = {
                            from: e,
                            to: -1
                        };
                        this._currentRange = {
                            from: i.from,
                            to: -1
                        },
                            this._speedSampler.reset(),
                            this._stashSize = this._stashInitialSize,
                            this._createLoader(),
                            this._loader.open(this._dataSource, i),
                            this._onSeeked && this._onSeeked()
                    }
                }, {
                    key: "updateUrl",
                    value: function (e) {
                        if (!e || "string" != typeof e || 0 === e.length)
                            throw new O.InvalidArgumentException("Url must be a non-empty string!");
                        this._dataSource.url = e
                    }
                }, {
                    key: "_expandBuffer",
                    value: function (e) {
                        for (var t = this._stashSize; e > t + 1048576;)
                            t *= 2;
                        if ((t += 1048576) !== this._bufferSize) {
                            var i = new ArrayBuffer(t);
                            if (this._stashUsed > 0) {
                                var n = new Uint8Array(this._stashBuffer, 0, this._stashUsed);
                                new Uint8Array(i, 0, t).set(n, 0)
                            }
                            this._stashBuffer = i,
                                this._bufferSize = t
                        }
                    }
                }, {
                    key: "_normalizeSpeed",
                    value: function (e) {
                        var t = this._speedNormalizeList
                            , i = t.length - 1
                            , n = 0
                            , r = 0
                            , s = i;
                        if (e < t[0])
                            return t[0];
                        for (; s >= r;) {
                            if ((n = r + Math.floor((s - r) / 2)) === i || e >= t[n] && e < t[n + 1])
                                return t[n];
                            t[n] < e ? r = n + 1 : s = n - 1
                        }
                    }
                }, {
                    key: "_adjustStashSize",
                    value: function (e) {
                        var t = 0;
                        (t = this._config.isLive ? e : 512 > e ? e : e >= 512 && 1024 >= e ? Math.floor(1.5 * e) : 2 * e) > 8192 && (t = 8192);
                        var i = 1024 * t + 1048576;
                        this._bufferSize < i && this._expandBuffer(i),
                            this._stashSize = 1024 * t
                    }
                }, {
                    key: "_dispatchChunks",
                    value: function (e, t) {
                        return this._currentRange.to = t + e.byteLength - 1,
                            this._onDataArrival(e, t)
                    }
                }, {
                    key: "_onURLRedirect",
                    value: function (e) {
                        this._redirectedURL = e,
                            this._onRedirect && this._onRedirect(e)
                    }
                }, {
                    key: "_onContentLengthKnown",
                    value: function (e) {
                        e && this._fullRequestFlag && (this._totalLength = e,
                            this._fullRequestFlag = !1)
                    }
                }, {
                    key: "_onLoaderChunkArrival",
                    value: function (e, t) {
                        if (this._speedSampler.addBytes(e.byteLength),
                            !this._onDataArrival)
                            throw new O.IllegalStateException("IOController: No existing consumer (onDataArrival) callback!");
                        if (!this._paused) {
                            this._isEarlyEofReconnecting && (this._isEarlyEofReconnecting = !1,
                                this._onRecoveredEarlyEof && this._onRecoveredEarlyEof());
                            var n = this._speedSampler.lastSecondKBps;
                            if (0 !== n) {
                                var r = this._normalizeSpeed(n);
                                this._speedNormalized !== r && (this._speedNormalized = r,
                                    this._adjustStashSize(r))
                            }
                            if (this._enableStash)
                                if (0 === this._stashUsed && 0 === this._stashByteStart && (this._stashByteStart = t),
                                    this._stashUsed + e.byteLength <= this._stashSize) {
                                    var s = new Uint8Array(this._stashBuffer, 0, this._stashSize);
                                    s.set(new Uint8Array(e), this._stashUsed),
                                        this._stashUsed += e.byteLength
                                } else {
                                    var o = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
                                    if (this._stashUsed > 0) {
                                        var a = this._stashBuffer.slice(0, this._stashUsed)
                                            , u = this._dispatchChunks(a, this._stashByteStart);
                                        if (u < a.byteLength) {
                                            if (u > 0) {
                                                var d = new Uint8Array(a, u);
                                                o.set(d, 0),
                                                    this._stashUsed = d.byteLength,
                                                    this._stashByteStart += u
                                            }
                                        } else
                                            this._stashUsed = 0,
                                                this._stashByteStart += u;
                                        this._stashUsed + e.byteLength > this._bufferSize && (this._expandBuffer(this._stashUsed + e.byteLength),
                                            o = new Uint8Array(this._stashBuffer, 0, this._bufferSize)),
                                            o.set(new Uint8Array(e), this._stashUsed),
                                            this._stashUsed += e.byteLength
                                    } else {
                                        var h = this._dispatchChunks(e, t);
                                        if (h < e.byteLength) {
                                            var l = e.byteLength - h;
                                            l > this._bufferSize && (this._expandBuffer(l),
                                                o = new Uint8Array(this._stashBuffer, 0, this._bufferSize)),
                                                o.set(new Uint8Array(e, h), 0),
                                                this._stashUsed += l,
                                                this._stashByteStart = t + h
                                        }
                                    }
                                }
                            else if (0 === this._stashUsed) {
                                var c = this._dispatchChunks(e, t);
                                if (c < e.byteLength) {
                                    var f = e.byteLength - c;
                                    f > this._bufferSize && this._expandBuffer(f);
                                    var _ = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
                                    _.set(new Uint8Array(e, c), 0),
                                        this._stashUsed += f,
                                        this._stashByteStart = t + c
                                }
                            } else {
                                this._stashUsed + e.byteLength > this._bufferSize && this._expandBuffer(this._stashUsed + e.byteLength);
                                var m = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
                                m.set(new Uint8Array(e), this._stashUsed),
                                    this._stashUsed += e.byteLength;
                                var p = this._dispatchChunks(this._stashBuffer.slice(0, this._stashUsed), this._stashByteStart);
                                if (p < this._stashUsed && p > 0) {
                                    var v = new Uint8Array(this._stashBuffer, p);
                                    m.set(v, 0)
                                }
                                this._stashUsed -= p,
                                    this._stashByteStart += p
                            }
                        }
                    }
                }, {
                    key: "_flushStashBuffer",
                    value: function (e) {
                        if (this._stashUsed > 0) {
                            var t = this._stashBuffer.slice(0, this._stashUsed)
                                , i = this._dispatchChunks(t, this._stashByteStart)
                                , n = t.byteLength - i;
                            if (i < t.byteLength) {
                                if (!e) {
                                    if (i > 0) {
                                        var r = new Uint8Array(this._stashBuffer, 0, this._bufferSize)
                                            , s = new Uint8Array(t, i);
                                        r.set(s, 0),
                                            this._stashUsed = s.byteLength,
                                            this._stashByteStart += i
                                    }
                                    return 0
                                }
                                a.default.w(this.TAG, n + " bytes unconsumed data remain when flush buffer, dropped")
                            }
                            return this._stashUsed = 0,
                                this._stashByteStart = 0,
                                n
                        }
                        return 0
                    }
                }, {
                    key: "_onLoaderComplete",
                    value: function (e, t) {
                        a.default.i(this.TAG, "load complete " + e + "-" + t, !0),
                            this._flushStashBuffer(!0),
                            this._onComplete && this._onComplete(this._extraData)
                    }
                }, {
                    key: "_onLoaderError",
                    value: function (e, t) {
                        switch (a.default.e(this.TAG, "Loader error, code = " + t.code + ", msg = " + t.msg),
                        this._flushStashBuffer(!1),
                        this._isEarlyEofReconnecting && (this._isEarlyEofReconnecting = !1,
                            e = h.LoaderErrors.UNRECOVERABLE_EARLY_EOF),
                        e) {
                            case h.LoaderErrors.EARLY_EOF:
                                if (!this._config.isLive && this._totalLength) {
                                    var i = this._currentRange.to + 1;
                                    return void (i < this._totalLength && (a.default.w(this.TAG, "Connection lost, trying reconnect..."),
                                        this._isEarlyEofReconnecting = !0,
                                        this._internalSeek(i, !1)))
                                }
                                e = h.LoaderErrors.UNRECOVERABLE_EARLY_EOF;
                                break;
                            case h.LoaderErrors.UNRECOVERABLE_EARLY_EOF:
                            case h.LoaderErrors.CONNECTING_TIMEOUT:
                            case h.LoaderErrors.HTTP_STATUS_CODE_INVALID:
                            case h.LoaderErrors.EXCEPTION:
                        }
                        if (!this._onError)
                            throw new O.RuntimeException("IOException: " + t.msg);
                        this._onError(e, t)
                    }
                }, {
                    key: "status",
                    get: function () {
                        return this._loader.status
                    }
                }, {
                    key: "extraData",
                    get: function () {
                        return this._extraData
                    },
                    set: function (e) {
                        this._extraData = e
                    }
                }, {
                    key: "onDataArrival",
                    get: function () {
                        return this._onDataArrival
                    },
                    set: function (e) {
                        this._onDataArrival = e
                    }
                }, {
                    key: "onSeeked",
                    get: function () {
                        return this._onSeeked
                    },
                    set: function (e) {
                        this._onSeeked = e
                    }
                }, {
                    key: "onError",
                    get: function () {
                        return this._onError
                    },
                    set: function (e) {
                        this._onError = e
                    }
                }, {
                    key: "onComplete",
                    get: function () {
                        return this._onComplete
                    },
                    set: function (e) {
                        this._onComplete = e
                    }
                }, {
                    key: "onRedirect",
                    get: function () {
                        return this._onRedirect
                    },
                    set: function (e) {
                        this._onRedirect = e
                    }
                }, {
                    key: "onRecoveredEarlyEof",
                    get: function () {
                        return this._onRecoveredEarlyEof
                    },
                    set: function (e) {
                        this._onRecoveredEarlyEof = e
                    }
                }, {
                    key: "currentURL",
                    get: function () {
                        return this._dataSource.url
                    }
                }, {
                    key: "hasRedirect",
                    get: function () {
                        return null != this._redirectedURL || void 0 != this._dataSource.redirectedURL
                    }
                }, {
                    key: "currentRedirectedURL",
                    get: function () {
                        return this._redirectedURL || this._dataSource.redirectedURL
                    }
                }, {
                    key: "currentSpeed",
                    get: function () {
                        return this._loaderClass === v.default ? this._loader.currentSpeed : this._speedSampler.lastSecondKBps
                    }
                }, {
                    key: "receivedBytes",
                    get: function () {
                        return this._speedSampler.totalBytes
                    }
                }, {
                    key: "loaderType",
                    get: function () {
                        return this._loader.type
                    }
                }]),
                    e
            }();
        i.default = w
    }
        , {
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "./fetch-stream-loader.js": 24,
        "./loader.js": 26,
        "./param-seek-handler.js": 27,
        "./range-seek-handler.js": 28,
        "./speed-sampler.js": 29,
        "./websocket-loader.js": 30,
        "./xhr-moz-chunked-loader.js": 31,
        "./xhr-msstream-loader.js": 32,
        "./xhr-range-loader.js": 33
    }],
    26: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.BaseLoader = i.LoaderErrors = i.LoaderStatus = void 0;
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = e("../utils/exception.js")
            , o = i.LoaderStatus = {
                kIdle: 0,
                kConnecting: 1,
                kBuffering: 2,
                kError: 3,
                kComplete: 4
            };
        i.LoaderErrors = {
            OK: "OK",
            EXCEPTION: "Exception",
            HTTP_STATUS_CODE_INVALID: "HttpStatusCodeInvalid",
            CONNECTING_TIMEOUT: "ConnectingTimeout",
            EARLY_EOF: "EarlyEof",
            UNRECOVERABLE_EARLY_EOF: "UnrecoverableEarlyEof"
        },
            i.BaseLoader = function () {
                function e(t) {
                    n(this, e),
                        this._type = t || "undefined",
                        this._status = o.kIdle,
                        this._needStash = !1,
                        this._onContentLengthKnown = null,
                        this._onURLRedirect = null,
                        this._onDataArrival = null,
                        this._onError = null,
                        this._onComplete = null
                }
                return r(e, [{
                    key: "destroy",
                    value: function () {
                        this._status = o.kIdle,
                            this._onContentLengthKnown = null,
                            this._onURLRedirect = null,
                            this._onDataArrival = null,
                            this._onError = null,
                            this._onComplete = null
                    }
                }, {
                    key: "isWorking",
                    value: function () {
                        return this._status === o.kConnecting || this._status === o.kBuffering
                    }
                }, {
                    key: "open",
                    value: function () {
                        throw new s.NotImplementedException("Unimplemented abstract function!")
                    }
                }, {
                    key: "abort",
                    value: function () {
                        throw new s.NotImplementedException("Unimplemented abstract function!")
                    }
                }, {
                    key: "type",
                    get: function () {
                        return this._type
                    }
                }, {
                    key: "status",
                    get: function () {
                        return this._status
                    }
                }, {
                    key: "needStashBuffer",
                    get: function () {
                        return this._needStash
                    }
                }, {
                    key: "onContentLengthKnown",
                    get: function () {
                        return this._onContentLengthKnown
                    },
                    set: function (e) {
                        this._onContentLengthKnown = e
                    }
                }, {
                    key: "onURLRedirect",
                    get: function () {
                        return this._onURLRedirect
                    },
                    set: function (e) {
                        this._onURLRedirect = e
                    }
                }, {
                    key: "onDataArrival",
                    get: function () {
                        return this._onDataArrival
                    },
                    set: function (e) {
                        this._onDataArrival = e
                    }
                }, {
                    key: "onError",
                    get: function () {
                        return this._onError
                    },
                    set: function (e) {
                        this._onError = e
                    }
                }, {
                    key: "onComplete",
                    get: function () {
                        return this._onComplete
                    },
                    set: function (e) {
                        this._onComplete = e
                    }
                }]),
                    e
            }()
    }
        , {
        "../utils/exception.js": 43
    }],
    27: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = function () {
                function e(t, i) {
                    n(this, e),
                        this._startName = t,
                        this._endName = i
                }
                return r(e, [{
                    key: "getConfig",
                    value: function (e, t) {
                        var i = e;
                        if (0 !== t.from || -1 !== t.to) {
                            var n = !0;
                            -1 === i.indexOf("?") && (i += "?",
                                n = !1),
                                n && (i += "&"),
                                i += this._startName + "=" + t.from.toString(),
                                -1 !== t.to && (i += "&" + this._endName + "=" + t.to.toString())
                        }
                        return {
                            url: i,
                            headers: {}
                        }
                    }
                }, {
                    key: "removeURLParameters",
                    value: function (e) {
                        var t = e.split("?")[0]
                            , i = void 0
                            , n = e.indexOf("?");
                        -1 !== n && (i = e.substring(n + 1));
                        var r = "";
                        if (void 0 != i && i.length > 0)
                            for (var s = i.split("&"), o = 0; o < s.length; o++) {
                                var a = s[o].split("=")
                                    , u = o > 0;
                                a[0] !== this._startName && a[0] !== this._endName && (u && (r += "&"),
                                    r += s[o])
                            }
                        return 0 === r.length ? t : t + "?" + r
                    }
                }]),
                    e
            }();
        i.default = s
    }
        , {}],
    28: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = function () {
                function e(t) {
                    n(this, e),
                        this._zeroStart = t || !1
                }
                return r(e, [{
                    key: "getConfig",
                    value: function (e, t) {
                        var i = {};
                        if (0 !== t.from || -1 !== t.to) {
                            var n = void 0;
                            n = -1 !== t.to ? "bytes=" + t.from.toString() + "-" + t.to.toString() : "bytes=" + t.from.toString() + "-",
                                i.Range = n
                        } else
                            this._zeroStart && (i.Range = "bytes=0-");
                        return {
                            url: e,
                            headers: i
                        }
                    }
                }, {
                    key: "removeURLParameters",
                    value: function (e) {
                        return e
                    }
                }]),
                    e
            }();
        i.default = s
    }
        , {}],
    29: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = function () {
                function e() {
                    n(this, e),
                        this._firstCheckpoint = 0,
                        this._lastCheckpoint = 0,
                        this._intervalBytes = 0,
                        this._totalBytes = 0,
                        this._lastSecondBytes = 0,
                        this._now = self.performance && self.performance.now ? self.performance.now.bind(self.performance) : Date.now
                }
                return r(e, [{
                    key: "reset",
                    value: function () {
                        this._firstCheckpoint = this._lastCheckpoint = 0,
                            this._totalBytes = this._intervalBytes = 0,
                            this._lastSecondBytes = 0
                    }
                }, {
                    key: "addBytes",
                    value: function (e) {
                        0 === this._firstCheckpoint ? (this._firstCheckpoint = this._now(),
                            this._lastCheckpoint = this._firstCheckpoint,
                            this._intervalBytes += e,
                            this._totalBytes += e) : this._now() - this._lastCheckpoint < 1e3 ? (this._intervalBytes += e,
                                this._totalBytes += e) : (this._lastSecondBytes = this._intervalBytes,
                                    this._intervalBytes = e,
                                    this._totalBytes += e,
                                    this._lastCheckpoint = this._now())
                    }
                }, {
                    key: "currentKBps",
                    get: function () {
                        this.addBytes(0);
                        var e = (this._now() - this._lastCheckpoint) / 1e3;
                        return 0 == e && (e = 1),
                            this._intervalBytes / e / 1024
                    }
                }, {
                    key: "lastSecondKBps",
                    get: function () {
                        return this.addBytes(0),
                            0 !== this._lastSecondBytes ? this._lastSecondBytes / 1024 : this._now() - this._lastCheckpoint >= 500 ? this.currentKBps : 0
                    }
                }, {
                    key: "averageKBps",
                    get: function () {
                        var e = (this._now() - this._firstCheckpoint) / 1e3;
                        return this._totalBytes / e / 1024
                    }
                }, {
                    key: "totalBytes",
                    get: function () {
                        return this._totalBytes
                    }
                }]),
                    e
            }();
        i.default = s
    }
        , {}],
    30: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function r(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function s(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function e(t, i, n) {
            null === t && (t = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(t, i);
            if (void 0 === r) {
                var s = Object.getPrototypeOf(t);
                return null === s ? void 0 : e(s, i, n)
            }
            if ("value" in r)
                return r.value;
            var o = r.get;
            return void 0 !== o ? o.call(n) : void 0
        }
            , a = function () {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function (t, i, n) {
                    return i && e(t.prototype, i),
                        n && e(t, n),
                        t
                }
            }()
            , u = e("../utils/logger.js")
            , d = (function (e) {
                e && e.__esModule
            }(u),
                e("./loader.js"))
            , h = e("../utils/exception.js")
            , l = function (e) {
                function t() {
                    n(this, t);
                    var e = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "websocket-loader"));
                    return e.TAG = "WebSocketLoader",
                        e._needStash = !0,
                        e._ws = null,
                        e._requestAbort = !1,
                        e._receivedLength = 0,
                        e
                }
                return s(t, e),
                    a(t, null, [{
                        key: "isSupported",
                        value: function () {
                            try {
                                return void 0 !== self.WebSocket
                            } catch (e) {
                                return !1
                            }
                        }
                    }]),
                    a(t, [{
                        key: "destroy",
                        value: function () {
                            this._ws && this.abort(),
                                o(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                        }
                    }, {
                        key: "open",
                        value: function (e) {
                            try {
                                var t = this._ws = new self.WebSocket(e.url);
                                t.binaryType = "arraybuffer",
                                    t.onopen = this._onWebSocketOpen.bind(this),
                                    t.onclose = this._onWebSocketClose.bind(this),
                                    t.onmessage = this._onWebSocketMessage.bind(this),
                                    t.onerror = this._onWebSocketError.bind(this),
                                    this._status = d.LoaderStatus.kConnecting
                            } catch (e) {
                                this._status = d.LoaderStatus.kError;
                                var i = {
                                    code: e.code,
                                    msg: e.message
                                };
                                if (!this._onError)
                                    throw new h.RuntimeException(i.msg);
                                this._onError(d.LoaderErrors.EXCEPTION, i)
                            }
                        }
                    }, {
                        key: "abort",
                        value: function () {
                            var e = this._ws;
                            !e || 0 !== e.readyState && 1 !== e.readyState || (this._requestAbort = !0,
                                e.close()),
                                this._ws = null,
                                this._status = d.LoaderStatus.kComplete
                        }
                    }, {
                        key: "_onWebSocketOpen",
                        value: function () {
                            this._status = d.LoaderStatus.kBuffering
                        }
                    }, {
                        key: "_onWebSocketClose",
                        value: function () {
                            return !0 === this._requestAbort ? void (this._requestAbort = !1) : (this._status = d.LoaderStatus.kComplete,
                                void (this._onComplete && this._onComplete(0, this._receivedLength - 1)))
                        }
                    }, {
                        key: "_onWebSocketMessage",
                        value: function (e) {
                            var t = this;
                            if (e.data instanceof ArrayBuffer)
                                this._dispatchArrayBuffer(e.data);
                            else if (e.data instanceof Blob) {
                                var i = new FileReader;
                                i.onload = function () {
                                    t._dispatchArrayBuffer(i.result)
                                }
                                    ,
                                    i.readAsArrayBuffer(e.data)
                            } else {
                                this._status = d.LoaderStatus.kError;
                                var n = {
                                    code: -1,
                                    msg: "Unsupported WebSocket message type: " + e.data.constructor.name
                                };
                                if (!this._onError)
                                    throw new h.RuntimeException(n.msg);
                                this._onError(d.LoaderErrors.EXCEPTION, n)
                            }
                        }
                    }, {
                        key: "_dispatchArrayBuffer",
                        value: function (e) {
                            var t = e
                                , i = this._receivedLength;
                            this._receivedLength += t.byteLength,
                                this._onDataArrival && this._onDataArrival(t, i, this._receivedLength)
                        }
                    }, {
                        key: "_onWebSocketError",
                        value: function (e) {
                            this._status = d.LoaderStatus.kError;
                            var t = {
                                code: e.code,
                                msg: e.message
                            };
                            if (!this._onError)
                                throw new h.RuntimeException(t.msg);
                            this._onError(d.LoaderErrors.EXCEPTION, t)
                        }
                    }]),
                    t
            }(d.BaseLoader);
        i.default = l
    }
        , {
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "./loader.js": 26
    }],
    31: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function r(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function s(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , a = function e(t, i, n) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, i);
                if (void 0 === r) {
                    var s = Object.getPrototypeOf(t);
                    return null === s ? void 0 : e(s, i, n)
                }
                if ("value" in r)
                    return r.value;
                var o = r.get;
                return void 0 !== o ? o.call(n) : void 0
            }
            , u = function () {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function (t, i, n) {
                    return i && e(t.prototype, i),
                        n && e(t, n),
                        t
                }
            }()
            , d = e("../utils/logger.js")
            , h = function (e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }(d)
            , l = e("./loader.js")
            , c = e("../utils/exception.js")
            , f = function (e) {
                function t(e, i) {
                    n(this, t);
                    var s = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "xhr-moz-chunked-loader"));
                    return s.TAG = "MozChunkedLoader",
                        s._seekHandler = e,
                        s._config = i,
                        s._needStash = !0,
                        s._xhr = null,
                        s._requestAbort = !1,
                        s._contentLength = null,
                        s._receivedLength = 0,
                        s._MozReadyState = null,
                        s._MozStatus = null,
                        s
                }
                return s(t, e),
                    u(t, null, [{
                        key: "isSupported",
                        value: function () {
                            try {
                                var e = new XMLHttpRequest;
                                return e.open("GET", "https://example.com", !0),
                                    e.responseType = "moz-chunked-arraybuffer",
                                    "moz-chunked-arraybuffer" === e.responseType
                            } catch (e) {
                                return h.default.w("MozChunkedLoader", e.message),
                                    !1
                            }
                        }
                    }]),
                    u(t, [{
                        key: "destroy",
                        value: function () {
                            this.isWorking() && this.abort(),
                                this._xhr && (this._xhr.onreadystatechange = null,
                                    this._xhr.onprogress = null,
                                    this._xhr.onloadend = null,
                                    this._xhr.onerror = null,
                                    this._xhr = null),
                                this._MozReadyState = null,
                                this._MozStatus = null,
                                a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                        }
                    }, {
                        key: "open",
                        value: function (e, t) {
                            this._dataSource = e,
                                this._range = t;
                            var i = e.url;
                            this._config.reuseRedirectedURL && void 0 != e.redirectedURL && (i = e.redirectedURL);
                            var n = this._seekHandler.getConfig(i, t);
                            this._requestURL = n.url;
                            var r = this._xhr = new XMLHttpRequest;
                            if (r.open("GET", n.url, !0),
                                r.responseType = "moz-chunked-arraybuffer",
                                r.onreadystatechange = this._onReadyStateChange.bind(this),
                                r.onprogress = this._onProgress.bind(this),
                                r.onloadend = this._onLoadEnd.bind(this),
                                r.onerror = this._onXhrError.bind(this),
                                e.withCredentials && r.withCredentials && (r.withCredentials = !0),
                                "object" === o(n.headers)) {
                                var s = n.headers;
                                for (var a in s)
                                    s.hasOwnProperty(a) && r.setRequestHeader(a, s[a])
                            }
                            this._status = l.LoaderStatus.kConnecting,
                                r.send()
                        }
                    }, {
                        key: "abort",
                        value: function () {
                            this._requestAbort = !0,
                                this._xhr && this._xhr.abort(),
                                this._status = l.LoaderStatus.kComplete
                        }
                    }, {
                        key: "_onReadyStateChange",
                        value: function (e) {
                            var t = e.target;
                            if (t.readyState == this._MozReadyState && t.status == this._MozStatus || (this._MozReadyState = t.readyState,
                                this._MozStatus = t.status,
                                h.default.i(this.TAG, "readyState:" + t.readyState + ", status:" + t.status, !0)),
                                2 === t.readyState) {
                                if (void 0 != t.responseURL && t.responseURL !== this._requestURL && this._onURLRedirect) {
                                    var i = this._seekHandler.removeURLParameters(t.responseURL);
                                    this._onURLRedirect(i)
                                }
                                if (0 !== t.status && (t.status < 200 || t.status > 299)) {
                                    if (this._status = l.LoaderStatus.kError,
                                        !this._onError)
                                        throw new c.RuntimeException("MozChunkedLoader: Http code invalid, " + t.status + " " + t.statusText);
                                    this._onError(l.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
                                        code: t.status,
                                        msg: t.statusText
                                    })
                                } else
                                    this._status = l.LoaderStatus.kBuffering
                            }
                        }
                    }, {
                        key: "_onProgress",
                        value: function (e) {
                            null === this._contentLength && null !== e.total && 0 !== e.total && (this._contentLength = e.total,
                                this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength));
                            var t = e.target.response
                                , i = this._range.from + this._receivedLength;
                            this._receivedLength += t.byteLength,
                                this._onDataArrival && this._onDataArrival(t, i, this._receivedLength)
                        }
                    }, {
                        key: "_onLoadEnd",
                        value: function () {
                            return !0 === this._requestAbort ? void (this._requestAbort = !1) : void (this._status !== l.LoaderStatus.kError && (this._status = l.LoaderStatus.kComplete,
                                this._onComplete && this._onComplete(this._range.from, this._range.from + this._receivedLength - 1)))
                        }
                    }, {
                        key: "_onXhrError",
                        value: function (e) {
                            this._status = l.LoaderStatus.kError;
                            var t = 0
                                , i = null;
                            if (this._contentLength && e.loaded < this._contentLength ? (t = l.LoaderErrors.EARLY_EOF,
                                i = {
                                    code: -1,
                                    msg: "Moz-Chunked stream meet Early-Eof"
                                }) : (t = l.LoaderErrors.EXCEPTION,
                                    i = {
                                        code: -1,
                                        msg: e.constructor.name + " " + e.type
                                    }),
                                !this._onError)
                                throw new c.RuntimeException(i.msg);
                            this._onError(t, i)
                        }
                    }]),
                    t
            }(l.BaseLoader);
        i.default = f
    }
        , {
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "./loader.js": 26
    }],
    32: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function r(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function s(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , a = function e(t, i, n) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, i);
                if (void 0 === r) {
                    var s = Object.getPrototypeOf(t);
                    return null === s ? void 0 : e(s, i, n)
                }
                if ("value" in r)
                    return r.value;
                var o = r.get;
                return void 0 !== o ? o.call(n) : void 0
            }
            , u = function () {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function (t, i, n) {
                    return i && e(t.prototype, i),
                        n && e(t, n),
                        t
                }
            }()
            , d = e("../utils/logger.js")
            , h = function (e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }(d)
            , l = e("./loader.js")
            , c = e("../utils/exception.js")
            , f = function (e) {
                function t(e, i) {
                    n(this, t);
                    var s = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "xhr-msstream-loader"));
                    return s.TAG = "MSStreamLoader",
                        s._seekHandler = e,
                        s._config = i,
                        s._needStash = !0,
                        s._xhr = null,
                        s._reader = null,
                        s._totalRange = null,
                        s._currentRange = null,
                        s._currentRequestURL = null,
                        s._currentRedirectedURL = null,
                        s._contentLength = null,
                        s._receivedLength = 0,
                        s._bufferLimit = 16777216,
                        s._lastTimeBufferSize = 0,
                        s._isReconnecting = !1,
                        s
                }
                return s(t, e),
                    u(t, null, [{
                        key: "isSupported",
                        value: function () {
                            try {
                                if (void 0 === self.MSStream || void 0 === self.MSStreamReader)
                                    return !1;
                                var e = new XMLHttpRequest;
                                return e.open("GET", "https://example.com", !0),
                                    e.responseType = "ms-stream",
                                    "ms-stream" === e.responseType
                            } catch (e) {
                                return h.default.w("MSStreamLoader", e.message),
                                    !1
                            }
                        }
                    }]),
                    u(t, [{
                        key: "destroy",
                        value: function () {
                            this.isWorking() && this.abort(),
                                this._reader && (this._reader.onprogress = null,
                                    this._reader.onload = null,
                                    this._reader.onerror = null,
                                    this._reader = null),
                                this._xhr && (this._xhr.onreadystatechange = null,
                                    this._xhr = null),
                                a(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                        }
                    }, {
                        key: "open",
                        value: function (e, t) {
                            this._internalOpen(e, t, !1)
                        }
                    }, {
                        key: "_internalOpen",
                        value: function (e, t, i) {
                            this._dataSource = e,
                                i ? this._currentRange = t : this._totalRange = t;
                            var n = e.url;
                            this._config.reuseRedirectedURL && (void 0 != this._currentRedirectedURL ? n = this._currentRedirectedURL : void 0 != e.redirectedURL && (n = e.redirectedURL));
                            var r = this._seekHandler.getConfig(n, t);
                            this._currentRequestURL = r.url;
                            var s = this._reader = new self.MSStreamReader;
                            s.onprogress = this._msrOnProgress.bind(this),
                                s.onload = this._msrOnLoad.bind(this),
                                s.onerror = this._msrOnError.bind(this);
                            var a = this._xhr = new XMLHttpRequest;
                            if (a.open("GET", r.url, !0),
                                a.responseType = "ms-stream",
                                a.onreadystatechange = this._xhrOnReadyStateChange.bind(this),
                                a.onerror = this._xhrOnError.bind(this),
                                e.withCredentials && (a.withCredentials = !0),
                                "object" === o(r.headers)) {
                                var u = r.headers;
                                for (var d in u)
                                    u.hasOwnProperty(d) && a.setRequestHeader(d, u[d])
                            }
                            this._isReconnecting ? this._isReconnecting = !1 : this._status = l.LoaderStatus.kConnecting,
                                a.send()
                        }
                    }, {
                        key: "abort",
                        value: function () {
                            this._internalAbort(),
                                this._status = l.LoaderStatus.kComplete
                        }
                    }, {
                        key: "_internalAbort",
                        value: function () {
                            this._reader && (1 === this._reader.readyState && this._reader.abort(),
                                this._reader.onprogress = null,
                                this._reader.onload = null,
                                this._reader.onerror = null,
                                this._reader = null),
                                this._xhr && (this._xhr.abort(),
                                    this._xhr.onreadystatechange = null,
                                    this._xhr = null)
                        }
                    }, {
                        key: "_xhrOnReadyStateChange",
                        value: function (e) {
                            var t = e.target;
                            if (2 === t.readyState)
                                if (t.status >= 200 && t.status <= 299) {
                                    if (this._status = l.LoaderStatus.kBuffering,
                                        void 0 != t.responseURL) {
                                        var i = this._seekHandler.removeURLParameters(t.responseURL);
                                        t.responseURL !== this._currentRequestURL && i !== this._currentRedirectedURL && (this._currentRedirectedURL = i,
                                            this._onURLRedirect && this._onURLRedirect(i))
                                    }
                                    var n = t.getResponseHeader("Content-Length");
                                    if (null != n && null == this._contentLength) {
                                        var r = parseInt(n);
                                        r > 0 && (this._contentLength = r,
                                            this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength))
                                    }
                                } else {
                                    if (this._status = l.LoaderStatus.kError,
                                        !this._onError)
                                        throw new c.RuntimeException("MSStreamLoader: Http code invalid, " + t.status + " " + t.statusText);
                                    this._onError(l.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
                                        code: t.status,
                                        msg: t.statusText
                                    })
                                }
                            else if (3 === t.readyState && t.status >= 200 && t.status <= 299) {
                                this._status = l.LoaderStatus.kBuffering;
                                var s = t.response;
                                this._reader.readAsArrayBuffer(s)
                            }
                        }
                    }, {
                        key: "_xhrOnError",
                        value: function (e) {
                            this._status = l.LoaderStatus.kError;
                            var t = l.LoaderErrors.EXCEPTION
                                , i = {
                                    code: -1,
                                    msg: e.constructor.name + " " + e.type
                                };
                            if (!this._onError)
                                throw new c.RuntimeException(i.msg);
                            this._onError(t, i)
                        }
                    }, {
                        key: "_msrOnProgress",
                        value: function (e) {
                            var t = e.target
                                , i = t.result;
                            if (null == i)
                                return void this._doReconnectIfNeeded();
                            var n = i.slice(this._lastTimeBufferSize);
                            this._lastTimeBufferSize = i.byteLength;
                            var r = this._totalRange.from + this._receivedLength;
                            this._receivedLength += n.byteLength,
                                this._onDataArrival && this._onDataArrival(n, r, this._receivedLength),
                                i.byteLength >= this._bufferLimit && (h.default.v(this.TAG, "MSStream buffer exceeded max size near " + (r + n.byteLength) + ", reconnecting..."),
                                    this._doReconnectIfNeeded())
                        }
                    }, {
                        key: "_doReconnectIfNeeded",
                        value: function () {
                            if (null == this._contentLength || this._receivedLength < this._contentLength) {
                                this._isReconnecting = !0,
                                    this._lastTimeBufferSize = 0,
                                    this._internalAbort();
                                var e = {
                                    from: this._totalRange.from + this._receivedLength,
                                    to: -1
                                };
                                this._internalOpen(this._dataSource, e, !0)
                            }
                        }
                    }, {
                        key: "_msrOnLoad",
                        value: function () {
                            this._status = l.LoaderStatus.kComplete,
                                this._onComplete && this._onComplete(this._totalRange.from, this._totalRange.from + this._receivedLength - 1)
                        }
                    }, {
                        key: "_msrOnError",
                        value: function (e) {
                            this._status = l.LoaderStatus.kError;
                            var t = 0
                                , i = null;
                            if (this._contentLength && this._receivedLength < this._contentLength ? (t = l.LoaderErrors.EARLY_EOF,
                                i = {
                                    code: -1,
                                    msg: "MSStream meet Early-Eof"
                                }) : (t = l.LoaderErrors.EARLY_EOF,
                                    i = {
                                        code: -1,
                                        msg: e.constructor.name + " " + e.type
                                    }),
                                !this._onError)
                                throw new c.RuntimeException(i.msg);
                            this._onError(t, i)
                        }
                    }]),
                    t
            }(l.BaseLoader);
        i.default = f
    }
        , {
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "./loader.js": 26
    }],
    33: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        function s(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function o(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , u = function e(t, i, n) {
                null === t && (t = Function.prototype);
                var r = Object.getOwnPropertyDescriptor(t, i);
                if (void 0 === r) {
                    var s = Object.getPrototypeOf(t);
                    return null === s ? void 0 : e(s, i, n)
                }
                if ("value" in r)
                    return r.value;
                var o = r.get;
                return void 0 !== o ? o.call(n) : void 0
            }
            , d = function () {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function (t, i, n) {
                    return i && e(t.prototype, i),
                        n && e(t, n),
                        t
                }
            }()
            , h = e("../utils/logger.js")
            , l = n(h)
            , c = e("./speed-sampler.js")
            , f = n(c)
            , _ = e("./loader.js")
            , m = e("../utils/exception.js")
            , p = function (e) {
                function t(e, i) {
                    r(this, t);
                    var n = s(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "xhr-range-loader"));
                    return n.TAG = "RangeLoader",
                        n._seekHandler = e,
                        n._config = i,
                        n._needStash = !1,
                        n._chunkSizeKBList = [128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 5120, 6144, 7168, 8192],
                        n._currentChunkSizeKB = 384,
                        n._currentSpeedNormalized = 0,
                        n._zeroSpeedChunkCount = 0,
                        n._xhr = null,
                        n._speedSampler = new f.default,
                        n._requestAbort = !1,
                        n._waitForTotalLength = !1,
                        n._totalLengthReceived = !1,
                        n._currentRequestURL = null,
                        n._currentRedirectedURL = null,
                        n._currentRequestRange = null,
                        n._totalLength = null,
                        n._contentLength = null,
                        n._receivedLength = 0,
                        n._lastTimeLoaded = 0,
                        n
                }
                return o(t, e),
                    d(t, null, [{
                        key: "isSupported",
                        value: function () {
                            try {
                                var e = new XMLHttpRequest;
                                return e.open("GET", "https://example.com", !0),
                                    e.responseType = "arraybuffer",
                                    "arraybuffer" === e.responseType
                            } catch (e) {
                                return l.default.w("RangeLoader", e.message),
                                    !1
                            }
                        }
                    }]),
                    d(t, [{
                        key: "destroy",
                        value: function () {
                            this.isWorking() && this.abort(),
                                this._xhr && (this._xhr.onreadystatechange = null,
                                    this._xhr.onprogress = null,
                                    this._xhr.onload = null,
                                    this._xhr.onerror = null,
                                    this._xhr = null),
                                u(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
                        }
                    }, {
                        key: "open",
                        value: function (e, t) {
                            this._dataSource = e,
                                this._range = t,
                                this._status = _.LoaderStatus.kConnecting,
                                this._totalLengthReceived ? this._openSubRange() : (this._waitForTotalLength = !0,
                                    this._internalOpen(this._dataSource, {
                                        from: 0,
                                        to: -1
                                    }))
                        }
                    }, {
                        key: "_openSubRange",
                        value: function () {
                            var e = 1024 * this._currentChunkSizeKB
                                , t = this._range.from + this._receivedLength
                                , i = t + e;
                            null != this._contentLength && i - this._range.from >= this._contentLength && (i = this._range.from + this._contentLength - 1),
                                this._currentRequestRange = {
                                    from: t,
                                    to: i
                                },
                                this._internalOpen(this._dataSource, this._currentRequestRange)
                        }
                    }, {
                        key: "_internalOpen",
                        value: function (e, t) {
                            this._lastTimeLoaded = 0;
                            var i = e.url;
                            this._config.reuseRedirectedURL && (void 0 != this._currentRedirectedURL ? i = this._currentRedirectedURL : void 0 != e.redirectedURL && (i = e.redirectedURL));
                            var n = this._seekHandler.getConfig(i, t);
                            this._currentRequestURL = n.url;
                            var r = this._xhr = new XMLHttpRequest;
                            if (r.open("GET", n.url, !0),
                                r.responseType = "arraybuffer",
                                r.onreadystatechange = this._onReadyStateChange.bind(this),
                                r.onprogress = this._onProgress.bind(this),
                                r.onload = this._onLoad.bind(this),
                                r.onerror = this._onXhrError.bind(this),
                                e.withCredentials && r.withCredentials && (r.withCredentials = !0),
                                "object" === a(n.headers)) {
                                var s = n.headers;
                                for (var o in s)
                                    s.hasOwnProperty(o) && r.setRequestHeader(o, s[o])
                            }
                            r.send()
                        }
                    }, {
                        key: "abort",
                        value: function () {
                            this._requestAbort = !0,
                                this._internalAbort(),
                                this._status = _.LoaderStatus.kComplete
                        }
                    }, {
                        key: "_internalAbort",
                        value: function () {
                            this._xhr && (this._xhr.onreadystatechange = null,
                                this._xhr.onprogress = null,
                                this._xhr.onload = null,
                                this._xhr.onerror = null,
                                this._xhr.abort(),
                                this._xhr = null)
                        }
                    }, {
                        key: "_onReadyStateChange",
                        value: function (e) {
                            var t = e.target;
                            if (l.default.i(this.TAG, "readyState:" + t.readyState + ", status:" + t.status, !0),
                                2 === t.readyState) {
                                if (void 0 != t.responseURL) {
                                    var i = this._seekHandler.removeURLParameters(t.responseURL);
                                    t.responseURL !== this._currentRequestURL && i !== this._currentRedirectedURL && (this._currentRedirectedURL = i,
                                        this._onURLRedirect && this._onURLRedirect(i))
                                }
                                if (t.status >= 200 && t.status <= 299) {
                                    if (this._waitForTotalLength)
                                        return;
                                    this._status = _.LoaderStatus.kBuffering
                                } else {
                                    if (this._status = _.LoaderStatus.kError,
                                        !this._onError)
                                        throw new m.RuntimeException("RangeLoader: Http code invalid, " + t.status + " " + t.statusText);
                                    this._onError(_.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
                                        code: t.status,
                                        msg: t.statusText
                                    })
                                }
                            }
                        }
                    }, {
                        key: "_onProgress",
                        value: function (e) {
                            if (null === this._contentLength) {
                                var t = !1;
                                if (this._waitForTotalLength) {
                                    this._waitForTotalLength = !1,
                                        this._totalLengthReceived = !0,
                                        t = !0;
                                    var i = e.total;
                                    this._internalAbort(),
                                        null != i & 0 !== i && (this._totalLength = i)
                                }
                                if (this._contentLength = -1 === this._range.to ? this._totalLength - this._range.from : this._range.to - this._range.from + 1,
                                    t)
                                    return void this._openSubRange();
                                this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength)
                            }
                            var n = e.loaded - this._lastTimeLoaded;
                            this._lastTimeLoaded = e.loaded,
                                this._speedSampler.addBytes(n)
                        }
                    }, {
                        key: "_normalizeSpeed",
                        value: function (e) {
                            var t = this._chunkSizeKBList
                                , i = t.length - 1
                                , n = 0
                                , r = 0
                                , s = i;
                            if (e < t[0])
                                return t[0];
                            for (; s >= r;) {
                                if ((n = r + Math.floor((s - r) / 2)) === i || e >= t[n] && e < t[n + 1])
                                    return t[n];
                                t[n] < e ? r = n + 1 : s = n - 1
                            }
                        }
                    }, {
                        key: "_onLoad",
                        value: function (e) {
                            if (this._waitForTotalLength)
                                return void (this._waitForTotalLength = !1);
                            this._lastTimeLoaded = 0;
                            var t = this._speedSampler.lastSecondKBps;
                            if (0 === t && ++this._zeroSpeedChunkCount >= 3 && (t = this._speedSampler.currentKBps),
                                0 !== t) {
                                var i = this._normalizeSpeed(t);
                                this._currentSpeedNormalized !== i && (this._currentSpeedNormalized = i,
                                    this._currentChunkSizeKB = i)
                            }
                            var n = e.target.response
                                , r = this._range.from + this._receivedLength;
                            this._receivedLength += n.byteLength;
                            var s = !1;
                            null != this._contentLength && this._receivedLength < this._contentLength ? this._openSubRange() : s = !0,
                                this._onDataArrival && this._onDataArrival(n, r, this._receivedLength),
                                s && (this._status = _.LoaderStatus.kComplete,
                                    this._onComplete && this._onComplete(this._range.from, this._range.from + this._receivedLength - 1))
                        }
                    }, {
                        key: "_onXhrError",
                        value: function (e) {
                            this._status = _.LoaderStatus.kError;
                            var t = 0
                                , i = null;
                            if (this._contentLength && this._receivedLength > 0 && this._receivedLength < this._contentLength ? (t = _.LoaderErrors.EARLY_EOF,
                                i = {
                                    code: -1,
                                    msg: "RangeLoader meet Early-Eof"
                                }) : (t = _.LoaderErrors.EXCEPTION,
                                    i = {
                                        code: -1,
                                        msg: e.constructor.name + " " + e.type
                                    }),
                                !this._onError)
                                throw new m.RuntimeException(i.msg);
                            this._onError(t, i)
                        }
                    }, {
                        key: "currentSpeed",
                        get: function () {
                            return this._speedSampler.lastSecondKBps
                        }
                    }]),
                    t
            }(_.BaseLoader);
        i.default = p
    }
        , {
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "./loader.js": 26,
        "./speed-sampler.js": 29
    }],
    34: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , o = function () {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function (t, i, n) {
                    return i && e(t.prototype, i),
                        n && e(t, n),
                        t
                }
            }()
            , a = e("events")
            , u = n(a)
            , d = e("../utils/logger.js")
            , h = n(d)
            , l = e("../utils/browser.js")
            , c = n(l)
            , f = e("./player-events.js")
            , _ = n(f)
            , m = e("../core/transmuxer.js")
            , p = n(m)
            , v = e("../core/transmuxing-events.js")
            , y = n(v)
            , g = e("../core/mse-controller.js")
            , b = n(g)
            , S = e("../core/mse-events.js")
            , E = n(S)
            , k = e("./player-errors.js")
            , O = e("../config.js")
            , w = e("../utils/exception.js")
            , L = e("../core/features")
            , A = n(L)
            , T = (e("../io/loader.js"),
                function () {
                    function e(t, i) {
                        if (r(this, e),
                            this.TAG = "FlvPlayer",
                            this._type = "FlvPlayer",
                            this._emitter = new u.default,
                            this._config = O.createDefaultConfig(),
                            this._config.isLive = !0,
                            "object" === (void 0 === i ? "undefined" : s(i)) && Object.assign(this._config, i),
                            "flv" !== t.type.toLowerCase())
                            throw new w.InvalidArgumentException("FlvPlayer requires an flv MediaDataSource input!");
                        this.e = {
                            onvLoadedMetadata: this._onvLoadedMetadata.bind(this),
                            onvCanPlay: this._onvCanPlay.bind(this),
                            onvStalled: this._onvStalled.bind(this),
                            onvProgress: this._onvProgress.bind(this),
                            onvError: this._onvError.bind(this),
                            onvAbort: this._onvAbort.bind(this),
                            onvLoadedData: this._onvLoadedData.bind(this),
                            onvEnd: this._onvEnd.bind(this)
                        },
                            this._now = self.performance && self.performance.now ? self.performance.now.bind(self.performance) : Date.now,
                            this._requestSetTime = !1,
                            this._seekpointRecord = null,
                            this._progressChecker = null,
                            this._mediaDataSource = t,
                            this._mediaElement = null,
                            this._renderElement = null,
                            this._msectl = null,
                            this._transmuxer = null,
                            this._mseSourceOpened = !1,
                            this._hasPendingLoad = !1,
                            this._receivedCanPlay = !1,
                            this._mediaInfo = null,
                            this._statisticsInfo = null,
                            this._parentDiv = null,
                            this._stageWidth = 0,
                            this._stageHeight = 0,
                            this._setMuted = !1,
                            this._loadedMetaData = !1,
                            this._StreamStatus = "";
                        var n = c.default.chrome && (c.default.version.major < 50 || 50 === c.default.version.major && c.default.version.build < 2661);
                        this._alwaysSeekKeyframe = !!(n || c.default.msedge || c.default.msie);
                        var o = "";
                        for (var a in c.default)
                            c.default.hasOwnProperty(a) && (o += a + ":" + JSON.stringify(c.default[a]) + ",");
                        if (h.default.w(this.TAG, A.default.getVersion() + ",sid:" + h.default.SESSION_ID + "," + o, !0),
                            this._alwaysSeekKeyframe && (this._config.accurateSeek = !1),
                            this._config.hasOwnProperty("events"))
                            for (var d in this._config.events)
                                this.on(d, this._config.events[d])
                    }
                    return o(e, [{
                        key: "destroy",
                        value: function () {
                            null != this._progressChecker && (window.clearInterval(this._progressChecker),
                                this._progressChecker = null),
                                this._transmuxer && this.unload(),
                                this._mediaElement && this.detachMediaElement(),
                                this.e = null,
                                this._mediaDataSource = null,
                                this._emitter.removeAllListeners(),
                                this._emitter = null,
                                this._mediaInfo = null,
                                this._parentDiv = null,
                                this._setMuted = !1,
                                this._loadedMetaData = !1,
                                this._StreamStatus = ""
                        }
                    }, {
                        key: "on",
                        value: function (e, t) {
                            var i = this;
                            e === _.default.MEDIA_INFO ? null != this._mediaInfo && Promise.resolve().then(function () {
                                i._emitter.emit(_.default.MEDIA_INFO, i.mediaInfo)
                            }) : e === _.default.STATISTICS_INFO && null != this._statisticsInfo && Promise.resolve().then(function () {
                                i._emitter.emit(_.default.STATISTICS_INFO, i.statisticsInfo)
                            }),
                                this._emitter.addListener(e, t)
                        }
                    }, {
                        key: "off",
                        value: function (e, t) {
                            this._emitter.removeListener(e, t)
                        }
                    }, {
                        key: "changeResolutionPolicy",
                        value: function (e) {
                            if (this._config.resolutionPolicy = e,
                                this._parentDiv && this._mediaInfo) {
                                var t = this._mediaInfo.hasOwnProperty("width") ? this._mediaInfo.width : 640
                                    , i = this._mediaInfo.hasOwnProperty("height") ? this._mediaInfo.height : 480
                                    , n = this._stageWidth
                                    , r = this._stageHeight
                                    , s = Number(n) / t
                                    , o = Number(r) / i
                                    , a = void 0
                                    , u = void 0
                                    , d = void 0
                                    , h = void 0;
                                switch (e) {
                                    case 1:
                                        a = t * s,
                                            u = i * o;
                                        break;
                                    case 2:
                                        a = t * Math.max(s, o),
                                            u = i * Math.max(s, o);
                                        break;
                                    case 3:
                                        a = t * Math.min(s, o),
                                            u = i * Math.min(s, o);
                                        break;
                                    case 4:
                                        a = t * s,
                                            u = i * s;
                                        break;
                                    case 5:
                                        a = t * o,
                                            u = i * o
                                }
                                d = (n - a) / 2,
                                    h = (r - u) / 2,
                                    this._mediaElement.width = a,
                                    this._mediaElement.height = u,
                                    this._mediaElement.style.top = h + "px",
                                    this._mediaElement.style.left = d + "px"
                            }
                        }
                    }, {
                        key: "resize",
                        value: function (e, t) {
                            this._parentDiv && (this._stageWidth = void 0 !== e ? e : this._parentDiv.clientWidth,
                                this._stageHeight = void 0 !== t ? t : this._parentDiv.clientHeight,
                                this.changeResolutionPolicy(this._config.resolutionPolicy))
                        }
                    }, {
                        key: "attachMediaElement",
                        value: function (e) {
                            var t = this;
                            h.default.d(this.TAG, "attachMediaElement", !0),
                                this._parentDiv = e,
                                this._stageWidth = this._parentDiv.clientWidth,
                                this._stageHeight = this._parentDiv.clientHeight;
                            var i = document.createElement("video");
                            i.style.position = "relative",
                                e.appendChild(i);
                            var n = null;
                            this._config.enableStallDetect && !c.default.safari && (n = document.createElement("video"),
                                n.muted = !0,
                                n.width = 16,
                                n.height = 16,
                                e.appendChild(n)),
                                A.default.mediaElement = this._mediaElement = i,
                                this._renderElement = n,
                                i.addEventListener("loadedmetadata", this.e.onvLoadedMetadata),
                                i.addEventListener("canplay", this.e.onvCanPlay),
                                i.addEventListener("stalled", this.e.onvStalled),
                                i.addEventListener("progress", this.e.onvProgress),
                                i.addEventListener("error", this.e.onvError),
                                i.addEventListener("abort", this.e.onvAbort),
                                i.addEventListener("loadeddata", this.e.onvLoadedData),
                                i.addEventListener("ended", this.e.onvEnd),
                                n && (n.addEventListener("loadedmetadata", this.e.onvLoadedMetadata),
                                    n.addEventListener("canplay", this.e.onvCanPlay),
                                    n.addEventListener("stalled", this.e.onvStalled),
                                    n.addEventListener("progress", this.e.onvProgress),
                                    n.addEventListener("error", this.e.onvError),
                                    n.addEventListener("abort", this.e.onvAbort),
                                    n.addEventListener("loadeddata", this.e.onvLoadedData)),
                                this._msectl = new b.default(this._config),
                                this._msectl.on(E.default.STREAM_STATUS, this._onStreamStatus.bind(this)),
                                this._msectl.on(E.default.SORCE_END, this._onmseSourceEnd.bind(this)),
                                this._msectl.on(E.default.BUFFER_FULL, this._onmseBufferFull.bind(this)),
                                this._msectl.on(E.default.EXTEND_VIDEO_DATA, function (e, i) {
                                    t._emitter.emit(_.default.EXTEND_VIDEO_DATA, e, i)
                                }),
                                this._msectl.on(E.default.SOURCE_OPEN, function () {
                                    t._mseSourceOpened = !0,
                                        t._hasPendingLoad && (t._hasPendingLoad = !1,
                                            t.load())
                                }),
                                this._msectl.on(E.default.ERROR, function (e) {
                                    t._emitter.emit(_.default.ERROR, k.ErrorTypes.MEDIA_ERROR, k.ErrorDetails.MEDIA_MSE_ERROR, e)
                                }),
                                this._msectl.on(E.default.NOT_SUPPORT_CODEC, function (e) {
                                    t._emitter.emit(_.default.ERROR, k.ErrorTypes.NOT_SUPPORT, k.ErrorDetails.NOT_SUPPORT_CODEC, e)
                                }),
                                this._msectl.on(E.default.NOT_SUPPORT_MSE, function (e) {
                                    t._emitter.emit(_.default.ERROR, k.ErrorTypes.NOT_SUPPORT, k.ErrorDetails.NOT_SUPPORT_MSE, e)
                                }),
                                this._msectl.attachMediaElement(i, n)
                        }
                    }, {
                        key: "detachMediaElement",
                        value: function () {
                            if (A.default.mediaElement = null,
                                this._mediaElement) {
                                var e = this._mediaElement.parentNode;
                                e.removeChild(this._mediaElement),
                                    this._msectl.detachMediaElement(),
                                    this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata),
                                    this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay),
                                    this._mediaElement.removeEventListener("stalled", this.e.onvStalled),
                                    this._mediaElement.removeEventListener("progress", this.e.onvProgress),
                                    this._mediaElement.removeEventListener("error", this.e.onvError),
                                    this._mediaElement.removeEventListener("abort", this.e.onvAbort),
                                    this._mediaElement.removeEventListener("loadeddata", this.e.onvLoadedData),
                                    this._mediaElement.removeEventListener("ended", this.e.onvEnd),
                                    this._mediaElement = null,
                                    this._renderElement && (e.removeChild(this._renderElement),
                                        this._renderElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata),
                                        this._renderElement.removeEventListener("canplay", this.e.onvCanPlay),
                                        this._renderElement.removeEventListener("stalled", this.e.onvStalled),
                                        this._renderElement.removeEventListener("progress", this.e.onvProgress),
                                        this._renderElement.removeEventListener("error", this.e.onvError),
                                        this._renderElement.removeEventListener("abort", this.e.onvAbort),
                                        this._renderElement.removeEventListener("loadeddata", this.e.onvLoadedData),
                                        this._renderElement = null)
                            }
                            this._msectl && (this._msectl.destroy(),
                                this._msectl = null,
                                this._mseSourceOpened = !1)
                        }
                    }, {
                        key: "load",
                        value: function () {
                            var e = this;
                            if (!this._mediaElement)
                                throw new w.IllegalStateException("HTMLMediaElement must be attached before load()!");
                            if (this._transmuxer)
                                throw new w.IllegalStateException("FlvPlayer.load() has been called, please call unload() first!");
                            if (!this._hasPendingLoad && this._msectl.isAttachSuccess) {
                                if (this._config.deferLoadAfterSourceOpen && !1 === this._mseSourceOpened)
                                    return void (this._hasPendingLoad = !0);
                                this._mediaElement.readyState > 0 && (this._requestSetTime = !0,
                                    this._mediaElement.currentTime = 0,
                                    this._renderElement && this._renderElement.readyState > 0 && (this._renderElement.currentTime = 0)),
                                    this._transmuxer = new p.default(this._mediaDataSource, this._config),
                                    this._transmuxer.on(y.default.INIT_SEGMENT, function (t, i) {
                                        t && i ? e._msectl.appendSeperateInitSegment(i, t) : t ? e._msectl.appendSingleInitSegment(t) : i && e._msectl.appendSingleInitSegment(i)
                                    }),
                                    this._transmuxer.on(y.default.MEDIA_SEGMENT, function (t, i) {
                                        e._msectl.appendMediaSegment(i)
                                    }),
                                    this._transmuxer.on(y.default.LOADING_COMPLETE, function () {
                                        e._msectl.endOfStream(),
                                            e._emitter.emit(_.default.LOADING_COMPLETE)
                                    }),
                                    this._transmuxer.on(y.default.RECOVERED_EARLY_EOF, function () {
                                        e._emitter.emit(_.default.RECOVERED_EARLY_EOF)
                                    }),
                                    this._transmuxer.on(y.default.IO_ERROR, function (t, i) {
                                        e._emitter.emit(_.default.ERROR, k.ErrorTypes.NETWORK_ERROR, t, i)
                                    }),
                                    this._transmuxer.on(y.default.DEMUX_ERROR, function (t, i) {
                                        e._emitter.emit(_.default.ERROR, k.ErrorTypes.MEDIA_ERROR, t, {
                                            code: -1,
                                            msg: i
                                        })
                                    }),
                                    this._transmuxer.on(y.default.MEDIA_INFO, function (t) {
                                        e._mediaInfo = t,
                                            e.changeResolutionPolicy(e._config.resolutionPolicy),
                                            e._emitter.emit(_.default.MEDIA_INFO, Object.assign({}, t))
                                    }),
                                    this._transmuxer.on(y.default.STATISTICS_INFO, function (t) {
                                        e._statisticsInfo = e._fillStatisticsInfo(t),
                                            e._emitter.emit(_.default.STATISTICS_INFO, Object.assign({}, e._statisticsInfo))
                                    }),
                                    this._transmuxer.on(y.default.RECOMMEND_SEEKPOINT, function (t) {
                                        e._mediaElement && !e._config.accurateSeek && (e._requestSetTime = !0,
                                            e._mediaElement.currentTime = t / 1e3)
                                    }),
                                    this._transmuxer.on(y.default.VIDEO_ARRIVAL_TIME, function (t) {
                                        e._emitter.emit(_.default.VIDEO_ARRIVAL_TIME, t)
                                    }),
                                    h.default.w(this.TAG, "open transmuxer", !0),
                                    this._transmuxer.open()
                            }
                        }
                    }, {
                        key: "ignoreAudio",
                        value: function (e) {
                            this._transmuxer.ignoreAudio(e)
                        }
                    }, {
                        key: "ignoreVideo",
                        value: function (e) {
                            this._transmuxer.ignoreVideo(e)
                        }
                    }, {
                        key: "unload",
                        value: function () {
                            this.pause(),
                                this._transmuxer && (this._transmuxer.close(),
                                    this._transmuxer.destroy(),
                                    this._transmuxer = null)
                        }
                    }, {
                        key: "play",
                        value: function () {
                            var e = this;
                            if (this._mediaElement && this._loadedMetaData) {
                                var t = this._mediaElement.play();
                                void 0 !== t && t.then(function () {
                                    e._onCheckAutoPlay(!0)
                                }).catch(function () {
                                    e._onCheckAutoPlay(!1)
                                })
                            }
                        }
                    }, {
                        key: "_onCheckAutoPlay",
                        value: function (e) {
                            var t = this;
                            e ? (this._renderElement && this._renderElement.play(),
                                this._emitter.emit(_.default.HAPPY_PLAY)) : this._mediaElement && this._loadedMetaData && (this._mediaElement.muted = !0,
                                    this._mediaElement.play().then(function () {
                                        t._renderElement && t._renderElement.play(),
                                            h.default.w(t.TAG, "not allow autoplay, just muted", !0),
                                            t._emitter.emit(_.default.MUTED_PLAY)
                                    }).catch(function () {
                                        h.default.w(t.TAG, "not allow autoplay, need user active", !0),
                                            t._emitter.emit(_.default.PROHIBIT_PLAY)
                                    }))
                        }
                    }, {
                        key: "pause",
                        value: function () {
                            this._mediaElement && (this._suppressError(this._mediaElement.pause()),
                                this._renderElement && this._suppressError(this._renderElement.pause()))
                        }
                    }, {
                        key: "_suppressError",
                        value: function (e) {
                            void 0 !== e && "function" == typeof e.catch && e.catch(function () { })
                        }
                    }, {
                        key: "pullElkLog",
                        value: function () {
                            return this._msectl && this._msectl.statisticsInfo && h.default.d(this.TAG, "mseInfo revInit:" + this._msectl.statisticsInfo.revInit + ", revCount:" + this._msectl.statisticsInfo.revCount + ", doneCount:" + this._msectl.statisticsInfo.doneCount, !0),
                                this.statisticsInfo && h.default.d(this.TAG, "speed:" + this.statisticsInfo.speed + " receivedBytes:" + this.statisticsInfo.receivedBytes + " decoded:" + this.statisticsInfo.decodedFrames + " dropped:" + this.statisticsInfo.droppedFrames, !0),
                                h.default.ELK_LOG.splice(0, h.default.ELK_LOG.length).join("\n")
                        }
                    }, {
                        key: "_fillStatisticsInfo",
                        value: function (e) {
                            if (e.playerType = this._type,
                                !(this._mediaElement instanceof HTMLVideoElement))
                                return e;
                            var t = !0
                                , i = 0
                                , n = 0;
                            if (this._mediaElement.getVideoPlaybackQuality) {
                                var r = this._mediaElement.getVideoPlaybackQuality();
                                i = r.totalVideoFrames,
                                    n = r.droppedVideoFrames
                            } else
                                void 0 != this._mediaElement.webkitDecodedFrameCount ? (i = this._mediaElement.webkitDecodedFrameCount,
                                    n = this._mediaElement.webkitDroppedFrameCount) : t = !1;
                            return t && (e.decodedFrames = i,
                                e.droppedFrames = n),
                                e
                        }
                    }, {
                        key: "_onStreamStatus",
                        value: function (e) {
                            this._StreamStatus = e,
                                this._emitter.emit(_.default.STREAM_STATUS, e)
                        }
                    }, {
                        key: "_onmseSourceEnd",
                        value: function () {
                            this._StreamStatus = "end",
                                this._emitter.emit(_.default.STREAM_STATUS, "end")
                        }
                    }, {
                        key: "_onmseUpdateEnd",
                        value: function () { }
                    }, {
                        key: "_onmseBufferFull",
                        value: function () {
                            h.default.v(this.TAG, "MSE SourceBuffer is full, suspend transmuxing task"),
                                null == this._progressChecker && this._suspendTransmuxer()
                        }
                    }, {
                        key: "_suspendTransmuxer",
                        value: function () {
                            this._transmuxer && (this._transmuxer.pause(),
                                null == this._progressChecker && (this._progressChecker = window.setInterval(this._checkProgressAndResume.bind(this), 1e3)))
                        }
                    }, {
                        key: "_checkProgressAndResume",
                        value: function () {
                            for (var e = this._mediaElement.currentTime, t = this._mediaElement.buffered, i = !1, n = 0; n < t.length; n++) {
                                var r = t.start(n)
                                    , s = t.end(n);
                                if (e >= r && s > e) {
                                    e >= s - this._config.lazyLoadRecoverDuration && (i = !0);
                                    break
                                }
                            }
                            i && (window.clearInterval(this._progressChecker),
                                this._progressChecker = null,
                                i && (h.default.v(this.TAG, "Continue loading from paused position"),
                                    this._transmuxer.resume()))
                        }
                    }, {
                        key: "_isTimepointBuffered",
                        value: function (e) {
                            for (var t = this._mediaElement.buffered, i = 0; i < t.length; i++) {
                                var n = t.start(i)
                                    , r = t.end(i);
                                if (e >= n && r > e)
                                    return !0
                            }
                            return !1
                        }
                    }, {
                        key: "_internalSeek",
                        value: function (e) {
                            var t = this._isTimepointBuffered(e)
                                , i = !1
                                , n = 0;
                            if (1 > e && this._mediaElement.buffered.length > 0) {
                                var r = this._mediaElement.buffered.start(0);
                                (1 > r && r > e || c.default.safari) && (i = !0,
                                    n = c.default.safari ? .1 : r)
                            }
                            if (i)
                                this._requestSetTime = !0,
                                    this._mediaElement.currentTime = n;
                            else if (t) {
                                if (this._alwaysSeekKeyframe) {
                                    var s = this._msectl.getNearestKeyframe(Math.floor(1e3 * e));
                                    this._requestSetTime = !0,
                                        this._mediaElement.currentTime = null != s ? s.dts / 1e3 : e
                                } else
                                    this._requestSetTime = !0,
                                        this._mediaElement.currentTime = e;
                                null != this._progressChecker && this._checkProgressAndResume()
                            } else
                                null != this._progressChecker && (window.clearInterval(this._progressChecker),
                                    this._progressChecker = null),
                                    this._msectl.seek(e),
                                    this._transmuxer.seek(Math.floor(1e3 * e)),
                                    this._config.accurateSeek && (this._requestSetTime = !0,
                                        this._mediaElement.currentTime = e)
                        }
                    }, {
                        key: "_checkAndApplyUnbufferedSeekpoint",
                        value: function () {
                            if (this._seekpointRecord)
                                if (this._seekpointRecord.recordTime <= this._now() - 100) {
                                    var e = this._mediaElement.currentTime;
                                    this._seekpointRecord = null,
                                        this._isTimepointBuffered(e) || (null != this._progressChecker && (window.clearTimeout(this._progressChecker),
                                            this._progressChecker = null),
                                            this._msectl.seek(e),
                                            this._transmuxer.seek(Math.floor(1e3 * e)),
                                            this._config.accurateSeek && (this._requestSetTime = !0,
                                                this._mediaElement.currentTime = e))
                                } else
                                    window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50)
                        }
                    }, {
                        key: "_checkAndResumeStuckPlayback",
                        value: function (e) {
                            var t = this._mediaElement;
                            if (e || !this._receivedCanPlay || t.readyState < 2) {
                                var i = t.buffered;
                                i.length > 0 && t.currentTime < i.start(0) && (this._requestSetTime = !0,
                                    this._mediaElement.removeEventListener("progress", this.e.onvProgress))
                            } else
                                this._mediaElement.removeEventListener("progress", this.e.onvProgress)
                        }
                    }, {
                        key: "_onvLoadedMetadata",
                        value: function (e) {
                            e.target === this._mediaElement && (h.default.w(this.TAG, "set up decoding pipeline", !0),
                                this._loadedMetaData = !0,
                                this.play())
                        }
                    }, {
                        key: "_onvSeeking",
                        value: function (e) {
                            if (e.target === this._mediaElement) {
                                var t = this._mediaElement.currentTime
                                    , i = this._mediaElement.buffered;
                                if (this._requestSetTime)
                                    return void (this._requestSetTime = !1);
                                if (1 > t && i.length > 0) {
                                    var n = i.start(0);
                                    if (1 > n && n > t || c.default.safari)
                                        return this._requestSetTime = !0,
                                            void (this._mediaElement.currentTime = c.default.safari ? .1 : n)
                                }
                                if (this._isTimepointBuffered(t)) {
                                    if (this._alwaysSeekKeyframe) {
                                        var r = this._msectl.getNearestKeyframe(Math.floor(1e3 * t));
                                        null != r && (this._requestSetTime = !0,
                                            this._mediaElement.currentTime = r.dts / 1e3)
                                    }
                                    return void (null != this._progressChecker && this._checkProgressAndResume())
                                }
                                this._seekpointRecord = {
                                    seekPoint: t,
                                    recordTime: this._now()
                                },
                                    window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50)
                            }
                        }
                    }, {
                        key: "_onvCanPlay",
                        value: function (e) {
                            e.target === this._mediaElement && (this._receivedCanPlay = !0),
                                e.target.removeEventListener("canplay", this.e.onvCanPlay)
                        }
                    }, {
                        key: "_onvStalled",
                        value: function (e) {
                            e.target === this._mediaElement && this._checkAndResumeStuckPlayback(!0)
                        }
                    }, {
                        key: "_onvProgress",
                        value: function (e) {
                            e.target === this._mediaElement && this._checkAndResumeStuckPlayback()
                        }
                    }, {
                        key: "_onvError",
                        value: function (e) {
                            var t = e.target.error
                                , i = "";
                            switch (t.code) {
                                case MediaError.MEDIA_ERR_ABORTED:
                                    i = "MEDIA_ERR_ABORTED";
                                    break;
                                case MediaError.MEDIA_ERR_NETWORK:
                                    i = "MEDIA_ERR_NETWORK";
                                    break;
                                case MediaError.MEDIA_ERR_DECODE:
                                    i = "MEDIA_ERR_DECODE";
                                    break;
                                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                                    i = "MEDIA_ERR_SRC_NOT_SUPPORTED";
                                    break;
                                default:
                                    i = "UNKOWN_MEDIA_ERR"
                            }
                            var n = "";
                            t.message && t.message.length && (n = t.message),
                                e.target === this._mediaElement ? h.default.e(this.TAG, "MediaElementError: " + i + "->" + n) : h.default.e(this.TAG, "RenderElementError: " + i + "->" + n)
                        }
                    }, {
                        key: "_onvAbort",
                        value: function (e) {
                            e.target === this._mediaElement ? h.default.w(this.TAG, "MediaElement Abort,error code:" + this._mediaElement.error.code) : h.default.w(this.TAG, "RenderElement Abort,error code:" + this._mediaElement.error.code)
                        }
                    }, {
                        key: "_onvLoadedData",
                        value: function (e) {
                            e.target === this._mediaElement && (h.default.w(this.TAG, "start render", !0),
                                this._StreamStatus = "start",
                                this._emitter.emit(_.default.STREAM_STATUS, "start"))
                        }
                    }, {
                        key: "_onvEnd",
                        value: function () {
                            h.default.d(this.TAG, "MediaElement end")
                        }
                    }, {
                        key: "type",
                        get: function () {
                            return this._type
                        }
                    }, {
                        key: "buffered",
                        get: function () {
                            return this._mediaElement.buffered
                        }
                    }, {
                        key: "duration",
                        get: function () {
                            return this._mediaElement.duration
                        }
                    }, {
                        key: "volume",
                        get: function () {
                            return this._mediaElement.volume
                        },
                        set: function (e) {
                            this._mediaElement.volume = e
                        }
                    }, {
                        key: "muted",
                        get: function () {
                            return this._mediaElement.muted
                        },
                        set: function (e) {
                            this._setMuted = e,
                                this._mediaElement.muted = e
                        }
                    }, {
                        key: "currentTime",
                        get: function () {
                            return this._mediaElement ? this._mediaElement.currentTime : 0
                        }
                    }, {
                        key: "readyState",
                        get: function () {
                            return this._msectl ? this._msectl.readyState : "NOT_INIT"
                        }
                    }, {
                        key: "streamStatus",
                        get: function () {
                            return this._StreamStatus
                        }
                    }, {
                        key: "mediaInfo",
                        get: function () {
                            return Object.assign({}, this._mediaInfo)
                        }
                    }, {
                        key: "statisticsInfo",
                        get: function () {
                            return null == this._statisticsInfo && (this._statisticsInfo = {}),
                                this._statisticsInfo = this._fillStatisticsInfo(this._statisticsInfo),
                                Object.assign({}, this._statisticsInfo)
                        }
                    }]),
                        e
                }());
        i.default = T
    }
        , {
        "../config.js": 5,
        "../core/features": 6,
        "../core/mse-controller.js": 9,
        "../core/mse-events.js": 10,
        "../core/transmuxer.js": 11,
        "../core/transmuxing-events.js": 13,
        "../io/loader.js": 26,
        "../utils/browser.js": 42,
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "./player-errors.js": 36,
        "./player-events.js": 37,
        events: 2
    }],
    35: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        }
            : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            , o = function () {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1,
                            n.configurable = !0,
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n)
                    }
                }
                return function (t, i, n) {
                    return i && e(t.prototype, i),
                        n && e(t, n),
                        t
                }
            }()
            , a = e("events")
            , u = n(a)
            , d = e("../utils/logger.js")
            , h = n(d)
            , l = e("../demux/mp4-demuxer.js")
            , c = n(l)
            , f = e("../config.js")
            , _ = e("../io/io-controller.js")
            , m = n(_)
            , p = (e("../utils/exception.js"),
                e("./player-events.js"))
            , v = n(p)
            , y = e("../utils/utf8-conv.js")
            , g = n(y)
            , b = e("../utils/algorithm.js")
            , S = n(b)
            , E = function () {
                function e(t, i) {
                    r(this, e),
                        this.TAG = "MP4Player",
                        this._receivedLength = 0,
                        this._emitter = new u.default,
                        this._url = t.url,
                        this._range = {
                            from: 0
                        },
                        this._config = f.createDefaultConfig(),
                        this._config.isLive = !1,
                        "object" === (void 0 === i ? "undefined" : s(i)) && Object.assign(this._config, i),
                        this._playType = this._config.playType ? this._config.playType : "all",
                        this._enableMonitor = !1,
                        this.e = {
                            onvLoadedMetadata: this._onvLoadedMetadata.bind(this),
                            onvCanPlay: this._onvCanPlay.bind(this),
                            onvStalled: this._onvStalled.bind(this),
                            onvProgress: this._onvProgress.bind(this),
                            onvError: this._onvError.bind(this),
                            onvAbort: this._onvAbort.bind(this),
                            onvLoadedData: this._onvLoadedData.bind(this),
                            onSeeking: this._onSeeking.bind(this),
                            onSourceOpen: this._onSourceOpen.bind(this),
                            onSourceEnded: this._onSourceEnded.bind(this),
                            onSourceClose: this._onSourceClose.bind(this),
                            onSourceBufferError: this._onSourceBufferError.bind(this),
                            onSourceBufferUpdateEnd: this._onSourceBufferUpdateEnd.bind(this)
                        },
                        this._mediaInfo = {},
                        this._demuxer = new c.default(this._playType),
                        this._demuxer.onInitSegment = this._onInitSegment.bind(this),
                        this._demuxer.onTrackSegment = this._onTrackSegment.bind(this),
                        this._demuxer.onParseComplete = this._onParseComplete.bind(this),
                        this._demuxer.onParseExtendData = this._onParseExtendData.bind(this),
                        this._fmp4HeaderBox = null,
                        this._trackSegmentBox = [],
                        this._extendSegments = [],
                        this._extendSegmentIndex = -1,
                        this._ioctl = null,
                        this._statisticsReporter = null,
                        this._mediaSourceObjectURL = null,
                        this._mediaSource = null,
                        this._sourceBuffers = null,
                        this._mediaElement = null,
                        this._parentDiv = null,
                        this._stageWidth = 0,
                        this._stageHeight = 0,
                        this._receivedCanPlay = !1,
                        this._isEndOfStream = !1,
                        this._transmuxer = null,
                        this._lastVolume = 1,
                        this._lastCheckStallTime = 0,
                        this._lastCurrentTime = 0,
                        this._status = 0
                }
                return o(e, [{
                    key: "on",
                    value: function (e, t) {
                        this._emitter.addListener(e, t)
                    }
                }, {
                    key: "off",
                    value: function (e, t) {
                        this._emitter.removeListener(e, t)
                    }
                }, {
                    key: "_onInitSegment",
                    value: function (e, t) {
                        h.default.d(this.TAG, "onInitSegment width:" + t.width + " height:" + t.height + " duration:" + t.duration + " vcodec:" + t.videoCodec + " acodec:" + t.audioCodec),
                            this._mediaInfo.width = t.width,
                            this._mediaInfo.height = t.height,
                            this._mediaInfo.duration = t.duration,
                            this._mediaInfo.videoCodec = t.videoCodec,
                            this._mediaInfo.audioCodec = t.audioCodec,
                            this._fmp4HeaderBox = e,
                            this._appendInitSegment()
                    }
                }, {
                    key: "_onTrackSegment",
                    value: function (e, t) {
                        !e || "all" !== this._playType && "video" !== this._playType || this._trackSegmentBox.push(e),
                            !t || "all" !== this._playType && "audio" !== this._playType || this._trackSegmentBox.push(t),
                            this._appendTrackSegment()
                    }
                }, {
                    key: "_onParseExtendData",
                    value: function (e) {
                        for (var t = this._extendSegments.length, i = !1, n = t - 1; n > -1; n--)
                            if (this._extendSegments[n].timestamp <= e.timestamp) {
                                this._extendSegments.splice(n, 0, e),
                                    i = !0;
                                break
                            }
                        i || this._extendSegments.push(e),
                            -1 === this._extendSegmentIndex && (this._extendSegmentIndex = 0)
                    }
                }, {
                    key: "_onParseComplete",
                    value: function () {
                        h.default.w(this.TAG, "Fmp4 demuxe Complete")
                    }
                }, {
                    key: "_downloadWithStream",
                    value: function (e, t) {
                        var i = document.createElement("a");
                        i.href = window.URL.createObjectURL(t),
                            i.download = e,
                            i.click()
                    }
                }, {
                    key: "attachMediaElement",
                    value: function (e) {
                        this._parentDiv = e,
                            this._stageWidth = this._parentDiv.clientWidth,
                            this._stageHeight = this._parentDiv.clientHeight,
                            this._mediaElement = document.createElement("video"),
                            this._mediaElement.style.position = "relative",
                            this._mediaElement.autoplay = this._config.autoplay,
                            e.appendChild(this._mediaElement),
                            this.resize(),
                            this._mediaElement.addEventListener("loadedmetadata", this.e.onvLoadedMetadata),
                            this._mediaElement.addEventListener("canplay", this.e.onvCanPlay),
                            this._mediaElement.addEventListener("stalled", this.e.onvStalled),
                            this._mediaElement.addEventListener("progress", this.e.onvProgress),
                            this._mediaElement.addEventListener("error", this.e.onvError),
                            this._mediaElement.addEventListener("abort", this.e.onvAbort),
                            this._mediaElement.addEventListener("loadeddata", this.e.onvLoadedData),
                            this._mediaElement.addEventListener("seeking", this.e.onSeeking),
                            this._attachMSE()
                    }
                }, {
                    key: "seek",
                    value: function (e) {
                        if (this._mediaElement && this._mediaSource && "open" === this._mediaSource.readyState) {
                            this._resetCheckStallTime(),
                                this._lastCurrentTime = 0,
                                e = Math.max(0, e),
                                e = Math.min(e, this.duration),
                                this._mediaElement.currentTime = e / 1e3;
                            var t = !1;
                            if (0 === this._sourceBuffers.buffered.length)
                                t = !0;
                            else
                                for (var i = 0; i < this._sourceBuffers.buffered.length; i++)
                                    this._mediaElement.currentTime >= this._sourceBuffers.buffered.start(i) && this._mediaElement.currentTime <= this._sourceBuffers.buffered.end(i) || i === this._sourceBuffers.buffered.length - 1 && (t = !0);
                            if (this._extendSegmentIndex = S.default.binaryNearestSearch(this._extendSegments, e, {
                                sourceKeyName: "timestamp",
                                targetKeyName: null
                            }),
                                t) {
                                var n = this._demuxer.getLeftMostSampleBeginByte(e);
                                h.default.w(this.TAG, "seek to " + this._mediaElement.currentTime + ", leftMostSampleByte=" + n + ", _extendSegmentIndex:" + this._extendSegmentIndex),
                                    this._demuxer.seek(n),
                                    this._ioctl.seek(n)
                            } else
                                h.default.w(this.TAG, "seek to " + this._mediaElement.currentTime + ", _extendSegmentIndex:" + this._extendSegmentIndex);
                            return !0
                        }
                        return !1
                    }
                }, {
                    key: "_attachMSE",
                    value: function () {
                        this._mediaSource = new window.MediaSource,
                            this._mediaSource.addEventListener("sourceopen", this.e.onSourceOpen),
                            this._mediaSource.addEventListener("sourceended", this.e.onSourceEnded),
                            this._mediaSource.addEventListener("sourceclose", this.e.onSourceClose),
                            this._mediaSourceObjectURL = window.URL.createObjectURL(this._mediaSource),
                            this._mediaElement.src = this._mediaSourceObjectURL
                    }
                }, {
                    key: "_detachMSE",
                    value: function () {
                        if (this._mediaSource) {
                            if (this._sourceBuffers && ("closed" !== this._mediaSource.readyState && this._mediaSource.removeSourceBuffer(this._sourceBuffers),
                                this._sourceBuffers.removeEventListener("error", this.e.onSourceBufferError),
                                this._sourceBuffers.removeEventListener("updateend", this.e.onSourceBufferUpdateEnd),
                                this._sourceBuffers = null),
                                "open" === this._mediaSource.readyState)
                                try {
                                    this._mediaSource.endOfStream()
                                } catch (e) {
                                    h.default.e(this.TAG, e.message)
                                }
                            this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen),
                                this._mediaSource.removeEventListener("sourceended", this.e.onSourceEnded),
                                this._mediaSource.removeEventListener("sourceclose", this.e.onSourceClose),
                                this._mediaSource = null
                        }
                        this._mediaSourceObjectURL && (window.URL.revokeObjectURL(this._mediaSourceObjectURL),
                            this._mediaSourceObjectURL = null),
                            this._mediaElement && (this._mediaElement.src = "",
                                this._mediaElement.removeAttribute("src"))
                    }
                }, {
                    key: "_detachMediaElement",
                    value: function () {
                        this._detachMSE(),
                            this._mediaElement && (this._mediaElement.parentNode.removeChild(this._mediaElement),
                                this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata),
                                this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay),
                                this._mediaElement.removeEventListener("stalled", this.e.onvStalled),
                                this._mediaElement.removeEventListener("progress", this.e.onvProgress),
                                this._mediaElement.removeEventListener("error", this.e.onvError),
                                this._mediaElement.removeEventListener("abort", this.e.onvAbort),
                                this._mediaElement.removeEventListener("loadeddata", this.e.onvLoadedData),
                                this._mediaElement.removeEventListener("seeking", this.e.onSeeking),
                                this._mediaElement.src = "",
                                this._mediaElement.removeAttribute("src"),
                                this._mediaElement = null)
                    }
                }, {
                    key: "changeResolutionPolicy",
                    value: function (e) {
                        if (this._config.resolutionPolicy = e,
                            this._parentDiv) {
                            var t = this._mediaInfo.hasOwnProperty("width") ? this._mediaInfo.width : 640
                                , i = this._mediaInfo.hasOwnProperty("height") ? this._mediaInfo.height : 480
                                , n = this._stageWidth
                                , r = this._stageHeight
                                , s = Number(n) / t
                                , o = Number(r) / i
                                , a = void 0
                                , u = void 0
                                , d = void 0
                                , h = void 0;
                            switch (e) {
                                case 1:
                                    a = t * s,
                                        u = i * o;
                                    break;
                                case 2:
                                    a = t * Math.max(s, o),
                                        u = i * Math.max(s, o);
                                    break;
                                case 3:
                                    a = t * Math.min(s, o),
                                        u = i * Math.min(s, o);
                                    break;
                                case 4:
                                    a = t * s,
                                        u = i * s;
                                    break;
                                case 5:
                                    a = t * o,
                                        u = i * o
                            }
                            d = (n - a) / 2,
                                h = (r - u) / 2,
                                this._mediaElement.width = a,
                                this._mediaElement.height = u,
                                this._mediaElement.style.top = h + "px",
                                this._mediaElement.style.left = d + "px"
                        }
                    }
                }, {
                    key: "resize",
                    value: function (e, t) {
                        this._parentDiv && (this._stageWidth = void 0 !== e ? e : this._parentDiv.clientWidth,
                            this._stageHeight = void 0 !== t ? t : this._parentDiv.clientHeight,
                            this.changeResolutionPolicy(this._config.resolutionPolicy))
                    }
                }, {
                    key: "destroy",
                    value: function () {
                        this._emitter && (this._emitter.removeAllListeners(),
                            this._emitter = null),
                            this._disableVideoStatusMonitor(),
                            this._detachMediaElement(),
                            this._internalAbort(),
                            this._demuxer.destroy(),
                            this._demuxer = null,
                            this._url = null,
                            this._receivedLength = 0,
                            this._lastCheckStallTime = 0,
                            this._lastCurrentTime = 0,
                            this._status = 0
                    }
                }, {
                    key: "load",
                    value: function () {
                        this._internalAbort(),
                            this._ioctl = new m.default({
                                url: this._url
                            }, this._config),
                            this._ioctl.onError = this._onIOException.bind(this),
                            this._ioctl.onSeeked = this._onIOSeeked.bind(this),
                            this._ioctl.onComplete = this._onIOComplete.bind(this),
                            this._ioctl.onRedirect = this._onIORedirect.bind(this),
                            this._ioctl.onRecoveredEarlyEof = this._onIORecoveredEarlyEof.bind(this),
                            this._ioctl.onDataArrival = this._dispatchChunks.bind(this),
                            this._ioctl.open()
                    }
                }, {
                    key: "_internalAbort",
                    value: function () {
                        this._ioctl && (this._ioctl.destroy(),
                            this._ioctl = null)
                    }
                }, {
                    key: "_dispatchChunks",
                    value: function (e, t) {
                        return this._demuxer.parseChunks(e, t)
                    }
                }, {
                    key: "pause",
                    value: function () {
                        this._mediaElement && (this._mediaElement.pause(),
                            this._changeVideoStatus(4))
                    }
                }, {
                    key: "play",
                    value: function () {
                        this._mediaElement && this._mediaElement.play()
                    }
                }, {
                    key: "_onvLoadedMetadata",
                    value: function () {
                        this.resize(),
                            h.default.w(this.TAG, "MediaElement loaed metadata"),
                            this._changeVideoStatus(1, this._mediaInfo)
                    }
                }, {
                    key: "_onvCanPlay",
                    value: function () {
                        this._receivedCanPlay = !0
                    }
                }, {
                    key: "_onvStalled",
                    value: function () { }
                }, {
                    key: "_onvProgress",
                    value: function () { }
                }, {
                    key: "_onvError",
                    value: function (e) {
                        var t = e.target.error
                            , i = "";
                        switch (t.code) {
                            case MediaError.MEDIA_ERR_ABORTED:
                                i = "MEDIA_ERR_ABORTED";
                                break;
                            case MediaError.MEDIA_ERR_NETWORK:
                                i = "MEDIA_ERR_NETWORK";
                                break;
                            case MediaError.MEDIA_ERR_DECODE:
                                i = "MEDIA_ERR_DECODE";
                                break;
                            case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                                i = "MEDIA_ERR_SRC_NOT_SUPPORTED";
                                break;
                            default:
                                i = "UNKOWN_MEDIA_ERR"
                        }
                        var n = "";
                        t.message && t.message.length && (n = t.message),
                            h.default.e(this.TAG, "MediaElementError: " + i + "->" + n)
                    }
                }, {
                    key: "_onvAbort",
                    value: function () {
                        h.default.w(this.TAG, "MediaElement Abort,error code:" + this._mediaElement.error.code)
                    }
                }, {
                    key: "_onvLoadedData",
                    value: function () {
                        h.default.w(this.TAG, "MediaElement render the media for the first time"),
                            this._resetCheckStallTime(),
                            this._changeVideoStatus(2),
                            this._enableVideoStatusMonitor()
                    }
                }, {
                    key: "_onSeeking",
                    value: function () { }
                }, {
                    key: "_onSourceOpen",
                    value: function () {
                        h.default.v(this.TAG, "mediaSourceOpen"),
                            this._isEndOfStream = !1,
                            this._appendInitSegment()
                    }
                }, {
                    key: "_initSourceBuffer",
                    value: function () {
                        this._sourceBuffers = this._mediaSource.addSourceBuffer("audio" === this._playType ? 'audio/mp4; codecs="mp4a.40.5"' : "video" === this._playType ? 'video/mp4; codecs="' + this._mediaInfo.videoCodec + '"' : 'video/mp4; codecs="' + this._mediaInfo.videoCodec + ", " + this._mediaInfo.audioCodec + '"'),
                            this._sourceBuffers.addEventListener("error", this.e.onSourceBufferError),
                            this._sourceBuffers.addEventListener("updateend", this.e.onSourceBufferUpdateEnd)
                    }
                }, {
                    key: "_onSourceEnded",
                    value: function () {
                        h.default.v(this.TAG, "mediaSourceEnd"),
                            this._isEndOfStream = !0
                    }
                }, {
                    key: "_onSourceClose",
                    value: function () {
                        h.default.v(this.TAG, "mediaSourceClose")
                    }
                }, {
                    key: "_onSourceBufferUpdateEnd",
                    value: function () {
                        this._appendTrackSegment()
                    }
                }, {
                    key: "_onSourceBufferError",
                    value: function (e) {
                        var t = "SourceBufferError Code:" + e.code + " Error: " + e.message;
                        this._mediaElement && this._mediaElement.error && (t += ",MediaElement error=" + this._mediaElement.error.code),
                            h.default.e(this.TAG, t)
                    }
                }, {
                    key: "_onIOSeeked",
                    value: function () { }
                }, {
                    key: "_onIOException",
                    value: function (e, t) {
                        h.default.e(this.TAG, "IOException: type = " + e + ", code = " + t.code + ", msg = " + t.msg),
                            this._disableStatisticsReporter()
                    }
                }, {
                    key: "_onIORedirect",
                    value: function () { }
                }, {
                    key: "_onIORecoveredEarlyEof",
                    value: function () { }
                }, {
                    key: "_onIOComplete",
                    value: function () { }
                }, {
                    key: "_appendInitSegment",
                    value: function () {
                        this._mediaSource && "open" === this._mediaSource.readyState && this._fmp4HeaderBox && (null === this._sourceBuffers && this._initSourceBuffer(),
                            this._sourceBuffers && !this._sourceBuffers.updating && (h.default.d(this.TAG, "append init segment"),
                                this._sourceBuffers.appendBuffer(this._fmp4HeaderBox)))
                    }
                }, {
                    key: "_appendTrackSegment",
                    value: function () {
                        if (this._mediaSource && "open" === this._mediaSource.readyState && this._sourceBuffers && !this._sourceBuffers.updating && this._trackSegmentBox.length > 0) {
                            var e = this._trackSegmentBox.shift();
                            this._sourceBuffers.appendBuffer(e.runBox)
                        }
                    }
                }, {
                    key: "_enableStatisticsReporter",
                    value: function () {
                        null == this._statisticsReporter && (this._statisticsReporter = self.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval))
                    }
                }, {
                    key: "_disableStatisticsReporter",
                    value: function () {
                        this._statisticsReporter && (self.clearInterval(this._statisticsReporter),
                            this._statisticsReporter = null)
                    }
                }, {
                    key: "_reportStatisticsInfo",
                    value: function () {
                        var e = {};
                        e.url = this._ioctl.currentURL,
                            e.speed = this._ioctl.currentSpeed,
                            e.loaderType = this._ioctl.loaderType;
                        var t = !1
                            , i = 0
                            , n = 0;
                        if (this._mediaElement)
                            if (this._mediaElement.getVideoPlaybackQuality) {
                                var r = this._mediaElement.getVideoPlaybackQuality();
                                i = r.totalVideoFrames,
                                    n = r.droppedVideoFrames
                            } else
                                void 0 != this._mediaElement.webkitDecodedFrameCount ? (i = this._mediaElement.webkitDecodedFrameCount,
                                    n = this._mediaElement.webkitDroppedFrameCount) : t = !1;
                        t && (e.decodedFrames = i,
                            e.droppedFrames = n),
                            this._emitter.emit(v.default.STATISTICS_INFO, e)
                    }
                }, {
                    key: "_enableVideoStatusMonitor",
                    value: function () {
                        this._enableMonitor = !0,
                            window.requestAnimationFrame(this._videoStatusMonitor.bind(this))
                    }
                }, {
                    key: "_disableVideoStatusMonitor",
                    value: function () {
                        this._enableMonitor = !1
                    }
                }, {
                    key: "_videoStatusMonitor",
                    value: function () {
                        if (this._mediaElement) {
                            var e = this._mediaElement.readyState;
                            if (this._readyState !== e) {
                                this._readyState = e;
                                var t = "media element readyState change: " + this._getReadyStateDesc(this._readyState);
                                t += ", currentTime: " + this._mediaElement.currentTime,
                                    this._sourceBuffers && this._sourceBuffers.buffered && (t += ", buffer(" + this._printTimeRanges(this._sourceBuffers.buffered) + ")"),
                                    h.default.w(this.TAG, t)
                            }
                            this._checkExtendData(),
                                this._checkStall()
                        }
                        this._enableMonitor && window.requestAnimationFrame(this._videoStatusMonitor.bind(this))
                    }
                }, {
                    key: "_checkExtendData",
                    value: function () {
                        for (var e = 1e3 * this._mediaElement.currentTime, t = this._extendSegments.length, i = this._extendSegments && t > 0; i && this._extendSegmentIndex < t;) {
                            var n = this._extendSegments[this._extendSegmentIndex].rawBytes
                                , r = this._extendSegments[this._extendSegmentIndex].timestamp;
                            if (e >= r || Math.abs(e - r) < 30) {
                                var s = g.default(n);
                                this._extendSegmentIndex++ ,
                                    this._emitter.emit(v.default.EXTEND_VIDEO_DATA, s, 0)
                            } else
                                i = !1
                        }
                    }
                }, {
                    key: "_resetCheckStallTime",
                    value: function () {
                        this._lastCheckStallTime = (new Date).valueOf()
                    }
                }, {
                    key: "_checkStall",
                    value: function () {
                        var e = (new Date).valueOf();
                        if (this._mediaElement && !this._mediaElement.paused && e - this._lastCheckStallTime > 500) {
                            this._lastCheckStallTime = e;
                            var t = this._mediaElement.currentTime - this._lastCurrentTime;
                            if (this._lastCurrentTime = this._mediaElement.currentTime,
                                this._changeVideoStatus(1e-7 >= t ? this._mediaInfo.duration - 1e3 * this._mediaElement.currentTime <= 500 ? 6 : 5 : 3),
                                1e-7 >= t && this._sourceBuffers && this._sourceBuffers.buffered && this._sourceBuffers.buffered.length > 0) {
                                var i = void 0
                                    , n = this._sourceBuffers.buffered.start(this._sourceBuffers.buffered.length - 1)
                                    , r = this._sourceBuffers.buffered.end(this._sourceBuffers.buffered.length - 1);
                                this._mediaElement.currentTime < n ? i = n : this._mediaElement.currentTime < r && (i = this._mediaElement.currentTime + .5 > r ? (r - this._mediaElement.currentTime) / 2 : this._mediaElement.currentTime + .5),
                                    i > this._mediaElement.currentTime && (this._mediaElement.currentTime = i,
                                        h.default.w(this.TAG, "timeStep: " + t + ", detect stall,reset currentTime from " + this._lastCurrentTime + " to " + this._mediaElement.currentTime + ", source buffer:" + this._printTimeRanges(this._sourceBuffers.buffered)))
                            }
                        }
                    }
                }, {
                    key: "_changeVideoStatus",
                    value: function (e, t) {
                        if (this._status != e) {
                            this._status = e;
                            var i = void 0;
                            switch (this._status) {
                                case 1:
                                    i = "init";
                                    break;
                                case 2:
                                    i = "start";
                                    break;
                                case 3:
                                    i = "play";
                                    break;
                                case 4:
                                    i = "pause";
                                    break;
                                case 5:
                                    i = "stall";
                                    break;
                                case 6:
                                    i = "end";
                                    break;
                                default:
                                    i = "unkown"
                            }
                            this._emitter.emit(v.default.STREAM_STATUS, i, t)
                        }
                    }
                }, {
                    key: "_printTimeRanges",
                    value: function (e) {
                        if (0 == e.length)
                            return "none";
                        for (var t = e.length + ": ", i = 0; i < e.length; i++)
                            t += e.start(i) + " - " + e.end(i) + "; ";
                        return t
                    }
                }, {
                    key: "_getReadyStateDesc",
                    value: function (e) {
                        var t = "NOT_INIT";
                        switch (e) {
                            case 0:
                                t = "HAVE_NOTHING";
                                break;
                            case 1:
                                t = "HAVE_METADATA";
                                break;
                            case 2:
                                t = "HAVE_CURRENT_DATA";
                                break;
                            case 3:
                                t = "HAVE_FUTURE_DATA";
                                break;
                            case 4:
                                t = "HAVE_ENOUGH_DATA"
                        }
                        return t
                    }
                }, {
                    key: "volume",
                    get: function () {
                        return this._mediaElement && this._mediaElement.volume,
                            0
                    },
                    set: function (e) {
                        this._lastVolume = e,
                            this._mediaElement && (this._lastVolume = Math.max(this._lastVolume, 0),
                                this._lastVolume = Math.min(this._lastVolume, 1),
                                this._mediaElement.volume = this._lastVolume)
                    }
                }, {
                    key: "muted",
                    set: function (e) {
                        this._mediaElement && (e ? this._mediaElement && (this._mediaElement.volume = 0) : this._mediaElement && (this._mediaElement.volume = this._lastVolume))
                    }
                }, {
                    key: "currentTime",
                    get: function () {
                        return this._mediaElement ? 1e3 * this._mediaElement.currentTime : 0
                    }
                }, {
                    key: "duration",
                    get: function () {
                        return this._mediaInfo && this._mediaInfo.hasOwnProperty("duration") ? this._mediaInfo.duration : 0
                    }
                }]),
                    e
            }();
        i.default = E
    }
        , {
        "../config.js": 5,
        "../demux/mp4-demuxer.js": 19,
        "../io/io-controller.js": 25,
        "../utils/algorithm.js": 41,
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "../utils/utf8-conv.js": 48,
        "./player-events.js": 37,
        events: 2
    }],
    36: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.ErrorDetails = i.ErrorTypes = void 0;
        var n = e("../io/loader.js")
            , r = e("../demux/demux-errors.js")
            , s = function (e) {
                return e && e.__esModule ? e : {
                    "default": e
                }
            }(r);
        i.ErrorTypes = {
            NETWORK_ERROR: "NetworkError",
            MEDIA_ERROR: "MediaError",
            OTHER_ERROR: "OtherError",
            NOT_SUPPORT: "notSupport"
        },
            i.ErrorDetails = {
                NETWORK_EXCEPTION: n.LoaderErrors.EXCEPTION,
                NETWORK_STATUS_CODE_INVALID: n.LoaderErrors.HTTP_STATUS_CODE_INVALID,
                NETWORK_TIMEOUT: n.LoaderErrors.CONNECTING_TIMEOUT,
                NETWORK_UNRECOVERABLE_EARLY_EOF: n.LoaderErrors.UNRECOVERABLE_EARLY_EOF,
                MEDIA_MSE_ERROR: "MediaMSEError",
                MEDIA_FORMAT_ERROR: s.default.FORMAT_ERROR,
                MEDIA_FORMAT_UNSUPPORTED: s.default.FORMAT_UNSUPPORTED,
                MEDIA_CODEC_UNSUPPORTED: s.default.CODEC_UNSUPPORTED,
                AUDIO_TIME_STAMP_INVALID: s.default.AUDIO_TIME_STAMP_INVALID,
                VIDEO_TIME_STAMP_INVALID: s.default.VIDEO_TIME_STAMP_INVALID,
                NOT_SUPPORT_MSE: "notSupportMSE",
                NOT_SUPPORT_CODEC: "notSupportCodec"
            }
    }
        , {
        "../demux/demux-errors.js": 16,
        "../io/loader.js": 26
    }],
    37: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = {
            ERROR: "error",
            LOADING_COMPLETE: "loading_complete",
            RECOVERED_EARLY_EOF: "recovered_early_eof",
            MEDIA_INFO: "media_info",
            STATISTICS_INFO: "statistics_info",
            VIDEO_ARRIVAL_TIME: "video_arrival_time",
            EXTEND_VIDEO_DATA: "extend_video_data",
            STREAM_STATUS: "stream_status",
            NOT_SUPPORT: "not_support",
            MUTED_PLAY: "muted_play",
            PROHIBIT_PLAY: "prohibit_play",
            HAPPY_PLAY: "happy_play"
        };
        i.default = n
    }
        , {}],
    38: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = function () {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "getSilentFrame",
                    value: function (e, t) {
                        if ("mp4a.40.2" === e) {
                            if (1 === t)
                                return new Uint8Array([0, 200, 0, 128, 35, 128]);
                            if (2 === t)
                                return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
                            if (3 === t)
                                return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
                            if (4 === t)
                                return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
                            if (5 === t)
                                return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
                            if (6 === t)
                                return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224])
                        } else {
                            if (1 === t)
                                return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                            if (2 === t)
                                return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
                            if (3 === t)
                                return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94])
                        }
                        return null
                    }
                }]),
                    e
            }();
        i.default = s
    }
        , {}],
    39: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = function () {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "init",
                    value: function () {
                        e.types = {
                            avc1: [],
                            avcC: [],
                            btrt: [],
                            dinf: [],
                            dref: [],
                            esds: [],
                            ftyp: [],
                            hdlr: [],
                            mdat: [],
                            mdhd: [],
                            mdia: [],
                            mfhd: [],
                            minf: [],
                            moof: [],
                            moov: [],
                            mp4a: [],
                            mvex: [],
                            mvhd: [],
                            sdtp: [],
                            stbl: [],
                            stco: [],
                            stsc: [],
                            stsd: [],
                            stsz: [],
                            stts: [],
                            tfdt: [],
                            tfhd: [],
                            traf: [],
                            trak: [],
                            trun: [],
                            trex: [],
                            tkhd: [],
                            vmhd: [],
                            smhd: [],
                            ".mp3": []
                        };
                        for (var t in e.types)
                            e.types.hasOwnProperty(t) && (e.types[t] = [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]);
                        var i = e.constants = {};
                        i.FTYP = new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]),
                            i.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]),
                            i.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
                            i.STSC = i.STCO = i.STTS,
                            i.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
                            i.HDLR_VIDEO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
                            i.HDLR_AUDIO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]),
                            i.DREF = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
                            i.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]),
                            i.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
                    }
                }, {
                    key: "box",
                    value: function (e) {
                        for (var t = 8, i = null, n = Array.prototype.slice.call(arguments, 1), r = n.length, s = 0; r > s; s++)
                            t += n[s].byteLength;
                        i = new Uint8Array(t),
                            i[0] = t >>> 24 & 255,
                            i[1] = t >>> 16 & 255,
                            i[2] = t >>> 8 & 255,
                            i[3] = 255 & t,
                            i.set(e, 4);
                        for (var o = 8, a = 0; r > a; a++)
                            i.set(n[a], o),
                                o += n[a].byteLength;
                        return i
                    }
                }, {
                    key: "generateInitSegment",
                    value: function (t) {
                        var i = e.box(e.types.ftyp, e.constants.FTYP)
                            , n = e.moov(t)
                            , r = new Uint8Array(i.byteLength + n.byteLength);
                        return r.set(i, 0),
                            r.set(n, i.byteLength),
                            r
                    }
                }, {
                    key: "generateInitSegmentForAV",
                    value: function (t, i) {
                        var n = e.box(e.types.ftyp, e.constants.FTYP)
                            , r = e.moovForAV(t, i)
                            , s = new Uint8Array(n.byteLength + r.byteLength);
                        return s.set(n, 0),
                            s.set(r, n.byteLength),
                            s
                    }
                }, {
                    key: "moovForAV",
                    value: function (t, i) {
                        var n = e.mvhd(i.timescale, i.duration)
                            , r = e.trak(i)
                            , s = e.trak(t)
                            , o = e.mvexForAV(t, i);
                        return e.box(e.types.moov, n, r, s, o)
                    }
                }, {
                    key: "moov",
                    value: function (t) {
                        var i = e.mvhd(t.timescale, t.duration)
                            , n = e.trak(t)
                            , r = e.mvex(t);
                        return e.box(e.types.moov, i, n, r)
                    }
                }, {
                    key: "mvhd",
                    value: function (t, i) {
                        return e.box(e.types.mvhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]))
                    }
                }, {
                    key: "trak",
                    value: function (t) {
                        return e.box(e.types.trak, e.tkhd(t), e.mdia(t))
                    }
                }, {
                    key: "tkhd",
                    value: function (t) {
                        var i = t.id
                            , n = t.duration
                            , r = t.presentWidth
                            , s = t.presentHeight;
                        return e.box(e.types.tkhd, new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, r >>> 8 & 255, 255 & r, 0, 0, s >>> 8 & 255, 255 & s, 0, 0]))
                    }
                }, {
                    key: "mdia",
                    value: function (t) {
                        return e.box(e.types.mdia, e.mdhd(t), e.hdlr(t), e.minf(t))
                    }
                }, {
                    key: "mdhd",
                    value: function (t) {
                        var i = t.timescale
                            , n = t.duration;
                        return e.box(e.types.mdhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 85, 196, 0, 0]))
                    }
                }, {
                    key: "hdlr",
                    value: function (t) {
                        var i = null;
                        return i = "audio" === t.type ? e.constants.HDLR_AUDIO : e.constants.HDLR_VIDEO,
                            e.box(e.types.hdlr, i)
                    }
                }, {
                    key: "minf",
                    value: function (t) {
                        var i = null;
                        return i = "audio" === t.type ? e.box(e.types.smhd, e.constants.SMHD) : e.box(e.types.vmhd, e.constants.VMHD),
                            e.box(e.types.minf, i, e.dinf(), e.stbl(t))
                    }
                }, {
                    key: "dinf",
                    value: function () {
                        return e.box(e.types.dinf, e.box(e.types.dref, e.constants.DREF))
                    }
                }, {
                    key: "stbl",
                    value: function (t) {
                        return e.box(e.types.stbl, e.stsd(t), e.box(e.types.stts, e.constants.STTS), e.box(e.types.stsc, e.constants.STSC), e.box(e.types.stsz, e.constants.STSZ), e.box(e.types.stco, e.constants.STCO))
                    }
                }, {
                    key: "stsd",
                    value: function (t) {
                        return "audio" === t.type ? e.box(e.types.stsd, e.constants.STSD_PREFIX, e.mp4a(t)) : e.box(e.types.stsd, e.constants.STSD_PREFIX, e.avc1(t))
                    }
                }, {
                    key: "mp3",
                    value: function (t) {
                        var i = t.channelCount
                            , n = t.audioSampleRate
                            , r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 16, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0]);
                        return e.box(e.types[".mp3"], r)
                    }
                }, {
                    key: "mp4a",
                    value: function (t) {
                        var i = t.channelCount
                            , n = t.audioSampleRate
                            , r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, i, 0, 16, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0]);
                        return e.box(e.types.mp4a, r, e.esds(t))
                    }
                }, {
                    key: "esds",
                    value: function (t) {
                        var i = void 0;
                        if ("mp3" === t.codec)
                            i = new Uint8Array([0, 0, 0, 0, 3, 21, 0, 1, 0, 4, 16, 107, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 2]);
                        else {
                            var n = t.config || []
                                , r = n.length;
                            i = new Uint8Array([0, 0, 0, 0, 3, 23 + r, 0, 1, 0, 4, 15 + r, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([r]).concat(n).concat([6, 1, 2]))
                        }
                        return e.box(e.types.esds, i)
                    }
                }, {
                    key: "avc1",
                    value: function (t) {
                        var i = t.avcc
                            , n = t.codecWidth
                            , r = t.codecHeight
                            , s = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, r >>> 8 & 255, 255 & r, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 10, 120, 113, 113, 47, 102, 108, 118, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
                        return e.box(e.types.avc1, s, e.box(e.types.avcC, i))
                    }
                }, {
                    key: "mvex",
                    value: function (t) {
                        return e.box(e.types.mvex, e.trex(t))
                    }
                }, {
                    key: "mvexForAV",
                    value: function (t, i) {
                        return e.box(e.types.mvex, e.trex(i), e.trex(t))
                    }
                }, {
                    key: "trex",
                    value: function (t) {
                        var i = t.id
                            , n = new Uint8Array([0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);
                        return e.box(e.types.trex, n)
                    }
                }, {
                    key: "moof",
                    value: function (t, i) {
                        return e.box(e.types.moof, e.mfhd(t.sequenceNumber), e.traf(t, i, 24))
                    }
                }, {
                    key: "moofAV",
                    value: function (t, i, n, r, s, o) {
                        var u = null
                            , d = null;
                        return i.samples.length > 0 && (u = e.traf(i, n, 24)),
                            s.samples.length > 0 && (d = u ? e.traf(s, o, 24 + u.byteLength + r) : e.traf(s, o, 24)),
                            u && d ? (e.setTrunDataOffset(u, 24 + u.byteLength + d.byteLength + 8),
                                e.setTrunDataOffset(d, 24 + u.byteLength + d.byteLength + 8 + r),
                                e.box(e.types.moof, e.mfhd(t), u, d)) : u ? (e.setTrunDataOffset(u, 24 + u.byteLength + 8),
                                    e.box(e.types.moof, e.mfhd(t), u)) : d ? (e.setTrunDataOffset(d, 24 + d.byteLength + 8),
                                        e.box(e.types.moof, e.mfhd(t), d)) : null
                    }
                }, {
                    key: "mfhd",
                    value: function (t) {
                        var i = new Uint8Array([0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t]);
                        return e.box(e.types.mfhd, i)
                    }
                }, {
                    key: "traf",
                    value: function (t, i, n) {
                        var r = t.id
                            , s = e.box(e.types.tfhd, new Uint8Array([0, 0, 0, 0, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r]))
                            , o = e.box(e.types.tfdt, new Uint8Array([0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i]))
                            , a = e.sdtp(t)
                            , u = e.trun(t, a.byteLength + 16 + 16 + 8 + 8 + n);
                        return e.box(e.types.traf, s, o, u, a)
                    }
                }, {
                    key: "sdtp",
                    value: function (t) {
                        for (var i = t.samples || [], n = i.length, r = new Uint8Array(4 + n), s = 0; n > s; s++) {
                            var o = i[s].flags;
                            r[s + 4] = o.isLeading << 6 | o.dependsOn << 4 | o.isDependedOn << 2 | o.hasRedundancy
                        }
                        return e.box(e.types.sdtp, r)
                    }
                }, {
                    key: "setTrunDataOffset",
                    value: function (e, t) {
                        var i = e;
                        i[56] = t >>> 24 & 255,
                            i[57] = t >>> 16 & 255,
                            i[58] = t >>> 8 & 255,
                            i[59] = 255 & t
                    }
                }, {
                    key: "trun",
                    value: function (t, i) {
                        var n = t.samples || []
                            , r = n.length
                            , s = 12 + 16 * r
                            , o = new Uint8Array(s);
                        i += 8 + s,
                            o.set([0, 0, 15, 1, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i], 0);
                        for (var a = 0; r > a; a++) {
                            var u = n[a].duration
                                , d = n[a].size
                                , h = n[a].flags
                                , l = n[a].cts;
                            o.set([u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, 255 & u, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, h.isLeading << 2 | h.dependsOn, h.isDependedOn << 6 | h.hasRedundancy << 4 | h.isNonSync, 0, 0, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l], 12 + 16 * a)
                        }
                        return e.box(e.types.trun, o)
                    }
                }, {
                    key: "mdat",
                    value: function (t) {
                        return e.box(e.types.mdat, t)
                    }
                }]),
                    e
            }();
        s.init(),
            i.default = s
    }
        , {}],
    40: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , o = e("../utils/logger.js")
            , a = n(o)
            , u = e("./mp4-generator.js")
            , d = n(u)
            , h = e("./aac-silent.js")
            , l = n(h)
            , c = e("../utils/browser.js")
            , f = n(c)
            , _ = e("../core/media-segment-info.js")
            , m = e("../utils/exception.js")
            , p = e("../core/features")
            , v = (n(p),
                function () {
                    function e(t) {
                        r(this, e),
                            this.TAG = "MP4Remuxer",
                            this._config = t,
                            this._isLive = !0 === t.isLive,
                            this._dtsBase = -1,
                            this._dtsBaseInited = !1,
                            this._audioDtsBase = 0,
                            this._videoDtsBase = 0,
                            this._audioNextDts = void 0,
                            this._preAudioSample = void 0,
                            this._preVideoSample = void 0,
                            this._videoNextDts = void 0,
                            this._audioLastDts = -1,
                            this._videoLastDts = -1,
                            this._audioMeta = null,
                            this._videoMeta = null,
                            this._videoMetaDummy = null,
                            this._hasReceiveMeta = !1,
                            this._audioSegmentInfoList = new _.MediaSegmentInfoList("audio"),
                            this._videoSegmentInfoList = new _.MediaSegmentInfoList("video"),
                            this._onInitSegment = null,
                            this._onMediaSegment = null,
                            this._forceFirstIDR = !(!f.default.chrome || !(f.default.version.major < 50 || 50 === f.default.version.major && f.default.version.build < 2661)),
                            this._fillSilentAfterSeek = f.default.msedge || f.default.msie,
                            this._mp3UseMpegAudio = !f.default.firefox,
                            this._videoCodec = null,
                            this._videoDuration = null,
                            this._audioCodec = null,
                            this._audioDuration = null,
                            this._sequenceNumber = 0,
                            this._compensationVideoTime = [],
                            this._onError = null
                    }
                    return s(e, [{
                        key: "destroy",
                        value: function () {
                            this._dtsBase = -1,
                                this._dtsBaseInited = !1,
                                this._audioMeta = null,
                                this._videoMeta = null,
                                this._videoMetaDummy = null,
                                this._audioSegmentInfoList.clear(),
                                this._audioSegmentInfoList = null,
                                this._videoSegmentInfoList.clear(),
                                this._videoSegmentInfoList = null,
                                this._onInitSegment = null,
                                this._onMediaSegment = null,
                                this._sequenceNumber = 0,
                                this._hasReceiveMeta = !1,
                                this._audioCodec = null,
                                this._videoCodec = null,
                                this._preAudioSample = void 0,
                                this._preVideoSample = void 0,
                                this._compensationVideoTime = [],
                                this._audioLastDts = -1,
                                this._videoLastDts = -1,
                                this._onError = null
                        }
                    }, {
                        key: "bindDataSource",
                        value: function (e) {
                            return e.onDataAvailable = this.remux.bind(this),
                                e.onTrackMetadata = this._onTrackMetadataReceived.bind(this),
                                this
                        }
                    }, {
                        key: "insertDiscontinuity",
                        value: function () {
                            this._audioNextDts = this._videoNextDts = void 0
                        }
                    }, {
                        key: "seek",
                        value: function () {
                            this._videoSegmentInfoList.clear(),
                                this._audioSegmentInfoList.clear()
                        }
                    }, {
                        key: "remux",
                        value: function (e, t) {
                            if (!this._onMediaSegment)
                                throw new m.IllegalStateException("MP4Remuxer: onMediaSegment callback must be specificed!");
                            var i = !1;
                            if (this._dtsBaseInited || (this._calculateDtsBase(e, t),
                                i = !0),
                                0 !== t.samples.length && 0 !== e.samples.length) {
                                this._parseExtendData(t);
                                var n = this._remuxVideo(t)
                                    , r = this._remuxAudio(e);
                                this._sequenceNumber++;
                                var s = f.default.safari
                                    , o = "mp3" === this._audioMeta.codec && this._mp3UseMpegAudio;
                                if (s || o) {
                                    if (n.track.samples.length > 0) {
                                        var a = d.default.moof(n.track, n.info.beginDts);
                                        n.data = this._mergeBoxes(a, n.mdatbox).buffer,
                                            this._config.enableStallDetect && (a = d.default.moof(n.track_dummy, n.info.beginDts),
                                                n.data_dummy = this._mergeBoxes(a, n.mdatbox_dummy).buffer),
                                            this._onMediaSegment("video", n)
                                    }
                                    if (r.track.samples.length > 0) {
                                        if (o)
                                            r.data = r.rawData,
                                                i && (r.dtsBase = this._audioDtsBase / 1e3);
                                        else {
                                            var u = d.default.moof(r.track, r.info.beginDts);
                                            r.data = this._mergeBoxes(u, r.mdatbox).buffer
                                        }
                                        this._onMediaSegment("audio", r)
                                    }
                                } else {
                                    var h = d.default.moofAV(this._sequenceNumber, r.track, r.info.beginDts, r.rawData.byteLength, n.track, n.info.beginDts, n.rawData.byteLength);
                                    if (h) {
                                        var l = 8 + r.rawData.byteLength + n.rawData.byteLength
                                            , c = new Uint8Array(l);
                                        c[0] = l >>> 24 & 255,
                                            c[1] = l >>> 16 & 255,
                                            c[2] = l >>> 8 & 255,
                                            c[3] = 255 & l,
                                            c.set(d.default.types.mdat, 4),
                                            c.set(r.rawData, 8),
                                            c.set(n.rawData, 8 + r.rawData.byteLength);
                                        var _ = {
                                            type: "video",
                                            data: this._mergeBoxes(h, c).buffer,
                                            isBigGap: r.isBigGap,
                                            info: n.info
                                        };
                                        if (this._config.enableStallDetect) {
                                            var p = d.default.moofAV(this._sequenceNumber, r.track, r.info.beginDts, r.rawData.byteLength, n.track_dummy, n.info.beginDts, n.rawData_dummy.byteLength)
                                                , v = 8 + r.rawData.byteLength + n.rawData_dummy.byteLength
                                                , y = new Uint8Array(v);
                                            y[0] = v >>> 24 & 255,
                                                y[1] = v >>> 16 & 255,
                                                y[2] = v >>> 8 & 255,
                                                y[3] = 255 & v,
                                                y.set(d.default.types.mdat, 4),
                                                y.set(r.rawData, 8),
                                                y.set(n.rawData_dummy, 8 + r.rawData.byteLength),
                                                _.data_dummy = this._mergeBoxes(p, y).buffer
                                        }
                                        this._onMediaSegment("video", _)
                                    }
                                }
                                n.track.samples = [],
                                    n.track.length = 0,
                                    n.track.length_dummy = 0,
                                    r.track.samples = [],
                                    r.track.length = 0
                            }
                        }
                    }, {
                        key: "_onTrackMetadataReceived",
                        value: function (e, t, i) {
                            if ("audio" === e)
                                this._audioMeta = t,
                                    this._audioCodec = "mp3" === t.codec ? this._mp3UseMpegAudio ? "mpeg" : "mp3" : t.codec,
                                    this._audioDuration = t.duration;
                            else {
                                if ("video" !== e)
                                    return;
                                this._videoMeta = t,
                                    this._videoMetaDummy = i,
                                    this._videoCodec = t.codec,
                                    this._videoDuration = t.duration
                            }
                            if (!this._onInitSegment)
                                throw new m.IllegalStateException("MP4Remuxer: onInitSegment callback must be specified!");
                            if (!this._hasReceiveMeta && this._audioCodec && this._videoCodec) {
                                if ("mpeg" === this._audioCodec) {
                                    var n = {
                                        type: "audio",
                                        data: new Uint8Array,
                                        mimeType: "audio/mpeg",
                                        mediaDuration: this._videoDuration
                                    }
                                        , r = {
                                            type: "video",
                                            data: d.default.generateInitSegment(this._videoMeta).buffer,
                                            mimeType: 'video/mp4; codecs="' + this._videoCodec + '"',
                                            mediaDuration: this._videoDuration
                                        };
                                    this._config.enableStallDetect && (n.data_dummy = n.data,
                                        r.data_dummy = d.default.generateInitSegment(this._videoMetaDummy).buffer),
                                        this._onInitSegment(n, r)
                                } else {
                                    var s = {
                                        type: "init",
                                        data: d.default.generateInitSegmentForAV(this._audioMeta, this._videoMeta).buffer,
                                        mimeType: 'video/mp4; codecs="' + this._videoCodec + ", " + this._audioCodec,
                                        codec: this._videoCodec + ", " + this._audioCodec,
                                        mediaDuration: this._videoDuration
                                    };
                                    this._config.enableStallDetect && (s.data_dummy = d.default.generateInitSegmentForAV(this._audioMeta, this._videoMetaDummy).buffer),
                                        this._onInitSegment(s)
                                }
                                this._audioCodec = null,
                                    this._videoCodec = null,
                                    this._hasReceiveMeta = !0
                            }
                        }
                    }, {
                        key: "_calculateDtsBase",
                        value: function (e, t) {
                            this._dtsBaseInited || (e.samples && e.samples.length && (this._audioDtsBase = e.samples[0].dts),
                                t.samples && t.samples.length && (this._videoDtsBase = t.samples[0].dts),
                                this._dtsBase = 0,
                                this._dtsBaseInited = !0)
                        }
                    }, {
                        key: "_remuxAudio",
                        value: function (e) {
                            if (null != this._audioMeta) {
                                var t = e
                                    , i = t.samples;
                                this._preAudioSample && i.length > 0 && (i.splice(0, 0, this._preAudioSample),
                                    t.length += this._preAudioSample.unit.length,
                                    this._preAudioSample = void 0),
                                    i.length > 0 && (this._preAudioSample = i.pop(),
                                        t.length -= this._preAudioSample.unit.length);
                                var n = void 0
                                    , r = -1
                                    , s = -1
                                    , o = this._audioMeta.refSampleDuration
                                    , u = (this._dtsBaseInited && this._audioNextDts,
                                        !1);
                                if (!i || 0 === i.length)
                                    return {
                                        type: "audio",
                                        track: t,
                                        moofDuration: 0,
                                        info: {},
                                        rawData: new Uint8Array(0)
                                    };
                                var h = 0
                                    , c = null
                                    , m = 0;
                                h = 8,
                                    m = h + t.length;
                                var p = i[0].dts - this._dtsBase;
                                if (this._isLive)
                                    if (this._audioNextDts)
                                        n = p - this._audioNextDts;
                                    else if (this._audioSegmentInfoList.isEmpty())
                                        n = 0,
                                            this._fillSilentAfterSeek && !this._videoSegmentInfoList.isEmpty() && "mp3" !== this._audioMeta.originalCodec && (u = !0);
                                    else {
                                        var v = this._audioSegmentInfoList.getLastSampleBefore(p);
                                        if (null != v) {
                                            var y = p - (v.originalDts + v.duration);
                                            3 >= y && (y = 0);
                                            var g = v.dts + v.duration + y;
                                            n = p - g
                                        } else
                                            n = 0
                                    }
                                else
                                    n = 0;
                                if (u) {
                                    var b = p - n
                                        , S = this._videoSegmentInfoList.getLastSegmentBefore(p);
                                    if (null != S && S.beginDts < b) {
                                        var E = l.default.getSilentFrame(this._audioMeta.codec, this._audioMeta.channelCount);
                                        if (E) {
                                            var k = S.beginDts
                                                , O = b - S.beginDts;
                                            a.default.v(this.TAG, "InsertPrefixSilentAudio: dts: " + k + ", duration: " + O),
                                                i.unshift({
                                                    unit: E,
                                                    dts: k,
                                                    pts: k
                                                }),
                                                m += E.byteLength
                                        }
                                    } else
                                        u = !1
                                }
                                n = 0;
                                for (var w = [], L = 0, A = 0; A < i.length; A++) {
                                    var T = i[A]
                                        , R = T.unit
                                        , D = T.dts - this._dtsBase
                                        , x = D - n
                                        , C = 0
                                        , I = 0;
                                    I = A !== i.length - 1 ? i[A + 1].dts - this._dtsBase - n : this._preAudioSample.dts - this._dtsBase - n,
                                        C = I - x,
                                        -1 === r && (r = x);
                                    var M = !1
                                        , P = null;
                                    if (f.default.webkit && C > 2 * o && "mp3" !== this._audioMeta.originalCodec) {
                                        var B = x + o
                                            , U = Math.ceil(C / o)
                                            , j = l.default.getSilentFrame(this._audioMeta.codec, this._audioMeta.channelCount);
                                        if (j) {
                                            P = [];
                                            var N = U * o - C;
                                            a.default.w(this.TAG, "big audio dts gap: " + C + ",dts:" + x + ",nextDts:" + I + ", create " + U + " samples, compensationVideoTime " + N);
                                            for (var F = 0; U > F; F++)
                                                if (0 == F)
                                                    T.unit = j;
                                                else {
                                                    var V = Math.round(B);
                                                    if (P.length > 0) {
                                                        var G = P[P.length - 1];
                                                        G.duration = V - G.dts
                                                    }
                                                    var z = {
                                                        dts: V,
                                                        pts: V,
                                                        cts: 0,
                                                        unit: j,
                                                        size: j.byteLength,
                                                        duration: 0,
                                                        originalDts: D,
                                                        flags: {
                                                            isLeading: 0,
                                                            dependsOn: 1,
                                                            isDependedOn: 0,
                                                            hasRedundancy: 0
                                                        }
                                                    };
                                                    P.push(z),
                                                        m += R.byteLength,
                                                        B += o,
                                                        L += o
                                                }
                                            if (P.length > 0) {
                                                M = !0;
                                                var H = P[P.length - 1];
                                                H.duration = x + C - H.dts
                                            }
                                            C = Math.round(o)
                                        }
                                    }
                                    L += C,
                                        w.push({
                                            dts: x,
                                            pts: x,
                                            cts: 0,
                                            unit: T.unit,
                                            size: T.unit.byteLength,
                                            duration: C,
                                            originalDts: D,
                                            flags: {
                                                isLeading: 0,
                                                dependsOn: 1,
                                                isDependedOn: 0,
                                                hasRedundancy: 0
                                            }
                                        }),
                                        M && w.push.apply(w, P)
                                }
                                c = new Uint8Array(m),
                                    c[0] = m >>> 24 & 255,
                                    c[1] = m >>> 16 & 255,
                                    c[2] = m >>> 8 & 255,
                                    c[3] = 255 & m,
                                    c.set(d.default.types.mdat, 4);
                                for (var q = new Uint8Array(m - 8), K = 0; K < w.length; K++) {
                                    var W = w[K].unit;
                                    c.set(W, h),
                                        q.set(W, h - 8),
                                        h += W.byteLength
                                }
                                var Y = w[w.length - 1];
                                s = Y.dts + Y.duration,
                                    this._audioNextDts = s,
                                    this._audioLastDts = Y.dts;
                                var X = new _.MediaSegmentInfo("audio");
                                return X.beginDts = r,
                                    X.endDts = s,
                                    X.beginPts = r,
                                    X.endPts = s,
                                    X.originalBeginDts = w[0].originalDts,
                                    X.originalEndDts = Y.originalDts + Y.duration,
                                    X.firstSample = new _.SampleInfo(w[0].dts, w[0].pts, w[0].duration, w[0].originalDts, !1),
                                    X.lastSample = new _.SampleInfo(Y.dts, Y.pts, Y.duration, Y.originalDts, !1),
                                    this._isLive || this._audioSegmentInfoList.append(X),
                                    t.samples = w,
                                    t.sequenceNumber++ ,
                                    {
                                        type: "audio",
                                        isBigGap: !1,
                                        mdatbox: c,
                                        rawData: q,
                                        track: t,
                                        moofDuration: L,
                                        sampleCount: w.length,
                                        info: X
                                    }
                            }
                        }
                    }, {
                        key: "_remuxVideo",
                        value: function (e) {
                            if (null != this._videoMeta) {
                                var t = e
                                    , i = t.samples
                                    , n = void 0
                                    , r = -1
                                    , s = -1
                                    , o = -1
                                    , a = -1;
                                this._preVideoSample && i.length > 0 && (i.splice(0, 0, this._preVideoSample),
                                    t.length += this._preVideoSample.length,
                                    t.length_dummy += this._preVideoSample.length_dummy,
                                    this._preVideoSample = void 0),
                                    i.length > 0 && (this._preVideoSample = i.pop(),
                                        t.length -= this._preVideoSample.length,
                                        t.length_dummy -= this._preVideoSample.length_dummy);
                                var u = Object.assign({}, t)
                                    , h = new Uint8Array(e.length_dummy);
                                if (!i || 0 === i.length) {
                                    var l = {
                                        type: "video",
                                        track: t,
                                        moofDuration: 0,
                                        info: {},
                                        rawData: new Uint8Array(0)
                                    };
                                    return this._config.enableStallDetect && (l.track_dummy = u,
                                        l.rawData_dummy = h),
                                        l
                                }
                                var c = 8
                                    , f = 8 + e.length
                                    , m = new Uint8Array(f);
                                m[0] = f >>> 24 & 255,
                                    m[1] = f >>> 16 & 255,
                                    m[2] = f >>> 8 & 255,
                                    m[3] = 255 & f,
                                    m.set(d.default.types.mdat, 4);
                                var p = new Uint8Array(e.length)
                                    , v = 8
                                    , y = 8 + e.length_dummy
                                    , g = new Uint8Array(y);
                                g[0] = y >>> 24 & 255,
                                    g[1] = y >>> 16 & 255,
                                    g[2] = y >>> 8 & 255,
                                    g[3] = 255 & y,
                                    g.set(d.default.types.mdat, 4);
                                var b = i[0].dts - this._dtsBase;
                                if (this._isLive)
                                    if (this._videoNextDts)
                                        n = b - this._videoNextDts;
                                    else if (this._videoSegmentInfoList.isEmpty())
                                        n = 0;
                                    else {
                                        var S = this._videoSegmentInfoList.getLastSampleBefore(b);
                                        if (null != S) {
                                            var E = b - (S.originalDts + S.duration);
                                            3 >= E && (E = 0);
                                            var k = S.dts + S.duration + E;
                                            n = b - k
                                        } else
                                            n = 0
                                    }
                                else
                                    n = 0;
                                n = 0;
                                for (var O = new _.MediaSegmentInfo("video"), w = [], L = [], A = 0, T = 0; T < i.length; T++) {
                                    var R = i[T]
                                        , D = R.dts - this._dtsBase
                                        , x = R.isKeyframe
                                        , C = D - n
                                        , I = R.cts
                                        , M = C + I
                                        , P = 0
                                        , B = 0;
                                    if (B = T !== i.length - 1 ? i[T + 1].dts - this._dtsBase - n : this._preVideoSample.dts - this._dtsBase - n,
                                        P = B - C,
                                        -1 === r && (r = C,
                                            o = C + I),
                                        x) {
                                        var U = new _.SampleInfo(C, M, P, D, !0);
                                        U.fileposition = R.fileposition,
                                            O.appendSyncPoint(U)
                                    }
                                    A += P,
                                        L.push({
                                            dts: C,
                                            pts: M,
                                            cts: I,
                                            units: R.units,
                                            size: R.length,
                                            isKeyframe: x,
                                            duration: P,
                                            originalDts: D,
                                            flags: {
                                                isLeading: 0,
                                                dependsOn: x ? 2 : 1,
                                                isDependedOn: x ? 1 : 0,
                                                hasRedundancy: 0,
                                                isNonSync: x ? 0 : 1
                                            }
                                        }),
                                        this._config.enableStallDetect && w.push({
                                            dts: C,
                                            pts: M,
                                            cts: I,
                                            units: R.units_dummy,
                                            size: R.length_dummy,
                                            isKeyframe: x,
                                            duration: P,
                                            originalDts: D,
                                            flags: {
                                                isLeading: 0,
                                                dependsOn: x ? 2 : 1,
                                                isDependedOn: x ? 1 : 0,
                                                hasRedundancy: 0,
                                                isNonSync: x ? 0 : 1
                                            }
                                        })
                                }
                                for (var j = 0; j < L.length; j++) {
                                    for (var N = L[j].units; N.length;) {
                                        var F = N.shift()
                                            , V = F.data;
                                        m.set(V, c),
                                            p.set(V, c - 8),
                                            c += V.byteLength
                                    }
                                    if (this._config.enableStallDetect)
                                        for (var G = w[j].units; G.length;) {
                                            var z = G.shift()
                                                , H = z.data;
                                            g.set(H, v),
                                                h.set(H, v - 8),
                                                v += H.byteLength
                                        }
                                }
                                var q = L[L.length - 1];
                                s = q.dts + q.duration,
                                    a = q.pts + q.duration,
                                    this._videoNextDts = s,
                                    this._videoLastDts = q.dts,
                                    O.beginDts = r,
                                    O.endDts = s,
                                    O.beginPts = o,
                                    O.endPts = a,
                                    O.originalBeginDts = L[0].originalDts,
                                    O.originalEndDts = q.originalDts + q.duration,
                                    O.firstSample = new _.SampleInfo(L[0].dts, L[0].pts, L[0].duration, L[0].originalDts, L[0].isKeyframe),
                                    O.lastSample = new _.SampleInfo(q.dts, q.pts, q.duration, q.originalDts, q.isKeyframe),
                                    this._isLive || this._videoSegmentInfoList.append(O),
                                    t.samples = L,
                                    t.sequenceNumber++ ,
                                    this._forceFirstIDR && (L[0].flags.dependsOn = 2,
                                        L[0].flags.isNonSync = 0,
                                        this._config.enableStallDetect && (w[0].flags.dependsOn = 2,
                                            w[0].flags.isNonSync = 0));
                                var K = {
                                    type: "video",
                                    track: t,
                                    mdatbox: m,
                                    rawData: p,
                                    moofDuration: A,
                                    sampleCount: L.length,
                                    info: O
                                };
                                return this._config.enableStallDetect && (u.samples = w,
                                    u.length = u.length_dummy,
                                    K.track_dummy = u,
                                    K.mdatbox_dummy = g,
                                    K.rawData_dummy = h),
                                    K
                            }
                        }
                    }, {
                        key: "_parseExtendData",
                        value: function (e) {
                            for (var t = 0; t < e.extends.length; t++) {
                                var i = e.extends[t];
                                e.extends.splice(t, 1),
                                    t-- ,
                                    this._onMediaSegment("extend", {
                                        type: "extend",
                                        dts: i.dts,
                                        data: new Uint8Array(i.data)
                                    })
                            }
                        }
                    }, {
                        key: "_mergeBoxes",
                        value: function (e, t, i) {
                            var n = void 0;
                            return n = new Uint8Array(i ? e.byteLength + t.byteLength + i.byteLength : e.byteLength + t.byteLength),
                                n.set(e, 0),
                                n.set(t, e.byteLength),
                                i && n.set(i, e.byteLength + t.byteLength),
                                n
                        }
                    }, {
                        key: "onInitSegment",
                        get: function () {
                            return this._onInitSegment
                        },
                        set: function (e) {
                            this._onInitSegment = e
                        }
                    }, {
                        key: "onMediaSegment",
                        get: function () {
                            return this._onMediaSegment
                        },
                        set: function (e) {
                            this._onMediaSegment = e
                        }
                    }, {
                        key: "onError",
                        get: function () {
                            return this._onError
                        },
                        set: function (e) {
                            this._onError = e
                        }
                    }]),
                        e
                }());
        i.default = v
    }
        , {
        "../core/features": 6,
        "../core/media-segment-info.js": 8,
        "../utils/browser.js": 42,
        "../utils/exception.js": 43,
        "../utils/logger.js": 44,
        "./aac-silent.js": 38,
        "./mp4-generator.js": 39
    }],
    41: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = function () {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "binaryNearestSearch",
                    value: function (e, t, i) {
                        var n = i ? i.sourceKeyName : null
                            , r = i ? i.targetKeyName : null
                            , s = r ? t[r] : t
                            , o = 0
                            , a = e.length - 1
                            , u = 0
                            , d = 0
                            , h = a
                            , l = n ? e[0][n] : e[0];
                        for (l > s && (o = 0,
                            d = h + 1); h >= d;) {
                            if ((u = d + Math.floor((h - d) / 2)) === a) {
                                o = u;
                                break
                            }
                            var c = n ? e[u][n] : e[u]
                                , f = n ? e[u + 1][n] : e[u + 1];
                            if (s >= c && f > s) {
                                o = u;
                                break
                            }
                            s > c ? d = u + 1 : h = u - 1
                        }
                        return o
                    }
                }]),
                    e
            }();
        i.default = s
    }
        , {}],
    42: [function (e, t, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var n = {};
        !function () {
            var e = self.navigator.userAgent.toLowerCase()
                , t = /(edge)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(iemobile)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(firefox)[ \/]([\w.]+)/.exec(e) || []
                , i = /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(android)/.exec(e) || /(windows)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || []
                , r = {
                    browser: t[5] || t[3] || t[1] || "",
                    version: t[2] || t[4] || "0",
                    majorVersion: t[4] || t[2] || "0",
                    platform: i[0] || ""
                }
                , s = {};
            if (r.browser) {
                s[r.browser] = !0;
                var o = r.majorVersion.split(".");
                s.version = {
                    major: parseInt(r.majorVersion, 10),
                    string: r.version
                },
                    o.length > 1 && (s.version.minor = parseInt(o[1], 10)),
                    o.length > 2 && (s.version.build = parseInt(o[2], 10))
            }
            r.platform && (s[r.platform] = !0),
                (s.chrome || s.opr || s.safari) && (s.webkit = !0),
                (s.rv || s.iemobile) && (s.rv && delete s.rv,
                    r.browser = "msie",
                    s.msie = !0),
                s.edge && (delete s.edge,
                    r.browser = "msedge",
                    s.msedge = !0),
                s.opr && (r.browser = "opera",
                    s.opera = !0),
                s.safari && s.android && (r.browser = "android",
                    s.android = !0),
                s.name = r.browser,
                s.platform = r.platform;
            for (var a in n)
                n.hasOwnProperty(a) && delete n[a];
            Object.assign(n, s)
        }(),
            i.default = n
    }
        , {}],
    43: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!e)
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }
        function r(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        function s(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , a = i.RuntimeException = function () {
                function e(t) {
                    s(this, e),
                        this._message = t
                }
                return o(e, [{
                    key: "toString",
                    value: function () {
                        return this.name + ": " + this.message
                    }
                }, {
                    key: "name",
                    get: function () {
                        return "RuntimeException"
                    }
                }, {
                    key: "message",
                    get: function () {
                        return this._message
                    }
                }]),
                    e
            }();
        i.IllegalStateException = function (e) {
            function t(e) {
                return s(this, t),
                    n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
            }
            return r(t, e),
                o(t, [{
                    key: "name",
                    get: function () {
                        return "IllegalStateException"
                    }
                }]),
                t
        }(a),
            i.InvalidArgumentException = function (e) {
                function t(e) {
                    return s(this, t),
                        n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
                }
                return r(t, e),
                    o(t, [{
                        key: "name",
                        get: function () {
                            return "InvalidArgumentException"
                        }
                    }]),
                    t
            }(a),
            i.NotImplementedException = function (e) {
                function t(e) {
                    return s(this, t),
                        n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
                }
                return r(t, e),
                    o(t, [{
                        key: "name",
                        get: function () {
                            return "NotImplementedException"
                        }
                    }]),
                    t
            }(a)
    }
        , {}],
    44: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = function () {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "e",
                    value: function (t, i) {
                        var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var r = e.formatLogStr(t, i);
                        e.HOOK_FUNC && e.HOOK_FUNC(r),
                            e.ENABLE_ERROR && (console.error ? console.error(r) : console.warn ? console.warn(r) : console.log(r)),
                            n && e.elk(t, i)
                    }
                }, {
                    key: "i",
                    value: function (t, i) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var r = e.formatLogStr(t, i);
                        e.HOOK_FUNC && e.HOOK_FUNC(r),
                            e.ENABLE_INFO && (console.info ? console.info(r) : console.log(r)),
                            n && e.elk(t, i)
                    }
                }, {
                    key: "w",
                    value: function (t, i) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var r = e.formatLogStr(t, i);
                        e.HOOK_FUNC && e.HOOK_FUNC(r),
                            e.ENABLE_WARN && (console.warn ? console.warn(r) : console.log(r)),
                            n && e.elk(t, i)
                    }
                }, {
                    key: "d",
                    value: function (t, i) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var r = e.formatLogStr(t, i);
                        e.HOOK_FUNC && e.HOOK_FUNC(r),
                            e.ENABLE_DEBUG && (console.debug ? console.debug(r) : console.log(r)),
                            n && e.elk(t, i)
                    }
                }, {
                    key: "v",
                    value: function (t, i) {
                        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                        t && !e.FORCE_GLOBAL_TAG || (t = e.GLOBAL_TAG);
                        var r = e.formatLogStr(t, i);
                        e.HOOK_FUNC && e.HOOK_FUNC(r),
                            e.ENABLE_VERBOSE && console.log(r),
                            n && e.elk(t, i)
                    }
                }, {
                    key: "formatLogStr",
                    value: function (e, t) {
                        var i = new Date;
                        return "[" + e + "] " + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + ":" + i.getMilliseconds() + "-> " + t
                    }
                }, {
                    key: "elk",
                    value: function (t, i) {
                        if (e.ENABLE_ELK) {
                            var n = new Date
                                , r = t + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds() + ":" + n.getMilliseconds() + " " + i;
                            e.ELK_LOG.push(r),
                                e.ELK_LOG.length > 300 && e.ELK_LOG.shift()
                        }
                    }
                }]),
                    e
            }();
        s.SESSION_ID = (new Date).getTime(),
            s.ELK_LOG = [],
            s.GLOBAL_TAG = "KugouH5Player",
            s.FORCE_GLOBAL_TAG = !1,
            s.ENABLE_ERROR = !0,
            s.ENABLE_INFO = !0,
            s.ENABLE_WARN = !0,
            s.ENABLE_DEBUG = !0,
            s.ENABLE_VERBOSE = !0,
            s.ENABLE_ELK = !0,
            s.HOOK_FUNC = null,
            i.default = s
    }
        , {}],
    45: [function (e, t, i) {
        "use strict";
        function n(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        }
        function r(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var s = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , o = e("events")
            , a = n(o)
            , u = e("./logger.js")
            , d = n(u)
            , h = function () {
                function e() {
                    r(this, e)
                }
                return s(e, null, [{
                    key: "getConfig",
                    value: function () {
                        return {
                            globalTag: d.default.GLOBAL_TAG,
                            forceGlobalTag: d.default.FORCE_GLOBAL_TAG,
                            enableVerbose: d.default.ENABLE_VERBOSE,
                            enableDebug: d.default.ENABLE_DEBUG,
                            enableInfo: d.default.ENABLE_INFO,
                            enableWarn: d.default.ENABLE_WARN,
                            enableError: d.default.ENABLE_ERROR
                        }
                    }
                }, {
                    key: "applyConfig",
                    value: function (e) {
                        d.default.GLOBAL_TAG = e.globalTag,
                            d.default.FORCE_GLOBAL_TAG = e.forceGlobalTag,
                            d.default.ENABLE_VERBOSE = e.enableVerbose,
                            d.default.ENABLE_DEBUG = e.enableDebug,
                            d.default.ENABLE_INFO = e.enableInfo,
                            d.default.ENABLE_WARN = e.enableWarn,
                            d.default.ENABLE_ERROR = e.enableError
                    }
                }, {
                    key: "_notifyChange",
                    value: function () {
                        var t = e.emitter;
                        if (t.listenerCount("change") > 0) {
                            var i = e.getConfig();
                            t.emit("change", i)
                        }
                    }
                }, {
                    key: "registerListener",
                    value: function (t) {
                        e.emitter.addListener("change", t)
                    }
                }, {
                    key: "removeListener",
                    value: function (t) {
                        e.emitter.removeListener("change", t)
                    }
                }, {
                    key: "d",
                    value: function (e, t) {
                        d.default.d(e, t)
                    }
                }, {
                    key: "forceGlobalTag",
                    get: function () {
                        return d.default.FORCE_GLOBAL_TAG
                    },
                    set: function (t) {
                        d.default.FORCE_GLOBAL_TAG = t,
                            e._notifyChange()
                    }
                }, {
                    key: "globalTag",
                    get: function () {
                        return d.default.GLOBAL_TAG
                    },
                    set: function (t) {
                        d.default.GLOBAL_TAG = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableAll",
                    get: function () {
                        return d.default.ENABLE_VERBOSE && d.default.ENABLE_DEBUG && d.default.ENABLE_INFO && d.default.ENABLE_WARN && d.default.ENABLE_ERROR
                    },
                    set: function (t) {
                        d.default.ENABLE_VERBOSE = t,
                            d.default.ENABLE_DEBUG = t,
                            d.default.ENABLE_INFO = t,
                            d.default.ENABLE_WARN = t,
                            d.default.ENABLE_ERROR = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableDebug",
                    get: function () {
                        return d.default.ENABLE_DEBUG
                    },
                    set: function (t) {
                        d.default.ENABLE_DEBUG = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableVerbose",
                    get: function () {
                        return d.default.ENABLE_VERBOSE
                    },
                    set: function (t) {
                        d.default.ENABLE_VERBOSE = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableInfo",
                    get: function () {
                        return d.default.ENABLE_INFO
                    },
                    set: function (t) {
                        d.default.ENABLE_INFO = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableWarn",
                    get: function () {
                        return d.default.ENABLE_WARN
                    },
                    set: function (t) {
                        d.default.ENABLE_WARN = t,
                            e._notifyChange()
                    }
                }, {
                    key: "enableError",
                    get: function () {
                        return d.default.ENABLE_ERROR
                    },
                    set: function (t) {
                        d.default.ENABLE_ERROR = t,
                            e._notifyChange()
                    }
                }, {
                    key: "hookFunc",
                    set: function (e) {
                        d.default.HOOK_FUNC = e
                    }
                }]),
                    e
            }();
        h.emitter = new a.default,
            i.default = h
    }
        , {
        "./logger.js": 44,
        events: 2
    }],
    46: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = function () {
                function t() {
                    n(this, t)
                }
                return r(t, null, [{
                    key: "install",
                    value: function () {
                        Object.setPrototypeOf = Object.setPrototypeOf || function (e, t) {
                            return e.__proto__ = t,
                                e
                        }
                            ,
                            Object.assign = Object.assign || function (e) {
                                if (void 0 === e || null === e)
                                    throw new TypeError("Cannot convert undefined or null to object");
                                for (var t = Object(e), i = 1; i < arguments.length; i++) {
                                    var n = arguments[i];
                                    if (void 0 !== n && null !== n)
                                        for (var r in n)
                                            n.hasOwnProperty(r) && (t[r] = n[r])
                                }
                                return t
                            }
                            ,
                            "function" != typeof self.Promise && e("es6-promise").polyfill()
                    }
                }]),
                    t
            }();
        s.install(),
            i.default = s
    }
        , {
        "es6-promise": 1
    }],
    47: [function (e, t, i) {
        "use strict";
        function n(e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var r = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1,
                        n.configurable = !0,
                        "value" in n && (n.writable = !0),
                        Object.defineProperty(e, n.key, n)
                }
            }
            return function (t, i, n) {
                return i && e(t.prototype, i),
                    n && e(t, n),
                    t
            }
        }()
            , s = function () {
                function e() {
                    n(this, e)
                }
                return r(e, null, [{
                    key: "install",
                    value: function () {
                        for (var e = 0, t = ["webkit", "moz"], i = 0; i < t.length && !window.requestAnimationFrame; ++i)
                            window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"],
                                window.cancelAnimationFrame = window[t[i] + "CancelAnimationFrame"] || window[t[i] + "CancelRequestAnimationFrame"];
                        window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
                            var i = (new Date).getTime()
                                , n = Math.max(0, 16.7 - (i - e))
                                , r = window.setTimeout(function () {
                                    t(i + n)
                                }, n);
                            return e = i + n,
                                r
                        }
                        ),
                            window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
                                clearTimeout(e)
                            }
                            )
                    }
                }]),
                    e
            }();
        i.default = s
    }
        , {}],
    48: [function (e, t, i) {
        "use strict";
        function n(e, t, i) {
            var n = e;
            if (t + i < n.length) {
                for (; i--;)
                    if (128 != (192 & n[++t]))
                        return !1;
                return !0
            }
            return !1
        }
        function r(e) {
            for (var t = [], i = e, r = 0, s = e.length; s > r;)
                if (i[r] < 128)
                    t.push(String.fromCharCode(i[r])),
                        ++r;
                else {
                    if (i[r] < 192)
                        ;
                    else if (i[r] < 224) {
                        if (n(i, r, 1)) {
                            var o = (31 & i[r]) << 6 | 63 & i[r + 1];
                            if (o >= 128) {
                                t.push(String.fromCharCode(65535 & o)),
                                    r += 2;
                                continue
                            }
                        }
                    } else if (i[r] < 240) {
                        if (n(i, r, 2)) {
                            var a = (15 & i[r]) << 12 | (63 & i[r + 1]) << 6 | 63 & i[r + 2];
                            if (a >= 2048 && 55296 != (63488 & a)) {
                                t.push(String.fromCharCode(65535 & a)),
                                    r += 3;
                                continue
                            }
                        }
                    } else if (i[r] < 248 && n(i, r, 3)) {
                        var u = (7 & i[r]) << 18 | (63 & i[r + 1]) << 12 | (63 & i[r + 2]) << 6 | 63 & i[r + 3];
                        if (u > 65536 && 1114112 > u) {
                            u -= 65536,
                                t.push(String.fromCharCode(u >>> 10 | 55296)),
                                t.push(String.fromCharCode(1023 & u | 56320)),
                                r += 4;
                            continue
                        }
                    }
                    t.push(String.fromCharCode(65533)),
                        ++r
                }
            return t.join("")
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }),
            i.default = r
    }
        , {}]
}, {}, [23])(23);
var fileFormats = {
    MP4: "mp4",
    FLV: "flv"
};
var fxPlayer = {
    isSupperted: fxJsPlayer.isSupported(),
    isSupportMp4: window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.640016, mp4a.40.5"'),
    instances: [],
    init: function (a) {
        if ("object" == typeof a)
            if (a instanceof Array)
                for (var i = 0; i < a.length; i++)
                    this.initData(a[i]);
            else
                this.initData(a),
                    this.id = a.id
    },
    isSupported: function (a) {
        return a = a || 1,
            1 === a ? window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.640016, mp4a.40.5"') : 2 == a ? window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.4d001f, mp4a.40.5"') : void 0
    },
    initData: function (a) {
        a.width = a.width || 640,
            a.height = a.height || 480,
            a.muted = a.muted || !1,
            a.volume = a.volume || .8,
            a.type = a.type || "flv",
            a.debug = a.debug || !1,
            a.isLive = "undefined" == typeof a.isLive ? !0 : a.isLive,
            a.url = a.url || "",
            a.httpFlv = a.httpFlv || [],
            a.isAutoPlay = "undefined" == typeof a.isAutoPlay ? !0 : a.isAutoPlay,
            a.maxConnect = a.maxConnect || 6,
            a.CONNECT_FREQUENCY = a.CONNECT_FREQUENCY || 15e3,
            a.resolutionPolicy = "undefined" == typeof a.resolutionPolicy ? 3 : a.resolutionPolicy,
            a.enableStallDetect = "undefined" == typeof a.enableStallDetect ? !1 : a.enableStallDetect,
            a.enableWorker = "undefined" == typeof a.enableWorker ? !1 : a.enableWorker,
            a.lazyLoadMaxDuration = a.lazyLoadMaxDuration || 180,
            a.seekType = a.seekType || "range",
            a.deferLoadAfterSourceOpen = "undefined" == typeof a.deferLoadAfterSourceOpen ? !1 : a.deferLoadAfterSourceOpen,
            a.enableStashBuffer = a.enableStashBuffer || !1,
            a.playType = a.playType || "all";
        var c = new FxPlayer(a, this);
        this.instances[a.id] = c,
            a.isAutoPlay && c.startLive(a)
    },
    enableLog: function (a) {
        fxJsPlayer.LoggingControl.enableAll = a
    },
    startLive: function (a, h) {
        var c = this.instances[a];
        c && c.startLive(h)
    },
    playLive: function (a) {
        var h = this.instances[a];
        h && h.playLive()
    },
    pauseLive: function (a) {
        var h = this.instances[a];
        h && h.pauseLive()
    },
    stopLive: function (a) {
        var h = this.instances[a];
        h && h.stopLive()
    },
    setMuted: function (a, h) {
        var c = this.instances[a];
        c && c.setMuted(h)
    },
    getMuted: function (a) {
        var h = this.instances[a];
        return h ? h.getMuted() : !1
    },
    setVolume: function (a, h) {
        var c = this.instances[a];
        c && c.setVolume(h)
    },
    getVolume: function (a) {
        var h = this.instances[a];
        return h ? h.getVolume() : 0
    },
    resize: function (a, h, c) {
        var _ = this.instances[a];
        _ && _.resize(h, c)
    },
    getDuration: function (a) {
        var h = this.instances[a]
            , c = 0;
        return h && (c = parseInt(h.duration)),
            c
    },
    getCurrentTime: function (a) {
        var h = this.instances[a]
            , c = 0;
        return h && (c = parseInt(h.getCurrentTime())),
            c
    },
    seek: function (a, h) {
        var c = this.instances[a];
        c && c.seek(h)
    },
    addCanPlayCallback: function (a, h) {
        var c = this.instances[a];
        c && (c.canplayCallbacks = c.canplayCallbacks || [],
            c.canplayCallbacks.push(h))
    },
    _canplay: function (a, h) {
        var c = this.instances[a];
        if (c && c.canplayCallbacks && c.canplayCallbacks.length)
            for (var i = c.canplayCallbacks.length - 1; i >= 0; i--)
                c.canplayCallbacks[i] && (c.canplayCallbacks[i].call(this, h),
                    c.isReady = !0)
    },
    addLoadedDataCallback: function (a, h) {
        var c = this.instances[a];
        c && (c.loadDataCallbacks = c.loadDataCallbacks || [],
            c.loadDataCallbacks.push(h))
    },
    _loadedmetadata: function (a, h) {
        var c = this.instances[a];
        if (c && c.loadDataCallbacks && c.loadDataCallbacks.length)
            for (var i = c.loadDataCallbacks.length - 1; i >= 0; i--)
                c.loadDataCallbacks[i] && c.loadDataCallbacks[i].call(this, h)
    },
    _onLogCallback: function (a, h) {
        var c = this.instances[a];
        if (c && c.logCallbacks && c.logCallbacks.length)
            for (var i = c.logCallbacks.length - 1; i >= 0; i--)
                c.logCallbacks[i] && c.logCallbacks[i].call(this, h)
    },
    addLogCallback: function (a, h) {
        var c = this.instances[a];
        if (c && (c.logCallbacks = c.logCallbacks || [],
            c.logCallbacks.push(h),
            c.logHistory && c.logHistory.length))
            for (var i = 0; i < c.logHistory.length; i++)
                this._onLogCallback(a, c.logHistory[i])
    },
    addErrorCallback: function (a, h) {
        var c = this.instances[a];
        c && (c.errorCallbacks = c.errorCallbacks || [],
            c.errorCallbacks.push(h))
    },
    _error: function (a, h) {
        var c = this.instances[a];
        if (c && c.errorCallbacks && c.errorCallbacks.length)
            for (var i = c.errorCallbacks.length - 1; i >= 0; i--)
                c.errorCallbacks[i] && c.errorCallbacks[i].call(this, h)
    },
    addErrorInfoCallback: function (a, h) {
        var c = this.instances[a];
        c && (c.errorInfoCallbacks = c.errorInfoCallbacks || [],
            c.errorInfoCallbacks.push(h))
    },
    _errorInfo: function (a, h) {
        var c = this.instances[a];
        if (c && c.errorInfoCallbacks && c.errorInfoCallbacks.length)
            for (var i = c.errorInfoCallbacks.length - 1; i >= 0; i--)
                c.errorInfoCallbacks[i] && c.errorInfoCallbacks[i].call(this, h)
    },
    addReconnectCallback: function (a, h) {
        var c = this.instances[a];
        c && (c.reconnectCallbacks = c.reconnectCallbacks || [],
            c.reconnectCallbacks.push(h))
    },
    _reconnectCallback: function (a, h) {
        var c = this.instances[a];
        if (c && c.reconnectCallbacks && c.reconnectCallbacks.length)
            for (var i = c.reconnectCallbacks.length - 1; i >= 0; i--)
                c.reconnectCallbacks[i] && c.reconnectCallbacks[i].call(this, h)
    },
    _onFlashStreamStatus: function (a, h) {
        var c = this.instances[a];
        "undefined" != typeof c && c.setStreamStatus(h)
    },
    _onStreamStatus: function (a, h) {
        var c = this.instances[a];
        if ("undefined" != typeof c && (c.streamStatus = h,
            c.streamStatusCallbacks && c.streamStatusCallbacks.length))
            for (var i = c.streamStatusCallbacks.length - 1; i >= 0; i--)
                c.streamStatusCallbacks[i] && c.streamStatusCallbacks[i].call(this, h)
    },
    streamStatusCallback: function (a, h) {
        var c = this.instances[a];
        c && (c.streamStatusCallbacks = c.streamStatusCallbacks || [],
            c.streamStatusCallbacks.push(h))
    },
    flashReadyCallback: function (a, h) {
        var c = this.instances[a];
        c && (c.readyCallbacks = c.readyCallbacks || [],
            c.readyCallbacks.push(h))
    },
    _flashReady: function (a, h) {
        var c = this.instances[a];
        if (c && c.data.isAutoPlay && c.startLive(),
            c && c.readyCallbacks && c.readyCallbacks.length)
            for (var i = c.readyCallbacks.length - 1; i >= 0; i--)
                c.readyCallbacks[i] && (c.readyCallbacks[i].call(this, h),
                    c.isReady = !0)
    },
    videoMetadataCallback: function (a, h) {
        var c = this.instances[a];
        c && (c.metaDataCallbacks = c.metaDataCallbacks || [],
            c.metaDataCallbacks.push(h))
    },
    _onVideoMetadata: function (a, h) {
        var c = this.instances[a];
        if (c && c.metaDataCallbacks && c.metaDataCallbacks.length) {
            c.setDuration(h);
            for (var i = c.metaDataCallbacks.length - 1; i >= 0; i--)
                c.metaDataCallbacks[i] && (c.metaDataCallbacks[i].call(this, h),
                    c.isReady = !0)
        }
    },
    accurateLyricCallback: function (a, h) {
        var c = this.instances[a];
        c && (c.extendDataCallbacks = c.extendDataCallbacks || [],
            c.extendDataCallbacks.push(h))
    },
    _onExtendDataCallback: function (a, h, c) {
        var _ = this.instances[a];
        if (_ && _.extendDataCallbacks && _.extendDataCallbacks.length)
            for (var i = _.extendDataCallbacks.length - 1; i >= 0; i--)
                _.extendDataCallbacks[i] && _.extendDataCallbacks[i].call(this, decodeURIComponent(h), c)
    },
    getStreamStatus: function (a) {
        var h = this.instances[a];
        return h ? h.getStreamStatus() : 2
    },
    httpReconnect: function (a, h) {
        var c = this.instances[a];
        c && c.httpReconnect(h)
    },
    httpReconnectErr: function (a) {
        var h = this.instances[a];
        h && h.httpReconnectErr()
    },
    getVersion: function (a) {
        var h = this.instances[a];
        return h ? h.getVersion() : ""
    },
    on: function (a) {
        var h = this.instances[a];
        h && h.on.apply(h, arguments)
    },
    off: function (a) {
        var h = this.instances[a];
        h && h.off.apply(h, arguments)
    }
};
FxPlayer.prototype = {
    initUI: function () {
        this.element.style.width = this.data.width + "px",
            this.element.style.height = this.data.height + "px",
            this.element.style.postion = "relative",
            this.element.style.overflow = "hidden",
            this.isPlayFlv || this.isSupportMp4 ? fxJsPlayer.LoggingControl.hookFunc = this._bindLogCallback.bind(this) : this.initFlashPlayer()
    },
    initFlashPlayer: function () {
        var h = {
            width: this.data.width,
            height: this.data.height,
            src: this.data.src
        }
            , c = {
                id: this.id,
                url: encodeURIComponent(this.data.url),
                isAutoPlay: this.data.isAutoPlay ? "1" : "0",
                preload: this.data.preload,
                isMute: this.data.isMute,
                resolutionPolicy: this.data.resolutionPolicy
            };
        this.player = detectFlashObjectElement(this.id, h, c),
            this.useFlash = !0
    },
    setDuration: function (a) {
        this.duration = a
    },
    initPlayer: function () {
        if (this.isPlayFlv || this.isSupportMp4) {
            this.useFlash = !1,
                "undefined" != typeof this.player && null != this.player && (this.player.destroy(),
                    this.player = null),
                this.player = fxJsPlayer.createPlayer({
                    type: this.data.type,
                    url: this.data.url
                }, Object.assign({}, this.data));
            var a = this;
            this.player.on("media_info", function (h) {
                a._loadedmetadata.call(a, h)
            }),
                this.player.on(fxJsPlayer.Events.EXTEND_VIDEO_DATA, function (h, c) {
                    fxPlayer._onExtendDataCallback(a.id, h, c)
                }),
                this.player.on(fxJsPlayer.Events.VIDEO_ARRIVAL_TIME, function () { }),
                this.player.on(fxJsPlayer.Events.STREAM_STATUS, function (h, c) {
                    fxJsPlayer.LoggingControl.d("Fx.jsPlayer", "视频状态 " + h),
                        a._onStreamStatus.call(a, h, c)
                }),
                this.player.on(fxJsPlayer.Events.ERROR, function (h, c, _) {
                    a._playerError.call(a, h, c, _)
                }),
                this.player.attachMediaElement(this.element),
                this.setVolume(this.data.volume),
                this.player.muted = this.data.muted
        }
    },
    on: function () {
        this.player.on.apply(this.player, arguments)
    },
    off: function () {
        this.player.off.apply(this.player, arguments)
    },
    seek: function (a) {
        this.player && this.player.seek(a)
    },
    getCurrentTime: function () {
        var a = 0;
        return this.player && (a = this.useFlash ? this.player.getCurrentTime() : this.player.currentTime),
            a
    },
    _onStreamStatus: function (a, h) {
        switch (a) {
            case "init":
                this.setDuration(h.duration),
                    this.root && this.root._onVideoMetadata(this.id, this.duration);
                break;
            case "stall":
                this.setStreamStatus(5);
                break;
            case "play":
                this.setStreamStatus(10);
                break;
            case "end":
                3 !== this._streamStatus && this.reconnect("streamEndEvent");
                break;
            case "start":
                this.setStreamStatus(6)
        }
    },
    _stallStart: function () {
        var a = this;
        this.stallTimer = setTimeout(function () {
            a.reconnect("videoStallOverTime")
        }, 3e4)
    },
    _stallStop: function () {
        clearTimeout(this.stallTimer)
    },
    _bindLogCallback: function (a) {
        this.logCallbacks ? this.root._onLogCallback(this.id, a) : this.logHistory.push(a)
    },
    setStreamStatus: function (a) {
        switch (a) {
            case 5:
                this._stallStart();
                break;
            case 6:
                this.isPlaying = !0,
                    this.resetReConnect();
                break;
            case 7:
                this.reconnect("playerError", ["flash stream not found"]);
                break;
            case 10:
                this.resetReConnect(),
                    this._stallStop()
        }
        this._streamStatus = a,
            this.root._onStreamStatus(this.id, a)
    },
    getStreamStatus: function () {
        return this._streamStatus
    },
    _loadedmetadata: function (a) {
        fxPlayer._loadedmetadata(this.id, a)
    },
    _playerError: function (a, h, c) {
        this.data.url;
        this.reconnect("playerError", [a, h, c]);
        var v = !0;
        switch (a) {
            case fxJsPlayer.ErrorTypes.MEDIA_ERROR:
                switch (h) {
                    case fxJsPlayer.ErrorDetails.AUDIO_TIME_STAMP_INVALID:
                        v = !1;
                        break;
                    case fxJsPlayer.ErrorDetails.VIDEO_TIME_STAMP_INVALID:
                        v = !1
                }
        }
        v && fxPlayer._errorInfo(this.id, [this.data.url, a, h, c])
    },
    httpReconnect: function (a) {
        if (!this.isPlaying) {
            for (var h in a)
                this.data[h] = a[h];
            this.resetDataUrl(0),
                this.data.url && this.connect()
        }
    },
    httpReconnectErr: function () {
        fxPlayer._error(this.id, ["getstreamaddrFail"])
    },
    startLive: function (a) {
        this.setStreamStatus(1);
        for (var h in a)
            this.data[h] = a[h];
        this.resetReConnect(),
            this.connect()
    },
    resetReConnect: function () {
        this.httpIndex = 0,
            this.connectCount = 0,
            this.resetDataUrl(0),
            this._stallStop(),
            clearInterval(this.reconnectTimer)
    },
    resetDataUrl: function (a) {
        this.data.httpFlv.length > a && (this.data.url = this.data.httpFlv[a])
    },
    reconnect: function (a, h) {
        if (clearTimeout(this.reconnectTimer),
            this.connectCount >= this.maxConnect)
            return this.useFlash ? fxPlayer._error(this.id, [a, h, "flash reconnect max times"]) : fxPlayer._error(this.id, [a, h, this.player.pullElkLog()]),
                void this.destroy();
        var c = this
            , v = 0 === this.connectCount ? 0 : 1e3 * this.retrySecond;
        setTimeout(function () {
            c.destroy();
            var a = c.connectCount % c.data.httpFlv.length;
            return 0 === a && c.connectCount > 0 || c.isPlaying ? (fxPlayer._reconnectCallback(c.id),
                void (c.isPlaying = !1)) : (c.resetDataUrl(a),
                    void c.connect())
        }, v)
    },
    destroy: function () {
        this.player && this.player.destroy && (this.player.destroy(),
            this.player = null)
    },
    connect: function () {
        if (this.isSupportMp4 || this.player.startLive) {
            this.connectCount++;
            var a = this;
            clearTimeout(this.reconnectTimer),
                this.reconnectTimer = setTimeout(function () {
                    a.reconnect("connectOverTime", a.player.readyState)
                }, this.CONNECT_FREQUENCY),
                this.isSupportMp4 ? (this.initPlayer(),
                    this.player.load(),
                    this.player.play()) : this.player.startLive && this.player.startLive(this.data.url)
        }
    },
    playLive: function () {
        return this.data.type === fileFormats.FLV ? (this.setStreamStatus(1),
            this.resetReConnect(),
            void this.connect()) : void (this.player && (this.useFlash ? this.player.playLive() : this.player.play()))
    },
    pauseLive: function () {
        this.player && (this.useFlash ? this.player.pauseLive() : this.player.pause()),
            this.setStreamStatus(3)
    },
    stopLive: function () {
        this.useFlash ? this.player.stopLive() : this.destroy(),
            this.setStreamStatus(2)
    },
    setMuted: function (a) {
        this.player && (this.useFlash ? this.player.setMute(a) : this.player.muted = a),
            this.data.muted = a
    },
    getMuted: function () {
        return this.data.muted
    },
    setVolume: function (a) {
        this.player && (this.useFlash ? this.player.setVolume(a) : this.player.volume = a),
            this.data.volume = a
    },
    getVolume: function () {
        return this.data.volume
    },
    resize: function (a, h) {
        this.data.width = a,
            this.data.height = h,
            this.element.style.width = a + "px",
            this.element.style.height = h + "px",
            this.player && (this.useFlash ? (this.player.style.width = a + "px",
                this.player.style.height = h + "px") : this.player.resize(a, h))
    },
    getVersion: function () {
        return fxJsPlayer ? fxJsPlayer.getVersion() : ""
    }
};
var main = fxPlayer;
