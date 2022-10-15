var alltasks = {
};

class Task {
    static get alltask() { return alltasks; };
    rest = [];
    percent = 0;
    aborted = false;
    runing = false;
    open(type, load) {
        this.type = type;
        this.load = load;
    }
    async send(data) {
        this.rest.push(data);
        if (this.runing) return;
        this.mount();
        if (typeof this.load === "function") while (!this.aborted && this.rest.length) {
            this.percent = 0;
            await this.load(this.rest.pop());
        }
        this.percent = 100;
        this.unmount();
    }
    mount() {
        var type = this.type;
        if (!alltasks[type]) alltasks[type] = [];
        alltasks[type].push(this);
        this.runing = true;
    }
    unmount() {
        this.runing = false;
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