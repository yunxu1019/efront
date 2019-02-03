titlebar("直播");
var page = div();
page.innerHTML = Main;
var scope = render(page, {
    videosrc: ''
});
var resize = function () {
    kugou$fxPlayer.resize("fxplayer-box", page.clientWidth, page.clientHeight);
};
onappend(page, function () {
    var offresize = on("resize")(window, resize);
    onremove(page, offresize);
});
var currentRequest;
function main(params) {
    currentRequest && currentRequest.abort();
    kugou$fxPlayer.stopLive("fxplayer-box");
    currentRequest = kugou$kugouapi.fanxingRoom(params).done(function (xhr) {
        if (!page.isMounted) return;
        var data = kugou$getJsonpData(xhr);
        scope.videosrc = data.httpflv[0];
        kugou$fxPlayer.init({
            id: "fxplayer-box",
            url: scope.videosrc
        });
        resize();
    });
    return page;
}