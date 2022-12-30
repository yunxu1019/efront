var musicList = kugou$musicList;
var playState = kugou$playState;
var playModes = kugou$playModes;
var playModeData = data.getInstance("play-mode");
var playList = kugou$playList();
var patchMusicInfo = async function (info) {
    var res = null, krc;
    switch (info.type) {
        case "qqjt":
            info.lrc = (await cross("get", info.lyric)).response;
            console.log(info)
            res = await data.from("qqjt-url", qqjc({
                TSID: info.id
            }))
            break;
        case "yyyy":
            res = await data.from("yyyy-url", yyyc.encode({
                ids: JSON.stringify([info.id]),
                csrf_token: '',
                level: "standard",
                encodeType: "aac"
            }));
            info.lrc = await data.from('yyyy-lrc', yyyc.encode({
                id: info.id,
                lv: 0,
                // tv: 0,
            }));
            info.singerName = info.singername;
            info.songName = info.songname;
            break;
        case "kuwo":
            res = await data.from("play-url", info);
            info.lrc = await data.from("kuwo-lrc", info, function (lrc) {
                return lrc.map(l => `[${l.time}]${l.lineLyric}`).join('\r\n');
            });
            info.avatar = info.pic;
            info.singerName = info.singername;
            info.songName = info.songname;
            break;
        case "kugo":
        default:
            res = await data.from("song-info", info);
            krc = await data.from("search-krc", res);
            krc = await data.from("download-krc", krc);
            info.krc = fromBase64(krc);
            if (res.fail_process === 12) res.priced = true;
            if (res.imgUrl) {
                res.avatar = res.imgUrl.replace(/\{size\}/ig, 200);
            }
            break;
    }
    Object.assign(info, res);
    if (info.avatar) info.avatarUrl = `url('${info.avatar}')`;
    return info;
};
var getLrc = function () {
    return `https://m.kugou.com/app/i/krc.php?cmd=100&keyword=%E9%99%88%E6%98%9F%E3%80%81%E5%BC%A0%E7%BF%94%E8%BD%A9%20-%20%E5%86%B3%E4%B8%8D%E5%9B%9E%E5%A4%B4&hash=77AFF2715498A86AA28AC2DAA29C3FEB&timelength=280000&d=0.2984004589282503`;
};
var getSingerAvatar = function () {
    return `https://tools.mobile.kugou.com/api/v1/singer_header/get_by_hash?hash=77AFF2715498A86AA28AC2DAA29C3FEB&size=200&format=jsonp&callback=kgJSONP857041635`;
};
var oncanplay = on("canplay"), ondataloaded = on("loadeddata");

