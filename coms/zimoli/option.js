var _itemBox = div();
addClass(_itemBox, "container");
var _itemHead = div();
addClass(_itemHead, "head");
var _itemBody = div();
addClass(_itemBody, "body");
var _itemFoot = div();
addClass(_itemFoot, "foot");
var middle = function (item) {
    var half_height = parseInt(item.style.height) >> 1;
    half_height && css(item, {
        position: "absolute",
        top: "25px",
        marginTop: -half_height + item.style.height.replace(/(\d*)/, "")
    });
    return item;
};
function option(head, body, foot, splitter) {
    var box = createElement(_itemBox);
    isNode(head) && middle(head);
    isNode(body) && middle(body);
    var _head = createElement(_itemHead, head);
    var _body = createElement(_itemBody, body);
    appendChild(box, _body, _head);
    if (isNumber(foot)) {
        splitter = foot;
        foot = null;
    } else if (isString(head) && !splitter) {
        splitter = 32 + head.length + head.replace(/[\w ]+/g, "").length * 16;
    }
    if (foot !== false) {
        if (!foot) {
            foot = icon("next", 0xcccccc);
            addClass(foot, "next");
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
    css(btn, "width:100%;position:relative;background:#fff;height:50px;line-height:50px;");
    return btn;
}