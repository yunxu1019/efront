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
            console.log(error)
            alertError('无法打开麦克风。异常信息:' + (error.code || error.name));
            break;
    }
};


class Recorder {
    recording = false;
    hasMicrophone = navigator.getUserMedia instanceof Function;
    audioPromise;
    commandCount = 0;
    onprocess;
    constructor(config) {
        config = config || {};
        config.sampleBits = config.sampleBits || 8;      //采样数位 8, 16
        config.sampleRate = config.sampleRate || (44100 / 6);   //采样率(1/6 44100)
        extend(this, config);
    }
    start() {
        if (this.recording) return;
        if (!this.hasMicrophone) {
            return alertError("您的浏览器不支持录音音频！", "error");
        }
        if (!this.audioPromise) {
            this.audioPromise = new Promise(function (ok, oh) {
                navigator.getUserMedia({
                    audio: true//只启用音频
                }, ok, oh);
            }).then(function (stream) {
                var context = new (window.webkitAudioContext || window.AudioContext)();
                var audioInput = context.createMediaStreamSource(stream);
                var createScript = context.createScriptProcessor || context.createJavaScriptNode;
                var recorder = createScript.apply(context, [0, 1, 1]);
                return [recorder, audioInput, context];
            });
        }
        var commandCount = ++this.commandCount;
        this.audioPromise.then(([recorder, audioInput, context]) => {
            if (commandCount !== this.commandCount) return;
            recorder.onaudioprocess = (e) => {
                var buffer = e.inputBuffer.getChannelData(0);
                this.onprocess instanceof Function && this.onprocess(buffer);
            };
            this.recording = true;
            audioInput.connect(recorder);
            recorder.connect(context.destination);
        }).catch(reportError);
    }
    stop() {
        if (!this.audioPromise) return;
        var commandCount = ++this.commandCount;
        this.audioPromise.then(([recorder]) => {

            if (this.commandCount !== commandCount) return;
            this.recording = false;
            recorder.disconnect();
        })
    }
}
var audio = {
    Recorder,
    getRecorder() {
        return new Recorder
    },
};