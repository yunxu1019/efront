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
    var res = await data.from("ipcn", { ip });
    if (!res.address && !res.data) res = await baidu(ip);
    var msg = '加载错误';
    if (res.message && !res.data && !res.content && !res.address) {
        msg = res.message;
        res = await gaode(ip);
    }
    if (res.data) res = res.data;
    if (res.content) res = res.content;
    if (res.address) res = res.address;
    else if (res.country || res.province || res.city || res.isp) {
        res = [res.country, res.province, res.city, res.district, res.isp].join('');
    }
    if (!res) alert(msg, 'warn');
    a.address = res || msg;
}