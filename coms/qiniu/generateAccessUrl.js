"use strict";
var _base_url = process.env["HOST.QINIU"];
var _access_key = process.env["KEY.QINIU_ACCESS"];
var _secret_key = process.env["KEY.QINIU_SECRET"];
var crypto = require("crypto");

function generateAccessUrl(uri, base = _base_url, env) {
    if (env) {
        var access_key = env["KEY.QINIU_ACCESS"] || _access_key;
        var secret_key = env["KEY.QINIU_SECRET"] || _secret_key;
    } else {
        var secret_key = _secret_key;
        var access_key = _access_key;
    }
    var downloadUrl = base + url + "?e=" + (120 + new Date / 1000 | 0);
    var token = access_key + ":" + crypto.createHmac("sha1", secret_key).update(downloadUrl).digest("base64").replace(/[\+\/]/g,e=>e==="+"?"-":"_");
    return downloadUrl + "&token=" + token;
}
module.exports = generateAccessUrl;