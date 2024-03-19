var devices = [];
var musics = [
    {
        kind: "websource",
        label: "花房姑娘",
        url: "https://sharefs.yun.kugou.com/202003060919/fa3c377688123a4ab831e7b71cc57cca/G010/M08/04/03/qoYBAFUPHRuAKf9eABJXel7fMJ4237.m4a"
    }
]
var { mediaDevices: _mediaDevices } = navigator;
var load = function () {
    _mediaDevices.enumerateDevices().then(function (devices1) {
        devices1 = devices1.filter(a => !/^(?:default|communications)$/.test(a.deviceId) && !/videoinput/.test(a.kind));;
        var mounted = {};
        devices.splice(0, devices.length).forEach(a => mounted[a.deviceId] = a);
        devices.push.apply(devices, devices1);
        devices.push.apply(devices, musics);
        devices.forEach(a => {
            var { deviceId } = a;
            var b = mounted[deviceId];
            a.volume = .5;
            if (b) {
                a.instance = b.instance;
                a.isRunning = b.isRunning;
                a.onprocess = b.onprocess;
                a.volume = b.volume || .5;
                if (a.instance) a.instance.device = a;
            }
        })
        render.digest();
    });
}
if (!_mediaDevices) {
    console.info(i18n`当前环境不支持mediaDevices！`);
} else {
    _mediaDevices.ondevicechange = load;
    load();
}
var activeDevice = null;
var setCursor = function (device) {
    activeDevice = device;
    css("*", "cursor:e-resize!important");
};
var cleanCursor = function () {
    activeDevice = null;
    css("*", {
        "cursor": null
    });
};
on("mousemove")(window, function (event) {
    if (event.which) return;
    var target = event.target;
    while (target) {
        if (/^device$/i.test(target.tagName)) {
            var deltaX = event.clientX - getScreenPosition(target).left;
            var { device } = target;
            if (device && device.isRunning) {
                if (Math.abs(calcPixel(device.volume * target.offsetWidth - deltaX)) < 7)
                    setCursor(device);
                else cleanCursor();
            } else {
                cleanCursor();
            }
            break;
        }
        target = target.parentNode;
    }
    if (!target) {
        cleanCursor();
    }

});

var context = new AudioContext;
var joinedStream = context.createChannelMerger(2);


function main(page) {
    if (!page) {
        page = view();
        page.innerHTML = mediaDevices;
    }
    var $scope = {
        devices,
        run(device) {
            var { Recorder, Monitor } = audio;
            if (activeDevice === device) return;
            if (!device.instance) {
                if (!device) return;
                device.context = context;
                switch (device.kind) {
                    case "audioinput":
                        var recoder = device.instance = new Recorder(device);
                        care(recoder, function (buffer) {
                            if (this.device) this.device.onprocess(buffer);
                        });
                        recoder.device = device;
                        break;
                    case "audiooutput":
                        var recoder = device.instance = new Monitor(device);
                        care(recoder, function (buffer) {
                            if (this.device) this.device.onprocess(buffer);
                        });
                        recoder.device = device;
                        break;
                    case "websource":
                        var recoder = device.instance = new audio.Source(device);
                        care(recoder, function (buffer) {
                            if (this.device) this.device.onprocess(buffer);
                        });
                        recoder.device = device;
                        break;
                }

            }
            var { instance } = device;
            if (device.isRunning) {
                instance.stop();
            } else {
                instance.start();
            }
            device.isRunning = !device.isRunning;
        },
        device(elem) {

            moveupon(elem, {
                start(event) {
                    if (activeDevice !== this.device) return;
                    this.device.dragevent = event;
                },
                move(event) {
                    var { device } = this;
                    if (!device.dragevent) return;
                    event.moveLocked = true;
                    var deltaX = event.clientX - device.dragevent.clientX;
                    var volume = device.volume;
                    volume += deltaX / this.offsetWidth;
                    if (!volume) volume = device.volume;
                    if (volume < 0) volume = 0;
                    if (volume > 1) volume = 1;
                    if (volume !== device.volume) {
                        device.dragevent = event;
                        device.volume = volume;
                    }
                },
                end() {
                    if (this.device.dragevent && this.device.dragevent.moveLocked) {
                        cleanCursor();
                    }
                    delete this.device.dragevent;
                }
            })
            return button(elem);
        },
        audioview(elem) {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            on("changes")(canvas, function ({ changes }) {
                var { device } = changes;
                if (!device) return;
                device = device.current;
                device.onprocess = function (buffer) {
                    if (canvas.width !== canvas.offsetWidth * devicePixelRatio) canvas.width = canvas.offsetWidth * devicePixelRatio;
                    if (canvas.height !== canvas.offsetHeight * devicePixelRatio) canvas.height = canvas.offsetHeight * devicePixelRatio;
                    context.clearRect(0, 0, 1024, 256);
                    context.beginPath();
                    context.strokeStyle = "rgba(60,180,255,1)";
                    context.lineWidth = devicePixelRatio;
                    var max = 2;
                    var v = this.volume * buffer.length - .5;
                    var x1 = 0, y1 = canvas.height / 2;
                    context.moveTo(x1, y1);
                    var ratio = canvas.width / buffer.length;
                    [].forEach.call(buffer, function (db, cx) {
                        var x = cx * ratio;
                        var y = canvas.height / 2 - db / max * canvas.height;
                        context.lineTo(x, y);
                        if (cx <= v && cx + 1 > v) {
                            context.stroke();
                            context.beginPath();
                        }
                    });
                    context.lineWidth = 1;
                    context.strokeStyle = "rgba(60,180,255,.6)";
                    context.stroke();
                    if (this === activeDevice) {
                        context.beginPath();
                        context.moveTo(v * ratio, 0);
                        context.lineTo(v * ratio, canvas.height);
                        context.lineWidth = 1;
                        context.strokeStyle = "#ffffff";
                        context.stroke();
                    }
                };
            })
            return canvas;
        }
    };
    render(page, $scope);
    return page;
}