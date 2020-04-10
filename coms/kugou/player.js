var musicList = kugou$musicList;
var playState = kugou$playState;
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
    if (!$scope.audio && !kugou$musicList.active_hash) return;
    switch (event.keyCode || event.which) {
        case 32:
            if (event.repeat) break;
            if ($scope.playing) $scope.pause();
            else $scope.play();
            break;
        case 37:
            // left
            $scope.play($scope.index - 1);
            break;
        case 39:
            $scope.play($scope.index + 1);
            // right
            break;
        case 33:
        // page up
        case 38:
        case 13:// enter
            // up
            $scope.fullPage(true);
            break;

        case 34:
        // page down
        case 40:
            // down
            $scope.fullPage(false);
            break;
        case 221:
            // ]

            break;
        case 219:
            // [
            break;

        // default: console.log(event.keyCode);
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
    box.setAttribute("ng-class", "{play:playing===true,pause:playing===false,page:page,effect:effect}");
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
        $scope.currentTheta = ((currentTime * 6 + 90) % 180 - 90) / 180 * Math.PI;
        playState.width = (currentTime * 100 / duration).toFixed(2) + `%`;
        $scope.currentProcess = `width:` + playState.width;
        render.refresh();
    };
    bindtouch(box, function (value) {
        if (value) {
            this.touching = true;
            var { x } = value;
            var audio = box.$scope.audio;
            this.process(x / box.offsetWidth * audio.duration, audio.duration);
        }
        return { x: progress.offsetWidth };
    }, "x");
    bindtouch(box, function (value) {
        var top = getScreenPosition(box).top;
        if (value) {
            if (!this.deltaTop) {
                addClass(this, "dragging");
            }
            var { y } = value;
            if (y < 0) y = 0;
            if (window.innerHeight - y >= 80) {
                this.$scope.fullPage(true);
            } else {
                this.$scope.fullPage(false);
            }
            css(this, {
                transition: 'opacity .5s ease-out',
                height: fromOffset(window.innerHeight - y)
            });
            this.deltaTop = y - top;
        }
        return { y: getScreenPosition(box).top };
    }, 'y');
    moveupon(box, {
        start() {
        },
        end() {
            var currentHeight = calcPixel(this.offsetHeight), windowHeight = calcPixel(window.innerHeight);
            var $scope = this.$scope;
            var { deltaTop } = this;
            removeClass(this, "dragging");
            if (deltaTop) {
                this.deltaTop = 0;
                if (windowHeight - currentHeight <= 30) {
                    $scope.playing = !!$scope.playing;
                    $scope.fullPage(true);
                }
                else if (currentHeight <= 10 || currentHeight <= 50 && deltaTop > 0) {
                    $scope.playing = +$scope.playing;
                    removeClass(this, 'pause play page');
                    $scope.fullPage(false);
                }
                else if (currentHeight >= 50 && currentHeight <= 90 || currentHeight <= 50 && deltaTop < 0) {
                    $scope.fullPage(false);
                    $scope.page = false;
                    $scope.playing = !!$scope.playing;
                }
                else if (deltaTop < 0) {
                    $scope.playing = !!$scope.playing;
                    $scope.fullPage(true);
                }
                else if (deltaTop > 0) {
                    $scope.playing = !!$scope.playing;
                    $scope.fullPage(false);
                }
                render.refresh();
            }
            css(this, {
                transition: '',
                height: ''
            });
            if (!box.touching) return;
            var audio = $scope.audio;
            audio.currentTime = progress.offsetWidth * audio.duration / box.offsetWidth;
            this.touching = false;
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
    var backer = document.createElement("back");
    onremove(backer, function () {
        var $scope = box.$scope;
        $scope.page = false;
        render.refresh();
    });
    render(box, {
        btn: button,
        krc: kugou$krc,
        hash: '',
        currentTime: "00:00",
        info: {},
        effect: false,
        playing: null,
        page: false,
        source: [],
        canvas: kugou$dance,
        activeList: kugou$playList(),
        index: 0,
        effectPage(effect = !this.effect) {
            this.effect = effect;
        },
        fullPage(state = !this.page) {
            if (state) {
                rootElements.mount(backer);
                this.page = state;
            } else {
                rootElements.unmount(backer);
            }
        },
        pause() {
            this.playing = false;
            if (this.audio && this.audio.pause instanceof Function) this.audio.pause();
            render.refresh(box);
        },
        sbtn(elem) {
            button(elem);
            select(elem, this.activeList, null);
        },
        draw(buf) {
            buf = buf.map(a => a * 2 / 9 + 0.6);
            var width = freePixel(box.offsetWidth);
            var height = 72;
            var ratio = 1 / width * buf.length;
            var buf = [].map.call(buf, (y, i) => [i / buf.length, y]);
            var { sin, cos, abs } = Math;
            var { currentTheta } = this;
            if (box.offsetHeight <= calcPixel(80)) {
                var centerx = 44 / width, centery = .5;
                var start = 11 * ratio | 0, end = 77 * ratio | 0;
                for (var cx = start, dx = end; cx < dx; cx++) {
                    var [x, y] = buf[cx];
                    y -= 0.1;
                    if (currentTheta) {
                        x = (x - centerx) * width;
                        y = (y - centery) * height;
                        y = y * cos(x / 66 * Math.PI);
                        var x1 = cos(currentTheta) * x - sin(currentTheta) * y,
                            y1 = cos(currentTheta) * y + sin(currentTheta) * x;
                        buf[cx][0] = x1 / width + centerx;
                        buf[cx][1] = y1 / height + centery;
                    } else {
                        buf[cx][1] = y;
                    }
                }
                cast(this.dance, [{
                    data: buf.slice(0, start),
                }, {
                    data: buf.slice(start, end)
                }, {
                    data: buf.slice(end)
                }]);
            } else {
                if (this.dance) cast(this.dance, buf);
            }
        },
        play(hash = musicList.active_hash) {
            var isPlayback = typeof hash === "number";
            if (isPlayback) {
                if (hash < 0) {
                    hash = hash + musicList.length;
                }
                if (!musicList.length) return;
                if (hash >= musicList.length) {
                    hash = hash % musicList.length;
                }
                hash = musicList[hash];
                if (!hash) return;
                hash = hash.hash;
            }
            if (hash === musicList.active_hash && this.audio) {
                if (this.playing) return this.pause();
                this.playing = true;
                if (this.audio.play instanceof Function) this.audio.play();
                return;
            }
            if (!isPlayback) for (var cx = kugou$musicList.length - 1; cx >= 0; cx--) {
                if (kugou$musicList[cx].hash === hash) kugou$musicList.splice(cx, 1);
            }

            this.pause();

            /**
             * ios 只能由用户创建audio，所以请在用户触发的事件中调用play方法
             */
            this.playing = false;
            var _audio = document.createElement("audio");
            var hasContext = !/iPhone/.test(navigator.platform) && audio.Context;
            if (hasContext) {
                // ios设备目前未找到可视化方案
                var context = new AudioContext;
                var source = context.createMediaElementSource(_audio);
                var createScript = context.createScriptProcessor || context.createJavaScriptNode;
                var script = createScript.apply(context, [0, 2, 2]);
                var audioBuffer;
                var draw = lazy(_ => this.draw(audioBuffer), false);
                var last_id = -1;
                script.onaudioprocess = (e) => {
                    audioBuffer = audio.copyData(e);
                    if (this.audio !== _audio) {
                        script.onaudioprocess = null;
                        script.disconnect();
                        source.disconnect();
                    } else if (last_id !== _audio.currentTime) {
                        last_id = _audio.currentTime;
                        draw();
                    }
                };
                source.connect(script);
                script.connect(context.destination);

                this.source = source;
            }
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
            musicList.active_hash = hash;
            render.refresh();
            this.playing = true;

            getMusicInfo(hash).loading_promise.then((response) => {
                if (!this.playing) return;
                if (hash !== musicList.active_hash) return;
                if (response.imgUrl) {
                    response.avatar = response.imgUrl.replace(/\{size\}/ig, 200);
                    response.avatarUrl = `url('${response.avatar}')`;
                }
                var index = kugou$musicList.map(a => a.hash).indexOf(hash);
                var distlist = kugou$musicList.slice(0);
                distlist.forEach(function (info) {
                    delete info.activate;
                });
                if (index >= 0) {
                    this.index = index;
                    distlist.splice(index, 1, response);
                } else {
                    this.index = 0;
                    distlist.unshift(response);
                }
                response.hash = hash;
                response.activate = true;
                distlist.active_hash = hash;
                extend(this.info, response);
                cast(this.krcpad, response);
                _audio.onerror = e => {
                    alert.error("播放失败！");
                    if (this.audio === _audio) {
                        playState.error = true;
                    }
                };
                playState.width = 0;
                delete playState.error;
                _audio.src = hasContext ? cross.getCrossUrl(response.url) : response.url;
                _audio.play();
                data.setInstance('musicList', distlist, true);

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
