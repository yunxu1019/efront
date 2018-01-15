/**
 * 点击量统计工具
 */
function sdnClick(t, e) {
    if (e = e || !0)
        try {
            setTimeout(function() {
                (new Image).src = "http://sdn.kugou.com/link.aspx?id=" + t + "&url=&t=" + Math.random()
            }, 0)
        } catch (t) {}
    else
        try {
            (new Image).src = "http://sdn.kugou.com/link.aspx?id=" + t + "&url=&t=" + Math.random()
        } catch (t) {}
}
function logClick(t, e) {
    if (e = e || !0)
        try {
            setTimeout(function() {
                (new Image).src = "http://log.kugou.com/get/?t=2&v=1&sub=&ex=&md5=&id=" + t + "&d=" + Math.random()
            }, 0)
        } catch (t) {}
    else
        try {
            (new Image).src = "http://log.kugou.com/get/?t=2&v=1&sub=&ex=&md5=&id=" + t + "&d=" + Math.random()
        } catch (t) {}
}
function phpLogClick(t, e) {
    if (e = e || !0)
        try {
            setTimeout(function() {
                (new Image).src = "http://tj.kugou.com/front/link.php?id=" + t + "&d=" + Math.random()
            }, 0)
        } catch (t) {}
    else
        try {
            (new Image).src = "http://tj.kugou.com/front/link.php?id=" + t + "&d=" + Math.random()
        } catch (t) {}
}
/**
 * 轮播图
 */
function Swipe(t, e) {
    "use strict";
    function n() {
        p = w.children,
        y = p.length,
        p.length < 2 && (e.continuous = !1),
        g.transitions && e.continuous && p.length < 3 && (w.appendChild(p[0].cloneNode(!0)),
        w.appendChild(w.children[1].cloneNode(!0)),
        p = w.children),
        m = new Array(p.length),
        v = t.getBoundingClientRect().width || t.offsetWidth,
        w.style.width = p.length * v + "px";
        for (var n = p.length; n--; ) {
            var a = p[n];
            a.style.width = v + "px",
            a.setAttribute("data-index", n),
            g.transitions && (a.style.left = n * -v + "px",
            s(n, b > n ? -v : b < n ? v : 0, 0))
        }
        e.continuous && g.transitions && (s(r(b - 1), -v, 0),
        s(r(b + 1), v, 0)),
        g.transitions || (w.style.left = b * -v + "px"),
        t.style.visibility = "visible"
    }
    function a() {
        e.continuous ? o(b - 1) : b && o(b - 1)
    }
    function i() {
        e.continuous ? o(b + 1) : b < p.length - 1 && o(b + 1)
    }
    function r(t) {
        return (p.length + t % p.length) % p.length
    }
    function o(t, n) {
        if (b != t) {
            if (g.transitions) {
                var a = Math.abs(b - t) / (b - t);
                if (e.continuous) {
                    var i = a;
                    a = -m[r(t)] / v,
                    a !== i && (t = -a * p.length + t)
                }
                for (var o = Math.abs(b - t) - 1; o--; )
                    s(r((t > b ? t : b) - o - 1), v * a, 0);
                t = r(t),
                s(b, v * a, n || I),
                s(t, 0, n || I),
                e.continuous && s(r(t - a), -(v * a), 0)
            } else
                t = r(t),
                c(b * -v, t * -v, n || I);
            b = t,
            f(e.callback && e.callback(b, p[b]))
        }
    }
    function s(t, e, n) {
        l(t, e, n),
        m[t] = e
    }
    function l(t, e, n) {
        var a = p[t]
          , i = a && a.style;
        i && (i.webkitTransitionDuration = i.MozTransitionDuration = i.msTransitionDuration = i.OTransitionDuration = i.transitionDuration = n + "ms",
        i.webkitTransform = "translate(" + e + "px,0)translateZ(0)",
        i.msTransform = i.MozTransform = i.OTransform = "translateX(" + e + "px)")
    }
    function c(t, n, a) {
        if (!a)
            return void (w.style.left = n + "px");
        var i = +new Date
          , r = setInterval(function() {
            var o = +new Date - i;
            return o > a ? (w.style.left = n + "px",
            x && u(),
            e.transitionEnd && e.transitionEnd.call(event, b, p[b]),
            void clearInterval(r)) : void (w.style.left = (n - t) * (Math.floor(o / a * 100) / 100) + t + "px")
        }, 4)
    }
    function u() {
        L = setTimeout(i, x)
    }
    function d() {
        x = 0,
        clearTimeout(L)
    }
    var h = function() {}
      , f = function(t) {
        setTimeout(t || h, 0)
    }
      , g = {
        addEventListener: !!window.addEventListener,
        touch: "ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch,
        transitions: function(t) {
            var e = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
            for (var n in e)
                if (void 0 !== t.style[e[n]])
                    return !0;
            return !1
        }(document.createElement("swipe"))
    };
    if (t) {
        var p, m, v, y, w = t.children[0];
        e = e || {};
        var b = parseInt(e.startSlide, 10) || 0
          , I = e.speed || 300;
        e.continuous = void 0 === e.continuous || e.continuous;
        var L, E, x = e.auto || 0, C = {}, k = {}, T = {
            handleEvent: function(t) {
                switch (t.type) {
                case "touchstart":
                    this.start(t);
                    break;
                case "touchmove":
                    this.move(t);
                    break;
                case "touchend":
                    f(this.end(t));
                    break;
                case "webkitTransitionEnd":
                case "msTransitionEnd":
                case "oTransitionEnd":
                case "otransitionend":
                case "transitionend":
                    f(this.transitionEnd(t));
                    break;
                case "resize":
                    f(n)
                }
                e.stopPropagation && t.stopPropagation()
            },
            start: function(t) {
                var e = t.touches[0];
                C = {
                    x: e.pageX,
                    y: e.pageY,
                    time: +new Date
                },
                E = void 0,
                k = {},
                w.addEventListener("touchmove", this, !1),
                w.addEventListener("touchend", this, !1)
            },
            move: function(t) {
                if (!(t.touches.length > 1 || t.scale && 1 !== t.scale)) {
                    e.disableScroll && t.preventDefault();
                    var n = t.touches[0];
                    k = {
                        x: n.pageX - C.x,
                        y: n.pageY - C.y
                    },
                    "undefined" == typeof E && (E = !!(E || Math.abs(k.x) < Math.abs(k.y))),
                    E || (t.preventDefault(),
                    d(),
                    e.continuous ? (l(r(b - 1), k.x + m[r(b - 1)], 0),
                    l(b, k.x + m[b], 0),
                    l(r(b + 1), k.x + m[r(b + 1)], 0)) : (k.x = k.x / (!b && k.x > 0 || b == p.length - 1 && k.x < 0 ? Math.abs(k.x) / v + 1 : 1),
                    l(b - 1, k.x + m[b - 1], 0),
                    l(b, k.x + m[b], 0),
                    l(b + 1, k.x + m[b + 1], 0)))
                }
            },
            end: function(t) {
                var n = +new Date - C.time
                  , a = Number(n) < 250 && Math.abs(k.x) > 20 || Math.abs(k.x) > v / 2
                  , i = !b && k.x > 0 || b == p.length - 1 && k.x < 0;
                e.continuous && (i = !1);
                var o = k.x < 0;
                E || (a && !i ? (o ? (e.continuous ? (s(r(b - 1), -v, 0),
                s(r(b + 2), v, 0)) : s(b - 1, -v, 0),
                s(b, m[b] - v, I),
                s(r(b + 1), m[r(b + 1)] - v, I),
                b = r(b + 1)) : (e.continuous ? (s(r(b + 1), v, 0),
                s(r(b - 2), -v, 0)) : s(b + 1, v, 0),
                s(b, m[b] + v, I),
                s(r(b - 1), m[r(b - 1)] + v, I),
                b = r(b - 1)),
                e.callback && e.callback(b, p[b])) : e.continuous ? (s(r(b - 1), -v, I),
                s(b, 0, I),
                s(r(b + 1), v, I)) : (s(b - 1, -v, I),
                s(b, 0, I),
                s(b + 1, v, I))),
                w.removeEventListener("touchmove", T, !1),
                w.removeEventListener("touchend", T, !1)
            },
            transitionEnd: function(t) {
                parseInt(t.target.getAttribute("data-index"), 10) == b && (x && u(),
                e.transitionEnd && e.transitionEnd.call(t, b, p[b]))
            }
        };
        return n(),
        x && u(),
        g.addEventListener ? (g.touch && w.addEventListener("touchstart", T, !1),
        g.transitions && (w.addEventListener("webkitTransitionEnd", T, !1),
        w.addEventListener("msTransitionEnd", T, !1),
        w.addEventListener("oTransitionEnd", T, !1),
        w.addEventListener("otransitionend", T, !1),
        w.addEventListener("transitionend", T, !1)),
        window.addEventListener("resize", T, !1)) : window.onresize = function() {
            n()
        }
        ,
        {
            setup: function() {
                n()
            },
            slide: function(t, e) {
                d(),
                o(t, e)
            },
            prev: function() {
                d(),
                a()
            },
            next: function() {
                d(),
                i()
            },
            stop: function() {
                d()
            },
            getPos: function() {
                return b
            },
            getNumSlides: function() {
                return y
            },
            kill: function() {
                d(),
                w.style.width = "",
                w.style.left = "";
                for (var t = p.length; t--; ) {
                    var e = p[t];
                    e.style.width = "",
                    e.style.left = "",
                    g.transitions && l(t, 0, 0)
                }
                g.addEventListener ? (w.removeEventListener("touchstart", T, !1),
                w.removeEventListener("webkitTransitionEnd", T, !1),
                w.removeEventListener("msTransitionEnd", T, !1),
                w.removeEventListener("oTransitionEnd", T, !1),
                w.removeEventListener("otransitionend", T, !1),
                w.removeEventListener("transitionend", T, !1),
                window.removeEventListener("resize", T, !1)) : window.onresize = null
            }
        }
    }
}

