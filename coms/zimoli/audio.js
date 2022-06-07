var alertError = alert.bind(null, 'error');

var reportError = function (error) {
    switch (error.code || error.name) {
        case 'PERMISSION_DENIED':
        case 'PermissionDeniedError':
            alertError('用户拒绝提供信息。');
            break;
        case 'NOT_SUPPORTED_ERROR':
        case 'NotSupportedError':
            alertError('浏览器不支持硬件设备。');
            break;
        case 'MANDATORY_UNSATISFIED_ERROR':
        case 'MandatoryUnsatisfiedError':
            alertError('无法发现指定的硬件设备。');
            break;
        default:
            console.warn(error);
            alertError(`[${error.code}:${error.name}] 无法打开设备。`);
            break;
    }
};

function init(type) {
    if (!this.audioPromise) {
        this.audioPromise = navigator.mediaDevices.getUserMedia({
            audio: { deviceId: this.deviceId }
        }).then(async (stream) => {
            var context = new AudioContext;
            this.gain = context.createGain();
            var analyser = context.createAnalyser();
            analyser.fftSize = 2048;
            context.resume();
            var source = context.createMediaStreamSource(stream);
            if (/^f/i.test(type)) {
                this.dancingArray = new Float32Array(analyser.fftSize);
                this.getTimeDomainData = analyser.getFloatTimeDomainData;
                this.getFrequencyData = analyser.getFloatFrequencyData;
            } else {
                this.dancingArray = new Uint8Array(analyser.fftSize);
                this.getTimeDomainData = analyser.getByteTimeDomainData;
                this.getFrequencyData = analyser.getByteFrequencyData;
            }
            this.maxDecibels = analyser.maxDecibels;
            this.minDecibels = analyser.minDecibels;
            return [source, context, analyser];
        });
    }
    return this.audioPromise;
}

async function stop() {
    var commandCount = ++this.commandCount;
    if (!this.running) return;
    var [source, context, analyser] = await this.init();
    cancelAnimationFrame(analyser.frame);
    if (this.commandCount !== commandCount) return;
    this.running = false;
    source.disconnect(analyser);
    if (this.gain) {
        source.disconnect(this.gain);
        this.gain.disconnect(context.destination);
    } else {
        source.disconnect(context.destination);
    }
    this.context = null;
    this.audioPromise = null;
    this.gain = null;
    context.suspend();
    await context.close();
    if (this.audio) this.audio.pause();
}

async function start() {
    if (this.running) return;
    var commandCount = ++this.commandCount;
    try {
        var [source, context, analyser] = await this.init();
    } catch (e) {
        reportError(e);
    }
    if (commandCount !== this.commandCount) return;
    this.context = context;
    var dancingArray = this.dancingArray;
    var animate = () => {
        this.getTimeDomainData.call(analyser, dancingArray);
        cast(this, dancingArray);
        analyser.frame = requestAnimationFrame(animate);
        this.onprocess instanceof Function && this.onprocess(dancingArray);
    };
    animate();
    this.running = true;

    source.connect(analyser);
    source.connect(this.gain).connect(context.destination);
    if (this.audio) this.audio.play();
}

class Source {
    running = false;
    audioPromise;
    commandCount = 0;
    onprocess;
    context;
    url;
    audio;
    gain;

    constructor(device) {
        this.url = device.url;
    }
    init() {
        if (this.audioPromise) return this.audioPromise;
        var context = new AudioContext;
        var audio = document.createElement("audio");
        this.gain = context.createGain();
        console.log(this.gain);
        audio.src = cross.getCrossUrl(this.url);
        this.audio = audio;
        var source = context.createMediaElementSource(audio);
        var createScript = context.createScriptProcessor || context.createJavaScriptNode;
        var recorder = createScript.apply(context, [0, 1, 1]);

        return this.audioPromise = Promise.resolve([recorder, source, context]);
    }
}
Source.prototype.start = start;
Source.prototype.stop = stop;

class Recorder {
    running = false;
    hasMicrophone = navigator.getUserMedia instanceof Function;
    audioPromise;
    commandCount = 0;
    onprocess;
    context;
    workletUrl;
    workletName;
    constructor(device) {
        if (!device) device = {};
        var config = {
            deviceId: device.deviceId,
            sampleBits: device.sampleBits,
            sampleRate: device.sampleRate,
            context: device.context
        };
        config.sampleBits = config.sampleBits || 16;      //采样数位 8, 16
        config.sampleRate = config.sampleRate || (44100 / 6);   //采样率(1/6 44100)

        extend(this, config);
    }
}
Recorder.prototype.init = init;
Recorder.prototype.start = start;
Recorder.prototype.stop = stop;

class Monitor {
    running = false;
    context;
    commandCount = 0;
    constructor(device) {
        if (!device) device = {};
        var config = {
            deviceId: device.deviceId,
            context: device.context
        };
        extend(this, config);

    }
}
Monitor.prototype.init = init;
Monitor.prototype.start = start;
Monitor.prototype.stop = stop;

var audio = {
    Recorder,
    Monitor,
    Source,
    Context: AudioContext,
    getRecorder() {
        return new Recorder
    },
};