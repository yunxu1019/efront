function main(title, { submit }, { data: origin, fields, }) {
    var page = view();
    var item = Object.assign({}, origin);
    page.innerHTML = edit;
    drag.on(page.firstChild, page);
    resize.on(page);
    page.onback = function () {
        return false;
    };
    renderWithDefaults(page, {
        fields,
        title,
        origin: item,
        data: item,
        remove() {
            remove(page);
        },
    });
    on('submit')(page, async function (e) {
        e.preventDefault();
        await submit(item, fields);
        dispatch(this, 'submited');
        remove(this);
    });
    bind('keydown.ctrl.s')(page, async function (e) {
        e.preventDefault();
        await submit(item, fields);
        dispatch(this, 'submited');
    });
    on("append")(page, lazy(function () {
        page.querySelector("input").focus();
    }));
    return page;
}