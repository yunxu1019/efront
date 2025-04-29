function main(gtTitle, { fields: gtFields, options: gtOptions, load, remove, buttons: gtButtons }, edit_ref) {
    var title, fields, fieldsL, options, options, buttons;
    var gt = function (gt, o) {
        if (isFunction(gt)) gt = gt();
        if (isArray(o)) {
            o.splice(0, o.length);
            o.push.apply(o, gt);
        }
        else o = gt;
        return o;
    }
    var update = function () {
        title = gt(gtTitle, title);
        var options0 = gt(gtOptions);
        var options1 = [
            {
                name: i18n`修改`,
                async do(o) {
                    await edit(o);
                },
            },
            {
                type: "danger",
                name(o) {
                    return this.confirm === o ? i18n`确认删除` : i18n`删除`;
                },
                type(o) {
                    return this.confirm === o ? "dark" : "danger";
                },
                confirm: false,
                timer: 0,
                async do(o) {
                    if (this.confirm !== o) {
                        this.confirm = o;
                        clearTimeout(this.timer);
                        var that = this;
                        this.timer = setTimeout(function () {
                            that.confirm = null;
                            render.refresh();
                        }, 2000);
                        return;
                    }
                    await remove(o);
                    page_scope.load();
                }
            }
        ];
        if (options1) options1.push.apply(options1, options0);
        options = gt(options1, options);
        buttons = gt(gtButtons, buttons);
        fields = gt(gtFields, fields);
        var fields1 = fields.filter(f => !f.hidden && f.inlist !== false).concat({
            name: i18n`操作`,
            options
        });
        fieldsL = gt(fields1, fieldsL);
    };
    if (isString(edit_ref)) prepare(edit_ref);
    var page = document.createElement("div");
    on('append')(page, function () {
        i18n.addReloader(update);
    });
    on('remove')(page, function () {
        i18n.removeReloader(update);
    });
    var edit = async function (o) {
        if (!edit_ref) {
            return;
        }
        var callback = function () {
            page_scope.load();
        };
        if (isFunction(edit_ref)) {
            var p = await edit_ref({ fields, data: o, callback });
            if (p) on('submited')(p, callback);
            if (isElement(p) && !p.parentNode) {
                css(p, { position: "absolute" });
                p.initialStyle = 'opacity:0;transform:scale(.98);';
                popup(p, true);
                move.setPosition(p, [.5, .5]);
            }
            return;
        }
        if (isString(edit_ref)) await zimoli.prepare(edit_ref, function () {
            var p = popup(edit_ref, { fields, data: o })
            on("submited")(p, callback);
        })
    };
    update();
    var page_scope = {
        get title() {
            return title
        },
        load() {
            this.data = load();
        },
        fields: fieldsL,
        buttons,
        hasedit: !!edit_ref,
        data: [],
        async add() {
            await edit();
        },
    };
    page.innerHTML = template;
    renderWithDefaults(page, page_scope);
    page.reload = function () {
        update();
        page.innerHTML = template;
        renderWithDefaults(page, page_scope);
    };
    on("append")(page, function () {
        page_scope.load();
    });
    return page;
}