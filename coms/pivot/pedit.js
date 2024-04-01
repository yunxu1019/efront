function send(type, key, value, origin) {
    return data.from(origin, {
        type,
        key: encode62.timeencode(key),
        value: isHandled(value) ? encode62.timeencode(JSON.stringify(value)) : '',
    }, e => e ? JSAM.parse(encode62.timedecode(e)) : '').loading_promise;
}
function pedit(title, type, params, idkey = params.fields[0].key) {
    var pdata = params.data;
    return frame$edit(title, {
        submit(a, fields) {
            a = submit(fields, a);
            return send(type, a[idkey], a, pdata ? "edit" : "add");
        },
    }, params);
}
pedit.create = function (type, key, value) {
    return send(type, key, value, "add");
}
var query = pedit.query = function (type, key) {
    return send(type, key, null, "edit");
}
var update = pedit.update = function (type, key, value) {
    return send(type, key, value, "edit");
}
pedit.patch = async function (type, key, params) {
    return send(type, key, params, 'patch');
}