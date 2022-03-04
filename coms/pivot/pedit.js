function main(title, type, params) {
    return frame$edit(title, {
        submit(a, fields) {
            
            a = submit(fields, a);
            return data.from(params.data ? "edit" : "add", {
                type,
                key: encode62.timeencode(a.key),
                value: encode62.timeencode(JSON.stringify(a)),
            }).loading_promise;
        },

    }, params);
}