function pageInit() {
    phpLogClick(5527);
    Swipe(document.getElementById("modSlider"), {
        auto: 6e3,
        continuous: !0,
        callback: function(t, e) {
            var n = Kg.$("#swipePos div");
            n.removeClass("active"),
            Kg.$(n[t]).addClass("active")
        }
    });
    playerModule.init()
}
try {
    document.execCommand("BackgroundImageCache", !1, !0)
} catch (t) {}
String.prototype.getBytes = function() {
    for (var t = 0, e = 0, n = this.length; e < n; e++)
        t += this.charCodeAt(e) > 256 ? 2 : 1;
    return t
}
,
String.prototype.replaceChar = function() {
    return this.replace(/&nbsp;/g, "&amp;nbsp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}
,
String.prototype.trim = function() {
    return this.replace(/^(\s|\u3000)*|(\s|\u3000)*$/g, "")
}
,
String.prototype.intercept = function(t, e) {
    var n = this;
    if (n = n.trim(),
    n.getBytes() < t)
        return n;
    var a = 0
      , i = 0;
    e.length > 0 && (t -= e.length);
    for (var r = 0; r < n.length && (a += this.charCodeAt(r) > 256 ? 2 : 1,
    !(a > t)); r++)
        i++;
    return n.substr(0, i) + e
}
,
String.prototype.encode = function() {
    return encodeURIComponent(encodeURIComponent(this))
}
;
/**
 * jQuery
 */

var Kg = Kg || {
    Ver: 2,
    UA: {
        Ie: !!document.all,
        Ie6: !!document.all && !window.XMLHttpRequest,
        Ie7: !!document.all && /msie 7.0/gi.test(window.navigator.appVersion),
        Ie8: !!document.all && /msie 8.0/gi.test(window.navigator.appVersion),
        FF: /firefox/gi.test(window.navigator.userAgent),
        Opera: /opera/gi.test(window.navigator.userAgent),
        Chrom: /Chrom/gi.test(window.navigator.userAgent),
        Maxthon: /Maxthon/gi.test(window.navigator.userAgent)
    },
    $: function(t) {
        var e = [];
        if ("string" == typeof t) {
            t = t.trim();
            for (var n = t.split(","), a = 0, i = n.length; a < i; a++)
                e = e.concat(Kg.$S(n[a]));
            Kg.extend(e, Kg, !0)
        } else
            t instanceof Array || "object" == typeof t && t.length ? (e = t,
            Kg.extend(e, Kg, !0)) : (e.push(t),
            Kg.extend(e, Kg, !0));
        return e
    },
    $S: function(t, e) {
        for (var n = t.split(/\s+/g), e = e || [], a = 0, i = n.length; a < i; a++) {
            var r = [];
            if (/^\*$/.test(n[a])) {
                if (e.length > 0)
                    for (var o = 0, s = e.length; o < s; o++)
                        r = r.concat(this.$T("*", e[o]));
                else
                    r = this.$T("*");
                e = r
            } else if (/#/.test(n[a])) {
                var l = n[a].split("#");
                Kg.$I(l[1]) && r.push(Kg.$I(l[1])),
                e = r
            } else if (/\./.test(n[a])) {
                var c = n[a].split(".")
                  , u = c[1]
                  , l = c[0];
                if (e.length > 0)
                    for (var o = 0, s = e.length; o < s; o++)
                        r = r.concat(this.$C(u, e[o]));
                else
                    r = this.$C(u);
                if (l.length > 0) {
                    for (var d = [], o = 0, s = r.length; o < s; o++)
                        r[o].tagName.toLowerCase() == l && d.push(r[o]);
                    e = d
                } else
                    e = r
            } else {
                var l = n[a];
                if (e.length > 0) {
                    for (var o = 0, s = e.length; o < s; o++)
                        r = r.concat(this.$T(l, e[o]));
                    e = r
                } else
                    e = this.$T(l)
            }
        }
        return e
    },
    $I: function() {
        for (var t = [], e = 0, n = arguments.length; e < n; e++) {
            var a = arguments[e];
            if ("string" == typeof a && (a = document.getElementById(a)),
            1 == n)
                return a;
            t.push(a)
        }
        return t
    },
    $T: function(t, e) {
        var n = (this.$I(e) || document).getElementsByTagName(t || "*");
        return this.$A(n)
    },
    $C: function(t, e, n) {
        var a = []
          , i = 0;
        if (document.getElementsByClassName) {
            var r = this.$I(e || document).getElementsByClassName(t);
            if (r = this.$A(r),
            n && "*" !== n)
                for (var o = r.length; i < o; i++)
                    r[i].tagName.toLowerCase() === n.toLowerCase() && a.push(r[i]);
            else
                a = r
        } else
            for (var r = this.$T(n, e), o = r.length; i < o; i++)
                new RegExp("\\b" + t + "\\b","g").test(r[i].className) && a.push(r[i]);
        return a
    },
    $A: function(t) {
        for (var e = [], n = 0, a = t.length; n < a; n++)
            e.push(t[n]);
        return e
    },
    index: function() {
        var t = -1;
        if (this.length > 0) {
            for (var e = this[0], n = [], a = e.parentNode.childNodes, i = 0, r = a.length; i < r; i++)
                a[i].tagName == e.tagName && n.push(a[i]);
            t = Kg.indexOf(n, e)
        }
        return t
    },
    attr: function(t, e) {
        if (this.UA.Ie && (t = {
            for: "htmlFor",
            class: "className"
        }[t] || t),
        void 0 != e) {
            for (var n = 0, a = this.length; n < a; n++)
                "checked" == t ? this[n][t] = e : this[n].setAttribute(t, e);
            return this
        }
        return this[0].getAttribute(t)
    },
    addClass: function(t, e) {
        if (e)
            e.className += " " + t;
        else
            for (var n = 0, a = this.length; n < a; n++)
                this[n].className += " " + t;
        return this
    },
    removeClass: function(t, e) {
        if (e)
            e.className = e.className.replace(new RegExp("\\b" + t + "\\b","g"), "");
        else
            for (var n = 0, a = this.length; n < a; n++)
                this[n].className = this[n].className.replace(new RegExp("\\b" + t + "\\b","g"), "");
        return this
    },
    toggleClass: function(t) {
        for (var e = 0, n = this.length; e < n; e++) {
            var a = this[e];
            this.hasClass(t, a) ? this.removeClass(t, a) : this.addClass(t, a)
        }
        return Kg
    },
    hasClass: function(t, e) {
        return new RegExp("\\b" + t + "\\b").test((e || this[0]).className)
    },
    html: function(t) {
        if (null == t)
            return this[0].innerHTML;
        for (var e = 0, n = this.length; e < n; e++)
            this[e].innerHTML = t;
        return this
    },
    val: function(t) {
        if (null == t)
            return this[0].value;
        for (var e = 0, n = this.length; e < n; e++)
            this[e].value = t;
        return this
    },
    eq: function(t) {
        var e = this[t];
        return this.length = 0,
        this.push(e),
        this
    },
    parent: function() {
        for (var t = 0, e = this.length; t < e; t++) {
            var n = this[t];
            this[t] = n.parentNode
        }
        return this
    },
    next: function() {
        for (var t = 0; t < this.length; t++) {
            for (var e = this[t], n = e.nextSibling; n && 1 != n.nodeType; )
                n = n.nextSibling;
            n && 1 == n.nodeType ? this[t] = n : (this.splice(t, 1),
            t--)
        }
        return this
    },
    prev: function() {
        for (var t = 0; t < this.length; t++) {
            for (var e = this[t], n = e.previousSibling; n && 1 != n.nodeType; )
                n = n.previousSibling;
            n && 1 == n.nodeType ? this[t] = n : (this.splice(t, 1),
            t--)
        }
        return this
    },
    find: function(t) {
        var e = Kg.$S(t, this);
        return Kg.extend(e, Kg),
        e
    },
    remove: function() {
        for (var t = 0, e = this.length; t < e; t++) {
            var n = this[t];
            n.parentNode.removeChild(n)
        }
        return this.length = 0,
        Kg
    },
    css: function(t, e) {
        if ("string" == typeof t) {
            if (null == e)
                return this.getStyle(this[0], t);
            for (var n = 0, a = this.length; n < a; n++) {
                var i = t.replace(/-(\w)/, function(t, e) {
                    return e.toUpperCase()
                });
                this[n].style[i] = e
            }
        } else
            for (var r in t)
                for (var n = 0, a = this.length; n < a; n++) {
                    var i = r.replace(/-(\w)/, function(t, e) {
                        return e.toUpperCase()
                    });
                    this[n].style[i] = t[r]
                }
        return this
    },
    show: function() {
        return this.css("display", "block"),
        this
    },
    hide: function() {
        return this.css("display", "none"),
        this
    },
    each: function(t, e) {
        var n = func = null;
        1 == arguments.length ? (n = this,
        func = t) : 2 == arguments.length && (n = t,
        func = e);
        for (var a = 0, i = n.length; a < i; a++)
            func.call(n[a], a, n[a]);
        return this
    },
    append: function(t, e) {
        e = e || "last";
        var n = null;
        if ("string" == typeof t) {
            var a = /^<([^>]+)>(.+?)<\/\w+>$/
              , i = t.match(a)
              , r = i[2]
              , o = i[1].match(/^\w+\b/)
              , s = i[1].replace(/^\w+\b/, "").trim().match(/\b(\w+)=("[^"]+"|'[^']+\')/g);
            n = document.createElement(o);
            for (var l = 0, c = s.length; l < c; l++) {
                var u = s[l].split("=");
                if (/^style$/i.test(u[0]))
                    n.style.cssText = u[1].substring(1, u[1].length - 1);
                else {
                    if (this.UA.Ie)
                        var d = {
                            for: "htmlFor",
                            class: "className"
                        }[u[0]] || u[0];
                    else
                        var d = u[0];
                    n.setAttribute(d, u[1].substring(1, u[1].length - 1))
                }
            }
            n.innerHTML = r
        } else
            n = t;
        for (var l = 0, c = this.length; l < c; l++) {
            var h = this[l];
            if ("last" == e)
                h.appendChild(n);
            else if ("first" == e) {
                var f = h.childNodes[0];
                h.insertBefore(n, f)
            } else if ("before" == e) {
                var g = h.parentNode;
                g.insertBefore(n, h)
            }
        }
        return this
    },
    prepend: function(t) {
        return this.append(t, "first")
    },
    insertBefore: function(t) {
        return this.append(t, "before")
    },
    extend: function(t, e, n) {
        for (var a in e)
            n ? t[a] = e[a] : t[a] || (t[a] = e[a]);
        return t
    },
    getStyle: function(t, e) {
        return t = this.$I(t),
        "float" === e && (e = Kg.UA.Ie ? "styleFloat" : "cssFloat"),
        e = e.replace(/-(\w)/, function(t, e) {
            return e.toUpperCase()
        }),
        Kg.UA.Ie ? t.currentStyle[e] : window.getComputedStyle(t, null)[e]
    },
    getBodySize: function() {
        if ("BackCompat" == document.compatMode)
            var t = document.body.clientHeight
              , e = document.body.clientWidth
              , n = document.body.scrollHeight
              , a = document.body.scrollWidth
              , i = document.body.scrollTop
              , r = document.body.scrollLeft;
        else if ("CSS1Compat" == document.compatMode)
            var t = document.documentElement.clientHeight
              , e = document.documentElement.clientWidth
              , n = document.documentElement.scrollHeight
              , a = document.documentElement.scrollWidth
              , i = document.body.scrollTop || document.documentElement.scrollTop
              , r = document.body.scrollLeft || document.documentElement.scrollLeft;
        return {
            cH: t,
            cW: e,
            sH: n,
            sW: a,
            sT: i,
            sL: r
        }
    },
    getXY: function(t) {
        t = t ? this.$I(t) : this[0];
        var e = this.getBodySize()
          , n = t.getBoundingClientRect();
        return {
            left: e.sL + n.left,
            right: e.sL + n.right,
            top: e.sT + n.top,
            bottom: e.sT + n.bottom
        }
    },
    isFather: function(t, e, n) {
        if (t = this.$I(t),
        e = this.$I(e),
        n && t == e)
            return !0;
        if (t.compareDocumentPosition)
            return 20 == t.compareDocumentPosition(e);
        for (; e && e.parentNode; )
            if (e = e.parentNode,
            e == t)
                return !0;
        return !1
    },
    addEvent: function(t, e, n) {
        if (3 == arguments.length)
            t = this.$I(t),
            t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent ? t.attachEvent("on" + e, n) : t["on" + e] = n;
        else
            for (var a = 0, i = this.length; a < i; a++) {
                var r = this[a];
                this.addEvent(r, arguments[0], Kg.bind(arguments[1], r))
            }
        return this
    },
    removeEvent: function(t, e, n) {
        if (3 == arguments.length)
            t = this.$I(t),
            t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent ? t.detachEvent("on" + e, n) : t["on" + e] = null;
        else
            for (var a = 0, i = this.length; a < i; a++) {
                var r = this[a];
                this.removeEvent(r, arguments[0], Kg.bind(arguments[1], r))
            }
        return this
    },
    bind: function(t, e) {
        var n = Array.prototype.slice.call(arguments, 2);
        return function() {
            t.apply(e, n.concat(Array.prototype.slice.call(arguments)))
        }
    },
    stopEvent: function(t) {
        return t = window.event || t,
        t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0,
        Kg
    },
    inArray: function(t, e) {
        for (var n = 0, a = t.length; n < a; n++)
            if (t[n] === e)
                return !0;
        return !1
    },
    indexOf: function(t, e) {
        for (var n = 0, a = t.length; n < a; n++)
            if (t[n] === e)
                return n;
        return -1
    },
    setOpacity: function(t, e) {
        return t = this.$I(t),
        document.all ? t.style.filter = "Alpha(Opacity=" + e + ")" : t.style.opacity = e / 100,
        t
    },
    fadein: function(t, e, n, a) {
        e = e || 1,
        n = n || 1,
        t = this.$I(t);
        var i = 0
          , r = Kg
          , o = setInterval(function() {
            r.setOpacity(t, i += n),
            i >= 100 && (clearInterval(o),
            a && a(t))
        }, e);
        return o
    },
    fadeout: function(t, e, n, a) {
        e = e || 1,
        n = n || 1,
        t = this.$I(t);
        var i = 100
          , r = Kg
          , o = setInterval(function() {
            r.setOpacity(t, i -= n),
            i <= 0 && (clearInterval(o),
            a && a(t))
        }, e);
        return o
    },
    slide: function(t, e, n, a, i, r, o) {
        t = this.$I(t),
        i = i || .1;
        var s = ""
          , l = t;
        "height" !== e && "width" !== e && "top" !== e && "bottom" !== e && "left" !== e && "right" !== e || (t = t.style,
        s = "px");
        var c = setInterval(function() {
            n > a ? (n -= Math.ceil((n - a) * i),
            t[e] = n + s,
            o && o(l),
            n <= a && (clearInterval(c),
            r && r(l))) : (n += Math.ceil((a - n) * i),
            t[e] = n + s,
            o && o(l),
            n >= a && (clearInterval(c),
            r && r(l)))
        }, 1);
        return c
    },
    JSON: function() {
        function f(t) {
            return t < 10 ? "0" + t : t
        }
        function stringify(t, e) {
            var n, a, i, r, o, s = /["\\\x00-\x1f\x7f-\x9f]/g;
            switch (typeof t) {
            case "string":
                return s.test(t) ? '"' + t.replace(s, function(t) {
                    var e = m[t];
                    return e ? e : (e = t.charCodeAt(),
                    "\\u00" + Math.floor(e / 16).toString(16) + (e % 16).toString(16))
                }) + '"' : '"' + t + '"';
            case "number":
                return isFinite(t) ? String(t) : "null";
            case "boolean":
            case "null":
                return String(t);
            case "object":
                if (!t)
                    return "null";
                if ("function" == typeof t.toJSON)
                    return stringify(t.toJSON());
                if (n = [],
                "number" == typeof t.length && !t.propertyIsEnumerable("length")) {
                    for (r = t.length,
                    a = 0; a < r; a += 1)
                        n.push(stringify(t[a], e) || "null");
                    return "[" + n.join(",") + "]"
                }
                if (e)
                    for (r = e.length,
                    a = 0; a < r; a += 1)
                        i = e[a],
                        "string" == typeof i && (o = stringify(t[i], e),
                        o && n.push(stringify(i) + ":" + o));
                else
                    for (i in t)
                        "string" == typeof i && (o = stringify(t[i], e),
                        o && n.push(stringify(i) + ":" + o));
                return "{" + n.join(",") + "}"
            }
        }
        Date.prototype.toJSON = function() {
            return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
        }
        ;
        var m = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        return {
            stringify: stringify,
            parse: function(text, filter) {
                function walk(t, e) {
                    var n, a;
                    if (e && "object" == typeof e)
                        for (n in e)
                            Object.prototype.hasOwnProperty.apply(e, [n]) && (a = walk(n, e[n]),
                            void 0 !== a ? e[n] = a : delete e[n]);
                    return filter(t, e)
                }
                var j;
                if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
                    return j = eval("(" + text + ")"),
                    "function" == typeof filter ? walk("", j) : j;
                throw new SyntaxError("parseJSON")
            }
        }
    }(),
    Cookie: {
        write: function(t, e, n, a, i, r) {
            /^\w*$/.test(t) || alert("cookie格式不正确"),
            /; /.test(e) && alert("cookie格式不正确");
            var o = t + "=" + e;
            if (n) {
                var s = new Date;
                s.setTime(s.getTime() + 1e3 * n),
                o += "; expires=" + s.toGMTString()
            }
            a && (o += "; path=" + a),
            i && (o += "; domain=" + i),
            r && (o += "; secure"),
            document.cookie = o
        },
        rewriteKey: function(t, e, n, a, i, r, o) {
            var s = e;
            if (n) {
                var l = this.read(t)
                  , c = new RegExp("\\b" + e + "=([^&]*)\\b","g");
                s = l.replace(c, function(t, e) {
                    return t.replace(e, n)
                })
            }
            /^\d+(s|m|h|d)$/i.test(a) ? (/^\d+s$/i.test(a) && this.setSec(t, s, a.replace(/s$/i, ""), i, r, o),
            /^\d+m$/i.test(a) && this.setMin(t, s, a.replace(/m$/i, ""), i, r, o),
            /^\d+h$/i.test(a) && this.setHour(t, s, a.replace(/h$/i, ""), i, r, o),
            /^\d+d$/i.test(a) && this.setDay(t, s, a.replace(/d$/i, ""), i, r, o)) : this.write(t, s, a, i, r, o)
        },
        setDay: function(t, e, n, a, i, r) {
            this.write(t, e, 24 * n * 60 * 60, a, i, r)
        },
        setHour: function(t, e, n, a, i, r) {
            this.write(t, e, 60 * n * 60, a, i, r)
        },
        setMin: function(t, e, n, a, i, r) {
            this.write(t, e, 60 * n, a, i, r)
        },
        setSec: function(t, e, n, a, i, r) {
            this.write(t, e, n, a, i, r)
        },
        read: function(t, e, n) {
            for (var a = "", i = document.cookie.split("; "), r = 0; r < i.length; r++) {
                var o = i[r].match(/^(\w+)=(.+)$/);
                if (o && o.length > 1 && o[1] == t) {
                    a = o[2];
                    break
                }
            }
            return e ? n ? Kg.JSON.parse(a)[e] : (new Kg.Param).parse(a)[e] : a
        },
        remove: function(t, e, n) {
            var a = t + "=";
            e && (a += "; path=" + e),
            n && (a += ";domain=" + n),
            a += "; expires=Fri, 02-Jan-1970 00:00:00 GMT",
            document.cookie = a
        }
    },
    Param: function() {
        var t = []
          , e = {};
        this.parse = function(t) {
            for (var n = t.split("&"), a = 0, i = n.length; a < i; a++) {
                var r = n[a].split("=");
                e[r[0]] = r[1]
            }
            return e
        }
        ,
        this.toString = function(e) {
            return e = e || "&",
            t.join(e)
        }
        ,
        this.add = function(e, n) {
            var a = e + "=" + n;
            return t.push(a),
            this
        }
    },
    Ajax: function(t, e, n, a, i, r, o) {
        if (1 == arguments.length)
            var s = arguments[0]
              , t = s.method
              , e = s.url
              , n = s.async
              , a = s.args || ""
              , i = s.callback
              , l = s.callbackName || "callback"
              , c = s.callbackFuncName
              , r = s.error
              , o = s.docType;
        var u = a || "";
        if (n = null == n || n,
        a && "object" == typeof a) {
            var d = "";
            for (var h in a)
                d += h + "=" + a[h] + "&";
            u = d.substr(0, d.length - 1)
        }
        if (t = t ? t.toUpperCase() : "POST",
        o = o ? o.toLowerCase() : "text",
        "jsonp" == o) {
            var f = "";
            return f = c ? c : "kgJSONP" + Math.random().toString().substr(2, 9),
            window[f] = i,
            u = u.length > 0 ? u + "&" + l + "=" + f : l + "=" + f,
            void this.loadScript(e, u)
        }
        var g = null;
        if (window.XMLHttpRequest && !window.ActiveXObject)
            g = new XMLHttpRequest;
        else if (window.ActiveXObject)
            try {
                g = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (t) {
                try {
                    g = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (t) {
                    g = null
                }
            }
        return g.onreadystatechange = function() {
            if (4 == g.readyState)
                if (200 == g.status || 0 == g.status) {
                    var t = null;
                    switch (o) {
                    case "xml":
                        t = g.responseXML;
                        break;
                    case "json":
                        t = Kg.JSON.parse(g.responseText);
                        break;
                    default:
                        t = g.responseText
                    }
                    i && i(t, g),
                    g = null
                } else
                    r && r()
        }
        ,
        "GET" == t ? (e.indexOf("?") != -1 ? g.open(t, e + (u ? "&" + u : ""), n) : g.open(t, e + (u ? "?" + u : ""), n),
        g.send(null)) : (g.open(t, e, n),
        g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        g.send(u)),
        g
    },
    get: function(t, e, n, a, i) {
        return this.Ajax("get", t, i, e, n, a)
    },
    post: function(t, e, n, a, i) {
        return this.Ajax("post", t, i, e, n, a)
    },
    getJSON: function(t, e, n, a, i) {
        return this.Ajax("get", t, i, e, n, a, "json")
    },
    postJSON: function(t, e, n, a, i) {
        return this.Ajax("post", t, i, e, n, a, "json")
    },
    loadScript: function(t, e, n) {
        var a = e || "";
        if (e && "object" == typeof e) {
            var i = "";
            for (var r in e)
                i += r + "=" + e[r] + "&";
            a = i.substr(0, i.length - 1)
        }
        a = a.trim();
        var o = document.createElement("script");
        o.type = "text/javascript",
        o.src = t + (a ? "?" + a : ""),
        o.onload = o.onreadystatechange = function() {
            this.readyState && "complete" != this.readyState && "loaded" != this.readyState || (n && n(),
            o.onreadystatechange = o.onload = null,
            o = null)
        }
        ,
        document.getElementsByTagName("head")[0].appendChild(o)
    },
    flash: {
        ready: !1,
        hasFlash: !1,
        version: 0,
        init: function() {
            try {
                if (window.ActiveXObject) {
                    var t = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    if (t) {
                        this.hasFlash = !0;
                        var e = t.GetVariable("$version")
                          , n = e.split(" ")[1].split(",");
                        this.version = parseFloat(n[0] + "." + n[1])
                    }
                } else if (navigator.plugins && navigator.plugins.length > 0) {
                    var t = navigator.plugins["Shockwave Flash"];
                    if (t) {
                        this.hasFlash = !0;
                        for (var a = t.description.split(" "), i = 0; i < a.length; i++)
                            isNaN(parseFloat(a[i])) || (this.version = parseFloat(a[i]))
                    }
                }
                this.ready = !0
            } catch (t) {}
        },
        getStr: function(t, e, n, a, i) {
            this.init();
            var r = ""
              , o = {
                flashvars: "",
                wmode: "",
                allowFullScreen: !1,
                version: "10"
            };
            return i = i || {},
            Kg.extend(o, i, !0),
            this.hasFlash && this.version > o.version ? (r += '<object id="' + t + '" name="' + t + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10.0.32" width="' + n + '" height="' + a + '">',
            r += '<param name="bgColor" value="#666666" />',
            r += '<param name="movie" value="' + e + '" />',
            r += '<param name="flashvars" value="' + o.flashvars + '" />',
            r += '<param name="quality" value="high" />',
            r += '<param name="allowScriptAccess" value="always" />',
            r += '<param name="WMODE" value="' + o.wmode + '"/>',
            r += '<param name="allowFullScreen" value="' + o.allowFullScreen + '">',
            r += '<embed name="' + t + '" src="' + e + '" width="' + n + '"  height="' + a + '" allowScriptAccess="always" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + o.flashvars + '" type="application/x-shockwave-flash" wmode="' + o.wmode + '" allowFullScreen="' + o.allowFullScreen + '"></embed>',
            r += "</object>") : r += '您没有安装flash或者您的flash版本不足，请先<a href="http://get.adobe.com/cn/flashplayer/?promoid=JZEFT" target="_blank">安装</a>。',
            r
        },
        write: function(t, e, n, a, i) {
            document.write(this.getStr(t, e, n, a, i))
        },
        getObj: function(t) {
            return Kg.UA.FF ? document[t][1] : Kg.UA.Ie ? window[t] : window[t][1]
        },
        Ajax: function(t, e, n, a, i) {
            var r = this
              , o = Kg.$("Ajax-flash-object");
            if (o)
                1 == this.ready && this.getObj("KugouAjaxFlash").SetParameters(e, n, a, i);
            else {
                var o = document.createElement("div");
                o.id = "Ajax-flash-object",
                document.body.appendChild(o),
                o.innerHTML = this.getStr("KugouAjaxFlash", t, 1, 1, {
                    flashvars: "ini=Kg.flash.init"
                });
                var s = setInterval(function() {
                    var t = r.getObj("KugouAjaxFlash");
                    t && t.SetParameters && (clearInterval(s),
                    t.SetParameters(e, n, a, i))
                }, 100)
            }
        }
    },
    request: {
        hash: function(t) {
            var e = location.hash.replace("#", "");
            if (t) {
                var n = (new Kg.Param).parse(e);
                return n[t]
            }
            return e
        },
        search: function(t) {
            var e = location.search.replace("?", "");
            if (t) {
                var n = (new Kg.Param).parse(e);
                return n[t]
            }
            return e
        }
    },
    bubbleSort: function(t, e, n) {
        for (var t = [].concat(t), a = [], i = 0; i < t.length; i++) {
            for (var r = i + 1; r < t.length; r++) {
                if (e) {
                    if (parseInt(t[i][e]) > parseInt(t[r][e]))
                        break
                } else if (t[i] > t[r])
                    break;
                r == t.length - 1 && (a.push(t[i]),
                t.splice(i, 1),
                i = -1)
            }
            i == t.length - 1 && (a.push(t[i]),
            t.splice(i, 1),
            i = -1)
        }
        return n ? a.reverse() : a
    },
    placeholder: function(t, e, n) {
        t = this.$I(t),
        t.onfocus = function() {
            t.value == t.defaultValue && (t.value = "",
            t.style.color = e)
        }
        ,
        t.onblur = function() {
            "" == t.value && (t.value = t.defaultValue,
            t.style.color = n)
        }
    }
};
(window.jQuery || window.Zepto) && !function(t) {
    t.fn.Swipe = function(e) {
        return this.each(function() {
            t(this).data("Swipe", new Swipe(t(this)[0],e))
        })
    }
}(window.jQuery || window.Zepto),
function() {
    var t = function(e) {
        return this instanceof t ? (this.setOpt(e || {}),
        this) : new t(e)
    };
    return t.prototype = {
        father: null,
        bar: null,
        isMove: !1,
        startX: 0,
        maxW: 0,
        fLeft: 0,
        pre: 0,
        startEvent: "touchstart",
        moveEvent: "touchmove",
        upEvent: "touchend",
        cancelEvent: "touchcancel",
        setOpt: function(t) {
            var e = this;
            e.opt = {
                fatherId: null,
                barId: null,
                afterFunc: null,
                moveFunc: null,
                startFunc: null
            };
            for (var n in t)
                e.opt[n] = t[n];
            e.father = Kg.$("#" + e.opt.fatherId),
            e.bar = Kg.$("#" + e.opt.barId),
            e.maxW = e.father[0].offsetWidth,
            e.fLeft = e.father[0].getBoundingClientRect().left,
            e.bind()
        },
        dcBind: function() {
            var t = this
              , e = document
              , n = function(n) {
                e.removeEventListener(t.moveEvent, a, !1),
                t.isMove && t.opt.afterFunc && t.opt.afterFunc(t.pre),
                t.isMove = !1
            }
              , a = function(e) {
                var n = t.bar[0].offsetWidth;
                if ("touchmove" == t.moveEvent) {
                    if (e.targetTouches.length > 0) {
                        var a = e.targetTouches[0];
                        n = a.pageX - t.fLeft
                    }
                } else
                    n = e.clientX - t.fLeft;
                t.isMove && (n < 0 ? n = 0 : n > t.maxW && (n = t.maxW),
                t.maxW > 0 ? t.pre = n / t.maxW : t.pre = 0,
                t.bar.css("width", 100 * t.pre + "%"),
                t.opt.moveFunc && t.opt.moveFunc(t.pre)),
                e.preventDefault()
            };
            e.addEventListener("touchmove", a, !1),
            e.addEventListener("touchend", n, !1),
            e.addEventListener("touchcancel", n, !1)
        },
        bind: function() {
            var t = this
              , e = function(e) {
                e = window.event || e;
                var n = e.clientX || e.targetTouches[0].pageX
                  , a = t.bar[0].offsetWidth;
                t.startX = n,
                t.isMove = !0,
                a = n - t.fLeft,
                a < 0 ? a = 0 : a > t.maxW && (a = t.maxW),
                t.maxW > 0 ? t.pre = a / t.maxW : t.pre = 0,
                t.opt.startFunc && t.opt.startFunc(t.pre),
                t.bar.css("width", 100 * t.pre + "%"),
                t.dcBind(),
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0,
                e.preventDefault()
            };
            document.getElementById("timeWrap").addEventListener(t.startEvent, e, !1),
            t.father[0].addEventListener(t.startEvent, e, !1),
            t.bar[0].addEventListener(t.startEvent, e, !1),
            window.addEventListener("resize", function() {
                t.maxW = t.father[0].offsetWidth,
                t.fLeft = t.father[0].getBoundingClientRect().left
            }, !1)
        }
    },
    window.BarMove = t
}(),
function() {
    LRC = function() {
        this.initialize.apply(this, arguments)
    }
    ,
    LRC.prototype = {
        arrLyricTime: [],
        arrLyric: [],
        initialize: function(t) {
            this.lyricWrapper = t.lyricWrapper,
            this.curRowClassName = t.curRowClassName,
            this.separator = t.separator,
            this.wordTime = -1,
            this.arrLyricTime = [],
            this.arrLyric = [],
            this.initArray(t.lyric),
            this.arrLyricTime = this.sort(this.arrLyricTime),
            this.setLyricTable(this.arrLyric)
        },
        initArray: function(t) {
            for (var e = new RegExp("\\[[0-9:.]*\\]","g"), n = t.split(this.separator), a = 0, i = 0, r = 0; r < n.length; r++) {
                var o = n[r].replace(/\[[\w\W]*\]/g, "").trim();
                if ("" !== o)
                    for (this.arrLyric[r - i] = o; null !== (lrc_result = e.exec(n[r])); ) {
                        var s = this.parseSecond(lrc_result.toString().replace(/\[|\]/g, ""));
                        isNaN(s) || (this.arrLyricTime[a] = r - i + "|" + s,
                        a++)
                    }
                else
                    i++
            }
        },
        IsLyricValid: function(t) {
            return this.arrLyricTime.length > 0
        },
        DoSync: function(t) {
            clearInterval(this.wordTime);
            for (var e = this.arrLyricTime, n = 0; n < e.length; n++) {
                var a = e[n].split("|");
                if (0 === n && t < a[1])
                    break;
                if ("undefined" == typeof e[n + 1]) {
                    this.setRow(a[0]);
                    break
                }
                var i = e[n + 1].split("|");
                if (t >= a[1] && t < i[1]) {
                    this.setRow(a[0]);
                    break
                }
            }
        },
        parseSecond: function(t) {
            try {
                var e = t.split(":");
                return 60 * parseInt(e[0], 10) + parseFloat(e[1])
            } catch (t) {
                return 0
            }
        },
        setLyricTable: function(t) {
            var e = "";
            this.lyricWrapper.scrollTop = 0,
            this.lyricWrapper.innerHTML = "";
            for (var n = 0; n < t.length; n++)
                e += "<p>" + t[n] + "</p>";
            this.lyricWrapper.innerHTML = e;
            var a = this.lyricWrapper.getElementsByTagName("p")
              , i = a[0].offsetHeight
              , r = 0;
            this.outLrc || (this.outLrc = this.lyricWrapper.parentNode),
            r = Math.floor(this.outLrc.clientHeight / i),
            this.lyricWrapper.style.height = i * r + "px"
        },
        setRow: function(t) {
            this.setRowClass(t),
            this.setScroll(t)
        },
        setRowClass: function(t) {
            var e = this.lyricWrapper.getElementsByTagName("p")
              , n = e.length;
            if (n < 1)
                return !1;
            for (var a = 0; a < n; a++)
                e[a].className = "";
            e[t].className = this.curRowClassName,
            e[t].scrollWidth > e[t].offsetWidth && (this.wordTime = setInterval(function() {
                e[t].scrollLeft++
            }, 1e3))
        },
        setScroll: function(t) {
            var e = this.lyricWrapper.getElementsByTagName("p")
              , n = e.length;
            if (n < 1)
                return !1;
            var a = e[0].offsetHeight
              , i = 0;
            this.outLrc || (this.outLrc = this.lyricWrapper.parentNode),
            i = Math.floor(this.outLrc.clientHeight / a),
            this.lyricWrapper.style.height = a * i + "px",
            this.lyricWrapper.scrollTop = e[t].offsetTop - e[0].offsetTop - e[t].offsetHeight * Math.floor(i / 2)
        },
        sort: function(t) {
            for (var e = 0; e < t.length - 1; e++)
                for (var n = e + 1; n < t.length; n++) {
                    var a = parseFloat(t[e].split("|")[1])
                      , i = parseFloat(t[n].split("|")[1]);
                    if (a > i) {
                        var r = t[e];
                        t[e] = t[n],
                        t[n] = r
                    }
                }
            return t
        }
    };
    var t = function() {
        if (!(this instanceof t))
            return new t
    };
    t.prototype = {
        extend: function(t, e, n) {
            for (var a in e)
                n ? t[a] = e[a] : t[a] || (t[a] = e[a]);
            return t
        },
        formatNumber: function(t) {
            return t.toString().length < 2 ? "0" + t : t
        },
        formatData: function(t) {
            t = parseInt(t, 10);
            var e = this.formatNumber(Math.floor(t / 60))
              , n = this.formatNumber(Math.floor(t % 60));
            return e + ":" + n
        },
        addZero: function(t) {
            return t.toString().length <= 1 ? "0" + t : t
        },
        isIOS: function() {
            return !!(navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))
        },
        isKnowAdr: function() {
            return !(!navigator.userAgent.match(/HUAWEI/i) && !navigator.userAgent.match(/Chrome/i))
        },
        isCanPlayAudio: function() {
            return !!document.createElement("audio").canPlayType("audio/mpeg")
        },
        formatImgSize: function(t) {
            size = t.size || 400;
            var e = t.img;
            return e && (e = e.replace(/softhead\/\d+\//, "softhead/" + size + "/")),
            e
        }
    };
    var e = function(n) {
        var a = this;
        return this instanceof e ? (a.utils = t(),
        a.init(n),
        this) : new e(n)
    };
    e.prototype = {
        ver: "1",
        cacheList: {},
        _default: {
            fatherId: "player",
            playId: "kugou",
            currentTime: "current_time",
            totalTime: "total_time",
            btnNext: "play_next",
            btnMain: "play_main",
            playClass: "play",
            pauseClass: "pause",
            loadClass: "load",
            btnMode: "play_mode",
            songName: "song_name",
            singerName: "singer_name",
            fullName: "songname",
            playBarPlay: "play_bar_play",
            playBarLoad: "play_bar_load",
            songLrc: "song_lrc",
            isShowLrc: !1,
            songCover: "song_cover",
            defCover: "http://m.kugou.com/static/images/share2014/list/cover.png",
            isSongCover: !1,
            songCls: "songsList",
            curPlayCls: "cur",
            songsListExt: "songs_",
            loadName: "loading",
            isCycle: !0,
            isAuto: !1,
            playMode: "list",
            isPlayRadio: !1,
            isPlayRing: !1,
            playBarFather: "progressBar",
            isBarMove: !1,
            playStaticId: null,
            derection: "next"
        },
        prevSong: function() {
            var t = this;
            curIndex = t.curIndex,
            t.derection = "prev",
            t._default.isPlayRadio && t.getFmSongs(),
            t.curIndex--,
            t.curIndex >= 0 ? t.create() : (t.curIndex = t.songsList.length - 1,
            t.create())
        },
        nextSong: function() {
            var t = this;
            curIndex = t.curIndex,
            t.derection = "next",
            t._default.isPlayRadio && t.getFmSongs(),
            t.curIndex++,
            t.curIndex < t.songsList.length ? t.create() : (t.curIndex = 0,
            t.create())
        },
        getFmSongs: function() {},
        cusload: function() {},
        cusPlay: function() {},
        loadStart: function() {
            var t = this;
            t.utils.isIOS() || t.utils.isKnowAdr() ? t.isFirst || !t.isAuto ? t.cusload() : t.isFirst = !0 : t.cusload()
        },
        playStart: function(t) {
            var e = this;
            e.cusPlay(t)
        },
        play: function() {
            try {
                clearInterval(this.playSt),
                clearInterval(this.loadSt)
            } catch (t) {}
            var t = this
              , e = document;
            e.getElementById(t._default.playId) && e.getElementById(t._default.playId).play()
        },
        pause: function() {
            var t = this
              , e = document;
            try {
                e.getElementById(t._default.playId).pause()
            } catch (t) {}
        },
        setLoadProgress: function() {
            var t = this;
            document.getElementById(t._default.playBarLoad);
            try {
                var e = Math.ceil(document.getElementById(t._default.playId).duration);
                document.getElementById(t._default.playBarLoad).style.width = Math.ceil(t.getCurrentBufferedTime() / e * 100) + "%",
                Math.ceil(t.getCurrentBufferedTime()) >= e && t.clearInterval(t.loadSt)
            } catch (t) {}
        },
        setPlayProgress: function() {
            var t = this
              , e = {};
            e = t.songsList[t.curIndex];
            try {
                document.getElementById(t._default.playBarPlay).style.width = t.getCurrentTime() / e.timeLength * 100 + "%"
            } catch (t) {}
        },
        createCallback: function(t) {
            var e = this
              , n = document;
            e.utils.isIOS() || e.utils.isKnowAdr() ? n.getElementById(e._default.playId).src = t : (n.getElementById(e._default.fatherId).innerHTML = '<audio id="' + e._default.playId + '" src="' + t + '" autoplay="autoplay"></audio>',
            e.bindAudio()),
            e.utils.isIOS() && n.getElementById(e._default.playId).pause(),
            n.getElementById(e._default.playId).play(),
            n.getElementById(e._default.songLrc) && e.getLrc(),
            e.setSongHead(),
            e._default.playStaticId && phpLogClick(e._default.playStaticId)
        },
        getSongInfo: function(t, e) {
            var n = this
              , a = location.href.indexOf("singer") > -1 ? "singer" : "mkugou";
            Kg.getJSON("/app/i/getSongInfo.php", {
                cmd: "playInfo",
                hash: t.hash,
                from: a
            }, function(a) {
                var i = a.ctype;
                if (Kg.$("." + n._default.curPlayCls).attr("ctype", i),
                "1003" == i || "1000" == i || "1001" == i || "1002" == i || "1004" == i)
                    n.isLoadSrc = !1,
                    e ? "1003" == i ? showHideUI.show("dialogFeeDownload") : showHideUI.show("dialogNotDownload") : "prev" == n.derection ? n.prevSong() : n.nextSong();
                else {
                    if (e && "none" == Kg.$("#ftPlayer").css("display") && (showHideUI.show("ftPlayer"),
                    Kg.$(".js-bd-box").addClass("bd-bottom")),
                    n.songsList[n.curIndex].hash && n.songsList[n.curIndex].hash.toUpperCase() != a.hash.toUpperCase())
                        return;
                    a && 1 == a.status && (src = a.url,
                    n.songsList[n.curIndex].src = src,
                    n.songsList[n.curIndex].timeLength = a.timeLength,
                    n.songsList[n.curIndex].filename = unescape(t.filename) || a.fileName,
                    n.cacheList[t.hash] = {
                        src: src,
                        timeLength: a.length,
                        filename: unescape(t.filename) || a.fileName
                    },
                    n.createCallback(src))
                }
            }, "", !1)
        },
        create: function(t) {
            var e = this
              , n = document
              , a = {}
              , i = ""
              , r = "";
            if (!e.isLoadSrc) {
                if (e.isLoadSrc = !0,
                a = e.songsList[e.curIndex],
                n.getElementById(e._default.playId).removeAttribute("src"),
                !e.utils.isCanPlayAudio())
                    return void alert("此款手机不支持HTML5播放");
                !a.hash || e._default.isPlayRadio || e._default.isPlayRing || (r = e._default.songsListExt + a.hash.toUpperCase(),
                Kg.$("." + e._default.songCls).removeClass(e._default.curPlayCls),
                Kg.$("#" + r).addClass(e._default.curPlayCls)),
                e.cacheList[a.hash] ? (i = e.cacheList[a.hash].src,
                e.createCallback(i)) : e._default.isPlayRing ? (i = a.songurl,
                e.songsList[e.curIndex].src = i,
                e.songsList[e.curIndex].timeLength = 0,
                e.songsList[e.curIndex].filename = a.filename,
                e.createCallback(i)) : a.hash ? e.getSongInfo(a, t) : (i = a.songurl,
                e.songsList[e.curIndex].src = i,
                e.songsList[e.curIndex].timeLength = a.timeLength,
                e.songsList[e.curIndex].filename = a.filename,
                e.createCallback(i))
            }
        },
        setSongHead: function() {
            var t = this
              , e = document
              , n = ""
              , a = 0
              , i = {};
            i = t.songsList[t.curIndex],
            i.filename && (n = i.filename.split(/\s?-\s?/),
            n.length < 2 && (n = i.filename.split(/-/))),
            a = i.timeLength,
            t._default.isSongCover && (i.filename ? document.title = i.filename + " - 酷狗音乐 让音乐改变世界" : document.title = "酷狗音乐 让音乐改变世界"),
            e.getElementById(t._default.fullName) && (e.getElementById(t._default.fullName).innerHTML = i.filename),
            e.getElementById(t._default.songName) && n[1] && (e.getElementById(t._default.songName).innerHTML = n[1]),
            e.getElementById(t._default.singerName) && n[0] && (e.getElementById(t._default.singerName).innerHTML = n[0]),
            e.getElementById(t._default.currentTime) && (e.getElementById(t._default.currentTime).innerHTML = "00:00",
            e.getElementById(t._default.totalTime).innerHTML = t.utils.addZero(Math.floor(a / 60)) + ":" + t.utils.addZero(Math.floor(a % 60))),
            e.getElementById(t._default.playBarPlay) && (e.getElementById(t._default.playBarPlay).style.width = "0"),
            e.getElementById(t._default.playBarLoad) && (e.getElementById(t._default.playBarLoad).style.width = "0"),
            t._default.isSongCover && Kg.getJSON("/app/i/getSingerHead_new.php", {
                singerName: n[0],
                size: a
            }, function(e) {
                var n = t._default.defCover;
                e && (n = t.utils.formatImgSize({
                    img: e.url
                })),
                document.getElementById(t._default.songCover) && (document.getElementById(t._default.songCover).src = n)
            })
        },
        getBufferedTime: function() {
            var t = this
              , e = {};
            e = t.songsList[t.curIndex];
            var n = Math.ceil(t.getCurrentBufferedTime());
            return n > e.timeLength && (n = e.timeLength),
            n
        },
        getPlayTime: function() {
            var t = this
              , e = {};
            e = t.songsList[t.curIndex];
            var n = Math.ceil(t.getCurrentTime());
            n > e.timeLength && (n = e.timeLength);
            var a = Math.floor(n / 60)
              , i = n % 60;
            return t.utils.addZero(a) + ":" + t.utils.addZero(i)
        },
        getCurrentTime: function() {
            try {
                return document.getElementById(this._default.playId).currentTime
            } catch (t) {}
            return 0
        },
        getCurrentBufferedTime: function() {
            try {
                return document.getElementById(this._default.playId).buffered.end(0)
            } catch (t) {}
            return 0
        },
        addSongsAndPlay: function(t) {
            var e = this;
            t && (t.write ? e.songsList = t.songs : e.songsList = e.songsList.concat(t.songs),
            e.songsList.length > 0 && (e.curIndex = 0,
            e.create()))
        },
        addSongsNoPlay: function(t) {
            var e = this;
            t && (t.write ? e.songsList = t.songs : e.songsList = e.songsList.concat(t.songs))
        },
        getLrc: function() {
            try {
                clearInterval(this.lrcSt)
            } catch (t) {}
            var t = this
              , e = document
              , n = {}
              , a = {};
            a = t.songsList[t.curIndex],
            e.getElementById(t._default.songLrc).style.scrollTop = "0px",
            a.lrc ? (t.uiLRC = new LRC({
                lyric: a.lrc,
                lyricWrapper: e.getElementById(t._default.songLrc),
                curRowClassName: "current",
                separator: "\r\n"
            }),
            t.getLrcStatus()) : (n = {
                cmd: 100,
                keyword: unescape(a.filename),
                hash: a.hash,
                timelength: 1e3 * a.timeLength,
                d: Math.random()
            },
            Kg.get("/app/i/krc.php", n, function(n) {
                n && "" !== n.trim() ? (t.uiLRC = new LRC({
                    lyric: n,
                    lyricWrapper: e.getElementById(t._default.songLrc),
                    curRowClassName: "current",
                    separator: "\r\n"
                }),
                t.getLrcStatus()) : e.getElementById(t._default.songLrc).innerHTML = '<div class="nolrc">酷狗音乐，让音乐改变世界！</div>'
            }))
        },
        getLrcStatus: function() {
            var t = this;
            t.uiLRC && t.uiLRC.IsLyricValid() && (t.lrcSt = setInterval(function() {
                t.uiLRC.DoSync(t.getCurrentTime())
            }, 200))
        },
        bindAudio: function() {
            var t = this
              , e = document;
            t.isInClient || (Kg.$("#" + t._default.playId).addEvent("ended", function() {
                t._default.isCycle && "list" == t._default.playMode ? t.nextSong() : t._default.isCycle ? document.getElementById(t._default.playId).play() : t.ended && t.ended()
            }),
            Kg.$("#" + t._default.playId).addEvent("pause", function() {
                Kg.$(t._default.btnMain)[0] && (Kg.$(t._default.btnMain).addClass(t._default.playClass),
                Kg.$(t._default.btnMain).removeClass(t._default.pauseClass)),
                t.playStart("pause")
            }),
            Kg.$("#" + t._default.playId).addEvent("play", function() {
                Kg.$(t._default.btnMain)[0] && (Kg.$(t._default.btnMain).addClass(t._default.pauseClass),
                Kg.$(t._default.btnMain).removeClass(t._default.playClass)),
                t.playing && t.playing()
            }),
            Kg.$("#" + t._default.playId).addEvent("error", function() {
                t.playStart("error")
            }),
            Kg.$("#" + t._default.playId).addEvent("timeupdate", function() {
                t._default.isBarMove || (e.getElementById(t._default.currentTime) && (e.getElementById(t._default.currentTime).innerHTML = t.getPlayTime()),
                t.setPlayProgress(),
                t.getLrcStatus(),
                t.setLoadProgress())
            }),
            Kg.$("#" + t._default.playId).addEvent("loadstart", function() {
                t.loadStart(),
                t.isLoadSrc = !1
            }),
            Kg.$("#" + t._default.playId).addEvent("canplay", function() {
                t.isLoadSrc = !1,
                t.playStart()
            }),
            Kg.$("#" + t._default.playId).addEvent("suspend", function() {
                t.playStart()
            }),
            Kg.$("#" + t._default.playId).addEvent("loadeddata", function() {
                document.getElementById(t._default.playId).play()
            }))
        },
        bind: function() {
            var t = this
              , e = document;
            Kg.$(t._default.btnMain)[0] && Kg.$(t._default.btnMain).addEvent("click", function() {
                t.songsList && t.songsList.length > 0 && t.curIndex != -1 && (this.className.indexOf(t._default.playClass) > -1 ? t.play() : t.pause())
            }),
            Kg.$(t._default.btnPrev)[0] && Kg.$(t._default.btnPrev).addEvent("click", function() {
                t.prevSong()
            }),
            Kg.$(t._default.btnNext)[0] && Kg.$(t._default.btnNext).addEvent("click", function() {
                t.nextSong()
            });
            var n = function(n) {
                try {
                    var a = parseInt(e.getElementById(t._default.playId).duration, 10);
                    if (!isNaN(a)) {
                        var i = Math.ceil(a * n);
                        e.getElementById(t._default.currentTime).innerHTML = t.getPlayTime(i),
                        t.getLrcStatus(i)
                    }
                } catch (t) {}
            };
            if (document.getElementById(t._default.playBarPlay)) {
                BarMove({
                    fatherId: t._default.playBarFather,
                    barId: t._default.playBarPlay,
                    startFunc: function(e) {
                        t._default.isBarMove = !0,
                        n(e)
                    },
                    moveFunc: function(e) {
                        t._default.isBarMove = !0,
                        n(e)
                    },
                    afterFunc: function(n) {
                        t._default.isBarMove = !1;
                        try {
                            var a = parseInt(e.getElementById(t._default.playId).duration, 10);
                            if (!isNaN(a)) {
                                var i = Math.ceil(a * n);
                                e.getElementById(t._default.currentTime).innerHTML = t.getPlayTime(i),
                                e.getElementById(t._default.playBarLoad).style.width = 100 * n + "%",
                                e.getElementById(t._default.playId).currentTime = a * n
                            }
                        } catch (t) {}
                    }
                })
            }
            t.bindAudio()
        },
        createAudio: function() {
            var t = this
              , e = document;
            if (!e.getElementById(t._default.fatherId)) {
                var n = document.createElement("div");
                n.id = t._default.fatherId,
                n.style.display = "none",
                t._default.isAuto ? n.innerHTML = '<audio id="' + t._default.playId + '" autoplay height="100%" width="100%" controls></audio>' : n.innerHTML = '<audio id="' + t._default.playId + '" height="100%" width="100%" controls></audio>',
                e.body.appendChild(n)
            }
        },
        init: function(t) {
            var e = this;
            document;
            return e.songsList = [],
            e.curIndex = -1,
            e.uiLRC = null,
            t && e.utils.extend(e._default, t, !0),
            e.createAudio(),
            e.bind(),
            this
        }
    },
    window.Player = e
}();
var dialogUI = function(t) {
    function e(e, n) {
        t.$("#" + e).show(),
        n && n()
    }
    function n(e, n) {
        t.$("#" + e).hide(),
        n && n()
    }
    return t.$("body")[0].addEventListener("click", function(t) {
        var n, a = t.target;
        "dialog" == a.getAttribute("data-show") && (n = a.getAttribute("data-dialog-id"),
        e(n))
    }, !1),
    t.$(".js-dialog-hide").addEvent("click", function(e) {
        n(t.$(this).attr("data-dialog-id"))
    }),
    {
        show: e,
        hide: n
    }
}(Kg)
  , downloadModule = function(t) {
    function e(t) {
        var e = "kugou://start.weixin" + (t ? "?" + t : "")
          , n = /qqdownloader/gi.test(window.navigator.userAgent)
          , a = n ? "tmast://appdetails?pname=com.kugou.android&scene=20280504" : "http://downmobile.kugou.com/promote/package/download/channel=6"
          , r = document.createElement("iframe");
        document.getElementById("pageSingerInfo") && (a = "http://downmobile.kugou.com/promote/package/download/channel=128");
        var o = window.location.href
          , s = /frombaidu/g
          , l = /from_sogou/g
          , c = /from_360/g
          , u = /fromhuawei/g
          , d = /fromweixin/g;
        if (1 == s.test(o))
            var a = "http://downmobile.kugou.com/promote/package/download/channel=376";
        else if (1 == l.test(o))
            var a = "http://m.kugou.com/download/oi7vrwie.html";
        else if (1 == c.test(o))
            var a = "http://m.kugou.com/download/oioguurh.html";
        else if (1 == u.test(o))
            var a = "http://downmobile.kugou.com/promote/package/download/channel=370";
        else if (1 == d.test(o))
            var a = "http://m.kugou.com/download/omw9w5fk.html";
        r.style.width = "1px",
        r.style.height = "1px",
        r.style.display = "none";
        var h = (new Date).valueOf();
        r.src = e,
        document.body.appendChild(r),
        i = setTimeout(function() {
            if (document.webkitHidden)
                try {
                    kgplayer.pause()
                } catch (t) {}
            else {
                var t = (new Date).valueOf();
                t - h < 1550 && (location.href = a)
            }
        }, 1500)
    }
    function n(t) {
        var e = (navigator.userAgent.match(/iPad/i) ? "kugouurlhd://start.weixin" : "kugouurl://start.weixin") + (t ? "?" + t : "")
          , n = window.location.href
          , a = /http:\/\/m\.kugou\.com\/kgsong\/((?!\/).)*\.html/g
          , r = /frombaidu/g
          , o = /from_360/g
          , s = /from_sogou/g
          , l = /fromweixin/g;
        if (1 == r.test(n))
            var c = "http://m.kugou.com/download/ogf0b936.html";
        else if (1 == s.test(n))
            var c = "http://m.kugou.com/download/oi7vrwie.html";
        else if (1 == o.test(n))
            var c = "http://m.kugou.com/download/oioguurh.html";
        else if (1 == l.test(n))
            var c = "http://m.kugou.com/download/omw9w5fk.html";
        else if (1 == a.test(n))
            var c = "http://mobilelog.kugou.com/statistics.php?cmd=107&type=app&appid=372&url=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fku-gou-yin-le%2Fid472208016%3Fmt%3D8";
        else
            var c = navigator.userAgent.match(/iPad/i) ? "https://itunes.apple.com/cn/app/%E9%85%B7%E7%8B%97%E9%9F%B3%E4%B9%90hd/id657285176?l=en&mt=8" : "https://itunes.apple.com/app/apple-store/id472208016?pt=624347&ct=%E9%85%B7%E7%8B%97H5&mt=8";
        var u = (new Date).valueOf();
        location.href = e,
        i = setTimeout(function() {
            if (document.webkitHidden)
                try {
                    kgplayer.pause()
                } catch (t) {}
            else {
                var t = (new Date).valueOf();
                t - u < 2e3 && (location.href = c)
            }
        }, 1500)
    }
    function a(t, a, i) {
        var r = navigator.userAgent
          , o = /http:\/\/m\.kugou\.com\/kgsong\/((?!\/).)*\.html/g
          , s = /frombaidu/g
          , l = /from_360/g
          , c = /from_sogou/g
          , u = /fromweixin/g
          , d = window.location.href;
        if (t) {
            var h = {
                cmd: 301
            }
              , f = JSON.parse(t);
            f && (f.size = f.filesize || 0,
            f.sqfilesize = f.sqfilesize || 0,
            f["320size"] = f["320filesize"] || 0,
            f.m4asize = f.m4afilesize || 0,
            f.timelength = f.duration),
            h.jsonStr = f,
            h = JSON.stringify(h)
        }
        if (r.match(/QQ\//i))
            r.match(/iPhone|iPod|iPad/i) ? 1 == s.test(d) ? location.href = "http://m.kugou.com/download/ogf0b936.html" : 1 == c.test(d) ? location.href = "http://m.kugou.com/download/oi7vrwie.html" : 1 == l.test(d) ? location.href = "http://m.kugou.com/download/oioguurh.html" : 1 == u.test(d) ? location.href = "http://m.kugou.com/download/omw9w5fk.html" : 1 == o.test(d) ? location.href = "http://mobilelog.kugou.com/statistics.php?cmd=107&type=app&appid=372&url=http%3A%2F%2Fitunes.apple.com%2Fcn%2Fapp%2Fku-gou-yin-le%2Fid472208016%3Fmt%3D8" : location.href = navigator.userAgent.match(/iPad/i) ? "https://itunes.apple.com/cn/app/%E9%85%B7%E7%8B%97%E9%9F%B3%E4%B9%90hd/id657285176?l=en&mt=8" : "https://itunes.apple.com/app/apple-store/id472208016?pt=624347&ct=%E9%85%B7%E7%8B%97H5&mt=8" : e(h);
        else if ("micromessenger" == r.toLowerCase().match(/MicroMessenger/i)) {
            if (r.match(/iPhone|iPod|iPad/i)) {
                var g = i ? 3 : 2
                  , p = navigator.userAgent.match(/iPad/i) ? "https://mos.kugou.com/universal/" : "https://mo.kugou.com/universal/";
                return void (t ? location.href = p + "?Type=1&Action=" + g + "&Json=" + encodeURIComponent(JSON.stringify(f)) + "&channel=111" : location.href = p + "?channel=111")
            }
            var m = encodeURIComponent("kugou://start.weixin" + (h ? "?" + h : ""));
            location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.kugou.android&ckey=CK1364235017707&android_schema=" + m + "&schema_version=7950"
        } else
            r.match(/iPhone|iPod|iPad/) ? n(h) : r.match(/Android|Adr/) && e(h)
    }
    var i;
    return {
        openApp: a,
        downkey: i
    }
}(Kg)
  , dialogDownload = function(t) {
    function e(e, n) {
        var a = e ? t.$(e) : t.$(".js-cur").find(".panel-songs-item-download")
          , i = a.attr("data-dialog-id");
        n ? (t.$("body").attr("islist", "true"),
        t.$(".panel-songslist-item").removeClass("js-down-cur"),
        t.$(e.parentNode).addClass("js-down-cur")) : t.$("body").attr("islist", "false"),
        showHideUI.show(i)
    }
    function n(n, a, i) {
        var r = i ? t.$(n.parentNode) : t.$(".js-cur")
          , o = r.attr("ctype")
          , s = r[0].id.replace(/^songs_/i, "");
        o ? e(n, i) : t.getJSON("/app/i/getSongInfo.php", {
            cmd: "playInfo",
            hash: s
        }, function(t) {
            r.attr("ctype", t.ctype),
            e(n, i)
        }, "", !1),
        a.stopPropagation(),
        a.preventDefault()
    }
    return t.$(".js-dialog-show").addEvent("click", function(t) {
        n(this, t, !1)
    }),
    t.$(".js-downloadApp")[0] && t.$(".js-downloadApp").addEvent("click", function() {
        phpLogClick(5535),
        clearTimeout(downloadModule.downkey),
        downloadModule.openApp()
    }),
    document.getElementById("downloadBtn") && document.getElementById("downloadBtn").addEventListener("click", function(e) {
        e.preventDefault(),
        phpLogClick(5536),
        clearTimeout(downloadModule.downkey);
        var n, a, i;
        a = "true" == t.$("body").attr("islist") ? t.$(".js-down-cur")[0] : t.$(".js-cur")[0],
        i = t.$(a).attr("ctype"),
        n = "1009" == i ? a.children[1].children[0].innerHTML : "",
        downloadModule.openApp(n)
    }, !1),
    document.getElementById("downloadFeeBtn") && document.getElementById("downloadFeeBtn").addEventListener("click", function(t) {
        t.preventDefault(),
        phpLogClick(5536),
        clearTimeout(downloadModule.downkey),
        downloadModule.openApp()
    }, !1),
    document.getElementById("downloadNotBtn") && document.getElementById("downloadNotBtn").addEventListener("click", function(t) {
        t.preventDefault(),
        phpLogClick(5536),
        clearTimeout(downloadModule.downkey),
        downloadModule.openApp()
    }, !1),
    document.getElementById("openAppBtn") && document.getElementById("openAppBtn").addEventListener("click", function() {
        phpLogClick(5537),
        clearTimeout(downloadModule.downkey),
        downloadModule.openApp()
    }, !1),
    {
        showDialog: n
    }
}(Kg)
  , showHideUI = function(t) {
    function e(e, n) {
        n && n(),
        t.$("#" + e).show()
    }
    function n(e, n) {
        t.$("#" + e).hide(),
        n && n()
    }
    return {
        show: e,
        hide: n
    }
}(Kg)
  , commonModule = function(t, e) {
    function n() {
        e.referrer.match("m.kugou.com") && window.history.length > 0 ? history.go(-1) : location.href = gbParams.kg_domain
    }
    function a() {
        e.body.scrollTop >= parseInt(t.$("#imgBoxInfo").css("height")) ? t.$("#topGoback").hasClass("top-goback-scroll") || t.$("#topGoback").addClass("top-goback-scroll") : t.$("#topGoback").removeClass("top-goback-scroll")
    }
    function i() {
        var n = parseInt(t.$("#imgBoxInfo").css("height"), 10)
          , a = t.$("#imgBoxInfo img")
          , i = e.body.clientWidth;
        a.css("margin-top", (n - i) / 2 + "px")
    }
    function r() {
        var t = e.getElementById("goback");
        t && t.addEventListener("click", function(t) {
            n(),
            t.preventDefault()
        }, !1),
        e.getElementById("imgBoxInfo") && i()
    }
    return r(),
    {
        gobackFun: n,
        topShowBg: a,
        formatImg: i
    }
}(Kg, document)
  , toTopModule = function(t, e) {
    function n() {
        e.body.scrollTop = 0
    }
    function a() {
        e.body.scrollTop > 3 * window.screen.height ? showHideUI.show("toTop") : showHideUI.hide("toTop")
    }
    var i = e.getElementById("toTop");
    return i && e.getElementById("toTop").addEventListener("click", function(t) {
        n()
    }, !1),
    {
        showHideTop: a
    }
}(Kg, document)
  , playerModule = function(t) {
    function e() {
        var e = t.$(".js-btnPlayPause");
        e.addClass("btn-loading"),
        e.removeClass("btn-pause"),
        e.removeClass("btn-play")
    }
    function n(e) {
        var n = t.$(".js-btnPlayPause");
        n.removeClass("btn-loading"),
        e || n.addClass("btn-pause")
    }
    function a() {
        var e = kgplayer
          , n = document
          , a = ""
          , i = 0
          , r = {}
          , r = e.songsList[e.curIndex];
        if (r.filename && (a = r.filename.split(/\s?-\s?/),
        a.length < 2 && (a = r.filename.split(/-/))),
        i = r.timeLength,
        e._default.isSongCover && (r.filename ? document.title = r.filename + " - 酷狗音乐 让音乐改变世界" : document.title = "酷狗音乐 让音乐改变世界"),
        t.$(e._default.fullName)[0] && t.$(e._default.fullName).html(r.filename),
        t.$(e._default.songName)[0] && a[1] && t.$(e._default.songName).html(a[1]),
        t.$(e._default.singerName)[0] && a[0] && t.$(e._default.singerName).html(a[0]),
        n.getElementById(e._default.currentTime) && (n.getElementById(e._default.currentTime).innerHTML = "00:00",
        n.getElementById(e._default.totalTime).innerHTML = e.utils.addZero(Math.floor(i / 60)) + ":" + e.utils.addZero(Math.floor(i % 60))),
        n.getElementById(e._default.playBarPlay) && (n.getElementById(e._default.playBarPlay).style.width = "0"),
        e._default.isSongCover) {
            var o = {
                hash: r.hash,
                size: 200,
                format: "jsonp"
            };
            t.Ajax({
                docType: "jsonp",
                method: "get",
                url: "https:" == document.location.protocol ? "https://mtools.kugou.com/api/v1/singer_header/get_by_hash" : "http://tools.mobile.kugou.com/api/v1/singer_header/get_by_hash",
                args: o,
                callback: function(n) {
                    var a = t.$(e._default.songCover)[0].getAttribute("data-default-src");
                    n && n.url && (a = n.url),
                    t.$(e._default.songCover)[0] && t.$(e._default.songCover).attr("src", a),
                    t.$(e._default.bgSongCover)[0] && t.$(e._default.bgSongCover).css("background-image", "url(" + a + ")")
                },
                error: function() {}
            })
        }
    }
    function i() {
        var e = [];
        return t.$("#panelSongsList li").each(function(t, n) {
            var a = JSON.parse(n.children[1].children[0].innerHTML);
            a.hash = a.hash.toUpperCase(),
            a.timeLength = a.duration,
            e[t] = a,
            t++
        }),
        e
    }
    function r() {
        h = i(),
        kgplayer.addSongsNoPlay({
            songs: h
        })
    }
    function o(t) {
        var e = t.id
          , n = kgplayer
          , a = e.replace(/^songs_/i, "")
          , i = !0;
        if (n.isLoadSrc)
            return !1;
        if (n.songsList.length > 0)
            for (var r = 0; r < n.songsList.length; r++)
                if (n.songsList[r].hash == a) {
                    n.curIndex = r,
                    n.create(i);
                    break
                }
    }
    function s() {
        t.$("#panelPlay").css("visibility", "visible"),
        showHideUI.hide("bd"),
        showHideUI.hide("ftPlayer"),
        showHideUI.hide("topFixed")
    }
    function l() {
        t.$("#panelPlay").css("visibility", "hidden"),
        showHideUI.show("topFixed"),
        showHideUI.show("bd"),
        showHideUI.show("ftPlayer")
    }
    function c() {
        var e = t.$("#panelPlayBd")[0].offsetHeight
          , n = document.documentElement.clientHeight;
        t.$("#panelPlay")[0].style.height = (n > e ? n : e) + "px"
    }
    function u(i) {
        r(),
        kgplayer.cusload = e,
        kgplayer.cusPlay = n,
        kgplayer.setSongHead = a,
        t.$("#goPlay").addEvent("click", function(t) {
            t.preventDefault(),
            s(),
            c()
        }),
        t.$("#hidePlay").addEvent("click", function(t) {
            t.preventDefault(),
            l()
        })
    }
    function d() {
        kgplayer.cacheList = {}
    }
    kgplayer = Player({
        btnMain: ".js-btnPlayPause",
        playClass: "btn-play",
        pauseClass: "btn-pause",
        loadClass: "btn-loading",
        btnNext: ".js-btnNext",
        btnPrev: ".js-btnPrev",
        songName: ".js-ftSongName",
        singerName: ".js-ftUserName",
        currentTime: "timeshow",
        totalTime: "time",
        songCover: ".js-ftImg",
        isSongCover: !0,
        playBarPlay: "progress",
        playBarLoad: "previewProgress",
        bgSongCover: ".js-bg-overlay",
        isShowLrc: !0,
        songLrc: "playLrc",
        songCls: "panel-songslist-item",
        curPlayCls: "js-cur",
        playStaticId: 5532
    });
    var h;
    return {
        init: u,
        addAllSongs: r,
        playSong: o,
        resetCache: d
    }
}(Kg);
if (pageInit(),
"https:" == document.location.protocol) {
    var _hmt = _hmt || [];
    !function() {
        var t = document.createElement("script");
        t.src = "https://hm.baidu.com/hm.js?aedee6983d4cfc62f509129360d6bb3d";
        var e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(t, e)
    }()
} else {
    var _bdhmProtocol = "http://";
    document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fc0eb0e71efad9184bda4158ff5385e91' type='text/javascript'%3E%3C/script%3E"))
}
