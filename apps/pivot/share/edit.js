function main({ fields, item }) {
    var page = view();
    page.innerHTML = edit;
    renderWithDefaults(page, {
        fields,
        close() {
            return remove(page);
        },
        async save() {
            await data.from("share", { opt: 'create', path: this.data.path }).loading_promise;
            dispatch(page, 'submited');
            remove(page);
        },
        data: Object.assign({}, item)
    });
    drag.on(page.firstChild, page);
    return page;
}