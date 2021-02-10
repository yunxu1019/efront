"use strict";
var urlProxyMap = {
    "/": "/" + (process.env.APP || "").replace(/^\.[\/\\]?/, ''),
};
if (!/\/$/.test(urlProxyMap["/"])) {
    urlProxyMap["/"] += "/";
}
Object.keys(urlProxyMap).forEach(function (key) {
    urlProxyMap[key] = urlProxyMap[key].replace(/\/\.\//g, '/');
});
urlProxyMap[""] = urlProxyMap["/"];
var parseURL = require("../basic/parseURL");
function getProxyURL(req) {
    var url = req.url;
    if (req.headers.referer) {
        var referer = req.headers.referer;
        var pathname = parseURL(referer).pathname;
        if (urlProxyMap[pathname]) {
            url = urlProxyMap[pathname].replace(/\/[^\/]*$/, '') + "/" + url.replace(/^\//, '');
        }
    } else {
        if (urlProxyMap[url]) {
            url = urlProxyMap[url];
        }
    }
    if (url !== req.url) console.info(`Proxy: ${req.url} = ${url}`);
    return url;
}
module.exports = getProxyURL;