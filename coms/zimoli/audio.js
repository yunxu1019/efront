var alertError = alert.bind(null, 'error');
var Context = window.webkitAudioContext || window.AudioContext;
var globalContext = Context && new Context;

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

function init() {
    if (!this.audioPromise) {
        this.audioPromise = new Promise((ok, oh) => {
            navigator.mediaDevices.getUserMedia({
                audio: { deviceId: this.deviceId }
            }).then(ok).catch(oh);
        }).then((stream) => {
            var context = new Context;
            this.gain = context.createGain();
            context.resume();
            var audioInput = context.createMediaStreamSource(stream);
            var createScript = context.createScriptProcessor || context.createJavaScriptNode;
            var recorder = createScript.apply(context, [0, 1, 1]);
            return [recorder, audioInput, context];
        });
    }
    return this.audioPromise;
}

async function stop() {
    var commandCount = ++this.commandCount;
    if (!this.running) return;
    var [recorder, audioInput, context] = await this.init();
    if (this.commandCount !== commandCount) return;
    this.running = false;
    if (this.gain) {
        recorder.disconnect(this.gain);
        this.gain.disconnect(context.destination);
    } else {
        recorder.disconnect(context.destination);
    }
    audioInput.disconnect(context.recorder);
    if (this.audio) this.audio.pause();

}

async function start() {
    if (this.running) return;
    var commandCount = ++this.commandCount;
    try {
        var [recorder, audioInput, context] = await this.init();
    } catch (e) {
        reportError(e);
    }
    if (commandCount !== this.commandCount) return;
    this.context = context;
    recorder.onaudioprocess = (e) => {
        var buffer = copyData(e);
        cast(this, buffer);
        this.onprocess instanceof Function && this.onprocess(buffer);
    };
    this.running = true;
    audioInput.connect(recorder);
    recorder.connect(this.gain).connect(context.destination);
    if (this.audio) this.audio.play();
}

function copyData(audioProcessingEvent) {
    // The input buffer is the song we loaded earlier
    var inputBuffer = audioProcessingEvent.inputBuffer;

    // The output buffer contains the samples that will be modified and played
    var outputBuffer = audioProcessingEvent.outputBuffer;
    var distBuffer = [];
    // Loop through the output channels (in this case there is only one)
    var { numberOfChannels } = inputBuffer;
    for (var channel = 0; channel < numberOfChannels; channel++) {
        var inputData = inputBuffer.getChannelData(channel);
        var outputData = outputBuffer.getChannelData(channel);

        // Loop through the 4096 samples
        for (var cx = 0, dx = inputData.length; cx < dx; cx++) {
            // make output equal to the same as the input
            outputData[cx] = inputData[cx];
            if (!distBuffer[cx]) distBuffer[cx] = inputData[cx];
            else distBuffer[cx] += inputData[cx];

            // add noise to each output sample
            // outputData[cx] += ((Math.random() * 2) - 1) * 0.2;

        }
    }
    return distBuffer.map(a => a / numberOfChannels);
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
        var context = new Context;
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
    start = start;
    stop = stop;
}

class Recorder {
    running = false;
    hasMicrophone = navigator.getUserMedia instanceof Function;
    audioPromise;
    commandCount = 0;
    onprocess;
    context;
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
    init = init;
    start = start;
    stop = stop;
}

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
    init = init;
    start = start;
    stop = stop;
}

var audio = {
    Recorder,
    Monitor,
    Source,
    Context,
    copyData,
    getGlobalContext() {
        return globalContext;
    },
    getRecorder() {
        return new Recorder
    },
};