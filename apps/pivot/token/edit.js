frame$edit.bind(null, "密钥", {
    submit(a, fields) {
        a = submit(fields, a);
        return data.from("private-edit", {
            key: encode62.timeencode(a.key),
            value: encode62.timeencode(JSON.stringify(a)),
        }).loading_promise;
    },

});