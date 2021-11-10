function main(title, { fields, load, remove }, edit_ref) {
    prepare(edit_ref);
    var page = document.createElement("div");
    var edit = function (o) {
        zimoli.prepare(edit_ref, function () {
            var p = popup(edit_ref, { fields, data: o })
            on("submited")(p, function () {
                console.log("submited")
                page.$scope.load();
            })
        })
    };
    page.innerHTML = template;
    renderWithDefaults(page, {
        title,
        load() {
            this.data = load();
        },
        fields: fields.concat({
            name: "操作",
            options: [
                {
                    name: "修改",
                    do(o) {
                        edit(o);
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
            ]
        }),
        data: [],
        add() {
            edit();
        },
    });
    on("append")(page, function () {
        page.$scope.load();
    });
    return page;
}