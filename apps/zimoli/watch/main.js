titlebar("直播");
var page = div();
page.innerHTML = Main;
var scope = render(page, {
    videosrc: ''
});
var resize = function () {
    player.resize("fxplayer-box", page.clientWidth, page.clientWidth * .75);
};
onappend(page, function () {
    var offresize = on("resize")(window, resize);
    onremove(page, offresize);
});
onremove(page, function () {
    player.stopLive("fxplayer-box");
});
page.initialStyle = 'margin-left:100%;z-index:2';
var player = {
    init() { },
    stopLive() {
        var videoElement = page.getElementsByTagName("video")[0];
        videoElement.removeAttribute("src");
        videoElement.outterHTML = videoElement.outterHTML;
    },
    resize(_, width, height) {
        var videoElement = page.getElementsByTagName("video")[0];
        videoElement.width = width | 0;
        videoElement.height = height | 0;
    }
};
if (/iPhone|Android/.test(navigator.userAgent)) {
    var currentRequest;
    var main = function (params) {
        currentRequest && currentRequest.abort();
        var videoElement = page.getElementsByTagName("video")[0];
        videoElement.poster = params.imgPath;
        currentRequest = kugou$kugouapi.getStreamAddress(params).done(function (xhr) {
            var data = kugou$getJsonpData(xhr);
            videoElement.src = data.hls[+/Android/.test(navigator.userAgent)];
            resize();
        });
        videoElement.play();
        return page;
    };
} else {
    var currentRequest;
    remove(page.getElementsByTagName("video")[0]);
    var constructor = function (params) {
        currentRequest && currentRequest.abort();
        player.stopLive("fxplayer-box");
        currentRequest = kugou$kugouapi.fanxingRoom(params).done(function (xhr) {
            if (!page.isMounted) return;
            var data = kugou$getJsonpData(xhr);
            scope.videosrc = data.httpflv[0];
            player.init({
                id: "fxplayer-box",
                url: scope.videosrc
            });
            resize();
        });
        return page;
    }
    var main = new Promise(function (ok) {
        init('kugou$fxPlayer', function (kugou$fxPlayer) {
            player = kugou$fxPlayer;
            ok(constructor);
        })
    })
}