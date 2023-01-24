if (Promise) {
    var SafePromise = void 0;
    Promise.resolve({
        get then() {
            SafePromise = Promise;
        }
    });
    Promise = SafePromise;
}
