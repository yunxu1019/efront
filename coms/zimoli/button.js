var text = div();
css(text, "position:absolute;left:0;right:0;width:100%;height:1em;line-height:1em;top:50%;bottom:50%;margin: -.5em 0;");
var track = createElement(div);
// var track_over="visibility:inherit";
css(track, "width:100%;height:100%;background:#000;position:absolute;left:0;top:0;");
opacity(track, 0);
var btn = div();
css(btn, "width:50px;height:24px;font-size:14px;background-color:#ff0000;position:relative;overflow:hidden;")
var opacity_mouseout=0;
var opacity_mouseover=0.2;
var opacity_active=0.3;
function button() {
    var tracker = createElement(track);
    var texter = createElement(text);
    var bluer = anniu();
    var button = createElement(btn, tracker, texter, bluer);
    onmouseover(button, function () {//兼容手机端没有over与leave事件
        opacity(tracker, opacity_mouseover);
    });
    onmouseleave(button, function () {
        opacity(tracker, opacity_mouseout);
    });
    onmousedown(button, function () {
        opacity(tracker, opacity_active);
    });
    onmouseup(button, function () {
        opacity(tracker, opacity_mouseover);
    });
    button.text = function (text) {
        if (arguments.length)
            return texter.innerText = text;
        return texter.innerText;
    };
    return button;
};