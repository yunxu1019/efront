var text = div();
css(text, "position:absolute;left:0;right:0;width:100%;height:1em;line-height:1em;top:50%;bottom:50%;margin: -.5em 0;");
var track = createElement(div);
// var track_over="visibility:inherit";
css(track, "width:100%;height:100%;background:#000;position:absolute;left:0;top:0;");
opacity(track, 0);
var btn = div();
css(btn, "width:50px;height:24px;font-size:14px;background-color:#ff0000;position:relative;overflow:hidden;")

function button() {
    var tracker = createElement(track);
    var texter = createElement(text);
    var bluer = anniu();
    var button = createElement(btn, tracker, texter, bluer);
    onmouseover(button, function () {
        opacity(tracker, 0.2);
    });
    onmouseleave(button, function () {
        opacity(tracker, 0);
    });
    onmousedown(button, function () {
        opacity(tracker, 0.3);
    });
    onmouseup(button, function () {
        opacity(tracker, 0.2);
    });
    button.text = function (text) {
        if (arguments.length)
            return texter.innerText = text;
        return texter.innerText;
    };
    return button;
};