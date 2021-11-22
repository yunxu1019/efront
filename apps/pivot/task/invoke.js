function main(a) {
    var page = view();
    page.innerHTML = template;
    drag.on(page.firstChild, page);
    var fields = data.from("params", { key: a.key }, function (a) {
        return a ? JSON.parse(encode62.timedecode(a)) : [];
    });
    var taskid = 0;
    renderWithDefaults(page, {
        remove() {
            remove(page);
        },
        data: {},
        fields: fields,
        task: a,
        output: '',
        async run() {
            var id = ++taskid;
            this.output = "正在执行..";
            var params = JSON.stringify(this.data);
            var res = await data.from("invoke", { key: a.key, params: encode62.timeencode(params) }, function (a) {
                return a ? encode62.timedecode(a) : '完成！';
            });
            if (id !== taskid) return;
            this.output = res;
        }
    });
    return page;
}