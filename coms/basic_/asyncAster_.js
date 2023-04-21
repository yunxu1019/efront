class AsyncGenerator {
    constructor(f) {
        this.state = "suspended";
        this.exec = f;
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
    next() {
        if (this.exec) {
            var exec = this.exec;
            delete this.exec;
            delete this.value;
            return this.promise = new Promise(function (ok, oh) {
                exec(function (result) {
                    delete this.promise;
                    ok(result);
                    this.return(result);
                }, function (error) {
                    delete this.promise;
                    oh(error);
                    this.throw(error);
                }, (value, exec) => {
                    delete this.promise;
                    ok({ value: value, done: !this.exec })
                    this.value = value;
                    this.exec = exec;
                });
            })
        }
        else if (this.promise) {
            return this.promise.then(this.next, this.next);
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