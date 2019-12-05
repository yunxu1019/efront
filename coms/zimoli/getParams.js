function getParams(data, fields) {
    if (!fields) {
        return data;
    }
    if (!data) return null;
    if (isString(fields)) {
        fields = parseKV(fields);
    }
    if (fields instanceof Array) {
        var params = {};
        fields.forEach(function (field) {
            if (!(field instanceof Object)) {
                if (field in data) {
                    params[field] = data[field];
                }
                return;
            }
            if (field.delete_onsubmit) return;
            var value = data[field.key];
            if (isEmpty(value) && !field.delete_onempty) {
                params[field.key] = value;
            }
        });
        return params;
    } else if (fields instanceof Object) {
        var params = {};
        Object.keys(fields).forEach(function (k) {
            var { [k]: f = k } = fields;
            if (f in data) {
                params[k] = data[f];
            }
        });
        return params;
    }
}