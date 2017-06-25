var _itemBox = div();
css(_itemBox, "width:100%;position:absolute;background:inherit;top:0;left:0;bottom:0;right:0;line-height:50px;");
var _itemHead = div();
css(_itemHead, "position:absolute;font-size:16px;color:#600;padding-left:16px;left:0;width:61px;height:100%;top:0;bottom:0;background-color:inherit;");
var _itemBody = div();
css(_itemBody, "outline:1px solid #e2e3e4;position:absolute;right:0;left:60px;top:0;bottom:0;height:100%;width:auto;font-size:16px;color:#666;padding-left:1px;");
var _itemFoot = div();
css(_itemFoot, "position:absolute;right:0;width:40px;top:0;bottom:0;height:100%;");
var middle=function(item){
    var half_height=parseInt(item.style.height)>>1;
    half_height&&css(item,{
        position:"absolute",
        top:"25px",
        marginTop:-half_height+"px"
    });
    return item;
};
function option(head, body, foot, splitter) {
    var box = createElement(_itemBox);
    isNode(head)&&middle(head);
    isNode(body)&&middle(body);
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
            css(foot, "height:16px;width:16px;top:25px;margin-top:-8px;position:absolute;right:10px");
        }
        var _foot = createElement(_itemFoot, foot);
        appendChild(box, _foot);
    }
    var divide = function (headWidth) {
        css(_head, {
            width: +headWidth + 1 + "px"
        });
        css(_body, {
            left: headWidth + "px"
        });
    };
    splitter && divide(splitter);
    var btn = button(box);
    css(btn, "width:100%;position:relative;background:#fff;height:50px;line-height:50px;");
    return btn;
}