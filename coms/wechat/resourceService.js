function i(t, a, n) {
    if (t instanceof Array || (t = [t]), !(t.length > 0))
        return void $timeout(n, 0);
    a = a || {};
    for (var i, r = a.priority ? c : s, d = l.push({
            callback: n || function () {},
            taskNum: t.length,
            combo: a.combo,
            result: {}
        }) - 1, f = 0; f < t.length; f++)
        i = t[f],
        i._cbKey = d,
        i._resultKey = i.key || i.url,
        r.push(i);
    o()
}

function o() {}
var r = !1;
$($window).on("load", function () {
    r = !0,
        o()
});
var c = [],
    s = [],
    l = [],
    resourceService = {
        load: i
    };