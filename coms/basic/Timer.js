class Timer {
    capture = Date.now();
    value = 0;
    pause() {
        this.value += Date.now() - this.capture;
        this.capture = null;
    }
    resume() {
        this.capture = Date.now();
    }
    valueOf() {
        return this.capture !== null ? this.value + Date.now() - this.capture : this.value;
    }
}
module.exports = Timer;