function main(config, item, params) {
    return new Promise(function (ok, oh) {
        if (!config) return ok();
        if (isObject(config)) {
            if (config.do instanceof Function) {
                return ok(config.do(item, params));
            }
            if (config.modal) {
                var path = isString(config.modal) ? config.modal : config.modal.path;
                if (config.params) {
                    var _params = getParams(item, config.params);
                    params = extend({}, params, _params);
                }
                var args = extend({}, isObject(config.modal) ? config.modal : { path: config.modal },
                    { params: params }, item ? { item } : {});
                popup.prepare(path, function () {
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