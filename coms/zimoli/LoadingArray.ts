class LoadingArray extends Array {
    totalCount = 0;
    data = [];
    is_errored = null;
    error_message = null;
    is_loading = true;
    is_loaded = false;
    is_readonly = null;
    loading = null;
    loading_promise = null;
}