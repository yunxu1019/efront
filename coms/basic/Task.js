var alltasks = Object.create(null);

class Task {
    static get alltasks() { return alltasks; };
    rest = [];
    percent = 0;
    aborted = false;
    complete = true;
    open(type, load) {
        this.type = type;
        this.load = load;
    }
    async loop() {
        if (typeof this.load === "function") while (!this.aborted && this.rest.length) {
            this.percent = 0;
            await this.load(this.rest.pop());
        }
        this.percent = 100;
    }
    async send(data) {
        this.rest.push(data);
        if (!this.complete) return;
        this.mount();
        try {
            this.complete = false;
            await Promise.resolve().then(() => this.loop());
            this.complete = true;
            if (typeof this.onload === 'function') this.onload();
        }
        catch (e) {
            if (typeof this.onerror === 'function') this.onerror(e);
        }
        this.unmount();
    }
    mount() {
        var type = this.type;
        if (!alltasks[type]) alltasks[type] = [];
        alltasks[type].push(this);
    }
    unmount() {
        if (!alltasks[this.type]) return;
        removeFromList(alltasks[this.type], this);
        if (!alltasks[this.type].length) delete alltasks[this.type];
    }
    abort() {
        this.aborted = true;
        this.unmount();
    }
}

module.exports = Task;