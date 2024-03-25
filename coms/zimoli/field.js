function main(elem) {
    elem = optionbar.apply(null, arguments);
    var scope = {};
    care(elem, function (p) {
        if (elem.childNodes.length) return;
        var [f, data] = p;
        elem.innerHTML = field;
        render(elem, scope = {
            model,
            data,
            error: null,
            field: f,
            container,
            readonly: !!this.readonly
        });
        elem.oldValue = data[f.key];
        elem.setAttribute("field", f.key);
    }, false);
    elem.setAttribute("field", '');
    elem.renders = [function () {
        if (!(this.src instanceof Array)) return;
        var [f, data] = this.src;
        if (!f || !data) return;
        var v = data[f.key];
        if (!this.checked) if (v === this.oldValue || isEmpty(this.oldValue) && isEmpty(v)) return;
        this.checked = false;
        this.setAttribute("dirty", '');
        var error = valid(f, data);
        if (error) {
            this.setAttribute("error", error);
            switch (error) {
                case "empty":
                    scope.error = true;
                    break;
                default:
                    if (isNode(error)) {
                        scope.error = error;
                    }
                    else {
                        scope.error = document.createElement('error');
                        scope.error.innerHTML = error;
                    }
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