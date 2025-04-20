var reshape = function () {
    var [head, body, foot] = getTypedChildren(this, ['head', 'body', 'foot']);
    var isInlineBlock = body && /^inline/i.test(getComputedStyle(body).display);
    if (head && body) {
        var left = head.offsetWidth + 1;
        if (isInlineBlock && left < (this.break || body.offsetWidth >> 2)) {
            css(head, {
                marginRight: fromOffset(-left),
                marginBottom: ''
            });
            css(body, {
                paddingLeft: left,
                paddingTop: ""
            });
        }
        else {
            var top = head.offsetHeight + 1;
            css(head, {
                marginRight: '',
                marginBottom: fromOffset(-top),
            });
            css(body, {
                paddingLeft: '',
                paddingTop: top
            })
        }
    }
    if (!body) body = head;
    if (foot && body) {
        console.log(foot)
        var right = foot.offsetWidth + 1;
        if (isInlineBlock && right < (this.break || body.offsetWidth >> 2)) {
            css(foot, {
                marginTop: '',
                marginLeft: fromOffset(-right)
            });
            css(body, {
                paddingBottom: '',
                paddingRight: fromOffset(right),
            })
        }
        else {
            var bottom = foot.offsetHeight + 1;
            css(foot, {
                marginTop: fromOffset(-bottom),
                marginLeft: '',
            });
            css(body, {
                paddingRight: '',
                paddingBottom: fromOffset(bottom)
            });
        }
    }
};
var checkValue = function () {
    if (!(this.src instanceof Array)) return;
    var scope = $scoped.get(this);
    var { field, data } = scope;
    if (!field || !data) return;
    var v = data[field.key];
    if (!this.checked) if (v === this.oldValue || isEmpty(this.oldValue) && isEmpty(v)) return;
    this.checked = false;
    this.setAttribute("dirty", '');
    var error = valid(field, data);
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
    this.oldValue = data[field.key];
};
function ondigest() {
    checkValue.call(this);
    reshape.call(this);
}
function ondata(p) {
    var [field, data] = p;
    this.oldValue = data[field.key];
    this.setAttribute("field", field.key);
    this.innerHTML = template;
    render(this, {
        model,
        data,
        error: null,
        field,
        container,
        check,
        readonly: !!this.readonly
    });
    this.reshape();
}
function main(elem) {
    if (!isElement(elem)) elem = document.createElement('field');
    elem.reshape = reshape;
    if (elem.break === false) elem.break = Infinity;
    resizingList.set(elem, reshape);
    elem.setAttribute("field", '');
    elem.$digest = reshape;
    elem.removeAttribute("tabindex");

    if (!elem.childNodes.length) {
        care(elem, ondata, false);
    }
    else {
        var [head, body, foot] = getTypedChildren(elem, ["head", 'body', 'foot']);
        if (head) addClass(head, "head");
        if (body) addClass(body, "body");
        if (foot) addClass(foot, "foot");
    }
    elem.$renders = [checkValue];
    return elem;
}