function html(target, innerHTML) {
    if (arguments.length >= 2) {
        target.innerHTML = innerHTML;
    }
    return target.innerHTML;
}