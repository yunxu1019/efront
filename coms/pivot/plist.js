function load(type, idkey) {
    return data.from("list", { type, idkey: encode62.packencode(idkey) }, a => JSAM.parse(encode62.packdecode(a || '')));
}
function remove(type, key) {
    return data.from("edit", { type, key: encode62.packencode(key), value: encode62.packencode("") }).loading_promise;
}
function plist() {
    var title, type, fields, edit_ref, options, idkey, buttons;
    var parse = function (a) {
        switch (typeof a) {
            case "string":
                if (!type) type = a;
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
            case "function":
                if (!title) title = a;
                else if (!fields) fields = a;
                else if (!options) options = a;
                else if (!buttons) buttons = a;
        }
    }
    for (var a of arguments) parse(a);
    if (!fields) parse(this);
    if (!idkey) idkey = (isFunction(fields) ? fields() : fields)[0].key;
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
        popup(p, [.5, .5]);
        return p;
    });
}
plist.load = load;
plist.remove = remove;