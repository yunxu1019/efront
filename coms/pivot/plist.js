
function main(title, type, fields, edit_ref, options, idkey = fields[0].key) {
    return frame$list(title, {
        load() {
            return data.from("list", { type }, a => JSAM.parse(encode62.timedecode(a || '')));
        },
        remove(o) {
            return data.from("edit", { type, key: encode62.timeencode(o[idkey]), value: encode62.timeencode("") }).loading_promise;
        },
        fields,
        options,
    }, edit_ref ? edit_ref : function (o) {
        var p = pedit(title, type, { data: o, fields });
        p.initialStyle = popup.style;
        popup(p, true);
        move.setPosition(p, [.5, .5]);
        return p;
    });
}