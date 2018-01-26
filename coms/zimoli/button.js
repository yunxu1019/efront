var _label = label();
css(_label, "position:absolute;left:0;right:0;width:100%;height:1em;line-height:1em;top:50%;bottom:50%;margin: -.5em 0;overflow:hidden;text-align:center;");
var track = createElement(div);
track.className = "track";
_label.className = "label";

var btn = div();

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
    var button = createElement(btn, tracker, _texter, bluer);
    var hover = function () {
        addClass(button, "hover");
    };
    var active = function () {
        addClass(button, "active hover");
    };
    var resethover = function () {
        removeClass(button, "hover");
    };
    var resetactive = function () {
        removeClass(button, "active");
    };
    var resetall = function () {
        removeClass(button, "active hover");
    }
    onremove(button, resetall);
    onmouseover(button, hover);
    onmouseleave(button, function () {
        removeClass(button, "hover");
    });
    onmousemove(button, function (event) {
        if (onclick.preventClick && event.which) resetall();
    });
    onmousedown(button, function () {
        var cancelmouseup = onmouseup(window, function () {
            cancelmouseup();
            resetactive();
        });
        active();
    });
    ontouchmove(button, resetall);
    ontouchstart(button, function () {
        var cancel = function () {
            canceltouchcancel();
            canceltouchend();
            resetall();
        };
        var canceltouchcancel = ontouchcancel(window, cancel);
        var canceltouchend = ontouchend(window, cancel);
        active();
    });
    onfocus(bluer, function () {
        addClass(button, "focus");
    });
    onblur(bluer, function () {
        removeClass(button, "focus");
    });
    button.text = function (_text) {
        if (_text && _text.length === 2) {
            addClass(button, "space");
        } else {
            removeClass(button, "space");
        }
        if (arguments.length)
            return text(_texter, _text);
        return text(_texter);
    };
    if (texter && texter.length === 2) {
        addClass(button, "space");
    } else {
        removeClass(button, "space");
    }
    if (type) button.setAttribute("type", type);
    return button;
};