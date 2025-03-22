return async function (a) {
    var ip = a.ip || a.remote;
    var m = /(\d+\.){3}\d+$/.exec(ip);
    var res = await data.from("iplocation", { ip: m ? m[0] : ip });
    if (res.data) res = res.data;
    if (res.address) res = res.address;
    else if (res.country || res.isp) {
        res = [res.country, res.province, res.city, res.district, res.isp].join(' ');
    }
    a.address = res;
}