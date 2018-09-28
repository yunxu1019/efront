var _itemBox = div();
addClass(_itemBox, "container");
var _itemHead = div();
addClass(_itemHead, "head");
var _itemBody = div();
addClass(_itemBody, "body");
var _itemFoot = div();
addClass(_itemFoot, "foot");

function option(head, body, foot, splitter) {
    var box = createElement(_itemBox);
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
            width: (+headWidth + 1) * renderPixelRatio + "pt"
        });
        css(_body, {
            left: headWidth * renderPixelRatio + "pt"
        });
    };
    splitter && divide(splitter);
    var btn = button(box);
    return btn;
}