function main(title, { submit }, { data: origin, fields, }) {
    var page = view();
    var item = Object.assign({}, origin);
    page.onback = function () {
        if (page.querySelector('[dirty]')) return false;
    };
    var page_scope = {
        fields,
        get title() {
            var t = title;
            if (isFunction(t)) t = t();
            t = (origin ? i18n`修改` : i18n`添加`) + t;
            return t;
        },
        origin,
        scrollbar,
        data: item,
        remove() {
            remove(page);
        },
    };
    page.innerHTML = template;
    renderWithDefaults(page, page_scope);
    drag.on(page.firstChild, page);
    resize.on(page);

    on('submit')(page, async function (e) {
        e.preventDefault();
        var res = await submit(item, fields, origin);
        if (typeof res === 'string' && res) {
            return alert(res, 'error');
        }
        if (res === false) return;
        dispatch(this, 'submited');
        remove(this);
    });
    bind('keydown.ctrl.s')(page, async function (e) {
        e.preventDefault();
        await submit(item, fields, origin);
        dispatch(this, 'submited');
    });
    on("mounted")(page, lazy(function () {
        page.querySelector("input").focus();
    }));
    return page;
}