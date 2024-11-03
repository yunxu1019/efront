
function async_() {
    return new Promise(&exec.bind(this, arguments));
}
return async_;