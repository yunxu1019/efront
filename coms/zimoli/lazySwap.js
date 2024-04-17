var Timer = class {
    startTime = +new Date;
    timeout = 600;
    timer = 0;
    target = null;
    fired = false;
    swap = false;
    constructor(target, callback, swap) {
        this.target = target;
        this.run = callback;
        if (!isHandled(swap) && target) {
            swap = !target.hasAttribute('swapped');
        }
        this.swap = swap;
    }
    fire() {
        if (!isFunction(this.run)) return;
        if (this.run(this.swap) === false) {
            return
        }
        this.fired = true;
        this.end();
    }
    rollback() {
        var target = this.target;
        if (target) {
            if (this.swap) {
                target.removeAttribute('swapped');
            }
            else {
                target.setAttribute('swapped', '');
            }
        }
    }
    start() {
        var target = this.target;
        if (target) {
            if (this.swap) {
                target.setAttribute("swapped", '');
            }
            else {
                target.removeAttribute('swapped');
            }

        }
        this.timer = setTimeout(() => this.fire(), this.timeout);
    }
    end() {
        clearTimeout(this.timer);
        if (!this.fired) this.rollback();
    }
};
function main(target, callback, swap) {
    return new Timer(target, callback, swap);
}