
function async_() {
    return new Promise(exec_.bind(this, arguments));
}