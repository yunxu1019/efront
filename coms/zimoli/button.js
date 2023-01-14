var _label = document.createElement("span");
var track = document.createElement("div");
var onmouseenter = on("mouseenter");
track.className = "track";
_label.className = "label";

var btn = document.createElement("button");
btn.tabIndex = 0;
var __addClass = function () {
    if (firedTime + 60 > +new Date) return;
    addClass.apply(this, arguments);
};
var hover = function () {
    __addClass(this, "hover");
};
var active = function () {
    __addClass(this, "hover active");
};
var checkclick = function () {
    if (this.hasAttribute("disabled") || this.disabled || this.hasAttribute("loading") || this.loading || this.hasAttribute("pending") || this.pending) {
        onclick.preventClick = true;
        return;
    }
    if (this.hasAttribute("confirm") || this.confirm) {
        if (!this.confirm_sign) {
            addClass(this, 'confirm');
            var that = this;
            that.confirm_sign = true;
            setTimeout(function () {
                removeClass(that, "confirm");
                delete that.confirm_sign;
            }, 2000);
            onclick.preventClick = true;
            return;
        }
        delete this.confirm_sign;
        removeClass(this, "confirm");
    }
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
        checkclick.call(that);
    });
    active.call(this);
};
var mouseleave = function (event) {
    removeClass(this, "hover");
};
var mousemove = function (event) {
    if (onclick.preventClick && event.which) resetall.call(this);
};
var firedTime = +new Date;
var touchstart = function () {
    var that = this;
    var cancel = function () {
        firedTime = +new Date;
        canceltouchcancel();
        canceltouchend();
        resetall.call(that);
        checkclick.call(that);
    };
    var canceltouchcancel = ontouchcancel(this, cancel);
    var canceltouchend = ontouchend(this, cancel);
    active.call(this);
};
function button(texter, type) {
    var tracker = track.cloneNode();
    var _texter;
    if (isNode(texter)) {
        _texter = texter;
        if (_texter.tagName) {
            var button = _texter;
            if (button.childNodes.length) {
                if (button.childNodes.length === 1 && button.childNodes[0].nodeType !== 1) {
                    _texter = _label.cloneNode();
                    _texter.appendChild(button.childNodes[0]);
                    button.appendChild(_texter);
                }
                appendChild.before(button.childNodes[0], tracker);
            } else {
                appendChild(button, tracker);
            }
        }
    } else {
        _texter = _label.cloneNode();
        if (isString(texter)) {
            if (!type) {
                texter = texter.replace(/#\w*/, function (w) {
                    if (/^#([a-f\d]{3,4}){1,2}$/.test(w)) {
                        type = color.parse(w);
                    }
                    type = w.slice(1);
                    return '';
                }).trim();
            }
            html(_texter, texter);
        }
    }
    if (!button) {
        button = btn.cloneNode();
        appendChild(button, tracker, _texter);
    }
    bindAccesskey(button);
    onremove(button, resetall);
    onmouseenter(button, hover);
    onmouseleave(button, mouseleave);
    onmousemove(button, mousemove);
    onmousedown(button, mousedown);
    ontouchmove(button, resetall);
    ontouchstart(button, touchstart);
    button.setText = function (_text) {
        if (_text && _text.length === 2) {
            __addClass(button, "space");
        } else {
            removeClass(button, "space");
        }
        html(_texter, _text);
        bindAccesskey(button);
    };
    button.getText = function () {
        return html(_texter);
    };
    if (texter && texter.length === 2) {
        __addClass(button, "space");
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