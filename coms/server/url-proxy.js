"use strict";
var memery = require("../efront/memery");
var userdata = require("./userdata");
var urlProxyMap = {
    "/": "/" + (memery.APP || "").replace(/^\.[\/\\]?/, ''),
};
if (!/\/$/.test(urlProxyMap["/"])) {
    urlProxyMap["/"] += "/";
}
Object.keys(urlProxyMap).forEach(function (key) {
    urlProxyMap[key] = urlProxyMap[key].replace(/\/\.\//g, '/');
});
urlProxyMap[""] = urlProxyMap["/"];
var parseURL = require("../basic/parseURL");
var updateMap = async function () {
    var datas = await userdata.option("proxy", false);
    datas.forEach(d => {
        var { url, realpath } = d;
        if (!/^\//.test(url)) url = "/" + url;
        urlProxyMap[url] = realpath;
    });
};

async function getProxyURL(req) {
    await userdata.update(updateMap);
    var url = req.url;
    if (req.headers.referer) {
        var referer = req.headers.referer;
        var { pathname, query } = parseURL(referer);
        if (urlProxyMap[pathname]) {
            var querys = [];
            if (query) querys.push(query);
            var { host, protocol = req.protocol, pathname = '/', query } = parseURL(urlProxyMap[pathname]);
            url = pathname.replace(/\/[^\/]*$/, '') + "/" + url.replace(/^\//, '');
            if (host) protocol + '//' + host + url;
            if (query) querys.push(query);
            if (querys.length) url += "?" + querys.join("&");
        }
    }
    if (urlProxyMap[url]) {
        url = urlProxyMap[url];
    }
    if (url !== req.url) console.info(`Proxy: ${req.url} = ${url}`);
    return url;
}
module.exports = getProxyURL;