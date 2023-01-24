if (Promise) {
    var SafePromise = void 0;
    Promise.resolve({
        then() {
            SafePromise = Promise;
        }
    });
    Promise = SafePromise;
}
