function main(a) {
    var page = view();
    page.innerHTML = template;
    drag.on(page.firstChild, page);
    var fields = data.from("params", { key: a.key }, function (a) {
        return JSON.parse(encode62.timedecode(a));
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
            var params = JSON.stringify(this.data);
            var res = await data.from("invoke", { key: a.key, params: encode62.timeencode(params) }, function (a) {
                return encode62.timedecode(a);
            });
            console.log(res);
            if (id !== taskid) return;
            this.output = res;
        }
    });
    return page;
}