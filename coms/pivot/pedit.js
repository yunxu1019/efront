function main(title, type, params, idkey = params.fields[0].key) {
    return frame$edit(title, {
        submit(a, fields) {
            a = submit(fields, a);
            return data.from(params.data ? "edit" : "add", {
                type,
                key: encode62.timeencode(a[idkey]),
                value: encode62.timeencode(JSON.stringify(a)),
            }).loading_promise;
        },

    }, params);
}