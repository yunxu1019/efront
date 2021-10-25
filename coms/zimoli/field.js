function main(elem) {
    elem = option.apply(null, arguments);
    var scope = {};
    care(elem, function (p) {
        if (elem.childNodes.length) return;
        var [f, data] = p;
        elem.innerHTML = field;
        render(elem, scope = {
            model,
            data,
            error: null,
            field: f
        });
        elem.oldValue = data[f.key];
    }, false);

    elem.renders = [function () {
        if (!this.src) return;
        var [f, data] = this.src;
        if (!f || !data) return;
        var v = data[f.key];
        if (v === this.oldValue || isEmpty(this.oldValue) && isEmpty(v)) return;
        this.setAttribute("dirty", '');
        var error = valid(f, data);
        if (error) {
            this.setAttribute("error", error);
            switch (error) {
                case "empty":
                    scope.error = `${f.name}是必填字段！`;
                    break;
            }
        }
        else {
            this.removeAttribute('error');
            scope.error = null;
        }
        this.oldValue = data[f.key];
    }]
    elem.removeAttribute("tabindex");
    return elem;
}