function $q(resolve, reject) {
    return new Promise(resolve, reject);
}
$q.defer = function () {
    var resolve, reject;
    var promise = new Promise(function (ok, oh) {
        resolve = ok;
        reject = oh;
    });
    return {
        resolve,
        reject,
        promise
    };
};