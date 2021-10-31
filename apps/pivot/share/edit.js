function main({ fields, item }) {
    var page = view();
    page.innerHTML = edit;
    renderWithDefaults(page, {
        fields,
        close() {
            return remove(page);
        },
        save() {
            return data.from("share", { opt: item ? 'update' : 'create', data: this.data }).loading_promise;
        },
        data: Object.assign({}, item)
    });
    drag.on(page.firstChild, page);
    return page;
}