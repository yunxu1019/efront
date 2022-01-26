
function main(title, type, fields, edit_ref, options) {
    return frame$list(title, {
        load() {
            return data.from("list", { type }, a => JSAM.parse(encode62.timedecode(a || '')));
        },
        remove(o) {
            return data.from("edit", { type, key: encode62.timeencode(o.key), value: encode62.timeencode("") }).loading_promise;
        },
        fields,
        options,
    }, edit_ref);
}