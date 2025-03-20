return async function (a) {
    var ip = a.ip || a.remote;
    var m = /(\d+\.){3}\d+$/.exec(ip);
    var res = await data.from("iplocation", { ip: m ? m[0] : ip });
    if (res.data) res = res.data;
    if (res.address) res = res.address;
    a.address = res;
}