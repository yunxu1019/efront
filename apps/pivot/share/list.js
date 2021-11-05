var fields = refilm`
路径/path
`;
function main() {
    var options = [
        {
            name(e) {
                return this.confirm === e ? "确认取消" : "取消"
            },
            type: 'danger',
            confirm: false,
            timer: 0,
            async do(e) {
                if (this.confirm !== e) {
                    this.confirm = e;
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => render.refresh(this.confirm = null), 2000);
                    return;
                }
                await data.from('share', { opt: 'delete', path: e.path }).loading_promise;
                page.$scope.load();
            }
        }
    ];
    var page = div();
    page.innerHTML = list;
    renderWithDefaults(page, {
        data: [],
        load() {
            this.data = data.from("share", { opt: 'list' }, a => {
                if (a) return a.map(b => ({ path: b }));
            });
        },
        fields: fields.concat({
            name: "操作",
            width: 200,
            type: 'button',
            options,
        }),
    });
    page.$scope.load();
    contextmenu(page, [
        {
            name: "添加",
            do(e) {
                zimoli.prepare("/share/edit", function () {
                    var p = popup("/share/edit", { fields });
                    on('submited')(p, function () {
                        page.$scope.load();
                    })
                })
            }
        },
    ])
    return page;
}