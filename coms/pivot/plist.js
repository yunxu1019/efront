function load(type, idkey) {
    return data.from("list", { type, idkey: encode62.timeencode(idkey) }, a => JSAM.parse(encode62.timedecode(a || '')));
}
function remove(type, key) {
    return data.from("edit", { type, key: encode62.timeencode(key), value: encode62.timeencode("") }).loading_promise;
}
function plist() {
    var title, type, fields, edit_ref, options, idkey, buttons;
    var parse = function (a) {
        switch (typeof a) {
            case "string":
                if (!title) title = a;
                else if (!type) type = a;
                else if (!edit_ref) edit_ref = a;
                else idkey = a;
                break;
            case "object":
                if (a instanceof Array) {
                    if (!fields) fields = a;
                    else if (!options) options = a;
                }
                else if (a !== null) {
                    ({
                        fields = fields,
                        options=options,
                        buttons=buttons,
                        idkey=idkey,
                        edit_ref=edit_ref,
                        title=title,
                        type=type
                    } = a);
                }
                break;
        }
    }
    for (var a of arguments) parse(a);
    if (!fields) parse(this);
    if (!idkey) idkey = fields[0].key;
    return frame$list(title, {
        load() {
            return load(type, idkey);
        },
        remove(o) {
            return remove(type, o[idkey]);
        },
        fields,
        buttons,
        options,
    }, edit_ref ? edit_ref : function (o) {
        var p = pedit(title, type, o);
        p.initialStyle = popup.style;
        popup(p, true);
        move.setPosition(p, [.5, .5]);
        return p;
    });
}
plist.load = load;
plist.remove = remove;