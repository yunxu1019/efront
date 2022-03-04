function design(fields, types) {

    var e = document.createElement("fields-designer");
    e.innerHTML = template;
    var e = view(e);
    renderWithDefaults(e, {
        fields: fields ? JSAM.parse(JSAM.stringify(fields)) : [],
        design() {
            return zimoli$design(this.fields, types);
        },
        remove() {
            remove(e);
        },
        save() {
            e.value = this.fields;
            dispatch(e, 'changed');
            remove(e);
        }
    });
    drag.on(e.firstChild, e);
    resize.on(e);
    return e;
}
