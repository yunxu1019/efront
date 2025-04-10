function watcher({ changes }) {
    var watches = $watches.get(this);
    for (var k in changes) {
        if (k in watches) {
            var h = watches[k];
            var { current, previous } = changes[k];
            if (h instanceof Function) h.call(this, current, previous);
            else if (h instanceof Array) h.forEach(h => h.call(this, current, previous));
        }
    }
}
function watch(elem, prop, handler) {
    var w = $watches.get(elem);
    if (!w) {
        w = {};
        $watches.set(elem, w);
        on("changes")(elem, watcher);
    }
    if (isFunction(handler)) {
        w[prop] = handler;
    }
    else if (isObject(prop)) {
        var e = 0;
        for (var k in prop) {
            if (!isFunction(prop[k])) e++;
            else w[k] = prop[k];
        }
        if (e > 0) throw new Error(i18n`参数不支持！`);
    }
}