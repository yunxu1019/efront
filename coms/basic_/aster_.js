class Generator {
    constructor(f) {
        this.state = "suspended";
        this.exec = f;
    };
    throw(e) {
        delete this.exec;
        this.state = "closed";
        throw e;
    }
    return(value) {
        delete this.exec;
        this.state = "closed";
        return { value: undefined, done: true };
    }
    next() {
        if (this.exec) {
            var exec = this.exec;
            delete this.exec;
            delete this.value;
            exec(this.return, this.throw, (value, exec) => {
                this.value = value;
                this.exec = exec;
            });
        }
        return { value: this.value, done: !this.exec };
    }
}
Generator.prototype[Symbol.iterator] = function () {
    return this;
};

function aster_() {
    return new Generator(exec_.bind(this, arguments));
}