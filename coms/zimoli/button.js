var text = div();
css(text, "position:absolute;left:0;right:0;width:100%;height:1em;line-height:1em;top:50%;bottom:50%;margin: -.5em 0;overflow:hidden;");
var track = createElement(div);
// var track_over="visibility:inherit";
css(track, "width:100%;height:100%;background:#000;position:absolute;left:0;top:0;");
opacity(track, 0);
var btn = div();
css(btn, "width:50px;height:24px;font-size:14px;background-color:#ff0000;position:relative;")
var opacity_mouseout = 0;
var opacity_mouseover = 0.03;
var opacity_active = 0.06;

function button(texter) {
    var tracker = createElement(track);
    var _texter;
    if (isNode(texter)) {
        _texter = texter;
    } else {
        _texter = createElement(text);
        if (isString(texter))
            _texter.innerText = texter;
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
    onmousedown(button, active);
    onmouseup(button, reset);
    ontouchstart(button, active);
    ontouchcancel(button, reset);
    ontouchend(button, reset);
    button.text = function (text) {
        if (arguments.length)
            return _texter.innerText = text;
        return _texter.innerText;
    };
    return button;
};