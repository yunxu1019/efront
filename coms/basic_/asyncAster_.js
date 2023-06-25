class AsyncGenerator {
    constructor(f) {
        this.state = "suspended";
        this.exec = f.bind(this, this.return, this.throw, (value, next) => {
            this.exec = next;
            delete this.promise;
            this.resolve({ value, done: false });
        })
    };
    throw(e) {
        delete this.exec;
        this.state = "closed";
        return Promise.reject(e);
    }
    return(value) {
        delete this.exec;
        this.state = "closed";
        return Promise.resolve({ value: undefined, done: true });
    }
    next(a) {
        if (this.exec) {
            var exec = this.exec;
            delete this.exec;
            delete this.value;
            this.promise = new Promise(ok => {
                this.resolve = ok;
                exec(a);
            });
            return this.promise;
        }
        else if (this.promise) {
            var next = () => this.next(a);
            return this.promise.then(next, next);
        }
        return Promise.resolve({ value: undefined, done: true });
    }

}
Generator.prototype[Symbol.asyncIterator] = function () {
    return this;
}
function asyncAster_() {
    return new AsyncGenerator(exec_.bind(this, arguments));
}