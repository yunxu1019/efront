var urlProxyMap = {
    "/": "/" + process.env.APP || "",
};
urlProxyMap[""] = urlProxyMap["/"];
var URL = require("url");
function getProxyURL(req) {
    var url = req.url;
    if (req.headers.referer) {
        var referer = req.headers.referer;
        var pathname = URL.parse(referer).pathname;
        if (urlProxyMap[pathname]) {
            console.info(`Proxy:${pathname} : ${urlProxyMap[pathname]}${pathname}`);
            url = urlProxyMap[pathname] + url;
        }
    }
    return url;
}
module.exports = getProxyURL;