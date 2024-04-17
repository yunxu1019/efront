"use strict";
var _base_url = process.env["HOST.QINIU"];
var _access_key = process.env["KEY.QINIU_ACCESS"];
var _secret_key = process.env["KEY.QINIU_SECRET"];
var crypto = require("crypto");

function generateUploadUrl(uri, base = _base_url, env) {
    if (env) {
        var access_key = env["KEY.QINIU_ACCESS"] || _access_key;
        var secret_key = env["KEY.QINIU_SECRET"] || _secret_key;
    } else {
        var secret_key = _secret_key;
        var access_key = _access_key;
    }
    var putPolicy = Buffer.from(JSON.stringify({
        "scope": `${base}:${uri}`,
        "deadline": +new Date + 1200,
        "returnBody": `{"name":$(fname),"size":$(fsize),"w":$(imageInfo.width),"h":$(imageInfo.height),"hash":$(etag)}`
    })).toString("base64").replace(/[\+\/]/g, e => e === "+" ? "-" : "_");
    var token = access_key + ":" + crypto.createHmac("sha1", secret_key).update(putPolicy).digest("base64").replace(/[\+\/]/g, e => e === "+" ? "-" : "_");
    return token + ":" + putPolicy;
}
module.exports = generateUploadUrl;