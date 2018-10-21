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
    var track = createWithClass(div, "track");
    var progress = createWithClass(div, "progress");
    var background = createWithClass(div, "background");
    progress.innerHTML = "<div class=track></div><div class=avatar></div>";
    appendChild(info, song, singer);
    var avatar = createWithClass(div, "avatar");
    appendChild(box, background, progress, track, avatar, info, play, next);
    var pauseCss = function () {
        removeClass(box, "play");
        addClass(box, "pause");
    };
    var playCss = function () {
        removeClass(box, "pause");
        addClass(box, "play");
    };
    onclick(play, function () {
        if (box.playing) {
            box.pause();
        } else {
            box.play();
        }
    });
    var player_page = false;
    onclick(box, function () {
        player_page = !player_page;
        if (player_page) {
            addClass(box, "page");
        } else {
            removeClass(box, "page");
        }
    });

    box.pauseCss = pauseCss;
    box.playCss = playCss;
    box.apply = function (data) {
        text(singer, data.choricSinger);
        text(song, data.songName)
        css(avatar, {
            backgroundImage: `url('${data.imgUrl.replace(/\{size\}/g, 200)}')`
        });
        css(background, {
            backgroundImage: `url('${data.imgUrl.replace(/\{size\}/g, 200)}')`
        })
    };
    box.reset = function () {
        playCss();
    };
    box.process = function (currentTime, duration) {
        if (currentTime === duration) {
            box.pause();
            return false;
        }
        if (krc_pad && krc_pad.process instanceof Function) {
            krc_pad.process(currentTime, duration);
        }
        css(avatar, `transform:rotate(${currentTime * 6}deg);-webkit-transform:rotate(${currentTime * 6}deg);`);
        css(progress, `width:${(currentTime * 100 / duration)}%;`);
    };
    bindtouch(box, function (value) {
        if (value) {
            var { x } = value;
            var audio = box.audio;
            box.process(x / box.offsetWidth * audio.duration, audio.duration);
        }
        return { x: progress.offsetWidth };
    });
    box.onmovestart = function () {
        box.pause();
    };
    box.onmoveend = function () {
        var audio = box.audio;
        audio.currentTime = progress.offsetWidth * audio.duration / box.offsetWidth
        box.play();
    };
    if (document.body.children.length) {
        appendChild.before(document.body.children[0], box);
    } else {
        appendChild(document.body, box);
    }
    var krc_pad;
    box.krc = function (data) {
        remove(krc_pad);
        krc_pad = kugou$krc(data);
        addClass(krc_pad, "krc")
        appendChild(box, krc_pad);
    };
    return box;
};
var player = function (box = div()) {
    box.playing = false;
    var timer = 0;
    var updater = function () {
        if (box.process instanceof Function) {
            if (box.process(box.audio.currentTime, box.audio.duration) == false) {
                return;
            };
        }
        timer = requestAnimationFrame(updater);
    };

    box.play = function (hash = this.hash) {
        this.playCss && this.playCss();
        cancelAnimationFrame(timer);
        if (hash === this.hash) {
            if (this.playing) return;
            this.audio.play();
            this.playing = true;
            timer = requestAnimationFrame(updater);
            return;
        }
        box.pause();
        box.reset();
        /**
         * ios 只能由用户创建audio，所以请在用户触发的事件中调用play方法
         */
        box.playing = true;
        var audio = document.createElement("audio");
        if (audio.play) {
            audio.play();//安卓4以上的播放功能要在用户事件中调用;
        } else {
            // <embed id="a_player_ie8" type="audio/mpeg" src="a.mp3" autostart="false"></embed>
            audio = document.createElement("embed");
            audio.type = "audio/mpeg";
            audio.autostart = true;
            return alert("暂不支持在您的浏览器中播放！");
        }
        getMusicInfo(hash).done(function (xhr) {
            var data = JSON.parse(xhr.responseText);
            box.apply(data);
            box.krc(data);
            audio.src = data.url;
        });
        this.audio = audio;
        timer = requestAnimationFrame(updater);
    };
    box.pause = function () {
        cancelAnimationFrame(timer);
        this.audio && this.audio.pause && this.audio.pause();
        this.playing = false;
        this.pauseCss && this.pauseCss();
    };
    return box;
}(createControls());

// krc_test();
