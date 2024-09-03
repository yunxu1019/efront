var reshape = function () {
    var [head, body, foot] = getTypedChildren(this, ['head', 'body', 'foot']);
    var isInlineBlock = body && /^inline/i.test(getComputedStyle(body).display);
    if (head && body) {
        var left = head.offsetWidth + 1;
        if (isInlineBlock && left < body.offsetWidth >> 2) {
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
        var right = foot.offsetWidth + 1;
        if (isInlineBlock && right < body.offsetWidth >> 2) {
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

function main(elem) {
    if (!isElement(elem)) elem = document.createElement('field');
    elem.reshape = reshape;
    resizingList.set(elem, () => elem.reshape());
    elem.setAttribute("field", '');
    var scope = {};
    elem.$renders = [function () {
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

    if (!elem.childNodes.length) care(elem, function (p) {
        var [f, data] = p;
        elem.innerHTML = field;
        render(elem, scope = {
            model,
            data,
            error: null,
            field: f,
            container,
            checkNeeds(needs, data) {
                var res = check(data, needs);
                return res;
            },
            readonly: !!this.readonly
        });
        elem.oldValue = data[f.key];
        elem.setAttribute("field", f.key);
        elem.reshape();
    }, false);
    else {
        var [head, body, foot] = getTypedChildren(elem, ["head", 'body', 'foot']);
        if (head) addClass(head, "head");
        if (body) addClass(body, "body");
        if (foot) addClass(foot, "foot");
        elem.$renders.push(reshape);
    }
    return elem;
}