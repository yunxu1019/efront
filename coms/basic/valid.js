function valid(field, data) {
    var error;
    if (isEmpty(data[field.key])) {
        if (field.required) {
            return "empty";
        }
        return;
    }
    if (field.valid instanceof Function) {
        var e = field.valid(data[field.key]);
        if (e) return e;
    }
    if (field.options instanceof Function) {
        var e = field.options(data[field.key]);
        if (e) return e;
    }
    return error;
}