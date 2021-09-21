function main() {
    var page = view();
    page.innerHTML = template;
    renderWithDefaults(page, {
        items: data.from("load-list", {
            skip: 0,
            selector: {},
            limit: 21
        }),
    });
    return page;
}