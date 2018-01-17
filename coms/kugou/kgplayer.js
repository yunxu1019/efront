var getMusicInfo = function (hash) {
    return cross("get", `http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}&from=mkugou`);
};
var getLrc = function () {
    `http://m.kugou.com/app/i/krc.php?cmd=100&keyword=%E9%99%88%E6%98%9F%E3%80%81%E5%BC%A0%E7%BF%94%E8%BD%A9%20-%20%E5%86%B3%E4%B8%8D%E5%9B%9E%E5%A4%B4&hash=77AFF2715498A86AA28AC2DAA29C3FEB&timelength=280000&d=0.2984004589282503`;
};
var getSingerAvatar = function () {
    `http://tools.mobile.kugou.com/api/v1/singer_header/get_by_hash?hash=77AFF2715498A86AA28AC2DAA29C3FEB&size=200&format=jsonp&callback=kgJSONP857041635`;
};
var oncanplay = on("canplay"), ondataloaded = on("loadeddata");

var createControls = function () {
    var box = createWithClass(div, "player-box");
    var play = createWithClass(div, "play");
    var next = createWithClass(div, "next");
    var prev = createWithClass(div, "prev");
    var song = createWithClass(div, "song");
    var singer = createWithClass(div, "singer");
    var info = createWithClass(div, "info");
    appendChild(info, song, singer);
    var avatar = createWithClass(div, "avatar");
    appendChild(box, avatar, info, play, next);
    onclick(play, function () {
        if (box.playing) {
            removeClass(play, "pause");
            addClass(play, "play");
            box.pause();
        } else {
            removeClass(play, "play");
            addClass(play, "pause");
            box.play();
        }
    })
    box.apply = function (data) {
        text(singer, data.choricSinger);
        text(song, data.songName)
        css(avatar, {
            backgroundImage: `url('${data.imgUrl.replace(/\{size\}/g, 200)}')`
        });
    };
    box.reset = function () {
        removeClass(play, "play");
        addClass(play, "pause");
        if (!box.parentNode) {
            appendChild(document.body, box);
        }
    };
    return box;
};
var kgplayer = function (box = div()) {

    box.playing = false;
    box.play = function (hash = this.hash) {
        if (hash === this.hash) {
            if (this.playing) return;
            this.audio.play();
            this.playing = true;
            return;
        }
        box.pause();
        box.reset();
        /**
         * ios 只能由用户创建audio，所以请在用户触发的事件中调用play方法
         */
        box.playing = true;
        var audio = document.createElement("audio");
        getMusicInfo(hash).done(function (xhr) {
            var data = JSON.parse(xhr.responseText);
            box.apply(data);
            audio.src = data.url;
        });
        audio.play();//安卓4以上的播放功能要在用户事件中调用;
        this.audio = audio;
    };
    box.pause = function () {
        this.audio && this.audio.pause();
        this.playing = false;
    };
    return box;
}(createControls());