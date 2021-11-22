function main(a) {
    console.log(a);
    var page = view();
    drag.on(page);
    page.innerHTML = template;
    var fields = data.from("params", { key: a.key }, function (a) {
        return JSON.parse(encode62.timedecode(a));
    });
    console.log(fields)
    renderWithDefaults(page, {
        remove() {
            remove(page);
        },
        data: {},
        fields: fields,
        task: a,
        run() {
            var params = JSON.stringify(this.data);
            data.from("invoke", { key: a.key, params: encode62.timeencode(params) });
        }
    });
    return page;
}