// class LoadingArray extends Array {
//     totalCount = 0;
//     data = [];
//     is_errored = null;
//     error_message = null;
//     is_loading = true;
//     is_loaded = false;
//     is_readonly = null;
//     loading = null;
//     loading_promise = null;
//     then (ok, oh) {
//         if (this.loading_promise) this.loading_promise.then(ok, oh);
//     }
// }
function LoadingArray() {
    var this0 = [];
    this0.is_errored = null;
    this0.error_message = null;
    this0.is_loading = true;
    this0.is_loaded = false;
    this0.is_readonly = null;
    this0.loading = null;
    this0.loading_promise = null;
    return this0;
};