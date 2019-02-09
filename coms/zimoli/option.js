var _itemBox = div();
addClass(_itemBox, "container");
var _itemHead = div();
addClass(_itemHead, "head");
var _itemBody = div();
addClass(_itemBody, "body");
var _itemFoot = div();
addClass(_itemFoot, "foot");

function option(head, body, foot, splitter, container) {
    var box = container || createElement(_itemBox);
    var _head = createElement(_itemHead, head);
    var _body = createElement(_itemBody, body);
    appendChild(box, _body, _head);
    if (isNumber(foot)) {
        splitter = foot;
        foot = null;
    } else if (isString(head) && !splitter) {
        splitter = 32 + (head.length + head.replace(/[\w ]+/g, "").length) * 16;
    }
    if (splitter < 32) splitter *= 16;
    if (foot !== false) {
        if (!foot) {
            foot = icon("next", 0xcccccc);
            addClass(foot, "next");
            addClass(box, "has-next");
        }
        var _foot = createElement(_itemFoot, foot);
        appendChild(box, _foot);
    }
    var divide = function (headWidth) {
        css(_head, {
            width: fromPixel(+headWidth + 1)
        });
        css(_body, {
            left: fromPixel(headWidth * renderPixelRatio)
        });
    };
    splitter && divide(splitter);
    var btn = button(box);
    return btn;
}

function main(arg0) {
    var head, body, foot, splitter, container;
    if (arguments.length === 1 && isNode(arg0)) {
        container = arg0;
        var [head = null, body = null, foot = null] = container.children;
        splitter = container.getAttribute("")
        return option(head, body, foot, splitter, container);
    }
    [].forEach.call(arguments, function (arg) {
        if (isNode(arg)) {
            if (!head) {
                head = arg;
            } else if (!body) {
                body = arg;
            } else if (!foot) {
                foot = arg;
            } else if (!container) {
                container = head;
                head = body;
                body = foot;
                foot = arg;
            }
            return;
        }
        if (isFinite(arg)) {
            splitter = +arg;
        }
    });
    return option(head, body, foot, splitter, container);
}