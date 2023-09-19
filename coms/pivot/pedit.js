function send(type, key, value, origin) {
    return data.from(origin ? "edit" : "add", {
        type,
        key: encode62.timeencode(key),
        value: encode62.timeencode(JSON.stringify(value)),
    }).loading_promise;
}
function pedit(title, type, params, idkey = params.fields[0].key) {
    return frame$edit(title, {
        submit(a, fields) {
            a = submit(fields, a);
            return send(type, a[idkey], a, params.data);
        },

    }, params);
}
pedit.create = function (type, key, value) {
    return send(type, key, value, false);
}
pedit.update = function (type, key, value) {
    return send(type, key, value, true);
}