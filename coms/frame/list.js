function main(title, { fields, options: options0, load, remove, buttons }, edit_ref) {
    if (isString(edit_ref)) prepare(edit_ref);
    var page = document.createElement("div");
    var edit = async function (o) {
        if (!edit_ref) {
            return;
        }
        var callback = function () {
            page.$scope.load();
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
    page.innerHTML = template;
    var options = [
        {
            name: "修改",
            async do(o) {
                await edit(o);
            },
        },
        {
            type: "danger",
            name(o) {
                return this.confirm === o ? "确认删除" : "删除";
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
                page.$scope.load();
            }
        }
    ];
    if (options0) options = options.concat(options0);
    renderWithDefaults(page, {
        title,
        load() {
            this.data = load();
        },
        fields: fields.filter(f => !f.hidden && f.inlist !== false).concat({
            name: "操作",
            options
        }),
        buttons,
        hasedit: !!edit_ref,
        data: [],
        async add() {
            await edit();
        },
    });
    on("append")(page, function () {
        page.$scope.load();
    });
    return page;
}