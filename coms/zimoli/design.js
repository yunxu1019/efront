function main(fields, types) {
    var page = form();
    page.innerHTML = design;
    var scope = render(page, {
        select,
        fields,
        btn: button,
        add() {
            this.fields.push({});
        },
        remove(field) {
            var fields = this.fields;
            for (var cx = fields.length - 1; cx >= 0; cx--) {
                if (fields[cx] === field) {
                    fields.splice(cx, 1);
                }
            }
        },
        types
    }).$scope;
    var [options, fieldsContainer] = page.children;
    vbox(fieldsContainer);
    autodragchildren(fieldsContainer, fieldsContainer, function (src, dst) {
        var fields = scope.fields;
        if (dst >= fields.length) {
            dst = fields.length - 1;
        }
        var field = fields.splice(src, 1)[0];
        fields.splice(dst, 0, field);
        console.log(JSON.stringify(scope.fields));
    });
    return page;
}