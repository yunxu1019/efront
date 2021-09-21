function n(n) {
    function i(t, n) {
        $http[t].apply($http, n).success(r).error(c),
            $timeout(function () {
                l.complete || s()
            }, m)
    }

    function o(e, t, a) {
        for (var n = 0; n < e.length; n++)
            e[n].apply(t, a)
    }

    function r() {
        y++ ,
            l.complete || (l.complete = !0,
                v.resolve(),
                o(p, this, arguments))
    }

    function c(e) {
        y++ ,
            s() || l.complete || y != u + 1 || o(h, this, arguments)
    }

    function s() {
        return !(M >= u || l.complete) && (g && (v.resolve(),
            v = $q.defer(),
            d.timeout = v.promise),
            M++ ,
            i(n.method, n.args), !0)
    }
    var l = n.data,
        d = n.config,
        f = d.MMRetry,
        u = "undefined" == typeof f.count ? 3 : f.count,
        m = f.timeout || 15e3,
        g = f.serial,
        p = [],
        h = [],
        M = 0,
        v = $q.defer(),
        y = 0;
    return d.timeout = v.promise,
        i(n.method, n.args), {
            success: function (e) {
                return p.push(e),
                    this
            },
            error: function (e) {
                return h.push(e),
                    this
            }
        }
}
for (var i, mmHttp = function (e) {
    var t = e.method ? e.method.toLowerCase() : "get",
        a = e.url,
        n = e.data,
        i = [a];
    return n && i.push(n),
        i.push(e),
        mmHttp[t].apply(mmHttp, i)
}, r = ["post", "get", "jsonp"], c = 0; c < r.length; c++)
    i = r[c],
        mmHttp[i] = function (method) {
            return function (url) {
                var data, config, args = [url];
                "post" == method ? (data = arguments[1],
                    config = arguments[2]) : config = arguments[1];
                var isMMRetry;
                data && args.push(data),
                    config && (isMMRetry = "undefined" != typeof config.MMRetry,
                        args.push(config));
                var s;
                return s = isMMRetry ? n({
                    args: args,
                    method: method,
                    config: config,
                    data: {
                        complete: !1
                    }
                }) : $http[method].apply($http, args)
            }
        }(i);