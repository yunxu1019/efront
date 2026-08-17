var md5 = docs$md5;
var baidu = function (ip) {
    var query = {
        ip,
        ak: "lPiUBf6CCdZtLzrbzYREa6liU0NycJyr"
    };
    query.sn = md5(encodeURIComponent("/location/ip?" + serialize(query)) + "dZtaNhMkjlDmxAot0uYs2fEJKvTi3REe");
    return data.from("ipbaidu", query);
};
var gaode = function (ip) {
    var query = {
        ip,
        key: 'e360c7487575c81c617a42d00edea1fb'
    };
    query.sig = md5(serialize(query) + "a9b7a9509b47169bde38dfa825898ff8");
    return data.from("ipgaode", query);
};
return async function (a) {
    var ip = a.ip || a.remote;
    var m = /(\d+\.){3}\d+$/.exec(ip);
    ip = m ? m[0] : ip;
    try {
        var res = await data.from("ipcn", { ip });
    } catch { }
    try {
        if (!res || !res.address && !res.data) res = await baidu(ip);
    } catch { }
    var msg = '加载错误';
    if (!res || res.message && !res.data && !res.content && !res.address) {
        msg = res?.message;
        try {
            res = await gaode(ip);
        } catch { }
    }
    if (res) {
        if (res.data) res = res.data;
        if (res.content) res = res.content;
        if (res.address_detail) res = res.address_detail;
        else if (res.address) res = res.address;
        if (res.country || res.province || res.city || res.isp) {
            res = [res.nation || res.country, res.province, res.city !== res.province ? res.city : '', res.district, res.isp].filter(a => !!a);
            a: {
                for (var i = res.length - 1; i > 0;) {
                    var n = res[i--];
                    if (!/[a-z]/.test(n)) break a;
                    var p = res[i];
                    if (/[a-z]$/i.test(p) && /^[a-z]/i.test(n)) res.splice(i + 1, 0, ', ');
                }
                if (!/[a-z]/.test(res[0])) break a;
                res.reverse();
            }
            res = res.join("");
        }
    }
    if (!res) alert(msg, 'warn');
    a.address = res || msg;
    return a;
}