on("keydown")(window, function (event) {
    var { target } = event;
    if (/^(input|select|textarea)$/i.test(target.tagName)) return;
    var $scope = player.$scope;
    if (!$scope.audio && !kugou$musicList.getActived()) return;
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
var backer = document.createElement("back");
onremove(backer, function () {
    $scope.page = false;
    render.refresh();
});
var analyser;
var $scope = {
    btn: button,
    krc: kugou$krc,
    hash: '',
    currentTime: "00:00",
    info: {},
    effect: false,
    playing: null,
    page: false,
    currentProcess: null,
    currentRotate: 0,
    totalTime: 0,
    canvas: kugou$dance,
    activeList: playList,
    index: 0,
    get songName() {
        return this.info.singername || this.info.singerName;
    },
    get singerName() {
        return this.info.songname || this.info.songName;
    },
    update() {
        if (touching) return;
        let _audio = $scope.audio;
        if ($scope.process(_audio.currentTime, _audio.duration) === false) {
            var index = playModes[playModeData.index || 0].next($scope.index);
            $scope.play(index);
            return;
        }
    },
    process(currentTime, duration) {
        render.refresh();
        if (currentTime === duration) {
            $scope.pause();
            return false;
        }
        if (currentTime > duration) {
            currentTime = duration;
        }
        var krcpad = $scope.krcpad;
        if (krcpad && krcpad.process instanceof Function) {
            krcpad.process(currentTime, duration);
        }
        $scope.currentTime = filterTime(currentTime, duration);
        $scope.totalTime = filterTime(duration, duration);
        $scope.currentRotate = `rotate(${currentTime * 6}deg)`;
        $scope.currentTheta = ((currentTime * 6 + 90) % 180 - 90) / 180 * Math.PI;
        playState.width = (currentTime * 100 / duration).toFixed(2) + `%`;
        $scope.currentProcess = `width:` + playState.width;
    },
    effectPage(effect = !$scope.effect) {
        $scope.effect = effect;
    },
    fullPage(state = !$scope.page) {
        if (state) {
            rootElements.mount(backer);
            $scope.page = state;
        } else {
            rootElements.unmount(backer);
        }
    },
    pause(inc) {
        if (inc !== false) ++this.playid;
        $scope.playing = false;
        let _audio = $scope.audio;
        ns.disable();
        if (_audio && _audio.pause instanceof Function) _audio.pause();
        render.refresh();
    },
    sbtn(elem) {
        button(elem);
        select(elem, $scope.activeList, null);
    },
    draw(buf) {
        if (!player || !player.offsetHeight || !$scope.dance) return;
        buf = Array.prototype.map.call(buf, a => (a / 128.0 - 1) * 2 / 9 + 0.6);
        var width = freePixel(player.offsetWidth);
        var height = 72;
        var ratio = 1 / width * buf.length;
        var buf = Array.prototype.map.call(buf, (y, i) => [i / buf.length, y]);
        var { sin, cos } = Math;
        var { currentTheta } = $scope;
        if (player.offsetHeight <= calcPixel(80)) {
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
            cast($scope.dance, [{
                data: buf.slice(0, start),
            }, {
                data: buf.slice(start, end)
            }, {
                data: buf.slice(end)
            }]);
        } else {
            cast($scope.dance, buf);
        }
    },
    playid: 0,
    play(music = musicList.getActived()) {
        var playid = ++this.playid;
        render.refresh();
        var isPlayback = typeof music === "number";
        if (isPlayback) {
            if (music < 0) {
                music = music + musicList.length;
            }
            if (!musicList.length) return;
            if (music >= musicList.length) {
                music = music % musicList.length;
            }
            music = musicList[music];
            if (!music) return;
        }
        if (musicList.isActived(music) && $scope.audio) {
            if ($scope.playing) return $scope.pause();
            $scope.playing = true;
            let _audio = $scope.audio;
            if (_audio.play instanceof Function) {
                if (ns.wake) ns.enable();
                _audio.play();
            }
            return;
        }
        if (!isPlayback) musicList.remove(music);

        $scope.pause(false);

        /**
         * ios 只能由用户创建audio，所以请在用户触发的事件中调用play方法
        */
        $scope.playing = false;
        /**
         * @type {HTMLAudioElement}
         */
        var _audio = document.createElement("audio");
        _audio.onended = function () {
            ns.disable();
        };
        if (hasContext) {
            // ios设备目前未找到可视化方案
            var context = new AudioContext;
            var source = context.createMediaElementSource(_audio);
            analyser = context.createAnalyser();
            analyser.fftSize = dancingArray.length;
            source.connect(analyser);
            _audio.crossOrigin = "anonymous";
            source.crossOrigin = 'anonymous';
            source.connect(context.destination);
        }
        if (_audio.play) {
            _audio.ontimeupdate = $scope.update;
            if (ns.wake) ns.enable();
            _audio.play();//安卓4以上的播放功能要在用户事件中调用;
        } else {
            // <embed id="a_player_ie8" type="audio/mpeg" src="a.mp3" autostart="false"></embed>
            _audio = document.createElement("embed");
            _audio.type = "audio/mpeg";
            _audio.autostart = true;
            return alert("暂不支持在您的浏览器中播放！");
        }
        musicList.setActive(music);
        $scope.playing = true;
        playState.width = 0;
        patchMusicInfo(music).then((response) => {
            if (playid !== this.playid) return;
            if (!this.playing) return;
            if (!musicList.isActived(music)) return;
            var index = kugou$musicList.indexOf(music);
            var distlist = kugou$musicList.slice(0);
            distlist.forEach(function (info) {
                delete info.activate;
            });
            if (index >= 0) {
                $scope.index = index;
                distlist.splice(index, 1, response);
            } else {
                $scope.index = 0;
                distlist.unshift(response);
            }
            response.activate = true;
            extend($scope.info, response);
            cast($scope.krcpad, response);
            _audio.onerror = e => {
                alert.error("播放失败！");
                if ($scope.audio === _audio) {
                    playState.error = true;
                }
                if (ns) ns.disable();
            };
            delete playState.error;
            if (ns.wake) ns.enable();
            _audio.src = hasContext ? cross.getCrossUrl(response.url) : response.url;
            _audio.play();
            data.setInstance('musicList', distlist, true);
            render.refresh();
        }).catch(e => playState.error = true);
        $scope.audio = _audio;
    }
};
var Uint8Array = window.Uint8Array;
var hasContext = AudioContext && Uint8Array;
if (hasContext) {
    var dancingArray = new Uint8Array(2048);
    var animate = function () {
        if (analyser) {
            analyser.getByteTimeDomainData(dancingArray);
            // console.log(dancingArray);
            $scope.draw(dancingArray);
        }
        requestAnimationFrame(animate);
    };
    animate();
}

playList.play = index => $scope.play(index);
var touching = false;
var createControls = function () {
    var player = document.createElement("music-player");
    player.setAttribute("ng-class", "{play:playing===true,pause:playing===false,page:page,effect:effect}");
    player.innerHTML = Player;
    var [, progress] = player.children;
    bindtouch(player, function (_, event) {
        touching = true;
        var x = event.clientX - getScreenPosition(player).left;
        let _audio = $scope.audio
        css(progress, { width: x });
        $scope.process(x / player.offsetWidth * _audio.duration, _audio.duration);
    }, "x");
    bindtouch(player, function (value) {
        var top = getScreenPosition(player).top;
        if (value) {
            if (!this.deltaTop) {
                addClass(this, "dragging");
            }
            var { y } = value;
            if (y < 0) y = 0;
            if (window.innerHeight - y >= 80) {
                $scope.fullPage(true);
            } else {
                $scope.fullPage(false);
            }
            css(this, {
                transition: 'opacity .5s ease-out',
                height: fromOffset(window.innerHeight - y)
            });
            this.deltaTop = y - top;
        }
        return { y: getScreenPosition(player).top };
    }, 'y');
    moveupon(player, {
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
            if (!touching) return;
            let _audio = $scope.audio;
            _audio.currentTime = progress.offsetWidth * _audio.duration / player.offsetWidth;
            touching = false;
        }
    });
    return player;
};
var ns = new thirdParty$NoSleep;
data.bindInstance("play-mode", function (e) {
    if (e.wake) {
        ns.wake = true;
        if ($scope.playing) {
            $scope.pause();
            $scope.play();
        }
    }
    else if (ns) {
        ns.wake = false;
        ns.disable();
    }
});

var player = function (player) {
    render(player, $scope);
    player.play = function (hash) {
        $scope.play(hash);
    };
    player.pause = function () {
        $scope.pause();
    };
    appendChild.before(document.body, player);
    return player;
}(createControls());
