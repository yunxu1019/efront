var apiBase = `http://m.kugou.com/`;
var apiMap = {
    plist: {
        url: "plist/index",
        selector: ".panel-img-list>div>a",
        build(a) {
            var src = a.children[0].getAttribute("ssrc");
            var href = a.getAttribute("shref");
            return { src, href };
        }
    },
    songList: {
        url: "rank/list",
        selector: ".panel-songslist>div>a"
    },
    rank: {
        url: "rank/list",
        selector: ".panel-img-list>div>a",
        build(anchor) {
            var href = anchor.getAttribute("shref");
            var image = anchor.getElementsByTagName("img")[0].getAttribute("_src");
            var text = anchor.getElementsByTagName("p")[0].innerText.replace(/^\s*|\s*$/g, "");
            return {
                image,
                href,
                text
            };
        }
    },
    search: {
        url: `http://mobilecdn.kugou.com/api/v3/search/song`,
        params: parseKV("format=jsonp&keyword=&page=1&pagesize=30&showtype=1&callback=kgJSONP")
    },
};
function kgapi(obj, extra) {
    console.log(obj)
    var {
        url,
        selector,
        build,
        params = {}
    } = obj;
    if (extra instanceof Object) {
        params = extend(params, extra);
    }
    var xhr = cross("get", url);
    var decoder = function () {
        if (selector) {
            var sandbox = getSandbox(xhr);
            var data = sandbox.querySelector(selector);
        } else {
            var data = xhr.responseText || xhr.response;
        }
        if (build) {
            data = build(data);
        }
        return data;
    }
    xhr.decoder = decoder;
    return xhr;
}
for (var k in apiMap) {
    kgapi[k] = kgapi.bind(kgapi, apiMap[k]);
}
extend(kgapi, {
    fanxingList() {
        var url = `http://bjacshow.kugou.com/soa/followstar/m/listen?platform=1&pageNum=1&kugouId=627516233&from=1&version=9108&pageSize=8`;
        return cross("get", url);
    },

})

var kugouapi = kgapi;