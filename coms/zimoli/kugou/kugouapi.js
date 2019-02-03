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
        // var url = `http://bjacshow.kugou.com/soa/followstar/m/listen?platform=1&pageNum=1&kugouId=627516233&from=1&version=9108&pageSize=8`;
        var url = `http://gzacshow.kugou.com/mfx-listenindex/mo/liveAndVideo?${serialize({
            appid: 1000,
            channel: 1008,
            device: "b9b94ac322a5b4c028ad8c515478a5299ecd48bb",
            isDown: 0,
            kugouId: 627516233,
            livePage: 1,
            platform: 2,
            sign: "00b405ad75da69fb",
            std_plat: 6,
            token: "bb0bfed40c0b45c2504fba8bd9d782b340d03c96b036e1efa53c812bf61cec16",
            version: 9118,
            videoPage: 0
        })}`;
        return cross("get", url);
    },
    fanxingRoom({ roomId }) {
        // var urlPC = `http://fanxing.kugou.com/${roomId}`;
        // var urlMobile = `http://mfanxing.kugou.com/staticPub/rmobile/sharePage/normalRoom/views/index.html?roomId=${roomId}`;
        var url = `https://fx1.service.kugou.com/video/pc/live/pull/v1/streamaddr.jsonp?${serialize({
            roomId,
            ch: "fx",
            version: "1.0",
            streamType: "1-2-3",
            platform: 7,
            ua: "fx-flash",
            kugouId: 0,
            layout: 1,
            _: +new Date(),
            jsonpcallback: 'jsonphttpsfx1servicekugoucomvideopclivepullv1streamaddrjsonproomId1312839chfxversion10streamType123platform7uafxflashkugouId0layout11549204845914jsonpcallback'

        })}`;
        return cross('get', url);
    }

})

var kugouapi = kgapi;