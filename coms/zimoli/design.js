var field_Id = 0;
function main(fields, types) {
    var page = form();
    page.innerHTML = design;
    var scope = render(page, {
        select,
        fields,
        list,
        btn: button,
        padding,
        focus(a) {
            addClass(a, 'focus');
        },
        blur(a) {
            removeClass(a, 'focus');
        },
        add() {
            this.fields.push({
                id: ++field_Id
            });
            setTimeout(() => {
                fieldsContainer.go(this.fields.length);
            })
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
    // vbox(fieldsContainer);
    autodragchildren(fieldsContainer, fieldsContainer, function (src, dst) {
        var offset = fieldsContainer.topIndex();
        src += offset; dst += offset;
        var fields = scope.fields;
        if (dst >= fields.length) {
            dst = fields.length - 1;
        }
        var field = fields.splice(src, 1)[0];
        fields.splice(dst, 0, field);
        render.refresh();
        console.log(JSON.stringify(fields));
    });
    return page;
}