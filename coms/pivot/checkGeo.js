return async function (a) {
    var ip = a.ip || a.remote;
    var m = /(\d+\.){3}\d+$/.exec(ip);
    var { address } = await data.from("iplocation", { ip: m ? m[0] : ip });
    a.address = address;
}