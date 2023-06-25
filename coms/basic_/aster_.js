class Generator {
    constructor(f) {
        this.state = "suspended";
        this.exec = f.bind(this, this.return, this.throw, function (value, next) {
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
        return { value: undefined, done: true };
    }
    next(arg) {
        if (this.exec) {
            var exec = this.exec;
            delete this.exec;
            delete this.value;
            exec(arg);
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