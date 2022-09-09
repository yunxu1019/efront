function watcher({ changes }) {
    var watches = this.$watches;
    for (var k in changes) {
        if (k in watches) {
            var { current, previous } = changes[k];
            watches[k](current, previous);
        }
    }
}
function watch(elem, prop, handler) {
    if (!elem.$watches) {
        elem.$watches = {};
        on("changes")(elem, watcher);
    }
    if (isFunction(handler)) {
        elem.$watches[prop] = handler;
    }
    else if (isObject(prop)) {
        var e = 0;
        for (var k in prop) {
            if (!isFunction(prop[k])) e++;
            else elem.$watches[k] = prop[k];
        }
        if (e > 0) throw new Error("参数不支持！");
    }
}