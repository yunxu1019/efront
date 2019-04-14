var _label = createElement("span");
var track = createElement(div);
track.className = "track";
_label.className = "label";

var btn = div();
btn.tabIndex = 0;
var hover = function () {
    addClass(this, "hover");
};
var active = function () {
    addClass(this, "active hover");
};
var resetactive = function () {
    removeClass(this, "active");
};
var resetall = function () {
    removeClass(this, "active hover");
};
var mousedown = function () {
    var that = this;
    var cancelmouseup = onmouseup(window, function () {
        cancelmouseup();
        resetactive.call(that);
    });
    active.call(this);
};
var mouseleave = function () {
    removeClass(this, "hover");
};
var mousemove = function (event) {
    if (onclick.preventClick && event.which) resetall.call(this);
};

var touchstart = function () {
    var that = this;
    var cancel = function () {
        canceltouchcancel();
        canceltouchend();
        resetall.call(that);
    };
    var canceltouchcancel = ontouchcancel(window, cancel);
    var canceltouchend = ontouchend(window, cancel);
    active.call(this);
};
function button(texter, type) {
    var tracker = createElement(track);
    var _texter;
    if (isNode(texter)) {
        _texter = texter;
        if (_texter.tagName && !type) {
            var button = _texter;
            if (button.childNodes.length) {
                appendChild.before(button.childNodes[0], tracker);
            } else {
                appendChild(button, tracker);
            }
        }
    } else {
        _texter = createElement(_label);
        if (isString(texter))
            html(_texter, texter);
    }
    button = button || createElement(btn, tracker, _texter);
    onremove(button, resetall);
    onmouseover(button, hover);
    onmouseleave(button, mouseleave);
    onmousemove(button, mousemove);
    onmousedown(button, mousedown);
    ontouchmove(button, resetall);
    ontouchstart(button, touchstart);
    button.setText = function (_text) {
        if (_text && _text.length === 2) {
            addClass(button, "space");
        } else {
            removeClass(button, "space");
        }
        return html(_texter, _text);
    };
    button.getText = function () {
        return html(_texter);
    };
    if (texter && texter.length === 2) {
        addClass(button, "space");
    } else {
        removeClass(button, "space");
    }
    if (type) {
        if (parseFloat(type)) {
            var size = isFinite(type) ? type + "px" : type;
            css(button, `height:${size};`);
        }
        else if (isString(type)) button.setAttribute("type", type);
    }
    return button;
};