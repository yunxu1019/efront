var _itemBox = document.createElement("div");
var _itemHead = document.createElement("div");
addClass(_itemHead, "head");
var _itemBody = document.createElement("div");
addClass(_itemBody, "body");
var _itemFoot = document.createElement("div");
addClass(_itemFoot, "foot");

function option(head = div(), body = div(), foot, splitter, container) {
    var box = container && !/^option$/i.test(container.tagName) ? container : _itemBox.cloneNode();
    var _head = head;
    var _body = body;
    appendChild(box, _head, _body);
    if (foot) {
        appendChild(box, foot);
    }
    if (splitter < 32) splitter *= 16;

    var divide = function (headWidth) {
        css(_head, {
            width: fromPixel(+headWidth + 1)
        });
    };
    splitter && divide(splitter);
    if (/n$/i.test(box.tagName)) {
        var btn = button(box);
    }
    return btn || box;
}

function main(arg0) {
    var head, body, foot, splitter, container;
    if (isNode(arg0) && !isNode(arguments[1])) {
        container = arg0;
        var [head = null, body = null, foot = null] = container.children;
        splitter = container.getAttribute("split") || undefined;
        if (head) addClass(head, "head");
        if (body) addClass(body, "body");
        if (foot) addClass(foot, "foot");
        return option(head, body, foot, splitter, container);
    }
    [].forEach.call(arguments, function (arg) {
        if (isNode(arg) || isString(arg)) {
            if (head === void 0) {
                head = arg;
            } else if (body === void 0) {
                body = arg;
            } else if (foot === void 0) {
                foot = arg;
            } else if (container === void 0 && isNode(arg)) {
                container = head;
                head = body;
                body = foot;
                foot = arg;
            }
            return;
        }
        if (typeof arg === "boolean") {
            foot = arg;
            return;
        }
        if (isFinite(arg)) {
            splitter = +arg;
        }
    });
    var hasNext = "";
    if (foot === true || foot === undefined) {
        foot = document.createElement("span");
        addClass(foot, "next");
        hasNext = true;
    }
    if (foot) foot = appendChild(_itemFoot.cloneNode(), foot);
    if (isString(head) && !splitter) {
        splitter = 32 + (head.length + head.replace(/[\w ]+/g, "").length) * 16;
    }
    var box = option(appendChild(_itemHead.cloneNode(), head), appendChild(_itemBody.cloneNode(), body), foot, splitter, container);
    if (hasNext) {
        addClass(box, "has-next")
    }
    return box;
}