function send(type, key, value, origin) {
    return data.from(origin ? "edit" : "add", {
        type,
        key: encode62.timeencode(key),
        value: isHandled(value) ? encode62.timeencode(JSON.stringify(value)) : '',
    }, e => e ? JSON.parse(encode62.timedecode(e)) : '').loading_promise;
}
function pedit(title, type, params, idkey = params.fields[0].key) {
    var pdata = params.data;
    return frame$edit(title, {
        submit(a, fields) {
            a = submit(fields, a);
            return send(type, a[idkey], a, pdata);
        },
    }, params);
}
pedit.create = function (type, key, value) {
    return send(type, key, value, false);
}
var query = pedit.query = function (type, key) {
    return send(type, key, null, true);
}
var update = pedit.update = function (type, key, value) {
    return send(type, key, value, true);
}
pedit.merge = async function (type, key, params) {
    var data = await query(type, key);
    extendIfNeeded(params, data);
    return update(type, key, params);
}