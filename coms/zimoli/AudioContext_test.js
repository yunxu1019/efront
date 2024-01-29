function piano() {
    var res = [];
    var yin = [1, 3, 5, 7, 8, 10, 12].reverse();
    var yue = [2, 4, 6, 9, 11].reverse();
    var c = a => 440 * Math.pow(2, cx + (3 - a) / 12);
    for (var cx = -12, dx = 8; cx < dx; cx++) {
        var yinjie1 = yin.map(c);
        var yinjie2 = yue.map(c);
        res.push(yinjie1, yinjie2);
    }
    return res;
}
function main() {
    var page = document.createElement('div');
    page.innerHTML = AudioContext_test;
    var mouse_target = null;
    var setBuffer = function (btn) {
        var { gainNode, audioCtx, oscillator } = btn;
        var gain = gainNode.gain;
        var hz = btn.rate;
        var currentTime = audioCtx.currentTime;
        gain.setValueAtTime(65536 / Math.log2(hz), currentTime + 0.01);
        // gain.linearRampToValueAtTime(0, currentTime + 2);
        gain.exponentialRampToValueAtTime(0.001, currentTime + 1);
    };
    var init = function (btn) {
        if (btn.audioCtx) {
            return btn;
        }
        var audioCtx = btn.audioCtx = new AudioContext();
        var gainNode = btn.gainNode = audioCtx.createGain();
        var oscillator = btn.oscillator = audioCtx.createOscillator();
        var hz = btn.rate;
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = -hz;
        oscillator.start(0);
        return { audioCtx, gainNode, oscillator };
    };
    var drop = function (btn) {
        btn.oscillator.stop();
        btn.audioCtx = null;
        btn.gainNode = null;
        btn.oscillator = null;
    }
    var click = {
        start(event) {
            var btn = event.target;
            var btn = getTargetIn(b => hasClass(b, 'button'), event.target);
            if (btn.pressed) return;
            btn.pressed = true;
            var { oscillator, audioCtx, gainNode } = init(btn);
            setBuffer(btn);
            audioCtx.resume();
            addClass(btn, 'pending');
            if (!event.touches) mouse_target = btn;
        },
        async end(event) {
            if (!event.touches) var btn = mouse_target;
            else var btn = getTargetIn(b => hasClass(b, 'button'), event.target);
            if (!btn) return;
            btn.pressed = false;
            var { gainNode, oscillator, audioCtx } = btn;
            if (!gainNode || !oscillator) return;
            await audioCtx.suspend();
            drop(btn);
            removeClass(btn, 'pending');
        }
    }
    on("touchstart")(page, click.start);
    on("touchend")(page, click.end);
    on('mousedown')(page, click.start);
    bind('mouseup')(page, click.end);
    renderWithDefaults(page, {
        rates: piano(),
        audioCtx: null,
        gainNode: null,
        oscillator: null,

        format(o) {
            var i = o.toFixed(1).indexOf('.');
            return o.toFixed(5 - i);
        }
    });
    on("mounted")(page, function () {
        this.querySelector('[hz="440"]').scrollIntoViewIfNeeded();
    });
    on('contextmenu')(page, function (e) {
        e.preventDefault();
    });
    return page;
}