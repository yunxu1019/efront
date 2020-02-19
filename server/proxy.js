var urlProxyMap = {
    "/": "/" + (process.env.APP || ""),
};
if (!/\/$/.test(urlProxyMap["/"])) {
    urlProxyMap["/"] += "/";
}
urlProxyMap[""] = urlProxyMap["/"];
var URL = require("url");
function getProxyURL(req) {
    var url = req.url;
    if (req.headers.referer) {
        var referer = req.headers.referer;
        var pathname = URL.parse(referer).pathname;
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