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
    var page = vbox('x');
    page.innerHTML = AudioContext_test;
    var click = {
        start() {
            if (this.audioCtx) return;
            var hz = this.rate;
            var audioCtx = this.audioCtx = new AudioContext();
            var gainNode = this.gainNode = audioCtx.createGain();
            var oscillator = this.oscillator = audioCtx.createOscillator();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.type = 'sine';
            oscillator.frequency.value = -hz;
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(65536 / Math.log2(hz), audioCtx.currentTime + 0.01);
            oscillator.start(audioCtx.currentTime);
            addClass(this, 'pressed');
        },
        end() {
            var { gainNode, oscillator, audioCtx } = this;
            if (!gainNode || !oscillator) return;
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1);
            oscillator.stop(audioCtx.currentTime + 1);
            this.audioCtx = null;
            this.oscillator = null;
            this.gainNode = null;
            removeClass(this, 'pressed');
        }
    }
    renderWithDefaults(page, {
        rates: piano(),
        audioCtx: null,
        gainNode: null,
        oscillator: null,
        button(a) {
            var b = button(a);
            moveupon(b, click);
            return b;
        },

        format(o) {
            var i = o.toFixed(1).indexOf('.');
            return o.toFixed(5 - i);
        }
    });
    on("append")(page, function () {
        this.querySelector('[hz="440"]').scrollIntoViewIfNeeded();
    });
    on('contextmenu')(page, function (e) {
        e.preventDefault();
    });
    return page;
}