class Timer {
    capture = +new Date;
    value = 0;
    pause() {
        this.value += new Date - this.capture;
        this.capture = null;
    }
    resume() {
        this.capture = +new Date;
    }
    valueOf() {
        return this.capture !== null ? this.value + +new Date - this.capture : this.value;
    }
}
module.exports = Timer;