class Generator {
    constructor(f) {
        this.state = "suspended";
        this.exec = f.bind(this, this.return.bind(this), this.throw.bind(this), function (value, next) {
            this.exec = next;
            this.value = value;
        });
    };
    throw(e) {
        delete this.exec;
        this.state = "closed";
        throw e;
    }
    return(value) {
        delete this.exec;
        this.state = "closed";
        this.value = value;
    }
    next(arg) {
        delete this.value;
        if (this.exec) {
            var exec = this.exec;
            delete this.exec;
            exec(arg);
        }
        return { value: this.value, done: !this.exec };
    }
    [Symbol.iterator]() {
        return this;
    }
}

function aster_() {
    return new Generator(exec_.bind(this, arguments));
}