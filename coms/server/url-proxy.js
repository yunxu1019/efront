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
    var datas = await userdata.getOptionsList("proxy");
    datas.forEach(d => {
        var { url, realpath, action, status } = d;
        if (status === '禁用') return;
        if (!/^\//.test(url)) url = "/" + url;
        var parsed = parseURL(realpath);
        switch (action) {
            case "跳转":
                if (parsed.protocol) break;
                if (parsed.host) {
                    realpath = `//${parsed.auth || ''}${parsed.host}${parsed.path}`;
                    break;
                }
                break;
            case "转发":
                if (parsed.protocol) {
                    realpath = /^https/i.test(parsed.protocol) ? "~~" : "~";
                    realpath += `${parsed.host}${parsed.path}`;
                }
                else if (parsed.host) {
                    realpath = `&${parsed.host}${parsed.path}`;
                }
                break;
        }
        urlProxyMap[url] = realpath;
    });
};

async function getProxyURL(req) {
    await userdata.update(updateMap);
    var url = req.url;
    var referer = getHeader(req.headers, "referer");
    if (referer) {
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