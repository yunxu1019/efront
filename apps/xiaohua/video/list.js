var page = createVboxWithState(state);
page.innerHTML = list;
var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
var player = kugou$fxPlayer;
player.enableLog(false);

var scope = render(page, {
    videos: [
    ],
    encode(src) {
        return "/@/data-source/videos/01.mp4";
        return "/@/data/xiaohua/videos" + src.replace(/\.?[^\.]+$/, function (m) {
            passport = encode62.timeupdate(passport);
            return "!" + passport + m;
        });
    },
    img(e) {
        e.setAttritute("dragable", false);
        return e;
    },
    "a-video"(ele) {
        ele.id = "video-1";
        setTimeout(function(){
            player.init({
                'id': ele.id,
                'url': ele.src
            });
        });
        return video(ele);
        $(ele).jPlayer({
            ready: function () {
                console.log(ele, ele.src);
                $(this).jPlayer("setMedia", {
                    title: "小花专属",
                    m4v: ele.src,
                    poster: "images/cover.jpg"
                });

            },
            swfPath: "libs/jplayer/jplayer",
            supplied: "webmv, ogv, m4v",
            size: {
                width: "640px",
                height: "360px",
                cssClass: "jp-video-360p"
            },
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true,
            remainingDuration: true,
            toggleDuration: true
        });

        return ele;
    },
    list
});
function main() {
    api("/videos/_find", {
        selector: {
        },
        skip: 0,
        limit: 21,
        "sort": [{ 'year': "desc" }]
    }).success(function (data) {
        scope.videos = data.docs;
    });
    return page;
}