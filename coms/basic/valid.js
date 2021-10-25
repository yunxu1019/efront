function valid(field, data) {
    var error;
    if (isEmpty(data[field.key])) {
        if (field.required) {
            return "empty";
        }
        return;
    }
    return error;
}