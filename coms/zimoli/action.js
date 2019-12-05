function main(config, item) {
    return new Promise(function (ok, oh) {
        if (!config) return ok();
        if (isString(config)) {
            go(config, item);
            return;
        }
        if (config instanceof Object) {
            if (config.modal) {
                var path = isString(config.modal) ? config.modal : config.modal.path;
                if (config.params) {
                    var params = getParams(item, config.params);
                }
                var args = extend({}, config.modal instanceof Object ? config.modal : { path: config.modal },
                    config.params ? { params } : { item });
                zimoli.prepare(path, function () {
                    var page = popup(path, args);
                    ok(page);
                });
                return;
            }
            if (config.actionId) {
                data.from(config.actionId).then(ok).catch(oh);
            }
        }
    });

}