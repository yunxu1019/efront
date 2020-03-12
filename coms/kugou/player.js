var getMusicInfo = function (hash) {
    return data.from("song-info", { hash });
};
var getLrc = function () {
    return `http://m.kugou.com/app/i/krc.php?cmd=100&keyword=%E9%99%88%E6%98%9F%E3%80%81%E5%BC%A0%E7%BF%94%E8%BD%A9%20-%20%E5%86%B3%E4%B8%8D%E5%9B%9E%E5%A4%B4&hash=77AFF2715498A86AA28AC2DAA29C3FEB&timelength=280000&d=0.2984004589282503`;
};
var getSingerAvatar = function () {
    return `http://tools.mobile.kugou.com/api/v1/singer_header/get_by_hash?hash=77AFF2715498A86AA28AC2DAA29C3FEB&size=200&format=jsonp&callback=kgJSONP857041635`;
};
var oncanplay = on("canplay"), ondataloaded = on("loadeddata");

on("keydown")(window, function (event) {
    var { target } = event;
    if (/^(input|select|textarea)$/i.test(target.tagName)) return;
    var $scope = player.$scope;
    if (!$scope.audio) return;
    switch (event.keyCode || event.which) {
        case 32:
            if (event.repeat) break;
            if ($scope.playing) $scope.pause();
            else $scope.play();
            break;
        case 37:
            // left
            break;
        case 39:
            // right
            break;
        case 33:
        // page up
        case 38:
        case 13:// enter
            // up
            $scope.page = true;
            break;
        case 27:// esc
            if ($scope.activeList) {
                var elem = $scope.activeList;
                if (elem.parentNode) {
                    remove(elem);
                    break;
                }
            }
        case 34:
        // page down
        case 40:
            // down
            $scope.page = false;
            break;
        case 221:
            // ]

            break;
        case 219:
            // [
            break;

        default: console.log(event.keyCode);
    }
});
var fixTime = time => (time < 10 ? '0' : '') + (time | 0) % 60;
var filterTime = function (a, t) {
    if (a > t) a = t;
    var res = [];
    while (t > 1) {
        res.unshift(a % 60);
        a = a / 60 | 0;
        t = t / 60 | 0;
    }
    return res.map(fixTime).join(":");
};
var createControls = function () {
    var box = createWithClass(div, "player-box");
    box.setAttribute("ng-class", "{play:playing,pause:!playing,page:page}");
    box.innerHTML = Player;
    var [background, progress] = box.children;

    box.process = function (currentTime, duration) {
        if (currentTime === duration) {
            box.pause();
            return false;
        }
        if (currentTime > duration) {
            currentTime = duration;
        }
        var $scope = box.$scope;
        if ($scope && $scope.krcpad && $scope.krcpad.process instanceof Function) {
            $scope.krcpad.process(currentTime, duration);
        }
        $scope.currentTime = filterTime(currentTime, duration);
        $scope.totalTime = filterTime(duration, duration);
        $scope.currentRotate = `rotate(${currentTime * 6}deg)`;
        $scope.currentProcess = `width:${(currentTime * 100 / duration).toFixed(2)}%;`;
        render.refresh();
    };
    bindtouch(box, function (value) {
        if (value) {
            box.touching = true;
            var { x } = value;
            var audio = box.$scope.audio;
            box.process(x / box.offsetWidth * audio.duration, audio.duration);
        }
        return { x: progress.offsetWidth };
    });
    moveupon(box, {
        start() {
        },
        end() {
            if (!box.touching) return;
            var audio = this.$scope.audio;
            audio.currentTime = progress.offsetWidth * audio.duration / box.offsetWidth;
            box.touching = false;
        }
    });
    appendChild.before(document.body, box);
    return box;
};
var player = function (box = div()) {
    var updater = function () {
        if (box.process instanceof Function && !box.touching) {
            var audio = box.$scope.audio;
            if (box.process(audio.currentTime, audio.duration) === false) {
                return;
            }
        }
    };
    render(box, {
        btn: button,
        krc: kugou$krc,
        hash: '',
        currentTime: "00:00",
        info: {},
        page: false,
        source: [],
        canvas: dance,
        fullPage() {
            this.page = !this.page;
        },
        pause() {
            this.playing = false;
            if (this.audio && this.audio.pause instanceof Function) this.audio.pause();
        },
        playList() {
            if (!this.activeList) {
                this.activeList = kugou$playList();
            }
            var list = this.activeList;
            if (!list.parentNode) popup(list);
            else remove(list);
        },
        draw(buf) {
            if (box.offsetHeight <= calcPixel(80)) {
                var ratio = 1 / box.offsetWidth * buf.length;
                for (var cx = calcPixel(11) * ratio | 0, dx = calcPixel(77) * ratio | 0; cx < dx; cx++) {
                    buf[cx] += 0.3333;
                }
            }
            if (this.dance) cast(this.dance, buf);
        },
        play(hash = this.hash) {
            if (this.playCss) this.playCss();
            if (hash === this.hash) {
                if (this.playing) return;
                this.playing = true;
                if (this.audio && this.audio.play instanceof Function) this.audio.play();
                return;
            }
            this.hash = hash;
            box.pause();
            /**
             * ios 只能由用户创建audio，所以请在用户触发的事件中调用play方法
             */
            this.playing = false;
            var _audio = document.createElement("audio");
            if (_audio.play) {
                _audio.ontimeupdate = updater;
                _audio.play();//安卓4以上的播放功能要在用户事件中调用;
            } else {
                // <embed id="a_player_ie8" type="audio/mpeg" src="a.mp3" autostart="false"></embed>
                _audio = document.createElement("embed");
                _audio.type = "audio/mpeg";
                _audio.autostart = true;
                return alert("暂不支持在您的浏览器中播放！");
            }
            getMusicInfo(hash).loading_promise.then((data) => {
                if (hash !== this.hash) return;
                if (data.imgUrl) {
                    data.avatar = data.imgUrl.replace(/\{size\}/ig, 200);
                    data.avatarUrl = `url('${data.avatar}')`;
                }
                var index = kugou$musicList.map(a => a.hash).indexOf(hash);
                if (index >= 0) {
                    kugou$musicList.splice(index, 1);
                }
                data.hash = hash;
                kugou$musicList.unshift(data);

                extend(this.info, data);
                cast(this.krcpad, data);
                _audio.src = cross.getCrossUrl(data.url);

                if (AudioContext) {
                    var context = new AudioContext;
                    var source = context.createMediaElementSource(_audio);
                    var createScript = context.createScriptProcessor || context.createJavaScriptNode;
                    var script = createScript.apply(context, [0, 2, 2]);
                    script.onaudioprocess = (e) => {
                        if (this.audio !== _audio) {
                            script.onaudioprocess = null;
                            script.disconnect();
                            source.disconnect();
                        }
                        var buf = audio.copyData(e);
                        this.draw(buf);
                    };
                    source.connect(script);
                    script.connect(context.destination);
                    this.source = source;
                }
                this.playing = true;
                render.refresh();
            });
            this.audio = _audio;
        }
    });
    box.play = function (hash) {
        this.$scope.play(hash);
    };
    box.pause = function () {
        this.$scope.pause();
    };
    return box;
}(createControls());

// krc_test();
