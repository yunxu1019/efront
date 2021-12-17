var _label = createElement("span");
var track = createElement(div);
track.className = "track";
_label.className = "label";
var keyMap = {};
on("keydown")(window, function (event) {
    var { which } = event;
    switch (event.which) {
        case 18:
            event.preventDefault();
            break;
        default:
            if (event.altKey) {
                var key = String.fromCharCode(which);
                var element = keyMap[key];
                if (element) {
                    if (isMounted(element)) {
                        event.preventDefault();
                        element.click();
                    } else {
                        delete keyMap[key];
                    }
                }
            }
    }
});

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
    if (this.hasAttribute("disabled") || this.disabled || this.hasAttribute("loading") || this.loading || this.hasAttribute("pending") || this.pending) onclick.preventClick = true;
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
var mouseleave = function () {
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
var bindAccesskey = function (btn) {
    var { innerText } = btn;
    var match = /\(\s*\_?\w\s*\)|\[\s*\_?\w\s*\]|\{\s*\_?\w\s*\}/.exec(innerText);
    if (match) {
        var accesskey = match[0].replace(/^\W*(\w)\W*$/g, '$1');
    } else {
        var accesskey = btn.getAttribute("accesskey");
    }
    if (!accesskey) return;
    keyMap[accesskey.toUpperCase()] = btn;
};
function button(texter, type) {
    var tracker = createElement(track);
    var _texter;
    if (isNode(texter)) {
        _texter = texter;
        if (_texter.tagName) {
            var button = _texter;
            if (button.childNodes.length) {
                if (button.childNodes.length === 1 && button.childNodes[0].nodeType !== 1) {
                    _texter = createElement(_label);
                    _texter.appendChild(button.childNodes[0]);
                    button.appendChild(_texter);
                }
                appendChild.before(button.childNodes[0], tracker);
            } else {
                appendChild(button, tracker);
            }
        }
    } else {
        _texter = createElement(_label);
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
    button = button || createElement(btn, tracker, _texter);
    bindAccesskey(button);
    onremove(button, resetall);
    onmouseover(button, hover);
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