"use strict";
var memery = require("../efront/memery");
var userdata = require("./userdata");
var parseURL = require("../basic/parseURL");
var urlProxyMap = null;
var updateMap = async function () {
    var datas = await userdata.getOptionsList("proxy");
    urlProxyMap = Object.create(null);
    if (memery.APP) {
        urlProxyMap["/"] = "/" + String(memery.APP).replace(/^\.[\/\\]?/, '');
        if (!/\/$/.test(urlProxyMap["/"])) {
            urlProxyMap["/"] += "/";
        }
    }
    Object.keys(urlProxyMap).forEach(function (key) {
        urlProxyMap[key] = urlProxyMap[key].replace(/\/\.\//g, '/');
    });
    datas.forEach(d => {
        var { url, realpath, action, status } = d;
        if (status === '禁用') return;
        if (!/^[\/\*]/.test(url)) url = "/" + url;
        var parsed = parseURL(realpath);
        var jump = false;
        switch (action) {
            case "跳转":
                jump = true;
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
        urlProxyMap[url] = [realpath, jump];
    });
};
var wrapProxy = function (proxy, url, query) {
    var querys = [];
    if (query) querys.push(query);
    var { host, protocol = '', pathname = '/', query } = parseURL(proxy);
    url = pathname.replace(/\/$/, '') + "/" + url.replace(/^\//, '');
    if (host) url = protocol + '//' + host + url;
    if (query) querys.push(query);
    if (querys.length) url += "?" + querys.join("&");
    return url;
}

async function getProxyURL(req, url = req.url) {
    await userdata.update(updateMap);
    var host = getHeader(req.headers, 'host');
    var { pathname, query } = parseURL(url);
    if (host) {
        host = "/" + host;
        var proxy = urlProxyMap[host];
        if (proxy instanceof Array) proxy = proxy[0];
        if (proxy) url = wrapProxy(proxy, pathname);
    }
    var proxyname = /^\/[^\/]+/.exec(pathname);
    if (proxyname && !(proxyname in urlProxyMap)) proxyname += '/';
    if (proxyname in urlProxyMap) {
        url = pathname.slice(proxyname.length);
        var proxy = urlProxyMap[proxyname];
        if (proxy instanceof Array) req.jump = proxy[1], proxy = proxy[0];
        url = wrapProxy(proxy, url, query);
        console.info(`Proxy: ${req.url} => ${url}`);
    }
    else {
        req.jump = false;
    }
    if (urlProxyMap[url]) {
        url = urlProxyMap[url];
        if (url instanceof Array) req.jump = url[1], url = url[0];
    }
    else req.jump = false;
    if (url !== req.url) {
        if (/^\/\//.test(url)) url = req.protocol + url;
    }
    return url;
}
module.exports = getProxyURL;