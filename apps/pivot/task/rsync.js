function main(task) {
    var page = view();
    page.innerHTML = template;
    drag.on(page.firstChild, page);
    resize.on(page);
    renderWithDefaults(page, {
        task,
        checkbox(e) {
            e = checkbox(e);
            cast(e, { options: this.hosts })
        },
        base: data.getInstance("base"),
        hosts: data.getInstance("hosts"),
        finished: {},
        checked: {},
        async flush() {
            var api = await data.getApi("edit");
            api = Object.assign({}, api);
            var finished = this.finished = {};
            var checked = this.checked;
            for (var h of this.hosts) {
                if (!checked[h.key]) continue;
                api.base = location.protocol + "//" + h.key + "/";
                cross.addDirect(api.base);
                await data.from(api, {
                    type: "task",
                    key: encode62.timeencode(task.key),
                    value: encode62.timeencode(JSON.stringify(task))
                });
                finished[h.key] = true;
            }
            alert('同步完成！');
        },
        remove() {
            remove(page);
        },
    });
    return page;
}