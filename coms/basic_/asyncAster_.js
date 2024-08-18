class AsyncGenerator {
    constructor(f) {
        this.state = "suspended";
        this.exec = f.bind(this, this.return.bind(this), this.throw.bind(this), (value, next) => {
            delete this.promise;
            this.exec = next;
            this.resolve(value);
        })
    };
    throw(e) {
        delete this.exec;
        delete this.promise;
        this.state = "closed";
        this.reject(e);
    }
    return(v) {
        delete this.exec;
        delete this.promise;
        this.state = "closed";
        this.value = v;
        this.resolve(v);
    }
    next(a) {
        delete this.value;
        if (this.exec) {
            var exec = this.exec;
            delete this.exec;
            this.promise = new Promise((ok, oh) => {
                this.resolve = ok;
                this.reject = oh;
                exec(a);
            }).then((v) => {
                return {
                    value: v,
                    done: !!this.exec
                }
            });
            return this.promise;
        }
        else if (this.promise) {
            var promise = this.promise;
            delete this.promise;
            var next = () => this.next(a);
            return promise.then(next, next);
        }
        return Promise.resolve({ value: this.value, done: true });
    }
    [Symbol.asyncIterator]() {
        return this;
    }
}
function asyncAster_() {
    return new AsyncGenerator(exec_.bind(this, arguments));
}