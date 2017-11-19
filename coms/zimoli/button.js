var _label = label();
css(_label, "position:absolute;left:0;right:0;width:100%;height:1em;line-height:1em;top:50%;bottom:50%;margin: -.5em 0;overflow:hidden;text-align:center;");
var track = createElement(div);
track.className = "track";
// var track_over="visibility:inherit";
opacity(track, 0);
var btn = div();
css(btn, "width:50px;height:24px;font-size:14px;position:relative;")
var opacity_mouseout = 0;
var opacity_mouseover = 0.04;
var opacity_active = 0.1;

function button(texter, type) {
    var tracker = createElement(track);
    var _texter;
    if (isNode(texter)) {
        _texter = texter;
    } else {
        _texter = createElement(_label);
        if (isString(texter))
            text(_texter, texter);
    }
    var bluer = anniu();
    var button = createElement(btn, _texter, tracker, bluer);
    var hover = function () {
        opacity(tracker, opacity_mouseover);
    };
    var active = function () {
        opacity(tracker, opacity_active);
    };
    var reset = function () {
        opacity(tracker, opacity_mouseout);
    };
    onmouseover(button, hover);
    onmouseleave(button, reset);
    onmousemove(button, reset);
    onmousedown(button, active);
    onmouseup(button, reset);
    ontouchmove(button, reset);
    ontouchstart(button, active);
    ontouchcancel(button, reset);
    ontouchend(button, reset);
    button.text = function (_text) {
        if (arguments.length)
            return text(_texter, _text);
        return text(_texter);
    };
    if (type) button.setAttribute("type", type);
    return button;
};